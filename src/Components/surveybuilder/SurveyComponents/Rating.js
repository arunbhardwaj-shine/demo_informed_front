import Select from "react-select";
import React from 'react'
import { Form, Row } from 'react-bootstrap'
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
function Rating({ item, index,handleExtraAndStyle }) {
 
    const styleOptions = [
        { value: 'stars', label: 'Stars' },
        { value: 'numeric', label: 'Numeric' },
    ];
    const scaleOptions = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ];

    return (
        <div className="steps scale-options">
            <Row>
                <Form.Group>
                    <Form.Label>Scale Range</Form.Label>
                    <Select
                        aria-label="Rating Scale"
                        className="dropdown-basic-button split-button-dropup"
                        name="ratingScale"
                        value={scaleOptions.find(option => option.value === item.extra.ratingScale)}
                        onChange={(e) => handleExtraAndStyle(index,e.value, "ratingScale","extra" )}

                        options={scaleOptions}
                    />
                </Form.Group>
                <Form.Group className='scale-style'>
                    <Form.Label>Scale Style</Form.Label>
                    <Select
                        aria-label="Scale Style"
                        className="dropdown-basic-button split-button-dropup"
                        name="scaleStyle"
                        placeholder="Select Style"
                        options={styleOptions}
                        value={styleOptions.find(option => option.value === item.extra.ratingType)}

                        onChange={(e) => handleExtraAndStyle(index,e.value, "ratingType","extra" )}


                    // onChange={selectedOption => handleInputChange({ target: { name: 'scaleStyle', value: selectedOption.value } })}
                    />
                </Form.Group>
                {item.ratingType === "stars" && <Form.Group>
                    <Form.Label>Color</Form.Label>
                    <div className="color-picker">
                        <div className="color-pick">
                            <div className="color-pick-point">
                                <img src={`${path_image}color-picker.svg`} alt="Color Picker" />
                            </div>
                            <input
                                type="color"
                                title="Choose your color"
                                name="color"
                                value={item.extra.ratingColor}
                                onChange={(e) =>handleExtraAndStyle(index,e.target.value, "ratingColor","extra" )}
                            />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11.1954 0.560521C11.4944 -0.187166 12.5056 -0.187166 12.8046 0.560521L15.5034 7.31035C15.6292 7.6249 15.9117 7.83991 16.2361 7.86801L23.1983 8.47091C23.9695 8.5377 24.282 9.5452 23.6956 10.0741L18.4014 14.8486C18.1546 15.0711 18.0467 15.419 18.1215 15.7509L19.7255 22.8734C19.9032 23.6623 19.0851 24.285 18.4237 23.8642L12.4529 20.0652C12.1746 19.8881 11.8254 19.8881 11.5472 20.0652L5.57632 23.8642C4.91492 24.285 4.09678 23.6623 4.27446 22.8734L5.87852 15.7509C5.95327 15.419 5.84536 15.0711 5.59864 14.8486L0.304406 10.0741C-0.282043 9.5452 0.0304618 8.5377 0.801672 8.47091L7.76386 7.86801C8.08831 7.83991 8.37082 7.6249 8.49659 7.31035L11.1954 0.560521Z" fill={item.extra.color} />
                        </svg>
                    </div>
                </Form.Group>}

            </Row>

            <Form.Group>
                <Form.Label>Label on the very left</Form.Label>
                <Form.Control type="text" placeholder="Not satisfied" value={item.extra.leftSideLabel} onChange={(e) => handleExtraAndStyle(index, e.target.value, "leftSideLabel","extra")}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Label on the very right</Form.Label>
                <Form.Control type="text" placeholder="Very satisfied" value={item.extra.rightSideLabel} onChange={(e) => handleExtraAndStyle(index,  e.target.value,"rightSideLabel","extra")} />
            </Form.Group>
        </div>
    )
}

export default Rating