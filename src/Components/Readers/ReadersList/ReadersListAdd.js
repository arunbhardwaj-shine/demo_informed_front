import React, { useState } from "react";
import {
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import EditContactType from "../../CommonComponent/EditContactType";
import EditCountry from "../../CommonComponent/EditCountry";
import Select, { createFilter } from "react-select";
import { postData, postFormData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const ReadersListAdd = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [readersData, setReadersData] = useState(
    typeof state?.readersData !== "undefined" ? state?.readersData : []
  );

  const [updateData, setUpdatedData] = useState(
    typeof state?.readersData !== "undefined" ? state?.readersData : []
  );

  const filterConfig = {
    matchFrom: "start",
  };
  const [editableData, setEditableData] = useState([]);
  const [editable, setEditable] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [update, setUpdate] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [updateCounter, setUpdateCounter] = useState(0);
  const [getNewReaders, setNewReaders] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [activeManual, setActiveManual] = useState("active");
  const [activeExcel, setActiveExcel] = useState("");
  const [emailChanged, setEmailChanged] = useState("");
  const [emailData, setEmailData] = useState("");
  const [countryall, setCountryall] = useState([]);
  const [counterFlag, setCounterFlag] = useState(0);

  const [hpc, setHpc] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      contact_type: "",
      country: "",
      countryIndex: "",
    },
  ]);

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
      },
    ]);
    setActiveManual("active");
    setActiveExcel("");
  }

  const editButtonClicked = () => {
    if (editable == 1) {
      setSaveOpen(false);
    } else {
      setSaveOpen(true);
    }
    let temp_val = 1 - editable;
    setEditable(temp_val);
    setUpdate(update + 1);
  }

  const sortSelectedUsers = () => {
    let normalArr = [];
    normalArr = readersData;
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

    setReadersData(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  }

  const saveEditClicked = async () => {
    setEditable(0);
    if (editableData.length > 0) {
      editableData.map((data) => {
        const name_edit = document.getElementById(
          "field_name" + data.profileIndex
        ).innerText;
        const country_edit = document.getElementById(
          "field_country" + data.profileIndex
        ).value;
        const edit_index = document.getElementById(
          "field_index" + data.profileIndex
        ).value;
        const contact_type_edit = document.getElementById(
          "field_contact_type" + data.profileIndex
        ).value;

        let prev_obj = readersData.find(
          (x) => x.profileIndex === data.profileIndex
        );
        if (typeof prev_obj != "undefined") {
          if (typeof readersData[edit_index] != "undefined") {
            readersData[edit_index].country = country_edit;
          }
          if (typeof readersData[edit_index] != "undefined") {
            readersData[edit_index].contact_type = contact_type_edit;
          }
        } else {
          if (typeof getNewReaders[edit_index] != "undefined") {
            getNewReaders[edit_index].country = country_edit;
          }
          if (typeof getNewReaders[edit_index] != "undefined") {
            getNewReaders[edit_index].contact_type = contact_type_edit;
          }
        }

        data.country = country_edit;
        data.username = name_edit;
        data.contact_type = contact_type_edit;
      });

      let updated_index = readersData.findIndex(el => el.profileIndex == editableData?.profileIndex);
      console.log(editableData?.profileIndex,updated_index);
      if(updated_index != "-1"){

          readersData[updated_index].country = editableData.country
          readersData[updated_index].first = editableData.username
          readersData[updated_index].contact_type = editableData.contact_type
      }
      setReadersData(readersData);

      // const body = {
      //   user_id: localStorage.getItem("user_id"),
      //   edit_list_array: editableData,
      // };
      // console.log(body);
      //axios request

      setSaveOpen(false);
      setEditableData([]);
    }else {
      setSaveOpen(false);
    }
  }

  const createUser = async () => {
    loader("show");
    try {
      await postData(ENDPOINT.READER_CREATE, readersData);
      loader("hide");
      navigate("/readers-view");
    } catch (err) {
      console.log(err);
      loader("hide");
    }
  };

  const deleteReaderRecord = (index) => {
      let deleteIndex = readersData.findIndex(el => el.profileIndex == index);
      // if()
  }

  const closeClicked = async () => {
    setSaveOpen(false);
    setEditable(0);
    let vr = readersData;
    setReadersData([]);
    setTimeout(() => {
      setReadersData(vr);
      setUpdateCounter(updateCounter + 1);
    }, 50);
  }

  const editing = (
    profileIndex,
    email,
    country,
    names,
    contact_type
  ) => {
    if (editable != 0) {
      const name_edit = document.getElementById(
        "field_name" + profileIndex
      ).innerText;
      const country_edit = document.getElementById(
        "field_country" + profileIndex
      ).value;
      const contact_type_edit = document.getElementById(
        "field_contact_type" + profileIndex
      ).value;

      const arr = [];
      arr.push({
        profileIndex: profileIndex,
        email: email,
        country: country_edit,
        username: name_edit,
        contact_type: contact_type_edit,
      });

      let prev_obj = editableData.find(
        (x) => x.profileIndex === profileIndex
      );
      if (typeof prev_obj != "undefined") {
        //update existing
        editableData.map(
          (obj) => arr.find((o) => o.profileIndex === profileIndex) || obj
        );
      } else {
        //create new
        setEditableData((oldArray) => [...oldArray, ...arr]);
      }
    }
  }

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
    const value = e;
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

  const deleteRecord = (i) => {
    const list = hpc;
    list.splice(i, 1);
    setHpc(list);
    setCounterFlag(counterFlag + 1);
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
          countryIndex: "",
        },
      ]);
    } else {
      // toast.warning("Please input the email atleast");
    }
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

      // const body = {
      //   data: body_data,
      //   user_id: localStorage.getItem("user_id"),
      //   smart_list_id: getlistid,
      // };

      // const status = body.data.map((data) => {
      //   if (data.email == "") {
      //     return "Please enter the email atleast";
      //   } else if (data.email != "") {
      //     let email = data.email;
      //     let useremail = email.trim();
      //     var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      //     if (regex.test(String(useremail).toLowerCase())) {
      //       let prev_obj = editList.find((x) => x.email === useremail);
      //       if (typeof prev_obj != "undefined") {
      //         return "User with same email already added in list.";
      //       } else {
      //         return "true";
      //       }
      //
      //       return "true";
      //     } else {
      //       return "Email format is not valid";
      //     }
      //   } else {
      //     return "true";
      //   }
      // });

      // if (status.every((element) => element == "true")) {
        // loader("show");
        // axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        // await axios
        //   .post(`distributes/add_new_readers_in_list`, body)
        //   .then((res) => {
        //     if (res.data.status_code === 200) {
        //       toast.success("User added successfuly");
        //
        //       let old_data = editList;
        //
        //       let new_data = res.data.response.data;
        //       if (typeof getNewReaders != "undefined") {
        //         let added_prev_readers_array = getNewReaders;
        //         let combine_new_readers_array = [
        //           ...new_data,
        //           ...added_prev_readers_array,
        //         ];
        //         setNewReaders(combine_new_readers_array);
        //         props.sendDataToParent(combine_new_readers_array, "new");
        //       }
        //       combine_data_manual = [...new_data, ...old_data];
        //
        //       setEditList(old_data);
        //       props.sendDataToParent(old_data, "existing");
        //       setUpdatedData(old_data);
        //       setIsOpen(false);
        //       setIsOpenAdd(false);
        //     } else {
        //       toast.warning(res.data.message);
        //     }
        //     loader("hide");
        //   })
        //   .catch((err) => {
        //     toast.error("Something went wrong");
        //     loader("hide");
        //   });
      // } else {
        // toast.warning(status[0]);
      // }
    } else {
      // let formData = new FormData();
      // let user_id = localStorage.getItem("user_id");
      // formData.append("user_id", user_id);
      // formData.append("smart_list_id", getlistid);
      // formData.append("reader_file", selectedFile);
      //
      // axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      // if (selectedFile) {
      //   loader("show");
      //   await axios
      //     .post(`distributes/update_reader_list`, formData)
      //     .then((res) => {
      //       if (res.data.status_code === 200) {
      //         toast.success("User added successfuly");
      //
      //         let old_data = editList;
      //         let new_data = res.data.response.data;
      //         if (typeof getNewReaders != "undefined") {
      //           let added_prev_readers_array = getNewReaders;
      //           let combine_new_readers_array = [
      //             ...new_data,
      //             ...added_prev_readers_array,
      //           ];
      //           setNewReaders(combine_new_readers_array);
      //           props.sendDataToParent(combine_new_readers_array, "new");
      //         }
      //         combine_data = [...new_data, ...old_data];
      //         setEditList(old_data);
      //         setIsOpenAdd(false);
      //         setActiveManual("active");
      //         setActiveExcel("");
      //         setSelectedFile(null);
      //         props.sendDataToParent(old_data, "existing");
      //         setUpdatedData(old_data);
      //       } else {
      //         toast.warning(res.data.message);
      //       }
      //       loader("hide");
      //     })
      //     .catch((err) => {
      //       toast.error("Something went wrong");
      //       loader("hide");
      //     });
      //   setIsOpen(false);
      // } else {
      //   toast.warning("Please add a excel file");
      // }
    }
  };

  return (
    <>
    <Col className="col right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="page-top-nav">
            <div className="row justify-content-end align-items-center">
              <Col md="1">
                <div className="header-btn-left">
                  <Link
                    className="btn btn-primary btn-bordered back-btn"
                    to="/reader-add"
                  >
                    <svg
                      width="14"
                      height="24"
                      viewBox="0 0 14 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                        fill="#97B6CF"
                      />
                    </svg>
                  </Link>
                </div>
              </Col>

              <Col md="9">
                <ul className="tabnav-link">
                  <li className="">
                    <a href="">Create CRM</a>
                  </li>
                  <li className="active active-main">
                    <a href="">Review &amp; approve</a>
                  </li>
                </ul>
              </Col>

              <Col md="2">
                <div className="header-btn">
                  <button
                    className="btn btn-primary btn-filled next"
                    onClick={createUser}
                  >
                    Create
                  </button>
                </div>
              </Col>

              </div>
            </div>

            <div className="create-reader create-change-content reader_added">
              <div className="form_action">
                <div className="create-reader-form-header table-title">
                  <h4>
                    Uploaded HCPs
                    <span> | {readersData.length}</span>
                  </h4>

                  <div className="selected-hcp-table-action">
                    {editable == false ? (
                      <>
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="btn btn-outline-primary"
                          table="table-to-xls"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="Download "
                        />
                        {
                          /*
                          <div className="hcp-new-user">
                            <button
                              className="btn btn-outline-primary"
                              onClick={handleShow}
                            >
                              <img src={path_image + "new-user.svg"} alt="New User" />
                            </button>
                          </div>

                        <div className="hcp-added">
                          <button
                            className="btn btn-outline-primary"
                            onClick={editButtonClicked}
                          >
                            <img src={path_image + "edit-button.svg"} alt="Edit" />
                          </button>
                        </div>
                        */
                      }
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
                          onClick={saveEditClicked}
                        >
                          Save
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="smart-list-view">
                <div className="selected-hcp-list">
                  <table className="table" id="table-to-xls">
                    <thead className="sticky-header">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Country</th>
                        <th scope="col">Business Unit</th>
                        <th scope="col">Contact Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        readersData.length > 0 ? (
                          readersData.map(function (data, index) {
                            return (
                              <tr
                                key={data}
                                id={`row-selected` + index}
                                onClick={(e) =>
                                  editing(
                                    data?.profileIndex,
                                    data?.email,
                                    data?.country,
                                    data?.firtName + " " + data?.lastName,
                                    data?.contact_type
                                  )
                                }
                                >
                                <td
                                id={`field_name` + data.profileIndex}
                                contentEditable={editable === 0 ? "false" : "true"}
                                suppressContentEditableWarning={true}
                                >
                                  <span>{data?.firtName + " " + data?.lastName}</span>
                                </td>

                                <td>
                                  <input
                                    type="hidden"
                                    id={`field_index` + data.profileIndex}
                                    value={index}
                                  />
                                  {data?.email}
                                </td>
                                <td>
                                  {editable ? (
                                    <EditCountry
                                      selected_country={data.country}
                                      profile_user={data.profileIndex}
                                    ></EditCountry>
                                  ) : (
                                    <span>{data.country}</span>
                                  )}
                                </td>
                                <td>{data?.ibu}</td>
                                <td>
                                  {editable ? (
                                    <EditContactType
                                      selected_ibu={data.contact_type}
                                      profile_user={data.profileIndex}
                                    ></EditContactType>
                                  ) : (
                                    <span>{data.contact_type}</span>
                                  )}
                                </td>
                                {
                                  /*
                                  <td className="delete_row" colSpan="12">
                                  <img
                                  src={path_image + "delete.svg"}
                                  alt="Delete Row"
                                  onClick={() => deleteReaderRecord(data.profileIndex)}
                                  />
                                  </td>*/
                                }

                              </tr>
                            )
                          })
                        ):
                          <tr className="no_found">
                            <td>No Data Found</td>
                          </tr>
                      }
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>

            </Row>
          </div>
        </Col>

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
                <div className="hcp-add-form tab-content">
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
                                    <label htmlFor="">Email *</label>
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
                                        typeof countryall[hpc[i].countryIndex] ===
                                        "undefined"
                                          ? "Select Country"
                                          : countryall[hpc[i].countryIndex]
                                      }
                                      filterOption={createFilter(filterConfig)}
                                      isClearable
                                    />
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
                                      onClick={addMoreHcp}
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
    </>
  );
};

export default ReadersListAdd;
