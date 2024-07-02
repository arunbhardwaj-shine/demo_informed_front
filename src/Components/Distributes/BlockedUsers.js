import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import "@inovua/reactdatagrid-community/index.css";
import { getData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";

const GetDetails = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [data, setData] = useState([]);
  const [sortingState, setSortingState] = useState({
    sortingCount: 0,
    sortingField: "",
    sortingOrder: 0,
  });

  const [userBlocked, setUserBlocked] = useState({})


  useEffect(() => {
    getBlockedUsers()
  }, [])


  const getBlockedUsers = async () => {
    try {
      loader("show");
      const data = await getData(`${ENDPOINT.GET_BLOCKED_USERS}`);
      let blockedUsers = data?.data?.data
      setData(blockedUsers)
      console.log("Blocked Users Data:", data);
    } catch (error) {
    }
    finally {
      loader("hide");
    }
  }

  const handleBlockedChange = (e, item) => {
    const updatedData = data.map((user) => {
      if (user?.id === item?.id) {
        return { ...user, blocked: user?.blocked === 1 ? 0 : 1 };
      }
      return user;
    });
  
    setData(updatedData);
  };
  

  const sortData = (field) => {
    let sortedData = [...data];
    const { sortingField, sortingOrder } = sortingState;
    const newSortingOrder = sortingField === field && sortingOrder === 0 ? 1 : 0;

    sortedData.sort((a, b) => {
      if (a[field] === null) return newSortingOrder === 0 ? -1 : 1;
      if (b[field] === null) return newSortingOrder === 0 ? 1 : -1;

      if (a[field] === b[field]) return 0;
      return a[field].toLowerCase() > b[field].toLowerCase()
        ? newSortingOrder === 0 ? 1 : -1
        : newSortingOrder === 0 ? -1 : 1;
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
    { name: 'First name', sortKey: 'firstName' },
    { name: 'Last name' },
    { name: 'Email', sortKey: 'email' },
    { name: 'Country', sortKey: 'country' },
    { name: 'Site Number', sortKey: 'siteNumber' },
    { name: 'Reminder' },
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
                            <th scope="col" key={index} onClick={() => sortData(header.sortKey)}>
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
                      {typeof data != "undefined" && data.length > 0 ? (
                          data.map((item, index) => (
                            <>
                                <tr
                                  key={index}
                                  // className={
                                  //   item?.article_already_register == 1
                                  //     ? "green"
                                  //     : item?.already_email_sent == 1
                                  //     ? "orange"
                                  //     : ""
                                  // }
                                >
                                  <td>{item.firstName}</td>
                                  <td>{item.lastName}</td>
                                  <td>{item.email}</td>
                                  <td>{item.country}</td>
                                  <td>{item.siteNumber}</td>
                                  <td >
                                  <input
                                  type="checkbox"
                                  checked={item?.blocked === 1}
                                  onChange={(e) => handleBlockedChange(e, item)}
                                />
                              </td>
                              </tr>
                            </>
                          ))
                        ) : (
                          <tr className="data-not-found">
                            <td colspan="6">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default GetDetails;
