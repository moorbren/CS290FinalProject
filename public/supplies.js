var username;

function handleBuyButton() {
    var itemElems = document.querySelectorAll(".itemElement");
    itemElems.forEach(function(item) {
        var itemInfo = JSON.parse(item.getAttribute('data'));
        console.log("===",itemInfo);
        var quantityInput = item.querySelector(".quantityInput");
        if (quantityInput) {
            console.log(quantityInput.value);
            var postRequest = new XMLHttpRequest();
            var requestURL = '/supplies/'+username;
        }
    })
}


window.addEventListener('DOMContentLoaded', function() {
    var buyButton = document.getElementById("buyButton");
    if (buyButton) {
        buyButton.addEventListener("click", handleBuyButton);
    }
});