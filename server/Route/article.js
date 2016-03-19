var mongoose = require('mongoose');
var user = require('./user.js');
var Schema = mongoose.Schema;

var ArticleSchema = new mongoose.Schema({
                     title : String,
                     author : {type : Schema.Types.ObjectId, ref:'user'},
                     date : Date,
                     ispublic : Boolean,
                     content : String,
                     keywords : [String],
                     nbrComment: Number,
                     isFavorite: Boolean
});

var Article = mongoose.model('Article',ArticleSchema);

exports.articles=Article;

exports.create = function(req,res,next){                           
	var articleObj = {title: req.body.title, author: req.body.author, date: req.body.date, ispublic: req.body.ispublic, content:req.body.content, keywords: req.body.keywords, nbrComment :0, isFavorite:false};
	var model = new Article(articleObj);
	model.save(function(err,doc){
	 if(err || !doc){
	      return next(err);
	  }else{
	       res.json(doc);
	    }
	});
               
};

exports.get = function(req,res,next){
    Article.findById(req.params.id).populate('author','firstname lastname').exec(function(err,result){
        if(err){
          return next(err);
        }else {
          res.json(result);
        }
    });
}; 

exports.updateNbrComment = function(id,res,next){
	console.log(id);
    Article.findById(id, function(err,doc){
        if(err || !doc){
          return next(err);
        }else {
        	var tempo = doc.nbrComment;
        	doc.nbrComment = tempo+1;
        	console.log(doc.nbrComment);
	        doc.save(function(err,result){
	            if(err || !result){
	            	 console.log('erreur sur le update de nb comment');
	                //return next(err);
	            } else {
	            	 console.log('succès sur le update de nb comment');
	                //res.json(result); 
	            } 
	        });
        }
    });
}; 
   
exports.updateFavoris = function(id){
	console.log(id);
    Article.findById(id, function(err,doc){
        if(err || !doc){
         	console.log('erreur, doc introuvable pour le update du favoris ');
        }else {
        	var tempo = doc.isFavorite;
        	doc.isFavorite = !tempo;
        	console.log(doc.isFavorite);
	        doc.save(function(err,result){
	            if(err || !result){
	            	 console.log('erreur sur le update du favoris ');
	            } else {
	            	 console.log('succès sur le update du favoris');
	            } 
	        });
        }
    });
}; 

exports.getByEditor = function(req,res,next){
	    Article.find({author : req.params.id}).populate('author','firstname lastname').exec(function(err,result){
	    	if(err){
	        	return next(err);
	       	}else {
	        	res.json(result);
	        }
	});	
};

exports.searchByKeyWord = function(req,res,next){
      Article.find({keywords : req.query.keyword}).populate('author','firstname lastname').exec(function(err,result){
        if(err){
            return next(err);
          }else {
            res.json(result);
          }
  });  
};


exports.view = function(req,res,next){
  Article.find().populate('author','firstname lastname').exec((function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.json(result);
        }
    }));

};

exports.edit = function(req,res,next){
    Article.findById(req.params.id,function(err,doc){
    
        if(err || !doc) return next(err);

        if(req.body.title != null ) 
            doc.title = req.body.title;

        if(req.body.content != null)
            doc.content = req.body.content;

        if(req.body.author != null)
            doc.author = req.body.author._id;

        if(req.body.keywords != null)
            doc.keywords = req.body.keywords;

        if(req.body.ispublic != null)
            doc.ispublic = req.body.ispublic;

        if(req.body.date != null)
            doc.date = req.body.date;

        doc.save(function(err,result){
            if(err || !doc){
                return next(err);
            } else {
                res.json(result);
            }
        });
  });
};

exports.deleteArticle = function(req,res,next){
    Article.findById(req.params.id, function(err,doc){
        if(err || !doc) return next(err);
        doc.remove();
        res.json(doc);
     });
 
};

exports.getLastArticles = function(req,res,next){

    Article.find({ $query:{}, $orderby:{date : -1}}).populate('author').limit(3).exec(function(err,results){
              if(err){
                 return next(err)
               } else{
                      res.json(results);
               }

    });

};


exports.getNbArticle = function(req,res,next){   
  Article.find({author : req.params.id} ,(function(err,result){
        if(err){
            return next(err);
        }else {
          console.log('this is our test articles acount .............. '+ result.length);
            var resultat =  result.length
            console.log(resultat);
            res.json({aaa : resultat});
          }
    }));
}
