module.exports = {
    requireAuth: (req, res, next) => {
        if(req.isAuthenticated()) {
          return next();
        }
        return res.send(401);
    }
} 