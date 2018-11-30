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

var availablePages = ['home', 'store', 'supplies', 'crafting']; 

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next){
  console.log("==200 incoming request-URL::", req.url);
  res.status(200).render('home');
});

app.get('/:section', function(req, res, next){
  console.log("==incoming request-URL::", req.url);
  if (availablePages.indexOf(req.params.section) > -1) {
    console.log("==section found::"+req.params.section);
    res.status(200).render(req.params.section);
  }
  else {
    console.log("==404 section not found::"+req.params.section);
    next(); 
  }
});

app.get('*', function (req, res) {
  console.log("==404 incoming request-URL::", req.url);
  res.status(404).render('404');
});

var time; //variable used to calculate deltaTime.
var tickTime = 2500; //milliseconds between "frames"


//The server-side logic will happen inside this function.
function tickServer() {
  
  //deltaTime calculations
  //realistically, I'm not sure how much the milliseconds in deltaTime is really going to matter, but it's generally a good idea to put that in game loops in case you ever need it.
  var newTime = Date.now();
  var deltaTime = newTime - time;
  time = newTime;
  console.log("deltaTime:: ", deltaTime);

  /* SERVER-SIDE GAME LOGIC GOES IN HERE
    This function will be called roughly every [tickTime] milliseconds, and it'll allow us to have an asynchronous game "loop" so it's going to be used to handle all the non-I/O logic.
  */
  
  /* SERVER-SIDE GAME LOGIC GOES IN HERE*/
 
  //Set timer to loop. This isn't technically recursion, as I understand it.
  setTimeout(tickServer, tickTime);
}

//sync the watches
function startGameLoop() {
  time = Date.now();
  tickServer();
}

startGameLoop();

app.listen(port, function () {
  console.log("== Server is listening on port", port);
  const timeoutScheduled = Date.now();

  
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
