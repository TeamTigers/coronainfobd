$(function () {
    let districtUrl = "https://corona-bd.herokuapp.com/district";
    let districtData = [];

    $.get(districtUrl, function () {})
        .done(function (response) {
            districtData = response.data;
        });

    $('#mapColumn a').on('click mouseover', function () {
        let districtName = $(this).data("value");
        let districtId = $(this).data("id");
        let selectedDistrict = districtData.find(o => o.id === districtId) || districtData.find(o => o.name === districtName);

        selectedDistrict == null ? 
                            setValueWhenNotFound(districtName) :
                            setSelectedValue(selectedDistrict.name, selectedDistrict.count);
    });
});

function setValueWhenNotFound(selectedDistrictName) {
    $('#selectedDistrict').text(selectedDistrictName);
    $('#selectedDistrictCount').text(0);
}

function setSelectedValue(districtName, districtAffected) {
    $('#selectedDistrict').text(districtName);
    $('#selectedDistrictCount').text(districtAffected);
}