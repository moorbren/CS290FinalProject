function handleSellButton() {

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
    //these are defined in the index
    compileItemDropdowns(getItemElements(), getItemData());
    fixChangesInPrice();
    var dat = [10,100,1000,10000,100000,20000,30000,50000,100000];
    loadChart(dat);

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
