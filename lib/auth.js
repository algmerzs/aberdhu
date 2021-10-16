// proteger rutas
module.exports = {
    isLoggedIn(req, res, next) {
        if (req.session.user) {
            return next();
        }
        return res.redirect("/");
    },

    isNotLoggedIn(req, res, next) {
        if (!req.session.user) {
            return next();
        }
        return res.redirect("/");
    }

};