const express = require('express');
const { authRouter } = require('./authRoutes');

const router = express.Router();

router.use('/auth', authRouter);

module.exports = router;