var express = require("express");
var router  = express.Router();

var passport  = require("passport");
var User       = require("../models/user");

//Root route

router.get("/", function(req,res){
res.render("landing");
});

		
router.get("/register",function(req, res){
	res.render("register");
})		

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
		    return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			req.flash("success", "Welcome to the Yelpcamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// ======================
//  login Route........
// ======================	
router.get("/login", function(req, res){
	res.render("login");
});

// ======================
// router.get("/login", middleware, callback)
// ======================	

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds", 
		failureRedirect: "/login"
	}), function(req, res){
	
});

//LOGOUT ROUTES
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged out succesfully !!");
	res.redirect("/campgrounds");
})

//Middle ware


module.exports = router ; 