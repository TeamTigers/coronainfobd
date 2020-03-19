/**
 *
 */

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
        color: "#F08080",
        dataPoints: [
          { x: new Date(2020, 03, 8), y: 3 },
          { x: new Date(2020, 03, 14), y: 2 },
          { x: new Date(2020, 03, 16), y: 3 },
          { x: new Date(2020, 03, 17), y: 2 },
          { x: new Date(2020, 03, 18), y: 4 },
          { x: new Date(2020, 03, 19), y: 4 }
        ]
      }
    ]
  });
  chart.render();
};
