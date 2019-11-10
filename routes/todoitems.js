const express       = require("express"),
      router        = express.Router(),
      Todo          = require("../models/todo");

// New
router.get("/new", isLoggedIn, (req,res)=> {
    res.render("todo/new");
});

// Create
router.post("/", isLoggedIn, (req,res)=> {
    let item        = req.body.item,
        priority    = req.body.priority,
        description = req.body.description,
        owner       = {id: req.user._id, username: req.user.username},
        newTodo= {item: item, priority: priority, description: description, owner: owner};
    Todo.create(newTodo, (err,newTodo)=>{
        if(err){
            console.log("Create Todo error: " + err);
        } else {
            res.redirect("/");
        };
    });
});

// Edit
router.get("/:id/edit", isLoggedIn, (req,res)=>{
    Todo.findById(req.params.id, (err,item)=>{
        if(err){
            console.log("Find ID to edit error: " + err);
        } else {
            res.render("todo/edit", {item: item});
        };
    });
});

// Update
router.put("/:id", isLoggedIn, (req,res)=> {
    Todo.findByIdAndUpdate(req.params.id, req.body.updateTodo,  (err,updatedItem)=>{
        if(err) {
            console.log("Update Todo error" + err);
        } else {
            res.redirect("/");
        };
    });
});

// Delete
router.get("/delete/:id", isLoggedIn, (req,res)=> {
    Todo.findById(req.params.id, (err,item)=>{
        if(err){
            console.log("Find ID to delete error: " + err);
        } else {
            res.render("todo/delete", {item: item});
        };
    });
});

router.delete("/:id", isLoggedIn, (req,res)=> {
    Todo.findByIdAndDelete(req.params.id, (err,deletedItem)=>{
        if(err) {
            console.log("Delete Todo error" + err);
        } else {
            res.redirect("/");
        };
    });
});

// Custom middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login");
    };
};

module.exports = router;