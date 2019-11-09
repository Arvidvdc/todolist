const express       = require("express"),
      router        = express.Router(),
      Todo          = require("../models/todo");

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

router.get("*", (req,res)=>{
    res.render("404");
});

module.exports = router;