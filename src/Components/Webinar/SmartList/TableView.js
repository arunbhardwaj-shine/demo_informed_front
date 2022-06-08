import axios from "axios";
import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { popup_alert } from "../../../popup_alert";
import queryString from "query-string";
import { connect } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const TableView = (props, ref) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  let path = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //let validator = new SimpleReactValidator();
  let path_image = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const queryParams = queryString.parse(window.location.search);
  const [validator] = React.useState(new SimpleReactValidator());
  const [validator2] = React.useState(new SimpleReactValidator());
  const [validator3] = React.useState(new SimpleReactValidator());
  const [isOpen, setIsOpen] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(false);
  const [deleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [profileUserId, setProfileUserId] = useState();
  const [data, setData] = useState(0);
  const [manualReRender, setManualReRender] = useState(0);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [fileValidationMessage, setFileValidationMeassage] = useState(0);
  const [emailData, setEmailData] = useState("");
  const [activeManual, setActiveManual] = useState("active");
  const [sorting, setSorting] = useState(0);
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [activeExcel, setActiveExcel] = useState("");
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
  const [getsortflag, setsortflag] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [update, setUpdate] = useState(0);
  const [render, setReRender] = useState(0);
  const [show, setShow] = useState(false);
  const [renderCounterData, setCounterData] = useState([]);
  const [editable, setEditable] = useState(0);
  const [validator3Counter, setValidator3Counter] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [counter, setCounter] = useState([0]);
  const [saveOpen, setSaveOpen] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [getNewReaders, setNewReaders] = useState([]);
  const [emailChanged, setEmailChanged] = useState("");
  let file_name = useRef("");

  const [hpc, setHpc] = useState([
    { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
  ]);
  const [countryall, setCountryall] = useState([]);

  const [editableData, setEditableData] = useState([]);

  useImperativeHandle(
    ref,
    () => ({
      createSmartList(dd, newReaders) {
        showFileInReadersList(dd, newReaders);
      },
    }),
    []
  );

  useEffect(() => {
    setUpdatedData(props.data);
    setEditList(props.data);
    // if(typeof props.data != "undefined" && props.data.length > 0){
    // }
    if (typeof props.listId != "undefined" && props.listId != "") {
      setListId(props.listId);
    } else {
      setListId(queryParams.listId);
    }
    if (
      typeof props.smartListName != "undefined" &&
      props.smartListName != ""
    ) {
      setListName(props.smartListName);
    }

    if (
      typeof props.newAddedUser != "undefined" &&
      props.newAddedUser.length > 0
    ) {
      setNewReaders(props.newAddedUser);
    }
  }, [props.data]);

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const getalCountry = async () => {
      const body = {
        user_id: 18207,
      };
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          setCountryall(res.data.response.data.country);
          console.log(countryall);
          // setCounter(counter + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getalCountry();
  }, []);

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
  const handleCloseUploadMenu = () => setShowUploadMenu(false);
  const handleShowUploadMenu = () => {
    setShowUploadMenu(true);
    setShow(false);
  };

  let combine_data;
  let combine_data_manual;

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();

    setShowLessInfo(!showLessInfo);
  };

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
          // console.log(combine_data);
          setEditList(combine_data);
          props.sendDataToParent(combine_data, "existing");
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

  // const showSucessPopup = () => {
  //   popup_alert({
  //     visible: "show",
  //     message: "The HCP record has been deleted successfully.",
  //     type: "success",
  //     redirect: "",
  //   });
  //
  //   setOpenDeleteConfirmation(false);
  // };

  const editing = (
    id,
    name,

    index
  ) => {
    console.log(id);
    console.log(name);
    console.log(index);
    console.log(props.smartListId);

    let ignoreClickOnMeElement = document.getElementById(
      "row-selected" + index
    );

    ignoreClickOnMeElement.addEventListener(
      "mouseleave",
      async (event) => {
        const name_edit = document.getElementById(
          "field_name" + index
        ).innerText;

        console.log(name_edit);
        //console.log(country_edit);

        const arr = [];
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
        setEditableData((oldArray) => [...oldArray, ...arr]);
      },
      { once: true }
    );
  };

  const showFileInReadersList = async (fdata, newReaders) => {
    let body = {};
    if (typeof editList != "undefined" && editList.length > 0) {
      //for Normal flow
      const profile_user_id_array = editList.map((data) => {
        return data.profile_user_id;
      });

      const new_user_id_array = getNewReaders.map((data) => {
        return data.profile_user_id;
      });

      body = {
        user_list: profile_user_id_array,
        smart_list_id: typeof getlistid !== "undefined" ? getlistid : "",
        user_id: 18207,
        smart_list_name: getlistname,
        submit_type: props.upload_by_filter,
        new_users_list: new_user_id_array,
        creator_name: typeof props.creator !== "undefined" ? props.creator : "",
      };
    } else if (
      typeof props != "undefined" &&
      props.hasOwnProperty("data") &&
      props.data.length > 0
    ) {
      //Parent Child FLow
      const profile_user_id_array = fdata.map((data) => {
        return data.profile_user_id;
      });

      const new_user_id_array = newReaders.map((data) => {
        return data.profile_user_id;
      });
      body = {
        user_list: profile_user_id_array,
        smart_list_id:
          typeof queryParams.listId !== "undefined" ? queryParams.listId : "",
        user_id: 18207,
        smart_list_name: props.smartListName,
        submit_type: props.upload_by_filter,
        new_users_list: new_user_id_array,
        creator_name: typeof props.creator !== "undefined" ? props.creator : "",
      };
    }

    if (props.upload_by_filter == 1) {
      if (typeof props.filter_payload === "object") {
        Object.assign(body, { filters: props.filter_payload });
      }
    }
    // console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/add_update_list`, body)
      .then((res) => {
        loader("hide");
        if (res.data.status_code == 200) {
          popup_alert({
            visible: "show",
            message: "Your changes has been saved <br />successfully !",
            type: "success",
            redirect: "/SmartList",
          });
        } else {
          toast.warning(res.data.message);
          loader("hide");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    //  console.log("hi");
    setName(null);
    setJobTitle(null);
    setCompany(null);
    setIndication(null);
    setProduct(null);
    setCountry(null);
    setEmail(null);
  };

  const deleteRecord = (i) => {
    //  console.log(hpc);
    const list = hpc;
    // console.log(list);
    list.splice(i, 1);
    // console.log("list after splice");
    // console.log(list);
    // console.log(typeof list);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const addHcp = (e) => {
    e.preventDefault();
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const verifyUser = () => {
    // console.log(props);
    // console.log("0123");
  };

  const addFile = (e) => {
    e.preventDefault();
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
  };

  const saveEditClicked = async () => {
    console.log(props.smartListId);
    setEditable(0);
    console.log(editableData);
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
    //  loader("show");
    await axios
      .post(`http://51.89.210.56:8000/api/smart-list/update`, body, { headers })
      .then((res) => {
        // loader("hide");
        // if (res.data.status_code === 200) {
        //   toast.success("List updated");
        // } else {
        //   popup_alert({
        //     visible: "show",
        //     message: res.data.message,
        //     type: "error",
        //   });
        // }

        console.log(res);
      })
      .catch((err) => {
        //    loader("hide");
        toast.error("Something went wrong");
      });
    setSaveOpen(false);
    setEditableData([]);
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
    loader("show");
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/update_reders_details`, body)
      .then((res) => {
        // console.log(props);

        // console.log(res);
        onCancel();

        // editList[0].email = email;
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
        loader("hide");
        console.log(err);
      });
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
      toast.warning("Please input the email atleast");
    }
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
      // validator3.showMessages();
      //setValidator3Counter(validator3Counter + 1);
    }
  };

  const deleteReader = (profile_user_id) => {
    const filtered_list = editList.filter((data) => {
      return data.profile_user_id != profile_user_id;
    });

    setEditList(filtered_list);
    props.sendDataToParent(filtered_list, "existing");
    popup_alert({
      visible: "show",
      message: "The HCP record has been deleted </br>successfully !",
      type: "success",
      redirect: "",
    });

    // const body = {
    //   user_list: filtered_list.map((data) => {
    //     return data.profile_user_id;
    //   }),
    //   smart_list_id: getlistid,
    //   user_id: 18207,
    // };
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
        redirect: "",
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
    setEmailChanged(value);
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    setEmailData(e.target.value);
  };

  const onContactTypeChange = (e, i) => {
    const { value } = e.target;
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
    console.log("back clicked");
    props.api_flag(0);
  };

  const saveClicked = async () => {
    // setShowSaveReader(true);

    // setIsOpenAdd(false);

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
        // let validRegex =
        //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              let old_data = editList;

              let new_data = res.data.response.data;
              if (typeof getNewReaders != "undefined") {
                let added_prev_readers_array = getNewReaders;
                let combine_new_readers_array = [
                  ...new_data,
                  ...added_prev_readers_array,
                ];
                setNewReaders(combine_new_readers_array);
                props.sendDataToParent(combine_new_readers_array, "new");
              }
              combine_data_manual = [...new_data, ...old_data];

              setEditList(old_data);
              props.sendDataToParent(old_data, "existing");
              setUpdatedData(old_data);
              setIsOpen(false);
              setIsOpenAdd(false);
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
      } else {
        toast.warning("Please input the email atleast");
      }

      //setIsOpen(false);
    } else {
      let formData = new FormData();
      formData.append("user_id", 18207);
      formData.append("smart_list_id", getlistid);
      formData.append("reader_file", selectedFile);

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      if (selectedFile) {
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");

              let old_data = editList;
              let new_data = res.data.response.data;
              if (typeof getNewReaders != "undefined") {
                let added_prev_readers_array = getNewReaders;
                let combine_new_readers_array = [
                  ...new_data,
                  ...added_prev_readers_array,
                ];
                setNewReaders(combine_new_readers_array);
                props.sendDataToParent(combine_new_readers_array, "new");
              }
              combine_data = [...new_data, ...old_data];
              // console.log(combine_data);
              setEditList(old_data);
              setIsOpenAdd(false);
              setActiveManual("active");
              setActiveExcel("");
              setSelectedFile(null);
              props.sendDataToParent(old_data, "existing");
              setUpdatedData(old_data);
            } else {
              toast.warning(res.data.message);
            }
            loader("hide");
          })
          .catch((err) => {
            toast.error("Something went wrong");
            loader("hide");
          });
        setIsOpen(false);
      } else {
        toast.warning("Please add a excel file");
      }
    }
  };
  // const sortdata = () => {
  //   setsortflag((getsortflag) => !getsortflag);
  //   if (getsortflag) {
  //     let sortedData = editList.sort((a, b) =>
  //       a.first_name > b.first_name ? 1 : -1
  //     );
  //     setEditList(sortedData);
  //     props.sendDataToParent(sortedData);
  //   } else {
  //     let sortedData = editList.sort((a, b) =>
  //       a.first_name < b.first_name ? 1 : -1
  //     );
  //     setEditList(sortedData);
  //     props.sendDataToParent(sortedData);
  //   }
  // };

  const sortSelectedUsers = () => {
    console.log("hi");
    //console.log(readers);
    let normalArr = [];
    normalArr = editList;
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

    setEditList(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const deleteNewlyAdded = (profile_user_id) => {
    const data = getNewReaders;
    const dataUpdated = data.filter((d) => {
      return d.profile_user_id != profile_user_id;
    });
    props.sendDataToParent(dataUpdated, "new");
    setNewReaders(dataUpdated);
  };

  return (
    <>
      {typeof props.upload_by_filter !== "undefined" &&
        props.upload_by_filter == 0 && (
          <div className="page-top-nav smart_list_names">
            <div className="row justify-content-end align-items-center">
              <div className="col-12 col-md-1">
                <div className="header-btn-left">
                  <button className="btn btn-primary btn-bordered back">
                    <Link to={"/webinar/SmartListCreate"}>BACK</Link>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-9">
                <ul className="tabnav-link">
                  <li className="">
                    <a href="javascript:void(0)">Create smart List</a>
                  </li>
                  <li className="active">
                    <a href="javascript:void(0)">Segmentation</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-2">
                <div className="header-btn">
                  <button className="btn btn-primary btn-bordered move-draft">
                    <Link to={{ pathname: "/webinar/SmartListCreate" }}>
                      Cancel
                    </Link>
                  </button>
                  {/* <button
                    className="btn btn-primary btn-filled create"
                    onClick={showFileInReadersList}
                  >
                    Create
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}

      <section className="search-hcp smart-list-view">
        <div className="result-hcp-table">
          <div className="table-title">
            {props.upload_by_filter == 0 ? (
              <h4>
                Uploaded HCPs for the smart list{" "}
                <span>| {editList.length > 0 ? editList.length : 0}</span>
              </h4>
            ) : (
              <h4>Selected HCPs for the smart list</h4>
            )}

            <div className="selected-hcp-table-action">
              {editable == false ? (
                <>
                  {/* {" "}
                  <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p className="show_more">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
                    )}{" "}
                  </a>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-outline-primary"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download "
                  /> */}
                  {/* <div className="hcp-new-user">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleShow}
                    >
                      <img src={path + "new-user.svg"} alt="New User" />
                    </button>
                  </div> */}
                  <div className="hcp-added">
                    <button
                      className="btn btn-outline-primary"
                      onClick={editButtonClicked}
                    >
                      <img src={path + "edit-button.svg"} alt="Edit" />
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
                          <img src={path_image + "sort.svg"} alt="Shorting" />
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
                      <th scope="col">Business Unit</th>
                      <th scope="col">Contact Type</th>
                      <th scope="col"></th>{" "}
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders.length > 0 &&
                  getNewReaders.map((item, index) => (
                    <tr
                      className="hcps-added"
                      id={`row-selected` + index}
                      onClick={(e) =>
                        editing(
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
                      <td contenteditable={editable === 0 ? "false" : "true"}>
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
                      <td contenteditable={editable === 0 ? "false" : "true"}>
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
                      {showLessInfo == false ? <td> {item.ibu}</td> : null}
                      {showLessInfo == false ? (
                        <td> {item.contact_type}</td>
                      ) : null}
                      <td className="delete_row" colspan="12">
                        <img
                          src={path + "delete.svg"}
                          alt="Delete Row"
                          onClick={() => deleteNewlyAdded(item.profile_user_id)}
                        />
                      </td>
                    </tr>
                  ))}
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders.length > 0 && (
                    <tr className="seprator-add">
                      <td colspan="13"></td>
                    </tr>
                  )}
                {typeof editList !== "undefined" &&
                  editList.length > 0 &&
                  editList.map((item, index) => (
                    <tr
                      id={`row-selected` + index}
                      onClick={(e) =>
                        editing(
                          //  e.currentTarget,
                          item.id,

                          item.first_name + " " + item.last_name,
                          index
                        )
                      }
                    >
                      <td
                        id={`field_name` + index}
                        contenteditable={editable === 0 ? "false" : "true"}
                      >
                        <span>{item.name}</span>
                      </td>

                      <td id={`field_email` + index}>{item.email}</td>
                      <td id={`field_bounced` + index}>NA</td>
                      <td id={`field_country` + index}>
                        <span>{item.country}</span>
                      </td>
                      {/*showLessInfo == false ? (
                        <td id="field_readers">NA</td>
                      ) : null*/}
                      {showLessInfo == false ? (
                        <td id="field_business_unit">{item.ibu}</td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td id="field_interest">{item.contact_type}</td>
                      ) : null}
                      <td
                        className="delete_row"
                        colspan="12"
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
                      >
                        <img src={path + "delete.svg"} alt="Delete Row" />
                      </td>
                    </tr>
                  ))}
                {validator3.message("email", email, "required|email")}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/*Modal to add new users*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New HCP</Modal.Title>
          <button
            className="btn btn-secondary"
            style={{ margin: "10px" }}
            onClick={addHcp}
          >
            Add HCP +{" "}
          </button>
          <button
            className="btn-secondary"
            variant="primary"
            onClick={handleShowUploadMenu}
            style={{ margin: "5px" }}
          >
            Upload Excel
          </button>
        </Modal.Header>{" "}
        <div className="container">
          {hpc.map((val, i) => {
            const fieldName = `hpc[${i}]`;
            return (
              <>
                <div className="container">
                  <div className="row align-items-center vh-100">
                    <div className="col-6 mx-auto">
                      <div className="card shadow border">
                        <div className="card-body d-flex flex-column align-items-center">
                          <div className="card-title form-group">
                            first name{" "}
                            <input
                              type="text"
                              name={`${fieldName}.firstname`}
                              onChange={(event) => onFirstNameChange(event, i)}
                              value={val.firstname}
                            ></input>
                            {validator.message(
                              "name",
                              val.firstname,
                              "required|alpha"
                            )}
                            last name{" "}
                            <input
                              type="text"
                              name={`${fieldName}.lastname`}
                              onChange={(event) => onLastNameChange(event, i)}
                              value={val.lastname}
                            ></input>
                            {validator.message(
                              "lastname",
                              val.lastname,
                              "required|alpha"
                            )}
                            email{" "}
                            <input
                              type="text"
                              name={`${fieldName}.email`}
                              onChange={(event) => onEmailChange(event, i)}
                              value={val.email}
                            ></input>
                            {validator.message(
                              "email",
                              val.email,
                              "required|email"
                            )}
                            contact type{" "}
                            <input
                              type="radio"
                              id="HCP"
                              onChange={(event) =>
                                onContactTypeChange(event, i)
                              }
                              name={`${fieldName}.contact_type`}
                              value="HCP"
                            />
                            <label for="HCP">HPC</label>
                            <input
                              type="radio"
                              id="staff"
                              name={`${fieldName}.contact_type`}
                              onChange={(event) =>
                                onContactTypeChange(event, i)
                              }
                              value="staff"
                            />
                            <label for="staff">staff</label>
                            <input
                              type="radio"
                              id="test-users"
                              name={`${fieldName}.contact_type`}
                              onChange={(event) =>
                                onContactTypeChange(event, i)
                              }
                              value="test users"
                            />
                            <label for="test-users">Test Users</label>
                            <br />
                            country{" "}
                            <input
                              type="text"
                              name={`${fieldName}.country`}
                              onChange={(event) => onCountryChange(event, i)}
                              value={val.country}
                            ></input>
                            {validator.message(
                              "country",
                              val.country,
                              "required"
                            )}
                            <br />
                            {hpc.length !== 1 && (
                              <button onClick={() => deleteRecord(i)}>
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          <button
            type="submit"
            className="btn btn-secondary"
            onClick={saveClicked}
          >
            Save
          </button>
        </div>
      </Modal>

      {/* add new hcps */}
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
                document.querySelector("#file-4").value = "";
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
                                <option selected value="">
                                  Select Type
                                </option>
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
                                <option value="" selected>
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
                  <div className="form-group files">
                    <div className="box">
                      <input
                        type="file"
                        id="file-4"
                        className="form-control inputfile"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={onFileChange}
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
              onClick={saveClicked}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={showUploadMenu} onHide={handleCloseUploadMenu}>
        <Modal.Header closeButton>
          <Modal.Title>upload your new file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="card">
            <div className="card-header"> Upload your new list file</div>
            <div className="card-body">
              <h5 className="card-title"></h5>
              <input
                type="file"
                onChange={onFileChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
              {validator2.message("file", selectedFile, "required")}

              <br />
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={(event) => uploadFile(event)}
              >
                upload
              </button>

              <p className="card-text"></p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={isOpen} className="send-confirm" id="resend-confirm">
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
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
            <br />
            Are you sure you want to delete it?
          </h4>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
              data-bs-dismiss="modal"
              onClick={() => {
                deleteReader(profileUserId);
                setIsOpen(false);

                setOpenDeleteConfirmation(true);
                // setUpdatedData(update + 1);
              }}
            >
              Yes Please!
            </button>

            <button
              type="button"
              className="btn btn-primary btn-bordered light"
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
    </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return state;
};

export default forwardRef(TableView);
