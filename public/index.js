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
    login(usernameText.value + "", passText.value + "");
    toggleLogin();
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
