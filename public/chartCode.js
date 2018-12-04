function loadChart(earningsData){

    var adjustedData;
    if(earningsData.length > 100){
        adjustedData = [];
        //how many elements we keep for every we discard
        var targetRatio = Math.ceil(1/(100/earningsData.length));
        for(var x = 0; x <earningsData.length; x++){
            if(x % targetRatio == 0){
                adjustedData.push(earningsData[x]);
            }
        }
        earningsData = adjustedData;
    }

    timeAxis = [];
    for(var x = 0; x < earningsData.length; x++){
        timeAxis.push(x);
    }

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeAxis,
            datasets: [{
                label: "$ 's Over Time",
                data: earningsData,
                backgroundColor: [
                    'rgba(33,108,42, 0.2)'
                ],
                borderColor: [
                    'rgba(33,108,42, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
