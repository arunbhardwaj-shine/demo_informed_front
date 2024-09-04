import React from 'react'
import { Form } from 'react-bootstrap';

export default function FreeText({ item, index, handleUpdateElement,handleExtraAndStyle }) {
    console.log("FreeText");


    return (
        <div className="steps">
            <>
                <p className="option-heading">Placeholder text</p>
                <Form.Control
                    type="text"
                    placeholder="Type your answer here..."
                    value={item.extra.placeholder}
                    onChange={(e) => handleExtraAndStyle(index,e.target.value,"placeholder","extra")}
                />
            </>
            <>
                <p className="option-heading">maximum text length</p>
                <div className='d-flex align-items-center words-limit'>
                    <Form.Control
                        type="number"
                        placeholder={item.extra.maxTextLength}
                        value={item.extra.maxTextLength}
                        onChange={(e) => {
                            // const value = Math.max(0, Math.min(50, parseInt(e.target.value, 10)));
                            handleExtraAndStyle(index,e.target.value, "maxTextLength", "extra");
                        }} />
                    <span>words</span>
                </div>
            </>
        </div>
    )
}
