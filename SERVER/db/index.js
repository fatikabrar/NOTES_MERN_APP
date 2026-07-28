const mongoose = require("mongoose");

function connectDB() {
 const uri = process.env.MONGODB_URI;
mongoose.connect(uri)

  return mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
}

module.exports = connectDB;