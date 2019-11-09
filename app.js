const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        seedDB          = require("./seeds"),
        Todo            = require("./models/todo.js"),
        mongoose        = require("mongoose"),
		methodOverride  = require("method-override");

const   indexRoutes     = require("./routes/index"),
        todoRoutes      = require("./routes/todoitems");

// Express variables
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Database connection
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true});

// Filling database
// seedDB();

// Routes
app.use(indexRoutes);
app.use(todoRoutes);

// listener
app.listen(3001, ()=>console.log("ToDo started on port 3001"));