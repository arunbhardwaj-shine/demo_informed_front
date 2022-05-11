import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import { useNavigate } from "react-router-dom";
import { loader } from "../../loader";
import { getCampaignId } from "../../actions";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const VerifyHCP = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const campaign_id = props.getDraftData ? props.getDraftData.campaign_id : "";
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [templateId, setTemplateId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reRender, setReRender] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [editable, setEditable] = useState(0);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const navigate = useNavigate();

  const [selectedHcp, setSelectedHcp] = useState([]);
  const [modalCounter, setModalCounter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeManual, setActiveManual] = useState("active");
  const [activeExcel, setActiveExcel] = useState("");
  const [counterFlag, setCounterFlag] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [hpc, setHpc] = useState([
    { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
  ]);

  const [validationReRender, setValidationReRender] = useState(0);

  let [validator] = React.useState(new SimpleReactValidator());

  const [manualReRender, setManualReRender] = useState(0);

  useEffect(() => {
    console.log(props);
    // props.getDraftData.campaign_data.selectedHcp;
    if (
      typeof props !== "undefined" &&
      props !== null &&
      props.hasOwnProperty("getDraftData")
    ) {
      if (props.getDraftData !== null) {
        let reducHcp = props.getDraftData.campaign_data.selectedHcp;
        if (typeof reducHcp != "undefined") {
          setSelectedHcp(reducHcp);
        }
      }
    }
  }, []);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log("sdsdsd");
  }, [selectedHcp, sorting]);

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameList.remove("active");
    }
    event.target.classNameList.toggle("active");
    setTemplateId(selected);
  };

  const nextClicked = () => {
    console.log(selectedHcp);
    navigate("/VerifyMAIL", {
      // data: data,
      // smartListName: smartListName,
      state: {
        selectedHcp: selectedHcp,
      },
    });
  };

  const closeModal = () => {
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
      },
    ]);
    console.log("closed");
    setIsOpen(false);
  };

  const editablemade = () => {
    let temp_val = 1 - editable;
    setEditable(temp_val);
  };

  const addNewHcp = () => {
    // $('#myModal').modal('show'
    // document.getElementById("tagsModal").modal('show');
    setIsOpen(true);
    setModalCounter(modalCounter + 1);
  };

  const selectHcp = (index) => {
    // console.log(index);
    let arr = [];
    arr = searchedUsers;
    const removedArray = arr.splice(index, 1);
    // console.log(removedArray);

    setSelectedHcp((oldArray) => [...oldArray, removedArray[0]]);
    setSearchedUsers(arr);
    setReRender(reRender + 1);
  };

  const nameChanged = (e) => {
    setName(e.target.value);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const deleteSelected = (index) => {
    // console.log(index);
    let arr = [];
    arr = selectedHcp;
    //  console.log(arr);
    arr.splice(index, 1);
    setSelectedHcp(arr);
    setReRender(reRender + 1);
  };

  const sortSelectedUsers = () => {
    let normalArr = [];
    normalArr = selectedHcp;
    if (sorting === 0) {
      normalArr.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.name < b.name ? 1 : b.name < a.name ? -1 : 0
      );
    }

    setSelectedHcp(normalArr);
    setSorting(1 - sorting);
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
  };

  const addFile = () => {
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
  };

  const addHcp = () => {
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const onFirstNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].firstname;
    list[i].firstname = value;
    setHpc(list);
    // console.log(hpc);
  };

  const onLastNameChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].lastname;
    list[i].lastname = value;
    setHpc(list);
    //console.log(hpc);
  };

  const onEmailChange = (e, i) => {
    const { value } = e.target;
    const list = [...hpc];
    const name = hpc[i].email;
    list[i].email = value;
    setHpc(list);
    // setEmailData(e.target.value);
    //console.log(hpc);
  };

  const onContactTypeChange = (e, i) => {
    const { value } = e.target;
    //console.log(value);
    const list = [...hpc];
    const name = hpc[i].contact_type;
    list[i].contact_type = value;
    setHpc(list);
    //console.log(hpc);
  };

  const onCountryChange = (e, i) => {
    const { value } = e.target;
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
    //  console.log(validator);

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
        smart_list_id: "",
      };
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
            loader("hide");
          } else {
            toast.warning(res.data.message);
          }

          //setSelectedHcp(res.data.response.data);
        })
        .catch((err) => {
          loader("hide");
          toast.error("Somwthing went wrong");
        });
      // setIsOpen(false);
    } else {
      let formData = new FormData();
      formData.append("user_id", 18207);
      formData.append("smart_list_id", "");
      formData.append("reader_file", selectedFile);

      console.log(formData);

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      loader("show");
      await axios
        .post(`distributes/update_reader_list`, formData)
        .then((res) => {
          res.data.response.data.map((data) => {
            setSelectedHcp((oldArray) => [...oldArray, data]);
          });
          loader("hide");
        })
        .catch((err) => {
          console.log(err);
        });
      setIsOpen(false);
    }
    setHpc([
      {
        firstname: "",
        lastname: "",
        email: "",
        contact_type: "",
        country: "",
      },
    ]);
  };

  const addMoreHcp = () => {
    setHpc([
      ...hpc,
      { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
    ]);
  };

  const backClicked = () => {
    window.history.go(-1);

    // return true;
  };

  const searchHcp = async (e) => {
    e.preventDefault();
    const body = {
      user_id: 18207,
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
        // console.log(res.data.response.data);
        if (res.data.response) {
          setSearchedUsers(res.data.response.data);
        }
        if (res.data.message) {
          setMessage(res.data.message);
        }
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveAsDraft = async () => {
    console.log("hi");
    console.log(props);
    console.log(selectedHcp);
    // const body = {
    //   user_id: 18207,
    //   pdf_id: props.getDraftData.pdf_id,
    //   description: props.getDraftData.description,
    //   creator: props.getDraftData.creator,
    //   campaign_name: props.getDraftData.campaign,
    //   subject: props.getDraftData.subject,
    //   route_location: "VerifyHCP",
    //   tags: props.getDraftData.tags,
    //   campaign_data: {
    //     template_id: props.getDraftData.template_id,
    //     // selectedHcp: selectedHcp.map((hcp) => {
    //     //   return hcp.user_id;
    //     // }),
    //   },
    //   campaign_id: props.getDraftData.campaign_id || "",
    // };

    const body = {
      user_id: 18207,
      pdf_id: props.getEmailData
        ? props.getEmailData.pdf_id
        : props.getDraftData.pdf_id,
      description: props.getEmailData
        ? props.getEmailData.emailDescription
        : props.getDraftData.description,
      creator: props.getEmailData
        ? props.getEmailData.emailCreator
        : props.getDraftData.creator,
      campaign_name: props.getEmailData
        ? props.getEmailData.emailCampaign
        : props.getDraftData.campaign,
      subject: props.getEmailData
        ? props.getEmailData.emailSubject
        : props.getDraftData.subject,
      route_location: "VerifyHCP",
      tags: props.getEmailData
        ? props.getEmailData.tags
        : props.getDraftData.tags,
      campaign_data: {
        template_id: props.getEmailData
          ? props.getEmailData.templateId
          : props.getDraftData.campaign_data.template_id,
        selectedHcp: selectedHcp,
      },
      campaign_id: campaign_id_st,
      status: 2,
    };

    console.log(body);
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    loader("show");
    await axios
      .post(`emailapi/save_draft`, body)
      .then((res) => {
        console.log(res);
        console.log(selectedHcp);
        setCampaign_id(res.data.response.data.id);
        setSelectedHcp(selectedHcp);
        //  console.log(props.getCampaignId);
        loader("hide");

        // console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <>
      <div className="right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button
                  className="btn btn-primary btn-bordered back"
                  onClick={backClicked}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <ul className="tabnav-link">
                <li className="">
                  <a href="javascript:void(0)">Select Content</a>
                </li>
                <li className="">
                  <a href="javascript:void(0)">Create Your Email</a>
                </li>
                <li className="active">
                  <a href="javascript:void(0)">Select Verify Your HCPs</a>
                </li>

                <li className="">
                  <a href="javascript:void(0)">Verify your Email</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button
                  onClick={saveAsDraft}
                  className="btn btn-primary btn-bordered move-draft"
                >
                  Save As Draft
                </button>

                {selectedHcp.length === 0 ? (
                  <button className="btn btn-primary btn-filled next disabled">
                    Next
                  </button>
                ) : (
                  <button
                    onClick={nextClicked}
                    className="btn btn-primary btn-filled next"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="top-header">
          <div className="page-title">
            <h4>Search For HCP By:</h4>
          </div>
        </div>

        <section className="search-hcp">
          <div className="form-search-hcp">
            <form>
              <div className="form-inline row justify-content-between align-items-center">
                <div className="col-12 col-md-7">
                  <div className="row justify-content-between align-items-center">
                    <div className="form-group col-sm-6">
                      <label for="hcp-name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        onChange={(e) => nameChanged(e)}
                      />
                    </div>
                    <div className="form-group col-sm-6">
                      <label for="hcp-email">Email</label>
                      <input
                        type="mail"
                        className="form-control"
                        id=""
                        onChange={(e) => emailChanged(e)}
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
                    onClick={addNewHcp}
                  >
                    Add New HCP +
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="search-hcp-table">
            <div
              className={
                searchedUsers.length === 0
                  ? "search-hcp-table-inside not-found"
                  : "search-hcp-table-inside"
              }
            >
              {searchedUsers.length === 0 ? (
                <div className="not-found">
                  <h4>No Record Found!</h4>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>
                      <th scope="col">Readers</th>
                      <th scope="col">Business Unit</th>
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
                    {searchedUsers.map((users, index) => {
                      return (
                        <>
                          <tr>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>NA</td>
                            <td>{users.country}</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA </td>
                            <td className="add-new-hcp">
                              <img
                                src={path_image + "add-row.png"}
                                alt="Add More"
                                onClick={() => selectHcp(index)}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}

                    {/* <tr>
                  <td>Jacob Flindt</td>
                  <td>User@docintel.app</td>
                  <td>No</td>
                  <td>United Kingdom</td>
                  <td>CIS</td>
                  <td>Haematology</td>
                  <td>Tech</td>
                  <td>Yes</td>
                  <td>43</td>
                  <td>30</td>
                  <td>28</td>
                  <td>Nov 18 </td>
                  <td className="add-new-hcp">
                    <img src={path_image + "add-row.png"} alt="Add More" />
                  </td>
                </tr> */}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="selected-hcp-table">
            <div className="table-title">
              <h4>
                Selected HCPs <span>| {selectedHcp.length}</span>
              </h4>
              <div className="selected-hcp-table-action">
                {/* <div className="hcp-added">
                  <button
                    className="btn btn-outline-primary"
                    onClick={editablemade}
                  >
                    <img src={path_image + "edit.svg"} alt="" />
                  </button>
                </div> */}
                <div className="hcp-sort">
                  <button
                    onClick={sortSelectedUsers}
                    className="btn btn-outline-primary"
                  >
                    Sort By <img src={path_image + "sort.svg"} alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="selected-hcp-list">
              {selectedHcp.length === 0 ? (
                <div className="not-found">
                  <h4>No Contact selected yet!</h4>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Bounced</th>
                      <th scope="col">Country</th>
                      <th scope="col">Readers</th>
                      <th scope="col">Business Unit</th>
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
                    {selectedHcp.map((data, index) => {
                      return (
                        <>
                          <tr
                            contenteditable={editable === 0 ? "false" : "true"}
                          >
                            <td>
                              <span>{data.name || data.first_name}</span>
                            </td>
                            <td>
                              <span>{data.email}</span>
                            </td>
                            <td>
                              <span>NA</span>
                            </td>
                            <td>
                              <span>{data.country}</span>
                            </td>
                            <td>
                              <span>NA</span>
                            </td>
                            <td>
                              <span>NA</span>
                            </td>
                            <td>
                              <span>NA</span>
                            </td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA </td>
                            <td className="delete_row" colSpan="12">
                              <img
                                src={path_image + "delete.svg"}
                                alt="Delete Row"
                                onClick={() => deleteSelected(index)}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>
      </div>
      <Modal
        id="add_hcp"
        show={isOpen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div
          //className="modal fade"
          //id="add_hcp"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          //aria-labelledby="add_hcp"
          aria-hidden="true"
        >
          {/* <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content"> */}

          <Modal.Header>
            <h5 className="modal-title" id="staticBackdropLabel">
              Add New HCP
            </h5>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </Modal.Header>
          <Modal.Body>
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
                              <label for="">Email</label>
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
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="Russia">Russia</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 btn-last">
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
                  {/* <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email-desc"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Contact Type</label>
                        <select className="form-contact" aria-label="select">
                          <option selected>Select Type</option>
                          <option value="1">HCP</option>
                          <option value="2">HCP</option>
                          <option value="3">HCP</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Country</label>
                        <select className="country-form" aria-label="select">
                          <option selected>Select Country</option>
                          <option value="1">India</option>
                          <option value="2">USA</option>
                          <option value="3">Russia</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
                </form>
                <form id="add_file" className={"tab-pane" + activeExcel}>
                  <div className="form-group files">
                    <input
                      type="file"
                      className="form-control"
                      multiple=""
                      onChange={onFileChange}
                    />
                  </div>
                </form>
              </div>
              <div className="hcp-modal-action">
                <div className="hcp-action-block">
                  <div className="hcp-remove">
                    <button
                      type="button"
                      className="btn btn-filled"
                      onClick={addMoreHcp}
                    >
                     <img src={path_image + "add-row.png"} alt="Add More" />
                    </button>
                  </div>
                  {/* <div className="hcp-remove">
                    <button type="button" className="btn btn-filled">
                      <img src={path_image + "delete.svg"} alt="Delete HCP" />
                    </button>
                  </div> */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item add_hcp">
                      <a
                        onClick={addHcp}
                        className="nav-link active btn-bordered"
                        data-bs-toggle="tab"
                        href="#add_hcp_form"
                      >
                        Add HCP +
                      </a>
                    </li>
                    <li className="nav-item add-file">
                      <a
                        onClick={addFile}
                        className="nav-link btn-filled"
                        data-bs-toggle="tab"
                        href="#add_file"
                      >
                        Add File
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </Modal.Footer>

          {/* <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Add New HCP
            </h5>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div> */}
          {/* <div className="modal-body">
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
                              <label for="">Email</label>
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
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="Russia">Russia</option>
                              </select>
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
                  })} */}
          {/* <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email-desc"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Contact Type</label>
                        <select className="form-contact" aria-label="select">
                          <option selected>Select Type</option>
                          <option value="1">HCP</option>
                          <option value="2">HCP</option>
                          <option value="3">HCP</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="">Country</label>
                        <select className="country-form" aria-label="select">
                          <option selected>Select Country</option>
                          <option value="1">India</option>
                          <option value="2">USA</option>
                          <option value="3">Russia</option>
                        </select>
                      </div>
                    </div>
                  </div> */}
          {/* </form>
                <form id="add_file" className={"tab-pane" + activeExcel}>
                  <div className="form-group files">
                    <input
                      type="file"
                      className="form-control"
                      multiple=""
                      onChange={onFileChange}
                    />
                  </div>
                </form>
              </div>
              <div className="hcp-modal-action">
                <div className="hcp-action-block">
                  <div className="hcp-remove">
                    <button
                      type="button"
                      className="btn btn-filled"
                      onClick={addMoreHcp}
                    >
                      Add
                    </button>
                  </div> */}
          {/* <div className="hcp-remove">
                    <button type="button" className="btn btn-filled">
                      <img src={path_image + "delete.svg"} alt="Delete HCP" />
                    </button>
                  </div> */}
          {/* <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item add_hcp">
                      <a
                        onClick={addHcp}
                        className="nav-link active btn-bordered"
                        data-bs-toggle="tab"
                        href="#add_hcp_form"
                      >
                        Add HCP +
                      </a>
                    </li>
                    <li className="nav-item add-file">
                      <a
                        onClick={addFile}
                        className="nav-link btn-filled"
                        data-bs-toggle="tab"
                        href="#add_file"
                      >
                        Add File
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary save btn-filled"
              onClick={saveClicked}
            >
              Save
            </button>
          </div> */}
        </div>
        {/* </div>
        </div> */}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(VerifyHCP);
