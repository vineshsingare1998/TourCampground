var express = require("express");
var router  = express.Router({mergeParams: true});


var Campground          = require("../models/campground"),
	Comment             = require("../models/comment");
var middleware          = require("../middleware/index.js");

// Adding a new comment- form

router.get("/new", middleware.isLoggedIn, function(req, res){
	//find campground by Id
	Campground.findById(req.params.id, function(err, campground){
		if(err)
			console.log(err);
		else
			res.render("comments/new", {campground: campground});
	})
})
// posting a new comment

router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){    // here console.log(req.params.id) will return NULL
		if(err){  
			 req.flash("error", "oops!! Something went wrong")      // means we cannot add new comment after routing app.js
			console.log(err);                                        // we untill we add {mergeParams: true}... see above
		    res.redirect("/campgrounds"); 
		}
		else{
			Comment.create(req.body.comment, function(err, comment){      //re.body.comment is an object and has both the
				                                                         // property of text and author inherently
				if(err)
					console.log(err);
				else{
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					// add username and id to comment
					// console.log("new username will be "+ req.user.username);
					comment.save();
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success", "successfully added comment");
					res.redirect("/campgrounds/"+ campground._id);
				}
			})
		}
			
	})
})
//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err)
			res.redirect("back");
		else
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
	})
	
})

//COMMENT UPDATE
router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err)
			res.redirect("back");
		else
			res.redirect("/campgrounds/" + req.params.id);
	})
})

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err)
			res.redirect("back");
		else{
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
			
	})
})




module.exports = router ; 