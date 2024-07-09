import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

import MarketingEditReader from "./MarketingEditReader";

import Select from "react-select";
import CommonModel from "../../../Model/CommonModel";
import { AddReaderValidation } from "../../Validations/ReaderValidation/AddReaderValidation";
import { getData, postData, postFormData } from "../../../axios/apiHelper";
import { toast } from "react-toastify";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";
import axios from "axios";

const ReaderLayout = () => {
  return (
    <>
      {localStorage.getItem("user_id") == "90VIqoM675WT4/peSRnbSQ==" ? (
        <MarketingEditReader />
      ) : (
        <ReaderEdit />
      )}
    </>
  );
};
const ReaderEdit = () => {
  const { state } = useLocation();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [commonShow, setCommonShow] = useState(false);
  const navigate = useNavigate();
  const [groupId, setGroupId] = useState();
  const [flag, setFlag] = useState();
  const [pharmaData, setPharmaData] = useState();

  const [countryAll, setCountryAll] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);
  // const [province, setProvince] = useState([]);

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
  const [commonFooter, setCommonFooter] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState([]);
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
    hospitalData: {},
    institution: "",
  });
  const institutionData = [
    {
      label: "Study site",
      value: "Study site",
    },
    {
      label: "Premier Research",
      value: "Premier Research",
    },
    {
      label: "Comac",
      value: "Comac",
    },
    {
      label: "Octapharma",
      value: "Octapharma",
    },
  ];
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
      {
        label: "Critical Care",
        value: "Critical Care",
      },
      { label: "Haematology", value: "Haematology" },
      { label: "Immunotherapy", value: "Immunotherapy" },
    ],
    blind_type: [],
    province: [],
  });

  const handleModelFun = (e) => {
    setNewProduct({ label: e?.target?.name, value: e?.target?.value });
  };

  const axiosFun = async () => {
    try {
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      const result = await axios.get(`emailapi/get_site?uid=${localStorage.getItem("user_id")=="sNl1hra39QmFk9HwvXETJA=="?2147536982:2147501188}`);
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
          (el) => el.value?.trim() == newProduct?.value?.trim()
        );

        if (checkIndex == -1) {
          newArr.unshift({
            value: newProduct?.value,
            label: newProduct?.value,
          });

          setUserDetail({ ...userDetail, [newProduct?.label]: newArr });
        } else {
          toast.error(newProduct?.label + " already in list.");
        }

        loader("hide");
      } catch (err) {
        loader("hide");
        console.log(err);
      }
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

    // setProvince(hasData?.data?.data?.province);
    setHospital(hasData?.data?.data?.hospital);
    setGroupId(hasData?.data?.data?.user?.[0]?.group_id);
    setFlag(hasData?.data?.data?.user?.[0]?.flag);
    setPharmaData(hasData?.data?.data?.user?.[0]?.pharmaData);

    setUserDetail({
      ...userDetail,
      discipline: hasData?.data?.data?.discipline,
      province: hasData?.data?.data?.province,
      speciality: hasData?.data?.data?.speciality,
      product: hasData?.data?.data?.product,
      role: hasData?.data?.data?.role,
      userType: [
        { label: "Hcp", value: "Hcp", index: 0 },
        { label: "Staff users", value: "Staff users", index: 1 },
        { label: "Test users", value: "Test users", index: 3 },
      ],
      userIrtRoles: hasData?.data?.data?.userIrtRoles,
      sub_role: hasData?.data?.data?.sub_role,
      blind_type: hasData?.data?.data?.blind_type,
      siteName: hasData?.data?.data?.siteName,
      siteNumber: hasData?.data?.data?.siteNumber,
      sideData: hasData?.data?.data?.sideData,
      irt: hasData?.data?.data?.irt,
      institution: hasData?.data?.data?.institution,
    });
    changeSiteData();
    loader("hide");
  };

  const initialReaderFun = async () => {
    loader("show");
    try {
      const hasData = await getData(
        `${ENDPOINT.READER_GET_READER_USER}/${id} `
      );
      if (hasData?.data?.data?.country == "B&H") {
        hasData.data.data.country = "Bosnia and Herzegovina";
      }
      let obj = {
        0: "Hcp",
        1: "Staff users",
        3: "Test users",
      };
      setAddReaderInputs({
        ...hasData?.data?.data,
        userType: obj[hasData?.data?.data.userType]
          ? obj[hasData?.data?.data?.userType]
          : hasData?.data?.data?.userType,
        irt: hasData?.data?.data?.irt == "Yes" ? 1 : 0,
      });
      loader("hide");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
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
    setCommonFooter("Add");
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
    if (statusMsg == "province") {
      setNewProduct("");
      setData(() => [
        {
          name: "province",
          label: "Province",
          type: "input",
          placeholder: "Type your province",
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
          placeholder: "Type your hospital",
        },
      ]);

      setCommonHeader("Add New Hospital");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
  ||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
  ) {
      axiosFun();
    }
    initalFun();
    initialReaderFun();
  }, []);

  // useEffect(() => {
  //   changeSiteData();
  // }, [userDetail?.sideData]);

  const changeSiteData = () => {
    if (typeof userDetail?.sideData !== "undefined") {
      let newSite = [],
        newSiteNumber = [];

      userDetail?.sideData?.forEach((item) => {
        if (item?.country == userInputs?.country) {
          newSite.push({ label: item?.site_name, value: item?.site_name });
          newSiteNumber.push({
            label: item.site_number,
            value: item?.site_number,
          });
        }
      });

      setUserDetail({
        ...userDetail,
        siteName: newSite,
        siteNumber: newSiteNumber,
      });
    } else {
      console.log("-- im here inside changes");
    }
  };

  const handleChange = (e, isSelectedName) => {
    // selectedCategory.push(isSelectedName);
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
      let newSiteName = [];
      let newSiteNumber = [];
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
          ["role"]: "Site User-Blinded",
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
          : e?.target?.value?e?.target?.value:"",
      });
    }
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
      if (Object.keys(result)[0] == "firstName") {
        nameRef.current.focus();
      } else if (Object.keys(result)[0] == "email") {
        emailRef.current.focus();
      }
      toast.error(result[Object.keys(result)[0]]);
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

          primary_phone: `${
            userInputs?.countryCode?.label
              ? userInputs?.countryCode?.label
              : userInputs?.countryCode
          }-informed-${userInputs?.primary_phone}`,
          alternativePhone: userInputs?.alternativePhone,
          country: userInputs?.country,
          province: userInputs?.province?.trim(),
          // hospital: userInputs?.hospital,
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
          role: userInputs?.role,
          sub_role: userInputs?.sub_role,
          siteName: userInputs?.siteName,
          irt: userInputs?.irt,
          ibu: userInputs?.ibu,
          userType: userInputs?.userType,
          institute: userInputs?.institution,

        };
        // await postData(ENDPOINT.READER_CREATE, data);
        loader("hide");
        console.log(state);
        navigate("/reader-review", {
          state: {
            data: data,
            flag: 1,
            status: state.status

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
          <Form.Label htmlFor="">
            Institution <span>*</span>
          </Form.Label>
          <Select
            options={institutionData}
            placeholder={"Select Institution"}
            value={{
              label: userInputs?.institution,
              value: userInputs?.institution,
            }}
            name="institution"
            className={
              error?.institution
                ? "dropdown-basic-button split-button-dropup error"
                : "dropdown-basic-button split-button-dropup"
            }
            isClearable
            onChange={(e) => handleChange(e?.value, "institution")}
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
            ||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
              ? "IRT mandatory training"
              : "IRT"}
          </Form.Label>
          <Select
            options={userDetail?.irt}
            defaultValue={{
              label: userInputs?.irt,
              value: userInputs?.irt,
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
            placeholder="Select IRT"
            name="irt"
            className={
              error?.irt
                ? "dropdown-basic-button split-button-dropup error"
                : "dropdown-basic-button split-button-dropup"
            }
            isClearable
            onChange={(e) => handleChange(e?.value, "irt")}
          />
          {error?.irt ? (
            <div className="login-validation">{error?.irt}</div>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">
            {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
              ? "IRT role"
              : "Role"}{" "}
          </Form.Label>

          {userInputs?.irt &&
          (userInputs.irt == 1 || userInputs.irt == "Yes") ? (
            <Select
              options={userDetail?.userIrtRoles}
              placeholder="Select role"
              name="role"
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
              className="dropdown-basic-button split-button-dropup"
              isClearable
              onChange={(e) => handleChange(e?.value, "role")}
            />
          ) : (
            <Select
              options={userDetail?.role}
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
              placeholder="Select role"
              name="role"
              className="dropdown-basic-button split-button-dropup"
              isClearable
              onChange={(e) => handleChange(e?.value, "role")}
            />
          )}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="">
            {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
              ? "Study role"
              : "Sub Role"}{" "}
          </Form.Label>
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
        {/*<Form.Group className="form-group">
            <Form.Label htmlFor="">
              Blind Type<span>*</span>{" "}
            </Form.Label>

            <Select
              options={userDetail?.blind_type}
              defaultValue={{
                label:
                  userInputs?.blinded?.charAt(0)?.toUpperCase() +
                  userInputs?.blinded?.slice(1),
                value: userInputs?.blinded,
              }}
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
          </Form.Group>*/}

        <Form.Group className="form-group">
          <Form.Label htmlFor="">
            Country <span>*</span>
          </Form.Label>
          {userInputs?.irt &&
          (userInputs?.irt == 1 || userInputs?.irt == "Yes") ? (
            <>
              <Select
                options={irtCountry}
                value={
                  irtCountry?.findIndex(
                    (e) => e.value == userInputs?.country
                  ) == -1
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
            </>
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
                      // to="/readers-view"
                      to={state.status === '1' ? "/new-readers-reviews" : "/readers-view"}
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
                  <div className="header-btn justify-content-end align-items-center">
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
                  {/* {!(groupId == 3 && flag == 0 && pharmaData == 1) ? (
                    <Button
                      className="btn-bordered"
                      type="file"
                      // onClick={handleShow}
                    >
                      Upload Excel File
                    </Button>
                  ) : (
                    ""
                  )} */}
                </div>
                <Row>
                  <Col md="7">
                    {userInputs ? (
                      <>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">
                            First name <span>*</span>
                          </Form.Label>
                          <input
                            type="text"
                            className={
                              error?.firstName
                                ? "form-control error"
                                : "form-control"
                            }
                            name="firstName"
                            defaultValue={userInputs?.firstName}
                            ref={nameRef}
                            placeholder="First name"
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
                            className="form-control"
                            name="middleName"
                            defaultValue={userInputs?.middleName}
                            placeholder="Middle name"
                            onChange={(e) => handleChange(e)}
                          />
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">
                            Last name  {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
                            ||localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==")
                            ?<span>*</span>:null}
                          </Form.Label>
                          <input
                            type="text"
                            className={
                              error?.lastName
                                ? "form-control error"
                                : "form-control"
                            }
                            name="lastName"
                            value={userInputs?.lastName}
                            placeholder="Last name"
                            onChange={(e) => handleChange(e)}
                          />
                           {error?.lastName ? (
                            <div className="login-validation">
                              {error?.lastName}
                            </div>
                          ) : (
                            ""
                          )}
                        </Form.Group>
                        <Form.Group className="form-group">
                          <Form.Label htmlFor="">
                            Primary email <span>*</span>
                          </Form.Label>
                          <input
                            readOnly
                            type="email"
                            className={
                              error?.email
                                ? "form-control error"
                                : "form-control"
                            }
                            placeholder="example@email.com"
                            name="email"
                            ref={emailRef}
                            defaultValue={userInputs?.email}
                            // onInput={(e) => handleChange(e)}
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
                          <Form.Label htmlFor="">Primary phone</Form.Label>
                          <Select
                            options={countryCode}
                            className="dropdown-basic-button split-button-dropup"
                            isClearable
                            placeholder="code"
                            defaultValue={{
                              label: userInputs?.countryCode,
                            }}
                            // defaultValue={{
                            //   label: userInputs?.countryCode,
                            //   value: countryCode?.filter((item) => {
                            //     if (item?.label == userInputs?.countryCode) {
                            //       return item?.value;
                            //     }
                            //   }),
                            // }}
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
                          value={{
                            label: userInputs?.country,
                            value: userInputs?.country,
                          }}
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

                    {userInputs ? (
                      <>
                        {groupId == 3 && flag == 1 ? (
                          <>
                            <Form.Group className="form-group">
                              <Form.Label htmlFor="">Site number </Form.Label>
                              <Select
                                options={userDetail?.siteNumber}
                                noOptionsMessage={() =>
                                  userInputs?.country == ""
                                    ? "Please select country first"
                                    : "No options"
                                }
                                defaultValue={{
                                  label: userInputs?.siteNumber,
                                  value: userInputs?.siteNumber,
                                }}
                                value={
                                  userDetail?.siteNumber.findIndex(
                                    (el) => el.value == userInputs?.siteNumber
                                  ) == -1
                                    ? ""
                                    : userDetail?.siteNumber[
                                        userDetail?.siteNumber.findIndex(
                                          (el) =>
                                            el.value == userInputs?.siteNumber
                                        )
                                      ]
                                }
                                placeholder="Select Site Number"
                                name="siteNumber"
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                                onChange={(e) =>
                                  handleChange(e?.value, "siteNumber")
                                }
                              />
                            </Form.Group>

                            <Form.Group className="form-group">
                              <Form.Label htmlFor="">Site name </Form.Label>
                              <Select
                                options={userDetail?.siteName}
                                noOptionsMessage={() =>
                                  userInputs?.country == ""
                                    ? "Please select country first"
                                    : "No options"
                                }
                                defaultValue={{
                                  label: userInputs?.siteName,
                                  value: userInputs?.siteName,
                                }}
                                value={
                                  userDetail?.siteName.findIndex(
                                    (el) => el.value == userInputs?.siteName
                                  ) == -1
                                    ? ""
                                    : userDetail?.siteName[
                                        userDetail?.siteName.findIndex(
                                          (el) =>
                                            el.value == userInputs?.siteName
                                        )
                                      ]
                                }
                                placeholder="Select Site Name "
                                name="siteName"
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                                onChange={(e) =>
                                  handleChange(e?.value, "siteName")
                                }
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

                    {userInputs ? (
                      <>
                        {groupId == 2 ||
                        (groupId == 3 && flag == 0 && pharmaData == 0) ? (
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="">Province</Form.Label>
                            <Select
                              options={userDetail?.province}
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
                            <div className="add_product">
                              <span>&nbsp;</span>
                              <Button
                                className="btn-bordered btn-voilet"
                                onClick={(e) =>
                                  addNewProductClicked("province", e)
                                }
                              >
                                Add New Province +
                              </Button>
                            </div>
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
                                // defaultValue={{
                                //   label: userInputs?.hospital,
                                //   value: userInputs?.hospital,
                                // }}
                                value={
                                  userInputs?.hospital
                                    ? {
                                        label: userInputs?.hospital,
                                        value: userInputs?.hospital,
                                      }
                                    : Object.keys(
                                        userInputs?.hospitalData || {}
                                      )?.length
                                    ? userInputs.hospitalData
                                    : ""
                                }
                                className="dropdown-basic-button split-button-dropup"
                                isClearable
                                onChange={(e) =>
                                  handleChange(e?.value, "hospital")
                                }
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
                                  // defaultValue={userInputs?.ibu}
                                  defaultValue={
                                    userDetail?.ibu?.length
                                      ? userDetail?.ibu[
                                          userDetail?.ibu?.findIndex(
                                            (el) => el.value == userInputs?.ibu
                                          )
                                        ]
                                      : ""
                                  }
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
                            {/* {groupId == 3 && flag == 0 && pharmaData == 0 ? (
                              <Form.Group className="form-group">
                                <Form.Label htmlFor="">
                                  Select User Type
                                </Form.Label>
                                <Select
                                  options={userDetail?.userType}
                                  defaultValue={userInputs?.userType}
                                  placeholder="Select province"
                                  name="userType"
                                  className="dropdown-basic-button split-button-dropup"
                                  isClearable
                                  onChange={(e) =>
                                    handleChange(e?.value, "UserType")
                                  }
                                />
                              </Form.Group>
                            ) : (
                              ""
                            )} */}

                            <Form.Group className="form-group">
                              <Form.Label htmlFor="">Rep contact</Form.Label>
                              <input
                                type="text"
                                defaultValue={userInputs?.repContact}
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
                              defaultValue={userDetail?.userType?.find(
                                (item) => item.label == userInputs?.userType
                              )}
                              placeholder="Select user type"
                              name="userType"
                              className="dropdown-basic-button split-button-dropup"
                              isClearable
                              onChange={(e) =>
                                handleChange(e?.value, "userType")
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
          footerButton={commonFooter}
        />
      </Col>
    </>
  );
};

export default ReaderLayout;
