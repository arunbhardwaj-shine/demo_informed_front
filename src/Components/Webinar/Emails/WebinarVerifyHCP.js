import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ExportApi from '../../../Api/ExportApi';
import { toast, ToastContainer } from "react-toastify";
const WebinarVerifyHCP = () => {
    let path_image =process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    const [hpc, sethpc] = useState([])
    const [searchedUsers, setSearchedUsers] = useState()
    const [selectedHcp, setSelectedHcp] = useState([])
    const [editable, seteditable] = useState(false)
    const [name, setName] = useState("");
    const [render, setRender] = useState(1);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const backClicked = () => { 
        navigate("/webinar/email/SelectHCP");
      };
      const getData=()=>{
        ExportApi.SearchEmailParticipant(name,email)
        .then((resp) => {
          if (resp.data) {
             console.log("Ghbv",resp.data.data)
            setSearchedUsers(resp.data.data)
          }
        })
    }
      const selectHcp=(data,i)=>{
        let CheckId=selectedHcp.find((val)=>val.id===data.id)
        // alert(i)
        console.log("firstrrr,,,,,", CheckId)
        // selectedHcp.push(data);
        // console.log("first12222,,,,,",)
        if(CheckId){
           toast.warning("Already Exists")
        }else{
            setSelectedHcp((oldArray) => [...oldArray, data]);
            // setSelectedHcp(selectedHcp)
            let dataCopy=searchedUsers
            searchedUsers.splice(i,1)
            setSearchedUsers(dataCopy)
            setRender(2+render)
        }
    }
    const deleteSelected=(i)=>{
        let dataCopy=selectedHcp
        selectedHcp.splice(i,1)
        setSelectedHcp(dataCopy)
        setRender(2+render)
        toast.success("Deleted Successfully")
    }

  return (
    <>
    <div className="right-sidebar col">
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
    <div className="custom-container">
      <div className="row">
      <div className="page-top-nav">
        <div className="row justify-content-end align-items-center">
          <div className="col-12 col-md-1">
            <div className="header-btn-left">
              <button
                className="btn btn-primary btn-bordered "
                 onClick={backClicked}
              >
                Back
              </button>
            </div>
          </div>
          <div className="col-12 col-md-8">
              <ul className="tabnav-link">
                <li className="active">
                  <a href="#">Prepare Your Email</a>
                </li>
                <li className="active active-main">
                  <a href="javascript:void(0)">Select Verify Your HCPs</a>
                </li>
                {/* <li className="">
                  <a href="#">Select Smart List</a>
                </li> */}
                <li className="">
                  <a href="#">Approve And Send</a>
                </li>
              </ul>
            </div>
          <div className="col-12 col-md-2">
            <div className="header-btn">
              <button
                // onClick={saveAsDraft}
                className="btn btn-primary btn-bordered move-draft"
              >
                Save As Draft
              </button>

                <button className="btn btn-primary btn-filled  disabled">
                  Next
                </button>
              {/* {selectedHcp.length === 0 ? (
              ) : (
                <button
                  onClick={nextClicked}
                  className="btn btn-primary btn-filled next"
                >
                  Next
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="top-header">
        <div className="page-title">
          <h4>Search For HCP By :</h4>
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
                       onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-sm-6">
                    <label for="hcp-email">Email</label>
                    <input
                      type="mail"
                      className="form-control"
                      id=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-button col-12 col-md-5">
                <button
                  className="btn btn-primary btn-filled"
                  type='button'
                   onClick={(e) => getData()}
                >
                  Search
                </button>
                <button
                  className="btn btn-primary btn-bordered"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#add_hcp"
                //   onClick={addNewHcp}
                >
                  Add New HCP +
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="search-hcp-table">
          <div
        //   className='search-hcp-table-inside not-found'
            className={
              searchedUsers ? "search-hcp-table-inside"
               :"search-hcp-table-inside not-found"
              
            }
          >
            {searchedUsers?  (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Country</th>
                    <th scope="col">Contact Type</th>
                    <th scope="col">Consent</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {searchedUsers?.map((users, index) => {
                    return (
                      <>
                        <tr>
                          <td>{users.name}</td>
                          <td>{users.email}</td>
                          <td>{users.country}</td>
                          <td>{users.contact_type?users.contact_type:users.type}</td>
                          <td>
                            <span>{users.consent}</span>
                          </td>
                          <td className="add-new-hcp">
                            <img
                              src={path_image + "add-row.png"}
                              alt="Add More"
                              onClick={() => selectHcp(users,index)}
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
            ):   <div className="not-found">
            <h4>No Record Found !</h4>
          </div>}
          </div>
        </div>

        <div className="selected-hcp-table">
          <div className="table-title">
            <h4>
              Selected HCPs <span>| {}</span>
            </h4>
            <div className="selected-hcp-table-action">
              {editable == false ? (
                <>
                  <div className="hcp-added">
                    <button
                      className="btn btn-outline-primary"
                    //   onClick={editablemade}
                    >
                      <img src={path_image + "edit.svg"} alt="" />
                    </button>
                  </div>
                  <div className="hcp-sort">
                  <button
                          className="btn btn-outline-primary"
                        //   onClick={sortSelectedUsers}
                        >
                          Sort By{" "}
                          <img src={path_image + "sort.svg"} alt="Shorting" />
                        </button>
                    {/* {sortingCount == 0 ? (
                      <>
                  
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
                    )} */}
                  </div>
                </>
              ) : null}
              {/* {saveOpen ? (
                <>
                  <button
                    className="btn btn-primary btn-filled"
                    // onClick={closeClicked}
                  >
                    Close
                  </button>

                  <button
                    className="btn btn-primary btn-bordered"
                    // onClick={saveEditClicked}
                  >
                    Save
                  </button>
                </>
              ) : null} */}
            </div>
          </div>
          <div className="selected-hcp-list">
            {selectedHcp? (
              <table className="table">
                <thead className="sticky-header">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Country</th>
                    <th scope="col">Contact Type</th>
                    <th scope="col">Consent</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedHcp.map((data, index) => {
                    //  console.log(data);
                    return (
                      <>
                        <tr
                          id={`row-selected` + index}
                        //   onClick={(e) =>
                        //     editing(
                        //       //  e.currentTarget,
                        //       data.profile_id,
                        //       data.profile_user_id,
                        //       data.email,
                        //       data.jobTitle,
                        //       data.company,
                        //       data.country,
                        //       data.first_name + " " + data.last_name,
                        //       data.contact_type,
                        //     )
                        //   }
                        >
                          <td
                            id={`field_name` + data.profile_user_id}
                            contenteditable={
                              editable === 0 ? "false" : "true"
                            }
                          >
                            <span>{data.name || data.first_name}</span>
                          </td>
                          <td id={`field_email` + data.profile_user_id}>{data.email}</td>
                          <input type="hidden" id={`field_index` + data.profile_user_id} value={index} />
                         
                          {/* <td>
                          {
                            editable ? <EditCountry selected_country={data.country} profile_user={data.profile_user_id}></EditCountry> : <span>{data.country}</span>
                          }
                          </td> */}
                         
                          {/* <td>
                            {
                              editable ? <EditContactType selected_ibu={data.contact_type} profile_user={data.profile_user_id}></EditContactType> : <span>{data.contact_type}</span>
                            }
                          </td> */}
                          <td>
                            <span>{data.consent}</span>
                          </td>
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
            ):<div className="not-found">
            <h4>No Contact selected yet!</h4>
          </div>}
          </div>
        </div>
      </section>
    </div>
    </div>
    </div>
    {/* <Modal
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
                                //   onChange={(event) =>
                                //     onFirstNameChange(event, i)
                                //   }
                                //   value={val.firstname}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label for="">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                //   onChange={(event) =>
                                //     onLastNameChange(event, i)
                                //   }
                                //   value={val.lastname}
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
                                //   name={`${fieldName}.email`}
                                //   onChange={(event) =>
                                //     onEmailChange(event, i)
                                //   }
                                //   value={val.email}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                                <label for="">Contact Type</label>
                                <DropdownButton className="dropdown-basic-button split-button-dropup"
                                 title=  "Select Type" 
                                //  onSelect={(event) => onContactTypeChange(event, i)}
                                 >
                                  <Dropdown.Item eventKey="HCP" >HCP</Dropdown.Item>
                                  <Dropdown.Item eventKey="Staff" >Staff</Dropdown.Item>
                                  <Dropdown.Item eventKey="Test Users" >Test Users</Dropdown.Item>
                                </DropdownButton>
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group">
                          




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
                                  id="add_hcp_btn"
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

      </div>
    </Modal> */}
  </>
  )
}

export default WebinarVerifyHCP