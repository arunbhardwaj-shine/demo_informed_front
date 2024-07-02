import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import "@inovua/reactdatagrid-community/index.css";
import { getData, postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { Modal } from "react-bootstrap";

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
      await postData(`${ENDPOINT.UNBLOCKED_USERS}`, { userId, reminder: userToUnblock?.blocked === 1 ? 1 : 0 });
      setUserToUnblock(null);
      toast.success("User unblocked successfully");

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

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
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
                                        handleBlockedChange(e, index,)
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
                <h4>Are you sure you want to {userToUnblock?.blocked === 0?"Un block":"Block"} this user?</h4>
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

