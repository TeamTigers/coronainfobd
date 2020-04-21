$(function() {
    $.getJSON('assets/json/dhakacity.json', function(res) {
        let dhakacityArray = Object.entries(res);
        makeTable(dhakacityArray);
    });
});

function makeTable(dhakacityArray) {
    let tableStr = "<table><thead><tr><th>Location</th><th>Total</th></tr></thead><tbody id='locationTotal'>";
    for (let index = 0; index < dhakacityArray.length; index++) {
        tableStr += "<tr><td>"+dhakacityArray[index][0]+"</td><td>"
                        +dhakacityArray[index][1]+"</td></tr>"
    }
    tableStr += "</tbody></table>";
    $('#dhakaCityInfo').html(tableStr)
}