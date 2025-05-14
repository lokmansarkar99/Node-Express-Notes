// Express Server with EJS Template Engine
import express from "express";
import connectDB from "./mongoose-db.js";
import User from "./models/userModel.js";

const app = express();
const PORT = 3000;
connectDB();
app.get("/", (req, res) => {
  res.send("Express and MONGOBD");
});



app.get("/create-user", async (req, res) => {
  try {
    const newUser = await User.create({
      name: "LokmanSarkar",
      email: "lokman@example.com",
      age: 22,
    });
    res.send(`User created: ${newUser.name}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send("Failed to create user");
  }
});

app.get("/update-user", async (req, res) => {
  try {
    const newUser = await User.updateOne({
      email: "lokman@example.com",
    }, {$set: {age: 23}});
    res.send(`User created: ${newUser}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send("Failed to create user");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
