var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["0 time", "1 time", "2 time", "3 time", "4 time", "5 time"],
        datasets: [{
            label: "$ 's Over Time",
            data: [1, 1.4, 2.3, 4.5, 6.2, 9],
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
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
