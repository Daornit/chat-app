const mongoose = require('mongoose');
const router = require('express').Router();
const Users = mongoose.model('Users');
const { requireAuth, authenticate } = require('../../middlewares')

router.post('/', (req, res, next) => {
    const { body: { user } } = req;
  
    if(!user.nickName) {
      return res.status(422).json({
        errors: {
          nickName: 'is required',
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

router.post('/login', authenticate, (req, res, next) => {
    return Users.findById(req.session.passport.user)
        .then((user) => {
            return res.json(user.toAuthJSON());
        });
});

router.get('/current', requireAuth, (req, res, next) => {
    console.log(req.sessionID)
    return Users.findById(req.session.passport.user)
        .then((user) => {
            return res.json({ user: user.toAuthJSON() });
        });
});

router.get('/logout', function(req, res){
  console.log("Logout is called")
  req.logout();
  res.redirect('/');
});
module.exports = router;