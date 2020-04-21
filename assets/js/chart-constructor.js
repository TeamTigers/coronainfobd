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

    // Render trditional line chart
    zingchart.render({
        id: 'fullTimeSeriesLine',
        data: lineChartGenerator(),
        height: 500,
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
            5,
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
  });


  $("input").change(function() {
    if($(this).is(":checked")) {
        switchToModernCharts();
    }
    else {
        switchToTraditionalCharts();
    }
  });

  switchToModernCharts();
});

function switchToModernCharts() {
    $('#modernCharts').fadeIn();
    $('#traditionalCharts').fadeOut();
}

function switchToTraditionalCharts() {
    $('#modernCharts').fadeOut();
    $('#traditionalCharts').fadeIn();
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
        fontSize: 16,
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
        fontSize: 16,
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
        fontFamily: "Google Sans",
        fontSize: 13,
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
      fontSize: 13,
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

function lineChartGenerator() {
    return {
        "globals":{
          "font-family": "Google Sans"
        },
        "graphset": [
            {
                "type": "area",
                "background-color": "#fff",
                "utc": true,
                "title": {
                    "y": "15px",
                    "text": "Website Traffic Metrics",
                    "background-color": "none",
                    "font-color": "#05636c",
                    "font-size": "24px",
                    "height": "25px",
                    "adjust-layout":true
                },
                "plotarea": {
                    "margin-top":"10%",
                    "margin-right":"dynamic",
                    "margin-bottom":"dynamic",
                    "margin-left":"dynamic",
                    "adjust-layout":true
                },
                "labels": [
                    {
                        "text": "Visitors: %plot-2-value",
                        "default-value": "",
                        "color": "#8da0cb",
                        "x": "20%",
                        "y": 50,
                        "width": 120,
                        "text-align": "left",
                        "bold": 0,
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    {
                        "text": "Clicks: %plot-1-value",
                        "default-value": "",
                        "color": "#66c2a5",
                        "x": "45%",
                        "y": 50,
                        "width": 120,
                        "text-align": "left",
                        "bold": 0,
                        "font-size": "14px",
                        "font-weight": "bold"
                    },
                    {
                        "text": "Returns: %plot-0-value",
                        "default-value": "",
                        "color": "#fc8d62",
                        "x": "70%",
                        "y": 50,
                        "width": 120,
                        "text-align": "left",
                        "bold": 0,
                        "font-size": "14px",
                        "font-weight": "bold"
                    }
                ],
                "scale-x": {
                    "label": {
                        "text":"Date Range",
                        "font-size": "14px",
                        "font-weight": "normal",
                        "offset-x": "10%",
                        "font-angle": 360
                    },
                    "item": {
                        "text-align": "center",
                        "font-color": "#05636c"
                    },
                    "zooming": 1,
                    "max-labels": 12,
                    "labels": [
                        "Sept<br>19",
                        "Sept<br>20",
                        "Sept<br>21",
                        "Sept<br>22",
                        "Sept<br>23",
                        "Sept<br>24",
                        "Sept<br>25",
                        "Sept<br>26",
                        "Sept<br>27",
                        "Sept<br>28",
                        "Sept<br>29",
                        "Sept<br>30"
                    ],
                    "max-items": 12,
                    "items-overlap": true,
                    "guide": {
                        "line-width": "0px"
                    },
                    "tick": {
                        "line-width": "2px"
                    },
                },
                "crosshair-x": {
                    "line-color":"#fff",
                    "line-width":1,
                    "plot-label": {
                        "visible": false
                    }
                },
                "scale-y": {
                    "values": "0:2500:500",
                    "item": {
                        "font-color": "#05636c",
                        "font-weight": "normal"
                    },
                    "label":{
                      "text":"Metrics",
                      "font-size":"14px"
                    },
                    "guide": {
                        "line-width": "0px",
                        "alpha": 0.2,
                        "line-style": "dashed"
                    }
                },
                "plot": {
                    "line-width": 2,
                    "marker": {
                        "size": 1,
                        "visible": false
                    },
                    "tooltip": {
                        "font-family": "Roboto",
                        "font-size": "15px",
                        "text": "There were %v %t on %data-days",
                        "text-align": "left",
                        "border-radius":5,
                        "padding":10
                    }
                },
                "series": [
                    {
                        "values": [
                            1204,
                            1179,
                            1146,
                            1182,
                            1058,
                            1086,
                            1141,
                            1105,
                            1202,
                            992,
                            373,
                            466
                        ],
                        "data-days": [
                            "Sept 19",
                            "Sept 20",
                            "Sept 21",
                            "Sept 22",
                            "Sept 23",
                            "Sept 24",
                            "Sept 25",
                            "Sept 26",
                            "Sept 27",
                            "Sept 28",
                            "Sept 29",
                            "Sept 30"
                        ],
                        "line-color": "#fc8d62",
                        "aspect": "spline",
                        "background-color": "#fc8d62",
                        "alpha-area": ".3",
                        "font-family": "Roboto",
                        "font-size": "14px",
                        "text": "returns"
                    },
                    {
                        "values": [
                            1625,
                            1683,
                            1659,
                            1761,
                            1904,
                            1819,
                            1631,
                            1592,
                            1498,
                            1594,
                            1782,
                            1644
                        ],
                        "data-days": [
                            "Sept 19",
                            "Sept 20",
                            "Sept 21",
                            "Sept 22",
                            "Sept 23",
                            "Sept 24",
                            "Sept 25",
                            "Sept 26",
                            "Sept 27",
                            "Sept 28",
                            "Sept 29",
                            "Sept 30"
                        ],
                        "line-color": "#66c2a5",
                        "background-color": "#66c2a5",
                        "alpha-area": ".3",
                        "text": "clicks",
                        "aspect": "spline",
                        "font-family": "Roboto",
                        "font-size": "14px"
                    },
                    {
                        "values": [
                            314,
                            1395,
                            1292,
                            1259,
                            1269,
                            1132,
                            1012,
                            1082,
                            1116,
                            1039,
                            1132,
                            1227
                        ],
                        "data-days": [
                            "Sept 19",
                            "Sept 20",
                            "Sept 21",
                            "Sept 22",
                            "Sept 23",
                            "Sept 24",
                            "Sept 25",
                            "Sept 26",
                            "Sept 27",
                            "Sept 28",
                            "Sept 29",
                            "Sept 30"
                        ],
                        "line-color": "#8da0cb",
                        "background-color": "#8da0cb",
                        "aspect": "spline",
                        "alpha-area": "0.2",
                        "text": "visitors",
                        "font-family": "Roboto",
                        "font-size": "14px"
                    }
                ]
            }
        ]
    };
}