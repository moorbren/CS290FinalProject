/*
 * Write your server code in this file.  Don't forget to add your name and
 * @oregonstate.edu email address below.
 *
 * name: Brendan Moore
 * email: moorbren@oregonstate.edu
 */

var http = require("http");
var fs = require("fs");
var fileCache = []
var fileNames = []
var dataPath = "public/";

var port = process.env.PORT || 3000;


var server = http.createServer();
server.on('request', (request, response) => {
    var header = "text/html", fileType = "html", modifiedUrl = request.url;

    // "/" request returns index.html
    if(modifiedUrl == "/")
        modifiedUrl = dataPath + "index.html";
    
    fs.access(modifiedUrl, function (error){
        var file = null;
        if(!error){//if file can be accessed without error
            header = getHeader(getFileExtension(modifiedUrl));
            response.status = 200;
        }else{//on fail, serves default page
            response.status =404;
            var fileType = getFileExtension(modifiedUrl);
            header = "text/html";
            modifiedUrl = dataPath + "404.html";
        }

        //gets the file requested by the user, error checked previously
        file = getFile(modifiedUrl);

        console.log("Requested URL:" + request.url);
        console.log("===status:"+ response.status);
        console.log("===header:"+header);
        try{
            response.setHeader("Content-Type", header);
            response.write(file);
            response.end("");
        }catch(error){
            console.log("Unexpected error sending data.");
            response.status = 400;
            response.end("Error");
        }
    });
    
});

server.listen(port, function(err){
    if(err){
        throw err;
    }else{
        console.log("server listening on port " + port);
    }
});


//all files requested here are assumed correct
//checks if file has been previously requested, if not then it will cache it into a list
// returns file 
function getFile(localFilePath){
    for(var x = 0; x < fileCache.length; x++){
        if(fileNames[x] == localFilePath){
            console.log("File discovered in cache at index " + x);
            return fileCache[x];
        }
    }

    //if file not found above, then it hasn't been cached
    console.log("File not cached, saving at index " + fileCache.length);
    fileCache.push(fs.readFileSync(localFilePath));
    fileNames.push(localFilePath);
    return fileCache[fileCache.length-1];//fixes scope issue
    
}

//gets header by comporing the 
function getHeader(fileType){
    if(fileType == "jpg" || fileType == "png"){
        return "image/" +fileType;
    }else if(fileType == "html" || fileType == "css"){
        return "text/" +fileType;
    }else if(fileType == "js"){
        return "application/javascript";
    }else{
        return "undefined";
    }
}

//assumes all strings contain valid file extensions at the end
//returns string of file extension without period
//      ex. "picture.jpg" -> "jpg" or "picture.png" -> "png"
function getFileExtension(fName){
    dotPos = fName.length-1
    //this section finds the last period in the fileName
    for(var x = fName.length; x >= 0; x--){
        if(fName.charAt(x) == '.'){
            dotPos = x;
            x = 0;
        }
    }
    //this gets a substring between the dot and the end of the file
    return fName.substring(dotPos+1, fName.length);
}