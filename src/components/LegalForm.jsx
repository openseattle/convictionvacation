import React from 'react';

import FormPage from "./FormPage"

export default function ({courtType, plaintiff, defendant, hearingDate, hearingTime, currentDate, attorney, wsba}) {
    return (
        <div className='legalForm'>
            <FormPage 
                courtType={courtType}
                plaintiff={plaintiff}
                defendant={defendant}
                hearingDate={hearingDate}
                hearingTime={hearingTime}
                currentDate={currentDate}
                attorney={attorney}
                wsba={wsba}
            />
        </div>
    );
} 