const {USER_MODEL} = require("../models/userModel");

const QueryUserById = (id) => {
    let user;
    USER_MODEL.forEach((userData) => {
        if(userData.id === Number(id)) {
            user = userData
        }
    });
    return user;
}

const QueryListOfUsers = () => {
    return USER_MODEL;
}

const DeleteUserById = (id) => {
    USER_MODEL.filter((user) => {
        return user.id !== Number(id);
    })
}

module.exports = {
    QueryUserById,
    QueryListOfUsers,
    DeleteUserById,
}