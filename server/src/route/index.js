const express = require('express');
const { authRouter } = require('./authRoutes');
const { projectRouter } = require('./projectRoutes');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/project', projectRouter);

module.exports = router;