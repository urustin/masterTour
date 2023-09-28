// calculateDistance.js


// body2
let map;
let service;
let autocompleteA;
let autocompleteB;
let directionsService;
let directionsRenderer;


//body3
let carType;

// body4
//추가타입 입력
let result = [];


function initMap() {
    
    const center = airportList[airportValue];
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 8,
        disableDefaultUI: true,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);


    // Setting up the Autocomplete feature
    autocompleteA = new google.maps.places.Autocomplete(document.getElementById('locationA'));
    autocompleteB = new google.maps.places.Autocomplete(document.getElementById('locationB'));

    service = new google.maps.DistanceMatrixService();

}

// body 00 - date/time


document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // add 1 because months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');

    document.querySelector('#dateAndTime #date').value = `${year}-${month}-${day}`;
    document.querySelector('#dateAndTime #hour').value = `${hour}:00`; // set minutes and seconds to 00
});





//body1 - pick the airport

let airportValue=0;
let airportName = "melbourn aiport";
let airportList = [
    { lat: -37.6733, lng: 144.8433 },
    { lat: -17.6733, lng: 144.8433 },
    { lat: -27.6733, lng: 144.8433 },
    { lat: -47.6733, lng: 144.8433 },
];

//body1 - pick the airport
document.getElementById('airportList').addEventListener('click', function(event) {
    // Ensure that only list items are considered

    if (event.target.parentElement.tagName.toLowerCase() === 'li') {
        const selectedValue = event.target.parentElement.getAttribute('data-value');
        const selectedAirport = event.target.parentElement.innerText;


        airportValue = selectedValue;
        // airportName = selectedAirport.trim(); // remove potential extra spaces
        if(selectedValue==="4"){
            airportName = "Avalon Airport, Beach Road, Lara VIC"
        }else{
            airportName = "Melbourne Airport (MEL), Arrival Drive, Melbourne Airport VIC, Australia"
        }
        
        document.getElementById('locationA').value = airportName;
        // Further logic can be added here
        // Autocomplete 객체를 업데이트
        changeLocationA();
        showNextBox(1);
        
    }
});

//body3 - pick the car type
document.querySelector('.pickUp_body03').addEventListener('click', function(event) {
    // Ensure that only list items are considered
    if (event.target.parentElement.tagName.toLowerCase() === 'li') {
        const selectedValue = event.target.parentElement.getAttribute('data-value');
        carType = selectedValue;
        showNextBox(3);
        result.push(carType);
    }
});

//body4 - additional Option
document.querySelector('.optionConfirm').addEventListener('click', function() {
    // Ensure that only list items are considered
    const carrierCount = document.getElementById('carrierNumber').innerText;
    const carseatValue = document.querySelector('input[name="carseat"]:checked').value;
    const boosterValue = document.querySelector('input[name="booster"]:checked').value;
    
    result = [...result, carrierCount, carseatValue, boosterValue];


    showNextBox(4);

    document.querySelector("#expectation").innerText = "예상금액 : "+ result;
});

let carrierCount = 0; // 초기값

function increase() {
  carrierCount++;
  document.getElementById('carrierNumber').innerText = carrierCount;
}

function decrease() {
  if(carrierCount > 0) {
    carrierCount--;
    document.getElementById('carrierNumber').innerText = carrierCount;
  }
}


//set airport as locationA
//reset


function changeLocationA() {

    // Initialize AutocompleteService
    const autocompleteService = new google.maps.places.AutocompleteService();

    // Get place predictions
    autocompleteService.getPlacePredictions({
    input: airportName,
    // additional parameters like types, location, radius etc.
    }, function(predictions, status) {
       console.log(status);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(predictions[0].description);
            document.getElementById('locationA').value = predictions[0].description;
        }
    });

}




//calculate




function calculateDistance() {

    // const origin = "Melbourne Airport (MEL), 아리벌 드라이브 멜버른 에어포트 빅토리아 주 오스트레일리아";
    const origin = document.getElementById('locationA').value;
    const destination = document.getElementById('locationB').value;

    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    }, (response, status) => {
        if (status === 'OK') {
    
            if (response.rows[0] && response.rows[0].elements[0] && response.rows[0].elements[0].distance) {
                let distance = response.rows[0].elements[0].distance.text;
                document.getElementById('distanceResult').innerHTML = 'Distance: ' + distance;
                document.getElementById('resultBox').style="opacity:1;";
                result.push(distance);
                // setTimeout(()=>{
                //     document.getElementById('distanceResult').style="opacity:0;";
                //     showNextBox(2);
                // },3000);
            } else {
                console.log("Could not find distance information.");
                alert("Could not find distance information.");
            }
    
        } else {
            alert('Error was: ' + status);
        }
    });

  // Draw the route on the map
    let request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
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
