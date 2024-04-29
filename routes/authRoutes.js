const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

const jwtConfig = require("../config/jwtConfig");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

router.post('/signup', authController.signup);

router.post('/login', async (req,res,next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({where: {email}});
        if(!user) {
            return res.status(401).json({error: 'Invalid credential'});
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(401).json({error: 'Invalid credential'});
        }
        const token = jwt.sign({id:user.id, email:user.email}, jwtConfig.secretKey, {
            expiresIn: jwtConfig.expiresIn,
        });
        return res.status(200).json({message: 'Login successfull', token});

    } catch (error) {
        return res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;