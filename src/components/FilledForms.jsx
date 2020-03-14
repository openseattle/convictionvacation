import React from 'react';

import LegalForm from "./LegalForm"
import FelonyLegalForm from "./FelonyLegalForm"

export default function ({ clientName, calculatorOutput }) {
    const vacatables = calculatorOutput.convictions.filter(({ vacatable }) => vacatable);
    const felonies = vacatables.filter(({ classification }) => classification.toUpperCase().indexOf("FELONY") > -1);
    console.log('felonies', felonies);
    const nonFelonies = vacatables.filter(({ classification }) => classification.toUpperCase().indexOf("FELONY") < 0);
    console.log('nonFelonies', nonFelonies);
    return felonies.map(conviction => {
        return (
            <div className='filledForm'>
                <FelonyLegalForm 
                    courtType={"Superior"}
                    plaintiff={"State of Washington"}
                    defendant={clientName}
                    hearingDate={"2019-10-19"}
                    hearingTime={"11:30"}
                    currentDate={"2019-08-15"}
                    attorney={"Jane Law"}
                    wsba={12346}
                />
            </div>
        );
    }).concat(
        nonFelonies.map(conviction => {
            return (
                <div className='filledForm'>
                    <LegalForm 
                        courtType={"Superior"}
                        plaintiff={"State of Washington"}
                        defendant={clientName}
                        hearingDate={"2019-10-19"}
                        hearingTime={"11:30"}
                        currentDate={"2019-08-15"}
                        attorney={"Jane Law"}
                        wsba={12346}
                    />
                </div>
            );
        })
    );
} 