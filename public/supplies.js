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
                    if(event.target.status != 200){
                        alert("You don't have enough money to buy that much!!");
                    }else{
                        //if it isn't a 200 status, this crashes the script
                        var responseObject = JSON.parse(event.target.response);

                        var cashElem = document.getElementById("cash");
                        console.log(cashElem.innerText.slice(1));
                        console.log(responseObject.price);
                        var remainingCash = parseInt(cashElem.innerText.slice(1)) - responseObject.price;
                        cashElem.innerText = "$" + remainingCash;
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
    var dat = [];
    for(var x = 0; x < 1000; x++){
        dat.push(x);
    }
    loadChart(dat);

    var buyButton = document.getElementById("buyButton");
    if (buyButton) {
        buyButton.addEventListener("click", handleBuyButton);
    }

    var clearValuesButton = document.getElementById("clearValuesButton");
    if(clearValuesButton){
        clearValuesButton.addEventListener('click',clearBuyFields);
    }
});
