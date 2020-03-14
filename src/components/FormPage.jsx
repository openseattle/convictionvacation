//
// Proof of concept prototype.  For simplicity, the form background image is set to fixed a width to avoid having
// the input overlays be dependent on the with of the browser window.
// 
// Todo:
//   - pass data through props
//   - support multi-page forms
//   
import React from 'react';
import '../styles/fillableForm.css';

export default function ({courtType, plaintiff, defendant, hearingDate, hearingTime, currentDate, attorney, wsba}) { 
    const pathToImages = '/';
    const data = {
        formImage: 'form1.png',
        inputs: [
            { text: courtType, pos: { x: 227, y: 343 } },
            { text: plaintiff, pos: { x: 227, y: 420 } },
            { text: defendant, pos: { x: 247, y: 470 } },
            { text: hearingDate, pos: { x: 400, y: 705 } },
            { text: hearingTime, pos: { x: 700, y: 705 } },
            { text: currentDate, pos: { x: 250, y: 860 } },
            { text: attorney, pos: { x: 600, y: 880 } },
            { text: wsba, pos: { x: 700, y: 880 } }
        ]
    };
    const overlay = data.inputs.map((item, key) => <div key={key + item.text} className="text" style={{ left: item.pos.x, top: item.pos.y }}>{item.text}</div>);
    return (
        <div className='form'>
            <img src={data.formImage} alt="Form1" />
            {overlay}
        </div>
    );
} 
