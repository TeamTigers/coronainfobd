window.onload = function() {
  var chart = new CanvasJS.Chart("deathWithDate", {
    animationEnabled: true,
    title: {
      text: "Number of death with date"
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
        dataPoints: [{ x: new Date(2020, 03, 15), y: 1 }]
      }
    ]
  });
  chart.render();
};
