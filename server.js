/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:  Brendan Moore
 * Email: moorbren@oregonstate.edu
 */
var fs = require("fs");
var path = require('path');
var express = require('express');
var postData = require('./postData');

var app = express();
var port = process.env.PORT || 3000;

var handlebars = require('handlebars');
var exphbs = require('express-handlebars');

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/*
app.get('/posts/:postID', function(req,res,next){
  var tempID = parseInt(req.params.postID);
  var postArray = postData["posts"];
  if(Number.isInteger(tempID) && tempID < postArray.length && tempID >= 0){
    // console.log(postArray[tempID])
    res.status(200).render('single-post', postArray[tempID]);
  }else{
    res.status(404).render('404');
  }
});
*/

app.get('/', function(req, res, next){
  res.status(200).render('index', postData);
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
