import { useState, useEffect, useRef, React } from "react"; 
import { Button, Col, Row, Accordion } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import { loader } from "../../loader";
import { Spinner } from "react-activity";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { surveyEndpoints } from "./SurveyEndpoints/SurveyEndpoints";
import { analyticButtonClicked } from "./CommonFunctions/CommonFunction";
import SublinkModal from "./SurveyEmailEngine/Modals/SublinkModal";
import TopicModals from "./SurveyEmailEngine/Modals/TopicModals";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const SurveySublink = () => {
  const {
    FETCH_ALL_SURVEY_TITLE,
    FETCH_SURVEY_SUBLINK,
    INSERT_SUBLINK_INFORMATION,
    FETCH_SURVEY_DATA,
  } = surveyEndpoints;
  const { state } = useLocation();
  const [allContents, setallContents] = useState([]);
  const [allCodes, setAllCodes] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState();
  const [showfilter, setShowFilter] = useState(false);
  const [libraryData, setLibraryData] = useState([]);
  const [createNewLink, setCreateNewLink] = useState(false);
  const [subLinkData, setSubLinkData] = useState([]);
  const [isAccordionOpening, setIsAccordionOpening] = useState(true);
  const [currentAddSublinkLid, setCurrentAddSublinkLid] = useState(null);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [selectedSublinkId, setSelectedSublinkId] = useState({});
  const [qrState, setQr] = useState({ value: "" });
  const [sectionLoader, setSectionLoader] = useState(false);
  const [getoriginalSurveylistdata, setOriginalSurveyData] = useState([]);
  const navigate = useNavigate();
  const [showSubLinkList, setshowSubLinkList] = useState(false);
  const [linkRenderCount, setLinkRenderCount] = useState(0);
  const [editTopic, setEditTopic] = useState();
  const [show, setShow] = useState(false);
  const [modalCounter, setModalCounter] = useState(0);
  const [finalTags, setFinalTags] = useState([]);
  const [tagsReRender, setTagsReRender] = useState(0);
  const [newTag, setNewTag] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [search, setSearch] = useState("");
  const [tagClickedFirst, setTagClickedFirst] = useState([]);
  const [tagsCounter, setTagsCounter] = useState(0);
  const [filter, setFilter] = useState({});
  const [error, setError] = useState({});
  const [submiHandle, setSubmiHandle] = useState("");
  const [flag, setFlag] = useState(0);
  const [defaultAccordion, setDefaultOpenAccordion] = useState("initial");
  const [identifier, setIdentifier] = useState("");
  const [data, setIsData] = useState([]);
  const buttonRef = useRef(null);
  const filterRef = useRef(null);
  const accordionRef = useRef(null);

  const [activeKey, setActiveKey] = useState(null); // Controls open items


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

  const [newLink, setLink] = useState({
    delivery: "",
  });

  const [types, setTypes] = useState([
    { value: "Online ", label: "Online Offer" },
  ]);
  const [filterdata, setFilterData] = useState({});
  const [filterApplyflag, setFilterApplyflag] = useState(0);
  const [filterObject, setFilterObject] = useState({});
  const [appliedFilter, setAppliedFilter] = useState({});
  const [otherFilter, setOtherFilter] = useState({});

  const clearFilter = () => {
    // loader("show")
    document.querySelectorAll("input")?.forEach((checkbox) => {
      checkbox.checked = false;
    });

    setAppliedFilter({});
    setOtherFilter({});
    setFilterObject({});

    setIsData(getoriginalSurveylistdata);
    setShowFilter(false);

    toggleAccordion(null)
    setOpenAccordionId(null);
    setSubLinkData([]);
  };



  const showSublinkModal = (id) => {
    setCurrentAddSublinkLid(id);
    setCreateNewLink(true);
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
      if (key == "Radio") {
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

  const copyHandler = (surveyLink) => {
    navigator.clipboard
      .writeText(surveyLink)
      .then(() => {
        toast.success("Survey Link Copied");
      })
      .catch((err) => {
        toast.error("Failed to copy Survey Link");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") != "56Ek4feL/1A8mZgIKQWEqg==") {
      let linktype = types;
      linktype.push(
        { value: "Offline Offer", label: "Offline Offer" },
        { value: "Sunshine", label: "Sunshine" }
      );
      setTypes(linktype);
    }

    getSurveyData();
  }, []);

  useEffect(() => {
    if (selectedSurveyId) {
      getArticleData();
    }
  }, [selectedSurveyId]);

  useEffect(() => {
    if (getoriginalSurveylistdata.length && state?.survey_id) {

      const selectedSurveyIndex = Array.isArray(data)
        ? data.findIndex((item) => item.survey_id === state?.survey_id)
        : -1;

        toggleAccordion(selectedSurveyIndex)

      setDefaultOpenAccordion(
        selectedSurveyIndex != -1 ? selectedSurveyIndex : 0
      );

    } else if (data.length) {

      toggleAccordion(null)
      setDefaultOpenAccordion(null);
    }
  }, [getoriginalSurveylistdata]);

  useEffect(() => {
    const element = document.getElementById("defaultOpened");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [defaultAccordion]);

  const getSurveyData = async () => {
    try {
      loader("show");
      const res = await surveyAxiosInstance.post(FETCH_SURVEY_DATA, {
        survey_id: 0,
        is_live: 1,
      });
      setIsData(res.data.data);
      setOriginalSurveyData(res.data.data);
      const filters = await surveyAxiosInstance.get("/survey/survey-filters");
      if (filters.status == 201) {
        setFilterData(filters?.data?.data);
      }
      if (state?.survey_id) {
        getSubLinkListingData(state?.survey_id);
      }
      loader("hide");
    } catch (err) {
      console.log("err");
      toast.error("Something went wrong");
    } finally {
      loader("hide");
    }
  };

  const downloadQRCode = (title = "") => {
    const canvas = document.getElementById("qr-gen");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = title ? title + ".png" : `QR-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("Canvas element not found");
    }
  };

  const onArticleChange = async (event) => {
    setSelectedSurveyId(event.value);
  };

  const createNewLinkClicked = () => {
    setCreateNewLink(true);
  };
  const handleChange = (name, e) => {
    setLink({ ...newLink, [name]: e });
  };

  const handleSubmit = async () => {
    try {
      loader("show");
      let body = {
        survey_id: selectedSurveyId,
        delivery: newLink.delivery,
        identifier: identifier,
      };
      const res = await surveyAxiosInstance.post(
        INSERT_SUBLINK_INFORMATION,
        body
      );
      setLink((prevLink) => ({
        ...prevLink,
        delivery: "", // Clear the delivery field
      }));
      setshowSubLinkList(true);
      setLinkRenderCount((prevCount) => prevCount + 1); // Increment render count
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      loader("hide");
    }
    setCreateNewLink(false);
  };

  const getArticleData = async () => {
    try {
      loader("show");

      setIsData([]);

      // let res = await surveyAxiosInstance.post(FETCH_SURVEY_DATA, {
      //   admin_id: 18207,
      //   survey_id: selectedSurveyId,
      // });
      let res = await surveyAxiosInstance.post(FETCH_SURVEY_DATA, {
        survey_id: selectedSurveyId,
      });

      const survey_data = res?.data?.data;

      if (survey_data.length > 0) {
        setIsData(survey_data[0]);
      }

      loader("hide");
    } catch (error) {
      loader("hide");
      toast.error("Something went wrong");
    }
  };

  const applyFilter = (flag = "") => {
    toggleAccordion(null)
    setOpenAccordionId(null);
    setSubLinkData([]);
    setFilterApplyflag(1);
    setIsData([]);
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
      setIsData(data);
    } else if (search?.trim()?.length > 0) {
      const data = getoriginalSurveylistdata?.filter((item) => {
        return (
          item?.survey_title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.creator_name?.toLowerCase()?.includes(search?.toLowerCase())
        );
      });
      setIsData(data);
    } else {
      setIsData(getoriginalSurveylistdata);
    }
    setShowFilter(false);
  };

  const onIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };

  const getSubLinkListingData = async (survey_id) => {
    // e.preventDefault();

    if (openAccordionId === survey_id) {
      // If the same accordion is clicked again, close it
      setOpenAccordionId(null);
      setSubLinkData([]);
      return;
    }

    // Update open accordion ID
    setOpenAccordionId(survey_id);
    setSectionLoader(true);
    setSubLinkData([]);

    try {
      const res = await surveyAxiosInstance.post(FETCH_SURVEY_SUBLINK, {
        survey_id,
      });

      if (res.status === 200) {
        setSubLinkData(res?.data?.data);
      }
    } catch (err) {
      console.error("Error fetching sublinks:", err);
    } finally {
      setSectionLoader(false);
    }
  };

  const handleTopicModalShow = (id) => {
    setEditTopic(id);
    setShow(!show);
  };

  const removeindividualfilter = (key, item) => {
    let old_object = filterObject;
    let otherFilterObj = otherFilter;
    const index = old_object[key]?.indexOf(item);
    if (index > -1) {
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

  const toggleAccordion = (index) => {
    setActiveKey((prevKey) => ((prevKey === String(index) || null) ? null : String(index)));
  };

  useEffect(() => {
    if (search === "") {
      applyFilter();
    }
  }, [search]);

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

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <h2>SubLinks</h2>
              </div>
              <div className="top-right-action">
                <div
                  className={`search-bar ${
                    getoriginalSurveylistdata.length < 1 ? "disabled" : ""
                  }`}
                >
                  <form className="d-flex" onSubmit={(e) => submitHandler(e)}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search by survey title"
                      aria-label="Search"
                      id="email_search"
                      value={search}
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
                      : `filter-by nav-item dropdown ${
                          data.length < 1 ? "disabled" : ""
                        }`
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
                            <>
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
                                      : key == "creator_name"
                                      ? "Creator"
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
                            </>
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

            {Object.keys(filterObject)?.length !== 0 && filterApplyflag > 0 ? (
              <div className="apply-filter">
                <div className="filter-block">
                  <div className="filter-block-left full">
                    {Object.keys(filterObject)?.map((key, index) => {
                      return (
                        <>
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
                                    : key == "creator_name"
                                    ? "Creator"
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
                        </>
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

            <div className="create-change-content survey-sublink">
              <div className="form_action">
                <div className="row">
                  <Col md={12}>
                    <div className="survey-sublink">
                      <h5>
                        Primary Links | <span>{data.length}</span>
                      </h5>
                      <div className="survey-builder">
                        <div className="survey-listing">
                          <div className="library-content-box-layuot">
                            <div className="email_box_block">
                              <div className="mail-box-acccordion">
                                {defaultAccordion != "initial" && (
                                  <Accordion
                                    activeKey={activeKey}
                                  >
                                    {data?.length > 0 ? (
                                      data?.map((item, index) => (
                                        <>
                                          <div className="accordion-block">
                                            <div className="mail-box-content">
                                              <div className="mail-box-content-top d-flex justify-content-between">
                                                <div className="mail-box-content-top-left">
                                                  <h5>{item.survey_title}</h5>
                                                  <p>{item.subtitle}</p>
                                                  <div className="mailbox-tags">
                                                    <ul>
                                                      {JSON.parse(item?.tags)
                                                        ?.length > 0 ? (
                                                        JSON.parse(
                                                          item.tags
                                                        ).map((tag, index) => (
                                                          <li key={index}>
                                                            {tag}
                                                          </li>
                                                        ))
                                                      ) : (
                                                        <li>N/A</li>
                                                      )}
                                                    </ul>
                                                  </div>

                                                  <div className="tab-content-links">
                                                    <a>
                                                      https://survey.docintel.app/survey_demo?Utmde=
                                                      {item.unique_code}
                                                    </a>
                                                    {item?.is_draft ? (
                                                      <span
                                                        className="copy-content"
                                                        onClick={() =>
                                                          copyHandler(
                                                            `https://survey.docintel.app/survey_demo?Utmde=${item.unique_code}`
                                                          )
                                                        }
                                                      >
                                                        <img
                                                          src={
                                                            path_image +
                                                            "copy-content.svg"
                                                          }
                                                          alt="Copy"
                                                        />
                                                      </span>
                                                    ) : (
                                                      <span className="copy-content">
                                                        <img
                                                          src={
                                                            path_image +
                                                            "copy-content-disabled.svg"
                                                          }
                                                          alt="Copy"
                                                        />
                                                      </span>
                                                    )}

                                                    {item?.is_draft ? (
                                                      <div
                                                        className="tab-content-qr"
                                                        onClick={() => {
                                                          setQr({
                                                            ...qrState,
                                                            value: `https://survey.docintel.app/survey_demo?Utmde=${item.unique_code}&dl=QR`,
                                                          });
                                                          setTimeout(
                                                            function () {
                                                              downloadQRCode(
                                                                item?.survey_link_title
                                                              );
                                                            },
                                                            500
                                                          );
                                                        }}
                                                      >
                                                        <img
                                                          src={
                                                            path_image +
                                                            "qr-code-icon.svg"
                                                          }
                                                          alt="QR"
                                                        />
                                                        <img
                                                          src={
                                                            path_image +
                                                            "download-icon.svg"
                                                          }
                                                          alt="Download"
                                                        />
                                                      </div>
                                                    ) : (
                                                      <div className="tab-content-qr">
                                                        <img
                                                          src={
                                                            path_image +
                                                            "qr-code-icon-disabled.svg"
                                                          }
                                                          alt="QR"
                                                        />
                                                        <img
                                                          src={
                                                            path_image +
                                                            "download-icon-disabled.svg"
                                                          }
                                                          alt="Download"
                                                        />
                                                      </div>
                                                    )}
                                                  </div>
                                                  <div className="mail-time">
                                                    <span>
                                                      {/* {new Date().toLocaleDateString()} */}
                                                      {item.createdDate}
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="mail-box-content-top-right">
                                                  {data?.is_draft != null &&
                                                  data?.is_draft == "0" ? (
                                                    <div className="mail-stats">
                                                      <ul>
                                                        <li>
                                                          <div
                                                            className="mail-status irts"
                                                            title="Sublinks"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M9.59862 1.09837L6.34653 4.35044C6.34025 4.35669 6.33634 4.36428 6.33009 4.37059C7.13125 4.25391 7.95428 4.33391 8.71722 4.63141L10.9244 2.42422C11.6556 1.693 12.8448 1.693 13.5761 2.42422C14.3073 3.15537 14.3073 4.34466 13.5761 5.07581C13.4514 5.20056 10.136 8.51597 10.324 8.32787C9.587 9.06494 8.37787 9.03341 7.67234 8.32787C7.30694 7.96247 6.712 7.96247 6.34653 8.32787L5.77734 8.89706C5.93522 9.16531 6.11622 9.42344 6.34653 9.65375C7.73528 11.0425 10.1257 11.1534 11.6297 9.67019C11.636 9.66394 11.6435 9.66 11.6498 9.65375L14.9019 6.40169C16.3663 4.93719 16.3663 2.56287 14.9019 1.09837C13.4374 -0.366125 11.0631 -0.366125 9.59862 1.09837Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                              <path
                                                                d="M7.29013 11.3608L5.07582 13.5751C4.34466 14.3063 3.15538 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54891 10.7987 5.87141 7.47623 5.68338 7.66426C6.42038 6.92726 7.62951 6.95873 8.33504 7.66426C8.70044 8.02973 9.29541 8.02973 9.66085 7.66426L10.23 7.09507C10.0722 6.82682 9.89116 6.56869 9.66085 6.33844C8.27476 4.95229 5.88607 4.83435 4.3777 6.32198C4.37141 6.32823 4.36385 6.33216 4.35754 6.33844L1.09835 9.59763C-0.366086 11.0621 -0.366148 13.4364 1.09835 14.9009C2.56285 16.3654 4.93723 16.3654 6.40166 14.9009L9.66082 11.6417C9.6671 11.6355 9.67101 11.6279 9.67726 11.6216C8.8761 11.7383 8.0531 11.6583 7.29013 11.3608Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>0</span>
                                                        </li>
                                                        <li>
                                                          <div
                                                            className="mail-status mail-hit"
                                                            title="Link opening"
                                                          >
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
                                                          <span>0</span>
                                                        </li>
                                                        <li>
                                                          <div
                                                            className="mail-status mail_view"
                                                            title="Started"
                                                          >
                                                            <svg
                                                              width="17"
                                                              height="16"
                                                              viewBox="0 0 17 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M6.46443 6.80015C8.34247 6.80015 9.86464 5.27769 9.86464 3.39993C9.86464 1.52217 8.34218 0 6.46443 0C4.58667 0 3.06363 1.52246 3.06363 3.40022C3.06363 5.27797 4.58667 6.80015 6.46443 6.80015Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                              <path
                                                                d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>0 </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                            className="mail-status mail_click"
                                                            title="Completed"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M5.79646 6.80015C7.6745 6.80015 9.19667 5.27769 9.19667 3.39993C9.19667 1.52217 7.67421 0 5.79646 0C3.9187 0 2.39566 1.52246 2.39566 3.40022C2.39566 5.27797 3.9187 6.80015 5.79646 6.80015Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                              <path
                                                                d="M7.23877 7.0319H4.35356C1.95298 7.0319 0 8.98517 0 11.3858V14.9141L0.00896932 14.9694L0.252007 15.0455C2.54293 15.7613 4.53324 16 6.17143 16C7.54179 16 8.66543 15.8327 9.5113 15.6368C8.78091 14.8611 8.33333 13.8162 8.33333 12.6667C8.33333 10.9692 9.30935 9.4997 10.7308 8.78873C9.93663 7.7232 8.66691 7.0319 7.23877 7.0319Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M9.33333 12.6667C9.33333 10.8258 10.8258 9.33333 12.6667 9.33333C14.5076 9.33333 16 10.8258 16 12.6667C16 14.5076 14.5076 16 12.6667 16C10.8258 16 9.33333 14.5076 9.33333 12.6667ZM12.4583 14.0404L14.5652 11.9336C14.6073 11.8915 14.6407 11.8416 14.6634 11.7866C14.6862 11.7316 14.6979 11.6727 14.6979 11.6132C14.6979 11.5537 14.6862 11.4948 14.6634 11.4399C14.6406 11.3849 14.6072 11.335 14.5652 11.2929C14.5231 11.2508 14.4732 11.2175 14.4182 11.1947C14.3632 11.172 14.3043 11.1602 14.2448 11.1602C14.1853 11.1603 14.1264 11.172 14.0714 11.1947C14.0165 11.2175 13.9665 11.2509 13.9245 11.293L12.1379 13.0793L11.4087 12.3501C11.3669 12.3071 11.3169 12.2728 11.2617 12.2493C11.2064 12.2257 11.1471 12.2134 11.0871 12.213C11.027 12.2126 10.9675 12.2241 10.912 12.2469C10.8564 12.2697 10.806 12.3033 10.7635 12.3457C10.7211 12.3882 10.6875 12.4386 10.6647 12.4941C10.6419 12.5497 10.6304 12.6092 10.6308 12.6692C10.6312 12.7292 10.6436 12.7886 10.6671 12.8438C10.6907 12.899 10.7249 12.949 10.768 12.9909L11.8176 14.0404C11.8596 14.0824 11.9096 14.1158 11.9646 14.1386C12.0195 14.1614 12.0785 14.1731 12.138 14.1731C12.1975 14.1731 12.2564 14.1614 12.3114 14.1386C12.3663 14.1158 12.4163 14.0824 12.4583 14.0404Z"
                                                                fill="#97B6CF"
                                                                fillOpacity="0.6"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>0 </span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  ) : (
                                                    <div className="mail-stats">
                                                      <ul>
                                                        <li>
                                                          <div
                                                            className="mail-status mail_send"
                                                            title="Sublinks"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M9.59862 1.09837L6.34653 4.35044C6.34025 4.35669 6.33634 4.36428 6.33009 4.37059C7.13125 4.25391 7.95428 4.33391 8.71722 4.63141L10.9244 2.42422C11.6556 1.693 12.8448 1.693 13.5761 2.42422C14.3073 3.15537 14.3073 4.34466 13.5761 5.07581C13.4514 5.20056 10.136 8.51597 10.324 8.32787C9.587 9.06494 8.37787 9.03341 7.67234 8.32787C7.30694 7.96247 6.712 7.96247 6.34653 8.32787L5.77734 8.89706C5.93522 9.16531 6.11622 9.42344 6.34653 9.65375C7.73528 11.0425 10.1257 11.1534 11.6297 9.67019C11.636 9.66394 11.6435 9.66 11.6498 9.65375L14.9019 6.40169C16.3663 4.93719 16.3663 2.56287 14.9019 1.09837C13.4374 -0.366125 11.0631 -0.366125 9.59862 1.09837Z"
                                                                fill="#8A4E9C"
                                                                fillOpacity="1"
                                                              ></path>
                                                              <path
                                                                d="M7.29013 11.3608L5.07582 13.5751C4.34466 14.3063 3.15538 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54891 10.7987 5.87141 7.47623 5.68338 7.66426C6.42038 6.92726 7.62951 6.95873 8.33504 7.66426C8.70044 8.02973 9.29541 8.02973 9.66085 7.66426L10.23 7.09507C10.0722 6.82682 9.89116 6.56869 9.66085 6.33844C8.27476 4.95229 5.88607 4.83435 4.3777 6.32198C4.37141 6.32823 4.36385 6.33216 4.35754 6.33844L1.09835 9.59763C-0.366086 11.0621 -0.366148 13.4364 1.09835 14.9009C2.56285 16.3654 4.93723 16.3654 6.40166 14.9009L9.66082 11.6417C9.6671 11.6355 9.67101 11.6279 9.67726 11.6216C8.8761 11.7383 8.0531 11.6583 7.29013 11.3608Z"
                                                                fill="#8A4E9C"
                                                                fillOpacity="1"
                                                              ></path>
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {
                                                              item.total_sublinks
                                                            }
                                                          </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                            className="mail-status mail-hit"
                                                            title="Link opening"
                                                          >
                                                            <svg
                                                              width="14"
                                                              height="16"
                                                              viewBox="0 0 14 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z"
                                                                fill="#0066BE"
                                                              ></path>
                                                              <path
                                                                d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                                                fill="#0066BE"
                                                              ></path>
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {item.user_opening}
                                                          </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                            className="mail-status mail_view"
                                                            title="Started"
                                                          >
                                                            <svg
                                                              width="17"
                                                              height="16"
                                                              viewBox="0 0 17 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M6.46443 6.80015C8.34247 6.80015 9.86464 5.27769 9.86464 3.39993C9.86464 1.52217 8.34218 0 6.46443 0C4.58667 0 3.06363 1.52246 3.06363 3.40022C3.06363 5.27797 4.58667 6.80015 6.46443 6.80015Z"
                                                                fill="#FAC755"
                                                                fillOpacity="1"
                                                              ></path>
                                                              <path
                                                                d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                                fill="#FAC755"
                                                                fillOpacity="1"
                                                              ></path>
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                                fill="#FAC755"
                                                                fillOpacity="1"
                                                              ></path>
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {item.Dropoff}
                                                          </span>
                                                        </li>
                                                        <li>
                                                          <div
                                                            className="mail-status mail_click"
                                                            title="Completed"
                                                          >
                                                            <svg
                                                              width="16"
                                                              height="16"
                                                              viewBox="0 0 16 16"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M5.79646 6.80015C7.6745 6.80015 9.19667 5.27769 9.19667 3.39993C9.19667 1.52217 7.67421 0 5.79646 0C3.9187 0 2.39566 1.52246 2.39566 3.40022C2.39566 5.27797 3.9187 6.80015 5.79646 6.80015Z"
                                                                fill="#39CABC"
                                                              />
                                                              <path
                                                                d="M7.23877 7.0319H4.35356C1.95298 7.0319 0 8.98517 0 11.3858V14.9141L0.00896932 14.9694L0.252007 15.0455C2.54293 15.7613 4.53324 16 6.17143 16C7.54179 16 8.66543 15.8327 9.5113 15.6368C8.78091 14.8611 8.33333 13.8162 8.33333 12.6667C8.33333 10.9692 9.30935 9.4997 10.7308 8.78873C9.93663 7.7232 8.66691 7.0319 7.23877 7.0319Z"
                                                                fill="#39CABC"
                                                              />
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M9.33333 12.6667C9.33333 10.8258 10.8258 9.33333 12.6667 9.33333C14.5076 9.33333 16 10.8258 16 12.6667C16 14.5076 14.5076 16 12.6667 16C10.8258 16 9.33333 14.5076 9.33333 12.6667ZM12.4583 14.0404L14.5652 11.9336C14.6073 11.8915 14.6407 11.8416 14.6634 11.7866C14.6862 11.7316 14.6979 11.6727 14.6979 11.6132C14.6979 11.5537 14.6862 11.4948 14.6634 11.4399C14.6406 11.3849 14.6072 11.335 14.5652 11.2929C14.5231 11.2508 14.4732 11.2175 14.4182 11.1947C14.3632 11.172 14.3043 11.1602 14.2448 11.1602C14.1853 11.1603 14.1264 11.172 14.0714 11.1947C14.0165 11.2175 13.9665 11.2509 13.9245 11.293L12.1379 13.0793L11.4087 12.3501C11.3669 12.3071 11.3169 12.2728 11.2617 12.2493C11.2064 12.2257 11.1471 12.2134 11.0871 12.213C11.027 12.2126 10.9675 12.2241 10.912 12.2469C10.8564 12.2697 10.806 12.3033 10.7635 12.3457C10.7211 12.3882 10.6875 12.4386 10.6647 12.4941C10.6419 12.5497 10.6304 12.6092 10.6308 12.6692C10.6312 12.7292 10.6436 12.7886 10.6671 12.8438C10.6907 12.899 10.7249 12.949 10.768 12.9909L11.8176 14.0404C11.8596 14.0824 11.9096 14.1158 11.9646 14.1386C12.0195 14.1614 12.0785 14.1731 12.138 14.1731C12.1975 14.1731 12.2564 14.1614 12.3114 14.1386C12.3663 14.1158 12.4163 14.0824 12.4583 14.0404Z"
                                                                fill="#39CABC"
                                                              />
                                                            </svg>
                                                          </div>
                                                          <span>
                                                            {item.percentage}%
                                                          </span>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  )}

                                                  <div className="mailbox-buttons">
                                                    <div className="send_new">
                                                      {item?.is_draft == 0 ? (
                                                        <Button
                                                          className={
                                                            "btn-bordered send-new disabled"
                                                          }
                                                        >
                                                          Analytics
                                                        </Button>
                                                      ) : (
                                                        <Button
                                                          className={
                                                            "btn-bordered send-new"
                                                          }
                                                          onClick={() =>
                                                            analyticButtonClicked(
                                                              item,
                                                              navigate
                                                            )
                                                          }
                                                        >
                                                          Analytics
                                                        </Button>
                                                      )}
                                                    </div>
                                                    <div className="mailbox-buttons-list">
                                                      <Button
                                                        className={
                                                          item?.is_draft
                                                            ? "edit btn-filled"
                                                            : "edit btn-filled disabled"
                                                        }
                                                        onClick={(e) => {
                                                          window.open(
                                                            `https://survey.docintel.app/survey_demo?Utmde=${item.unique_code}`,
                                                            "_blank"
                                                          );
                                                        }}
                                                      >
                                                        Preview
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <Accordion.Item
                                              eventKey={String(index)}
                                              ref={accordionRef}
                                              id={
                                                defaultAccordion == index
                                                  ? "defaultOpened"
                                                  : ""
                                              }
                                            >
                                              <Accordion.Header
                                                className={
                                                  sectionLoader
                                                    ? "disabled"
                                                    : undefined
                                                }
                                                style={{
                                                  pointerEvents: sectionLoader
                                                    ? "none"
                                                    : "auto",
                                                }}
                                                onClick={(e) =>{
                                                  e.stopPropagation();
                                                  toggleAccordion(index);
                                                  getSubLinkListingData(
                                                    item.survey_id
                                                  )}
                                                }
                                              >
                                                SubLinks
                                              </Accordion.Header>
                                              <Accordion.Body>
                                                <div className="d-flex justify-content-between align-items-center">
                                                  <div className="sublink-title">
                                                    <h6>
                                                      SubLinks |{" "}
                                                      {subLinkData.length}
                                                    </h6>
                                                  </div>
                                                  <Button
                                                    className={`btn-dashed ${
                                                      sectionLoader
                                                        ? "disabled"
                                                        : ""
                                                    }`}
                                                    onClick={() => {
                                                      showSublinkModal(
                                                        item.survey_id
                                                      );
                                                    }}
                                                  >
                                                    Create New SubLink
                                                    <img
                                                      src={
                                                        path_image +
                                                        "add-icon.png"
                                                      }
                                                      alt="Plus"
                                                    />
                                                  </Button>
                                                </div>

                                                {sectionLoader ? (
                                                  <div
                                                    className="load_more"
                                                    style={{
                                                      margin: "10 auto",
                                                      justifyContent: "center",
                                                      display: "flex",
                                                      height: 180,
                                                    }}
                                                  >
                                                    <Spinner
                                                      color="#53aff4"
                                                      size={32}
                                                      speed={1}
                                                      animating={true}
                                                    />
                                                  </div>
                                                ) : subLinkData.length > 0 ? (
                                                  subLinkData.map(
                                                    (subLink, index) => {
                                                      return (
                                                        <>
                                                          <div className="mail-box-content">
                                                            <div className="mail-box-content-top">
                                                              <div className="mail-box-content-top-left">
                                                                <h5>
                                                                  {
                                                                    subLink.identifier
                                                                  }
                                                                </h5>
                                                                <p>
                                                                  {
                                                                    subLink.delivery
                                                                  }
                                                                </p>
                                                                <div className="mailbox-tags">
                                                                  <ul>
                                                                    {subLink
                                                                      .tags
                                                                      .length >
                                                                    0 ? (
                                                                      subLink?.tags.map(
                                                                        (
                                                                          tag
                                                                        ) => (
                                                                          <li
                                                                            key={
                                                                              tag
                                                                            }
                                                                          >
                                                                            {
                                                                              tag
                                                                            }
                                                                          </li>
                                                                        )
                                                                      )
                                                                    ) : (
                                                                      <li>
                                                                        N/A
                                                                      </li>
                                                                    )}
                                                                  </ul>
                                                                </div>

                                                                <div className="tab-content-links">
                                                                  <a>
                                                                    https://survey.docintel.app/survey_demo?Utmde=
                                                                    {
                                                                      subLink.unique_code
                                                                    }
                                                                  </a>
                                                                  <span
                                                                    className="copy-content"
                                                                    onClick={() =>
                                                                      copyHandler(
                                                                        `https://survey.docintel.app/survey_demo?Utmde=${subLink.unique_code}`
                                                                      )
                                                                    }
                                                                  >
                                                                    <img
                                                                      src={
                                                                        path_image +
                                                                        "copy-content.svg"
                                                                      }
                                                                      alt="Copy"
                                                                    />
                                                                  </span>
                                                                  <div
                                                                    className="tab-content-qr"
                                                                    onClick={() => {
                                                                      setQr({
                                                                        ...qrState,
                                                                        value: `https://survey.docintel.app/survey_demo?Utmde=${subLink.unique_code}&dl=QR`,
                                                                      });
                                                                      setTimeout(
                                                                        function () {
                                                                          downloadQRCode(
                                                                            subLink?.identifier
                                                                          );
                                                                        },
                                                                        500
                                                                      );
                                                                    }}
                                                                  >
                                                                    <img
                                                                      src={
                                                                        path_image +
                                                                        "qr-code-icon.svg"
                                                                      }
                                                                      alt="QR"
                                                                    />
                                                                    <img
                                                                      src={
                                                                        path_image +
                                                                        "download-icon.svg"
                                                                      }
                                                                      alt="Download"
                                                                    />
                                                                  </div>
                                                                </div>
                                                                <div className="mail-time">
                                                                  <span>
                                                                    {
                                                                      subLink?.formatted_date
                                                                    }
                                                                  </span>
                                                                </div>
                                                              </div>
                                                              <div className="mail-box-content-top-right">
                                                                {data?.is_draft !=
                                                                  null &&
                                                                data?.is_draft ==
                                                                  "0" ? (
                                                                  <div className="mail-stats">
                                                                    <ul>
                                                                      <li>
                                                                        <div
                                                                          className="mail-status irts"
                                                                          title="Sublinks"
                                                                        >
                                                                          <svg
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                          >
                                                                            <path
                                                                              d="M9.59862 1.09837L6.34653 4.35044C6.34025 4.35669 6.33634 4.36428 6.33009 4.37059C7.13125 4.25391 7.95428 4.33391 8.71722 4.63141L10.9244 2.42422C11.6556 1.693 12.8448 1.693 13.5761 2.42422C14.3073 3.15537 14.3073 4.34466 13.5761 5.07581C13.4514 5.20056 10.136 8.51597 10.324 8.32787C9.587 9.06494 8.37787 9.03341 7.67234 8.32787C7.30694 7.96247 6.712 7.96247 6.34653 8.32787L5.77734 8.89706C5.93522 9.16531 6.11622 9.42344 6.34653 9.65375C7.73528 11.0425 10.1257 11.1534 11.6297 9.67019C11.636 9.66394 11.6435 9.66 11.6498 9.65375L14.9019 6.40169C16.3663 4.93719 16.3663 2.56287 14.9019 1.09837C13.4374 -0.366125 11.0631 -0.366125 9.59862 1.09837Z"
                                                                              fill="#8A4E9C"
                                                                              fillOpacity="1"
                                                                            />
                                                                            <path
                                                                              d="M7.29013 11.3608L5.07582 13.5751C4.34466 14.3063 3.15538 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54891 10.7987 5.87141 7.47623 5.68338 7.66426C6.42038 6.92726 7.62951 6.95873 8.33504 7.66426C8.70044 8.02973 9.29541 8.02973 9.66085 7.66426L10.23 7.09507C10.0722 6.82682 9.89116 6.56869 9.66085 6.33844C8.27476 4.95229 5.88607 4.83435 4.3777 6.32198C4.37141 6.32823 4.36385 6.33216 4.35754 6.33844L1.09835 9.59763C-0.366086 11.0621 -0.366148 13.4364 1.09835 14.9009C2.56285 16.3654 4.93723 16.3654 6.40166 14.9009L9.66082 11.6417C9.6671 11.6355 9.67101 11.6279 9.67726 11.6216C8.8761 11.7383 8.0531 11.6583 7.29013 11.3608Z"
                                                                              fill="#8A4E9C"
                                                                              fillOpacity="1"
                                                                            />
                                                                          </svg>
                                                                        </div>
                                                                        <span>
                                                                          0
                                                                        </span>
                                                                      </li>
                                                                      <li>
                                                                        <div
                                                                          className="mail-status mail-hit"
                                                                          title="Link opening"
                                                                        >
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
                                                                        <span>
                                                                          0
                                                                        </span>
                                                                      </li>
                                                                      <li>
                                                                        <div
                                                                          className="mail-status mail_view"
                                                                          title="Started"
                                                                        >
                                                                          <svg
                                                                            width="17"
                                                                            height="16"
                                                                            viewBox="0 0 17 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                          >
                                                                            <path
                                                                              d="M6.46443 6.80015C8.34247 6.80015 9.86464 5.27769 9.86464 3.39993C9.86464 1.52217 8.34218 0 6.46443 0C4.58667 0 3.06363 1.52246 3.06363 3.40022C3.06363 5.27797 4.58667 6.80015 6.46443 6.80015Z"
                                                                              fill="#97B6CF"
                                                                              fillOpacity="0.6"
                                                                            />
                                                                            <path
                                                                              d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                                              fill="#97B6CF"
                                                                              fillOpacity="0.6"
                                                                            />
                                                                            <path
                                                                              fillRule="evenodd"
                                                                              clipRule="evenodd"
                                                                              d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                                              fill="#97B6CF"
                                                                              fillOpacity="0.6"
                                                                            />
                                                                          </svg>
                                                                        </div>
                                                                        <span>
                                                                          0{" "}
                                                                        </span>
                                                                      </li>
                                                                      <li>
                                                                        <div
                                                                          className="mail-status mail_click"
                                                                          title="Completed"
                                                                        >
                                                                          <svg
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                          >
                                                                            <path
                                                                              d="M5.79646 6.80015C7.6745 6.80015 9.19667 5.27769 9.19667 3.39993C9.19667 1.52217 7.67421 0 5.79646 0C3.9187 0 2.39566 1.52246 2.39566 3.40022C2.39566 5.27797 3.9187 6.80015 5.79646 6.80015Z"
                                                                              fill="#97B6CF"
                                                                              fillOpacity="0.6"
                                                                            />
                                                                            <path
                                                                              d="M7.23877 7.0319H4.35356C1.95298 7.0319 0 8.98517 0 11.3858V14.9141L0.00896932 14.9694L0.252007 15.0455C2.54293 15.7613 4.53324 16 6.17143 16C7.54179 16 8.66543 15.8327 9.5113 15.6368C8.78091 14.8611 8.33333 13.8162 8.33333 12.6667C8.33333 10.9692 9.30935 9.4997 10.7308 8.78873C9.93663 7.7232 8.66691 7.0319 7.23877 7.0319Z"
                                                                              fill="#97B6CF"
                                                                              fillOpacity="0.6"
                                                                            />
                                                                            <path
                                                                              fillRule="evenodd"
                                                                              clipRule="evenodd"
                                                                              d="M9.33333 12.6667C9.33333 10.8258 10.8258 9.33333 12.6667 9.33333C14.5076 9.33333 16 10.8258 16 12.6667C16 14.5076 14.5076 16 12.6667 16C10.8258 16 9.33333 14.5076 9.33333 12.6667ZM12.4583 14.0404L14.5652 11.9336C14.6073 11.8915 14.6407 11.8416 14.6634 11.7866C14.6862 11.7316 14.6979 11.6727 14.6979 11.6132C14.6979 11.5537 14.6862 11.4948 14.6634 11.4399C14.6406 11.3849 14.6072 11.335 14.5652 11.2929C14.5231 11.2508 14.4732 11.2175 14.4182 11.1947C14.3632 11.172 14.3043 11.1602 14.2448 11.1602C14.1853 11.1603 14.1264 11.172 14.0714 11.1947C14.0165 11.2175 13.9665 11.2509 13.9245 11.293L12.1379 13.0793L11.4087 12.3501C11.3669 12.3071 11.3169 12.2728 11.2617 12.2493C11.2064 12.2257 11.1471 12.2134 11.0871 12.213C11.027 12.2126 10.9675 12.2241 10.912 12.2469C10.8564 12.2697 10.806 12.3033 10.7635 12.3457C10.7211 12.3882 10.6875 12.4386 10.6647 12.4941C10.6419 12.5497 10.6304 12.6092 10.6308 12.6692C10.6312 12.7292 10.6436 12.7886 10.6671 12.8438C10.6907 12.899 10.7249 12.949 10.768 12.9909L11.8176 14.0404C11.8596 14.0824 11.9096 14.1158 11.9646 14.1386C12.0195 14.1614 12.0785 14.1731 12.138 14.1731C12.1975 14.1731 12.2564 14.1614 12.3114 14.1386C12.3663 14.1158 12.4163 14.0824 12.4583 14.0404Z"
                                                                              fill="#97B6CF"
                                                                              fillOpacity="0.6"
                                                                            />
                                                                          </svg>
                                                                        </div>
                                                                        <span>
                                                                          0{" "}
                                                                        </span>
                                                                      </li>
                                                                    </ul>
                                                                  </div>
                                                                ) : (
                                                                  <div className="mail-stats">
                                                                    <ul>
                                                                      <li>
                                                                        <div
                                                                          className="mail-status mail-hit"
                                                                          title="Link opening"
                                                                        >
                                                                          <svg
                                                                            width="14"
                                                                            height="16"
                                                                            viewBox="0 0 14 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                          >
                                                                            <path
                                                                              d="M2.96391 5.30631C2.85416 4.93468 2.74879 4.56243 2.6696 4.20577C2.14894 3.89774 1.79477 3.33718 1.79477 2.68932C1.79477 1.71473 2.58729 0.922837 3.56126 0.922837C4.53522 0.922837 5.32774 1.71535 5.32774 2.68932C5.32774 2.82338 5.30966 2.95246 5.2816 3.07779C5.45058 3.45004 5.58713 3.86906 5.70685 4.29493C6.04356 3.84599 6.25058 3.29415 6.25058 2.68932C6.25058 1.20343 5.04715 0 3.56126 0C2.07536 0 0.872559 1.20343 0.872559 2.68932C0.872559 3.96882 1.76734 5.03445 2.96391 5.30631Z"
                                                                              fill="#0066BE"
                                                                            ></path>
                                                                            <path
                                                                              d="M1.10616 11.673C1.76898 10.9566 2.51286 11.2372 3.50865 11.3887C4.36415 11.5203 5.20655 11.2802 5.15043 10.8182C5.06189 10.0705 4.93718 9.73632 4.65347 8.76797C4.42713 7.9979 3.99751 6.6099 3.60655 5.28301C3.08278 3.50779 2.93126 2.68348 3.62837 2.47771C4.37974 2.25885 4.8106 3.32635 5.20094 4.80663C5.64552 6.49143 5.87935 7.23531 6.01029 7.19603C6.241 7.12993 5.92549 6.40912 6.52907 6.23141C7.28356 6.01193 7.42946 6.60179 7.64084 6.54256C7.85222 6.47896 7.78052 5.88161 8.38223 5.70577C8.98706 5.53118 9.29073 6.27568 9.54014 6.20148C9.78706 6.12853 9.78145 5.85978 10.1543 5.75316C10.5278 5.64217 11.9333 6.27132 12.7376 9.01925C13.7472 12.4743 12.6098 13.1165 12.9546 14.2863L8.44833 15.9998C8.08356 15.1224 6.9537 15.0576 5.95417 14.4983C4.94716 13.9315 4.26314 12.8272 1.63866 12.8808C0.6516 12.9008 0.698366 12.1139 1.10616 11.673Z"
                                                                              fill="#0066BE"
                                                                            ></path>
                                                                          </svg>
                                                                        </div>
                                                                        <span>
                                                                          {
                                                                            subLink.opening
                                                                          }
                                                                        </span>
                                                                      </li>
                                                                      <li>
                                                                        <div
                                                                          className="mail-status mail_view"
                                                                          title="Started"
                                                                        >
                                                                          <svg
                                                                            width="17"
                                                                            height="16"
                                                                            viewBox="0 0 17 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                          >
                                                                            <path
                                                                              d="M6.46443 6.80015C8.34247 6.80015 9.86464 5.27769 9.86464 3.39993C9.86464 1.52217 8.34218 0 6.46443 0C4.58667 0 3.06363 1.52246 3.06363 3.40022C3.06363 5.27797 4.58667 6.80015 6.46443 6.80015Z"
                                                                              fill="#FAC755"
                                                                              fillOpacity="1"
                                                                            ></path>
                                                                            <path
                                                                              d="M7.90674 7.0319H5.02153C2.62095 7.0319 0.667969 8.98517 0.667969 11.3858V14.9141L0.676938 14.9694L0.919976 15.0455C3.2109 15.7613 5.20121 16 6.8394 16C8.20976 16 9.3334 15.8327 10.1793 15.6368C9.44888 14.8611 9.0013 13.8162 9.0013 12.6667C9.0013 10.9692 9.97731 9.4997 11.3988 8.78873C10.6046 7.7232 9.33488 7.0319 7.90674 7.0319Z"
                                                                              fill="#FAC755"
                                                                              fillOpacity="1"
                                                                            ></path>
                                                                            <path
                                                                              fillRule="evenodd"
                                                                              clipRule="evenodd"
                                                                              d="M13.3346 9.33333C11.4938 9.33333 10.0013 10.8258 10.0013 12.6667C10.0013 14.5076 11.4938 16 13.3346 16C15.1755 16 16.668 14.5076 16.668 12.6667C16.668 10.8258 15.1755 9.33333 13.3346 9.33333ZM11.8679 12.2998C11.5918 12.2998 11.3679 12.5237 11.3679 12.7998C11.3679 13.0759 11.5918 13.2998 11.8679 13.2998H14.8679C15.1441 13.2998 15.3679 13.0759 15.3679 12.7998C15.3679 12.5237 15.1441 12.2998 14.8679 12.2998H11.8679Z"
                                                                              fill="#FAC755"
                                                                              fillOpacity="1"
                                                                            ></path>
                                                                          </svg>
                                                                        </div>
                                                                        <span>
                                                                          {
                                                                            subLink.dropoff
                                                                          }
                                                                        </span>
                                                                      </li>
                                                                      <li>
                                                                        <div
                                                                          className="mail-status mail_click"
                                                                          title="Completed"
                                                                        >
                                                                          <svg
                                                                            width="16"
                                                                            height="16"
                                                                            viewBox="0 0 16 16"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                          >
                                                                            <path
                                                                              d="M5.79646 6.80015C7.6745 6.80015 9.19667 5.27769 9.19667 3.39993C9.19667 1.52217 7.67421 0 5.79646 0C3.9187 0 2.39566 1.52246 2.39566 3.40022C2.39566 5.27797 3.9187 6.80015 5.79646 6.80015Z"
                                                                              fill="#39CABC"
                                                                            />
                                                                            <path
                                                                              d="M7.23877 7.0319H4.35356C1.95298 7.0319 0 8.98517 0 11.3858V14.9141L0.00896932 14.9694L0.252007 15.0455C2.54293 15.7613 4.53324 16 6.17143 16C7.54179 16 8.66543 15.8327 9.5113 15.6368C8.78091 14.8611 8.33333 13.8162 8.33333 12.6667C8.33333 10.9692 9.30935 9.4997 10.7308 8.78873C9.93663 7.7232 8.66691 7.0319 7.23877 7.0319Z"
                                                                              fill="#39CABC"
                                                                            />
                                                                            <path
                                                                              fillRule="evenodd"
                                                                              clipRule="evenodd"
                                                                              d="M9.33333 12.6667C9.33333 10.8258 10.8258 9.33333 12.6667 9.33333C14.5076 9.33333 16 10.8258 16 12.6667C16 14.5076 14.5076 16 12.6667 16C10.8258 16 9.33333 14.5076 9.33333 12.6667ZM12.4583 14.0404L14.5652 11.9336C14.6073 11.8915 14.6407 11.8416 14.6634 11.7866C14.6862 11.7316 14.6979 11.6727 14.6979 11.6132C14.6979 11.5537 14.6862 11.4948 14.6634 11.4399C14.6406 11.3849 14.6072 11.335 14.5652 11.2929C14.5231 11.2508 14.4732 11.2175 14.4182 11.1947C14.3632 11.172 14.3043 11.1602 14.2448 11.1602C14.1853 11.1603 14.1264 11.172 14.0714 11.1947C14.0165 11.2175 13.9665 11.2509 13.9245 11.293L12.1379 13.0793L11.4087 12.3501C11.3669 12.3071 11.3169 12.2728 11.2617 12.2493C11.2064 12.2257 11.1471 12.2134 11.0871 12.213C11.027 12.2126 10.9675 12.2241 10.912 12.2469C10.8564 12.2697 10.806 12.3033 10.7635 12.3457C10.7211 12.3882 10.6875 12.4386 10.6647 12.4941C10.6419 12.5497 10.6304 12.6092 10.6308 12.6692C10.6312 12.7292 10.6436 12.7886 10.6671 12.8438C10.6907 12.899 10.7249 12.949 10.768 12.9909L11.8176 14.0404C11.8596 14.0824 11.9096 14.1158 11.9646 14.1386C12.0195 14.1614 12.0785 14.1731 12.138 14.1731C12.1975 14.1731 12.2564 14.1614 12.3114 14.1386C12.3663 14.1158 12.4163 14.0824 12.4583 14.0404Z"
                                                                              fill="#39CABC"
                                                                            />
                                                                          </svg>
                                                                        </div>
                                                                        <span>
                                                                          {
                                                                            subLink.completed
                                                                          }
                                                                          %
                                                                        </span>
                                                                      </li>
                                                                    </ul>
                                                                  </div>
                                                                )}

                                                                <div className="mailbox-buttons">
                                                                  <div className="send_new">
                                                                    <Button
                                                                      className="btn-bordered send-new"
                                                                      onClick={() =>
                                                                        analyticButtonClicked(
                                                                          subLink,
                                                                          navigate,
                                                                          "true"
                                                                        )
                                                                      }
                                                                    >
                                                                      Analytics
                                                                    </Button>
                                                                  </div>
                                                                  <div className="mailbox-buttons-list">
                                                                    <Button
                                                                      className="send btn-bordered"
                                                                      onClick={() =>
                                                                        handleTopicModalShow(
                                                                          subLink.sublink_id
                                                                        )
                                                                      }
                                                                    >
                                                                      Edit Topic
                                                                    </Button>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  )
                                                ) : (
                                                  <div className="not-found">
                                                    Please create sublink first
                                                  </div>
                                                )}
                                              </Accordion.Body>
                                            </Accordion.Item>
                                          </div>
                                        </>
                                      ))
                                    ) : (
                                      <div className="no_found">
                                        <p>No Data Found</p>
                                      </div>
                                    )}
                                  </Accordion>
                                )}

                                {data?.length <= 0 && (
                                  <div className="no_found">
                                    <p>No Data Found</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </Col>

      <QRCodeCanvas
        style={{ display: "none" }}
        id="qr-gen"
        value={qrState?.value}
        size={290}
        level={"H"}
        includeMargin={true}
      />

      {createNewLink && (
        <SublinkModal
          createNewLink={createNewLink}
          setCreateNewLink={setCreateNewLink}
          setCurrentAddSublinkLid={setCurrentAddSublinkLid}
          setSelectedSublinkId={setSelectedSublinkId}
          currentAddSublinkLid={currentAddSublinkLid}
          setSendListData={setSubLinkData}
          SendListData={subLinkData}
          type={true}
        />
      )}

      {show && (
        <TopicModals
          finalTags={finalTags}
          setFinalTags={setFinalTags}
          show={show}
          setShow={setShow}
          modalCounter={modalCounter}
          setModalCounter={setModalCounter}
          newTag={newTag}
          setNewTag={setNewTag}
          allTags={allTags}
          setAllTags={setAllTags}
          tagsCounter={tagsCounter}
          setTagsCounter={setTagsCounter}
          tagClickedFirst={tagClickedFirst}
          setTagClickedFirst={setTagClickedFirst}
          tagsReRender={tagsReRender}
          setTagsReRender={setTagsReRender}
          error={error}
          setError={setError}
          edit={true}
          editTopic={editTopic}
          setEditTopic={setEditTopic}
          subLinkData={subLinkData}
          setSubLinkData={setSubLinkData}
        />
      )}
    </>
  );
};

export default SurveySublink;
