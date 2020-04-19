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
      setDeath_chart(covid_Deaths_Daily);
      setInfected_chart(covid_Positive_Daily);
    })
    .fail(function () {
      showToast("Something went wrong!");
    })
    .always(function () {
      showChartsAfterResponse();
    });

  // Infected disctrict (column chart)

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
        startAngle: 25,
        dataPoints: [
          { y: 1869, label: "Dhaka" },
          { y: 105, label: "Chattagram" },
          { y: 66, label: "Mymensingh" },
          { y: 47, label: "Rangpur" },
          { y: 41, label: "Barishal" },
          { y: 9, label: "Rajshahi" },
          { y: 7, label: "Sylhet" },
          { y: 6, label: "Khulna" },
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
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        name: "Infected",
        showInLegend: true,
        type: "line",
        color: "#2664c2",
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
        color: "#23cf2e",
        markerSize: 0,
        dataPoints: covid_Recovered_Array,
      },
    ],
  });

  stack_chart.render();

  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    stack_chart.render();
  }
}

// quarantine pie chart

let percent_chart = new CanvasJS.Chart("info_percent", {
  theme: "light2",
  exportEnabled: true,
  animationEnabled: true,
  title: {
    text: "Quarantine information of BD",
  },
  legend: {
    cursor: "pointer",
  },
  data: [
    {
      type: "pie",
      startAngle: 240,
      showInLegend: true,
      indexLabel: "{name} - #percent%",
      toolTipContent: "<b>{name}:</b> {y} (#percent%)",
      dataPoints: [
        { y: 71393, name: "Released from quarantine" },
        { y: 48371, name: "In quarantine" },
      ],
    },
  ],
});
percent_chart.render();

// Dead people chart with time (column chart)
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

// Infected people chart with time (column chart)
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
      title: "Number of people",
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
