var username;

function handleBuyButton() {
    var itemElems = document.querySelectorAll(".itemElement");
    itemElems.forEach(function(item) {
        var itemInfo = JSON.parse(item.getAttribute('data'));
        //console.log("===",itemInfo);
        var quantityInput = item.querySelector(".quantityInput");
        if (quantityInput) { //there is in fact a quantity input for this item elem.
            if (quantityInput.value > 0) { //the quantity is greater than zero, therefore we are buying at least one of these.
                //TODO :: cash considerations.
                //anti-cheat code must still be implemented on the server-side.
                console.log(quantityInput.value);
                var postRequest = new XMLHttpRequest();
                var requestURL = '/supplies/'+username + "/buy";
                postRequest.open("POST", requestURL);
                var requestBody = JSON.stringify({
                    id: itemInfo.id,
                    quantity: quantityInput.value,
                    price: itemInfo.price
                });

                postRequest.addEventListener('load', function(event) {
                    //handling response from server.
                    var responseObject = JSON.parse(event.target.response);
                    console.log(responseObject);
                    if (event.target.status === 200) {
                        //purchase complete
                        var cashElem = document.getElementById("cash");
                        console.log(cashElem.innerText.slice(1));
                        console.log(responseObject.price);
                        var remainingCash = parseInt(cashElem.innerText.slice(1)) - responseObject.price;
                        cashElem.innerText = "$" + remainingCash;
                    }
                    else {
                        //bad stuff
                    }
                    console.log(event.target.response);
                });

                postRequest.setRequestHeader('Content-Type', 'application/json');
                postRequest.send(requestBody);
            }
        }
    })
}


window.addEventListener('DOMContentLoaded', function() {
    username = "JoeyFatone"; //TODO :: put code here for getting the user info
    var buyButton = document.getElementById("buyButton");
    if (buyButton) {
        buyButton.addEventListener("click", handleBuyButton);
    }
});