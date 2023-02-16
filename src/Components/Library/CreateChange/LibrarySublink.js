import React,{useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Select from "react-select";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const LibrarySublink = () => {
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
    <>
    <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
                <div className="page-title">
                  <h2>New SubLink</h2>
                </div>
                <div className="header-btn">
                    <Button className="btn-bordered cancel">Close</Button>
                </div>
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <h4>Please find the content you'd like a new subLink for </h4>
                <div className="row">
                  <div className="col">
                    <div className='product-unit d-flex justify-content-between align-items-center'>
                        <div className="form-group">
                            <label for="">Content</label>
                            <Select
                                options={BusinessUnitAll}
                                placeholder="Select business unit"
                                onChange={(event) => onBusinessUnitChange(event)}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                            />
                        </div>
                        <div className="form-group">
                            <label for="">URL</label>
                            <Select
                                options={BusinessUnitAll}
                                placeholder="Select business unit"
                                onChange={(event) => onBusinessUnitChange(event)}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                            />
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
    </Col>
    </>
  )
}

export default LibrarySublink