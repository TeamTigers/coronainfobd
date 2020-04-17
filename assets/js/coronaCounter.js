$(function () {
  let baseApi = "https://coronavirus-19-api.herokuapp.com";
  hideElementsTillResponse();

  $.get(baseApi.concat("/countries/world"), function () {})
    .done(function (response) {
      setContentsOverWorldCard(response);
    })
    .fail(function () {
      showToast("Something went wrong!");
    })
    .always(function () {
      fetchBangladeshiData(baseApi);
    });
});

function hideElementsTillResponse() {
  $("main").hide();
}

function setContentsOverWorldCard(data) {
  $("#worldInfected").text(data.cases),
    $("#worldDeath").text(data.deaths),
    $("#worldRecovered").text(data.recovered);
}

function fetchBangladeshiData(baseApi) {
  // TODO: Need to find/build a real API for this case
  // let foreignResidents = {
  //   italy: 8,
  //   usa: 2,
  //   india: 1,
  //   bahrain: 1,
  //   kuwait: 1,
  //   germany: 1,
  // };

  // Communication with API
  $.get(baseApi.concat("/countries/bangladesh"), function () {})
    .done(function (response) {
      showToast("Welcome");
      constructData(
        response.cases,
        response.deaths,
        response.recovered,
        response.active,
        response.todayCases,
        response.todayDeaths,
        response.totalTests,
        response.critical,
        response.testsPerOneMillion,
        response.casesPerOneMillion,
        response.deathsPerOneMillion
        // foreignResidents
      );
      $("main").show();
    })
    .fail(function () {
      showToast("Something went wrong!");
    })
    .always(function () {
      $(".progress").hide();
      numberCounter();
    });
}

function numberCounter() {
  // $(".count").counterUp({
  //   delay: 10,
  //   time: 700
  // });

  $(".count").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
}

function showToast(message) {
  M.toast({
    html: message,
    classes: "blue-grey darken-3 rounded",
  });
}

function constructData(
  confirmed,
  dead,
  recovered,
  active,
  today_case,
  today_death,
  total_tests,
  critical,
  test_per_one_m,
  case_per_one_m,
  death_per_one_m
) {
  $("#numberOfTests").text(total_tests);
  $("#numberOfConfirmedCases").text(confirmed);
  $("#numberOfDeaths").text(dead);
  $("#numberOfRecovery").text(recovered);

  // table data constructor
  $("#td_total").text(confirmed);
  $("#td_active").text(active);
  $("#td_cases_today").text(today_case);
  $("#td_deaths").text(today_death);
  $("#td_critical").text(critical);
  $("#test_per_one_m").text(test_per_one_m);
  $("#case_per_one_m").text(case_per_one_m);
  $("#death_per_one_m").text(death_per_one_m);

  // TODO: Need to find/build a real API for this case
  // $("#italy").text(fR.italy);
  // $("#usa").text(fR.usa);
  // $("#india").text(fR.india);
  // $("#bahrain").text(fR.bahrain);
  // $("#kuwait").text(fR.kuwait);
  // $("#germany").text(fR.germany);
  // $("#unknown").text(
  //   confirmed -
  //     (fR.italy + fR.usa + fR.india + fR.bahrain + fR.germany + fR.kuwait)
  // );
}
