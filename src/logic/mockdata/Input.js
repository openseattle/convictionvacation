import CrimeType from "../type/CrimesClassifications";

export default {
  "calculationDate": "2012-04-30T02:15:12.356Z",
  "convictions": [
    {
      "id": "Case Number 1",
      "crime": "Robbery II",
      "classification": CrimeType.FELONY_CLASS_B,
      "isDomesticViolenceRelated": true,
      "relevantDate": "2012-04-30T02:15:12.356Z",
    },
    {
      "id": "Case Number 2",
      "crime": "Grand Theft Auto III",
      "classification": CrimeType.FELONY_CLASS_C,
      "isDomesticViolenceRelated": true,
      "relevantDate": "2012-04-30T02:15:12.356Z",
    },
    {
      "id": "Case Number 2",
      "crime": "Shoplifting",
    },
  ]
}