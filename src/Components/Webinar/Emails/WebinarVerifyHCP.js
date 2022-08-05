import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ExportApi from '../../../Api/ExportApi';
import { toast, ToastContainer } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";
import { BaseApi } from "../../../Api/BaseApi";
import axios from "axios";
import { loader } from '../../../loader';
const WebinarVerifyHCP = () => {
    let path_image =process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    let params=useParams()
    const [hpc, sethpc] = useState([])
    const [searchedUsers, setSearchedUsers] = useState()
    const [saveOpen, setSaveOpen] = useState(false);
    const [selectedHcp, setSelectedHcp] = useState([])
    const [editable, setEditable] = useState(0);
    const [name, setName] = useState("");
    const [render, setRender] = useState(1);
    const [email, setEmail] = useState("");
    const [unregisterParticipants, setUnregisterParticipants] = useState([]);
    const [participants, setParticipants] = useState([]);
    
    const [sorting, setSorting] = useState(0);
    const navigate = useNavigate();
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [sortingCount, setSortingCount] = useState(0);
    const [country, setCountry] = useState(null);
    const [editableData, setEditableData] = useState([]);
    const [update, setUpdate] = useState(0);
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
    const baseURL = BaseApi.getBaseURL();
    let err;
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
    // const [sortingCount, setSortingCount] = useState(0);
    const backClicked = () => { 
        navigate("/webinar/email/SelectHCP");
      };
    const SaveAsDarft = () => { 
      selectedHcp.map((data,i)=>{
      if(data.is_register==1){
        participants.push(data.id)
        setParticipants(participants)
      }else{
        unregisterParticipants.push(data.id)
        setUnregisterParticipants(unregisterParticipants)
      }
      })

      ExportApi.EmailSelectVerifyHCP(JSON.stringify(participants),JSON.stringify(unregisterParticipants))
      .then((resp) => {
        if (resp.data) {
           console.log("Ghbv",resp.data.data)
           localStorage.setItem("SmartListId",window.btoa(resp.data.data.smart_list_id))
           resp.data.data.smart_list_id
           ? ExportApi.EmailSCreateCollectionnext(
            resp.data.data.smart_list_id,
               localStorage.getItem("collection_id"),
               0
             ).then((resp) => {
               if (resp.ok) {
                  console.log( resp.data.data)

                 if (resp.data.code == 200) {
                  localStorage.setItem("collection_id",resp.data.data.collection_id)
                  //  loader("hide");
                   toast.success(resp.data.message, {
                     position: "top-right",
                     autoClose: 2000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                    });
                 } else {
                  //  loader("hide");
                 }
                 // localStorage.setItem("collection_id",resp.data.data.collection_id)
                 //  navigate("/webinar/email/smart-list");
               }
             })
           : toast.warning("Please select smart list");
          // setSearchedUsers(resp.data.data)
        }
      })

      };
    const nextClicked = () => { 
      selectedHcp.map((data,i)=>{
      if(data.is_register==1){
        participants.push(data.id)
        setParticipants(participants)
      }else{
        unregisterParticipants.push(data.id)
        setUnregisterParticipants(unregisterParticipants)
      }
      })

      ExportApi.EmailSelectVerifyHCP(JSON.stringify(participants),JSON.stringify(unregisterParticipants))
      .then((resp) => {
        if (resp.data) {
           console.log("Ghbv",resp.data.data)
           localStorage.setItem("SmartListId",window.btoa(resp.data.data.smart_list_id))
           resp.data.data.smart_list_id
           ? ExportApi.EmailSCreateCollectionnext(
            resp.data.data.smart_list_id,
               localStorage.getItem("collection_id"),
               0
             ).then((resp) => {
               if (resp.ok) {
                  console.log( resp.data.data)

                 if (resp.data.code == 200) {
                  localStorage.setItem("collection_id",resp.data.data.collection_id)
                  //  loader("hide");
                   toast.success(resp.data.message, {
                     position: "top-right",
                     autoClose: 2000,
                     hideProgressBar: false,
                     closeOnClick: true,
                     pauseOnHover: true,
                     draggable: true,
                     progress: undefined,
                    });
                   navigate(`/webinar/email/WebinarVerifyHcpMAIL/${localStorage.getItem("SmartListId")}`)
                 } else {
                  //  loader("hide");
                 }
                 // localStorage.setItem("collection_id",resp.data.data.collection_id)
                 //  navigate("/webinar/email/smart-list");
               }
             })
           : toast.warning("Please select smart list");
          // setSearchedUsers(resp.data.data)
        }
      })

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
    const [getNewReaders, setNewReaders] = useState([]);
    const sortSelectedUsers = () => {
      // console.log("hi");
      //console.log(readers);
      let normalArr = [];
      normalArr = selectedHcp;
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
  
       setSelectedHcp(normalArr);
       setSorting(1 - sorting);
       setSortingCount(sortingCount + 1);
    };
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
    const handleGetCountry = () => {
      ExportApi.GetCountryData().then((resp) => {
        if (resp.ok) {
          setCountry(resp.data.data);
        }
      });
    };
    const handleMultiInputRemove = (i) => {
      loader("show");
      let data1 = Speakername;
      let dataErr = SpeakernameErr;
      Speakername.splice(i, 1);
      SpeakernameErr.splice(i, 1);
      setTimeout(() => setSpeakerName([...Speakername]), 1000);
      setTimeout(() => setSpeakerNameErr([...SpeakernameErr]), 1000);
      setSpeakerName(data1);
      setSpeakerNameErr(dataErr);
       setTimeout(() =>       loader("hide")
       , 1000);
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
    function validateRehearsalData(index, field_name, message) {
      err = true;
      if (Speakername[index][field_name].length == 0) {
        SpeakernameErr[index][field_name] = message;
        setSpeakerNameErr([...SpeakernameErr]);
        err = false;
      }
      return err;
    }
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
    const saveEditClicked = async (id) => {
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
    
            // let prev_obj = editList.find((x) => x.id === data.id);
            //data.country = country_edit;
            data.name = name_edit;
            data.country_id = country;
            data.content_type = content_type;
             data.is_register=register
          });
        }
        console.log(editableData)
        const body = {
          // smart_list_id: props.smartListId,
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
  
            if (res.data.code == 200) {
            toast.success("Data updated successfully");
            setEditable(0);
            }else{

              toast.error("Something went wrong");
            }
          })
          .catch((err) => {
            toast.error("Something went wrong");
          });
  
        setSaveOpen(false);
        setEditableData([]);
        setEditable(0);
        // setEditList(editList);
    
  }
  const editablemade = () => {
    setSaveOpen(true);
    let temp_val = 1 - editable;
    if (temp_val) setEditable(temp_val);
  };
  const closeClicked = () => {
    setSaveOpen(false);
    setEditable(0);
    // let vr = editList;
    // setEditList([]);
    // setTimeout(() => {
    //   setEditList(vr);
    //   // console.log("This will run after 1 second!");
    //   // setUpdateCounter(updateCounter + 1);
    // }, 50);
  };
  useEffect(() => {
    handleGetCountry()
    if(params.id){
       ExportApi.GetSmartListSingleRecord(params.id)
      .then((resp) => {
        if (resp.data) {
          setSelectedHcp(resp.data.data)
        }
      })
    }
  }, []);
  
  return (
    <>
        <div className="loader" id="custom_loader">
        <span className="loader-view"> </span>
      </div>
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
          <div className="col-12 col-md-3">
            <div className="header-btn">
            {selectedHcp.length === 0 ? (
                <button className="btn btn-primary btn-filled  disabled">
                  Save As Draft
                  </button>):(
              <button
                 onClick={SaveAsDarft}
                className="btn btn-primary btn-bordered move-draft"
              >
                Save As Draft
              </button>
                  )}
              {selectedHcp.length === 0 ? (
                <button className="btn btn-primary btn-filled  disabled">
                  Next
                </button>
              ) : (
                <button
                  onClick={nextClicked}
                  className="btn btn-primary btn-filled "
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
                   onClick={()=>setIsOpenAddModal(true)}
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
                       onClick={editButtonClicked}
                       
                    >
                      <img src={path_image + "edit.svg"} alt="" />
                    </button>
                  </div>
                  <div className="hcp-sort">
                  <button
                          className="btn btn-outline-primary"
                          onClick={sortSelectedUsers}
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
                          onClick={(e) =>
                            editing(
                              //  e.currentTarget,
                              data.id,
                              data.email,
                             data.name,
                             index
                            )
                          }
                        >                      <td id={`is_register` + data.id} style={{display:"none"}}>{data.is_register}</td>

                          <td
                            id={`field_name` + data.id}
                            contenteditable={
                              editable === 0 ? "false" : "true"
                            }
                          >
                            <span>{data.name || data.first_name}</span>
                          </td>
                          <td id={`field_email` + data.id}>{data.email}</td>
                          <input type="hidden" id={`field_index` + data.profile_user_id} value={index} />
                         
                          <td>
                          {
                            editable ?   <select
                        id={`country` + data.id}
                        name="Country"
                        className="form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        defaultValue={data.country_id}
                      >
                        <option value="">Select Country</option>
                        {country?.map((val, i) => (
                          <React.Fragment key={i}>
                            <option key={i} value={val.id}>
                              {val.country}
                            </option>
                          </React.Fragment>
                        ))}
                    
                      </select>  : <span>{data.country}</span>
                          }
                          </td>
                         
                          <td>
                            {
                              editable ?<div className="user-type-option">
                          <Form.Select
                          id={`content_type` + data.id}
                            className="form-select"
                            defaultValue={data.type}
                            // key={i}
                          >
                            <option value="HCP">HCP</option>
                            <option value="Staff User">Staff User</option>
                            <option value="Test User">Test User</option>
                          </Form.Select>
                        </div> : <span>{data.type}</span>
                            }
                          </td>
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
                        ExportApi.EmailSand("", rehearsalSpeakername)
                          .then((resp) => {
                            if (resp.data) {
                         
                              if (resp.data.code == 200) {
                                resp.data.data.map((item)=>{
                                  setSelectedHcp((oldArray) => [...oldArray,item]);

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
                                // loader("hide");
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