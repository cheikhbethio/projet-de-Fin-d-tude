var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');


describe('Statistics Routing', function() {
  	var url = 'http://localhost:4711';


 	before(function(done) {
    	mongoose.connect('localhost:27017');
    	done();
  	});

  	after(function(done){
  		mongoose.disconnect();
  		done();
  	});

	describe('Account Creation for statistics', function() {
	  	var myUser;
	  	var myArticle;
	  	var myArticle1;
	  	var createdAcount = {
	        login		: 'statistic',
	    	password	: 'statistic',
	   	 	firstname	: 'statistic ',
	    	lastname	: 'statistic',
	    	email	  	: 'statistic@kkk.kkk',
	    	right		: 1
	    };

 	//acount creation
	    it('should return error when Creation failed', function(done) {
		    request(url)
			.post('/api/users')
			.send(createdAcount)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status+ ': code retourné pour la création de compte');
		          myUser = res.body.result;
		         // console.log(myUser);
		          res.should.have.property('status',200);
		          done();
		    });
		});
	 	

	// article creation
	    it('should return error when article Creation failed', function(done) {
		 	var id = myUser._id;
		  	var createdArticle = {
	             title : "myArticle0",
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
		       //   console.log(myArticle);
		          console.log(res.status+ ': code retourné pour la Creation d\'articles ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	// article creation
	    it('should return error when article Creation failed', function(done) {
		 	var id = myUser._id;
		  	var createdArticle = {
	             title : "myArticle1",
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
		          myArticle1 = res.body;
		       //   console.log(myArticle);
		          console.log(res.status+ ': code retourné pour la Creation d\'articles ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });
		 		
	//factory of comment creation
	    it('should return error when 1° to 4 comment creation failed', function(done) {
	    	creatcomment(myUser._id,  myArticle._id, url, '2000-10-10T00:00:00.000Z', 'first contenu');
	    	creatcomment(myUser._id,  myArticle._id, url, '2001-10-10T00:00:00.000Z', 'seconde contenu');
	    	creatcomment(myUser._id,  myArticle1._id, url, '2005-10-10T00:00:00.000Z', 'third contenu');
	    	creatcomment(myUser._id,  myArticle._id, url, '2004-10-10T00:00:00.000Z', 'fourt contenu');
	        done();
	    });

	//factory of article creation
	    it('should return error when 2° to 5° article creation failed', function(done) {
	    	creatArticle(myUser._id, url, '2000-10-10T00:00:00.000Z', 'first contenu');
	    	creatArticle(myUser._id, url, '2001-10-10T00:00:00.000Z', 'seconde contenu');
	    	creatArticle(myUser._id, url, '2005-10-10T00:00:00.000Z', 'third contenu');
	    	creatArticle(myUser._id, url, '2004-10-10T00:00:00.000Z', 'fourt contenu');
	        done();
	    });

	//view nbr of comments for one user 
	    it('should return error view comments for one user failed', function(done) {
		 	var id_user = myUser._id;
		 	console.log('id de l\'utilistauer '+ id_user);
		    request(url)
			.get('/api/statistics/comment/'+ id_user)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        decompte = res.body;
		       	res.body.aaa.should.equal(4);
		        console.log(res.body.aaa + ' statistics nbr de commentaires');
		        console.log(res.status+ ': code retourné pour la decompte des commentaires d\'un users');
		        res.should.have.property('status',200);
		        done();
		    });
	    });

	//view all article for one user 
	    it('should return error view comments for one user failed', function(done) {
		 	var id_user = myUser._id;
		    request(url)
			.get('/api/statistics/article/'+ id_user)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        decompte = res.body;
		       	res.body.should.equal(6);
		        console.log(res.body + ' statistics nbr d\'articles');
		        console.log(res.status+ ': code retourné pour la decompte des articles d\'un users');
		        res.should.have.property('status',200);
		        done();
		    });
	    });

	//view all comments for one article
	    it('should return error when getting nbr comment for one article failed', function(done) {
	    	var id_article = myArticle._id;
		    request(url)
			.get('/api/statistics/articlecomment/' + id_article)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		       	res.body.aaa.should.equal(3);
		        console.log(res.status+ ': code retourné pour la vue l\'obtention du nbr de comments d\'un article');
		        res.should.have.property('status',200);
		        done();
		    });
	    });

	});    
});

var creatcomment =function(id_user, id_article, url1, thedate, thecontent){
  	var createdComment3 = {
        author : id_user,
		article : id_article,
        date : thedate,
        content : thecontent,
    };

    request(url1)
	.post('/api/comments')
	.send(createdComment3)
	.end(function(err, res) {
        if (err) {
           throw err;
        }
   		res.body.author.should.equal(id_user);
   		res.body.article.should.equal(id_article);
   		res.body.date.should.equal(thedate);
   		res.body.content.should.equal(thecontent);

        console.log(res.status+ ': code retourné pour la Creation de commentaire ');
        res.should.have.property('status',200);
	});
};

var creatArticle =function(id, url1, thedate, thecontent){
  	var createdArticle = {
         title : "myartcile",
         author : id,
         date : thedate,
         ispublic : true,
         content : thecontent,
         keywords : ["str1", "str2"]
    };
    request(url1)
	.post('/api/articles')
	.send(createdArticle)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          console.log(res.status+ ': code retourné pour la Creation d\'articles ');
          res.should.have.property('status',200);
    });
};