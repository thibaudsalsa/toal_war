//framework express env ...
var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');


// Load environment variables from .env file
dotenv.load();

//Page de menu
var HomeController = require('./controllers/home');
//frameworks express
var app = express();

//init HBD pour l'utilisation des template handlbar
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {return options.fn(this);}
      return options.inverse(this);
    },
    toJSON : function(object) {return JSON.stringify(object);}
  }
});
//init du serveur

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
//get des pages.
app.get('/', HomeController.index);

//renvoi du code d'erreur si le serveur rencontre une erreur
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

//lancement du serveur node
app.listen(app.get('port'), function() {
  console.log('Le serveur ecoute sur le port ' + app.get('port'));
});

module.exports = app;
