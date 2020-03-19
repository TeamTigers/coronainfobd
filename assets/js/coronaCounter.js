$(function() {
    let baseApi = 'https://coronavirus-19-api.herokuapp.com';
    hideElementsTillResponse();
    
    // Communication with API
    $.get(baseApi.concat('/countries/bangladesh'), function() {
        
    }).done(function(response) {
       showToast('Welcome');
       console.log(response);
       constructData(response.cases, response.deaths, response.recovered);
       $("main").show();
    }).fail(function() {
        
    }).always(function() {
       $(".progress").hide();
    });
});

function hideElementsTillResponse(){
   $("main").hide();
}

function showToast(message) {
    M.toast({
        html: message,
        classes: 'grey darken-3 rounded'
    });
}

function constructData(x, y, z) {
    $('#numberOfConfirmedCases').text(x);
    $('#numberOfDeaths').text(y);
    $('#numberOfRecovery').text(z);
}