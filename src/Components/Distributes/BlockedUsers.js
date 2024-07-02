import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import "@inovua/reactdatagrid-community/index.css";

const GetDetails = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [data, setData] = useState([]);
  const [sortingState, setSortingState] = useState({
    sortingCount: 0,
    sortingField: "",
    sortingOrder: 0,
  });

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
    <button className="btn btn-outline-primary" onClick={() => sortData(field)}>
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
    { name: 'First name', sortKey: 'first_name' },
    { name: 'Last name' },
    { name: 'Email', sortKey: 'email' },
    { name: 'Country', sortKey: 'country' },
    { name: 'Site Number', sortKey: 'site_number' },
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
                            <th scope="col" key={index}>
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
                        {/* Render your data rows here */}
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
