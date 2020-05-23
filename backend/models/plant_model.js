const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: [true, 'Add a user']
    },
    image: {
        type: String,
        required: [true, 'Add an image']
    },
    description: {
        type: [String],
        required: [true, 'Add an info']
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Plant', PlantSchema);