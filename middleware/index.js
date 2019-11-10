const   Todo            = require("../models/todo"),
        middlewareObj   = {};

middlewareObj.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "U moet ingelogd zijn om dit te doen.");
        res.redirect("/login");
    };
};

module.exports = middlewareObj;