export class CalculatorOutput {
  constructor(id, convictions) {
    this.convictions = convictions;
  }
}

export class ConvictionOutput {
  constructor(id, vactable, reasons) {
    this.id = id;
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