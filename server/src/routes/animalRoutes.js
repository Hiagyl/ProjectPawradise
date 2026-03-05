const { Router } = require('express');
const AnimalController = require('../controllers/AnimalController');

const route = Router();

module.exports = (app) => {
    // We attach our routes to the main app
    app.use('/api/animals', route);

    // Define the endpoints
    route.get('/', AnimalController.getAnimals);
    route.post('/', AnimalController.createAnimal);
    route.put('/:id', AnimalController.updateAnimal);
    route.patch('/:id/soft', AnimalController.softDelete);
    route.delete('/:id', AnimalController.hardDelete);
};