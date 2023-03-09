import React, { useState } from "react";
import {
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const ReaderAdd = () => {
  const [field, setField] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-2">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/readers-view">Back</Link>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-6"></div>
                <div className="col-12 col-md-4">
                  <div className="header-btn">
                    <button
                      onClick={handleShow}
                      className="btn btn-primary btn-bordered upload"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="96"
                        height="96"
                        viewBox="0 0 96 96"
                        fill="none"
                      >
                        <path
                          d="M88 63C86.9391 63 85.9217 63.4214 85.1716 64.1716C84.4214 64.9217 84 65.9391 84 67V72.852C83.9968 75.8076 82.8213 78.6413 80.7313 80.7313C78.6413 82.8213 75.8077 83.9968 72.852 84H23.148C20.1923 83.9968 17.3586 82.8213 15.2687 80.7313C13.1787 78.6413 12.0032 75.8076 12 72.852V67C12 65.9391 11.5786 64.9217 10.8284 64.1716C10.0783 63.4214 9.06087 63 8 63C6.93913 63 5.92172 63.4214 5.17157 64.1716C4.42143 64.9217 4 65.9391 4 67V72.852C4.00529 77.9287 6.02437 82.796 9.61417 86.3858C13.204 89.9756 18.0713 91.9947 23.148 92H72.852C77.9287 91.9947 82.796 89.9756 86.3858 86.3858C89.9756 82.796 91.9947 77.9287 92 72.852V67C92 65.9391 91.5786 64.9217 90.8284 64.1716C90.0783 63.4214 89.0609 63 88 63Z"
                          fill="#0066BE"
                        />
                        <path
                          d="M70.7788 31.3305C70.0287 32.0803 69.0115 32.5016 67.9508 32.5016C66.8902 32.5016 65.8729 32.0803 65.1228 31.3305L51.9508 18.1585L52 67.0012C52 68.0621 51.5786 69.0795 50.8284 69.8296C50.0783 70.5798 49.0609 71.0012 48 71.0012C46.9391 71.0012 45.9217 70.5798 45.1716 69.8296C44.4214 69.0795 44 68.0621 44 67.0012L43.9508 18.1585L30.7788 31.3305C30.0244 32.0591 29.014 32.4623 27.9652 32.4532C26.9165 32.444 25.9132 32.0234 25.1716 31.2817C24.4299 30.5401 24.0093 29.5369 24.0002 28.4881C23.991 27.4393 24.3942 26.4289 25.1228 25.6745L45.1228 5.67447C45.4944 5.30196 45.9358 5.00642 46.4218 4.80477C46.9077 4.60312 47.4287 4.49932 47.9548 4.49932C48.481 4.49932 49.002 4.60312 49.4879 4.80477C49.9739 5.00642 50.4153 5.30196 50.7868 5.67447L70.7868 25.6745C71.5357 26.4256 71.9555 27.4435 71.954 28.5041C71.9525 29.5648 71.5298 30.5814 70.7788 31.3305Z"
                          fill="#0066BE"
                        />
                      </svg>{" "}
                      Upload
                    </button>
                    <button className="btn btn-primary btn-filled next">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div className="create-reader">
              <h4>Create Reader</h4>
              <h6>Use this side for adding a new contact.</h6>
              <Form className="d-flex flex-wrap row">
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
              </Form>
            </div>
          </Row>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          className="send-confirm"
          id="upload-confirm"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Upload File</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Use this side for adding multiple contacts via an excel sheet.{" "}
              <br />
              <a
                href="https:informed.pro/Readers/download"
                id="download_excel_id"
                title="Please download the sample Excel file, follow the same format and save it in your pc, then upload file."
                download=""
              >
                Download the sample Excel file
              </a>
            </p>
            <div className="upload-file-box">
              <div className="box">
                <input
                  type="file"
                  name="file"
                  id="upload-file"
                  className="inputfile inputfile-5"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  data-multiple-caption="{count} files selected"
                />
                <>
                  <label htmlFor="upload-file">
                    <span>Choose Your File</span>
                  </label>
                  <p>Upload your new list file</p>
                </>
              </div>
            </div>
            <h4>Please upload max 300 readers at once.</h4>
            <div className="modal-buttons">
              {" "}
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-primary btn-bordered light"
                data-bs-dismiss="modal"
              >
                Upload
              </button>
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
        </Modal>
      </Col>
    </>
  );
};

export default ReaderAdd;
