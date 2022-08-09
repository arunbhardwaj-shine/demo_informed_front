import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import ExportApi from '../../../Api/ExportApi';
import { loader } from '../../../loader';
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { popup_alert } from '../../../popup_alert';
import { Accordion } from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { BaseApi } from '../../../Api/BaseApi';
const SmartListWebinar = (props) => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_WEBINAR;
    const [search, setSearch] = useState("");
    const [showfilter, setShowFilter] = useState(false);
    const [getSmartListPopupStatus, setSmartListPopupStatus] = useState(false);
    const [smartListData, setSmartListData] = useState([]);
    const [smartListDataId, setSmartListDataId] = useState();
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [filterKey, setFilterKey] = useState([]);
    const [massage, setMassage] = useState([]);
    const [deletestatus, setDeleteStatus] = useState(false);
    const [deletecardid, setDeleteCardId] = useState();
    const [prevsmartListData, setPrevSmartListData] = useState([]);
    const [confirmationpopup, setConfirmationPopup] = useState(false);
    const [selectedType, setSelectedType] = useState([]);
    const [smartName, setSmartName] = useState();
    const [active, setActive] = useState();
    
    const [editList, setEditList] = useState([]);
    const [dates, setDates] = useState([]);
    const baseURL = BaseApi.getBaseURL();
  const submitHandler = (event) => {
    handleSearchList();
    event.preventDefault();
  };
  const searchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      setSmartListData(prevsmartListData);
      // getSmartListData(1);
    }
  };
  const filterData = async () => {
    handleSearchListFilter()
  };
  const handleSearchListFilter = () => {
    ExportApi.SearchSmartListFilter(selectedCountry,selectedType,dates).then((resp) => {
      if (resp.ok) {
        loader("hide");
        if(resp.data.code === 200){
          setSmartListData(resp.data.data);
          setMassage()
        }
        if (resp.data.code === 404) {
          console.log("resp.data.massage",resp.data.message)
         toast.warning(resp.data.message)
        }
      }
    });
  };
  const handleSearchList = () => {
    ExportApi.SearchSmartList(search).then((resp) => {
      if (resp.ok) {
        loader("hide");
        if(resp.data.code === 200){
          setSmartListData(resp.data.data);
          setMassage()
        }
        if (resp.data.code === 404) {
          toast.warning("No record found")
        }
      }
    });
  };
  const getUserType = (e, type) => {
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);

    if (checked) {
      setSelectedType((oldArray) => [...oldArray, type]);
      // setSelectedCountryName((oldArray) => [...oldArray, item.country]);
    } else {
      const type_selected = selectedType.filter((data) => {
        return data != type;
      });

      setSelectedType(type_selected);
      // setSelectedCountryName(country_selected_name);
    }
  };
  const getUserTypeDate = (e, type) => {
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);

    if (checked) {
      // yyyy-MM-dd
const input = type
const [year, month, day] =  input.split('-')
// dd/mm/yyyy
 let datess=`${day}-${month}-${year}`
console.log(datess)
      setDates((oldArray) => [...oldArray, datess]);
      // setSelectedCountryName((oldArray) => [...oldArray, item.country]);
    } else {
      const type_selected = selectedType.filter((data) => {
        return data != type;
      });

      setDates(type_selected);
      // setSelectedCountryName(country_selected_name);
    }
  };
  const getCountryFilter = (e, country_id) => {
    //  console.log(country_id);
    const { value, checked } = e.target;
    // console.log(value);
    // console.log(checked);

    if (checked) {
      setSelectedCountry((oldArray) => [...oldArray, country_id]);
      // setSelectedCountryName((oldArray) => [...oldArray, item.country]);
    } else {
      const country_selected = selectedCountry.filter((data) => {
        return data != country_id;
      });

      setSelectedCountry(country_selected);
      // setSelectedCountryName(country_selected_name);
    }
  };
  const handleSearchListget = () => {
    ExportApi.GetSmartListFilterRecord().then((resp) => {
      if (resp.ok) {
        if(resp.data.code === 200){
          console.log(resp.data.data[0])
          setFilterKey(resp.data.data[0]);
        }
      }
    })   .catch((err) => {
      toast.error("Something went wrong");
    });
  };
  const clearFilter = () => {
    document.querySelectorAll("input").forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedType([]);
    setSelectedCountry([]);
    setDates([])
    setShowFilter(false);

    // handleGetReadersData(localStorage.getItem("EventIdHeader"));
    // setNextPageUrl("");
    // setLastPage();
    // setCurrentPage(1);
    handleGetSmartList()
    // setData(updatedData);
  };
  const handleGetSmartList = () => {
    ExportApi.SearchSmartList().then((resp) => {
      if (resp.ok) {
        loader("hide");
        if(resp.data.code === 200){
          setSmartListData(resp.data.data);
            setPrevSmartListData(resp.data.data);
          setMassage()
        }
        if (resp.data.code === 404) {
          setMassage("Data Not Found");
        }
      }
    })   .catch((err) => {
      toast.error("Something went wrong");
    });
 
  };
  const showDeleteButtons = () => {
    if (deletestatus) {
      setDeleteStatus(false);
    } else {
      setDeleteStatus(true);
    }
  };
  const showConfirmationPopup = (id) => {
    // console.log(id);
    if (confirmationpopup) {
      setConfirmationPopup(false);
    } else {
      setConfirmationPopup(true);
    }
    setDeleteCardId(id);
  };
  const hideConfirmationModal = () => {
    setConfirmationPopup(false);
  };
  const deleteEmail = () => {
    loader("show")
    hideConfirmationModal();
ExportApi.SmartListDelete(deletecardid).then((resp) => {
  if (resp.ok) {
   popup_alert({
    visible: "show",
    message: "The Smart List has been deleted <br />successfully !",
    type: "success",
    redirect: "",
  });
    loader("hide")
    setTimeout(() => {
      handleGetSmartList()
    },2500 );
  }
})
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const getSmartListData = async (id,name) => {
    setSmartName(name)
    const body = {
      smart_list_id:id,
      type: "",
      bounced: "",
      country_id: "",
    };

    // loader("show");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("Token")}`,
    };
    loader("show");
    await axios
      .post(baseURL + `/smart-list/single-record`, body, {
        headers,
      })
      .then((res) => {
        // console.log(res);

        if (res.data.data) {
          if (res.data.data.length > 0) {
            loader("hide");
             setEditList(res.data.data);
             setSmartListPopupStatus(true)
          }
        } else {
          toast.error(res.data.message);
      
        }
  
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
     loader("show")
    handleSearchListget()
    handleGetSmartList()
  }, [])
  const navigate = useNavigate();
  const handleEmailSCreateCollection = (next) => {
    loader("show");
    smartListDataId
      ? ExportApi.EmailSCreateCollectionnext(
          smartListDataId,
          localStorage.getItem("collection_id"),
          0
        ).then((resp) => {
          if (resp.ok) {
            if (resp.data.code == 200) {
              console.log( resp.data)
              setActive(true)
              loader("hide");
              localStorage.setItem("collection_id",resp.data.data.collection_id)
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              if(next==1){
                navigate(`/webinar/email/TableTypeData/${smartListDataId}`)
              }
            } else {
              loader("hide");
            }
            // localStorage.setItem("collection_id",resp.data.data.collection_id)
            //  navigate("/webinar/email/smart-list");
          }
        })
      : toast.warning("Please select smart list");
    loader("hide");
  };
  return (
    <>
    {props?.toggle=="yes"?<div className="col right-sidebar">
      <div className="custom-container">
        <div className="row">
        <div className="page-top-nav">
          <div className="row justify-content-end align-items-center">
            <div className="col-12 col-md-1">
              <div className="header-btn-left">
              <Link to="/webinar/email/SelectHCP">
                <button
                  className="btn btn-primary btn-bordered back"
                  //  onClick={()}
                >
                 Back
                </button>
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <ul className="tabnav-link">
                <li className="active">
                  <Link to="/CreateEmail">Prepare Your Email</Link>
                </li>
                <li className="active active-main">
                  <Link to="/SelectSmartList">Select SmartList</Link>
                </li>
                {
                  /*
                  <li className="active active-main">
                    <Link to="/SelectSmartList">Select Smart List</Link>
                  </li>
                  */
                }
                <li className="">
                  <a href="javascript:void(0)">Verify Your List</a>
                </li>

                <li className="">
                  <a href="javascript:void(0)">Verify your Email</a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <div className="header-btn">
                <button
                  className="btn btn-primary btn-bordered move-draft"
                   onClick={() => handleEmailSCreateCollection(0)}
                >
                  Save As Draft
                </button>
               {active? <button className="btn btn-primary btn-filled"><Link to={`/webinar/email/TableTypeData/${smartListDataId}`}>Next</Link></button>:<button
                   onClick={() => handleEmailSCreateCollection(1)}
                    disabled={smartListDataId?false:true}
                    className="btn btn-primary btn-filled"
                  >
                    Next
                  </button>}
                  {/* <button
                  onClick={handleEmailSCreateCollection}
                    disabled={smartListDataId?false:true}
                    className="btn btn-primary btn-filled "
                  >
                    Next
                  </button> */}
                
              </div>
            </div>
          </div>
        </div>

        <section className="search-hcp">
          <div className="select-smart-list">
            <div className="table-title">
              <div className="create-smart-list">
                <p>
                  If you do not have a smart list for the HCPs group, you can :
                </p>
                <button
                  className="btn btn-primary btn-bordered"
                   onClick={() => navigate("/webinar/email/SmartListCreate")}
                >
                  Create new smart list
                </button>
              </div>
            </div>
            {
              /*
              <div className="col smartlist-refresh_div">
                <button
                  className="btn btn-primary btn-bordered back"
                  onClick={refreshSmartList}
                >
                  Refresh List
                </button>
              </div>
              */
            }

            <div className="col smartlist-result-block">
              {smartListData?.map((data) => {
                return (
                  <div className="smartlist_box_block">
                    <div className="smartlist-view email_box">
                      <div className="mail-box-content">
                        <h5>{data.name}</h5>
                        <div
                          className="select-mail-option"
                          onClick={() => {
                            setSmartListDataId(data.id);
                            localStorage.setItem(
                              "SmartListId",
                              data.id
                            );
                            localStorage.setItem(
                              "SmartListName",
                              data.name
                            );
                            localStorage.setItem(
                              "SmartListData",
                              JSON.stringify(data)
                            );
                          }}
                        >
                          <input
                            type="radio"
                            name="radio"
                            // checked={
                            //   template.id == PdfSelected
                            //     ? true
                            //     : template.id == getselecedlistid &&
                            //       !PdfSelected
                            //     ? true
                            //     : false
                            // }
                            defaultChecked={props.params.id==data.id?true:false}
                          />
                          {console.log(props.params.id)}
                          {/* {console.log(data.id)} */}
                          {console.log(props.params.id==data.id?true:false)}
                          <span className="checkmark"></span>
                        </div>
                        <div className="mailbox-table">
                        
                          <table>
                            <tbody>
                              <tr>
                                <th>Contact Type</th>
                                <td>{data.contact_type?data.contact_type:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Speciality</th>
                                <td>{data.speciality?data.speciality:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Readers</th>
                                <td>{data.reader_selection?data.reader_selection:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>IBU</th>
                                <td>{data.ibu?data.ibu:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Product</th>
                                <td>{data.product?data.product:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Country</th>
                                <td>{data.country?data.country:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Registered</th>
                                <td>{data.registered?data.registered:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Created By</th>
                                <td>
                                  <span>{data.creator?data.creator:"N/A"}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mail-time">
                          <span>{data.mod_date}</span>
                        </div>
                        <div className="smart-list-added-user">
                          <img
                            src={path_image + "smartlist-user.svg"}
                            alt="User icon"
                          />
                          {data.count}
                        </div>
                          
                       

                       
                        {/* <div className="mail-stats">
                        <ul>
                          <li>
                            <div className="mail-status smartlist_view">
                              <svg
                                width="16"
                                height="14"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z"
                                  fill="#FAC755"
                                ></path>
                              </svg>
                            </div>
                            <span>10%</span>
                          </li>
                          <li>
                            <div className="mail-status mail_click">
                              <svg
                                width="14"
                                height="16"
                                viewBox="0 0 14 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z"
                                  fill="#C8D1D9"
                                ></path>
                                <path
                                  d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                  fill="#C8D1D9"
                                ></path>
                              </svg>
                            </div>
                            <span>60%</span>
                          </li>
                        </ul>
                      </div> */}
                        <div className="smartlist-buttons">
                          <button className="btn view">
                            <a
                              className="color_blue"
                              onClick={() => getSmartListData(data.id,data.name)}
                            >
                              View
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      </div>
      </div>:<>
  <div className="right-sidebar col">
    <div className="top-header">
      <div className="page-title">
        <h3>Smart List</h3>
      </div>
      <div className="top-right-action">
        <div className="search-bar" onSubmit={(e) => submitHandler(e)}>
          <form className="d-flex">
            <input
              className="form-control me-2"
              placeholder="Search"
              aria-label="Search"
              onClick={()=>setShowFilter(false)}
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
                />
              </svg>
            </button>
          </form>
        </div>
        <div
              className={
                showfilter
                  ? "filter-by nav-item dropdown highlight"
                  : "filter-by nav-item dropdown"
              }
            >
              <button
                className="btn btn-secondary dropdown"
                type="button"
                id="dropdownMenuButton2"
                onClick={() => setShowFilter((showfilter) => !showfilter)}
              >
                Filter By
                {showfilter ? (
                  <svg
                    className="close-arrow"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="2.09896"
                      height="15.1911"
                      rx="1.04948"
                      transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                      fill="#0066BE"
                    />
                    <rect
                      width="2.09896"
                      height="15.1911"
                      rx="1.04948"
                      transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                      fill="#0066BE"
                    />
                  </svg>
                ) : (
                  <svg
                    className="filter-arrow"
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                      fill="#97B6CF"
                    />
                    <path
                      d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                      fill="#97B6CF"
                    />
                    <path
                      d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                      fill="#97B6CF"
                    />
                  </svg>
                )}
              </button>
        {showfilter && (
                <div
                  className="dropdown-menu filter-options"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <h4>Filter By</h4>
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item className="card" eventKey="0">
                      <Accordion.Header className="card-header">
                       Name
                      </Accordion.Header>

                      <Accordion.Body className="card-body">
                        <ul>
                          {filterKey?.names.map((data, index) => {
                            return (
                              <li>
                                {/* {console.log(
                                  selectedCountry.indexOf(data) !== -1
                                )} */}
                                {/* {console.log("here")} */}
                                {data != "" ? (
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-tags-${index}`}
                                      name="tags[]"
                                      value={data}
                                      // checked={
                                      //   //    updateflag > 0 &&
                                      //   //    typeof filtertags !==
                                      //   //      "undefined" &&
                                      //   //    filtertags.indexOf(item) !== -1
                                      //   selectedCountry.indexOf(data) !== -1
                                      // }
                                      onChange={(e) =>
                                        getCountryFilter(e, data)
                                      }
                                    />
                                    {data.charAt(0).toUpperCase() + data.slice(1)}
                                    <span className="checkmark"></span>
                                  </label>
                                ) : null}
                              </li>
                            );
                          })}

                          {/* {Object.entries(filterdata).map(([index, item]) => (
                            <li>
                              {item != "" ? (
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    id={`custom-checkbox-tags-${index}`}
                                    name="tags[]"
                                    value={item}
                                    checked={
                                      updateflag > 0 &&
                                      typeof filtertags !== "undefined" &&
                                      filtertags.indexOf(item) !== -1
                                    }
                                    onChange={() => handleOnFilterTags(item)}
                                  />
                                  {item}
                                  <span className="checkmark"></span>
                                </label>
                              ) : null}
                            </li>
                          ))} */}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item className="card" eventKey="1">
                      <Accordion.Header className="card-header">
                        Creator
                      </Accordion.Header>

                      <Accordion.Body className="card-body">
                        <ul>
                          {filterKey?.creator.map((data, index) => {
                            return (
                              <li>
                                {data != "" ? (
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-tags-${index}`}
                                      name="tags[]"
                                      value={data}
                                      //  checked={
                                      //    updateflag > 0 &&
                                      //    typeof filtertags !==
                                      //      "undefined" &&
                                      //    filtertags.indexOf(item) !== -1
                                      //  }
                                      onChange={(e) => getUserType(e, data)}
                                    />
                                    {data.charAt(0).toUpperCase() + data.slice(1)}
                                    <span className="checkmark"></span>
                                  </label>
                                ) : null}
                              </li>
                            );
                          })}

                          {/* {Object.entries(filterdata).map(([index, item]) => (
                            <li>
                              {item != "" ? (
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    id={`custom-checkbox-tags-${index}`}
                                    name="tags[]"
                                    value={item}
                                    checked={
                                      updateflag > 0 &&
                                      typeof filtertags !== "undefined" &&
                                      filtertags.indexOf(item) !== -1
                                    }
                                    onChange={() => handleOnFilterTags(item)}
                                  />
                                  {item}
                                  <span className="checkmark"></span>
                                </label>
                              ) : null}
                            </li>
                          ))} */}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className="card" eventKey="2">
                      <Accordion.Header className="card-header">
                        Created
                      </Accordion.Header>

                      <Accordion.Body className="card-body">
                        <ul>
                          {filterKey?.dates.map((data, index) => {
                            return (
                              <li>
                                {data != ""? (
                                  <label className="select-multiple-option">
                                    <input
                                      type="checkbox"
                                      id={`custom-checkbox-tags-${index}`}
                                      name="tags[]"
                                      value={data}
                                      //  checked={
                                      //    updateflag > 0 &&
                                      //    typeof filtertags !==
                                      //      "undefined" &&
                                      //    filtertags.indexOf(item) !== -1
                                      //  }
                                      onChange={(e) => getUserTypeDate(e, data)}
                                    />
                                    {data}
                                    <span className="checkmark"></span>
                                  </label>
                                ) : null}
                              </li>
                            );
                          })}

                          {/* {Object.entries(filterdata).map(([index, item]) => (
                            <li>
                              {item != "" ? (
                                <label className="select-multiple-option">
                                  <input
                                    type="checkbox"
                                    id={`custom-checkbox-tags-${index}`}
                                    name="tags[]"
                                    value={item}
                                    checked={
                                      updateflag > 0 &&
                                      typeof filtertags !== "undefined" &&
                                      filtertags.indexOf(item) !== -1
                                    }
                                    onChange={() => handleOnFilterTags(item)}
                                  />
                                  {item}
                                  <span className="checkmark"></span>
                                </label>
                              ) : null}
                            </li>
                          ))} */}
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <div className="filter-footer">
                    <button
                      className="btn btn-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Clear
                    </button>
                    <button
                      className="btn btn-primary btn-filled"
                      onClick={() => {
                        filterData();
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
              </div>
              {smartListData !== "undefined" &&
            smartListData.length > 0 ?   <div className="clear-search">
            {!deletestatus? <button
              className="btn btn-outline-primary"
              onClick={(e) => showDeleteButtons()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.84 22.25H8.15989C7.3915 22.2389 6.65562 21.9381 6.09941 21.4079C5.5432 20.8776 5.20765 20.157 5.15985 19.39L4.24984 5.55C4.24518 5.44966 4.26045 5.34938 4.29478 5.25498C4.32911 5.16057 4.38181 5.07391 4.44985 5C4.51993 4.9234 4.60479 4.86177 4.69931 4.81881C4.79382 4.77584 4.89606 4.75244 4.99985 4.75H19C19.1029 4.74977 19.2046 4.7707 19.2991 4.81148C19.3935 4.85226 19.4785 4.91202 19.5488 4.98704C19.6192 5.06207 19.6733 5.15077 19.7079 5.24761C19.7426 5.34446 19.7569 5.44739 19.75 5.55L18.88 19.39C18.8317 20.1638 18.4905 20.8902 17.9258 21.4214C17.3611 21.9527 16.6153 22.249 15.84 22.25ZM5.83986 6.25L6.60987 19.3C6.63531 19.6935 6.80978 20.0625 7.09775 20.3319C7.38573 20.6013 7.76555 20.7508 8.15989 20.75H15.84C16.2336 20.7485 16.6121 20.5982 16.8996 20.3292C17.1871 20.0603 17.3622 19.6927 17.39 19.3L18.2 6.3L5.83986 6.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M20.9998 6.25H2.99999C2.80108 6.25 2.61032 6.17098 2.46967 6.03033C2.32902 5.88968 2.25 5.69891 2.25 5.5C2.25 5.30109 2.32902 5.11032 2.46967 4.96967C2.61032 4.82902 2.80108 4.75 2.99999 4.75H20.9998C21.1987 4.75 21.3895 4.82902 21.5301 4.96967C21.6708 5.11032 21.7498 5.30109 21.7498 5.5C21.7498 5.69891 21.6708 5.88968 21.5301 6.03033C21.3895 6.17098 21.1987 6.25 20.9998 6.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M15 6.25009H9C8.80189 6.2475 8.61263 6.16765 8.47253 6.02755C8.33244 5.88745 8.25259 5.69819 8.25 5.50007V3.70004C8.26268 3.18685 8.47219 2.69818 8.83518 2.33519C9.19816 1.9722 9.68682 1.76268 10.2 1.75H13.8C14.3217 1.76305 14.8177 1.97951 15.182 2.35319C15.5463 2.72686 15.7502 3.22815 15.75 3.75004V5.50007C15.7474 5.69819 15.6676 5.88745 15.5275 6.02755C15.3874 6.16765 15.1981 6.2475 15 6.25009ZM9.75 4.75006H14.25V3.75004C14.25 3.63069 14.2026 3.51623 14.1182 3.43184C14.0338 3.34744 13.9193 3.30003 13.8 3.30003H10.2C10.0807 3.30003 9.96619 3.34744 9.8818 3.43184C9.79741 3.51623 9.75 3.63069 9.75 3.75004V4.75006Z"
                  fill="#0066BE"
                />
                <path
                  d="M15 18.25C14.8019 18.2474 14.6126 18.1676 14.4725 18.0275C14.3324 17.8874 14.2526 17.6981 14.25 17.5V9.5C14.25 9.30109 14.329 9.11032 14.4697 8.96967C14.6103 8.82902 14.8011 8.75 15 8.75C15.1989 8.75 15.3897 8.82902 15.5303 8.96967C15.671 9.11032 15.75 9.30109 15.75 9.5V17.5C15.7474 17.6981 15.6676 17.8874 15.5275 18.0275C15.3874 18.1676 15.1981 18.2474 15 18.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M9 18.25C8.80189 18.2474 8.61263 18.1676 8.47253 18.0275C8.33244 17.8874 8.25259 17.6981 8.25 17.5V9.5C8.25 9.30109 8.32902 9.11032 8.46967 8.96967C8.61032 8.82902 8.80109 8.75 9 8.75C9.19891 8.75 9.38968 8.82902 9.53033 8.96967C9.67098 9.11032 9.75 9.30109 9.75 9.5V17.5C9.74741 17.6981 9.66756 17.8874 9.52747 18.0275C9.38737 18.1676 9.19811 18.2474 9 18.25Z"
                  fill="#0066BE"
                />
                <path
                  d="M12 18.25C11.8019 18.2474 11.6126 18.1676 11.4725 18.0275C11.3324 17.8874 11.2526 17.6981 11.25 17.5V9.5C11.25 9.30109 11.329 9.11032 11.4697 8.96967C11.6103 8.82902 11.8011 8.75 12 8.75C12.1989 8.75 12.3897 8.82902 12.5303 8.96967C12.671 9.11032 12.75 9.30109 12.75 9.5V17.5C12.7474 17.6981 12.6676 17.8874 12.5275 18.0275C12.3874 18.1676 12.1981 18.2474 12 18.25Z"
                  fill="#0066BE"
                />
              </svg>
            </button>:<button
              className="btn btn-primary btn-filled save"
              onClick={(e) => showDeleteButtons()}
            >Cancel</button>}
          </div>:null}
      
      </div>
    </div>
    <div className="smart-list-result">
          <div className="col smartlist-result-block">
       
            {!deletestatus?    <div className="smartlist_box_block">
                  <div className="smartlist-add smartlist-view">
                 
                      <Link to="/webinar/email/SmartListCreate">
              <img src={path_image + "add-button.svg"} alt="" />
            </Link>
                        <p>Create New Smart List</p>
                   
                  </div>
                </div>:null}
            
            {typeof smartListData !== "undefined" &&
            smartListData.length > 0 ? (
              smartListData.map((data) => {
                return (
                  <div className="smartlist_box_block">
                    <div className="smartlist-view email_box">
                      <div className="mail-box-content">
                        <h5>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h5>

                        <div className="mailbox-table">
                          <table>
                            <tbody>
                              <tr>
                                <th>Contact Type</th>
                                <td>{data.contact_type?data.contact_type:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Speciality</th>
                                <td>{data.speciality?data.speciality:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Readers</th>
                                <td>{data.reader_selection?data.reader_selection:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>IBU</th>
                                <td>{data.ibu?data.ibu:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Product</th>
                                <td>{data.product?data.product:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Country</th>
                                <td>{data.country?data.country:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Registered</th>
                                <td>{data.registered?data.registered:"N/A"}</td>
                              </tr>
                              <tr>
                                <th>Created By</th>
                                <td>
                                  <span>{data.creator?data.creator:"N/A"}</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mail-time">
                          <span>{data.mod_date}</span>
                        </div>
                        <div className="smart-list-added-user">
                          <img
                            src={path_image + "smartlist-user.svg"}
                            alt="User icon"
                          />
                          {data.count}
                        </div>
                        {/* <div className="mail-stats">
                            <ul>

                              <li><div className="mail-status smartlist_view">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.65531 2.57856C10.3951 3.04241 10.9139 3.82733 11.0083 4.73845C11.31 4.87942 11.6449 4.96049 11.9999 4.96049C13.296 4.96049 14.3465 3.91 14.3465 2.6141C14.3465 1.31801 13.296 0.267517 11.9999 0.267517C10.7162 0.267916 9.67488 1.29964 9.65531 2.57856ZM8.11801 7.38316C9.4141 7.38316 10.4646 6.33246 10.4646 5.03657C10.4646 3.74067 9.4139 2.69018 8.11801 2.69018C6.82211 2.69018 5.77102 3.74087 5.77102 5.03677C5.77102 6.33266 6.82211 7.38316 8.11801 7.38316ZM9.11339 7.5431H7.12223C5.46552 7.5431 4.11771 8.89111 4.11771 10.5478V12.9829L4.1239 13.021L4.29163 13.0735C5.87266 13.5675 7.24622 13.7322 8.37679 13.7322C10.585 13.7322 11.8649 13.1027 11.9438 13.0625L12.1005 12.9833H12.1173V10.5478C12.1179 8.89111 10.7701 7.5431 9.11339 7.5431ZM12.9957 5.12063H11.0199C10.9985 5.91115 10.6611 6.62299 10.1273 7.13496C11.6 7.57285 12.6774 8.93843 12.6774 10.5514V11.3018C14.6282 11.2303 15.7524 10.6774 15.8265 10.6403L15.9832 10.5608H16V8.12495C16 6.46844 14.6522 5.12063 12.9957 5.12063ZM4.0005 4.96089C4.45955 4.96089 4.88666 4.82691 5.24847 4.59868C5.36348 3.8485 5.76563 3.19296 6.3401 2.74649C6.34249 2.70256 6.34669 2.65903 6.34669 2.6147C6.34669 1.31861 5.29599 0.268116 4.0005 0.268116C2.70421 0.268116 1.65391 1.31861 1.65391 2.6147C1.65391 3.9102 2.70421 4.96089 4.0005 4.96089ZM6.10787 7.13496C5.57674 6.62559 5.24048 5.91754 5.21592 5.13181C5.14264 5.12642 5.07016 5.12063 4.99548 5.12063H3.00452C1.34781 5.12063 0 6.46844 0 8.12495V10.5604L0.00618994 10.5979L0.173917 10.6508C1.44226 11.0468 2.57422 11.2293 3.55742 11.2868V10.5514C3.55782 8.93843 4.63487 7.57325 6.10787 7.13496Z" fill="#FAC755"/>
                                  </svg>
                              </div><span>10%</span></li>
                              <li><div className="mail-status mail_click">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z" fill="#C8D1D9"/>
                                  <path d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z" fill="#C8D1D9"/>
                                  </svg>
                              </div><span>60%</span></li>
                            </ul>
                          </div> */}
                        <div className="smartlist-buttons">   
                                <Link
                                  className="btn btn-primary btn-bordered edit_list"
                                  to={`/webinar/email/editSmartList/${data.id}/${data.name}/${data.file_upload?1:0}`}
                                  onClick={() => {localStorage.setItem("SmartListIdView",data.id);localStorage.setItem("SmartListIdViewName",data.name);localStorage.setItem("SmartListIdViewN",data.file_upload?1:0)}}
                                >
                                  Edit List
                                </Link>
                              
                              <Link
                                className="btn btn-primary btn-filled view"
                                to={`/webinar/email/smart-list-view/${data.id}`}
                                 onClick={() => localStorage.setItem("SmartListIdView",data.id)}
                              >
                                View
                              </Link>
                       
                        </div>
                        {deletestatus && (
                          <div className="dlt_btn">
                            <button
                               onClick={(e) => showConfirmationPopup(data.id)}
                            >
                              <img
                                src={path_image + "delete.svg"}
                                alt="Delete Row"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="not_found">No Data Found</div>
            )}
          </div>
        </div>
     </div></>}
   
     <Modal
        show={getSmartListPopupStatus}
        className="smart_list_popup"
        id="smart_list_popup_id"
      >
        <Modal.Header>
          <h5 className="modal-title" id="staticBackdropLabel">
            
              {smartName}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={() =>
              setSmartListPopupStatus(
                (getSmartListPopupStatus) => !getSmartListPopupStatus
              )
            }
          ></button>
        </Modal.Header>
        <Modal.Body>
          <section className="search-hcp">
            <div className="result-hcp-table">
              <div className="table-title">
                <h4>
                  HCPs{" "}
                  <span>
                    |
                    {typeof editList !== "undefined" &&
                      editList.length > 0 &&
                      editList.length}
                  </span>
                </h4>
              </div>
              <div className="selected-hcp-list">
                <table className="table">
                  <thead className="sticky-header">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                    
                      <th scope="col">Country</th>
                     
                      <th scope="col">Contact Type</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeof editList !== "undefined" &&
                      editList.length > 0 &&
                      editList.map((rr, i) => {
                        return (
                          <>
                            <tr>
                              <td>{rr.name}</td>
                              <td>{rr.email}</td>
                             
                              <td>{rr.country}</td>
                              
                              <td>{rr.type}</td>
                              <td></td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>

     <Modal
          className="modal send-confirm"
          id="delete-confirm"
          show={confirmationpopup}
        >
          <Modal.Header>
            {/* <Modal.Title>Heading Text</Modal.Title>*/}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={(e) => hideConfirmationModal()}
            ></button>
          </Modal.Header>

          <Modal.Body>
            <img src={path_image + "alert.png"} alt="" />
            <h4>
              The Smart List will be deleted from the list.
              <br />
              Are you sure you want to delete it?
            </h4>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={(e) => deleteEmail()}
              >
                Yes Please!
              </button>
              <button
                type="button"
                className="btn btn-primary btn-bordered light"
                onClick={(e) => hideConfirmationModal()}
              >
                Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
        </>
  )
}

export default SmartListWebinar