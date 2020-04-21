$(function() {
    $.getJSON('assets/json/dhakacity.json', function(res) {
        //makeTable(res);
        let dhakacityArray = Object.entries(res);
    });
});