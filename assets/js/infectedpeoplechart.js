window.onload = function () {
  // covid progress chart with time

  var stack_chart = new CanvasJS.Chart("covid_progress", {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "COVID-19 timeline in Bangladesh",
    },
    axisX: {
      valueFormatString: "DD MMM",
    },
    axisY: {
      title: "Number of People",
    },
    legend: {
      verticalAlign: "top",
      horizontalAlign: "right",
      dockInsidePlotArea: true,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        name: "Infected",
        showInLegend: true,
        legendMarkerType: "circle",
        type: "area",
        color: "#64b5f6",
        markerSize: 0,
        dataPoints: [
          { x: new Date(2020, 2, 8), y: 3 },
          { x: new Date(2020, 2, 9), y: 3 },
          { x: new Date(2020, 2, 10), y: 3 },
          { x: new Date(2020, 2, 11), y: 3 },
          { x: new Date(2020, 2, 12), y: 3 },
          { x: new Date(2020, 2, 13), y: 3 },
          { x: new Date(2020, 2, 14), y: 3 },
          { x: new Date(2020, 2, 15), y: 5 },
          { x: new Date(2020, 2, 16), y: 8 },
          { x: new Date(2020, 2, 17), y: 10 },
          { x: new Date(2020, 2, 18), y: 14 },
          { x: new Date(2020, 2, 19), y: 14 },
          { x: new Date(2020, 2, 20), y: 20 },
          { x: new Date(2020, 2, 21), y: 25 },
          { x: new Date(2020, 2, 22), y: 27 },
          { x: new Date(2020, 2, 23), y: 33 },
          { x: new Date(2020, 2, 24), y: 39 },
          { x: new Date(2020, 2, 25), y: 39 },
          { x: new Date(2020, 2, 26), y: 44 },
          { x: new Date(2020, 2, 27), y: 48 },
          { x: new Date(2020, 2, 28), y: 48 },
          { x: new Date(2020, 2, 29), y: 48 },
          { x: new Date(2020, 2, 30), y: 49 },
          { x: new Date(2020, 2, 31), y: 51 },
          { x: new Date(2020, 3, 1), y: 54 },
          { x: new Date(2020, 3, 2), y: 56 },
          { x: new Date(2020, 3, 3), y: 61 },
          { x: new Date(2020, 3, 4), y: 70 },
          { x: new Date(2020, 3, 5), y: 88 },
          { x: new Date(2020, 3, 6), y: 123 },
          { x: new Date(2020, 3, 7), y: 164 },
          { x: new Date(2020, 3, 8), y: 218 },
          { x: new Date(2020, 3, 9), y: 330 },
          { x: new Date(2020, 3, 10), y: 424 },
          { x: new Date(2020, 3, 11), y: 482 },
          { x: new Date(2020, 3, 12), y: 621 },
          { x: new Date(2020, 3, 13), y: 803 },
          { x: new Date(2020, 3, 14), y: 1012 },
        ],
      },
      {
        name: "Deaths",
        showInLegend: true,
        legendMarkerType: "circle",
        type: "area",
        color: "#d50000",
        markerSize: 0,
        dataPoints: [
          { x: new Date(2020, 2, 8), y: 0 },
          { x: new Date(2020, 2, 9), y: 0 },
          { x: new Date(2020, 2, 10), y: 0 },
          { x: new Date(2020, 2, 11), y: 0 },
          { x: new Date(2020, 2, 12), y: 0 },
          { x: new Date(2020, 2, 13), y: 0 },
          { x: new Date(2020, 2, 14), y: 0 },
          { x: new Date(2020, 2, 15), y: 0 },
          { x: new Date(2020, 2, 16), y: 0 },
          { x: new Date(2020, 2, 17), y: 0 },
          { x: new Date(2020, 2, 18), y: 1 },
          { x: new Date(2020, 2, 19), y: 1 },
          { x: new Date(2020, 2, 20), y: 1 },
          { x: new Date(2020, 2, 21), y: 2 },
          { x: new Date(2020, 2, 22), y: 2 },
          { x: new Date(2020, 2, 23), y: 3 },
          { x: new Date(2020, 2, 24), y: 4 },
          { x: new Date(2020, 2, 25), y: 5 },
          { x: new Date(2020, 2, 26), y: 5 },
          { x: new Date(2020, 2, 27), y: 5 },
          { x: new Date(2020, 2, 28), y: 5 },
          { x: new Date(2020, 2, 29), y: 5 },
          { x: new Date(2020, 2, 30), y: 5 },
          { x: new Date(2020, 2, 31), y: 5 },
          { x: new Date(2020, 3, 1), y: 6 },
          { x: new Date(2020, 3, 2), y: 6 },
          { x: new Date(2020, 3, 3), y: 6 },
          { x: new Date(2020, 3, 4), y: 8 },
          { x: new Date(2020, 3, 5), y: 9 },
          { x: new Date(2020, 3, 6), y: 12 },
          { x: new Date(2020, 3, 7), y: 17 },
          { x: new Date(2020, 3, 8), y: 20 },
          { x: new Date(2020, 3, 9), y: 21 },
          { x: new Date(2020, 3, 10), y: 27 },
          { x: new Date(2020, 3, 11), y: 30 },
          { x: new Date(2020, 3, 12), y: 34 },
          { x: new Date(2020, 3, 13), y: 39 },
          { x: new Date(2020, 3, 14), y: 46 },
        ],
      },
      {
        name: "Recovered",
        showInLegend: true,
        legendMarkerType: "circle",
        type: "area",
        color: "#43a047",
        markerSize: 0,
        dataPoints: [
          { x: new Date(2020, 2, 8), y: 0 },
          { x: new Date(2020, 2, 9), y: 0 },
          { x: new Date(2020, 2, 10), y: 0 },
          { x: new Date(2020, 2, 11), y: 0 },
          { x: new Date(2020, 2, 12), y: 0 },
          { x: new Date(2020, 2, 13), y: 0 },
          { x: new Date(2020, 2, 14), y: 0 },
          { x: new Date(2020, 2, 15), y: 0 },
          { x: new Date(2020, 2, 16), y: 2 },
          { x: new Date(2020, 2, 17), y: 3 },
          { x: new Date(2020, 2, 18), y: 3 },
          { x: new Date(2020, 2, 18), y: 3 },
          { x: new Date(2020, 2, 19), y: 3 },
          { x: new Date(2020, 2, 20), y: 3 },
          { x: new Date(2020, 2, 21), y: 3 },
          { x: new Date(2020, 2, 22), y: 3 },
          { x: new Date(2020, 2, 23), y: 3 },
          { x: new Date(2020, 2, 24), y: 5 },
          { x: new Date(2020, 2, 25), y: 7 },
          { x: new Date(2020, 2, 26), y: 11 },
          { x: new Date(2020, 2, 27), y: 11 },
          { x: new Date(2020, 2, 28), y: 15 },
          { x: new Date(2020, 2, 29), y: 15 },
          { x: new Date(2020, 2, 30), y: 19 },
          { x: new Date(2020, 2, 31), y: 25 },
          { x: new Date(2020, 3, 1), y: 25 },
          { x: new Date(2020, 3, 2), y: 25 },
          { x: new Date(2020, 3, 3), y: 26 },
          { x: new Date(2020, 3, 4), y: 30 },
          { x: new Date(2020, 3, 5), y: 33 },
          { x: new Date(2020, 3, 6), y: 33 },
          { x: new Date(2020, 3, 7), y: 33 },
          { x: new Date(2020, 3, 8), y: 33 },
          { x: new Date(2020, 3, 9), y: 33 },
          { x: new Date(2020, 3, 10), y: 33 },
          { x: new Date(2020, 3, 11), y: 36 },
          { x: new Date(2020, 3, 12), y: 39 },
          { x: new Date(2020, 3, 13), y: 42 },
          { x: new Date(2020, 3, 14), y: 42 },
        ],
      },
    ],
  });

  // Infected people chart with time (line chart)

  var infected_chart = new CanvasJS.Chart("infectionWithDate", {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "COVID-19 positive cases in time",
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
        type: "spline",
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
          { x: new Date(2020, 03, 9), y: 112 },
          { x: new Date(2020, 03, 10), y: 94 },
          { x: new Date(2020, 03, 11), y: 58 },
          { x: new Date(2020, 03, 12), y: 139 },
          { x: new Date(2020, 03, 13), y: 182 },
          { x: new Date(2020, 03, 14), y: 209 },
        ],
      },
    ],
  });

  // Dead people chart with time (spline chart)

  var death_chart = new CanvasJS.Chart("deathWithDate", {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "COVID-19 death cases in time",
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
          { x: new Date(2020, 03, 9), y: 1 },
          { x: new Date(2020, 03, 10), y: 6 },
          { x: new Date(2020, 03, 11), y: 3 },
          { x: new Date(2020, 03, 12), y: 4 },
          { x: new Date(2020, 03, 13), y: 5 },
          { x: new Date(2020, 03, 14), y: 7 },
        ],
      },
    ],
  });

  // Infected disctrict (pie chart)

  var district_chart = new CanvasJS.Chart("infectedDistrict", {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Infected People in Division",
    },
    axisY: {
      title: "COVID-19 Positive",
    },
    data: [
      {
        type: "column",
        toolTipContent: "<b>{label}</b>: {y}",
        indexLabel: "{y}",
        dataPoints: [
          { y: 529, label: "Dhaka" },
          { y: 35, label: "Chattagram" },
          { y: 15, label: "Rangpur" },
          { y: 14, label: "Mymensingh" },
          { y: 3, label: "Sylhet" },
          { y: 7, label: "Barishal" },
          { y: 1, label: "Khulna" },
        ],
      },
    ],
  });

  var percent_chart = new CanvasJS.Chart("info_percent", {
    theme: "light1",
    exportFileName: "Doughnut Chart",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Summary Percent(%) in BD",
    },
    legend: {
      cursor: "pointer",
      itemclick: explodePie,
    },
    data: [
      {
        type: "doughnut",
        innerRadius: 90,
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 1012, name: "Coronavirus cases" },
          { y: 46, name: "Deaths" },
          { y: 42, name: "Recovered" },
        ],
      },
    ],
  });

  // var chart4 = new CanvasJS.Chart("infectedArea", {
  //   exportEnabled: true,
  //   animationEnabled: true,
  //   theme: "light2", // "light1", "light2", "dark1", "dark2"
  //   title: {
  //     text: "Infected people in District/City",
  //   },
  //   axisX: {
  //     interval: 1,
  //   },
  //   axisY: {
  //     title: "No. of case",
  //   },
  //   data: [
  //     {
  //       type: "bar",
  //       axisYType: "secondary",
  //       color: "#01579b",
  //       dataPoints: [
  //         { y: 313, label: "Dhaka City" },
  //         { y: 22, label: "Dhaka(District)" },
  //         { y: 23, label: "Gazipur" },
  //         { y: 10, label: "Kishoreganj" },
  //         { y: 19, label: "Madaripur" },
  //         { y: 5, label: "Manikganj" },
  //         { y: 107, label: "Naraynganj" },
  //         { y: 14, label: "Munshiganj" },
  //         { y: 4, label: "Narshingdi" },
  //         { y: 6, label: "Rajbari" },
  //         { y: 2, label: "Tangail" },
  //         { y: 1, label: "Shariotpur" },
  //         { y: 3, label: "Gpalganj" },
  //         { y: 12, label: "Chattagram" },
  //         { y: 1, label: "Cox's bazar" },
  //         { y: 9, label: "Cumilla" },
  //         { y: 6, label: "B.Baria" },
  //         { y: 6, label: "Chandpur" },
  //         { y: 1, label: "Laksmipur" },
  //         { y: 1, label: "Moulovi bazar" },
  //         { y: 1, label: "Hobiganj" },
  //         { y: 1, label: "Sylhet" },
  //         { y: 2, label: "Rangpur" },
  //         { y: 6, label: "Gaibandha" },
  //         { y: 3, label: "Nilphamari" },
  //         { y: 1, label: "Lalmonirhat" },
  //         { y: 3, label: "Thakurgaon" },
  //         { y: 1, label: "Chuadanga" },
  //         { y: 5, label: "Mymensingh" },
  //         { y: 2, label: "Sherpur" },
  //         { y: 6, label: "Jamalpur" },
  //         { y: 1, label: "Netrokona" },
  //         { y: 3, label: "Barguna" },
  //         { y: 1, label: "Potuakhali" },
  //         { y: 3, label: "Jhalokathi" },
  //       ],
  //     },
  //   ],
  // });

  stack_chart.render();
  infected_chart.render();
  death_chart.render();
  district_chart.render();
  percent_chart.render();
};

function explodePie(e) {
  if (
    typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded === "undefined" ||
    !e.dataSeries.dataPoints[e.dataPointIndex].exploded
  ) {
    e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
  } else {
    e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
  }
  e.chart4.render();
}
