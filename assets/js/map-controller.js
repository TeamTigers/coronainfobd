$(function () {
    let districtUrl = "https://corona-bd.herokuapp.com/district";
    let districtData = [];
    let totalInfected = 0;
    let divisionDistrict = {
        "Dhaka": [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        "Chattogram": [15, 16, 17, 18, 19, 20, 21, 22, 23],
        "Sylhet": [24, 25, 26, 27],
        "Rangpur": [28, 29, 30, 31, 32, 33, 34, 35],
        "Khulna": [36, 37, 38, 39, 40, 57, 58, 59],
        "Mymensingh": [41, 42, 43, 44],
        "Barishal": [45, 46, 47, 48, 49],
        "Rajshahi": [50, 51, 52, 53, 54, 55, 56]
    };
      
    let divisionList = Object.keys(divisionDistrict);

    $.get(districtUrl, function () {})
        .done(function (response) {
            districtData = response.data;
            totalInfected = response.total_infected;
        });

    $('#mapColumn a').on('click mouseover', function () {
        let districtId = $(this).data("id");
        let districtName = $(this).data("value");
        let selectedDistrict = districtData.find(o => o.id === districtId) || districtData.find(o => o.name === districtName);

        
        // Division
        let selectedDivision = '';
        let totalAfftectedInDistrict = 0;
        
        divisionList.forEach(function (eachDivision, index) {
            if(districtId != null) {
                if(divisionDistrict[eachDivision].includes(districtId)) {
                    selectedDivision = eachDivision;
                }
            }
        });
        
        if(selectedDivision != '') {
            let districtIdList = divisionDistrict[selectedDivision];
            
            districtIdList.forEach(function name(eachDistrictId) {
                let districtAffected = districtData.find(o => o.id === eachDistrictId);
                totalAfftectedInDistrict += districtAffected.count;
            });
        }

        // Set values over cards

        selectedDistrict == null ?
            setValueWhenNotFound(districtName) :
            setSelectedValue(
                selectedDistrict.name,
                selectedDistrict.count,
                (selectedDistrict.count/totalInfected)*100
            );

        $('#selectedDistrictInfoCards').slideDown('slow').delay(1500);
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