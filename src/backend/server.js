import express from "express";
import cors from "cors";
import pool from "./config/db.js";
 // import connection

const app = express();
// ✅ Correct CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Example: Fetch from table
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.cust_table;"); // your table
    console.log(result.rows); // 👈 this prints data in the backend console
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).send("Database error");
  }
});


// ✅ Insert form data into database
app.post("/users", async (req, res) => {
  try {
    const { name, email, mobileno, password, confirmPassword } = req.body;

    // Basic validation
    if (!name || !email || !mobileno || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // ✅ Correct SQL query with parameter placeholders ($1, $2, etc.)
    const insertQuery = `
      INSERT INTO public.cust_table (name, mobileno, email, password, confirmPassword)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    // ✅ Correct order of values
    const values = [name, mobileno, email, password, confirmPassword];

    const result = await pool.query(insertQuery, values);

    console.log("Inserted row:", result.rows[0]);
    res.status(201).json({
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error inserting data:", err.message);
    res.status(500).json({ error: "Database insertion failed" });
  }
});


// ✅ LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Fetch user from database
    const query = "SELECT * FROM public.cust_table WHERE email = $1 AND password = $2";
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
      // ✅ Login success
      const user = result.rows[0];
      console.log("Login successful for:", user.email);
      res.status(200).json({
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
