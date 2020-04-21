$(function () {
  let apiUrl = "https://corona.lmao.ninja/v2/historical/bangladesh?";

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

    
    
    let arrayMaxIndex = function(array) {
        return array.indexOf(Math.max.apply(null, array));
    };

    let newlyAffectedList = formattedAffectedList.map(function(eachData){
        return eachData[1];
    });
    
    let newlyRecoveredList = formattedRecoveredList.map(function(eachData){
        return eachData[1];
    });

    zingchart.loadModules("calendar", function () {
      zingchart.render({
        id: "affectedHeatMap",
        data: heatMapGenerator(
          formattedAffectedList,
          3,
          6,
          ["none", "#f32160",],
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
            6,
            ["none", "#2bbd7e",],
            "Newly recovered",
            "#2bbd7e",
            "Max Recovered",
            newlyRecoveredList[arrayMaxIndex(newlyRecoveredList)],
            "#2bbd7e",
            filterDate(dates[arrayMaxIndex(newlyRecoveredList)]),
        ),
        height: 400,
        width: "100%",
      });
    });

    console.log(formattedRecoveredList);
    console.log(formattedAffectedList);
  });
});

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
          fontColor: "black",
          fontSize: 14,
        },
      },
      weekday: {
        values: ["", "M", "", "W", "", "F", ""],
        item: {
          fontColor: "gray",
          fontSize: 9,
        },
      },
      values: heatMapData,
    },
    labels: [
      {
        //Lefthand Label (container portion)
        borderColor: "gray",
        borderWidth: 2,
        x: "8%",
        y: "60%",
        width: "40%",
        height: "30%",
      },
      {
        //Lefthand Label (top portion)
        text: leftBoxTopLabel,
        fontColor: "#212121",
        textAlign: "center",
        x: "10%",
        y: "65%",
        width: "36%",
      },
      {
        //Lefthand Label (middle portion)
        text: "%plot-value",
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
        borderColor: "black",
        borderWidth: 2,
        x: "52%",
        y: "60%",
        width: "40%",
        height: "30%",
      },
      {
        //Rightside Label (top portion)
        text: rightBoxTopLabel,
        fontColor: "#212121",
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
        fontColor: "#212121",
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
      backgroundColor: "none",
      borderColor: "none",
      fontFamily: "Google Sans",
      fontSize: 12,
      fontColor: "#212121",
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
