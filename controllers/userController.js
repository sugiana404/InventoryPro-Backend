const {
    QueryListOfUsers,
    QueryUserById,
    DeleteUserById,
} = require("../service/userService.js")

const GetAllUsers = (req,res) => {
    QueryListOfUsers();
    console.log(process.env.DB_USER)
    return res.json({"status": 200})
}

const GetUser = (req,res) => {
    const userId = req.params.id;
    const user = QueryUserById(userId);
    return res.json(user);
}

const DeleteUser = (req,res) => {
    const userId = req.params.id;
    const user = DeleteUserById(userId);
    return res.json(user);
}

module.exports = {
    GetAllUsers,
    GetUser,
    DeleteUser,
}