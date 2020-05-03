var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found")
				res.redirect("back")
			}
			else{
				// foundCampground.author.id --> its a mongoose object not a string
				// req.user._id ----> its a string..... so we cannot compare them by if statement
				// HERE MONGOOSE GIVES US A FUNCTIONALITY....... equal() function
				
				// does user own the campground ?
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error", "you dont have the permission to do that");
					res.redirect("back");
				}
			}
		})
	}
	else{
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err)
				res.redirect("back")
			else{
				// foundCampground.author.id --> its a mongoose object not a string
				// req.user._id ----> its a string..... so we cannot compare them by if statement
				// HERE MONGOOSE GIVES US A FUNCTIONALITY....... equal() function
				
				// does user own the comment?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		})
	}
	else{
		res.redirect("back");
	}
	
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "please login first !");
	res.redirect("/login");
}

module.exports = middlewareObj;