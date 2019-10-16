import CrimeType from "../type/CrimesClassifications";

export default {
  "calculationDate": "2019-04-30T02:15:12.356Z",
  "convictions": [
    {
      "id": "Case Number 1 (Class B NOT Vacatable)",
      "crime": "Robbery II",
      "classification": CrimeType.FELONY_CLASS_B,
      "isDomesticViolenceRelated": true,
      "isDuiRelated": false,
      "relevantDate": "2012-05-30T02:15:12.356Z",
    },
    {
      "id": "Case Number 2",
      "crime": "Grand Theft Auto III (Class C Vacatable)",
      "classification": CrimeType.FELONY_CLASS_C,
      "isDomesticViolenceRelated": true,
      "isDuiRelated": false,
      "relevantDate": "2010-01-01T02:15:12.356Z",
    },
    {
      "id": "Case Number 2 (Has No Input Data)",
      "crime": "Shoplifting",
    },
  ]
}