const http = require("http");
const { Pool } = require("pg");

// PostgreSQL setup
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",  // ✅ Replace with your DB name if different
  password: "postgres",  // ✅ Replace with your password
  port: 5432,
});

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // ✅ Match /signup and variants like /signup/, /signup?test=1
  if (req.method === "POST" && req.url.startsWith("/signup")) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const { name, contactNo, email, password, confirmPassword } = data;

        if (!name || !contactNo || !email || !password || !confirmPassword) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "All fields are required." }));
          return;
        }

        if (password !== confirmPassword) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Passwords do not match." }));
          return;
        }

        await pool.query(
          `INSERT INTO public.cust_table (name, mobileno, email, password, confirmpassword)
           VALUES ($1, $2, $3, $4, $5)`,
          [name, contactNo, email, password, confirmPassword]
        );

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Registration successful!" }));
      } catch (error) {
        console.error("Error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Server error" }));
      }
    });
  } else {
    // 🔴 Catches all other routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});

