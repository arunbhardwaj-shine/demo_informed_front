import React, { useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom';
import Select from "react-select";

const ReaderEdit = () => {
  const [newProduct, setNewProduct] = useState("");
  const [show, setShow] = useState(false);
   const [countryAll, setCountryAll] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
  ]);
    const [salesAll, setSalesAll] = useState([
    { value: "sales1", label: "sales1" },
    { value: "sales2", label: "sales2" },
    { value: "sales3", label: "sales3" },
  ]);
    const [productionAll, setProductionAll] = useState([
    { value: "production1", label: "production1" },
    { value: "production2", label: "production2" },
    { value: "production3", label: "production3" },
  ]);
  const [countryCode, setCountryCode] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ]);
  const addNewProductClicked = (e) => {
    e.preventDefault();
    setNewProduct("");
    setShow(true);
  };
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
                <Link className="btn btn-primary btn-bordered back" to="/readers-view">Back</Link>
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
          <div className="create-reader create-change-content">
              <div className="form_action">
                <div className="create-reader-form-header">
                  <h4>Please fill the following details</h4>
                  <Button className="btn-bordered" type="file">Upload Excel File</Button>
                </div>
                <div className="row">
                  <div className="col-12 col-md-7">
                    <div className="form-group">
                      <label htmlFor="">First name *</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Middle name</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Primary email *</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="">Alternative email </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div className="form-group primary_phone">
                      <label htmlFor="">Primary phone *</label>
                      <Select
                        options={countryCode}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        placeholder=""
                      />
                      <input
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Alternative phone</label>
                      <input
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Country *</label>
                      <Select
                        options={countryAll}
                        placeholder="Select country"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                      {/* {error?.country ? (
                        <div className="login-validation">{error?.country}</div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Province</label>
                      <Select
                        options={countryAll}
                        placeholder="Select province"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Hospital</label>
                      <Select
                        options={countryAll}
                        placeholder="Select hospital"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Title</label>
                      <input
                        type="text"
                        className="form-control"
                      />
                      {/* {error?.clientProduct ? (
                        <div className="login-validation">
                          {error?.clientProduct}
                        </div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Speciality</label>
                        <Select
                          options={countryAll}
                          placeholder="Select speciality"
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                        <div className="add_product">
                          <span>&nbsp;</span>
                          <Button
                            className="btn-bordered btn-voilet"
                          >
                            Add new Speciality +
                          </Button>
                        </div>
                      </div>
                    <div className="form-group">
                        <label htmlFor="">Discipline</label>
                        <Select
                          options={productionAll}
                          placeholder="Select discipline"
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                        <div className="add_product">
                          <span>&nbsp;</span>
                          <Button  onClick={addNewProductClicked}
                            className="btn-bordered btn-voilet"
                          >
                            Add new Discipline +
                          </Button>
                        </div>
                      </div>
                     <div className="form-group">
                        <label htmlFor="">Product</label>
                        <Select
                          options={productionAll}
                          placeholder="Select product"
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                        />
                        <div className="add_product">
                          <span>&nbsp;</span>
                          <Button
                            className="btn-bordered btn-voilet"
                          >
                            Add new product +
                          </Button>
                        </div>
                      </div>
                    <div className="form-group">
                      <label htmlFor="">Interest area</label>
                      <Select
                        options={productionAll}
                        placeholder="Select interest area"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Rep contact</label>
                      <input
                        type="text" placeholder="Who is Rep contact?"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-5 d-flex justify-content-end align-items-start right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">Notes</label>
                      <textarea
                        className="form-control"
                        id="formControlTextarea"
                        rows="5"
                        placeholder="Meeting note, special interest etc..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              {/* <Form className="d-flex flex-wrap row">
                <Form.Group className="mb-3 col-6 form-group">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    name="first-name"
                    type="text"
                    placeholder="First name*"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-6 form-group">
                  <Form.Label>Middle name</Form.Label>
                  <Form.Control
                    name="middle-name"
                    type="text"
                    placeholder="Middle name"
                  />
                </Form.Group>
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
                  <DropdownButton
                    className="dropdown-basic-button split-button-dropup"
                    title="country"
                  >
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
                  <Form.Control name="title" type="text" placeholder="Title" />
                </Form.Group>
                <Form.Group className="mb-3 col-6 form-group">
                  <Form.Label>Speciality</Form.Label>
                  <DropdownButton
                    className="dropdown-basic-button split-button-dropup"
                    title="Select Speciality"
                  >
                    <Dropdown.Item>HCP</Dropdown.Item>
                    <Dropdown.Item>Staff</Dropdown.Item>
                    <Dropdown.Item>Test Users</Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
                <Form.Group className="mb-3 col-6 form-group">
                  <Form.Label>Discipline</Form.Label>
                  <DropdownButton
                    className="dropdown-basic-button split-button-dropup"
                    title="Choose Discipline"
                  >
                    <Dropdown.Item>HCP</Dropdown.Item>
                    <Dropdown.Item>Staff</Dropdown.Item>
                    <Dropdown.Item>Test Users</Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
                <Form.Group className="mb-3 col-6 form-group">
                  <Form.Label>Province</Form.Label>
                  <DropdownButton
                    className="dropdown-basic-button split-button-dropup"
                    title="Choose Province"
                  >
                    <Dropdown.Item>HCP</Dropdown.Item>
                    <Dropdown.Item>Staff</Dropdown.Item>
                    <Dropdown.Item>Test Users</Dropdown.Item>
                  </DropdownButton>
                </Form.Group>
                <Form.Group className="mb-3 col-6 form-group">
                  <Form.Label>Rep Contact</Form.Label>
                  <Form.Control
                    name="rep-contact"
                    type="text"
                    placeholder="Who is Rep contact?"
                  />
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

                <Form.Group
                  className="mb-3 col-6 form-group"
                  as={Col}
                  controlId="my_product_field"
                >
                  <Form.Label>Products</Form.Label>
                  <div className="form-product-list">
                    <Form.Control
                      as="select"
                      multiple
                      value={field}
                      onChange={(e) =>
                        setField(
                          [].slice
                            .call(e.target.selectedOptions)
                            .map((item) => item.value)
                        )
                      }
                    >
                      <option value="Products 1">Products 1</option>
                      <option value="Products 2">Products 2</option>
                      <option value="Products 3">Products 3</option>
                    </Form.Control>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3 col-6 form-group"
                  as={Col}
                  controlId="my_indication_field"
                >
                  <Form.Label>Interest area</Form.Label>
                  <div className="form-interest-area">
                    <Form.Control
                      as="select"
                      multiple
                      value={field}
                      onChange={(e) =>
                        setField(
                          [].slice
                            .call(e.target.selectedOptions)
                            .map((item) => item.value)
                        )
                      }
                    >
                      <option value="Anaesthesia &amp; Intensive care">
                        Anaesthesia &amp; Intensive care
                      </option>
                      <option value="CIDP and MMN">CIDP and MMN</option>
                      <option value="Cardiac surgery">Cardiac surgery</option>
                      <option value="GBS">GBS</option>
                      <option value="General Haematology">
                        General Haematology
                      </option>
                      <option value="Haematological malignancies">
                        Haematological malignancies
                      </option>
                      <option value="Haemophilia and VWD">
                        Haemophilia and VWD
                      </option>
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
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Meeting notes, special interests etc"
                  />
                </Form.Group>
              </Form> */}
              </div>
            </div>
            {/* <div className='single-reader create-reader'>
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
            </div> */}
        </Row>
      </div>
    </Col>
    </>
  )
}

export default ReaderEdit;