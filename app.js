const   express         = require("express"),
        app             = express(),
        bodyParser      = require("body-parser"),
        seedDB          = require("./seeds"),
        Todo            = require("./models/todo"),
        User            = require("./models/user"),
        flash           = require("connect-flash"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        mongoose        = require("mongoose"),
		methodOverride  = require("method-override");

const   indexRoutes     = require("./routes/index"),
        todoRoutes      = require("./routes/todoitems");

// Express variables
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport Configuration
app.use(require("express-session")({
    secret: "Firebase 937",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Database connection
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true});

// Filling database
// seedDB();

//Eigen middleware
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Routes
app.use(indexRoutes);
app.use(todoRoutes);

app.get("/*", (req,res)=>{
    res.render("404");
});

// listener
app.listen(3001, ()=>console.log("ToDo started on port 3001"));