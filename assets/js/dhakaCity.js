
$(function() {
    let dhakaCityURL = "https://teamtigers.github.io/covid19-dataset-bd/dhakacity/dhakacity.json";
    $.get(dhakaCityURL, function(){}) 
        .done(function(res) {
            let dhakacityArray = Object.entries(res);
            $("#affectedAreaNumber").text(dhakacityArray.length)
            makeTable(dhakacityArray);

            //Accending Sort
            $('#accending').click(function() {
                dhakacityArray.sort(function(first, last) {return first[1] - last[1]})
                $('#dhakaCityInfo').html(makeTable(dhakacityArray))
            })

            //Decending Sort
            $('#decending').click(function() {
                dhakacityArray.sort(function(first, last) {return last[1] - first[1]})
                $('#dhakaCityInfo').html(makeTable(dhakacityArray))
            })
        })
        .fail(function () {
            showToast("Something went wrong!");
        });
});

function makeTable(dhakacityArray) {

    let totalAffected = totalCount(dhakacityArray);
    let tableStr = "<table><thead><tr><th>Location</th><th>Total</th><th>Percent</th></tr></thead><tbody id='locationTotal'>";
    for (let index = 0; index < dhakacityArray.length; index++) {
        let count = dhakacityArray[index][1];
        tableStr += "<tr><td>"+dhakacityArray[index][0]+"</td><td>"
                +count+"</td><td>"+ ((count / totalAffected) * 100).toFixed(2).concat('%') +"</td></tr>"
    }
    tableStr += "</tbody></table>";
    $('#dhakaCityInfo').html(tableStr)
} 

function totalCount(dhakacityArray) {
    let totalAffected = 0;
    for (let index = 0; index < dhakacityArray.length; index++) {
        totalAffected += parseInt(dhakacityArray[index][1]);
    }
    return totalAffected;
}

