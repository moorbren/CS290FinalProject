function handleSellButton() {

}

//note itemData and itemElements match via item indices
//EX. itemData[0] == itemElements[0]
window.addEventListener('DOMContentLoaded', function() {
    //these are defined in the index
    compileItemDropdowns(getItemElements(), getItemData());

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
        clearValuesButton.sellMax = false;
        clearValuesButton.addEventListener('click',setAllValuesDropdown);
    }

});
