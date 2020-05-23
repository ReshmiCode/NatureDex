const express = require('express');
const router = express.Router();
const { getPlants, addPlant, getPlant, deletePlant, getUserPlant} = require('../controllers/plant_controller');

router
    .route('/')
    .get(getPlants)
    .post(addPlant);

router
    .route('/:id')
    .get(getPlant)
    .delete(deletePlant);

router
    .route('/:userid')
    .get(getUserPlant)

    
module.exports = router;