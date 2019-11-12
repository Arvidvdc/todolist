const   Todo            = require("../models/todo"),
        middlewareObj   = {};

middlewareObj.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please login");
        res.redirect("/login");
    };
};

module.exports = middlewareObj;