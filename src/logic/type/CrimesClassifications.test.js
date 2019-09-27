import CrimeClassification from './CrimesClassifications.js';

test('Should not contain class A felonies', () => {
    Object.keys(CrimeClassification).forEach(classification => {
        expect(classification.toLowerCase()).toEqual(expect.not.stringContaining("class_a"));
    });
});
