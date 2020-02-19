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

export default function () {
    const pathToImages = '/';
    const data = {
        formImage: 'form1.png',
        inputs: [
            { text: 'Superior', pos: { x: 227, y: 343 } }, // court of Washington 
            { text: 'State of Washington', pos: { x: 227, y: 420 } }, // plaintiff
            { text: 'John Doe', pos: { x: 247, y: 470 } }, // defendant
            { text: '2019-10-19', pos: { x: 400, y: 705 } }, // hearing date
            { text: '11:30', pos: { x: 700, y: 705 } },  // hearing time
            { text: '2019-08-15', pos: { x: 250, y: 860 } }, // current date
            { text: 'Jane Law', pos: { x: 600, y: 880 } }, // attorney
            { text: '12346', pos: { x: 700, y: 880 } } // wsba
        ]
    };
    const overlay = data.inputs.map((item, key) => <div className="text" style={{ left: item.pos.x, top: item.pos.y }}>{item.text}</div>);
    return (
        <div className='form'>
            <img src={data.formImage} alt="Form1" />
            {overlay}
        </div>
    );
} 
