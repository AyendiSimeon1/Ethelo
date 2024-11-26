const express = require('express');
const {
    signup 
} = require('../controllers/user.controllers');

const authRouter = express.Router();

authRouter.post('/signup', signup);


module.exports = { authRouter };