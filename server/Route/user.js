var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var article=require('./article.js')


var Schema = mongoose.Schema;

var userSchema = Schema({
    login		: String,
    password	: String,
    firstname	: String,
    lastname	: String,
    email	  	: String,
    token   	: String,
    favorite	: [{type: Schema.Types.ObjectId, ref:'Article'}],
    right		: Number,
    picture     : String
});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var user = mongoose.model('user', userSchema);

module.exports.users=user;

user.findOne({right:3},function(err,doc){
    if(err) next(err);
    else if (!doc){
        var admin = new user({
            'login' : 'admin' ,
            'password' : bcrypt.hashSync('admin', bcrypt.genSaltSync(8), null),
            'firstname' : 'admin',
            'lastname' : 'admin',
            'email'	: 'admin@admin.com',
            'right' : 3,
            'picture': ''
            })
        admin.save(function(err,doc){
            //if(err) next(err);
            //else console.log("account admin created")
        })
    }
    else{
        console.log("[admin account already created]")
    }
});

userSchema.pre("save", function(next) {
    var self = this;
    user.findOne({email : this.email}, 'email', function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            self.invalidate("email", "Email must be unique");
            next(new Error("1"));
        } else {
            next();
        }
    });
});

userSchema.pre("save", function(next) {
    var self = this;
    user.findOne({login : this.login}, 'login', function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            self.invalidate("login", "Login must be unique");
            next(new Error("2"));
        } else {
            next();
        }
    });

});

exports.create=function (req, res , next) {

    var newUser = new user();

    newUser.login=req.body.login;
    newUser.password=bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    newUser.firstname=req.body.firstname;
   	newUser.lastname=req.body.lastname;
	newUser.email=req.body.email;    
    newUser.right=0;
    newUser.picture="";

    newUser.save(function(err, results){
        if (err) {
            res.sendStatus(401,{error : err.message});
        }
        else
            res.send({error : 0, result : results});
    });
};

var callback = function(err, numAffected){
};

exports.edit = function (req, res , next) {

    var query= ({_id : req.params.id});
    var maj={};
    
    user.findById(req.params.id, function(error,result){
        if(error) next(error);
        else if(result==null){
            console.log("user not found when editing");
            res.sendStatus(404, {error : "0"});
            next();
        }
        else
            user.findOne({email : req.body.email}, function(errt, doc) {
                if(errt) next(errt);
                else{
                    console.log("req",req.body);
                    console.log("doca",doc);
                    if(result.email!=req.body.email){
                        if(doc) {
                            console.log("email already use");
                            res.sendStatus(401,{error : "1"});                            
                            return next();
                        }}

                        if(req.body.email!=null)
                            maj.email=req.body.email;

                        if(req.body.password!=null && req.body.password == result.password)
                            maj.password=req.body.password;
                        else if(req.body.password!=null && req.body.password != result.password)
                             maj.password=bcrypt.hashSync(req.body.password, 8);

                        if(req.body.firstname!=null)
                            maj.firstname=req.body.firstname;

                        if(req.body.lastname!=null)
                            maj.lastname=req.body.lastname;

                        if(req.body.picture!=null)
                            maj.picture=req.body.picture;

                        user.update(query, maj,function(errs,n){
                            if(errs){
                                console.log("error when update user");
                                next(errs);
                            }
                            else
                                res.send({error : "0", numAffected : n, result : maj});
                                next();
                            });
                    }
                });
            });
    

};

exports.get = function(req,res,next){
        var id = req.params.id;
        user.findById(id, function(err,result){
            if(err) return next(err);
            else
                res.json(result);
        });
    };

exports.view = function (req, res ,next) {
    user.find().select('login firstname lastname right').exec(function (err, result) {
        if (!err) {
            return res.send(result);
        } else {
            console.log(err);
            next(err);
        }
    });
};


exports.addFavorite = function(req,res,next){
	var tmp = req.params; 
	var query= ({_id : tmp.id_user});
 	var maj={};
 	var ishere = false;
    console.log("id_user suivi du id_article : ");
    console.log(tmp.id_user);
    console.log(tmp.id_art);

    user.findById(tmp.id_user,function(err,doc){
        if(err) return next(err);
	    maj.login =	doc.login;
	    maj.password =	doc.password;
	    maj.firstname =	doc.firstname;
	    maj.lastname =	doc.lastname;
	    maj.email =	doc.email;
	    //maj.token  = doc.token	;
	    maj.favorite =	doc.favorite;
	    maj.right =	doc.right;
        maj.picture = doc.picture;
	    here = isFavorite(maj.favorite, tmp.id_art);
	    console.log(here);
	    if(tmp.id_art != null && !here){     	
	        maj.favorite.push(tmp.id_art);
	        console.log(maj);
	        user.update(query, maj, function(err,result){
	               if(err){
	                  return next(err);
	               } else {
	               		console.log('favorite is added');
	                   res.json(result);
	                }
	       });
	    }
    });

};


exports.delFavorite = function(req,res,next){
	var tmp = req.params; 
	var query= ({_id : tmp.id_user});
 	var maj={};

    console.log("id_user suivi du id_article : ");
    console.log(tmp.id_user);
    console.log(tmp.id_art);

    user.findById(tmp.id_user,function(err,doc){
        if(err || !doc) return next(err);

	    maj.login =	doc.login;
	    maj.password =	doc.password;
	    maj.firstname =	doc.firstname;
	    maj.lastname =	doc.lastname;
	    maj.email =	doc.email;
	    //maj.token  = doc.token	;
	    maj.favorite =	doc.favorite;
	    maj.right =	doc.right;
	    here = isFavorite(maj.favorite, tmp.id_art);
	    console.log(here);

        if(tmp.id_art != null && here){
			maj.favorite.splice(maj.favorite.indexOf(tmp.id_art),1);
	        console.log(maj);
	        user.update(query, maj, function(err,result){
	            if(err){
	                return next(err);
	            } else {
	               		console.log('favorite is deleted');
	                res.json(result);
	            }
	            
	       });
        } 
      });
};

exports.remove = function(req, res,next){
	var tmp = req.params; 
 	user.findById(tmp.id, function(err,doc){
        if(err || !doc) return next(err);
        doc.remove();
        res.json(doc);

 	});

};

isFavorite =function(tab, param1){
 	var ishere = false;
            for (var i = 0; i < tab.length; i++) {
            	if(tab[i]== param1){
            		console.log('deja présent dans les favoris');
            		return true;
            		break;
            	}
            };
            console.log('non présent dans les favoris');
            return false;
};

exports.profile=function(req,res,next){
    var id = req.params.id;
        user.findById(id, 'firstname lastname right email', function(err,result){
            if(err) return next(err);
            else
                res.json(result);
        });

};

exports.right=function(req,res,next){
    var query= ({_id : req.params.id});
    var maj={};
    if(req.body.right!=null){
        maj.right=req.body.right;
    }
    user.update(query,maj,function(errs,n){
                            if(errs){
                                console.log("error when update user");
                                next(errs);
                            }
                            else{
                                res.send({error : "0", numAffected : n, result : maj});
                                next();
                            }

	})
}

exports.getFavorite=function(req, res, next){
	var tmp = req.params
	user.findById(tmp.id).populate('favorite').exec(function(err,doc){
		if (err) {
			console.log('erreur bd pour get favorite dun user');
			return next(err);
		}
		if (doc == null) {
			console.log("doc  abscent dans la collection");
		} else{
			console.log("doc retrouvé de la collection" + doc.favorite);
			
			user.populate(doc,{
            path: 'favorite.author',
            select: 'firstname lastname',
            model: 'user'
          },function(err,doc){
            if(err) return next(err);
            res.json(doc.favorite);
          });

		};
	});
};

