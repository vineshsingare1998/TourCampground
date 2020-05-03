var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
	flash          = require("connect-flash"),
	passport       = require("passport"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
	Comment        = require("./models/comment"),
	User           = require("./models/user"),
	seedDB         = require("./seeds");


var commentRoutes  	 = require("./routes/comments"),       //requiring the Routes .... see below for app.use
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);

 //seedDB();   //seed the database


 //mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connect("mongodb+srv://vineshsingare:vineshsingare1998@cluster0-njls3.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, 																										useUnifiedTopology: true, 																									useCreateIndex: true}).then(() =>{
// 	console.log("connected to database");
// }).catch(err => {
// 	console.log("ERROR", err.message);
// });


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));          //__dirname displays the current directory
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret: "again vinesh singare is going to be the star of next time",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){          //this will pass the currentUser to every single route
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);         //just to reduce the duplicacy of "/campgrounds" while writing the routes
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT||3000, process.env.IP, function(){
console.log("server has started");
});