$(function () {
    let districtUrl = "https://corona-bd.herokuapp.com/district";
    let districtData = [];
    let totalInfected = 0;
    let divisionJSON = {"Barisal":[{"district":"Barguna","alternativeName":"Barguna"},{"district":"Barisal","alternativeName":"Barishal"},{"district":"Bhola","alternativeName":"Bhola"},{"district":"Jhalokati","alternativeName":"Jhalokathi"},{"district":"Patuakhali","alternativeName":"Potuakhali"},{"district":"Pirojpur","alternativeName":"Pirojpur"}],"Chattogram":[{"district":"Bandarban","alternativeName":"Bandarban"},{"district":"Brahmanbaria","alternativeName":"B. Baria"},{"district":"Chandpur","alternativeName":"Chandpur"},{"district":"Chattogram","alternativeName":"Chattogram"},{"district":"Cumilla","alternativeName":"Cumilla"},{"district":"Cox's Bazar","alternativeName":"Cox’s bazar"},{"district":"Feni","alternativeName":"Feni"},{"district":"Khagrachhari","alternativeName":"Khagrachari"},{"district":"Lakshmipur","alternativeName":"Laksmipur"},{"district":"Noakhali","alternativeName":"Noakhali"},{"district":"Rangamati","alternativeName":"Rangamati"}],"Dhaka":[{"district":"Dhaka","alternativeName":"Dhaka City"},{"district":"Faridpur","alternativeName":"Faridpur"},{"district":"Gazipur","alternativeName":"Gazipur"},{"district":"Gopalganj","alternativeName":"Gopalganj"},{"district":"Kishoreganj","alternativeName":"Kishoreganj"},{"district":"Madaripur","alternativeName":"Madaripur"},{"district":"Manikganj","alternativeName":"Manikganj"},{"district":"Munshiganj","alternativeName":"Munshigonj"},{"district":"Narayanganj","alternativeName":"Narayanganj"},{"district":"Narsingdi","alternativeName":"Narshingdi"},{"district":"Rajbari","alternativeName":"Rajbari"},{"district":"Shariatpur","alternativeName":"Shariatpur"},{"district":"Tangail","alternativeName":"Tangail"}],"Khulna":[{"district":"Bagerhat","alternativeName":"Bagerhat"},{"district":"Chuadanga","alternativeName":"Chuadanga"},{"district":"Jashore","alternativeName":"Jessore"},{"district":"Jhenaidah","alternativeName":"Jhenaidah"},{"district":"Khulna","alternativeName":"Khulna"},{"district":"Kushtia","alternativeName":"Kushtia"},{"district":"Magura","alternativeName":"Magura"},{"district":"Meherpur","alternativeName":"Meherpur"},{"district":"Narail","alternativeName":"Narail"},{"district":"Satkhira","alternativeName":"Satkhira"}],"Mymensingh":[{"district":"Jamalpur","alternativeName":"Jamalpur"},{"district":"Mymensingh","alternativeName":"Mymensingh"},{"district":"Netrokona","alternativeName":"Netrokona"},{"district":"Sherpur","alternativeName":"Sherpur"}],"Rajshahi":[{"district":"Bogura","alternativeName":"Bogra"},{"district":"Joypurhat","alternativeName":"Joypurhat"},{"district":"Naogaon","alternativeName":"Naogaon"},{"district":"Natore","alternativeName":"Natore"},{"district":"Chapainawabganj","alternativeName":"Chapainawabganj"},{"district":"Pabna","alternativeName":"Pabna"},{"district":"Rajshahi","alternativeName":"Rajshahi"},{"district":"Sirajganj","alternativeName":"Sirajganj"}],"Rangpur":[{"district":"Dinajpur","alternativeName":"Dinajpur"},{"district":"Gaibandha","alternativeName":"Gaibandha"},{"district":"Kurigram","alternativeName":"Kurigram"},{"district":"Lalmonirhat","alternativeName":"Lalmonirhat"},{"district":"Nilphamari","alternativeName":"Nilphamari"},{"district":"Panchagarh","alternativeName":"Panchagar"},{"district":"Rangpur","alternativeName":"Rangpur"},{"district":"Thakurgaon","alternativeName":"Thakurgaon"}],"Sylhet":[{"district":"Habiganj","alternativeName":"Hobiganj"},{"district":"Moulvibazar","alternativeName":"Moulovi Bazar"},{"district":"Sunamganj","alternativeName":"Sunamganj"},{"district":"Sylhet","alternativeName":"Sylhet"}]};
    let divisionList = Object.keys(divisionJSON);

    $.get(districtUrl, function () {})
    .done(function (response) {
        districtData = response.data;
    });

    $('#mapColumn a').on('click mouseover', function () {
        // Get total infected from previously loaded data
        totalInfected = $('#numberOfConfirmedCases').text();


        // District
        let selectedDistrictName = $(this).data("value");
        let selectedDistrict = districtData.find(o => o.name === selectedDistrictName);


        // Division
        let selectedDivision = '';
        let totalAffectedInDivision = 0;
        let totalAffectedInDivisionPreviously = 0;

        divisionList.forEach(function (eachDivision) {
            const districts_of_the_division = divisionJSON[eachDivision];
            
            districts_of_the_division.forEach(function(eachDistrict) {
               if(eachDistrict.alternativeName === selectedDistrictName || eachDistrict.district === selectedDistrictName) {
                   selectedDivision = eachDivision;
               } 
            });
        });


        if (selectedDivision != '') {
            const districts_of_the_selected_division = divisionJSON[selectedDivision];

            districts_of_the_selected_division.forEach(function(eachDistrict) {
                const kDistrictName = eachDistrict.district;
                const kDistrictAlternativeName = eachDistrict.alternativeName;
                const kDistrictAffected = districtData.find(o => o.name === kDistrictName) || districtData.find(o => o.name === kDistrictAlternativeName);
                
                // If district isn't affected, it won't appear in API
                if(kDistrictAffected != null) {
                    totalAffectedInDivision += kDistrictAffected.count;
                    totalAffectedInDivisionPreviously += kDistrictAffected.prev_count;
                }
            });
        }

        // // Set values over cards

        selectedDistrict == null ?
            setValueWhenNotFound(
                selectedDistrictName,
                selectedDivision,
                totalAffectedInDivision,
                (totalAffectedInDivision - totalAffectedInDivisionPreviously)
            ) :

            setSelectedValue(
                selectedDistrict.name,
                selectedDistrict.count,
                (selectedDistrict.count - selectedDistrict.prev_count),
                (selectedDistrict.count / totalInfected) * 100,
                selectedDivision,
                totalAffectedInDivision,
                (totalAffectedInDivision - totalAffectedInDivisionPreviously)
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

function setValueWhenNotFound(selectedDistrictName, selectedDivisionName, selectedDivisionAffected, selectedDivisionComparator) {
    $('#selectedDistrict').text(selectedDistrictName);
    $('#selectedDistrictCount').text(0);
    setIncreasedText($('#districtComparator'), 0);

    $('#selectedDistrictPercentage').text('0 %');
    
    $('#selectedDivisionName').text('Division: '.concat(selectedDivisionName));
    $('#selectedDivisionCount').text(selectedDivisionAffected);
    setIncreasedText($('#divisionComparator'), selectedDivisionComparator);
}

function setSelectedValue(districtName, districtAffected, districtComparator, percentage, divisionName, divisinCount, divisionYesterday) {
    $('#selectedDistrict').text(districtName);
    $('#selectedDistrictCount').text(districtAffected);
    setIncreasedText($('#districtComparator'), districtComparator);

    $('#selectedDistrictPercentage').text(percentage.toFixed(2).toString().concat(' %'));

    $('#selectedDivisionName').text('Division: '.concat(divisionName));
    $('#selectedDivisionCount').text(divisinCount);
    setIncreasedText($('#divisionComparator'), divisionYesterday);
}

function setIncreasedText(element, count) {
    if(count > 0) {
        element.text(count);
        element.attr("class","red-text");
    } else if (count == 0) {
        element.text(count);
        element.attr("class","green-text");
    } else {
        element.text('N/A');
    }
}