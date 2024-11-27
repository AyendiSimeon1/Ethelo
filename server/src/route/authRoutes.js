const express = require('express');
const {
    signup,
    login
} = require('../controllers/user.controllers');

const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/login', login);


module.exports = { authRouter };