var mongoose = require('mongoose');
var user = require('./user.js');
var article = require('./article.js');
var Schema = mongoose.Schema;

var FavorisSchema = new mongoose.Schema({
  title : String,
  author : {type : Schema.Types.ObjectId, ref:'user'},
  article : {type : Schema.Types.ObjectId, ref:'Article'},
});

var Favoris = mongoose.model('Favoris',FavorisSchema);

exports.favoris=Favoris;

exports.create = function(req,res,next){  
	var art=req.body
	console.log(" element par element "+art._id, art.title, art.author);                        
	var favorisObj = {article : art._id, title: art.title, author: art.author._id};
	var model = new Favoris(favorisObj);
	
	Favoris.findOne({article: art._id},function(err,doc){
	    if(err) next(err);
	    else if (!doc){
			model.save(function(err,doc){
			 if(err || !doc){
			      return next(err);
			  }else{
			  		article.updateFavoris(art._id);
			        res.json(doc);
			    }
			})
		}else{
			console.log('this article is already favorite');
			article.updateFavoris(art._id);
			res.json(doc);			
			next();
		}
	})
};


exports.get = function(req,res,next){
    Favoris.findById(req.params.id).populate('article').exec(function(err,result){
        if(err){
          return next(err);
        }else {
          res.json(result);
        }
    });
}; 
exports.view = function(req,res,next){
  Favoris.find({author :req.params.id}).populate('article').exec(function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.json(result);
        }
    });

};



exports.deleteFavoris = function(req,res,next){
    Favoris.findById(req.params.id, function(err,doc){
        if(err || !doc) return next(err);
        doc.remove();
        res.json(doc);
     });
 
};




exports.getNbFavoris = function(req,res,next){   
  Favoris.find({author : req.params.id} ,(function(err,result){
        if(err){
            return next(err);
        }else {
          console.log('this is our test Favoriss acount .............. '+ result.length);
            var resultat =  result.length
            console.log(resultat);
            res.json(resultat);
          }
    }));
}