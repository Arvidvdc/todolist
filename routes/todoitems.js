const express       = require("express"),
      router        = express.Router(),
      Todo          = require("../models/todo");

// New
router.get("/new", (req,res)=> {
    res.render("todo/new");
});

// Create
router.post("/", (req,res)=> {
    Todo.create(req.body.newTodo, (err,newTodo)=>{
        if(err){
            console.log("Create Todo error: " + err);
        } else {
            res.redirect("/");
        };
    });
});

// Edit
router.get("/:id/edit", (req,res)=>{
    Todo.findById(req.params.id, (err,item)=>{
        if(err){
            console.log("Find ID to edit error: " + err);
        } else {
            res.render("todo/edit", {item: item});
        };
    });
});

// Update
router.put("/:id", (req,res)=> {
    Todo.findByIdAndUpdate(req.params.id, req.body.updateTodo,  (err,updatedItem)=>{
        if(err) {
            console.log("Update Todo error" + err);
        } else {
            res.redirect("/");
        };
    });
});

// Delete
router.get("/delete/:id", (req,res)=> {
    Todo.findById(req.params.id, (err,item)=>{
        if(err){
            console.log("Find ID to delete error: " + err);
        } else {
            res.render("todo/delete", {item: item});
        };
    });
});

router.delete("/:id", (req,res)=> {
    Todo.findByIdAndDelete(req.params.id, (err,deletedItem)=>{
        if(err) {
            console.log("Delete Todo error" + err);
        } else {
            res.redirect("/");
        };
    });
});

module.exports = router;