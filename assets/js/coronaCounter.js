$(function() {
  let baseApi = "https://coronavirus-19-api.herokuapp.com";

  // TODO: Need to find/build a real API for this case
  let foreignResidents = {
    italy: 8,
    kuwait: 1,
    germany: 1
  };
  hideElementsTillResponse();

  // Communication with API
  $.get(baseApi.concat("/countries/bangladesh"), function() {})
    .done(function(response) {
      showToast("Welcome");
      console.log(response);
      constructData(
        response.cases,
        response.deaths,
        response.recovered,
        response.active,
        response.todayCases,
        foreignResidents
      );
      $("main").show();
    })
    .fail(function() {})
    .always(function() {
      $(".progress").hide();
    });
});

function hideElementsTillResponse() {
  $("main").hide();
}

function showToast(message) {
  M.toast({
    html: message,
    classes: "blue-grey darken-3 rounded"
  });
}

function constructData(confirmed, dead, recovered, active, today, fR) {
  $("#numberOfConfirmedCases").text(confirmed);
  $("#numberOfDeaths").text(dead);
  $("#numberOfRecovery").text(recovered);

  // table data constructor
  $("#td_total").text(confirmed);
  $("#td_active").text(active);
  $("#td_cases_today").text(today);
  $("#td_deaths").text(dead);
  $("#td_recovered").text(recovered);

  // TODO: Need to find/build a real API for this case
  $("#italy").text(fR.italy);
  $("#kuwait").text(fR.kuwait);
  $("#germany").text(fR.germany);
  $("#unknown").text(confirmed - (fR.italy + fR.germany + fR.kuwait));
}
