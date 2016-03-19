var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
/*
describe('Routing', function() {
  var url = 'http://localhost:4711';
  before(function(done) {
    mongoose.connect('localhost:27017');
    done();
  });

describe('Create a new menu', function(){
        var resBody,
            page_test;
         var myUser;
	 var myArticle;
         var menu_test;
       it('should create a new menu', function(done){
         var menu = {name: 'Menu de test', items: []};
          request(url)
        .post('/api/menus')
        .send(menu)
        .expect(200)
        .end(function(err,res){
         should.not.exist(err);
         console.log(res.body);
         resBody = res.body;
         done();
      });
   });
  it('should create another new menu', function(done){
         var menu = {name: 'un autre menu de test', items: []};
          request(url)
        .post('/api/menus')
        .send(menu)
        .expect(200)
        .end(function(err,res){
         should.not.exist(err);
         console.log(res.body);
         menu_test = res.body;
         done();
      });
   });
  it('should create user', function(done) {
             var createdAcount = {
	        login		: 'login',
	    	password	: 'password',
	   	 	firstname	: 'login',
	    	lastname	: 'login',
	    	email	  	: 'login@kkk.kkk',
	    	right		: 1
	    };
                   request(url)
			.post('/api/users')
			.send(createdAcount)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          console.log(res.status+ ': code retourné pour la création de compte pour test la creation d\'un article');
		          myUser = res.body.result;
		          console.log(myUser);
		          res.should.have.property('status',200);
		          done();
		    });
		});
	 	
	// article creation
	    it('should create article', function(done) {
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
			.send(createdArticle)
			.end(function(err, res) {
		          if (err) {
		            throw err;
		          }
		          myArticle = res.body;
		          console.log(myArticle);
		          console.log(res.status+ ': code retourné pour la Creation d\'articles ');
		          res.should.have.property('status',200);
		          done();
		    });
	    });
   it('should create a page', function(done){
       var id = myArticle._id;
      var page = {title:'page de test', content:[]};
          //page.content.push(myArticle);
      request(url)
      .post('/api/pages')
      .send(page)
      .expect(200)
     .end(function(err, res){
       should.not.exist(err);
         //res.body.title.should.equal('modification du titre');
         //res.body.content.should.equal('test de la modification du contenu');
         page_test = res.body;
         done();
      });
  });
  it('should add article to a page', function(done){
       var idpage = page_test._id;
       var id = myArticle._id;
          //page.content.push(myArticle);
      request(url)
      .put('/api/pages/article/'+idpage)
      .send({id : id})
      .expect(200)
     .end(function(err, res){
       should.not.exist(err);
         //res.body.title.should.equal('modification du titre');
         //res.body.content.should.equal('test de la modification du contenu');
         console.log(res.body);
         done();
      });
  });
  it('should add page to a item', function(done){
      var id = menu_test._id;
      request(url)
      .post('/api/menus/page/'+id)
      .send(page_test)
      .expect(200)
     .end(function(err, res){
       should.not.exist(err);
         //res.body.title.should.equal('modification du titre');
         //res.body.content.should.equal('test de la modification du contenu');
         done();
      });
  });
 it('should add menu to a item', function(done){
      var id = resBody._id;
      request(url)
      .post('/api/menus/menu/'+id)
      .send(menu_test)
      .expect(200)
     .end(function(err, res){
       should.not.exist(err);
         //res.body.title.should.equal('modification du titre');
         //res.body.content.should.equal('test de la modification du contenu');
         done();
      });
  });
});
describe('Get all menus', function(){
        it('should return liste de tous les menus',function(done){
          request(url)
          .get('/api/menus')
          .set('Accept','application/json')
          .expect(200)
          .end(function(err,res){
          // should.not.exist(err);
           res.body.should.be.an.instanceOf(Array);
            console.log(res.body);
          done();
        });
      });
});
});
      


*/