import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { getListId } from "../actions";
import { connect } from "react-redux";

const Table = (props) => {
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [render, setReRender] = useState(0);
  const handleCloseUploadMenu = () => setShowUploadMenu(false);
  const handleShowUploadMenu = () => setShowUploadMenu(true);
  let combine_data;

  useEffect(() => {
    console.log(props);
  }, []);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    setEditList(props.data);
  }, [props.api_flag]);

  const uploadFile = async (event) => {
    setShow(!show);
    setShowUploadMenu(!showUploadMenu);

    console.log(props);
    let formData = new FormData();
    formData.append("user_id", 18207);
    formData.append("smart_list_id", props.listId);
    formData.append("reader_file", selectedFile);

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/update_reader_list`, formData)
      .then((res) => {
        let old_data = editList;
        let new_data = res.data.response.data[0];

        combine_data = [new_data, ...old_data];
        console.log(combine_data);
        setEditList(combine_data);
        setUpdatedData(combine_data);

        // setapi_flag(1);
        //  setData(res.data.response.data);
        // console.log(data);
        //  props.getUpdatedData(res.data.response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //showFileInReadersList();
  };

  const showFileInReadersList = async () => {
    console.log("this is edit list");
    //console.log(editList);
    const profile_user_id_array = updateData.map((data) => {
      return data.profile_user_id;
    });
    console.log(profile_user_id_array);
    console.log(props.listId);

    const body = {
      user_list: profile_user_id_array,
      smart_list_id: props.listId,
      user_id: 18207,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY ;
    await axios
      .post(`distributes/add_update_list`, body)
      .then((res) => {
        console.log("response from add_update list");
        console.log(res);
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

  const verifyUser = () => {
    console.log(props);
    console.log("0123");
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

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/update_reders_details`, body)
      .then((res) => {
        console.log(props);
        console.log(res);
        onCancel();
        props.smartListDatafn();
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
    updateReaderDetails({
      profile_id,
      newName,
      email,
      jobTitle,
      company,
      country,
      profile_user_id,
    });
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
    console.log(profile_user_id);
    const filtered_list = editList.filter((data) => {
      return data.profile_user_id != profile_user_id;
    });

    setEditList(filtered_list);
    const body = {
      user_list: filtered_list.map((data) => {
        return data.profile_user_id;
      }),
      smart_list_id: props.listId,
      user_id: 18207,
    };

    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    await axios
      .post(`distributes/add_update_list`, body)
      .then((res) => {
        console.log("response from add_update list");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Reader
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div class="container">
            <div class="row align-items-center vh-100">
              <div class="col-6 mx-auto">
                <div class="card shadow border">
                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-title">Enter smart list name</p>
                    <input type="text"></input>

                    <div className="card-title">
                      <p class="card-text">
                        How do you want to create a smart list?
                      </p>
                      <br />
                      <Link
                        style={{ margin: "20px" }}
                        to={{
                          pathname: "/Cohorts",
                        }}
                      >
                        segment for new cohorts
                      </Link>
                      <Button variant="primary" onClick={handleShowUploadMenu}>
                        Upload new HPCS
                      </Button>
                      <Modal
                        show={showUploadMenu}
                        onHide={handleCloseUploadMenu}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>upload new hpcs</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {" "}
                          <div class="container">
                            <div class="row align-items-center vh-100">
                              <div class="col-6 mx-auto">
                                <div class="card shadow border">
                                  <div class="card-body d-flex flex-column align-items-center">
                                    <p class="card-title">Upload a new file</p>

                                    <div className="card-title">
                                      <input
                                        type="file"
                                        onChange={onFileChange}
                                      />
                                      <br />

                                      {/* <button
                    onClick={(event) => uploadFile(event)}
                    className="btn-secondary"
                    style={{ margin: "5px" }}
                  >
                    upload
                  </button> */}

                                      {/* <Link
                    style={{ margin: "20px" }}
                    to={{
                      pathname: "/EditList",
                    }}
                    onClick={(event) => uploadFile(event)}
                  >
                    upload
                  </Link> */}
                                      <button
                                        onClick={(event) => uploadFile(event)}
                                      >
                                        upload
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                      </Modal>
                    </div>

                    <a href="#" class="btn btn-primary">
                      Download file
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <button className="btn btn-secondary" onClick={showFileInReadersList}>
        Verify user
      </button>
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
        <tbody>
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
        </tbody>
      </table>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default Table;
