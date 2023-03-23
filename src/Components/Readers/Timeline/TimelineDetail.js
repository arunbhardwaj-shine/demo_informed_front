import React, { useState, useEffect } from 'react'
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postData } from "../../../axios/apiHelper";
import { ENDPOINT } from "../../../axios/apiConfig";
import { loader } from "../../../loader";

const TimelineDetail = () => {
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [isActive, setIsActive] = useState(false);
  const handleClick = event => {
    setIsActive(current => !current);
  };
  const [timeLineData, setTimeLineData] = useState([]);
  const [apiFlag, setApiFlag] = useState(0);

  useEffect(() => {
    getUserTimelineData();
  }, []);

  const getUserTimelineData = async() => {
      try {
        loader("show");
        const res = await postData(ENDPOINT.USERTIMELINE, {
          logId: 22899,
          userId:2147499977
        });
        setTimeLineData(res?.data?.data);
        loader("hide");
      } catch (err) {
        loader("hide");
        console.log("err");
      }
      setApiFlag(1);
  }

  return (
    <>
      <Col className="right-sidebar col">
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-6">
                    <div className="page-title d-flex">
                      <Link className="btn btn-primary btn-bordered back-btn" to="/readers-view">
                        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z" fill="#97B6CF"/>
                        </svg>
                      </Link>
                       <h2>Timeline</h2>
                    </div>
                </div>
                <div className="col-12 col-md-4">

                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button className="btn print">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <mask id="mask0_1144_989" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <path d="M0 1.90735e-06H24V24H0V1.90735e-06Z" fill="white"/>
                          </mask>
                          <g mask="url(#mask0_1144_989)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.51562 17.4023C2.29226 17.4023 1.30078 16.4109 1.30078 15.1875V9.5625C1.30078 8.33914 2.29226 7.34766 3.51562 7.34766H20.4844C21.7077 7.34766 22.6992 8.33914 22.6992 9.5625V15.1875C22.6992 16.4109 21.7077 17.4023 20.4844 17.4023H19.125C18.7949 17.4023 18.5273 17.6699 18.5273 18C18.5273 18.3301 18.7949 18.5977 19.125 18.5977H20.4844C22.3679 18.5977 23.8945 17.071 23.8945 15.1875V9.5625C23.8945 7.67899 22.3679 6.15234 20.4844 6.15234H3.51562C1.63211 6.15234 0.105469 7.67899 0.105469 9.5625V15.1875C0.105469 17.071 1.63211 18.5977 3.51562 18.5977H4.875C5.20508 18.5977 5.47266 18.3301 5.47266 18C5.47266 17.6699 5.20508 17.4023 4.875 17.4023H3.51562Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.15234 14.25C3.15234 14.5801 3.41992 14.8477 3.75 14.8477H20.25C20.5801 14.8477 20.8477 14.5801 20.8477 14.25C20.8477 13.9199 20.5801 13.6523 20.25 13.6523H3.75C3.41992 13.6523 3.15234 13.9199 3.15234 14.25Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.28125 22.6992C5.8347 22.6992 5.47266 22.3372 5.47266 21.8906V14.8477H18.5273V21.8906C18.5273 22.3372 18.1653 22.6992 17.7187 22.6992H6.28125ZM4.27734 21.8906C4.27734 22.9973 5.17455 23.8945 6.28125 23.8945H17.7187C18.8254 23.8945 19.7227 22.9973 19.7227 21.8906V14.25C19.7227 13.9199 19.4551 13.6523 19.125 13.6523H4.875C4.54492 13.6523 4.27734 13.9199 4.27734 14.25V21.8906Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.52734 17.25C9.52734 17.5801 9.79492 17.8477 10.125 17.8477H13.875C14.2051 17.8477 14.4727 17.5801 14.4727 17.25C14.4727 16.9199 14.2051 16.6523 13.875 16.6523H10.125C9.79492 16.6523 9.52734 16.9199 9.52734 17.25Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.52734 20.25C9.52734 20.5801 9.79492 20.8477 10.125 20.8477H13.875C14.2051 20.8477 14.4727 20.5801 14.4727 20.25C14.4727 19.9199 14.2051 19.6523 13.875 19.6523H10.125C9.79492 19.6523 9.52734 19.9199 9.52734 20.25Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.15234 9.75C3.15234 10.0801 3.42029 10.3477 3.75081 10.3477H4.23543C4.56595 10.3477 4.8339 10.0801 4.8339 9.75C4.8339 9.41992 4.56595 9.15234 4.23543 9.15234H3.75081C3.42029 9.15234 3.15234 9.41992 3.15234 9.75Z" fill="#0066BE"/>
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.27734 6.75C4.27734 7.08008 4.54492 7.34766 4.875 7.34766H19.125C19.4551 7.34766 19.7227 7.08008 19.7227 6.75V3.51562C19.7227 1.63225 18.1959 0.105469 16.3125 0.105469H7.6875C5.80413 0.105469 4.27734 1.63225 4.27734 3.51562V6.75ZM5.47266 6.15234V3.51562C5.47266 2.2924 6.46428 1.30078 7.6875 1.30078H16.3125C17.5357 1.30078 18.5273 2.2924 18.5273 3.51562V6.15234H5.47266Z" fill="#0066BE"/>
                          </g>
                        </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
            {
              apiFlag > 0 ?
              typeof timeLineData !== "undefined" && Object.keys(timeLineData).length > 0
              ?
              <>
              <div className="vertical-timeline d-flex align-items-start">
                  <div className="timeline-left-user">
                     <div className="timeline-left-user-detail">
                      <h5>Username {timeLineData?.user?.name}</h5>
                        <table>
                          <tbody>
                            <tr>
                              <th>Email</th>
                              <td>{timeLineData?.user?.email}</td>
                            </tr>
                            <tr>
                              <th>Country</th>
                              <td>{
                                timeLineData?.user?.country
                                ? timeLineData?.user?.country
                                : "N/A"
                              }</td>
                            </tr>
                            <tr>
                              <th>IBU</th>
                              <td>{
                                timeLineData?.user?.ibu
                                ? timeLineData?.user?.ibu
                                : "N/A"
                              }</td>
                            </tr>
                            <tr>
                              <th>Consent</th>
                              <td>{
                                timeLineData?.user?.other_option
                                ? timeLineData?.user?.other_option
                                : "N/A"
                              }</td>
                            </tr>
                          </tbody>
                        </table>
                     </div>
                  </div>
                  <div className="timeline-right-list">
                    <div className="timeline-right-list-view">
                        {
                          timeLineData?.timeline.map((details, index) => {
                              return(
                                <>
                                {
                                  details?.action == "Article browsed" && (
                                      <div className="timeline-box">
                                        <div className="timeline_date">
                                            {details?.date}
                                        </div>
                                        <div className="timeline-block">
                                            <div className="timeline-block-head read">
                                                <div className="timeline-block-title">
                                                   <div className="timeline-block-img">
                                                    <img src={path_image + "read-content.png"} alt="" />
                                                  </div>
                                                    <h6>Read Content</h6>
                                                </div>
                                                <div className="timeline-time-view">
                                                    <div className="timeline-time">
                                                      {details?.time}
                                                    </div>|
                                                    <div className="timeline-timezone">
                                                      {details?.timezone}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="timeline-article d-flex">
                                                 <div className="timeline-article-image">
                                                    <img src={path_image + "dummy-img1.png"} alt=""/>
                                                 </div>
                                                 <div className="timeline-article-detail">
                                                      <div className="timeline-title">
                                                          <p>{details?.pdfTitle}</p>
                                                      </div>
                                                      <div className="timeline-subtitle">
                                                          <p>{details?.pdf_sub_title}</p>
                                                      </div>
                                                 </div>
                                            </div>
                                             <div className="timeline-article-device">
                                              <table>
                                                  <tbody>
                                                    <tr>
                                                      <th className="device-title">
                                                        Device
                                                      </th>
                                                      <td className="device-name">
                                                        {
                                                          details?.webinar != "" ? details.webinar : details?.device_used
                                                        }
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                             </div>
                                             <div className={isActive ? 'timeline-article-detail-full active' : 'timeline-article-detail-full'} onClick={handleClick}>
                                                <div className="timeline-article-details-heading">
                                                    <p>Details <img src={path_image + "down-arrow.png"} alt="" /></p>
                                                </div>
                                                <div className="timeline-article-details-overall">
                                                    <div class="data-main-box tab-panel d-flex flex-column justify-content-between">
                                                      <h3>Chaper 1</h3>
                                                      <div className="timeline-article-details-boxes">
                                                        <div className="media">
                                                          <div className="media-left">
                                                            <img
                                                              src="https://docintel.s3-eu-west-1.amazonaws.com/ebook/pdftoimage/Haematology_Octapharma/3681/ios_page1.png"
                                                              className="media-object"
                                                              style={{ width: "80px" }}
                                                              alt="ebook"
                                                            />
                                                            <p>Page: 1</p>
                                                          </div>
                                                          <div className="media-right">
                                                            <ul class="tab-mail-list data">
                                                            <li class="d-flex align-center">
                                                              <h6 class="tab-content-title">Ignored
                                                              </h6>
                                                              <div class="data-progress limited">
                                                                <div class="progress">
                                                                  <div role="progressbar" class="progress-bar bg-danger" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100" style={{width: "1%"}}>10</div>
                                                                </div>
                                                              </div>
                                                              </li>
                                                              <li>
                                                                <h6 class="tab-content-title">Browsed
                                                                </h6>
                                                                <div class="data-progress success-progress">
                                                                  <div class="progress">
                                                                    <div role="progressbar" class="progress-bar bg-warning" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>40</div>
                                                                    </div>
                                                                  </div>
                                                              </li>
                                                              <li>
                                                                  <h6 class="tab-content-title">Read</h6>
                                                                  <div class="data-progress">
                                                                    <div class="progress">
                                                                      <div role="progressbar" class="progress-bar bg-success" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: "0%"}}>0</div>
                                                                    </div>
                                                                  </div>
                                                              </li>
                                                              <li>
                                                                  <h6 class="tab-content-title">Readers</h6>
                                                                  <div class="data-progress">
                                                                    <div class="progress">
                                                                      <div role="progressbar" class="progress-bar bg-danger" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style={{width: "0%"}}>0</div>
                                                                    </div>
                                                                  </div>
                                                              </li>
                                                            </ul>
                                                            <p><span>Time Needed: 15.84 seconds</span> <span>Time Spent: 0 seconds</span></p>
                                                        </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                </div>
                                             </div>
                                        </div>

                                      </div>
                                    )
                                }
                                {
                                  details?.action == "Haematology library opened in Docintel App" && (
                                    <div className="timeline-box">
                                      <div className="timeline_date">
                                          {details?.date}
                                      </div>
                                      <div className="timeline-block">
                                          <div className="timeline-block-head opened">
                                              <div className="timeline-block-title">
                                                <div className="timeline-block-img">
                                                  <img src={path_image + "open-content.png"} alt="" />
                                                </div>
                                                  <h6>Opened Content</h6>
                                              </div>
                                              <div className="timeline-time-view">
                                                  <div className="timeline-time">
                                                    {details?.time}
                                                  </div>|
                                                  <div className="timeline-timezone">
                                                    {details?.timezone}
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="timeline-article d-flex">
                                               <div className="timeline-article-image">
                                                  <img src={path_image + "dummy-img1.png"} alt=""/>
                                               </div>
                                               <div className="timeline-article-detail">
                                                    <div className="timeline-title">
                                                        <p>{details?.action}</p>
                                                    </div>
                                                    <div className="timeline-subtitle">
                                                        <p>{details?.pdf_sub_title}</p>
                                                    </div>
                                               </div>
                                          </div>
                                           <div className="timeline-article-device">
                                            <table>
                                                <tbody>
                                                  <tr>
                                                    <th className="device-title">
                                                      Device
                                                    </th>
                                                    <td className="device-name">
                                                    {
                                                      details?.webinar != "" ? details.webinar : details?.device_used
                                                    }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                           </div>
                                      </div>
                                    </div>
                                  )
                                }

                                {
                                  details?.action == "Checked Library in Docintel app" && (
                                    <div className="timeline-box">
                                      <div className="timeline_date">
                                          {details?.date}
                                      </div>
                                      <div className="timeline-block">
                                          <div className="timeline-block-head library">
                                              <div className="timeline-block-title">
                                                <div className="timeline-block-img">
                                                  <img src={path_image + "checked-docintel.png"} alt="" />
                                                </div>
                                                  <h6>Checked Docintel Library</h6>
                                              </div>
                                              <div className="timeline-time-view">
                                                  <div className="timeline-time">
                                                    {details?.time}
                                                  </div>|
                                                  <div className="timeline-timezone">
                                                    {details?.timezone}
                                                  </div>
                                              </div>
                                          </div>
                                           <div className="timeline-article-device">
                                            <table>
                                                <tbody>
                                                  <tr>
                                                    <th className="device-title">
                                                      Device
                                                    </th>
                                                    <td className="device-name">
                                                      {details?.webinar != "" ? details.webinar : details?.device_used}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                           </div>
                                      </div>
                                    </div>
                                  )
                                }

                                {
                                  details?.action == "Login to docintel" && (
                                    <div className="timeline-box">
                                    <div className="timeline_date">
                                        {details?.date}
                                    </div>
                                    <div className="timeline-block">
                                        <div className="timeline-block-head library">
                                            <div className="timeline-block-title">
                                              <div className="timeline-block-img">
                                                <img src={path_image + "log-docintel.png"} alt="" />
                                              </div>
                                                <h6>{details?.action}</h6>
                                            </div>
                                            <div className="timeline-time-view">
                                                <div className="timeline-time">
                                                  {details?.time}
                                                </div>|
                                                <div className="timeline-timezone">
                                                  {details?.timezone}
                                                </div>
                                            </div>
                                        </div>
                                         <div className="timeline-article-device">
                                          <table>
                                              <tbody>
                                                <tr>
                                                  <th className="device-title">
                                                    Device
                                                  </th>
                                                  <td className="device-name">
                                                    {details?.webinar != "" ? details.webinar : details?.device_used}
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                         </div>
                                    </div>
                                    </div>
                                  )
                                }

                                {
                                  details?.action == "New docintel account is created" && (
                                    <div className="timeline-box">
                                      <div className="timeline_date">
                                          {details?.date}
                                      </div>
                                      <div className="timeline-block">
                                          <div className="timeline-block-head library">
                                              <div className="timeline-block-title">
                                                <div className="timeline-block-img">
                                                  <img src={path_image + "account-create.png"} alt="" />
                                                </div>
                                                  <h6>{details?.action}</h6>
                                              </div>
                                              <div className="timeline-time-view">
                                                  <div className="timeline-time">
                                                    {details?.time}
                                                  </div>|
                                                  <div className="timeline-timezone">
                                                    {details?.timezone}
                                                  </div>
                                              </div>
                                          </div>
                                           <div className="timeline-article-device">
                                            <table>
                                                <tbody>
                                                  <tr>
                                                    <th className="device-title">
                                                      Device
                                                    </th>
                                                    <td className="device-name">
                                                      {details?.webinar != "" ? details.webinar : details?.device_used}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                           </div>
                                      </div>
                                    </div>
                                  )
                                }

                                {
                                  details?.action == "New mail received" && (
                                    <div className="timeline-box">
                                      <div className="timeline_date">
                                          {details?.date}
                                      </div>
                                      <div className="timeline-block">
                                          <div className="timeline-block-head received">
                                              <div className="timeline-block-title">
                                                <div className="timeline-block-img">
                                                  <img src={path_image + "email-received.png"} alt="" />
                                                </div>
                                                  <h6>Email Received</h6>
                                              </div>
                                              <div className="timeline-time-view">
                                                  <div className="timeline-time">
                                                    {details?.time}
                                                  </div>|
                                                  <div className="timeline-timezone">
                                                    {details?.timezone}
                                                  </div>
                                              </div>
                                          </div>
                                           <div className="timeline-article-device">
                                            <table>
                                                <tbody>
                                                  <tr>
                                                    <th className="device-title">
                                                      Title
                                                    </th>
                                                    <td className="device-name">
                                                      {
                                                        details?.pdfTitle===null || details?.pdfTitle==="" ? "New mail received" : details?.pdfTitle
                                                      }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="device-title">
                                                      Subject
                                                    </th>
                                                    <td className="device-name">
                                                    {
                                                      details?.pdf_sub_title===null || details?.pdf_sub_title==="" ? "" : details?.pdf_sub_title
                                                    }
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <th className="device-title">
                                                      Device
                                                    </th>
                                                    <td className="device-name">
                                                      {details?.webinar != "" ? details.webinar : details?.device_used}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                           </div>
                                      </div>
                                    </div>
                                  )
                                }

                                {
                                  details?.action && details.action.includes("shared") && (
                                    <div className="timeline-box">
                                      <div className="timeline_date">
                                          {details?.date}
                                      </div>
                                      <div className="timeline-block">
                                          <div className="timeline-block-head shared">
                                              <div className="timeline-block-title">
                                                <div className="timeline-block-img">
                                                  <img src={path_image + "share-materials.png"} alt="" />
                                                </div>
                                                  <h6>Shared Content</h6>
                                              </div>
                                              <div className="timeline-time-view">
                                                  <div className="timeline-time">
                                                    {details?.time}
                                                  </div>|
                                                  <div className="timeline-timezone">
                                                    {details?.timezone}
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="timeline-article d-flex">
                                               <div className="timeline-article-image">
                                                  <img src={path_image + "dummy-img1.png"} alt=""/>
                                               </div>
                                               <div className="timeline-article-detail">
                                                    <div className="timeline-title">
                                                        <p>{
                                                          details?.pdfTitle===null || details?.pdfTitle==="" ? details?.action : details?.pdfTitle
                                                        }</p>
                                                    </div>
                                                    <div className="timeline-subtitle">
                                                        <p>{
                                                          details?.pdfTitle===null || details?.pdfTitle==="" ? "" : details?.pdfTitle
                                                        }</p>
                                                    </div>
                                               </div>
                                          </div>
                                           <div className="timeline-article-device">
                                              <table>
                                                <tbody>
                                                  <tr>
                                                    <th className="device-title">
                                                      Device
                                                    </th>
                                                    <td className="device-name">
                                                      {details?.webinar != "" ? details.webinar : details?.device_used}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                           </div>
                                      </div>
                                    </div>
                                  )
                                }

                                </>
                              )
                          })
                        }

                        {
                          /*
                          <div className="timeline-box">
                          <div className="timeline_date">
                          17 Feb 2023
                          </div>
                          <div className="timeline-block">
                          <div className="timeline-block-head registration">
                          <div className="timeline-block-title">
                          <div className="timeline-block-img">
                          <img src={path_image + "registration.png"} alt="" />
                          </div>
                          <h6>Registration</h6>
                          </div>
                          <div className="timeline-time-view">
                          <div className="timeline-time">
                          08:36 AM
                          </div>|
                          <div className="timeline-timezone">
                          Europe, London
                          </div>
                          </div>
                          </div>
                          <div className="timeline-article-device">
                          <table>
                          <tbody>
                          <tr>
                          <th className="device-title">
                          Title
                          </th>
                          <td className="device-name">
                          Octote condi ment zcsum dolor nibhdolor masa euismod phartra donec mas faucibus quisque nuneque ipsum
                          </td>
                          </tr>
                          <tr>
                          <th className="device-title">
                          Device
                          </th>
                          <td className="device-name">
                          Android
                          </td>
                          </tr>
                          </tbody>
                          </table>
                          </div>
                          </div>
                          </div>

                          <div className="timeline-block">
                          <div className="timeline-block-head saved">
                          <div className="timeline-block-title">
                          <div className="timeline-block-img">
                          <img src={path_image + "saved-content.png"} alt="" />
                          </div>
                          <h6>Saved Content</h6>
                          </div>
                          <div className="timeline-time-view">
                          <div className="timeline-time">
                          17 Feb 2023
                          </div>|
                          <div className="timeline-timezone">
                          17 Feb 2023
                          </div>
                          </div>
                          </div>
                          <div className="timeline-article d-flex">
                          <div className="timeline-article-image">
                          <img src={path_image + "dummy-img1.png"} alt=""/>
                          </div>
                          <div className="timeline-article-detail">
                          <div className="timeline-title">
                          <p>NuPreviq Study: Personalised prophylaxis with Nuwiq (simoctocog alfa) in adults with haemophilia A EBOOK SAMPLE</p>
                          </div>
                          <div className="timeline-subtitle">
                          <p>Infographics presented by Dr. Fernando Corrales EBO...</p>
                          </div>
                          </div>
                          </div>
                          <div className="timeline-article-device">
                          <table>
                          <tbody>
                          <tr>
                          <th className="device-title">
                          Device
                          </th>
                          <td className="device-name">
                          17 Feb 2023
                          </td>
                          </tr>
                          </tbody>
                          </table>
                          </div>
                          </div>
                          */
                        }
                    </div>
                  </div>
              </div>
              </>
              :
                "No Data Found"
              : null
            }
          </Row>
        </div>
      </Col>
    </>
  );
};

export default TimelineDetail;
