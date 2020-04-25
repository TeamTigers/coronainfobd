$(function() {
     let apiURL = "https://jinnatul.github.io/Kid-Projects/covidBD/bdcovid.json";
    $.get(apiURL, function() {})
        .done(function(res) {
            makeCaseStudy(res);
        })
        .fail(function () {
            showToast("Something went wrong!");
        }); 
});