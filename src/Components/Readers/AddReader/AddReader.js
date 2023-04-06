import React, { useState, useEffect } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Select from "react-select";
import CommonModel from "../../../Model/CommonModel";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { getData, postData, postFormData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import { useNavigate } from "react-router-dom";

const ReaderAdd = () => {
  const [commonShow, setCommonShow] = useState(false);
  const navigate = useNavigate();
  const [groupId, setGroupId] = useState();
  const [flag, setFlag] = useState();

  const [countryAll, setCountryAll] = useState([]);
  const [province, setProvince] = useState([]);

  const [productionAll, setProductionAll] = useState([
    { value: "production1", label: "production1222" },
    { value: "production2", label: "production2" },
    { value: "production3", label: "production3" },
  ]);
  const [hospital, setHospital] = useState([]);
  const [countryCode, setCountryCode] = useState([
    { value: "Afghanistan", label: "+93" },

    { value: "Albania", label: "+355" },

    { value: "Algeria", label: "+213" },

    { value: "American Samoa", label: "+1-684" },

    { value: "Andorra", label: "+376" },

    { value: "Angola", label: "+244" },

    { value: "Anguilla", label: "+1-264" },

    { value: "Antarctica", label: "+672" },

    { value: "Antigua and Barbuda", label: "+1-268" },

    { value: "Argentina", label: "+54" },

    { value: "Armenia", label: "+374" },

    { value: "India", label: "+91" },

    { value: "Azerbaijan", label: "+994" },

    { value: "Bahamas", label: "+1-242" },

    { value: "Bahrain", label: "+973" },

    { value: "Bangladesh", label: "+880" },

    { value: "Barbados", label: "+1-246" },

    { value: "Belarus", label: "+375" },

    { value: "Belgium", label: "+32" },
  ]);
  const [id, setId] = useState(localStorage.getItem("user_id"));

  const [error, setError] = useState({});
  const [commonHeader, setCommonHeader] = useState("");
  const [data, setData] = useState([]);

  const [newProduct, setNewProduct] = useState({
    label: "",
    value: "",
  });

  const [userInputs, setAddReaderInputs] = useState({
    alternativeEmail: "",

    alternativePhone: "",
    blind_type: "",
    country: "",
    createdBy: "",
    discipline: "",
    email: "",
    firstName: "",
    hospital: "",
    interestArea: "",
    irt: "",
    lastName: "",
    middleName: "",
    notes: "",
    primary_phone: "",
    product: "",
    province: "",
    repContact: "",
    role: "",
    siteName: "",
    siteNumber: "",
    speciality: "",
    sub_role: "",
    title: "",
  });
  const [userDetail, setUserDetail] = useState({
    speciality: [],
    discipline: [],
    product: [],
    ibu: [],
    irt: [],
    userType: [],
    blind_type: [],
  });
  const [uploadShow, setUploadShow] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(0);

  const handleModelFun = (e) => {
    setNewProduct({ label: e?.target?.name, value: e?.target?.value });
  };

  const handleShow = () => {
    setUploadShow(true);
  };

  const handleClose = () => {
    setUploadShow(false);
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
  const initalFun = async () => {
    loader("show");
    const hasData = await getData(`${ENDPOINT.READER_USER_DROP}`);

    let country = [];
    hasData?.data?.data?.country.reduce((objEntries, key) => {
      country.push({
        label: key,
        value: key,
      });
    });
    setCountryAll(country);
    setProvince(hasData?.data?.data?.province);
    setHospital(hasData?.data?.data?.hospital);
    setGroupId(hasData?.data?.data?.user?.[0]?.group_id);
    setFlag(hasData?.data?.data?.user?.[0]?.flag);

    setUserDetail({
      ...userDetail,
      discipline: hasData?.data?.data?.discipline,
      speciality: hasData?.data?.data?.speciality,
      product: hasData?.data?.data?.product,
      role: hasData?.data?.data?.role,
      sub_role: hasData?.data?.data?.sub_role,
      blind_type: hasData?.data?.data?.blind_type,
      siteName: hasData?.data?.data?.siteName,
      siteNumber: hasData?.data?.data?.siteNumber,
      irt: hasData?.data?.data?.irt,
    });
    loader("hide");
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
          placeholder: "Type your product name",
        },
      ]);

      setCommonHeader("Add New Product");
    }
  };

  useEffect(() => {
    initalFun();
  }, []);

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
    setUpdateFlag(1);
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

  const handleFileUpload = async (e) => {
    loader("show");
    try {
      let formData = new FormData();
      formData.append("file", userInputs?.uploadFile?.[0]);
      formData.append("createdBy", localStorage.getItem("user_id"));
      await postFormData(ENDPOINT.UPLOAD_READER_FILE, formData, {
        header: { "Content-Type": "multipart/form-data" },
      });
      // navigate("/readers-view");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
    handleClose();
    setUpdateFlag(0);

    loader("hide");
  };

  const nextButtonClicked = async (e) => {
    e.preventDefault();

    const result = AddReaderValidation(userInputs, groupId);

    if (Object.keys(result)?.length) {
      setError(result);
      return;
    } else {
      try {
        loader("show");
        let data = {
          createdBy: localStorage.getItem("user_id"),
          firstName: userInputs?.firstName,
          middleName: userInputs?.middleName,
          lastName: userInputs?.lastName,
          email: userInputs?.email,
          alternativeEmail: userInputs?.alternativeEmail,
          // countryCode: userInputs?.countryCode,
          primary_phone: (userInputs?.countryCode?.label).concat(
            "-",
            userInputs?.primary_phone
          ),
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
          siteNumber: userInputs?.siteNumber,
          blind_type: userInputs?.blind_type,
          siteName: userInputs?.siteName,
          irt: userInputs?.irt,
          role: userInputs?.role,
          sub_role: userInputs?.sub_role,
        };
        console.log("data", data);
        await postData(ENDPOINT.READER_CREATE, data);
        loader("hide");

        navigate("/reader-review", {
          state: {
            data: data,
          },
        });
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  const RDAccount = () => {
    return (
      <>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">Role </Form.Label>
          <Select
            options={userDetail?.role}
            placeholder="Select Role"
            name="role"
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "role")}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">Sub Role </Form.Label>
          <Select
            options={userDetail?.sub_role}
            placeholder="Select Sub Role"
            name="sub_role"
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "sub_role")}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">Blind Type </Form.Label>
          <Select
            options={userDetail?.blind_type}
            placeholder="Select Blind Type"
            name="blind_type"
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "blind_type")}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">IRT </Form.Label>
          <Select
            options={userDetail?.irt}
            placeholder="Select IRT"
            name="irt"
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "irt")}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">Site Number </Form.Label>
          <Select
            options={userDetail?.siteNumber}
            placeholder="Select Site Number"
            name="siteNumber"
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "siteNumber")}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">Site Name </Form.Label>
          <Select
            options={userDetail?.siteName}
            placeholder="Select Site Name "
            name="siteName"
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "siteName")}
          />
        </Form.Group>
      </>
    );
  };
  return (
    <>
      <Col className="col right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <Col md="1">
                  <div className="header-btn-left">
                    <Link
                      className="btn btn-primary btn-bordered back-btn"
                      to="/readers-view"
                    >
                      <svg
                        width="14"
                        height="24"
                        viewBox="0 0 14 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                          fill="#97B6CF"
                        />
                      </svg>
                    </Link>
                    {/* <button className="btn btn-primary btn-bordered back">
                      <Link to="/readers-view">Back</Link>
                    </button> */}
                  </div>
                </Col>
                {/* <div className="col-12 col-md-1">
                  
                </div> */}
                <Col md="9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create CRM</a>
                    </li>
                    <li className="">
                      <a href="">Review &amp; approve</a>
                    </li>
                  </ul>
                </Col>
                <Col md="2">
                  <div className="header-btn">
                    {/* <Link
                    className="btn btn-primary btn-bordered move-draft"
                    to="/readers-view"
                    >
                      Cancel
                    </Link> */}

                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </Col>
              </div>
            </div>
            <div className="create-reader create-change-content reader_added">
              <div className="form_action">
                <div className="create-reader-form-header">
                  <h4>Please fill the following details</h4>
                  {/* <input
                    type="file"
                    name="file-6[]"
                    id="file-6" */}
                  {/* // className="inputfile inputfile-6" //
                  accept="application/pdf" */}
                  {/* onChange={handleFileUpload}
                  /> */}

                  {!(groupId == 3 && flag == 2) ? (
                    <Button
                      className="btn-bordered"
                      type="file"
                      onClick={handleShow}
                    >
                      Upload Excel File
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <Col md="7">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">First name *</Form.Label>
                      <input
                        type="text"
                        placeholder="First name"
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
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">Middle name</Form.Label>
                      <input
                        type="text"
                        placeholder="Middle name"
                        className="form-control"
                        name="middleName"
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">Last name</Form.Label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="form-control"
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                      />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">Primary email *</Form.Label>
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
                    </Form.Group>
                    {groupId == 2 ||
                    (groupId == 3 && flag == 0) ||
                    (groupId == 3 && flag == 2) ? (
                      <>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Alternative email </Form.Label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="example@email.com"
                            name="alternativeEmail"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                        <Form.Group className="form-group primary_phone">
                          <Form.Label htmlFor="">Primary phone *</Form.Label>
                          <Select
                            options={countryCode}
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            placeholder=""
                            onChange={(e) => handleChange(e, "countryCode")}
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
                            name="primary_phone"
                            onChange={(e) => handleChange(e)}
                          />
                          {error?.primary_phone ? (
                            <div className="login-validation">
                              {error?.primary_phone}
                            </div>
                          ) : (
                            ""
                          )}
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Alternative phone</Form.Label>
                          <input
                            type="number"
                            className="form-control"
                            name="alternativePhone"
                            placeholder="Alternative phone"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                      </>
                    ) : (
                      ""
                    )}

                    {groupId == 3 && flag == 1 ? RDAccount() : ""}

                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">Country *</Form.Label>
                      <Select
                        options={countryAll}
                        placeholder="Select country"
                        name="country"
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "country")}
                      />
                      {error?.country ? (
                        <div className="login-validation">{error?.country}</div>
                      ) : (
                        ""
                      )}
                    </Form.Group>

                    {groupId == 2 || (groupId == 3 && flag == 0) ? (
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="">Province</Form.Label>
                        <Select
                          options={province}
                          placeholder="Select province"
                          name="province"
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                          onChange={(e) => handleChange(e?.value, "province")}
                        />
                      </Form.Group>
                    ) : (
                      ""
                    )}

                    {groupId == 2 ||
                    (groupId == 3 && flag == 0) ||
                    (groupId == 3 && flag == 2) ? (
                      <>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Hospital</Form.Label>
                          <Select
                            options={hospital}
                            placeholder="Select hospital"
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            onChange={(e) => handleChange(e?.value, "hospital")}
                          />
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Title</Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>

                        <Form.Group className="form-group margin-added">
                          <Form.Label htmlFor="">Speciality</Form.Label>
                          <Select
                            options={userDetail?.speciality}
                            placeholder="Select speciality"
                            name="speciality"
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            onChange={(e) =>
                              handleChange(e?.value, "speciality")
                            }
                          />
                          <div className="add_product">
                            <span>&nbsp;</span>
                            <Button
                              className="btn-bordered btn-voilet"
                              onClick={(e) =>
                                addNewProductClicked("speciality", e)
                              }
                            >
                              Add new Speciality +
                            </Button>
                          </div>
                        </Form.Group>

                        {groupId == 2 || (groupId == 3 && flag == 0) ? (
                          <>
                            <Form.Group className="form-group margin-added">
                              <Form.Label htmlFor="">Discipline</Form.Label>
                              <Select
                                options={userDetail?.discipline}
                                placeholder="Select discipline"
                                name="discipline"
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                                onChange={(e) =>
                                  handleChange(e?.value, "discipline")
                                }
                              />
                              <div className="add_product">
                                <span>&nbsp;</span>
                                <Button
                                  onClick={(e) =>
                                    addNewProductClicked("discipline", e)
                                  }
                                  className="btn-bordered btn-voilet"
                                >
                                  Add new Discipline +
                                </Button>
                              </div>
                            </Form.Group>
                          </>
                        ) : (
                          <>
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="">Bussiness Unit</Form.Label>
                              <Select
                                options={userDetail?.ibu}
                                placeholder="Select Bussiness Unit"
                                name="ibu"
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                                onChange={(e) => handleChange(e?.value, "ibu")}
                              />
                            </Form.Group>
                          </>
                        )}

                        <Form.Group className="form-group margin-added">
                          <Form.Label htmlFor="">Product</Form.Label>
                          <Select
                            options={userDetail?.product}
                            placeholder="Select product"
                            name="product"
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            onChange={(e) => handleChange(e?.value, "product")}
                          />
                          <div className="add_product">
                            <span>&nbsp;</span>
                            <Button
                              className="btn-bordered btn-voilet"
                              onClick={(e) =>
                                addNewProductClicked("product", e)
                              }
                            >
                              Add new Product +
                            </Button>
                          </div>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Interest area</Form.Label>
                          <Select
                            options={productionAll}
                            placeholder="Select interest area"
                            name="interestArea"
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            onChange={(e) =>
                              handleChange(e?.value, "interestArea")
                            }
                          />
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Rep contact</Form.Label>
                          <input
                            type="text"
                            name="repContact"
                            placeholder="Who is Rep contact?"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                      </>
                    ) : (
                      ""
                    )}

                    {groupId == 3 && flag == 0 ? (
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="">Select User Type</Form.Label>
                        <Select
                          options={userDetail?.userType}
                          placeholder="Select province"
                          name="userType"
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                          onChange={(e) => handleChange(e?.value, "UserType")}
                        />
                      </Form.Group>
                    ) : (
                      ""
                    )}
                  </Col>
                  {groupId == 2 ||
                  (groupId == 3 && flag == 0) ||
                  (groupId == 3 && flag == 2) ? (
                    <>
                      <Col
                        md="5"
                        className="d-flex justify-content-end align-items-start right-change"
                      >
                        <Form.Group className="form-group justify-content-end">
                          <Form.Label htmlFor="">Notes</Form.Label>
                          <textarea
                            className="form-control"
                            name="notes"
                            id="formControlTextarea"
                            rows="5"
                            placeholder="Meeting note, special interest etc..."
                            onChange={(e) => handleChange(e)}
                          ></textarea>
                        </Form.Group>
                      </Col>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {/* 
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
                  <Form.Label htmlFor="upload-file">
                    <span>Choose Your File</span>
                  </Form.Label>
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
        <Modal
          show={uploadShow}
          onHide={handleClose}
          className="send-confirm preview-content"
          id="download-qr"
        >
          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              Change file
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleClose}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="form-group">
                <div className="upload-file-box">
                  <div className="box">
                    <input
                      type="file"
                      name="file-5[]"
                      id="file-5"
                      className="inputfile inputfile-5"
                      // accept="application/pdf"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={(e) => handleChange(e, "uploadFile")}
                    />
                    <Form.Label htmlFor="file-5">
                      <span>Choose Your File</span>
                    </Form.Label>
                    {userInputs?.uploadFile?.[0]?.name ? (
                      <p>{userInputs?.uploadFile?.[0].name}</p>
                    ) : (
                      <p>Upload your Excel</p>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <div className="modal-footer">
            <button
              type="button"
              className={
                updateFlag == 0
                  ? "btn btn-primary save btn-filled move-draft btn-disabled"
                  : "btn btn-primary save btn-filled move-draft"
              }
              onClick={handleFileUpload}
            >
              Upload
            </button>
          </div>
        </Modal>
      </Col>
    </>
  );
};

export default ReaderAdd;
