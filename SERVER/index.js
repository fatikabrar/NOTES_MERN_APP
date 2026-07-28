console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());


// ✅ ROUTES


app.get("/", (req, res) => {
  res.send("API is live");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const notesrouter = require("./api/v1"); // ✅ FIXED PATH
app.use("/api/v1/notes", notesrouter);

// CONNECT DB (separate safe function)
function connectDB() {
  const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;

  mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
}

// IMPORTANT: FORCE PORT SAFETY
const PORT = process.env.PORT || 8080;

// START SERVER FIRST (CRITICAL FOR RAILWAY)
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);

  // DB AFTER SERVER STARTS
  connectDB();
});