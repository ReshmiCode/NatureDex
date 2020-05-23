const Plant = require('../models/plant_model');

exports.getPlants = async (req, res, next) => {    
    try {
        const plants = await Plant.find();

        return res.status(200).json({
            success: true,
            count: plants.length,
            data: plants
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}
exports.addPlant = async (req, res, next) => {    
    return "ToDo";
}

exports.getPlant = async (req, res, next) => {    
    return "ToDo";
}

exports.deletePlant = async (req, res, next) => {    
    return "ToDo";
}

exports.getUserPlant = async (req, res, next) => {    
    return "ToDo";
}