$(function() { 
    let districtUrl = "https://corona-bd.herokuapp.com/district";
    let districtData = [];

    $.get(districtUrl, function(){}) 
    .done(function(response) {
        districtData = response.data;
    });
    
    $('#mapColumn a').on('click mouseover', function () {
        let districtName = $(this).data("value");
        let districtId = $(this).data("id");
        let selectedDistrict = districtData.find(o => o.id === districtId);

        if(selectedDistrict == null) {
            selectedDistrict = districtData.find(o => o.name === districtName);
        }

        if(selectedDistrict == null) {
            $('#selectedDistrict').text(districtName);
            $('#selectedDistrictCount').text(0);
        } else {
            $('#selectedDistrict').text(selectedDistrict.name);
            $('#selectedDistrictCount').text(selectedDistrict.count);
        }
    });
});