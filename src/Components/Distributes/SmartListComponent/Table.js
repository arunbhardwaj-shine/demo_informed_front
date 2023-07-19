import axios from "axios";
import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { popup_alert } from "../../../popup_alert";
import queryString from "query-string";
import { connect } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import DropdownButton from "react-bootstrap/DropdownButton";
import EditCountry from "../../CommonComponent/EditCountry";
import EditContactType from "../../CommonComponent/EditContactType";
import Select, { createFilter } from "react-select";
const Table = (props, ref) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const filterConfig = {
    matchFrom: "start",
  };
  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //let validator = new SimpleReactValidator();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const queryParams = queryString.parse(window.location.search);
  const [validator] = React.useState(new SimpleReactValidator());
  const [validator2] = React.useState(new SimpleReactValidator());
  const [validator3] = React.useState(new SimpleReactValidator());
  const [isOpen, setIsOpen] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [deleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [profileUserId, setProfileUserId] = useState();
  const [data, setData] = useState(0);
  const [manualReRender, setManualReRender] = useState(0);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [fileValidationMessage, setFileValidationMeassage] = useState(0);
  const [emailData, setEmailData] = useState("");
  const [activeManual, setActiveManual] = useState("active");
  const [sorting, setSorting] = useState(0);
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [activeExcel, setActiveExcel] = useState("");
  const [name, setName] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [company, setCompany] = useState(null);
  const [indication, setIndication] = useState(null);
  const [product, setProduct] = useState(null);
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState(null);
  const [updateData, setUpdatedData] = useState(null);
  const [editList, setEditList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [counterFlag, setCounterFlag] = useState(0);
  const [getlistid, setListId] = useState("");
  const [getlistname, setListName] = useState("");
  const [getsortflag, setsortflag] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [update, setUpdate] = useState(0);
  const [render, setReRender] = useState(0);
  const [show, setShow] = useState(false);
  const [renderCounterData, setCounterData] = useState([]);
  const [editable, setEditable] = useState(0);
  const [validator3Counter, setValidator3Counter] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [counter, setCounter] = useState([0]);
  const [saveOpen, setSaveOpen] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [getNewReaders, setNewReaders] = useState([]);
  const [emailChanged, setEmailChanged] = useState("");
  const [getStorageState, setStorageState] = useState(false);
  let file_name = useRef("");
  const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");

  const [siteStreetAll, setSiteStreetAll] = useState([]);
  const [siteCityAll, setSiteCityAll] = useState([]);
  const [sitePostalCodeAll, setSitePostCodeAll] = useState([]);
  const [change, setChanges] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [siteIrtAll, setSiteIrtAll] = useState([]);
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [siteNumberAll, setSiteNumberAll] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);
  const [userTypeAll, setUserTypeAll] = useState([]);
  const [subUserTypeAll, setSubUserTypeAll] = useState([]);
  const [blindTypeAll, setBlindTypeAll] = useState([]);
  const [forceRender, setForceRender] = useState(false);
  const [siteData, setSiteData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [showReaders, setShowSaveReader] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      axiosFun();
    }
    const getalCountry = async () => {
      let body = {
        user_id: localStorage.getItem("user_id"),
      };
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            let user_type;
            let sub_role;
            let blind_type;
            let arrUserType;
            let arrSubRole;
            let arrBlindType;
            let site_number;
            let arrSiteNumber;
            let country = res.data.response.data.country;
            let site_name;
            let arrSiteName;
            let site_street;
            let arrSiteStreet;
            let site_postcode;
            let site_city;
            let arrSiteCity;
            let arrSitePostCode;
            let arrSiteIrt;
            let irt_user_type;
            let arrIrtUserType = [];

            let arr = [];

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              user_type = res.data.response.data.investigator_type;
              sub_role = res.data.response.data.sub_role;
              blind_type = res.data.response.data.blind_type;
              site_number = res.data.response.data.site_number;
              site_name = res.data.response.data.site_name;
              site_street = res.data.response.data.site_street;
              site_postcode = res.data.response.data.site_post_code;
              site_city = res.data.response.data.site_city;
              irt_user_type = res?.data?.response?.data?.irt_inverstigator_type;

              arrUserType = [];
              arrSubRole = [];
              arrBlindType = [];
              arrSiteNumber = [];
              arrSiteName = [];
              arrSiteStreet = [];
              arrSitePostCode = [];
              arrSiteCity = [];
              arrSiteIrt = [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ];
            }

            //  const data = Object.assign({}, res.data.response.data.blind_type);

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

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              Object.entries(site_number).map(([index, item]) => {
                let label = item;

                arrSiteNumber.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_street).map(([index, item]) => {
                let label = item;

                arrSiteStreet.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_city).map(([index, item]) => {
                let label = item;

                arrSiteCity.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_postcode).map(([index, item]) => {
                let label = item;

                arrSitePostCode.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_name).map(([index, item]) => {
                let label = item;

                arrSiteName.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(user_type).map(([index, item]) => {
                let label = item;

                arrUserType.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(sub_role).map(([index, item]) => {
                let label = item;
                arrSubRole.push({
                  value: item,
                  label: label,
                });
              });
              Object.entries(blind_type).map(([index, item]) => {
                let label = item;

                arrBlindType.push({
                  value: item,
                  label: label,
                });
              });
              Object.entries(irt_user_type)?.map(([item, index]) => {
                arrIrtUserType.push({
                  label: item,
                  value: item,
                });
              });
            }

            setCountryall(arr);
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              setIrtRole(arrIrtUserType);
              setUserTypeAll(arrUserType);
              setSubUserTypeAll(arrSubRole);
              setSiteNumberAll(arrSiteNumber);
              setSiteNameAll(arrSiteName);
              setSiteStreetAll(arrSiteStreet);
              setSitePostCodeAll(arrSitePostCode);
              setSiteCityAll(arrSiteCity);
              setSiteIrtAll(arrSiteIrt);
              setBlindTypeAll(arrBlindType);
              setSiteData(res.data.response.data.site_data);
              setChanges(res.data.response.data);
            }

            // setCountryall(res.data.response.data.country);
          }
          // let country_opt = res.data.response.data.country;
          // var country_options = "<option>Select Country</option>";
          //   Object.entries(country_opt).map((item) => {
          //     let opt = "<option>"+item[0]+"</option>";
          //     country_options = country_options+opt;
          //   });
          //
          //   let x=document.querySelectorAll(".country-form_edit");  // Find the elements
          //     [].forEach.call(x, function(op) {
          //       op.innerHTML = country_options;
          //       op.value = op.getAttribute("data-id");
          //     });
          //     loader("hide");
        })
        .catch((err) => {
          //console.log(err);
        });
    };
    getalCountry();
  }, []);


  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
      siteIrt:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.find(item =>item?.value == "Yes")?.value:"",
      siteIrtIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.findIndex(item =>item?.value == "Yes"):"",
         userType:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?irtRole?.[0]?.value:"",
      userTypeIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?0:"",
    },
  ]);

  const axiosFun = async () => {
    try {
      const result = await axios.get(`emailapi/get_site`);

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
  const onUserTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].userType = "";
      list[i].userTypeIndex = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].userType;
      list[i].userType = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].userTypeIndex = index;
      setHpc(list);
    }
  };

  const onSubUserTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].subUserType = "";
      list[i].subUserType = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].subUserType;
      list[i].subUserType = value;

      let index = subUserTypeAll.findIndex((x) => x.value === value);
      list[i].subUserTypeIndex = index;
      setHpc(list);
    }
  };

  const onSiteNumberChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteNumber = "";
      setHpc(list);
    } else {
      let getSiteData = siteData;
      let site_name_value = getSiteData[e.value];
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteNumber;
      list[i].siteNumber = value;
      list[i].siteName = site_name_value;

      let snameindex = siteNameAll.findIndex(
        (x) => x.value === site_name_value
      );
      list[i].siteNameIndex = snameindex;

      let index = siteNumberAll.findIndex((x) => x.value === value);
      list[i].siteNumberIndex = index;
      setHpc(list);
    }
    // e.preventDefault();
    // if (index != 0) {
    //   const { value } = e.target;
    //   const old_hpc = hpc;
    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);
    //   setUpdate(update + 1);
    // } else if (index == 0) {
    //   const { value } = e;
    //   const old_hpc = hpc;
    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);
    //   setUpdate(update + 1);
    // }
  };
  const onSiteNameChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteName = "";
      setHpc(list);
    } else {
      const value = e.value;
      let getSiteData = siteData;
      let site_number_value = Object.keys(getSiteData).find(
        (key) => getSiteData[key] === e.value
      );

      const list = [...hpc];
      const name = hpc[i].siteName;
      list[i].siteName = value;
      list[i].siteNumber = site_number_value;

      let snameindex = siteNumberAll.findIndex(
        (x) => x.value === site_number_value
      );
      list[i].siteNumberIndex = snameindex;

      let index = siteNameAll.findIndex((x) => x.value === value);
      list[i].siteNameIndex = index;
      setHpc(list);
    }
  };
  const onSiteIrtChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteIrt = "";
      list[i].siteIrt = "";
      list[i].userType = "";
      list[i].userTypeIndex = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteIrt;
      list[i].siteIrt = value;

      let index = siteIrtAll.findIndex((x) => x.value === value);
      list[i].siteIrtIndex = index;
      list[i].userType = "";
      list[i].userTypeIndex = "";
      list[i].country = "";
      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      setHpc(list);
    }
    let arr = [];
    setSiteNumberAll(arr);
    setSiteNameAll(arr);
    setForceRender(!forceRender);
  };
  const onBlindTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].blindType = "";
      list[i].blindType = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].blindType;
      list[i].blindType = value;

      let index = blindTypeAll.findIndex((x) => x.value === value);
      list[i].blindTypeIndex = index;
      setHpc(list);
    }
  };

  const [countryall, setCountryall] = useState([]);

  const [editableData, setEditableData] = useState([]);

  useImperativeHandle(
    ref,
    () => ({
      createSmartList(dd, newReaders, flag) {
        showFileInReadersList(dd, newReaders, flag);
      },
    }),
    []
  );

  useEffect(() => {
    var x = localStorage.getItem("sd_i");
    if (x) {
      setStorageState(true);
    } else {
      setStorageState(false);
    }

    setUpdatedData(props.data);
    setEditList(props.data);
    // if(typeof props.data != "undefined" && props.data.length > 0){
    // }
    if (typeof props.listId != "undefined" && props.listId != "") {
      setListId(props.listId);
    } else {
      setListId(queryParams.listId);
    }
    if (
      typeof props.smartListName != "undefined" &&
      props.smartListName != ""
    ) {
      setListName(props.smartListName);
    }

    if (
      typeof props.newAddedUser != "undefined" &&
      props.newAddedUser.length > 0
    ) {
      setNewReaders(props.newAddedUser);
    }
  }, [props.data]);

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getalCountry = async () => {
      const body = {
        user_id: localStorage.getItem("user_id"),
      };
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            let country = res.data.response.data.country;
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
            setCountryall(arr);
          }
          // setCountryall(res.data.response.data.country);
          // console.log(countryall);
          // setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getalCountry();
  }, []);

  const handleClose = () => {
    setShow(false);
    setCounter([0]);
    setCounterData([]);
  };
  const handleShow = () => {
    setIsOpenAdd(true);
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
        countryIndex: "",
        userType:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?irtRole?.[0]?.value:"",
        userTypeIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?0:"",
        siteIrt:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.find(item =>item?.value == "Yes")?.value:"",
        siteIrtIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.findIndex(item =>item?.value == "Yes"):"",
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
  };
  const handleCloseUploadMenu = () => setShowUploadMenu(false);
  const handleShowUploadMenu = () => {
    setShowUploadMenu(true);
    setShow(false);
  };

  let combine_data;
  let combine_data_manual;

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();

    setShowLessInfo(!showLessInfo);
  };

  const editButtonClicked = () => {
    if (editable == 1) {
      setSaveOpen(false);
    } else {
      setSaveOpen(true);
    }
    let temp_val = 1 - editable;
    setEditable(temp_val);
    setUpdate(update + 1);
  };

  const uploadFile = async (event) => {
    if (validator2.allValid()) {
      setShowUploadMenu(!showUploadMenu);

      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", getlistid);
      formData.append("reader_file", selectedFile);

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`distributes/update_reader_list`, formData)
        .then((res) => {
          let old_data = editList;
          let new_data = res.data.response.data[0];

          combine_data = [new_data, ...old_data];
          // console.log(combine_data);
          setEditList(combine_data);
          props.sendDataToParent(combine_data, "existing");
          setUpdatedData(combine_data);
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(validator2.errorMessages);
      validator2.showMessages();
      setFileValidationMeassage(fileValidationMessage + 1);
    }
  };

  // const showSucessPopup = () => {
  //   popup_alert({
  //     visible: "show",
  //     message: "The HCP record has been deleted successfully.",
  //     type: "success",
  //     redirect: "",
  //   });
  //
  //   setOpenDeleteConfirmation(false);
  // };

  const editing = (
    profile_id,
    profile_user_id,
    email,
    jobTitle,
    company,
    country,
    names,
    index,
    contact_type
  ) => {
    if (editable != 0) {
      const name_edit = document.getElementById(
        "field_name" + profile_user_id
      ).innerText;
      const country_edit = document.getElementById(
        "field_country" + profile_user_id
      ).value;
      const contact_type_edit = document.getElementById(
        "field_contact_type" + profile_user_id
      ).value;

      const arr = [];
      arr.push({
        profile_id: profile_id,
        profile_user_id: profile_user_id,
        email: email,
        jobTitle: jobTitle,
        company: company,
        country: country_edit,
        username: name_edit,
        contact_type: contact_type_edit,
      });
      let prev_obj = editableData.find(
        (x) => x.profile_user_id === profile_user_id
      );
      if (typeof prev_obj != "undefined") {
        //update existing
        editableData.map(
          (obj) => arr.find((o) => o.profile_user_id === profile_user_id) || obj
        );
      } else {
        //create new
        setEditableData((oldArray) => [...oldArray, ...arr]);
      }
    }
  };

  const showFileInReadersList = async (fdata, newReaders, flag) => {
    let body = {};
    if (typeof editList != "undefined" && editList.length > 0) {
      //for Normal flow
      const profile_user_id_array = editList.map((data) => {
        return data.profile_user_id;
      });

      const new_user_id_array = getNewReaders.map((data) => {
        return data.profile_user_id;
      });

      body = {
        user_list: profile_user_id_array,
        smart_list_id: typeof getlistid !== "undefined" ? getlistid : "",
        user_id: localStorage.getItem("user_id"),
        smart_list_name: getlistname,
        submit_type: props.upload_by_filter,
        new_users_list: new_user_id_array,
        creator_name: typeof props.creator !== "undefined" ? props.creator : "",
      };
    } else if (
      typeof props != "undefined" &&
      props.hasOwnProperty("data") &&
      props.data.length > 0
    ) {
      //Parent Child FLow
      const profile_user_id_array = fdata.map((data) => {
        return data.profile_user_id;
      });

      const new_user_id_array = newReaders.map((data) => {
        return data.profile_user_id;
      });
      body = {
        user_list: profile_user_id_array,
        smart_list_id:
          typeof queryParams.listId !== "undefined" ? queryParams.listId : "",
        user_id: localStorage.getItem("user_id"),
        smart_list_name: props.smartListName,
        submit_type: props.upload_by_filter,
        new_users_list: new_user_id_array,
        creator_name: typeof props.creator !== "undefined" ? props.creator : "",
      };
    }

    if (props.upload_by_filter == 1) {
      if (typeof props.filter_payload === "object") {
        Object.assign(body, { filters: props.filter_payload });
      }
    }
    // console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/add_update_list`, body)
      .then((res) => {
        loader("hide");
        if (res.data.status_code == 200) {
          if (flag == "update") {
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: "/SmartList",
            });
          } else {
            var path = "";
            var x = localStorage.getItem("sd_i");
            if (x) {
              localStorage.removeItem("sd_i");
              path = "/SelectSmartList";
            } else {
              path = "/SmartList";
            }
            popup_alert({
              visible: "show",
              message: "Your smart list has been created <br />successfully !",
              type: "success",
              redirect: path,
            });
          }
        } else {
          toast.warning(res.data.message);
          loader("hide");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   *
   * @param id - The id of the product
   * @param currentUnitPrice - The current unit price of the product
   */
  const onEdit = ({
    id,
    currentName,
    currentJobTitle,
    currentCompany,
    currentIndication,
    currentProduct,
    currentCountry,
    currentEmail,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setName(currentName);
    setJobTitle(currentJobTitle);
    setCompany(currentCompany);
    setIndication(currentIndication);
    setProduct(currentProduct);
    setCountry(currentCountry);
    setEmail(currentEmail);
  };

  /**
   *
   * @param id
   * @param newUnitPrice
   */

  /**
   *
   * @param id -The id of the product
   * @param newUnitPrice - The new unit price of the product
   */

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    //  console.log("hi");
    setName(null);
    setJobTitle(null);
    setCompany(null);
    setIndication(null);
    setProduct(null);
    setCountry(null);
    setEmail(null);
  };

  const deleteRecord = (i) => {
    //  console.log(hpc);
    const list = hpc;
    // console.log(list);
    list.splice(i, 1);
    // console.log("list after splice");
    // console.log(list);
    // console.log(typeof list);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const addHcp = (e) => {
    e.preventDefault();
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const verifyUser = () => {
    // console.log(props);
    // console.log("0123");
  };

  const addFile = (e) => {
    e.preventDefault();
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
  };

  const saveEditClicked = async () => {
    setEditable(0);

    if (editableData.length > 0) {
      editableData.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data.profile_user_id
        ).innerText;
        const country_edit = document.getElementById(
          "field_country" + data.profile_user_id
        ).value;
        const edit_index = document.getElementById(
          "field_index" + data.profile_user_id
        ).value;
        const contact_type_edit = document.getElementById(
          "field_contact_type" + data.profile_user_id
        ).value;

        let prev_obj = editList.find(
          (x) => x.profile_user_id === data.profile_user_id
        );
        if (typeof prev_obj != "undefined") {
          if (typeof editList[edit_index] != "undefined") {
            editList[edit_index].country = country_edit;
          }
          if (typeof editList[edit_index] != "undefined") {
            editList[edit_index].contact_type = contact_type_edit;
          }
        } else {
          if (typeof getNewReaders[edit_index] != "undefined") {
            getNewReaders[edit_index].country = country_edit;
          }
          if (typeof getNewReaders[edit_index] != "undefined") {
            getNewReaders[edit_index].contact_type = contact_type_edit;
          }
        }

        data.country = country_edit;
        data.username = name_edit;
        data.contact_type = contact_type_edit;
      });

      const body = {
        user_id: localStorage.getItem("user_id"),
        edit_list_array: editableData,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`distributes/update_reders_details`, body)
        .then((res) => {
          loader("hide");
          if (res.data.status_code === 200) {
            toast.success("List updated");
          } else {
            popup_alert({
              visible: "show",
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          loader("hide");
          toast.error("Something went wrong");
        });
      setSaveOpen(false);
      setEditableData([]);
    } else {
      setSaveOpen(false);
      toast.warning("No row update");
    }
  };

  const closeClicked = () => {
    setSaveOpen(false);
    setEditable(0);
    let vr = editList;
    setEditList([]);
    setTimeout(() => {
      setEditList(vr);
      console.log("This will run after 1 second!");
      setUpdateCounter(updateCounter + 1);
    }, 50);
  };

  const updateReaderDetails = async ({
    profile_id,
    newName,
    email,
    jobTitle,
    company,
    country,
    profile_user_id,
  }) => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      profile_user_id: profile_user_id,
      profile_id: profile_id,
      email: email,
      jobTitle: jobTitle,
      company: company,
      country: country,
      username: name,
    };
    loader("show");
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/update_reders_details`, body)
      .then((res) => {
        // console.log(props);

        // console.log(res);
        onCancel();

        // editList[0].email = email;
        var result = editList.filter((obj) => {
          return obj.profile_user_id === body.profile_user_id;
        });

        if (result) {
          var first_name = body.username.substring(
            0,
            body.username.lastIndexOf(" ") + 1
          );
          var last_name = body.username.substring(
            body.username.lastIndexOf(" ") + 1,
            body.username.length
          );

          result[0].email = body.email;
          result[0].country = body.country;
          result[0].company = body.company;
          result[0].jobTitle = body.jobTitle;
          result[0].first_name = first_name;
          result[0].last_name = last_name;

          const index = editList.findIndex(
            (el) => el.profile_user_id === result.profile_user_id
          );
        }
        setReRender(render + 1);
        loader("hide");
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      });
  };

  const addMoreHcp = () => {
    console.log(hpc);

    const status = hpc.map((data) => {
      if (data.email == "") {
        return "false";
      } else {
        return "true";
      }
    });

    if (status.every((element) => element == "true")) {
      setHpc([
        ...hpc,
        {
          firstname: "",
          lastname: "",
          email: "",
          contact_type: "",
          country: "",
          countryIndex: "",
          userType:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?irtRole?.[0]?.value:"",
          userTypeIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?0:"",
          siteIrt:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.find(item =>item?.value == "Yes")?.value:"",
          siteIrtIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.findIndex(item =>item?.value == "Yes"):"",
        },
      ]);
    } else {
      toast.warning("Please input the email atleast");
    }
  };

  const onSave = ({
    profile_id,
    newName,
    email,
    jobTitle,
    company,
    country,
    profile_user_id,
  }) => {
    if (validator3.allValid()) {
      updateReaderDetails({
        profile_id,
        newName,
        email,
        jobTitle,
        company,
        country,
        profile_user_id,
      });
    } else {
      console.log("validator3");
      console.log(validator3);
      console.log(validator3.errorMessages);
      // validator3.showMessages();
      //setValidator3Counter(validator3Counter + 1);
    }
  };

  const deleteReader = (profile_user_id) => {
    const filtered_list = editList.filter((data) => {
      return data.profile_user_id != profile_user_id;
    });

    setEditList(filtered_list);
    props.sendDataToParent(filtered_list, "existing");
    popup_alert({
      visible: "show",
      message: "The HCP record has been deleted </br>successfully !",
      type: "success",
      redirect: "",
    });

    // const body = {
    //   user_list: filtered_list.map((data) => {
    //     return data.profile_user_id;
    //   }),
    //   smart_list_id: getlistid,
    //   user_id: localStorage.getItem("user_id"),
    // };
  };

  const onDelete = async ({
    profile_id,
    newName,
    email,
    jobTitle,
    company,
    country,
    profile_user_id,
  }) => {
    let temp_len = parseInt(editList.length) + parseInt(getNewReaders.length);

    if (temp_len > 1) {
      setIsOpen(true);
      setProfileUserId(profile_user_id);
    } else {
      popup_alert({
        visible: "show",
        message: "Please keep atleast one reader or delete the smart list",
        type: "error",
        redirect: "",
      });
    }
  };

  const onFirstNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].firstname;
    list[i].firstname = value;
    setHpc(list);
  };

  const onLastNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].lastname;
    list[i].lastname = value;
    setHpc(list);
  };

  const onEmailChange = (e, i) => {
    const { value } = e.target;
    setEmailChanged(value);
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    setEmailData(e.target.value);
  };

  const onContactTypeChange = (e, i) => {
    const value = e;
    const list = [...hpc];
    const name = hpc[i].contact_type;
    list[i].contact_type = value;
    setHpc(list);
  };

  const onCountryChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].country = "";
      list[i].countryIndex = "";
      setHpc(list);
    } else {
      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==") {
        let consetValue = e.value;
        if (e.value == "B&H") {
          consetValue = "Bosnia and Herzegovina";
        }

        const matchingKeys = Object.entries(change.site_country_data)
          .filter(([key, value]) => value === consetValue)
          .map(([key, value]) => key);

        const filteredSiteNames = matchingKeys.map((key) => ({
          label: change.site_data[key],
          value: change.site_data[key],
        }));
        const siteNumbers = matchingKeys.map((key) => ({
          label: key,
          value: key,
        }));

        setSiteNumberAll(siteNumbers);
        setSiteNameAll(filteredSiteNames);
      }
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].country;
      list[i].country = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].countryIndex = index;
      setHpc(list);
    }
  };

  const backClicked = () => {
    console.log("back clicked");
    props.api_flag(0);
  };
  const saveClickedRd = async () => {
    // setShowSaveReader(true);

    // setIsOpenAdd(false);

    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        return {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          country: data.country,
          contact_type: data.contact_type,
          investigator_type: data.userType ? data.userType : "",
          sub_roll: data.subUserType ? data.subUserType : "",
          blind_type: data.blindType ? data.blindType : "",
          siteNumber: data.siteNumber ? data.siteNumber : "",
          siteName: data.siteName ? data.siteName : "",
          siteStreet: data.siteStreet ? data.siteStreet : "",
          sitePostalCode: data.sitePostCode ? data.sitePostCode : "",
          siteCity: data.siteCity ? data.siteCity : "",
          siteIrt:
            data.siteIrt == "Yes" ? 1 : data.siteIrt == "Training" ? 2 : 0,
        };
      });
// console.log(body_data);
      const body = {
        data: body_data,
        user_id: localStorage.getItem("user_id"),
        smart_list_id: getlistid,
      };

      const status = body.data.map((data) => {
        // let validRegex =
        //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (data.email == "") {
          return "Please enter the email atleast";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = editList.find((x) => x.email === useremail);
            if (typeof prev_obj != "undefined") {
              return "User with same email already added in list.";
            } else {
              return "true";
            }

            return "true";
          } else {
            return "Email format is not valid";
          }
        } else {
          return "true";
        }
      });

      if (status.every((element) => element == "true")) {
        loader("show");
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        console.log("b")
        await axios
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              let old_data = editList;

              let new_data = res.data.response.data;
              if (typeof getNewReaders != "undefined") {
                let added_prev_readers_array = getNewReaders;
                let combine_new_readers_array = [
                  ...new_data,
                  ...added_prev_readers_array,
                ];
                setNewReaders(combine_new_readers_array);
                props.sendDataToParent(combine_new_readers_array, "new");
              }
              combine_data_manual = [...new_data, ...old_data];

              setEditList(old_data);
              props.sendDataToParent(old_data, "existing");
              setUpdatedData(old_data);
              setIsOpen(false);
              setIsOpenAdd(false);
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
      } else {
        toast.warning(status[0]);
      }

      //setIsOpen(false);
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", getlistid);
      formData.append("reader_file", selectedFile);

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      if (selectedFile) {
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              let old_data = editList;
              let new_data = res.data.response.data;
              if (typeof getNewReaders != "undefined") {
                let added_prev_readers_array = getNewReaders;
                let combine_new_readers_array = [
                  ...new_data,
                  ...added_prev_readers_array,
                ];
                setNewReaders(combine_new_readers_array);
                props.sendDataToParent(combine_new_readers_array, "new");
              }
              combine_data = [...new_data, ...old_data];
              // console.log(combine_data);
              setEditList(old_data);
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              props.sendDataToParent(old_data, "existing");
              setUpdatedData(old_data);
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
        setIsOpen(false);
      } else {
        toast.warning("Please add a excel file");
      }
    }
  };
  const saveClicked = async () => {
    // setShowSaveReader(true);

    // setIsOpenAdd(false);

    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        return {
          first_name: data.firstname,
          last_name: data.lastname,
          email: data.email,
          country: data.country,
          contact_type: data.contact_type,
        };
      });

      const body = {
        data: body_data,
        user_id: localStorage.getItem("user_id"),
        smart_list_id: getlistid,
      };

      const status = body.data.map((data) => {
        // let validRegex =
        //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (data.email == "") {
          return "Please enter the email atleast";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = editList.find((x) => x.email === useremail);
            if (typeof prev_obj != "undefined") {
              return "User with same email already added in list.";
            } else {
              return "true";
            }

            return "true";
          } else {
            return "Email format is not valid";
          }
        } else {
          return "true";
        }
      });

      if (status.every((element) => element == "true")) {
        loader("show");
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        await axios
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              let old_data = editList;

              let new_data = res.data.response.data;
              if (typeof getNewReaders != "undefined") {
                let added_prev_readers_array = getNewReaders;
                let combine_new_readers_array = [
                  ...new_data,
                  ...added_prev_readers_array,
                ];
                setNewReaders(combine_new_readers_array);
                props.sendDataToParent(combine_new_readers_array, "new");
              }
              combine_data_manual = [...new_data, ...old_data];

              setEditList(old_data);
              props.sendDataToParent(old_data, "existing");
              setUpdatedData(old_data);
              setIsOpen(false);
              setIsOpenAdd(false);
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
      } else {
        toast.warning(status[0]);
      }

      //setIsOpen(false);
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", getlistid);
      formData.append("reader_file", selectedFile);

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      if (selectedFile) {
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              let old_data = editList;
              let new_data = res.data.response.data;
              if (typeof getNewReaders != "undefined") {
                let added_prev_readers_array = getNewReaders;
                let combine_new_readers_array = [
                  ...new_data,
                  ...added_prev_readers_array,
                ];
                setNewReaders(combine_new_readers_array);
                props.sendDataToParent(combine_new_readers_array, "new");
              }
              combine_data = [...new_data, ...old_data];
              // console.log(combine_data);
              setEditList(old_data);
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              props.sendDataToParent(old_data, "existing");
              setUpdatedData(old_data);
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
        setIsOpen(false);
      } else {
        toast.warning("Please add a excel file");
      }
    }
  };
  // const sortdata = () => {
  //   setsortflag((getsortflag) => !getsortflag);
  //   if (getsortflag) {
  //     let sortedData = editList.sort((a, b) =>
  //       a.first_name > b.first_name ? 1 : -1
  //     );
  //     setEditList(sortedData);
  //     props.sendDataToParent(sortedData);
  //   } else {
  //     let sortedData = editList.sort((a, b) =>
  //       a.first_name < b.first_name ? 1 : -1
  //     );
  //     setEditList(sortedData);
  //     props.sendDataToParent(sortedData);
  //   }
  // };

  const sortSelectedUsers = () => {
    console.log("hi");
    //console.log(readers);
    let normalArr = [];
    normalArr = editList;
    if (sorting === 0) {
      normalArr.sort((a, b) =>
        a.first_name.toLowerCase() > b.first_name.toLowerCase()
          ? 1
          : b.first_name.toLowerCase() > a.first_name.toLowerCase()
          ? -1
          : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.first_name.toLowerCase() < b.first_name.toLowerCase()
          ? 1
          : b.first_name.toLowerCase() < a.first_name.toLowerCase()
          ? -1
          : 0
      );
    }

    setEditList(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const deleteNewlyAdded = (profile_user_id) => {
    const data = getNewReaders;
    let temp_len = parseInt(editList.length) + parseInt(getNewReaders.length);

    if (temp_len > 1) {
      setIsOpen(true);
      const dataUpdated = data.filter((d) => {
        return d.profile_user_id != profile_user_id;
      });
      props.sendDataToParent(dataUpdated, "new");
      setNewReaders(dataUpdated);
    } else {
      popup_alert({
        visible: "show",
        message: "Please keep atleast one reader or delete the smart list",
        type: "error",
        redirect: "",
      });
    }
  };

  return (
    <>
      {typeof props.upload_by_filter !== "undefined" &&
        props.upload_by_filter == 0 && (
          <div className="page-top-nav smart_list_names">
            <div className="row justify-content-end align-items-center">
              <div className="col-12 col-md-1">
                <div className="header-btn-left">
                  <button className="btn btn-primary btn-bordered back">
                    <Link to={"/CreateSmartList"}>Back</Link>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-8">
                <ul className="tabnav-link">
                  <li className="">
                    <a href="javascript:void(0)">Create smart List</a>
                  </li>
                  <li className="active">
                    <a href="javascript:void(0)">Verify Your List</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-3">
                <div className="header-btn">
                  <button className="btn btn-primary btn-bordered move-draft">
                    <Link to={{ pathname: "/CreateSmartList" }}>Cancel</Link>
                  </button>
                  <button
                    className="btn btn-primary btn-filled create"
                    onClick={showFileInReadersList}
                  >
                    {getStorageState ? "Create & go to email" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      <section className="search-hcp smart-list-view">
        <div className="result-hcp-table">
          <div className="table-title">
            {props.upload_by_filter == 0 ? (
              <h4>
                {localStorage.getItem("user_id") == userId
                  ? "Uploaded Users for the smart list"
                  : "Uploaded HCPs for the smart list"}
                <span>| {editList.length > 0 ? editList.length : 0}</span>
              </h4>
            ) : (
              <h4>Selected HCPs for the smart list</h4>
            )}

            <div className="selected-hcp-table-action">
              {editable == false ? (
                <>
                  {" "}
                  <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p className="show_more">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
                    )}{" "}
                  </a>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-outline-primary"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download "
                  />
                  <div className="hcp-new-user">
                    <button
                      className="btn btn-outline-primary"
                      title="Add new user"
                      onClick={handleShow}
                    >
                      <img src={path + "new-user.svg"} alt="New User" />
                    </button>
                  </div>
                  <div className="hcp-added">
                    <button
                      className="btn btn-outline-primary"
                      title="Edit user"
                      onClick={editButtonClicked}
                    >
                      <img src={path + "edit-button.svg"} alt="Edit" />
                    </button>
                  </div>
                  <div className="hcp-sort">
                    {sortingCount == 0 ? (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          onClick={sortSelectedUsers}
                        >
                          Sort By{" "}
                          <img src={path_image + "sort.svg"} alt="Shorting" />
                        </button>
                      </>
                    ) : sorting == 0 ? (
                      <>
                        <button
                          className="btn btn-outline-primary desc"
                          onClick={sortSelectedUsers}
                        >
                          Sort By{" "}
                          <img
                            src={path_image + "sort-decending.svg"}
                            alt="Shorting"
                          />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-primary asc"
                          onClick={sortSelectedUsers}
                        >
                          Sort By{" "}
                          <img
                            src={path_image + "sort-assending.svg"}
                            alt="Shorting"
                          />
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : null}

              {saveOpen ? (
                <>
                  <button
                    className="btn btn-primary btn-filled"
                    onClick={closeClicked}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary btn-bordered"
                    onClick={saveEditClicked}
                  >
                    Save
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div className="selected-hcp-list">
            <table className="table" id="table-to-xls">
              <thead className="sticky-header">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Bounced</th>
                  <th scope="col">Country</th>
                  {localStorage.getItem("user_id") ==
                  "56Ek4feL/1A8mZgIKQWEqg==" ? (
                    <>
                      <th scope="col">IRT mandatory training</th>
                      <th scope="col">IRT Role</th>
                    </>
                  ) : (
                    <>
                      <th scope="col">Business Unit</th>
                      <th scope="col">Contact Type</th>
                    </>
                  )}

                  {showLessInfo == false ? (
                    <>
                      {" "}
                      <th scope="col">Consent</th>
                      <th scope="col">Email Received</th>
                      <th scope="col">Openings</th>
                      <th scope="col">Registrations</th>
                      <th scope="col">Last Email</th>
                      <th scope="col"></th>{" "}
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders.length > 0 &&
                  getNewReaders.map((item, index) => (
                    <tr
                      key={item}
                      className="hcps-added"
                      id={`row-selected` + index}
                      onClick={(e) =>
                        editing(
                          item.profile_id,
                          item.profile_user_id,
                          item.email,
                          item.jobTitle,
                          item.company,
                          item.country,
                          item.first_name + " " + item.last_name,
                          item.contact_type
                        )
                      }
                    >
                      <td
                        contenteditable={editable === 0 ? "false" : "true"}
                        id={`field_name` + item.profile_user_id}
                      >
                        {inEditMode.status &&
                        inEditMode.rowKey === item.profile_id ? (
                          <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        ) : (
                          item.first_name + " " + item.last_name
                        )}
                      </td>
                      <td>
                        {" "}
                        {inEditMode.status &&
                        inEditMode.rowKey === item.profile_id ? (
                          <input
                            value={email}
                            type="email"
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        ) : (
                          item.email
                        )}
                      </td>
                      <input
                        type="hidden"
                        id={`field_index` + item.profile_user_id}
                        value={index}
                      />
                      <td>{item.bounce}</td>
                      <td>
                        {editable ? (
                          <EditCountry
                            selected_country={item.country}
                            profile_user={item.profile_user_id}
                          ></EditCountry>
                        ) : (
                          <span>{item.country}</span>
                        )}
                      </td>
                      <td>
                        {/*item.ibu*/}
                        {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                          ? item?.irt
                            ? "Yes"
                            : "No"
                          : item.ibu
                          ? item.ibu
                          : "N/A"}
                      </td>
                      <td>
                        {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                          <span>
                            {item.user_type != 0 ? item.user_type : "N/A"}
                          </span>
                        ) : editable ? (
                          <EditContactType
                            selected_ibu={item.contact_type}
                            profile_user={item.profile_user_id}
                          ></EditContactType>
                        ) : (
                          <span>{item.contact_type}</span>
                        )}
                      </td>

                      {showLessInfo == false ? (
                        <td>
                          <span>{item.consent}</span>{" "}
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_received}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_opening}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.registration}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.last_email}</span>
                        </td>
                      ) : null}

                      <td className="delete_row" colspan="12">
                        <img
                          src={path + "delete.svg"}
                          alt="Delete Row"
                          onClick={() => deleteNewlyAdded(item.profile_user_id)}
                        />
                      </td>
                    </tr>
                  ))}
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders.length > 0 && (
                    <tr className="seprator-add">
                      <td colspan="13"></td>
                    </tr>
                  )}
                {typeof editList !== "undefined" &&
                  editList.length > 0 &&
                  editList.map((item, index) => (
                    <tr
                      key={item}
                      id={`row-selected` + index}
                      onClick={(e) =>
                        editing(
                          //  e.currentTarget,
                          item.profile_id,
                          item.profile_user_id,
                          item.email,
                          item.jobTitle,
                          item.company,
                          item.country,
                          item.first_name + " " + item.last_name,
                          item.contact_type
                        )
                      }
                    >
                      <td
                        id={`field_name` + item.profile_user_id}
                        contenteditable={editable === 0 ? "false" : "true"}
                      >
                        <span>{item.first_name + " " + item.last_name}</span>
                      </td>

                      <td id={`field_email` + item.profile_user_id}>
                        {item.email}
                      </td>
                      <input
                        type="hidden"
                        id={`field_index` + item.profile_user_id}
                        value={index}
                      />
                      <td id={`field_bounced` + item.profile_user_id}>
                        {item.bounce}
                      </td>
                      <td>
                        {editable ? (
                          <EditCountry
                            selected_country={item.country}
                            profile_user={item.profile_user_id}
                          ></EditCountry>
                        ) : (
                          <span>{item.country}</span>
                        )}
                      </td>
                      {/*showLessInfo == false ? (
                        <td id="field_readers">NA</td>
                      ) : null*/}
                      <td id="field_business_unit">
                        {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg=="
                          ? item?.irt
                            ? "Yes"
                            : "No"
                          : item.ibu
                          ? item.ibu
                          : "N/A"}
                      </td>
                      <td id="field_interest">
                        {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" ? (
                          <span>
                            {item.user_type != 0 ? item.user_type : "N/A"}
                          </span>
                        ) : editable ? (
                          <EditContactType
                            selected_ibu={item.contact_type}
                            profile_user={item.profile_user_id}
                          ></EditContactType>
                        ) : (
                          <span>{item.contact_type}</span>
                        )}
                      </td>

                      {showLessInfo == false ? (
                        <td>
                          <span>{item.consent}</span>{" "}
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_received}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_opening}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.registration}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.last_email}</span>
                        </td>
                      ) : null}

                      <td
                        className="delete_row"
                        colspan="12"
                        onClick={() =>
                          onDelete({
                            id: item.profile_id,
                            currentName: item.first_name + " " + item.last_name,
                            currentJobTitle: item.jobTitle,
                            currentCompany: item.company,
                            currentIndication: item.indication,
                            currentProduct: item.product,
                            currentCountry: item.country,
                            currentEmail: item.email,
                            profile_user_id: item.profile_user_id,
                          })
                        }
                      >
                        <img src={path + "delete.svg"} alt="Delete Row" />
                      </td>
                    </tr>
                  ))}
                {validator3.message("email", email, "required|email")}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/*Modal to add new users*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New HCP</Modal.Title>
          <button
            className="btn btn-secondary"
            style={{ margin: "10px" }}
            onClick={addHcp}
          >
            Add HCP +{" "}
          </button>
          <button
            className="btn-secondary"
            variant="primary"
            onClick={handleShowUploadMenu}
            style={{ margin: "5px" }}
          >
            Upload Excel
          </button>
        </Modal.Header>{" "}
        <div className="container">
          {hpc.map((val, i) => {
            const fieldName = `hpc[${i}]`;
            return (
              <>
                <div className="container">
                  <div className="row align-items-center vh-100">
                    <div className="col-6 mx-auto">
                      <div className="card shadow border">
                        <div className="card-body d-flex flex-column align-items-center">
                          <div className="card-title form-group">
                            first name{" "}
                            <input
                              type="text"
                              name={`${fieldName}.firstname`}
                              onChange={(event) => onFirstNameChange(event, i)}
                              value={val.firstname}
                            ></input>
                            {validator.message(
                              "name",
                              val.firstname,
                              "required|alpha"
                            )}
                            last name{" "}
                            <input
                              type="text"
                              name={`${fieldName}.lastname`}
                              onChange={(event) => onLastNameChange(event, i)}
                              value={val.lastname}
                            ></input>
                            {validator.message(
                              "lastname",
                              val.lastname,
                              "required|alpha"
                            )}
                            email{" "}
                            <input
                              type="text"
                              name={`${fieldName}.email`}
                              onChange={(event) => onEmailChange(event, i)}
                              value={val.email}
                            ></input>
                            {validator.message(
                              "email",
                              val.email,
                              "required|email"
                            )}
                            contact type{" "}
                            <input
                              type="radio"
                              id="HCP"
                              onChange={(event) =>
                                onContactTypeChange(event, i)
                              }
                              name={`${fieldName}.contact_type`}
                              value="HCP"
                            />
                            <label htmlFor="HCP">HPC</label>
                            <input
                              type="radio"
                              id="staff"
                              name={`${fieldName}.contact_type`}
                              onChange={(event) =>
                                onContactTypeChange(event, i)
                              }
                              value="staff"
                            />
                            <label htmlFor="staff">staff</label>
                            <input
                              type="radio"
                              id="test-users"
                              name={`${fieldName}.contact_type`}
                              onChange={(event) =>
                                onContactTypeChange(event, i)
                              }
                              value="test users"
                            />
                            <label htmlFor="test-users">Test Users</label>
                            <br />
                            country{" "}
                            <input
                              type="text"
                              name={`${fieldName}.country`}
                              onChange={(event) => onCountryChange(event, i)}
                              value={val.country}
                            ></input>
                            {validator.message(
                              "country",
                              val.country,
                              "required"
                            )}
                            <br />
                            {hpc.length !== 1 && (
                              <button onClick={() => deleteRecord(i)}>
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          <button
            type="submit"
            className="btn btn-secondary"
            onClick={saveClicked}
          >
            Save
          </button>
        </div>
      </Modal>

      {/* add new hcps */}
      {localStorage.getItem("user_id")=="56Ek4feL/1A8mZgIKQWEqg=="?  <Modal
        id="add_hcp"
        show={isOpenAdd}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {localStorage.getItem("user_id") == userId
                ? "Add New User +"
                : "Add New HCP"}
            </h5>
            <button
              onClick={() => {
                setIsOpenAdd(false);
                setHpc([
                  {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact_type: "",
                    country: "",
                    countryIndex: "",
                    userType:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?irtRole?.[0]?.value:"",
                    userTypeIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?0:"",
                    siteIrt:localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.find(item =>item?.value == "Yes")?.value:"",
                    siteIrtIndex: localStorage.getItem("user_id") =="56Ek4feL/1A8mZgIKQWEqg=="?siteIrtAll?.indexOf(item =>item?.value == "Yes"):"",
                  },
                ]);
                setActiveManual("active");
                // document.querySelector("#file-4").value = "";
                setActiveExcel("");
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content" id="upload-confirm">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
                        <div className="add_hcp_boxes">
                          <div className="form_action">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">First Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Email <span>*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className={
                                      validationError?.newHcpEmail
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    id="email-desc"
                                    name={`${fieldName}.email`}
                                    onChange={(event) =>
                                      onEmailChange(event, i)
                                    }
                                    value={val.email}
                                  />
                                  {validationError?.newHcpEmail ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpEmail}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {localStorage.getItem("user_id") !=
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Contact Type</label>
                                    <DropdownButton
                                      className="dropdown-basic-button split-button-dropup"
                                      title={
                                        hpc[i].contact_type != "" &&
                                        hpc[i].contact_type != "undefined"
                                          ? hpc[i].contact_type
                                          : "Select Type"
                                      }
                                      onSelect={(event) =>
                                        onContactTypeChange(event, i)
                                      }
                                    >
                                      <div className="scroll_div">
                                        <Dropdown.Item
                                          eventKey="HCP"
                                          className={
                                            hpc[i].contact_type == "HCP"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          HCP
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Staff"
                                          className={
                                            hpc[i].contact_type == "Staff"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Staff
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          eventKey="Test Users"
                                          className={
                                            hpc[i].contact_type == "Test Users"
                                              ? "active"
                                              : ""
                                          }
                                        >
                                          Test Users
                                        </Dropdown.Item>
                                      </div>
                                    </DropdownButton>
                                  </div>
                                </div>
                              ) : null}

                              {localStorage.getItem("user_id") !=
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Country</label>
                                    <Select
                                      options={countryall}
                                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                      onChange={(event) =>
                                        onCountryChange(event, i)
                                      }
                                      defaultValue={
                                        countryall[hpc[i].countryIndex]
                                      }
                                      placeholder={
                                        typeof countryall[
                                          hpc[i].countryIndex
                                        ] === "undefined"
                                          ? "Select Country"
                                          : countryall[hpc[i].countryIndex]
                                      }
                                      filterOption={createFilter(filterConfig)}
                                      isClearable
                                    />
                                    {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                        title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                        onSelect={(event) => onCountryChange(event, i)}
                                        >
                                        <div className="scroll_div">
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                        </>
                                      );
                                    }
                                  )}
                                  </div>
                                  </DropdownButton>
                                    */}
                                  </div>
                                </div>
                              ) : null}

                              {localStorage.getItem("user_id") ==
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  <hr />
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT mandatory training</label>
                                      {console.log( siteIrtAll[hpc[i].siteIrtIndex],siteIrtAll,hpc[i])}
                                      <Select
                                        options={siteIrtAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteIrtChange(
                                            event,
                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteIrtAll[hpc[i].siteIrtIndex]
                                        }
                                        placeholder={
                                          typeof siteIrtAll[
                                            hpc[i].siteIrtIndex
                                          ] === "undefined"
                                            ? "Select Site IRT"
                                            : siteIrtAll[hpc[i].siteIrtIndex]
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT Role</label>
                                      {siteIrtAll[hpc[i].siteIrtIndex]
                                        ?.value === "Yes" ? (
                                        <Select
                                          options={irtRole}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onUserTypeChange(event, i)
                                          }
                                          value={
                                            irtRole.findIndex(
                                              (el) => el.value == val?.userType
                                            ) == -1
                                              ? ""
                                              : irtRole[
                                                  irtRole.findIndex(
                                                    (el) =>
                                                      el.value == val?.userType
                                                  )
                                                ]
                                          }
                                          placeholder={"Select Role"}
                                          isClearable
                                          // filterOption={createFilter(filterConfig)}
                                        />
                                      ) : siteIrtAll[hpc[i].siteIrtIndex]
                                          ?.value === "No" ? (
                                        <Select
                                          options={userTypeAll}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onUserTypeChange(event, i)
                                          }
                                          value={
                                            userTypeAll.findIndex(
                                              (el) => el.value == val?.userType
                                            ) == -1
                                              ? ""
                                              : userTypeAll[
                                                  userTypeAll.findIndex(
                                                    (el) =>
                                                      el.value == val?.userType
                                                  )
                                                ]
                                          }
                                          isClearable
                                          placeholder={"Select Role"}
                                          // filterOption={createFilter(filterConfig)}
                                        />
                                      ) : (
                                        <Select
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          placeholder={"Select Role"}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  {
                                    /*<div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label for="">Blind Type</label>
                                        <Select
                                          options={blindTypeAll}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onBlindTypeChange(event, i)
                                          }
                                          defaultValue={
                                            blindTypeAll[hpc[i].blindTypeIndex]
                                          }
                                          placeholder={
                                            typeof blindTypeAll[
                                              hpc[i].blindTypeIndex
                                            ] === "undefined"
                                              ? "Select Blind Type"
                                              : blindTypeAll[
                                                  hpc[i].blindTypeIndex
                                                ]
                                          }
                                          // filterOption={createFilter(filterConfig)}
                                        />
                                      </div>
                                    </div>*/
                                  }


                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Sub Role</label>
                                      <Select
                                        options={subUserTypeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSubUserTypeChange(event, i)
                                        }
                                        defaultValue={
                                          subUserTypeAll[
                                            hpc[i].subUserTypeIndex
                                          ]
                                        }
                                        placeholder={
                                          typeof subUserTypeAll[
                                            hpc[i].subUserTypeIndex
                                          ] === "undefined"
                                            ? "Select Sub Role"
                                            : subUserTypeAll[
                                                hpc[i].subUserTypeIndex
                                              ]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                        //  isClearable
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Country</label>
                                      {siteIrtAll[hpc[i].siteIrtIndex]
                                        ?.value === "Yes" ? (
                                        <Select
                                          options={irtCountry}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onCountryChange(event, i)
                                          }
                                          value={
                                            irtCountry.findIndex(
                                              (el) => el.value == val?.country
                                            ) == -1
                                              ? ""
                                              : irtCountry[
                                                  irtCountry.findIndex(
                                                    (el) =>
                                                      el.value == val?.country
                                                  )
                                                ]
                                          }
                                          placeholder="Select Country"
                                          filterOption={createFilter(
                                            filterConfig
                                          )}
                                          isClearable
                                        />
                                      ) : (
                                        <Select
                                          options={countryall}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onCountryChange(event, i)
                                          }
                                          value={
                                            countryall.findIndex(
                                              (el) => el.value == val?.country
                                            ) == -1
                                              ? ""
                                              : countryall[
                                                  countryall.findIndex(
                                                    (el) =>
                                                      el.value == val?.country
                                                  )
                                                ]
                                          }
                                          placeholder="Select Country"
                                          filterOption={createFilter(
                                            filterConfig
                                          )}
                                          isClearable
                                        />
                                      )}
                                      {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                        title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                        onSelect={(event) => onCountryChange(event, i)}
                                        >
                                        <div className="scroll_div">
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                        </>
                                      );
                                    }
                                  )}
                                  </div>
                                  </DropdownButton>
                                    */}
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Number</label>
                                      <Select
                                        options={siteNumberAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNumberChange(event, i)
                                        }
                                        value={
                                          siteNumberAll[hpc[i].siteNumberIndex]
                                            ? siteNumberAll[
                                                hpc[i].siteNumberIndex
                                              ]
                                            : ""
                                        }
                                        // defaultValue={
                                        //   siteNumberAll[hpc[i].siteNumberIndex]
                                        // }
                                        placeholder={
                                          typeof siteNumberAll[
                                            hpc[i].siteNumberIndex
                                          ] === "undefined"
                                            ? "Select Site Number"
                                            : siteNumberAll[
                                                hpc[i].siteNumberIndex
                                              ]
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // placeholder={
                                        //   typeof userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ] === "undefined"
                                        //     ? "Select User Type"
                                        //     : userTypeAll[
                                        //         hpc[i].userTypeIndex
                                        //       ]
                                        // }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Name</label>

                                      <Select
                                        options={siteNameAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNameChange(event, i)
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // valueField={
                                        //   siteNameAll[hpc[i].siteNameIndex]?.value
                                        // }
                                        value={
                                          siteNameAll[hpc[i].siteNameIndex]
                                            ? siteNameAll[hpc[i].siteNameIndex]
                                            : ""
                                        }
                                        defaultValue={
                                          siteNameAll[hpc[i].siteNameIndex]
                                        }
                                        placeholder={
                                          typeof siteNameAll[
                                            hpc[i].siteNameIndex
                                          ] === "undefined"
                                            ? "Select Site Name"
                                            : siteNameAll[hpc[i].siteNameIndex]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  {/* <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Street</label>
                                      <Select
                                        options={siteStreetAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteStreetChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteStreetAll[hpc[i].siteStreetIndex]
                                        }
                                        placeholder={
                                          typeof siteStreetAll[
                                            hpc[i].siteStreetIndex
                                          ] === "undefined"
                                            ? "Select Site Street"
                                            : siteStreetAll[
                                                hpc[i].siteStreetIndex
                                              ]
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Post Code</label>
                                      <Select
                                        options={sitePostalCodeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSitePostCode(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          sitePostalCodeAll[
                                            hpc[i].sitePostCodeIndex
                                          ]
                                        }
                                        placeholder={
                                          typeof sitePostalCodeAll[
                                            hpc[i].sitePostCodeIndex
                                          ] === "undefined"
                                            ? "Select Post Code"
                                            : sitePostalCodeAll[
                                                hpc[i].sitePostCodeIndex
                                              ]
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site City</label>
                                      <Select
                                        options={siteCityAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteCityChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteStreetAll[hpc[i].siteStreetIndex]
                                        }
                                        placeholder={
                                          typeof siteCityAll[
                                            hpc[i].siteCityIndex
                                          ] === "undefined"
                                            ? "Select Site City"
                                            : siteCityAll[hpc[i].siteCityIndex]
                                        }
                                      />
                                    </div>
                                  </div>*/}

                                  {/* <button onClick={(e) => addMoreSite(i, e)}>
                                    +
                                  </button> */}

                                  {val?.siteDetails?.map((data, index) => {
                                    return (
                                      <>
                                        {/* {index !== 0 ? (
                                          <>
                                            <div className="add-content-form">
                                              <div className="row">
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site number
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteNumberChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteNumber}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site name
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteNameChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteName}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site Street
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteStreetChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteStreet}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site Post Code
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSitePostCode(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.sitePostCode}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site City
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteCityChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteCity}
                                                    />
                                                  </div>
                                                  <div className="delete_btn">
                                                    {index !== 0 ? (
                                                      <button
                                                        type="button"
                                                        className="btn btn-filled"
                                                        onClick={(e) =>
                                                          removeSite(
                                                            index,
                                                            i,
                                                            e
                                                          )
                                                        }
                                                      >
                                                        <img
                                                          src={
                                                            path_image +
                                                            "delete.svg"
                                                          }
                                                          alt="Add More"
                                                        />
                                                      </button>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : ( */}
                                        <>
                                          <div className="add-content-form">
                                            <div className="row"></div>
                                          </div>
                                        </>
                                        {/* )} */}
                                      </>
                                    );
                                  })}
                                </>
                              ) : null}
                              {/*
                              <div className="col-12 col-md-6 btn_rmv">
                                <div className="form-group">
                                  {i !== 0 && (
                                    <button
                                      type="button"
                                      className="btn btn-filled"
                                      onClick={() => deleteRecord(i)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              </div>
                              */}
                            </div>
                          </div>

                          <div className="hcp-modal-action">
                            <div className="hcp-action-block">
                              {activeManual == "active" ? (
                                <>
                                  {hpc.length > 1 && (
                                    <div className="hcp-remove">
                                      <button
                                        type="button"
                                        className="btn btn-filled"
                                        onClick={() => deleteRecord(i)}
                                      >
                                        <img
                                          src={path_image + "delete.svg"}
                                          alt="Add More"
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : null}
                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item add_hcp">
                                  <a
                                    onClick={(e) => addMoreHcp(e)}
                                    className="nav-link active btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                    {localStorage.getItem("user_id") == userId
                                      ? "Add User +"
                                      : "Add HCP +"}
                                  </a>
                                </li>

                                {/*
                                <li className="nav-item add-file">
                                  <a
                                    onClick={(e) => addFile(e)}
                                    className="nav-link btn-filled"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                    Add File
                                  </a>
                                </li>
                                */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </form>

                {/*
                  <form id="add_file" className={"tab-pane" + activeExcel}>
                    <div className="file_upload-box">
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-4[]"
                            id="file-4"
                            className="inputfile inputfile-3"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={onFileChange}
                            data-multiple-caption="{count} files selected"
                            multiple
                            // ref={file_name}
                          />

                          {file_name.current?.files === undefined ||
                          file_name.current.files?.length === 0 ? (
                            <>
                              <label htmlFor="file-4">
                                <span>Choose Your File</span>
                              </label>
                              <p>Upload your excel file</p>
                            </>
                          ) : (
                            <h5>{file_name.current.files[0].name}</h5>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                  */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={(e) => {
                saveClickedRd(e);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>:
      <Modal
        id="add_hcp"
        show={isOpenAdd}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-hidden="true"
        >
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {localStorage.getItem("user_id") == userId
                ? "Add New User +"
                : "Add New HCP"}
            </h5>
            <button
              onClick={() => {
                setIsOpenAdd(false);
                setHpc([
                  {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact_type: "",
                    country: "",
                    countryIndex: "",
                  },
                ]);
                setActiveManual("active");
                // document.querySelector("#file-4").value = "";
                setActiveExcel("");
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
                        <div className="add_hcp_boxes">
                          <div className="form_action">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">First Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Email *</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email-desc"
                                    name={`${fieldName}.email`}
                                    onChange={(event) =>
                                      onEmailChange(event, i)
                                    }
                                    value={val.email}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Contact Type</label>
                                  <DropdownButton
                                    className="dropdown-basic-button split-button-dropup"
                                    title={
                                      hpc[i].contact_type != "" &&
                                      hpc[i].contact_type != "undefined"
                                        ? hpc[i].contact_type
                                        : "Select Type"
                                    }
                                    onSelect={(event) =>
                                      onContactTypeChange(event, i)
                                    }
                                  >
                                    <Dropdown.Item
                                      eventKey="HCP"
                                      className={
                                        hpc[i].contact_type == "HCP"
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      HCP
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      eventKey="Staff"
                                      className={
                                        hpc[i].contact_type == "Staff"
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      Staff
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      eventKey="Test Users"
                                      className={
                                        hpc[i].contact_type == "Test Users"
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      Test Users
                                    </Dropdown.Item>
                                  </DropdownButton>
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Country</label>
                                  <Select
                                    options={countryall}
                                    className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                    onChange={(event) =>
                                      onCountryChange(event, i)
                                    }
                                    defaultValue={
                                      countryall[hpc[i].countryIndex]
                                    }
                                    placeholder={
                                      typeof countryall[hpc[i].countryIndex] ===
                                      "undefined"
                                        ? "Select Country"
                                        : countryall[hpc[i].countryIndex]
                                    }
                                    filterOption={createFilter(filterConfig)}
                                    isClearable
                                  />
                                  {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                            title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                            onSelect={(event) => onCountryChange(event, i)}
                                            >
                                            <div className="scroll_div">
                                            {countryall.length === 0
                                            ? ""
                                            : Object.entries(countryall).map(
                                            ([index, item]) => {
                                            return (
                                            <>
                                            <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                            </>
                                          );
                                        }
                                      )}
                                      </div>
                                      </DropdownButton>
                                    */}
                                </div>
                              </div>

                              {/*
                                <div className="col-12 col-md-6 btn_rmv">
                                  <div className="form-group">
                                    {i !== 0 && (
                                      <button
                                        type="button"
                                        className="btn btn-filled"
                                        onClick={() => deleteRecord(i)}
                                      >
                                        Remove
                                      </button>
                                    )}
                                  </div>
                                </div>
                                */}
                            </div>
                          </div>

                          <div className="hcp-modal-action">
                            <div className="hcp-action-block">
                              {activeManual == "active" ? (
                                <>
                                  {hpc.length > 1 && (
                                    <div className="hcp-remove">
                                      <button
                                        type="button"
                                        className="btn btn-filled"
                                        onClick={() => deleteRecord(i)}
                                      >
                                        <img
                                          src={path_image + "delete.svg"}
                                          alt="Add More"
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
                              ) : null}

                              <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item add_hcp">
                                  <a
                                    onClick={addMoreHcp}
                                    className="nav-link active btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                    {localStorage.getItem("user_id") == userId
                                      ? "Add User +"
                                      : "Add HCP +"}
                                  </a>
                                </li>

                                {/*
                                    <li className="nav-item add-file">
                                      <a
                                        onClick={(e) => addFile(e)}
                                        className="nav-link btn-filled"
                                        data-bs-toggle="tab"
                                        href="javascript:;"
                                      >
                                        Add File
                                      </a>
                                    </li>
                                    */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </form>

                {/*
                  <form id="add_file" className={"tab-pane" + activeExcel}>
                    <div className="form-group files">
                      <div className="box">
                        <input
                          type="file"
                          id="file-4"
                          className="form-control inputfile"
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          onChange={onFileChange}
                          ref={file_name}
                        />
                        {file_name.current?.files === undefined ||
                        file_name.current.files?.length === 0 ? (
                          <>
                            <label htmlFor="file-4">
                              <span>Choose Your File</span>
                            </label>
                            <p>Upload your excel file</p>
                          </>
                        ) : (
                          <h5>{file_name.current.files[0].name}</h5>
                        )}
                      </div>
                    </div>
                  </form>
                  */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>}

      <Modal show={showUploadMenu} onHide={handleCloseUploadMenu}>
        <Modal.Header closeButton>
          <Modal.Title>upload your new file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="card">
            <div className="card-header"> Upload your new list file</div>
            <div className="card-body">
              <h5 className="card-title"></h5>
              <input
                type="file"
                onChange={onFileChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              {validator2.message("file", selectedFile, "required")}

              <br />
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={(event) => uploadFile(event)}
              >
                upload
              </button>

              <p className="card-text"></p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={isOpen} className="send-confirm" id="resend-confirm">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setIsOpen(false);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path + "alert.png"} alt="" />
          <h4>
            The HCP record will be deleted from the list.
            <br />
            Are you sure you want to delete it?
          </h4>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                deleteReader(profileUserId);
                setIsOpen(false);

                setOpenDeleteConfirmation(true);
                // setUpdatedData(update + 1);
              }}
            >
              Yes Please!
            </button>

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return state;
};

export default forwardRef(Table);
