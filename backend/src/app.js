//create server

const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();

// CORS
app.use(cors({
    origin: true,
    credentials: true
}));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Hello world");
});

// Direct test route - bypasses router
app.get("/test", (req, res) => {
    res.json({ message: "Server is working!" });
});



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api', foodPartnerRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
});

module.exports = app;
