import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SimpleReactValidator from "simple-react-validator";

import { connect } from "react-redux";

const Table = (props) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  //let validator = new SimpleReactValidator();

  const [validator] = React.useState(new SimpleReactValidator());
  const [validator2] = React.useState(new SimpleReactValidator());
  const [validator3] = React.useState(new SimpleReactValidator());

  const [data, setData] = useState(0);
  const [fileValidationMessage, setFileValidationMeassage] = useState(0);
  const [emailData, setEmailData] = useState("");

  const [validator3Counter, setValidator3Counter] = useState(0);

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

  const [show, setShow] = useState(false);
  const [hpc, setHpc] = useState([
    { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
  ]);
  const [renderCounterData, setCounterData] = useState([]);

  const handleClose = () => {
    setShow(false);
    setCounter([0]);
    setCounterData([]);
  };
  const handleShow = () => setShow(true);

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

  useEffect(() => {});

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    setEditList(props.data);
  }, [props.api_flag]);

  const uploadFile = async (event) => {
    if (validator2.allValid()) {
      setShowUploadMenu(!showUploadMenu);

      let formData = new FormData();
      formData.append("user_id", 18207);
      formData.append("smart_list_id", getlistid);
      formData.append("reader_file", selectedFile);

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      await axios
        .post(`distributes/update_reader_list`, formData)
        .then((res) => {
          let old_data = editList;
          let new_data = res.data.response.data[0];

          combine_data = [new_data, ...old_data];
          // console.log(combine_data);
          setEditList(combine_data);
          setUpdatedData(combine_data);
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

  const showFileInReadersList = async () => {
    console.log("updated data");
    console.log(updateData);
    const profile_user_id_array = editList.map((data) => {
      return data.profile_user_id;
    });

    console.log(profile_user_id_array);
    // console.log(props.listId);
    // let body;
    // if (props.listId) {
    //   body = {
    //     user_list: profile_user_id_array,
    //     smart_list_id: props.listId,
    //     user_id: 18207,
    //     smartListName: props.smartListName,
    //   };
    // } else {
    //   body = {
    //     user_list: profile_user_id_array,
    //     smart_list_name: props.smartListName,
    //     smart_list_id: "",
    //     user_id: 18207,
    //   };
    // }
    console.log("smartlist name");
    console.log(props);

    // if (props.listId) {
    const body = {
      user_list: profile_user_id_array,
      smart_list_id: getlistid,
      user_id: 18207,
      smart_list_name: getlistname,
      submit_type: props.upload_by_filter,
      new_users_list: [],
    };

    if (props.upload_by_filter == 1) {
      if (typeof props.filter_payload === "object") {
        Object.assign(body, { filters: props.filter_payload });
      }
    }

    console.log(body);
    // } else {
    // body = {
    //   user_list: profile_user_id_array,
    //   smart_list_id: "",
    //   user_id: 18207,
    //   smart_list_name: props.smartListName,
    //   upload_by_filter: props.upload_by_filter,
    // contact_type: "",
    // consent_type: "",
    // reader_selection: "",
    // ibu: "",
    // product: "",
    // speciality: "",
    // country: "",
    // articles: "",
    // register: "",
    // bounce: "",
    //   new_users_list: [],
    // };
    // }

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/add_update_list`, body)
      .then((res) => {
        console.log("response from add_update list");
        console.log(res);
        // window.location.href = '/SmartList';
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

    // console.log(i);
    // console.log(counter);
    // console.log(renderCounterData);
    // const deleted_data = counter.splice(i, 1);
    //console.log(deleted_data);
    // console.log(data);
    // const renderDelete = counter.filter((counterData) => {
    //   return counterData != data;
    // });
    // console.log(renderDelete);
    // setCounter(counter);
    // setCounterData(renderCounterData);
    // console.log("index to be deleted", i);
    // const list = [...hpc];
    // console.log(list);
    // list.splice(i, 1);
    // console.log(list);
    // // console.log(list);
    // setHpc(list);
    // console.log(hpc);
  };

  const addHcp = () => {
    setHpc([
      ...hpc,
      { firstname: "", lastname: "", email: "", contact_type: "", country: "" },
    ]);
    // console.log("length is" + counter.length);
    // setCounter([...counter, counter[counter.length - 1] + 1]);

    // const counterData = counter.map((data, i) => {
    //   return (
    //     <>
    //       <div className="row align-items-center vh-100" id={i}>
    //         <div className="col-6 mx-auto">
    //           <div className="card shadow border" data-id={i}>
    //             <button
    //               className="btn btn-secondary"
    //               onClick={() => deleteRecord(data, i)}
    //             >
    //               delete
    //             </button>
    //             <div className="card-body d-flex flex-column align-items-center">
    //               <div className="card-title">
    //                 first name <input type="text"></input>
    //                 last name <input type="text"></input>
    //                 email <input type="text"></input>
    //                 contact type <input type="text"></input>
    //                 country <input type="text"></input>
    //                 <br />
    //                 <Button
    //                   variant="primary"
    //                   onClick={handleShowUploadMenu}
    //                   style={{ margin: "5px" }}
    //                 >
    //                   Upload Excel
    //                 </Button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   );
    // });
    // console.log("counter data");
    // console.log(counterData);

    // setCounterData(counterData);
    // console.log("hi");
    // console.log("render counter data");
    // console.log(renderCounterData);
  };

  const verifyUser = () => {
    // console.log(props);
    // console.log("0123");
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
    };

    console.log("body");
    console.log(body);

    console.log("edit list");
    console.log(editList);

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
          result[0].email = body.email;
          result[0].country = body.country;
          result[0].company = body.company;
          result[0].jobTitle = body.jobTitle;

          const index = editList.findIndex(
            (el) => el.profile_user_id === result.profile_user_id
          );
        }
        setReRender(render + 1);
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
      // validator3.showMessages();
      //setValidator3Counter(validator3Counter + 1);
    }
  };

  const deleteReader = (profile_user_id) => {
    const filtered_list = editList.filter((data) => {
      return data.profile_user_id != profile_user_id;
    });
    console.log("filtered list");
    console.log(filtered_list);
    setEditList(filtered_list);
    const body = {
      user_list: filtered_list.map((data) => {
        return data.profile_user_id;
      }),
      smart_list_id: getlistid,
      user_id: 18207,
    };
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
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteReader(profile_user_id),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
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
    console.log(value);
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
    console.log(hpc);
    if (validator.allValid()) {
      setHpc([
        {
          firstname: "",
          lastname: "",
          email: "",
          contact_type: "",
          country: "",
        },
      ]);
      handleClose();
      console.log(hpc);
      const firstname_arr = hpc.map((data) => {
        return data.firstname;
      });
      const lastname_arr = hpc.map((data) => {
        return data.lastname;
      });
      const email_arr = hpc.map((data) => {
        return data.email;
      });
      const contact_type_arr = hpc.map((data) => {
        return data.contact_type;
      });
      const coutry_arr = hpc.map((data) => {
        return data.country;
      });

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

      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      await axios
        .post(`distributes/add_new_readers_in_list`, body)
        .then((res) => {
          console.log(res);
          let old_data = editList;
          let new_data = res.data.response.data;
          console.log(old_data);
          console.log(new_data);

          combine_data_manual = [...new_data, ...old_data];
          console.log(combine_data_manual);
          setEditList(combine_data_manual);
          setUpdatedData(combine_data_manual);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("validation failed");
      console.log(validator);
      validator.showMessages();
      console.log(validator.errorMessages);
      setData(data + 1);
    }
  };

  return (
    <>
      {props.url ? (
        <Link
          to={{
            pathname: "/CreateSmartList",
          }}
          onClick={backClicked}
        >
          BACK
        </Link>
      ) : null}

      {getlistname}
      <br />
      <Button variant="primary" onClick={handleShow}>
        Add Reader
      </Button>
      <button className="btn btn-secondary" onClick={showFileInReadersList}>
        Verify user
      </button>
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
        {/* <div className="container">
            <div className="row align-items-center vh-100">
              <div className="col-6 mx-auto">
                <div className="card shadow border">
                  <div className="card-body d-flex flex-column align-items-center">
                    <div className="card-title">
                      first name <input type="text"></input>
                      last name <input type="text"></input>
                      email <input type="text"></input>
                      contact type <input type="text"></input>
                      country <input type="text"></input>
                      <br />
                      <Button
                        variant="primary"
                        onClick={handleShowUploadMenu}
                        style={{ margin: "5px" }}
                      >
                        Upload Excel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        {/* {renderCounterData.map((data) => {
            return <>{data}</>;
          })} */}
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
                            {/* <input
                              type="text"
                              name={`${fieldName}.contact_type`}
                              onChange={(event) =>
                                onContactTypeChange(event, i)
                              }
                              value={val.contact_type}
                            ></input> */}
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
                              onClick={(event) => onContactTypeChange(event, i)}
                              value="staff"
                            />
                            <label for="staff">staff</label>
                            <input
                              type="radio"
                              id="test-users"
                              name={`${fieldName}.contact_type`}
                              onClick={(event) => onContactTypeChange(event, i)}
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
      <Modal show={showUploadMenu} onHide={handleCloseUploadMenu}>
        <Modal.Header closeButton>
          <Modal.Title>upload your new file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {/* <div className="container">
                            <div className="row align-items-center vh-100">
                              <div
                                className="col-6 mx-auto"
                                style={{ border: "2px" }}
                              >
                                <p className="card-title">
                                  Upload your new list file
                                </p>

                                <div className="card-title">
                                  <input type="file" onChange={onFileChange} />
                                  <br />
                                  <button
                                    onClick={(event) => uploadFile(event)}
                                  >
                                    upload
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div> */}
          <div className="card">
            <div className="card-header"> Upload your new list file</div>
            <div className="card-body">
              <h5 className="card-title"></h5>
              <input type="file" onChange={onFileChange} />
              {validator2.message("file", selectedFile, "required")}

              <br />
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={(event) => uploadFile(event)}
              >
                upload
              </button>

              <p className="card-text">
                {/* With supporting text below as a natural lead-in
                                to additional content. */}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th scope="col"> Name</th>
            <th scope="col">job title</th>
            <th scope="col">company</th>
            <th scope="col">indication</th>
            <th scope="col">product</th>
            <th scope="col">country</th>
            <th scope="col">email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="form-group">
          {editList.map((item) => (
            <tr>
              <td>{item.first_name}</td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.profile_id ? (
                  <input
                    value={jobTitle}
                    onChange={(event) => setJobTitle(event.target.value)}
                  />
                ) : (
                  item.jobTitle
                )}
              </td>
              <td>
                {" "}
                {inEditMode.status && inEditMode.rowKey === item.profile_id ? (
                  <input
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                  />
                ) : (
                  item.company
                )}
              </td>
              <td>
                {" "}
                {inEditMode.status && inEditMode.rowKey === item.profile_id ? (
                  <input
                    value={indication}
                    onChange={(event) => setIndication(event.target.value)}
                  />
                ) : (
                  item.indication
                )}
              </td>
              <td>
                {" "}
                {inEditMode.status && inEditMode.rowKey === item.profile_id ? (
                  <input
                    value={product}
                    onChange={(event) => setProduct(event.target.value)}
                  />
                ) : (
                  item.product
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.profile_id ? (
                  <input
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                  />
                ) : (
                  item.country
                )}
              </td>

              <td>
                {" "}
                {inEditMode.status && inEditMode.rowKey === item.profile_id ? (
                  <input
                    value={email}
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td></td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.profile_id ? (
                  <React.Fragment>
                    <button
                      type="submit"
                      className={"btn-success"}
                      onClick={() =>
                        onSave({
                          profile_id: item.profile_id,
                          newName: name,
                          email: email,
                          jobTitle: jobTitle,
                          company: company,
                          country: country,
                          profile_user_id: item.profile_user_id,
                        })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={"btn-secondary"}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <div>
                    <button
                      className={"btn-primary"}
                      onClick={() =>
                        onEdit({
                          id: item.profile_id,
                          currentName: item.first_name,
                          currentJobTitle: item.jobTitle,
                          currentCompany: item.company,
                          currentIndication: item.indication,
                          currentProduct: item.product,
                          currentCountry: item.country,
                          currentEmail: item.email,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={{ margin: "2px" }}
                      className={"btn-primary"}
                      onClick={() =>
                        onDelete({
                          id: item.profile_id,
                          currentName: item.first_name,
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
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {validator3.message("email", email, "required|email")}
        </tbody>
      </table>
    </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state);
  return state;
};

export default Table;
