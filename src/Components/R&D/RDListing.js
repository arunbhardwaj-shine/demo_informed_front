import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  OverlayTrigger,
  Row,Table,Tooltip,
} from "react-bootstrap";

const RDListing = () => {
const tooltip = (
    <Tooltip id="tooltip">
      The number of individual users who viewed the content
    </Tooltip>
);
const [show, setShow] = useState();
const [rdSiteData, setRdSiteData] = useState();
 const [isActive, setIsActive] = useState("");
   const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
    <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                <h2>LEX-210</h2>
              </div>
              <Button title="Download Site Engagements" className="download">
                <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                              fill="#0066BE"
                            ></path>
                            <path
                              d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                              fill="#0066BE"
                            ></path>
                          </svg>
                </Button>
            </div>
                <div className="rd-full-explain rd-listing">
                  <div className="rd-section-title">
                    <h4>Total Results</h4>
                  </div>
                  <div
                    className="rd-training-block"
                    //ref={site_Engagement}
                    //tabIndex={-1}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="rd-training-block-left">
                        <h4>
                          User Listing | <span>{rdSiteData?.length}</span>
                        </h4>
                        <p>Click on the list to see more details</p>
                      </div>
                      <div
                        className="rd-training-block-right d-flex"
                        //ref={site_Engagement}
                       // tabIndex={-1}
                      >
                        <button
                          id="test-table-xls-button"
                          className="download-table-xls-button"
                          //onClick={() => handleExport("site_engagement")} // Call your export function here
                        />

                        <Button
                          className={`sort_btn ${
                            isActive == "dec"
                              ? "svg_active"
                              : isActive == "asc"
                              ? "svg_asc"
                              : ""
                          }`}
                          //onClick={siteEngagementSort}
                        >
                          Sort By
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              id="asc"
                              d="M18.9224 12.744C18.7661 12.5878 18.5542 12.5 18.3332 12.5C18.1122 12.5 17.9003 12.5878 17.744 12.744L14.9999 15.4882V2.49984C14.9999 2.27882 14.9121 2.06686 14.7558 1.91058C14.5995 1.7543 14.3875 1.6665 14.1665 1.6665C13.9455 1.6665 13.7335 1.7543 13.5773 1.91058C13.421 2.06686 13.3332 2.27882 13.3332 2.49984V15.4882L10.589 12.744C10.4318 12.5922 10.2213 12.5082 10.0029 12.5101C9.78435 12.512 9.57534 12.5997 9.42084 12.7542C9.26633 12.9087 9.17869 13.1177 9.17679 13.3362C9.17489 13.5547 9.25889 13.7652 9.41068 13.9223L13.5774 18.089C13.6548 18.1666 13.7467 18.2282 13.848 18.2702C13.9492 18.3122 14.0577 18.3338 14.1674 18.3338C14.277 18.3338 14.3855 18.3122 14.4867 18.2702C14.588 18.2282 14.6799 18.1666 14.7574 18.089L18.924 13.9223C19.08 13.7658 19.1675 13.5538 19.1672 13.3328C19.1669 13.1119 19.0788 12.9001 18.9224 12.744Z"
                              fill="#97B6CF"
                            />
                            <path
                              id="dsc"
                              d="M10.5892 6.0772L6.42251 1.91054C6.34489 1.83277 6.25253 1.77129 6.15084 1.7297C5.94698 1.64544 5.71803 1.64544 5.51417 1.7297C5.41248 1.77129 5.32011 1.83277 5.2425 1.91054L1.07583 6.0772C0.919572 6.23368 0.831875 6.44582 0.832031 6.66695C0.832188 6.88809 0.920184 7.10011 1.07666 7.25636C1.23314 7.41262 1.44528 7.50032 1.66642 7.50016C1.88756 7.5 2.09957 7.41201 2.25583 7.25553L5 4.51137V17.4997C5 17.7207 5.0878 17.9327 5.24408 18.0889C5.40036 18.2452 5.61232 18.333 5.83334 18.333C6.05435 18.333 6.26631 18.2452 6.4226 18.0889C6.57888 17.9327 6.66667 17.7207 6.66667 17.4997V4.51137L9.41085 7.25553C9.56801 7.40733 9.77852 7.49132 9.99701 7.48943C10.2155 7.48753 10.4245 7.39989 10.579 7.24538C10.7335 7.09087 10.8212 6.88186 10.8231 6.66337C10.825 6.44487 10.741 6.23437 10.5892 6.0772Z"
                              fill="#97B6CF"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table className="fold-table" id="user_listing">
                        <thead>
                          <tr>
                            <th>User name</th>
                            <th className="campaign_mail">Email id</th>
                            <th>Country</th>
                            <th>Last email sent</th>
                            <th>No. of compaign sent</th>
                            <th>Content read reminder</th>
                            <th>Mail read reminder</th>
                            <th>Block reminder</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                            <tr className="view">
                                <td>Pinar</td>
                                <td>pinar.bakir@mycro.com.tr</td>
                                <td>USA</td>
                                <td>06.02.2024</td>
                                <td>2</td>
                                <td>2</td>
                                <td>1</td>
                                <td><input type="checkbox" id="list1" label=""/></td>
                                <td className="pics"><img src={path_image + "certificate.png"} alt="Certificate" /></td>
                            </tr>
                            <tr className="fold show">
                                <td colSpan={9}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Campaign ID</th>
                                                <th>Campaign name</th>
                                                <th>Date</th>
                                                <th>Campaign type</th>
                                                <th>Email read</th>
                                                <th>Link open</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>101</td>
                                                <td>IRT Pharmacist unblinded training</td>
                                                <td>02.02.2024</td>
                                                <td>Original Campaign</td>
                                                <td>Yes</td>
                                                <td>Opened</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>102</td>
                                                <td>IRT Pharmacist unblinded training</td>
                                                <td>02.02.2024</td>
                                                <td>Read reminder</td>
                                                <td>Yes</td>
                                                <td>Opened</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>103</td>
                                                <td>IRT Pharmacist unblinded training</td>
                                                <td>02.02.2024</td>
                                                <td>Read reminder</td>
                                                <td>Yes</td>
                                                <td className="not_yet">Not yet</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>103</td>
                                                <td>IRT Pharmacist unblinded training</td>
                                                <td>02.02.2024</td>
                                                <td>Read reminder</td>
                                                <td className="not_yet">No</td>
                                                <td className="not_yet">Not yet</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        </tbody>                                    
                                    </table>
                                </td>
                                
                            </tr>
                            <tr className="blank">
                                <td colspan="9" style={{ height: "10px;" }}>
                                  &nbsp;
                                </td>
                            </tr>
                            <tr className="view">
                                <td>Shiv</td>
                                <td>shiv@informed.pro</td>
                                <td>India</td>
                                <td>06.01.2024</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td><input type="checkbox" id="list1" label=""/></td>
                                <td className="pics"></td>
                            </tr>
                            <tr className="fold">
                                <td colSpan={9}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Campaign ID</th>
                                                <th>Campaign name</th>
                                                <th>Date</th>
                                                <th>Campaign type</th>
                                                <th>Email read</th>
                                                <th>Link open</th>
                                                <td>&nbsp;</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>101</td>
                                                <td>IRT Pharmacist unblinded training</td>
                                                <td>02.02.2024</td>
                                                <td>Original Campaign</td>
                                                <td>Yes</td>
                                                <td>Opened</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td>102</td>
                                                <td>IRT Pharmacist unblinded training</td>
                                                <td>02.02.2024</td>
                                                <td>Read reminder</td>
                                                <td>Yes</td>
                                                <td>Opened</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            
                                        </tbody>                                    
                                    </table>
                                </td>
                                
                            </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
            </Row>
        </div>
    </Col>
    </>
  )
}

export default RDListing