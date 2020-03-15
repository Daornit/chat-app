const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middlewares');
/* GET home page. */

router.use('/api', require('./api'));
router.get('/', (req, res) => {
    res.send({hello: 'author of this site is batorgil.'})
});
module.exports = router;
