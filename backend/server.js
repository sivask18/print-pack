import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ PrintPack backend running successfully 🚀");
});

// =============================
// 🧍 USER REGISTRATION
// =============================
app.post("/register", async (req, res) => {
  try {
    const { name, email, mobileno, password, confirmPassword } = req.body;

    if (!name || !email || !mobileno || !password || !confirmPassword)
      return res.status(400).json({ error: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Passwords do not match" });

    const insertQuery = `
      INSERT INTO public.cust_table (name, mobileno, email, password, confirmPassword)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, mobileno, email, password, confirmPassword];
    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: "Database insertion failed" });
  }
});

// =============================
// 🔑 LOGIN
// =============================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const query =
      "SELECT * FROM public.cust_table WHERE email = $1 AND password = $2";
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({
        message: "Login successful!",
        user: { id: user.id, name: user.name, email: user.email },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =============================
// 📧 EMAIL TRANSPORTER (Reusable)
// =============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) console.error("❌ Email transporter error:", error);
  else console.log("✅ Email transporter ready to send messages.");
});

// =============================
// 🔐 SEND OTP
// =============================
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const userQuery = "SELECT * FROM public.cust_table WHERE email = $1";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0)
      return res.status(404).json({ message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    global.otpStorage = global.otpStorage || {};
    global.otpStorage[email] = otp;

    const mailOptions = {
      from: `"PrintPack Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your OTP for Password Reset",
      html: `
        <h2>🔐 PrintPack Password Reset</h2>
        <p>Your OTP code is:</p>
        <h1 style="color:#007bff;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
        <p>Thank you,<br><strong>PrintPack Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent successfully to ${email}: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (err) {
    console.error("❌ OTP send error:", err.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// =============================
// ✅ VERIFY OTP
// =============================
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!global.otpStorage || !global.otpStorage[email])
      return res.status(400).json({ message: "OTP not found or expired" });

    if (global.otpStorage[email] !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    delete global.otpStorage[email];

    // Retrieve password from database and send via email
    const query = "SELECT password FROM public.cust_table WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const password = result.rows[0].password;

    // Send password via email
    const mailOptions = {
      from: `"PrintPack Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Your Forgotten Password",
      html: `
        <h2>🔐 Your Password</h2>
        <p>Hello,</p>
        <p>You requested your password from PrintPack. Here it is:</p>
        <p><strong>Password: ${password}</strong></p>
        <p>For security reasons, please consider changing your password after logging in.</p>
        <p>Thank you,<br><strong>PrintPack Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password sent successfully to ${email}`);

    res.status(200).json({ message: "OTP verified successfully! Password sent to your email." });
  } catch (err) {
    console.error("❌ OTP verification error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =============================
// 🔁 RESET PASSWORD
// =============================
app.post("/reset-password", async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  try {
    // First, verify the old password
    const getUserQuery = "SELECT * FROM public.cust_table WHERE email = $1";
    const userResult = await pool.query(getUserQuery, [email]);

    if (userResult.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = userResult.rows[0];
    if (user.password !== oldPassword)
      return res.status(400).json({ message: "Old password is incorrect" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "New passwords do not match" });

    // Update the password
    const updateQuery = "UPDATE public.cust_table SET password = $1, confirmPassword = $1 WHERE email = $2";
    await pool.query(updateQuery, [newPassword, email]);

    // ✅ Send confirmation email
    const mailOptions = {
      from: `"PrintPack Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Your PrintPack Password Has Been Updated",
      html: `
        <h2>✅ Password Update Successful</h2>
        <p>Hello,</p>
        <p>Your password for your PrintPack account has been successfully updated.</p>
        <p>If you didn’t make this change, please contact our support team immediately.</p>
        <br/>
        <p>Regards,<br><strong>PrintPack Support</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Password update confirmation sent to ${email}`);

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("❌ Password reset error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// =============================
// 📧 SEND CONTACT EMAIL
// =============================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const mailOptions = {
      from: `"PrintPack Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <br/>
        <p>Regards,<br><strong>PrintPack</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Contact email sent from ${email}`);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Contact email error:", err.message);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// =============================
// 🧪 Test Email Route (Temporary for debugging)
// =============================
app.get("/test-email", async (req, res) => {
  try {
    const mailOptions = {
      from: `"PrintPack Test" <${process.env.EMAIL_USER}>`,
      to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
      subject: "Test Email from PrintPack Server",
      text: "This is a test email to verify mail functionality.",
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Test email sent!" });
  } catch (err) {
    console.error("❌ Test email error:", err.message);
    res.status(500).json({ success: false, message: "Test email failed", error: err.message });
  }
});

// =============================
// � 404 Handler (MUST BE LAST)
// =============================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// =============================
// 🚀 Start Server
// =============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
