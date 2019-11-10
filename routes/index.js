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
    res.send("Register route");
});

router.post("/register", (req,res)=> {
    res.send("Register Post-route")
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