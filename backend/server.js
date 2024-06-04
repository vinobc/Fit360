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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
