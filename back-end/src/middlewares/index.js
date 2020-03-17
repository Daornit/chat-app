const passport = require('passport');

module.exports = {
    requireAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
          return next();
        }
        return res.send(401);
    },

    authenticate: (req, res, next) => {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }

        //authentication error
        if (!user) { 
          res.status(401);
          return res.json({error: info.message || 'Invalid nick name or password!'}) 
        }

        //success 
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return next();
        });
      })(req, res, next)
    }
} 
