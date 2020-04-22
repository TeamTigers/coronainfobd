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
        let totalAffectedInDivision = 0;

        divisionList.forEach(function (eachDivision, index) {
            if (districtId != null) {
                if (divisionDistrict[eachDivision].includes(districtId)) {
                    selectedDivision = eachDivision;
                }
            }
        });

        if (selectedDivision != '') {
            let districtIdList = divisionDistrict[selectedDivision];

            districtIdList.forEach(function name(eachDistrictId) {
                let districtAffected = districtData.find(o => o.id === eachDistrictId);
                totalAffectedInDivision += districtAffected.count;
            });
        }

        // Set values over cards

        selectedDistrict == null ?
            setValueWhenNotFound(districtName) :
            setSelectedValue(
                selectedDistrict.name,
                selectedDistrict.count,
                (selectedDistrict.count / totalInfected) * 100,
                selectedDivision,
                totalAffectedInDivision
            );


        // Scroll to the info section in mobile
        let isMobile = false; //initiate as false
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            isMobile = true;
        }
        if(isMobile) {
            goToByScroll("selectedDistrictInfoCards");
        }
        // Slide down cards in desktop
        $('#selectedDistrictInfoCards').slideDown('slow').delay(1500);
    });
});

function goToByScroll(id) {
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top
    }, 'slow');
}

function setValueWhenNotFound(selectedDistrictName) {
    $('#selectedDistrict').text(selectedDistrictName);
    $('#selectedDistrictCount').text(0);
    $('#selectedDistrictPercentage').text('0 %');
    $('#divisionCard').hide();
}

function setSelectedValue(districtName, districtAffected, percentage, divisionName, divisinCount) {
    $('#divisionCard').slideDown();

    $('#selectedDistrict').text(districtName);
    $('#selectedDistrictCount').text(districtAffected);

    $('#selectedDistrictPercentage').text(percentage.toFixed(2).toString().concat(' %'));

    $('#selectedDivisionName').text('Division: '.concat(divisionName));
    $('#selectedDivisionCount').text(divisinCount);
}