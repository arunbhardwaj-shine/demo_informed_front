import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loader } from "../../loader";

import TableOnly from "./TableOnly";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { popup_alert } from "../../popup_alert";
import { Modal } from "react-bootstrap";
const SelectSmartListUsers = (props) => {
  const navigate = useNavigate();
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const location = useLocation();
  const [readers, setReaders] = useState([]);
  const campaign_id = props.getEmailData
    ? props.getEmailData.campaign_id
    : props.getDraftData.campaign_data.campaign_id;
  const [campaign_id_st, setCampaign_id] = useState(campaign_id);
  const [SendListData, setSendListData] = useState([]);
  const [PdfSelected, setPdfSelected] = useState(0);
  const [showLessInfo, setShowLessInfo] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [TemplateId, setTemplateId] = useState(0);
  const [removedReaders, setRemovedReaders] = useState([]);
  const [readersNewlyAdded, setReadersNewlyAdded] = useState([]);
  const [reRender, setReRender] = useState(0);
  const [update, setUpdate] = useState(0);
  const [activeManual, setActiveManual] = useState("active");
  const [activeExcel, setActiveExcel] = useState("");
  const [editableData, setEditableData] = useState([]);
  const [manualReRender, setManualReRender] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [counterFlag, setCounterFlag] = useState(0);
  const [countryall, setCountryall] = useState([]);
  const [addFileReRender, setAddFileReRender] = useState(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [editable, setEditable] = useState(0);
  const [sortingCount, setSortingCount] = useState(0);
  const [hpc, setHpc] = useState([
    { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
  ]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const smartListSelected = location.state
    ? location.state.smartListSelected
    : props.getDraftData.smart_list_data;

  //console.log(smartListSelected);

  const inputElement = useRef();
  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const body = {
      user_id: 18207,
      list_id: props.getEmailData
        ? smartListSelected.id
        : props.getDraftData.campaign_data.smart_list_id,
    };
    loader("show");
    axios
      .post(`distributes/get_reders_list`, body)
      .then((res) => {
        //   console.log(res)
        setReaders(res.data.response.data);
        loader("hide");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const backClicked = () => {
    window.history.go(-1);

    // return true;
  };

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

  const saveAsDraft = async () => {
    console.log("hi");

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
      route_location: "SelectSmartListUsers",
      tags: props.getEmailData
        ? props.getEmailData.tags
        : props.getDraftData.tags,
      campaign_data: {
        template_id: props.getEmailData
          ? props.getEmailData.templateId
          : props.getDraftData.campaign_data.template_id,
        smart_list_id: props.getEmailData
          ? smartListSelected.id
          : props.getDraftData.campaign_data.smart_list_id,
        //smart_list_data: readers,
        // users_list : smartListSelected,
        selectedHcp: [...readers, ...readersNewlyAdded],
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
        //console.log(selectedHcp);
        setCampaign_id(res.data.response.data.id);
        //  setSelectedHcp(selectedHcp);
        //  console.log(props.getCampaignId);
        loader("hide");

        // console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const nextClicked = () => {
    navigate("/verifyMAIL", {
      // data: data,
      // smartListName: smartListName,
      state: {
        selectedHcp: [...readers, ...readersNewlyAdded],
      },
    });
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const showMoreInfo = (e) => {
    e.preventDefault();

    setShowLessInfo(!showLessInfo);
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
    // setEmailData(e.target.value);
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

  const deleteRecord = (i) => {
    const list = hpc;

    list.splice(i, 1);

    setHpc(list);
    setCounterFlag(counterFlag + 1);
  };

  const addNewUser = () => {
    setIsOpenAdd(true);
  };

  const handleSelect = (e) => {
    setPdfSelected(e.target.value);
  };

  const newlyAddedRemoved = (reader, i) => {
    const readersRemoved = removedReaders;
    //console.log(i);
    //setReadersNewlyAdded((oldArray) => [reader, ...oldArray]);
    setRemovedReaders((oldArray) => [reader, ...oldArray]);
    const newlyAdded = readersNewlyAdded;
    newlyAdded.splice(i, 1);
    console.log(newlyAdded);
    setReadersNewlyAdded(newlyAdded);

    setUpdate(update + 1);
    //setReRender(reRender + 1);
  };

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameNameList.remove("active");
    }
    event.target.classNameNameList.toggle("active");
    setTemplateId(selected);
  };

  const readersAdded = (reader, i) => {
    // const newlyAddedReaders = readersNewlyAdded;
    const readersRemoved = removedReaders;
    readersRemoved.splice(i, 1);
    setRemovedReaders(readersRemoved);
    setReadersNewlyAdded((oldArray) => [reader, ...oldArray]);
    // console.log(readersNewlyAdded);
    //setReaders((oldArray) => [reader, ...oldArray]);
    setReRender(reRender + 1);

    // console.log(readers);
  };
  const addMoreHcp = () => {
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
  };

  const addHcp = (e) => {
    e.preventDefault();
    setActiveExcel("");
    setActiveManual("active");
    setManualReRender(manualReRender + 1);
  };

  const sortSelectedUsers = () => {
    console.log("hi");
    console.log(readers);
    let normalArr = [];
    normalArr = readers;
    if (sorting === 0) {
      normalArr.sort((a, b) =>
        a.first_name > b.first_name ? 1 : b.first_name > a.first_name ? -1 : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.first_name < b.first_name ? 1 : b.first_name < a.first_name ? -1 : 0
      );
    }

    setReaders(normalArr);
    setSorting(1 - sorting);
    setSortingCount(sortingCount + 1);
  };

  const addFile = (e) => {
    e.preventDefault();
    setActiveExcel("active");
    setActiveManual("");
    setAddFileReRender(addFileReRender + 1);
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
  const deleteReader = (i) => {
    const readersList = readers;
    const removedReader = readersList.splice(i, 1);
    setReaders(readersList);
    setRemovedReaders((oldArray) => [...oldArray, removedReader[0]]);
    //  console.log(removedReaders);
  };

  const saveEditClicked = async () => {
    setEditable(0);
    console.log(editableData);
    const body = {
      user_id: 18207,
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
  };

  const closeClicked = () => {
    setSaveOpen(false);
    setEditable(0);
  };

  const saveClicked = async () => {
    setIsOpenAdd(false);
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

      if (
        body.data[0].first_name &&
        body.data[0].last_name &&
        body.data[0].email &&
        body.data[0].country &&
        body.data[0].contact_type
      ) {
        loader("show");

        axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
        await axios
          .post(`distributes/add_new_readers_in_list`, body)
          .then((res) => {
            if (res.data.status_code === 200) {
              toast.success("User added successfuly");
              res.data.response.data.map((data) => {
                setReaders((oldArray) => [...oldArray, data]);
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
      } else {
        popup_alert({
          visible: "show",
          message: "Please fill the necessary details",
          type: "error",
        });
      }

      setIsOpen(false);
    } else {
      let formData = new FormData();
      formData.append("user_id", 18207);
      formData.append("smart_list_id", "");
      formData.append("reader_file", selectedFile);

      console.log(formData);

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      if (selectedFile) {
        loader("show");
        await axios
          .post(`distributes/update_reader_list`, formData)
          .then((res) => {
            res.data.response.data.map((data) => {
              setReaders((oldArray) => [...oldArray, data]);
            });
            loader("hide");
          })
          .catch((err) => {
            console.log(err);
          });
      }

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

  const editButtonClicked = () => {
    setSaveOpen(true);

    let temp_val = 1 - editable;
    setEditable(temp_val);
    setUpdate(update + 1);
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
                <li className="">
                  <a href="javascript:void(0)">Select HCPs</a>
                </li>
                <li className="active">
                  <a href="javascript:void(0)">Verify Your HCPs</a>
                </li>

                <li className="">
                  <a href="javascript:void(0)">Verify your Email</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-2">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-bordered move-draft"
                  onClick={saveAsDraft}
                >
                  Save As Draft
                </button>
                <button
                  className="btn btn-primary btn-filled next"
                  onClick={nextClicked}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        <section className="search-hcp">
          <div className="result-hcp-table">
            <div className="table-title">
              <h4>
                HCPs <span>| {smartListSelected.readers_count}</span>
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
                        <p>Show less info</p>
                      )}{" "}
                    </a>
                    <div className="hcp-new-user">
                      <button
                        className="btn btn-outline-primary"
                        onClick={addNewUser}
                      >
                        <img src={path_image + "new-user.svg"} alt="New User" />
                      </button>
                    </div>
                    <div className="hcp-added">
                      <button
                        className="btn btn-outline-primary"
                        onClick={editButtonClicked}
                      >
                        <img src={path_image + "edit.svg"} alt="Edit" />
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
                            className="btn btn-outline-primary"
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
                            className="btn btn-outline-primary"
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
            <div className="selected-hcp-list">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Bounced</th>
                    <th scope="col">Country</th>
                    <th scope="col">Readers</th>
                    <th scope="col">Business Unit</th>
                    {showLessInfo == false ? (
                      <>
                        <th scope="col">Interest</th>
                        <th scope="col">Consent</th>
                        <th scope="col">Email Received</th>
                        <th scope="col">Openings</th>
                        <th scope="col">Registrations</th>
                        <th scope="col">Last Email</th>
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {removedReaders.map((rr, i) => {
                    return (
                      <>
                        <tr className="hcps-deleted">
                          <td>{rr.first_name}</td>
                          <td>{rr.email}</td>
                          <td>NA</td>
                          <td>{rr.country}</td>
                          <td>NA</td>
                          <td>NA</td>
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {/* <td>NA</td>
                          <td>
                            <span>NA</span>
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
                          <td>
                            <span>NA</span>
                          </td> */}
                          <td className="add-new-hcp" colspan="12">
                            <img
                              src={path_image + "add-row.png"}
                              alt="Add Row"
                              onClick={() => readersAdded(rr, i)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  {/* <tr className="hcps-added">
                    <td>Jacob Flindt</td>
                    <td>User@docintel.app</td>
                    <td>No</td>
                    <td>United Kingdom</td>
                    <td>CIS</td>
                    <td>Haematology</td>
                    <td>Tech</td>
                    <td>
                      <span>Yes</span>
                    </td>
                    <td>
                      <span>43</span>
                    </td>
                    <td>
                      <span>30</span>
                    </td>
                    <td>
                      <span>28</span>
                    </td>
                    <td>
                      <span>Nov 18</span>
                    </td>
                    <td className="delete_row" colspan="12">
                      <img src="assets/images/delete.svg" alt="Delete Row" />
                    </td>
                  </tr>*/}
                  <tr className="seprator-add">
                    <td colspan="13"></td>
                  </tr>
                  {readersNewlyAdded.map((readers, i) => {
                    return (
                      <>
                        <tr className="hcps-added">
                          <td>{readers.first_name}</td>
                          <td>{readers.email}</td>
                          <td>NA</td>
                          <td>{readers.country}</td>
                          <td>NA</td>
                          <td>NA</td>
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          <td className="delete_row" colspan="12">
                            <img
                              src={path_image + "delete.svg"}
                              alt="Delete Row"
                              onClick={() => newlyAddedRemoved(readers, i)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  {readers.map((readers, i) => {
                    return (
                      <>
                        <tr
                          id={`row-selected` + i}
                          contenteditable={editable === 0 ? "false" : "true"}
                          onClick={(e) =>
                            editing(
                              //  e.currentTarget,
                              readers.profile_id,
                              readers.profile_user_id,
                              readers.email,
                              readers.jobTitle,
                              readers.company,
                              readers.country,
                              readers.first_name + " " + readers.last_name,
                              i
                            )
                          }
                        >
                          <td id={`field_name` + i}>
                            <span>
                              {" "}
                              {readers.first_name +
                                " " +
                                readers.last_name}{" "}
                            </span>
                          </td>
                          <td id={`field_email` + i}>{readers.email}</td>
                          <td id={`field_bounced` + i}>NA</td>
                          <td id={`field_country` + i}>
                            <span>{readers.country}</span>
                          </td>
                          <td>NA</td>
                          <td>NA</td>
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA </td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          {showLessInfo == false ? <td>NA</td> : null}
                          <td className="delete_row" colspan="12">
                            <img
                              src={path_image + "delete.svg"}
                              alt="Add Row"
                              onClick={() => deleteReader(i)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

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
              onClick={() => setIsOpenAdd(false)}
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
                  </div>
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item add_hcp">
                      <a
                        onClick={(e) => addHcp(e)}
                        className="nav-link active btn-bordered"
                        data-bs-toggle="tab"
                        href="#add_hcp_form"
                      >
                        Add HCP +
                      </a>
                    </li>
                    <li className="nav-item add-file">
                      <a
                        onClick={(e) => addFile(e)}
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

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(SelectSmartListUsers);
