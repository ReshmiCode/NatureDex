const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    image: {
        type: String,
        trim: true,
        required: [true, 'Please add a url']
    },

    info: {
        type: [String]
    },

    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);