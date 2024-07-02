import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import "@inovua/reactdatagrid-community/index.css";
import { getData, postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { Accordion, Button, Modal } from "react-bootstrap";

const GetDetails = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortingState, setSortingState] = useState({
    sortingCount: 0,
    sortingField: "",
    sortingOrder: 0,
  });
  const [userToUnblock, setUserToUnblock] = useState(null);

  const filterRef = useRef(null);
  const buttonRef = useRef(null);
  const [filterApplyflag, setFilterApplyFlag] = useState(0);
  const [showfilter, setShowFilter] = useState(false);

  useEffect(() => {
    getBlockedUsers();
  }, []);

  const getBlockedUsers = async () => {
    try {
      loader("show");
      const response = await getData(`${ENDPOINT.GET_BLOCKED_USERS}`);
      const blockedUsers = response?.data?.data;
      setData(blockedUsers);
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

  // const handleFilterChange = async (e, filterValue) => {
  //   try {
  //     loader("show");
  //     const payload = {
  //       filter: filterValue,
  //     };
  //     const response = await postData(`${ENDPOINT.FILTER_ENDPOINT}`, payload);

     
  //     setData(response?.data?.data); 
  //   } catch (error) {
  //     console.error("Error applying filter:", error);
  //     toast.error("Failed to apply filter");
  //   } finally {
  //     loader("hide");
  //   }
  // };

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="filter-by nav-item dropdown">
              <button
                ref={buttonRef}
                className={`btn btn-secondary dropdown
                  
                `}
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
                  <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item className="card upper" eventKey="0">
                      <Accordion.Header className="card-header">
                        Blocked User
                      </Accordion.Header>
                      <Accordion.Body className="card-body">
                        <ul>
                          <li>
                            <label className="select-multiple-option">
                              <input
                                type="checkbox"
                                id="blockedUserFilter"
                                value="Blocked User"
                                checked={true}
                                // onChange={(e) =>
                                //   handleOnFilterChange(e, "Blocked User")
                                // }
                              />
                              Blocked User
                              <span className="checkmark"></span>
                            </label>
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className="card" eventKey="1">
                      <Accordion.Header className="card-header">
                        All IRT
                      </Accordion.Header>
                      <Accordion.Body className="card-body">
                        <ul>
                          <li>
                            <label className="select-multiple-option">
                              <input
                                type="checkbox"
                                id="blockedUserFilter"
                                value="Blocked User"
                                checked={true}
                                // onChange={(e) => handleOnFilterChange(e, "Blocked User")}
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
                    <Button
                      className="btn btn-primary btn-bordered"
                      // onClick={clearFilter}
                    >
                      Clear
                    </Button>
                    <Button
                      className="btn btn-primary btn-filled"
                      // onClick={applyFilter}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {data.length > 0 ?
           <section className="search-hcp smart-list-view">
              <div className="result-hcp-table">
                <div className="selected-hcp-list">
                  <div className="table_xls">
                    <table className="table get-details" id="table-to-xls">
                      <thead className="sticky-header">
                        <tr>
                          {headers.map((header, index) => (
                            <th
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
            </section>:""}

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
        </div>
      </div>
    </>
  );
};

export default GetDetails;
