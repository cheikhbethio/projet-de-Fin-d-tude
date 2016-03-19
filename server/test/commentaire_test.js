var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var mydb     = require('../Route/user.js');
var testmyUser; 



describe('Commentaire Routing', function() {
  	var url = 'http://localhost:4711';


 	before(function(done) {
    	mongoose.connect('localhost:27017');
    	done();
  	});

  	after(function(done){
  		mongoose.disconnect();
  		done();
  	});

	describe('Account Creation for Comment', function() {
	  	var myUser;
	  	var myArticle;
	  	var createdAcount = {
	        login		: 'testcommentaire',
	    	password	: 'testcommentaire',
	   	 	firstname	: 'testcommentaire',
	    	lastname	: 'testcommentaire',
	    	email	  	: 'testcommentaire@testcommentaire.test',
	    	right		: 1
	    };


	    it('return error when Creation failed', function(done) {
		    request(url)
			.post('/api/users')
			.set('x-access-token',token)
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
	    it('return error when article Creation failed', function(done) {
		 	var id = myUser._id;
		  	var createdArticle = {
	             title : "myArticle",
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
		          myArticle = res.body;
		       //   console.log(myArticle);
		          console.log(res.status+ ': code retourné pour la Creation d\'articles ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });
		 	
	//second comment creation for deleting after
	    it('return error when 2° comment creation failed', function(done) {
		 	var id_user = myUser._id;
		 	var	id_article = myArticle._id;
		  	var createdComment2 = {
	            author : id_user,
				article : id_article,
	            date : '2000-10-10T00:00:00.000Z',
	            content : "mycontentxxxxxxxxxxxxxxxxxxxxxxxx",
		    };

		    request(url)
			.post('/api/comments')
			.set('x-access-token',token)
			.send(createdComment2)
			.end(function(err, res) {
		        if (err) {
		           throw err;
		        }
		        myCommentToDelete = res.body;
		       // console.log(myCommentToDelete);
           		res.body.author.should.equal(id_user);
           		res.body.article.should.equal(id_article);
           		res.body.date.should.equal('2000-10-10T00:00:00.000Z');
           		res.body.content.should.equal("mycontentxxxxxxxxxxxxxxxxxxxxxxxx");

		        console.log(res.status+ ': code retourné pour la Creation de commentaire ');
		        res.should.have.property('status',200);
		        done();
		    });
	    });
	 	
	//factory of comment creation
	    it('should return error when 3° to 6 comment creation failed', function(done) {
	    	creatcomment(myUser._id,  myArticle._id, url, '2000-10-10T00:00:00.000Z', 'first contenu');
	    	creatcomment(myUser._id,  myArticle._id, url, '2001-10-10T00:00:00.000Z', 'seconde contenu');
	    	creatcomment(myUser._id,  myArticle._id, url, '2005-10-10T00:00:00.000Z', 'tird contenu');
	    	creatcomment(myUser._id,  myArticle._id, url, '2004-10-10T00:00:00.000Z', 'fourt contenu');
	        done();
	    });

	//delete one comment
	    it('return error when deleting article failed', function(done) {
	    	var id_comment = myCommentToDelete._id;
		    request(url)
			.delete('/api/comments/' + id_comment)
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status + ': code retourné pour la supression d\'un article');
		          res.should.have.property('status',200);
		          done();
		    });
	    });

	//view all comments for one article
	    it('return error  if view comments failed', function(done) {
		 	var id_article = myArticle._id;
		 	console.log(id_article);
		    request(url)
			.get('/api/comments/'+ id_article)
			.set('x-access-token',token)
			.send()
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		        myComment = res.body;
		        //console.log(myComment);
		        console.log(res.status+ ': code retourné pour la vue d\'un commentaire');
		        res.should.have.property('status',200);
		        done();
		    });
	    });
});

var creatAcount =function(){
	var createdAcount1 = {
	        login		: '1kksdsdk',
	    	password	: 'k1sdsdskk',
	   	 	firstname	: 'kk1dsdk',
	    	lastname	: 'kks41dsdk',
	    	email	  	: 'ksdsd1skk@kkk.kkk',
	    	right		: 12
	    };
 	request(url)
	.post('/api/users')
			.set('x-access-token',token)
	.send(createdAcount1)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          console.log(res.status+ ': code retourné pour la création de compte');
          myUser = res.body.result;
         // console.log(myUser);
          res.should.have.property('status',200);
	})
}
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
			.set('x-access-token',token)
	.send(createdComment3)
	.end(function(err, res) {
        if (err) {
           throw err;
        }
        myCommentToDelete = res.body;
        //console.log(myCommentToDelete);
   		res.body.author.should.equal(id_user);
   		res.body.article.should.equal(id_article);
   		res.body.date.should.equal(thedate);
   		res.body.content.should.equal(thecontent);

        console.log(res.status+ ': code retourné pour la  trosieme Creation de commentaire ');
        res.should.have.property('status',200);
	});
};


var creatAcount =function(){
	var createdAcount1 = {
	        login		: '1kksdsdk',
	    	password	: 'k1sdsdskk',
	   	 	firstname	: 'kk1dsdk',
	    	lastname	: 'kks41dsdk',
	    	email	  	: 'ksdsd1skk@kkk.kkk',
	    	right		: 12
	    };
 	request(url)
	.post('/api/users')
			.set('x-access-token',token)
	.send(createdAcount1)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          console.log(res.status+ ': code retourné pour la création de compte');
          myUser = res.body.result;
         // console.log(myUser);
          res.should.have.property('status',200);
	})
}