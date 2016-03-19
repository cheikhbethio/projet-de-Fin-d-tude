/* var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');

 


describe('Routing', function() {
  var url = 'http://localhost:4711';
  before(function(done) {
    // In our tests we use the test db
    function clearDB() {
     mongoose.connection.db.dropDatabase(function() {done()});
   return done();
 }
    mongoose.connect('localhost:27017');	
    clearDB();
    done();
  });


describe('Account Creation', function() {
 var myUser;
 var myArtcile;
 var myPage;
 var createdAcount = {
  login : 'kksdsdk',
  password : 'ksdsdskk',
  firstname : 'kkdsdk',
  lastname : 'kksdsdk',
  email : 'ksdsdskk@kkk.kkk',
  right : 1
 };
 it('should return error when Creation failed', function(done) {
  request(url)
  .post('/api/users')
  .send(createdAcount)
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    console.log(res.status+ ': code retourné pour la création de compte pour un articel');
    myUser = res.body.result;
    console.log(myUser);
    res.should.have.property('status',200);
    done();
  });
});

 // article creation
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
  .send(createdArticle)
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    myArtcile = res.body;
    console.log(myArtcile);
    console.log(res.status+ ': code retourné pour la Creation d\'articles ');
    res.should.have.property('status',200);
    done();
  });
});

 it('should create a new page', function(done){ 
  var page = {title: "test"};
  request(url)
  .post('/api/pages')
  .send(page)
  .expect(200)
  .end(function(err,res){
    should.not.exist(err);
    myPage = res.body;
    console.log(res.body);
    res.should.have.property('status',200);
    done();
  });
});

it('should add an article in a page', function(done){
  request(url)
  .put('/api/pages/'+myPage._id+'/article/'+myArtcile._id)
  .send()
  .expect(200)
  .end(function(err,res){
    should.not.exist(err);
    console.log(res.body);
    res.should.have.property('status',200);
    done();
  });
});

it('should update an existing page', function(done){
  var body = {title: "modification du titre"};
  var id = myPage._id;
  request(url)
  .put('/api/pages/'+id)
  .send(body)
  .expect(200)
  .end(function(err, res){
    should.not.exist(err);
    res.body.title.should.equal('modification du titre');
    done();
  });
});

it('should view all page', function(done) {
  request(url)
  .get('/api/pages')
  .send()
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    console.log(res.body);
    res.should.have.property('status',200);
    done();
  });
});
/*
 it('should del an article in a page', function(done){
  var reqart = {id: myArtcile._id};
  request(url)
  .delete('/api/pages/article/'+myPage._id)
  .send(reqart)
  .expect(200)
  .end(function(err,res){
    should.not.exist(err);
    console.log(res.body);
    res.should.have.property('status',200);
    done();
  });
});

it('should view all page', function(done) {
  request(url)
  .get('/api/pages')
  .send()
  .end(function(err, res) {
    if (err) {
      throw err;
    }
    console.log(res.body);
    res.should.have.property('status',200);
    done();
  });
});

*/
/*
});
});

*/