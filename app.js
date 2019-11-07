const   express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        seedDB      = require("./seeds"),
        Todo        = require("./models/todo.js"),
        mongoose    = require("mongoose");

// Express variables
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Database connection
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true});

// Filling database
// seedDB();

// Routes
// Index
app.get("/", (req,res)=>{
    Todo.find({}).sort("priority").exec((err,todos)=> {
        if(err) {
            console.log("Route '/' error: " +err)
        } else {
            res.render("home", { todos: todos });
        };
    });
});

// New
app.get("/new", (req,res)=>{
    res.render("new");
});

// Create
app.post("/", (req,res)=>{
    Todo.create(req.body.newTodo, (err,newTodo)=>{
        if(err){
            console.log("Create Todo error: " +err);
        } else {
            res.redirect("/");
        };
    });
});

// listener
app.listen(3000, ()=>console.log("ToDo started on port 3000"));