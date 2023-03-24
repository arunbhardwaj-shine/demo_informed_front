import React, { useState,useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
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

  const [countryAll, setCountryAll] = useState([
  ]);
  const [province,setProvince] = useState([])


  const [productionAll, setProductionAll] = useState([
    { value: "production1", label: "production1222" },
    { value: "production2", label: "production2" },
    { value: "production3", label: "production3" },
  ]);
  const [hospital,setHospital] = useState([])
  const [countryCode, setCountryCode] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ]);
  const [id,setId] = useState(state.id)
  const [userId,setUserID] = useState(18207)

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
  const initalFun = async() =>{
    loader("show")
   const hasData =  await getData(`${ENDPOINT.READER_USER_DROP}${userId} `);

    let country = [];
    hasData?.data?.data?.country.reduce((objEntries, key) => {
      country.push({
        label:key,
        value:key
        })
       })
     setCountryAll(country)
     setProvince(hasData?.data?.data?.province)
     setHospital(hasData?.data?.data?.hospital)
   
     setUserDetail({...userDetail,discipline:hasData?.data?.data?.discipline,speciality:hasData?.data?.data?.speciality,product:hasData?.data?.data?.product})
    loader("hide")
  }
  const initialReaderFun  = async() =>{
    loader("show")
   const hasData =  await getData(`${ENDPOINT.READER_GET_READER_USER}/${id} `);
   setAddReaderInputs(hasData?.data?.data)
   
    loader("hide")
  }

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

  useEffect(()=>{
    initalFun()
    initialReaderFun()
  },[])


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

      try {
         loader("show");
        let data = {
          createdBy: userId,
          firstName: userInputs?.firstName,
          middleName: userInputs?.middleName,
          lastName: userInputs?.lastName,
          email: userInputs?.email,
          alternativeEmail: userInputs?.alternativeEmail,
          // countryCode: userInputs?.countryCode,
          primary_phone: userInputs?.phoneNumber,
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
          siteNumber: "",
          Blind: "",
          siteName: "",
          irt: "",
        };
        await postData(ENDPOINT.READER_CREATE, data);
        loader("hide");
        navigate("/readers-view");
      } catch (err) {
        console.log(err);
        loader("hide");
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
                  <input
                    type="file"
                    name="file-6[]"
                    id="file-6"
                    // accept="application/pdf"
                    onChange={handleFileUpload}
                  />
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
                        defaultValue={userInputs?.firstName}

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
                        defaultValue={userInputs?.middleName}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        defaultValue={userInputs?.lastName}
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
                        defaultValue={userInputs?.email}
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
                        defaultValue={userInputs?.alternativeEmail}
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
                        defaultValue={userInputs?.phoneNumber}
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
                        defaultValue={userInputs?.alternativePhone}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Country *</label>
                      <Select
                        options={countryAll}
                        placeholder="Select country"
                        name="country"
                        defaultValue={{label:userInputs?.country,value:userInputs?.country}}
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
                        options={province}
                        placeholder="Select province"
                        // name="provience"
                        defaultValue={{label:userInputs?.province,value:userInputs?.province}}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                        onChange={(e) => handleChange(e?.value, "province")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Hospital</label>
                      <Select
                        options={hospital}
                        placeholder="Select hospital"
                        defaultValue={{label:userInputs?.hospital,value:userInputs?.hospital}}
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
                        defaultValue={userInputs?.title}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Speciality</label>
                      <Select
                        options={userDetail?.speciality}
                        placeholder="Select speciality"
                        // name="speciality"
                        defaultValue={{label:userInputs?.speciality,value:userInputs?.speciality}}
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
                        defaultValue={{label:userInputs?.discipline,value:userInputs?.discipline}}
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
