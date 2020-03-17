const express = require('express');
const router = express.Router();
/* GET home page. */

router.use('/api', require('./api'));
router.get('/', (req, res) => {
    res.send({hello: 'author of this site is daornit.'})
});
module.exports = router;
