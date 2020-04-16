window.onload = function () {
  let apiURL = "https://pomber.github.io/covid19/timeseries.json";

  let covid_Infected_Array = [];
  let covid_Deaths_Array = [];
  let covid_Recovered_Array = [];
  let covid_Deaths_Daily = [];
  let covid_Positive_Daily = [];

  hideChartsTillResponse();

  $.get(apiURL, function () {})
    .done(function (res) {
      let sizeResponse = res["Bangladesh"].length;
      for (let index = 46; index < sizeResponse; index++) {
        // Area chart Data
        covid_Infected_Array.push({
          x: new Date(res["Bangladesh"][index]["date"]),
          y: res["Bangladesh"][index]["confirmed"],
        });
        covid_Deaths_Array.push({
          x: new Date(res["Bangladesh"][index]["date"]),
          y: res["Bangladesh"][index]["deaths"],
        });
        covid_Recovered_Array.push({
          x: new Date(res["Bangladesh"][index]["date"]),
          y: res["Bangladesh"][index]["recovered"],
        });

        // Daily deaths & positive cases
        let death_Diff =
          res["Bangladesh"][index]["deaths"] -
          res["Bangladesh"][index - 1]["deaths"];
        covid_Deaths_Daily.push({
          x: new Date(res["Bangladesh"][index]["date"]),
          y: death_Diff,
        });

        let positive_Diff =
          res["Bangladesh"][index]["confirmed"] -
          res["Bangladesh"][index - 1]["confirmed"];
        covid_Positive_Daily.push({
          x: new Date(res["Bangladesh"][index]["date"]),
          y: positive_Diff,
        });
      }
      setCovid_progress(
        covid_Infected_Array,
        covid_Deaths_Array,
        covid_Recovered_Array
      );
      setPercent_chart(
        res["Bangladesh"][sizeResponse - 1]["confirmed"],
        res["Bangladesh"][sizeResponse - 1]["deaths"],
        res["Bangladesh"][sizeResponse - 1]["recovered"]
      );
      setDeath_chart(covid_Deaths_Daily);
      setInfected_chart(covid_Positive_Daily);
    })
    .fail(function () {
      showToast("Something went wrong!");
    })
    .always(function () {
      showChartsAfterResponse();
    });

  // Infected disctrict (pie chart)

  let district_chart = new CanvasJS.Chart("infectedDistrict", {
    theme: "light2",
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

  district_chart.render();
};

function hideChartsTillResponse() {
  $("#analyticsPreloader").show();
  $("#analyticsContent").hide();
}

function showChartsAfterResponse() {
  $("#analyticsPreloader").hide();
  $("#analyticsContent").show();
}

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
function setCovid_progress(
  covid_Infected_Array,
  covid_Deaths_Array,
  covid_Recovered_Array
) {
  let stack_chart = new CanvasJS.Chart("covid_progress", {
    theme: "light2",
    zoomEnabled: true,
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "COVID-19 timeline in Bangladesh",
    },
    subtitles: [
      {
        text: "Try zooming and panning!",
      },
    ],
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
        legendMarkerType: "square",
        type: "line",
        color: "#0d47a1",
        markerSize: 0,
        dataPoints: covid_Infected_Array,
      },
      {
        name: "Deaths",
        showInLegend: true,
        legendMarkerType: "circle",
        type: "line",
        color: "#d50000",
        markerSize: 0,
        dataPoints: covid_Deaths_Array,
      },
      {
        name: "Recovered",
        showInLegend: true,
        legendMarkerType: "circle",
        type: "line",
        color: "#1b5e20",
        markerSize: 0,
        dataPoints: covid_Recovered_Array,
      },
    ],
  });
  stack_chart.render();
}

// percent_chart
function setPercent_chart(toal_Positive, total_Deaths, total_Recovered) {
  let percent_chart = new CanvasJS.Chart("info_percent", {
    theme: "light2",
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
  let death_chart = new CanvasJS.Chart("deathWithDate", {
    theme: "light2",
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
        type: "column",
        color: "#de4536",
        dataPoints: covid_Deaths_Daily,
      },
    ],
  });
  death_chart.render();
}

// Infected people chart with time (line chart)
function setInfected_chart(covid_Positive_Daily) {
  let infected_chart = new CanvasJS.Chart("infectionWithDate", {
    theme: "light2",
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
        type: "column",

        xValueFormatString: "DD MMM",
        color: "#0288d1",
        dataPoints: covid_Positive_Daily,
      },
    ],
  });
  infected_chart.render();
}
