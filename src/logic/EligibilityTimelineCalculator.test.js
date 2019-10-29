import moment, { isDuration } from 'moment';

import ConvictionCalculator from './EligibilityTimelineCalculator';

import CrimeClassification from "./type/CrimesClassifications";
import {
    ConvictionInput,
    CalculatorInput
} from "./type/CalculatorInput";

let TEST_ID = "TEST_ID";

// Parameterized test table with the following format:
// Crime Name, Crime Classification, Is Domestic Violence Related, Is DUI Related, Crime Relevant Date, Calculation Date, Client DOB, Expected Conviction Vacatable

let singleConvictionTestData = [
    ["Misdemeanor No New Conviction Past 3 Years", CrimeClassification.MISDEMEANOR, false, false, "2014-01-01", "2019-01-01", "2019-11-01", true],
    ["Gross Misdemeanor No New Conviction Past 3 Years", CrimeClassification["GROSS MISDEMEANOR"], false, false, "2014-01-01", "2019-01-01", "2019-11-01", true],
    ["Felony B No New Conviction Past 10 Years", CrimeClassification.FELONY_CLASS_B, false, false, "1990-01-01", "2019-01-01", "2019-11-01", true],
    ["Felony C No New Conviction Past 5 Years", CrimeClassification.FELONY_CLASS_C, false, false, "2013-01-01", "2019-01-01", "2019-11-01", true],
    ["Felony B Before 1st July, 1984", CrimeClassification.FELONY_CLASS_B, false, false, "1984-06-30", "2019-01-01", "2019-11-01", false],
    ["Felony C Before 1st July, 1984", CrimeClassification.FELONY_CLASS_C, false, false, "1984-06-30", "2019-01-01", "2019-11-01", false],
    ["Marijuana possesion, under 21 at offense time", CrimeClassification.MARIJUANA_MISDEMEANOR, false, false, "2019-06-30", "2019-11-01", "1999-01-01", false],
    ["Marijuana possesion, 21+ at offense time", CrimeClassification.MARIJUANA_MISDEMEANOR, false, false, "2019-06-30", "2019-11-01", "1990-01-01", true],
]
test.each(singleConvictionTestData)(
    'Single conviction with crime="%s", classification="%s", withDomesticViolence="%s" and isDUI="%s" relevant date of "%s" and calculationDate="%s"',
    (crime, classification, isDV, isDUI, relevantDate, calculationDate, clientDOB, expectedVacatable) => {
        let calculator = new ConvictionCalculator();
        let conviction = new ConvictionInput(TEST_ID, crime, classification, isDV, isDUI, relevantDate);
        let input = new CalculatorInput(calculationDate, clientDOB, [conviction]);
        let actualCalculatorOutput = calculator.calculate(input);

        expect(actualCalculatorOutput.getConviction(TEST_ID).vacatable).toBe(expectedVacatable);
    },);


