$(function () {
  let worldInfo = "https://coronavirus-19-api.herokuapp.com/countries/world";

  $.get(worldInfo, function () {})
    .done(function (response) {
      $("#worldInfected").text(response.cases),
        $("#worldDeath").text(response.deaths),
        $("#worldRecovered").text(response.recovered);
    })
    .fail(function () {
      showToast("Something went wrong!");
    })
    .always(function () {});
});
