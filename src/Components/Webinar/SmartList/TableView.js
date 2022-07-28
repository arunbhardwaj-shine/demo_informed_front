import axios from "axios";
import React, {
  useEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../../loader";
import { toast, ToastContainer } from "react-toastify";
import { popup_alert } from "../../../popup_alert";
import queryString from "query-string";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { BaseApi } from "../../../Api/BaseApi";
import ExportApi from "../../../Api/ExportApi";
import { useFormik } from "formik";
import * as Yup from "yup";
const TableView = (props, ref) => {
// console.log("props", props)
const location = useLocation();
  const baseURL = BaseApi.getBaseURL();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  let path = "/" + process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  //let validator = new SimpleReactValidator();
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
  const navigate = useNavigate();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const queryParams = queryString.parse(window.location.search);
  const [validator] = React.useState(new SimpleReactValidator());
  const [validator2] = React.useState(new SimpleReactValidator());
  const [validator3] = React.useState(new SimpleReactValidator());
  const [isOpen, setIsOpen] = useState(false);
  const [showLessInfo, setShowLessInfo] = useState(true);
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
  const [createData, setCreateData] = useState([]);
  const [Speakername, setSpeakerName] = useState([
    {
      name: "",
      email: "",
      country_id: "",
      profession: "",
      interest: "",
      hospital: "",
      content_type:"HCP"
    },
  ]);
  const [SpeakernameErr, setSpeakerNameErr] = useState([
    {
      name: "",
      email: "",
    },
  ]);
  let file_name = useRef("");

  const [hpc, setHpc] = useState([
    { firstname: "", lastname: "", email: "", contact_type: "", country_id: "" },
  ]);
  const [countryall, setCountryall] = useState([]);

  const [editableData, setEditableData] = useState([]);
  let err;
  useImperativeHandle(
    ref,
    () => ({
      createSmartList(dd, newReaders) {
        showFileInReadersList(dd, newReaders);
      },
    }),
    []
  );
  const handleMultiInputAdd = () => {
    setSpeakerName([
      ...Speakername,
      {
        name: "",
        email: "",
        country: "",
        profession: "",
        interest: "",
        hospital: "",
        content_type:"HCP"
      },
    ]);
    setSpeakerNameErr([
      ...SpeakernameErr,
      {
        name: "",
        email: "",
      },
    ]);
  };

  const handleMultiInputRemove = (i) => {
    let data1 = Speakername;
    let dataErr = SpeakernameErr;
    Speakername.splice(i, 1);
    SpeakernameErr.splice(i, 1);
    setTimeout(() => setSpeakerName([...Speakername]), 1000);
    setTimeout(() => setSpeakerNameErr([...SpeakernameErr]), 1000);
    setSpeakerName(data1);
    setSpeakerNameErr(dataErr);
  };
  function validateRehearsalData(index, field_name, message) {
    err = true;
    if (Speakername[index][field_name].length == 0) {
      SpeakernameErr[index][field_name] = message;
      setSpeakerNameErr([...SpeakernameErr]);
      err = false;
    }
    return err;
  }
  const handleError = () => {
    for (let index = 0; index < Speakername.length; index++) {
      validateRehearsalData(index, "name", "Please Enter name");
      // validateRehearsalData(index, "email", "Please Enter email");
        const regex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (
          Speakername[index].email.length == 0 ||
          regex.test(Speakername[index].email) === false
        ) {
          err = false;
          SpeakernameErr[index].email =
            "Email address is required";
          setSpeakerNameErr([...SpeakernameErr]);
      }
    }
    return err;
  };

  const handleOnChange = (e, i) => {
    const regex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const { name, value } = e.target;
    Speakername.splice(i, 1, Speakername[i]);
    setSpeakerName([...Speakername]);
    SpeakernameErr[i][name] = "";

    if (name == "name") {
      Speakername[i][name] = value;
      if (value == "") {
        SpeakernameErr[i][name] = "Please Enter name";
      }
    } else if (name == "email") {
      Speakername[i][name] = value;
      if (value == "") {
        SpeakernameErr[i][name] = "Please Enter email";
      }else if(regex.test(value) === false){
        SpeakernameErr[i][name] = "Invalid email address";
      }
    } else if(name=="country_id"){
      Speakername[i][name] = value;
    }
    else if(name=="interest"){
      Speakername[i][name] = value;
    }
    else if(name=="hospital"){
      Speakername[i][name] = value;
    }
    else if(name=="profession"){
      Speakername[i][name] = value;
    }
    else if(name=="content_type"){
      Speakername[i][name] = value;
    }
    setSpeakerNameErr([...SpeakernameErr]);
  };
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
    handleGetCountry()
  }, []);

    const getData=()=>{
        ExportApi.GetSmartListSingleRecord(props.smartListId)
        .then((resp) => {
          if (resp.data) {
            // console.log("Ghbv",resp.data.data)
            setEditList(resp.data.data)
            
          }
        })
    }
  const handleClose = () => {
    setShow(false);
    setCounter([0]);
    setCounterData([]);
  };
  const handleShow = () => {
    setIsOpenAdd(true);
    setIsOpenAddModal(true)
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
      // console.log(validator2.errorMessages);
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
        const email = document.getElementById("field_email" + id).innerText;
        const content_type = document.getElementById("content_type" + id).value;

      // console.log(name_edit);
// console.log("email",email)
      var arr = [];
      arr.push({
        id: id,
        name: name_edit,
        country_id: "",
        hospital: "",
        email: email,
        profession: "",
        interest: "",
        consent: 0,
      });
            
      let prev_obj = editableData.find((x) => x.id === id);
      // console.log(prev_obj);

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
            message: "Your changes has been saved <br/>successfully !",
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

  const saveEditClicked = async (id) => {
   
    if(id==0){
    setEditable(0);
    // if (createData.length > 0) {
    //   createData.map((data) => {
    //     const name_edit = document.getElementById(
    //       "field_name" + data.id
    //     ).innerText;
    //     // const country = document.getElementById(
    //     //   "country" + data.id
    //     // ).value;
    //     console.log(data)
    //     const content_type = document.getElementById(
    //       "content_type" + data.id
    //     ).value;
    //     let prev_obj = editList.find((x) => x.id === data.id);
    //     //data.country = country_edit;
    //     data.name = name_edit;
    //     data.country = country;
    //     data.content_type = content_type;
    //   });
    // }

    if (createData.length > 0) {
      const body = {
        smart_list_id: props.smartListId,
        upload: "",
        participants: JSON.stringify(createData),
        // participants: editableData,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Token")}`,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      // loader("show");
      await axios
        .post(baseURL + `/smart-list/update-participants`, body, { headers })
        .then((res) => {
          // console.log(res);

          if (res.data.code == 200) {
            popup_alert({
                  visible: "show",
                  message: "Data updated <br> successfully",
                  type: "error",
                  redirect: "/webinar/email/WebinarSmartList",
                });
            // toast.success("Data updated successfully");
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
    }if(editableData.length>0){
      if (editableData.length > 0) {
        editableData.map((data) => {
          // console.log("is_register",data)
          const name_edit = document.getElementById(
            "field_name" + data.id
          ).innerText;
          const country = document.getElementById(
            "country" + data.id
          ).value;
          const content_type = document.getElementById(
            "content_type" + data.id
          ).value;
          const register = document.getElementById(
            "is_register" + data.id
          ).innerText;
          // const register = props.data?.filter((item)=>{item.id===data.id})
  
          // console.log("eeee",register)
  
          let prev_obj = editList.find((x) => x.id === data.id);
          //data.country = country_edit;
          data.name = name_edit;
          data.country_id = country;
          data.content_type = content_type;
           data.is_register=register
        });
      }
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
        .post(baseURL + `/smart-list/update-participants`, body, { headers })
        .then((res) => {
          // console.log(res);

          if (res.data.code == 200) {
            props?.getData()
            // popup_alert({
            //       visible: "show",
            //       message: "Data updated <br> successfully",
            //       type: "error",
            //       redirect: "/webinar/email/WebinarSmartList",
            //     });
            setNewReaders([])
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
    }if(props.upload_by_filter=="0"){
      popup_alert({
        visible: "show",
        message: "Data updated <br> successfully",
        type: "error",
        redirect: "/webinar/email/WebinarSmartList",
      });
    }
     else {
      // toast.warning("No update");
      setSaveOpen(false);
    }
  }else{
    setEditable(0);
    if (editableData.length > 0) {
      editableData.map((data) => {
        // console.log("is_register",data)
        const name_edit = document.getElementById(
          "field_name" + data.id
        ).innerText;
        const country = document.getElementById(
          "country" + data.id
        ).value;
        const content_type = document.getElementById(
          "content_type" + data.id
        ).value;
        const register = document.getElementById(
          "is_register" + data.id
        ).innerText;

        let prev_obj = editList.find((x) => x.id === data.id);

        //data.country = country_edit;
        data.name = name_edit;
        data.country_id = country;
        data.content_type = content_type;
        data.is_register=register
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
        .post(baseURL + `/smart-list/update-participants`, body, { headers })
        .then((res) => {
          // console.log(res);

          if (res.data.code == 200) {
            popup_alert({
                  visible: "show",
                  message: "Data updated <br> successfully",
                  type: "error",
                  redirect: "/webinar/email/WebinarSmartList",
                });
            // toast.success("Data updated successfully");
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
      setCreateData(editableData)
      //  setEditableData([]);
      // setEditList(editList);
    } else {
      toast.warning("No update");
      setSaveOpen(false);
    }
    setSaveOpen(false);
  }
  };
  const saveEditClickedView = async (id) => {
    setEditable(false)
    // console.log(editable)
   if(id==0){
    // alert(0)
    if (editableData.length > 0) {
      // console.log(editableData)
      editableData.map((data,i) => {
        // console.log("daaaata",data)
        const name_edit = document.getElementById(
          "field_name" + data.id
        ).innerText;
        const country = document.getElementById(
          "country" + data.id
        ).value;
        const content_type = document.getElementById(
          "content_type" + data.id
        ).value;
        const register = document.getElementById(
          "is_register" + data.id
        ).innerText;
       
        delete data.country;
        let prev_obj = editList.find((x) => x.id === data.id);
            // console.log("sdsssssfs",country)
        //data.country = country_edit;
        data.name = name_edit;
            data.country_id = country;
        data.content_type = content_type;
         data.is_register=register
      });
    }

    if (editableData.length > 0) {
      const body = {
        smart_list_id: props.smartListId,
        upload: "",
        participants: JSON.stringify(editableData),
        // participants: editableData,
      };
      // setEditable(0)
      const headers = {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Token")}`,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      // loader("show");
      // alert(1)
      await axios
        .post(baseURL + `/smart-list/update-participants`, body, { headers })
        .then((res) => {
          if (res.data.code == 200) {
            if(  location.pathname ===
              `/webinar/email/smart-list-view/${localStorage.getItem("SmartListIdView")}`){
                props.getData()
                popup_alert({
                  visible: "show",
                  message: "Data updated <br> successfully",
                  type: "error",
                  // redirect: "/webinar/email/WebinarSmartList",
                });
              }else{
                getData()
                setNewReaders([])
                toast.success("Data updated  successfully")
                props.saveAlert(true)

              }
              setEditable(0)
            // toast.success("Data updated successfully");
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
      setCreateData(editableData)
      //  setEditableData([]);
      // setEditList(editList);
    } else {
      toast.warning("No update");
      setSaveOpen(false);
    }
    setSaveOpen(false);
  
  }else{
  

    setSaveOpen(false);
  }

  }

  const handleGetCountry = () => {
    ExportApi.GetCountryData().then((resp) => {
      if (resp.ok) {
        setCountry(resp.data.data);
      }
    });
  };
  const closeClicked = () => {
    setSaveOpen(false);
    setEditable(0);
    let vr = editList;
    setEditList([]);
    setTimeout(() => {
      setEditList(vr);
      // console.log("This will run after 1 second!");
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
    // console.log(hpc);

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
      // console.log("validator3");
      // console.log(validator3);
      // console.log(validator3.errorMessages);
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
      .post(baseURL + `/smart-list/delete-participants`, body, {
        headers,
      })
      .then((res) => {
        // console.log(res);
   popup_alert({
        visible: "show",
        // message: "Please keep atleast one reader or delete the smart list",
        message: "Data deleted successfully.",
        type: "error",
        // redirect: "",
      });
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
  const NewdeleteReader = async (id,i) => {
    const body = {
      smart_list_id: props.smartListId,

      participant_id: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(baseURL + `/smart-list/delete-participants`, body, {
        headers,
      })
      .then((res) => {
        // console.log(res);
     let datanew=  getNewReaders.splice(1,i)
     setNewReaders(datanew)
   popup_alert({
        visible: "show",
        // message: "Please keep atleast one reader or delete the smart list",
        message: "Data deleted successfully.",
        type: "error",
        // redirect: "",
      });
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const onDelete = async ({ participants_id }) => {
    if (editList.length > 1) {
      setIsOpen(true);
      setProfileUserId(participants_id);
    } else {
      popup_alert({
        visible: "show",
        message: "Please keep atleast one reader or delete the smart list",
        type: "error",
        // redirect: "",
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
    // console.log("back clicked");
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

      // console.log(status);

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
    // 1-3=5
    // 4-6=10
    // 7-9=15
    // 10-12=20
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
    // console.log("hi");
    //console.log(readers);
    let normalArr = [];
    normalArr = editList;
    if (sorting === 0) {
      normalArr.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0
      );
      setSortingCount(0)
    } else {
      normalArr.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() < a.name.toLowerCase()
          ? -1
          : 0
      );
      setSortingCount(1)
    }

    setEditList(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const deleteNewlyAdded = (id,index) => {
      // setIsOpen(true);
      setProfileUserId(id);
      NewdeleteReader(id,index)
    // const dataUpdated = data.filter((d) => {
    //   return d.profile_user_id != profile_user_id;
    // });
    // props.sendDataToParent(dataUpdated, "new");
    // setNewReaders(dataUpdated);
  };
  return (
    <>
        <div className="loader" id="custom_loader">
          <span className="loader-view"> </span>
        </div>
        <div className="page-top-nav smart_list_names">
          {props.active==1?
          <div className="row justify-content-end align-items-center">
          <div className="table-title">
          <div className="header-btn-left">
                <button
                class="btn btn-primary btn-filled back"
                onClick={() => {
                  navigate("/webinar/email/WebinarSmartList");
                }}
              >Back
                {/* <svg
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
                </svg> */}
              </button>
                </div>

            <div className="selected-hcp-table-action">
              {editable == false ? (
                <>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-outline-primary"
                    table="table-to-xls"
                    filename="sample"
                    sheet="tablexls"
                    buttonText="Download "
                  />
                  {/* {props.active=="0"?null:   <div className="hcp-new-user">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleShow}
                    >
                      <img src={path + "new-user.svg"} alt="New User" />
                    </button>
                  </div>} */}
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
                  <div className="hcp-sort">
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
                  </div>
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
                    onClick={()=>{props.upload_by_filter=="001"?saveEditClickedView(0):props.upload_by_filter=="1"?saveEditClicked(0):saveEditClicked(1)}}
                  >
                    Save
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div className="row justify-content-end align-items-center">
            <div style={{paddingBlock:"20px"}}></div>
            <div className="col-12 col-md-10">
              <div className="page-title">
                <h4>{props.name } | { editList?.length?editList?.length:0}</h4>
              </div>
            </div>
            <div className="col-12 col-md-2">
            {/* {editable == false ? (
                <>
                  <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p className="show_less">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
                    )}{" "}
                       </a>
                    </> ):null} */}
            </div>  
        {/* <div className="smart-list-name-drop">
        <h5>Please select who to include to your smart list.You can pick one or more:</h5>
        </div> */}
          </div>
        </div>:null}
       
            {props.upload_by_filter=="001"?null:props.upload_by_filter=="1"?null:<div className="row justify-content-end align-items-center">
              <div className="col-12 col-md-1">
                <div className="header-btn-left">
                <button
                class="btn btn-primary btn-filled back"
                onClick={() => {
                  navigate("/webinar/email/SmartListCreate");
                }}
              > Back
                {/* <svg
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
                </svg> */}
              </button>
                </div>
              </div>
              <div className="col-12 col-md-8">
                <ul className="tabnav-link">
                  <li className="">
                    <a href="javascript:void(0)">Create smart List</a>
                  </li>
                  <li className="active active-main">
                    <a href="javascript:void(0)">Verify Your List</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-3">
                {saveOpen==false?<> <div className="header-btn">
                <button
                class="btn btn-outline-primary"
                onClick={() => navigate("/webinar/email/WebinarSmartList")}
              >
                cancel
              </button>
                  <button
                    className="btn btn-primary btn-filled create"
                     onClick={()=>saveEditClicked(0)}
                  >
                  Create
                
                  </button>
                </div></>:null}
               
              </div>
            </div>}
          </div>
          <br/>
        <ToastContainer />
        <section className="search-hcp smart-list-view">
        <div className="result-hcp-table">
        {props.active==1?  null:
          <div className="table-title">
            {props.upload_by_filter == 0 ? (
              <h4>
                Uploaded HCPs for the smart list
                <span>| {editList?.length> 0 ? editList?.length : 0}</span>
              </h4>
            ) : ( <div className="header-btn-left">
              {location.pathname ==
     `/webinar/email/editSmartList/${localStorage.getItem("SmartListIdView")}/${localStorage.getItem("SmartListIdViewName")}/${localStorage.getItem("SmartListIdViewN")}`? null:  <button
     class="btn  btn-filled back"
     onClick={() => {
       navigate("/webinar/email/WebinarSmartList");
     }}
   > Back
     {/* <svg
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
     </svg> */}
   </button>}
           
              <h4>Selected HCPs for the smart list</h4></div>
            )}

            <div className="selected-hcp-table-action">
              {editable == false ? (
                <>
                  {" "}
                  {/* <a
                    className="show-less-info"
                    onClick={(e) => showMoreInfo(e)}
                  >
                    {showLessInfo == true ? (
                      <p className="show_more">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
                    )}{" "}
                  </a> */}
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-outline-primary"
                    table="table-to-xls"
                    filename="readers-list"
                    sheet="tablexls"
                    buttonText="Download "
                  />
                  {<div className="hcp-new-user">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleShow}
                    >
                      <img src={path + "new-user.svg"} alt="New User" />
                    </button></div>}
                
                  
                  <div className="hcp-added">
                    <button
                      className="btn btn-outline-primary"
                      onClick={editButtonClicked}
                    >
                      <img src={path + "edit-button.svg"} alt="Edit" />
                    </button>
                  </div>
                  <div className="hcp-sort">
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
                  </div>
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
                  {props.active==1?  
                  <button
                    className="btn btn-primary btn-bordered"
                    onClick={()=>{saveEditClicked(1)}}
                  >
                    Save
                  </button>: <button
                    className="btn btn-primary btn-bordered"
                    onClick={()=>{props.upload_by_filter=="001"?saveEditClickedView(0):props.upload_by_filter=="1"?saveEditClickedView(0):saveEditClicked(1)}}
                  >
                    Save
                  </button>}
                </>
              ) : null}
            </div>
          </div>}
          <div className="selected-hcp-list">
            <table className="table" id="table-to-xls">
              <thead className="sticky-header">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  {/* <th scope="col">Bounced</th> */}
                  <th scope="col">Country</th>
                  {/* <th scope="col">Business Unit</th> */}
                  <th scope="col">Contact Type</th>
                  {/* {showLessInfo == false ? (
                    <>

                      <th scope="col">Consent</th>
                      <th scope="col">Email Received</th>
                      <th scope="col">Openings</th>
                      <th scope="col">Registrations</th>
                      <th scope="col">Last Email</th>
                      <th scope="col"></th>
                    </>
                  ) : null} */}
                </tr>
              </thead>
              <tbody>
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders.length > 0 &&
                  getNewReaders?.map((item, index) => {                    
                  return  <tr
                    className="hcps-added"
                    id={`row-selected` + item.is_register}
                    value={0}
                    onClick={(e) =>
                      editing(
                        //  e.currentTarget,
                        item.id,
                        item.email,
                        item.name,
                        index
                        )
                      }
                      >
                      {/* {console.log( item)} */}
                      <td contenteditable={editable === 0 ? "false" : "true"} id={`field_name` + item.id}>
                        {inEditMode.status &&
                        inEditMode.rowKey === item.profile_id ? (
                          <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        ) : (
                          item.name.charAt(0).toUpperCase() +  item.name.slice(1)
          
                        )}
                      </td>
                      <td id={`is_register` + item.id} style={{display:"none"}}>{0}</td>
                      <td id={`field_email` + item.id}>
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
                      <td>
                      {
                        editable?
                        <select
                        id={`country` + item.id}
                        name="Country"
                        className="form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        defaultValue={item.country_id}
                      >
                        <option value="">Select Country</option>
                        {country?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option key={i} value={val.id}>
                              {val.country}
                            </option>
                          </React.Fragment>
                        ))}
                    
                      </select> : <span>{item.country}</span>
                      }
                      </td>
                      <td>
                        {
                          editable ?     <div className="user-type-option">
                          <Form.Select
                          id={`content_type` + item.id}
                            className="form-select"
                            defaultValue={item.type}
                            // key={i}
                          >
                            <option value="HCP">HCP</option>
                            <option value="Staff User">Staff User</option>
                            <option value="Test User">Test User</option>
                          </Form.Select>
                        </div> : <span>{item.type}</span>
                        }
                      </td>

                      {/* {showLessInfo == false ? (
                        <td>
                          <span>{item.consent}</span>{" "}
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_received}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_opening}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.registration}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.last_email}</span>
                        </td>
                      ) : null} */}

                      <td className="delete_row" colspan="12">
                    
                        <img
                          src={path + "delete.svg"}
                          alt="Delete Row"
                          onClick={() => deleteNewlyAdded(item.id,index)}
                        />
                      </td>
                    </tr>
})}
                {typeof getNewReaders !== "undefined" &&
                  getNewReaders.length > 0 && (
                    <tr className="seprator-add">
                      <td colspan="13"></td>
                    </tr>
                  )}
                {typeof editList !== "undefined" &&
                  editList.length > 0 &&
                  editList?.map((item, index) => (
                    <tr
                      id={`row-selected` + item.is_register}
                        value={item.is_register}
                      onClick={(e) =>
                        editing(
                          //  e.currentTarget,
                          item.id,
                          item.email,
                         item.name,
                         index
                        )
                      }
                    >
                      {/* {console.log("item",item)} */}

                            <td
                              id={`field_name` + item.id}
                              contenteditable={
                                editable === 0 ? "false" : "true"
                              }
                            >
                              <span>{props.upload_by_filter=="1"&&props.active=="0"?item?.name.charAt(0).toUpperCase() +  item?.name.slice(1): item?.name.charAt(0).toUpperCase() +  item?.name.slice(1)}</span>
                            </td>

                      <td id={`field_email` + item.id}>{props.upload_by_filter=="1"&&props.active=="0"?item?.email:item?.email}</td>
                      {/* <input type="hidden" id={`field_index` + item.profile_user_id} value={index} />
                      <td id={`field_bounced` + item.profile_user_id}>{item.bounce}</td> */}
                      <td>
                        {/* {console.log(item)} */}
                      {
                        editable ?  <select
                        id={`country` + item.id}
                        name="Country"
                        className="form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        defaultValue={item.country_id}
                      >
                        
                        <option value="">Select Country</option>
                        {country?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option key={i} value={val.id}>
                              {val.country}
                            </option>
                          </React.Fragment>
                        ))}
                    
                      </select> : <span>{item.country}</span>
                      }
                      </td>
                      {/*showLessInfo == false ? (
                        <td id="field_readers">NA</td>
                      ) : null*/}
                      {/* <td id="field_business_unit">{item.ibu}</td> */}
                      <td id={`is_register` + item.id} style={{display:"none"}}>{item.is_register}</td>
                      <td id="field_interest">
                      {
                        editable ?    <div className="user-type-option">
                        <Form.Select
                        id={`content_type` + item.id}
                          className="form-select"
                          defaultValue={item.type}
                          // key={i}
                        >
                          <option value="HCP">HCP</option>
                          <option value="Staff User">Staff User</option>
                          <option value="Test User">Test User</option>
                        </Form.Select>
                      </div> : <span>{props.upload_by_filter=="1"&&props.active=="0"?item?.type:item?.content_type?item?.content_type:item?.type}</span>
                      }
                      </td>
                      {/* http://webinarapi.shinedezign.pro/api/participants?page=2
                      http://webinarapi.shinedezign.pro/api/participants?page=2 */}
                      {/* {showLessInfo == false ? (
                        <td>
                          <span>{item.consent}</span>{" "}
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_received}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.email_opening}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.registration}</span>
                        </td>
                      ) : null}
                      {showLessInfo == false ? (
                        <td>
                          <span>{item.last_email}</span>
                        </td>
                      ) : null} */}


                      <td
                        className="delete_row"
                        colspan="12"
                        onClick={() =>
                          onDelete({
                            participants_id: item.id,
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
          {/* <div class="selected-hcp-table-action">
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
          </div> */}
          {/* <div class="result-hcp-table">
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
          </div> */}

        </section>
        <Modal
          id="add_hcp"
          show={isOpenAddModal}
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
                  setIsOpenAddModal(false);
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
                  <form
                    id="add_hcp_form"
                    className={"tab-pane active"}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (handleError()) {
                        let rehearsalSpeakername = JSON.stringify(Speakername);
                        ExportApi.EmailSand(props.smartListId, rehearsalSpeakername)
                          .then((resp) => {
                            if (resp.data) {
                         
                              if (resp.data.code == 200) {
                                resp.data.data.map((item)=>{
                                  setNewReaders((oldArray) => [...oldArray,item]);

                                })
                                // setNewReaders(...getNewReaders,Speakername)
                                // setEditList(resp.data.data)
                                // console.log(resp.data);
                                setIsOpenAddModal(false);
                                toast.success(resp.data.message);
                                // ExportApi.GetSmartListSingleRecord(props.smartListId, rehearsalSpeakername)
                                // .then((resp) => {
                                //   if (resp.data) {
                                //     setNewReaders(...getNewReaders,Speakername)
                                //     setEditList(resp.data.data)
                                //     setIsOpenAddModal(false);
                                //     toast.success(resp.data.message);
                                //   }
                                // })
                                // handleGetSmartListSingleRecord(parms.id);
                                //  Speakername.map((val)=>editList.push(val))
                                // setIsOpenAddModal(false);
                                // toast.success(resp.data.message);
                              } else {
                                loader("hide");
                                toast.error(resp.data.message, {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                });
                              }
                            }
                          })
                  
                          .catch((err) => {
                            toast.error("Something went wrong")
                            // loader("hide");
                          });
                      }
                    }}
                  >
                                      {Speakername?.map((val, i) => (
                    <>
                    <div className="add_hcp_boxes" div key={i}>
                      <div className="form_action">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for=""> Name *</label>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={(e) => handleOnChange(e, i)}
                                value={val.name}
                              />
                                <div className="error" style={{ color: "red" }}>
                                      {SpeakernameErr[i]?.name}
                                   
                                </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Email *</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email-desc"
                                name="email"
                                onChange={(e) => handleOnChange(e, i)}
                                value={val.email}
                              />
                                <div className="error" style={{ color: "red" }}>
                                      {SpeakernameErr[i]?.email}
                                   
                                </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Hospital</label>
                              <input
                                className="form-control"
                                name="hospital"
                                onChange={(e) => handleOnChange(e, i)}
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
                                name="profession"
                                onChange={(e) => handleOnChange(e, i)}
                                value={val.profession}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Country</label>
                              <select
                                name="country_id"
                                className="country-form"
                              onChange={(e) => handleOnChange(e, i)}
                            //  value={val.country}
                                aria-label="select"
                              >
                                <option selected>Select Country</option>
                                {country?.map((val, i) => (
                                  <React.Fragment key={i}>
                                    <option key={i} value={val.id}>
                                      {val.country}
                                    </option>
                                  </React.Fragment>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Content Type</label>
                          < select
                          name="content_type"
                          className="country-form"
                          aria-label="select"
                          profession onChange={(e) => handleOnChange(e, i)}
                          value={val.content_type}
                          // key={i}
                        >
                          <option value="HCP">HCP</option>
                          <option value="Staff User">Staff User</option>
                          <option value="Test User">Test User</option>
                        </select>
                        </div>
                        </div>
                          <div className="col-12 col-md-6">
                            <div className="form-group">
                              <label for="">Interest</label>
                              <input
                                name="interest"
                                onChange={(e) => handleOnChange(e, i)}
                                value={val.interest}
                                type="text"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hcp-modal-action">
                              <div className="hcp-action-block">
                              {Speakername.length > 1 ? (
                                        <div className="hcp-remove">
                                          <button
                                          type="button"
                                          className="btn btn-filled"
                                          onClick={() => {
                                            handleMultiInputRemove(i);
                                          }}
                                          >
                                            <img src={path_image + "delete.svg"} alt="Add More" />
                                          </button>
                                        </div>
                              ) : null}

                          

                                <ul className="nav nav-tabs" role="tablist">
                                  <li className="nav-item add_hcp">
                                    <a
                                       onClick={handleMultiInputAdd}
                                      className="nav-link active btn-bordered"
                                      data-bs-toggle="tab"
                                      href="javascript:;"
                                    >
                                      Add HCP +
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                    </div>
                    </>))}
                    <button
                      type="submit"
                      className="btn btn-primary save btn-filled"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      <Modal show={isOpen} className="send-confirm" id="delete-smartlist">
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
            The record will be deleted from the list.
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
