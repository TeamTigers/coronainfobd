window.onload = function () {

  let apiURL = "https://pomber.github.io/covid19/timeseries.json";
  
  let covid_Infected_Array = [];
  let covid_Deaths_Array = [];
  let covid_Recovered_Array = [];
  let covid_Deaths_Daily = [];
  let covid_Positive_Daily = [];

  $.get(apiURL, function() {})
    .done(function(res) {
      let sizeResponse = res["Bangladesh"].length;
      for (let index = 46; index < sizeResponse; index++) {
        // Area chart Data
        covid_Infected_Array.push({ x: new Date(res["Bangladesh"][index]["date"]), y: res["Bangladesh"][index]["confirmed"]});
        covid_Deaths_Array.push({ x: new Date(res["Bangladesh"][index]["date"]), y: res["Bangladesh"][index]["deaths"]});
        covid_Recovered_Array.push({ x: new Date(res["Bangladesh"][index]["date"]), y: res["Bangladesh"][index]["recovered"]});

        // Daily deaths & positive cases
        let death_Diff = res["Bangladesh"][index]["deaths"] - res["Bangladesh"][index - 1]["deaths"];
        covid_Deaths_Daily.push({ x: new Date(res["Bangladesh"][index]["date"]), y: death_Diff });

        let positive_Diff = res["Bangladesh"][index]["confirmed"] - res["Bangladesh"][index - 1]["confirmed"];
        covid_Positive_Daily.push({ x: new Date(res["Bangladesh"][index]["date"]), y: positive_Diff });
      }
      setCovid_progress(covid_Infected_Array, covid_Deaths_Array, covid_Recovered_Array);
      setPercent_chart(
        res["Bangladesh"][sizeResponse - 1]["confirmed"], 
        res["Bangladesh"][sizeResponse - 1]["deaths"], 
        res["Bangladesh"][sizeResponse - 1]["recovered"]);
      setDeath_chart(covid_Deaths_Daily);
      setInfected_chart(covid_Positive_Daily);
    })
    .fail(function () {
      showToast("Something went wrong!");
    })
 
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
          { y: 820, label: "Dhaka" },
          { y: 50, label: "Chattagram" },
          { y: 19, label: "Rangpur" },
          { y: 21, label: "Mymensingh" },
          { y: 6, label: "Sylhet" },
          { y: 16, label: "Barishal" },
          { y: 3, label: "Khulna" },
          { y: 3, label: "Rajshahi" },
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
 
  district_chart.render();
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


// covid_progress
function setCovid_progress(covid_Infected_Array, covid_Deaths_Array, covid_Recovered_Array) {
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
        dataPoints: covid_Infected_Array,
      },
      {
        name: "Deaths",
        showInLegend: true,
        legendMarkerType: "circle",
        type: "area",
        color: "#d50000",
        markerSize: 0,
        dataPoints: covid_Deaths_Array,
      },
      {
        name: "Recovered",
        showInLegend: true,
        legendMarkerType: "circle",
        type: "area",
        color: "#43a047",
        markerSize: 0,
        dataPoints: covid_Recovered_Array,
      },
    ],
  });
  stack_chart.render();
} 

// percent_chart
function setPercent_chart(toal_Positive, total_Deaths, total_Recovered) {
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
          { y: toal_Positive, name: "Coronavirus cases" },
          { y: total_Deaths, name: "Deaths" },
          { y: total_Recovered, name: "Recovered" },
        ],
      },
    ],
  });
  percent_chart.render();
}

// Dead people chart with time (spline chart)
function setDeath_chart(covid_Deaths_Daily) {
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
        dataPoints: covid_Deaths_Daily,
      },
    ],
  });
  death_chart.render();
} 

