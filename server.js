const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "MyNotes backend is running"
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        const PORT = process.env.PORT || 4000;

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });