$(function() {
    let dhakaCityURL = "https://teamtigers.github.io/covid19-dataset-bd/dhakacity/dhakacity.json";
    $.get(dhakaCityURL, function(){}) 
        .done(function(res) {
            let dhakacityArray = Object.entries(res);
            makeTable(dhakacityArray);
        })
        .fail(function () {
            showToast("Something went wrong!");
        });
});
