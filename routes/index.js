const express       = require("express"),
      router        = express.Router(),
      Todo          = require("../models/todo"),
      passport      = require("passport"),
      User          = require("../models/user");

// Index
router.get("/", isLoggedIn, (req,res)=>{
    Todo.find({}).sort("priority").exec((err,todos)=> {
        if(err) {
            console.log("Route '/' error: " + err)
        } else {
            res.render("home", { todos: todos });
        };
    });
});

// Register routes
router.get("/register", (req,res)=> {
    res.render("Register");
});

router.post("/register", (req,res)=> {
    let newUser = new User({username: req.body.username, email: req.body.email, role: req.body.role});
    User.register(newUser, req.body.password , (err, user)=>{
        if(err) {
            console.log(err);
            return res.render("Register")
        } else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/");
            });
        };
    });
});

// Log in route
router.get("/login", (req,res)=> {
    res.render("Login")
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/", 
    failureRedirect: "/register"
}), (req,res)=> {
       
});

// Loguit route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/login");
 });

// Custom middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You have to be logged in.");
        res.redirect("/login");
    };
};

module.exports = router;