import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Modal, Toast } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../../loader";

import { toast, ToastContainer } from "react-toastify";

import { connect } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { popup_alert } from "../../../popup_alert";
import { BaseApi } from "../../../Api/BaseApi";
import GridView from "./GridView";

const ViewData = (props) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const baseURL = BaseApi.getBaseURL();

  //let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //let validator = new SimpleReactValidator();

  const navigate = useNavigate();
  const [view, setView] = useState(1);
  const [editable, setEditable] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [validator] = React.useState(new SimpleReactValidator());
  const [validator2] = React.useState(new SimpleReactValidator());
  const [validator3] = React.useState(new SimpleReactValidator());
  const [manualReRender, setManualReRender] = useState(0);
  const [update, setUpdate] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [data, setData] = useState(0);
  const [fileValidationMessage, setFileValidationMeassage] = useState(0);
  const [emailData, setEmailData] = useState("");
  const [search, setSearch] = useState("");
  const [showLessInfo, setShowLessInfo] = useState(true);
  const [deleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [showReaders, setShowSaveReader] = useState(false);
  const [save, setSave] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);

  const [name_edits, setNameEdit] = useState("");
  const [country_edits, setCountryEdit] = useState("");
  const [email_edits, setEmailEdit] = useState("");

  const [addNewData, setAddNewData] = useState(0);

  const [profile_user_id, setProfileUserId] = useState();

  const [reRenders, setReRenders] = useState(0);

  const [validator3Counter, setValidator3Counter] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [activeManual, setActiveManual] = useState("active");
  const [newData, setNewData] = useState([]);
  const [showLessUpdate, setShowLessUpdate] = useState(0);
  const [activeExcel, setActiveExcel] = useState("");

  const [editableData, setEditableData] = useState([]);
  let file_name = useRef("");

  useEffect(() => {
    setUpdatedData(props.data);

    if (typeof props.listId != "undefined" && props.listId != "") {
      setListId(props.listId);
    }

    if (
      typeof props.smartListName != "undefined" &&
      props.smartListName != ""
    ) {
      setListName(props.smartListName);
    }
  }, []);

  useEffect(() => {
    const getalCountry = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Token")}`,
      };
      await axios
        .get(baseURL + `country`, { headers })
        .then((res) => {
          console.log(res);
          const countrys = res.data.data.map((data) => {
            return data;
          });
          setCountryall(countrys);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // const getalCountry = async () => {
    //   let body = {
    //     user_id: 18207,
    //   };
    //   await axios
    //     .post(`distributes/filters_list`, body)
    //     .then((res) => {
    //       setCountryall(res.data.response.data.country);
    //       //console.log(countryall)
    //       // setCounter(counter + 1);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    getalCountry();
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  const getSmartListData = async () => {
    const body = {
      smart_list_id: props.smartListId,
      type: "",
      bounced: "",
      country_id: "",
    };

    // loader("show");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    loader("show");
    await axios
      .post(baseURL + `smart-list/single-record`, body, {
        headers,
      })
      .then((res) => {
        console.log(res);

        if (res.data.data) {
          if (res.data.data.length > 0) {
            //  loader("false");
            loader("hide");
            console.log(res.data.data);
            setEditList(res.data.data);

            // setLoading(false);
            // setUploadedBy(res.data.response.upload_by_filter);
            // setSmartListName(res.data.response.smart_list_name);
            // setListCount(res.data.response.list_count);
            // setapi_flag(api_flag + 1);
            // loader("hide");
          }
        } else {
          toast.error(res.data.message);
          // popup_alert({
          //   visible: "show",
          //   message: "No readers in the smart list",
          //   type: "error",
          // });
        }
        //    loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("hi");
    getSmartListData();
  }, []);

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
  const [getlistcount, setListCount] = useState("");

  let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [show, setShow] = useState(false);
  const [hpc, setHpc] = useState([
    {
      name: "",
      email: "",
      hospital: "",
      profession: "",
      country: "",
      interest: "",
    },
  ]);

  const [renderCounterData, setCounterData] = useState([]);
  const [countryall, setCountryall] = useState([]);
  const handleClose = () => {
    setShow(false);
    setCounter([0]);
    setCounterData([]);
  };
  const handleShow = () => {
    setIsOpenAdd(true);
    setHpc([
      {
        name: "",
        email: "",
        hospital: "",
        profession: "",
        country: "",
        interest: "",
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
  };

  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [render, setReRender] = useState(0);
  const handleCloseUploadMenu = () => setShowUploadMenu(false);
  const handleShowUploadMenu = () => {
    setShowUploadMenu(true);
    setShow(false);
  };

  let combine_data;
  let combine_data_manual;

  const [counter, setCounter] = useState([0]);

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

  const uploadButtonClicked = () => {
    setShow("true");
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    setShow(false);
    if (selectedFile === null) {
      toast.warning("Please upload file first");

      return false;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    let formData = new FormData();

    formData.append("smart_list_id", props.smartListId);
    formData.append("file", selectedFile);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    // loader("show");

    console.log(formData);
    loader("show");
    await axios
      .post(baseURL + `upload-unregistered-participant`, formData, { headers })
      .then((res) => {
        //  console.log(smartListId);
        console.log(res);
        if (res.data.code === 200) {
          loader("hide");
          setEditList(res.data.data);

          //setapi_flag(api_flag + 1);
        } else {
          // popup_alert({
          //   visible: "show",
          //   message: res.data.message,
          //   type: "error",
          // });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  // useEffect(() => {
  //   setEditList(editList);
  // }, [updateCounter]);

  useEffect(() => {
    setEditList(props.data);
  }, [props.api_flag]);

  const showFileInReadersList = async () => {
    setEditList((oldArray) => [...newData, ...oldArray]);
    setAddNewData(addNewData + 1);
    setShowSaveReader(false);
    // setTimeout(() => {
    //   console.log(editList);
    // }, 1000);
    // console.log(editList);

    // if (props.listId) {
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

    setName(null);
    setJobTitle(null);
    setCompany(null);
    setIndication(null);
    setProduct(null);
    setCountry(null);
    setEmail(null);
  };

  const deleteRecord = (i) => {
    const list = hpc;

    list.splice(i, 1);

    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();

    setShowLessInfo(!showLessInfo);
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
          name: "",
          email: "",
          hospital: "",
          profession: "",
          country: "",
          interest: "",
        },
      ]);
    } else {
      toast.warning("Please input the email atleast");
    }
  };

  const addHcp = () => {
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const saveEditClicked = async () => {
    console.log(editableData);

    setEditable(0);
    if (editableData.length > 0) {
      editableData.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data.id
        ).innerText;

        let prev_obj = editList.find((x) => x.id === data.id);

        //data.country = country_edit;
        data.name = name_edit;
      });
    }

    if (editableData.length > 0) {
      const body = {
        smart_list_id: props.smartListId,
        upload: "",
        participants: JSON.stringify(editableData),
        // participants: editableData,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Token")}`,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      // loader("show");
      await axios
        .post(baseURL + `smart-list/update-participants`, body, { headers })
        .then((res) => {
          console.log(res);

          if (res.data.code == 200) {
            toast.success("Data updated successfully");
          }

          //  loader("hide");

          // if (res.data.status_code === 200) {
          //   toast.success("List updated");
          // } else {
          //   popup_alert({
          //     visible: "show",
          //     message: res.data.message,
          //     type: "error",
          //   });
          // }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });

      setSaveOpen(false);
      setEditableData([]);
      setEditList(editList);
    } else {
      toast.warning("No update");
      setSaveOpen(false);
    }
  };

  const deleteReader = async (profile_user_id) => {
    const body = {
      smart_list_id: props.smartListId,

      participant_id: profile_user_id,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    //  loader("show");
    await axios
      .post(baseURL + `smart-list/delete-participants`, body, {
        headers,
      })
      .then((res) => {
        console.log(res);

        //    loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });

    const filtered_list = editList.filter((data) => {
      return data.id != profile_user_id;
    });

    setEditList(filtered_list);
  };

  const editing = (
    id,
    name,

    index
  ) => {
    // console.log(id);
    // console.log(name);
    // console.log(index);
    // console.log(props.smartListId);

    // let ignoreClickOnMeElement = document.getElementById(
    //   "row-selected" + index
    // );

    // ignoreClickOnMeElement.addEventListener(
    //   "mouseleave",
    //   async (event) => {
    //     const name_edit = document.getElementById(
    //       "field_name" + index
    //     ).innerText;

    //     console.log(name_edit);
    //     //console.log(country_edit);

    //     const arr = [];
    //     arr.push({
    //       id: id,
    //       name: name_edit,
    //       country: "",
    //       hospital: "",
    //       email: "",
    //       profession: "",
    //       interest: "",
    //       consent: "",
    //     });
    //     setEditableData((oldArray) => [...oldArray, ...arr]);
    //   },
    //   { once: true }
    // );

    if (editable != 0) {
      // ignoreClickOnMeElement.addEventListener(
      // "mouseleave",
      // async (event) => {
      const name_edit = document.getElementById("field_name" + id).innerText;

      console.log(name_edit);

      var arr = [];
      arr.push({
        id: id,
        name: name_edit,
        country: "",
        hospital: "",
        email: "",
        profession: "",
        interest: "",
        consent: "",
      });

      let prev_obj = editableData.find((x) => x.id === id);
      console.log(prev_obj);

      if (typeof prev_obj != "undefined") {
        editableData.map((obj) => arr.find((o) => o.id === id) || obj);
      } else {
        setEditableData((oldArray) => [...oldArray, ...arr]);
      }
    }
  };

  const addFile = () => {
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
  };

  const onDelete = async ({ participants_id }) => {
    console.log(participants_id);

    if (editList.length > 1) {
      setIsOpen(true);
      setProfileUserId(participants_id);
    } else {
      // popup_alert({
      //   visible: "show",
      //   message: "Please keep atleast one reader or delete the smart list",
      //   type: "error",
      // });
    }
  };

  const onFirstNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    console.log(list);
    const name = hpc[i].name;
    list[i].name = value;
    setHpc(list);
  };

  const onInterestChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].interest;
    list[i].interest = value;
    setHpc(list);
  };

  const onHospitalChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].hospital;
    list[i].hospital = value;
    setHpc(list);
    //setEmailData(e.target.value);
  };

  const onEmailChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    setEmailData(e.target.value);
  };

  const onProfessionChange = (e, i) => {
    const { value } = e.target;
    // console.log(value);
    const list = [...hpc];
    const name = hpc[i].profession;
    list[i].profession = value;
    setHpc(list);
  };

  const onCountryChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].country;
    list[i].country = value;
    setHpc(list);
  };

  const backClicked = () => {
    //  window.history.go(-1);
    //props.api_flag(0);
    navigate("/webinar/email/WebinarSmartList");
  };

  const searchChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setEditList(updateData);
    }
  };

  const submitHandler = (event) => {
    let r_table = [];
    updateData.find(function (item) {
      console.log(item);
      if (item.name.includes(search) || item.email.includes(search)) {
        r_table.push(item);
      }
    });
    if (r_table.length > 0) {
      setEditList(r_table);
    } else {
      toast.error("Data not found");
    }
    event.preventDefault();
    return false;
  };

  const saveClicked = async (e) => {
    //  setIsOpenAdd(false);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    console.log(hpc);
    if (activeManual == "active") {
      const body_data = hpc.map((data) => {
        return {
          name: data.name,
          email: data.email,
          hospital: data.hospital,
          country: data.country,
          profession: data.profession,
          interest: data.interest,
          consent: "",
        };
      });

      var pattern = "^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$";
      const body = {
        smart_list_id: props.smartListId,
        participants: JSON.stringify(body_data),
      };

      console.log(body);
      const status = body_data.map((data) => {
        if (data.email == "") {
          return "false";
        } else {
          return "true";
        }
      });
      console.log(status);

      if (status.every((element) => element == "true")) {
        loader("show");
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        await axios
          .post(baseURL + `create-unregistered-participant`, body, {
            headers,
          })
          .then((res) => {
            console.log(res);
            if (res.data.code === 200) {
              //  loader("hide");
              // toast.success("User added successfuly");
              console.log("res");
              let old_data = editList;
              let new_data = JSON.parse(res.data.data);
              //setNewData((oldArray) => [...new_data, ...oldArray]);
              //setNewData(new_data);
              combine_data_manual = [...new_data, ...old_data];
              setEditList(combine_data_manual);
              setUpdatedData(combine_data_manual);
              setIsOpen(false);
              setShowSaveReader(true);
              setIsOpenAdd(false);
              toast.success("New user added successfully");
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
            loader("hide");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            //     loader("hide");
          });
      } else {
        toast.warning("Please enter the email atleast");
      }
    } else {
      let formData = new FormData();
      formData.append("user_id", 18207);
      formData.append("smart_list_id", getlistid);
      formData.append("reader_file", selectedFile);
      console.log(formData);
      if (selectedFile) {
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        //    loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");
              let old_data = editList;
              let new_data = res.data.response.data;
              setNewData(new_data);
              combine_data = [...new_data, ...old_data];
              console.log(new_data);
              // console.log(combine_data);
              setEditList(old_data);
              setShowSaveReader(true);
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              //    setUpdatedData(combine_data);
              //  loader("hide");
            } else {
              toast.warning(res.data.message);
              //  loader("hide");
            }
          })
          .catch((err) => {
            // loader("hide");
            console.log("something went wrong");
          });
        setIsOpen(false);
      } else {
        toast.warning("Please add a excel file");
      }
    }
  };

  const showSucessPopup = () => {
    // popup_alert({
    //   visible: "show",
    //   message: "The HCP record has been deleted <br/>successfully !",
    //   type: "success",
    // });

    setOpenDeleteConfirmation(false);
  };

  const deleteNewlyAdded = (profile_user_id) => {
    //  console.log(profile_user_id);
    const data = newData;
    const dataUpdated = data.filter((d) => {
      return d.profile_user_id != profile_user_id;
    });
    setNewData(dataUpdated);
  };

  if (view == 0) {
    return (
      <>
        <GridView data={editList} smartListId={props.smartListId} />
      </>
    );
  } else {
    return (
      <>
        <div class="right-sidebar">
          <div className="loader" id="custom_loader">
            <span className="loader-view"> </span>
          </div>
          {!isOpenAdd ? <ToastContainer /> : null}
          <div class="top-header">
            <div class="page-title">
              <div class="header-btn-left">
                <button
                  class="btn btn-primary btn-filled back"
                  onClick={() => {
                    navigate("/webinar/email/WebinarSmartList");
                  }}
                >
                  <svg
                    width="12"
                    height="19"
                    viewBox="0 0 12 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.31557 17.82C8.97165 18.476 10.0354 18.476 10.6915 17.82C11.3475 17.1639 11.3475 16.1002 10.6915 15.4441L4.7522 9.50484L10.6927 3.56431C11.3488 2.90823 11.3488 1.84451 10.6927 1.18843C10.0367 0.532347 8.97294 0.532347 8.31686 1.18843L1.2212 8.28409C1.21 8.29469 1.19891 8.30548 1.18794 8.31646C0.531858 8.97254 0.531858 10.0363 1.18794 10.6923L8.31557 17.82Z"
                      fill="white"
                    />
                  </svg>
                </button>
                {/* <a class="btn btn-primary btn-filled light" href="#">
                  <img
                    src={path_image + "arrow-left.svg"}
                    alt=""
                    onClick={() => {
                      navigate("/webinar/email/WebinarSmartList");
                    }}
                  />
                </a> */}
              </div>
              <h2>Name of the list</h2>
            </div>
            <div class="top-right-action">
              <div class="collection-view">
                <a
                  class="change-view grid"
                  id="grid"
                  rel="tooltip"
                  title="Grid view"
                >
                  <div class="togglelines">
                    <img
                      src={path_image + "grid-view.png"}
                      alt=""
                      onClick={() => setView(0)}
                    />
                  </div>
                </a>

                <a
                  class="change-view list active"
                  id="list"
                  rel="tooltip"
                  title="List view"
                >
                  <div class="togglelines">
                    <img src={path_image + "list-view.png"} alt="" />
                  </div>
                </a>
              </div>
              <div class="search-bar">
                <form class="d-flex" onSubmit={(e) => submitHandler(e)}>
                  <input
                    class="form-control me-2"
                    //   type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => searchChange(e)}
                  />
                  <button class="btn btn-outline-success" type="submit">
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
                      />
                    </svg>
                  </button>
                </form>
              </div>
              {/* <div class="filter-by nav-item dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter By{" "}
                  <svg
                    class="filter-arrow"
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                      fill="#97B6CF"
                    />
                    <path
                      d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                      fill="#97B6CF"
                    />
                    <path
                      d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                      fill="#97B6CF"
                    />
                  </svg>
                  <svg
                    class="close-arrow"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="2.09896"
                      height="15.1911"
                      rx="1.04948"
                      transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                      fill="#0066BE"
                    />
                    <rect
                      width="2.09896"
                      height="15.1911"
                      rx="1.04948"
                      transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                      fill="#0066BE"
                    />
                  </svg>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Filter1{" "}
                      <img
                        src={path_image + "filter-close.svg"}
                        alt="Close-filter"
                      />
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Filter2{" "}
                      <img
                        src={path_image + "filter-close.svg"}
                        alt="Close-filter"
                      />
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Filter3{" "}
                      <img
                        src={path_image + "filter-close.svg"}
                        alt="Close-filter"
                      />
                    </a>
                  </li>
                </ul>
              </div> */}
              <div class="hcp-user-download">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="btn btn-outline-primary"
                  table="table-to-xls"
                  filename="particpants"
                  sheet="particpants"
                  buttonText="Download"
                />
              </div>
              <div class="hcp-user-upload">
                <button class="btn btn-outline-primary">
                  <img
                    src={path_image + "upload-btn.svg"}
                    alt="Upload"
                    onClick={uploadButtonClicked}
                  />
                </button>
              </div>
              <div class="hcp-new-user">
                <button class="btn btn-outline-primary" onClick={handleShow}>
                  <img src={path_image + "new-user.svg"} alt="New User" />
                </button>
              </div>
              <div class="hcp-added">
                <button class="btn btn-outline-primary">
                  <img
                    src={path_image + "edit.svg"}
                    alt="Edit"
                    onClick={editButtonClicked}
                  />
                </button>
              </div>
            </div>
          </div>
          <section class="search-hcp">
            <div class="table-title">
              <div class="selected-hcp-table-action">
                {" "}
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
            <div class="result-hcp-table">
              <div class="selected-hcp-list">
                <table class="table" id="table-to-xls">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>
                      <th scope="col">Hospital</th>
                      <th scope="col">Profession</th>
                      <th scope="col">Interest</th>
                      <th scope="col">Consent</th>
                      <th scope="col">Email Received</th>
                      <th scope="col">Openings</th>
                      <th scope="col">Registrations</th>
                      <th scope="col">Last Email</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {editList.map((item, index) => {
                      return (
                        <tr
                          id={`row-selected` + item.id}
                          onClick={(e) =>
                            editing(
                              //  e.currentTarget,
                              item.id,

                              item.name,
                              index
                            )
                          }
                        >
                          <td
                            id={`field_name` + item.id}
                            contenteditable={editable === 0 ? "false" : "true"}
                          >
                            <span>{item.name}</span>
                          </td>
                          <td>{item.email}</td>
                          <td>{item.bounced}</td>
                          <td>{item.country}</td>
                          <td>{item.hospital}</td>
                          <td> {item.profession}</td>
                          <td>{item.interest}</td>
                          <td>{item.consent}</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td>NA</td>
                          <td class="delete_row" colspan="12">
                            <img
                              src={path_image + "delete.svg"}
                              alt="Delete Row"
                              onClick={() =>
                                onDelete({
                                  participants_id: item.id,
                                })
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        <Modal show={isOpen} className="send-confirm" id="resend-confirm">
          <Modal.Header>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              onClick={() => {
                setIsOpen(false);
              }}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <img src={"/" + path + "alert.png"} alt="" />
            <h4>
              The record will be deleted from the list.
              <br /> Are you sure you want to delete it?{" "}
            </h4>

            <div class="modal-buttons">
              <button
                type="button"
                class="btn btn-primary btn-filled"
                data-bs-dismiss="modal"
                onClick={() => {
                  deleteReader(profile_user_id);
                  setIsOpen(false);

                  setOpenDeleteConfirmation(true);
                }}
              >
                Yes Please!
              </button>

              <button
                type="button"
                class="btn btn-primary btn-bordered light"
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

        <Modal
          id="add_hcp"
          show={isOpenAdd}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ToastContainer />
          <div
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
          >
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add New HCP
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
                                    <label for=""> Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      onChange={(event) =>
                                        onFirstNameChange(event, i)
                                      }
                                      value={val.name}
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
                                    <label for="">Hospital</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name={`${fieldName}.hospital`}
                                      onChange={(event) =>
                                        onHospitalChange(event, i)
                                      }
                                      value={val.hospital}
                                    />
                                  </div>
                                </div>

                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Profession</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name={`${fieldName}.profession`}
                                      onChange={(event) =>
                                        onProfessionChange(event, i)
                                      }
                                      value={val.profession}
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Country</label>
                                    <select
                                      className="country-form"
                                      aria-label="select"
                                      onChange={(event) =>
                                        onCountryChange(event, i)
                                      }
                                    >
                                      <option selected>Select Country</option>
                                      {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                            ([index, item]) => {
                                              return (
                                                <>
                                                  {console.log(item)}
                                                  <option value={index}>
                                                    {item.country}
                                                  </option>
                                                </>
                                              );
                                            }
                                          )}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Interest</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name={`${fieldName}.interest`}
                                      onChange={(event) =>
                                        onInterestChange(event, i)
                                      }
                                      value={val.interest}
                                    />
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
                                  {/* <li className="nav-item add_hcp">
                                    <a
                                      onClick={addMoreHcp}
                                      className="nav-link active btn-bordered"
                                      data-bs-toggle="tab"
                                      href="javascript:;"
                                    >
                                      Add HCP +
                                    </a>
                                  </li> */}

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
                    <div class="file_upload-box">
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-4[]"
                            id="file-4"
                            class="inputfile inputfile-3"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={onFileChange}
                            data-multiple-caption="{count} files selected"
                            multiple
                            // ref={file_name}
                          />
                          {file_name.current?.files === undefined ||
                          file_name.current.files?.length === 0 ? (
                            <>
                              <label for="file-4">
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
                  saveClicked(e);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          className="send-confirm"
          id="upload-confirm"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header>
            <h4>Upload File</h4>
            <button
              type="button"
              onClick={handleClose}
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </Modal.Header>
          <Modal.Body>
            <div class="upload-file-box">
              <div class="box">
                <input
                  type="file"
                  name="file-4[]"
                  id="file-4"
                  class="inputfile inputfile-3"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={onFileChange}
                  data-multiple-caption="{count} files selected"
                  ref={file_name}
                />
                {file_name.current?.files === undefined ||
                file_name.current.files?.length === 0 ? (
                  <>
                    <label for="file-4">
                      <span>Choose Your File</span>
                    </label>
                    <p>Upload your excel file</p>
                  </>
                ) : (
                  <h5>{file_name.current.files[0].name}</h5>
                )}
              </div>
            </div>
            <div class="modal-buttons">
              {file_name.current?.files === undefined ||
              file_name.current.files?.length === 0 ? (
                <>
                  {" "}
                  <button
                    type="button"
                    class="btn btn-primary btn-bordered light"
                    data-bs-dismiss="modal"
                  >
                    Upload
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={uploadFile}
                  data-bs-dismiss="modal"
                >
                  Upload
                </button>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
};
const mapStateToProps = (state) => {
  return state;
};

export default ViewData;
