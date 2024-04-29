// Global Import
const express = require('express')

// Local Import
const sequelize = require('./db/db');

// Routes
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");

// Intialize DB
async function initializeDatabase() {
    try {
        await sequelize.sync({alter:true});
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

initializeDatabase();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/product', productRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})