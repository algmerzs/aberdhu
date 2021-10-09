module.exports = {
    isLoggedIn(req, res, next){
        if (req.session.user){
            return next();
        }
        return res.redirect("/login");
    },

    isNotLoggedIn(req, res, next){
        if (!req.session.user){
            return next();
        }
        return res.redirect("/");
    }

};