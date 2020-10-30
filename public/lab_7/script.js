function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  return list;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [ // colorSet Array
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
    '#89B3D9',
    '#418FBF',
    '#F2E7C4',
    '#A67041',
    '#F24130',
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'places to eat out in the future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'retaurants by category',
      labelFontSize: 12,
      scaleBreaks: {
        customBreaks: [ // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
          { startValue: 40, endValue: 50, color: '#EB8CC6' },
          { startValue: 85, endValue: 100, color: '#3EA0DD' },
          { startValue: 140, endValue: 175, color: '#EC5657' },
        ],
      }, 
    },
    data: [
      {
        type: 'bar',
        name: 'restaurants',
        axisYType: 'secondary',
        dataPoints: datapointsFromRestaurantsList
      }
    ]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});