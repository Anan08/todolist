const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const taskRoutes = require('./task');


router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/api', (req, res) => {
    res.status(200).json({
        message: 'API is working'
    });
});

module.exports = router;