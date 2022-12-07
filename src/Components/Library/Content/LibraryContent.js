import React from 'react';
import { useState } from "react";
import { Col, Dropdown, DropdownButton, Nav, NavDropdown, NavItem, Row, Tab, Tabs } from 'react-bootstrap';
import SimpleReactValidator from "simple-react-validator";
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

  return (
    <>
    <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="search_view readers">
              <div className="smart-list-btns">
                <div className="top-right-action">
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
                
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"}
                            style={{width:"57px"}}/>
                    </a>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <p>Sub-Title: For Testing purpose</p>
                    </div>
                    <a href="#" className="refresh-btn">
                            <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </a>

                </div>

                <Tabs
                    defaultActiveKey="docintel-link"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    >
                    <Tab eventKey="docintel-link" title="Docintel Link">
                      <div className="tab-pane">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>
                    </Tab>
                    <Tab eventKey="data-tab" title="Data">
                     <div className="tab-pane">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                       <div className="tab-pane">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </Tab>
                    </Tabs>



                {/* <ul className="nav nav-pills doc-tab" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Docintel Link</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Data</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Change</button>
                    </li>

                </ul>

                <div className="tab-content doc-tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab" tabindex="0">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        tabindex="0">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                        tabindex="0">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div> */}


            </div>
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"}
                            style={{width:"57px"}}/>
                    </a>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <p>Sub-Title: For Testing purpose</p>
                    </div>
                    <a href="#" className="refresh-btn">
                            <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </a>

                </div>

                <Tabs
                    defaultActiveKey="docintel-link"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    >
                    <Tab eventKey="docintel-link" title="Docintel Link">
                      <div className="tab-pane">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>
                    </Tab>
                    <Tab eventKey="data-tab" title="Data">
                     <div className="tab-pane">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                       <div className="tab-pane">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </Tab>
                    </Tabs>



                {/* <ul className="nav nav-pills doc-tab" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Docintel Link</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Data</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Change</button>
                    </li>

                </ul>

                <div className="tab-content doc-tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab" tabindex="0">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        tabindex="0">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                        tabindex="0">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div> */}


            </div>
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"}
                            style={{width:"57px"}}/>
                    </a>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <p>Sub-Title: For Testing purpose</p>
                    </div>
                    <a href="#" className="refresh-btn">
                            <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </a>

                </div>

                <Tabs
                    defaultActiveKey="docintel-link"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                    >
                    <Tab eventKey="docintel-link" title="Docintel Link">
                      <div className="tab-pane">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>
                    </Tab>
                    <Tab eventKey="data-tab" title="Data">
                     <div className="tab-pane">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey="change-tab" title="Change">
                       <div className="tab-pane">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </Tab>
                    </Tabs>



                {/* <ul className="nav nav-pills doc-tab" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Docintel Link</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Data</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Change</button>
                    </li>

                </ul>

                <div className="tab-content doc-tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab" tabindex="0">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        tabindex="0">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                        tabindex="0">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div> */}


            </div>
            {/* <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"}
                            style={{width:"57px"}}/>
                    </a>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <p>Sub-Title: For Testing purpose</p>
                    </div>
                    <a href="#" className="refresh-btn">
                            <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </a>

                </div>

                <ul className="nav nav-pills doc-tab" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Docintel Link</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Data</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Change</button>
                    </li>

                </ul>

                <div className="tab-content doc-tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab" tabindex="0">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        tabindex="0">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                        tabindex="0">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


            </div> */}
            <div className="doc-content-main-box col">
                <div className="doc-content-header">
                    <a href="#"><img alt="doc-logo" src={path_image + "dummy-img.png"}
                            style={{width:"57px"}}/>
                    </a>
                    <div className="doc-content">
                        <h4>Dignoastic</h4>
                        <p>Sub-Title: For Testing purpose</p>
                    </div>
                    <a href="#" className="refresh-btn">
                            <img src={path_image + "refresh1.png"} alt="refresh-btn" style={{width:"20px"}}/>
                    </a>

                </div>

                <ul className="nav nav-pills doc-tab" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                            aria-selected="true">Docintel Link</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                            aria-selected="false">Data</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                            aria-selected="false">Change</button>
                    </li>

                </ul>

                <div className="tab-content doc-tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab" tabindex="0">
                        <a href="#" className="doc-link">kfdfjdi</a>
                        <ul className="tab-mail-list">
                            <li>
                                <h5>
                                    Link type:
                                </h5>
                                <p>
                                    Sunshine
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Publisher:
                                </h5>
                                <p>
                                    Simms-Cendan
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Usage limits:
                                </h5>
                                <p>
                                    20
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Expiration date:
                                </h5>
                                <p>
                                    20 September 2023
                                </p>
                            </li>
                            <li>
                                <h5>
                                    inforMedGO Code:
                                </h5>
                                <p>
                                    18659065
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Docintel Code:
                                </h5>
                                <p>
                                    741453971
                                </p>
                            </li>
                            <li>
                                <h5>
                                    Language:
                                </h5>
                                <p>
                                    English
                                </p>
                            </li>
                        </ul>

                        <div className="footer-btn-wrapper">
                            <a href="#" className="footer-btn">Preview Aritcle</a>
                            <a href="#" className="footer-btn">Download QR</a>
                            <a href="#" className="footer-btn">Send in Email</a>
                        </div>
                        <ul className="tab-mail-list tag">
                            <li>
                                <h5>
                                    Tags:
                                </h5>
                                <p>
                                    N/A
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"
                        tabindex="0">
                        <div className="data-main-box">
                            <ul className="tab-mail-list data">
                                <li>
                                    <h5>
                                        Unique Reader (total) :
                                    </h5>
                                    <p>
                                        6
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Openings (total) :
                                    </h5>
                                    <p>
                                        32
                                    </p>
                                </li>
                                <li>
                                    <h5>
                                        Registered Readers :
                                    </h5>
                                    <p>
                                        23
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab"
                        tabindex="0">
                        <div className="data-main-box change-tab-main-box">
                            <ul className="tab-mail-list data change">
                                <li>
                                    <h5>
                                        Article Type:
                                    </h5>
                                    <div className="select-dropdown-wrapper">
                                        <div className="select">
                                            <select>
                                                <option value="1">Pure CSS Select</option>
                                                <option value="2">No JS</option>
                                                <option value="3">Nice!</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <h5>
                                        Tags:
                                    </h5>
                                    <p>
                                        N/A
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


            </div>
          </Row>
          </div>
      </Col>
    </>
  )
}

export default LibraryContent;