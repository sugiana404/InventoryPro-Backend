const express = require("express")
const app = express();
const port = process.env.PORT || 3000

const sequelize = require('./db/db');
const User = require('./models/userModel');

async function initializeDatabase() {
    try {
        await sequelize.sync({alter:false});
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

initializeDatabase();

const userRoutes = require("./routes/userRoutes");
app.use("/api/user",userRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})