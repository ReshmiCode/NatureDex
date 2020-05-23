const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleID : {
        type: String,
        required: [true, 'Add a googleID']
    },

    profilePic: {
        type: String
    },

    userName: {
        type: String,
        required: [true, 'Add a username']
    },
    
    plants: [
        mongoose.Schema.Types.ObjectId
    ]
});

module.exports = mongoose.model('User', UserSchema);