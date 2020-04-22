$(function () {
    let districtUrl = "https://corona-bd.herokuapp.com/district";
    let districtData = [];
    let totalInfected = 0;

    $.get(districtUrl, function () {})
        .done(function (response) {
            districtData = response.data;
            totalInfected = response.total_infected;
        });

    $('#mapColumn a').on('click mouseover', function () {
        let districtId = $(this).data("id");
        let districtName = $(this).data("value");
        let selectedDistrict = districtData.find(o => o.id === districtId) || districtData.find(o => o.name === districtName);

        selectedDistrict == null ?
            setValueWhenNotFound(districtName) :
            setSelectedValue(
                selectedDistrict.name,
                selectedDistrict.count,
                (selectedDistrict.count/totalInfected)*100
            );
    });
});

function setValueWhenNotFound(selectedDistrictName) {
    $('#selectedDistrict').text(selectedDistrictName);
    $('#selectedDistrictCount').text(0);
    $('#selectedDistrictPercentage').text('0 %');
}

function setSelectedValue(districtName, districtAffected, percentage) {
    $('#selectedDistrict').text(districtName);
    $('#selectedDistrictCount').text(districtAffected);
    $('#selectedDistrictPercentage').text(percentage.toFixed(2).toString().concat(' %'));
}