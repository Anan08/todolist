const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const taskRoutes = require('./task');
const profileRoutes = require('./profile')


router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/profile', profileRoutes)
router.use('/api', (req, res) => {
    res.status(200).json({
        message: 'API is working'
    });
});

module.exports = router;