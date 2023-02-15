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
                <div className="top-right-action">
                    <div className="filter-by nav-item dropdown highlight">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sort By
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#">By Registered User</Dropdown.Item>
                                <Dropdown.Item href="#">By Unregistered User</Dropdown.Item>
                                <Dropdown.Item href="#">All User</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="albert-block">
                        <div className="switch6">
                            <label className="switch6-light">
                            <input type="checkbox" />
                            <span>
                                <span className="grid_view">
                                    <img src={path_image + "grid-view.png"} alt="Grid View"/>
                                </span>
                                <span className="list_view">
                                    <img src={path_image + "list-view.png"} alt="List View"/>
                                </span>
                            </span>
                            <a className="btn"></a>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="search_view readers">
              <div className="smart-list-btns readers-view">
                <div className="top-right-action library_content_view">
                  <div className="col">
                    <label>Webinar registered</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                        title={eventSelected}
                         onSelect={(event) => eventDropDownClicked(event)}>
                        <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                        <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Select Tags</label>,
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown" title={articleSelected} onSelect={(event) => articleDropDownClicked(event)}>
                      <Dropdown.Item eventKey="All Tags">All Tags</Dropdown.Item>
                      <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Select Title</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown" title={actionSelected} onSelect={(event) => actionDropDownClicked(event)}>
                      <Dropdown.Item eventKey="Motivate Article">Motivate Article</Dropdown.Item>
                      <Dropdown.Item eventKey="Motivate Study">Motivate Study</Dropdown.Item>
                      <Dropdown.Item eventKey="Motivate Webinar">Motivate Webinar</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>User Action</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown" title={sortSelected} onSelect={(event) => sortDropDownClicked(event)}>
                      <Dropdown.Item eventKey="Article Bookmarked">Article Bookmarked</Dropdown.Item>
                      <Dropdown.Item eventKey="Article Printed">Article Printed</Dropdown.Item>
                      <Dropdown.Item eventKey="Article Downloaded">Article Downloaded</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Select User</label>
                     <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown" title={sortUser} onSelect={(event) => userDropDownClicked(event)}>
                      <Dropdown.Item eventKey="All Users">All Users</Dropdown.Item>
                      <Dropdown.Item eventKey="HCP Users">HCP Users</Dropdown.Item>
                      <Dropdown.Item eventKey="Test Users">Test Users</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
                <div className="top-right-action library_content_view">
                  <div className="search-bar col">
                    <form className="d-flex">
                      <label>Search</label>
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search by name or email" aria-label="Search" value={search} onChange={(e) => searchChange(e)}/>

                      <button className="btn btn-outline-success" type="submit">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M15.8045 14.862L11.2545 10.312C12.1359 9.22334 12.6665 7.84 12.6665 6.33334C12.6665 2.84134 9.82522 0 6.33325 0C2.84128 0 0 2.84131 0 6.33331C0 9.82531 2.84132 12.6667 6.33328 12.6667C7.83992 12.6667 9.22325 12.136 10.3119 11.2547L14.8619 15.8047C14.9919 15.9347 15.1625 16 15.3332 16C15.5039 16 15.6745 15.9347 15.8045 15.8047C16.0652 15.544 16.0652 15.1227 15.8045 14.862ZM6.33328 11.3333C3.57597 11.3333 1.33333 9.09066 1.33333 6.33331C1.33333 3.57597 3.57597 1.33331 6.33328 1.33331C9.0906 1.33331 11.3332 3.57597 11.3332 6.33331C11.3332 9.09066 9.09057 11.3333 6.33328 11.3333Z"
                            fill="#97B6CF"
                          ></path>
                        </svg>
                      </button>
                    </form>
                  </div>
                  <div className="clear-search">
                    <button className="btn btn-outline-primary">
                       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE"/>
                            <path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE"/>
                        </svg>
                    </button>
                    </div>
                </div>
              </div>
            </div>
        </Row>
        <Row>
          <div className='library-content-box-layuot readerlist d-flex'>   
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