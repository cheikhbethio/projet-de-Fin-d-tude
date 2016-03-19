'use strict';


var application_root = __dirname;
var path             = require('path');

var express  = require('express');
var mongoose = require('mongoose');

var favicon        = require('serve-favicon');
var logger         = require('morgan');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');

// Deprecated !!
var session = require('express-session');


var flash        = require('connect-flash');
var cookieParser = require('cookie-parser');


var user        = require('./Route/user.js');
var page        = require('./Route/page.js');
var article     = require('./Route/article.js');
var comment     = require('./Route/commentaire.js');
var favoris     = require('./Route/favoris_article.js');
var passport    = require('./Route/passport.js');
var menu        = require('./Route/menu.js');
var preferences = require('./Route/preferences');
var participate = require('./Route/participate.js');

var token= require('./Route/token.js');

var app = express();

app.use(express.static(path.join(application_root ,'../client/app')));
//app.use(express.favicon());
app.use(logger('dev'));

app.use(cookieParser()); 
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'securedsession' }));

app.use(passport.initialize());
app.use(passport.session());

//app.use(app.router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var port = 4711;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    console.log('application_root is %s',path.join(application_root ,'../client'));
});


var db = mongoose.connect('mongodb://localhost/testWP');


app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
	console.log(req.session.passport.user.roles);
	res.cookie('userid', req.user.right, { maxAge: 2592000000 });
	  res.send(req.user);
});
app.post('/api/logout',  function(req, res){
	req.logOut();
	res.send(200);
});


/***** Users ******/

app.post('/api/users', user.create);
app.put('/api/users/:id' , user.edit);
app.get('/api/users/:id' , user.get);
//app.get('/api/users/:id', user.get);
app.get('/api/users'  , user.view);
app.put('/api/users/:id_user/article/:id_art', user.addFavorite);
app.delete('/api/users/:id_user/article/:id_art',user.delFavorite);
app.get('/api/users/:id/profile',user.profile);
app.put('/api/users/:id/right'  ,user.right);
app.get('/api/users/favoris/:id', user.getFavorite);
app.delete('/api/users/remove/:id', [token.authadmin], user.remove);

/***** Token *****/
app.post('/api/token', token.gettoken);

/***** Pages ******/


app.post('/api/pages'  ,page.create);
app.put('/api/pages/:id'  , page.edit);
app.delete('/api/pages/:id'  , page.deletePage);
app.get('/api/pages/home', page.getHome);
app.get('/api/pages/:id', page.getPage);
app.get('/api/pages', page.view);
app.put('/api/pages/:id/article/:idart',page.addarticle);
app.delete('/api/pages/:id/article/:idart',page.delarticle);


/***** Articles *****/


app.post('/api/articles' , article.create);
app.put('/api/articles/:id' , article.edit);
app.delete('/api/articles/:id' , article.deleteArticle);
app.get('/api/articles/:id', article.get);
app.get('/api/articles', article.view);
app.get('/api/articles_editor/:id', article.getByEditor);
app.get('/api/search/article' , article.searchByKeyWord);
app.get('/api/last_articles',article.getLastArticles);

/***** Menus *****/

/*app.post('/api/menus', menu.createItem);
app.get('/api/menus', menu.getItems);
app.post('/api/menus/page/:id', menu.addPageToItem);
app.post('/api/menus/menu/:id', menu.addMenuToItem);*/

app.get('/api/menus', menu.getMenus);
app.post('/api/menus'  , menu.postMenu);
app.put('/api/menus/:id'  , menu.editMenu);
app.delete('/api/menus/:id'  , menu.deleteMenu);

/*****Commentaires*****/

app.post('/api/comments' , comment.create);
app.get('/api/comments/:id', comment.get);
app.get('/api/comments', comment.getAll);
app.delete('/api/comments/:id' , comment.deleteComment);
app.get('/api/last_comments', comment.getLastComments);
app.get('/api/comments_editor/:id', comment.getByEditor);


/***** Preferences *****/
app.get('/api/preferences', preferences.get);
app.put('/api/preferences'  , preferences.edit);

/******statistiques*******/

/*app.get('/api/statistics/comment/:id', comment.getNbcomment);
app.get('/api/statistics/comment/article/:id', comment.getNbcommentByArticle);
app.get('/api/statistics/article/:id', article.getNbArticle);
app.get('/api/statistics/page', page.getNbPage);*/

app.get('/api/nbr/admin', participate.getNbAdmin);
app.get('/api/nbr/moderator', participate.getNbModerator);
app.get('/api/nbr/writer', participate.getNbWriter);
app.get('/api/nbr/member', participate.getNbMember);
app.get('/api/nbr/comment', participate.getNbComment);
app.get('/api/nbr/article', participate.getNbArticle);
app.get('/api/nbr/page', participate.getNbPage);


/******favoris*******/
app.post('/api/favoris', favoris.create);
app.delete('/api/favoris/:id', favoris.deleteFavoris);
app.get('/api/favoris/:id', favoris.get);
app.get('/api/favoris/all/:id', favoris.view); 


