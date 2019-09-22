import mockInput from "./mockdata/Input.js";

import CrimeClassification from "./type/CrimesClassifications";
import {CalculatorOutput, ConvictionOutput, ConvictionVacatableReasons} from "./type/CalculatorOutput";

export default class EligibilityTimelineCalculator {
  calculate(input = mockInput) {

    let output = this.createSkeletonCalculatorOutput(input);

    // 1. Determine the most recent conviction date, then check whether date between NOW and the date
    //    recent conviction will make any of the convictions ineligible for vacation
    //      Misdemeanor & Gross Misdemeanor - no new conviction in the past 3 years
    //      Class B Felony - no new conviction in the past 10 years
    //      Class C Felony - no new conviction in the past 5 years
    let lastConvictionDateString = this.calculateLastConvictionDate(input);
    let timeSinceLastConvictionDate = new Date(input.calculationDate) - new Date(lastConvictionDateString);
    let yearsSinceLastConvictionDate = timeSinceLastConvictionDate.getFullYear();
    
    input.convictions.forEach((conviction) => {
      let convictionOutput = output.getConviction(conviction.id);

      switch (conviction.classification) {
        case CrimeClassification.MISDEMEANOR:
        case CrimeClassification["GROSS MISDEMEANOR"]:
          if (yearsSinceLastConvictionDate >= 3) {
            convictionOutput.reasons.vacatableReasons.push("No new conviction within the last 3 years.");
          } else {
            convictionOutput.reasons.notVacableReasons.push("The latest conviction date (" + lastConvictionDateString + ") is within the last 3 years.");
          }
          break;
        case CrimeClassification.FELONY_CLASS_B:
          if (yearsSinceLastConvictionDate >= 10) {
            convictionOutput.reasons.vacatableReasons.push("No new conviction within the last 10 years.");
          } else {
            convictionOutput.reasons.notVacableReasons.push("The latest conviction date (" + lastConvictionDateString + ") is within the last 10 years.");
          }
          break;
        case CrimeClassification.FELONY_CLASS_C:
            if (yearsSinceLastConvictionDate >= 5) {
              convictionOutput.reasons.vacatableReasons.push("No new conviction within the last 5 years.");
            } else {
              convictionOutput.reasons.notVacableReasons.push("The latest conviction date (" + lastConvictionDateString + ") is within the last 10 years.");
            }
          break;
        default:
            convictionOutput.reasons.errors.push("Crime Classification not specified.");
          break; 
      }
    });
    // TODO: Need to consider how the "Operating Vehicle Under Influence" can be fed into the calculator, as
    //       current UI design does not cater for this scenario
    // 2. (Misdemeanor & Gross Misdemeanor) For each conviction, determine if it is eligible
    //    - If the conviction involves "Operating a Vehicle Under Influence"
    //      - 10 year has passed since the arrest date
    //    - If the conviction involved "Domestic Violence"
    //      - 5 years has passed since the sentence is completed

    input.convictions.forEach((conviction) => {
      let convictionOutput = output.getConviction(conviction.id);

      let timeSinceRelevantDate = new Date(input.calculationDate) - new Date(conviction.relevantDate);
      let yearsSinceRelevantDate = timeSinceRelevantDate.getFullYear();

      if (conviction.classification === CrimeClassification.MISDEMEANOR ||
          conviction.classification === CrimeClassification["GROSS MISDEMEANOR"]) {
          if (conviction.isDomesticViolenceRelated === true) {
            if (yearsSinceRelevantDate >= 5) {
              convictionOutput.reasons.vacatableReasons.push("Conviction involves Domestic Violence, 5 year has passed since the Relevant Date (completion of sentence and any treatment ordered)");
            } else {
              convictionOutput.reasons.notVacableReasons.push("Conviction involves Domestic Violence, 5 year has not passed since the Relevant Date (completion of sentence and any treatment ordered)");
            }
          }
        }
    });

    // 3. (Felony) For each conviction, determine if it is eligible
    //    - Offence is committed on or after July 1, 1984
    //      - Class B Felony - 10 year has passed since latter of "release" and "sentencing" date
    //      - Class C Felony - 5 years has passed since latter of "release" and "senteceing" date

    input.convictions.forEach((conviction) => {
      let convictionOutput = output.getConviction(conviction.id);

      // TODO: Verify if this is only applicable to Felonies
      if (conviction.classification === CrimeClassification.FELONY_CLASS_C || conviction.classification === CrimeClassification.FELONY_CLASS_B) {
        if (conviction.relevantDate > new Date("1984-07-01")) {
          convictionOutput.reasons.vacatableReasons.push("Offense's Relevant Date (committed) is after July 1st, 1984.");
        } else {
          convictionOutput.reasons.notVacableReasons.push("Offense Relevant Date (committed) is before July 1st, 1984.");
        }
      }

      let timeSinceRelevantDate = new Date(input.calculationDate) - new Date(conviction.relevantDate);
      let yearsSinceRelevantDate = timeSinceRelevantDate.getFullYear();

      if (conviction.classification === CrimeClassification.FELONY_CLASS_B) {
        if (yearsSinceRelevantDate >= 10) {
          convictionOutput.reasons.vacatableReasons.push("10 years has passed since the Relevant Date (latter of release or setencing date)");
        } else {
          convictionOutput.reasons.notVacableReasons.push("10 years has not passed since the Relevant Date (latter of release or setencing date)");
        }
      }

      if (conviction.classification === CrimeClassification.FELONY_CLASS_C) {
        if (yearsSinceRelevantDate >= 5) {
          convictionOutput.reasons.vacatableReasons.push("5 years has passed since the Relevant Date (latter of release or setencing date");
        } else {
          convictionOutput.reasons.notVacableReasons.push("5 years has not passed since the Relevant Date (latter of release or setencing date)");
        }
      }

    });
    return output;
  }

  createSkeletonCalculatorOutput(input = mockInput) { 
    let outputConvictionSkeletons = input.convictions.map(inputConviction => {
      return new ConvictionOutput(inputConviction.id, null, new ConvictionVacatableReasons([],[],[]));
    });
    return new CalculatorOutput(input.calculationDate, outputConvictionSkeletons);
  }

  calculateLastConvictionDate(input = mockInput) {
    let sortedConvictionDateStrings = input.convictions.map(conviction => conviction.relevantDate).sort();
    let lastConvictionDateString = sortedConvictionDateStrings.pop();
    return lastConvictionDateString;
  }
}