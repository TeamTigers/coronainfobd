$(function () {
  let apiUrl = "https://corona.lmao.ninja/v2/historical/bangladesh?";
  let query = `lastdays=${differenceFromMarch14()}`;

  $.get(apiUrl.concat(query), function () {})
  .done(function (response) {
    let timeseries = response.timeline;
    let dates = Object.keys(timeseries.cases);
    let affectedList = Object.values(timeseries.cases);

    console.log(affectedList);
  });

  zingchart.loadModules("calendar", function () {
    zingchart.render({
      id: "affectedHeatMap",
      data: constructAffectedHeatmap(),
      height: 400,
      width: "100%",
    });
  });
});

function differenceFromMarch14() {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date();
  const secondDate = new Date(2020, 2, 14);

  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

function constructAffectedHeatmap() {
  return (myConfig = {
    type: "calendar",
    options: {
      year: {
        text: "2016",
        visible: false,
      },
      startMonth: 3,
      endMonth: 6,
      palette: ["none", "#f32160"],
      month: {
        item: {
          fontColor: "gray",
          fontSize: 9,
        },
      },
      weekday: {
        values: ["", "M", "", "W", "", "F", ""],
        item: {
          fontColor: "gray",
          fontSize: 9,
        },
      },
      values: [
        ["2016-01-01", 3],
        ["2016-01-04", 12],
        ["2016-01-05", 3],
        ["2016-01-06", 4],
        ["2016-01-07", 9],
        ["2016-01-08", 11],
        ["2016-01-11", 5],
        ["2016-01-12", 5],
        ["2016-01-13", 9],
        ["2016-01-14", 9],
        ["2016-01-15", 9],
        ["2016-01-18", 4],
        ["2016-01-19", 6],
        ["2016-01-20", 5],
        ["2016-01-21", 6],
        ["2016-01-22", 2],
        ["2016-01-25", 5],
        ["2016-01-26", 9],
        ["2016-01-27", 6],
        ["2016-01-28", 6],
        ["2016-01-29", 7],
        ["2016-02-01", 7],
        ["2016-02-02", 12],
        ["2016-02-03", 3],
        ["2016-02-04", 3],
        ["2016-02-05", 9],
        ["2016-02-08", 9],
        ["2016-02-09", 9],
        ["2016-02-10", 4],
        ["2016-02-11", 5],
        ["2016-02-12", 8],
        ["2016-02-15", 8],
        ["2016-02-16", 3],
        ["2016-02-17", 7],
        ["2016-02-18", 5],
        ["2016-02-19", 9],
        ["2016-02-22", 6],
        ["2016-02-23", 5],
        ["2016-02-24", 8],
        ["2016-02-25", 10],
        ["2016-02-26", 4],
        ["2016-02-29", 5],
        ["2016-03-01", 9],
        ["2016-03-02", 9],
        ["2016-03-03", 3],
        ["2016-03-04", 3],
        ["2016-03-07", 4],
        ["2016-03-08", 2],
        ["2016-03-09", 10],
        ["2016-03-10", 9],
        ["2016-03-11", 7],
        ["2016-03-14", 8],
        ["2016-03-15", 7],
        ["2016-03-16", 8],
        ["2016-03-17", 8],
        ["2016-03-18", 2],
        ["2016-03-21", 3],
        ["2016-03-22", 4],
        ["2016-03-23", 5],
        ["2016-03-24", 6],
        ["2016-03-25", 7],
        ["2016-03-28", 8],
        ["2016-03-29", 8],
        ["2016-03-30", 9],
        ["2016-03-31", 7],
        ["2016-04-01", 9],
        ["2016-04-04", 7],
        ["2016-04-05", 5],
        ["2016-04-06", 6],
        ["2016-04-07", 9],
        ["2016-04-08", 4],
        ["2016-04-11", 8],
        ["2016-04-12", 9],
        ["2016-04-13", 3],
        ["2016-04-14", 5],
        ["2016-04-15", 5],
        ["2016-04-18", 8],
        ["2016-04-19", 8],
        ["2016-04-20", 9],
        ["2016-04-21", 3],
        ["2016-04-22", 6],
        ["2016-04-25", 12],
        ["2016-04-26", 6],
        ["2016-04-27", 5],
        ["2016-04-28", 5],
        ["2016-04-29", 11],
        ["2016-05-02", 9],
        ["2016-05-03", 3],
        ["2016-05-04", 5],
        ["2016-05-05", 4],
        ["2016-05-06", 9],
        ["2016-05-09", 5],
        ["2016-05-10", 5],
        ["2016-05-11", 7],
        ["2016-05-12", 7],
        ["2016-05-13", 5],
        ["2016-05-16", 3],
        ["2016-05-17", 2],
        ["2016-05-18", 7],
        ["2016-05-19", 5],
        ["2016-05-20", 3],
        ["2016-05-23", 9],
        ["2016-05-24", 11],
        ["2016-05-25", 5],
        ["2016-05-26", 9],
        ["2016-05-27", 4],
        ["2016-05-30", 5],
        ["2016-05-31", 7],
        ["2016-06-01", 9],
        ["2016-06-02", 5],
        ["2016-06-03", 5],
        ["2016-06-06", 6],
        ["2016-06-07", 7],
        ["2016-06-08", 8],
        ["2016-06-09", 5],
        ["2016-06-10", 8],
        ["2016-06-13", 6],
        ["2016-06-14", 6],
        ["2016-06-15", 2],
        ["2016-06-16", 7],
        ["2016-06-17", 5],
        ["2016-06-20", 5],
        ["2016-06-21", 8],
        ["2016-06-22", 8],
        ["2016-06-23", 8],
        ["2016-06-24", 10],
        ["2016-06-27", 7],
        ["2016-06-28", 12],
        ["2016-06-29", 7],
        ["2016-06-30", 6],
      ],
    },
    labels: [
      {
        //Lefthand Label (container portion)
        borderColor: "gray",
        borderWidth: 1,
        x: "8%",
        y: "60%",
        width: "40%",
        height: "30%",
      },
      {
        //Lefthand Label (top portion)
        text: "Daily Contribution",
        fontColor: "#212121",
        textAlign: "center",
        x: "10%",
        y: "65%",
        width: "36%",
      },
      {
        //Lefthand Label (middle portion)
        text: "%plot-value",
        fontColor: "#2196F3",
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
        borderColor: "gray",
        borderWidth: 1,
        x: "52%",
        y: "60%",
        width: "40%",
        height: "30%",
      },
      {
        //Rightside Label (top portion)
        text: "Total Contributions",
        fontColor: "#212121",
        textAlign: "center",
        x: "54%",
        y: "65%",
        width: "36%",
      },
      {
        //Rightside Label (middle portion)
        text: "1414",
        fontColor: "#2196F3",
        fontFamily: "Google Sans",
        fontSize: 35,
        textAlign: "center",
        x: "54%",
        y: "68%",
        width: "36%",
      },
      {
        //Rightside Label (bottom portion)
        text: "Jan 1 - Jun 30",
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
  });
}
