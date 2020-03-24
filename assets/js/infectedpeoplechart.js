window.onload = function () {
  var chart = new CanvasJS.Chart("infectionWithDate", {
    animationEnabled: true,
    title: {
      text: "Number of infection with date"
    },
    axisX: {
      title: "Date",
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
          { x: new Date(2020, 02, 19), y: 4 },
          { x: new Date(2020, 02, 20), y: 2 },
          { x: new Date(2020, 02, 21), y: 4 },
          { x: new Date(2020, 02, 22), y: 3 },
          { x: new Date(2020, 02, 23), y: 6 },
          { x: new Date(2020, 02, 24), y: 6 }
        ]
      }
    ]
  });

  var chart2 = new CanvasJS.Chart("deathWithDate", {
    animationEnabled: true,
    title: {
      text: "Death age with time"
    },
    axisX: {
      title: "Date",
      valueFormatString: "DD MMM"
    },
    axisY: {
      title: "Age"
    },
    data: [
      {
        type: "scatter",
        xValueFormatString: "DD MMM",
        color: "#b71c1c",
        toolTipContent:
          '<span style="color:#4F81BC "><b>{name}</b></span><br/><b> Date:</b> {x} <br/><b> Age:</b></span> {y} yrs',
        name: "Age of Dead People",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2020, 02, 18), y: 70 },
          { x: new Date(2020, 02, 21), y: 73 },
          { x: new Date(2020, 02, 23), y: 60 },
          { x: new Date(2020, 02, 24), y: 75 }
        ]
      }
    ]
  });

  chart.render();
  chart2.render();
};
