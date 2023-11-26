const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
// Database connection with user and password
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "userRegistration",
});

// chech and execute
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
    // Create users table if not exists
    db.query(
      `CREATE TABLE IF NOT EXISTS users (
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      email VARCHAR(255) PRIMARY kEY,
      phone VARCHAR(20),
      password VARCHAR(255)
    )`,
      (error) => {
        if (error) console.error("Error creating users table:", error);
      }
    );
  }
});

app.use("*", (req, res, next) => {
  console.log("reaches here", req.url);
  next();
});

// Update user
app.post("/users/updates", (req, res) => {
  console.log("this is request body", req.body);
  const { firstName, lastName, email, phone } = req.body;

  db.query(
    "UPDATE users SET firstName=?, lastName=?, phone=? WHERE email=?",
    [firstName, lastName, phone, email],
    (error, results) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Failed to update user." });
      }
      db.query(
        "select * from users WHERE email=?",
        [email],
        (error, results) => {
          if (error) {
            console.log(error);
          }
          console.log({ results });
          res.json(results[0]);
        }
      );
    }
  );
});

// Create user
app.post("/users", (req, res) => {
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };
    
    db.query("INSERT INTO users SET ?", newUser, (error) => {
      if (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Creation failed." });
      }
      res.json({ message: "User created successfully!" });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Creation failed." });
  }
});

// Read one users
app.get("/users/one", (req, res) => {
  const { email } = req.body;
  db.query(
    "SELECT firstName, lastName, email, phone FROM users WHERE EMAIL=?",
    [email],
    (error, results) => {
      if (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Failed to fetch users." });
      }
      res.json(results);
    }
  );
});

// Read user by email and password #login
app.post("/users/check", async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  await db.query(
    "SELECT firstName, lastName, email, phone FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error, results) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Failed to fetch user." });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      res.json(results[0]);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
