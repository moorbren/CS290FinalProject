/*
 * Server code. Stuff regarding sending data to users. Price changes and number crunching are done in database.js.
 */


var fs = require("fs");
var path = require('path');
var express = require('express');
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;


app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next){
  res.status(200).render('home');
});

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});



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
