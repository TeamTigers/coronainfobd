$(function() {
    let dhakaCityURL = "https://teamtigers.github.io/covid19-dataset-bd/dhakacity/dhakacity.json";
    $.get(dhakaCityURL, function(){}) 
        .done(function(res) {
            let dhakacityArray = Object.entries(res);
            $("#affectedAreaNumber").text(dhakacityArray.length)
            makeTable(dhakacityArray);
        })
        .fail(function () {
            showToast("Something went wrong!");
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