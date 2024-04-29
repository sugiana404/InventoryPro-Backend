const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/jwtMiddleware');

router.get('/products', authenticateToken, (req,res) => {
    res.json({message: 'product data:'});
})

module.exports = router;