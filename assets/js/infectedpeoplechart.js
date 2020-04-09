window.onload = function () {
  // Infected people chart with time

  var chart = new CanvasJS.Chart("infectionWithDate", {
    exportEnabled: true,
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
          { x: new Date(2020, 03, 7), y: 41 },
          { x: new Date(2020, 03, 8), y: 54 },
          { x: new Date(2020, 03, 9), y: 112 }
        ],
      },
    ],
  });

  // Dead people chart with time

  var chart2 = new CanvasJS.Chart("deathWithDate", {
    exportEnabled: true,
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
          { x: new Date(2020, 03, 7), y: 5 },
          { x: new Date(2020, 03, 8), y: 3 },
          { x: new Date(2020, 03, 9), y: 1 }
        ],
      },
    ],
  });

  // var chart3 = new CanvasJS.Chart("infectedAge", {
  //   exportEnabled: true,
  //   animationEnabled: true,
  //   title: {
  //     text: "Affected People Age Range",
  //   },
  //   legend: {
  //     cursor: "pointer",
  //     itemclick: explodePie,
  //   },
  //   data: [
  //     {
  //       type: "pie",
  //       showInLegend: true,
  //       toolTipContent: "{name}: <strong>{y}</strong>",
  //       indexLabel: "{name} - {y}",
  //       dataPoints: [
  //         { y: 5, name: "61-Upper", exploded: true },
  //         { y: 7, name: "51-60" },
  //         { y: 9, name: "41-50" },
  //         { y: 5, name: "31-40" },
  //         { y: 10, name: "21-30" },
  //         { y: 4, name: "11-20" },
  //         { y: 1, name: "10-lower" },
  //       ],
  //     },
  //   ],
  // });

  chart.render();
  chart2.render();
  // chart3.render();
};

// function explodePie(e) {
//   if (
//     typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded === "undefined" ||
//     !e.dataSeries.dataPoints[e.dataPointIndex].exploded
//   ) {
//     e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
//   } else {
//     e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
//   }
//   e.chart.render();
// }
