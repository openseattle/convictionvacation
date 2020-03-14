import moment from 'moment';

import CrimeClassification from "./type/CrimesClassifications";
import {
    CalculatorOutput,
    ConvictionOutput,
    ConvictionVacatableReasons
} from "./type/CalculatorOutput";

export default class EligibilityTimelineCalculator {
    calculate(input) {

        let output = this.createSkeletonCalculatorOutput(input);
        let calculationDate = moment(input.calculationDate);
        let clientDOB = moment(input.clientDOB);

        // 1. Determine the most recent conviction date, then check whether date between NOW and the date
        //    recent conviction will make any of the convictions ineligible for vacation
        //      Misdemeanor & Gross Misdemeanor - no new conviction in the past 3 years
        //      Class B Felony - no new conviction in the past 10 years
        //      Class C Felony - no new conviction in the past 5 years
        let lastConvictionDate = this.calculateLastConvictionDate(input);
        let lastConvictionDateString = lastConvictionDate.format('YYYY-MM-DD');
        let yearsSinceLastConvictionDate = calculationDate.diff(lastConvictionDate, 'years');

        input.convictions.forEach((conviction) => {
            let convictionOutput = output.getConviction(conviction.id);

            switch (conviction.classification) {
                case CrimeClassification.MISDEMEANOR:
                case CrimeClassification.GROSS_MISDEMEANOR:
                    if (yearsSinceLastConvictionDate >= 3) {
                        convictionOutput.reasons.vacatableReasons.push("No new conviction within the last 3 years.");
                    } else {
                        convictionOutput.reasons.notVacatableReasons.push(
                            `The latest conviction date ${lastConvictionDateString} is within the last 3 years.`
                        );
                    }
                    break;
                // Marijuana misdemeanors are treated differently, they are vacatable regardless of time of offense
                // as long as the client was at least 21 years old when charged. These convictions should also not
                // affect eligibility of vacation of other convictions.
                case CrimeClassification.MARIJUANA_MISDEMEANOR:
                    let relevantDate = moment(conviction.relevantDate);
                    let ageAtOffenseTime = relevantDate.diff(clientDOB, 'years')
                    if (ageAtOffenseTime >= 21) {
                        convictionOutput.reasons.vacatableReasons.push("Was at least 21 years old at time of offense.");
                    } else {
                        convictionOutput.reasons.notVacatableReasons.push("Was less than 21 years old at time of offense.");
                    }
                    break;
                case CrimeClassification.FELONY_CLASS_B:
                    if (yearsSinceLastConvictionDate >= 10) {
                        convictionOutput.reasons.vacatableReasons.push("No new conviction within the last 10 years.");
                    } else {
                        convictionOutput.reasons.notVacatableReasons.push(
                            `The latest conviction date ${lastConvictionDateString} is within the last 10 years.`
                        );
                    }
                    break;
                case CrimeClassification.FELONY_CLASS_C:
                    if (yearsSinceLastConvictionDate >= 5) {
                        convictionOutput.reasons.vacatableReasons.push("No new conviction within the last 5 years.");
                    } else {
                        convictionOutput.reasons.notVacatableReasons.push(
                            `The latest conviction date ${lastConvictionDateString} is within the last 5 years.`
                        );
                    }
                    break;
                default:
                    convictionOutput.reasons.errors.push("Crime Classification not specified.");
                    break;
            }
        });

        // 2. (Misdemeanor & Gross Misdemeanor) For each conviction, determine if it is eligible
        //    - 3 years has passed since the Relevant Date, unless:
        //      - If the conviction involves "Operating a Vehicle Under Influence"
        //        - 10 year has passed since the arrest date
        //      - If the conviction involved "Domestic Violence"
        //        - 5 years has passed since the sentence is completed

        input.convictions.forEach((conviction) => {
            let convictionOutput = output.getConviction(conviction.id);

            let relevantDate = moment(conviction.relevantDate);
            let relevantDateString = relevantDate.format('YYYY-MM-DD')
            let yearsSinceRelevantDate = calculationDate.diff(relevantDate, 'years');

            if (conviction.classification === CrimeClassification.MISDEMEANOR ||
                conviction.classification === CrimeClassification.GROSS_MISDEMEANOR) {
                if (conviction.isDuiRelated === true) {
                    if (yearsSinceRelevantDate >= 10) {
                        convictionOutput.reasons.vacatableReasons.push(
                            "Conviction involves DUI, 10 year has passed since the Relevant Date"
                        );
                    } else {
                        convictionOutput.reasons.notVacatableReasons.push(
                            `Conviction involves DUI, 10 years has not passed since the Relevant Date ${relevantDateString}`
                        );
                    }
                } else {
                    if (conviction.isDomesticViolenceRelated === true) {
                        if (yearsSinceRelevantDate >= 5) {
                            convictionOutput.reasons.vacatableReasons.push("Conviction involves Domestic Violence, 5 year has passed since the Relevant Date (completion of sentence and any treatment ordered)");
                        } else {
                            convictionOutput.reasons.notVacatableReasons.push(
                                `Conviction involves Domestic Violence, 5 year has not passed since the Relevant Date  ${relevantDateString}`
                            );
                        }
                    } else {
                        if (yearsSinceRelevantDate >= 3) {
                            convictionOutput.reasons.vacatableReasons.push("3 year has passed since the Relevant Date");
                        } else {
                            convictionOutput.reasons.notVacatableReasons.push(
                                `3 years has not passed since the Relevant Date ${relevantDateString}`
                            );
                        }
                    }
                }
            }
        });

        // 3. (Felony) For each conviction, determine if it is eligible
        //    - Offence is committed on or after July 1, 1984
        //      - Class B Felony - 10 year has passed since latter of "release" and "sentencing" date
        //      - Class C Felony - 5 years has passed since latter of "release" and "sentencing" date

        input.convictions.forEach((conviction) => {
            let convictionOutput = output.getConviction(conviction.id);

            let relevantDate = moment(conviction.relevantDate);
            let relevantDateString = relevantDate.format('YYYY-MM-DD')
            let yearsSinceRelevantDate = calculationDate.diff(relevantDate, 'years');

            // TODO: Verify if this is only applicable to Felonies
            if (conviction.classification === CrimeClassification.FELONY_CLASS_C ||
                conviction.classification === CrimeClassification.FELONY_CLASS_B) {
                if (relevantDate >= moment('1984-07-01')) {
                    convictionOutput.reasons.vacatableReasons.push(
                        "Offense's Relevant Date (committed) is after July 1st, 1984."
                    );
                } else {
                    convictionOutput.reasons.notVacatableReasons.push(
                        `Offense Relevant Date ${relevantDateString} is before July 1st, 1984.`
                    );
                }
            }
            if (conviction.classification === CrimeClassification.FELONY_CLASS_B) {
                if (yearsSinceRelevantDate >= 10) {
                    convictionOutput.reasons.vacatableReasons.push(
                        "10 years has passed since the Relevant Date (latter of release or sentencing date)"
                    );
                } else {
                    convictionOutput.reasons.notVacatableReasons.push(
                        `10 years has not passed since the Relevant Date ${relevantDateString}`
                    );
                }
            }

            if (conviction.classification === CrimeClassification.FELONY_CLASS_C) {
                if (yearsSinceRelevantDate >= 5) {
                    convictionOutput.reasons.vacatableReasons.push(
                        "5 years has passed since the Relevant Date (latter of release or sentencing date"
                    );
                } else {
                    convictionOutput.reasons.notVacatableReasons.push(
                        `5 years has not passed since the Relevant Date ${relevantDateString}`
                    );
                }
            }

        });

        this.setEligibilityProperty(output);

        return output;
    }

    createSkeletonCalculatorOutput(input) {
        let outputConvictionSkeletons = input.convictions.map(inputConviction => {
            return new ConvictionOutput(inputConviction.id, null, new ConvictionVacatableReasons([], [], []), inputConviction.classification);
        });
        return new CalculatorOutput(input.calculationDate, outputConvictionSkeletons);
    }

    calculateLastConvictionDate(input) {
        let sortedConvictionDateStrings = input.convictions
            .filter(conviction => conviction.classification !== CrimeClassification.MARIJUANA_MISDEMEANOR)
            .map(conviction => conviction.relevantDate)
            .filter(conviction => conviction !== undefined)
            .sort();

        let lastConvictionDateString = sortedConvictionDateStrings.pop();
        return moment(lastConvictionDateString);
    }

    setEligibilityProperty(output) {
        output.convictions.forEach((conviction) => {
            if (conviction.reasons.errors.length > 0) {
                conviction.vacatable = null;
            } else if (conviction.reasons.notVacatableReasons.length > 0) {
                conviction.vacatable = false;
            } else if (conviction.reasons.vacatableReasons.length > 0) {
                conviction.vacatable = true;
            } else {
                console.error("Conviction output does not have any errors, vacatable reasons and not vacatable reasons.")
            }
        });
    }
}
