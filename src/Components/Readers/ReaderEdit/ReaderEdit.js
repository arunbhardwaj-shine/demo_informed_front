import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Select from "react-select";
import CommonModel from "../../../Model/CommonModel";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { getData, postData, postFormData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";

const ReaderEdit = () => {
  const { state } = useLocation();
  const [commonShow, setCommonShow] = useState(false);
  const navigate = useNavigate();
  const [groupId, setGroupId] = useState();
  const [flag, setFlag] = useState();
  const [pharmaData, setPharmaData] = useState();

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
  const [id, setId] = useState(state.id);
  const [userId, setUserID] = useState(localStorage.getItem("user_id"));

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
    ibu: "",
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
    ibu: [
      { value: "critical care1", label: "critical care1" },
      { value: "critical care2", label: "critical care2" },
      { value: "critical care3", label: "critical care3" },
    ],
    province: [],
    hospital: [],
    blind_type: [],
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
  const initalFun = async () => {
    loader("show");
    const hasData = await getData(`${ENDPOINT.READER_USER_DROP} `);

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
    setPharmaData(hasData?.data?.data?.user?.[0]?.pharmaData);

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

  const initialReaderFun = async () => {
    loader("show");
    const hasData = await getData(`${ENDPOINT.READER_GET_READER_USER}/${id} `);
    setAddReaderInputs(hasData?.data?.data);

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
          placeholder: "Type your product",
        },
      ]);

      setCommonHeader("Add New Product");
    }
  };

  useEffect(() => {
    initalFun();
    initialReaderFun();
  }, []);

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

  const handleFileUpload = async (e) => {
    loader("show");
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("createdBy", userId);
    await postFormData(ENDPOINT.UPLOAD_READER_FILE, formData, {
      header: { "Content-Type": "multipart/form-data" },
    });
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
          createdBy: userId,
          firstName: userInputs?.firstName,
          middleName: userInputs?.middleName,
          lastName: userInputs?.lastName,
          email: userInputs?.email,
          alternativeEmail: userInputs?.alternativeEmail,

          primary_phone: `${userInputs?.countryCode?.label}-informed-${userInputs?.primary_phone}`,
          alternativePhone: userInputs?.alternativePhone,
          country: userInputs?.country,
          province: userInputs?.province,
          hospital: userInputs?.hospital,
          title: userInputs?.title,
          speciality: userInputs?.speciality,
          Discipline: userInputs?.discipline,
          product: userInputs?.product,
          interestArea: userInputs?.interestArea,
          repContact: userInputs?.repContact,
          notes: userInputs?.notes,
          siteNumber: userInputs?.siteNumber,
          blind_type: userInputs?.blind_type,
          siteName: userInputs?.siteName,
          irt: userInputs?.irt,
          ibu: userInputs?.ibu,
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

  const RDAccount = () => {
    return (
      <>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">Role </Form.Label>
          <Select
            options={userDetail?.role}
            defaultValue={{
              label: userInputs?.role,
              value: userInputs?.role,
            }}
            placeholder="Select role"
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
            defaultValue={{
              label: userInputs?.sub_role,
              value: userInputs?.sub_role,
            }}
            placeholder="Select Sub role"
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
            defaultValue={{
              label: userInputs?.blinded,
              value: userInputs?.blinded,
            }}
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
            defaultValue={{
              label: userInputs?.irt,
              value: userInputs?.irt,
            }}
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
            defaultValue={{
              label: userInputs?.siteNumber,
              value: userInputs?.siteNumber,
            }}
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
            defaultValue={{
              label: userInputs?.siteName,
              value: userInputs?.siteName,
            }}
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
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <Row className="justify-content-end align-items-center">
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
                <Col md="9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Edit CRM</a>
                    </li>
                    <li className="">
                      <a href="">Review &amp; approve</a>
                    </li>
                  </ul>
                </Col>
                <Col md="2">
                  <div className="header-btn">
                    {/* <button className="btn btn-primary btn-bordered move-draft">
                      Cancel
                    </button> */}

                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="create-reader create-change-content reader_added">
              <div className="form_action">
                <div className="create-reader-form-header">
                  <h4>Please fill the following details</h4>
                  {!(groupId == 3 && flag == 0 && pharmaData == 1) ? (
                    <Button
                      className="btn-bordered"
                      type="file"
                      // onClick={handleShow}
                    >
                      Upload Excel File
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                <Row>
                  <Col md="7">
                    {userInputs ? (
                      <>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">First name *</Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            defaultValue={userInputs?.firstName}
                            placeholder="First name"
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
                            className="form-control"
                            name="middleName"
                            defaultValue={userInputs?.middleName}
                            placeholder="Middle name"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Last name</Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            defaultValue={userInputs?.lastName}
                            placeholder="Last name"
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
                            defaultValue={userInputs?.email}
                            onChange={(e) => handleChange(e)}
                          />
                          {error?.email ? (
                            <div className="login-validation">
                              {error?.email}
                            </div>
                          ) : (
                            ""
                          )}
                        </Form.Group>
                      </>
                    ) : (
                      ""
                    )}

                    {groupId == 2 ||
                    (groupId == 3 && flag == 0) ||
                    (groupId == 3 && flag == 0 && pharmaData == 1) ? (
                      <>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Alternative email </Form.Label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="example@email.com"
                            name="alternativeEmail"
                            defaultValue={userInputs?.alternativeEmail}
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
                            defaultValue={{
                              label: userInputs?.countryCode,
                            }}
                            onChange={(e) => handleChange(e, "countryCode")}
                          />

                          <input
                            type="number"
                            className="form-control"
                            name="primary_phone"
                            defaultValue={userInputs?.primary_phone?.substring(
                              userInputs?.primary_phone?.indexOf("/") + 1
                            )}
                            placeholder="Phone number"
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
                            defaultValue={userInputs?.alternativePhone}
                            placeholder="Altername Phone number"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                      </>
                    ) : (
                      ""
                    )}

                    {userInputs ? (
                      <>{groupId == 3 && flag == 1 ? RDAccount() : ""}</>
                    ) : (
                      ""
                    )}
                    {userInputs?.country ? (
                      <>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Country *</Form.Label>

                          <Select
                            options={countryAll}
                            placeholder="Select country"
                            name="country"
                            defaultValue={{
                              label: userInputs?.country,
                              value: userInputs?.country,
                            }}
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            onChange={(e) => handleChange(e?.value, "country")}
                          />
                          {error?.country ? (
                            <div className="login-validation">
                              {error?.country}
                            </div>
                          ) : (
                            ""
                          )}
                        </Form.Group>
                      </>
                    ) : (
                      ""
                    )}

                    {userInputs ? (
                      <>
                        {groupId == 2 ||
                        (groupId == 3 && flag == 0 && pharmaData == 0) ? (
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="">Province</Form.Label>
                            <Select
                              options={province}
                              placeholder="Select province"
                              name="provience"
                              defaultValue={{
                                label: userInputs?.province,
                                value: userInputs?.province,
                              }}
                              className="dropdown-basic-button split-button-dropup"
                              isClearable
                              onChange={(e) =>
                                handleChange(e?.value, "province")
                              }
                            />
                          </Form.Group>
                        ) : (
                          ""
                        )}

                        {groupId == 2 || (groupId == 3 && flag == 0) ? (
                          <>
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="">Hospital</Form.Label>
                              <Select
                                options={hospital}
                                placeholder="Select hospital"
                                defaultValue={{
                                  label: userInputs?.hospital,
                                  value: userInputs?.hospital,
                                }}
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                                onChange={(e) =>
                                  handleChange(e?.value, "hospital")
                                }
                              />
                            </Form.Group>

                            <Form.Group className="form-group">
                              <Form.Label htmlFor="">Title</Form.Label>
                              <input
                                type="text"
                                className="form-control"
                                name="title"
                                defaultValue={userInputs?.title}
                                placeholder="Title "
                                onChange={(e) => handleChange(e)}
                              />
                            </Form.Group>
                            <Form.Group className="form-group margin-added">
                              <Form.Label htmlFor="">Speciality</Form.Label>
                              <Select
                                options={userDetail?.speciality}
                                placeholder="Select speciality"
                                name="speciality"
                                defaultValue={{
                                  label: userInputs?.speciality,
                                  value: userInputs?.speciality,
                                }}
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
                                  Add New Speciality +
                                </Button>
                              </div>
                            </Form.Group>

                            {groupId == 2 ||
                            (groupId == 3 && flag == 0 && pharmaData == 0) ? (
                              <>
                                <Form.Group className="form-group margin-added">
                                  <Form.Label htmlFor="">Discipline</Form.Label>
                                  <Select
                                    options={userDetail?.discipline}
                                    placeholder="Select discipline"
                                    name="discipline"
                                    className="dropdown-basic-button split-button-dropup"
                                    isClearable
                                    defaultValue={{
                                      label: userInputs?.discipline,
                                      value: userInputs?.discipline,
                                    }}
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
                                      Add New Discipline +
                                    </Button>
                                  </div>
                                </Form.Group>
                              </>
                            ) : (
                              ""
                            )}

                            {groupId == 3 && pharmaData == 1 ? (
                              <Form.Group className="form-group">
                                <Form.Label htmlFor="">
                                  Bussiness Unit
                                </Form.Label>
                                <Select
                                  options={userDetail?.ibu}
                                  defaultValue={userInputs?.ibu}
                                  placeholder="Select Bussiness Unit"
                                  name="ibu"
                                  className="dropdown-basic-button split-button-dropup"
                                  isClearable
                                  onChange={(e) =>
                                    handleChange(e?.value, "ibu")
                                  }
                                />
                              </Form.Group>
                            ) : (
                              ""
                            )}

                            <Form.Group className="form-group margin-added">
                              <Form.Label htmlFor="">Product</Form.Label>
                              <Select
                                options={userDetail?.product}
                                placeholder="Select product"
                                defaultValue={{
                                  label: userInputs?.product,
                                  value: userInputs?.product,
                                }}
                                name="product"
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                                onChange={(e) =>
                                  handleChange(e?.value, "product")
                                }
                              />
                              <div className="add_product">
                                <span>&nbsp;</span>
                                <Button
                                  className="btn-bordered btn-voilet"
                                  onClick={(e) =>
                                    addNewProductClicked("product", e)
                                  }
                                >
                                  Add New Product +
                                </Button>
                              </div>
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="">Interest area</Form.Label>
                              <Select
                                options={productionAll}
                                defaultValue={userInputs?.interestArea}
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
                                defaultValue={userInputs?.repContact}
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
                      </>
                    ) : (
                      ""
                    )}

                    {groupId == 3 && flag == 0 && pharmaData == 0 ? (
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="">Select User Type</Form.Label>
                        <Select
                          options={userDetail?.userType}
                          defaultValue={userInputs?.userType}
                          placeholder="Select user type"
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
                  {groupId == 2 || (groupId == 3 && flag == 0) ? (
                    <>
                      <Col
                        md="5"
                        className="d-flex justify-content-end align-items-start right-change"
                      >
                        <Form.Group className="form-group justify-content-end align-items-start notes">
                          <Form.Label htmlFor="">Notes</Form.Label>
                          <textarea
                            className="form-control"
                            defaultValue={userInputs?.notes}
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
                </Row>
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
      </Col>
    </>
  );
};

export default ReaderEdit;
