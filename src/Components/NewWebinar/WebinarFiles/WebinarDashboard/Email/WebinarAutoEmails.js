import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { Button, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { loader } from "../../../../../loader"
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import AddNewContactModal from "../../../../../Model/AddNewContactModal";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const WebinarAutoEmails = () => {
  const { eventIdContext, handleEventId } = useSidebar()
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
  const [templateClicked, setTemplateClicked] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [newTemplateName, setNewTemplateName] = useState("")
  const [newTemplateSubject, setNewTemplateSubject] = useState("");
  const [createNewTemplate, setCreateNewTemplate] = useState(false)
  const [templates, setTemplates] = useState([]);
  const [indexClicked, setIndexClicked] = useState();
  const [emailSubject, setEmailSubject] = useState("");
  const [emailDescription, setEmailDescription] = useState("");
  const [approveClicked, setApproveClicked] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [templateId, setTemplateId] = useState(0);
  const [tempLang, setTempLang] = useState(0);
  const [indexClickedReminder, setIndexClickedReminder] = useState();
  const [validationError, setValidationError] = useState({});
  const [getTemplateLanguage, setTemplateLanguage] = useState([
    { value: "0", label: "English" },
    { value: "4", label: "Russian" },
  ]);
  const [language, setLanguage] = useState("0");
  const [isOpenSend, setIsOpensend] = useState(false);
  const editorRef = useRef(null);
  const [templateSaving, setTemplateSaving] = useState("");
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [selectedHcp, setSelectedHcp] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
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
  const [irtRole, setIrtRole] = useState([]);
  const [activeManual, setActiveManual] = useState("active");
  const [activeExcel, setActiveExcel] = useState("");
  const [addListOpen, setAddListOpen] = useState(false);
  const [reRender, setReRender] = useState(0);
  const [hcpsSelected, setHcpsSelected] = useState([]);
  const [totalData, setTotalData] = useState({});
  const [countryall, setCountryall] = useState([]);
  const [irtCountry, setIRTCountry] = useState([]);
  const [role, setRole] = useState([]);
  const [institutionType, setInstitutionType] = useState([]);




  useEffect(() => {
    getTemplateListData();
  }, [language]);

  useEffect(() => {
    loader("show");
    if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
      axiosFun();
    }


    getalCountry();
  }, []);

  const getTemplateListData = async () => {
    try {
      loader("show")
      let body = {
        eventId: eventId
      }

      const response = await postData(ENDPOINT.WEBINAR_EMAIL_GET_TEMPLATE_LIST, body)
      console.log("response-->", response)
      setTemplates(response?.data?.data)


      loader("hide")
    } catch (err) {
      loader("hide")
      console.log("--err", err)
    }
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
          setTotalData(res.data.response.data);
        }
      })
      .catch((err) => {
        console.log(err);
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


  const changeLanguage = (e) => {
    setLanguage(e?.value);
    setTemplateClicked(false);
    setIndexClicked();
  };
  const cancelClicked = () => {
    setIndexClicked();
    setTemplateClicked(false);
    setValidationError({})
    setSourceCode("");
    setNewTemplateName("")
    setNewTemplateSubject("")
    setCreateNewTemplate(false)
  };

  const updateTemplate = async (e, status = 0) => {
    e.preventDefault();
    console.log("in update template")
    if (approveClicked) {
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
        // await axios
        //   .post(`emailapi/add_update_template`, body)
        //   .then((res) => {
        //     if (res.data.status_code == 200) {
        //       getTemplateListData();
        //       toast.success("Template updated");
        //       loader("hide");
        //     }
        //   })
        //   .catch((err) => {
        //     loader("hide");
        //     toast.error("Something went wrong");
        //   });
      }
    } else {
      toast.warning("Template not selected.");
    }
  }

  const createTemplate=async(e)=>{
    e.preventDefault()
    let error={}
    if(newTemplateName==""){
      error.newTemplateName="Please enter template name"
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
      console.log("in create template name",newTemplateName)
      console.log("in create template subject",newTemplateSubject)
      console.log("in create template",templateSaving)
    }

  }

  const viewButtonClicked = (template, index) => {
    setCreateNewTemplate(false)
    setNewTemplateName("")
    setNewTemplateSubject("")
    setEmailSubject("");
    setEmailDescription("");
    setApproveClicked(false);
    setTemplateClicked(true);
    setSourceCode(template?.template);
    setIndexClicked(index);
    setTemplateId(template?.id);
    setTempLang(template?.language_code);
    if (template?.status == 1) {
      setApproveClicked(true);
    } else {
      setApproveClicked(false);
    }

    setIndexClickedReminder();
    setTemplateName(template?.subject);
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
      setValidationError({})
      setIsOpensend(true);
    }
  };

  const addTracking = function (editor) {
    console.log("in add tracking")
  }

  const uploadImageToServer = async (file) => {
    console.log("in upload image to server")
  }
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

  const searchHcp = async (e) => {
    e.preventDefault();
    console.log("in search hcp")
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
          if (res?.data?.response) {
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
  }

  const selectHcp = (index) => {
    console.log("in select hcp")
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

  const deleteSelected = (index) => {
    let arr = [];
    arr = selectedHcp;
    arr.splice(index, 1);

    setSelectedHcp(arr);
    setReRender(reRender + 1);
  };

  const sendsampeap = (event) => {
    setHcpsSelected(selectedHcp);
    console.log("in send sample")
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
            let prev_obj = selectedHcp?.find((x) => x?.email?.toLowerCase() == useremail?.toLowerCase());
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
              toast.success("User added successfuly");

              res?.data?.response?.data?.map((data) => {
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

  const CreateNewTemplateClicked=(e)=>{
    e.preventDefault()
    setIndexClicked();
    setTemplateClicked(false);
    setValidationError({})
    setSourceCode("");
    setCreateNewTemplate(true)
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
              <div className="template_builder-option">

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
                {templateClicked ||createNewTemplate? (
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered"
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
                    ):null}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="auto_mail_trigger">
              <div className="row">
                <div className="col-sm-12 col-md-12 d-flex justify-content-end">
                <Button onClick={(e) => CreateNewTemplateClicked(e)}>Create New Template</Button>
                </div>
                <div className="auto_mail_trigger_left col-sm-4 col-md-4">
                  <div className="auto_mail_trigger_box">
                    <div className="mail_trigger_left d-flex align-items-center">
                      <div className="mail_trigger_mail-icon">
                        <img
                          src={path_image + "triggered_mail.svg"}
                          alt="Preview"
                        />
                      </div>
                      <h4>Triggered emails</h4>{" "}
                     
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
                                    src={template?.template_img}
                                    alt="Preview"
                                  />
                                </div>
                                <div className="trigger_content">
                                  <h6>
                                    {template?.subject} ({template?.language_code})
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

                </div>
                <div className="auto_mail_trigger_right col-md-8 col-sm-8">
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
                              Email Subject Line{" "}
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
                              Email description{" "}
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
                            {templateName == "Welcome mail" ||
                              templateName ==
                              "Reset password" ? null : approveClicked ===
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
                          <div className="form-group col-12 col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Template name{" "}
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
                              onChange={(e) => setNewTemplateName(e?.target?.value)}
                              value={newTemplateName}
                            />
                            {validationError?.newTemplateName ? (
                              <div className="login-validation">
                                {validationError?.newTemplateName}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group right-side col-12 col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Template subject{" "}
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
                              onChange={(e) => setNewTemplateSubject(e?.target?.value)}
                              value={newTemplateSubject}
                            />
                            {validationError?.newTemplateSubject ? (
                              <div className="login-validation">
                                {validationError?.newTemplateSubject}
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
                          initialValue={""}
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
                          id=""
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="hcp-email">Email </label>
                        <input
                          type="mail"
                          onChange={(e) => setEmail(e?.target?.value)}
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
      />
    </>)

}
export default WebinarAutoEmails