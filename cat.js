var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true});


var catSchema = new mongoose.Schema({
	name : String,
	age:Number,
	nature:String
});

var Cat = mongoose.model("Cat",catSchema);

Cat.create({
	name:"fluffy",
	age:12,
	nature:"sweet"
},function(err,cat){
	if(err){
		console.log(err);
	}
	else{
		console.log(cat);
	}
});

Cat.find({},function(err,cat){
	if(err){
		console.log(err);
		console.log("something went wrong");
	}
	else{
		console.log(cat);
	}
});

