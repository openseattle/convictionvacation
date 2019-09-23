export default {
  "calculationDate": "2012-04-30T02:15:12.356Z",
  "convictions": [
    {
      "id": "Case Number 1",
      "vacatable": true,
      "reasons":
        {
          "vacatable": ["10 years have passed since the relevant date"],
          "notVacatable": [],
          "errors": null
        }
    },
    {
      "id": "Case Number 2",
      "vacatable": false,
      "reasons":
        {
          "vacatable": [],
          "notVacatable": ["5 years have NOT passed since the relevant date"],
          "errors": null
        }
    },
    {
      "id": "Case Number 3",
      "vacatable": null,
      "reasons":
        {
          "vacatable": [],
          "notVacatable": [],
          "errors": ["Conviction Classification is empty", "Domestic Violence flag is missing", "Relevant Date is empty"]
        }
    }
  ]
};