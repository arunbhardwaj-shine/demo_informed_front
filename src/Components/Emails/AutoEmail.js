import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { popup_alert } from "../../popup_alert";
import Select, { createFilter } from "react-select";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SmartListLayout from "../CommonComponent/SmartListLayout";
import SmartListTableLayout from "../CommonComponent/SmartListTableLayout";
import { ValidationAddNewContact } from "./ValidationAddNewContact";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const AutoEmail = () => {
  const [getsearch, setSearch] = useState("");
  const [showPreogressBar, setShowProgressBar] = useState(false);
  const [uploadOrDownloadCount, setUploadOrDownloadCount] = React.useState(0);
  const [mailsIncrement, setMailsIncrement] = useState(0);
  const [hcpsSelected, setHcpsSelected] = useState([]);
  const [approveClickedd, setApproveClicked] = useState(false);
  const [counterFlag, setCounterFlag] = useState(0);
  const [tempLang, setTempLang] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [countryall, setCountryall] = useState([]);
  const [isFilterApiCalled, setIsFilterApiCalled] = useState(false);
  const [templateClicked, setTemplateClicked] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [indexClicked, setIndexClicked] = useState();
  const [smartListData, setSmartListData] = useState([]);
  const [prevsmartListData, setPrevSmartListData] = useState([]);
  const [activeManual, setActiveManual] = useState("active");
  const [templateId, setTemplateId] = useState(0);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [isOpen_send, setIsOpensend] = useState(false);
  const [language, setLanguage] = useState("0");
  const [reRender, setReRender] = useState(0);
  const [getSmartListId, setSmartListId] = useState(0);
  const [addListOpen, setAddListOpen] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedHcp, setSelectedHcp] = useState([]);
  const [email, setEmail] = useState("");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [name, setName] = useState("");
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [siteNumberAll, setSiteNumberAll] = useState([]);

  const [templateName, setTemplateName] = useState("");
  const [selectedListId, setSelectedListId] = useState(0);
  const userId = "56Ek4feL/1A8mZgIKQWEqg==";

  const getTemplateLanguage = [
    { value: "0", label: "English" },
    { value: "4", label: "Russian" },
  ];

  const [totalData, setTotalData] = useState({});
  const [validationError, setValidationError] = useState({});
  const [role, setRole] = useState([]);
  const [irtRole, setIrtRole] = useState([]);
  const [institutionType, setInstitutionType] = useState([]);
  const [nonIrtInstitutionType, setNonIrtInstitutionType] = useState([])
  const [irtInstitutionType, setIrtInstitutionType] = useState([])
  const optIRT = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];
  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      role:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
          ? "Site User-Blinded"
          : "",
      optIrt:
        localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
          ? "yes"
          : "",
      institutionType: localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
        ? "Study site"
        : "",
      siteNumber: "",
      siteName: ""
    },
  ]);
  const [irtCountry, setIRTCountry] = useState([]);

  const editorRef = useRef(null);
  const templateIdRef = useRef(null)
  const linkingPayload = useRef(null)
  const filterConfig = {
    matchFrom: "start",
  };

  useEffect(() => {
    // getSmartListData(0);
    // getalCountry();
  }, []);

  useEffect(() => {
    if (addListOpen == true) {
      setIsOpensend(false);
    }
  }, [addListOpen]);

  useEffect(() => {
    getTemplateListData();
  }, [language]);

  const getalCountry = async () => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      language: "",
      ibu: "",
    };

    if (!isFilterApiCalled) {
      loader("show")
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

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
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

              // let institution_type =
              //   res?.data?.response?.data?.institution_type;

              // let newInstitution = [];
              // Object.keys(institution_type)?.map((item, i) => {
              //   newInstitution.push({ label: item, value: item });
              // });

              // setInstitutionType(newInstitution);


              let non_irt_institution_type =
                res?.data?.response?.data?.non_mandatory_institution_type;

              let nonIrtInstitution = [];
              Object.keys(non_irt_institution_type)?.map((item, i) => {
                nonIrtInstitution.push({ label: item, value: item });
              });

              setNonIrtInstitutionType(nonIrtInstitution);

              let irt_institution_type =
                res?.data?.response?.data?.irt_institution_type;

              let newIrtInstitution = [];
              Object.keys(irt_institution_type)?.map((item, i) => {
                newIrtInstitution.push({ label: item, value: item });
              });

              setIrtInstitutionType(newIrtInstitution);
            }
            setTotalData(res.data.response.data);
            setIsFilterApiCalled(true)
            loader("hide")

          }
        })
        .catch((err) => {
          console.log(err);
          loader("hide")

        });
    }
  };
  useEffect(() => {
    loader("show");
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
      axiosFun();
    }


  }, []);
  const axiosFun = async () => {
    try {
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

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getTemplateListData = async () => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      language: language,
      ibu: "",
    };

    loader("show");
    await axios
      .post(`emailapi/get_own_template_list`, body)
      .then((res) => {
        setTemplates(res.data.response.data);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewButtonClicked = (template, index) => {
    setEmailSubject("");
    setEmailDescription("");
    setApproveClicked(false);
    setTemplateClicked(true);
    setSourceCode(template.source_code);
    setIndexClicked(index);
    setTemplateId(template.id);
    templateIdRef.current = template?.id
    setTempLang(template.language_code);
    if (template.approved === 1) {
      setApproveClicked(true);
    } else {
      setApproveClicked(false);
    }

    setTemplateName(template.name);
  };


  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSmartListData(prevsmartListData);
    }
  };

  const cancelClicked = () => {
    setIndexClicked();
    setTemplateClicked(false);
    setSourceCode("");
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

  const emailSubjectChanged = (e) => {
    setEmailSubject(e.target.value);
  };

  const emailDescriptionChanged = (e) => {
    setEmailDescription(e.target.value);
  };
  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
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
            setSearchedUsers(res.data.response.data);
          } else {
            toast.warning(res.data.message);
          }

          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addNewContactClicked = async () => {
    let countriesData= await getalCountry();

   

    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
        role:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? "Site User-Blinded"
            : "",
        optIrt:
          localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? "yes"
            : "",
        institutionType: localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
          ? "Study site"
          : "",
        siteNumber: "",
        siteName: ""
      },
    ]);
  
    setIsOpenAdd(true);
    setIsOpensend(false);
    setActiveManual("active");

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
        description: emailDescription,
        template_id: templateId,
        user_list: selected_ids,
        smartlist_id: "",
        source_code: sourceCode,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      axios
        .post(`emailapi/send_sample_email`, body)
        .then((res) => {
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

  const onInstitionTypeChange = (e, i) => {
    if (e == "") {

      const list = [...hpc];
      list[i].institutionType = "";
      list[i].optIrt = "";
      list[i].role = "";
      list[i].country = "";
      setHpc(list);
    } else {
      const value = e?.value;
      const list = [...hpc];
      list[i].institutionType = value;
      setHpc(list);
     
    }
  }

  const onIRTChange = (e, i) => {
    if (e == "") {
      const list = [...hpc];
      list[i].optIrt = "";
      list[i].role = "";
      list[i].country = "";
      list[i].institutionType = "";
      setHpc(list);
    } else {
      const value = e;
      const list = [...hpc];
      // const name = hpc[i].optIrt;
      list[i].optIrt = value;
      list[i].role = e == "yes" ? irtRole[0]?.value : "Other";
      list[i].country = "";
      list[i].siteNumberIndex = "";
      list[i].siteNameIndex = "";
      list[i].siteName = "";
      list[i].siteNumber = "";
      list[i].institutionType =e=="yes"?irtInstitutionType?.[0]?.value: "";
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
    // const name = hpc[i].contact_type;
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
      if (localStorage.getItem("user_id") === "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==") {
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
      // const name = hpc[i].country;
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
  const deleteRecord = (i) => {
    const list = hpc;
    list.splice(i, 1);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };
  const saveClicked = async () => {
    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {

          return {
            first_name: data.firstname,
            last_name: data.lastname,
            email: data.email,
            country: data.country,
            contact_type: data.contact_type,
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
      // const status = ValidationAddNewContact(body?.data, selectedHcp,"save")
     
      const status = body.data.map((data,index) => {
        if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
          if (data.first_name == "") {
            setValidationError({
              firstName: "Please enter the first name",
              index: index,
            });
            return 
          } else if (data.last_name == "") {
            setValidationError({
              lastName: "Please enter the last name",
              index: index,
            });
            return ;
          }
          else if (data.email == "") {
            setValidationError({
              email: "Please enter the email ",
              index: index,
            });
            return ;
          }
          else if (data?.institution_type == "") {
            setValidationError({
              institutionType: "Please select the institution type",
              index: index,
            });
            return ;
          }else if(data?.investigator_type==""){
            setValidationError({
              role: "Please select the role",
              index: index,
            });
            return ;
          }
          else if (data?.country == "") {
            setValidationError({
              country: "Please select the country",
              index: index,
            });
            return ;
          }

          else if(data?.siteIrt==1){            
             
            if(data?.siteNumber==""){
              setValidationError({
                siteNumber: "Please enter the site number",
                index: index,
              });
              return ;
            }else if(data?.siteName==""){
              setValidationError({
                siteName: "Please enter the site name",
                index: index,
              });
              return ;
            }
          }
        }
        if (data.email == "") {
          setValidationError({
            email: "Please enter the email atleast",
            index: index,
          });
          return ;
        } 
        if (localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
          if (data?.country == "") {
            setValidationError({
              country: "Please select country",
              index: index,
            });
            return ;
          }
        }
        if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
           
            let prev_obj = selectedHcp.find((x) => x.email?.toLowerCase() === useremail?.toLowerCase());
            if (typeof prev_obj != "undefined") {
              setValidationError({
                email: "User with same email already added in list.",
                index: index,
              });
              return ;
            } else {
              return "true";
            }
          } else {
            setValidationError({
              email: "Email format is not valid",
              index: index,
            });
            return ;
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
            if (res.data.status_code === 200) {
              toast.success("User added successfully");

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
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });

      } 
    }
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

  const submitHandler = async (event) => {
    if (getsearch !== "") {
      await getSmartListData(1);
    } else {
      toast.error("Please enter text.");
    }
    event.preventDefault();
    return false;
  };

  const getSmartListData = async (flag) => {
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
          loader("hide");

        } else {
          loader("hide");
        }
      })
      .catch((err) => {
        loader("hide");
        console.log(err);
      })
  };
  const handleSelect = (data, e) => {
    setSmartListId(data.id);
  };


  const addMoreHcp = () => {
    // const status = ValidationAddNewContact(hpc,selectedHcp,"addMore")
    const status = hpc.map((data) => {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==") {
        if(data?.optIrt=="yes"){
          if (data?.email == "" || data?.institutionType == "" || data?.first_name == "" || data?.last_name == ""||data?.role=="" 
            || data?.country == ""||data?.siteName==""||data?.siteNumber=="") {
              
            return "false";
          } else {
            return "true";
          }
        }else{
          if (data?.email == "" || data?.institutionType == "" || data?.first_name == "" || data?.last_name == "" || data?.country == "") {
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
          role:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
              ? irtRole?.[0]?.value
              : "",
          optIrt:
            localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
              ? "yes"
              : "",
          institutionType: localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
            ? irtInstitutionType?.[0]?.value
            : "",
          siteNumber: "",
          siteName: ""

        },
      ]);
    } else {
      if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" || localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") {
        toast.warning("Please input the required fields.");
      } else {
        toast.warning("Please input the email atleast");
      }
    }
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
          if (res.data.status_code == 200) {
            // setReaders(res.data.response.data);

            res.data.response.data.map((data) => {
              let prev_obj = selectedHcp.find((x) => x.email === data.email);
              if (typeof prev_obj === "undefined") {
                setSelectedHcp((oldArray) => [...oldArray, data]);
              }
            });

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
          source_code: editorRef.current.getContent(),
          template_id: templateId,
          name: templateName,
          status: status === 0 ? 2 : status === 1 ? 3 : 4,
          language: tempLang,
        };
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/add_update_template`, body)
          .then((res) => {
            if (res.data.status_code == 200) {
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


  const changeLanguage = (e) => {
    setLanguage(e.value);
    setTemplateClicked(false);
    setIndexClicked();
  };



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
              alert("Please select the template first before adding the link");
              return;
            }
            let firstToxControlWrap = document.querySelector(
              "body > div.tox.tox-silver-sink.tox-tinymce-aux > div > div.tox-dialog > div.tox-dialog__content-js > div > div > div > div:nth-child(1) > div > div >input"
            );

            if (newLink?.value?.includes(baseLink) && newButton.innerText == "Remove Tracking") {
              if (!window.confirm("Are you sure you want to remove the tracking?")) {
                return;
              }
              const urlParams = new URLSearchParams(newLink.value);
              const redirectUrl = urlParams.get('redirect_url');
              const trackingCode = urlParams.get('tracking_code');
              firstToxControlWrap.value = redirectUrl;
              payload = {
                template_id: templateIdRef.current,
                url_code: trackingCode,
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
                alert("Tracking already added");
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
              alert("Tracking added");
            } else {
              saveButton.click()
              alert("Tracking removed");
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

  const viewSmartListData = async (id) => {
    setAddListOpen(false);
    setSelectedListId(id);
  }

  const closeSmartListPopup = async () => {
    setSelectedListId(0);
    setAddListOpen(true);
  }

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="top-header">
              <div className="template_builder-option">
                {/* <h2>Auto Email</h2> */}
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
              </div>
              <div className="top-right-action">
                {templateClicked ? (
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered"
                      onClick={cancelClicked}
                    >
                      Cancel
                    </button>
                    {templateName == "Reset password" ||
                      templateName == "Welcome mail" ? null : (
                      <button
                        className="btn btn-primary btn-filled next"
                        onClick={(e) => {
                          updateTemplate(e);
                          e.preventDefault();
                        }}
                      >
                        Save
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="auto_mail_trigger">
              <div className="row">
                <div className="auto_mail_trigger_left col-sm-4 col-md-4">
                  <div className="auto_mail_trigger_box">
                    <div className="mail_trigger_left d-flex align-items-center">
                      <div className="mail_trigger_mail-icon">
                        <img
                          src={path_image + "triggered_mail.svg"}
                          alt="Preview"
                        />
                      </div>
                      <h4>Triggered emails</h4>
                    </div>
                    <div className="mail_trigger_content">
                      {typeof templates !== "undefined" && templates.length > 0
                        ? templates.map((template, index) => {
                          return (
                            <>
                              <div
                                className={
                                  indexClicked == index
                                    ? "trigger_content_box d-flex active"
                                    : "trigger_content_box d-flex"
                                }
                              >
                                <div className="trigger_content_image">
                                  <img
                                    src={template.template_img}
                                    alt="Preview"
                                  />
                                </div>
                                <div className="trigger_content">
                                  <h6>
                                    {template.name} ({template.language_code})
                                  </h6>
                                  <p>
                                    When New content add to the user library
                                  </p>

                                  {indexClicked !== index ? (
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
                  {/* <div className="auto_mail_trigger_box">
                    <div className="mail_trigger_left d-flex align-items-center">
                      <div className="mail_trigger_mail-icon">
                        <img
                          src={path_image + "triggered_mail.svg"}
                          alt="Preview"
                        />
                      </div>
                      <h4>Reminder AutoMails</h4>
                    </div>
                    <div className="mail_trigger_content">
                      {templates.map((template, index) => {
                        return (
                          <div
                            className={
                              indexClickedReminder == index
                                ? "trigger_content_box d-flex active"
                                : "trigger_content_box d-flex"
                            }
                          >
                            <div className="trigger_content_image">
                              <img src={template.template_img} alt="Preview" />
                            </div>
                            <div className="trigger_content">
                              <h6>{template.name}</h6>
                              <p>
                                Link to app, goes out after 1 week from last
                                activation if user have not logged into app.
                              </p>
                              {indexClickedReminder !== index ? (
                                <button
                                  className="btn btn-primary btn-filled d-flex justify-content-center"
                                  onClick={() =>
                                    viewReminderClicked(template, index)
                                  }
                                >
                                  View
                                </button>
                              ) : null}{" "}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div> */}
                </div>
                <div className="auto_mail_trigger_right col-md-8 col-sm-8">
                  {!templateClicked ? (
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
                              Email Subject Line{" "}
                              <span classname="astrick">*</span>
                            </label>
                            <input
                              type="text"
                              className={
                                validationError?.emailSubject
                                  ? "form-control error"
                                  : "form-control"
                              }
                              id="email-desc"
                              onChange={(e) => emailSubjectChanged(e)}
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
                              Email description{" "}
                              <span classname="astrick">*</span>{" "}
                            </label>
                            <input
                              type="text"
                              className={
                                validationError?.emailDescription
                                  ? "form-control error"
                                  : "form-control"
                              }
                              id="email-address"
                              onChange={(e) => emailDescriptionChanged(e)}
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
                            {templateName == "Welcome mail" ||
                              templateName ==
                              "Reset password" ? null : approveClickedd ===
                                true ? (
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
                            )}

                            <button
                              onClick={sendSample}
                              className="btn btn-primary btn-bordered btn-large"
                            >
                              Send A Sample
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          {templateName == "Reset password" ||
                            templateName == "Welcome mail" ? (
                            <Editor
                              apiKey="gpl"
                              tinymceScriptSrc={window.location.origin + '/tinymce/tinymce.min.js'}
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
                                // setTemplateSaving(content);
                              }}
                            />
                          ) : (
                            <Editor
                              apiKey="gpl"
                              tinymceScriptSrc={window.location.origin + '/tinymce/tinymce.min.js'}
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
                                // setTemplateSaving(content);
                              }}
                            />
                          )}
                        </div>
                      </form>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
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
                ></div>

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
                      onClick={async () => {
                        if (!smartListData.length) {
                          await getSmartListData(0);
                        }
                        setAddListOpen(true)
                      }}
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
                      <div className="search-hcp-box" key={data}>
                        <p className="send-hcp-box-title">
                          Name | <span>{data.name}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Email | <span>{data.email}</span>
                        </p>
                        <p className="send-hcp-box-title">
                          Contact type | <span>{data.contact_type}</span>
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
                  Selected contact <span>| {selectedHcp.length}</span>
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
                    role:
                      localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                        ? irtRole?.[0]?.value
                        : "",
                    optIrt:
                      localStorage.getItem("user_id") ==
                        "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                        ? "yes"
                        : "",
                    institutionType: localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
                      ? irtInstitutionType?.[0]?.value
                      : "",
                    siteNumber: "",
                    siteName: ""
                  },
                ]);
                // document.querySelector("#file-4").value = "";
                setActiveManual("active");

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
                                    First name {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? <span>*</span> : null}

                                  </label>
                                  <input
                                    type="text"
                                    className={(validationError?.firstName &&
                                    validationError?.index == i) 
                                    ?"form-control error"
                                    :"form-control"}
                                    onChange={(event) =>
                                      onFirstNameChange(event, i)
                                    }
                                    value={val.firstname}
                                    placeholder="First name"
                                  />
                                  {(validationError?.firstName &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.firstName}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="">Last name
                                    {localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? <span> *</span> : null}
                                  </label>
                                  <input
                                    type="text"
                                    className={(validationError?.lastName &&
                                      validationError?.index == i) 
                                      ?"form-control error"
                                      :"form-control"}
                                    onChange={(event) =>
                                      onLastNameChange(event, i)
                                    }
                                    value={val.lastname}
                                    placeholder="Last name"
                                  />
                                  {(validationError?.lastName &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.lastName}
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
                                    className={(validationError?.email &&
                                      validationError?.index == i) 
                                      ?"form-control error"
                                      :"form-control"}
                                    id="email-desc"
                                    name={`${fieldName}.email`}
                                    onChange={(event) =>
                                      onEmailChange(event, i)
                                    }
                                    value={val.email}
                                    placeholder="example@email.com"
                                  />
                                  {(validationError?.email &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.email}
                                    </div>
                                  ) : null}
                                </div>
                              </div>

                              {localStorage.getItem("user_id") ===
                                "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") === "sNl1hra39QmFk9HwvXETJA==" ? (
                                <>
                                  {" "}
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
                                    <div className="form-group bottom">
                                      <label for="">Institution <span>*</span>
                                      </label>
                                      {val?.optIrt == "yes" ? (
                                        <Select
                                          options={irtInstitutionType}
                                          className={(validationError?.institutionType &&
                                            validationError?.index == i)
                                            ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                            :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
                                          //  id="institution-desc"
                                          onChange={(event) =>
                                            onInstitionTypeChange(event, i)
                                          }
                                          defaultValue={
                                            irtInstitutionType?.findIndex(
                                              (el) => el.value == val?.institutionType
                                            ) == -1
                                              ? ""
                                              : irtInstitutionType[
                                              irtInstitutionType?.findIndex(
                                                (el) =>
                                                  el.value == val?.institutionType
                                              )
                                              ]
                                          }
                                          value={
                                            irtInstitutionType?.findIndex(
                                              (el) => el.value == val?.institutionType
                                            ) == -1
                                              ? ""
                                              : irtInstitutionType[
                                              irtInstitutionType?.findIndex(
                                                (el) =>
                                                  el.value == val?.institutionType
                                              )
                                              ]
                                          }
                                          isClearable
                                          placeholder="Select Institution"
                                        />
                                      ) :
                                        val?.optIrt == "no" ? (
                                          <Select
                                            options={nonIrtInstitutionType}
                                            className={(validationError?.institutionType &&
                                              validationError?.index == i)
                                              ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                              :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
                                            //  id="institution-desc"
                                            onChange={(event) =>
                                              onInstitionTypeChange(event, i)
                                            }
                                           
                                            value={
                                              nonIrtInstitutionType?.findIndex(
                                                (el) => el.value == val?.institutionType
                                              ) == -1
                                                ? ""
                                                : nonIrtInstitutionType[
                                                nonIrtInstitutionType?.findIndex(
                                                  (el) =>
                                                    el.value == val?.institutionType
                                                )
                                                ]
                                            }
                                            isClearable
                                            placeholder="Select Institution"
                                          />
                                        ) :
                                          (
                                            <Select
                                              className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                              placeholder="Select Institution"
                                            />
                                          )
                                      }
                                      {(validationError?.institutionType &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.institutionType}
                                    </div>
                                  ) : null}
                                    </div>
                                  </div>
                                 
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT role <span> *</span></label>
                                      {val?.optIrt == "yes" ? (
                                        <Select
                                          options={irtRole}
                                          className={(validationError?.role &&
                                            validationError?.index == i)
                                            ?"dropdown-basic-button split-button-dropup edit-country-dropdown"
                                            :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
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
                                          className={(validationError?.role &&
                                            validationError?.index == i)
                                            ?"dropdown-basic-button split-button-dropup edit-country-dropdown"
                                            :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
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
                                      {(validationError?.role &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.role}
                                    </div>
                                  ) : null}
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
                                    Country
                                    {(localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ||
                                      localStorage.getItem("user_id") == "m5JI5zEDY3xHFTZBnSGQZg==") ? <span> *</span> : null}
                                  </label>
                                  {val?.optIrt == "yes" ? (
                                    <Select
                                      options={irtCountry}
                                      className={(validationError?.country &&
                                        validationError?.index == i)
                                        ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                        :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
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
                                      className={(validationError?.country &&
                                        validationError?.index == i)
                                        ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                        :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
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
                                   {(validationError?.country &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.country}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            
                              {localStorage.getItem("user_id") ==
                                "56Ek4feL/1A8mZgIKQWEqg==" || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA==" ? (
                                <>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site number {val?.optIrt == "yes" ? <span> *</span> : ""}</label>

                                      <Select
                                        options={siteNumberAll}
                                        className={(validationError?.siteNumber &&
                                          validationError?.index == i)
                                          ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                          :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
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
                                      {(validationError?.siteNumber &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.siteNumber}
                                    </div>
                                  ) : null}
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site name{val?.optIrt == "yes" ? <span> *</span> : ""}</label>

                                      <Select
                                        options={siteNameAll}
                                        className={(validationError?.siteName &&
                                          validationError?.index == i)
                                          ?"dropdown-basic-button split-button-dropup edit-country-dropdown error"
                                          :"dropdown-basic-button split-button-dropup edit-country-dropdown"}
                                        onChange={(event) =>
                                          onSiteNameChange(event, i)
                                        }
                                        value={
                                          siteNameAll[hpc[i].siteNameIndex]
                                            ? siteNameAll[hpc[i].siteNameIndex]
                                            : ""
                                        }
                                        placeholder={
                                          typeof siteNameAll[
                                            hpc[i].siteNameIndex
                                          ] === "undefined"
                                            ? "Select Site Name"
                                            : siteNameAll[hpc[i].siteNameIndex]
                                        }
                                      />
                                      {(validationError?.siteName &&
                                    validationError?.index == i) ? (
                                    <div className="login-validation">
                                      {validationError?.siteName}
                                    </div>
                                  ) : null}
                                    </div>
                                  </div>
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
                                    {localStorage.getItem("user_id") == userId || localStorage.getItem("user_id") == "sNl1hra39QmFk9HwvXETJA=="
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
            <div className="col smartlist-result-block new-smartlist">
              {typeof smartListData !== "undefined" &&
                smartListData.length > 0 ? (
                smartListData.map((data) => {
                  return (
                    <>
                      <div className="smartlist_box_block">
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
                            <SmartListLayout data={data} iseditshow={0} isviewshow={1} deletestatus={0} viewSmartListData={viewSmartListData} />
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

      {
        selectedListId ?
          <SmartListTableLayout id={selectedListId} closeSmartListPopup={closeSmartListPopup} />
          : null
      }
    </>
  );
};
export default AutoEmail;
