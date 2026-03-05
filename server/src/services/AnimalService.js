const Animal = require('../models/Animal');

class AnimalService {
    async create(data) { return await Animal.create(data); }

    async getAll() {
        // Only return animals that haven't been soft-deleted
        return await Animal.find({ deletedAt: null });
    }

    async update(id, data) {
        return await Animal.findByIdAndUpdate(id, data, { new: true });
    }

    async softDelete(id) {
        return await Animal.findByIdAndUpdate(id, { deletedAt: new Date() });
    }

    async hardDelete(id) {
        return await Animal.findByIdAndDelete(id);
    }
}

module.exports = new AnimalService();