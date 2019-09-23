export class CalculatorInput {
  constructor(calculationDate, convictions) {
    this.calculationDate = calculationDate;
    this.convictions = convictions; // List of Conviction Input
  }
}

export class ConvictionInput {
  constructor(id, crime, isDomesticViolenceRelated, relevantDate) {
    this.id = id;
    this.crime = crime;
    this.isDomesticViolenceRelated = isDomesticViolenceRelated;
    this.relevantDate = relevantDate;
  }
}