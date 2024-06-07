import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { loader } from "../../loader";
import { getData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";

const AllEvents = () => {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (index) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    getAllEventList();
  }, []);

  const getAllEventList = async () => {
    try {
      loader("show");
      const response = await getData(ENDPOINT.GET_ALL_EVENT_LIST);
    //   console.log(response, "response");
      let data = response?.data?.data || [];
      setData(data);
    } catch (err) {
      console.log("--err", err);
    } finally {
      loader("hide");
    }
  };
  console.log(data, "data");
  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <Row>
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>All Events</h2>
              </div>
            </div>

            <div className="survey_data">
              {/* {data?.length > 0 ? ( */}
              <>
                <div className="survey_data_details">
                  <div className="survey_data_accordion_heading">
                    <Table className="fold-table" id="individual_completion">
                      <thead className="sticky-header">
                        <tr>
                          <th className="sort_option">
                            <span> Event</span>
                          </th>

                          <th className="sort_option">
                            <span>Date</span>
                          </th>

                          <th className="sort_option">
                            <span>Account</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((item, index) => {
                          return (
                            <>
                              <tr
                                className={
                                  showDetails[index] ? "view show" : "view"
                                }
                                onClick={() => toggleDetails(index)}
                              >
                                <td>{item?.title}</td>
                                <td>{item?.eventStartDateTime}</td>
                                <td>{item?.username}</td>
                              </tr>
                              {showDetails[index] && (
                                <tr className="fold">
                                  <td colspan="8">
                                    <div className="survey-data">
                                      <p>Upcoming event</p>
                                    </div>
                                  </td>
                                </tr>
                              )}
                              <tr className="blank">
                                <td colspan="8" style={{ height: "10px;" }}>
                                  &nbsp;
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </>
              {/* ) : (
                <div className="no_found">
                  <p align="center">No Data Found</p>
                </div>
              )} */}
            </div>
            {/* </Col> */}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default AllEvents;
