const bcrypt = require('bcrypt');
const User = require('../models/userModel');


async function createUser(firstName, lastName, email, password) {
    const hashedPassword = await bcrypt.hash(password,10);
    return User.create({firstName, lastName, email, password:hashedPassword});
}

async function validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
}

module.exports = { createUser, validatePassword};