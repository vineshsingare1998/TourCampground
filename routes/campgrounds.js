var express = require("express");
var router  = express.Router(); 
//var methodOverride = require("method-override");

var Campground          = require("../models/campground");
var middleware          = require("../middleware/index.js");

router.get("/",function(req,res){
	//GET ALL THE CAMPGROUNDS FROM DATABSE
	Campground.find({},function(err,allcampground){
    if(err)
		console.log(err);
		else{
         res.render("campgrounds/index",{campgrounds:allcampground, currentUser: req.user});
		}    // although here we dont have to pass currentUser as we are passing it through app.use in the beginning
	})

})

//CREATE ROUTE

router.post("/", middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;

	var author = {
		id: req.user._id,
		username: req.user.username
	}	

	var desc = req.body.description;	
	var newCampground = {name: name, price: price, image: image, description: desc, author: author};

		// console.log(req.user);
		// Create a campground and save to DB
	Campground.create(newCampground, function(err,newlyCreated){
	if(err)
		console.log(err);
		else
		res.redirect("/campgrounds");
		console.log(newlyCreated);
	})

})

router.get("/new", middleware.isLoggedIn ,function(req,res){
res.render("campgrounds/new");
})

//SHOW ROUTE- shows more info about one campground

router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err)
			console.log(err);
		else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})

})

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	// is user logged in 
			Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
		});
});

router.put("/:id", function(req, res){
	//find and update the correct campground
	// var data = {name: req.body.id, image: req.body.image, description: req.body.description};
	// we can pass this object DATA in the given below function.... instead we r passing req.body.campground and we have 
	// done enough changes in edit.ejs like.... name = campground[name]
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err)
			res.redirect("/campgrounds");
		else{
			res.redirect("/campgrounds/"+ req.params.id);
		}
	})
})

//Destroy Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err)
			res.redirect("/campgrounds");
		else
			res.redirect("/campgrounds");
	});
});


module.exports = router ; 