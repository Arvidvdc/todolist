const express       = require("express"),
      router        = express.Router(),
      Todo          = require("../models/todo"),
      passport      = require("passport"),
      User          = require("../models/user");

// Index
router.get("/", (req,res)=>{
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
    res.send("Login route")
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/", 
    failureRedirect: "/register"
}), (req,res)=> {
       
});

// Loguit route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/404");
 });

module.exports = router;