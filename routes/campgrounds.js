var express = require("express");
var router  = express.Router();
var Campgrounds = require("../models/campgrounds");
var middleware = require("../middleware");

// caampground page
router.get("/",function(req,res){
	Campgrounds.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});
		}
	});

})

// create new campgrounds result

router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var price = req.body.price;
	var img = req.body.image;
	var des = req.body.description;
	 var author = {
        id: req.user._id,
        username: req.user.username
    }
	var obj = {name:name,price:price,image:img,description:des,author:author};
	Campgrounds.create(obj,function(err,campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");	
		}
	});
	
	
});

// create new campgrounds form

router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");	
});

// show page for seprate campgrounds

router.get("/:id",function(req,res){
	Campgrounds.findById(req.params.id).populate("comments").exec(function(err,aboutCamp){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show",{campground:aboutCamp});
		}
	});
});

// edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campgrounds.findById(req.params.id,function(err,foundCampground){
	
			res.render("campgrounds/edit",{campground:foundCampground});
		
	});
	
});

// put request
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	
	Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// campground delete

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campgrounds.findByIdAndRemove(req.params.id,req.body.campground,function(err,deleteCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});



module.exports = router;