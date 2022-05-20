import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../../loader";

import { toast } from "react-toastify";

import { connect } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { popup_alert } from "../../../popup_alert";

const ViewTable = (props) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //let path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //let validator = new SimpleReactValidator();
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
  const [showLessInfo, setShowLessInfo] = useState(false);
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
      let body = {
        user_id: 18207,
      };
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          setCountryall(res.data.response.data.country);
          //console.log(countryall)
          // setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getalCountry();
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
    { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
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
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
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

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
    console.log("upatdedddddd");
  }, [editList]);

  useEffect(() => {
    setEditList(props.data);
  }, [props.api_flag]);

  useEffect(() => {
    console.log(props);
    setNewData([]);
    const showFileInList = async () => {
      console.log(editList);
      const profile_user_id_array = editList.map((data) => {
        return data.profile_user_id;
      });
      const body = {
        user_list: profile_user_id_array,
        smart_list_id: getlistid,
        user_id: 18207,
        smart_list_name: getlistname,
        submit_type: props.upload_by_filter,
        new_users_list: [],
        creator_name: props.creatorName,
      };

      if (props.upload_by_filter == 1) {
        if (typeof props.filter_payload === "object") {
          Object.assign(body, { filters: props.filter_payload });
        }
      }

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`distributes/add_update_list`, body)
        .then((res) => {
          loader("hide");
          console.log(res);
          if (res.data.status_code === 200) {
            popup_alert({
              visible: "show",
              message: "User added successfully",
              type: "success",
            });
          } else {
            popup_alert({
              visible: "show",
              message: res.data.message,
              type: "error",
            });
          }
          //window.location.href = "/SmartList";
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
        });
    };
    if (addNewData > 0) {
      showFileInList();
    }
  }, [addNewData]);

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
          firstname: "",
          lastname: "",
          email: "",
          contact_type: "",
          country: "",
        },
      ]);
    } else {
      toast.error("Please input the email atleast");
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
    const body = {
      user_id: 18207,
      edit_list_array: editableData,
    };
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/update_reders_details`, body)
      .then((res) => {
        console.log(res);
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

    setSaveOpen(false);
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
      user_id: 18207,
      profile_user_id: profile_user_id,
      profile_id: profile_id,
      email: email,
      jobTitle: jobTitle,
      company: company,
      country: country,
      username: name,
    };

    console.log("body");
    console.log(body);

    console.log("edit list");
    console.log(editList);
    loader("show");
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/update_reders_details`, body)
      .then((res) => {
        onCancel();

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
        console.log(err);
      });
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
    }
  };

  const deleteReader = async (profile_user_id) => {
    const body = {
      smart_list_id: getlistid,
      user_id: 18207,
      profile_user_id: profile_user_id,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/delete_reader`, body)
      .then((res) => {
        console.log(res);

        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });

    const filtered_list = editList.filter((data) => {
      return data.profile_user_id != profile_user_id;
    });

    setEditList(filtered_list);
  };

  const editing = (
    profile_id,
    profile_user_id,
    email,
    jobTitle,
    company,
    country,
    names,
    index
  ) => {
    let ignoreClickOnMeElement = document.getElementById(
      "row-selected" + index
    );

    ignoreClickOnMeElement.addEventListener(
      "mouseleave",
      async (event) => {
        const name_edit = document.getElementById(
          "field_name" + index
        ).innerText;

        const country_edit = document.getElementById(
          "field_country" + index
        ).innerText;

        console.log(name_edit);
        console.log(country_edit);

        const arr = [];
        arr.push({
          profile_id: profile_id,
          profile_user_id: profile_user_id,
          email: email,
          jobTitle: jobTitle,
          company: company,
          country: country_edit,
          username: name_edit,
        });
        setEditableData((oldArray) => [...oldArray, ...arr]);
      },
      { once: true }
    );

    // ignoreClickOnMeElement.addEventListener("mouseleave", async (event) => {

    //   console.log(event);
    //   console.log(index);

    //   const data = editList.find((x) => x.profile_id === profile_id);
    //   console.log(data);

    //   if (
    //     data.first_name + " " + data.last_name != name_edit ||
    //     data.email != email_edit ||
    //     data.country != country_edit
    //   ) {
    //     const body = {
    //       user_id: 18207,
    //       profile_user_id: profile_user_id,
    //       profile_id: profile_id,
    //       email: email_edit,
    //       country: country_edit,
    //       username: name_edit,
    //     };

    //     axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    //     await axios
    //       .post(`distributes/update_reders_details`, body)
    //       .then((res) => {
    //         console.log(res);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // });
  };

  const addFile = () => {
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
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
    if (editList.length > 1) {
      setIsOpen(true);
      setProfileUserId(profile_user_id);
    } else {
      popup_alert({
        visible: "show",
        message: "Please keep atleast one reader or delete the smart list",
        type: "error",
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
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    setEmailData(e.target.value);
  };

  const onContactTypeChange = (e, i) => {
    const { value } = e.target;
    // console.log(value);
    const list = [...hpc];
    const name = hpc[i].contact_type;
    list[i].contact_type = value;
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
    window.history.go(-1);
    //props.api_flag(0);
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
      if (
        item.first_name.includes(search) ||
        item.last_name.includes(search) ||
        item.email.includes(search)
      ) {
        r_table.push(item);
      }
    });
    if (r_table.length > 0) {
      setEditList(r_table);
    } else {
      popup_alert({
        visible: "show",
        message: "Data not found",
        type: "error",
      });
    }
    event.preventDefault();
    return false;
  };

  const saveClicked = async (e) => {
    //  setIsOpenAdd(false);

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
        user_id: 18207,
        smart_list_id: getlistid,
      };

      const status = body.data.map((data) => {
        if (data.email == "") {
          return "false";
        } else {
          return "true";
        }
      });

      console.log(status);

      console.log(body.data);
      if (status.every((element) => element == "true")) {
        loader("show");
        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        await axios
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            console.log(res);
            if (res.data.status_code === 200) {
              //toast.success("User added successfuly");
              console.log("res");
              let old_data = editList;
              let new_data = res.data.response.data;
              setNewData((oldArray) => [...new_data, ...oldArray]);
              //setNewData(new_data);

              combine_data_manual = [...new_data, ...old_data];

              setEditList(old_data);
              // setUpdatedData(combine_data_manual);
              setIsOpen(false);
              setShowSaveReader(true);
              setIsOpenAdd(false);
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
        toast.error("Please enter the email atleast");
      }
    } else {
      let formData = new FormData();
      formData.append("user_id", 18207);
      formData.append("smart_list_id", getlistid);
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

              loader("hide");
            } else {
              toast.warning(res.data.message);
              loader("hide");
            }
          })
          .catch((err) => {
            loader("hide");
            console.log("something went wrong");
          });
        setIsOpen(false);
      } else {
        toast.error("Please add a excel file");
      }
    }
  };

  const uploadFile = async (event) => {
    if (validator2.allValid()) {
      setShowUploadMenu(!showUploadMenu);

      let formData = new FormData();
      formData.append("user_id", 18207);
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

          setEditList(combine_data);
          setUpdatedData(combine_data);
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(validator2.errorMessages);
      validator2.showMessages();
      setFileValidationMeassage(fileValidationMessage + 1);
    }
  };

  const showSucessPopup = () => {
    popup_alert({
      visible: "show",
      message: "The HCP record has been deleted successfully !",
      type: "success",
    });

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

  return (
    <>
      <div className="page-top-nav smart_list_names">
        <div className="row justify-content-end align-items-center">
          <div className="col-12 col-md-1">
            <div className="header-btn-left">
              {props.url ? (
                <Link
                  to={{
                    pathname: "/CreateSmartList",
                  }}
                  onClick={backClicked}
                >
                  <button className="btn btn-primary btn-bordered back">
                    Back
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-primary btn-bordered back"
                  onClick={backClicked}
                >
                  Back
                </button>
              )}
            </div>
          </div>
          <div className="col-12 col-md-11">
            <div className="smart-list-btns">
              {editable == false ? (
                <>
                  <div className="smart-list-download">
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="btn btn-outline-primary"
                      table="table-to-xls"
                      filename="tablexls"
                      sheet="tablexls"
                      buttonText="Download"
                    />
                  </div>
                  <div className="hcp-new-user">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleShow}
                    >
                      <img src={path + "new-user.svg"} alt="New User" />
                    </button>
                  </div>
                  <div className="hcp-added">
                    <button
                      className="btn btn-outline-primary"
                      onClick={editButtonClicked}
                    >
                      <img src={path + "edit-button.svg"} alt="Edit" />
                    </button>
                  </div>
                </>
              ) : null}

              <div className="top-right-action">
                <div className="search-bar">
                  <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline-success" type="submit">
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
                {/* <div className="filter-by">
                  <button className="btn btn-outline-primary" type="submit">
                    Filter By{" "}
                    <svg
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                        fill="#97B6CF"
                      ></path>
                      <path
                        d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                        fill="#97B6CF"
                      ></path>
                      <path
                        d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                        fill="#97B6CF"
                      ></path>
                    </svg>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="search-hcp smart-list-view">
        <div className="result-hcp-table">
          <div className="table-title">
            <h4>
              {getlistname} <span>| {editList.length}</span>
            </h4>
            <div className="selected-hcp-table-action">
              {editable == false ? (
                <>
                  <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p>Show More information</p>
                    ) : (
                      <p>Show less information</p>
                    )}{" "}
                  </a>
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
              {showReaders ? (
                <div className="row">
                  <div className="col-md-12">
                    <button
                      class="btn btn-primary btn-filled next"
                      onClick={showFileInReadersList}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="selected-hcp-list">
            <table className="table" id="table-to-xls">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Bounced</th>
                  <th scope="col">Country</th>
                  {showLessInfo == false ? (
                    <>
                      {" "}
                      <th scope="col">Readers</th>
                      <th scope="col">Business Unit</th>
                      <th scope="col">Interest</th>
                      <th scope="col"></th>{" "}
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody className="form-group">
                {newData.map((item) => (
                  <tr
                    className="hcps-added"
                    contenteditable={editable === 0 ? "false" : "true"}
                    onInput={(e) => editing(e, item.profile_id)}
                  >
                    <td>
                      {inEditMode.status &&
                      inEditMode.rowKey === item.profile_id ? (
                        <input
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      ) : (
                        item.first_name + " " + item.last_name
                      )}
                    </td>
                    <td>
                      {" "}
                      {inEditMode.status &&
                      inEditMode.rowKey === item.profile_id ? (
                        <input
                          value={email}
                          type="email"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      ) : (
                        item.email
                      )}
                    </td>
                    <td>No</td>
                    <td>
                      {inEditMode.status &&
                      inEditMode.rowKey === item.profile_id ? (
                        <input
                          value={country}
                          onChange={(event) => setCountry(event.target.value)}
                        />
                      ) : (
                        item.country
                      )}
                    </td>
                    {showLessInfo == false ? <td> NA</td> : null}
                    {showLessInfo == false ? <td> NA</td> : null}
                    {showLessInfo == false ? <td> NA</td> : null}

                    <td class="delete_row" colspan="12">
                      <img
                        src={path + "delete.svg"}
                        alt="Delete Row"
                        onClick={() => deleteNewlyAdded(item.profile_user_id)}
                      />
                    </td>
                  </tr>
                ))}

                <tr className="seprator-add">
                  <td colspan="13"></td>
                </tr>

                {editList.map((item, index) => (
                  <tr
                    id={`row-selected` + index}
                    contenteditable={editable === 0 ? "false" : "true"}
                    onClick={(e) =>
                      editing(
                        //  e.currentTarget,
                        item.profile_id,
                        item.profile_user_id,
                        item.email,
                        item.jobTitle,
                        item.company,
                        item.country,
                        item.first_name + " " + item.last_name,
                        index
                      )
                    }
                  >
                    {console.log(item)}
                    <td id={`field_name` + index}>
                      <span> {item.first_name + " " + item.last_name} </span>
                    </td>

                    <td id={`field_email` + index}>{item.email}</td>
                    <td id={`field_bounced` + index}>NA</td>
                    <td id={`field_country` + index}>
                      <span>{item.country}</span>
                    </td>
                    {showLessInfo == false ? (
                      <td id="field_readers">NA</td>
                    ) : null}
                    {showLessInfo == false ? (
                      <td id="field_business_unit">NA</td>
                    ) : null}
                    {showLessInfo == false ? (
                      <td id="field_interest">NA</td>
                    ) : null}
                    <td class="delete_row" colspan="12">
                      <img
                        src={path + "delete.svg"}
                        alt="Delete Row"
                        onClick={() =>
                          onDelete({
                            id: item.profile_id,
                            currentName: item.first_name + " " + item.last_name,
                            currentJobTitle: item.jobTitle,
                            currentCompany: item.company,
                            currentIndication: item.indication,
                            currentProduct: item.product,
                            currentCountry: item.country,
                            currentEmail: item.email,
                            profile_user_id: item.profile_user_id,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <input type="hidden" value={updateCounter} />
      </section>

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
          <img src={path + "alert.png"} alt="" />
          <h4>
            The HCP record will be deleted from the list.
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

      {deleteConfirmation == true ? showSucessPopup() : null}

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
              <div className="hcp-add-form tab-content">
                <form id="add_hcp_form" className={"tab-pane" + activeManual}>
                  {hpc.map((val, i) => {
                    const fieldName = `hpc[${i}]`;
                    return (
                      <>
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
                                onChange={(event) => onLastNameChange(event, i)}
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
                                onChange={(event) => onEmailChange(event, i)}
                                value={val.email}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Contact Type</label>
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
                              <label for="">Country</label>
                              <select
                                className="country-form"
                                aria-label="select"
                                onChange={(event) => onCountryChange(event, i)}
                              >
                                <option selected>Select Country</option>
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
                            </div>
                          </div>
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
                        </div>
                      </>
                    );
                  })}
                </form>
                <form id="add_file" className={"tab-pane" + activeExcel}>
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
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="hcp-modal-action">
                <div className="hcp-action-block">
                  {activeManual == "active" ? (
                    <div className="hcp-remove">
                      <button
                        type="button"
                        className="btn btn-filled"
                        onClick={addMoreHcp}
                      >
                        <img src={path_image + "add-row.png"} alt="Add More" />
                      </button>
                    </div>
                  ) : null}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item add_hcp">
                      <a
                        onClick={(e) => addHcp(e)}
                        className="nav-link active btn-bordered"
                        data-bs-toggle="tab"
                        href="javascript:;"
                      >
                        Add HCP +
                      </a>
                    </li>
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
                  </ul>
                </div>
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
    </>
  );
};
const mapStateToProps = (state) => {
  return state;
};

export default ViewTable;
