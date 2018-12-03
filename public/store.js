

function handleSellButton() {

}

var itemData = [];
window.addEventListener('DOMContentLoaded', function() {
    var itemElements = document.getElementsByClassName('itemElement');
    for(var x = 0; x < itemElements.length; x++){
        //this section is supposed to add elements to the itemData array
        //  and then it finds the max itemCounts and sets the dropdown accordingly
        itemData.push(JSON.parse(itemElements[x].getAttribute('data')));
        var dropdown = itemElements[x].getElementsByTagName('select')[0];
        var itemCount = parseInt(itemData[x].quantity);
        if(itemCount >= 1){
            var clampedCount = Math.min(itemCount,10); //if itemCount is greater than 10, returns 10
            for(var y = 0; y <= clampedCount; y++){
                dropdown.insertAdjacentHTML('afterbegin','<option value="' + y +'">'+ y + '</option>');
            }
            if(itemCount >= 11){
                clampedCount = Math.min(itemCount,50); //if itemCount is greater than 50, returns 50
                for(var y = 20; y <= clampedCount; y+=10){
                    dropdown.insertAdjacentHTML('afterbegin','<option value="' + y +'">'+ y + '</option>');
                }
                if(itemCount >= 75){
                    dropdown.insertAdjacentHTML('afterbegin','<option value="' + 75 +'">'+ 75 + '</option>');
                    if(itemCount >= 100){
                        dropdown.insertAdjacentHTML('afterbegin','<option value="' + 100 +'">'+ 100 + '</option>');
                        if(itemCount >= 200){
                            dropdown.insertAdjacentHTML('afterbegin','<option value="' + 200 +'">'+ 200 + '</option>');
                            if(itemCount >= 201){
                                dropdown.insertAdjacentHTML('afterbegin','<option value="' + itemCount +'">'+ itemCount + '</option>');
                            }
                        }
                    }
                }
            }
        }


    }

    var sellButton = document.getElementById("sellButton");
    if (sellButton) {
        sellButton.addEventListener("click", handleSellButton);
    }

});
