import React,{useState} from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import Select from "react-select";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

function Products() {
    const [BusinessUnitAll, setBusinessUnitAll] = useState([
    { value: "Critical", label: "Critical Care" },
    { value: "Haematology", label: "Haematology" },
    { value: "Immunotherapy", label: "Immunotherapy" },
  ]);
  const [BusinessUnit, setBusinessUnit] = useState("");
  const onBusinessUnitChange = (event) => {
    setBusinessUnit(event.value);
  };
  return (
     <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title">
                <h2>Products</h2>
              </div>
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <h4>Please select the business unit to show the products </h4>
                <div className="row">
                  <div className="col-12">
                    <Form>
                        <div className="form-group">
                            <label for="">Business Unit</label>
                            <Select
                                options={BusinessUnitAll}
                                placeholder="Select business unit"
                                onChange={(event) => onBusinessUnitChange(event)}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                            />
                        </div>
                      </Form>
                  </div>
                  <div className='col-12'>
                    
                  </div>
                </div>
              </div>
            </div>
                

          </Row>
        </div>
      </Col>
  )
}

export default Products