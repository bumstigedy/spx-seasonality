let monthly={"Jan":1.1331741398,"Feb":-0.2778037877,"Mar":0.2347758295,"Apr":1.2708651391,"May":-0.2435417759,"Jun":0.728154006,"Jul":1.1705936306,
"Aug":0.5656155357,"Sep":-0.9567453965,"Oct":0.3400197415,"Nov":0.5608940258,"Dec":1.3366178733};
console.log(monthly);
console.log('type:  ',typeof monthly)
console.log(Object.values(monthly));


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        
        datasets: [{
            label: 'S&P500 monthly average return %',
            data: monthly,
            backgroundColor: [
                '#03a9f4',
                '#ff595e',
                '#03a9f4',
                '#03a9f4',
                '#ff595e',
                '#03a9f4',
                '#03a9f4',
                '#03a9f4',
                '#ff595e',
                '#03a9f4',
                '#03a9f4',
                '#03a9f4',
            ],
            borderColor: [
                '#03a9f4',
                '#ff595e',
                '#03a9f4',
                '#03a9f4',
                '#ff595e',
                '#03a9f4',
                '#03a9f4',
                '#03a9f4',
                '#ff595e',
                '#03a9f4',
                '#03a9f4',
                '#03a9f4',

            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: '%'
              },
            },
            x: {
                grid: {
                  display: false
                }
              },
        }
        
        ,plugins: {legend: 
          {display: false}
        }
        ,responsive: false,  
  },
    
    
});

let quarterly = {"1Q":1.4884349651,"2Q":2.2163091671,"3Q":1.0003806997,"4Q":2.5988702226};

var ctx2 = document.getElementById('qtrChart').getContext('2d');
var qtrChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        //labels: ['1Q', '2Q', '3Q', '4Q'],
        datasets: [{
            label: 'S&P 500 quarterly average return %',
            data: quarterly,
            backgroundColor: [
                '#03a9f4',
              ],
            borderColor: [
                '#03a9f4',
              ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: '%'
              },
            },
            x: {
                grid: {
                  display: false
                }
              },
        }
        ,plugins: {legend: 
          {display: false}
        }
        ,responsive: false},
    
    
});

let month_stdev = {"Jan":4.7220456691,"Feb":4.0338662214,"Mar":5.182920126,"Apr":5.8968841163,"May":5.378058601,"Jun":5.0852835603,"Jul":5.5285348485,"Aug":5.8118286657,"Sep":5.3777987459,"Oct":6.1803519075,"Nov":4.738418511,"Dec":3.6055950865};
let month_min = {"Jan":-11.367244505,"Feb":-15.1424320439,"Mar":-25.8289705785,"Apr":-18.8022275335,"May":-22.9426378759,"Jun":-16.1475434248,"Jul":-14.3717736036,"Aug":-13.9477113626,"Sep":-30.2442529818,"Oct":-23.0776269773,"Nov":-11.6766507416,"Dec":-13.4328380971};
let month_max = {"Jan":11.2111949548,"Feb":11.5717874808,"Mar":13.8480618103,"Apr":33.3901205513,"May":14.3534993398,"Jun":20.794156617,"Jul":31.0869638005,"Aug":37.3158782322,"Sep":13.1858384599,"Oct":16.5799057224,"Nov":10.4138287374,"Dec":10.6639192958};

var ctx3 = document.getElementById('volChart').getContext('2d');
var volChart = new Chart(ctx3, {
    type: 'line',
    data: {
        
        datasets: [{
            
          label: 'min',
          data: month_min,
          backgroundColor: '#03a9f4',
          borderColor: '#03a9f4'
          
        },
        {label: 'max',
          data: month_max,
          backgroundColor: '#03a9f4',
          borderColor: '#03a9f4'
          
        },
        {
          type: 'bar',
          label: 'stdev',
          data: month_stdev,
          backgroundColor: '#03a9f4',
          borderColor: '#03a9f4'
        },
        ]
    },
    options: {
      scales: {
          y: {
            grid: {
              display: false
            },
            title: {
              display: true,
              text: '%'
            },
          },
          x: {
              grid: {
                display: false
              }
            },
      }
  ,responsive: false,
  plugins: {legend: 
            {display: false}
          }
   
},
    
});

let republicanImg= document.createElement("img");
republicanImg.src = "republican2.png";


let democratImg = document.createElement("img");
democratImg.src="Democratic2.png";



let party={"Democrat":79.7881274057,"Republican":27.5210906818};

var ctx4 = document.getElementById('partyChart').getContext('2d');
var partyChart = new Chart(ctx4, {
    type: 'bar',
    data: {
        
        datasets: [
        {
          label: 'TotalParty',
          type: 'scatter',
          data: party,
          pointStyle: [democratImg, republicanImg]
        },
      ]
    },
    options: {
        scales: {
            y: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: '%',
              
              },
              max: 100
            },
            x: {
                grid: {
                  display: false
                }
              },
        }
        ,plugins: {legend: 
          {display: false}
        }
        ,responsive: false},
        interaction: {
          mode: 'nearest'
      },
    
    
});

let maxPresidents = {"Bill Clinton":203.2477409366,"Barack Obama":140.2693826416,"Dwight D. Eisenhower":118.9525192381,"Ronald Reagan":103.6966471177};
