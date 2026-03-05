const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true }, // e.g., Cat, Dog, Bird
    location: { type: String, required: true }, // e.g., "Library Garden"
    status: { type: String, enum: ['Healthy', 'Under Treatment', 'Adopted'], default: 'Healthy' },
    deletedAt: { type: Date, default: null } // The "Soft Delete" flag
}, { timestamps: true, collection: 'campusPets' });

module.exports = mongoose.model('Animal', AnimalSchema);