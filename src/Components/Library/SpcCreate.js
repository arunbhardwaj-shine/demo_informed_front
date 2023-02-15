import React, { useState } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap'
import Select from "react-select";

const SpcCreate = () => {
      const [countryAll, setCountryAll] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
  ]);
  const [country, setCountry] = useState("");
  const onCountryChange = (event) => {
    console.log(event);
    setCountry(event.value);
  };
    const handleFileChange = (e) => {

  };
  return (
   <>
       <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title">
                <h2>Create SPC</h2>
              </div>
              <div className="header-btn">
                <Button className="btn-bordered cancel">Cancel</Button>
                <Button className="btn-filled send_btn">Publish</Button>
            </div>
            </div>
            <div className="create-change-content spc-content">
              <div className="form_action">
                <h4>Please fill the following and upload SPC needed</h4>
                <div className="row">
                  <div className="col-12">
                    <Form>
                        <div className="form-group">
                            <label for="">Title of SPC</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="">Country</label>
                            <Select
                                options={countryAll}
                                placeholder="Select country"
                                onChange={(event) => onCountryChange(event)}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                            />
                        </div>
                        <div className="form-group">
                            <label for="">Language</label>
                            <Select
                                options={countryAll}
                                placeholder="Select SPC language"
                                onChange={(event) => onCountryChange(event)}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                            />
                        </div>
                        <div className="form-group">
                            <label for="">Business Unit</label>
                            <Select
                                options={countryAll}
                                placeholder="Select Business Unit"
                                onChange={(event) => onCountryChange(event)}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                            />
                        </div>
                        <div className="form-group">
                            <label for="">Product</label>
                            <Select
                                options={countryAll}
                                placeholder="Select product"
                                onChange={(event) => onCountryChange(event)}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable/>
                            <div className="add_product">
                                <span>&nbsp;</span><Button className="btn-bordered btn-voilet">Add New Product +</Button>
                            </div>
                        </div>
                        <div className="form-group val">
                      <label for="">Upload SPC</label>
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-6[]"
                            id="file-6"
                            className="inputfile inputfile-6"
                            accept=".doc .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={(e) => handleFileChange(e)}
                          />
                          <label for="file-6">
                            <span>Choose Your File</span>
                          </label>
                          <p>Upload your SPC file <br />
                            <span>(Please upload PDF file only)</span></p>
                        </div>
                      </div>
                    </div>
                    </Form>
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

export default SpcCreate