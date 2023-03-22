import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Select from "react-select";
import CommonModel from "../../../Model/CommonModel";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import { useNavigate } from "react-router-dom";

const ReaderAdd = () => {
  const [commonShow, setCommonShow] = useState(false);
  const navigate = useNavigate();

  const [countryAll, setCountryAll] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
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
  const [userInputs, setAddReaderInputs] = useState({});
  const [error, setError] = useState({});
  const [commonHeader, setCommonHeader] = useState("");
  const [data, setData] = useState([]);

  const [newProduct, setNewProduct] = useState({
    label: "",
    value: "",
  });
  const [userDetail, setUserDetail] = useState({
    speciality: [
      { value: "speciality1", label: "speciality1" },
      { value: "speciality2", label: "speciality2" },
      { value: "speciality3", label: "speciality3" },
    ],
    discipline: [
      { value: "dicipline1", label: "dicipline1" },
      { value: "dicipline2", label: "dicipline2" },
      { value: "dicipline3", label: "dicipline3" },
    ],
    product: [
      { value: "production1", label: "production1" },
      { value: "production2", label: "production2" },
      { value: "production3", label: "production3" },
    ],
  });

  const handleModelFun = (e) => {
    setNewProduct({ label: e?.target?.name, value: e?.target?.value });
  };

  const handleSubmitModelFun = (e) => {
    if (newProduct?.value?.length) {
      const newArr = userDetail[newProduct?.label];

      newArr.push({
        value: newProduct?.value,
        label: newProduct?.value,
      });

      setUserDetail({ ...userDetail, [newProduct?.label]: newArr });
    }
  };

  const addNewProductClicked = (statusMsg, e) => {
    e.preventDefault();
    setCommonShow(true);
    if (statusMsg == "speciality") {
      setNewProduct("");
      setData(() => [
        {
          name: "speciality",
          label: "Speciality",
          type: "input",
          placeholder: "Type your speciality",
        },
      ]);
      setCommonHeader("Add New Speciality");
    }
    if (statusMsg == "discipline") {
      setNewProduct("");
      setData(() => [
        {
          name: "discipline",
          label: "Discipline",
          type: "input",
          placeholder: "Type your discipline",
        },
      ]);

      setCommonHeader("Add New Discipline");
    }
    if (statusMsg == "product") {
      setNewProduct("");
      setData(() => [
        {
          name: "product",
          label: "Product",
          type: "input",
          placeholder: "Type your product",
        },
      ]);

      setCommonHeader("Add New Product");
    }
  };

  // const addSpecialityClicked = () => {
  //   setCommonShow(false);
  //   if (newProduct != "") {
  //     console.log("Speciality Clicked");
  //     setSpecialityAll((oldArray) => [
  //       ...oldArray,
  //       { value: newProduct, label: newProduct },
  //     ]);
  //   }
  // };

  // const addDisciplineClicked = () => {
  //   setCommonShow(false);
  //   if (newProduct != "") {
  //     console.log("dicipline clicked");
  //     setDisciplineAll((oldArray) => [
  //       ...oldArray,
  //       { value: newProduct, label: newProduct },
  //     ]);
  //   }
  // };

  // const addProductClicked = () => {
  //   setCommonShow(false);
  //   if (newProduct != "") {
  //     console.log("ProductClicked");
  //     setProductionAll((oldArray) => [
  //       ...oldArray,
  //       { value: newProduct, label: newProduct },
  //     ]);
  //   }
  // };

  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }

    setAddReaderInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };

  const nextButtonClicked = async (e) => {
    e.preventDefault();

    const result = AddReaderValidation(userInputs);
    if (Object.keys(result)?.length) {
      setError(result);
      return;
    } else {
      try {
        loader("show");
        let data = {
          createdBy: 18207,
          firstName: userInputs?.firstName,
          middleName: userInputs?.middleName,
          lastName: userInputs?.lastName,
          email: userInputs?.email,
          alternativeEmail: userInputs?.alternativeEmail,
          countryCode: userInputs?.countryCode,
          primary_phone: userInputs?.phoneNumber,
          alternativePhone: userInputs?.alternativePhone,
          country: userInputs?.country,
          province: userInputs?.province,
          hospital: userInputs?.hospital,
          title: userInputs?.title,
          speciality: userInputs?.speciality,
          discipline: userInputs?.discipline,
          product: userInputs?.product,
          interestArea: userInputs?.interestArea,
          repContact: userInputs?.repContact,
          notes: userInputs?.notes,
        };
        console.log("data", data);
        await postData(ENDPOINT.READER_CREATE, data);
        loader("hide");
        navigate("/readers-view");
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/readers-view">Back</Link>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create CRM</a>
                    </li>
                    <li className="">
                      <a href="">Review &amp; approve</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button className="btn btn-primary btn-bordered move-draft">
                      Cancel
                    </button>

                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-reader create-change-content">
              <div className="form_action">
                <div className="create-reader-form-header">
                  <h4>Please fill the following details</h4>
                  <Button className="btn-bordered" type="file">
                    Upload Excel File
                  </Button>
                </div>
                <div className="row">
                  <div className="col-12 col-md-7">
                    <div className="form-group">
                      <label htmlFor="">First name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.firstName ? (
                        <div className="login-validation">
                          {error?.firstName}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Middle name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="middleName"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Primary email *</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                        name="email"
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.email ? (
                        <div className="login-validation">{error?.email}</div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="">Alternative email </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                        name="alternativeEmail"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group primary_phone">
                      <label htmlFor="">Primary phone *</label>
                      <Select
                        options={countryCode}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        placeholder=""
                        onChange={(e) => handleChange(e?.value, "countryCode")}
                      />
                      {error?.countryCode ? (
                        <div className="login-validation">
                          {error?.countryCode}
                        </div>
                      ) : (
                        ""
                      )}
                      <input
                        type="number"
                        className="form-control"
                        name="phoneNumber"
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.phoneNumber ? (
                        <div className="login-validation">
                          {error?.phoneNumber}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Alternative phone</label>
                      <input
                        type="number"
                        className="form-control"
                        name="alternativePhone"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Country *</label>
                      <Select
                        options={countryAll}
                        placeholder="Select country"
                        name="country"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "country")}
                      />
                      {error?.phoneNumber ? (
                        <div className="login-validation">{error?.country}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Province</label>
                      <Select
                        options={countryAll}
                        placeholder="Select province"
                        // name="provience"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "province")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Hospital</label>
                      <Select
                        options={countryAll}
                        placeholder="Select hospital"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "hospital")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Speciality</label>
                      <Select
                        options={userDetail?.speciality}
                        placeholder="Select speciality"
                        // name="speciality"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "speciality")}
                      />
                      <div className="add_product">
                        <span>&nbsp;</span>
                        <Button
                          className="btn-bordered btn-voilet"
                          onClick={(e) => addNewProductClicked("speciality", e)}
                        >
                          Add new Speciality +
                        </Button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Discipline</label>
                      <Select
                        options={userDetail?.discipline}
                        placeholder="Select discipline"
                        // name="discipline"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "discipline")}
                      />
                      <div className="add_product">
                        <span>&nbsp;</span>
                        <Button
                          onClick={(e) => addNewProductClicked("discipline", e)}
                          className="btn-bordered btn-voilet"
                        >
                          Add new Discipline +
                        </Button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Product</label>
                      <Select
                        options={userDetail?.product}
                        placeholder="Select product"
                        // name="product"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "product")}
                      />
                      <div className="add_product">
                        <span>&nbsp;</span>
                        <Button
                          className="btn-bordered btn-voilet"
                          onClick={(e) => addNewProductClicked("product", e)}
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
                        // name="interestArea"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "interestArea")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Rep contact</label>
                      <input
                        type="text"
                        name="repContact"
                        placeholder="Who is Rep contact?"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-5 d-flex justify-content-end align-items-start right-change">
                    <div className="form-group justify-content-end">
                      <label htmlFor="">Notes</label>
                      <textarea
                        className="form-control"
                        name="notes"
                        id="formControlTextarea"
                        rows="5"
                        placeholder="Meeting note, special interest etc..."
                        onChange={(e) => handleChange(e)}
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
          </Row>
        </div>
        <CommonModel
          show={commonShow}
          onClose={setCommonShow}
          heading={commonHeader}
          handleChange={handleModelFun}
          handleSubmit={handleSubmitModelFun}
          data={data}
          footerButton={"Add"}
        />
        {/* <Modal
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
        </Modal> */}
      </Col>
    </>
  );
};

export default ReaderAdd;
