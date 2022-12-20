import React from 'react';
import { useState } from "react";
import { Col, Dropdown, DropdownButton, Nav, NavDropdown, NavItem, Row, Tab, Tabs } from 'react-bootstrap';
import SimpleReactValidator from "simple-react-validator";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

const LibraryContent = () => {
     const [search, setSearch] = useState("");
       const searchChange = (e) => {
        setSearch(e.target.value);
     };
 
  const [eventSelected, setEventSelected] = useState(
    "All Tags"
  );

    const eventDropDownClicked = (e) => {
    console.log(e);
    setEventSelected(e);
   };
    const articleDropDownClicked = (e) => {
    console.log(e);
    setArticleSelected(e);
  };
   const actionDropDownClicked = (e) => {
    console.log(e);
    setActionSelected(e);
  };
  const sortDropDownClicked = (e) => {
    console.log(e);
    setSortSelected(e);
  };

    const [articleSelected, setArticleSelected] = useState("Select By Article");
    const [actionSelected, setActionSelected] = useState("Select Action");
    const [sortSelected, setSortSelected] = useState("Select By");
    const [renderAfterValidation, setRenderAfterValidation] = useState(0);
    const [validator] = React.useState(new SimpleReactValidator());
    const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      console.log("All Valid");
    } else {
      //console.log("show error messages");
      //console.log(validator.errorMessages);
      validator.showMessages();
      setRenderAfterValidation(renderAfterValidation + 1);
    }
  };
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
  return (
    <>
    <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="search_view readers">
              <div className="smart-list-btns">
                <div className="top-right-action library_content_view">
                  <div className="col">
                    <label>Select Tags</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                        title={eventSelected}
                      onSelect={(event) => eventDropDownClicked(event)}>
                      <Dropdown.Item eventKey="All Tags">All Tags</Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 1">Tags 1</Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 2">Tags 2</Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 3">Tags 3</Dropdown.Item>
                      <Dropdown.Item eventKey="Tags 4">Tags 4</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Select By Article</label>

                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown" title={articleSelected} onSelect={(event) => articleDropDownClicked(event)}>
                      <Dropdown.Item eventKey=" Select By Article">Select By Article</Dropdown.Item>
                      <Dropdown.Item eventKey="Expired">Expired</Dropdown.Item>
                      <Dropdown.Item eventKey="Non-Expired">Non-Expired</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Select Action</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown" title={actionSelected} onSelect={(event) => actionDropDownClicked(event)}>
                      <Dropdown.Item eventKey=" Select Action">Select Action</Dropdown.Item>
                      <Dropdown.Item eventKey="Draft">Draft</Dropdown.Item>
                      <Dropdown.Item eventKey="Live">Live</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="col">
                    <label>Sort By</label>
                     <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown" title={sortSelected} onSelect={(event) => sortDropDownClicked(event)}>
                      <Dropdown.Item eventKey="Select By">Select By</Dropdown.Item>
                      <Dropdown.Item eventKey="Desending">Desending</Dropdown.Item>
                      <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  
                </div>
              </div>
            </div>
            </Row>
            <Row>
            <div className='library-content-box-layuot d-flex'>   
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <div className="doc-content-header-logo"><a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"} style={{width:"57px"}}/></a></div>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <h5>Sub-Title: For Testing purpose</h5>
                    </div>
                    <div className="refresh-btn">
                        <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </div>
                </div>
                <Tabs defaultActiveKey="docintel-link" className="mb-3" fill>
                    <Tab eventKey="docintel-link" title="Docintel Link">
                      <div className="tab-panel">
                        <div className="tab-content-links">
                        <a href="#" className="doc-link">https://www.informed.pro</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Link type:</strong></h5>
                                <h5>Sunshine</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Publisher:</strong></h5>
                                <h5>Simms-Cendan</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Usage limits:</strong></h5>
                                <h5>20</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Expiration date:</strong></h5>
                                <h5>20 September 2023</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>inforMedGO Code:</strong></h5>
                                <h5>18659065</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Docintel Code:</strong></h5>
                                <h5>741453971</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Language:</strong></h5>
                                <h5>English</h5>
                            </li>
                        </ul>
                        </div>
                        <div className='data-main-footer-sec'>
                            <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                            <a href="#" className="footer-btn">Copy Docintel Link</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <b>Tags:</b>
                                <a href="#">N/A </a> <a href="#">N/A </a>
                            </li>
                        </ul>
                        </div>
                        
                    </div>
                    </Tab>
                    <Tab eventKey="data-tab" title="Data">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>Unique Reader (total): 
                                        <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>Openings (total): <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>Registered Readers: <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn-wrapper">
                                 <a href="#" className="footer-btn">Analytics</a>
                                </div>
                                <ul className="tab-mail-list tag">
                                    <li>
                                        <b>Tags:</b>
                                        <a href="#">N/A </a>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5 className='tab-content-title'><strong>Article Type:</strong></h5>
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
                                    <b>Tags:</b>
                                    <a href="#" className='tags'>N/A </a>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn-wrapper">
                                     <a href="#" className="footer-btn">Edit Docintel Link</a>
                                     <a href="#" className="footer-btn">Add / Remove Tags</a>
                                     <a href="#" className="footer-btn">New Sublink</a>
                                </div>
                                <div className="footer-btn">
                                    <button className="btn btn-primary btn-filled" type="submit">Save</button>
                                </div>
                            </div>
                            
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <div className="doc-content-header-logo"><a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"} style={{width:"57px"}}/></a></div>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <h5>Sub-Title: For Testing purpose</h5>
                    </div>
                    <div className="refresh-btn">
                        <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </div>
                </div>
                <Tabs defaultActiveKey="docintel-link" className="mb-3" fill>
                    <Tab eventKey="docintel-link" title="Docintel Link">
                      <div className="tab-panel">
                        <div className="tab-content-links">
                        <a href="#" className="doc-link">https://www.informed.pro</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Link type:</strong></h5>
                                <h5>Sunshine</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Publisher:</strong></h5>
                                <h5>Simms-Cendan</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Usage limits:</strong></h5>
                                <h5>20</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Expiration date:</strong></h5>
                                <h5>20 September 2023</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>inforMedGO Code:</strong></h5>
                                <h5>18659065</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Docintel Code:</strong></h5>
                                <h5>741453971</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Language:</strong></h5>
                                <h5>English</h5>
                            </li>
                        </ul>
                        </div>
                        <div className='data-main-footer-sec'>
                            <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                            <a href="#" className="footer-btn">Copy Docintel Link</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <b>Tags:</b>
                                <a href="#">N/A </a> <a href="#">N/A </a>
                            </li>
                        </ul>
                        </div>
                        
                    </div>
                    </Tab>
                    <Tab eventKey="data-tab" title="Data">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>Unique Reader (total): 
                                        <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>Openings (total): <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>Registered Readers: <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn-wrapper">
                                 <a href="#" className="footer-btn">Analytics</a>
                                </div>
                                <ul className="tab-mail-list tag">
                                    <li>
                                        <b>Tags:</b>
                                        <a href="#">N/A </a>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5 className='tab-content-title'><strong>Article Type:</strong></h5>
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
                                    <b>Tags:</b>
                                    <a href="#" className='tags'>N/A </a>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn-wrapper">
                                     <a href="#" className="footer-btn">Edit Docintel Link</a>
                                     <a href="#" className="footer-btn">Add / Remove Tags</a>
                                     <a href="#" className="footer-btn">New Sublink</a>
                                </div>
                                <div className="footer-btn">
                                    <button className="btn btn-primary btn-filled" type="submit">Save</button>
                                </div>
                            </div>
                            
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <div className="doc-content-header-logo"><a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"} style={{width:"57px"}}/></a></div>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <h5>Sub-Title: For Testing purpose</h5>
                    </div>
                    <div className="refresh-btn">
                        <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </div>
                </div>
                <Tabs defaultActiveKey="docintel-link" className="mb-3" fill>
                    <Tab eventKey="docintel-link" title="Docintel Link">
                      <div className="tab-panel">
                        <div className="tab-content-links">
                        <a href="#" className="doc-link">https://www.informed.pro</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5 className='tab-content-title'><strong>Link type:</strong></h5>
                                <h5>Sunshine</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Publisher:</strong></h5>
                                <h5>Simms-Cendan</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Usage limits:</strong></h5>
                                <h5>20</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Expiration date:</strong></h5>
                                <h5>20 September 2023</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>inforMedGO Code:</strong></h5>
                                <h5>18659065</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Docintel Code:</strong></h5>
                                <h5>741453971</h5>
                            </li>
                            <li>
                                <h5 className='tab-content-title'><strong>Language:</strong></h5>
                                <h5>English</h5>
                            </li>
                        </ul>
                        </div>
                        <div className='data-main-footer-sec'>
                            <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                            <a href="#" className="footer-btn">Copy Docintel Link</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <b>Tags:</b>
                                <a href="#">N/A </a> <a href="#">N/A </a>
                            </li>
                        </ul>
                        </div>
                        
                    </div>
                    </Tab>
                    <Tab eventKey="data-tab" title="Data">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>Unique Reader (total): 
                                        <LinkWithTooltip tooltip="Number of unique HCPs who have opened the content (based on ip address, device & browser)." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>6</p>
                                </li>
                                <li>
                                    <h5>Openings (total): <LinkWithTooltip tooltip="Number of opening counts for specific article." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>32</p>
                                </li>
                                <li>
                                    <h5>Registered Readers: <LinkWithTooltip tooltip="Number of HCPs who have register for or activated the content." href="#">
                                        <img src={path_image + "info_circle_icon.svg"} alt="refresh-btn"/></LinkWithTooltip></h5>
                                    <p className='data_box'>23</p>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn-wrapper">
                                 <a href="#" className="footer-btn">Analytics</a>
                                </div>
                                <ul className="tab-mail-list tag">
                                    <li>
                                        <b>Tags:</b>
                                        <a href="#">N/A </a>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5 className='tab-content-title'><strong>Article Type:</strong></h5>
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
                                    <b>Tags:</b>
                                    <a href="#" className='tags'>N/A </a>
                                </li>
                            </ul>
                            <div className="data-main-footer-sec">
                                <div className="footer-btn-wrapper">
                                     <a href="#" className="footer-btn">Edit Docintel Link</a>
                                     <a href="#" className="footer-btn">Add / Remove Tags</a>
                                     <a href="#" className="footer-btn">New Sublink</a>
                                </div>
                                <div className="footer-btn">
                                    <button className="btn btn-primary btn-filled" type="submit">Save</button>
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
  );
}

export default LibraryContent;