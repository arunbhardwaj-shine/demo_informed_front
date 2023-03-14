import React,{useState} from 'react';
import { Accordion, Button, Col, Dropdown, DropdownButton, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
 
const NewReaders = () => {
   const [search, setSearch] = useState("");
       const searchChange = (e) => {
        setSearch(e.target.value);
     };
    
const data = [
  {
    title:"Susheel",
  },
  {
     title:"Naveen",
  },
  {
     title:"Test",
  },
  {
     title:"Test New",
  },
  {
     title:"Test2",
  }
]
  const [eventSelected, setEventSelected] = useState("Webinar registered");
  const eventDropDownClicked = (e) => {setEventSelected(e);};
  const [articleSelected, setArticleSelected] = useState("Select Tags");
  const articleDropDownClicked = (e) => {setArticleSelected(e);};
  const [actionSelected, setActionSelected] = useState("Select Title");
  const actionDropDownClicked = (e) => {setActionSelected(e);};
  const [sortSelected, setSortSelected] = useState("User Action");
  const sortDropDownClicked = (e) => {setSortSelected(e);};
  const [sortUser, setSortUserd] = useState("Select User");
  const userDropDownClicked = (e) => {setSortUserd(e);};
  const [filterdata, setFilterData] = useState([]);
  let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
function LinkWithTooltip({ id, children, href, tooltip }) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
      placement="top"
      delayShow={300}
      delayHide={150}
    >
      <a href={href}>{children}</a>
    </OverlayTrigger>
  );
}
  let [active,setActive] = useState()
  const handleChange  = (value)=>{
    setActive(value)
  }
  return (
    <>
    <Col className="right-sidebar">
      <div className="custom-container">
        <Row>
            <div className="top-header reader_list">
                <div className="page-title">
                    <h2>Readers</h2>
                </div>
                 <div className="top-right-action library_content_view">
                <div className="search-bar">
                  <form className="d-flex">
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      id="email_search"
                    />
                    <button className="btn btn-outline-success" type="submit">
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
                        />
                      </svg>
                    </button>
                  </form>
                </div>
                <div
                  className="filter-by nav-item dropdown"
                >
                  <button
                    className="btn btn-secondary dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                  >
                    Filter By
                      <svg
                        className="close-arrow"
                        width="13"
                        height="12"
                        viewBox="0 0 13 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="2.09896"
                          height="15.1911"
                          rx="1.04948"
                          transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                          fill="#0066BE"
                        />
                        <rect
                          width="2.09896"
                          height="15.1911"
                          rx="1.04948"
                          transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                          fill="#0066BE"
                        />
                      </svg>
                  </button>
                </div>

                  {/* <div className="clear-search">
                      <button
                        className="btn btn-outline-primary cancel"
                      >
                        Cancel
                      </button>
                    
                  </div> */}
                </div>
            </div>

        </Row>
        <Row>
          <div className='library-content-box-layuot readerlist d-flex'> 
            <h4><span>Total HCP</span> | 203 </h4>
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <div className="doc-content">
                        <h4>Reader Name</h4>
                    </div>
                </div>
                <Tabs defaultActiveKey="personal-details" className="mb-3" fill>
                    <Tab eventKey="personal-details" title="Personal Details">
                      <div className="tab-panel d-flex flex-column justify-content-between">
                        <ul className="tab-mail-list">
                            <li>
                                <h6 className='tab-content-title'><strong>Email:</strong></h6>
                                <h6>arun1@mailinator.com</h6>
                            </li>
                            <li>
                                <h6 className='tab-content-title'><strong>Country:</strong></h6>
                                <h6>Azerbaijan</h6>
                            </li>
                            <li>
                                <h6 className='tab-content-title'><strong>User Status:</strong></h6>
                                <h6>HCP</h6>
                            </li>
                            <li>
                                <h6 className='tab-content-title'><strong>Last Email:</strong></h6>
                                <h6>N/A</h6>
                            </li>
                            <li>
                                <h6 className='tab-content-title'><strong>Last Activity:</strong></h6>
                                <h6>N/A</h6>
                            </li>
                            <li>
                                <h6 className='tab-content-title'><strong>Interests:</strong></h6>
                                <h6>N/A</h6>
                            </li>
                        </ul>
                          <div className="data-main-footer-sec">
                              <div className="footer-btn">
                                  <button className="btn btn-primary btn-filled" type="submit">
                                    <Link to="/reader-edit">Edit Details</Link>
                                  </button>
                              </div>
                          </div>
                    </div>
                    </Tab>
                    <Tab eventKey="usage" title="Usage">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>Emails Sent : <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>Emails Opened : <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>Content Delivered : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                                <li>
                                    <h5>Content with RTR : <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>QR Openings : <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>GO Openings : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                                <li>
                                    <h5>Content Openings : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>2</p>
                                </li>
                            </ul>
                            <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Last Email:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Last Activity:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Interests:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                        </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn">
                                    <button className="btn btn-primary btn-filled" type="submit"><Link to="/timeline-detail">See Timeline</Link></button>
                                </div>
                            </div>
                        </div>
                        
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5 className='tab-content-title'><strong>User Status:</strong></h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Sunshine</option>
                                                <option value="2">Offline Offer</option>
                                                <option value="3">Online Only</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5 className='tab-content-title'><strong>User Country:</strong></h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Sunshine</option>
                                                <option value="2">Offline Offer</option>
                                                <option value="3">Online Only</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn">
                                    <button className="btn btn-primary btn-filled" type="submit">Update</button>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <div className="doc-content">
                        <h4>Reader Name</h4>
                    </div>
                </div>
                <Tabs defaultActiveKey="personal-details" className="mb-3" fill>
                    <Tab eventKey="personal-details" title="Personal Details">
                      <div className="tab-panel">
                        <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Email:</strong></h5>
                                <h5>arun1@mailinator.com</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Country:</strong></h5>
                                <h5>Azerbaijan</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>User Status:</strong></h5>
                                <h5>HCP</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Last Email:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Last Activity:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Interests:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                        </ul>
                          <div className="data-main-footer-sec">
                              <div className="footer-btn">
                                  <button className="btn btn-primary btn-filled" type="submit">Edit Details</button>
                              </div>
                          </div>
                    </div>
                    </Tab>
                    <Tab eventKey="usage" title="Usage">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>Emails Sent : <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>Emails Opened : <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>Content Delivered : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                                <li>
                                    <h5>Content with RTR : <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>QR Openings : <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>GO Openings : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                                <li>
                                    <h5>Content Openings : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>2</p>
                                </li>
                            </ul>
                            <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Last Email:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Last Activity:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Interests:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                        </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn">
                                     <button className="btn btn-primary btn-filled" type="submit"><Link to="/timeline-detail">See Timeline</Link></button>
                                </div>
                            </div>
                        </div>
                        
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5 className='tab-content-title'><strong>User Status:</strong></h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Sunshine</option>
                                                <option value="2">Offline Offer</option>
                                                <option value="3">Online Only</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5 className='tab-content-title'><strong>User Country:</strong></h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Sunshine</option>
                                                <option value="2">Offline Offer</option>
                                                <option value="3">Online Only</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn">
                                    <button className="btn btn-primary btn-filled" type="submit">Update</button>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <div className="doc-content">
                        <h4>User1</h4>
                    </div>
                </div>
                <Tabs defaultActiveKey="personal-details" className="mb-3" fill>
                    <Tab eventKey="personal-details" title="Personal Details">
                      <div className="tab-panel">
                        <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Email:</strong></h5>
                                <h5>arun1@mailinator.com</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Country:</strong></h5>
                                <h5>Azerbaijan</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>User Status:</strong></h5>
                                <h5>HCP</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Last Email:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Last Activity:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Interests:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                        </ul>
                          <div className="data-main-footer-sec">
                              <div className="footer-btn">
                                  <button className="btn btn-primary btn-filled" type="submit">Edit Details</button>
                              </div>
                          </div>
                    </div>
                    </Tab>
                    <Tab eventKey="usage" title="Usage">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>Emails Sent : <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                    <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>Emails Opened : <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                    <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>Content Delivered : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                    <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                                <li>
                                    <h5>Content with RTR : <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                    <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>QR Openings : <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                    <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>GO Openings : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                    <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                                <li>
                                    <h5>Content Openings : <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                    <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>2</p>
                                </li>
                            </ul>
                            <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Last Email:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Last Activity:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Interests:</strong></h5>
                                <h5>N/A</h5>
                            </li>
                        </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn">
                                     <button className="btn btn-primary btn-filled" type="submit"><Link to="/timeline-detail">See Timeline</Link></button>
                                </div>
                            </div>
                        </div>
                        
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5 className='tab-content-title'><strong>User Status:</strong></h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Sunshine</option>
                                                <option value="2">Offline Offer</option>
                                                <option value="3">Online Only</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5 className='tab-content-title'><strong>User Country:</strong></h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Sunshine</option>
                                                <option value="2">Offline Offer</option>
                                                <option value="3">Online Only</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn">
                                    <button className="btn btn-primary btn-filled" type="submit">Update</button>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>             
            </div> 
        </Row>
      </div>
    </Col>
    
    </>
  )
}

export default NewReaders