import React, { useEffect, useState, useRef } from "react";
import { Modal, Dropdown } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";
import { loader } from "../../loader";
import {
  getCampaignId,
  getSelected,
  getSelectedSmartListData,
  getSearched
} from "../../actions";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import { Link, useLocation } from "react-router-dom";
import { getEmailData } from "../../actions";
import DropdownButton from "react-bootstrap/DropdownButton";
import EditCountry from "../CommonComponent/EditCountry";
import EditContactType from "../CommonComponent/EditContactType";
import Select, { createFilter } from "react-select";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";

var old_object = {};
var selected_Data = [];
var searched_Data=[]
const VerifyHCP = (props) => {
  const [totalData, setTotalData] = useState({});
  const { state } = useLocation();
  const [siteNumberAll, setSiteNumberAll] = useState([]);
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [role, setRole] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [institutionType, setInstitutionType] = useState([]);
  const [optIRT, setoptIRT] = useState([
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]);
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const filterConfig = {
    matchFrom: "start",
  };
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  var campaign_id = "0";

  if (old_object?.campaign_id || old_object?.campaign_id === "") {
    var campaign_id = old_object?.campaign_id ? old_object.campaign_id : "";
  } else {
    var campaign_id = old_object?.campaign_id
      ? old_object.campaign_id
      : props.getDraftData?.campaign_id
      ? props.getDraftData.campaign_id
      : "";
  }

  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [templateId, setTemplateId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reRender, setReRender] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [editable, setEditable] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState(searched_Data?searched_Data:[]);
  const [editableData, setEditableData] = useState([]);
  const [sortingCount, setSortingCount] = useState(0);
  const [userId, setUserId] = useState(localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA=="?"sNl1hra39QmFk9HwvXETJA==":"56Ek4feL/1A8mZgIKQWEqg==");
  const navigate = useNavigate();

  const [selectedHcp, setSelectedHcp] = useState(
    selected_Data ? selected_Data : []
  );
  const [modalCounter, setModalCounter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeManual, setActiveManual] = useState("active");
  const [activeExcel, setActiveExcel] = useState("");
  const [counterFlag, setCounterFlag] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [countryall, setCountryall] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
      role:
        (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
        ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
          ? irtRole?.[0]?.value
          : "",
      optIrt:
        (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
        ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
          ? "yes"
          : "",
      institutionType: "",
    },
  ]);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [sortBy, setSortBy] = useState('first_name'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('asc');

  const [irtRoleObj,setIRTRoleObj] = useState(
    typeof state?.IrtObj !== "undefined" ? state?.IrtObj : {}
  );

  const [IRTTraining, setIRTTraining] = useState(old_object?.startTraining  ? old_object?.startTraining : 0);

  const axiosFun = async () => {
    try {
      const result = await axios.get(`emailapi/get_site?uid=${localStorage.getItem("user_id")=="sNl1hra39QmFk9HwvXETJA=="?2147536982:2147501188}`);

      let country = result?.data?.response?.data?.site_country_data;
      let arr = [];
      Object.entries(country).map(([index, item]) => {
        let label = item
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

  const [validationReRender, setValidationReRender] = useState(0);

  let [validator] = React.useState(new SimpleReactValidator());

  const [manualReRender, setManualReRender] = useState(0);
  let file_name = useRef("");

  let reducHcp = selectedHcp.map((item) => {
    return item.profile_user_id;
  });

  const updateReader = (readers_d = "", type = 1) => {
    if (type == 1) {
      var reducHcp = selectedHcp.map((item) => {
        return item?.profile_user_id ? item.profile_user_id : item;
      });
    } else {
      var reducHcp = readers_d;
    }

    let body = {
      user_id: localStorage.getItem("user_id"),
      readers_id: reducHcp,
    };
    loader("show");
    axios
      .post(`emailapi/get_user_details`, body)
      .then((res) => {
        setSelectedHcp(res.data.response.data);
        loader("hide");
        // setCounter(counter + 1);
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log("props-->",props)
    // console.log("state-->",state)
   
    if (
      typeof props !== "undefined" &&
      props !== null &&
      props.hasOwnProperty("getDraftData")
    ) {
      if (props.getDraftData !== null) {
        let reducHcp = props.getDraftData.campaign_data.selectedHcp;

        if (typeof reducHcp != "undefined") {
          let check_type_readrs = reducHcp[0];
          if (typeof check_type_readrs === "object") {
            setSelectedHcp(reducHcp);
            updateReader(reducHcp);
          } else {
            updateReader(reducHcp, 2);
          }
        }
      }
    }
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameList.remove("active");
    }
    event.target.classNameList.toggle("active");
    setTemplateId(selected);
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
      axiosFun();
    //  if(state?.NextFlag==1){
    //    getRDMandatoryReaders()
    //  }

     if(irtRoleObj?.IRTFlag){
      getRDMandatoryReaders()
     }
     
    }

    const getalCountry = async () => {
      let body = {
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

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
              let investigator_type =
                res?.data?.response?.data?.investigator_type;
              let newType = [];
              Object.keys(investigator_type)?.map((item, i) => {
                newType.push({ label: item, value: item });
              });
              let irt_inverstigator_type =
                res?.data?.response?.data?.irt_inverstigator_type;
              let newIrtType = [];
              Object.keys(irt_inverstigator_type)?.map((item, i) => {
                newIrtType.push({ label: item, value: item });
              });
              let instution_type = res?.data?.response?.data?.institution_type;
              let newInstitutionType = [];
              Object.keys(instution_type)?.map((item, i) => {
                newInstitutionType.push({ label: item, value: item });
              });
              setInstitutionType(newInstitutionType);
              setRole(newType);
              setIrtRole(newIrtType);
            }

            setTotalData(res.data.response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getalCountry();
  }, []);

  const getRDMandatoryReaders=async ()=>{
   
      loader("show")
      let body={
        user_id:userId,
        pdf_id:irtRoleObj?.pdfId      
      }
      // console.log("body-->",irtRoleObj)
      // const response=await postData(ENDPOINT.GET_RD_MANDATORY_READERS,body)

      await axios
      .post(`distributes/get_rd_mandatory_readers`,body)
      .then((res)=>{
        // console.log("res-->",res)
        if(res?.data?.status_code==200){
          let searchedUserList=res?.data?.response?.data?res?.data?.response?.data:[]
          // console.log(searchedUserList,'searchedUserList');

          let selectedProfileIds = new Set();
          if (selectedHcp.length > 0) {
              selectedHcp.forEach(hcp => selectedProfileIds.add(Number(hcp?.profile_user_id)));
          }
          // Filter searchedUserList to remove objects with profile_ids present in selectedProfileIds
          searchedUserList = searchedUserList.filter(user => !selectedProfileIds.has(Number(user?.profile_user_id)));
          // console.log(searchedUserList,'searchedUserList');
          if (selectedProfileIds?.size > 0) {
            let valuesArray = Array.from(selectedProfileIds);
            updateReader(valuesArray,2);
          }
          setSearchedUsers(searchedUserList)
          loader("hide")
        }
      }).catch((err)=> {
        console.log(err);
        loader("hide")
      }) 
  }

  const nextClicked = () => {
   
    if(irtRoleObj?.IRTFlag){
      props.getSearched(searchedUsers);
      props.getSelected(selectedHcp);
      navigate("/VerifyHcpMAIL", {
        state: {
          selectedHcp: selectedHcp,
          removedHcp: "",
          IrtObj:irtRoleObj,
          searchedUsers:searchedUsers
        },
      });
    }else{
      props.getSelected(selectedHcp);
      props.getSearched(searchedUsers);
      navigate("/VerifyHcpMAIL", {
        state: {
          selectedHcp: selectedHcp,
          removedHcp: "",
        },
      });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
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
    setActiveExcel("");
  };

  const editablemade = () => {
    setSaveOpen(true);
    let temp_val = 1 - editable;
    if (temp_val) setEditable(temp_val);
  };

  const addNewHcp = () => {
    
    let setDefaultRole = irtRole?.[0]?.value ? irtRole?.[0]?.value : "";    
    if(state?.IrtObj?.siteRole && (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")){
      const userRoleIndex = irtRole.findIndex(role => role.value.toLowerCase() === state?.IrtObj?.siteRole.toLowerCase());
      setDefaultRole = irtRole?.[userRoleIndex]?.value;
    }
    // $('#myModal').modal('show'
    // document.getElementById("tagsModal").modal('show');
    setIsOpen(true);
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
        countryIndex: "",
        role:
          (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
            ? setDefaultRole
            : "",
        optIrt:
          (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
            ? "yes"
            : "",
        institutionType: "",
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
  };

  const selectHcp = (index) => {
    let arr = [];
    arr = searchedUsers;
    let added_user_id = arr[index]?.profile_user_id;
    let prev_obj = selectedHcp?.find((x) => x?.profile_user_id === added_user_id);
    if (typeof prev_obj == "undefined") {
      const removedArray = arr.splice(index, 1);
      setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
      setSearchedUsers(arr);
      setReRender(reRender + 1);
    } else {
      toast.error("User with same email already added in list.");
    }
  };

  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const deleteSelected = (index) => {
    let arr = [];
    arr = selectedHcp;
    const removedArray = arr.splice(index, 1);
    if(irtRoleObj?.IRTFlag){
      // add user back to searchHCP
      setSearchedUsers((oldArray) => [...oldArray, removedArray[0]]);
    }
    setSelectedHcp(arr);
    setReRender(reRender + 1);
  };

  const sortSelectedUsers = () => {
    let normalArr = [];
    normalArr = selectedHcp;
    if (sorting === 0) {
      normalArr.sort((a, b) =>
        a?.first_name?.toLowerCase() > b?.first_name?.toLowerCase()
          ? 1
          : b?.first_name?.toLowerCase() > a?.first_name?.toLowerCase()
          ? -1
          : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a?.first_name?.toLowerCase() < b?.first_name?.toLowerCase()
          ? 1
          : b?.first_name.toLowerCase() < a?.first_name.toLowerCase()
          ? -1
          : 0
      );
    }
    setSelectedHcp(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
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

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const addFile = () => {
    const addfile_btn = document.getElementById("add_file_btn");
    if (document.querySelector("#add_file_btn .active") !== null) {
      addfile_btn.classList.remove("active");
    } else {
      addfile_btn.classList.add("active");
    }
    document.querySelector("#add_hcp_btn").classList.remove("active");

    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
  };

  const addHcp = () => {
    const addhcp_btn = document.getElementById("add_hcp_btn");
    if (document.querySelector("#add_hcp_btn .active") !== null) {
      addhcp_btn.classList.remove("active");
    } else {
      addhcp_btn.classList.add("active");
    }
    document.querySelector("#add_file_btn").classList.remove("active");

    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
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
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
  };

  const onRoleChange = (e, i) => {
    if (e == "") {
      const list = [...hpc];
      list[i].role = "";
      setHpc(list);
    } else {
      const value = e?.value;
      const list = [...hpc];
      const name = hpc[i].role;
      list[i].role = value;
      setHpc(list);
    }
  };
  const onInstitutionChange = (e, i) => {
    if (e == "") {
      const list = [...hpc];
      list[i].institutionType = "";
      list[i].optIRT = "";
      list[i].role = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e?.value;
      const list = [...hpc];
      const name = hpc[i].institutionType;
      list[i].institutionType = value;
      setHpc(list);
      if (e?.value == "Study site") {
        onIRTChange("yes", i);
      } else {
        onIRTChange("no", i);
      }
    }
  };

  const onIRTChange = (e, i) => {

    let setDefaultRole = irtRole?.[0]?.value ? irtRole?.[0]?.value : "";    
		if(state?.IrtObj?.siteRole && (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")){
		  const userRoleIndex = irtRole.findIndex(role => role.value.toLowerCase() === state?.IrtObj?.siteRole.toLowerCase());
		  setDefaultRole = irtRole?.[userRoleIndex]?.value;
		}

    if (e == "") {
      const list = [...hpc];
      list[i].optIrt = "";
      list[i].role = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e;
      const list = [...hpc];
      const name = hpc[i].optIrt;
      list[i].optIrt = value;
      list[i].role = e == "yes" ? setDefaultRole : "Other";
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
    setCounterFlag(counterFlag + 1);
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
      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
        let consetValue = e.value;
        if (e.value == "B&H") {
          consetValue = "Bosnia and Herzegovina";
        }
        const matchingKeys = Object.entries(totalData.site_country_data)
          .filter(([key, value]) => value === consetValue)
          .map(([key, value]) => key);
        const filteredSiteNames = matchingKeys.map((key) => ({
          label: totalData.site_data[key],
          value: totalData.site_data[key],
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
      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      setHpc(list);
    }
  };

  const onSiteNumberChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteNumber = "";
      setHpc(list);
    } else {
      let getSiteData = totalData.site_data;
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
      let getSiteData = totalData.site_data;
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

  const deleteRecord = (i) => {
    const list = hpc;
    list.splice(i, 1);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const saveClicked = async () => {
    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
          return {
            first_name: data?.firstname,
            last_name: data?.lastname,
            email: data?.email,
            country: data?.country,
            // contact_type: data.contact_type,
            siteNumber: data?.siteNumber ? data.siteNumber : "",
            siteName: data?.siteName ? data.siteName : "",
            investigator_type: data?.role,
            siteIrt: data?.optIrt == "yes" ? 1 : 0,
            institution_type: data?.institutionType
              ? data?.institutionType
              : "",
          };
        } else {
          return {
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            country: data.country,
            contact_type: data.contact_type,
          };
        }
      });

      const body = {
        data: body_data,
        user_id: localStorage.getItem("user_id"),
        smart_list_id: "",
      };

      const status = body.data.map((data) => {
        if (
          data.email == "" ||
          data?.institution_type == "" ||
          data.first_name == "" ||
          data.last_name == "" ||
          data.country == ""
        ) {
          if (
            data.first_name == "" &&
            (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
          ) {
            return "Please enter the first name";
          } else if (
            data.last_name == "" &&
            (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
          ) {
            return "Please enter the last name";
          } else if (data.email == "") {
            return "Please enter the email atleast";
          }
          // else if (data.email != "") {
          //   let email = data.email;
          //   let useremail = email.trim();
          //   var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          //   if (regex.test(String(useremail).toLowerCase())) {
          //     let prev_obj = selectedHcp.find((x) => x.email === useremail);
          //     if (typeof prev_obj != "undefined") {
          //       return "User with same email already added in list.";
          //     }
          //   } else {
          //     return "Email format is not valid";
          //   }
          // }

          if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
            if (data.institution_type == "") {
              return "Please enter the institution ";
            }
            if (data.country == "") {
              return "Please select the country";
            }
          }
          return "true";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = selectedHcp.find((x) => x.email === useremail);
            if (typeof prev_obj != "undefined") {
              return "User with same email already added in list.";
            }
          } else {
            return "Email format is not valid";
          }
          return "true";
        } else {
          return "true";
        }
      });
      status.sort();
      if (status.every((element) => element == "true")) {
        loader("show");

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        await axios
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfully");
              res.data.response.data.map((data) => {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              });
              setIsOpen(false);
              loader("hide");
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
            //setSelectedHcp(res.data.response.data);
          })
          .catch((err) => {
            loader("hide");
            toast.error("Somwthing went wrong");
          });
      } else {
        const filteredArray = status.filter((value) => value !== "true");
        toast.warning(filteredArray?.[0]);
        // toast.warning(status[0]);
      }
      // setIsOpen(false);
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", "");
      formData.append("reader_file", selectedFile);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      if (selectedFile) {
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfully");
              res.data.response.data.map((data) => {
                setSelectedHcp((oldArray) => [...oldArray, data]);
                setIsOpen(false);
                setActiveManual("active");
                setActiveExcel("");
                setSelectedFile(null);
                loader("hide");
              });
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setIsOpen(false);
      } else {
        toast.error("Please add a excel file");
      }
    }
  };

  const addMoreHcp = () => {
    const status = hpc.map((data) => {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
        if (
          data?.firstname == "" ||
          data?.lastname == "" ||
          data?.country == "" ||
          data?.email == "" ||
          data?.institutionType == ""
        ) {
          return "false";
        } else {
          return "true";
        }
      } else {
        if (data.email == "") {
          return "false";
        } else {
          return "true";
        }
      }
    });

    if (status.every((element) => element == "true")) {

      let setDefaultRole = irtRole?.[0]?.value ? irtRole?.[0]?.value : "";    
      if(state?.IrtObj?.siteRole && (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")){
        const userRoleIndex = irtRole.findIndex(role => role.value.toLowerCase() === state?.IrtObj?.siteRole.toLowerCase());
        setDefaultRole = irtRole?.[userRoleIndex]?.value;
      }


      setHpc([
        ...hpc,
        {
          firstname: "",
          lastname: "",
          email: "",
          contact_type: "",
          country: "",
          countryIndex: "",
          role:
            (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
              ? setDefaultRole
              : "",
          optIrt:
            (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
              ? "yes"
              : "",
          institutionType: "",
        },
      ]);
    } else {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
        toast.warning("Please input the required fields.");
      } else {
        toast.warning("Please input the required fields.");
      }
    }
  };

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
      )?.innerText;
      const country_edit = document.getElementById(
        "field_country" + profile_user_id
      )?.value;
      const contact_type_edit = document.getElementById(
        "field_contact_type" + profile_user_id
      )?.value;

      const arr = [];
      arr.push({
        profile_id: "",
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

  const backClicked = () => {
    props.getSearched(searchedUsers);
    props.getSelected(selectedHcp);
    if(irtRoleObj?.IRTFlag){
      navigate("/CreateEmail",{state: {IrtObj:irtRoleObj}})
    }else{
      navigate("/SelectHCP");
    }
  };

  const searchHcp = async (e) => {
    e.preventDefault();
    if (name.trim().length == 0 && email.trim().length == 0) {
      toast.error("Please enter search criteria");
    } else {
      const body = {
        user_id: localStorage.getItem("user_id"),
        name: name,
        email: email,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/search_hcp`, body)
        .then((res) => {
          if (res.data.status_code === 200) {
            setSearchedUsers(res.data.response.data);
          } else {
            setSearchedUsers([]);
          }
          if (res.data.message) {
            setMessage(res.data.message);
          }
          loader("hide");
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
    }
  };

  const saveEditClicked = async () => {
    setEditable(0);
    if (editableData?.length > 0) {
      editableData?.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data.profile_user_id
        ).innerText;
        const country_edit = document.getElementById(
          "field_country" + data.profile_user_id
        )?.value;
        const edit_index = document.getElementById(
          "field_index" + data.profile_user_id
        )?.value;
        const contact_type_edit = document.getElementById(
          "field_contact_type" + data.profile_user_id
        )?.value;

        let prev_obj = selectedHcp.find(
          (x) => x.profile_user_id === data.profile_user_id
        );
        if (typeof prev_obj != "undefined") {
          if (typeof selectedHcp[edit_index] != "undefined") {
            selectedHcp[edit_index].country = country_edit;
          }
          if (typeof selectedHcp[edit_index] != "undefined") {
            selectedHcp[edit_index].contact_type = contact_type_edit;
          }
        }

        data.contact_type = contact_type_edit;
        data.country = country_edit;
        data.username = name_edit;
      });

      const body = {
        user_id: localStorage.getItem("user_id"),
        edit_list_array: editableData,
      };
      setSaveOpen(false);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`distributes/update_reders_details`, body)
        .then((res) => {
          loader("hide");
          if (res.data.status_code === 200) {
            toast.success("data updated successfully");
          } else {
            popup_alert({
              visible: "show",
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log("something went wrong");
        });
      setEditableData([]);
    } else {
      setSaveOpen(false);
      toast.warning("No row update");
    }
  };

  const closeClicked = () => {
    setSaveOpen(false);
    setEditable(0);
    let vr = selectedHcp;
    setSelectedHcp([]);
    setTimeout(() => {
      setSelectedHcp(vr);
      updateReader();
      console.log("This will run after 1 second!");
      setUpdateCounter(updateCounter + 1);
    }, 50);
  };

  const saveAsDraft = async () => {
    // console.log("hi");
    // console.log(props);
    // console.log(selectedHcp);
    // const body = {
    //   user_id: localStorage.getItem("user_id"),
    //   pdf_id: props.getDraftData.pdf_id,
    //   description: props.getDraftData.description,
    //   creator: props.getDraftData.creator,
    //   campaign_name: props.getDraftData.campaign,
    //   subject: props.getDraftData.subject,
    //   route_location: "VerifyHCP",
    //   tags: props.getDraftData.tags,
    //   campaign_data: {
    //     template_id: props.getDraftData.template_id,
    //     // selectedHcp: selectedHcp.map((hcp) => {
    //     //   return hcp.user_id;
    //     // }),
    //   },
    //   campaign_id: props.getDraftData.campaign_id || "",
    // };

    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: old_object?.PdfSelected
        ? old_object.PdfSelected
        : props.getDraftData.pdf_id,
      description: old_object?.emailDescription
        ? old_object.emailDescription
        : props.getDraftData?.description
        ? props.getDraftData.description
        : "",
      creator: old_object?.emailCreator
        ? old_object.emailCreator
        : props.getDraftData?.creator
        ? props.getDraftData.creator
        : "",
      campaign_name: old_object?.emailCampaign
        ? old_object.emailCampaign
        : props.getDraftData.campaign,
      subject: old_object?.emailSubject
        ? old_object.emailSubject
        : props.getDraftData.subject,
      route_location: "VerifyHCP",
      tags: old_object?.tags ? old_object.tags : props.getDraftData.tags,
      campaign_data: {
        template_id: old_object?.templateId
          ? old_object.templateId
          : props.getDraftData.campaign_data.template_id,
        selectedHcp: selectedHcp,
        searchedUsers:irtRoleObj?.IRTFlag?searchedUsers:[],
        list_selection: old_object?.selected
          ? old_object.selected
          : props.getDraftData?.campaign_data?.list_selection
          ?props.getDraftData?.campaign_data?.list_selection
          :"",
      },

      campaign_id: campaign_id_st,
      source_code: old_object?.template
        ? old_object.template
        : props.getDraftData.source_code,
      status: 2,
    };
    // console.log(body,'body')
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res.data.status_code === 200) {
          setCampaign_id(res.data.response.data.id);
          setSelectedHcp(selectedHcp);
          if(irtRoleObj?.IRTFlag){
            setSearchedUsers(searchedUsers)
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: "/IRTRole",
            });
          }else{
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br />successfully !",
              type: "success",
              redirect: "/EmailList",
            });
          }
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const handleSelectUsers = () => {
    navigate("/EmailArticleSelect", {
      state: {IrtObj:irtRoleObj},
    });
  };
 
  const handleCreateMail = () => {
    navigate("/CreateEmail", {
      state: {IrtObj:irtRoleObj},
    });
  };

  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button
                      className="btn btn-primary btn-bordered back"
                      onClick={backClicked}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <ul className="tabnav-link">
                  <li className="active" onClick={handleSelectUsers}>
                      {/* <Link to="/EmailArticleSelect">Select Content</Link> */}
                      Select Content
                    </li>
                    <li className="active" onClick={handleCreateMail}>
                      {/* <Link to="/CreateEmail">Create Your Email</Link> */}
                      Create Your Email
                    </li>
                    {/*
                  <li className="active">
                    <Link to="/SelectHCP">Select HCPs</Link>
                  </li>
                  */}
                    <li className="active active-main">
                      <a href="javascript:void(0)">
                        {
                          IRTTraining ? "Verify Your IRT" : 
                          irtRoleObj?.IRTFlag ? "Select & Verify Your IRTs" :
                          "Select & Verify Your HCPs"
                        }
                      </a>
                    </li>

                    <li className="">
                      <a href="javascript:void(0)">Verify your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-3">
                  <div className="header-btn">
                    {
                      IRTTraining ? 
                        <Link to = {"/new-readers-reviews"}
                          // state= {{siteRole: irtRoleObj?.siteRole }}
                          state= {irtRoleObj}
                          className="btn btn-primary btn-bordered move-draft">
                          Cancel
                        </Link>
                      : 
                      <>
                        {
                          (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                          ?
                            <>
                              {
                                irtRoleObj?.IRTFlag ? 
                                  <Link to = {"/RD-EmailList"}
                                  state= {{IrtObj: irtRoleObj}}
                                    className="btn btn-primary btn-bordered engine_cancel">
                                    Cancel
                                  </Link>
                                :
                                <Link to = {"/EmailList"}
                                  className="btn btn-primary btn-bordered engine_cancel">
                                  Cancel
                                </Link>
                              }
                              
                              <button
                                onClick={saveAsDraft}
                                className="btn btn-primary btn-bordered move-draft"
                              >
                                Save As Draft
                              </button>
                            </>  
                          :
                            <button
                              onClick={saveAsDraft}
                              className="btn btn-primary btn-bordered move-draft"
                            >
                              Save As Draft
                            </button>
                        }
                      </>
                    }

                    {selectedHcp.length === 0 ? (
                      <button className="btn btn-primary btn-filled next disabled">
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={nextClicked}
                        className="btn btn-primary btn-filled next"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {
              !irtRoleObj?.IRTFlag ? 
                <div className="top-header">
                  <div className="page-title">
                    <h4>
                      {localStorage.getItem("user_id") == userId
                        ? "Search For User By:"
                        : "Search For HCP By:"}
                    </h4>
                  </div>
                </div>
                : null
            }

            <section className="search-hcp">
              {
                !IRTTraining ? 
                <>
                  <div className="form-search-hcp">
                    <form>
                    {
                      !irtRoleObj?.IRTFlag ?
                      <div className="form-inline row justify-content-between align-items-center">
                        <div className="col-12 col-md-7">
                          <div className="row justify-content-between align-items-center">
                            <div className="form-group col-sm-6">
                              <label htmlFor="hcp-name">Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id=""
                                onChange={(e) => nameChanged(e)}
                              />
                            </div>
                            <div className="form-group col-sm-6">
                              <label htmlFor="hcp-email">Email</label>
                              <input
                                type="mail"
                                className="form-control"
                                id=""
                                onChange={(e) => emailChanged(e)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-button col-12 col-md-5">
                          <button
                            className="btn btn-primary btn-filled"
                            onClick={(e) => searchHcp(e)}
                          >
                            Search
                          </button>
                          <button
                            className="btn btn-primary btn-bordered"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#add_hcp"
                            onClick={addNewHcp}
                          >
                            {localStorage.getItem("user_id") == userId
                              ? "Add User +"
                              : "Add HCP +"}
                          </button>
                        </div>
                      </div>
                      : 
                      <div className="form-inline">
                        {localStorage.getItem("user_id") == userId
                              ? <div className="d-flex justify-content-between align-items-end"><div className="select-irt">
                                  <h4>Select IRTs :</h4>
                                  <p>If you do not see the wanted IRTs here please go to CRM and check if they correctly added</p>
                                  </div>
                                  <div className="form-button d-flex justify-content-end align-items-center">
                                    <button
                                      className="btn btn-primary btn-bordered"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#add_hcp"
                                      onClick={addNewHcp}
                                    >
                                      {localStorage.getItem("user_id") == userId
                                        ? "Add User +"
                                        : "Add HCP +"}
                                    </button>
                                  </div>
                              </div>
                              : 
                              <div className="form-button d-flex justify-content-end align-items-center">
                                <button
                                  className="btn btn-primary btn-bordered"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add_hcp"
                                  onClick={addNewHcp}
                                >
                                  {localStorage.getItem("user_id") == userId
                                    ? "Add User +"
                                    : "Add HCP +"}
                                </button>
                              </div>
                              }
                        
                      </div>
                    }  
                  
                    </form>
                  </div>
                  <div className="search-hcp-table">
                    <div
                      className={
                        searchedUsers?.length === 0
                          ? "search-hcp-table-inside not-found"
                          : "search-hcp-table-inside"
                      }
                    >
                      {searchedUsers?.length === 0 ? (
                        <div className="not-found">
                          <h4>No Record Found !</h4>
                        </div>
                      ) : (
                        <table className="table">
                          <thead className="stick-header irts">
                            <tr>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('name')}>
                                Name
                                <button
                                    className={`event_sort_btn ${sortBy == 'name'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('name')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                </span>
                                </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('email')}>
                                Email
                                <button
                                    className={`event_sort_btn ${sortBy == 'email'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('email')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
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
                              <span onClick={() => handleSort('country')}>
                                Country
                                <button
                                    className={`event_sort_btn ${sortBy == 'country'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('country')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                </span>
                                </th>
                              {(localStorage.getItem("user_id") ===
                              "56Ek4feL/1A8mZgIKQWEqg==" 
                              ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                              ? (
                                <>
                                <th scope="col" className="sort_option">
                                <span onClick={() => handleSort('site_number')}>
                                  Site number
                                  <button
                                    className={`event_sort_btn ${sortBy == 'site_number'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('site_number')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                  </span>
                                  </th>
                                  <th scope="col" className="sort_option">
                                  <span onClick={() => handleSort('irt')}>
                                    IRT mandatory training
                                    <button
                                    className={`event_sort_btn ${sortBy == 'irt'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('irt')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                    </span>
                                    </th>
                                  <th scope="col" className="sort_option">
                                  <span onClick={() => handleSort('user_type')}>
                                    IRT role
                                    <button
                                    className={`event_sort_btn ${sortBy == 'user_type'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('user_type')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
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
                                  <span onClick={() => handleSort('ibu')}>
                                    Business unit
                                    <button
                                    className={`event_sort_btn ${sortBy == 'ibu'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('ibu')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                    </span>
                                    </th>
                                  <th scope="col" className="sort_option">
                                  <span onClick={() => handleSort('contact_type')}>
                                    Contact type
                                    <button
                                    className={`event_sort_btn ${sortBy == 'contact_type'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('contact_type')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                    </span>
                                    </th>
                                </>
                              )}

                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('consent')}>
                                Consent
                                <button
                                    className={`event_sort_btn ${sortBy == 'consent'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('consent')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                </span>
                                </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('email_received')}>
                                Email received
                                <button
                                    className={`event_sort_btn ${sortBy == 'email_received'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('email_received')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                </span>
                                </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('email_opening')}>
                                Openings
                                <button
                                    className={`event_sort_btn ${sortBy == 'email_opening'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('email_opening')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                </span>
                                </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('registration')}>
                                Registrations
                                <button
                                    className={`event_sort_btn ${sortBy == 'registration'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('registration')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                </span>
                                </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('last_email')}>
                                Last email

                                <button
                                    className={`event_sort_btn ${sortBy == 'last_email'
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                      }`}
                                    onClick={() => handleSort('last_email')}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="8"
                                      height="8"
                                      viewBox="0 0 8 8"
                                      fill="none"
                                    >
                                      <g clip-path="url(#clip0_3722_6611)">
                                        <path
                                          d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                          fill="#97B6CF"
                                        />
                                      </g>
                                      <defs>
                                        <clipPath id="clip0_3722_6611">
                                          <rect
                                            width="8"
                                            height="8"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                  </button>
                                </span>
                                </th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {searchedUsers?.map((users, index) => { */}
                            {sortData(searchedUsers, sortBy, sortOrder).map((users, index) => {
                              return (
                                <>
                                  <tr>
                                    <td>{users?.name?users?.name:users?.first_name}</td>
                                    <td>{users?.email ? users?.email : "N/A"}</td>
                                    <td>{users?.bounce ? users?.bounce : "N/A"}</td>
                                    <td>
                                      {users?.country ? users?.country : "N/A"}
                                    </td>
                                    {(localStorage.getItem("user_id") ==
                                            "56Ek4feL/1A8mZgIKQWEqg=="
                                            ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                            &&(<><td>{users?.site_number?users?.site_number:"N/A"}</td></>)}
                                    <td>
                                      {(localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg=="
                                      ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                        ? users?.irt
                                          ? "Yes"
                                          : "No"
                                        : users?.ibu
                                        ? users?.ibu
                                        : "N/A"}
                                    </td>
                                    <td>
                                      {(localStorage.getItem("user_id") ===
                                      "56Ek4feL/1A8mZgIKQWEqg=="
                                      ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                        ? users?.user_type!=0
                                          ? users?.user_type
                                          : "N/A"
                                        : users?.contact_type
                                        ? users?.contact_type
                                        : "N/A"}
                                    </td>
                                    <td>
                                      <span>
                                        {users?.consent ? users?.consent : "N/A"}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {users?.email_received
                                          ? users?.email_received
                                          : "N/A"}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {users?.email_opening
                                          ? users?.email_opening
                                          : "N/A"}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {users?.registration
                                          ? users?.registration
                                          : "N/A"}
                                      </span>
                                    </td>
                                    <td>
                                      <span>
                                        {users?.last_email
                                          ? users?.last_email
                                          : "N/A"}
                                      </span>
                                    </td>
                                    <td className="add-new-hcp">
                                      <img
                                        src={path_image + "add-row.png"}
                                        alt="Add More"
                                        onClick={() => selectHcp(index)}
                                      />
                                    </td>
                                  </tr>
                                </>
                              );
                            })}

                            {/* <tr>
                      <td>Jacob Flindt</td>
                      <td>User@docintel.app</td>
                      <td>No</td>
                      <td>United Kingdom</td>
                      <td>CIS</td>
                      <td>Haematology</td>
                      <td>Tech</td>
                      <td>Yes</td>
                      <td>43</td>
                      <td>30</td>
                      <td>28</td>
                      <td>Nov 18 </td>
                      <td className="add-new-hcp">
                        <img src={path_image + "add-row.png"} alt="Add More" />
                      </td>
                    </tr> */}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </>  
                : null
              }
              
              <div className="selected-hcp-table">
                <div className="table-title">
                  <h4>
                    {IRTTraining ? 'Selected IRT' :
                      irtRoleObj?.IRTFlag ? "Selected IRTs" :
                     'Selected HCPs'}
                    
                    <span>| {selectedHcp?.length}</span>
                  </h4>
                  <div className="selected-hcp-table-action">
                    {editable == false ? (
                      <>
                        <div className="hcp-added">
                          <button
                            className="btn btn-outline-primary"
                            onClick={editablemade}
                          >
                            <img src={path_image + "edit.svg"} alt="" />
                          </button>
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
                  {selectedHcp.length === 0 ? (
                    <div className="not-found">
                      <h4>No Contact selected yet!</h4>
                    </div>
                  ) : (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="sort_option">
                          <span onClick={() => handleSort('first_name')}>
                            Name
                            <button
                                className={`event_sort_btn ${sortBy == 'first_name'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('first_name')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                            </th>
                          <th scope="col" className="sort_option">
                          <span onClick={() => handleSort('email')}>
                            Email
                            <button
                                className={`event_sort_btn ${sortBy == 'email'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('email')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
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
                          <span onClick={() => handleSort('country')}>
                            Country
                            <button
                                className={`event_sort_btn ${sortBy == 'country'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('country')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                            </th>

                          {(localStorage.getItem("user_id") ===
                          "56Ek4feL/1A8mZgIKQWEqg==" 
                          ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                          ? (
                            <>
                            <th scope="col" className="sort_option">
                            <span onClick={() => handleSort('site_number')}>
                              Site number
                              <button
                                className={`event_sort_btn ${sortBy == 'site_number'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('site_number')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                              </span>
                              </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('irt')}>
                                IRT mandatory training
                                <button
                                className={`event_sort_btn ${sortBy == 'irt'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('irt')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                                </span>
                                </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('user_type')}>
                                IRT role
                                <button
                                className={`event_sort_btn ${sortBy == 'user_type'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('user_type')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
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
                              <span onClick={() => handleSort('ibu')}>
                                Business unit
                                <button
                                className={`event_sort_btn ${sortBy == 'ibu'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('ibu')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                                </span>
                                </th>
                              <th scope="col" className="sort_option">
                              <span onClick={() => handleSort('contact_type')}>
                                Interest
                                <button
                                className={`event_sort_btn ${sortBy == 'contact_type'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('contact_type')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                                </span>
                                </th>
                            </>
                          )}
                          <th scope="col" className="sort_option">
                          <span onClick={() => handleSort('consent')}>
                            Consent
                            <button
                                className={`event_sort_btn ${sortBy == 'consent'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('consent')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                            </th>
                          <th scope="col" className="sort_option">
                          <span onClick={() => handleSort('email_received')}>
                            Email received
                            <button
                                className={`event_sort_btn ${sortBy == 'email_received'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('email_received')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                            </th>
                          <th scope="col" className="sort_option">
                          <span onClick={() => handleSort('email_opening')}>
                            Openings
                            <button
                                className={`event_sort_btn ${sortBy == 'email_opening'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('email_opening')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                            </th>
                          <th scope="col" className="sort_option">
                          <span onClick={() => handleSort('registration')}>
                            Registrations
                            <button
                                className={`event_sort_btn ${sortBy == 'registration'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('registration')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                            </th>
                          <th scope="col"  className="sort_option">
                          <span onClick={() => handleSort('last_email')}>
                            Last email
                            <button
                                className={`event_sort_btn ${sortBy == 'last_email'
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                  }`}
                                onClick={() => handleSort('last_email')}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_3722_6611)">
                                    <path
                                      d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                      fill="#97B6CF"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect
                                        width="8"
                                        height="8"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                            </th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {selectedHcp?.map((data, index) => { */}
                        {sortData(selectedHcp, sortBy, sortOrder).map((data, index) => {
                          return (
                            <>
                              <tr
                                id={`row-selected` + index}
                                onClick={(e) =>
                                  editing(
                                    //  e.currentTarget,
                                    data?.profile_id,
                                    data?.profile_user_id,
                                    data?.email,
                                    data?.jobTitle,
                                    data?.company,
                                    data?.country,
                                    data?.first_name + " " + data?.last_name,
                                    (localStorage.getItem("user_id") ===
                                      "56Ek4feL/1A8mZgIKQWEqg=="
                                      ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                      ? data?.user_type
                                      : data?.contact_type
                                  )
                                }
                              >
                                <td
                                  id={`field_name` + data?.profile_user_id}
                                  contenteditable={
                                    editable === 0 ? "false" : "true"
                                  }
                                >
                                  <span>{data?.name || data?.first_name}</span>
                                </td>
                                <td id={`field_email` + data?.profile_user_id}>
                                  {data?.email ? data?.email : "N/A"}
                                </td>
                                <input
                                  type="hidden"
                                  id={`field_index` + data.profile_user_id}
                                  value={index}
                                />
                                <td
                                  id={`field_bounced` + data?.profile_user_id}
                                >
                                  {data?.bounce ? data?.bounce : "N/A"}
                                </td>
                                <td>
                                  {editable ? (
                                    <EditCountry
                                      selected_country={data?.country}
                                      profile_user={data?.profile_user_id}
                                    ></EditCountry>
                                  ) : (
                                    <span>
                                      {data?.country ? data?.country : "N/A"}
                                    </span>
                                  )}
                                </td>
                                {(localStorage.getItem("user_id") ==
                                        "56Ek4feL/1A8mZgIKQWEqg=="
                                        ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                        &&(<><td>{data?.site_number?data?.site_number:"N/A"}</td></>)}
                                <td>
                                  {/*data?.ibu ? data?.ibu : "N/A"*/}
                                  {(localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                    ? data?.irt
                                      ? "Yes"
                                      : "No"
                                    : data?.ibu
                                    ? data?.ibu
                                    : "N/A"}
                                </td>
                                <td>
                                  {(localStorage.getItem("user_id") ===
                                  "56Ek4feL/1A8mZgIKQWEqg==" 
                                  ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                  ? (
                                    data?.user_type != 0 ? (
                                      data?.user_type
                                    ) : (
                                      "N/A"
                                    )
                                  ) : editable ? (
                                    <EditContactType
                                      selected_ibu={data?.contact_type}
                                      profile_user={data?.profile_user_id}
                                    ></EditContactType>
                                  ) : (
                                    <span>
                                      {data?.contact_type
                                        ? data?.contact_type
                                        : "N/A"}
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <span>
                                    {data?.consent ? data?.consent : "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <span>
                                    {data?.email_received
                                      ? data?.email_received
                                      : "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <span>
                                    {data?.email_opening
                                      ? data?.email_opening
                                      : "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <span>
                                    {data?.registration
                                      ? data?.registration
                                      : "N/A"}
                                  </span>
                                </td>
                                <td>
                                  <span>
                                    {data?.last_email
                                      ? data?.last_email
                                      : "N/A"}
                                  </span>
                                </td>
                                {
                                  !IRTTraining ?
                                    <td className="delete_row" colSpan="12">
                                      <img
                                        src={path_image + "delete.svg"}
                                        alt="Delete Row"
                                        onClick={() => deleteSelected(index)}
                                      />
                                    </td>
                                  : null
                                }
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal
        id="add_hcp"
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          //className="modal fade"
          //id="add_hcp"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          //aria-labelledby="add_hcp"
          aria-hidden="true"
        >
          {/* <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content"> */}

          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              {localStorage.getItem("user_id") == userId
                ? "Add New User +"
                : "Add New HCP"}
            </h5>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </Modal.Header>
          <Modal.Body>
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
                                    {(localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" 
                                      ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                      && (
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
                                    {(localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" 
                                      ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                      && (
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
                              {(localStorage.getItem("user_id") ===
                              "56Ek4feL/1A8mZgIKQWEqg=="
                              ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                              ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group bottom">
                                      <label for="">
                                        Institution <span>*</span>
                                      </label>
                                      <Select
                                        options={institutionType}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onInstitutionChange(event, i)
                                        }
                                        defaultValue={
                                          val?.institutionType
                                            ? {
                                                label: val?.institutionType,
                                                value: val?.institutionType,
                                              }
                                            : ""
                                        }
                                        placeholder="Select institution"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">
                                        IRT mandatory training
                                      </label>

                                      <Select
                                        options={optIRT}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onIRTChange(event?.value, i)
                                        }
                                        defaultValue={
                                          val?.optIrt
                                            ? {
                                                label: "Yes",
                                                value: val?.optIrt,
                                              }
                                            : ""
                                        }
                                        value={
                                          optIRT.findIndex(
                                            (el) => el.value == val?.optIrt
                                          ) == -1
                                            ? ""
                                            : optIRT[
                                                optIRT.findIndex(
                                                  (el) =>
                                                    el.value == val?.optIrt
                                                )
                                              ]
                                        }
                                        placeholder="Select IRT"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT role</label>
                                      {val?.optIrt == "yes" ? (
                                        <Select
                                          options={irtRole}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onRoleChange(event, i)
                                          }
                                          value={
                                            irtRole?.findIndex(
                                              (el) => el.value == val?.role
                                            ) == -1
                                              ? ""
                                              : irtRole[
                                                  irtRole?.findIndex(
                                                    (el) =>
                                                      el.value == val?.role
                                                  )
                                                ]
                                          }
                                          isClearable
                                          placeholder="Select Role"
                                        />
                                      ) : val?.optIrt == "no" ? (
                                        <Select
                                          options={role}
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          onChange={(event) =>
                                            onRoleChange(event, i)
                                          }
                                          value={
                                            role?.findIndex(
                                              (el) => el.value == val?.role
                                            ) == -1
                                              ? ""
                                              : role[
                                                  role?.findIndex(
                                                    (el) =>
                                                      el.value == val?.role
                                                  )
                                                ]
                                          }
                                          isClearable
                                          placeholder="Select Role"
                                        />
                                      ) : (
                                        <Select
                                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                          placeholder="Select Role"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
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
                                      {/*
                                      <select
                                      className="form-contact"
                                      aria-label="select"
                                      onChange={(event) =>
                                      onContactTypeChange(event, i)
                                    }
                                    >
                                    <option selected>Select Type</option>
                                    <option value="HCP">HCP</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Test Users">
                                    Test Users
                                    </option>
                                    </select>
                                      */}
                                    </div>
                                  </div>
                                </>
                              )}
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Country{" "}
                                    {(localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" 
                                      ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                                      && (
                                      <span>*</span>
                                    )}
                                  </label>
                                  {val?.optIrt == "yes" ? (
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
                                                (el) => el.value == val?.country
                                              )
                                            ]
                                      }
                                      placeholder="Select Country"
                                      filterOption={createFilter(filterConfig)}
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
                                                (el) => el.value == val?.country
                                              )
                                            ]
                                      }
                                      placeholder="Select Country"
                                      filterOption={createFilter(filterConfig)}
                                      isClearable
                                    />
                                  )}

                                  {/*<DropdownButton className="dropdown-basic-button split-button-dropup country"
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

                                          <select
                                          className="country-form"
                                          aria-label="select"
                                          onChange={(event) =>
                                          onCountryChange(event, i)
                                        }
                                        >
                                        <option selected value="">
                                        Select Country
                                        </option>
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <option value={index}>
                                        {item}
                                        </option>
                                        </>
                                      );
                                    }
                                  )}
                                  </select>
                                    */}
                                </div>
                              </div>

                              {/*
                                <div className="col-12 col-md-6 btn-last">
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

                              {(localStorage.getItem("user_id") ===
                              "56Ek4feL/1A8mZgIKQWEqg==" 
                              ||localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==")
                              ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site number</label>

                                      <Select
                                        options={siteNumberAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNumberChange(event, i)
                                        }
                                        value={
                                          siteNumberAll[hpc[i]?.siteNumberIndex]
                                            ? siteNumberAll[
                                                hpc[i]?.siteNumberIndex
                                              ]
                                            : ""
                                        }
                                        placeholder={"Select Site Number"}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site name</label>

                                      <Select
                                        options={siteNameAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNameChange(event, i)
                                        }
                                        value={
                                          siteNameAll[hpc[i].siteNameIndex]
                                            ? siteNameAll[hpc[i].siteNameIndex]
                                            : ""
                                        }
                                        placeholder={"Select Site Name"}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
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
                                    id="add_hcp_btn"
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
                                      id="add_file_btn"
                                      onClick={addFile}
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
                      <div className="form-group files">
                        <div className="box">
                        <input
                          type="file"
                          className="form-control inputfile"
                        id="file-4"
                        onChange={onFileChange}
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          ref={file_name}
                          />
                          {(file_name.current?.files===undefined || file_name.current.files?.length===0 )? <><label htmlFor="file-4"><span>Choose Your File</span></label>
                          <p>Upload your excel file</p></> : <h5>{file_name.current.files[0].name}</h5> }

                      </div>
                      </div>
                      </div>
                    </div>
                  </form>
                  */}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </Modal.Footer>

          {/* <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add New HCP
            </h5>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div> */}
          {/* <div className="modal-body">
            <div className="hcp-add-box">
              <div className="hcp-add-form tab-content">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
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
                                onChange={(event) => onLastNameChange(event, i)}
                                value={val.lastname}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email-desc"
                                name={`${fieldName}.email`}
                                onChange={(event) => onEmailChange(event, i)}
                                value={val.email}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Contact Type</label>
                              <select
                                className="form-contact"
                                aria-label="select"
                                onChange={(event) =>
                                  onContactTypeChange(event, i)
                                }
                              >
                                <option selected>Select Type</option>
                                <option value="HCP">HCP</option>
                                <option value="Staff">Staff</option>
                                <option value="Test Users">Test Users</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Country</label>
                              <select
                                className="country-form"
                                aria-label="select"
                                onChange={(event) => onCountryChange(event, i)}
                              >
                                <option selected>Select Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="Russia">Russia</option>
                              </select>
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
                        </div>
                      </>
                    );
                  })} */}
          {/* <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email-desc"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Contact Type</label>
                        <select className="form-contact" aria-label="select">
                          <option selected>Select Type</option>
                          <option value="1">HCP</option>
                          <option value="2">HCP</option>
                          <option value="3">HCP</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Country</label>
                        <select className="country-form" aria-label="select">
                          <option selected>Select Country</option>
                          <option value="1">India</option>
                          <option value="2">USA</option>
                          <option value="3">Russia</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
          {/* </form>
                <form id="add_file" className={"tab-pane" + activeExcel}>
                  <div className="form-group files">
                    <input
                      type="file"
                      className="form-control"
                      multiple=""
                      onChange={onFileChange}
                    />
                  </div>
                </form>
              </div>
              <div className="hcp-modal-action">
                <div className="hcp-action-block">
                  <div className="hcp-remove">
                    <button
                      type="button"
                      className="btn btn-filled"
                      onClick={addMoreHcp}
                    >
                      Add
                    </button>
                  </div> */}
          {/* <div className="hcp-remove">
                    <button type="button" className="btn btn-filled">
                      <img src={path_image + "delete.svg"} alt="Delete HCP" />
                    </button>
                  </div> */}
          {/* <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item add_hcp">
                      <a
                        onClick={addHcp}
                        className="nav-link active btn-bordered"
                        data-bs-toggle="tab"
                        href="#add_hcp_form"
                      >
                        Add HCP +
                      </a>
                    </li>
                    <li className="nav-item add-file">
                      <a
                        onClick={addFile}
                        className="nav-link btn-filled"
                        data-bs-toggle="tab"
                        href="#add_file"
                      >
                        Add File
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </div> */}
        </div>
        {/* </div>
        </div> */}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  old_object = state.getEmailData;
  selected_Data = state.getSelected;
  searched_Data=state.getSearched;
  return state;
};

export default connect(mapStateToProps, {
  getEmailData,
  getSelected,
  getSearched,
})(VerifyHCP);
