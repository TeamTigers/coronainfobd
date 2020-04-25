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

function  makeCaseStudy(res) {
    let caseStudyString = "<ul class='collection round'>";
    for (let index = 0; index < res.length; index++) {
        caseStudyString += "<li class='collection-item'>"+
        "<span class='title gsans'>"+res[index]["Date"]+"</span><p class='gsans'>";
        if (index > 2)  caseStudyString += "Today test " + res[index]["Today_Tests"]+" persons. ";
        caseStudyString += (res[index]["Today_Positive"] === 0 ?  "No person detect today. " : (res[index]["Today_Positive"]+" new person detected corona positive. "));
        caseStudyString += (res[index]["Today_Deaths"] === 0 ?  "No person death today. " : (res[index]["Today_Deaths"]+" have died. "));
        caseStudyString += (res[index]["Today_Recovered"] === 0 ?  "No person recover today. " : (res[index]["Today_Recovered"]+"  new person recovered. "));
        caseStudyString += "Total number of corona virus affected people is "+res[index]["Total_Positive"]+". ";
        caseStudyString += "Total number of corona virus deaths people is "+res[index]["Total_Deaths"]+". ";
        caseStudyString += "Total number of corona virus recovered people is "+res[index]["Total_Recovered"]+".</p></li>";
    }
    caseStudyString += "</ul>"
    $('#CasestudyInfo').html(caseStudyString);
}