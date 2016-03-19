var user = require('./user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose')

var modelUser = user.users;

var secret_Token = "testsecret";


exports.gettoken=function(req,res,next){

	var login = req.body.login;
	var password = req.body.password;

	modelUser.findOne({login: login}, function(err, found_user){

		if(err){
			res.status(404).send(404, err.message);
		}
		else if(!found_user){
			res.status(401).send(401, { message: "User not Found"} );
		}
		else if(!found_user.validPassword(password)){
			res.status(401).send(401, { message: "Passwords don't match"} );
		}
		else {

			var expires = moment().add(2,'hours');

			var token = jwt.encode({
				iss: found_user.id,
				exp: expires
			}, secret_Token);

			res.status(200).send({token : token, user : found_user});
		}
	});
};

exports.authedit=function(req,res,next){
	var token = req.headers['x-access-token'];

	if (token) {
  		try {
	    	var decoded = jwt.decode(token, secret_Token);
	    	console.log(decoded)
    	 	if (decoded.exp <= Date.now()) {
    	 		res.status(400);
    	 		console.log("token expired");
  				res.end('Access token has expired');
			}  else if(decoded.iss !=req.params.id) {
				res.status(401);
				res.end("Access token isn't valid");

			}	else{
				next();
			}

 
 	 	} catch (err) {
    		return next();
  		}
	} else {
		res.status(401);
  		res.end('Token not received')
		}
};



exports.authmember=function(req,res,next){
	var token = req.headers['x-access-token'];

	if (token) {
  		try {
  			
	    	var decoded = jwt.decode(token, secret_Token);
    	 	if (decoded.exp <= Date.now()) {
    	 		res.status(400);
  				res.end('Access token has expired');
			}
			else{
				modelUser.findById(decoded.iss,function (err, doc){
					if(err) next(err);
					else {
						if(!doc){
							res.status(401);
							res.end("Access token isn't valid");
						} else{
							next();
						}
					}
				});
			} 
 	 	} catch (err) {
    		return next();
  		}
	} else {
		res.status(401);
  		res.end('Token not received')
		}
};

exports.authwritter=function(req,res,next){
	var token = req.headers['x-access-token'];

	if (token) {
  		try {
  			
	    	var decoded = jwt.decode(token, secret_Token);
    	 	if (decoded.exp <= Date.now()) {
    	 		res.status(401);
  				res.end('Access token has expired');
			}
			else{
				modelUser.findById(decoded.iss,function (err, doc){
					if(err) next(err);
					else {
						if(!doc){
							res.status(401);
							res.end("Access token isn't valid");
						} else if (doc.right<1){
							res.status(401);
							res.end("Insufficient right");

						}else {
							next();
						}
					}
				});
			} 
 	 	} catch (err) {
    		return next(err);
  		}
	} else {
		res.status(401);
  		res.end('Token not received')
		}
};

exports.authadmin=function(req,res,next){

	var token = req.headers['x-access-token'];
	console.log(token + ": affichage token");
	if (token) {

  		try {  			
	    	var decoded = jwt.decode(token, secret_Token);
	    	console.log(decoded);
    	 	if (decoded.exp <= Date.now()) {

    	 		res.status(400);
  				res.end('Access token has expired');
			}
			else{
				modelUser.findOne({'_id':decoded.iss}).exec(function (err, doc){
					if(err) next(err);
					else {
						if(!doc){
							res.status(401);
							res.end("Access token isn't valid");
						} else if (doc.right<3){
							res.status(401);
							res.end("Insufficient right");

						}else {
							next();
						}
					}
				});
			} 
 	 	} catch (err) {
    		return next();
  		}
	} else {
		res.status(401);
  		res.end('Token not received')
		}

}