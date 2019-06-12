let myChart;
const N1 = document.getElementById('N');
const Lambda1 = document.getElementById("lambda");
const A1 = document.getElementById("a");
const B1 = document.getElementById("b");
const L1 = document.getElementById("L");
let countt = -255, multiplyer = -count;

function drowChart() {

    var ctx = document.getElementById('myChart').getContext('2d');
     myChart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: [],
             datasets: [
                 {
                     label: 'I(x)',
                     data: [],
                     labels: [],
                     borderColor: '#007bff',
                     borderWidth: 2,
                     fill: false,
                     pointRadius: 0,

                 }
             ]
         },
        options: {
            scales: {
                yAxes: [{
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        fontFamily: 'Helvetica',
                        fontStyle:  'bold',
                        labelString: "Интенсивность (I)"
                    },
                    ticks: {
                        fontColor: "black",
                        fontStyle: 'bold',
                        callback: function (value, index, values) {
                            return (100 * (value)).toFixed(2);
                        }
                    }

                }],
                xAxes: [{
                    position: 'top',
                    scaleLabel: {
                        display: true,
                        fontStyle: 'bold',
                        lineHeight: 1,
                        padding: 2,
                        labelString: "Расстояние (мм)"
                    },
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        fontSize: 12,
                        fontColor: "black",
                        fontStyle: 'bold',

                        maxTicksLimit: 9,
                        callback: function (value, index, values) {
                            if( value === -150 || value === -116.6 || value === -83.2 || value === -49.8 || value === -16.4){
                                return value;
                            } else if (value === 17){
                                return 16.4;
                            }else if (value === 50.4){
                                return 49.8;
                            } else if (value === 83.8){
                                return 83.2;
                            } else if (value === 117.2){
                                return 116.6;
                            }
                            return '';
                        },
                    }
                }]
            }
        }
    });
    updateChart();
}

function updateChart() {
    let wavelength = Number(Lambda1.value),
        N = Number(N1.value),
        b = Number(A1.value) * 1e-3,
        d = Number(B1.value) * 1e-3,
        L = Number(L1.value) * 1e3;

    let labels = [];
    let intensities = [];

    function sinfi(x) {
        return x/Math.sqrt((Math.pow(x, 2) + Math.pow(L, 2)))
    }

    function intensityFunction(x) {
       if(x === 0){
           x = 0.000000001;
       }

        let e = 1e-6;
        let u = (Math.PI * b * sinfi(x)) / (wavelength * e);
        let q = (Math.PI * d * sinfi(x)) / (wavelength * e );
        let res = Math.pow(b, 2) * Math.pow(Math.sin(u) / u, 2) * Math.pow(Math.sin(N * q) / Math.sin(q), 2)
        intensities.push(res)
    }




    for (let x = -3/2 * 1e2; x <=3/2 * 1e2 ; x += 0.1  ) {
        x = +x.toFixed(10);
        labels.push(+x.toFixed(2));
        intensityFunction(x);
    }
    // for (let x = -3/2 * 1e2; x <= 3/2 * 1e2; x+=3/510 ) {
    //     labels.push(x.toFixed(2));
    //     intensityFunction(x);
    // }
    if(d > b || N === 1) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = intensities;
        drawMonoInterfPicture(wavelength, d * 100, b * 100, N, L);
    } else {
        drawMonoInterfPicture(0, d * 100, b * 100, N, L);
        myChart.data.labels = 0;
        myChart.data.datasets[0].data = 0;
    }
    myChart.update();
}