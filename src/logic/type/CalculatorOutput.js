export class CalculatorOutput {
  constructor(targetDate, convictions) {
    this.targetDate = targetDate;
    this.convictions = convictions;
  }

  getConviction(id) {
    let matchingConviction = null;
    this.convictions.forEach(conviction => {
      if (conviction.id === id) {
        matchingConviction = conviction;
      }
    })
    return matchingConviction;
  }
}

export class ConvictionOutput {
  constructor(id, vacatable, reasons) {
    this.id = id;
    this.vacatable = vacatable;
    this.reasons = reasons;
  }
}

export class ConvictionVacatableReasons {
  constructor(vacatableReasons, notVacatableReasons, errors) {
    this.vacatableReasons = vacatableReasons;
    this.notVacatableReasons = notVacatableReasons;
    this.errors = errors;
  }
}