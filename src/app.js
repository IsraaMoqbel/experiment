const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const app = express();
const helpers = require('./views/helpers/index');
const controllers = require('./controllers/index');
const bodyParser=require('body-parser');
//set port
app.set('port', process.env.PORT || 8000);

//set view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','hbs');
app.engine('hbs',
exphbs({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views','partials'),
  defaultLayout: 'main',
  helpers
}))
// to serve the favicon
app.use(favicon(path.join(__dirname,'..','public','favicon.ico')));
//to serve all the files needed in public
app.use(express.static(path.join(__dirname,'..','public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(controllers);
module.exports=app;
