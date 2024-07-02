import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { loader } from "../../loader";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { popup_alert } from "../../popup_alert";

const GetDetails = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [data, setData] = useState([]);
  const [sortingCount, setSortingCount] = useState(0);
  const [sortingCountEmail, setSortingCountEmail] = useState(0);
  const [sortingName, setSortingName] = useState(0);
  const [sortingEmail, setSortingEmail] = useState(0);

  const sortName = () => {
    let normalArr = [];
    normalArr = data;
    console.log(sortingName);
    if (sortingName === 0) {
      normalArr.sort((a, b) => {
        if (a.first_name === null) {
          return -1;
        }
        if (b.first_name === null) {
          return 1;
        }
        if (a.first_name === b.first_name) {
          return 0;
        }
        return a.first_name.toLowerCase() > b.first_name.toLowerCase()
          ? 1
          : b.first_name.toLowerCase() > a.first_name.toLowerCase()
          ? -1
          : 0;
      });
    } else {
      normalArr.sort((a, b) => {
        if (a.first_name === null) {
          return 1;
        }
        if (b.first_name === null) {
          return -1;
        }

        if (a.first_name === b.first_name) {
          return 0;
        }
        return a.first_name.toLowerCase() < b.first_name.toLowerCase()
          ? 1
          : b.first_name.toLowerCase() < a.first_name.toLowerCase()
          ? -1
          : 0;
      });
    }
    setSortingCountEmail(0);
    setData(normalArr);
    setSortingName(1 - sortingName);
    setSortingCount(sortingCount + 1);
  };

  const sortEmail = () => {
    let normalArr = [];
    normalArr = data;
    if (sortingEmail === 0) {
      normalArr.sort((a, b) =>
        a.email.toLowerCase() > b.email.toLowerCase()
          ? 1
          : b.email.toLowerCase() > a.email.toLowerCase()
          ? -1
          : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.email.toLowerCase() < b.email.toLowerCase()
          ? 1
          : b.email.toLowerCase() < a.email.toLowerCase()
          ? -1
          : 0
      );
    }

    setSortingCount(0);

    setData(normalArr);
    setSortingEmail(1 - sortingEmail);
    setSortingCountEmail(sortingCountEmail + 1);
  };

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
                          <>
                            <th scope="col">
                              First name
                              <div className="hcp-sort">
                                {sortingCount == 0 ? (
                                  <>
                                    <button
                                      className="btn btn-outline-primary"
                                      onClick={sortName}
                                    >
                                      <img
                                        src={path_image + "sort.svg"}
                                        alt="Shorting"
                                      />
                                    </button>
                                  </>
                                ) : sortingName == 0 ? (
                                  <>
                                    <button
                                      className="btn btn-outline-primary desc"
                                      onClick={sortName}
                                    >
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
                                      onClick={sortName}
                                    >
                                      <img
                                        src={path_image + "sort-assending.svg"}
                                        alt="Shorting"
                                      />
                                    </button>
                                  </>
                                )}
                              </div>
                            </th>
                            <th scope="col">Last name</th>
                            <th scope="col">
                              Email
                              <div className="hcp-sort">
                                {sortingCountEmail == 0 ? (
                                  <>
                                    <button
                                      className="btn btn-outline-primary"
                                      onClick={sortEmail}
                                    >
                                      <img
                                        src={path_image + "sort.svg"}
                                        alt="Shorting"
                                      />
                                    </button>
                                  </>
                                ) : sortingEmail == 0 ? (
                                  <>
                                    <button
                                      className="btn btn-outline-primary desc"
                                      onClick={sortEmail}
                                    >
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
                                      onClick={sortEmail}
                                    >
                                      <img
                                        src={path_image + "sort-assending.svg"}
                                        alt="Shorting"
                                      />
                                    </button>
                                  </>
                                )}
                              </div>
                            </th>
                            <th scope="col">Email read</th>
                           
                          </>
                        </tr>
                      </thead>
                      {/* <tbody>
                        {typeof data != "undefined" && data.length > 0 ? (
                          data.map((item, index) => (
                            <>
                              {item.email != "" ? (
                                <tr
                                  key={index}
                                  className={
                                    item?.article_already_register == 1
                                      ? "green"
                                      : item?.already_email_sent == 1
                                      ? "orange"
                                      : ""
                                  }
                                >
                                  <td>{item.first_name}</td>
                                  <td>{item.last_name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.email_read}</td>
                                  {item.article_open!=undefined ?<td>{item.article_open}</td>:heading.map((element)=> {
                                    return <td>{item[element]!=undefined?item[element]:""}</td>
                                  })}
                                  <td>{item.article_register}</td>
                                  {item?.all_read_info &&
                                  item.all_read_info != ""
                                    ? Object.keys(item.all_read_info).map(
                                        (key) => (
                                          <>
                                            <td>
                                              {
                                                item.all_read_info[key]
                                                  .article_read
                                              }
                                            </td>
                                            <td>
                                              {
                                                item.all_read_info[key]
                                                  .article_registered
                                              }
                                            </td>
                                          </>
                                        )
                                      )
                                    : ""}
                                </tr>
                              ) : (
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td className="removed_td centered">
                                    Removed
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              )}
                            </>
                          ))
                        ) : (
                          <tr className="data-not-found">
                            <td colspan="6">
                              <h4>No Data Found</h4>
                            </td>
                          </tr>
                        )}
                      </tbody> */}
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
