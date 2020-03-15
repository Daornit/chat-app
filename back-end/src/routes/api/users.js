const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const Users = mongoose.model('Users');
const { requireAuth } = require('../../middlewares')

//POST new user route (optional, everyone has access)
router.post('/', (req, res, next) => {
    const { body: { user } } = req;
  
    if(!user.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }
  
    if(!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
    user.avatar = '/images/profile.png';
    user.friends = [];

    console.log("user :: ", user);
    const finalUser = new Users(user);
    finalUser.setPassword(user.password);

    return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() })).catch(err => {
        res.status(500);
        res.send(err);
      });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/api/users/login' }), (req, res, next) => {
    return Users.findById(req.session.passport.user)
        .then((user) => {
            return res.json(user.toAuthJSON());
        });
});

//GET current route (required, only authenticated users have access)
router.get('/current', requireAuth, (req, res, next) => {
    console.log(req.sessionID)
    return Users.findById(req.session.passport.user)
        .then((user) => {
            return res.json({ user: user.toAuthJSON() });
        });
});

module.exports = router;