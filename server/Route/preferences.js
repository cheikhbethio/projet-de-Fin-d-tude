var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var preferencesSchema = new Schema({
	
	apropos: {
		title: String,
		content: String
	},

	site: {
		title: String,
		titlecolor: String,
		subtitle: String,
		subtitlecolor: String,
		backgroundcolor: String,
		bannercolor: String
	},

	links:[{
		text: String,
		url: String
	}]
});

var Preferences = mongoose.model('Preferences', preferencesSchema);

exports.preferences = Preferences;

preferencesSchema.pre("save", function(next) {
    var self = this;

    console.log("pre save: ");

    Preferences.find(function (err, pref) {
	  if (err) 
	  	return console.error(err);

	  if(pref.length > 0){
	  	var err = new Error('Not saving, preferences already set !');
  		next(err);
	  }
	  
	  next();

	});
});

var default_pref = new Preferences({

	"apropos": {
		"title": "A propos",
		"content": "Contenu du A propos"
	},

	"site": {
		"title": "Démo WordPress",
		"titlecolor": "#428bca",
		"subtitle": "Powered by Wordpress",
		"subtitlecolor": "#000000",

		"backgroundcolor": "#ffffff",
		"bannercolor": "#428bca"
	},

	"links": [{
		"text": "GitHub",
		"url": "https://github.com/"
	},

	{
		"text": "Twitter",
		"url": "https://twitter.com/"
	},

	{
		"text": "Facebook",
		"url": "https://facebook.com/"
	}]
	
});

default_pref.save(function (err, pref) {

	if (err) 
		return console.error(err);

	console.log("Saved: " + pref);

});


exports.get = function(req,res,next){

    Preferences.find(function (err, pref) {
	 	if (err) 
	 		return console.error(err);

	  	res.json(pref[0]);
	});
};

exports.edit = function(req,res,next){
	
	console.log("ID: " + req.body._id);
	console.log("Body: " + JSON.stringify(req.body.site));

	var site = req.body.site;
	var apropos = req.body.apropos;
	var links = req.body.links;

	Preferences.findByIdAndUpdate(req.body._id,  {site: site, apropos: apropos, links: links}, function(err, pref){
		if(err)
			console.log("Error !!");

		res.send(pref);
	});

	

};