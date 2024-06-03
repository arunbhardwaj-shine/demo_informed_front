import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../loader";

import TableOnly from "./TableOnly";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import { Modal, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import EditCountry from "../CommonComponent/EditCountry";
import EditContactType from "../CommonComponent/EditContactType";
import Select, { createFilter } from "react-select";
var old_object = {};
const SelectSmartListUsers = (props) => {
  const [totalData, setTotalData] = useState({});
  const [siteNumberAll, setSiteNumberAll] = useState([]);
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [role, setRole] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [institutionType, setInstitutionType] = useState([]);
  const [optIRT, setoptIRT] = useState([
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]);
  const filterConfig = {
    matchFrom: "start",
  };
  const navigate = useNavigate();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const location = useLocation();
  const [readers, setReaders] = useState([]);
  const [campaign_id_st, setCampaign_id] = useState();
  const [SendListData, setSendListData] = useState([]);
  const [PdfSelected, setPdfSelected] = useState(0);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [apiStatus, setApiStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [TemplateId, setTemplateId] = useState(0);
  const [removedReaders, setRemovedReaders] = useState([]);
  const [unSubscribedUsers, setUnSubscribedUsers] = useState([]);
  const [readersNewlyAdded, setReadersNewlyAdded] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
  const [update, setUpdate] = useState(0);
  const [activeManual, setActiveManual] = useState("active");
  const [activeExcel, setActiveExcel] = useState("");
  const [editableData, setEditableData] = useState([]);
  const [manualReRender, setManualReRender] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [counterFlag, setCounterFlag] = useState(0);
  const [countryall, setCountryall] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [editable, setEditable] = useState(0);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [sortBy, setSortBy] = useState("first_name"); // Initial sort key
  const [sortOrder, setSortOrder] = useState("asc");
  const switch_account_detail = JSON.parse(
    localStorage.getItem("switch_account_detail")
  );
  const [localStorageUserId, setLocalStorageUserId] = useState(
    switch_account_detail != null &&
      switch_account_detail != "undefined" &&
      switch_account_detail
      ? switch_account_detail?.user_id
      : localStorage.getItem("user_id")
  );
  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
      role:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ? irtRole?.[0]?.value
          : "",
      optIrt:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ? "yes"
          : "",
      institutionType: "",
    },
  ]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [validationError, setValidationError] = useState({});

  // const smartListSelected = location.state
  //   ? location.state.smartListSelected
  //   : props.getDraftData.smart_list_data;

  // useEffect(() => {
  //   let campaign_id =
  //     typeof old_object === "object" &&
  //       old_object !== null &&
  //       old_object?.campaign_id
  //       ? old_object.campaign_id
  //       : props.getDraftData?.campaign_id
  //         ? props.getDraftData.campaign_id
  //         : "";
  //   setCampaign_id(campaign_id);

  //   // removedHcp
  //   if (old_object?.removedHcp) {
  //     if (old_object.removedHcp.length > 0) {
  //       setRemovedReaders(old_object.removedHcp);
  //     }
  //   } else {
  //     if (props?.getDraftData && props.getDraftData.campaign_data?.removedHcp) {
  //       if (
  //         typeof props.getDraftData.campaign_data.removedHcp != "undefined" &&
  //         props.getDraftData.campaign_data.removedHcp != "" && location?.state?.flag != 1
  //       ) {
  //         setRemovedReaders(props.getDraftData.campaign_data.removedHcp);
  //       }
  //     }
  //   }
  // }, []);

  useEffect(() => {
    //   const typeOfHcp =
    //   location?.state?.typeOfHcp || props.getDraftData?.campaign_data?.typeOfHcp;
    // setTypeOfHcp(typeOfHcp);

    const campaign_id =
      old_object?.campaign_id || props.getDraftData?.campaign_id || "";
    setCampaign_id(campaign_id);
  }, []);

  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    let oldRemovedHcp = old_object?.removedHcp || [];
    oldRemovedHcp =
      oldRemovedHcp.length > 0
        ? oldRemovedHcp
        : props.getDraftData?.campaign_data?.removedHcp || [];

    let oldAddedHcp = old_object?.addedHcp || [];
    oldAddedHcp =
      oldAddedHcp.length > 0
        ? oldAddedHcp
        : props.getDraftData?.campaign_data?.addedHcp || [];

    const userId = localStorageUserId;
    const selectedListId =
      props.getSelectedSmartListData?.id ||
      props.getDraftData?.campaign_data?.smart_list_id;

    const hasSelectedSmartList = !!props.getSelectedSmartListData?.id;

    if (hasSelectedSmartList) {
      loader("show");
      axios
        .post(`distributes/get_reders_list`, {
          user_id: userId,
          list_id: selectedListId,
          show_specific: 1,
        })
        .then((res) => {
          let pendingUsers = res?.data?.response?.data;
          let subscribersZero = [];

          const removedUsersData = [
            ...oldAddedHcp,
            ...oldRemovedHcp,
            ...(props.getDraftData?.campaign_data?.removedHcp.length > 0
              ? props.getDraftData?.campaign_data?.removedHcp
              : []),
            ...(props.getDraftData?.campaign_data?.addedHcp.length > 0
              ? props.getDraftData?.campaign_data?.addedHcp
              : []),
          ];

          pendingUsers = pendingUsers.filter((objFromA) => {
            if (objFromA?.subscriber === 0) {
              subscribersZero.push(objFromA);
              return false;
            }
            return !removedUsersData.find(
              (objFromB) =>
                objFromA?.profile_user_id === objFromB?.profile_user_id
            );
          });

          subscribersZero = subscribersZero.filter(
            (user) =>
              !oldRemovedHcp.some(
                (removedUser) =>
                  removedUser.profile_user_id === user.profile_user_id
              )
          );

          setReaders(pendingUsers);
          setRemovedReaders([...oldRemovedHcp]);
          // console.log(subscribersZero);
          setUnSubscribedUsers(subscribersZero);
          setReadersNewlyAdded(oldAddedHcp);

          loader("hide");
          setApiStatus(true);
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
          setApiStatus(true);
        });
    } else {
      setReaders(props.getDraftData?.campaign_data?.selectedHcp);
    }
  }, [props.getSelectedSmartListData, props.getDraftData]);
  useEffect(() => {
    if (props.getDraftData?.campaign_data) {
      props.getDraftData.campaign_data.addedHcp = readersNewlyAdded;
    }
    old_object.addedHcp = readersNewlyAdded;
  }, [readersNewlyAdded]);

  useEffect(() => {
    if (props.getDraftData?.campaign_data) {
      props.getDraftData.campaign_data.removedHcp = removedReaders;
    }
    old_object.removedHcp = removedReaders;
  }, [removedReaders]);
  const backClicked = () => {
    navigate("/SelectSmartList");
  };

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

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
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
          // setCountryall(res.data.response.data.country);

          // setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getalCountry();
  }, []);

  const saveAsDraft = async () => {
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
      route_location: "SelectSmartListUsers",
      tags: old_object?.tags ? old_object.tags : props.getDraftData.tags,
      campaign_data: {
        template_id: old_object?.templateId
          ? old_object.templateId
          : props.getDraftData.campaign_data.template_id,
        smart_list_id: props.getSelectedSmartListData?.id
          ? props.getSelectedSmartListData.id
          : props.getDraftData.campaign_data.smart_list_id,
        //smart_list_data: readers,
        // users_list : smartListSelected,
        selectedHcp: [...readers, ...readersNewlyAdded],
        list_selection: old_object?.selected
          ? old_object.selected
          : props.getDraftData?.campaign_data?.list_selection
          ? props.getDraftData.campaign_data.list_selection
          : 0,
        removedHcp: removedReaders,
        
      },
      campaign_id: campaign_id_st,
      source_code: old_object?.template
        ? old_object.template
        : props.getDraftData.source_code,
      status: 2,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setCampaign_id(res.data.response.data.id);
          popup_alert({
            visible: "show",
            message: "Your changes has been saved <br />successfully !",
            type: "success",
            redirect: "/EmailList",
          });
          loader("hide");
        } else {
          toast.warning(res.data.message);
          loader("hide");
        }
        // setCampaign_id(res.data.response.data.id);
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
      });
  };

  const nextClicked = () => {
    navigate("/verifyMAIL", {
      // data: data,
      // smartListName: smartListName,
      state: {
        selectedHcp: [...readers, ...readersNewlyAdded],
        removedHcp: removedReaders,
      },
    });
  };

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

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();

    setShowLessInfo(!showLessInfo);
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
    // setEmailData(e.target.value);
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
      list[i].role = "";
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
      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==") {
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

  const addNewUser = () => {
    setIsOpenAdd(true);
    setValidationError({});
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
        countryIndex: "",
        role:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ? irtRole?.[0]?.value
            : "",
        optIrt:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
            ? "yes"
            : "",
        institutionType: "",
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
  };

  const handleSelect = (e) => {
    setPdfSelected(e.target.value);
  };

  const newlyAddedRemoved = (reader, i) => {
    const readersRemoved = removedReaders;
    setRemovedReaders((oldArray) => [reader, ...oldArray]);
    const newlyAdded = readersNewlyAdded;
    newlyAdded.splice(i, 1);
    setReadersNewlyAdded(newlyAdded);
    let merged_array = [reader, ...readersRemoved];
    old_object.removedHcp = merged_array;

    if (props.getDraftData?.campaign_data) {
      if (props.getDraftData.campaign_data?.removedHcp) {
        props.getDraftData.campaign_data.removedHcp = merged_array;
      }
    }
    setUpdate(update + 1);
  };

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameNameList.remove("active");
    }
    event.target.classNameNameList.toggle("active");
    setTemplateId(selected);
  };

  const readersAdded = (reader, i) => {
    // const newlyAddedReaders = readersNewlyAdded;
    const readersRemoved = removedReaders;
    readersRemoved.splice(i, 1);
    setRemovedReaders(readersRemoved);
    setReadersNewlyAdded((oldArray) => [reader, ...oldArray]);

    //setReaders((oldArray) => [reader, ...oldArray]);
    setReRender(reRender + 1);
  };
  const addMoreHcp = () => {
    const status = hpc.map((data) => {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
        if (
          data?.email == "" ||
          data?.institutionType == "" ||
          data.last_name == "" ||
          data.first_name == "" ||
          data.country == ""
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
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
              ? irtRole?.[0]?.value
              : "",
          optIrt:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
              ? "yes"
              : "",
          institutionType: "",
        },
      ]);
    } else {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
        toast.warning("Please input the required fields.");
      } else {
        toast.warning("Please input the required fields.");
      }
    }
  };

  const addHcp = (e) => {
    const addhcp_btn = document.getElementById("add_hcp_btn");
    if (document.querySelector("#add_hcp_btn .active") !== null) {
      addhcp_btn.classList.remove("active");
    } else {
      addhcp_btn.classList.add("active");
    }
    document.querySelector("#add_file_btn").classList.remove("active");

    e.preventDefault();
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const sortSelectedUsers = () => {
    let normalArr = [];
    normalArr = readers;
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

    setReaders(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const addFile = (e) => {
    const addfile_btn = document.getElementById("add_file_btn");
    if (document.querySelector("#add_file_btn .active") !== null) {
      addfile_btn.classList.remove("active");
    } else {
      addfile_btn.classList.add("active");
    }
    document.querySelector("#add_hcp_btn").classList.remove("active");

    e.preventDefault();
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
  };

  const editing = (
    profile_id,
    profile_user_id,
    email,
    jobTitle,
    company,
    country,
    names,
    contact_type
  ) => {
    if (editable != 0) {
      const name_edit = document.getElementById(
        "field_name" + profile_user_id
      ).innerText;
      const country_edit = document.getElementById(
        "field_country" + profile_user_id
      ).value;
      {
      }

      const contact_type_edit =
        localStorage.getItem("user_id") !== "56Ek4feL/1A8mZgIKQWEqg=="
          ? document.getElementById("field_contact_type" + profile_user_id)
              .value
          : "";

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
  const deleteReader = (i) => {
    const previous_removed_users = removedReaders;
    const readersList = readers;
    const removedReader = readersList.splice(i, 1);
    setReaders(readersList);
    setRemovedReaders((oldArray) => [...oldArray, removedReader[0]]);
    let merged_array = [...previous_removed_users, ...removedReader];
    old_object.removedHcp = merged_array;

    if (props.getDraftData?.campaign_data) {
      if (props.getDraftData.campaign_data?.removedHcp) {
        props.getDraftData.campaign_data.removedHcp = merged_array;
      }
    }
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
        const contact_type_edit =
          localStorage.getItem("user_id") !== "56Ek4feL/1A8mZgIKQWEqg=="
            ? document.getElementById(
                "field_contact_type" + data.profile_user_id
              ).value
            : "";

        let prev_obj = readers.find(
          (x) => x.profile_user_id === data.profile_user_id
        );
        if (typeof prev_obj != "undefined") {
          if (typeof readers[edit_index] != "undefined") {
            readers[edit_index].country = country_edit;
          }
          if (typeof readers[edit_index] != "undefined") {
            readers[edit_index].contact_type = contact_type_edit;
          }
        } else {
          if (typeof readersNewlyAdded[edit_index] != "undefined") {
            readersNewlyAdded[edit_index].country = country_edit;
          }
          if (typeof readersNewlyAdded[edit_index] != "undefined") {
            readersNewlyAdded[edit_index].contact_type = contact_type_edit;
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
      setSaveOpen(false);
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
          toast.error("Something went wrong");
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
    let vr = readers;
    setReaders([]);
    setTimeout(() => {
      setReaders(vr);
      console.log("This will run after 1 second!");
      setUpdateCounter(updateCounter + 1);
    }, 50);
  };

  const saveClicked = async () => {
    //   setIsOpenAdd(false);

    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
          return {
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            country: data.country,
            contact_type: data?.contact_type ? data?.contact_type : "",
            siteNumber: data?.siteNumber ? data.siteNumber : "",
            siteName: data.siteName ? data.siteName : "",
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

      const status = body.data.map((data, index) => {
        if (
          data.email == "" ||
          data?.institution_type == "" ||
          data.first_name == "" ||
          data.last_name == "" ||
          data.country == ""
        ) {
          if (
            data.first_name == "" &&
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ) {
            setValidationError({
              newHcpFirstName: "Please enter the first name",
              index: index,
            });
            return;
          }
          if (
            data.last_name == "" &&
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ) {
            setValidationError({
              newHcpLastName: "Please enter the last name",
              index: index,
            });
            return;
          }
          if (data.email == "") {
            setValidationError({
              newHcpEmail: "Please enter the email atleast",
              index: index,
            });

            return;
          }
          //  else if (data.email != "") {
          //   let email = data.email;
          //   let useremail = email.trim();
          //   var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          //   if (regex.test(String(useremail).toLowerCase())) {
          //     let prev_obj = readers.find((x) => x.email === useremail);
          //     if (typeof prev_obj != "undefined") {
          //       setValidationError({
          //         newHcpEmail: "User with same email already added in list.",
          //         index: index,
          //       });
          //       return;
          //     }
          //   } else {
          //     setValidationError({
          //       newHcpEmail: "Email format is not valid",
          //       index: index,
          //     });
          //     return;
          //   }
          // }
          if (
            data.institution_type == "" &&
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ) {
            setValidationError({
              newHcpInstitution: "Please enter the institution ",
              index: index,
            });
            return;
          }

          if (
            data.country == "" &&
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg=="
          ) {
            setValidationError({
              newHcpCountry: "Please select the country",
              index: index,
            });
            return;
          }
          return "true";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = readers.find((x) => x.email === useremail);
            let prev_obj_new = readersNewlyAdded.find(
              (x) => x.email === useremail
            );

            if (
              typeof prev_obj != "undefined" ||
              typeof prev_obj_new != "undefined"
            ) {
              setValidationError({
                newHcpEmail: "User with same email already added in list.",
                index: index,
              });
              return;
            }
          } else {
            setValidationError({
              newHcpEmail: "Email format is not valid",
              index: index,
            });
            return;
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
                setReadersNewlyAdded((oldArray) => [data, ...oldArray]);
              });
              setIsOpen(false);
              setIsOpenAdd(false);
            } else {
              toast.warning(res.data.message);
              loader("hide");
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

      //  setIsOpen(false);
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
              res.data.response.data.map((data) => {
                setReadersNewlyAdded((oldArray) => [...oldArray, data]);
              });
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              loader("hide");
              toast.success("user added successfully");
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
        toast.warning("Please add a excel file");
      }
    }
  };

  const editButtonClicked = () => {
    setSaveOpen(true);

    let temp_val = 1 - editable;
    setEditable(temp_val);
    setUpdate(update + 1);
  };

  const handleSort = (key) => {
    setSortBy(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortData = (data, key, order) => {
    return data.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      // Handle different data types (numbers, strings)
      if (typeof valueA === "number" && typeof valueB === "number") {
        return order === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        return order === "asc"
          ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB?.localeCompare(valueA);
      }
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
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active">
                      <Link to="/EmailArticleSelect">Select Content</Link>
                    </li>
                    <li className="active">
                      <Link to="/CreateEmail">Create Your Email</Link>
                    </li>
                    <li className="active">
                      <Link to="/SelectSmartList">
                        {localStorage.getItem("user_id") == userId
                          ? "Select Users"
                          : "Select HCPs"}
                      </Link>
                    </li>
                    {/*
                  <li className="active">
                    <Link to="/SelectSmartList">Select Smart List</Link>
                  </li>
                  */}

                    <li className="active active-main">
                      <Link to="/SelectSmartListUsers">Verify Your List</Link>
                    </li>

                    <li className="">
                      <a href="javascript:void(0)">Verify Your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered move-draft"
                      onClick={saveAsDraft}
                      disabled={
                        readers?.length < 1 && readersNewlyAdded?.length < 1
                      }
                    >
                      Save As Draft
                    </button>
                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextClicked}
                      disabled={
                        readers?.length < 1 && readersNewlyAdded?.length < 1
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {apiStatus && (
              <section className="search-hcp">
                <div className="result-hcp-table">
                  <div className="table-title">
                  <h4 className="d-flex">       
                      <div className="ml-3" style={{ color: '#d61975'}}>
                        Unsubscribed<span>| {unSubscribedUsers?.length || 0}</span>
                      </div>
                    </h4>
                    <div className="selected-hcp-table-action">
                      {editable == false ? (
                        <>
                          {localStorage.getItem("user_id") !=
                          "iSnEsKu5gB/DRlycxB6G4g==" ? (
                            <a 
                              className="show-less-info"
                              onClick={(e) => showMoreInfo(e)}
                            >
                              {showLessInfo == true ? (
                                <p className="show_more">
                                  Show More information
                                </p>
                              ) : (
                                <p className="show_less">
                                  Show less information
                                </p>
                              )}{" "}
                            </a>
                          ) : null}
                          <div className="hcp-new-user">
                            <button
                              className="btn btn-outline-primary"
                              onClick={addNewUser}
                            >
                              <img
                                src={path_image + "new-user.svg"}
                                alt="New User"
                              />
                            </button>
                          </div>
                          <div className="hcp-added">
                            <button
                              className="btn btn-outline-primary"
                              onClick={editButtonClicked}
                            >
                              <img src={path_image + "edit.svg"} alt="Edit" />
                            </button>
                          </div>
                          <div className="hcp-sort">
                            {/* {sortingCount == 0 ? (
                              <>
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={sortSelectedUsers}
                                >
                                  Sort By{" "}
                                  <img
                                    src={path_image + "sort.svg"}
                                    alt="Shorting"
                                  />
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
                            )} */}
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
                  <div className="selected-hcp-list unsub">
                    <div className="unsubscribe-users-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" className="">
                              <span>
                                Name
                                <button
                                  className={` ${
                                    sortBy == "first_name"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                >
                                  {/* <svg
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
                                  </svg> */}
                                </button>
                              </span>
                            </th>
                            <th scope="col" className="">
                              <span>
                                Email
                                <button
                                  className={` ${
                                    sortBy == "email"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                >
                                  {/* <svg
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
                                  </svg> */}
                                </button>
                              </span>
                            </th>
                            <th scope="col">Bounced</th>
                            <th scope="col" className="">
                              <span>
                                Country
                                <button
                                  className={` ${
                                    sortBy == "country"
                                      ? sortOrder == "asc"
                                        ? "svg_asc"
                                        : "svg_active"
                                      : ""
                                  }`}
                                >
                                  {/* <svg
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
                                  </svg> */}
                                </button>
                              </span>
                            </th>

                            {localStorage.getItem("user_id") ==
                            "56Ek4feL/1A8mZgIKQWEqg==" ? (
                              <>
                                <th scope="col">IRT mandatory training</th>
                                <th scope="col">IRT role</th>
                              </>
                            ) : (
                              <>
                                <th scope="col" className="">
                                  <span>
                                    Business unit
                                    <button
                                      className={` ${
                                        sortBy == "ibu"
                                          ? sortOrder == "asc"
                                            ? "svg_asc"
                                            : "svg_active"
                                          : ""
                                      }`}
                                    >
                                      {/* <svg
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
                                      </svg> */}
                                    </button>
                                  </span>
                                </th>
                                <th scope="col">Contact type</th>
                              </>
                            )}

                            {showLessInfo == false ? (
                              <>
                                <th scope="col">Consent</th>
                                <th scope="col">Email received</th>
                                <th scope="col">Openings</th>
                                <th scope="col">Registrations</th>
                                <th scope="col">Last email</th>
                              </>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {[...removedReaders, ...unSubscribedUsers]?.map(
                            (user, index) => {
                              return (
                                <React.Fragment key={index}>
                                  <tr
                                    className={` ${
                                      user?.subscriber == 0
                                        ? "hcps-unsubscriber"
                                        : "hcps-deleted"
                                    }`}
                                  >
                                    <td>
                                      <span>
                                        {user?.first_name
                                          ? `${user.first_name} ${user.last_name}`
                                          : "N/A"}
                                      </span>
                                    </td>
                                    <td>{user.email ? user.email : "N/A"}</td>
                                    <td>{user.bounce ? user.bounce : "N/A"}</td>
                                    <td>
                                      <span>
                                        {user.country ? user.country : "N/A"}
                                      </span>
                                    </td>
                                    <td>
                                      {localStorage.getItem("user_id") ===
                                      "56Ek4feL/1A8mZgIKQWEqg=="
                                        ? user?.irt
                                          ? "Yes"
                                          : "No"
                                        : user.ibu && user.ibu !== 0
                                        ? user.ibu
                                        : "N/A"}
                                    </td>
                                    {localStorage.getItem("user_id") ===
                                    "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                      <td>
                                        {user?.user_type !== 0
                                          ? user.user_type
                                          : "N/A"}
                                      </td>
                                    ) : (
                                      <td>
                                        {user.contact_type
                                          ? user.contact_type
                                          : "N/A"}
                                      </td>
                                    )}

                                    {!showLessInfo && (
                                      <>
                                        <td>
                                          <span>
                                            {user.consent
                                              ? user.consent
                                              : "N/A"}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {user.email_received
                                              ? user.email_received
                                              : "N/A"}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {user.email_opening
                                              ? user.email_opening
                                              : "N/A"}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {user.registration
                                              ? user.registration
                                              : "N/A"}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {user.last_email
                                              ? user.last_email
                                              : "N/A"}
                                          </span>
                                        </td>
                                      </>
                                    )}
                                    {user?.subscriber != 0 && (
                                      <td className="add-new-hcp" colSpan="12">
                                        <img
                                          src={path_image + "add-row.png"}
                                          alt="Add Row"
                                          onClick={() =>
                                            readersAdded(user, index)
                                          }
                                        />
                                      </td>
                                    )}
                                  </tr>
                                </React.Fragment>
                              );
                            }
                          )}
                          {/* <tr className="seprator-add">
                          <td colSpan="13"></td>
                        </tr>{" "} */}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="selected-hcp-list">
                  <div className="table-title">
                    <h4 className="d-flex" style={{marginTop:'30px'}}>
                        HCPs{" "}
                        <span style={{marginRight:'10px'}}>
                          |{" "}
                          {(readersNewlyAdded?.length || 0) +
                            (readers?.length || 0)}{" "}
                        </span>
                        </h4>
                      </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort("first_name")}>
                              Name
                              <button
                                className={`event_sort_btn ${
                                  sortBy == "first_name"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("first_name")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort("email")}>
                              Email
                              <button
                                className={`event_sort_btn ${
                                  sortBy == "email"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("email")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>
                          <th scope="col">Bounced</th>
                          <th scope="col" className="sort_option">
                            <span onClick={() => handleSort("country")}>
                              Country
                              <button
                                className={`event_sort_btn ${
                                  sortBy == "country"
                                    ? sortOrder == "asc"
                                      ? "svg_asc"
                                      : "svg_active"
                                    : ""
                                }`}
                                onClick={() => handleSort("country")}
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
                                      <rect width="8" height="8" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </span>
                          </th>

                          {localStorage.getItem("user_id") ==
                          "56Ek4feL/1A8mZgIKQWEqg==" ? (
                            <>
                              <th scope="col">IRT mandatory training</th>
                              <th scope="col">IRT role</th>
                            </>
                          ) : (
                            <>
                              <th scope="col" className="sort_option">
                                <span onClick={() => handleSort("ibu")}>
                                  Business unit
                                  <button
                                    className={`event_sort_btn ${
                                      sortBy == "ibu"
                                        ? sortOrder == "asc"
                                          ? "svg_asc"
                                          : "svg_active"
                                        : ""
                                    }`}
                                    onClick={() => handleSort("ibu")}
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
                              <th scope="col">Contact type</th>
                            </>
                          )}

                          {showLessInfo == false ? (
                            <>
                              <th scope="col">Consent</th>
                              <th scope="col">Email received</th>
                              <th scope="col">Openings</th>
                              <th scope="col">Registrations</th>
                              <th scope="col">Last email</th>
                            </>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                      
                      {sortData(readersNewlyAdded, sortBy, sortOrder)?.map((reader, index) => {
                          return (
                            <tr
                              key={reader.profile_user_id}
                              className="hcps-added"
                              onClick={() =>
                                editing(
                                  reader.profile_id,
                                  reader.profile_user_id,
                                  reader.email,
                                  reader.jobTitle,
                                  reader.company,
                                  reader.country,
                                  `${reader.first_name} ${reader.last_name}`,
                                  reader.contact_type
                                )
                              }
                            >
                              <td
                                id={`field_name_${reader.profile_user_id}`}
                                contentEditable={
                                  editable === 0 ? "false" : "true"
                                }
                              >
                                <span>
                                  {reader.first_name
                                    ? `${reader.first_name} ${reader.last_name}`
                                    : "N/A"}
                                </span>
                              </td>
                              <td>{reader.email ? reader.email : "N/A"}</td>
                              <input
                                type="hidden"
                                id={`field_index_${reader.profile_user_id}`}
                                value={index}
                              />
                              <td>{reader.bounce ? reader.bounce : "N/A"}</td>
                              <td>
                                {editable ? (
                                  <EditCountry
                                    selectedCountry={reader.country}
                                    profileUser={reader.profile_user_id}
                                  />
                                ) : (
                                  <span>
                                    {reader.country ? reader.country : "N/A"}
                                  </span>
                                )}
                              </td>
                              <td>
                                {localStorage.getItem("user_id") ===
                                "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? reader.irt
                                    ? "Yes"
                                    : "No"
                                  : reader.ibu && reader.ibu !== 0
                                  ? reader.ibu
                                  : "N/A"}
                              </td>
                              <td>
                                {localStorage.getItem("user_id") ===
                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                  <span>
                                    {reader.user_type !== 0
                                      ? reader.user_type
                                      : "N/A"}
                                  </span>
                                ) : editable ? (
                                  <EditContactType
                                    selectedContactType={reader.contact_type}
                                    profileUser={reader.profile_user_id}
                                  />
                                ) : (
                                  <span>
                                    {reader.contact_type
                                      ? reader.contact_type
                                      : "N/A"}
                                  </span>
                                )}
                              </td>
                              {!showLessInfo && (
                                <>
                                  <td>
                                    <span>
                                      {reader.consent ? reader.consent : "N/A"}
                                    </span>
                                  </td>
                                  <td>
                                    <span>
                                      {reader.email_received
                                        ? reader.email_received
                                        : "N/A"}
                                    </span>
                                  </td>
                                  <td>
                                    <span>
                                      {reader.email_opening
                                        ? reader.email_opening
                                        : "N/A"}
                                    </span>
                                  </td>
                                  <td>
                                    <span>
                                      {reader.registration
                                        ? reader.registration
                                        : "N/A"}
                                    </span>
                                  </td>
                                  <td>
                                    <span>
                                      {reader.last_email
                                        ? reader.last_email
                                        : "N/A"}
                                    </span>
                                  </td>
                                </>
                              )}
                              <td className="delete_row" colSpan="12">
                                <img
                                  src={`${path_image}delete.svg`}
                                  alt="Delete Row"
                                  onClick={() =>
                                    newlyAddedRemoved(reader, index)
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                        {sortData(readers, sortBy, sortOrder)?.map(
                          (reader, index) => {
                            return (
                              <React.Fragment key={index}>
                                <tr
                                  id={`row-selected` + index}
                                  onClick={() =>
                                    editing(
                                      reader.profile_id,
                                      reader.profile_user_id,
                                      reader.email,
                                      reader.jobTitle,
                                      reader.company,
                                      reader.country,
                                      reader.first_name +
                                        " " +
                                        reader.last_name,
                                      reader.contact_type
                                    )
                                  }
                                >
                                  <td
                                    id={`field_name` + reader.profile_user_id}
                                    contentEditable={
                                      editable === 0 ? "false" : "true"
                                    }
                                  >
                                    <span>
                                      {reader.first_name
                                        ? reader.first_name +
                                          " " +
                                          reader.last_name
                                        : "N/A"}
                                    </span>
                                  </td>
                                  <td
                                    id={`field_email` + reader.profile_user_id}
                                  >
                                    {reader.email ? reader.email : "N/A"}
                                  </td>
                                  <input
                                    type="hidden"
                                    id={`field_index` + reader.profile_user_id}
                                    value={index}
                                  />
                                  <td
                                    id={
                                      `field_bounced` + reader.profile_user_id
                                    }
                                  >
                                    {reader.bounce ? reader.bounce : "N/A"}
                                  </td>
                                  <td>
                                    {editable ? (
                                      <EditCountry
                                        selected_country={reader.country}
                                        profile_user={reader.profile_user_id}
                                      />
                                    ) : (
                                      <span>
                                        {reader.country
                                          ? reader.country
                                          : "N/A"}
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {localStorage.getItem("user_id") ===
                                    "56Ek4feL/1A8mZgIKQWEqg=="
                                      ? reader?.irt
                                        ? "Yes"
                                        : "No"
                                      : reader.ibu && reader.ibu !== 0
                                      ? reader.ibu
                                      : "N/A"}
                                  </td>
                                  <td>
                                    {localStorage.getItem("user_id") ===
                                    "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                      <span>
                                        {reader.user_type !== 0
                                          ? reader?.user_type
                                          : "N/A"}
                                      </span>
                                    ) : editable ? (
                                      <EditContactType
                                        selected_ibu={reader.contact_type}
                                        profile_user={reader.profile_user_id}
                                      />
                                    ) : (
                                      <span>
                                        {reader.contact_type
                                          ? reader.contact_type
                                          : "N/A"}
                                      </span>
                                    )}
                                  </td>
                                  {!showLessInfo && (
                                    <>
                                      <td>
                                        <span>
                                          {reader.consent
                                            ? reader.consent
                                            : "N/A"}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          {reader.email_received
                                            ? reader.email_received
                                            : "N/A"}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          {reader.email_opening
                                            ? reader.email_opening
                                            : "N/A"}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          {reader.registration
                                            ? reader.registration
                                            : "N/A"}
                                        </span>
                                      </td>
                                      <td>
                                        <span>
                                          {reader.last_email
                                            ? reader.last_email
                                            : "N/A"}
                                        </span>
                                      </td>
                                    </>
                                  )}
                                  <td className="delete_row" colSpan="12">
                                    <img
                                      src={path_image + "delete.svg"}
                                      alt="Delete Row"
                                      onClick={() => deleteReader(index)}
                                    />
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          }
                        )}

                        {readers?.length < 1 &&
                          readersNewlyAdded?.length < 1 && (
                            <tr className="no-user-selected">
                              <td colSpan="12">No User Found</td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

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
          tabIndex="-1"
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
                    role:
                      localStorage.getItem("user_id") ==
                      "56Ek4feL/1A8mZgIKQWEqg=="
                        ? irtRole?.[0]?.value
                        : "",
                    optIrt:
                      localStorage.getItem("user_id") ==
                      "56Ek4feL/1A8mZgIKQWEqg=="
                        ? "yes"
                        : "",
                    institutionType: "",
                  },
                ]);
                setActiveManual("active");
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
                                  <label htmlFor="">
                                    First name{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                      <span>*</span>
                                    )}{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className={
                                      validationError?.newHcpFirstName &&
                                      validationError?.index == i
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                  />
                                  {validationError?.newHcpFirstName &&
                                  validationError?.index == i ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpFirstName}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Last name{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                      <span>*</span>
                                    )}{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className={
                                      validationError?.newHcpLastName &&
                                      validationError?.index == i
                                        ? "form-control error"
                                        : "form-control"
                                    }
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                  />
                                  {validationError?.newHcpLastName &&
                                  validationError?.index == i ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpLastName}
                                    </div>
                                  ) : null}
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
                                      validationError?.newHcpEmail &&
                                      validationError?.index == i
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
                                  {validationError?.newHcpEmail &&
                                  validationError?.index == i ? (
                                    <div className="login-validation">
                                      {validationError?.newHcpEmail}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {localStorage.getItem("user_id") ===
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  {" "}
                                  <div className="col-12 col-md-6">
                                    <div className="form-group bottom">
                                      <label for="">
                                        Institution <span>*</span>
                                      </label>
                                      <Select
                                        options={institutionType}
                                        className={
                                          validationError?.newHcpInstitution &&
                                          validationError?.index == i
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
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
                                      {validationError?.newHcpInstitution &&
                                      validationError?.index == i ? (
                                        <div className="login-validation">
                                          {validationError?.newHcpInstitution}
                                        </div>
                                      ) : null}
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
                                    </div>
                                  </div>
                                </>
                              )}

                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">
                                    Country{" "}
                                    {localStorage.getItem("user_id") ==
                                      "56Ek4feL/1A8mZgIKQWEqg==" && (
                                      <span>*</span>
                                    )}{" "}
                                  </label>
                                  {val?.optIrt == "yes" ? (
                                    <>
                                      <Select
                                        options={irtCountry}
                                        className={
                                          validationError?.index == i &&
                                          validationError?.newHcpCountry
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
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

                                      {validationError?.newHcpCountry &&
                                        validationError?.index == i && (
                                          <div className="login-validation">
                                            {validationError?.newHcpCountry}
                                          </div>
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      <Select
                                        options={countryall}
                                        className={
                                          validationError?.index == i &&
                                          validationError?.newHcpCountry
                                            ? "dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            : "dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        }
                                        ss
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
                                      {validationError?.newHcpCountry &&
                                        validationError?.index == i && (
                                          <div className="login-validation">
                                            {validationError?.newHcpCountry}
                                          </div>
                                        )}
                                    </>
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
                              {localStorage.getItem("user_id") ===
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
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
                                          alt="Delete Row"
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
                                    href="#add_hcp_form"
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
                                     onClick={(e) => addFile(e)}
                                     className="nav-link btn-filled"
                                     data-bs-toggle="tab"
                                     href="#add_file"
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
                      <input
                        type="file"
                        className="form-control"
                        multiple=""
                        onChange={onFileChange}
                      />
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
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  old_object = state.getEmailData ? state.getEmailData : {};
  return state;
};

export default connect(mapStateToProps)(SelectSmartListUsers);
