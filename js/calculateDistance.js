// calculateDistance.js


// body2
let map;
let service;
let autocompleteA;
let autocompleteB;

let temp;

function initMap() {
    
    const center = airportList[airportValue];
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 8,
    });

    // Setting up the Autocomplete feature
    autocompleteA = new google.maps.places.Autocomplete(document.getElementById('locationA'));
    autocompleteB = new google.maps.places.Autocomplete(document.getElementById('locationB'));

    service = new google.maps.DistanceMatrixService();
}





//body1 - pick the airport

let airportValue=0;
let airportName = "melbourn aiport";
let airportList = [
    { lat: -37.6733, lng: 144.8433 },
    { lat: -17.6733, lng: 144.8433 },
    { lat: -27.6733, lng: 144.8433 },
    { lat: -47.6733, lng: 144.8433 },
];


document.getElementById('airportList').addEventListener('click', function(event) {
    // Ensure that only list items are considered

    if (event.target.parentElement.tagName.toLowerCase() === 'li') {
        const selectedValue = event.target.parentElement.getAttribute('data-value');
        const selectedAirport = event.target.parentElement.innerText;


        airportValue = selectedValue;
        airportName = selectedAirport.trim(); // remove potential extra spaces
        document.getElementById('locationA').value = airportName;
        // Further logic can be added here
    }
});


//set airport as locationA
//reset
document.getElementById('locationA').focus();


function changeLocationA() {

    // console.log("A");
    

    const inputA = document.getElementById('locationA');
    
    
    if (autocompleteA) {
        google.maps.event.clearInstanceListeners(autocompleteA);
    }
    autocompleteA = new google.maps.places.Autocomplete(inputA);
    inputA.value = airportName; // input 필드에 airportName을 설정합니
    inputA.focus();

    // inputA.click();
    // const firstOption = document.querySelectordocument.querySelector("body > div:nth-child(29) > div:nth-child(1) > span.pac-item-query > span")
    // firstOption.click();
    const c = document.querySelectorAll(".pac-container");
    for(let i of c){
        i.style.opacity = "0";
    }
   

    setTimeout(()=>{
        
        
        const a = document.querySelector(".pac-matched");
        const b = document.querySelector(".pac-item :nth-child(3)");
        
        temp=a.innerText +" "+ b.innerText;
        console.log(temp);
        // inputA.blur();
    },400)

}




//calculate




function calculateDistance() {

    // const origin = "Melbourne Airport (MEL), 아리벌 드라이브 멜버른 에어포트 빅토리아 주 오스트레일리아";
    const origin = temp;
    const destination = document.getElementById('locationB').value;
    console.log(destination);
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
        if (status === 'OK') {
            console.log(response);
    
            if (response.rows[0] && response.rows[0].elements[0] && response.rows[0].elements[0].distance) {
                let distance = response.rows[0].elements[0].distance.text;
                document.getElementById('distanceResult').innerHTML = 'Distance: ' + distance;
            } else {
                console.log("Could not find distance information.");
                alert("Could not find distance information.");
            }
    
        } else {
            alert('Error was: ' + status);
        }
    });
}


// change the screen after B picked
const inputB = document.getElementById('locationB');
inputB.addEventListener("click", changeScreen);

function changeScreen() {
    // alert("Please pick your destination");
    autocompleteB = new google.maps.places.Autocomplete(document.getElementById('locationB'));
    // console.log(autocompleteB);
    // Listen for the place_changed event
    autocompleteB.addListener('place_changed', function() {
        // Get the selected place details
        const place = autocompleteB.getPlace();
    
        // Check if the place has geometry (latitude and longitude)
        if (!place.geometry) {
            alert("No details available for input: '" + place.name + "'");
            return;
        }
    
        // If the place has a geometry, then present it on a map
        map.setCenter(place.geometry.location);
        map.setZoom(13);  // Adjust the zoom level as needed
    });
    
}
