const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const User = mongoose.model('User');

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
  
    const finalUser = new User(user);
  
    finalUser.setPassword(user.password);

    return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/api/users/login' }), (req, res, next) => {
    const { body: { user } } = req;
    console.log('You are logged in!', user);
    res.send(user);
});

//GET current route (required, only authenticated users have access)
router.get('/current', (req, res, next) => {
    console.log(req.session);
    if (req.isAuthenticated()) {
        return User.findById(req.session.passport.user)
            .then((user) => {
                if(!user) {
                return res.sendStatus(400);
                }
                return res.json({ user: user.toAuthJSON() });
            });
    } else {
        res.send('<h1>You are not authenticated</h1>');
    }
  });

module.exports = router;