import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { loader } from "../../../../../loader";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, ModalDialog, Dropdown,Col,Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { popup_alert } from "../../../../../popup_alert";
import Select, { createFilter } from "react-select";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import AddNewContactModal from "../../../../../Model/AddNewContactModal";
import html2canvas from "html2canvas";
import SmartListTableLayout from "../../../../CommonComponent/SmartListTableLayout";
import SmartListLayout from "../../../../CommonComponent/SmartListLayout";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const WebinarAutoEmail = () => {
  const { eventIdContext, handleEventId } = useSidebar()
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
  const [viewEmailModal, setviewEmailModal] = useState(false);

  const [getsearch, setSearch] = useState("");
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const [hcpsSelected, setHcpsSelected] = useState([]);
  const [approveClickedd, setApproveClicked] = useState(false);
  const [counterFlag, setCounterFlag] = useState(0);
  const [tempLang, setTempLang] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [reminderTemplates,setReminderTemplates]=useState([])
  const [countryall, setCountryall] = useState([]);
  const [templateClicked, setTemplateClicked] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [indexClicked, setIndexClicked] = useState();
  const [indexClickedReminder, setIndexClickedReminder] = useState();
  const [smartListData, setSmartListData] = useState([]);
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  const [activeManual, setActiveManual] = useState("active");
  const [templateId, setTemplateId] = useState(0);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [isOpenSend, setIsOpensend] = useState(false);
  const [language, setLanguage] = useState("0");
  const [reRender, setReRender] = useState(0);
  const [getSmartListId, setSmartListId] = useState(0);
  const [addListOpen, setAddListOpen] = useState(false);
  const [activeExcel, setActiveExcel] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedHcp, setSelectedHcp] = useState([]);
  const [email, setEmail] = useState("");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [name, setName] = useState("");
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [siteNumberAll, setSiteNumberAll] = useState([]);
  const [hide, setHide] = useState(false);
  const [templateSaving, setTemplateSaving] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [userId, setUserId] = useState("56Ek4feL/1A8mZgIKQWEqg==");
  const [getTemplateLanguage, setTemplateLanguage] = useState([
    { value: "0", label: "English" },
    { value: "4", label: "Russian" },
  ]);
  const [readers, setReaders] = useState([]);
  const [getReaderDetails, setReaderDetails] = useState({});
  const [totalData, setTotalData] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [role, setRole] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [institutionType, setInstitutionType] = useState([]);
  const [selectedListId, setSelectedListId] = useState(0);
  const [optIRT, setoptIRT] = useState([
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]);
  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
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
  const [irtCountry, setIRTCountry] = useState([]);
  const [createNewTemplate, setCreateNewTemplate] = useState(false)
  const [newTemplateDescription, setNewTemplateDescription] = useState("")
  const [newTemplateSubject, setNewTemplateSubject] = useState("");
  const templateIdRef = useRef("");
  const editorRef = useRef(null);
  const ref = useRef(null);
  const linkingPayload = useRef();
  let file_name = useRef("");
  const filterConfig = {
    matchFrom: "start",
  };

  useEffect(() => {
    getSmartListData(0);
  }, []);

  useEffect(() => {
    if (addListOpen == true) {
      setIsOpensend(false);
    }
  }, [addListOpen]);

  useEffect(() => {
    getTemplateListData();
  }, [language]);

  useEffect(() => {
    loader("show");
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      axiosFun();
    }
    const getalCountry = async () => {
      const body = {
        user_id: localStorage.getItem("user_id"),
        language: "",
        ibu: "",
      };

      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
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
              setRole(newType);
              setIrtRole(newIrtType);

              let institution_type =
                res?.data?.response?.data?.institution_type;

              let newInstitution = [];
              Object.keys(institution_type)?.map((item, i) => {
                newInstitution.push({ label: item, value: item });
              });

              setInstitutionType(newInstitution);
            }
            setTotalData(res?.data?.response?.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getalCountry();
  }, []);
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

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getTemplateListData = async () => {
    try {
      loader("show")
      let body = {
        eventId: eventId
      }
      const response = await postData(ENDPOINT.WEBINAR_EMAIL_GET_AUTO_TEMPLATE_LIST, body)
      setTemplates(response?.data?.data)
      setReminderTemplates(response?.data?.data?.reminderTemplate)
      loader("hide")
    } catch (err) {
      loader("hide")
      console.log("--err", err)
    }
  }

  const viewButtonClicked = (template, index) => {
    setEmailSubject(template?.subject)
    setEmailDescription(template?.description)
    setCreateNewTemplate(false)
    // setNewTemplateName("")
    setNewTemplateDescription("")
    setNewTemplateSubject("")
    // setEmailSubject("");
    setEmailSubject(template?.subject)

    // setEmailDescription("");
    setApproveClicked(false);
    setTemplateClicked(true);
    setSourceCode(template?.template);
    // setIndexClicked(index);
    setTemplateId(template?.id);
    templateIdRef.current = template?.id;
    setTempLang(template?.language_code);
    if (template?.approved == 1) {
      setApproveClicked(true);
    } else {
      setApproveClicked(false);
    }
    setIndexClickedReminder();
    setTemplateName(template?.subject);
  };
  const viewReminderClicked = (template, index) => {
    setEmailSubject("");
    setEmailDescription("");
    setApproveClicked(false);
    setTemplateClicked(true);
    setSourceCode(template?.template);
    setIndexClickedReminder(index);
    setTemplateId(template?.id);
    setTemplateName(template?.subject);
    // setIndexClicked();
  };

  const searchChange = (e) => {
    setSearch(e?.target?.value);
    if (e?.target?.value === "") {
      setSmartListData(prevsmartListData);
    }
  };

  const cancelClicked = () => {
    // setIndexClicked();
    setTemplateClicked(false);
    setValidationError({})
    setSourceCode("");
    setTemplateId(0);
    templateIdRef.current = "";
    setTempLang(0);
    // setNewTemplateName("")
    setNewTemplateDescription("")
    setNewTemplateSubject("")
    setCreateNewTemplate(false)
  };

  const sendSample = (event) => {
    event.preventDefault();
    let error = {};
    if (emailSubject == "") {
      error.emailSubject = "Please enter the email subject line";
    }
    if (emailDescription == "") {
      error.emailDescription = "Please enter the email description";
    }
    if (templateId == "" || templateId == 0) {
      error.templateId = "Please select email template first";
    }

    if (Object.keys(error)?.length) {
      toast.error(error[Object.keys(error)[0]]);
      setValidationError(error);

      return;
    } else {
      setIsOpensend(true);
    }
  };


  const searchHcp = async (e) => {
    e.preventDefault();
    if (name == "" && email == "") {
      toast.warning("Please enter name or email first");
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
          if (res.data.response) {
            setSearchedUsers(res?.data?.response?.data);
          } else {
            toast.warning(res?.data?.message);
          }

          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewContactClicked = () => {
    setIsOpenAdd(true);
    setIsOpensend(false);
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
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

  const selectHcp = (index) => {
    let arr = [];
    arr = searchedUsers;
    let added_user_id = arr[index]?.profile_user_id;
    let prev_obj = selectedHcp?.find((x) => x?.profile_user_id === added_user_id);
    if (typeof prev_obj == "undefined") {
      const removedArray = arr?.splice(index, 1);
      setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
      setSearchedUsers(arr);
      setReRender(reRender + 1);
    } else {
      toast.error("User with same email already added in list.");
    }
  };

  const sendsampeap = (event) => {
    setHcpsSelected(selectedHcp);
    let i = 0;
    const intervals_spend = (25 / 100) * selectedHcp?.length;

    var intervals_increment = 100 / intervals_spend;
    var mails_increment = selectedHcp.length / intervals_spend;
    let adr = 0;
    let incr_msg = 0;
    const timer = setInterval(() => {
      adr = adr + intervals_increment;
      incr_msg = incr_msg + mails_increment;
      if (adr >= 98) {
        setUploadOrDownloadCount(98);
      } else {
        setUploadOrDownloadCount(parseInt(adr));
      }

      if (incr_msg >= selectedHcp.length) {
        setMailsIncrement(selectedHcp.length);
      } else {
        setMailsIncrement(parseInt(incr_msg));
      }
    }, 1000);

    if (emailSubject != "") {
      setIsOpensend(false);
      setIsOpenAdd(false);

      let selected_ids = selectedHcp?.map(
        (number) => number["user_id"] || number["profile_user_id"]
      );

      //  loader("show");
      setShowProgressBar(true);
      const body = {
        user_id: localStorage.getItem("user_id"),
        // pdf_id: "3487",
        event_id:eventId,
        subject: emailSubject,
        description: emailDescription,
        template_id: templateId,
        user_list: selected_ids,
        smartlist_id: "",
        source_code: sourceCode,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      axios
        .post(`webinar/send_sample_email`, body)
        .then((res) => {
          loader("hide");
          if (res?.data?.status_code === 200) {
            setUploadOrDownloadCount(100);
            setMailsIncrement(selectedHcp?.length);
            clearInterval(timer);
            setTimeout(() => {
              popup_alert({
                visible: "show",
                message: "Email sent successfully",
                type: "success",
              });
              setName("")
              setEmail("")
              setShowProgressBar(false);
              setUploadOrDownloadCount(0);
              setMailsIncrement(0);
            }, 1000);
          } else {
            popup_alert({
              visible: "show",
              message: res?.data?.message,
              type: "error",
            });
            clearInterval(timer);
            setUploadOrDownloadCount(0);
            setMailsIncrement(0);

            setShowProgressBar(false);
          }
        })
        .catch((err) => {
          clearInterval(timer);
          setShowProgressBar(false);
          loader("hide");
          toast.error("Something went wrong");
          console.log(err);
        });
      setEmailSubject("");
      setEmailDescription("");
      setSelectedHcp([]);
      setSearchedUsers([]);
    } else {
      toast.warning("Please select subject first");
    }
  };
 
  const handleScroll = (ev) => {
    if (ev.target.scrollTop > 20) {
      const mailViewElement = document.querySelector("#mail-view");
      if (mailViewElement) {
        mailViewElement.setAttribute("custom-atr", "scroll");
      }
      // document.querySelector("#mail-view").setAttribute("custom-atr", "scroll");
    } else {
      // document
      //   .querySelector("#mail-view")
      //   .setAttribute("custom-atr", "non-scroll");

      const mailViewElement = document.querySelector("#mail-view");
      if (mailViewElement) {
        mailViewElement.setAttribute("custom-atr", "non-scroll");
      }
    }
  };

  const deleteSelected = (index) => {
    let arr = [];
    arr = selectedHcp;
    arr.splice(index, 1);

    setSelectedHcp(arr);
    setReRender(reRender + 1);
  };


  const saveClicked = async () => {
    if (activeManual == "active") {
      const body_data = hpc?.map((data) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {

          return {
            first_name: data?.firstname,
            last_name: data?.lastname,
            email: data?.email,
            country: data?.country,
            contact_type: data?.contact_type,
            siteNumber: data?.siteNumber ? data?.siteNumber : "",
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

      const status = body?.data?.map((data) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
          if (data?.first_name == "") {
            return "Please enter the first name";
          } else if (data?.last_name == "") {
            return "Please enter the last name";
          }
        }
        if (data?.email == "") {
          return "Please enter the email atleast";
        } else if (data?.institution_type == "") {
          return "Please select the institution type";
        }
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
          if (data?.country == "") {
            return "Please select country";
          }
        }
        if (data?.email != "") {
          let email = data?.email;
          let useremail = email?.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = selectedHcp.find((x) => x?.email?.toLowerCase() === useremail?.toLowerCase());
            if (typeof prev_obj != "undefined") {
              return "User with same email already added in list.";
            } else {
              return "true";
            }
          } else {
            return "Email format is not valid";
          }
        }
        return "true";
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

              res.data.response.data.map((data) => {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              });
              setIsOpenAdd(false);
              setIsOpensend(true);
            } else {
              toast.warning(res?.data?.message);
              loader("hide");
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
    }
  };

  const handleSmartListPopupScroll = (ev) => {
    if (ev?.target?.scrollTop > 20) {
      document.querySelector("#add-list").setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#add-list")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const submitHandler = (event) => {
    if (getsearch !== "") {
      getSmartListData(1);
    } else {
      toast.error("Please enter text.");
    }
    event.preventDefault();
    return false;
  };

  const getSmartListData = (flag) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: getsearch,
      filter: "",
      event_id: eventId,
    };
    loader("show");
    axios
      .post(`distributes/get_smart_list`, body)
      .then((res) => {
        setSmartListData(res?.data?.response?.data);
        if (flag == 0) {
          setPrevSmartListData(res?.data?.response?.data);
        } else {
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      });
  };
  const handleSelect = (data, e) => {
    setSmartListId(data?.id);
  };


  

  const openSmartListPopup = async (smart_list_id) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      list_id: smart_list_id,
      show_specific: 1,
    };
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res?.data?.status_code == 200) {
          setAddListOpen(false);
          setReaderDetails(res?.data?.response?.data);
          setSmartListName(res?.data?.response?.smart_list_name);
          setSmartListPopupStatus(true);
        } else {
          toast.warning(res?.data?.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.warning("Something went wrong");
        loader("hide");
      });
  };

  const addClicked = (e) => {
    if (typeof getSmartListId != "undefined" && getSmartListId !== 0) {
      loader("show");
      const body = {
        user_id: localStorage.getItem("user_id"),
        list_id: getSmartListId,
        show_specific: 1,
      };
      axios
        .post(`distributes/get_reders_list`, body)
        .then((res) => {
          if (res?.data?.status_code == 200) {
            setReaders(res?.data?.response?.data);

            res?.data?.response?.data?.map((data) => {
              let prev_obj = selectedHcp?.find((x) => x?.email?.toLowerCase() === data?.email?.toLowerCase());
              if (typeof prev_obj === "undefined") {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              }
            });

            loader("hide");
          } else {
            toast.warning(res?.data?.message);
            loader("hide");
          }
          setIsOpensend(true);
          setAddListOpen(false);
        })
        .catch((err) => {
          toast.warning("Something went wrong");
          loader("hide");
        });
    } else {
      toast.warning("Please select smart list");
    }
  };
  const updateTemplate = async (e, status = 0) => {
    e.preventDefault();
    if (approveClickedd) {
      setApproveClicked(false);
    } else {
      setApproveClicked(true);
    }

    let template_id = templateId;
    if (
      typeof template_id != "undefined" &&
      template_id != "" &&
      template_id != 0
    ) {
      if (editorRef.current) {
        const body = {
          user_id: localStorage.getItem("user_id"),
          subject:emailSubject,
          description:emailDescription,
          source_code: editorRef.current.getContent(),
          template_id: templateId,
          // name: templateName,
          name:emailSubject,
          status: status === 0 ? 2 : status === 1 ? 3 : 4,
          event_id: eventId,
        };
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`webinar/add_update_template`, body)
          .then((res) => {
            if (res?.data?.status_code == 200) {
              getTemplateListData();
              toast.success("Your changes saved successfully");
              loader("hide");
            }
          })
          .catch((err) => {
            loader("hide");
            toast.error("Something went wrong");
          });
      }
    } else {
      toast.warning("Template not selected.");
    }
  };

  const approveClicked = async (e) => {
    e.preventDefault();

    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: "3487",
      description: emailDescription,
      creator: "",
      campaign_name: "",
      subject: emailSubject,
      route_location: "webinar/email/auto-emails",
      tags: [],
      campaign_data: {
        templateId: templateId,
      },
      campaign_id: "",
      status: 3,
      approved_page: 1,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        loader("hide");

        if (res?.data?.status_code === 200) {
          setApproveClicked(true);
          toast.success("Approved Draft saved");
        } else {
          toast.warning(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error("Somwthing went wrong");
      });
  };

  const changeLanguage = (e) => {
    setLanguage(e?.value);
    setTemplateClicked(false);
    setIndexClicked();
  };

  // const addTracking = function (editor) {
  //   editor.on("OpenWindow", function (e) {
  //     let dialog = document.getElementsByClassName("tox-dialog")[0];

  //     if (dialog) {
  //       let header = dialog.querySelector(".tox-dialog__header");
  //       const closeButton = header.querySelector('[aria-label="Close"]');
  //       let text = header.querySelector(".tox-dialog__title");

  //       if (text.innerText == "Insert/Edit Link") {
  //         let uploadIcon = document.querySelector(
  //           "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > button > span"
  //         );
  //         uploadIcon.style.display = "none";
  //         let newButton = document.createElement("button");
  //         newButton.innerText = "Add Tracking";
  //         newButton.classList.add("tox-button");
  //         newButton.classList.add("tox-button--icon");
  //         newButton.classList.add("tox-button--naked");
  //         newButton.classList.add("track");
  //         newButton.onclick = function () {
  //           let firstToxControlWrap = document.querySelector(
  //             "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > div >input"
  //           );

  //           // let text =dialog.querySelector(".tox-form__group");
  //           if (!firstToxControlWrap.value) {
  //             alert("Please enter a link");
  //             return;
  //           }
  //           const baseLink =
  //             "https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_";
  //           if (firstToxControlWrap.value.startsWith(baseLink)) {
  //             alert("Traking already added");
  //             return;
  //           }

  //           const currentTimestamp = Date.now();
  //           // const redirectUrl = encodeURIComponent(firstToxControlWrap.value)
  //           let link = `https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_${currentTimestamp}&redirect_url=${firstToxControlWrap.value}`;
  //           firstToxControlWrap.value = link;

  //           alert("Traking added");
  //         };

  //         header.insertBefore(newButton, closeButton);
  //       }
  //     }
  //   });
  // };

  const addTracking = function (editor) {
    editor.on("OpenWindow", function (e) {
        let dialog = document.getElementsByClassName("tox-dialog")[0];
        if (dialog) {
            let header = dialog?.querySelector(".tox-dialog__header");
            const closeButton = header?.querySelector('[aria-label="Close"]');
            let text = header?.querySelector(".tox-dialog__title");
            let url = dialog?.querySelector(".tox-control-wrap")
            let newLink = url?.querySelector(".tox-textfield")
            let newButton = document.createElement("button");
            const baseLink =
                "https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_";
            let payload = {}
            let apiLink = ""

            if (text?.innerText == "Insert/Edit Link") {
                let uploadIcon = document.querySelector(
                    "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > button > span"
                );
                uploadIcon.style.display = "none";
                // let newButton = document.createElement("button");
                if (newLink?.value?.includes(baseLink)) {
                    newButton.innerText = "Remove Tracking";
                    apiLink = `https://onesource.informed.pro/api/delete-track-links`;
                } else {
                    newButton.innerText = "Add Tracking";
                    apiLink = `https://onesource.informed.pro/api/track-links`;
                }
                newButton.classList.add("tox-button");
                newButton.classList.add("tox-button--icon");
                newButton.classList.add("tox-button--naked");
                newButton.classList.add("track");

                newButton.onclick = function () {
                    if (templateIdRef.current == "") {
                        alert("Please select or create the template first before adding the link");
                        return;
                    }
                    let firstToxControlWrap = document.querySelector(
                        "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > div >input"
                    );

                    if (newLink?.value?.includes(baseLink) && newButton.innerText == "Remove Tracking") {
                        let urlvalue = newLink?.value?.split("&redirect_url=")
                        const startIndex = urlvalue[0].indexOf('tracking_code=') + 'tracking_code='.length;
                        const substring = urlvalue[0].substring(startIndex);
                        firstToxControlWrap.value = urlvalue[1]
                        payload = {
                            template_id: templateIdRef.current,
                            url_code: substring,
                        };
                    }
                    if (!newLink?.value?.includes(baseLink) && newButton.innerText == "Add Tracking") {
                        if (!newLink?.value) {
                            alert("Please enter a link")
                            return
                        }
                        if (!firstToxControlWrap.value) {
                            alert("Please enter a link");
                            return;
                        }
                        if (firstToxControlWrap.value.startsWith(baseLink)) {
                            alert("Traking already added");
                            return;
                        }
                        let slugValue = prompt("Enter a slug value");

                        const currentTimestamp = Date.now();
                        payload = {
                            slug_value: slugValue,
                            template_id: templateIdRef.current,
                            url_code: `clicked_track_doc_${currentTimestamp}`,
                        };
                        linkingPayload.current = payload;
                        let link = `https://webinar.docintel.app/flow/webinar/track_multilinks?token=###updateid###&tracking_code=clicked_track_doc_${currentTimestamp}&redirect_url=${firstToxControlWrap.value}`;
                        firstToxControlWrap.value = link;

                    }

                    var saveButton = document.querySelector(
                        '.tox-button[title="Save"]'
                    );
                    saveButton.addEventListener("click", function () {
                        axios
                            .post(apiLink, payload)
                            .then((res) => {
                                console.log("done");
                            })
                            .catch((err) => {
                                loader("hide");
                                console.log(err);
                            });
                    });
                    if (newLink?.value?.includes(baseLink)) {
                        alert("Traking added");
                    } else {
                        alert("Traking removed");
                    }
                };

                header.insertBefore(newButton, closeButton);
            } else if (text.innerText == "Insert/Edit Media") {
                document.querySelector(
                    "body > div.tox.tox-silver-sink.tox-tinymce-aux > div.tox-dialog-wrap > div.tox-dialog > div.tox-dialog__content-js > div > div.tox-dialog__body-content > div > div:nth-child(1) > label"
                ).innerText += " (Max size: 1GB)";
            }
        }
    });
};

  const uploadImageToServer = async (file) => {
    try {
      loader("show");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "https://onesource.informed.pro/api/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const uploadedData = await response.json();
        return uploadedData.imageUrl;
      } else {
        console.error("Image upload failed");
        return null;
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      loader("hide");
    }
  };

  const createTemplate=async(e)=>{
    e.preventDefault()
    let error={}
    if(newTemplateDescription==""){
      error.newTemplateDescription="Please enter template name"
      setValidationError(error)
      return
    }else if(newTemplateSubject==""){
      error.newTemplateSubject="Please enter template subject"
      setValidationError(error)
      return
    }else if(templateSaving==""){
      toast.warning("Template can't be empty")
      return
    }else{
 
      if (editorRef.current) {
        const body = {
          user_id: localStorage.getItem("user_id"),
          source_code: editorRef.current.getContent(),
          template_id: "",
          name: newTemplateSubject,
          subject: newTemplateSubject,
          description:newTemplateDescription,
          status: 1,
          event_id: eventId,
        };
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`webinar/add_update_template`, body)
          .then((res) => {
            if (res?.data?.status_code == 200) {
              getTemplateListData();
              setIndexClicked();
              setTemplateClicked(false);
              setValidationError({})
              setSourceCode("");
              setIndexClicked();
              setTemplateId(0);
              templateIdRef.current = "";
              setTempLang(0);
              // setNewTemplateName("")
              setNewTemplateDescription("")
              setNewTemplateSubject("")
              setCreateNewTemplate(false)
              toast.success("Template Created");
              loader("hide");
            }
          })
          .catch((err) => {
            loader("hide");
            toast.error("Something went wrong");
          });
    } 
    }

  }

  const CreateNewTemplateClicked=(e)=>{
    e.preventDefault()
    let defaultSourceCode= templates?.triggeredTemplate?.find(item => item?.template_code==="INVITATION_-_CLINICAL_PRACTICE")
    console.log(defaultSourceCode);
    setIndexClicked();
    setTemplateClicked(false);
    setValidationError({})
    setSourceCode(defaultSourceCode?.template);
    setTemplateId(defaultSourceCode?.id);
    templateIdRef.current = defaultSourceCode?.id;
    // setNewTemplateName(defaultSourceCode?.name)
    setNewTemplateSubject(defaultSourceCode?.subject)
    setNewTemplateDescription(defaultSourceCode?.description)
    setCreateNewTemplate(true)
  }
  const closeClicked = () => {
    setIsOpenAdd(false);
    setIsOpensend(true);
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
  const generate_thumb = useCallback(async () => {
    if (ref.current === null) {
      return;
    }
    loader("show");

    html2canvas(ref.current, { useCORS: true, proxy: 'https://docintel.s3-eu-west-1.amazonaws.com' })
    .then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append('user_id', localStorage.getItem("user_id"));
          formData.append('template_id', templateId);
          formData.append('image_url', blob, 'image.png'); // Assuming the file name is 'image.png'
          formData.append('template_name', "");
          formData.append('event_id', eventId);
  
          axios.post('https://onesource.informed.pro/api/update-template', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((res) => {
            if (res.data.status_code == 200) {
              toast.success(res.data.message);
              getTemplateListData();
            } else {
              toast.warning(res.data.message);
            }
            setviewEmailModal(false);
            loader("hide");
          })
          .catch((err) => {
            setviewEmailModal(false);
            loader("hide");
            toast.error("Something went wrong.");
          });
        }
      }, 'image/png');
    })
    .catch((err) => {
      setviewEmailModal(false);
      loader("hide");
      toast.error("Something went wrong.");
      console.log(err);
    });
  
  }, [ref, templateId]);

  const replaceDangerHtml = (dynamicTempHtml) => {
    const modifiedContent = dynamicTempHtml?.replace(
      '<p><img style="display: none;" src="https://informed.pro/Distributes/updatemailread/###updateid###/pdf_mail" alt="" width="1" height="1" border="0"></p>',
      ""
    );

    var modifiedStringagain = modifiedContent?.replace(
      '<p><img style="display: none;" src="https://webinar.informed.pro/Distributes/updatemailread/###updateid###/pdf_mail" alt="" width="1" height="1" border="0"></p>',
      ""
    );

    var modifiedStringforsrc = modifiedStringagain?.replace(
      '<p><img style="display: none;" src="Distributes/updatemailread/###updateid###/pdf_mail" alt="" width="1" height="1" border="0"></p>',
      ""
    );
    var pattern = /<img[^>]+src="([^"]*)"[^>]*>/g;

    // Replace the matching img tags with a new string
    var modifiedString = modifiedStringforsrc?.replace(
      pattern,
      function (match, src) {
        if (src === "###coverpath###") {
          return "";
        } else {
          return match; // Keep the original img tag if the src doesn't match
        }
      }
    );
    return modifiedString;
  };
  const openPreviewThumbPopup = (e) => {
    e.preventDefault();
    if (
      typeof templateId != "undefined" &&
      templateId != "" &&
      templateId != 0
    ) {
      setviewEmailModal(true);
    } else {
      toast.warning("Template not selected.");
    }
  };
  const viewSmartListData = async(id) => {
    setAddListOpen(false);
    setSelectedListId(id);
  }

  const closeSmartListPopup = async() => {
    setSelectedListId(0);
    setAddListOpen(true);
  }
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Auto Email</h2>
              </div>
              {/* <div className="template_builder-option">
                {localStorage.getItem("user_id") ==
                  "B7SHpAc XDXSH NXkN0rdQ==" && (
                    <div className="template_language">
                      <span>Language</span>
                      <div className="form-group">
                        <Select
                          options={getTemplateLanguage}
                          defaultValue={getTemplateLanguage[0]}
                          onChange={(e) => changeLanguage(e)}
                          className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                        />
                      </div>
                    </div>
                  )}
              </div> */}
              <div className="top-right-action">
                {!createNewTemplate && <Button onClick={(e) => CreateNewTemplateClicked(e)}>Create New Template</Button>}
                {templateClicked ||createNewTemplate? (
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered next"
                      onClick={cancelClicked}
                    >
                      Cancel
                    </button>
                    {(templateName == "Reset password" ||
                      templateName == "Welcome mail")||createNewTemplate ? null : (
                      <button
                        className="btn btn-primary btn-filled next"
                        onClick={(e) => {
                          updateTemplate(e)
                        }}
                      >
                        Save
                      </button>
                    )}
                    {createNewTemplate?(
                       <button
                       className="btn btn-primary btn-filled next"
                       onClick={(e) => {
                        createTemplate(e)
                       }}
                     >
                       Create
                     </button>
                    )
                    :null}
                  </div>
                ) : null}
                
              </div>
            </div>
            <div className="auto_mail_trigger">
              <div className="row">
                {/* <div className="col-sm-12 col-md-12 d-flex justify-content-end">
                {!createNewTemplate && <Button onClick={(e) => CreateNewTemplateClicked(e)}>Create New Template</Button>}
                </div> */}
                <div className="auto_mail_trigger_left webinar-auto col-sm-4 col-md-4">
                  <div className="auto_mail_trigger_box">
                    <div className="mail_trigger_left d-flex align-items-center">
                      <div className="mail_trigger_mail-icon">
                        <img
                          src={path_image + "triggered_mail.svg"}
                          alt="Preview"
                        />
                      </div>
                      <h4>Triggered Emails</h4>{" "}                     
                    </div>
                    <div className="mail_trigger_content">
                      {typeof templates?.triggeredTemplate !== "undefined" && templates?.triggeredTemplate?.length > 0
                        ? templates?.triggeredTemplate?.map((template, index) => {
                          return (
                            <>
                              <div
                                className={
                                  // indexClicked == index
                                  templateId == template?.id 
                                    ? "trigger_content_box d-flex active"
                                    : "trigger_content_box d-flex"
                                }
                              >
                                <div className="trigger_content_image">
                                  <img
                                    src={template?.template_img}
                                    alt="Preview"
                                  />
                                    {template?.approved==1?
                                  <img
                                  src={path_image+"approved-btn.svg"}
                                  alt="Preview" className="approved_img"
                                />
                                  :""}
                                </div>
                                <div className="trigger_content">
                                  <h6>
                                    {template?.subject} 
                                  </h6>
                                  <p>
                                    {template?.description?template?.description:""}
                                    
                                  </p>
                                  {/* {indexClicked !== index ? ( */}
                                  {templateId !== template?.id ? (
                                    <button
                                      onClick={() =>
                                        viewButtonClicked(template, index)
                                      }
                                      className="btn btn-primary btn-filled  d-flex justify-content-center"
                                    >
                                      View
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </>
                          );
                        })
                        : null}
                    </div>
                  </div>
                  <div className="auto_mail_trigger_box">
                    <div className="mail_trigger_left d-flex align-items-center">
                      <div className="mail_trigger_mail-icon">
                        <img
                          src={path_image + "triggered_mail.svg"}
                          alt="Preview"
                        />
                      </div>
                      <h4>Reminder AutoMails</h4>{" "}
                    </div>
                    <div className="mail_trigger_content">
                      {typeof templates?.reminderTemplate !== "undefined" && templates?.reminderTemplate?.length > 0
                        ? templates?.reminderTemplate?.map((template, index) => {
                          return (
                            <>
                              <div
                                className={
                                  // indexClicked == index
                                  templateId == template?.id
                                    ? "trigger_content_box d-flex active"
                                    : "trigger_content_box d-flex"
                                }
                              >
                                <div className="trigger_content_image">
                                  <img
                                    src={template?.template_img}
                                    alt="Preview"
                                  />
                                  {template?.approved==1?
                                  <img
                                  src={path_image+"approved-btn.svg"}
                                  alt="Preview"
                                />
                                  :""}
                                </div>
                                <div className="trigger_content">
                                  <h6>
                                    {template?.subject} 
                                  </h6>
                                  <p>
                                    
                                    {template?.description? template?.description:""}
                                    
                                  </p>
                                  {/* {indexClicked !== index ? ( */}
                                  {templateId !== template?.id ? (
                                    <button
                                      onClick={() =>
                                        viewButtonClicked(template, index)
                                      }
                                      className="btn btn-primary btn-filled  d-flex justify-content-center"
                                    >
                                      View
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </>
                          );
                        })
                        : null}
                    </div>
                  </div>
                </div>

                
                <div className="auto_mail_trigger_right webinar-auto-right col-md-8 col-sm-8">
                  {!templateClicked && !createNewTemplate ? (
                    <div className="mail_trigger_right_dummy">
                      <div className="mail_trigger_dummy_content d-flex justify-content-center">
                        <img src={path_image + "auto_mail.svg"} alt="" />
                        <h3>Select one of the auto emails to show here</h3>
                      </div>
                    </div>
                  ) : null}
                  {templateClicked ? (
                    <div className="email-form">
                      <form>
                        <div className="form-inline row justify-content-between align-items-center">
                          <div className="form-group col-12 col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Template subject{" "}
                              <span className="astrick">*</span>
                            </label>
                            <input
                              type="text"
                              className={
                                validationError?.emailSubject
                                  ? "form-control error"
                                  : "form-control"
                              }
                              id="email-desc"
                              onChange={(e) => setEmailSubject(e?.target?.value)}
                              value={emailSubject}
                            />
                            {validationError?.emailSubject ? (
                              <div className="login-validation">
                                {validationError?.emailSubject}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group right-side col-12 col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Template description{" "}
                              <span className="astrick">*</span>{" "}
                            </label>
                            <input
                              type="text"
                              className={
                                validationError?.emailDescription
                                  ? "form-control error"
                                  : "form-control"
                              }
                              id="email-address"
                              onChange={(e) => setEmailDescription(e?.target?.value)}
                              value={emailDescription}
                            />
                            {validationError?.emailDescription ? (
                              <div className="login-validation">
                                {validationError?.emailDescription}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-inline row justify-content-end align-items-center">
                          <div className="form-buttons right-side col-12 col-md-5">
                            {/* {templateName == "Welcome mail" ||
                              templateName ==
                              "Reset password" ? null : approveClickedd ==
                                1 ? (
                              <button
                                className="btn btn-primary approved-btn btn-bordered "
                                onClick={(e) => updateTemplate(e, 2)}
                              >
                                Approved{" "}
                                <img
                                  src={path_image + "approved-btn.svg"}
                                  className="approve_btn"
                                  alt=""
                                />
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary approved-btn btn-bordered "
                                onClick={(e) => updateTemplate(e, 1)}
                              >
                                Approve?{" "}
                                
                              </button>
                            )} */}

<button
                                                        className={
                                                            typeof approveClickedd !== "undefined" &&
                                                            approveClickedd === true
                                                                ? "btn btn-primary approved-btn btn-bordered checked"
                                                                : "btn btn-primary approved-btn btn-bordered"
                                                        }
                                                        onClick={(e) => updateTemplate(e, approveClickedd===true ?2:1)}                                                    >
                                                        {typeof approveClickedd !== "undefined" &&
                                                            approveClickedd ===true
                                                            ? "Approved"
                                                            : "Approve?"}
                                                        <img
                                                            src={path_image + "approved-btn.svg"}
                                                            className="approve_btn"
                                                            alt=""
                                                        />
                                                        <img
                                                            src={path_image + "/approved-by-btn.svg"}
                                                            className="approved_btn"
                                                            alt=""
                                                        />
                                                    </button>
                                  <button
                                      className="btn btn-primary btn-filled"
                                      onClick={(e) => {
                                        openPreviewThumbPopup(e);
                                      }}
                                    >
                                      Generate Thumbnail
                                    </button>
                            <button
                              onClick={sendSample}
                              className="btn btn-primary btn-bordered btn-large"
                            >
                              Send A Sample
                            </button>
                          </div>
                        </div>
                        <div className="template_editor">
                            {templateName == "Reset password" ||
                            templateName == "Welcome mail" ? (
                            <Editor
                              apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                              onInit={(evt, editor) =>
                                (editorRef.current = editor)
                              }
                              initialValue={sourceCode}
                              disabled={true}
                              init={{
                                height: "100vh",
                                menubar:
                                  "file edit view insert format tools table help",
                                plugins:
                                  "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                                toolbar:
                                  "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                                content_style:
                                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                init_instance_callback: (editor) =>
                                  addTracking(editor),
                                file_picker_types: "file image media",
                                file_picker_callback: function (
                                  callback,
                                  value,
                                  meta
                                ) {
                                  const input = document.createElement("input");
                                  if (meta.filetype === "media") {
                                    input.setAttribute("type", "file");
                                    input.setAttribute("accept", "video/*");
                                    input.onchange = async () => {
                                      const file = input.files[0];
                                      if (file) {
                                        let uploadedImageUrl;
                                        try {
                                          if (
                                            meta &&
                                            meta.width &&
                                            meta.height
                                          ) {
                                            uploadedImageUrl =
                                              await uploadImageToServer(
                                                file,
                                                meta.width,
                                                meta.height
                                              );
                                          } else {
                                            uploadedImageUrl =
                                              await uploadImageToServer(file);
                                          }
                                          if (uploadedImageUrl) {
                                            callback(uploadedImageUrl, {
                                              width: 500,
                                              height: 500,
                                            });
                                          } else {
                                            console.error(
                                              "Failed to upload image"
                                            );
                                          }
                                        } catch (error) {
                                          console.error(
                                            "Error uploading image:",
                                            error
                                          );
                                        } finally {
                                        }
                                      }
                                    };
                                  } else {
                                    input.setAttribute("type", "file");
                                    input.setAttribute("accept", "image/*");

                                    // Create a loading indicator element (e.g., a spinner)
                                    const loadingIndicator =
                                      document.createElement("div");
                                    loadingIndicator.className =
                                      "loading-indicator";
                                    loadingIndicator.textContent =
                                      "Uploading..."; // You can use a spinner icon or any text you prefer

                                    input.onchange = async () => {
                                      document.body.appendChild(
                                        loadingIndicator
                                      ); // Show loading indicator

                                      const file = input.files[0];
                                      if (file) {
                                        let uploadedImageUrl;

                                        try {
                                          if (
                                            meta &&
                                            meta.width &&
                                            meta.height
                                          ) {
                                            uploadedImageUrl =
                                              await uploadImageToServer(
                                                file,
                                                meta.width,
                                                meta.height
                                              );
                                          } else {
                                            uploadedImageUrl =
                                              await uploadImageToServer(file);
                                          }

                                          if (uploadedImageUrl) {
                                            callback(uploadedImageUrl, {
                                              width: 500,
                                              height: 500,
                                            });
                                            loader("hide");
                                          } else {
                                            console.error(
                                              "Failed to upload image"
                                            );
                                          }
                                        } catch (error) {
                                          console.error(
                                            "Error uploading image:",
                                            error
                                          );
                                        } finally {
                                          document.body.removeChild(
                                            loadingIndicator
                                          ); // Hide loading indicator
                                        }
                                      }
                                    };
                                  }
                                  input.click();
                                },
                              }}
                              onEditorChange={(content) => {
                                setTemplateSaving(content);
                              }}
                            />
                          ) : (
                            <Editor
                              apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                              onInit={(evt, editor) =>
                                (editorRef.current = editor)
                              }
                              initialValue={sourceCode}
                              init={{
                                height: "100vh",
                                menubar:
                                  "file edit view insert format tools table help",
                                plugins:
                                  "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                                toolbar:
                                  "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                                content_style:
                                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                init_instance_callback: (editor) =>
                                  addTracking(editor),
                                file_picker_callback: function (
                                  callback,
                                  value,
                                  meta
                                ) {
                                  const input = document.createElement("input");
                                  input.setAttribute("type", "file");
                                  input.setAttribute("accept", "image/*");

                                  // Create a loading indicator element (e.g., a spinner)
                                  const loadingIndicator =
                                    document.createElement("div");
                                  loadingIndicator.className =
                                    "loading-indicator";
                                  loadingIndicator.textContent = "Uploading..."; // You can use a spinner icon or any text you prefer

                                  input.onchange = async () => {
                                    document.body.appendChild(loadingIndicator); // Show loading indicator

                                    const file = input.files[0];
                                    if (file) {
                                      let uploadedImageUrl;

                                      try {
                                        if (meta && meta.width && meta.height) {
                                          uploadedImageUrl =
                                            await uploadImageToServer(
                                              file,
                                              meta.width,
                                              meta.height
                                            );
                                        } else {
                                          uploadedImageUrl =
                                            await uploadImageToServer(file);
                                        }

                                        if (uploadedImageUrl) {
                                          callback(uploadedImageUrl, {
                                            width: 500,
                                            height: 500,
                                          });
                                          loader("hide");
                                        } else {
                                          console.error(
                                            "Failed to upload image"
                                          );
                                        }
                                      } catch (error) {
                                        console.error(
                                          "Error uploading image:",
                                          error
                                        );
                                      } finally {
                                        document.body.removeChild(
                                          loadingIndicator
                                        ); // Hide loading indicator
                                      }
                                    }
                                  };

                                  input.click();
                                },
                              }}
                              onEditorChange={(content) => {
                                setTemplateSaving(content);
                              }}
                            />
                          )}
                        </div>
                      </form>
                    </div>
                  ) : null}

                  {createNewTemplate ? (
                    <div className="email-form">
                      <form>
                        <div className="form-inline row justify-content-between align-items-center">
                        
                          <div className="form-group right-side col-12 col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Template subject{" "}
                              <span className="astrick">*</span>{" "}
                            </label>
                            <input
                              type="text"
                              className={
                                validationError?.newTemplateSubject
                                  ? "form-control error"
                                  : "form-control"
                              }
                              id="email-address"
                              onChange={(e) => setNewTemplateSubject(e?.target?.value)}
                              value={newTemplateSubject}
                            />
                            {validationError?.newTemplateSubject ? (
                              <div className="login-validation">
                                {validationError?.newTemplateSubject}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-12 col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Template description{" "}
                              <span className="astrick">*</span>
                            </label>
                            <input
                              type="text"
                              className={
                                validationError?.newTemplateDescription
                                  ? "form-control error"
                                  : "form-control"
                              }
                              id="email-desc"
                              onChange={(e) => setNewTemplateDescription(e?.target?.value)}
                              value={newTemplateDescription}
                            />
                            {validationError?.newTemplateDescription ? (
                              <div className="login-validation">
                                {validationError?.newTemplateDescription}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <Editor
                          apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                          onInit={(evt, editor) =>
                            (editorRef.current = editor)
                          }
                          initialValue={sourceCode}
                          init={{
                            height: "100vh",
                            menubar:
                              "file edit view insert format tools table help",
                            plugins:
                              "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
                            toolbar:
                              "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            init_instance_callback: (editor) =>
                              addTracking(editor),
                            file_picker_callback: function (
                              callback,
                              value,
                              meta
                            ) {
                              const input = document.createElement("input");
                              input.setAttribute("type", "file");
                              input.setAttribute("accept", "image/*");

                              // Create a loading indicator element (e.g., a spinner)
                              const loadingIndicator =
                                document.createElement("div");
                              loadingIndicator.className =
                                "loading-indicator";
                              loadingIndicator.textContent = "Uploading..."; // You can use a spinner icon or any text you prefer

                              input.onchange = async () => {
                                document.body.appendChild(loadingIndicator); // Show loading indicator

                                const file = input.files[0];
                                if (file) {
                                  let uploadedImageUrl;

                                  try {
                                    if (meta && meta.width && meta.height) {
                                      uploadedImageUrl =
                                        await uploadImageToServer(
                                          file,
                                          meta.width,
                                          meta.height
                                        );
                                    } else {
                                      uploadedImageUrl =
                                        await uploadImageToServer(file);
                                    }

                                    if (uploadedImageUrl) {
                                      callback(uploadedImageUrl, {
                                        width: 500,
                                        height: 500,
                                      });
                                      loader("hide");
                                    } else {
                                      console.error(
                                        "Failed to upload image"
                                      );
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Error uploading image:",
                                      error
                                    );
                                  } finally {
                                    document.body.removeChild(
                                      loadingIndicator
                                    ); // Hide loading indicator
                                  }
                                }
                              };

                              input.click();
                            },
                          }}
                          onEditorChange={(content) => {
                            setTemplateSaving(content);
                          }}
                          
                         />
                          </div>
                      </form>
                    </div>



                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
      <Modal id="send-sample" show={isOpenSend} custom-atr="non-scroll">
        <Modal.Header>
          <h4>Send a Sample</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setIsOpensend(false);
              setSelectedHcp([]);
              setSearchedUsers([]);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body onScroll={handleScroll}>
          <div className="top-header">
            <div className="page-title">
              <h4>Search For Contact By:</h4>
            </div>
          </div>
          <section className="search-hcp">
            <div className="form-search-hcp">
              <form>
                <div
                  className="form-inline row justify-content-start align-items-center"
                  id="popup_subject"
                ></div>

                <div className="form-inline row justify-content-between align-items-center">
                  <div className="col-12 col-md-7">
                    <div className="row justify-content-between align-items-center">
                      <div className="form-group col-sm-6">
                        <label htmlFor="hcp-name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setName(e?.target?.value)}
                          value={name}
                          id=""
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="hcp-email">Email </label>
                        <input
                          type="mail"
                          onChange={(e) => setEmail(e?.target?.value)}
                          value={email}
                          className="form-control"
                          id=""
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
                      onClick={addNewContactClicked}
                    >
                      Add New Contact +
                    </button>
                    <button
                      className="btn btn-primary btn-bordered"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#add_hcp"
                      onClick={() => setAddListOpen(true)}
                    >
                      Add Smart List +
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="search-hcp-table sample_list_dt">
              <div className="search-hcp-table-inside sample_list_dt">
                {searchedUsers?.length === 0 ? (
                  <div className="not-found">
                    <h4>No Record Found!</h4>
                  </div>
                ) : (
                  searchedUsers?.map((data, index) => {
                    return (
                      <div className="search-hcp-box" key={data}>
                        <p className="send-hcp-box-title">
                          Name | <span>{data?.name}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Email | <span>{data?.email}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Contact type | <span>{data?.contact_type}</span>
                        </p>
                        <div
                          className="add-new-field"
                          onClick={() => selectHcp(index)}
                        >
                          <img
                            src={path_image + "add-row.png"}
                            alt="Add More"
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="selected-hcp-table">
              <div className="table-title">
                <h4>
                  Selected contact <span>| {selectedHcp?.length}</span>
                </h4>
              </div>
              <div className="selected-hcp-list">
                {selectedHcp?.length === 0 ? (
                  <div className="not-found">
                    <h4>No Contact selected yet!</h4>
                  </div>
                ) : (
                  <>
                    {selectedHcp?.map((data, index2) => {
                      return (
                        <>
                          <div className="search-hcp-box" key={data}>
                            <p className="send-hcp-box-title">
                              Name | <span>{data.name || data.first_name}</span>
                            </p>
                            <p className="send-hcp-box-title">
                              Email | <span>{data.email}</span>
                            </p>
                            <p className="send-hcp-box-title">
                              Contact type | <span>{data.contact_type}</span>
                            </p>
                            <div className="remove-existing-field">
                              <img
                                src={path_image + "delete.svg"}
                                alt="Delete Row"
                                onClick={() => deleteSelected(index2)}
                              />
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </section>
        </Modal.Body>
        <Modal.Footer>
          {selectedHcp?.length === 0 ? (
            <button
              type="button"
              className="btn btn-primary btn-filled disabled"
              data-bs-dismiss="modal"
            >
              Send
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={sendsampeap}
            >
              Send
            </button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="modal">
        <Modal id="add-list" show={addListOpen} custom-atr="non-scroll">
          <Modal.Header>
            <h4>Add List</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                setAddListOpen(false);
                setIsOpensend(true);
                setSelectedHcp([]);
                setSearchedUsers([]);
              }}
            ></button>
          </Modal.Header>
          <Modal.Body onScroll={handleSmartListPopupScroll}>
            <div className="top-right-action">
              <div className="search-bar">
                <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    onChange={(e) => searchChange(e)}
                  />
                  <button
                    className="btn btn-outline-success"
                    onClick={(e) => submitHandler(e)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                        fill="#97B6CF"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="col smartlist-result-block">
              {typeof smartListData !== "undefined" &&
                smartListData.length > 0 ? (
                smartListData.map((data) => {
                  return (
                    <>
                      <div className="smartlist_box_block new-smartlist">
                        <div className="smartlist-view email_box">
                          <div className="mail-box-content">
                          <div className="mail-box-conten-title">
                            <h5>{data.name}</h5>
                            <div className="select-mail-option">
                              <input
                                type="radio"
                                name="radio"
                                onClick={(e) => handleSelect(data, e)}
                                checked={
                                  typeof getSmartListId !== "undefined" &&
                                    getSmartListId !== 0 &&
                                    getSmartListId == data.id
                                    ? "checked"
                                    : ""
                                }
                              />
                              <span className="checkmark"></span>
                            </div>
                          </div>
                            <SmartListLayout data= {data} iseditshow={0} isviewshow={1} deletestatus = {0} viewSmartListData = {viewSmartListData}/>

                            {/* <div className="mailbox-table">
                              <table>
                                <tbody>
                                  <tr>
                                    <th>Contact type</th>
                                    <td>{data.contact_type}</td>
                                  </tr>
                                  <tr>
                                    <th>Speciality</th>
                                    <td>{data.speciality}</td>
                                  </tr>
                                  <tr>
                                    <th>Readers</th>
                                    <td>{data.reader_selection}</td>
                                  </tr>
                                  <tr>
                                    <th>IBU</th>
                                    <td>{data.ibu}</td>
                                  </tr>
                                  <tr>
                                    <th>Product</th>
                                    <td>{data.product}</td>
                                  </tr>
                                  <tr>
                                    <th>Country</th>
                                    <td>{data.country}</td>
                                  </tr>
                                  <tr>
                                    <th>Registered</th>
                                    <td>{data.registered}</td>
                                  </tr>
                                  <tr>
                                    <th>Created by</th>
                                    <td>
                                      <span>{data.creator}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div> */}

                            {/* <div className="mail-time">
                              <span>{data.created_at}</span>
                            </div>
                            <div className="smart-list-added-user">
                              <img
                                src={path_image + "smartlist-user.svg"}
                                alt="User icon"
                              />
                              {data.readers_count}
                            </div> */}

                            {/*<div className="smartlist-buttons">
                                <button className="btn btn-primary btn-bordered view">
                                  <a onClick={() => openSmartListPopup(data.id)}>
                                    View
                                  </a>
                                </button>
                              </div>*/}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={(e) => addClicked(e)}
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showPreogressBar}
          className="send-confirm"
          id="upload-confirm"
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <div
              className="circular-progressbar"
              style={{
                width: 100,
                height: 100,
              }}
            >
              <CircularProgressbar
                value={uploadOrDownloadCount}
                text={`${uploadOrDownloadCount}%`}
                strokeWidth={5}
              />
            </div>
          </Modal.Body>
          <h4>
            {" "}
            {mailsIncrement} mails sent of {hcpsSelected.length}
          </h4>
        </Modal>
      </div>
      <div>
        <Modal
          id="mail-thumb-preview"
          show={viewEmailModal}
          custom-atr="non-scroll"
        >
          <Modal.Header>
            <h4>Email View</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() =>
                setviewEmailModal((viewEmailModal) => !viewEmailModal)
              }
            ></button>
            <div className="upload_view">
              <button
                className="btn btn-primary btn-bordered"
                onClick={generate_thumb}
              >
                Upload
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body-view">
              <div
                className="thumbnail_email_view"
                ref={ref}
                dangerouslySetInnerHTML={{
                  __html:
                    templateSaving != ""
                      ? replaceDangerHtml(templateSaving)
                      : replaceDangerHtml(sourceCode),
                }}
              ></div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <AddNewContactModal
        show={isOpenAdd}
        closeClicked={closeClicked}
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
       {
        selectedListId ?
         <SmartListTableLayout id = {selectedListId}  closeSmartListPopup = {closeSmartListPopup} />
         : null
      }
    </>)
};
export default WebinarAutoEmail;
