import React, { useEffect, useState } from "react";
import axios from "axios";

const VerifyHCP = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [SendListData, setSendListData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [templateId, setTemplateId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reRender, setReRender] = useState(0);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedHcp, setSelectedHcp] = useState([]);

  axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
  // useEffect(() => {
  //   const body = {
  //     user_id: 18207,
  //   };
  //   axios
  //     .post(`emailapi/get_template_list`, body)
  //     .then((res) => {
  //       setSendListData(res.data.response.data.emails);
  //       setUserData(res.data.response.data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleInputChange = (event, selected) => {
    const div = document.querySelector("div.active");

    if (div) {
      div.classNameList.remove("active");
    }
    event.target.classNameList.toggle("active");
    setTemplateId(selected);
  };

  const nextClicked = () => {
    console.log("next clicked");
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
    console.log(selectedHcp);
    let normalArr = [];
    normalArr = selectedHcp;
    console.log("array before sort");
    console.log(normalArr);
    normalArr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    console.log("array after sort");
    console.log(normalArr);
    setSelectedHcp(normalArr);
    setReRender(reRender + 1);
  };

  const emailChanged = (e) => {
    setEmail(e.target.value);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="right-sidebar">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
                <button className="btn btn-primary btn-bordered back">
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
                <button className="btn btn-primary btn-bordered move-draft">
                  Save As Draft
                </button>
                <button className="btn btn-primary btn-filled next">
                  Next
                </button>
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
                  >
                    Add New HCP +
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="search-hcp-table">
            {searchedUsers.length == 0 ? (
              <p>no result found</p>
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

          <div className="selected-hcp-table">
            <div className="table-title">
              <h4>
                Selected HCPs <span>| {selectedHcp.length}</span>
              </h4>
              <div className="selected-hcp-table-action">
                <div className="hcp-added">
                  <button className="btn btn-outline-primary">
                    <img src={path_image + "edit.svg"} alt="" />
                  </button>
                </div>
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
              {selectedHcp.length == 0 ? (
                <p>no contact selected yet</p>
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
                          <tr>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>NA</td>
                            <td>{data.country}</td>
                            <td>NA</td>
                            <td>NA</td>
                            <td>NA</td>
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
    </>
  );
};

export default VerifyHCP;
