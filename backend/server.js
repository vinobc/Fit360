const express = require("express");
const connectDB = require("./db");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const db = await connectDB();
    res.send("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to connect to MongoDB");
  }
});

// User Registration Endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = await connectDB();
    const collection = db.collection("users");
    const user = await collection.insertOne({ username, password });
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// User Login Endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = await connectDB();
    const collection = db.collection("users");
    const user = await collection.findOne({ username, password });
    if (user) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

// Mock Data Endpoint
app.get("/mock-users", (req, res) => {
  res.json([
    { id: 1, username: "user1", email: "user1@example.com" },
    { id: 2, username: "user2", email: "user2@example.com" },
  ]);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
