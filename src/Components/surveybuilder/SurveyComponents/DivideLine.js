import Select from "react-select";
import React from 'react'
import { Col, Form } from 'react-bootstrap';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

export default function DivideLine({item,handleUpdateElement,index,handleExtraAndStyle}) {
    console.log("DivideLine");
    console.log(item)

    const lineOptions = [
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'dashed' },
        { value: 'dotted', label: 'dotted' },
    ];

  return (
    <div className='steps'>
    <div className='d-flex w-100' style={{ gap: '16px' }}>
        <Form.Group as={Col}>
            <Form.Label>Height (px)</Form.Label>
            <Form.Control type="number" placeholder="Height" value={item.style.height} onChange={(e) => 
            handleExtraAndStyle(index,e.target.value,'height',"style")} />
        </Form.Group>
        <Form.Group as={Col}>
            <Form.Label>Width (%)</Form.Label>
            <Form.Control type="number" placeholder="Width" value={item.style.width}
                onChange={(e) => {
                    const value = Math.max(0, Math.min(100, parseInt(e.target.value, 10)));
                    handleExtraAndStyle(index,value,'width',"style")}
                    
                }
            />
        </Form.Group>
    </div>
    <div className='d-flex w-100' style={{ gap: '16px' }}>
        <Form.Group>
            <Form.Label>Line Style</Form.Label>
            <Select
                        aria-label="Line Style"
                        className="dropdown-basic-button split-button-dropup"
                        name="lineStyle"
                        value={lineOptions.find(option => option.value === item.style.lineStyle)}
                        options={lineOptions}
                        onChange={(selectedOption) => handleExtraAndStyle(index, selectedOption.value, 'lineStyle', "style")}
                    />
        </Form.Group>
        <Form.Group>
            <Form.Label>Color</Form.Label>
            <div className="color-picker">
                <div className="color-pick">
                    <div className="color-pick-point">
                        <img src={path_image + 'color-picker.svg'} alt="" />
                    </div>
                    <input type="color"
                        title="Choose your color"
                        name="color"
                        value={item.style.color}
                        onChange={(e) => handleExtraAndStyle(index,e.target.value,'color',"style") } 
                        />
                </div>
            </div>
        </Form.Group>
    </div>
</div>
  )
}

