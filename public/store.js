

function handleSellButton() {

}

var itemData = [];
window.addEventListener('DOMContentLoaded', function() {
    var itemElements = document.getElementsByClassName('itemElement');

    //these are defined in the index
    itemData = compileItemData(itemElements);
    compileItemDropdowns(itemElements, itemData);

    var sellButton = document.getElementById("sellButton");
    if (sellButton) {
        sellButton.addEventListener("click", handleSellButton);
    }

});
