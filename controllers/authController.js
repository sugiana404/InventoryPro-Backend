const { ValidationError } = require('sequelize');
const authService = require('../service/authService');

async function signup(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
        await authService.createUser(firstName, lastName, email, password);
        res.status(201).json({ message: 'User create succefully'});
    } catch (error) {
        if(error instanceof ValidationError) {
            res.status(400).json({ error: error.message});
        } else {
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = { signup };

