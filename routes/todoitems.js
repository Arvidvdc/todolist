const express       = require("express"),
      router        = express.Router(),
      Todo          = require("../models/todo"),
      middleware    = require("../middleware"); 

// New
router.get("/new", middleware.isLoggedIn, (req,res)=> {
    res.render("todo/new");
});

// Create
router.post("/", middleware.isLoggedIn, (req,res)=> {
    let item        = req.body.item,
        priority    = req.body.priority,
        description = req.body.description,
        owner       = {id: req.user._id, username: req.user.username},
        newTodo= {item: item, priority: priority, description: description, owner: owner};
    Todo.create(newTodo, (err,newTodo)=>{
        if(err){
            req.flash("error", err.message);
        } else {
            req.flash("success", "New item added.");
            res.redirect("/");
        };
    });
});

// Edit
router.get("/:id/edit", middleware.isLoggedIn, (req,res)=>{
    Todo.findById(req.params.id, (err,item)=>{
        if(err){
            console.log(err);
        } else {
            res.render("todo/edit", {item: item});
        };
    });
});

// Update
router.put("/:id", middleware.isLoggedIn, (req,res)=> {
    Todo.findByIdAndUpdate(req.params.id, req.body.updateTodo,  (err)=>{
        if(err) {
            req.flash("error", err.message);
        } else {
            req.flash("success", "Item successfully edited.");
            res.redirect("/");
        };
    });
});

// Delete
router.get("/delete/:id", middleware.isLoggedIn, (req,res)=> {
    Todo.findById(req.params.id, (err,item)=>{
        if(err){
            req.flash("error", err.message);
        } else {
            res.render("todo/delete", {item: item});
        };
    });
});

// Destroy
router.delete("/:id", middleware.isLoggedIn, (req,res)=> {
    Todo.findByIdAndDelete(req.params.id, (err)=>{
        if(err) {
            req.flash("error", err.message);
        } else {
            req.flash("Success", "YES YES YES item deleted");
            res.redirect("/");
        };
    });
});

module.exports = router;