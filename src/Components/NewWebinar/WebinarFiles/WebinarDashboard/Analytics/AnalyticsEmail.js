import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { loader } from "../../../../../loader";
import { postData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const AnalyticsEmail = () => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId || localStorageEvent?.eventId
  );
  const [emailData, setEmailData] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        loader("show");
        const body = { eventId };
        const response = await postData(ENDPOINT.GET_EMAIL_DATA, body);
        const result = response?.data?.data;
        setEmailData(result);

        loader("hide");
      } catch (error) {
        loader("hide");
        console.error("Error fetching analytics data:", error);
      } finally {
        setApiStatus(true)
      }
    };

    fetchAnalyticsData();
  }, [eventId]);
  return (
    <>
      {!apiStatus ? (
        <div className="rd-analytics-box">
          <p class="rd-box-small-title">Emails</p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top align-items-center d-flex justify-content-between">
              <h6 className="mr-auto" style={{ color: "#8A4E9C" }}>
                {!apiStatus ? <Skeleton width={130} height={20} /> : "Emails"}
              </h6>
              <div className="d-flex">
                <Skeleton width={20} height={20} />
              </div>
            </div>
            <div className="graph-box">
              <div className="graph-data">
                <Table className="fold-table" id="individual_completion">
                  <thead className="sticky-header">
                    <tr>
                      <th>
                        <Skeleton width={80} height={20} />
                      </th>
                      <th>
                        <Skeleton width={60} height={20} />
                      </th>
                      <th>
                        <Skeleton width={60} height={20} />
                      </th>
                      <th className="email-options">
                        <Skeleton width={60} height={20} />
                      </th>
                      <th className="email-options">
                        <Skeleton width={60} height={20} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(3)].map((_, index) => (
                      <tr key={index}>
                        <td valign="middle">
                          <Skeleton width={80} height={14} />
                          <span>
                            <Skeleton width={60} height={10} />
                          </span>
                        </td>
                        <td valign="middle">
                          <Skeleton width={60} height={14} />
                        </td>
                        <td valign="middle">
                          <Skeleton width={60} height={14} />
                        </td>
                        <td valign="middle" className="email-options">
                          <div className="td-bordered">
                            <Skeleton width={30} height={17} />
                            <span>
                              <Skeleton width={50} height={14} />
                            </span>
                          </div>
                        </td>
                        <td valign="middle" className="email-options">
                          <div className="td-bordered">
                            <Skeleton width={30} height={20} />
                            <span>
                              <Skeleton width={80} height={16} />
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* End loop */}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rd-analytics-box">
          <p class="rd-box-small-title">Emails</p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top align-items-center d-flex justify-content-between">
              <h6 className="mr-auto" style={{ color: "#8A4E9C" }}>
                Emails
              </h6>
              <div className="d-flex">
                <img
                  src={path_image + "email-analytics.svg"}
                  alt="CRM"
                  className="CRM"
                />
              </div>
            </div>
            <div className="graph-box">
              <div className="graph-data">
                <Table className="fold-table" id="individual_completion">
                  {emailData?.length > 0 ? (
                    <>
                      <thead className="sticky-header">
                        <tr>
                          <th>Subject</th>
                          <th>Type</th>
                          <th>List</th>
                          <th className="email-options">Send</th>
                          <th className="email-options">Opened</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailData.map((data) => (
                          <tr key={data.id}>
                            <td valign="middle">
                              {data.subject}
                              <span>{data.created_at}</span>
                            </td>
                            <td valign="middle">{data.invitationType}</td>
                            <td valign="middle">{data.listType ||"Internal"}</td>
                            <td valign="middle" className="email-options">
                              <div className="td-bordered">
                                <img
                                  src={`${path_image}mail-sent.svg`}
                                  alt=""
                                />
                                <span>{data.email_sent}</span>
                              </div>
                            </td>
                            <td valign="middle" className="email-options">
                              <div className="td-bordered">
                                <img
                                  src={`${path_image}email-open.svg`}
                                  alt=""
                                />
                                <span>
                                  {data.email_read} ({data.read_percentage})
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  ) : (
                    <div className="no_found">
                      <p>No Emails had been sent.</p>
                    </div>
                  )}
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AnalyticsEmail;
