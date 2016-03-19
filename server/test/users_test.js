var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var mydb     = require('../Route/user.js');
 
/*
		        console.log("******************************************************");  
		        	console.log(res.body);  
		        console.log("******************************************************");
*/

describe('User Routing', function() {
  	var url = 'http://localhost:4711';
 	
 	before(function(done) {
    	mongoose.connect('localhost:27017');
    	done();
  	});

 	after(function(done) {
    	mongoose.disconnect();
    	done();
  	});

	  
	describe('User Routing', function() {
	  	var myUser; 
	  	var myArtcile;
	  	var createdAcount = {
	        login		: 'testAccontCreation',
	    	password	: 'testAccontCreation',
	   	 	firstname	: 'testAccontCreation',
	    	lastname	: 'testAccontCreation',
	    	email	  	: 'testAccontCreation@testAccontCreation.testAccontCreation'
	    };
	    var updateAccont = {
	    	password	: '1kkk',
	   	 	firstname	: '1kkk',
	    	lastname	: '1kkk',
	    	email	  	: '1kkk@kkk.kkk',
	    };
	    var token;

	    it('should return error when Creation failed', function(done) {
	    	var pass ;
		    request(url)
			.post('/api/users')
			.send(createdAcount)
			.end(function(err, res) {
		        if (err) {
		           throw err;
		        }
		        console.log(res.status+ '  code de requete retourné pour la Creation');
		        myUser = res.body.result;
           		myUser.login.should.equal('testAccontCreation');
           		myUser.firstname.should.equal('testAccontCreation');
           		myUser.lastname.should.equal('testAccontCreation');
           		myUser.email.should.equal('testAccontCreation@testAccontCreation.testAccontCreation');
           		assert.equal(true, bcrypt.compareSync('testAccontCreation', myUser.password));
		        res.should.have.property('status',200);
		        done();
		    });
	    });

		//for duplicate accont
	    it('should return error trying to save duplicate username', function(done) {
			request(url)
			.post('/api/users')
			.send(createdAcount)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        console.log(res.status+ '  code de requete pour tests de duplicate');
			    res.should.have.property('status',401);
		      	done();
		    });
	    });

	    //get token	    
	    it('return error when get token failed', function(done) {
			var newUserUpdated;
			request(url)
			.post('/api/token')
			.send(createdAcount)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          token=res.body.token;
		        console.log(token);
	          	res.should.have.property('status',200);
	          	done();
	        });
	    });

	    //view profile
	    it('should return error we cannot see the user profile', function(done) {
	    	var result;
			request(url)
			.get('/api/users/'+myUser._id)
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        result = res.body;
           		result.login.should.equal(myUser.login);
           		result.firstname.should.equal(myUser.firstname);
           		result.lastname.should.equal(myUser.lastname);
           		result.email.should.equal(myUser.email);
           		result.password.should.equal(myUser.password);
           		result.right.should.equal(myUser.right);
	          	console.log(res.status+ '  code de requete pour voir le profile d\'un user');
		        res.should.have.property('status',200);
		      done();
		    });
		});

	    //edit a profile Mail only	    
	    it('return error when edition mail only failed', function(done) {
		    var updateAccontMail = {
		    	email	  	: 'onlymail@kkk.kkk',
		    };
			var newUserUpdated;
			request(url)
			.put('/api/users/'+myUser._id)
			.set('x-access-token',token)
			.send(updateAccontMail)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
	        	newUserUpdated = res.body.result; 
	      		//console.log(newUserUpdated);
	        	newUserUpdated.email.should.equal('onlymail@kkk.kkk');
	          	res.should.have.property('status',200);
	          	done();
	        });
	    });

	    //edit a profile without token    
	    it('return error when edition password succed without token', function(done) {
		    var updateAccontPass = {
		    	password	  	: 'newPassword',
		    };
			var newUserUpdated;
			request(url)
			.put('/api/users/'+myUser._id)
			.send(updateAccontPass)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
	          	res.should.have.property('status',401);
	          	done();
	        });
	    });

	    //edit a profile firstname and lastname	    
	    it('return error when edition password only failed', function(done) {
		    var updateAccontPass = {
		    	firstname	  	: 'newfirstname',
		    	lastname	: "newlastname"
		    };
			var newUserUpdated;
			request(url)
			.put('/api/users/'+myUser._id)
			.set('x-access-token',token)
			.send(updateAccontPass)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
	          	console.log(res.status+ '  code de requete pour le update Mail');
	        	newUserUpdated = res.body.result; 
	        	newUserUpdated.firstname.should.equal('newfirstname');
	        	newUserUpdated.lastname.should.equal('newlastname');
	          	res.should.have.property('status',200);
	          	done();
	        });
	    });//


	     //view all users profiles
		it('return error we cannot see all users profiles', function(done) {
			request(url)
			.get('/api/users')
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
	          	console.log(res.status+ '  code de requete pour voir tous les profiles ');
	          	res.should.have.property('status',200);
	          done();
	        });
		});

	    // article creation for user test 
	    it('should return error when Creation article failed', function(done) {
		 	var id = myUser._id;
		  	var createdArticle = {
	             title : "myartcile",
	             author : id,
	             date : "10-10-2000",
	             ispublic : true,
	             content : "mycontent",
	             keywords : ["str1", "str2"]
		    };

		    request(url)
			.post('/api/articles')
			.set('x-access-token',token)
			.send(createdArticle)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          myArtcile = res.body;
	//	          console.log(myArtcile);
		          console.log(res.status+ ': code retourné pour la Creation d\'articles ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });
		
	    //to add a favorite
		it('return error we cannot add a favorite', function(done) {
			request(url)
			.put('/api/users/'+myUser._id+'/article/'+ myArtcile._id)
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        assert.equal(1, res.body);
	          	console.log(res.status+ '  code de requete pour add a favorite');
	            res.should.have.property('status',200);
	          done();
	        });
		});

	    //to delete a favorite
		it('return error we cannot delete a favorite', function(done) {
			request(url)
			.delete('/api/users/'+myUser._id+'/article/'+ myArtcile._id)
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        assert.equal(1, res.body);
	          	console.log(res.status+ '  code de requete pour delete un favorite');
	          res.should.have.property('status',200);
	          done();
	        });
		});

	    //to get a user profile 
		it('return error we cannot get a user profile', function(done) {
			request(url)
			.get('/api/users/'+myUser._id+'/profile')
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		        }
	          	console.log(res.status+ 'returned code to get a user profile');
	            res.should.have.property('status',200);
	            done();
	        });
		});

	    //to get a user favorite  
		it('return error when we cannot get a user favorite', function(done) {
			request(url)
			.get('/api/users/favoris/'+myUser._id)
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		        }
	          	console.log(res.status+ 'returned code to get a user favorite ');
	            res.should.have.property('status',200);
	            done();
	        });
		});

	    //to put a user right  
		it('return error we cannot put a user right', function(done) {
			request(url)
			.put('/api/users/'+myUser._id+'/right')
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		        }
	          	console.log(res.status+ 'returned code to put a user right');
	            res.should.have.property('status',200);
	            done();
	        });
		});

	    //to delete a user 
		it('return error we cannot delete a user ', function(done) {
			request(url)
			.delete('/api/users/remove/'+myUser._id)
			.set('x-access-token',"fgfgfgfgfg")
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		        }
	          	console.log(res.status+ 'returned code to delete a user ');
	            res.should.have.property('status',200);
	            done();
	        });
		});

	});
});




