const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const noteModel = require("../../db/models/note.model");

// ✅ TEST ROUTE
// router.get("/test", (req, res) => {
//     res.send("Notes API working");
// });


// ✅ GET ALL NOTES
router.get("/", async (req, res) => {
    try {
        const notes = await noteModel.find({});
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// ✅ GET NOTE BY ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
        const note = await noteModel.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// ✅ CREATE NOTE
router.post("/", async (req, res) => {
    try {
        const note = new noteModel(req.body);
        const saved = await note.save();

        res.json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// ✅ UPDATE NOTE
router.put("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
        const updated = await noteModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// ✅ DELETE NOTE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
        const deleted = await noteModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;