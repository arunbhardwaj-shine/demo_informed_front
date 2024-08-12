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
  const [instituions, setInstituions] = useState([]);
  const [nonIrtInstitutionType, setNonIrtInstitutionType] = useState([])
  const [irtInstitutionType, setIrtInstitutionType] = useState([])
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
  const [allUsers, setAllUsers] = useState([]);
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
  const [userId, setUserId] = useState(localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
  ?"sNl1hra39QmFk9HwvXETJA==":"56Ek4feL/1A8mZgIKQWEqg==");

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
  const [sortBy, setSortBy] = useState('first_name'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('asc');
  const [showReaders, setShowSaveReader] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
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
            let institutions;
            let arrinstitutions = [];
            let nonIrtInstitution;
            let arrNonIrtInstitution=[]
            let irtInstitution;
            let arrIrtInstitution=[]


            let arr = [];

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
              user_type = res.data.response.data.investigator_type;
              sub_role = res.data.response.data.sub_role;
              blind_type = res.data.response.data.blind_type;
              site_number = res.data.response.data.site_number;
              site_name = res.data.response.data.site_name;
              site_street = res.data.response.data.site_street;
              site_postcode = res.data.response.data.site_post_code;
              site_city = res.data.response.data.site_city;
              irt_user_type = res?.data?.response?.data?.irt_inverstigator_type;
              institutions = res?.data?.response?.data?.institution_type;
              nonIrtInstitution=res?.data?.response?.data?.non_mandatory_institution_type
              irtInstitution=res?.data?.response?.data?.irt_institution_type


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

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
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

              Object.entries(institutions)?.map(([item, index]) => {
                arrinstitutions.push({
                  label: item,
                  value: item,
                });
              });

              Object.entries(nonIrtInstitution)?.map(([item, index]) => {
                arrNonIrtInstitution.push({
                  label: item,
                  value: item,
                });
              });
              Object.entries(irtInstitution)?.map(([item, index]) => {
                arrIrtInstitution.push({
                  label: item,
                  value: item,
                });
              });
            }

            setCountryall(arr);
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
              setIrtRole(arrIrtUserType);
              setInstituions(arrinstitutions);

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
             
              setNonIrtInstitutionType(arrNonIrtInstitution)
              setIrtInstitutionType(arrIrtInstitution)
            }
          }
        
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
      siteIrt:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
          ? siteIrtAll?.find((item) => item?.value == "Yes")?.value
          : "",
      siteIrtIndex:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
          ? siteIrtAll?.findIndex((item) => item?.value == "Yes")
          : "",
      userType:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
          ? irtRole?.[0]?.value
          : "",
      roleIndex:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? 0 : "",

        institute: localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
        ? irtInstitutionType?.[0]?.value
        : "",
        instituteIndex:  localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? 0 : "",
      siteNumber: "",
      siteName: ""
    },
  ]);

  const axiosFun = async () => {
    try {
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
  const onUserTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].userType = "";
      list[i].roleIndex = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].userType;
      list[i].userType = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].roleIndex = index;
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

  const onInstitutionChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].institute = "";
      list[i].institute = "";
      setHpc(list);
    } else {
      const value = e.value;

      const list = [...hpc];
      if (value == "Study site") {
        list[i].siteIrtIndex = 0;
        list[i].siteIrt = "Yes";
        list[i].userType = irtRole[0]?.value;
        list[i].roleIndex = 0;
        let index = irtInstitutionType.findIndex((x) => x.value === value);
        list[i].instituteIndex = index;
      } else {
        list[i].siteIrtIndex = 1;
        list[i].siteIrt = "No";
        list[i].userType = "";
        list[i].roleIndex = "";
        list[i].userType = "Other";
        list[i].roleIndex = 4;
        let index = nonIrtInstitutionType.findIndex((x) => x.value === value);
        list[i].instituteIndex = index;
      }

      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      list[i].country = "";
      const name = hpc[i].institute;
      list[i].institute = value;

      // let index = instituions.findIndex((x) => x.value === value);
      // list[i].instituteIndex = index;

      if (value != "Study site") {
        let arr = [];
        setSiteNumberAll(arr);
        setSiteNameAll(arr);
        setForceRender(!forceRender);
      }
      // console.log(list);
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
      list[i].roleIndex = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteIrt;
      list[i].siteIrt = value;

      let index = siteIrtAll.findIndex((x) => x.value === value);
      list[i].userType = value == "Yes" ? irtRole[0] : "Other";
      list[i].roleIndex = value == "Yes" ? 0 : 4;
      list[i].siteIrtIndex = index;
      // list[i].userType = "";
      list[i].country = "";
      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      list[i].institute= value == "Yes" ?irtInstitutionType?.[0]?.value:"";
      list[i].instituteIndex=value == "Yes" ?0:"";
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
      createSmartList(dd, newReaders, flag,allUsersids=[]) {
        showFileInReadersList(dd, newReaders, flag,allUsersids);
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
    setAllUsers(props.allUsers);
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
        userType:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? irtRole?.[0]?.value
            : "",
            roleIndex:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? 0
            : "",
        siteIrt:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? siteIrtAll?.find((item) => item?.value == "Yes")?.value
            : "",
        siteIrtIndex:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? siteIrtAll?.findIndex((item) => item?.value == "Yes")
            : "",
            institute: localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? irtInstitutionType?.[0]?.value
            : "",
            instituteIndex:  localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? 0 : "",
          siteNumber: "",
          siteName: ""
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
    const selectedHcpList = document.querySelector('.selected-hcp-list');

    if (showLessInfo) {
      selectedHcpList.classList.add('expand');
    } else {
      selectedHcpList.classList.remove('expand');
    }
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
          props.sendDataToParent(combine_data, "existing",allUsers);
          setUpdatedData(combine_data);
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // console.log(validator2.errorMessages);
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
      const name_edit = document?.getElementById(
        "field_name" + profile_user_id
      )?.innerText;
      const country_edit = document?.getElementById(
        "field_country" + profile_user_id
      )?.value;
      const contact_type_edit = document?.getElementById(
        "field_contact_type" + profile_user_id
      )?.value;

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
      let prev_obj = editableData?.find(
        (x) => x.profile_user_id === profile_user_id
      );
      if (typeof prev_obj != "undefined") {
        //update existing
        editableData?.map(
          (obj) =>
            arr?.find((o) => o.profile_user_id === profile_user_id) || obj
        );
      } else {
        //create new
        setEditableData((oldArray) => [...oldArray, ...arr]);
      }
    }
  };

  const showFileInReadersList = async (fdata, newReaders, flag, allUsersIds=[]) => {
    let body = {};
    if (typeof editList != "undefined" && editList.length > 0) {
      // console.log("excel create",allUsers);
      //for Normal flow
      // let profile_user_id_array = editList.map((data) => {
      //   return data.profile_user_id;
      // });

      // if(profile_user_id_array?.length < allUsersIds.length){
        let profile_user_id_array = allUsers;
      // }
      

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
        ibu: typeof props?.ibu !== "undefined" && props?.ibu != "" ? props?.ibu : "",
      };

      // console.log(body,'biody');
    } else if (
      typeof props != "undefined" &&
      props.hasOwnProperty("data") &&
      props.data.length > 0
    ) {
      // console.log("excel create not");
      //Parent Child FLow
      // const profile_user_id_array = fdata?.map((data) => {
      //   return data.profile_user_id;
      // });
      const profile_user_id_array = allUsersIds;

      const new_user_id_array = newReaders?.map((data) => {
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
        ibu: typeof props?.ibu !== "undefined" && props?.ibu != "" ? props?.ibu : "",
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

    if (editableData?.length > 0) {
      editableData?.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data?.profile_user_id
        )?.innerText;
        const country_edit = document.getElementById(
          "field_country" + data?.profile_user_id
        )?.value;
        const edit_index = document.getElementById(
          "field_index" + data?.profile_user_id
        )?.value;
        const contact_type_edit = document.getElementById(
          "field_contact_type" + data?.profile_user_id
        )?.value;

        let prev_obj = editList?.find(
          (x) => x?.profile_user_id === data?.profile_user_id
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
    let alluser = allUsers;
    setEditList([]);
    setAllUsers([]);
    setTimeout(() => {
      setEditList(vr);
      setAllUsers(alluser);
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
  
    const status = hpc.map((data) => {
      if (localStorage.getItem("user_id") ==userId) {
        if(data?.siteIrt=="Yes"){
          
          if (
            data.email == "" ||
            data.lastname == "" ||
            data.firstname == "" ||
            data.country == "" ||
            data.institute == "" ||
            typeof data.institute == "undefined"||
            data?.siteName==""||data?.siteNumber==""||data?.userType==""||
            typeof data?.userType=="undefined"
          ) {
            return "false";
          } else {
            return "true";
          }
        }else{
          if (
            data.email == "" ||
            data.lastname == "" ||
            data.firstname == "" ||
            data.country == "" ||
            data.institute == "" ||
            typeof data.institute == "undefined"
          ) {
            return "false";
          } else {
            return "true";
          }
        }
       
      } else if (localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
        if (data.email == "" || data.country == "") {
          return "false"
        } else {
          return "true"
        }
      }
      else {
        if (data.email == "") {
          return "false";
        }
        else {
          return "true";
        }
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
          userType:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
              ? irtRole?.[0]?.value
              : "",
              roleIndex:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
              ? 0
              : "",
          siteIrt:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
              ? siteIrtAll?.find((item) => item?.value == "Yes")?.value
              : "",
          siteIrtIndex:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
              ? siteIrtAll?.findIndex((item) => item?.value == "Yes")
              : "",
              institute: localStorage.getItem("user_id") ==  userId
              ? irtInstitutionType?.[0]?.value
              : "",
              instituteIndex:  localStorage.getItem("user_id") == userId? 0 : "",
            siteNumber: "",
            siteName: ""
        },
      ]);
    } else {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" || localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
        toast.warning("Please input the required fields.");
      } else {
        toast.warning("Please input the email atleast.");
      }
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

    const newArray = allUsers?.filter(item => item !== profile_user_id);
    setAllUsers(newArray);
    setEditList(filtered_list);
    props.sendDataToParent(filtered_list, "existing",newArray);
    popup_alert({
      visible: "show",
      message: "The HCP record has been deleted </br>successfully !",
      type: "success",
      redirect: "",
    });

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
      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
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
          institution_type: data.institute ? data.institute : "",
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
        if (
          data.first_name == "" && localStorage.getItem("user_id") == userId) {
          return "Please enter the first name";
        } else if (
          data.last_name == "" && localStorage.getItem("user_id") == userId) {
          return "Please enter the last name";
        } else if (data.email == "") {
          return "Please enter the email atleast";
        } else if (data.institution_type == ""&& localStorage.getItem("user_id") == userId) {
          return "Please select Institution";
        } else if (data.country == "") {
          return "Please select country";
        } else if(data.siteNumber==""&&data.siteIrt==1 &&localStorage.getItem("user_id") == userId){
          return "Please select site number"
        } else if(data.siteName==""&&data.siteIrt==1&& localStorage.getItem("user_id") == userId){
          return "Please select site name"
        } 
        else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = editList.find((x) => x.email === useremail);
            let prev_obj_new = getNewReaders.find((x) => x.email === useremail);
            if (
              typeof prev_obj != "undefined" ||
              typeof prev_obj_new != "undefined"
            ) {
              return "User with same email already added in list.";
            } else {
              return "true";
            }
          } else {
            return "Email format is not valid";
          }
        }
        else {
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
              toast.success("User added successfully");

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
              props.sendDataToParent(old_data, "existing",allUsers);
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
        // toast.warning(status[0]);
        const filteredArray = status.filter((value) => value !== "true");
        toast.warning(filteredArray?.[0]);
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
              toast.success("User added successfully");

              let old_data = editList;
              let old_id_array = allUsers;
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
              setEditList(old_data);
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              props.sendDataToParent(old_data, "existing",old_id_array);
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
        } else if (data.country == "" && localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
          return "Please enter the country";
        }
        else if (data.email != "") {
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
              toast.success("User added successfully");

              let old_data = editList;
              let old_id_array = allUsers;
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
              props.sendDataToParent(old_data, "existing",old_id_array);
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
              toast.success("User added successfully");

              let old_data = editList;
              let old_id_array = allUsers;
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
              props.sendDataToParent(old_data, "existing",old_id_array);
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

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Handle different data types (numbers, strings)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
    });
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
            {props?.upload_by_filter == 0 ? (
              <h4>
                {localStorage.getItem("user_id") == userId
                  ? "Uploaded Users for the smart list"
                  : "Uploaded HCPs for the smart list"}
                <span>| {
                  props?.listcount ? props?.listcount :
                    editList?.length > 0 ? editList?.length : 0
                }</span>
              </h4>
            ) : (
              <h4>
                Selected HCPs for the smart list |
                <span>
                  {
                    props?.listcount ? props?.listcount :
                      editList?.length > 0 ? editList?.length : 0
                  }
                </span>
              </h4>
            )}

            {/*
              props?.upload_by_filter == 1 && localStorage.getItem('user_id') != 'iSnEsKu5gB/DRlycxB6G4g==' ?*/}
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
                  {/* <div className="hcp-sort">
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
                  </div> */}
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
            {/*: null
                  */}
          </div>

          {/*
            props?.upload_by_filter == 1 && localStorage.getItem('user_id') != 'iSnEsKu5gB/DRlycxB6G4g==' ?*/}
          <div className="selected-hcp-list new-hcp-list">
            <table className="table " id="table-to-xls">
              <thead className="sticky-header">
                <tr>
                  <th scope="col" className="sort_option">
                    <span onClick={() => handleSort('first_name')} >
                      Name
                      <button
                        className={`event_sort_btn ${sortBy == "first_name" ?
                          sortOrder == "asc"
                            ? "svg_asc"
                            : "svg_active"
                          : ""
                          }`}
                        onClick={() => handleSort('first_name')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <g clip-path="url(#clip0_3722_6611)">
                            <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3722_6611">
                              <rect width="8" height="8" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </span>
                  </th>
                  <th scope="col" className="sort_option">
                    <span onClick={() => handleSort('email')} >
                      Email
                      <button
                        className={`event_sort_btn ${sortBy == "email" ?
                          sortOrder == "asc"
                            ? "svg_asc"
                            : "svg_active"
                          : ""
                          }`}
                        onClick={() => handleSort('email')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <g clip-path="url(#clip0_3722_6611)">
                            <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3722_6611">
                              <rect width="8" height="8" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </span>
                  </th>
                  <th scope="col" className="sort_option">
                    Bounced
                  </th>
                  <th scope="col" className="sort_option">
                    <span onClick={() => handleSort('country')} >
                      Country
                      <button
                        className={`event_sort_btn ${sortBy == "country" ?
                          sortOrder == "asc"
                            ? "svg_asc"
                            : "svg_active"
                          : ""
                          }`}
                        onClick={() => handleSort('country')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <g clip-path="url(#clip0_3722_6611)">
                            <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                          </g>
                          <defs>
                            <clipPath id="clip0_3722_6611">
                              <rect width="8" height="8" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </span>
                  </th>
                  {localStorage.getItem("user_id") ==
                    "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                    <>
                      <th scope="col" className="sort_option">
                        <span onClick={() => handleSort('site_number')} >
                          Site number
                          <button
                            className={`event_sort_btn ${sortBy == "site_number" ?
                              sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                              : ""
                              }`}
                            onClick={() => handleSort('site_number')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <g clip-path="url(#clip0_3722_6611)">
                                <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3722_6611">
                                  <rect width="8" height="8" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </span>
                      </th>
                      <th scope="col" className="sort_option">
                        <span onClick={() => handleSort('irt')} >
                          IRT mandatory training
                          <button
                            className={`event_sort_btn ${sortBy == "irt" ?
                              sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                              : ""
                              }`}
                            onClick={() => handleSort('irt')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <g clip-path="url(#clip0_3722_6611)">
                                <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3722_6611">
                                  <rect width="8" height="8" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </span>
                      </th>
                      <th scope="col" className="sort_option">
                        <span onClick={() => handleSort('user_type')} >
                          IRT role
                          <button
                            className={`event_sort_btn ${sortBy == "user_type" ?
                              sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                              : ""
                              }`}
                            onClick={() => handleSort('user_type')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <g clip-path="url(#clip0_3722_6611)">
                                <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3722_6611">
                                  <rect width="8" height="8" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </span>
                      </th>
                    </>
                  ) : (
                    <>
                      <th scope="col" className="sort_option">
                        <span onClick={() => handleSort('ibu')} >
                          Business unit
                          <button
                            className={`event_sort_btn ${sortBy == "ibu" ?
                              sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                              : ""
                              }`}
                            onClick={() => handleSort('ibu')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <g clip-path="url(#clip0_3722_6611)">
                                <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3722_6611">
                                  <rect width="8" height="8" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </span>
                      </th>
                      <th scope="col" className="sort_option">
                        <span onClick={() => handleSort('contact_type')} >
                          Contact type
                          <button
                            className={`event_sort_btn ${sortBy == "contact_type" ?
                              sortOrder == "asc"
                                ? "svg_asc"
                                : "svg_active"
                              : ""
                              }`}
                            onClick={() => handleSort('contact_type')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <g clip-path="url(#clip0_3722_6611)">
                                <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF" />
                              </g>
                              <defs>
                                <clipPath id="clip0_3722_6611">
                                  <rect width="8" height="8" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                        </span>
                      </th>
                    </>
                  )}

                  {showLessInfo == false ? (
                    <>
                      {" "}
                      <th scope="col">Consent</th>
                      <th scope="col">Email received</th>
                      <th scope="col">Openings</th>
                      <th scope="col">Registrations</th>
                      <th scope="col">Last email</th>
                      <th scope="col"></th>{" "}
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders?.length > 0 &&
                  getNewReaders?.map((item, index) => (
                    <tr
                      key={item}
                      className="hcps-added"
                      id={`row-selected` + index}
                      onClick={(e) =>
                        editing(
                          item?.profile_id,
                          item?.profile_user_id,
                          item?.email,
                          item?.jobTitle,
                          item?.company,
                          item?.country,
                          item?.first_name + " " + item?.last_name,
                          item?.contact_type
                        )
                      }
                    >
                      <td
                        contenteditable={editable === 0 ? "false" : "true"}
                        id={`field_name` + item?.profile_user_id}
                      >
                        {inEditMode?.status &&
                          inEditMode?.rowKey === item?.profile_id ? (
                          <input
                            value={name}
                            onChange={(event) => setName(event?.target?.value)}
                          />
                        ) : (
                          item?.first_name + " " + item?.last_name
                        )}
                      </td>
                      <td>
                        {" "}
                        {inEditMode?.status &&
                          inEditMode?.rowKey === item?.profile_id ? (
                          <input
                            value={email}
                            type="email"
                            onChange={(event) => setEmail(event?.target?.value)}
                          />
                        ) : item?.email ? (
                          item?.email
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <input
                        type="hidden"
                        id={`field_index` + item?.profile_user_id}
                        value={index}
                      />
                      <td>{item?.bounce ? item?.bounce : "N/A"}</td>
                      <td>
                        {editable ? (
                          <EditCountry
                            selected_country={item?.country}
                            profile_user={item?.profile_user_id}
                          ></EditCountry>
                        ) : (
                          <span>{item?.country ? item?.country : "N/A"}</span>
                        )}
                      </td>
                      {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" && (<><td>{item?.site_number ? item?.site_number : "N/A"}</td></>)}
                      <td>
                        {/*item.ibu*/}
                        {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                          ? item?.irt
                            ? "Yes"
                            : "No"
                          : item?.ibu
                            ? item?.ibu
                            : "N/A"}
                      </td>
                      <td>
                        {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                          <span>
                            {item?.user_type != 0 ? item?.user_type : "N/A"}
                          </span>
                        ) : editable ? (
                          <EditContactType
                            selected_ibu={item?.contact_type}
                            profile_user={item?.profile_user_id}
                          ></EditContactType>
                        ) : (
                          <span>
                            {item?.contact_type ? item?.contact_type : "N/A"}
                          </span>
                        )}
                      </td>

                      {showLessInfo == false ? (
                        <td>
                          <span>{item?.consent ? item?.consent : "N/A"}</span>{" "}
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.email_received
                              ? item?.email_received
                              : "N/A"}
                          </span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.email_opening ? item?.email_opening : "N/A"}
                          </span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.registration ? item?.registration : "N/A"}
                          </span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.last_email ? item?.last_email : "N/A"}
                          </span>
                        </td>
                      ) : null}

                      <td className="delete_row" colspan="12">
                        <img
                          src={path + "delete.svg"}
                          alt="Delete Row"
                          onClick={() =>
                            deleteNewlyAdded(item?.profile_user_id)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders?.length > 0 && (
                    <tr className="seprator-add">
                      <td colspan="13"></td>
                    </tr>
                  )}
                {typeof editList !== "undefined" &&
                  editList?.length > 0 &&
                  sortData(editList, sortBy, sortOrder)?.map((item, index) => (
                    <tr
                      key={item}
                      id={`row-selected` + index}
                      onClick={(e) =>
                        editing(
                          //  e.currentTarget,
                          item?.profile_id,
                          item?.profile_user_id,
                          item?.email,
                          item?.jobTitle,
                          item?.company,
                          item?.country,
                          item?.first_name + " " + item?.last_name,
                          item?.contact_type
                        )
                      }
                    >
                      <td
                        id={`field_name` + item?.profile_user_id}
                        contenteditable={editable === 0 ? "false" : "true"}
                      >
                        <span>{item?.first_name + " " + item?.last_name}</span>
                      </td>

                      <td id={`field_email` + item?.profile_user_id}>
                        {item?.email ? item?.email : "N/A"}
                      </td>
                      <input
                        type="hidden"
                        id={`field_index` + item?.profile_user_id}
                        value={index}
                      />
                      <td id={`field_bounced` + item?.profile_user_id}>
                        {item?.bounce ? item?.bounce : "N/A"}
                      </td>
                      <td>
                        {editable ? (
                          <EditCountry
                            selected_country={item?.country}
                            profile_user={item?.profile_user_id}
                          ></EditCountry>
                        ) : (
                          <span>{item?.country ? item?.country : "N/A"}</span>
                        )}
                      </td>
                      {/*showLessInfo == false ? (
                            <td id="field_readers">NA</td>
                          ) : null*/}
                      {localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" && (<><td id="field_site_number">{item?.site_number ? item?.site_number : "N/A"}</td></>)}

                      <td id="field_business_unit">
                        {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                          ? item?.irt
                            ? "Yes"
                            : "No"
                          : item?.ibu
                            ? item?.ibu
                            : "N/A"}
                      </td>
                      <td id="field_interest">
                        {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                          <span>
                            {item?.user_type != 0 ? item?.user_type : "N/A"}
                          </span>
                        ) : editable ? (
                          <EditContactType
                            selected_ibu={item?.contact_type}
                            profile_user={item?.profile_user_id}
                          ></EditContactType>
                        ) : (
                          <span>
                            {item?.contact_type ? item?.contact_type : "N/A"}
                          </span>
                        )}
                      </td>

                      {showLessInfo == false ? (
                        <td>
                          <span>{item?.consent ? item?.consent : "N/A"}</span>{" "}
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.email_received
                              ? item?.email_received
                              : "N/A"}
                          </span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.email_opening ? item?.email_opening : "N/A"}
                          </span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.registration ? item?.registration : "N/A"}
                          </span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>
                            {item?.last_email ? item?.last_email : "N/A"}
                          </span>
                        </td>
                      ) : null}

                      <td
                        className="delete_row"
                        colspan="12"
                        onClick={() =>
                          onDelete({
                            id: item?.profile_id,
                            currentName:
                              item?.first_name + " " + item?.last_name,
                            currentJobTitle: item?.jobTitle,
                            currentCompany: item?.company,
                            currentIndication: item?.indication,
                            currentProduct: item?.product,
                            currentCountry: item?.country,
                            currentEmail: item?.email,
                            profile_user_id: item?.profile_user_id,
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
          {/*: null
          */}
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
          IRT role{" "}
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
      {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") ? (
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
                      userType:
                        localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                          ? irtRole?.[0]?.value
                          : "",
                      roleIndex:
                        localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                          ? 0
                          : "",
                      siteIrt:
                        localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                          ? siteIrtAll?.find((item) => item?.value == "Yes")
                            ?.value
                          : "",
                      siteIrtIndex:
                        localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                          ? siteIrtAll?.indexOf((item) => item?.value == "Yes")
                          : "",
                          institute:  localStorage.getItem("user_id") == userId
                          ? irtInstitutionType?.[0]?.value
                          : "",
                          instituteIndex: localStorage.getItem("user_id") ==   userId ? 0 : "",
                        siteNumber: "",
                        siteName: ""

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
                                    <label htmlFor="">
                                      First name{" "}
                                      {localStorage.getItem("user_id") ==
                                        "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" && (
                                          <span>*</span>
                                        )}
                                    </label>
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
                                    <label htmlFor="">
                                      Last name{" "}
                                      {localStorage.getItem("user_id") ==
                                        "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" && (
                                          <span>*</span>
                                        )}
                                    </label>
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

                                {(localStorage.getItem("user_id") !=
                                  "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") !== "sNl1hra39QmFk9HwvXETJA==") ? (
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Contact type</label>
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
                                              hpc[i].contact_type ==
                                                "Test Users"
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

                                {(localStorage.getItem("user_id") !=
                                  "56Ek4feL/1A8mZgIKQWEqg==" && localStorage.getItem("user_id") !== "sNl1hra39QmFk9HwvXETJA==") ? (
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Country

                                      </label>
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
                                        filterOption={createFilter(
                                          filterConfig
                                        )}
                                        isClearable
                                      />
                                    
                                    </div>
                                  </div>
                                ) : null}

                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                                  <>
                                    <hr />
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label for="">
                                          IRT mandatory training
                                        </label>
                                      
                                        <Select
                                          options={siteIrtAll}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onSiteIrtChange(event, i)
                                          }
                                          value={
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
                                        <label for="">
                                          Institution <span>*</span>
                                        </label>
                                        {siteIrtAll[hpc[i].siteIrtIndex]
                                          ?.value === "Yes" ? (
                                        <Select
                                          options={irtInstitutionType}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onInstitutionChange(event, i)
                                          }
                                          defaultValue={
                                            irtInstitutionType[hpc[i].instituteIndex]
                                          }
                                          placeholder={
                                            typeof irtInstitutionType[
                                              hpc[i].instituteIndex
                                            ] === "undefined"
                                              ? "Select Institutions"
                                              : irtInstitutionType[
                                              hpc[i].instituteIndex
                                              ]
                                          }
                                        />
                                          ):(<>
                            
                                          <Select
                                          options={nonIrtInstitutionType}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onInstitutionChange(event, i)
                                          }
                                          defaultValue={
                                            nonIrtInstitutionType[hpc[i].instituteIndex]
                                          }
                                          value={nonIrtInstitutionType[hpc[i].instituteIndex]
                                            ?nonIrtInstitutionType[hpc[i].instituteIndex]
                                            :""
                                          }
                                          
                                          placeholder={
                                            typeof nonIrtInstitutionType[
                                              hpc[i].instituteIndex
                                            ] == "undefined"
                                              ? "Select Institutions"
                                              : nonIrtInstitutionType[
                                              hpc[i].instituteIndex
                                              ]
                                          }
                                        /></>)
                                          }
                                      </div>
                                    </div>
                                    
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label for="">IRT role</label>
                                        {siteIrtAll[hpc[i].siteIrtIndex]
                                          ?.value === "Yes" ? (
                                          <Select
                                            options={irtRole}
                                            className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                            onChange={(event) =>
                                              onUserTypeChange(event, i)
                                            }
                                            defaultValue={irtRole[hpc[i].roleIndex]}
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
                                            defaultValue={
                                              userTypeAll[hpc[i].roleIndex]
                                            }
                                            value={userTypeAll[hpc[i].roleIndex]}
                                            isClearable
                                            placeholder="Select Role"
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
                               

                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label for="">Study role</label>
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
                                              ? "Select Study Role"
                                              : subUserTypeAll[
                                              hpc[i].subUserTypeIndex
                                              ]
                                          }
                                        
                                        />
                                      </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label for="">
                                          country{" "}
                                          {(localStorage.getItem("user_id") ==
                                            "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ||
                                            localStorage.getItem("user_id") ==
                                            "m5JI5zEDY3xHFTZBnSGQZg==")
                                            && (
                                              <span>*</span>
                                            )}
                                        </label>
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
                                 
                                      </div>
                                    </div>

                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label for="">Site number {siteIrtAll[hpc[i].siteIrtIndex]
                                          ?.value === "Yes"?<span>*</span>:"" }</label>
                                        <Select
                                          options={siteNumberAll}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onSiteNumberChange(event, i)
                                          }
                                          value={
                                            siteNumberAll[
                                              hpc[i].siteNumberIndex
                                            ]
                                              ? siteNumberAll[
                                              hpc[i].siteNumberIndex
                                              ]
                                              : ""
                                          }
                                         
                                          placeholder={
                                            typeof siteNumberAll[
                                              hpc[i].siteNumberIndex
                                            ] === "undefined"
                                              ? "Select Site Number"
                                              : siteNumberAll[
                                              hpc[i].siteNumberIndex
                                              ]
                                          }
                                       
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                      <div className="form-group">
                                        <label for="">Site name  {siteIrtAll[hpc[i].siteIrtIndex]
                                          ?.value === "Yes"?<span>*</span>:"" }</label>

                                        <Select
                                          options={siteNameAll}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onSiteNameChange(event, i)
                                          }
                                        
                                          value={
                                            siteNameAll[hpc[i].siteNameIndex]
                                              ? siteNameAll[
                                              hpc[i].siteNameIndex
                                              ]
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
                                              : siteNameAll[
                                              hpc[i].siteNameIndex
                                              ]
                                          }
                                       
                                        />
                                      </div>
                                    </div>

                                  

                                    {val?.siteDetails?.map((data, index) => {
                                      return (
                                        <>
                                      
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

                                 
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </form>

                 
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
        </Modal>
      ) : (
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
                                    <label htmlFor="">First name</label>
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
                                    <label htmlFor="">Last name</label>
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
                                    <label htmlFor="">Email <span>*</span></label>
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
                                    <label htmlFor="">Contact type</label>
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
                                    <label htmlFor="">Country
                                      {localStorage.getItem("user_id") ==
                                        "m5JI5zEDY3xHFTZBnSGQZg==" && (
                                          <span>*</span>
                                        )}
                                    </label>
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
                                   
                                  </div>
                                </div>

                               
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

                               
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </form>

                 
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
        </Modal>
      )}

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
              Yes please!
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
