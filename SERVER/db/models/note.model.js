const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: String,
  link: String,
});

// جلوگیری از duplicate model crash
const noteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

module.exports = noteModel;