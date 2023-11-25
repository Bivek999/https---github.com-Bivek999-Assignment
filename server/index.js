// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const port = 3005;
// const app = express();

// app.use(bodyParser.json());
// app.use(cors());

// // mongoose.connect("/");
// mongoose.connect("mongodb://localhost:27017/userRegistration", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   phone: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// // Register user
// app.post("/register", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser = new User({ ...req.body, password: hashedPassword });
//     await newUser.save();
//     res.json({ message: "Registration successful!" });
//   } catch (error) {
//     res.status(500).json({ error: "Registration failed." });
//   }
// });

// // Login user
// app.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid credentials." });
//     }

//     const passwordMatch = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Invalid credentials." });
//     }

//     const token = jwt.sign({ userId: user._id }, "secret-key");
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed." });
//   }
// });

// // Middleware to verify JWT
// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(401).json({ error: "Unauthorized." });

//   jwt.verify(token, "secret-key", (err, user) => {
//     if (err) return res.status(403).json({ error: "Forbidden." });
//     req.user = user;
//     next();
//   });
// };

// // Get all users
// app.get("/users", authenticateToken, async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch users." });
//   }
// });

// // Update user
// app.put("/users/:id", authenticateToken, async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(req.params.id, req.body);
//     res.json({ message: "User updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update user." });
//   }
// });

// // Delete user
// app.delete("/users/:id", authenticateToken, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete user." });
//   }
// });

// app.listen(port, () => {
//   console.log("Server is working now");
// });

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "root", // Your MySQL password
  database: "userRegistration",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
    // Create users table if not exists
    db.query(
      `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      email VARCHAR(255),
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
    (error) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Failed to update user." });
      }
      res.json({ message: "User updated successfully!" });
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

// // Read all users
// app.get("/users", (req, res) => {
//   db.query(
//     "SELECT id, firstName, lastName, email, phone FROM users",
//     (error, results) => {
//       if (error) {
//         console.error("Error fetching users:", error);
//         return res.status(500).json({ error: "Failed to fetch users." });
//       }
//       res.json(results);
//     }
//   );
// });

// Read user by email and password
app.post("/users/check", async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  await db.query(
    "SELECT id, firstName, lastName, email, phone FROM users WHERE email = ? AND password = ?",
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

// Delete user
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id=?", [userId], (error) => {
    if (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: "Failed to delete user." });
    }
    res.json({ message: "User deleted successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
