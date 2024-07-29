import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Select from "react-select";
import CommonModel from "../../../Model/CommonModel";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { getData, postData, postFormData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import MarketingAddReader from "./MarketingAddReader";
import axios from "axios";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const ReaderLayout = () => {
  return (
    <>
      {localStorage.getItem("user_id") == "90VIqoM675WT4/peSRnbSQ==" ? (
        <MarketingAddReader />
      ) : (
        <ReaderAdd />
      )}
    </>
  );
};
const ReaderAdd = () => {

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [commonShow, setCommonShow] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state-->", state)
  const [groupId, setGroupId] = useState();
  const [flag, setFlag] = useState();
  const [pharmaData, setPharmaData] = useState();

  const [countryAll, setCountryAll] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);

  const [productionAll, setProductionAll] = useState([
    {
      value: "Anaesthesia & Intensive care",
      label: "Anaesthesia & Intensive care",
    },
    { value: "CIDP and MMN", label: "CIDP and MMN" },
    { value: "Cardiac surgery", label: "Cardiac surgery" },
    { value: "GBS", label: "GBS" },
    { value: "General Haematology", label: "General Haematology" },
    {
      value: "Haematological malignancies",
      label: "Haematological malignancies",
    },
    { value: "Haemophilia and VWD", label: "Haemophilia and VWD" },
    { value: "Immunology", label: "Immunology" },
    { value: "Neurology", label: "Neurology" },
    { value: "Transplantation", label: "Transplantation" },
    { value: "Trauma", label: "Trauma" },
    { value: "Other", label: "Other" },
  ]);
  const [ibu, setIbu] = useState([
    {
      label: "Critical Care",
      value: "Critical Care",
    },
    { label: "Haematology", value: "Haematology" },
    { label: "Immunotherapy", value: "Immunotherapy" },
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
  const [commonFooter, setCommonFooter] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState([]);
  const [data, setData] = useState([]);

  const [newProduct, setNewProduct] = useState({
    label: "",
    value: "",
  });
  const [userDetail, setUserDetail] = useState({
    speciality: [],
    discipline: [],
    product: [],
    ibu: [],
    irt: [],
    userType: [],
    blind_type: [],
    hospital: [],
    province: [],
    siteNumber: [],
    siteName: [],
  });

  const [userInputs, setAddReaderInputs] = useState({
    alternativeEmail: "",
    alternativePhone: "",
    blind_type: "",
    country: "",
    countryCode: "",
    createdBy: "",
    discipline: "",
    email: "",
    firstName: "",
    hospital: "",
    interestArea: "",
    irt: 1,
    institution: "Study site",
    lastName: "",
    middleName: "",
    notes: "",
    primary_phone: "",
    product: "",
    province: "",
    repContact: "",
    role: state?.siteRole ? state?.siteRole : "",
    siteName: "",
    siteNumber: "",
    speciality: "",
    sub_role: "",
    title: "",
    ibu: "",
    hospitalData: {},

  });

  const [uploadShow, setUploadShow] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(0);

  const handleModelFun = (e) => {
    setNewProduct({
      label: e?.target?.name?.trim(),
      value: e?.target?.value?.trim(),
    });
  };

  const handleShow = () => {
    setUploadShow(true);
  };

  const handleClose = () => {
    setUploadShow(false);
  };

  const handleSubmitModelFun = async (e) => {
    if (newProduct?.value?.length) {
      const newArr = userDetail[newProduct?.label];
      loader("show");
      try {
        if (commonHeader != "Add New Hospital") {
          await postData(`${ENDPOINT.READER_ADD_FEATURES}`, {
            label: newProduct?.label,
            value: newProduct?.value,
          });
        } else {
          setAddReaderInputs({
            ...userInputs,
            hospitalData: {
              label: newProduct?.value,
              value: newProduct?.value,
            },
            hospital: "",
          });
          loader("hide");
          return;
        }
        let checkIndex = newArr.findIndex(
          (el) => el.value == newProduct?.value
        );
        if (commonFooter == "Add") {
          if (checkIndex == -1) {
            newArr.unshift({
              value: newProduct?.value,
              label: newProduct?.value,
            });

            setUserDetail({ ...userDetail, [newProduct?.label]: newArr });
          } else {
            toast.error(newProduct?.label + " already in list.");
          }
        }
        loader("hide");
      } catch (err) {
        loader("hide");
        console.log(err);
      }
    }
  };
  const axiosFun = async () => {
    try {
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      const result = await axios.get(`emailapi/get_site?uid=${localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? 2147536982 : 2147501188}`);
      let country = result?.data?.response?.data?.site_country_data;
      let arr = [];
      Object.entries(country).map(([index, item]) => {
        let label = item;
        if (index == "B&H") {
          label = "Bosnia and Herzegovina";
        }
        arr.push({
          value: item,
          label: label,
        });
      });

      setIRTCountry(arr);
    } catch (err) {
      console.log("-err", err);
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

    // setProvince(hasData?.data?.data?.province);
    setHospital(hasData?.data?.data?.hospital);
    setGroupId(hasData?.data?.data?.user?.[0]?.group_id);
    setFlag(hasData?.data?.data?.user?.[0]?.flag);
    setPharmaData(hasData?.data?.data?.user?.[0]?.pharmaData);
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
      setAddReaderInputs({
        ...userInputs,
        role: hasData?.data?.data?.userIrtRoles?.[0]?.value,
        irt: 1,
      });
    }

    setUserDetail({
      ...userDetail,
      discipline: hasData?.data?.data?.discipline,
      speciality: hasData?.data?.data?.speciality,
      province: hasData?.data?.data?.province,
      product: hasData?.data?.data?.product,
      role: hasData?.data?.data?.role,
      userType: [
        { label: "Hcp", value: "Hcp" },
        { label: "Staff users", value: "Staff users" },
        { label: "Test users", value: "Test users" },
      ],
      userIrtRoles: hasData?.data?.data?.userIrtRoles,
      institution: hasData?.data?.data?.institution,
      sub_role: hasData?.data?.data?.sub_role,
      blind_type: hasData?.data?.data?.blind_type,
      siteName: [],
      sideData: hasData?.data?.data?.sideData,
      siteNumber: [],
      irt: hasData?.data?.data?.irt,
    });
    loader("hide");
  };

  // const editProductClicked = (statusMsg, e) => {
  //   // setSelectedCategory(statusMsg);

  //   // e.preventDefault();
  //   setCommonShow(true);
  //   setCommonFooter("Update");
  //   setNewProduct("");
  //   if (statusMsg == "speciality") {
  //     setData(() => [
  //       {
  //         name: "speciality",
  //         label: "Speciality",
  //         type: "input",
  //         placeholder: "Type your speciality",
  //         value: userInputs[statusMsg],
  //       },
  //     ]);
  //     setCommonHeader("Edit Speciality");
  //   }
  //   if (statusMsg == "discipline") {
  //     setData(() => [
  //       {
  //         name: "discipline",
  //         label: "discipline",
  //         type: "input",
  //         placeholder: "Type your discipline",
  //         value: userInputs[statusMsg],
  //       },
  //     ]);
  //     setCommonHeader("Edit Discipline");
  //   }
  //   if (statusMsg == "product") {
  //     setData(() => [
  //       {
  //         name: "product",
  //         label: "product",
  //         type: "input",
  //         placeholder: "Type your product",
  //         value: userInputs[statusMsg],
  //       },
  //     ]);
  //     setCommonHeader("Edit Product");
  //   }
  //   if (statusMsg == "province") {
  //     setData(() => [
  //       {
  //         name: "province",
  //         label: "province",
  //         type: "input",
  //         placeholder: "Type your province",
  //         value: userInputs[statusMsg],
  //       },
  //     ]);
  //     setCommonHeader("Edit Product");
  //   }
  // };

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
    if (statusMsg == "province") {
      setNewProduct("");
      setData(() => [
        {
          name: "province",
          label: "Province",
          type: "input",
          placeholder: "Type your province ",
        },
      ]);

      setCommonHeader("Add New Province");
    }

    if (statusMsg == "hospital") {
      setNewProduct("");
      setData(() => [
        {
          name: "hospital",
          label: "Hospital",
          type: "input",
          placeholder: "Type your hospital ",
        },
      ]);

      setCommonHeader("Add New Hospital");
    }

    setCommonFooter("Add");
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
      axiosFun();
    }
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
    // selectedCategory.push(isSelectedName);
    setUpdateFlag(1);
    if (e?.target?.files?.length < 1) {
      return;
    }
    if (isSelectedName == "hospital") {
      setAddReaderInputs({
        ...userInputs,
        hospitalData: {},
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e?.target?.files
            ? e?.target?.files
            : e
          : e?.target?.value,
      });
    } else if (isSelectedName == "country") {
      // if(!userDetail?.flag){
      let newSite = [],
        newSiteNumber = [];
      userDetail?.sideData?.forEach((item) => {
        let countryUpdated = e;
        if (countryUpdated == "Bosnia and Herzegovina") {
          countryUpdated = "B&H";
        }
        if (item?.country == e) {
          newSite.push({ label: item?.site_name, value: item?.site_name });
          newSiteNumber.push({
            label: item.site_number,
            value: item?.site_number,
          });
        }
      });
      setUserDetail({
        ...userDetail,
        flag: 1,
        siteName: newSite,
        siteNumber: newSiteNumber,
      });
      // setAddReaderInputs({...userInputs,["siteNumber"]:"",["siteName"]:""})

      // }

      setAddReaderInputs({
        ...userInputs,
        [isSelectedName]: e,
        ["siteNumber"]: "",
        ["siteName"]: "",
      });
    } else if (isSelectedName == "siteNumber") {
      let siteName = "";
      userDetail?.sideData?.forEach((item) => {
        if (item?.site_number == e) {
          siteName = item?.site_name;
        }
      });
      setAddReaderInputs({
        ...userInputs,
        [isSelectedName]: e,
        ["siteName"]: siteName,
      });
    } else if (isSelectedName == "siteName") {
      let siteNum = "";
      userDetail?.sideData?.forEach((item) => {
        if (item?.site_name == e) {
          siteNum = item?.site_number;
        }
      });
      setAddReaderInputs({
        ...userInputs,
        [isSelectedName]: e,
        ["siteNumber"]: siteNum,
      });
    } else if (isSelectedName == "irt") {
      let country = "";
      let newSiteName = [],
        newSiteNumber = [];
      let role = "";
      if (e == 1) {
        role = userDetail?.userIrtRoles[0]?.value;
      } else {
        role = userDetail?.role[4]?.value;
      }

      setAddReaderInputs({
        ...userInputs,
        [isSelectedName]: e,
        ["country"]: country,
        ["siteName"]: "",
        ["siteNumber"]: "",
        ["role"]: role,
      });
      setUserDetail({
        ...userDetail,
        flag: 1,
        siteName: newSiteName,
        siteNumber: newSiteNumber,
      });
    } else if (isSelectedName == "institution") {
      if (e == "Study site") {
        setAddReaderInputs({
          ...userInputs,
          [isSelectedName]: e,
          ["irt"]: 1,
          ["role"]: userDetail?.userIrtRoles[0]?.value,
        });
      } else {
        setAddReaderInputs({
          ...userInputs,
          [isSelectedName]: e,
          ["irt"]: 0,
          ["siteName"]: "",
          ["siteNumber"]: "",
          ["role"]: userDetail?.role[4]?.value,
        });
      }
    } else {
      setAddReaderInputs({
        ...userInputs,
        [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
          ? e?.target?.files
            ? e?.target?.files
            : e
          : e?.target?.value,
      });
    }
  };

  const handleFileUpload = async (e) => {
    loader("show");
    try {
      handleClose();
      setUpdateFlag(0);
      let formData = new FormData();
      formData.append("file", userInputs?.uploadFile?.[0]);
      formData.append("createdBy", localStorage.getItem("user_id"));
      const response = await postFormData(
        ENDPOINT.UPLOAD_READER_FILE,
        formData,
        {
          header: { "Content-Type": "multipart/form-data" },
        }
      );
      loader("hide");
      if (response?.data?.data) {
        navigate("/readers-list", {
          state: {
            readersData: response?.data?.data,
          },
        });
      }
    } catch (err) {
      handleClose();
      setUpdateFlag(0);
      console.log(err);
      loader("hide");
    }
    loader("hide");
  };

  const nextButtonClicked = async (e) => {
    e.preventDefault();
    const result = AddReaderValidation(userInputs, groupId, flag);

    if (Object.keys(result)?.length) {
      if (Object.keys(result)[0] == "firstName") {
        nameRef.current.focus();
      } else if (Object.keys(result)[0] == "email") {
        emailRef.current.focus();
      }
      toast.error(result[Object.keys(result)[0]]);
      setError(result);
      return;
    } else {
      loader("hide");
      try {
        loader("show");
        let data = {
          createdBy: localStorage.getItem("user_id"),
          firstName: userInputs?.firstName,
          middleName: userInputs?.middleName,
          lastName: userInputs?.lastName,
          email: userInputs?.email,
          alternativeEmail: userInputs?.alternativeEmail,

          primary_phone: `${userInputs?.countryCode?.label ? userInputs?.countryCode?.label : ""
            }-informed-${userInputs?.primary_phone}`,

          alternativePhone: userInputs?.alternativePhone,
          country: userInputs?.country,
          province: userInputs?.province,
          hospital: userInputs?.hospital
            ? userInputs?.hospital
            : userInputs?.hospitalData?.value,
          title: userInputs?.title,
          speciality: userInputs?.speciality,
          discipline: userInputs?.discipline,
          product: userInputs?.product,
          interestArea: userInputs?.interestArea,
          repContact: userInputs?.repContact,
          notes: userInputs?.notes,
          siteNumber: userInputs?.siteNumber,
          blind_type: userInputs?.blinded,
          siteName: userInputs?.siteName,
          irt: userInputs?.irt,
          role: userInputs?.role,
          sub_role: userInputs?.sub_role,
          ibu: userInputs?.ibu,
          userType: userInputs?.UserType,
          institute: userInputs?.institution,
        };
        // await postData(ENDPOINT.READER_CREATE, data);
        loader("hide");
        console.log("state?.siteRole--->", state?.siteRole)
        navigate("/reader-review", {
          state: {
            data: data,
            siteRole: state?.siteRole ? state?.siteRole : null
          },
        });
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  const downloadFile = () => {
    let user_id = localStorage.getItem("user_id");
    let link = document.createElement("a");

    if (user_id == "56Ek4feL/1A8mZgIKQWEqg==") {
      link.href = "https://webinar.informed.pro/R_Dsample.xlsx";
    } else if (user_id == "sNl1hra39QmFk9HwvXETJA==") {
      link.href = "https://webinar.informed.pro/Norgine_sample.xlsx";
    } else {
      link.href = "https://webinar.informed.pro/sample.xlsx";
    }
    link.setAttribute("download", "file.xlsx");
    document.body.appendChild(link);
    link.download = "";
    link.click();
    document.body.removeChild(link);
  };

  const RDAccount = () => {
    return (
      <>
        {localStorage.getItem("user_id") !== "56Ek4feL/1A8mZgIKQWEqg=="&&localStorage.getItem("user_id") !== "sNl1hra39QmFk9HwvXETJA==" ? (<>
          <Form.Group className="form-group">
            <Form.Label htmlFor="">
              Institution <span>*</span>
            </Form.Label>
            <Select
              options={userDetail?.institution}
              placeholder={"Select Institution"}
              name="institution"
              className={
                error?.institution
                  ? "dropdown-basic-button split-button-dropup error"
                  : "dropdown-basic-button split-button-dropup disabled"
              }
              isDisabled
              isClearable
              value={
                userDetail?.institution.findIndex((el) => el.value == userInputs?.institution) ==
                  -1
                  ? ""
                  : userDetail?.institution[
                  userDetail?.institution.findIndex(
                    (el) => el.value == userInputs?.institution
                  )
                  ]
              }
            //  onChange={(e) => handleChange(e?.value, "institution")}
            />

            {error?.institution ? (
              <div className="login-validation">{error?.institution}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label htmlFor="">
              {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                ? "IRT mandatory training"
                : "IRT"}
            </Form.Label>
            <Select
              options={userDetail?.irt}
              defaultValue={{
                label: "Yes",
                value: "Yes",
              }}
              value={
                userDetail?.irt.findIndex((el) => el.value == userInputs?.irt) ==
                  -1
                  ? ""
                  : userDetail?.irt[
                  userDetail?.irt.findIndex(
                    (el) => el.value == userInputs?.irt
                  )
                  ]
              }
              // value={userDetail?.irt?.find((inst) => inst.label === "Yes")}
              // value={{ label: "Yes",value: "Yes",}}
              placeholder={
                (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                  || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                  ? "Select IRT mandatory training"
                  : "Select IRT"
              }
              name="irt"
              className={

                error?.irt
                  ? "dropdown-basic-button split-button-dropup error"
                  : "dropdown-basic-button split-button-dropup disabled "
              }
              isClearable
              isDisabled

            // onChange={(e) => handleChange(e?.value, "irt")}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="">
              {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                ? "IRT role"
                : "Role"}
            </Form.Label>

            {userInputs?.irt && userInputs.irt == 1 ? (
              <>
                <Select
                  options={userDetail?.userIrtRoles}
                  placeholder="Select Role"
                  name="role"
                  // defaultValue={userDetail?.userIrtRoles[0]}
                  className="dropdown-basic-button split-button-dropup"
                  value={
                    userDetail?.userIrtRoles.findIndex(
                      (el) => el.value == userInputs?.role
                    ) == -1
                      ? userDetail?.userIrtRoles[0]
                      : userDetail?.userIrtRoles[
                      userDetail?.userIrtRoles.findIndex(
                        (el) => el.value == userInputs?.role
                      )
                      ]
                  }
                  isClearable
                  onChange={(e) => handleChange(e?.value, "role")}
                />
              </>
            ) : userInputs.irt == 0 ? (
              <>
                <Select
                  options={userDetail?.role}
                  placeholder="Select Role"
                  name="role"
                  className="dropdown-basic-button split-button-dropup"
                  value={
                    userDetail?.role.findIndex(
                      (el) => el.value == userInputs?.role
                    ) == -1
                      ? userDetail?.role[4]
                      : userDetail?.role[
                      userDetail?.role.findIndex(
                        (el) => el.value == userInputs?.role
                      )
                      ]
                  }
                  isClearable
                  onChange={(e) => handleChange(e?.value, "role")}
                />
              </>
            ) : (
              <>
                <Select
                  className="dropdown-basic-button split-button-dropup"
                  placeholder="Select Role"
                />
              </>
            )}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label htmlFor="">
              {" "}
              {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                ? "Study role"
                : "Sub Role"}{" "}
            </Form.Label>
            <Select
              options={userDetail?.sub_role}
              placeholder={
                (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                  || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                  ? "Select Study Role"
                  : "Select Role"
              }
              name="sub_role"
              className="dropdown-basic-button split-button-dropup"
              isClearable
              onChange={(e) => handleChange(e?.value, "sub_role")}
            />
          </Form.Group>
        </>) : null}


        {/* <Form.Group className="form-group">
          <Form.Label htmlFor="">
            Blind Type<span>*</span>{" "}
          </Form.Label>
          <Select
            options={userDetail?.blind_type}
            placeholder="Select Blind Type"
            name="blinded"
            className={
              error?.blinded
                ? "dropdown-basic-button split-button-dropup error"
                : "dropdown-basic-button split-button-dropup"
            }
            isClearable
            onChange={(e) => handleChange(e?.value, "blinded")}
          />
          {error?.blinded ? (
            <div className="login-validation">{error?.blinded}</div>
          ) : (
            ""
          )}
        </Form.Group> */}

        <Form.Group className="form-group">
          <Form.Label htmlFor="">
            Country <span>*</span>
          </Form.Label>
          {userInputs?.irt && userInputs?.irt == 1 ? (
            <Select
              options={irtCountry}
              value={
                irtCountry?.findIndex((e) => e.value == userInputs?.country) ==
                  -1
                  ? ""
                  : irtCountry[
                  irtCountry?.findIndex(
                    (e) => e.value == userInputs?.country
                  )
                  ]
              }
              // defaultValue={{label:userInputs?.country,value:userInputs?.country}}
              placeholder="Select country"
              name="country"
              className={
                error?.country
                  ? "dropdown-basic-button split-button-dropup error"
                  : "dropdown-basic-button split-button-dropup"
              }
              isClearable
              onChange={(e) => handleChange(e?.value, "country")}
            />
          ) : (
            <Select
              options={countryAll}
              value={
                countryAll?.findIndex((e) => e.value == userInputs?.country) ==
                  -1
                  ? ""
                  : countryAll[
                  countryAll?.findIndex(
                    (e) => e.value == userInputs?.country
                  )
                  ]
              }
              // defaultValue={{label:userInputs?.country,value:userInputs?.country}}
              placeholder="Select country"
              name="country"
              className={
                error?.country
                  ? "dropdown-basic-button split-button-dropup error"
                  : "dropdown-basic-button split-button-dropup"
              }
              isClearable
              onChange={(e) => handleChange(e?.value, "country")}
            />
          )}
          {error?.country ? (
            <div className="login-validation">{error?.country}</div>
          ) : (
            ""
          )}
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label htmlFor="">Site number </Form.Label>
          <Select
            options={userDetail?.siteNumber}
            placeholder="Select Site Number"
            noOptionsMessage={() =>
              userInputs?.country == ""
                ? "Please select country first"
                : "No options"
            }
            name="siteNumber"
            value={
              userDetail?.siteNumber.findIndex(
                (el) => el.value == userInputs?.siteNumber
              ) == -1
                ? ""
                : userDetail?.siteNumber[
                userDetail?.siteNumber.findIndex(
                  (el) => el.value == userInputs?.siteNumber
                )
                ]
            }
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "siteNumber")}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">Site name </Form.Label>
          <Select
            options={userDetail?.siteName}
            placeholder="Select Site Name "
            noOptionsMessage={() =>
              userInputs?.country == ""
                ? "Please select country first"
                : "No options"
            }
            name="siteName"
            value={
              userDetail?.siteName.findIndex(
                (el) => el.value == userInputs?.siteName
              ) == -1
                ? ""
                : userDetail?.siteName[
                userDetail?.siteName.findIndex(
                  (el) => el.value == userInputs?.siteName
                )
                ]
            }
            className="dropdown-basic-button split-button-dropup"
            isClearable
            onChange={(e) => handleChange(e?.value, "siteName")}
          />
        </Form.Group>
      </>
    );
  };

  const backButtonClicked=(e)=>{
    e.preventDefault()     
        if(state?.siteRole){
          navigate("/new-readers-reviews", {state: { siteRole: state.siteRole }})
        }else{
          navigate("/new-readers-reviews")
        }
      }
  
  
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <Col md="1">
                  <div className="header-btn-left">
                    {/*<Link
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
                      </Link>*/}

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
                      <a href="">{(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                        ?`Create ${state?.siteRole}`
                      :" Create CRM"}</a>
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
                    {(localStorage.getItem("user_id")=="56Ek4feL/1A8mZgIKQWEqg=="||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")?
                    <button
                      className="btn btn-primary btn-bordered move-draft"
                      onClick={(e) => backButtonClicked(e)}
                    >
                      Cancel
                    </button>
                    :null}
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

                  <Button
                    className="btn-bordered"
                    type="file"
                    onClick={handleShow}
                  >
                    Upload Excel File
                  </Button>
                </div>
                <div className="row">
                  <Col md="7">
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">
                        First name <span>*</span>
                      </Form.Label>
                      <input
                        type="text"
                        placeholder="First name"
                        className={
                          error?.firstName
                            ? "form-control error"
                            : "form-control"
                        }
                        ref={nameRef}
                        name="firstName"
                        onInput={(e) => handleChange(e)}
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
                      <Form.Label htmlFor="">
                        Last name  {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                          || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                          ? <span>*</span> : null}
                      </Form.Label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className={
                          error?.lastName
                            ? "form-control error"
                            : "form-control"
                        }
                        name="lastName"
                        onChange={(e) => handleChange(e)}
                      />
                      {error?.lastName ? (
                        <div className="login-validation">
                          {error?.lastName}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="">
                        Primary email <span>*</span>
                      </Form.Label>
                      <input
                        type="email"
                        className={
                          error?.email ? "form-control error" : "form-control"
                        }
                        placeholder="example@email.com"
                        ref={emailRef}
                        name="email"
                        onInput={(e) => handleChange(e)}
                      />
                      {error?.email ? (
                        <div className="login-validation">{error?.email}</div>
                      ) : (
                        ""
                      )}
                    </Form.Group>
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
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                        <Form.Group className="form-group primary_phone">
                          <Form.Label htmlFor="">Primary phone </Form.Label>
                          <Select
                            options={countryCode}
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            placeholder=""
                            onChange={(e) => handleChange(e, "countryCode")}
                          />

                          <input
                            type="number"
                            className="form-control"
                            name="primary_phone"
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
                            placeholder="Alternative phone"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                      </>
                    ) : (
                      ""
                    )}

                    {groupId == 3 && flag == 1 ? RDAccount() : ""}

                    {groupId == 3 && flag == 1 ? (
                      ""
                    ) : (
                      <Form.Group className="form-group">
                        <Form.Label htmlFor="">
                          Country <span>*</span>
                        </Form.Label>
                        <Select
                          options={countryAll}
                          placeholder="Select country"
                          name="country"
                          className={
                            error?.country
                              ? "dropdown-basic-button split-button-dropup error"
                              : "dropdown-basic-button split-button-dropup"
                          }
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
                    )}
                    {groupId == 2 ||
                      (groupId == 3 && flag == 0 && pharmaData == 0) ? (
                      <Form.Group className="form-group margin-added">
                        <Form.Label htmlFor="">Province</Form.Label>
                        <Select
                          options={userDetail?.province}
                          placeholder="Select province"
                          name="province"
                          className="dropdown-basic-button split-button-dropup"
                          isClearable
                          onChange={(e) => handleChange(e?.value, "province")}
                        />
                        <div className="add_product">
                          <span>&nbsp;</span>
                          <Button
                            className="btn-bordered btn-voilet"
                            onClick={(e) => addNewProductClicked("province", e)}
                          >
                            Add New Province +
                          </Button>
                        </div>

                        {/* {selectedCategory.includes("province") ? (
                          <span>
                            <div className="add_product">
                              <span>&nbsp;</span>
                              <Button
                                className="btn-bordered btn-voilet"
                                onClick={(e) =>
                                  editProductClicked("province", e?.value)
                                }
                              >
                                Edit Province
                              </Button>
                            </div>
                          </span>
                        ) : (
                          ""
                        )} */}
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
                            className="dropdown-basic-button split-button-dropup"
                            value={
                              Object.keys(userInputs?.hospitalData)?.length
                                ? userInputs.hospitalData
                                : userInputs?.hospital
                                  ? {
                                    label: userInputs?.hospital,
                                    value: userInputs?.hospital,
                                  }
                                  : ""
                            }
                            isClearable
                            onChange={(e) => handleChange(e?.value, "hospital")}
                          />
                          <div className="add_product">
                            <span>&nbsp;</span>
                            <Button
                              className="btn-bordered btn-voilet"
                              onClick={(e) =>
                                addNewProductClicked("hospital", e)
                              }
                            >
                              Add New Hospital +
                            </Button>
                          </div>
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">Title</Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
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
                              Add New Speciality +
                            </Button>
                          </div>
                          {/* {selectedCategory.includes("speciality") ? (
                            <span>
                              <div className="add_product">
                                <span>&nbsp;</span>
                                <Button
                                  className="btn-bordered btn-voilet"
                                  onClick={(e) =>
                                    editProductClicked("speciality", e?.value)
                                  }
                                >
                                  Edit Speciality
                                </Button>
                              </div>
                            </span>
                          ) : (
                            ""
                          )} */}
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
                              {/* {selectedCategory.includes("discipline") ? (
                                <span>
                                  <div className="add_product">
                                    <span>&nbsp;</span>
                                    <Button
                                      className="btn-bordered btn-voilet"
                                      onClick={(e) =>
                                        editProductClicked(
                                          "discipline",
                                          e?.value
                                        )
                                      }
                                    >
                                      Edit Discipline
                                    </Button>
                                  </div>
                                </span>
                              ) : (
                                ""
                              )} */}
                            </Form.Group>
                          </>
                        ) : (
                          ""
                        )}
                        {groupId == 3 && pharmaData == 1 ? (
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="">Bussiness Unit</Form.Label>
                            <Select
                              options={ibu}
                              placeholder="Select Bussiness Unit"
                              name="ibu"
                              className="dropdown-basic-button split-button-dropup"
                              isClearable
                              onChange={(e) => handleChange(e?.value, "ibu")}
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
                              Add New Product +
                            </Button>
                          </div>

                          {/* {selectedCategory.includes("product") ? (
                            <span>
                              <div className="add_product">
                                <span>&nbsp;</span>
                                <Button
                                  className="btn-bordered btn-voilet"
                                  onClick={(e) =>
                                    editProductClicked("product", e?.value)
                                  }
                                >
                                  Edit Product
                                </Button>
                              </div>
                            </span>
                          ) : (
                            ""
                          )} */}
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
                            placeholder="Who is internal contact?"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                      </>
                    ) : (
                      ""
                    )}

                    {groupId == 3 && flag == 0 && pharmaData == 0 ? (
                      <>
                        {localStorage.getItem("user_id") !=
                          "iSnEsKu5gB/DRlycxB6G4g==" ? (
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="">Select User Type</Form.Label>
                            <Select
                              options={userDetail?.userType}
                              placeholder="Select user type"
                              name="userType"
                              className="dropdown-basic-button split-button-dropup"
                              isClearable
                              onChange={(e) =>
                                handleChange(e?.value, "UserType")
                              }
                            />
                          </Form.Group>
                        ) : null}
                      </>
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
          // footerButton={"Add"}
          footerButton={commonFooter}
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
            <Form className="upload_reader_excel">
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
                      <p className="uploaded-file">
                        {userInputs?.uploadFile?.[0].name}
                      </p>
                    ) : (
                      <p>Upload your Excel</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="sample_btn" onClick={downloadFile}>
                <p className="d-flex align-items-center" style={{ textDecoration: 'underline', gap: '7px' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#8a4e9c" />
                    <path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#8a4e9c" />
                  </svg>

                  Download sample file from here</p>
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

export default ReaderLayout;
