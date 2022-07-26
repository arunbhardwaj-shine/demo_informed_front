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
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [sortingCount, setSortingCount] = useState(0);
  const [sortingCountEmail, setSortingCountEmail] = useState(0);

  const [sortingName, setSortingName] = useState(0);
  const [sortingEmail, setSortingEmail] = useState(0);

  const [distributeData, setDistributeData] = useState({});
  const [search, setSearch] = useState("");
  const [updatedData, setUpdatedData] = useState([]);
  const location = useLocation();
  const { distribute_id } = location.state;

  useEffect(() => {
    setData([]);
    getCampaignReaderDetails();
  }, []);

  const getCampaignReaderDetails = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      distribute_id: distribute_id,
    };
    loader("show");
    await axios
      .post(`distributes/get_campaign_readers_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          console.log(res);

          const readers = res.data.response.data.readers;

          const filteredData1 = readers.filter((reader) => {
            if (
              reader.email_read == "Yes" &&
              reader.article_open == "Yes" &&
              reader.registered == "Yes"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          const filteredData2 = readers.filter((reader) => {
            if (
              reader.email_read == "Yes" &&
              reader.article_open == "Yes" &&
              reader.registered == "No"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          const filteredData3 = readers.filter((reader) => {
            if (
              reader.email_read == "Yes" &&
              reader.article_open == "No" &&
              reader.registered == "Yes"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          const filteredData4 = readers.filter((reader) => {
            if (
              reader.email_read == "Yes" &&
              reader.article_open == "No" &&
              reader.registered == "No"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          const filteredData5 = readers.filter((reader) => {
            if (
              reader.email_read == "No" &&
              reader.article_open == "Yes" &&
              reader.registered == "Yes"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          const filteredData6 = readers.filter((reader) => {
            if (
              reader.email_read == "No" &&
              reader.article_open == "Yes" &&
              reader.registered == "No"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          const filteredData7 = readers.filter((reader) => {
            if (
              reader.email_read == "No" &&
              reader.article_open == "No" &&
              reader.registered == "Yes"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          const filteredData8 = readers.filter((reader) => {
            if (
              reader.email_read == "No" &&
              reader.article_open == "No" &&
              reader.registered == "No"
            ) {
              setData((oldArray) => [...oldArray, reader]);
              setUpdatedData((oldArray) => [...oldArray, reader]);
            }
          });

          setDistributeData(res.data.response.data.distribute_data);
        } else {
          toast.warning(res.data.message);
        }
        loader("hide");
        //console.log("here");
      })
      .catch((err) => {
        loader("hide");
        toast.error("Something went wrong");
        console.log(err);
        //  / console.log("here");
      });
  };

  const sortName = () => {
    let normalArr = [];
    normalArr = data;

    if (sortingName === 0) {
      normalArr.sort((a, b) =>
        a.first_name.toLowerCase() > b.first_name.toLowerCase()
          ? 1
          : b.first_name.toLowerCase() > a.first_name.toLowerCase()
          ? -1
          : 0
      );
    } else {
      normalArr.sort((a, b) =>
        a.first_name.toLowerCase() < b.first_name.toLowerCase()
          ? 1
          : b.first_name.toLowerCase() < a.first_name.toLowerCase()
          ? -1
          : 0
      );
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

  const searchChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setData(updatedData);
    }
  };

  const submitHandler = (event) => {
    let r_table = [];
    data.find(function (item) {
      if (item.first_name.includes(search) || item.email.includes(search)) {
        r_table.push(item);
      }
    });
    if (r_table.length > 0) {
      setData(r_table);
    } else {
      // popup_alert({
      //   visible: "show",
      //   message: "Data not found",
      //   type: "error",
      // });
      setData([]);
    }
    event.preventDefault();
    return false;
  };

  return (
    <>
      {" "}
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav smart_list_names">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    {true ? (
                      <Link
                        to={{
                          pathname: "/EmailStatss",
                        }}
                      >
                        <button className="btn btn-primary btn-bordered back">
                          Back
                        </button>
                      </Link>
                    ) : (
                      <button className="btn btn-primary btn-bordered back">
                        Back
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <section className="search-hcp smart-list-view">
              <div className="result-hcp-table">
                <div className="table-title">
                  <h4>
                    {/* {getlistname} <span>| {editList.length}</span> */}
                  </h4>
                </div>
                <div className="selected-hcp-list">
                  {" "}
                  <div className="selected-hcp-list_detail">
                    {/* <div class="icon-box">
                      <span>
                        <svg
                          width="24"
                          height="18"
                          viewBox="0 0 24 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.92 2.28564L12.8457 8.8685C12.5899 9.01484 12.3004 9.09183 12.0057 9.09183C11.711 9.09183 11.4215 9.01484 11.1657 8.8685L0.0799999 2.28564C0.0270091 2.51424 0.000170336 2.74813 0 2.98279V14.1599C0 14.951 0.314264 15.7097 0.873659 16.2691C1.43305 16.8285 2.19175 17.1428 2.98286 17.1428H21.0171C21.8082 17.1428 22.5669 16.8285 23.1263 16.2691C23.6857 15.7097 24 14.951 24 14.1599V2.98279C23.9998 2.74813 23.973 2.51424 23.92 2.28564Z"
                            fill="rgb(255, 255, 255)"
                          ></path>
                          <path
                            d="M12.2745 7.92L23.4517 1.26857C23.1772 0.877654 22.8128 0.558387 22.3891 0.33763C21.9655 0.116872 21.4951 0.00108202 21.0174 0H2.98311C2.50543 0.00108202 2.03499 0.116872 1.61138 0.33763C1.18776 0.558387 0.823359 0.877654 0.548828 1.26857L11.7374 7.92C11.8198 7.96501 11.9121 7.98861 12.006 7.98861C12.0998 7.98861 12.1922 7.96501 12.2745 7.92Z"
                            fill="rgb(255, 255, 255)"
                          ></path>
                        </svg>
                      </span>
                    </div> */}
                    <ul>
                      <li>
                        <label>Campaign ID:</label>
                        <span>{distributeData.c_id}</span>
                      </li>
                      <li>
                        <label>Date:</label>
                        <span>{distributeData.sent_data}</span>
                      </li>
                      <li>
                        <label>Subject</label>
                        <span>{distributeData.subject}</span>
                      </li>
                      <li>
                        <label>Smart List</label>
                        <span>{distributeData.list}</span>
                      </li>
                      <li>
                        <label>Total mail sent:</label>
                        <span>{distributeData.total_sent_count}</span>
                      </li>
                      <li>
                        <label>Email Read:</label>
                        <span>{distributeData.total_read_count}</span>
                      </li>
                      <li>
                        <label>Pending Read Email:</label>
                        <span>{distributeData.total_pending_count}</span>
                      </li>
                      <li>
                        <label>Bounce Count:</label>
                        <span>{distributeData.total_bouns_count}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="table_xls search_view">
                    <div className="smart-list-btns">
                      <div className="top-right-action">
                        <div className="search-bar">
                          <form
                            className="d-flex"
                            onSubmit={(e) => submitHandler(e)}
                          >
                            <input
                              className="form-control me-2"
                              type="search"
                              placeholder="Search"
                              aria-label="Search"
                              onChange={(e) => searchChange(e)}
                            />

                            {!search ? (
                              <button
                                className="btn btn-outline-success"
                                type="submit"
                              >
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
                                  ></path>
                                </svg>
                              </button>
                            ) : null}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table_xls">
                    <table className="table" id="table-to-xls">
                      <thead className="sticky-header">
                        <tr>
                          <th scope="col">
                            First Name
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
                          <th scope="col">Last Name</th>
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
                          <th scope="col">Email Read</th>
                          <th scope="col">Link Open</th>
                          <th scope="col">Registered</th>
                        </tr>
                      </thead>
                      <tbody className="form-group">
                        {typeof data != "undefined" && data.length > 0 ? (
                          data.map((item, index) => (
                            <tr>
                              <td>{item.first_name}</td>

                              <td>{item.last_name}</td>

                              <td>{item.email}</td>
                              <td>{item.email_read}</td>
                              <td>{item.article_open}</td>
                              <td>{item.registered}</td>
                            </tr>
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
              {/* <input type="hidden" value={updateCounter} /> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default GetDetails;
