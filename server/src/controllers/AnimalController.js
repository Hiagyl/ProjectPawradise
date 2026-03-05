const AnimalService = require('../services/AnimalService');

class AnimalController {
    // GET /api/animals
    async getAnimals(req, res, next) {
        try {
            const animals = await AnimalService.getAll();
            return res.status(200).json(animals);
        } catch (e) {
            next(e); // Sends error to the Global Error Handler in loaders/express.js
        }
    }

    // POST /api/animals
    async createAnimal(req, res, next) {
        try {
            const animal = await AnimalService.create(req.body);
            return res.status(201).json(animal);
        } catch (e) {
            next(e);
        }
    }

    // PUT /api/animals/:id
    async updateAnimal(req, res, next) {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            const animal = await AnimalService.update(id, updatedData);

            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            return res.status(200).json(animal);
        } catch (e) {
            next(e);
        }
    }
    
    // PATCH /api/animals/:id/soft
    async softDelete(req, res, next) {
        try {
            const { id } = req.params;
            await AnimalService.softDelete(id);
            return res.status(200).json({ message: 'Animal moved to archive' });
        } catch (e) {
            next(e);
        }
    }

    // DELETE /api/animals/:id
    async hardDelete(req, res, next) {
        try {
            const { id } = req.params;
            await AnimalService.hardDelete(id);
            return res.status(200).json({ message: 'Animal record permanently deleted' });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AnimalController();