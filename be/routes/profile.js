const express = require('express');
const authenticate = require('../lib/authenticate');
const { User } = require('../models');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile_pics');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName); 
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

router.get('/', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
})

router.put('/update', authenticate, upload.single("profilePicture"), async (req, res) => {
    const { firstName, lastName, email, birthDate, bio, username } = req.body;
    const profilePic = req.file ? `/uploads/profile_pics/${req.file.filename}` : undefined;

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.birthDate = birthDate || user.birthDate;
        user.bio = bio || user.bio;
        user.username = username || user.username;
        user.profilePicture = profilePic || user.profilePicture;

        await user.save();
        return res.json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router