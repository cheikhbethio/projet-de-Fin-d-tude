
var passport = require('passport');
var user = require('./user.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports=passport;

	passport.serializeUser( function(user, done){
	  var sessionUser = { _id: user._id, name: user.lastname, email: user.email, roles: user.right }
	  done(null, sessionUser)
	})

	passport.deserializeUser( function(sessionUser, done){
	  // The sessionUser object is different from the user mongoose collection
	  // it's actually req.session.passport.user and comes from the session collection
	  done(null, sessionUser)
	})
	passport.use('local-login', new LocalStrategy({
	    usernameField : 'username',
	    passwordField : 'password',
	    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
	    },
	    function(req, username, password, done) {
	        if (username)
	            username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

	        // asynchronous
	        process.nextTick(function() {
	            user.users.findOne({ 'login' :  username }, function(err, user) {
	                // if there are any errors, return the error
	                if (err){console.log('erreur db');
	                    return done(err);}

	                // if no user is found, return the message
	                if (!user){
	                	console.log( user + ' no user found');
	                    return done(null, false,  { message: 'no user found.' });

	                }

	                if (!user.validPassword(password)){console.log('wrong password');
	                    return done(null, false,  { message: 'Oops!! wrong password.' });}
	                else{ 
	                    return done(null, user);
	                }
	            });
	        });

	}));




	var auth = function(req, res, next){
	  if (!req.isAuthenticated()) 
	    res.send(401);
	  else
	    next();
	};
