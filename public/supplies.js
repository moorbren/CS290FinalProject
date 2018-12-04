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
                    if(event.target.status != 200){
                        if (responseObject.reason === "cash") {
                            alert("You don't have enough money to buy that much!!");
                            return;
                        }
                        if (responseObject.reason === "DB") {
                            alert("Database currently unable to process that request.");
                            return;
                        }
                        if (responseObject.reason === "stock") {
                            alert("Sorry! the item(s) you were looking to purchase are out of stock!");
                            return;
                        }
                        if (responseObject.reason === "req") {
                            alert("Something went wrong with the request.");
                            return;
                        }
                        location.reload();
                    }else{
                        //if it isn't a 200 status, this crashes the script
                        var responseObject = JSON.parse(event.target.response);

                        updateUserCash(-responseObject.price);

                        // var cashElem = document.getElementById("cash");
                        // console.log(cashElem.innerText.slice(1));
                        // console.log(responseObject.price);
                        // var remainingCash = parseInt(cashElem.innerText.slice(1)) - responseObject.price;
                        // cashElem.innerText = "$" + remainingCash;
                    }
                    clearBuyFields();
                    console.log(event.target.response);
                });

                postRequest.setRequestHeader('Content-Type', 'application/json');
                postRequest.send(requestBody);
            }
        }
    });

}

window.addEventListener('DOMContentLoaded', function() {
    username = "JoeyFatone"; //TODO :: put code here for getting the user info
    var dat = [1000,1200,6000,10000,8462,20000,30000,50000,100000];
    loadChart(dat);//input data here

    var buyButton = document.getElementById("buyButton");
    if (buyButton) {
        buyButton.addEventListener("click", handleBuyButton);
    }

    var clearValuesButton = document.getElementById("clearValuesButton");
    if(clearValuesButton){
        clearValuesButton.addEventListener('click',clearBuyFields);
    }
});
