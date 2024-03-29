const express       = require("express"),
      router        = express.Router(),
      Todo          = require("../models/todo"),
      passport      = require("passport"),
      User          = require("../models/user"),
      middleware    = require("../middleware"); 

// Index
router.get("/", middleware.isLoggedIn, (req,res)=>{
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
    res.render("register");
});

router.post("/register", (req,res)=> {
    let newUser = new User({username: req.body.username, email: req.body.email, role: req.body.role});
    User.register(newUser, req.body.password , (err, user)=>{
        if(err) {
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success", "Welcome " + user.username + " Let's get things done");
            res.redirect("/");
        });
    });
});

// Log in route
router.get("/login", (req,res)=> {
    res.render("login")
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

module.exports = router;