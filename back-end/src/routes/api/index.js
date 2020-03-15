const express = require('express');
const {requireAuth} = require('../../middlewares');
const router = express.Router();

router.get('/', requireAuth, function(req, res, next) {
    res.send({ title: 'Express' });
});

router.use('/users', require('./users'));

module.exports = router;