/*
 * Server code. Stuff regarding sending data to users. Price changes and number crunching are done in database.js.
 */


var fs = require("fs");
var path = require('path');
var express = require('express');
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');

var mongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoUser + '@' +
  mongoHost + ':' + mongoPort + '/' + mongoUser;

var db;


var app = express();
var port = process.env.PORT || 3000;

var availablePages = ['home', 'store', 'supplies', 'crafting'];
var itemList;
var collectionsNeeded = [[], ["items"], [], []];

app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next){
  console.log("==200 incoming request-URL::", req.url);
  res.status(200).render('home');
});

app.get('/:section', function(req, res, next){
  console.log("==incoming request-URL::", req.url);
  var pageId = availablePages.indexOf(req.params.section);
  if (pageId > -1) {
    console.log("==section found::"+req.params.section);
    var collections = [];
    if(collectionsNeeded[pageId].length > 0)
        collections.items = itemList;
        console.log(collections.items);
    res.status(200).render(availablePages[pageId], collections)
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


mongoClient.connect(mongoURL, function(err, client) {
    if (err){
        console.log("mongoURL:: " , mongoURL);
        throw err;
    }

    db = client.db(mongoUser);
    console.log(db);
    var itemCollection = db.collection('items');
    itemCollection.find({}).toArray(function(err, result){
        if(err)
            throw err;
        itemList = result;
    });


    startGameLoop();
    app.listen(port, function () {
        console.log("== Server is listening on port", port);
        const timeoutScheduled = Date.now();
    });
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
