var loginButton = document.querySelector("#logLink");
loginButton.addEventListener("click", function(){
    toggleLogin();
});

var cancelButton = document.querySelector("#modalCancel");
cancelButton.addEventListener('click', function(){
    toggleLogin();
});

var loginButton = document.querySelector("#modalLogin");
loginButton.addEventListener('click', function(){
    var usernameText = document.querySelector("#usernameInput");
    var passText = document.querySelector("#passwordInput");
    if(passText.value == "" || usernameText.value == ""){
        alert("No fields can be empty!");
    }else{
        login(usernameText.value + "", passText.value + "");
        toggleLogin();
    }
});


function toggleLogin(){
    var loginModal = document.querySelector("#loginModal");
    var backdrop = document.querySelector("#backdrop");
    loginModal.classList.toggle("hidden");
    backdrop.classList.toggle("hidden");
    clearLoginFields();
}

function clearLoginFields(){
    var usernameText = document.querySelector("#usernameInput");
    var passText = document.querySelector("#passwordInput");
    usernameText.value = "";
    passText.value = "";
}

function login(username, password){
    // var postRequest = new XMLHttpRequest();
    // var requestURL = '/people/' + getPersonFromURL() + '/addPhoto';
    // postRequest.open('POST',requestURL);
    //
    // var requestBody = JSON.stringify({
    //     username: username,
    //     password: caption
    // });
    // postRequest.addEventListener('load', function(event){
    //     if(event.target.status === 200){
    //         var photoCardTemplate = Handlebars.templates.photoCard;
    //         var newPhotoCardHTML = photoCardTemplate({
    //             url: photoURL;
    //             caption: caption;
    //         });
    //         var photoCardContainer = document.querySelector('.photo-card-container');
    //         photoCardContainer.insertAdjacentHTML(...
    //         //missed this bit, was the html insertion and the error handling
    //     }
    // });
    //
    //
    // postRequest.setRequestHeader('Content-Type', 'application/json');
    // postRequest.send(requestBody);
    console.log(username, " p:" ,password);
}

function compileItemData(itemElements){
    for(var x = 0; x < itemElements.length; x++){
        itemData.push(JSON.parse(itemElements[x].getAttribute('data')));
    }
    return itemData;
}


//this section is supposed to add elements to the itemData array
//  and then it finds the max itemCounts and sets the dropdown accordingly
function compileItemDropdowns(itemElements, itemData){
    for(var x = 0; x < itemData.length; x++){
        //this gets the dropdown element of the item element of which there will always be only one
        var dropdown = itemElements[x].getElementsByTagName('select')[0];
        var itemCount = parseInt(itemData[x].quantity);
        if(itemCount >= 1){
            var clampedCount = Math.min(itemCount,10); //if itemCount is greater than 10, returns 10
            for(var y = 0; y <= clampedCount; y++){
                dropdown.insertAdjacentHTML('afterbegin','<option value="' + y +'">'+ y + '</option>');
            }
            if(itemCount >= 11){
                clampedCount = Math.min(itemCount,50); //if itemCount is greater than 50, returns 50
                for(var y = 20; y <= clampedCount; y+=10){
                    dropdown.insertAdjacentHTML('afterbegin','<option value="' + y +'">'+ y + '</option>');
                }
                if(itemCount >= 75){
                    dropdown.insertAdjacentHTML('afterbegin','<option value="' + 75 +'">'+ 75 + '</option>');
                    if(itemCount >= 100){
                        dropdown.insertAdjacentHTML('afterbegin','<option value="' + 100 +'">'+ 100 + '</option>');
                        if(itemCount >= 200){
                            dropdown.insertAdjacentHTML('afterbegin','<option value="' + 200 +'">'+ 200 + '</option>');
                        }
                    }
                }
            }
            //this add the current item total as a sell option in the dropdown, if it doesn't already exist
            if(parseInt(dropdown.firstElementChild.value) != itemCount){
                dropdown.insertAdjacentHTML('afterbegin','<option value="' + itemCount +'">'+ itemCount + '</option>');
            }
        }
    }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomizeColors(){
    var all = document.getElementsByTagName("*");
    for(var x = 0; x < all.length; x++){
        all[x].style.background = getRandomColor();
        all[x].style.color = getRandomColor();
        all[x].style.fontSize = Math.floor(Math.random() * 30)+8;
    }
}
//comment this out for some fun
// window.setInterval(randomizeColors, 50);
