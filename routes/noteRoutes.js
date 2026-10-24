const express = require("express");

const Note = require("../models/Note");
const authMiddleware = require("../Middleware/Authmiddleware");

const router = express.Router();


// GET NOTES
router.get("/", authMiddleware, async (req, res) => {

    try {

        const notes = await Note.find({
            user: req.userId
        }).sort({
            createdAt: -1
        });

        res.json({
            success: true,
            notes
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// CREATE NOTE
router.post("/", authMiddleware, async (req, res) => {

    try {

        const note = await Note.create({
            content: req.body.content,
            user: req.userId
        });

        res.status(201).json({
            success: true,
            note
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// UPDATE NOTE
router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                content: req.body.content
            },
            {
                new: true
            }
        );

        if (!note) {

            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            note
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// DELETE NOTE
router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!note) {

            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.json({
            success: true,
            message: "Note deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;