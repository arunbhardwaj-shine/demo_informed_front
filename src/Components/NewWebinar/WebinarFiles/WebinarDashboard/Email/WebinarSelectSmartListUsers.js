import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../../../../loader";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { popup_alert } from "../../../../../popup_alert";
import { Modal, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import EditCountry from "../../../../CommonComponent/EditCountry";
import EditContactType from "../../../../CommonComponent/EditContactType";
import Select, { createFilter } from "react-select";
import AddNewContactModal from "../../../../../Model/AddNewContactModal"
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
var old_object = {};
const WebinarSelectSmartListUsers = (props) => {
  const { eventIdContext, handleEventId } = useSidebar()
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [TemplateId, setTemplateId] = useState(0);
  const [removedReaders, setRemovedReaders] = useState([]);
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
  const [sortBy, setSortBy] = useState('first_name'); // Initial sort key
  const [sortOrder, setSortOrder] = useState('asc');
  const [selected,setSelected]=useState(location?.state?.selected ? 
    location?.state?.selected 
    : props.getWebinarDraftData?.campaign_data?.selected)
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
  const [thisEventToggled,setThisEventToggled]=useState(location?.state?.thisEventToggled ? 
    location?.state?.thisEventToggled 
    : props.getWebinarDraftData?.campaign_data?.thisEventToggled)

  useEffect(() => {
    let campaign_id =
      typeof old_object === "object" &&
        old_object !== null &&
        old_object?.campaign_id
        ? old_object?.campaign_id
        : props.getWebinarDraftData?.campaign_id
          ? props.getWebinarDraftData?.campaign_id
          : "";
    setCampaign_id(campaign_id);

    // removedHcp
    if (old_object?.removedHcp) {
      if (old_object?.removedHcp?.length > 0) {
        setRemovedReaders(old_object?.removedHcp);
      }
    } else {
      if (props?.getWebinarDraftData && props.getWebinarDraftData?.campaign_data?.removedHcp) {
        if (
          typeof props.getWebinarDraftData?.campaign_data?.removedHcp != "undefined" &&
          props.getWebinarDraftData?.campaign_data?.removedHcp != "" && location?.state?.flag != 1
        ) {
          setRemovedReaders(props.getWebinarDraftData?.campaign_data?.removedHcp);
        }
      }
    }
  }, []);

  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      list_id: props.getWebinarSelectedSmartListData?.id
        ? props.getWebinarSelectedSmartListData?.id
        : props.getWebinarDraftData?.campaign_data?.smart_list_id,
      show_specific: 1,
    };
    if (props.getWebinarSelectedSmartListData?.id) {
      loader("show");
      axios
        .post(`distributes/get_reders_list`, body)
        .then((res) => {
          if (old_object?.removedHcp) {
            if (old_object?.removedHcp?.length > 0) {
              var removedUsers = old_object?.removedHcp;
              var allUsers = res?.data?.response.data;
              var pendingUsers = allUsers?.filter(function (objFromA) {
                return !removedUsers?.find(function (objFromB) {
                  return objFromA?.profile_id === objFromB?.profile_id;
                });
              });

              setReaders(pendingUsers);
            } else {
              setReaders(res?.data?.response?.data);
            }
          } else if (
            props?.getWebinarDraftData &&
            props.getWebinarDraftData?.campaign_data?.removedHcp
          ) {
            if (
              typeof props.getWebinarDraftData?.campaign_data?.removedHcp !=
              "undefined" &&
              props.getWebinarDraftData?.campaign_data?.removedHcp != ""
            ) {
              var removedUsers = props.getWebinarDraftData?.campaign_data?.removedHcp;
              var allUsers = res?.data?.response?.data;
              var pendingUsers = allUsers?.filter(function (objFromA) {
                return !removedUsers?.find(function (objFromB) {
                  return objFromA?.profile_id === objFromB?.profile_id;
                });
              });

              setReaders(pendingUsers);
            } else {
              setReaders(res?.data?.response?.data);
            }
          } else {
            setReaders(res?.data?.response?.data);
          }

          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setReaders(props.getWebinarDraftData?.campaign_data?.selectedHcp);
    }
  }, []);

  const backClicked = () => {
    // navigate("/webinar/email/selectsmartlist");
    if(selected==1){    
      navigate("/webinar/email/selectSmartList",{state:{UserSelected:selected,thisEventToggled:thisEventToggled}});
    
    }else{
      navigate("/webinar/email/selectHCP");
    
    }
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
          if (res?.data?.status_code == 200) {
            let country = res?.data?.response?.data?.country;
            let arr = [];

            Object.entries(country)?.map(([index, item]) => {
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

            setTotalData(res?.data?.response?.data);
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
      pdf_id:0,
      // pdf_id: old_object?.PdfSelected
      //   ? old_object.PdfSelected
      //   : props.getDraftData.pdf_id,
      event_id:eventId,
      description: old_object?.emailDescription
        ? old_object?.emailDescription
        : props.getWebinarDraftData?.description
          ? props.getWebinarDraftData?.description
          : "",
      creator: old_object?.emailCreator
        ? old_object?.emailCreator
        : props.getWebinarDraftData?.creator
          ? props.getWebinarDraftData?.creator
          : "",
          campaign_name:"webinar",
      // campaign_name: old_object?.emailCampaign
      //   ? old_object?.emailCampaign
      //   : props.getWebinarDraftData?.campaign,
      subject: old_object?.emailSubject
        ? old_object?.emailSubject
        : props.getWebinarDraftData?.subject,
      route_location: "webinar/email/selectSmartListUsers",
      tags: old_object?.tags ? old_object?.tags : props.getWebinarDraftData?.tags,
      campaign_data: {
        template_id: old_object?.templateId
          ? old_object?.templateId
          : props.getWebinarDraftData?.campaign_data?.template_id,
        smart_list_id: props.getWebinarSelectedSmartListData?.id
          ? props.getWebinarSelectedSmartListData.id
          : props.getWebinarDraftData?.campaign_data?.smart_list_id,
        //smart_list_data: readers,
        // users_list : smartListSelected,
        selectedHcp: [...readers, ...readersNewlyAdded],
        list_selection: old_object?.selected
          ? old_object?.selected
          : props.getWebinarDraftData?.campaign_data?.list_selection
            ? props.getWebinarDraftData?.campaign_data?.list_selection
            : 0,
        removedHcp: removedReaders,
        auto_responder_id: props.old_object?.templateId
                ? props.old_object?.templateId
                : props.getWebinarDraftData?.campaign_data?.template_id,
        selected:location?.state?.selected
        ?location?.state?.selected
        :props.getWebinarDraftData?.campaign_data?.selected,
        thisEventToggled:thisEventToggled
      },
      auto_responder_id: props.old_object?.templateId
      ? props.old_object?.templateId
      : props.getWebinarDraftData?.campaign_data?.template_id,
      campaign_id: campaign_id_st,
      source_code: old_object?.template
        ? old_object?.template
        : props.getWebinarDraftData?.source_code,
      status: 2,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        if (res?.data?.status_code == 200) {
          setCampaign_id(res?.data?.response?.data?.id);
          popup_alert({
            visible: "show",
            message: "Your changes has been saved <br />successfully !",
            type: "success",
            redirect: "/webinar/email",
          });
          loader("hide");
        } else {
          toast.warning(res?.data?.message);
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
    navigate("/webinar/email/verifyMAIL", {
      // data: data,
      // smartListName: smartListName,
      state: {
        selectedHcp: [...readers, ...readersNewlyAdded],
        removedHcp: removedReaders,
        selected:selected,
        thisEventToggled:thisEventToggled
      },
    });
  };

  const axiosFun = async () => {
    try {
      const result = await axios.get(`emailapi/get_site`);

      let country = result?.data?.response?.data?.site_country_data;
      let arr = [];
      Object.entries(country)?.map(([index, item]) => {
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
    setSelectedFile(event?.target?.files[0]);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();

    setShowLessInfo(!showLessInfo);
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
    setPdfSelected(e?.target?.value);
  };

  const newlyAddedRemoved = (reader, i) => {
    const readersRemoved = removedReaders;
    setRemovedReaders((oldArray) => [reader, ...oldArray]);
    const newlyAdded = readersNewlyAdded;
    newlyAdded.splice(i, 1);
    setReadersNewlyAdded(newlyAdded);
    let merged_array = [reader, ...readersRemoved];
    old_object.removedHcp = merged_array;

    if (props.getWebinarDraftData?.campaign_data) {
      if (props.getWebinarDraftData?.campaign_data?.removedHcp) {
        props.getWebinarDraftData.campaign_data.removedHcp = merged_array;
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

      let prev_obj = editableData?.find(
        (x) => x?.profile_user_id === profile_user_id
      );
      if (typeof prev_obj != "undefined") {
        //update existing
        editableData?.map(
          (obj) => arr.find((o) => o?.profile_user_id === profile_user_id) || obj
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
    const removedReader = readersList?.splice(i, 1);
    setReaders(readersList);
    setRemovedReaders((oldArray) => [...oldArray, removedReader[0]]);
    let merged_array = [...previous_removed_users, ...removedReader];
    old_object.removedHcp = merged_array;

    if (props.getWebinarDraftData?.campaign_data) {
      if (props.getWebinarDraftData?.campaign_data?.removedHcp) {
        props.getWebinarDraftData.campaign_data.removedHcp = merged_array;
      }
    }
  };

  const saveEditClicked = async () => {
    setEditable(0);
    if (editableData?.length > 0) {
      editableData?.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data?.profile_user_id
        ).innerText;
        const country_edit = document.getElementById(
          "field_country" + data?.profile_user_id
        ).value;
        const edit_index = document.getElementById(
          "field_index" + data?.profile_user_id
        ).value;
        const contact_type_edit =
          localStorage.getItem("user_id") !== "56Ek4feL/1A8mZgIKQWEqg=="
            ? document.getElementById(
              "field_contact_type" + data.profile_user_id
            ).value
            : "";

        let prev_obj = readers?.find(
          (x) => x?.profile_user_id === data?.profile_user_id
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
          if (res?.data?.status_code === 200) {
            toast.success("List updated");
          } else {
            popup_alert({
              visible: "show",
              message: res?.data?.message,
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
  const closeModalClicked = () => {
    setIsOpenAdd(false);
    // setIsOpensend(true);
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
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
  }

  const setHpcList = (list) => {
    setHpc(list)
}

  const closeClicked = () => {
    setSaveOpen(false);
    setEditable(0);
    let vr = readers;
    setReaders([]);
    setTimeout(() => {
      setReaders(vr);
      setUpdateCounter(updateCounter + 1);
    }, 50);
  };

  const saveClicked = async () => {
    //   setIsOpenAdd(false);

    if (activeManual == "active") {
      const body_data = hpc?.map((data) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
          return {
            first_name: data?.firstname,
            last_name: data?.lastname,
            email: data?.email,
            country: data?.country,
            contact_type: data?.contact_type ? data?.contact_type : "",
            siteNumber: data?.siteNumber ? data.siteNumber : "",
            siteName: data?.siteName ? data?.siteName : "",
            investigator_type: data?.role,
            siteIrt: data?.optIrt == "yes" ? 1 : 0,
            institution_type: data?.institutionType
              ? data?.institutionType
              : "",
          };
        } else {
          return {
            first_name: data?.firstname,
            last_name: data?.lastname,
            email: data?.email,
            country: data?.country,
            contact_type: data?.contact_type,
          };
        }
      });

      const body = {
        data: body_data,
        user_id: localStorage.getItem("user_id"),
        smart_list_id: "",
      };

      const status = body.data?.map((data, index) => {
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
            if (res?.data?.status_code === 200) {
              toast.success("User added successfully");
              res?.data?.response?.data?.map((data) => {
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
        const filteredArray = status?.filter((value) => value !== "true");
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
            if (res?.data?.status_code === 200) {
              res?.data?.response?.data?.map((data) => {
                setReadersNewlyAdded((oldArray) => [...oldArray, data]);
              });
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              loader("hide");
              toast.success("user added successfully");
            } else {
              toast.warning(res?.data?.message);
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
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); 
  };

  const sortData = (data, key, order) => {
    return data?.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
  
      // Handle different data types (numbers, strings)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      } else {
        return order === 'asc'
          ? valueA.localeCompare(valueB) // Handle string sorting with locale awareness
          : valueB.localeCompare(valueA);
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
                    {/* <li className="active">
                      <Link to="/EmailArticleSelect">Select Content</Link>
                    </li> */}
                    <li className="active">
                      <Link to="/webinar/email/create-new-email">Create Your Email</Link>
                    </li>
                    <li className="active">
                      <Link 
                      to={selected==1?"/webinar/email/selectSmartList":"/webinar/email/selectHCP"}
                      state={selected==1?{UserSelected:selected,thisEventToggled:thisEventToggled}:null}
                      >
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
                      <Link to="/webinar/email/selectSmartListUsers">Verify Your List</Link>
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
                      disabled={readers?.length < 1 && readersNewlyAdded?.length < 1}
                    >
                      Save As Draft
                    </button>
                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextClicked}
                      disabled={readers?.length < 1 && readersNewlyAdded?.length < 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section className="search-hcp">
              <div className="result-hcp-table">
                <div className="table-title">
                  <h4>
                    HCPs <span>| {(readersNewlyAdded?.length||0) + (readers?.length||0)} </span>
                  </h4>
                  <div className="selected-hcp-table-action">
                    {editable == false ? (
                      <>
                        {
                          localStorage.getItem('user_id') != 'iSnEsKu5gB/DRlycxB6G4g==' ?
                            <a
                              className="show-less-info"
                              onClick={(e) => showMoreInfo(e)}
                            >
                              {showLessInfo == true ? (
                                <p className="show_more">Show More information</p>
                              ) : (
                                <p className="show_less">Show less information</p>
                              )}{" "}
                            </a> : null
                        }
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
                        {/* <div className="hcp-sort">
                          {sortingCount == 0 ? (
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
                </div>
                <div className="selected-hcp-list">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="sort_option" >
                        <span onClick={() => handleSort('first_name')}>
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
                                  <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                        </span>
                         
                        </th>
                        <th scope="col" className="sort_option" >
                        <span onClick={() => handleSort('email')}>
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
                                  <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                </g>
                                <defs>
                                  <clipPath id="clip0_3722_6611">
                                    <rect width="8" height="8" fill="white"/>
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>

                        </span>
                          
                        </th>
                        <th scope="col">Bounced</th>
                        <th scope="col" className="sort_option"  >
                        <span onClick={() => handleSort('country')}>
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
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white"/>
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
                            <span onClick={() => handleSort('ibu')}>
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
                                    <path d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z" fill="#97B6CF"/>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_3722_6611">
                                      <rect width="8" height="8" fill="white"/>
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
                      {removedReaders?.map((rr, i) => {
                        return (
                          <>
                            <tr className="hcps-deleted">
                              <td>
                                <span>
                                  {rr?.first_name
                                    ? rr?.first_name + " " + rr?.last_name
                                    : "N/A"}
                                </span>
                              </td>
                              <td>{rr?.email ? rr?.email : "N/A"}</td>
                              <td>{rr?.bounce ? rr?.bounce : "N/A"}</td>
                              <td>
                                <span>{rr?.country ? rr?.country : "N/A"}</span>
                              </td>
                              <td>
                                {/*rr?.ibu ? rr?.ibu : "N/A"*/}
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? rr?.irt
                                    ? "Yes"
                                    : "No"
                                  : rr?.ibu && rr?.ibu != 0
                                    ? rr?.ibu
                                    : "N/A"}
                              </td>
                              {localStorage.getItem("user_id") ==
                                "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <td>
                                  {rr?.user_type != 0 ? rr?.user_type : "N/A"}
                                </td>
                              ) : (
                                <td>
                                  {rr?.contact_type ? rr?.contact_type : "N/A"}
                                </td>
                              )}

                              {showLessInfo == false ? (
                                <td>
                                  <span>{rr?.consent ? rr?.consent : "N/A"}</span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.email_received
                                      ? rr?.email_received
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.email_opening
                                      ? rr?.email_opening
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.registration ? rr?.registration : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {rr?.last_email ? rr?.last_email : "N/A"}
                                  </span>
                                </td>
                              ) : null}

                              <td className="add-new-hcp" colSpan="12">
                                <img
                                  src={path_image + "add-row.png"}
                                  alt="Add Row"
                                  onClick={() => readersAdded(rr, i)}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}

                      <tr className="seprator-add">
                        <td colSpan="13"></td>
                      </tr>
                      {readersNewlyAdded?.map((readers, i) => {
                        return (
                          <>
                            <tr
                              className="hcps-added"
                              onClick={(e) =>
                                editing(
                                  readers.profile_id,
                                  readers.profile_user_id,
                                  readers.email,
                                  readers.jobTitle,
                                  readers.company,
                                  readers.country,
                                  readers.first_name + " " + readers.last_name,
                                  readers.contact_type
                                )
                              }
                            >
                              <td
                                id={`field_name` + readers.profile_user_id}
                                contentEditable={
                                  editable === 0 ? "false" : "true"
                                }
                              >
                                <span>
                                  {readers?.first_name
                                    ? readers?.first_name +
                                    " " +
                                    readers?.last_name
                                    : "N/A"}
                                </span>
                              </td>
                              <td>{readers?.email ? readers?.email : "N/A"}</td>
                              <input
                                type="hidden"
                                id={`field_index` + readers.profile_user_id}
                                value={i}
                              />
                              <td>{readers?.bounce ? readers?.bounce : "N/A"}</td>
                              <td>
                                {editable ? (
                                  <EditCountry
                                    selected_country={readers?.country}
                                    profile_user={readers?.profile_user_id}
                                  ></EditCountry>
                                ) : (
                                  <span>
                                    {readers?.country ? readers?.country : "N/A"}
                                  </span>
                                )}
                              </td>
                              <td>
                                {/*readers.ibu ? readers.ibu : "N/A"*/}
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? readers?.irt
                                    ? "Yes"
                                    : "No"
                                  : readers.ibu && readers.ibu != 0
                                    ? readers.ibu
                                    : "N/A"}
                              </td>
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                  <span>
                                    {readers.user_type != 0
                                      ? readers?.user_type
                                      : "N/A"}
                                  </span>
                                ) : editable ? (
                                  <EditContactType
                                    selected_ibu={readers?.contact_type}
                                    profile_user={readers?.profile_user_id}
                                  ></EditContactType>
                                ) : (
                                  <span>
                                    {readers?.contact_type
                                      ? readers?.contact_type
                                      : "N/A"}
                                  </span>
                                )}
                              </td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.consent ? readers?.consent : "N/A"}
                                  </span>{" "}
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.email_received
                                      ? readers?.email_received
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.email_opening
                                      ? readers?.email_opening
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.registration
                                      ? readers?.registration
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.last_email
                                      ? readers?.last_email
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              <td className="delete_row" colSpan="12">
                                <img
                                  src={path_image + "delete.svg"}
                                  alt="Delete Row"
                                  onClick={() => newlyAddedRemoved(readers, i)}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                      {sortData(readers, sortBy, sortOrder)?.map((readers, i) => {
                        return (
                          <>
                            <tr
                              id={`row-selected` + i}
                              onClick={(e) =>
                                editing(
                                  readers.profile_id,
                                  readers.profile_user_id,
                                  readers.email,
                                  readers.jobTitle,
                                  readers.company,
                                  readers.country,
                                  readers.first_name + " " + readers.last_name,
                                  readers.contact_type
                                )
                              }
                            >
                              <td
                                id={`field_name` + readers.profile_user_id}
                                contentEditable={
                                  editable === 0 ? "false" : "true"
                                }
                              >
                                <span>
                                  {" "}
                                  {readers?.first_name
                                    ? readers?.first_name +
                                    " " +
                                    readers?.last_name
                                    : "N/A"}{" "}
                                </span>
                              </td>
                              <td id={`field_email` + readers.profile_user_id}>
                                {readers?.email ? readers?.email : "N/A"}
                              </td>
                              <input
                                type="hidden"
                                id={`field_index` + readers.profile_user_id}
                                value={i}
                              />
                              <td
                                id={`field_bounced` + readers.profile_user_id}
                              >
                                {readers?.bounce ? readers?.bounce : "N/A"}
                              </td>
                              <td>
                                {editable ? (
                                  <EditCountry
                                    selected_country={readers?.country}
                                    profile_user={readers?.profile_user_id}
                                  ></EditCountry>
                                ) : (
                                  <span>
                                    {readers?.country ? readers?.country : "N/A"}
                                  </span>
                                )}
                              </td>
                              <td>
                                {/*readers.ibu ? readers.ibu : "N/A"*/}
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg=="
                                  ? readers?.irt
                                    ? "Yes"
                                    : "No"
                                  : readers?.ibu && readers.ibu != 0
                                    ? readers?.ibu
                                    : "N/A"}
                              </td>
                              <td>
                                {localStorage.getItem("user_id") ==
                                  "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                  <span>
                                    {readers.user_type != 0
                                      ? readers?.user_type
                                      : "N/A"}
                                  </span>
                                ) : editable ? (
                                  <EditContactType
                                    selected_ibu={readers?.contact_type}
                                    profile_user={readers?.profile_user_id}
                                  ></EditContactType>
                                ) : (
                                  <span>
                                    {readers?.contact_type
                                      ? readers?.contact_type
                                      : "N/A"}
                                  </span>
                                )}
                              </td>
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.consent ? readers?.consent : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.email_received
                                      ? readers?.email_received
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.email_opening
                                      ? readers?.email_opening
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.registration
                                      ? readers?.registration
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              {showLessInfo == false ? (
                                <td>
                                  <span>
                                    {readers?.last_email
                                      ? readers?.last_email
                                      : "N/A"}
                                  </span>
                                </td>
                              ) : null}
                              <td className="delete_row" colSpan="12">
                                <img
                                  src={path_image + "delete.svg"}
                                  alt="Add Row"
                                  onClick={() => deleteReader(i)}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <AddNewContactModal
        show={isOpenAdd}
        closeClicked={closeModalClicked}
        activeManual={activeManual}
        hpc={hpc}
        setHpc={setHpcList}
        totalData={totalData}
        countryall={countryall}
        irtCountry={irtCountry}
        irtRole={irtRole}
        role={role}
        institutionType={institutionType}
        saveClicked={saveClicked}
        validationError={validationError}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  old_object = state.getWebinarEmailData ? state.getWebinarEmailData : {};
  return state;
};

export default connect(mapStateToProps)(WebinarSelectSmartListUsers);
