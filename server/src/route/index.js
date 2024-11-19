const express = require('express');
const authRoutes = require('./authRouter');

const router = express.Router();

router.use('/auth', authRoutes);

module.exports = router;