const Plant = require('../models/plant_model');
const axios = require("axios").default;

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
    try {
        const plant = await Plant.create(req.body);

        try {
            const user = await axios.get(
              `https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${plant.userID}`
            );
            const newPlants = user.data.data[0].plants;
            newPlants.push(plant._id.toString());
            await axios.patch(
              `https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${plant.userID}`,
              {
                plants: newPlants,
              }
            );
        } catch (err) {
            console.log(err);
        }

        return res.status(201).json({
            success: true,
            data: plant
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
        
            return res.status(400).json({
                success: false,
                error: messages
            });

        } 
        
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

exports.getPlant = async (req, res, next) => {    
    try {
        const plant = await Plant.findById(req.params.id);

        if(!plant){
            return res.status(404).json({
                success: false,
                error: 'No plant found'
            });
        }

        return res.status(200).json({
            success: true,
            data: plant
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.deletePlant = async (req, res, next) => {    
    try {
        const plant = await Plant.findById(req.params.id);

        const plantToDelete = plant._id;

        if(!plant){
            return res.status(404).json({
                success: false,
                error: 'No plant found'
            });
        }

        await plant.remove();

        try {
            const user = await axios.get(
              `https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${plant.userID}`
            );
            const newPlants = user.data.data[0].plants;
            var index = newPlants.indexOf(plantToDelete.toString());
            if (index !== -1) newPlants.splice(index, 1);
            await axios.patch(
              `https://backyardhacks2020.wl.r.appspot.com/api/v1/users/${plant.userID}`,
              {
                plants: newPlants,
              }
            );
        } catch (err) {
            console.log(err);
        }

        return res.status(200).json({
            success: true,
            data: plant
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.getUserPlant = async (req, res, next) => {    
    try {
        const plants = await Plant.find({}).where({ "userID": req.params.id});

        if(!plants){
            return res.status(404).json({
                success: false,
                error: 'No plants found'
            });
        }

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