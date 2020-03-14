import React from 'react';

import LegalForm from "./LegalForm"

export default function ({ clientName, calculatorOutput }) {
    return calculatorOutput.convictions.filter(({ vacatable }) => vacatable).map(conviction => {
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
    });
} 