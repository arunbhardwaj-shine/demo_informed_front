import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import "@inovua/reactdatagrid-community/index.css";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { Accordion, Button, Modal } from "react-bootstrap";

const GetDetails = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortingState, setSortingState] = useState({
    sortingCount: 0,
    sortingField: "",
    sortingOrder: 0,
  });
  const [userToUnblock, setUserToUnblock] = useState(null);

  const filterRef = useRef(null);
  const buttonRef = useRef(null);
  const [showfilter, setShowFilter] = useState(false);
  const [userType, setUserType] = useState({
    label: "Blocked User",
    value: "blocked",
  });
  const [filterApplyflag, setFilterApplyflag] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBlockedUsers();
  }, []);

  const getBlockedUsers = async () => {
    try {
      loader("show");
      const response = await postData(`${ENDPOINT.GET_BLOCKED_USERS}`, {
        userType: userType.value,
      });
      const blockedUsers = response?.data?.data;
      setData(blockedUsers);
      setOriginalData(blockedUsers);
    } catch (error) {
      console.error("Error fetching blocked users:", error);
    } finally {
      loader("hide");
    }
  };

  const handleBlockedChange = (e, index) => {
    const updatedData = [...data];
    setShowModal(true);
    updatedData[index] = {
      ...updatedData[index],
      blocked: updatedData[index]?.blocked === 1 ? 0 : 1,
    };
    setData(updatedData);
    setUserToUnblock(updatedData[index]);
  };

  const unBlockedUser = async () => {
    try {
      loader("show");
      setShowModal(false);

      const userId = userToUnblock?.user_id;
      await postData(`${ENDPOINT.UNBLOCKED_USERS}`, {
        userId,
        reminder: userToUnblock?.blocked === 1 ? 1 : 0,
      });
      setUserToUnblock(null);
      toast.success(
        userToUnblock?.blocked === 0
          ? "User unblocked successfully"
          : "User blocked successfully"
      );
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user");
    } finally {
      loader("hide");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (userToUnblock) {
      const updatedData = data.map((user) =>
        user.id === userToUnblock.id ? { ...user, blocked: 1 } : user
      );
      setData(updatedData);
      setUserToUnblock(null);
    }
  };

  const sortData = (field) => {
    let sortedData = [...data];
    const { sortingField, sortingOrder } = sortingState;
    const newSortingOrder =
      sortingField === field && sortingOrder === 0 ? 1 : 0;

    sortedData.sort((a, b) => {
      if (a[field] === null) return newSortingOrder === 0 ? -1 : 1;
      if (b[field] === null) return newSortingOrder === 0 ? 1 : -1;

      if (a[field] === b[field]) return 0;
      return a[field].toLowerCase() > b[field].toLowerCase()
        ? newSortingOrder === 0
          ? 1
          : -1
        : newSortingOrder === 0
        ? -1
        : 1;
    });

    setData(sortedData);
    setSortingState({
      sortingCount: sortingState.sortingCount + 1,
      sortingField: field,
      sortingOrder: newSortingOrder,
    });
  };

  const SortButton = ({ sortingState, field }) => (
    <button className="btn btn-outline-primary">
      {sortingState.sortingField !== field ? (
        <img src={`${path_image}sort.svg`} alt="Sorting" />
      ) : sortingState.sortingOrder === 0 ? (
        <img src={`${path_image}sort-decending.svg`} alt="Sorting" />
      ) : (
        <img src={`${path_image}sort-assending.svg`} alt="Sorting" />
      )}
    </button>
  );

  const headers = [
    { name: "First name", sortKey: "firstName" },
    { name: "Last name", sortKey: "lastName" },
    { name: "Email", sortKey: "email" },
    { name: "IRT Role" },
    { name: "Country", sortKey: "country" },
    { name: "Site Number", sortKey: "siteNumber" },
    { name: "Blocked" },
  ];

  const handleOnFilterChange = (event) => {
    const { value } = event.target;
    const label = event.target.getAttribute("data-label");
    setUserType({ label, value });
  };

  // const applyFilter = (e) => {
  //   e.preventDefault();
  //   getBlockedUsers();
  //   setShowFilter(false);
  //   setFilterApplyflag(1);
  // };

  const applyFilter = (e) => {
    e.preventDefault();

    getBlockedUsers();
    setShowFilter(false);
    setFilterApplyflag(1);
  };

  const clearFilter = () => {
    setUserType({ label: "Blocked User", value: "blocked" });
    setFilterApplyflag(0);
    getBlockedUsers();
    setShowFilter(false);
  };

  const searchChange = (e) => {
    setShowFilter(false);

    setSearch(e?.target?.value);

    if (e?.target?.value === "") {
      setData(originalData);
    }
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();
    let searchData = originalData?.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        item?.email?.toLowerCase().includes(search.toLowerCase()) ||
        item?.siteNumber?.toLowerCase().includes(search.toLowerCase()) ||
        item?.role?.toLowerCase().includes(search.toLowerCase()) ||
        item?.country?.toLowerCase().includes(search.toLowerCase())
    );
    setShowFilter(false);

    setData(searchData);
    loader("hide");
  };
  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          {originalData ? (
            <div className="row">
              <div className="justify-content-end top-right-action">
                <div className="search-bar"  style={{ paddingRight: "20"}}>
                  <form className="d-flex" onSubmit={submitSearchHandler}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      id="email_search"
                      onFocus={() => setShowFilter(false)}
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

                <div  className="filter-by nav-item dropdown">
                  <button
                    ref={buttonRef}
                    className={`btn btn-secondary dropdown`}
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
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item className="card upper" eventKey="0">
                          <Accordion.Header className="card-header">
                            User Type
                          </Accordion.Header>
                          <Accordion.Body className="card-body">
                            <ul>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="radio"
                                    name="userType"
                                    value="blocked"
                                    data-label="Blocked User"
                                    checked={userType.value === "blocked"}
                                    onChange={handleOnFilterChange}
                                  />
                                  Blocked User
                                  <span className="checkmark"></span>
                                </label>
                              </li>
                              <li>
                                <label className="select-multiple-option">
                                  <input
                                    type="radio"
                                    name="userType"
                                    value="all"
                                    data-label="All IRT"
                                    checked={userType.value === "all"}
                                    onChange={handleOnFilterChange}
                                  />
                                  All IRT
                                  <span className="checkmark"></span>
                                </label>
                              </li>
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <div className="filter-footer">
                        {/* <Button
                      className="btn btn-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Clear
                    </Button> */}
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
              {filterApplyflag == 1 ? (
                <div className="apply-filter">
                  {/* <h6>Applied filters</h6> */}
                  <div className="filter-block">
                    <div className="filter-block-left full">
                      <div className="filter-div">
                        <div className="filter-div-title">
                          <span>User Type|</span>
                        </div>
                        <div className="filter-div-list">
                          <div className="filter-result">
                            {userType.label}
                            {/* <img
                              src={path_image + "filter-close.svg"}
                              onClick={clearFilter}
                              alt="Close-filter"
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="clear-filter">
                    <Button
                      className="btn btn-outline-primary btn-bordered"
                      onClick={clearFilter}
                    >
                      Remove All
                    </Button>
                  </div> */}
                  </div>
                </div>
              ) : null}
              <section className="search-hcp smart-list-view">
                <div className="result-hcp-table">
                  <div className="selected-hcp-list blocked-user-list">
                    <div className="table_xlss">
                      <table className="table get-details" id="table-to-xls">
                        <thead className="sticky-header">
                          <tr>
                            {headers.map((header, index) => (
                              <th
                                style={{ cursor: "pointer" }}
                                scope="col"
                                key={index}
                                onClick={() => sortData(header.sortKey)}
                              >
                                {header.name}
                                {header.sortKey && (
                                  <div className="hcp-sort">
                                    <SortButton
                                      sortingState={sortingState}
                                      field={header.sortKey}
                                    />
                                  </div>
                                )}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.length > 0 ? (
                            data.map((item, index) => (
                              <tr key={index}>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>{item.country}</td>
                                <td>{item.siteNumber}</td>
                                <td>
                                  <div className="switch">
                                    <label className="switch-light">
                                      <input
                                        type="checkbox"
                                        checked={item.blocked == 1}
                                        onChange={(e) =>
                                          handleBlockedChange(e, index)
                                        }
                                      />
                                      <span>
                                        <span className="switch-btn active">
                                          No
                                        </span>
                                        <span className="switch-btn">Yes</span>
                                      </span>
                                      <a className="btn"></a>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="data-not-found">
                              <td colSpan="7">
                                <h4>No Data Found</h4>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              <Modal
                className="modal send-confirm registration-popup"
                show={showModal}
                centered
                size="lg"
                onHide={closeModal}
                aria-labelledby="contained-modal-title-vcenter"
              >
                <Modal.Header>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </Modal.Header>
                <Modal.Body>
                  <h4>
                    Are you sure you want to{" "}
                    {userToUnblock?.blocked === 0 ? "Unblock" : "Block"} this
                    user?
                  </h4>
                  <div className="modal-buttons">
                    <button
                      type="button"
                      className="btn btn-primary btn-bordered"
                      onClick={unBlockedUser}
                    >
                      Yes
                    </button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default GetDetails;
