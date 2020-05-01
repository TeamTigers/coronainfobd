$(function () {
  let apiUrl = "https://disease.sh/v2/historical/bangladesh?";

  // EXP : Can be scaled days: More or, less
  // TODO: Change the function's @secondDate
  let query = `lastdays=${differenceFromMarch8()}`;

  $.get(apiUrl.concat(query), function () {}).done(function (response) {
    let formattedAffectedList = [];
    let formattedRecoveredList = [];
    let timeseries = response.timeline;

    // CONVERT: Keys of the response.timeline Object to an array
    // as well as values too
    let dates = Object.keys(timeseries.cases);
    let affectedList = Object.values(timeseries.cases);
    let recoveredList = Object.values(timeseries.recovered);

    /*
        ** EXP : Zingchart's required format => 
               [
                   ["date(YYYY-MM-DD)", affectedPeople],
                   ["date(YYYY-MM-DD)", affectedPeople],
                   ["date(YYYY-MM-DD)", affectedPeople],
               ]
    */
    dates.forEach(function (eachDate, index) {
      // difference returns how many people were affected (today - yesterday)
      // NaN to Zero => || 0
      let newlyAffected = affectedList[index] - affectedList[index - 1] || 0;
      formattedAffectedList.push([filterDate(eachDate), newlyAffected]);

      let newlyRecovered = recoveredList[index] - recoveredList[index - 1] || 0;
      formattedRecoveredList.push([filterDate(eachDate), newlyRecovered]);
    });

    let arrayMaxIndex = function (array) {
      return array.indexOf(Math.max.apply(null, array));
    };

    let newlyAffectedList = formattedAffectedList.map(function (eachData) {
      return eachData[1];
    });

    let newlyRecoveredList = formattedRecoveredList.map(function (eachData) {
      return eachData[1];
    });

    let entiredDeathList = Object.values(timeseries.deaths);
    let newlyDeathsList = entiredDeathList.map(function (eachDeath, index) {
      return entiredDeathList[index] - entiredDeathList[index - 1] || 0;
    });

    let formattedDateLevelsForLineChart = dates.map(function (eachDate) {
      const dateString = new Date(
        eachDate.concat("20").split("/")
      ).toDateString();
      const convertedDateArray = dateString.split(" ");

      return convertedDateArray[1].concat("<br>").concat(convertedDateArray[2]); // Mar 07, Apr 03 ...
    });

    // SECTION: CHART RENDERING
    // Render trditional line chart

    zingchart.render({
      id: "affectedSeries",
      data: singleLineChartGenerator(
        formattedDateLevelsForLineChart,
        newlyAffectedList,
        "Newly affected"
      ),
      height: 300,
      width: "100%",
    });

    zingchart.render({
      id: "rdSeries",
      data: multiLineChartGenerator(
        formattedDateLevelsForLineChart,
        newlyRecoveredList,
        newlyDeathsList
      ),
      height: 300,
      width: "100%",
    });

    // Load calendar and render charts
    zingchart.loadModules("calendar", function () {
      zingchart.render({
        id: "affectedHeatMap",
        data: heatMapGenerator(
          formattedAffectedList,
          3,
          5,
          ["none", "#f32160"],
          "Newly affected",
          "#f32160",
          "Max Affected",
          newlyAffectedList[arrayMaxIndex(newlyAffectedList)],
          "#f32160",
          filterDate(dates[arrayMaxIndex(newlyAffectedList)])
        ),
        height: 400,
        width: "100%",
      });

      zingchart.render({
        id: "recoveredHeatMap",
        data: heatMapGenerator(
          formattedRecoveredList,
          3,
          5,
          ["none", "#2bbd7e"],
          "Newly recovered",
          "#2bbd7e",
          "Max Recovered",
          newlyRecoveredList[arrayMaxIndex(newlyRecoveredList)],
          "#2bbd7e",
          filterDate(dates[arrayMaxIndex(newlyRecoveredList)])
        ),
        height: 400,
        width: "100%",
      });
    });
  });

  // Material Switch Controller
  $("input").change(function () {
    if ($(this).is(":checked")) {
      switchToTraditionalCharts();
    } else {
      switchToModernCharts();
    }
  });
  // Initialliy load modern chart
  switchToTraditionalCharts();
});

function switchToModernCharts() {
  $("#modernCharts").fadeIn();
  $("#traditionalCharts").fadeOut();
}

function switchToTraditionalCharts() {
  $("#modernCharts").fadeOut();
  $("#traditionalCharts").fadeIn();
}

function differenceFromMarch8() {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date();
  const secondDate = new Date(2020, 2, 8);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

function filterDate(date) {
  let dat = date.concat("20"); // 20 => 2020
  let expectedDate = dat.split("/").reverse();
  let tmp = expectedDate[2];
  expectedDate[2] = expectedDate[1];
  expectedDate[1] = tmp;
  expectedDate = expectedDate.join("-");

  return expectedDate;
}

function heatMapGenerator(
  heatMapData,
  monthStart,
  monthEnd,
  colorPalette,
  leftBoxTopLabel,
  leftBoxMiddleLevelColor,
  rightBoxTopLabel,
  rightBoxMiddleLevel,
  rightBoxMiddleLevelColor,
  rightBoxBottomLevel
) {
  return {
    type: "calendar",
    theme: localStorage.getItem("darkMood") ? "dark" : "light",
    options: {
      year: {
        text: "2020",
        visible: false,
      },
      startMonth: monthStart,
      endMonth: monthEnd,
      palette: colorPalette,
      month: {
        item: {
          fontFamily: "Google Sans",
          fontColor: localStorage.getItem("darkMood") ? "#ffffff" : "black",
          fontSize: 14,
        },
      },
      weekday: {
        values: ["", "M", "", "W", "", "F", ""],
        item: {
          fontColor: localStorage.getItem("darkMood") ? "#ffffff" : "gray",
          fontSize: 9,
        },
      },
      values: heatMapData,
    },
    labels: [
      {
        //Lefthand Label (container portion)
        borderColor: leftBoxMiddleLevelColor,
        borderRadius: 10,
        borderWidth: 2,
        x: "8%",
        y: "60%",
        width: "40%",
        height: "30%",
      },
      {
        //Lefthand Label (top portion)
        text: leftBoxTopLabel,
        fontFamily: "Google Sans",
        fontSize: 13,
        fontColor: localStorage.getItem("darkMood") ? "#ffffff": "#212121",
        textAlign: "center",
        x: "10%",
        y: "65%",
        width: "36%",
      },
      {
        //Lefthand Label (middle portion)
        text: "%plot-value",
        defaultValue: "00",
        fontColor: leftBoxMiddleLevelColor,
        fontFamily: "Google Sans",
        fontSize: 35,
        textAlign: "center",
        x: "10%",
        y: "68%",
        width: "36%",
      },
      // Note: the bottom portion of the Bottom-Left Label is the fixed tooltip, below.

      {
        //Rightside Label (container portion)
        borderColor: rightBoxMiddleLevelColor,
        borderRadius: 10,
        borderWidth: 2,
        x: "52%",
        y: "60%",
        width: "40%",
        height: "30%",
      },
      {
        //Rightside Label (top portion)
        text: rightBoxTopLabel,
        fontFamily: "Google Sans",
        fontSize: 13,
        fontColor: localStorage.getItem("darkMood") ? "#ffffff": "#212121",
        textAlign: "center",
        x: "54%",
        y: "65%",
        width: "36%",
      },
      {
        //Rightside Label (middle portion)
        text: rightBoxMiddleLevel,
        fontColor: rightBoxMiddleLevelColor,
        fontFamily: "Google Sans",
        fontSize: 35,
        textAlign: "center",
        x: "54%",
        y: "68%",
        width: "36%",
      },
      {
        //Rightside Label (bottom portion)
        text: rightBoxBottomLevel,
        fontFamily: "Google Sans",
        fontSize: 13,
        fontColor: localStorage.getItem("darkMood") ? "#ffffff": "#212121",
        padding: 2,
        textAlign: "center",
        x: "54%",
        y: "80%",
        width: "36%",
      },
    ],

    tooltip: {
      //Lefthand Label (bottom portion)
      text: "%data-day",
      defaultValue: "Hover mouse/Tap",
      backgroundColor: "none",
      borderColor: "none",
      fontFamily: "Google Sans",
      fontSize: 13,
      fontColor: localStorage.getItem("darkMood") ? "#ffffff": "#212121",
      padding: 2,
      //textAlign: 'center',
      align: "center",
      sticky: true,
      timeout: 30000,
      x: "10%",
      y: "80%",
      width: "36%",
    },

    plotarea: {
      marginTop: "15%",
      marginBottom: "55%",
      marginLeft: "8%",
      marginRight: "8%",
    },
  };
}

function singleLineChartGenerator(formattedDate, data, labelText) {
  return {
    globals: {
      "font-family": "Google Sans",
    },
    graphset: [
      {
        type: "area",
        "background-color": localStorage.getItem("darkMood") ? "#263238": "#fff",
        utc: true,
        plotarea: {
          "margin-top": "10%",
          "margin-right": "dynamic",
          "margin-bottom": "dynamic",
          "margin-left": "dynamic",
          "adjust-layout": true,
        },
        labels: [
          {
            text: `${labelText}: %plot-0-value`,
            "default-value": "0",
            color: "#fc8d62",
            x: "30%",
            y: 50,
            width: 200,
            "text-align": "left",
            bold: 0,
            "font-size": "14px",
            "font-weight": "bold",
          },
        ],
        "scale-x": {
          label: {
            text: "Date Range",
            "font-color": localStorage.getItem("darkMood") ? "#fff" : "#212",
            "font-size": "14px",
            "font-weight": "normal",
            "offset-x": "10%",
            "font-angle": 360,
          },
          item: {
            "text-align": "center",
            "font-color": localStorage.getItem("darkMood") ? "#00e5ff" : "#05636c",
          },
          zooming: 1,
          "max-labels": 12,
          labels: formattedDate,
          "max-items": 12,
          "items-overlap": true,
          guide: {
            "line-width": "0px",
          },
          tick: {
            "line-width": "2px",
          },
        },
        "crosshair-x": {
          "line-color": "#fff",
          "line-width": 1,
          "plot-label": {
            visible: false,
          },
        },
        "scale-y": {
          values: `0:${Math.max(...data)}:${Math.min(...data) + 2}`,
          item: {
            "font-color": localStorage.getItem("darkMood") ? "#00e5ff" : "#05636c",
            "font-weight": "normal",
          },
          label: {
            text: "Count",
            "font-size": "14px",
            "font-color": localStorage.getItem("darkMood") ? "#fff" : "#212",
          },
          guide: {
            "line-width": "0px",
            alpha: 0.2,
            "line-style": "dashed",
          },
        },
        plot: {
          "line-width": 2,
          marker: {
            size: 1,
            visible: false,
          },
          tooltip: {
            "font-family": "Google Sans",
            "font-size": "15px",
            text: `${labelText} %v on %data-days`,
            "text-align": "left",
            "border-radius": 5,
            padding: 10,
          },
        },
        series: [
          {
            values: data,
            "data-days": formattedDate,
            "line-color": "#fc8d62",
            aspect: "spline",
            "background-color": "#fc8d62",
            "alpha-area": ".3",
            "font-family": "Google Sans",
            "font-size": "14px",
            text: "found",
          },
        ],
      },
    ],
  };
}

function multiLineChartGenerator(formattedDate, recoverdData, deathData) {
  return {
    globals: {
      "font-family": "Google Sans",
    },
    graphset: [
      {
        type: "area",
        "background-color": localStorage.getItem("darkMood") ? "#263238": "#fff",
        utc: true,
        plotarea: {
          "margin-top": "10%",
          "margin-right": "dynamic",
          "margin-bottom": "dynamic",
          "margin-left": "dynamic",
          "adjust-layout": true,
        },
        labels: [
          {
            text: `Death: %plot-1-value`,
            "default-value": "0",
            color: "#ff5252",
            x: "30%",
            y: 50,
            width: 200,
            "text-align": "left",
            bold: 0,
            "font-size": "14px",
            "font-weight": "bold",
          },
          {
            text: `Recovered: %plot-0-value`,
            "default-value": "0",
            color: "#2979ff",
            x: "30%",
            y: 70,
            width: 200,
            "text-align": "left",
            bold: 0,
            "font-size": "14px",
            "font-weight": "bold",
          },
        ],
        "scale-x": {
          label: {
            text: "Date Range",
            "font-color": localStorage.getItem("darkMood") ? "#fff" : "#212",
            "font-size": "14px",
            "font-weight": "normal",
            "offset-x": "10%",
            "font-angle": 360,
          },
          item: {
            "text-align": "center",
            "font-color": localStorage.getItem("darkMood") ? "#00e5ff" : "#05636c",
          },
          zooming: 1,
          "max-labels": 12,
          labels: formattedDate,
          "max-items": 12,
          "items-overlap": true,
          guide: {
            "line-width": "0px",
          },
          tick: {
            "line-width": "2px",
          },
        },
        "crosshair-x": {
          "line-color": "#fff",
          "line-width": 1,
          "plot-label": {
            visible: false,
          },
        },
        "scale-y": {
          values: `0:${Math.max(
            Math.max(...recoverdData),
            Math.max(...deathData)
          )}:${Math.min(...recoverdData) + 1}`,
          item: {
            "font-color": localStorage.getItem("darkMood") ? "#00e5ff" : "#05636c",
            "font-weight": "normal",
          },
          label: {
            text: "Count",
            "font-size": "14px",
            "font-color": localStorage.getItem("darkMood") ? "#fff" : "#212",
          },
          guide: {
            "line-width": "0px",
            alpha: 0.2,
            "line-style": "dashed",
          },
        },
        plot: {
          "line-width": 2,
          marker: {
            size: 1,
            visible: false,
          },
          tooltip: {
            "font-family": "Google Sans",
            "font-size": "15px",
            text: `Found %v on %data-days`,
            "text-align": "left",
            "border-radius": 5,
            padding: 10,
          },
        },
        series: [
          {
            values: recoverdData,
            "data-days": formattedDate,
            "line-color": "#2979ff",
            aspect: "spline",
            "background-color": "#2979ff",
            "alpha-area": ".3",
            "font-family": "Google Sans",
            "font-size": "14px",
            text: "recovered",
          },
          {
            values: deathData,
            "data-days": formattedDate,
            "line-color": "#ff5252",
            aspect: "spline",
            "background-color": "#ff5252",
            "alpha-area": ".3",
            "font-family": "Google Sans",
            "font-size": "14px",
            text: "dead",
          },
        ],
      },
    ],
  };
}
