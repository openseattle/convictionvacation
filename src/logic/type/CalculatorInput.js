export class CalculatorInput {
  constructor(calculationDate, clientDOB, convictions) {
    this.calculationDate = calculationDate;
    this.clientDOB = clientDOB;
    this.convictions = convictions; // List of Conviction Input
  }
}

export class ConvictionInput {
  constructor(id, crime, classification, isDomesticViolenceRelated, isDuiRelated, relevantDate) {
    this.id = id;
    this.crime = crime;
    this.classification = classification;
    this.isDomesticViolenceRelated = isDomesticViolenceRelated;
    this.isDuiRelated = isDuiRelated;
    this.relevantDate = relevantDate;
  }
}
