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
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const TableView = (props, ref) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  let path = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //let validator = new SimpleReactValidator();
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const navigate = useNavigate();
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
        .post(
          `http://51.89.210.56:8000/api/smart-list/update-participants`,
          body,
          { headers }
        )
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
    }
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
    loader("show");
    await axios
      .post(
        `http://51.89.210.56:8000/api/smart-list/delete-participants`,
        body,
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);

        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });

    const filtered_list = editList.filter((data) => {
      return data.id != profile_user_id;
    });

    setEditList(filtered_list);
  };

  const onDelete = async ({ participants_id }) => {
    if (editList.length > 1) {
      setIsOpen(true);
      setProfileUserId(participants_id);
    } else {
      // popup_alert({
      //   visible: "show",
      //   message: "Please keep atleast one reader or delete the smart list",
      //   type: "error",
      //   redirect: "",
      // });
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
      <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
      <div class="right-sidebar">
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
            {/* <div class="header-btn-right back_btn">
              <a class="btn btn-primary btn-filled light" href="#">
                <img
                  src={path_image + "arrow-left.svg"}
                  alt=""
                  onClick={() => navigate("/webinar/email/SmartListCreate")}
                />
              </a>
            </div> */}
            <h2>Name of the list</h2>
          </div>
          <div class="top-right-action">
            <div class="hcp-added">
              <button class="btn btn-outline-primary">
                <img
                  src={path_image + "edit.svg"}
                  alt="Edit"
                  onClick={editButtonClicked}
                />
              </button>
            </div>
            <div>
              <button
                class="btn btn-outline-primary"
                onClick={() => navigate("/webinar/email/WebinarSmartList")}
              >
                Close
              </button>
            </div>
          </div>
        </div>

        <section class="search-hcp">
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
          <div class="result-hcp-table">
            <div class="selected-hcp-list">
              <table class="table">
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
                  {editList.length > 0
                    ? editList.map((item, index) => {
                        return (
                          <tr
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
                              contenteditable={
                                editable === 0 ? "false" : "true"
                              }
                            >
                              <span>{item.name}</span>
                            </td>
                            <td>{item.email}</td>
                            <td>{item.bounced}</td>
                            <td>{item.country}</td>
                            <td>{item.hospital}</td>
                            <td>{item.profession}</td>
                            <td>{item.interest}</td>
                            <td>{item.consent}</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td
                              class="delete_row"
                              colspan="12"
                              onClick={() =>
                                onDelete({
                                  participants_id: item.id,
                                })
                              }
                            >
                              <img
                                src={path_image + "delete.svg"}
                                alt="Delete Row"
                              />
                            </td>
                          </tr>
                        );
                      })
                    : null}
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
