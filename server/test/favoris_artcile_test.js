var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
 
describe('favoris Routing', function() {
  	var url = 'http://localhost:4711';

 	before(function(done) {
    	mongoose.connect('localhost:27017');
    	done();
  	});

  	after(function(done){
  		mongoose.disconnect();
  		done();
  	});

	describe('Account Creation for favoris routing', function() {
	  	var myUser;
	  	var myArticle;
	  	var myFavorisToDelete;
	  	var myFavoris;
	  	var createdAcount = {
	        login		: 'favoris',
	    	password	: 'favoris',
	   	 	firstname	: 'favoris',
	    	lastname	: 'favoris',
	    	email	  	: 'favoris@kkk.kkk',
	    	right		: 1
	    };
	    it('return error when Creation acount failed', function(done) {

		    request(url)
			.post('/api/users')
			.send(createdAcount)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status+ ': code retourné pour la création de compte pour test la creation d\'un compte');
		          myUser = res.body.result;
		         // console.log(myUser);
		          res.should.have.property('status',200);
		          done();
		    });
		});
	 	
	// article creation
	    it('return error when Creation article failed for favoris', function(done) {
		 	var id = myUser._id;
		  	var createdArticle = {
	             title : "myarticle",
	             author : id,
	             date : "10-10-2000",
	             ispublic : true,
	             content : "mycontent",
	             keywords : ["str1", "str2"]
		    };
		    request(url)
			.post('/api/articles')
			.send(createdArticle)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          myArticle = res.body;
		          //console.log(myArticle);
		          console.log(res.status+ ': code retourné pour la Creation d\'articles pour favoris ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	// first favoris article creation
	    it('error when Creation favoris failed', function(done) {
		 	var id = myUser._id;
		  	var createdFav = {
	             title : "myFav1",
	             author : id,
	             date : "10-10-2000",
	             ispublic : true,
	             content : "mycontent",
	             article : myArticle._id,
	             keywords : ["str1", "str2"]
		    };
		    request(url)
			.post('/api/favoris')
			.send(createdFav)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          myFavoris = res.body;
		          //console.log(myFavoris);
		          console.log(res.status+ ': code retourné pour la Creation de favoris pour favoris ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	// second favoris article creation
	    it('error when Creation favoris failed', function(done) {
		 	var id = myUser._id;
		  	var createdFav = {
	             title : "myFav",
	             author : id,
	             date : "10-10-2000",
	             ispublic : true,
	             content : "mycontent",
	             article : myArticle._id,
	             keywords : ["str1", "str2"]
		    };
		    request(url)
			.post('/api/favoris')
			.send(createdFav)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          myFavorisToDelete = res.body;
		         // console.log(myArticle);
		          console.log(res.status+ ': code retourné pour la Creation de favoris pour favoris ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	//delete favoris
	    it('return error when deleting favoris failed', function(done) {
	    	var id_favoris = myFavorisToDelete._id;
	    	console.log('id favorite for deleting' + id_favoris);
		    request(url)
			.delete('/api/favoris/' + id_favoris)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status + ': code retourné pour la supression d\'un favoris');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	//get one favoris
	    it(' return error when view favoris failed', function(done) {
		 	var id_favoris = myFavoris._id;
		 	console.log("id du favoris à voir " + id_favoris);
		    request(url)
			.get('/api/favoris/'+ id_favoris)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status+ ': code retourné pour la vue d\'un favoris');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	//get all favoris
	    it(' return error when view all favoris failed', function(done) {
		 	var id = myUser._id;
		 	console.log("id de lutilisateur pour voir ses favoris " + id);
		    request(url)
			.get('/api/favoris/all/'+ id)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status+ ': code retourné pour la vue des favoris');
		          res.should.have.property('status',200);
		          done();
		    });
	    });
	});
});



