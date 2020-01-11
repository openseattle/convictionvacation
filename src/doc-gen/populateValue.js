function handlePopulateValues(wnd){
  for (var key of Object.keys(InputDataToFieldIdMapping)){
    for(var value of InputDataToFieldIdMapping[key]){
      try {
        wnd.document.getElementById(value).innerHTML = InputData[key];
        console.log(value)
      }
      catch(e) {
        console.error(value);
      }
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
  "courtType": ["courtType"],
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