import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import { getCampaignId, getEmailData } from "../../actions";
import { useNavigate } from "react-router-dom";
import { Modal, ModalDialog, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../loader";
import Select from "react-select";
import { popup_alert } from "../../popup_alert";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { getSelectedSmartListData } from "../../actions";
import { toPng } from "html-to-image";
import { CircularProgressbar } from "react-circular-progressbar";
import { buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
var dxr = 0;
var state_object = {};
const TemplateBuilder = (props) => {
  const editorRef = useRef(null);
  const ref = useRef(null);

  let file_name = useRef("");
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const navigate = useNavigate();
  const [SendListData, setSendListData] = useState([]);
  const [newTemplateNamee, setNewTemplateNamee] = useState("");
  const [UserData, setUserData] = useState([]);
  const [newTemplateClicked, setNewTemplateClicked] = useState(false);
  const location = useLocation();
  const [uniqueId, setUniqueId] = useState("");
  const [templateType, setTemplateType] = useState();
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [newTemplateContent, setNewTemplateContent] = useState("");
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const [hcpsSelected, setHcpsSelected] = useState([]);
  const [getsearch, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedIbu, setSelectedIbu] = useState("");
  const PdfSelected = "";
  const [newTemplateName, setNewTemplateName] = useState("");
  const [manualReRender, setManualReRender] = useState(0);
  const campaign_id = "";
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeExcel, setActiveExcel] = useState("");
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [counterFlag, setCounterFlag] = useState(0);
  const [activeManual, setActiveManual] = useState("active");
  const [plainTemplateClickedd, setPlainTemplateClicked] = useState(false);
  const [linkTemplateClickedd, setLinkTemplateClicked] = useState(false);

  const [templateList, setTemplateList] = useState([]);
  const [editableTemplate, setEdiatbleTemplate] = useState(false);
  const [template, setTemplate] = useState("");
  var [selectedCountry, setSelectedCountry] = useState("");
  const [readers, setReaders] = useState([]);
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [templateSaving, setTemplateSaving] = useState("");
  const [getTemplateLanguage, setTemplateLanguage] = useState([]);
  const [getTemplateIbu, setTemplateIbu] = useState([]);
  const [counter, setCounter] = useState(0);
  const [modalCounter, setModalCounter] = useState(0);
  const [emailSubject, setEmailSubject] = useState("");
  const [templateId, setTemplateId] = useState();
  const [templateName, setTemplateName] = useState("");
  const [renderAfterValidation, setRenderAfterValidation] = useState(0);
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen_send, setIsOpensend] = useState(false);
  const [showConfirmation, setshowConfirmation] = useState(false);
  const [allTags, setAllTags] = useState({});
  const [newTag, setNewTag] = useState("");
  const [tagsReRender, setTagsReRender] = useState(0);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [countryOption, setCountryOption] = useState(0);
  const [ibuOption, setIbuOption] = useState("");
  const [validator] = React.useState(new SimpleReactValidator());

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [countryall, setCountryall] = useState([]);
  const [message, setMessage] = useState("");
  const [reRender, setReRender] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [viewEmailModal, setviewEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [editClicked, setEditClicked] = useState(true);
  const [selectedHcp, setSelectedHcp] = useState([]);
  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const [getTemplatePopup, setTemplatePopup] = useState(false);
  const [getNewTemplatePopup, setNewTemplatePopup] = useState(false);

  const [getIsApprovedStatus, setIsApprovedStatus] = useState(0);
  const [getDefaultTemplate, setDefaultTemplate] = useState(0);

  const [hpc, setHpc] = useState([
    { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
  ]);

  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [addListOpen, setAddListOpen] = useState(false);
  const [smartListData, setSmartListData] = useState([]);
  const [prevsmartListData, setPrevSmartListData] = useState([]);

  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [getSmartListId, setSmartListId] = useState(0);
  const [templateClickedd, setTemplateClicked] = useState(false);

  const newArr = [];

  useEffect(() => {
    if (addListOpen == true) {
      setIsOpensend(false);
    }
  }, [addListOpen]);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    getTemplateListData(0, "All", "");
    getSmartListData(0);
  }, []);

  const getSmartListData = (flag) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      search: getsearch,
      filter: "",
    };
    loader("show");
    axios
      .post(`distributes/get_smart_list`, body)
      .then((res) => {
        setSmartListData(res.data.response.data);
        if (flag == 0) {
          setPrevSmartListData(res.data.response.data);
        } else {
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      });
  };

  useEffect(() => {
    loader("show");
    const getalCountry = async () => {
      const body = {
        user_id: localStorage.getItem("user_id"),
        language: "",
        ibu: "",
      };

      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          setCountryall(res.data.response.data.country);
          //console.log(res.data.response.data.country);
          // console.log(countryall);
          // setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getalCountry();
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getTemplateListData = async (flag, lng, ibu) => {
    let check_lng_index = 10;
    if (lng == "All") {
      check_lng_index = 10;
    } else if (lng == "english") {
      check_lng_index = 0;
    } else if (lng == "italian") {
      check_lng_index = 1;
    } else if (lng == "germany") {
      check_lng_index = 2;
    } else if (lng == "spanish") {
      check_lng_index = 3;
    } else if (lng == "russian") {
      check_lng_index = 4;
    }

    const body = {
      user_id: localStorage.getItem("user_id"),
      language: check_lng_index,
      ibu: ibu,
    };

    loader("show");
    await axios
      .post(`emailapi/get_template_list`, body)
      .then((res) => {
        let lang = res.data.response.language;

        let lng_arr = [];
        Object.entries(lang).map(([index, item]) => {
          let label = item;
          lng_arr.push({
            value: item,
            label: label.toUpperCase(),
          });
        });

        let ibu = res.data.response.ibu;
        let ibu_arr = [];
        if (ibu.length > 0) {
          Object.entries(ibu).map(([index, item]) => {
            let label = item;
            ibu_arr.push({
              value: item,
              label: label,
            });
          });
        }

        let index = lng_arr.findIndex((x) => x.value === selectedLanguage);
        setCountryOption(index);

        setTemplateLanguage(lng_arr);

        setTemplateIbu(ibu_arr);
        setTemplateList(res.data.response.data);
        getSelectedTemplateSource(res.data.response.data);
        setDefaultTemplate(res.data.response.is_default);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    if (flag == 1) {
      loader("hide");
      toast.success("Template saved successfully");
    } else if (flag == 2) {
      setTemplateId();
      setTemplateName("");
      setNewTemplateName("");
      setTemplate("");
      loader("hide");
    }
  };

  useEffect(() => {
    //console.log("sdsdsd");
  }, [selectedHcp]);

  useEffect(() => {
    const body = {
      user_id: localStorage.getItem("user_id"),
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getAllTags = async () => {
      await axios
        .post(`emailapi/get_tags`, body)
        .then((res) => {
          setAllTags(res.data.response.data);
          // console.log(campaign_id_st);
          // if (typeof campaign_id_st === "undefined" || campaign_id_st == 0) {
          loader("hide");
          // }
        })
        .catch((err) => {
          loader("hide");
          //console.log(err);
        });
    };
    getAllTags();
    // getCampaignData();
  }, []);

  const getSelectedTemplateSource = (dd) => {
    if (
      typeof props !== "undefined" &&
      props !== null &&
      props.hasOwnProperty("getDraftData")
    ) {
      if (typeof dd !== "undefined") {
        let getSpecificKeyData = dd.find(
          (e) => e.id === props.getDraftData.campaign_data.template_id
        );
        if (
          getSpecificKeyData &&
          getSpecificKeyData.hasOwnProperty("source_code")
        ) {
          console.log(state_object);
          if (state_object != null && state_object?.template != "") {
            if (state_object.template !== "") {
              setTemplate("state_object.template");
              setTemplate(state_object.template);
            } else {
              setTemplate(getSpecificKeyData.source_code);
            }
          } else if (
            props.getDraftData != null &&
            props.getDraftData?.source_code != ""
          ) {
            if (props.getDraftData.source_code !== "") {
              setTemplate("props.getDraftData.source_code");
              setTemplate(props.getDraftData.source_code);
            } else {
              setTemplate(getSpecificKeyData.source_code);
            }
          } else {
            setTemplate(getSpecificKeyData.source_code);
          }
        }
      }
    }
  };

  const addMoreHcp = () => {
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
        },
      ]);
    } else {
      toast.warning("Please input the email atleast");
    }
  };

  const deleteSelected = (index) => {
    let arr = [];
    arr = selectedHcp;
    arr.splice(index, 1);

    setSelectedHcp(arr);
    setReRender(reRender + 1);
  };

  const createNewTemplateClicked = () => {
    setNewTemplateContent();
    setNewTemplateNamee("");
    setNewTemplateClicked(true);
    setTemplateClicked(false);
    setTemplateId();
    setTemplateName();
    setNewTemplateName();
    setTemplate();
  };

  const plainTemplateClicked = (e) => {
    e.preventDefault();
    setPlainTemplateClicked(true);
    setLinkTemplateClicked(false);
  };

  const linkTemplateClicked = (e) => {
    e.preventDefault();
    setLinkTemplateClicked(true);
    setPlainTemplateClicked(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const addClicked = (e) => {
    if (typeof getSmartListId != "undefined" && getSmartListId !== 0) {
      loader("show");
      const body = {
        user_id: localStorage.getItem("user_id"),
        list_id: getSmartListId,
      };
      axios
        .post(`distributes/get_reders_list`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            setReaders(res.data.response.data);

            res.data.response.data.map((data) => {
              let prev_obj = selectedHcp.find((x) => x.email === data.email);
              if (typeof prev_obj === "undefined") {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              }
            });
            // setSelectedHcp(res.data.response.data);
            loader("hide");
          } else {
            toast.warning(res.data.message);
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

  const sendsampeap = (event) => {
    setHcpsSelected(selectedHcp);
    let i = 0;
    const intervals_spend = (25 / 100) * selectedHcp.length;

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

      let selected_ids = selectedHcp.map(
        (number) => number["user_id"] || number["profile_user_id"]
      );

      //  loader("show");
      setShowProgressBar(true);
      const body = {
        user_id: localStorage.getItem("user_id"),
        pdf_id: "3487",
        subject: emailSubject,
        template_id: templateId,
        user_list: selected_ids,
        smartlist_id: "",
        source_code: template,
      };

      //console.log(body);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

      axios
        .post(`emailapi/send_sample_email`, body)
        .then((res) => {
          //console.log(res);
          loader("hide");
          if (res.data.status_code === 200) {
            setUploadOrDownloadCount(100);
            setMailsIncrement(selectedHcp.length);
            clearInterval(timer);
            setTimeout(() => {
              popup_alert({
                visible: "show",
                message: "Email sent successfully",
                type: "success",
              });

              setShowProgressBar(false);
              setUploadOrDownloadCount(0);
              setMailsIncrement(0);
            }, 1000);
          } else {
            popup_alert({
              visible: "show",
              message: res.data.message,
              type: "error",
            });
            clearInterval(timer);
            setUploadOrDownloadCount(0);
            setMailsIncrement(0);

            setShowProgressBar(false);
          }

          //toast.success("Test Mail sent successfuly");
        })
        .catch((err) => {
          clearInterval(timer);
          setShowProgressBar(false);
          loader("hide");
          toast.error("Something went wrong");
          console.log(err);
        });
      setEmailSubject("");
      setSelectedHcp([]);
      setSearchedUsers([]);
    } else {
      toast.warning("Please select subject first");
    }
  };

  const selectHcp = (index) => {
    let arr = [];
    arr = searchedUsers;
    let added_user_id = arr[index].profile_user_id;
    let prev_obj = selectedHcp.find((x) => x.profile_user_id === added_user_id);
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

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const closeModal = () => {
    //console.log("closed");
    setIsOpen(false);
  };

  const templateNameChange = (e) => {
    setNewTemplateName(e.target.value);
  };

  const templateClicked = (template, e) => {
    const div = document.querySelector("img.select_mm");
    setNewTemplateClicked(false);

    if (div) {
      div.classList.remove("select_mm");
    }
    setTemplateClicked(true);
    setTemplateId(template.id);
    setTemplateName(template.name);
    setNewTemplateName(template.name);
    setTemplate(template.source_code);
    e.target.classList.toggle("select_mm");
  };

  const emailSubjectChanged = (e) => {
    setEmailSubject(e.target.value);
  };

  const saveTemplateEdit = (e) => {
    setEditClicked(true);
    e.preventDefault();
    if (newTemplateName != "") {
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      const body = {
        user_id: localStorage.getItem("user_id"),
        template_id: templateId,
        image_url: "",
        template_name: newTemplateName,
      };
      axios
        .post(`emailapi/update_template`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            toast.success(res.data.message);
            setTemplateName(newTemplateName);
            getTemplateListData(0, selectedLanguage, selectedIbu);
            loader("hide");
          } else {
            toast.warning(res.data.message);
            loader("hide");
          }
          setEdiatbleTemplate(false);
        })
        .catch((err) => {
          setEdiatbleTemplate(false);
          loader("hide");
          toast.error("Something went wrong.");
        });
    } else {
      toast.warning("Please enter template name.");
    }
  };

  const closeTemplateEdit = (e) => {
    setEditClicked(true);
    e.preventDefault();
    setEdiatbleTemplate(false);
    // setNewTemplateName("");
  };

  const editTemplateClicked = (e) => {
    e.preventDefault();
    setEditClicked(false);
    setNewTemplateName(templateName);
    setEdiatbleTemplate(true);
  };

  const sendSample = (event) => {
    //  console.log(selectedHcp);

    event.preventDefault();
    if (templateId == "" || templateId == 0) {
      toast.warning("Please select email template first");
    } else {
      setIsOpensend(true);
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
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
    //console.log("hi");
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
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

      //console.log(body);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/search_hcp`, body)
        .then((res) => {
          console.log(res);
          // console.log(res.data.response.data);
          if (res.data.response) {
            setSearchedUsers(res.data.response.data);
          } else {
            toast.warning(res.data.message);
          }
          // if (res.data.message) {
          //   setMessage(res.data.message);
          // }
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const onFirstNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].firstname;
    list[i].firstname = value;
    setHpc(list);
    // console.log(hpc);
  };

  const onLastNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].lastname;
    list[i].lastname = value;
    setHpc(list);
    //console.log(hpc);
  };

  const onEmailChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    // setEmailData(e.target.value);
    //console.log(hpc);
  };

  const onContactTypeChange = (e, i) => {
    const value = e;
    const list = [...hpc];
    const name = hpc[i].contact_type;
    list[i].contact_type = value;
    setHpc(list);
    console.log(hpc);
  };

  const getCountrySelected = (e) => {
    // const { value } = e.target;

    setSelectedCountry(e);

    const value = e;
    // const list = [...hpc];
    console.log(value);
  };

  const onCountryChange = (e, i) => {
    // const { value } = e.target;
    const value = e;
    const list = [...hpc];
    const name = hpc[i].country;
    list[i].country = value;
    setHpc(list);
    console.log(hpc);
  };

  const deleteRecord = (i) => {
    const list = hpc;
    list.splice(i, 1);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
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

  const handleSelect = (data, e) => {
    setSmartListId(data.id);
  };

  const saveClicked = async () => {
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
        smart_list_id: "",
      };

      const status = body.data.map((data) => {
        if (data.email == "") {
          return "Please enter the email atleast";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = selectedHcp.find((x) => x.email === useremail);
            if (typeof prev_obj != "undefined") {
              return "User with same email already added in list.";
            } else {
              return "true";
            }
          } else {
            return "Email format is not valid";
          }
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
              toast.success("User added successfuly");

              res.data.response.data.map((data) => {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              });
              setIsOpenAdd(false);
              setIsOpensend(true);
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
            loader("hide");
            //setSelectedHcp(res.data.response.data);
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
      } else {
        toast.warning(status[0]);
      }
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
      formData.append("smart_list_id", "");
      formData.append("reader_file", selectedFile);

      console.log(formData);

      if (selectedFile) {
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              res.data.response.data.map((data) => {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              });

              loader("hide");
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              setIsOpensend(true);
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
          })
          .catch((err) => {
            console.log("something went wrong");
          });
        setIsOpen(false);
      } else {
        toast.error("Please add a excel file");
      }
    }
  };

  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSmartListData(prevsmartListData);
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

  const hideTemplatePopup = () => {
    setTemplatePopup(false);
  };

  const clickNewTemplate = () => {
    if (
      typeof templateId != "undefined" &&
      templateId != "" &&
      templateId != 0
    ) {
      setTemplatePopup(false);
      setNewTemplatePopup(true);
    } else {
      toast.warning("Template not selected.");
    }
  };

  const hideNewTemplatePopup = () => {
    setNewTemplatePopup(false);
  };

  const languageSelected = (e) => {
    loader("show");
    console.log(e);
    setSelectedLanguage(e.value);
    getTemplateListData(2, e.value, selectedIbu);
  };

  const ibuSelected = (e) => {
    loader("show");
    setSelectedIbu(e.value);
    let index = getTemplateIbu.findIndex((x) => x.value === e.value);
    setIbuOption(index);
    getTemplateListData(2, selectedLanguage, e.value);
  };

  const savenewtemplate = async (e) => {
    e.preventDefault();
    let template_name = document.getElementById("template_name").value;
    if (template_name !== "" && template_name.trim().length > 0) {
      let lang = 0;
      if (selectedLanguage == "All" || selectedLanguage == "english") {
        lang = 0;
      } else if (selectedLanguage == "italian") {
        lang = 1;
      } else if (selectedLanguage == "germany") {
        lang = 2;
      } else if (selectedLanguage == "spanish") {
        lang = 3;
      } else if (selectedLanguage == "russian") {
        lang = 4;
      }

      const body = {
        user_id: localStorage.getItem("user_id"),
        source_code: template,
        template_id: "",
        name: template_name,
        ibu: selectedIbu,
        status: 1,
        language: lang,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/add_update_template`, body)
        .then((res) => {
          if (res.data.status_code === 200) {
            getTemplateListData(1, selectedLanguage, selectedIbu);
            setTemplateId(res.data.response.data.last_id);
            setTemplateName(template_name);
          } else {
            loader("hide");
            toast.warning("Template not selected.");
          }
        })
        .catch((err) => {
          loader("hide");
          toast.error("Something went wrong");
        });
      setNewTemplatePopup(false);
      setTemplatePopup(false);
    } else {
      toast.warning("Please enter template name.");
    }
  };

  const savenewtemplatee = async (e) => {
    e.preventDefault();
    // let template_name = document.getElementById("template_name").value;
    if (newTemplateNamee !== "" && newTemplateNamee.trim().length > 0) {
      let lang = 0;
      if (selectedLanguage == "All" || selectedLanguage == "english") {
        lang = 0;
      } else if (selectedLanguage == "italian") {
        lang = 1;
      } else if (selectedLanguage == "germany") {
        lang = 2;
      } else if (selectedLanguage == "spanish") {
        lang = 3;
      } else if (selectedLanguage == "russian") {
        lang = 4;
      }

      const body = {
        user_id: localStorage.getItem("user_id"),
        source_code: newTemplateContent,
        template_id: "",
        name: newTemplateNamee,
        ibu: selectedIbu,
        status: 1,
        language: lang,
        content_included: templateType,
      };

      console.log(selectedLanguage);
      console.log(newTemplateNamee);
      console.log(selectedIbu);
      console.log(newTemplateContent);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/add_update_template`, body)
        .then((res) => {
          console.log(res);
          if (res.data.status_code === 200) {
            console.log(res);
            loader("hide");
            getTemplateListData(1, selectedLanguage, selectedIbu);
            setTemplateId(res.data.response.data.last_id);
            setTemplateName(newTemplateNamee);
          } else {
            loader("hide");
            toast.warning("You can not save the empty template !");
          }
        })
        .catch((err) => {
          loader("hide");
          toast.error("Something went wrong");
        });
      setNewTemplatePopup(false);
      setTemplatePopup(false);
    } else {
      toast.warning("Please enter template name.");
    }
  };

  const downloadFile = () => {
    let link = document.createElement("a");
    link.href = "https://informed.pro/sample.xls";
    link.setAttribute("download", "file.xlsx");
    document.body.appendChild(link);
    link.download = "";
    link.click();
    document.body.removeChild(link);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();
    setShowLessInfo(!showLessInfo);
  };
  const openSmartListPopup = async (smart_list_id) => {
    setShowLessInfo(true);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      list_id: smart_list_id,
    };
    loader("show");
    await axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          setAddListOpen(false);
          setReaderDetails(res.data.response.data);
          setSmartListName(res.data.response.smart_list_name);
          setSmartListPopupStatus(true);
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        toast.warning("Something went wrong");
        loader("hide");
      });
  };

  const handleScroll = (ev) => {
    if (ev.target.scrollTop > 20) {
      // document.querySelector("#send-sample").setAttribute("custom-atr", "scroll");
      document.querySelector("#mail-view").setAttribute("custom-atr", "scroll");
    } else {
      // document.querySelector("#send-sample").setAttribute("custom-atr", "non-scroll");
      document
        .querySelector("#mail-view")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const closeCreateNewTemplateClicked = (event) => {
    setNewTemplateClicked(false);
    setPlainTemplateClicked(false);
    setLinkTemplateClicked(false);
  };

  const handleSmartListPopupScroll = (ev) => {
    if (ev.target.scrollTop > 20) {
      document.querySelector("#add-list").setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#add-list")
        .setAttribute("custom-atr", "non-scroll");
    }
  };

  const openPreviewThumbPopup = (e) => {
    e.preventDefault();
    if (
      typeof templateId != "undefined" &&
      templateId != "" &&
      templateId != 0
    ) {
      console.log(templateId);
      setviewEmailModal(true);
    } else {
      toast.warning("Template not selected.");
    }
  };

  const generate_thumb = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    loader("show");
    toPng(ref.current, { pixelRatio: 1 })
      .then((dataUrl) => {
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        if (dataUrl) {
          const body = {
            user_id: localStorage.getItem("user_id"),
            template_id: templateId,
            image_url: dataUrl,
            template_name: "",
          };
          axios
            .post(`emailapi/update_template`, body)
            .then((res) => {
              if (res.data.status_code == 200) {
                toast.success(res.data.message);
                getTemplateListData(0, selectedLanguage, selectedIbu);
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
      })
      .catch((err) => {
        setviewEmailModal(false);
        loader("hide");
        toast.error("Something went wrong.");
        console.log(err);
      });
  }, [ref, templateId]);

  const updateTemplate = async (e) => {
    e.preventDefault();
    let template_id = templateId;
    if (
      typeof template_id != "undefined" &&
      template_id != "" &&
      template_id != 0
    ) {
      if (editorRef.current) {
        const body = {
          user_id: localStorage.getItem("user_id"),
          source_code: editorRef.current.getContent(),
          template_id: templateId,
          name: templateName,
          status: 2,
          language: 2,
        };
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/add_update_template`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              getTemplateListData(1, selectedLanguage, selectedIbu);
              setTemplate(templateSaving);
            } else {
              loader("hide");
              toast.warning("Template not selected.");
            }
          })
          .catch((err) => {
            loader("hide");
            toast.error("Something went wrong");
          });
        setNewTemplatePopup(false);
        setTemplatePopup(false);
      }
    } else {
      toast.warning("Template not selected.");
    }
  };

  const deleteTemplate = async (e) => {
    e.preventDefault();
    if (
      typeof templateId != "undefined" &&
      templateId != "" &&
      templateId != 0
    ) {
      const body = {
        user_id: localStorage.getItem("user_id"),
        template_id: templateId,
      };
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/delete_template`, body)
        .then((res) => {
          if (res.data.status_code === 200) {
            setshowConfirmation(false);
            getTemplateListData(0, selectedLanguage, selectedIbu);
            setTemplateId();
            setTemplateName("");
            setNewTemplateName("");
            setTemplate("");
            loader("hide");
          } else {
            loader("hide");
            setshowConfirmation(false);
            toast.warning("Template not selected.");
          }
        })
        .catch((err) => {
          loader("hide");
          setshowConfirmation(false);
          toast.error("Something went wrong");
        });
    } else {
      setshowConfirmation(false);
      toast.warning("Template not selected.");
    }
  };

  const onTemplateTypeChange = (e) => {
    setTemplateType(e);
    console.log(e);
  };

  return (
    <>
      <div className="col right-sidebar">
        {console.log(selectedIbu)}
        <div className="custom-container">
          <div className="row">
            <div className="top-header">
              <div className="page-title">
                {/* <h2>Template Builder</h2> */}
              </div>
              <div className="top-right-action">
                {templateClickedd ? (
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered send-sample"
                      onClick={sendSample}
                    >
                      Send A Sample
                    </button>
                  </div>
                ) : (
                  <div className="header-btn">
                    <button
                      disabled
                      className="btn btn-primary btn-bordered send-sample"
                      //onClick={sendSample}
                    >
                      Send A Sample
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="template_builder-option">
              <div className="d-flex justify-content-start align-items-center">
                {getTemplateLanguage.length > 0 && (
                  <div className="template_language">
                    <span>Template language</span>
                    <div className="form-group">
                      <Select
                        defaultValue={
                          typeof getTemplateLanguage[countryOption] ===
                          "undefined"
                            ? "Select Language"
                            : getTemplateLanguage[countryOption]
                        }
                        placeholder={
                          typeof getTemplateLanguage[countryOption] ===
                          "undefined"
                            ? "Select Language"
                            : getTemplateLanguage[countryOption]
                        }
                        onChange={(e) => languageSelected(e)}
                        options={getTemplateLanguage}
                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      />
                    </div>
                  </div>
                )}

                {getTemplateIbu.length > 0 && (
                  <div className="template_country">
                    <span>IBU</span>
                    <div className="form-group">
                      <Select
                        onChange={(e) => ibuSelected(e)}
                        options={getTemplateIbu}
                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                        defaultValue={
                          typeof getTemplateIbu[ibuOption] === "undefined"
                            ? "Select Ibu"
                            : getTemplateIbu[ibuOption]
                        }
                        placeholder={
                          typeof getTemplateIbu[ibuOption] === "undefined"
                            ? "Select Ibu"
                            : getTemplateIbu[ibuOption]
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="top-header">
              <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="page-title">
                    <h5>Select Template</h5>
                  </div>
                  <button
                    onClick={createNewTemplateClicked}
                    className="btn btn-primary btn-filled"
                  >
                    Create a new template
                  </button>
                </div>
              </div>
            </div>

            <section className="select-mail-template">
              <div className="custom-container">
                <div className="row">
                  <AliceCarousel
                    mouseTracking
                    disableDotsControls
                    activeIndex={activeIndex}
                    responsive={responsive}
                    onSlideChanged={syncActiveIndex}
                  >
                    {templateList.map((template) => {
                      return (
                        <>
                          <div
                            className="item"
                            onClick={(e) => templateClicked(template, e)}
                          >
                            <img
                              id={"template_dyn" + template.id}
                              src={template.template_img}
                              alt=""
                              className={
                                typeof templateId !== "undefined" &&
                                templateId == template.id
                                  ? "select_mm"
                                  : ""
                              }
                            />
                            <p>{template.name}</p>
                          </div>
                        </>
                      );
                    })}
                  </AliceCarousel>

                  <input type="hidden" id="mail_template" value={templateId} />
                  {validator.message("Templates", templateId, "required")}
                  {newTemplateClicked == true ? (
                    <div className="email-form">
                      <form>
                        <div className="form-inline row justify-content-between align-items-center"></div>
                        <div className="form-inline row justify-content-end align-items-center">
                          <div className="form-group template_builder_div col-12 col-md-12">
                            {
                              <>
                                <input
                                  type="text"
                                  value={newTemplateNamee}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setNewTemplateNamee(e.target.value);
                                  }}
                                ></input>
                              </>
                            }

                            <div className="form-buttons form-buttons-template right-sided">
                              <button
                                className="btn btn-primary btn-filled"
                                onClick={(e) => savenewtemplatee(e)}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-primary btn-bordered"
                                onClick={(e) =>
                                  closeCreateNewTemplateClicked(e)
                                }
                              >
                                Cancel
                              </button>
                            </div>
                            {/* <div className="form-buttons form-buttons-template right-side">
                              <>
                                <button
                                  className="btn btn-primary btn-filled"
                                  onClick={(e) => plainTemplateClicked(e)}
                                >
                                  Plain Template
                                </button>
                                <button
                                  className="btn btn-primary btn-filled"
                                  onClick={(e) => linkTemplateClicked(e)}
                                >
                                  Link Template
                                </button>
                              </>
                            </div> */}

                            <div
                              className="col-12 col-md-6"
                              style={{ marginLeft: "10px" }}
                            >
                              <div className="form-group">
                                <DropdownButton
                                  className="dropdown-basic-button split-button-dropup"
                                  title={
                                    templateType == 0
                                      ? "Pure Text"
                                      : templateType == 1
                                      ? "Plain Text"
                                      : "Select Type"
                                  }
                                  onSelect={(event) =>
                                    onTemplateTypeChange(event)
                                  }
                                >
                                  <Dropdown.Item
                                    eventKey="0"
                                    className={
                                      templateType == 0 ? "active" : ""
                                    }
                                  >
                                    Pure text
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey="1"
                                    className={
                                      templateType == 1 ? "active" : ""
                                    }
                                  >
                                    Plain text
                                  </Dropdown.Item>
                                </DropdownButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : templateClickedd == true ? (
                    <div className="email-form">
                      <form>
                        <div className="form-inline row justify-content-between align-items-center"></div>
                        <div className="form-inline row justify-content-end align-items-center">
                          <div className="form-group template_builder_div col-12 col-md-12">
                            {templateName != "" && (
                              <>
                                {editableTemplate ? (
                                  <input
                                    type="text"
                                    value={newTemplateName}
                                    onChange={(e) => templateNameChange(e)}
                                  />
                                ) : (
                                  <h4 className="edit_content_title">
                                    {newTemplateName}
                                  </h4>
                                )}

                                {editClicked == true ? (
                                  <div className="template-edit">
                                    <button
                                      className="btn btn-outline-primary"
                                      onClick={(e) => editTemplateClicked(e)}
                                    >
                                      <img
                                        src={path_image + "edit-button.svg"}
                                        alt="Edit"
                                      />
                                    </button>
                                  </div>
                                ) : null}
                              </>
                            )}
                            {editableTemplate ? (
                              <div className="form-buttons form-buttons-template right-sided">
                                <button
                                  className="btn btn-primary btn-filled"
                                  onClick={(e) => saveTemplateEdit(e)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-primary btn-bordered"
                                  onClick={(e) => {
                                    closeTemplateEdit(e);
                                    setNewTemplateName(templateName);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="form-buttons form-buttons-template right-side">
                                {templateClickedd ? (
                                  <>
                                    <button
                                      className="btn btn-primary btn-filled"
                                      onClick={(e) => {
                                        openPreviewThumbPopup(e);
                                      }}
                                    >
                                      Generate Thumbnail
                                    </button>
                                    <button
                                      className="btn btn-primary btn-filled"
                                      onClick={(e) => {
                                        updateTemplate(e);
                                        e.preventDefault();
                                      }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-primary btn-bordered"
                                      onClick={(e) => {
                                        clickNewTemplate();
                                        e.preventDefault();
                                      }}
                                    >
                                      Save As
                                    </button>

                                    {getDefaultTemplate == 0 && (
                                      <button
                                        className="btn btn-outline-primary btn-delete"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setshowConfirmation(
                                            (showConfirmation) =>
                                              !showConfirmation
                                          );
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                                            fill="#0066BE"
                                          ></path>
                                          <path
                                            d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                                            fill="#0066BE"
                                          ></path>
                                          <path
                                            d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                                            fill="#0066BE"
                                          ></path>
                                          <path
                                            d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                                            fill="#0066BE"
                                          ></path>
                                          <path
                                            d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                                            fill="#0066BE"
                                          ></path>
                                          <path
                                            d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                                            fill="#0066BE"
                                          ></path>
                                        </svg>
                                      </button>
                                    )}
                                  </>
                                ) : null}
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : null}
                </div>

                <div className="row">
                  {templateClickedd ? (
                    <Editor
                      apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={template}
                      link_default_protocol= {'https'}
                      link_assume_external_targets = {'https'}
                      relative_urls = {true}
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
                      }}
                      onEditorChange={(content) => {
                        console.log(content);
                        setTemplateSaving(content);
                      }}
                    />
                  ) : null}

                  {templateType == 0 ? (
                    <Editor
                      apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={newTemplateNamee}
                      link_default_protocol= {'https'}
                      link_assume_external_targets = {'https'}
                      relative_urls = {true}
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
                      }}
                      onEditorChange={(content) => {
                        console.log(content);
                        setNewTemplateContent(content);
                      }}
                    />
                  ) : null}

                  {templateType == 1 ? (
                    <Editor
                      apiKey="g2adjiwgk9zbu2xzir736ppgxzuciishwhkpnplf46rni4g8"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={newTemplateNamee}
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
                      }}
                      onEditorChange={(content) => {
                        setNewTemplateContent(content);
                      }}
                    />
                  ) : null}

                  {/*
                  <CKEditor
                    editor={ClassicEditor}
                    data={template}
                    readOnly={true}
                    onReady={(editor) => {
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setTemplate(data);
                    }}
                    onBlur={(event, editor) => {}}
                    onFocus={(event, editor) => {}}
                  />
                  */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Modal id="send-sample" show={isOpen_send} custom-atr="non-scroll">
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
                >
                  <div className="form-group col-12 col-md-7">
                    <label htmlFor="exampleInputEmail1">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email-subject"
                      onChange={(e) => emailSubjectChanged(e)}
                      value={emailSubject}
                    />
                  </div>
                </div>

                <div className="form-inline row justify-content-between align-items-center">
                  <div className="col-12 col-md-7">
                    <div className="row justify-content-between align-items-center">
                      <div className="form-group col-sm-6">
                        <label htmlFor="hcp-name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => nameChanged(e)}
                          id=""
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="hcp-email">Email </label>
                        <input
                          type="mail"
                          onChange={(e) => emailChanged(e)}
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
                {searchedUsers.length === 0 ? (
                  <div className="not-found">
                    <h4>No Record Found!</h4>
                  </div>
                ) : (
                  searchedUsers.map((data, index) => {
                    return (
                      <div className="search-hcp-box">
                        <p className="send-hcp-box-title">
                          Name | <span>{data.name}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Email | <span>{data.email}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Contact Type | <span>{data.contact_type}</span>
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
                  Selected Contact <span>| {selectedHcp.length}</span>
                </h4>
              </div>
              <div className="selected-hcp-list">
                {selectedHcp.length === 0 ? (
                  <div className="not-found">
                    <h4>No Contact selected yet!</h4>
                  </div>
                ) : (
                  <>
                    {selectedHcp.map((data, index2) => {
                      return (
                        <>
                          <div className="search-hcp-box">
                            <p className="send-hcp-box-title">
                              Name | <span>{data.name || data.first_name}</span>
                            </p>
                            <p className="send-hcp-box-title">
                              Email | <span>{data.email}</span>
                            </p>
                            <p className="send-hcp-box-title">
                              Contact Type | <span>{data.contact_type}</span>
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
          {selectedHcp.length === 0 ? (
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
              Add New Contact
            </h5>
            <button
              onClick={() => {
                setIsOpenAdd(false);
                setIsOpensend(true);
                setHpc([
                  {
                    firstname: "",
                    lastname: "",
                    email: "",
                    contact_type: "",
                    country: "",
                  },
                ]);
                document.querySelector("#file-4").value = "";
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
                                  <DropdownButton
                                    className="dropdown-basic-button split-button-dropup country"
                                    title={
                                      hpc[i].country != "" &&
                                      hpc[i].country != "undefined"
                                        ? hpc[i].country == "B&H"
                                          ? "Bosnia and Herzegovina"
                                          : hpc[i].country
                                        : "Select Country"
                                    }
                                    onSelect={(event) =>
                                      onCountryChange(event, i)
                                    }
                                  >
                                    <div className="scroll_div">
                                      {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                            ([index, item]) => {
                                              return (
                                                <>
                                                  <Dropdown.Item
                                                    eventKey={index}
                                                    className={
                                                      hpc[i].country == index
                                                        ? "active"
                                                        : ""
                                                    }
                                                  >
                                                    {item == "B&H"
                                                      ? "Bosnia and Herzegovina"
                                                      : item}
                                                  </Dropdown.Item>
                                                </>
                                              );
                                            }
                                          )}
                                    </div>
                                  </DropdownButton>
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
                                    className="nav-link btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascipt:;"
                                  >
                                    Add HCP +
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
                    type="text"
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
                      <div className="smartlist_box_block">
                        <div className="smartlist-view email_box">
                          <div className="mail-box-content">
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
                            <div className="mailbox-table">
                              <table>
                                <tbody>
                                  <tr>
                                    <th>Contact Type</th>
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
                                    <th>Created By</th>
                                    <td>
                                      <span>{data.creator}</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <div className="mail-time">
                              <span>{data.created_at}</span>
                            </div>
                            <div className="smart-list-added-user">
                              <img
                                src={path_image + "smartlist-user.svg"}
                                alt="User icon"
                              />
                              {data.readers_count}
                            </div>
                            <div className="smartlist-buttons">
                              <button className="btn btn-primary btn-bordered view">
                                <a onClick={() => openSmartListPopup(data.id)}>
                                  View
                                </a>
                              </button>
                            </div>
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
      </div>

      {/*Email Template image preview start*/}
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
                  __html: templateSaving != "" ?
                    templateSaving.replace('<p><img style="display: none;" src="https://informed.pro/Distributes/updatemailread/###updateid###/pdf_mail" alt="" width="1" height="1" border="0"></p>', '')
                  : template.replace('<p><img style="display: none;" src="https://informed.pro/Distributes/updatemailread/###updateid###/pdf_mail" alt="" width="1" height="1" border="0"></p>', ''),
                }}
              ></div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {/*Email Template image preview end*/}

      {/*Modal for save new template start*/}
      <div className="save_new_template_action">
        <Modal
          className="modal send-confirm"
          id="save_new_template_action_modal"
          show={getNewTemplatePopup}
        >
          <Modal.Header>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={hideNewTemplatePopup}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Enter new template name</label>
                <input
                  type="text"
                  className="form-control"
                  id="template_name"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-filled"
                onClick={savenewtemplate}
              >
                Save
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      {/*Modal for save new template end*/}

      {/*Confrimation Popup start*/}
      <Modal
        show={showConfirmation}
        className="send-confirm"
        id="resend-confirm"
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() => {
              setshowConfirmation((showConfirmation) => !showConfirmation);
            }}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <img src={path_image + "alert.png"} alt="" />
          <h4>Are you sure you want to delete the selected template?</h4>
          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={(e) => {
                deleteTemplate(e);
              }}
            >
              Yes Please!
            </button>
            <button
              type="button"
              className="btn btn-primary btn-bordered light"
              data-bs-dismiss="modal"
              onClick={() => {
                setshowConfirmation((showConfirmation) => !showConfirmation);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
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
      {/*Confrimation Popup end*/}
    </>
  );
};

export default TemplateBuilder;
