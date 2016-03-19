var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var mydb     = require('../Route/user.js');
 
describe('article Routing', function() {
  	var url = 'http://localhost:4711';

 	before(function(done) {
    	mongoose.connect('localhost:27017');
    	done();
  	});

  	after(function(done){
  		mongoose.disconnect();
  		done();
  	});

	describe('Account Creation', function() {
	  	var myUser; 
	  	var myArtcile;
	  	var myUpdatedArtcile;
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
	  	var createdArticle = {
             title : "myartcile",
             author : "5513c4657dc7524913f8bab0",
             date : "2000-10-09T22:00:00.000Z",
             ispublic : true,
             content : "mycontent",
             nbrComment: 0,
             keywords : ["motcle1", "motcle2"]
	    };
	  	var updatedArticle = {
             title : "updatedArticle",
             author : '5513c4657dc7524913f8bab0',
             date : "2000-10-09T22:00:00.000Z",
             ispublic : true,
             content : "updatedArticle",
             nbrComment: 0,
             keywords : ["updatedArticle", "updatedArticle"]
	    };

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

	    // to creat article 
	    it(' return error when we cannot creat article', function(done) {
		 	var id = myUser._id;

		    request(url)
			.post('/api/articles')
			.set('x-access-token',token)
			.send(createdArticle)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        myArtcile = res.body;
		        myArtcile.title.should.equal(createdArticle.title);
		        myArtcile.author.should.equal(createdArticle.author);
		        myArtcile.date.should.equal(createdArticle.date);
		        myArtcile.ispublic.should.equal(createdArticle.ispublic);
		        myArtcile.content.should.equal(createdArticle.content);
		        myArtcile.keywords[0].should.equal(createdArticle.keywords[0]);
		        myArtcile.keywords[1].should.equal(createdArticle.keywords[1]);
		        console.log(res.status+ ': code retourné pour la Creation d\'articles ');
		        res.should.have.property('status',200);
		        done();
		    });
	    });

		//get('/api/articles/:id', article.get); 
		//get one article
	    it('return error when we cannot get one article', function(done) {
		 	var id_articles = myArtcile._id;
		    request(url)
			.get('/api/articles/'+ id_articles)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        tresulttempo = res.body;
		        tresulttempo.title.should.equal(myArtcile.title);
		        tresulttempo.date.should.equal(myArtcile.date);
		        tresulttempo.ispublic.should.equal(myArtcile.ispublic);
		        tresulttempo.nbrComment.should.equal(myArtcile.nbrComment);
		        tresulttempo.content.should.equal(myArtcile.content);
		        console.log(res.status+ ': code retourné pour la vue d\'un article');
		        res.should.have.property('status',200);
		        done();
		    });
	    });

	    //get('/api/articles', article.view);
	    //to get all articles
	    it('return error when we cannot get all article', function(done) {
		    request(url)
			.get('/api/articles')
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status+ ': code retourné pour la vue de tous les articles');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	    //put('/api/articles/:id',[token.authwritter], article.edit);
	    //to editt articles
	    it('return error when we cannot edit articles', function(done) {
		    request(url)
			.put('/api/articles/'+ myArtcile._id)
			.set('x-access-token',token)
			.send(updatedArticle)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        myUpdatedArtcile = res.body;
		        myUpdatedArtcile.title.should.equal(updatedArticle.title);
		        myUpdatedArtcile.date.should.equal(updatedArticle.date);
		        myUpdatedArtcile.ispublic.should.equal(updatedArticle.ispublic);
		        myUpdatedArtcile.content.should.equal(updatedArticle.content);
		        myUpdatedArtcile.keywords[0].should.equal(updatedArticle.keywords[0]);
		        myUpdatedArtcile.keywords[1].should.equal(updatedArticle.keywords[1]);
		        console.log(res.status+ ': returned code to editt articles');
		        res.should.have.property('status',200);
		        done();
		    });
	    });

	    //get('/api/search/article' , article.searchByKeyWord)
	    //to search articles
	    it('return error when we cannot  search articles', function(done) {
		    request(url)
			.get('/api/search/article')
			.set('x-access-token',token)
			.query({keyword: 'motcle1'})
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        console.log("******************************************************");  
		        	console.log(res.body);  
		        console.log("******************************************************");
		        /*myUpdatedArtcile = res.body;
		        myUpdatedArtcile.title.should.equal(updatedArticle.title);
		        myUpdatedArtcile.date.should.equal(updatedArticle.date);
		        myUpdatedArtcile.ispublic.should.equal(updatedArticle.ispublic);
		        myUpdatedArtcile.content.should.equal(updatedArticle.content);
		        myUpdatedArtcile.keywords[0].should.equal(updatedArticle.keywords[0]);
		        myUpdatedArtcile.keywords[1].should.equal(updatedArticle.keywords[1]);*/
		        console.log(res.status+ ': returned code to  search articles');
		        res.should.have.property('status',200);
		        done();
		    });
	    });

		//get('/api/last_articles',article.getLastArticles);
		//to get last article
	    it('return error when we cannot get last article', function(done) {
		    request(url)
			.get('/api/last_articles')
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		       	res.body.length.should.equal(3);
		        console.log(res.status+ ': returned code to get last article');
		        res.should.have.property('status',200);
		        done();
		    });
	    });





	    // to delete article 
	    it(' return error when we cannot delete article ', function(done) {
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
			.delete('/api/articles/'+ myArtcile._id)
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        console.log(res.status+ ': code status to delete article  ');
		        res.should.have.property('status',200);
		        done();
		    });
	    });


	    //to delete a user 
		it('return error we cannot delete a user ', function(done) {
			request(url)
			.delete('/api/users/remove/'+myUser._id)
			.set('x-access-token',token)
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
