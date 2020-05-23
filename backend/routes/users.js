const express = require('express');
const router = express.Router();
const { getUsers, addUser , getUser , deleteUser , updateUser} = require('../controllers/user_controller');

router
    .route('/')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)

module.exports = router;