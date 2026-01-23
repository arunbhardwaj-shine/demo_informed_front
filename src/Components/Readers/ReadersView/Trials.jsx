import React, { useEffect, useRef, useState } from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import TrialCompletionTable from "../../CommonComponent/TrialCompletionTable";
import "../../assets/css/trial-completion-table.scss";

const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const Trials = () => {
  const buttonRef = useRef(null);
  const filterRef = useRef(null);

  const [filterdata, setFilterData] = useState({
    training_status_code: [
      { id: 1, title: "New" },
      { id: 3, title: "Invited" },
      { id: 5, title: "Started" },
      { id: 2, title: "Completed" },
      { id: 6, title: "Not Completed" },
      { id: 4, title: "Ignored" },
      { id: 7, title: "Blocked" },
    ],
    user_type: [
      "Site User-Blinded",
      "Investigator-Blinded",
      "Site unblinded pharmacist",
    ],
    site_number: [],
  });
  const [showfilter, setShowFilter] = useState(false);
  const [filterApplyflag, setFilterApplyflag] = useState(0);
  const [filterObject, setFilterObject] = useState({});
  const [appliedFilter, setAppliedFilter] = useState({});
  const [selectedFilter, setSelectedFilter] = useState({});
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [trialCount, setTrialCount] = useState(0);
  const [trialLastUpdated, setTrialLastUpdated] = useState("");

  const createdBy = localStorage.getItem("user_id");

  const handleOnFilterChange = (e, item, index, key, data = []) => {
    let newObj = JSON.parse(JSON.stringify(selectedFilter));
    if (!newObj[key]) newObj[key] = [];

    if (e.target.checked) {
      newObj[key].push(item);
    } else {
      const filteredItem = newObj[key].filter((itm) => itm !== item);
      newObj[key] = filteredItem;
    }
    setSelectedFilter(newObj);
  };

  const applyFilter = () => {
    setAppliedFilter(selectedFilter);
    setShowFilter(false);
  };

  const clearFilter = () => {
    setSelectedFilter({});
    setAppliedFilter({});
    setShowFilterBox(false);
  };

  useEffect(() => {
    let allowFilterShow = false;
    Object.keys(appliedFilter).forEach((key) => {
      const value = appliedFilter[key];
      const isArray = Array.isArray(value);
      if (isArray) {
        if (value.length > 0) allowFilterShow = true;
      } else if (value !== null && value !== "" && value !== undefined) {
        allowFilterShow = true;
      }
    });

    setShowFilterBox(allowFilterShow);
  }, [appliedFilter]);

  return (
    <Col className="right-sidebar custom-change trials-right-sidebar">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div className="custom-container trial-container">
        <Row>
            <div className="timeline-layout">
              <div className="timeline-layout-inset">
                <div className="timeline-right-list">
                  <div className="timeline-right-header">
                    <div className="timeline-indicator">
                      <img
                        src={path_image + "informed-circle-icon.svg"}
                        alt=""
                      />
                    </div>
                    <div className="timeline-date">
                      <h3>
                        Trials <span className="trial-count">| {trialCount}</span>
                      </h3>
                      <p>
                        <span>last sync: </span>
                        {trialLastUpdated || "NA"}{" "}
                      </p>
                    </div>
                    <div className="filter-by nav-item dropdown ms-auto">
                      <button
                        ref={buttonRef}
                        className={
                          Object.keys(filterObject)?.length &&
                          filterApplyflag == 1
                            ? "btn btn-secondary dropdown filter_applied"
                            : "btn btn-secondary dropdown"
                        }
                        type="button"
                        id="dropdownMenuButton3"
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
                            ></path>
                            <path
                              d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                              fill="#97B6CF"
                            ></path>
                            <path
                              d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                              fill="#97B6CF"
                            ></path>
                          </svg>
                        )}
                      </button>

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
                                                            typeof item ==
                                                            "object"
                                                              ? item?.title
                                                              : item
                                                          }
                                                          name={key}
                                                          checked={
                                                            typeof item ==
                                                            "object"
                                                              ? selectedFilter[
                                                                  key
                                                                ]?.includes(
                                                                  item.id
                                                                )
                                                                ? true
                                                                : false
                                                              : selectedFilter[
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
                            <Button
                              className="btn btn-primary btn-bordered"
                              onClick={clearFilter}
                            >
                              Clear
                            </Button>
                            <Button
                              className="btn btn-primary btn-filled"
                              onClick={applyFilter}
                            >
                              Apply
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {showFilterBox && (
                    <div className="apply-filter">
                      <div className="filter-block">
                        <div className="filter-block-left full">
                          {Object.keys(appliedFilter).map((key, index) => {
                            const value = appliedFilter[key];
                            if (
                              value === null ||
                              value === undefined ||
                              value === "" ||
                              (Array.isArray(value) && value.length === 0)
                            )
                              return null;

                            return (
                              <div className="filter-div" key={index}>
                                <div className="filter-div-title">
                                  <span>
                                    {key === "training_status_code"
                                      ? "Status"
                                      : key === "user_type"
                                      ? "Role"
                                      : key === "site_number"
                                      ? "Site"
                                      : key}{" "}
                                    |
                                  </span>
                                </div>
                                <div className="filter-div-list">
                                  {appliedFilter[key]?.map((item, i) => {
                                    const totalData = filterdata[key];
                                    const isObj =
                                      totalData?.length > 0 &&
                                      typeof totalData[0] === "object";

                                    let text = "";
                                    if (isObj) {
                                      const found = totalData.find(
                                        (itm) => itm.id === item
                                      );
                                      text = found ? found.title : "";
                                    } else {
                                      text = item;
                                    }
                                    const removeItem = () => {
                                      const selectedData = selectedFilter[key];
                                      let filteredData = selectedData.filter(
                                        (itm) => itm !== item
                                      );
                                      setSelectedFilter({
                                        ...selectedFilter,
                                        [key]: filteredData,
                                      });
                                      setAppliedFilter({
                                        ...selectedFilter,
                                        [key]: filteredData,
                                      });
                                    };

                                    return (
                                      <div
                                        key={key + text}
                                        className={
                                          key === "Role"
                                            ? "filter-result upper"
                                            : "filter-result"
                                        }
                                      >
                                        {text !== "" && text}

                                        <img
                                          src={path_image + "filter-close.svg"}
                                          alt="Close-filter"
                                          onClick={removeItem}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
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
                  )}

                  <div className="timeline-right-body mt-3">
                    <TrialCompletionTable
                      createdBy={createdBy}
                      pathImage={path_image}
                      appliedFilters={appliedFilter}
                      filterdata={filterdata}
                      setFilterData={setFilterData}
                      onCountChange={setTrialCount}
                      onLastUpdatedChange={setTrialLastUpdated}
                    />
                  </div>{" "}
                </div>
              </div>
            </div>
        </Row>
      </div>
    </Col>
  );
};

export default Trials;
