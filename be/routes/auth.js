const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models')
const bcrypt = require('bcrypt');
const authenticate = require('../lib/authenticate');
require('dotenv').config();


const router = express.Router()



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({
        where: {
            email: email,
        }
    })

    // Check if user exists
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            message: 'Invalid email or password'
        })
    }

    //Generate Token
    const token = jwt.sign({
        id : user.id,
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName
    }, process.env.JWT_SECRETKEY, {
        expiresIn: '24h'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        message: 'Logged in successfully',
    })
})

router.get('/me', authenticate, async (req, res) => {
    const user = req.user;;

    if (!user) {
        return res.status(401).json({
            message : 'Please login to access this resource'
        })
    }

    return res.status(200).json({
        message: 'Data retrieved successfully',
        data: {
            email: user.email,
        }
    })
})

router.get('/logout', async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            message: 'Please login to access this resource'
        })
    }

    // Clear the user token jwt
    res.clearCookie('token');
    return res.status(200).json({
        message: 'Logout successful'
    })
})

module.exports = router;