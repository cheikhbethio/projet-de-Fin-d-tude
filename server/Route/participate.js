var user=require('./user.js');
var mongoose=require('mongoose')
var modelUser=user.users;
var com=require('./commentaire.js');
var modelCom=com.commentaire; 
var art=require('./article.js');
var modelArticle=art.articles;
var page=require('./page.js');
var modelPage=page.Page;


//get nomber of admin
exports.getNbAdmin = function(req, res, next) {
	modelUser.find({right : 3},function(err, doc){
		if (err) {
			console.log("erreur de document !!");
			return next(err);
		} else{
			if (doc == null) {
				console.log("document introuvable dans la collection");
				return next();
			} else{
				console.log("document retrouvé avec succès !!!!"+ doc.length);
				res.json({res : doc.length});
			};
		};
	});
};


//get nomber of admin
exports.getNbModerator = function(req, res, next) {
	modelUser.find({right : 2},function(err, doc){
		if (err) {
			console.log("erreur de document !!");
			return next(err);
		} else{
			if (doc == null) {
				console.log("document introuvable dans la collection");
				return next();
			} else{
				console.log("document retrouvé avec succès !!!!"+ doc.length);
				res.json({res : doc.length});
			};
		};
	});
};

//get nomber of writer
exports.getNbWriter = function(req, res, next) {
	modelUser.find({right : 1},function(err, doc){
		if (err) {
			console.log("erreur de document !!");
			return next(err);
		} else{
			if (doc == null) {
				console.log("document introuvable dans la collection");
				return next();
			} else{
				console.log("document retrouvé avec succès !!!!"+ doc.length);
				res.json({res : doc.length});
			};
		};
	});
};

//get nomber of member
exports.getNbMember = function(req, res, next) {
	modelUser.find({right : 0},function(err, doc){
		if (err) {
			console.log("erreur de document !!");
			return next(err);
		} else{
			if (doc == null) {
				console.log("document introuvable dans la collection");
				return next();
			} else{
				console.log("document retrouvé avec succès !!!!"+ doc.length);
				res.json({res : doc.length});
			};
		};
	});
};

//get nomber of comment
exports.getNbComment = function(req, res, next) {
	modelCom.find({},function(err, doc){
		if (err) {
			console.log("erreur de document !!");
			return next(err);
		} else{
			if (doc == null) {
				console.log("document introuvable dans la collection");
				return next();
			} else{
				console.log("document commentaire retrouvé avec succès !!!!"+ doc.length);
				res.json({res : doc.length});
			};
		};
	});
};

//get nomber of article
exports.getNbArticle = function(req, res, next) {
	modelArticle.find({},function(err, doc){
		if (err) {
			console.log("erreur de document !!");
			return next(err);
		} else{
			if (doc == null) {
				console.log("document introuvable dans la collection");
				return next();
			} else{
				console.log("document articles retrouvé avec succès !!!!"+ doc.length);
				res.json({res : doc.length});
			};
		};
	});
};

//get nomber of page
exports.getNbPage = function(req, res, next) {
	modelPage.find({},function(err, doc){
		if (err) {
			console.log("erreur de document !!");
			return next(err);
		} else{
			if (doc == null) {
				console.log("document introuvable dans la collection");
				return next();
			} else{
				console.log("document articles retrouvé avec succès !!!!"+ doc.length);
				res.json({res : doc.length});
			};
		};
	});
};