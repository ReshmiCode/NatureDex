const express = require('express');
const router = express.Router();
const { getUsers, addUser , getUser} = require('../controllers/user_controller');

router
    .route('/')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id')
    .get(getUser)

module.exports = router;