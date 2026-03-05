const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const animalRoutes = require('../routes/animalRoutes');

module.exports = ({ app }) => {
    // Basic Security & Setup
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    // Health Check (useful for monitoring)
    app.get('/status', (req, res) => res.status(200).end());

    // Mount your Animal Inventory routes
    // app.use('/api/animals', animalRoutes);
    animalRoutes(app);

    // Global Error Handler (Catch-all)
    app.use((err, req, res, next) => {
        console.error('🔥 Error:', err.message);
        res.status(err.status || 500).json({
            error: {
                message: err.message,
            },
        });
    });
};