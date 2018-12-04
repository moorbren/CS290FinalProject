var username;

function handleSellButton() {
    var itemElems = document.querySelectorAll(".itemElement");

    itemElems.forEach(function(item) {
        var itemInfo = JSON.parse(item.getAttribute('data'));

        var quantityInput = item.querySelector('.quantityInput');
        if (quantityInput) {
            if ((quantityInput.value > 0)&&(quantityInput.value <= itemInfo.quantity)) {
                console.log(quantityInput.value);
                var postRequest = new XMLHttpRequest();
                var requestURL = '/store/'+username + "/sell";
                postRequest.open("POST", requestURL);
                var requestBody = JSON.stringify({
                    id: itemInfo.id,
                    quantity: quantityInput.value,
                    price: itemInfo.price
                });

                postRequest.addEventListener('load', function(event){
                    console.log("RESPONSE RECEIVED");
                    var responseObject = JSON.parse(event.target.response);
                    console.log("resonse:", responseObject);
                    if (event.target.status != 200) {
                        alert("somethin went wrong!");
                        if (responseObject.reason === "quantity") {
                            //
                            itemInfo.quantity = responseObject.quantity;
                            item.setAttribute("data", JSON.stringify(itemInfo)); //Have to remember to set the data.
                            var values = item.querySelector('select').querySelectorAll('option');
                            values.forEach(function(optionElem) {
                                if (parseInt(optionElem.getAttribute("value")) > itemInfo.quantity) {
                                    optionElem.parentElement.removeChild(optionElem);
                                    //optionElem.removeFromParent();
                                }
                            })
                        }
                        else if (responseObject.reason === "not owned") {
                            //
                            item.parentNode.removeChild(item);
                        }
                        else {
                            updateUserCash(responseObject.income);
                        }

                    }
                    else {
                        console.log("response 200");


                        updateUserCash(responseObject.income);
                        // var cashElem = document.getElementById("cash");
                        // console.log(cashElem);
                        // var remainingCash = parseInt(cashElem.innerText.slice(1)) + responseObject.income;
                        // console.log(remainingCash);
                        // cashElem.innerText = "$" + remainingCash;
                        console.log("IIQ::",itemInfo.quantity);
                        console.log("ROQ::",responseObject.quantity);

                        itemInfo.quantity -= responseObject.quantity;
                        //console.log(JSON.stringify(itemInfo));
                        if (itemInfo.quantity <= 0) {
                            console.log("sold out!");
                            item.parentElement.removeChild(item);
                        }
                        else {
                            item.querySelector(".itemAmount").innerText = parseInt(item.querySelector(".itemAmount").innerText) - responseObject.quantity;
                        }
                        item.setAttribute("data", JSON.stringify(itemInfo)); //Have to remember to set the data.
                        var values = item.querySelector('select').querySelectorAll('option');
                        values.forEach(function(optionElem) {
                            if (parseInt(optionElem.getAttribute("value")) > itemInfo.quantity) {
                                optionElem.parentElement.removeChild(optionElem);
                                //optionElem.removeFromParent();
                            }
                        })
                    }
                });
                console.log("response sent");
                postRequest.setRequestHeader('Content-Type', 'application/json');
                postRequest.send(requestBody);

            }

        }
    });
}
//
function fixChangesInPrice(){
    var itemElems = getItemElements();
    var itemDat = getItemData();
    var changeInPriceNodes = document.getElementsByClassName("changeInPrice");
    for(var x = 0; x < itemElems.length; x++){
        var priceChange = parseInt(itemDat[x].price) - parseInt(itemDat[x].boughtAtPrice);
        if(priceChange > 0){
            changeInPriceNodes[x].classList.add("moneyText");
            changeInPriceNodes[x].textContent = '⬆ $' + priceChange;
        }else if(priceChange < 0){
            changeInPriceNodes[x].classList.add("moneyTextBad");
            changeInPriceNodes[x].textContent = '⬇ $' + priceChange;
        }else{
            changeInPriceNodes[x].textContent = '~';
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {

    username = "JoeyFatone"; //TODO :: put code here for getting the user info;

    //these are defined in the index
    compileItemDropdowns(getItemElements(), getItemData());
    fixChangesInPrice();
    var dat = [1000,1200,6000,10000,8462,20000,30000,50000,100000];
    loadChart(dat); //input data here

    var sellButton = document.getElementById("sellButton");
    if (sellButton) {
        sellButton.addEventListener("click", handleSellButton);
    }
    var sellAllButton = document.getElementById("sellAllButton");
    if(sellAllButton){
        sellAllButton.max = true;
        sellAllButton.addEventListener('click',setAllValuesDropdown);
    }

    var clearValuesButton = document.getElementById("clearValuesButton");
    if(clearValuesButton){
        clearValuesButton.max = false;
        clearValuesButton.addEventListener('click',setAllValuesDropdown);
    }



});
