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
  const [heading, setHeading] = useState([]);
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
    getCampaignReaderDetails(0);
  }, []);

  const getCampaignReaderDetails = async (flag = 0) => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: localStorage.getItem("user_id"),
      distribute_id: distribute_id,
      sync_flag: flag,
    };
    loader("show");
    await axios
      .post(`distributes/get_campaign_readers_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          if (flag == 1) {
            setData([]);
            setUpdatedData([]);
          }
          const readers = res.data.response.data.readers;
        //   const readers =[{
        //     "first_name": " Kristiawan ",
        //     "last_name": "",
        //     "email": "kristiawan@sapharma.co.id",
        //     "email_read": "Yes",
        //     "heading": ["Agenda_clicked","One_source_link","Monograph_link"],
        //     "Agenda_clicked":"No",
        //     "One_source_link":"No",
        //     "Monograph_link":"No",
        //     "article_register": "No",
        //     "article_already_register": 0,
        //     "all_read_info": [],
        //     "already_email_sent": 0,
        //     "user_id": 29836253,
        //     "list": "One source internal 3"
        // }]
        let heading =[];
        let data= readers.length >0 ?readers[0]:undefined;

        if(data!=undefined && data.heading!=undefined){
          heading=data.heading;
        
         
        }
        else{
      
            heading.push("Link Open");
         
        }

          setData(readers);
          setHeading(heading);
          setUpdatedData(readers);
          // const filteredData1 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "Yes" &&
          //     reader.article_open == "Yes" &&
          //     reader.article_register == "Yes"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });
          //
          // const filteredData2 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "Yes" &&
          //     reader.article_open == "Yes" &&
          //     reader.article_register == "No"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });
          //
          // const filteredData3 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "Yes" &&
          //     reader.article_open == "No" &&
          //     reader.article_register == "Yes"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });
          //
          // const filteredData4 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "Yes" &&
          //     reader.article_open == "No" &&
          //     reader.article_register == "No"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });
          //
          // const filteredData5 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "No" &&
          //     reader.article_open == "Yes" &&
          //     reader.article_register == "Yes"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });
          //
          // const filteredData6 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "No" &&
          //     reader.article_open == "Yes" &&
          //     reader.article_register == "No"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });
          //
          // const filteredData7 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "No" &&
          //     reader.article_open == "No" &&
          //     reader.article_register == "Yes"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });
          //
          // const filteredData8 = readers.filter((reader) => {
          //   if (
          //     reader.email_read == "No" &&
          //     reader.article_open == "No" &&
          //     reader.article_register == "No"
          //   ) {
          //     setData((oldArray) => [...oldArray, reader]);
          //     setUpdatedData((oldArray) => [...oldArray, reader]);
          //   }
          // });

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

  const searchChange = (e) => {
    let search_str = e.target.value.trim();
    setSearch(search_str);

    if (e.target.value === "") {
      setData(updatedData);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let r_table = [];
    updatedData.find(function (item) {
      if (item.first_name !== null || item.email !== "") {
        if (item.first_name.includes(search) || item.email.includes(search)) {
          r_table.push(item);
        }
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
    return false;
  };

  const syncData = (e) => {
    e.preventDefault();
    getCampaignReaderDetails(1);
  };

  return (
    <>
      {" "}
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            {/*
            <div className="page-top-nav smart_list_names">

              <div className="row justify-content-start align-items-center">
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
            */}
            <section className="search-hcp smart-list-view">
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
              <div className="result-hcp-table">
                <div className="table-title">
                  <h4>
                    {/* {getlistname} <span>| {editList.length}</span> */}
                  </h4>
                </div>
                <div className="selected-hcp-list">
                  {" "}
                  <div className="selected-hcp-list_detail">
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
                        <label>Smart list</label>
                        <span>{distributeData.list}</span>
                      </li>
                      <li>
                        <label>Total mail sent:</label>
                        <span>{distributeData.total_sent_count}</span>
                      </li>
                      <li>
                        <label>Email read:</label>
                        <span>{distributeData.total_read_count}</span>
                      </li>
                      <li>
                        <label>Pending read email:</label>
                        <span>{distributeData.total_pending_count}</span>
                      </li>
                      <li>
                        <label>Bounce count:</label>
                        <span>{distributeData.total_bouns_count}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="color_opt d-flex">
                    <div className="col-md-6">
                      <div className="green-box">
                        <div className="box"></div>
                        <p>
                          Reader already registered in system from a previous
                          campaign.{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="orange-box">
                        <div className="box"></div>
                        <p>
                          Email already sent to this user from a previous
                          campaign.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="table_xls search_view sync">
                    <div className="smart-list-btns">
                      <div className="top-left-action">
                        <button
                          className="btn btn-primary btn-bordered back"
                          onClick={(e) => syncData(e)}
                        >
                          Sync
                          <svg
                            data-name="Layer 1"
                            id="Layer_1"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill="#0066be"
                              d="M64,256H34A222,222,0,0,1,430,118.15V85h30V190H355V160h67.27A192.21,192.21,0,0,0,256,64C150.13,64,64,150.13,64,256Zm384,0c0,105.87-86.13,192-192,192A192.21,192.21,0,0,1,89.73,352H157V322H52V427H82V393.85A222,222,0,0,0,478,256Z"
                            />
                          </svg>
                        </button>
                      </div>
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
                            {heading.map((element)=>{
                             return  <th scope="col">{element.replace(/_/g, " ")}</th>

                            })}
                            <th scope="col">Registered</th>
                            {typeof data != "undefined" && data.length > 0 ? (
                              <>
                                {data[0]?.all_read_info &&
                                data[0].all_read_info != ""
                                  ? Object.keys(data[0].all_read_info).map(
                                      (key, index) => (
                                        <>
                                          <th>Link Open {index + 1}</th>
                                          <th>Registered {index + 1}</th>
                                        </>
                                      )
                                    )
                                  : ""}
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        </tr>
                      </thead>
                      <tbody className="form-group">
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
