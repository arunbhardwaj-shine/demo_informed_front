import React, { useState } from 'react'
import { Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom';

const ReaderEdit = () => {
  const [field, setField] = useState([]);
  return (
    <>
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button  className="btn btn-primary btn-bordered back"><Link to="/readers-view">Back</Link></button>
              </div>
            </div>
            <div className="col-12 col-md-9">

            </div>
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-filled save">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        </Row>
        <Row>
            <div className='single-reader create-reader'>
                <h4>Change what is needed. To add a note click the plus sign. When finished tab the blue save button to the right.</h4>
                <h6>Contact details</h6>
                <Form className='d-flex flex-wrap row'>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>First name*</Form.Label>
                      <Form.Control
                        name="first-name"
                        type="text"
                        placeholder="First name*"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Last name*</Form.Label>
                      <Form.Control
                        name="last-name"
                        type="text"
                        placeholder="Last name"
                      />
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
                      <Form.Label>Primary e-mail*</Form.Label>
                      <Form.Control
                        name="primary-email"
                        type="email"
                        placeholder="test1290@mailinator.com"
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
                      <Form.Label>Country*</Form.Label>
                      <DropdownButton className="dropdown-basic-button split-button-dropup" title="country">
                        <Dropdown.Item>Select</Dropdown.Item>
                        <Dropdown.Item>United States</Dropdown.Item>
                        <Dropdown.Item>United Kingdom</Dropdown.Item>
                      </DropdownButton>
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
                    
                    <Form.Group  className="mb-3 col-6 form-group" as={Col} controlId="my_product_field">
                      <Form.Label>Products</Form.Label>
                      <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                        <option value="field1">Field 1</option>
                        <option value="field2">Field 2</option>
                        <option value="field3">Field 3</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group  className="mb-3 col-6 form-group" as={Col} controlId="my_indication_field">
                      <Form.Label>Indication area</Form.Label>
                      <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
                        <option value="field1">Field 1</option>
                        <option value="field2">Field 2</option>
                        <option value="field3">Field 3</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3 col-12 form-title">
                      <Form.Label>Internal Details</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3 col-6 form-group">
                      <Form.Label>Rep contact</Form.Label>
                      <Form.Control name="rep-contact" type="text" placeholder="Who is Rep contact?"/>
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
    </>
  )
}

export default ReaderEdit;