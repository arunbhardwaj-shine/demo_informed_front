import { useEffect, useState } from "react";
import axios from "axios";
import { loader } from "../../loader";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

const GetDetails = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [distributeData, setDistributeData] = useState({});
  const location = useLocation();
  const { distribute_id } = location.state;

  useEffect(() => {
    getCampaignReaderDetails();
  }, []);

  const getCampaignReaderDetails = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
    const body = {
      user_id: "rjiGlqA9DXJVH7bDDTX0Lg==",
      distribute_id: distribute_id,
    };
    loader("show");
    await axios
      .post(`distributes/get_campaign_readers_details`, body)
      .then((res) => {
        if (res.data.status_code == 200) {
          console.log(res);
          setData(res.data.response.data.readers);
          setDistributeData(res.data.response.data.distribute_data);
          loader("hide");
        }

        //console.log("here");
      })
      .catch((err) => {
        console.log(err);
        //  / console.log("here");
      });
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
                <div className="col-12 col-md-11">
                  <div className="smart-list-btns">
                    <div className="top-right-action">
                      <div className="search-bar">
                        <form className="d-flex">
                          <input
                            className="form-control me-2"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                          />
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
                        </form>
                      </div>
                    </div>
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
                <div className="selected-hcp-list d-flex align-items-start">
                  {" "}
                  <div>
                    <p>{distributeData.c_id}</p>
                    <p>{distributeData.sent_data}</p>
                    <p>{distributeData.subject}</p>
                    <p>{distributeData.list}</p>
                    <p>{distributeData.total_sent_count}</p>
                    <p>{distributeData.total_read_count}</p>
                    <p>{distributeData.total_pending_count}</p>
                    <p>{distributeData.total_bouns_count}</p>
                  </div>
                  <table className="table" id="table-to-xls">
                    <thead className="sticky-header">
                      <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Email Read</th>
                        <th scope="col">Link Open</th>
                        <th scope="col">Registered</th>
                      </tr>
                    </thead>
                    <tbody className="form-group">
                      {data.map((item, index) => (
                        <tr>
                          <td>{item.first_name}</td>

                          <td>{item.last_name}</td>

                          <td>{item.email}</td>
                          <td>{item.email_read}</td>
                          <td>{item.article_open}</td>
                          <td>{item.registered}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
