/*
 * Server code. Stuff regarding sending data to users. Price changes and number crunching are done in database.js.
 */

var TOP_PLAYER_REFRESH_DELAY = 600000;
var NUM_TOP_PLAYERS = 5;
var topPlayers = [];
var allPlayers = [];

var STOCK_REFRESH_DELAY = 600000;
var NUM_ITEMS_STOCK = 5;
var itemsInStock = [];



var fs = require("fs");
var path = require('path');
var express = require('express');
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');

var mongoClient = require('mongodb').MongoClient;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_USER;
var mongoDBName = process.env.MONGO_DB_NAME;
var mongoURL =
	'mongodb://' + mongoUser + ':' + mongoPassword + '@' +
  mongoHost + ':' + mongoPort + '/' + mongoDBName;

var db;


var app = express();
var port = process.env.PORT || 3000;

var itemsArray;

var availablePages = ['home', 'store', 'supplies', 'crafting'];

app.use(express.static('public'));
app.use(favicon('public/favicon.ico'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', function(req, res, next){
	db.collection('JoeyFatone').find({}).toArray(function(err, user){
		console.log("user",user);
	});
	console.log("==200 incoming request-URL::", req.url);
	res.status(200).render('home', {users: topPlayers});
});

app.get('/store', function(req, res, next){
  console.log("==incoming request-URL::", req.url);
  var userInfo;
  //console.log("db::", db);
  //console.log("collection()====", db.collection('playerStats'));
  db.collection('playerStats').find({name:"JoeyFatone"}).toArray(function(err, usr) {
    if (err) {
      throw err;
    }
    userInfo=usr[0];

    db.collection(userInfo.name).find({}).toArray(function(err, userItems) {

      userInfo["items"] = userItems.map(function(a){
        var out = itemsArray[a.id];
        out.quantity=a.quantity;
        out.boughtAtPrice = a.price; 
        return out;
      });
      res.status(200).render("store", userInfo);
      console.log(userInfo);
    });
  });
});

app.get('/supplies', function(req, res, next){
  console.log("==incoming request-URL::", req.url);
  db.collection('playerStats').find({name:"JoeyFatone"}).toArray(function(err, usr) {
    if (err) {
      throw err;
    }
    userInfo=usr[0];
    userInfo["itemsToDisplay"] = itemsInStock;

    res.status(200).render("supplies", userInfo);
  });

});

app.get('/crafting', function(req, res, next){
  console.log("==incoming request-URL::", req.url);
  db.collection('playerStats').find({name:"JoeyFatone"}).toArray(function(err, usr) {
    if (err) {
      throw err;
    }
    userInfo=usr[0];
    res.status(200).render("crafting", userInfo);
  });
})

app.get('/:section', function(req, res, next){
  console.log("==incoming request-URL::", req.url);
  var section = req.params.section.toLowerCase();
  if (availablePages.indexOf(section) > -1) {
    console.log("==section found::"+section);

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


mongoClient.connect(mongoURL, function(err, client) {
  console.log("mongoURL:: " , mongoURL);
  if (err){
    throw err;
  }
  db = client.db(mongoDBName);
  //startGameLoop();
  db.collection('items').find({}).toArray(function(err, arr){
    itemsArray=arr;
    itemsArray.sort(function(a,b){return a.id-b.id;})
    console.log(itemsArray);
    restockItems();
    db.collection('playerStats').find({}).toArray(function(err, playerStatistics) {

      getTopPlayers(playerStatistics);

      console.log("=======\n===\n===\n===\n===\n=======");
      //buyItem("JoeyFatone",[1,2,3,0],[810,215,179,493],[1,1,1,1]);



      app.listen(port, function () {
        console.log("== Server is listening on port", port);
        const timeoutScheduled = Date.now();

      });
    });
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


function recalcTopPlayers() {
  db.collection('playerStats').find({}).toArray(function(err, playerStatistics) {
    getTopPlayers(playerStatistics);
  });
}

function getTopPlayers(playerStatistics) {

  playerStatistics.sort(function(a, b){
    return a.totalEarnings - b.totalEarnings;
  });

  allPlayers=playerStatistics;

  topPlayers=allPlayers.slice(0,NUM_TOP_PLAYERS);



  setTimeout(recalcTopPlayers, TOP_PLAYER_REFRESH_DELAY);
}

function restockItems() {
  if (NUM_ITEMS_STOCK >= itemsArray.length) {
    itemsInStock=itemsArray;
    return;
  }
  out = [];
  for (i = 0; i < NUM_ITEMS_STOCK; i++) {
    var temp = getRandomArbitrary(0, itemsArray.length);
    while (out.indexOf(temp) !== -1) {
      temp = getRandomArbitrary(0, itemsArray.length);
    }
    out.push(temp);
  }
  itemsInStock = out.map(function(n){return itemsArray[n];});
  setTimeout(restockItems,STOCK_REFRESH_DELAY);
}


function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function buyItem(username, itemIds, purchasePrices, purchaseQuantities, callback) {
  var itemsPurchased;
  db.collection(username).find({id: {$in : itemIds}}).toArray(function(err, arr){
    itemsPurchased = arr; //owned items
    console.log("::itemsPurchased::");
    console.log(itemsPurchased);
    for (i = 0; i < itemIds.length; i++) {
      //itemIds is the array of ids of items being purchased.
      var playerOwnedItem = itemsPurchased.find(function(item){
        return item.id == itemIds[i];
      });
      if (playerOwnedItem) {
        //player has previously purchased this item. 
        console.log("id: ", itemIds[i], "|| playerPrice:", playerOwnedItem.price, "|| marketPrice:", purchasePrices[i]);
        console.log("id: ", itemIds[i], "|| playerQuantity:", playerOwnedItem.quantity, "|| purchasing:", purchaseQuantities[i]);
        var totalPaid     = playerOwnedItem.price * playerOwnedItem.quantity;
        var incurredCost  = purchasePrices[i] * purchaseQuantities[i];
        var totalAmount   = playerOwnedItem.quantity + purchaseQuantities[i];
        var avgCost = (totalPaid+incurredCost) / totalAmount;
        console.log("id: ", itemIds[i], "|| playerQuantity:", playerOwnedItem.quantity, "|| totalAmount:", purchaseQuantities[i]);
        db.collection(username).updateOne({id:itemIds[i]}, {$set: {price:avgCost, quantity:totalAmount}}, function(err, res){console.log("PURCHASEOWNED::", res);});
      }
      else {
        //player has not previously purchased this item.
        console.log("id: ", itemIds[i], "|| undefined:", playerOwnedItem, "|| marketPrice:", purchasePrices[i]);
        //db.collection(username).updateOne({id:itemIds[i]}, {price:avgCost, quantity:totalAmount}, callback);
        db.collection(username).insertOne({id: itemIds[i], quantity: purchaseQuantities[i], price: purchasePrices[i]}, function(err, res){console.log("PURCHASENEW:",i,":", res);});
      }
      
      db.collection("playerStats").updateOne({name: username}, {$inc: {cash: -(purchasePrices[i]*purchaseQuantities[i])}}, function(err, res){console.log("DEBIT:",itemIds,":",i,":",itemIds[i],":", res,"|=|=|=|=|", res.result);});
    }
  });
}