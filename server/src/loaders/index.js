const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

module.exports = async ({ expressApp }) => {
    // 1. Connect to MongoDB
    await mongooseLoader();
    console.log('✌️ DB loaded and connected!');

    // 2. Initialize Express (Middlewares, Routes, Error Handlers)
    await expressLoader({ app: expressApp });
    console.log('✌️ Express loaded!');
};