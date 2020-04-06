window.onload = function () {
  var chart = new CanvasJS.Chart("infectionWithDate", {
    animationEnabled: true,
    title: {
      text: "Number of infection with time",
    },
    axisX: {
      title: "Date",
      valueFormatString: "DD MMM",
    },
    axisY: {
      title: "Number of People",
      includeZero: false,
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
          { x: new Date(2020, 02, 19), y: 4 },
          { x: new Date(2020, 02, 20), y: 2 },
          { x: new Date(2020, 02, 21), y: 4 },
          { x: new Date(2020, 02, 22), y: 3 },
          { x: new Date(2020, 02, 23), y: 6 },
          { x: new Date(2020, 02, 24), y: 6 },
          { x: new Date(2020, 02, 26), y: 5 },
          { x: new Date(2020, 02, 27), y: 4 },
          { x: new Date(2020, 02, 30), y: 1 },
          { x: new Date(2020, 02, 31), y: 2 },
          { x: new Date(2020, 03, 1), y: 3 },
          { x: new Date(2020, 03, 2), y: 2 },
          { x: new Date(2020, 03, 3), y: 5 },
          { x: new Date(2020, 03, 4), y: 9 },
          { x: new Date(2020, 03, 5), y: 18 },
          { x: new Date(2020, 03, 6), y: 35 },
        ],
      },
    ],
  });

  var chart2 = new CanvasJS.Chart("deathWithDate", {
    animationEnabled: true,
    title: {
      text: "Number of death with time",
      color: "#de4536",
    },
    axisY: {
      title: "Number of death",
      includeZero: false,
    },
    axisX: {
      title: "Date",
      valueFormatString: "DD MMM",
    },
    data: [
      {
        yValueFormatString: "#,Death ### ",
        xValueFormatString: "DD MMM",
        type: "spline",
        color: "#de4536",
        dataPoints: [
          { x: new Date(2020, 02, 18), y: 1 },
          { x: new Date(2020, 02, 21), y: 1 },
          { x: new Date(2020, 02, 23), y: 1 },
          { x: new Date(2020, 02, 24), y: 1 },
          { x: new Date(2020, 02, 25), y: 1 },
          { x: new Date(2020, 03, 1), y: 1 },
          { x: new Date(2020, 03, 4), y: 2 },
          { x: new Date(2020, 03, 5), y: 1 },
          { x: new Date(2020, 03, 6), y: 3 },
        ],
      },
    ],
  });

  chart.render();
  chart2.render();
};
