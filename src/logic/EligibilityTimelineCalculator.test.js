import moment, { isDuration } from 'moment';

import ConvictionCalculator from './EligibilityTimelineCalculator';

import CrimeClassification from "./type/CrimesClassifications";
import {
    ConvictionInput,
    CalculatorInput
} from "./type/CalculatorInput";

let TEST_ID = "TEST_ID";

// Parameterized test table with the following format:
// Crime Name, Crime Classification, Is Domestic Violence Related, Is DUI Related, Crime Relevant Date, Calculation Date, Expected Conviction Vacatable
let singleConvictionTestData = [
    // Test cases for time past since conviction's relevant date
    // Vacatable test cases
    ["Misdemeanor 3 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, false, false, "2015-01-01", "2019-01-01", true],
    ["Misdemeanor with Domestic Violence, 5 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, true, false, "2014-01-01", "2019-01-01", true],
    ["Misdemeanor with DUI, 10 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, false, true, "2009-01-01", "2019-01-01", true],
    ["Misdemeanor with Domestic Violence & DUI, 10 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, true, true, "2009-01-01", "2019-01-01", true],
    ["Gross Misdemeanor 3 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], false, false, "2014-01-01", "2019-01-01", true],
    ["Gross Misdemeanor with Domestic Violence, 5 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], true, false, "2014-01-01", "2019-01-01", true],
    ["Gross Misdemeanor with DUI, 10 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], false, true, "2009-01-01", "2019-01-01", true],
    ["Gross Misdemeanor with Domestic Violence & DUI, 10 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], false, true, "2009-01-01", "2019-01-01", true],
    ["Felony B 10 Years has passed since relevant date", CrimeClassification.FELONY_CLASS_B, false, false, "1990-01-01", "2019-01-01", true],
    ["Felony C 5 Years has passed since relevant date", CrimeClassification.FELONY_CLASS_C, false, false, "2013-01-01", "2019-01-01", true],
    // Non-Vacatable test cases
    ["Misdemeanor 3 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, false, false, "2016-01-15", "2019-01-01", false],
    ["Misdemeanor with Domestic Violence, 5 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, true, false, "2014-03-01", "2019-01-01", false],
    ["Misdemeanor with DUI, 10 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, false, true, "2009-02-01", "2019-01-01", false],
    ["Misdemeanor with Domestic Violence & DUI, 10 Years has passed since relevant date", CrimeClassification.MISDEMEANOR, true, true, "2009-02-01", "2019-01-01", false],
    ["Gross Misdemeanor 3 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], false, false, "2016-07-01", "2019-01-01", false],
    ["Gross Misdemeanor with Domestic Violence, 5 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], true, false, "2014-03-01", "2019-01-01", false],
    ["Gross Misdemeanor with DUI, 10 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], false, true, "2009-07-01", "2019-01-01", false],
    ["Gross Misdemeanor with Domestic Violence & DUI, 10 Years has passed since relevant date", CrimeClassification["GROSS MISDEMEANOR"], false, true, "2009-07-01", "2019-01-01", false],
    ["Felony B 10 Years has passed since relevant date", CrimeClassification.FELONY_CLASS_B, false, false, "2010-01-01", "2019-01-01", false],
    ["Felony C 5 Years has passed since relevant date", CrimeClassification.FELONY_CLASS_C, false, false, "2015-12-01", "2019-01-01", false],

    // Test cases for conviction logic for 1984-07-01 cutoff date
    ["Felony B Before 1st July, 1984", CrimeClassification.FELONY_CLASS_B, false, false, "1984-06-30", "2019-01-01", false],
    ["Felony B After 1st July, 1984", CrimeClassification.FELONY_CLASS_B, false, false, "1984-07-02", "2019-01-01", true],
    ["Felony C Before 1st July, 1984", CrimeClassification.FELONY_CLASS_C, false, false, "1984-06-30", "2019-01-01", false],
    ["Felony C After 1st July, 1984", CrimeClassification.FELONY_CLASS_C, false, false, "1984-07-02", "2019-01-01", true]
]
test.each(singleConvictionTestData)(
    'Single conviction with crime="%s", classification="%s", withDomesticViolence="%s" and isDUI="%s" relevant date of "%s" and calculationDate="%s"',
    (crime, classification, isDV, isDUI, relevantDate, calculationDate, expectedVacatable) => {
        let calculator = new ConvictionCalculator();
        let conviction = new ConvictionInput(TEST_ID, crime, classification, isDV, isDUI, relevantDate);
        let input = new CalculatorInput(calculationDate, [conviction]);
        let actualCalculatorOutput = calculator.calculate(input);

        expect(actualCalculatorOutput.getConviction(TEST_ID).vacatable).toBe(expectedVacatable);
    },);
    