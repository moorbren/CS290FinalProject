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
                    if (event.target.status != 200) {
                        alert("somethin went wrong!");
                    }
                    else {
                        var responseObject = JSON.parse(event.target.response);

                        var cashElem = document.getElementById("cash");
                        var remainingCash = parseInt(cashElem.innerText.slice(1) + responseObject.price);
                        cashElem.innerText = "$" + remainingCash;

                        itemInfo.quantity -= responseObject.quantity;
                        if (itemInfo.quantity <= 0) {
                            item.parentElement.removeChild(item);
                        }
                    }
                });
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
    var dat = [10,100,1000,10000,100000,20000,30000,50000,100000];
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
