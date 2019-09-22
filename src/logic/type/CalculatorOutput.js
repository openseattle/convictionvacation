export class CalculatorOutput {
  constructor(targetDate, convictions) {
    this.targetDate = targetDate;
    this.convictions = convictions;
  }

  getConviction(id) {
    this.convictions.forEach(conviction => {
      if (conviction.id === id) return conviction;
    })
  }
}

export class ConvictionOutput {
  constructor(id, vactable, reasons) {
    this.id = id;
    this.vactable = vactable;
    this.reasons = reasons;
  }
}

export class ConvictionVacatableReasons {
  constructor(vacatableReasons, notVacableReasons, errors) {
    this.vacatableReasons = vacatableReasons;
    this.notVacableReasons = notVacableReasons;
    this.errors = errors;
  }
}