import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "./dbase.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message, err.stack);
    return;
  }
  console.log("Connected to the database");
});

app.post("/signup", async (req, res) => {
  console.log("Received signup request:", req.body);

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.error("Validation error: Username, email, and password are required");
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashedPassword], (err, data) => {
      if (err) {
        console.error("Error inserting user:", err.message, err.stack);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: "Username or email already exists" });
        }
        return res
          .status(500)
          .json({ error: `Server Side Error: ${err.message}` });
      }
      console.log("User inserted successfully");
      return res
        .status(201)
        .json({ status: "success", message: "Signup successful" });
    });
  } catch (err) {
    console.error("Error hashing password:", err.message, err.stack);
    return res.status(500).json({ error: `Server Side Error: ${err.message}` });
  }
});

app.post("/login", (req, res) => {
  console.log("Received login request:", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.error("Validation error: Email and password are required");
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.error("Error querying user:", err.message, err.stack);
      return res.status(500).json({ error: `Server Side Error: ${err.message}` });
    }
    if (data.length > 0) {
      const user = data[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.json({ status: "success", message: "Login successful", token, username: user.username });
      } else {
        return res.status(401).json({ error: "Password is incorrect" });
      }
    } else {
      return res.status(404).json({ error: "Email not found" });
    }
  });
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      console.error("Error executing query:", err.message, err.stack);
      return res
        .status(500)
        .json({ error: `Server Side Error: ${err.message}` });
    }
    res.json({ solution: results[0].solution });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});