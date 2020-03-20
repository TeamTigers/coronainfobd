window.onload = function() {
  var chart = new CanvasJS.Chart("infectionWithDate", {
    animationEnabled: true,
    title: {
      text: "Number of infection with date"
    },
    axisX: {
      valueFormatString: "DD MMM"
    },
    axisY: {
      title: "Number of People",
      includeZero: false
    },
    data: [
      {
        type: "line",
        xValueFormatString: "DD MMM",
        color: "#0288d1",
        dataPoints: [
          { x: new Date(2020, 02, 8), y: 3 },
          { x: new Date(2020, 02, 14), y: 2 },
          { x: new Date(2020, 02, 16), y: 3 },
          { x: new Date(2020, 02, 17), y: 2 },
          { x: new Date(2020, 02, 18), y: 4 },
          { x: new Date(2020, 02, 19), y: 4 }
        ]
      }
    ]
  });

  var chart2 = new CanvasJS.Chart("deathWithDate", {
    animationEnabled: true,
    title: {
      text: "Age of death with date"
    },
    axisX: {
      valueFormatString: "DD MMM"
    },
    axisY: {
      title: "Age",
      includeZero: false
    },
    data: [
      {
        type: "line",
        xValueFormatString: "DD MMM",
        color: "#b71c1c",
        dataPoints: [{ x: new Date(2020, 02, 18), y: 70 }]
      }
    ]
  });

  chart.render();
  chart2.render();
};
