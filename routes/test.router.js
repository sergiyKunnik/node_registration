const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chek-auth');

router.get('/first', checkAuth, (req, res, next) => {
    return res.status(200).json({
        message: 'Hello first. Protected :)'
    })
});

router.get('/second', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello second'
    })
});

module.exports = router;