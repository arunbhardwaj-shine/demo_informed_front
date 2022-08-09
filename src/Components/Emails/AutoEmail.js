import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { loader } from "../../loader";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Modal, ModalDialog, Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { popup_alert } from "../../popup_alert";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const AutoEmail = () => {
  const [getsearch, setSearch] = useState("");
  const [approveClickedd, setApproveClicked] = useState(false);
  const [counterFlag, setCounterFlag] = useState(0);
  const [tempLang, setTempLang] = useState(0);
  const [templates, setTemplates] = useState([]);
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
  const [isOpen_send, setIsOpensend] = useState(false);

  const [reRender, setReRender] = useState(0);
  const [getSmartListId, setSmartListId] = useState(0);
  const [addListOpen, setAddListOpen] = useState(false);
  const [activeExcel, setActiveExcel] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedHcp, setSelectedHcp] = useState([]);
  const [email, setEmail] = useState("");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [name, setName] = useState("");
  const [hide, setHide] = useState(false);
  const [templateSaving, setTemplateSaving] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [hpc, setHpc] = useState([
    { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
  ]);

  const [readers, setReaders] = useState([]);

  const [getReaderDetails, setReaderDetails] = useState({});
  const [getSmartListName, setSmartListName] = useState("");
  const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);

  const editorRef = useRef(null);
  const ref = useRef(null);

  let file_name = useRef("");
  useEffect(() => {
    if (addListOpen == true) {
      setIsOpensend(false);
    }
  }, [addListOpen]);

  useEffect(() => {
    getTemplateListData();
  }, []);

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
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getalCountry();
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  const getTemplateListData = async () => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      language: "",
      ibu: "",
    };

    loader("show");
    await axios
      .post(`emailapi/get_own_template_list`, body)
      .then((res) => {
        console.log(res);
        setTemplates(res.data.response.data);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewButtonClicked = (template, index) => {
    console.log(template);
    setEmailSubject("");
    setEmailDescription("");
    setApproveClicked(false);
    setTemplateClicked(true);
    setSourceCode(template.source_code);
    setIndexClicked(index);
    setTemplateId(template.id);
    setTempLang(template.language_code);
   
    setIndexClickedReminder();
    setTemplateName(template.name);
  };

  const viewReminderClicked = (template, index) => {
    console.log(template);
    setEmailSubject("");
    setEmailDescription("");
    setApproveClicked(false);
    setTemplateClicked(true);
    setSourceCode(template.source_code);
    setIndexClickedReminder(index);
    setTemplateId(template.id);
    setTemplateName(template.name);
    setIndexClicked();
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
    if (emailSubject == "") {
      toast.warning("Please enter the email subject line ");
      return;
    } else if (emailDescription == "") {
      toast.warning("Please enter the email description");
      return;
    } else {
      if (templateId == "" || templateId == 0) {
        console.log(templateId);
        toast.warning("Please select email template first");
      } else {
        setIsOpensend(true);
      }
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

      //console.log(body);
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`emailapi/search_hcp`, body)
        .then((res) => {
          console.log(res);

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
    if (emailSubject != "") {
      setIsOpensend(false);
      setIsOpenAdd(false);

      let selected_ids = selectedHcp.map(
        (number) => number["user_id"] || number["profile_user_id"]
      );

      loader("show");
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
            popup_alert({
              visible: "show",
              message: "Test mail sent successfully",
              type: "success",
            });
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
      document.querySelector("#mail-view").setAttribute("custom-atr", "scroll");
    } else {
      document
        .querySelector("#mail-view")
        .setAttribute("custom-atr", "non-scroll");
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

  const onContactTypeChange = (e, i) => {
    const value = e;
    const list = [...hpc];
    const name = hpc[i].contact_type;
    list[i].contact_type = value;
    setHpc(list);
    console.log(hpc);
  };

  const onCountryChange = (e, i) => {
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
    if (ev.target.scrollTop > 20) {
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
  const handleSelect = (data, e) => {
    setSmartListId(data.id);
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

  const openSmartListPopup = async (smart_list_id) => {
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
  const updateTemplate = async (e,status=0) => {
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
          status: status===0 ? 2 : 3,
          language: tempLang,
        };
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        loader("show");
        await axios
          .post(`emailapi/add_update_template`, body)
          .then((res) => {
            if (res.data.status_code == 200) {
              console.log(res);
              getTemplateListData();
              toast.success("Template updated");
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
    setApproveClicked(true);
    const body = {
      user_id: localStorage.getItem("user_id"),
      pdf_id: "3487",
      description: emailDescription,
      creator: "",
      campaign_name: "",
      subject: emailSubject,
      route_location: "AutoEmail",
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

        if (res.data.status_code === 200) {
          toast.success("Approved Draft saved");
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Somwthing went wrong");
      });
  };
  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="top-header">
              <div class="page-title">
                <h2>Auto Email</h2>
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
                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={(e) => {
                        updateTemplate(e);
                        e.preventDefault();
                      }}
                    >
                      Save
                    </button>
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
                                    <h6>{template.name} ({template.language_code})</h6>
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
                            <label for="exampleInputEmail1">
                              Email Subject Line
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="email-desc"
                              onChange={(e) => emailSubjectChanged(e)}
                              value={emailSubject}
                            />
                          </div>
                          <div className="form-group right-side col-12 col-md-6">
                            <label for="exampleInputEmail1">
                              Email description{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="email-address"
                              onChange={(e) => emailDescriptionChanged(e)}
                              value={emailDescription}
                            />
                          </div>
                        </div>
                        <div className="form-inline row justify-content-end align-items-center">
                          <div className="form-buttons right-side col-12 col-md-5">
                            {approveClickedd == true ? (
                              <button
                                className="btn btn-primary approved-btn btn-bordered "
                                onClick={(e) => updateTemplate(e,1)}
                               
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
                                onClick={(e) => updateTemplate(e,1)}
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
                          {templateName == "New content added email" ||
                          templateName == "Invitation" ? (
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
                        <label for="hcp-name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => nameChanged(e)}
                          id=""
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label for="hcp-email">Email </label>
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
                                  <label for="">First Name</label>
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
                                  <label for="">Last Name</label>
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
                                  <label for="">Email *</label>
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
                                  <label for="">Country</label>
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
    </>
  );
};
export default AutoEmail;
