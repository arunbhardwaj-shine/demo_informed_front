
import React, { useState } from 'react'
import { Col, Dropdown, DropdownButton, Form, Modal, Row } from 'react-bootstrap';
import {Link } from 'react-router-dom';

const ReaderReview = () => {
  const [field, setField] = useState([]);  
  return (
   <Col className="right-sidebar">
      <div className="custom-container">
         <Row>
          <div className="page-top-nav">
            <div className="row justify-content-end align-items-center">
              <div className="col-12 col-md-1">
                <div className="header-btn-left">
                  <button  className="btn btn-primary btn-bordered back">
                    <Link to="/readers-view">Back</Link>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-9">

              </div>
              <div className="col-12 col-md-2">
                <div className="header-btn">
                  <button className="btn btn-primary btn-filled next">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Row>
         <Row>
            <div className='create-reader'>
                <h4>Create Reader</h4>
                <h6>Use this side for adding a new contact.</h6>
                <Form className='d-flex flex-wrap row'>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        name="first-name"
                        type="text"
                        placeholder="First name*"
                      />
                    </Form.Group>
                    {/* <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Middle name</Form.Label>
                      <Form.Control
                        name="middle-name"
                        type="text"
                        placeholder="Middle name"
                      />
                    </Form.Group> */}
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        name="last-name"
                        type="text"
                        placeholder="Last name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Country</Form.Label>
                      <DropdownButton className="dropdown-basic-button split-button-dropup" title="country">
                        <Dropdown.Item>Select</Dropdown.Item>
                        <Dropdown.Item>Australia</Dropdown.Item>
                        <Dropdown.Item>India</Dropdown.Item>
                        <Dropdown.Item>United Kingdom</Dropdown.Item>
                        <Dropdown.Item>United States</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>

                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Hospital</Form.Label>
                      <Form.Control
                        name="hospital"
                        type="text"
                        placeholder="Hospital"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        type="text"
                        placeholder="Title"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Speciality</Form.Label>
                      <DropdownButton className="dropdown-basic-button split-button-dropup" title="Select Speciality">
                        <Dropdown.Item>HCP</Dropdown.Item>
                        <Dropdown.Item>Staff</Dropdown.Item>
                        <Dropdown.Item>Test Users</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Discipline</Form.Label>
                      <DropdownButton className="dropdown-basic-button split-button-dropup" title="Choose Discipline">
                        <Dropdown.Item>HCP</Dropdown.Item>
                        <Dropdown.Item>Staff</Dropdown.Item>
                        <Dropdown.Item>Test Users</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Province</Form.Label>
                      <DropdownButton className="dropdown-basic-button split-button-dropup" title="Choose Province">
                        <Dropdown.Item>HCP</Dropdown.Item>
                        <Dropdown.Item>Staff</Dropdown.Item>
                        <Dropdown.Item>Test Users</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>
                    
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>IBU</Form.Label>
                      <DropdownButton className="dropdown-basic-button split-button-dropup" title="Select">
                        <Dropdown.Item>Critical Care</Dropdown.Item>
                        <Dropdown.Item>Haematology</Dropdown.Item>
                        <Dropdown.Item>Immunotherapy</Dropdown.Item>
                      </DropdownButton>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Primary e-mail*</Form.Label>
                      <Form.Control
                        name="primary-email"
                        type="email"
                        placeholder="Primary e-mail"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Alternative e-mail</Form.Label>
                      <Form.Control
                        name="alternative-email"
                        type="email"
                        placeholder="Alternative e-mail"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Primary phone</Form.Label>
                      <Form.Control
                        name="phone"
                        type="text"
                        placeholder="Primary phone"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Alternative phone</Form.Label>
                      <Form.Control
                        name="aalternative-phone"
                        type="text"
                        placeholder="Alternative phone"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Rep Contact</Form.Label>
                      <Form.Control
                        name="rep-contact"
                        type="text"
                        placeholder="Who is Rep contact?"
                      />
                    </Form.Group>

                    <Form.Group  className="mb-3 col-6 form-group" as={Col} controlId="my_product_field">
                      <Form.Label>Products</Form.Label>
                      <div className='form-product-list'>
                        <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                            <option value="Products 1">Products 1</option>
                            <option value="Products 2">Products 2</option>
                            <option value="Products 3">Products 3</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                    <Form.Group  className="mb-3 col-6 form-group" as={Col} controlId="my_indication_field">
                      <Form.Label>Interest area</Form.Label>
                      <div className='form-interest-area'>
                        <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                            <option value="Anaesthesia &amp; Intensive care">Anaesthesia &amp; Intensive care</option>
                            <option value="CIDP and MMN">CIDP and MMN</option>
                            <option value="Cardiac surgery">Cardiac surgery</option>
                            <option value="GBS">GBS</option>
                            <option value="General Haematology">General Haematology</option>
                            <option value="Haematological malignancies">Haematological malignancies</option>
                            <option value="Haemophilia and VWD">Haemophilia and VWD</option>
                            <option value="Immunology">Immunology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Transplantation">Transplantation</option>
                            <option value="Trauma">Trauma</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Notes</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Meeting notes, special interests etc" />
                    </Form.Group>
                    
                </Form>
            </div>
        </Row>
      
      </div>
       
    </Col>
  )
}

export default ReaderReview;
