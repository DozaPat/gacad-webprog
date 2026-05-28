// === DNS FIX FOR MONGODB ATLAS ===
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8', '8.8.4.4']);
// ==================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// === IMPORTANT: Register Routes ===
app.use("/api/users", userRoutes);
// app.use("/api/articles", articleRoutes);  // Uncomment when needed

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});