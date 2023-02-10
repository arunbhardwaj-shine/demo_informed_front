import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleReactValidator from "simple-react-validator";
import { loader } from "../../../loader";
import EditCountry from "../../CommonComponent/EditCountry";
import EditContactType from "../../CommonComponent/EditContactType";

import { toast } from "react-toastify";

import { connect } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { popup_alert } from "../../../popup_alert";
import DropdownButton from "react-bootstrap/DropdownButton";
import Select, { createFilter } from "react-select";
import makeAnimated from "react-select/animated";
const ViewTable = (props) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const filterConfig = {
    matchFrom: "start",
  };
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
  const [siteNameAll, setSiteNameAll] = useState([]);
  const [siteStreetAll, setSiteStreetAll] = useState([]);
  const [siteCityAll, setSiteCityAll] = useState([]);
  const [saveOpen, setSaveOpen] = useState(false);
  const [siteNumber, setSiteNumber] = useState("");
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
  const [siteNumberAll, setSiteNumberAll] = useState([]);

  const [profile_user_id, setProfileUserId] = useState();

  const [reRenders, setReRenders] = useState(0);

  const [validator3Counter, setValidator3Counter] = useState(0);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [activeManual, setActiveManual] = useState("active");
  const [sitePostalCodeAll, setSitePostCodeAll] = useState([]);
  const [newData, setNewData] = useState([]);
  const [showLessUpdate, setShowLessUpdate] = useState(0);
  const [activeExcel, setActiveExcel] = useState("");
  const [editableData, setEditableData] = useState([]);
  const [siteIrtAll, setSiteIrtAll] = useState([]);
  const animatedComponents = makeAnimated();
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
      let body = {
        user_id: localStorage.getItem("user_id"),
      };
      await axios
        .post(`distributes/filters_list`, body)
        .then((res) => {
          if (res.data.status_code == 200) {
            let user_type;
            let sub_role;
            let blind_type;
            let arrUserType;
            let arrSubRole;
            let arrBlindType;
            let site_number;
            let arrSiteNumber;
            let country = res.data.response.data.country;
            let site_name;
            let arrSiteName;
            let site_street;
            let arrSiteStreet;
            let site_postcode;
            let site_city;
            let arrSiteCity;
            let arrSitePostCode;
            let arrSiteIrt;

            let arr = [];
            console.log("outside");
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              console.log("inside");
              console.log(res);
              user_type = res.data.response.data.investigator_type;
              sub_role = res.data.response.data.sub_role;
              blind_type = res.data.response.data.blind_type;
              site_number = res.data.response.data.site_number;
              site_name = res.data.response.data.site_name;
              site_street = res.data.response.data.site_street;
              site_postcode = res.data.response.data.site_post_code;
              site_city = res.data.response.data.site_city;

              arrUserType = [];
              arrSubRole = [];
              arrBlindType = [];
              arrSiteNumber = [];
              arrSiteName = [];
              arrSiteStreet = [];
              arrSitePostCode = [];
              arrSiteCity = [];
              arrSiteIrt = [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ];
            }

            //  const data = Object.assign({}, res.data.response.data.blind_type);
            //console.log(data);

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

            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              Object.entries(site_number).map(([index, item]) => {
                let label = item;

                arrSiteNumber.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_street).map(([index, item]) => {
                let label = item;

                arrSiteStreet.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_city).map(([index, item]) => {
                let label = item;

                arrSiteCity.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_postcode).map(([index, item]) => {
                let label = item;

                arrSitePostCode.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(site_name).map(([index, item]) => {
                let label = item;

                arrSiteName.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(user_type).map(([index, item]) => {
                let label = item;

                arrUserType.push({
                  value: item,
                  label: label,
                });
              });

              Object.entries(sub_role).map(([index, item]) => {
                let label = item;

                arrSubRole.push({
                  value: item,
                  label: label,
                });
              });
              Object.entries(sub_role).map(([index, item]) => {
                let label = item;

                arrSubRole.push({
                  value: item,
                  label: label,
                });
              });
              Object.entries(blind_type).map(([index, item]) => {
                let label = item;

                arrBlindType.push({
                  value: item,
                  label: label,
                });
              });
            }

            setCountryall(arr);
            if (localStorage.getItem("user_id") == "56Ek4feL/1A8mZgIKQWEqg==") {
              console.log(arrUserType);
              setUserTypeAll(arrUserType);
              setSubUserTypeAll(arrSubRole);
              setSiteNumberAll(arrSiteNumber);
              setSiteNameAll(arrSiteName);
              setSiteStreetAll(arrSiteStreet);
              setSitePostCodeAll(arrSitePostCode);
              setSiteCityAll(arrSiteCity);
              setSiteIrtAll(arrSiteIrt);
              //console.log(res.data.response.data.blind_type);
              setBlindTypeAll(arrBlindType);
            }

            // setCountryall(res.data.response.data.country);
          }
          // let country_opt = res.data.response.data.country;
          // var country_options = "<option>Select Country</option>";
          //   Object.entries(country_opt).map((item) => {
          //     let opt = "<option>"+item[0]+"</option>";
          //     country_options = country_options+opt;
          //   });
          //
          //   let x=document.querySelectorAll(".country-form_edit");  // Find the elements
          //     [].forEach.call(x, function(op) {
          //       op.innerHTML = country_options;
          //       op.value = op.getAttribute("data-id");
          //     });
          //     loader("hide");
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
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
      userType: "",
      userTypeIndex: "",
      subUserType: "",
      siteNumber: "",
      subUserTypeIndex: "",
      siteNumberIndex: "",
      blindType: "",
      blindTypeIndex: "",
      sitePostCode: "",
      sitePostCodeIndex: "",
      siteCity: "",
      siteCityIndex: "",
      siteStreet: "",
      siteStreetIndex: "",
      siteName: "",
      siteNameIndex: "",
      siteIrt: "",
      siteIrtIndex: "",

      // siteDetails: [
      //   {
      //     siteNumber: "",
      //     siteName: "",
      //     siteStreet: "",
      //     sitePostCode: "",
      //     siteCity: "",
      //   },
      // ],
    },
  ]);

  const [siteCity, setSiteCity] = useState("");

  const [sitePostCode, setSitePostCode] = useState("");

  const [siteStreet, setSiteStreet] = useState("");

  const [siteName, setSiteName] = useState("");
  const [renderCounterData, setCounterData] = useState([]);

  const [countryall, setCountryall] = useState([]);
  const [userTypeAll, setUserTypeAll] = useState([]);
  const [subUserTypeAll, setSubUserTypeAll] = useState([]);
  const [blindTypeAll, setBlindTypeAll] = useState([]);
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
        countryIndex: "",
        siteDetails: [
          {
            siteNumber: "",
            siteName: "",
            siteStreet: "",
            sitePostCode: "",
            siteCity: "",
          },
        ],
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
    let new_add_arr = newData;
    setEditList([]);
    setNewData([]);
    setTimeout(() => {
      setEditList(vr);
      setNewData(new_add_arr);
      console.log("This will run after 1 second!");
      setUpdateCounter(updateCounter + 1);
    }, 50);
  };

  //useEffect(() => {}, [editList]);

  useEffect(() => {
    setEditList(props.data);
  }, [props.api_flag]);

  useEffect(() => {
    setNewData([]);
    const showFileInList = async () => {
      const profile_user_id_array = editList.map((data) => {
        return data.profile_user_id;
      });
      const body = {
        user_list: profile_user_id_array,
        smart_list_id: getlistid,
        user_id: localStorage.getItem("user_id"),
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

          if (res.data.status_code === 200) {
            popup_alert({
              visible: "show",
              message: "Your changes has been saved <br/> successfully !",
              type: "success",
              redirect: "/SmartList",
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

    console.log(list);

    list.splice(i, 1);

    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();

    setShowLessInfo(!showLessInfo);
  };

  const addMoreHcp = (e) => {
    e.preventDefault();
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
          countryIndex: "",
          userType: "",
          userTypeIndex: "",
          subUserType: "",
          subUserTypeIndex: "",
          blindType: "",
          blindTypeIndex: "",
          siteNumber: "",
          siteName: "",
          siteStreet: "",
          sitePostCode: "",
          siteCity: "",
          siteNumberIndex: "",
          siteNameIndex: "",
          siteStreetIndex: "",
          sitePostCodeIndex: "",
          siteCityIndex: "",
          siteIrt: "",
          siteIrtIndex: "",
        },
      ]);
    } else {
      toast.warning("Please input the email atleast");
    }
  };

  const addMoreSite = (i, e) => {
    e.preventDefault();

    let old_hpc = hpc;
    old_hpc[i].siteDetails.push({
      siteNumber: "",
      siteName: "",
      siteStreet: "",
      sitePostCode: "",
      siteCity: "",
    });

    setHpc(old_hpc);
    setUpdate(update + 1);
  };
  const removeSite = (index, i, e) => {
    e.preventDefault();

    let old_hpc = hpc;
    old_hpc[i].siteDetails.splice(index, 1);

    setHpc(old_hpc);
    setUpdate(update + 1);
  };

  const addHcp = () => {
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const saveEditClicked = async () => {
    setEditable(0);
    if (editableData.length > 0) {
      editableData.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data.profile_user_id
        ).innerText;
        const country_edit = document.getElementById(
          "field_country" + data.profile_user_id
        ).value;
        const edit_index = document.getElementById(
          "field_index" + data.profile_user_id
        ).value;
        const contact_type_edit = document.getElementById(
          "field_contact_type" + data.profile_user_id
        ).value;

        let prev_obj = editList.find(
          (x) => x.profile_user_id === data.profile_user_id
        );
        if (typeof prev_obj != "undefined") {
          if (typeof editList[edit_index] != "undefined") {
            editList[edit_index].country = country_edit;
          }
          if (typeof editList[edit_index] != "undefined") {
            editList[edit_index].contact_type = contact_type_edit;
          }
        } else {
          if (typeof newData[edit_index] != "undefined") {
            newData[edit_index].country = country_edit;
          }
          if (typeof newData[edit_index] != "undefined") {
            newData[edit_index].contact_type = contact_type_edit;
          }
        }

        data.country = country_edit;
        data.username = name_edit;
        data.contact_type = contact_type_edit;
      });
    }

    if (editableData.length > 0) {
      const body = {
        user_id: localStorage.getItem("user_id"),
        edit_list_array: editableData,
      };

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`distributes/update_reders_details`, body)
        .then((res) => {
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
      setEditableData([]);
    } else {
      setSaveOpen(false);
      toast.warning("No row update");
    }
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
      user_id: localStorage.getItem("user_id"),
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
    }
  };

  const deleteReader = async (profile_user_id) => {
    const body = {
      smart_list_id: getlistid,
      user_id: localStorage.getItem("user_id"),
      profile_user_id: profile_user_id,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`distributes/delete_reader`, body)
      .then((res) => {
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });

    const filtered_list_update = updateData.filter((data) => {
      return data.profile_user_id != profile_user_id;
    });

    const filtered_list = editList.filter((data) => {
      return data.profile_user_id != profile_user_id;
    });

    setUpdatedData(filtered_list_update);
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
    contact_type
  ) => {
    // let ignoreClickOnMeElement = document.getElementById(
    //   "row-selected" + index
    // );

    if (editable != 0) {
      // ignoreClickOnMeElement.addEventListener(
      //   "mouseleave",
      //   async (event) => {
      const name_edit = document.getElementById(
        "field_name" + profile_user_id
      ).innerText;
      const country_edit = document.getElementById(
        "field_country" + profile_user_id
      ).value;
      const contact_type_edit = document.getElementById(
        "field_contact_type" + profile_user_id
      ).value;

      var arr = [];
      arr.push({
        profile_id: profile_id,
        profile_user_id: profile_user_id,
        email: email,
        jobTitle: jobTitle,
        company: company,
        country: country_edit,
        username: name_edit,
        contact_type: contact_type_edit,
      });

      // if(editableData.length > 0){
      let prev_obj = editableData.find(
        (x) => x.profile_user_id === profile_user_id
      );
      if (typeof prev_obj != "undefined") {
        //update existing
        editableData.map(
          (obj) => arr.find((o) => o.profile_user_id === profile_user_id) || obj
        );
      } else {
        //create new
        setEditableData((oldArray) => [...oldArray, ...arr]);
      }
      // }else{
      //     //create new
      //     setEditableData((oldArray) => [...oldArray, ...arr]);
      // }
      // console.log(name_edit);
      // console.log(editableData);
      // },
      // { once: true }
      // );
    }

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
    //       user_id: localStorage.getItem("user_id"),
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
    if (updateData.length > 1) {
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
  const onSiteNumberChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteNumber = "";
      list[i].siteNumber = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteNumber;
      list[i].siteNumber = value;

      let index = siteNumberAll.findIndex((x) => x.value === value);
      list[i].siteNumberIndex = index;
      setHpc(list);
    }
    // e.preventDefault();
    // if (index != 0) {
    //   const { value } = e.target;
    //   const old_hpc = hpc;
    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);
    //   setUpdate(update + 1);
    // } else if (index == 0) {
    //   const { value } = e;
    //   const old_hpc = hpc;
    //   old_hpc[i].siteDetails[index].siteNumber = value;

    //   setHpc(old_hpc);
    //   setUpdate(update + 1);
    // }
  };

  const onSiteNameChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteName = "";
      list[i].siteName = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteName;
      list[i].siteName = value;

      let index = siteNameAll.findIndex((x) => x.value === value);
      list[i].siteNameIndex = index;
      setHpc(list);
    }
  };

  const onSiteStreetChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteStreet = "";
      list[i].siteStreet = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteStreet;
      list[i].siteStreet = value;

      let index = siteStreetAll.findIndex((x) => x.value === value);
      list[i].siteStreetIndex = index;
      setHpc(list);
    }
  };

  const onSiteIrtChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteIrt = "";
      list[i].siteIrt = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteIrt;
      list[i].siteIrt = value;

      let index = siteIrtAll.findIndex((x) => x.value === value);
      list[i].siteIrtIndex = index;
      setHpc(list);
    }
  };

  const onSiteCityChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].siteCity = "";
      list[i].siteCity = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].siteCity;
      list[i].siteCity = value;

      let index = siteCityAll.findIndex((x) => x.value === value);
      list[i].siteCityIndex = index;
      setHpc(list);
    }
  };

  const onSitePostCode = (e, i) => {
    // if (e == null) {
    //   const list = [...hpc];
    //   list[i].sitePostCode = "";
    //   list[i].sitePostCode = "";
    //   setHpc(list);
    // } else {
    const value = e.value;
    const list = [...hpc];
    const name = hpc[i].sitePostCode;
    list[i].sitePostCode = value;

    let index = sitePostalCodeAll.findIndex((x) => x.value === value);
    list[i].sitePostCodeIndex = index;
    setHpc(list);
  };

  const onContactTypeChange = (e, i) => {
    const value = e;
    // console.log(value);
    const list = [...hpc];
    const name = hpc[i].contact_type;
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
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].country;
      list[i].country = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].countryIndex = index;
      setHpc(list);
    }
  };

  const onUserTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].userType = "";
      list[i].userType = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].userType;
      list[i].userType = value;

      let index = countryall.findIndex((x) => x.value === value);
      list[i].userTypeIndex = index;
      setHpc(list);
    }
  };

  const onSubUserTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].subUserType = "";
      list[i].subUserType = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].subUserType;
      list[i].subUserType = value;

      let index = subUserTypeAll.findIndex((x) => x.value === value);
      list[i].subUserTypeIndex = index;
      setHpc(list);
    }
  };

  const onBlindTypeChange = (e, i) => {
    if (e == null) {
      const list = [...hpc];
      list[i].blindType = "";
      list[i].blindType = "";
      setHpc(list);
    } else {
      const value = e.value;
      const list = [...hpc];
      const name = hpc[i].blindType;
      list[i].blindType = value;

      let index = blindTypeAll.findIndex((x) => x.value === value);
      list[i].blindTypeIndex = index;
      setHpc(list);
    }
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
          investigator_type: data.userType ? data.userType : "",
          sub_roll: data.subUserType ? data.subUserType : "",
          blind_type: data.blindType ? data.blindType : "",
          siteNumber: data.siteNumber ? data.siteNumber : "",
          siteName: data.siteName ? data.siteName : "",
          siteStreet: data.siteStreet ? data.siteStreet : "",
          sitePostalCode: data.sitePostCode ? data.sitePostCode : "",
          siteCity: data.siteCity ? data.siteCity : "",
          siteIrt: data.siteIrt == "Yes" ? 1 : 0,
        };
      });
      console.log(body_data);
      var pattern = "^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$";

      const body = {
        data: body_data,
        user_id: localStorage.getItem("user_id"),
        smart_list_id: getlistid,
      };

      const status = body.data.map((data) => {
        if (data.email == "") {
          return "Please enter the email atleast";
        } else if (data.email != "") {
          let email = data.email;
          let useremail = email.trim();
          // var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          // if (!regex.test(String(useremail).toLowerCase())) {
          var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (regex.test(String(useremail).toLowerCase())) {
            let prev_obj = editList.find((x) => x.email === useremail);
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
              //toast.success("User added successfuly");
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
        toast.warning(status[0]);
      }
    } else {
      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
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
        toast.warning("Please add a excel file");
      }
    }
  };

  const uploadFile = async (event) => {
    if (validator2.allValid()) {
      setShowUploadMenu(!showUploadMenu);

      let formData = new FormData();
      let user_id = localStorage.getItem("user_id");
      formData.append("user_id", user_id);
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
      message: "The HCP record has been deleted <br/>successfully !",
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
                      <p className="show_more">Show More information</p>
                    ) : (
                      <p className="show_less">Show less information</p>
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
              {showReaders && !saveOpen ? (
                <div className="row">
                  <div className="col-md-12">
                    <button
                      className="btn btn-primary btn-filled next"
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
              <thead className="sticky-header">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Bounced</th>
                  <th scope="col">Country</th>
                  <th scope="col">Business Unit</th>
                  <th scope="col">Contact Type</th>
                  {showLessInfo == false ? (
                    <>
                      {" "}
                      <th scope="col">Consent</th>
                      <th scope="col">Email Received</th>
                      <th scope="col">Openings</th>
                      <th scope="col">Registrations</th>
                      <th scope="col">Last Email</th>
                      <th scope="col"></th>{" "}
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody className="form-group">
                {newData.map((item, index) => (
                  <tr
                    className="hcps-added"
                    onClick={(e) =>
                      editing(
                        item.profile_id,
                        item.profile_user_id,
                        item.email,
                        item.jobTitle,
                        item.company,
                        item.country,
                        item.first_name + " " + item.last_name,
                        item.contact_type
                      )
                    }
                  >
                    <td
                      contenteditable={editable === 0 ? "false" : "true"}
                      id={`field_name` + item.profile_user_id}
                    >
                      {inEditMode.status &&
                      inEditMode.rowKey === item.profile_id ? (
                        <input
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      ) : (
                        <span>{item.first_name + " " + item.last_name}</span>
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
                    <input
                      type="hidden"
                      id={`field_index` + item.profile_user_id}
                      value={index}
                    />
                    <td>{item.bounce}</td>
                    <td>
                      {editable ? (
                        <EditCountry
                          selected_country={item.country}
                          profile_user={item.profile_user_id}
                        ></EditCountry>
                      ) : (
                        <span>{item.country}</span>
                      )}
                    </td>
                    <td>{item.ibu}</td>
                    <td>
                      {editable ? (
                        <EditContactType
                          selected_ibu={item.contact_type}
                          profile_user={item.profile_user_id}
                        ></EditContactType>
                      ) : (
                        <span>{item.contact_type}</span>
                      )}
                    </td>
                    {showLessInfo == false ? (
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

                <tr className="seprator-add">
                  <td colspan="13"></td>
                </tr>

                {editList.map((item, index) => (
                  <tr
                    id={`row-selected` + index}
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
                        item.contact_type
                      )
                    }
                  >
                    <td
                      id={`field_name` + item.profile_user_id}
                      contenteditable={editable === 0 ? "false" : "true"}
                    >
                      <span> {item.first_name + " " + item.last_name} </span>
                    </td>

                    <td id={`field_email` + item.profile_user_id}>
                      {item.email}
                    </td>
                    <input
                      type="hidden"
                      id={`field_index` + item.profile_user_id}
                      value={index}
                    />
                    <td id={`field_bounced` + item.profile_user_id}>
                      {item.bounce}
                    </td>
                    <td>
                      {editable ? (
                        <EditCountry
                          selected_country={item.country}
                          profile_user={item.profile_user_id}
                        ></EditCountry>
                      ) : (
                        <span>{item.country}</span>
                      )}
                    </td>
                    <td id="field_business_unit">{item.ibu}</td>
                    <td id="field_interest">
                      {editable ? (
                        <EditContactType
                          selected_ibu={item.contact_type}
                          profile_user={item.profile_user_id}
                        ></EditContactType>
                      ) : (
                        <span>{item.contact_type}</span>
                      )}
                    </td>

                    {showLessInfo == false ? (
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
                    ) : null}

                    <td className="delete_row" colspan="12">
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
            <br /> Are you sure you want to delete it?{" "}
          </h4>

          <div className="modal-buttons">
            <button
              type="button"
              className="btn btn-primary btn-filled"
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
                    countryIndex: "",
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
                              <hr />
                              {localStorage.getItem("user_id") !=
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
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
                                      <div className="scroll_div">
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
                                      </div>
                                    </DropdownButton>
                                  </div>
                                </div>
                              ) : null}

                              {localStorage.getItem("user_id") !=
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <div className="col-12 col-md-6">
                                  <div className="form-group">
                                    <label for="">Country</label>
                                    <Select
                                      options={countryall}
                                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                      onChange={(event) =>
                                        onCountryChange(event, i)
                                      }
                                      defaultValue={
                                        countryall[hpc[i].countryIndex]
                                      }
                                      placeholder={
                                        typeof countryall[
                                          hpc[i].countryIndex
                                        ] === "undefined"
                                          ? "Select Country"
                                          : countryall[hpc[i].countryIndex]
                                      }
                                      filterOption={createFilter(filterConfig)}
                                      isClearable
                                    />
                                    {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                        title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                        onSelect={(event) => onCountryChange(event, i)}
                                        >
                                        <div className="scroll_div">
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                        </>
                                      );
                                    }
                                  )}
                                  </div>
                                  </DropdownButton>
                                    */}
                                  </div>
                                </div>
                              ) : null}

                              {localStorage.getItem("user_id") ==
                              "56Ek4feL/1A8mZgIKQWEqg==" ? (
                                <>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Roll</label>
                                      <Select
                                        options={userTypeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onUserTypeChange(event, i)
                                        }
                                        defaultValue={
                                          userTypeAll[hpc[i].userTypeIndex]
                                        }
                                        placeholder={
                                          typeof userTypeAll[
                                            hpc[i].userTypeIndex
                                          ] === "undefined"
                                            ? "Select User Type"
                                            : userTypeAll[hpc[i].userTypeIndex]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Sub Roll</label>
                                      <Select
                                        options={subUserTypeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSubUserTypeChange(event, i)
                                        }
                                        defaultValue={
                                          subUserTypeAll[
                                            hpc[i].subUserTypeIndex
                                          ]
                                        }
                                        placeholder={
                                          typeof subUserTypeAll[
                                            hpc[i].subUserTypeIndex
                                          ] === "undefined"
                                            ? "Select Sub User Type"
                                            : subUserTypeAll[
                                                hpc[i].subUserTypeIndex
                                              ]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                        //  isClearable
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Blind Type</label>
                                      <Select
                                        options={blindTypeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onBlindTypeChange(event, i)
                                        }
                                        defaultValue={
                                          blindTypeAll[hpc[i].blindTypeIndex]
                                        }
                                        placeholder={
                                          typeof blindTypeAll[
                                            hpc[i].blindTypeIndex
                                          ] === "undefined"
                                            ? "Select Blind Type"
                                            : blindTypeAll[
                                                hpc[i].blindTypeIndex
                                              ]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Number</label>
                                      <Select
                                        options={siteNumberAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNumberChange(event, i)
                                        }
                                        defaultValue={
                                          siteNumberAll[hpc[i].siteNumberIndex]
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
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // placeholder={
                                        //   typeof userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ] === "undefined"
                                        //     ? "Select User Type"
                                        //     : userTypeAll[
                                        //         hpc[i].userTypeIndex
                                        //       ]
                                        // }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Name</label>
                                      <Select
                                        options={siteNameAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteNameChange(
                                            event,

                                            i
                                          )
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        defaultValue={
                                          siteNameAll[hpc[i].siteNameIndex]
                                        }
                                        placeholder={
                                          typeof siteNameAll[
                                            hpc[i].siteNameIndex
                                          ] === "undefined"
                                            ? "Select Site Name"
                                            : siteNameAll[hpc[i].siteNameIndex]
                                        }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Street</label>
                                      <Select
                                        options={siteStreetAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteStreetChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteStreetAll[hpc[i].siteStreetIndex]
                                        }
                                        placeholder={
                                          typeof siteStreetAll[
                                            hpc[i].siteStreetIndex
                                          ] === "undefined"
                                            ? "Select Site Street"
                                            : siteStreetAll[
                                                hpc[i].siteStreetIndex
                                              ]
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // placeholder={
                                        //   typeof userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ] === "undefined"
                                        //     ? "Select User Type"
                                        //     : userTypeAll[
                                        //         hpc[i].userTypeIndex
                                        //       ]
                                        // }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site Post Code</label>
                                      <Select
                                        options={sitePostalCodeAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSitePostCode(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          sitePostalCodeAll[
                                            hpc[i].sitePostCodeIndex
                                          ]
                                        }
                                        placeholder={
                                          typeof sitePostalCodeAll[
                                            hpc[i].sitePostCodeIndex
                                          ] === "undefined"
                                            ? "Select Post Code"
                                            : sitePostalCodeAll[
                                                hpc[i].sitePostCodeIndex
                                              ]
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // placeholder={
                                        //   typeof userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ] === "undefined"
                                        //     ? "Select User Type"
                                        //     : userTypeAll[
                                        //         hpc[i].userTypeIndex
                                        //       ]
                                        // }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Site City</label>
                                      <Select
                                        options={siteCityAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteCityChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteStreetAll[hpc[i].siteStreetIndex]
                                        }
                                        placeholder={
                                          typeof siteCityAll[
                                            hpc[i].siteCityIndex
                                          ] === "undefined"
                                            ? "Select Site City"
                                            : siteCityAll[hpc[i].siteCityIndex]
                                        }
                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // placeholder={
                                        //   typeof userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ] === "undefined"
                                        //     ? "Select User Type"
                                        //     : userTypeAll[
                                        //         hpc[i].userTypeIndex
                                        //       ]
                                        // }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">IRT</label>
                                      <Select
                                        options={siteIrtAll}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onSiteIrtChange(
                                            event,

                                            i
                                          )
                                        }
                                        defaultValue={
                                          siteIrtAll[hpc[i].siteIrtIndex]
                                        }
                                        placeholder={
                                          typeof siteIrtAll[
                                            hpc[i].siteIrtIndex
                                          ] === "undefined"
                                            ? "Select Site IRT"
                                            : siteIrtAll[hpc[i].siteIrtIndex]
                                        }

                                        // onChange={(event) =>
                                        //   onUserTypeChange(event, i)
                                        // }
                                        // defaultValue={
                                        //   userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ]
                                        // }
                                        // placeholder={
                                        //   typeof userTypeAll[
                                        //     hpc[i].userTypeIndex
                                        //   ] === "undefined"
                                        //     ? "Select User Type"
                                        //     : userTypeAll[
                                        //         hpc[i].userTypeIndex
                                        //       ]
                                        // }
                                        // filterOption={createFilter(filterConfig)}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-6">
                                    <div className="form-group">
                                      <label for="">Country</label>
                                      <Select
                                        options={countryall}
                                        className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                                        onChange={(event) =>
                                          onCountryChange(event, i)
                                        }
                                        defaultValue={
                                          countryall[hpc[i].countryIndex]
                                        }
                                        placeholder={
                                          typeof countryall[
                                            hpc[i].countryIndex
                                          ] === "undefined"
                                            ? "Select Country"
                                            : countryall[hpc[i].countryIndex]
                                        }
                                        filterOption={createFilter(
                                          filterConfig
                                        )}
                                        isClearable
                                      />
                                      {/*
                                    <DropdownButton className="dropdown-basic-button split-button-dropup country"
                                        title= {hpc[i].country != "" &&  hpc[i].country != "undefined" ? hpc[i].country == "B&H" ? "Bosnia and Herzegovina" : hpc[i].country : "Select Country" }
                                        onSelect={(event) => onCountryChange(event, i)}
                                        >
                                        <div className="scroll_div">
                                        {countryall.length === 0
                                        ? ""
                                        : Object.entries(countryall).map(
                                        ([index, item]) => {
                                        return (
                                        <>
                                        <Dropdown.Item eventKey={index} className = {hpc[i].country == index ? "active" : "" }>{item == "B&H" ? "Bosnia and Herzegovina" : item}</Dropdown.Item>
                                        </>
                                      );
                                    }
                                  )}
                                  </div>
                                  </DropdownButton>
                                    */}
                                    </div>
                                  </div>

                                  {/* <button onClick={(e) => addMoreSite(i, e)}>
                                    +
                                  </button> */}

                                  {val?.siteDetails?.map((data, index) => {
                                    return (
                                      <>
                                        {/* {index !== 0 ? (
                                          <>
                                            <div className="add-content-form">
                                              <div className="row">
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site number
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteNumberChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteNumber}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site name
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteNameChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteName}
                                                    />
                                                  </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site Street
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteStreetChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteStreet}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site Post Code
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSitePostCode(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.sitePostCode}
                                                    />
                                                  </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                  <div className="form-group">
                                                    <label for="">
                                                      Site City
                                                    </label>
                                                    <input
                                                      type="email"
                                                      className="form-control"
                                                      id="email-desc"
                                                      // name={`${fieldName}.email`}
                                                      onChange={(event) =>
                                                        onSiteCityChange(
                                                          event,
                                                          index,
                                                          i
                                                        )
                                                      }
                                                      value={data.siteCity}
                                                    />
                                                  </div>
                                                  <div className="delete_btn">
                                                    {index !== 0 ? (
                                                      <button
                                                        type="button"
                                                        className="btn btn-filled"
                                                        onClick={(e) =>
                                                          removeSite(
                                                            index,
                                                            i,
                                                            e
                                                          )
                                                        }
                                                      >
                                                        <img
                                                          src={
                                                            path_image +
                                                            "delete.svg"
                                                          }
                                                          alt="Add More"
                                                        />
                                                      </button>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        ) : ( */}
                                        <>
                                          <div className="add-content-form">
                                            <div className="row"></div>
                                          </div>
                                        </>
                                        {/* )} */}
                                      </>
                                    );
                                  })}
                                </>
                              ) : null}
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
                                <li className="nav-item add_hcp">
                                  <a
                                    onClick={(e) => addMoreHcp(e)}
                                    className="nav-link active btn-bordered"
                                    data-bs-toggle="tab"
                                    href="javascript:;"
                                  >
                                    Add HCP +
                                  </a>
                                </li>

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
                    <div className="file_upload-box">
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-4[]"
                            id="file-4"
                            className="inputfile inputfile-3"
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
    </>
  );
};
const mapStateToProps = (state) => {
  return state;
};

export default ViewTable;
