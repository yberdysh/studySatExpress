//require dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');

//create express app
var app = express();
//MIDDLEWARE:
//start running express
app.use(morgan('dev'));
//start running morgan in dev environment
app.use(bodyParser.urlencoded({ extended: true }));
//for forms
app.use(bodyParser.json());
//to parse requests into json from ajax

var nunjucks = require('nunjucks');
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off


//error handling middleware:
app.use((err, req, res, next) => {
  console.error(err);
})

app.listen(3000, ()=> {
  console.log('listening on 3000');
})

app.use('/', router);
