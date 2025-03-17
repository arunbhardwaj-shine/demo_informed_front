import { surveyAxiosInstance } from "../CommonFunctions/CommonFunction";
import {
  Accordion,
  Button,
  Col,
  Row,
  Tab,
  Tabs,
  Form,
  Modal,
} from "react-bootstrap";
import { useState, useEffect,useRef } from "react";
import { connect } from "react-redux";
import { loader } from "../../../loader";
import { toast } from "react-toastify";
import { surveyEndpoints } from "../SurveyEndpoints/SurveyEndpoints";
import SelectSurvey from "./surveyEmailEngineComponents/SelectSurvey";
import { getEmailData,getSelected } from "../../../actions";
import {  useNavigate, useLocation } from "react-router-dom";

var state_object = {};
const CreateSurveyEmail = (props) => {
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { state } = useLocation();
  const { FETCH_SURVEY_DATA } = surveyEndpoints;
  const [SendListData, setSendListData] = useState([]);
  const [isPdfSelected, setIsPdfSelected] = useState(state_object?.survey_id ? state_object?.survey_id : 0)
  const [currentSelectedSublink,setCurrentSelectedSublink]=useState(state_object?.sublink_id ? state_object?.sublink_id : 0)
  const [search, setSearch] = useState("");
  const [getoriginalSurveylistdata, setOriginalSurveyData] = useState([]);
  const [submiHandle, setSubmiHandle] = useState("");
  const [showfilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({});
  const [irtRoleObj,setIRTRoleObj] = useState(
      typeof state?.IrtObj !== "undefined" ? state?.IrtObj : {}
  );
  const navigate = useNavigate();
 
 
     const [filterdata, setFilterData] = useState({

       
     });
     const [filterApplyflag, setFilterApplyflag] = useState(0);
     const [filterObject, setFilterObject] = useState({});
     const [appliedFilter, setAppliedFilter] = useState({});
     const [otherFilter, setOtherFilter] = useState({});


 const searchChange = (e) => {
  setSearch(e.target.value);
};


const submitHandler = (event) => {
  event.preventDefault();
  setShowFilter(false);
  applyFilter();
  setSubmiHandle(1);
  return false;
};

  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowFilter(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);


  const removeindividualfilter = (key, item) => {
    let old_object = filterObject;
    let otherFilterObj = otherFilter;
    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
      // if (old_object[key].includes("All")) {
      //   const allIndex = old_object[key]?.indexOf("All");
      //   old_object[key]?.splice(allIndex, 1);
      //   delete otherFilterObj[key];
      // }
      old_object[key]?.splice(index, 1);
      otherFilterObj[key]?.splice(index, 1);

      if (old_object[key]?.length == 0) {
        delete old_object[key];
        delete otherFilterObj[key];
      }
    }
    setAppliedFilter(old_object);
    setOtherFilter(otherFilterObj);
    setFilterObject(old_object);
    applyFilter();
  };
  




  const clearFilter = () => {
    // loader("show")
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });

    setAppliedFilter({});
    setOtherFilter({});
    setFilterObject({});

    setSendListData(getoriginalSurveylistdata);
    setShowFilter(false);
  };


  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(appliedFilter));
    let otherObj = JSON.parse(JSON.stringify(otherFilter));
    if (!newObj[key]) {
      newObj[key] = [];
    }
    if (!otherObj[key]) {
      otherObj[key] = [];
    }

    if (e?.target?.checked == true) {
      if (
      
        key == "Radio"
      ) {
        newObj[key] = [];
        newObj[key]?.push(item);
        otherObj[key] = [];
        otherObj[key]?.push(item);
      } else {
        if (item == "All") {
          newObj[key] = ["All"];
          otherObj[key] = data;
        } else {
          newObj[key]?.push(item);
          otherObj[key]?.push(item);
 
        }
      }
    } else {
      if (item == "All") {
        newObj[key] = [];
        otherObj[key] = [];
      } else {
        if (newObj[key].includes("All")) {
          newObj[key] = newObj[key].filter((item) => item != "All");
          otherObj[key] = otherObj[key].filter((item) => item != "All");
        }
        const index = newObj[key]?.indexOf(item);
        if (index > -1) {
          newObj[key]?.splice(index, 1);
          if (newObj[key]?.length == 0) {
            delete otherObj[key];
            delete newObj[key];
          }
        }
      }

      const otherIndex = otherObj[key]?.indexOf(item);
      if (otherIndex > -1) {
        otherObj[key]?.splice(otherIndex, 1);
        if (otherObj[key]?.length == 0) {
          delete otherObj[key];
        }
        newObj[key] = otherObj[key];
      }
    }
    setOtherFilter(otherObj);
    setAppliedFilter(newObj);
  };

    useEffect(() => {
      if (search === "") {
        applyFilter();
      }
    }, [search]);

  const applyFilter = (flag = "") => {
    setFilterApplyflag(1);
    setSendListData([]);
    setFilterObject(appliedFilter);
    const hasAllNonEmptyValues = Object.keys(otherFilter).every((key) => {
      const value = filter[key];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== undefined && value !== "";
    });

    if (!hasAllNonEmptyValues) {
      let data = getoriginalSurveylistdata?.filter((item) => {
        const matchesFilters = Object.keys(otherFilter).every((key) => {
          if (Array.isArray(otherFilter[key])) {
            return otherFilter[key].some((value) => {
              if (typeof value === "string") {
                if (key == "Survey") {
                  let filterValue =
                    value == "Draft"
                      ? 0
                      : value == "Live"
                      ? 1
                      : value == "Completed"
                      ? 2
                      : 0;
                  return item["is_draft"] == filterValue;
                } else {
           
                  return item[key] && item[key].includes(value);
                }
              } else if (typeof value === "number") { 
              }
              return false;
            });
          }
          return true;
        });
        return matchesFilters;
      });
      if (search?.trim()?.length > 0) {
        data = data?.filter((item) => {
          return item?.survey_title
            ?.toLowerCase()
            ?.includes(search?.toLowerCase());
        });
      }
      setSendListData(data);
    } else if (search?.trim()?.length > 0) {
 
      const data = getoriginalSurveylistdata?.filter((item) => {
        return (
          item?.survey_title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.creator_name?.toLowerCase()?.includes(search?.toLowerCase())
        );
      });
      setSendListData(data);
    } else {
      setSendListData(getoriginalSurveylistdata);
    }
    setShowFilter(false);
  };


  useEffect(() => {
    getContentData(0, 1);
  }, []);

  const handlePdfSelection = (id) => {
    setIsPdfSelected(id);
  };

  const getContentData = async (flag, page, value = "") => {
     

    const body = {
      survey_id: 0,
      is_live:1
      
    };

    try {
      loader("show");
      const response = await surveyAxiosInstance.post(FETCH_SURVEY_DATA, body);
      if (response.data.status == "success") {
        setSendListData(response.data.data);
        setOriginalSurveyData(response.data.data)
       
      }

      const filters=await surveyAxiosInstance.get("/survey/survey-filters")

      if(filters.status == 201){
        setFilterData(filters?.data?.data)
      }

       

      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };


  const nextClicked=()=>{
    props.getEmailData({sublink_id:currentSelectedSublink,survey_id:isPdfSelected,PdfSelected: 1});
    navigate("/survey/email/create-email", {
      state: { PdfSelected: 1,IrtObj:irtRoleObj }
    })
  }

  const handleBackClick = () => {
    navigate("/survey/email");
  }




  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                  <button className="btn btn-primary btn-bordered back" onClick={handleBackClick}>
                       Back
                    </button>

                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="" onClick={(e) => e.preventDefault()}>Select Survey</a>
                    </li>
                    <li className="">
                      <a href="">Create Your Email</a>
                    </li>

                    {
                      <li className="">
                        <a href="">Select HCPs</a>
                      </li>
                    }
                    <li className="">
                      <a href="">Verify your list</a>
                    </li>
                    <li className="">
                      <a href="">Verify your Email</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered cancel"
                      onClick={handleBackClick}
                    >
                      Cancel
                    </button>

                    {isPdfSelected === 0 ? (
                      <button
                        // ref={inputElement}
                        className="btn btn-primary btn-filled next disabled"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        // ref={inputElement}
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
                <h4>Select your content</h4>
              </div>
              <div className="top-right-action">
                <div className={`search-bar ${SendListData.length < 1 ? "disabled" : ""}`}>
                  <form className="d-flex"
                   onSubmit={(e) => submitHandler(e)}
                   >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search by survey title"
                      aria-label="Search"
                      id="email_search"
                      onChange={(e) => searchChange(e)}
                    />
                    <button className="btn btn-outline" type="submit">
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
                      : `filter-by nav-item dropdown ${SendListData.length < 1 ? "disabled" : ""}`
                  }
                >
                  <button
                    ref={buttonRef}
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
                  
                  {/*Code for show filters*/}
                 

                  {showfilter && (
                    <div
                      ref={filterRef}
                      className="dropdown-menu filter-options"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      <h4>Filter By</h4>
                      <Accordion defaultActiveKey="0" flush>
                        {Object.keys(filterdata)?.map(function (key, index) {
                          return (
                            < React.Fragment key={index}>
                              {filterdata[key]?.length > 0 ? (
                                <Accordion.Item
                                  key={index}
                                  className={
                                    key == "role" ? "card upper" : "card"
                                  }
                                  eventKey={index}
                                >
                                  <Accordion.Header className="card-header">
                                    {key == "training_status_code"
                                      ? "Status"
                                      : key == "user_type"
                                      ? "Role"
                                      : key == "site_number"
                                      ? "Site"
                                      : key}
                                  </Accordion.Header>
                                  <Accordion.Body className="card-body">
                                    <ul>
                                      {filterdata[key]?.length
                                        ? filterdata[key]?.map(
                                            (item, index) => (
                                              <li key={index}>
                                                {item != "" ? (
                                                  <label className="select-multiple-option">
                                                    <input
                                                      type="checkbox"
                                                      id={`custom-checkbox-${item}-${index}`}
                                                      value={
                                                        typeof item == "object"
                                                          ? item?.title
                                                          : item
                                                      }
                                                      name={key}
                                                      checked={
                                                        typeof item == "object"
                                                          ? appliedFilter[
                                                              key
                                                            ]?.includes(item.id)
                                                            ? true
                                                            : false
                                                          : appliedFilter[
                                                              key
                                                            ]?.includes(item)
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={(e) =>
                                                        handleOnFilterChange(
                                                          e,
                                                          typeof item ==
                                                            "object"
                                                            ? item.id
                                                            : item,
                                                          index,
                                                          key,
                                                          [...filterdata[key]]
                                                        )
                                                      }
                                                    />
                                                    {typeof item == "object"
                                                      ? item?.title
                                                      : item}
                                                    <span className="checkmark"></span>
                                                  </label>
                                                ) : null}
                                              </li>
                                            )
                                          )
                                        : null}
                                    </ul>
                                  </Accordion.Body>
                                </Accordion.Item>
                              ) : null}
                            </React.Fragment>
                          );
                        })}
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
                          onClick={applyFilter}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}



                </div>

                

              </div>
            
            </div>

            {/*Code for filters start*/}

            

  {Object.keys(filterObject)?.length !== 0 && filterApplyflag > 0 ? (
              <div className="apply-filter">
                <div className="filter-block">
                  <div className="filter-block-left full">
                    {Object.keys(filterObject)?.map((key, index) => {
                      return (
                        < React.Fragment key={index}>
                          {filterObject[key]?.length ? (
                            <div key={index} className="filter-div">
                              <div className="filter-div-title">
                                <span>
                                  {key == "training_status_code"
                                    ? "Status"
                                    : key == "user_type"
                                    ? "Role"
                                    : key == "site_number"
                                    ? "Site"
                                    : key}{" "}
                                  |
                                </span>
                              </div>

                              <div className="filter-div-list">
                                {filterObject[key]?.map((item, index) => (
                                  <div
                                    key={index}
                                    className={
                                      key == "Role"
                                        ? "filter-result upper"
                                        : "filter-result"
                                    }
                                  >
                                    {item}
                                    <img
                                      src={path_image + "filter-close.svg"}
                                      onClick={() =>
                                        removeindividualfilter(key, item)
                                      }
                                      alt="Close-filter"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className="clear-filter">
                    <button
                      className="btn btn-outline-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            
            {/*Code for filters end*/}

            <SelectSurvey SendListData={SendListData} setSendListData={setSendListData} handlePdfSelection={handlePdfSelection} setCurrentSelectedSublink={setCurrentSelectedSublink} selectedSurvey={isPdfSelected} selectedSublink={currentSelectedSublink}/>
          </div>
          {/* {typeof SendListData !== "undefined" &&
              SendListData.length == 30 &&
              getloadmore === 0 && (
                <div className="load_more">
                  <button
                    className="btn btn-primary btn-filled"
                    onClick={load_more}
                  >
                    Load More
                  </button>
                </div>
              )} */}
        </div>
      </div>
    </>
  );
};



const mapStateToProps = (state) => {
  state_object = state.getEmailData;
  return state;
};

export default connect(mapStateToProps, {
 getEmailData: getEmailData,
})(CreateSurveyEmail);


 
