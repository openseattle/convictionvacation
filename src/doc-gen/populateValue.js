use strict
populateValues.addEventListener('click', handlePopulateValues);
function handlePopulateValues(){
  for (var key of Object.keys(InputDataToFieldIdMapping)){
    for(var value of InputDataToFieldIdMapping[key]){
      document.getElementById(value).innerHTML = InputData[key];
    }
  }
}
let InputData = {
  "courtType": "Superior",
  "plaintiff": "State of Washington",
  "defendant": "John Doe",
  "countyClerkName": "Sam Clark",
  "countyName": "King",
  "courtName": "King County Superior Court",
  "hearingDate": "2019-11-24",
  "hearingTime": "3:00",
  "hearingAmorPm": "PM",
  "dateOfSubmission": "2019-11-23",
  "attorneyName": "Johnny Law",
  "attorneyWsbaNumber": "98765"
}
let InputDataToFieldIdMapping = {
  "courtType": ["page1.courtType","page2.courtType"],
  "plaintiff": ["plaintiff"],
  "defendant": ["defendant"],
  "countyClerkName": ["countyClerkName"],
  "countyName": ["countyName"],
  "courtName": ["courtName"],
  "hearingDate": ["hearingDate"],
  "hearingTime": ["hearingTime"],
  "hearingAmorPm": ["hearingAmorPm"],
  "dateOfSubmission": ["dateOfSubmission"],
  "attorneyName": ["attorneyName"],
  "attorneyWsbaNumber": ["attorneyWsbaNumber"]
}
