import React, { useState } from 'react'
import { Container, Nav, Navbar, Row, Form, NavDropdown, Button, Modal, Col } from 'react-bootstrap'

const Informed = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
    <div className='informed'>
        <Navbar expand="lg" className='informed-nav'>
            <Container>
                <Navbar.Brand href="#home"><img src={path_image + "inforMed_Logo_Blue_1.svg"}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="informed-login" />
                    <Navbar.Collapse id="informed-login">
                        <Nav className="ms-auto justify-content-end">
                            <Nav.Link href="#home">Publisher</Nav.Link>
                            <Nav.Link href="#link">Webinar</Nav.Link>
                            <Nav.Link href="#link">Contact Us</Nav.Link>
                            <NavDropdown title="Login">
                                <Form>
                                    <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    className="form-field"
                                    aria-label="Name"
                                    />
                                    <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    className="form-field"
                                    aria-label="Password"
                                    />
                                    <Button variant="outline-success">Go</Button>
                                    <p onClick={handleShow} className="go-btn">Forgot password?</p>
                                </Form>
                            </NavDropdown>
                        </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <section className='banner'>
            <Container>
                <Row>
                    <Col sm={7}>
                        <div className="banner-infographic">
                            <div className="infographic text-right ">
                                <img src={path_image + "top-line.png"} className="line-shape text-right" alt=""/>
                                <div className="dt-line">
                                    <span className="dt-line-dote">
                                        <img src={path_image + "top-dot.png"} className="line-dot text-right" alt="" id="first-img"/>
                                    </span>
                                </div>
                            </div>
                            <div className="bnr-img">
                                <img src={path_image + "top-infographic-1.png"} className="infographic-img" alt=""/>
                            </div>
                        </div>
                    </Col>
                    <Col sm={5}>
                        <div className="banner-content">
                            <h1><span>The relationship</span><br/> builder</h1>
                            <h4>We link content and consent with individual behaviours to drive insight and future actions on a personal level, resulting in ever greater effectiveness for your communication. </h4>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className='library-section'>
            <Container>
                <div className="dotted-line">
                    <img src={path_image + "bnr2-line-new.png"} alt=""/>
                    <div className="dt-line r-none">
                        <span className="dt-line-dote">
                            <img src={path_image + "bnr2-0line-new.png"} className="text-right" alt=""/>
                        </span>
                    </div>
                </div>
                <Row className="content-sec desktop">
                    <Col sm={3}>
                    <ul className="library-list">
                        <li><img src={path_image + "librery-icon-new.png"} alt=""/></li>
                        <li></li>
                        <li></li>
                        <li><img src={path_image + "behaviour.png"} alt=""/></li>
                        <li><img src={path_image + "share-icon.png"} alt=""/></li>
                        
                    </ul>
                    </Col>
                    <Col sm={9}>
                        <div className="content-part c-p1">
                            <h2>The inforMed Library: Content and Consent </h2>
                            <p>The inforMed Library hosts all your content which can be distributed to Clinicians across all channels. And secures their continued consent.</p>
                            <ul className="feature-list shift_left">
                                <li><img src={path_image + "list-icon1.png"} alt=""/>
                                    <p>Articles</p>
                                </li>
                                <li><img src={path_image + "list-icon2.png"} alt=""/>
                                    <p>Web pages</p>
                                </li>
                                <li><img src={path_image + "list-icon3.png"} alt=""/>
                                    <p>EBooks</p>
                                </li>
                                <li><img src={path_image + "list-icon4.png"} alt=""/>
                                    <p>CME/CPD</p>
                                </li>
                                <li><img src={path_image + "list-icon5.png"} alt=""/>
                                    <p>Video</p>
                                </li>
                                <li><img src={path_image + "list-icon6.png"} alt=""/>
                                <p>Combinations</p>
                                </li>
                            </ul>
                            <div className="feature-list-next-content">
                                <p><span>
                                    <img src={path_image + "saleforce-plus.png"} alt=""/>
                                </span>
                                <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FHBQ4UAP">
                                    <img src={path_image + "sale-icon.png"} alt=""/>
                                </a>
                                <span className="saleforce_cont">Naturally the library can be integrated with your Salesforce account.</span>
                                </p>
                            </div>
                        </div>
                        <div className="content-part c-p2 behaviour">
                            <h2>Behaviour</h2>
                            <p><span>Do you know how much each of your Clinicians read?</span></p>
                            <p>We build profiles for every Clinician based on their actual<br/> behaviour, so you can tailor content and channels accordingly.</p>
                            <div className="content-part height_up actions">
                                <h2>Action </h2>
                                <p><span>What do you currenlty learn from Clinicians engagement?</span></p>
                                <p>Through detailed analysis you can target key groups. Use our SmartLists for<br/> emails, the inforMedGO app for in person or Docintel Codes. Or link content<br/> anywhere online or with any 3rd party tools.</p>
                            </div>
                            <div className="content-part personalisation">
                                <ul>
                                    <li className="personalisation-right">
                                        <img src={path_image + "personalize.png"} alt=""/>
                                    </li>
                                </ul>
                                <div className="personalisation-content">
                                    <h2 className="heading-personal">Personalisation</h2>
                                    <p>When you know what each Clinician reads or ignores, you can tailor messaging so it is more likely to be read or viewed, making them feel more engaged. </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="content-sec mobile" style={{display: "none"}}>
                    <ul className="library-list">
                            <li><img src={path_image + "librery-icon-new.png"} alt=""/>
                            <div className="content-part c-p1">
                            <h2>The inforMed Library: Content and Consent </h2>
                            <p>The inforMed Library hosts all your content which can be distributed to Clinicians across all channels. And secures their continued consent.</p>
                            <ul className="feature-list shift_left">
                            <li><img src={path_image + "list-icon1.png"} alt=""/>
                                <p>Web pages</p>
                            </li>
                            <li><img src={path_image + "list-icon3.png"} alt=""/>
                                <p>EBooks</p>
                            </li>
                            <li><img src={path_image + "list-icon4.png"} alt=""/>
                                <p>CME/CPD</p>
                            </li>
                            <li><img src={path_image + "list-icon5.png"} alt=""/>
                                <p>Video</p>
                            </li>
                            <li><img src={path_image + "list-icon6.png"} alt=""/>
                            <p>Combinations</p>
                            </li></ul>
                            <div className="feature-list-next-content">
                                <p><span><img src={path_image + "saleforce-plus.png"} alt=""/></span><a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FHBQ4UAP "><img src={path_image + "sale-icon.png"} alt=""/></a><span className="saleforce_cont">Naturally the library can be integrated with your Salesforce account.</span></p>
                            </div>
                        </div>
                            </li>
                            <li><img src={path_image + "behaviour.png"} alt=""/>
                                <div className="content-part c-p2 behaviour">
                                <h2>Behaviour</h2>
                                <p><span>Do you know how much each of your Clinicians read?</span></p>
                                <p>We build profiles for every Clinician based on their actual<br/> behaviour, so you can tailor content and channels accordingly.</p>
                                </div>
                            </li>
                            <li>
                                <img src={path_image + "share-icon.png"} alt=""/>
                                <div className="content-part c-p2 behaviour">
                                <h2>Action </h2>
                                <p><span>What do you currenlty learn from Clinicians engagement?</span></p>
                                <p>Through detailed analysis you can target key groups. Use our SmartLists for<br/> emails, the inforMedGO app for in person or Docintel Codes. Or link content<br/> anywhere online or with any 3rd party tools.</p>
                                </div>
                            </li>
                            <li className="personalisation-right"><img src={path_image + "personalize.png"} alt=""/>
                            <div className="personalisation-content">
                            <h2 className="heading-personal">Personalisation</h2>
                            <p>When you know what each Clinician reads or ignores, you can tailor messaging so it is more likely to be read or viewed, making them feel more engaged. </p>
                        </div>
                            </li>
                            
                        </ul>
                    </div>
            </Container>
        </section>
        <section className="download-sec">
            <Container className="padding_righttt">
            <div className="d-content">
                <div className="d-content-inr">
                <h5>Doctors access your content through Docintel.app.<br/> The apps become each clinician's own library of content.</h5>
                <a href="https://itunes.apple.com/us/app/docintel/id1459624369?ls=1&amp;mt=8" target="_blank" className="d-btn">Download Here</a></div>
                <img className="modify_img_path" src="https://albert.docintel.app/static/images/All_Logo.png" alt=""/> </div>
            </Container>
        </section>
        <section className="rtr-section">
        <Container>
        <div className="dotted-line">
            <img src={path_image + "bnr3-line.png"} alt=""/>
            <div className="dt-line r-none">
                <span className="dt-line-dote">
                    <img src={path_image + "bnr3-0line.png"} className="text-right" alt=""/>
                </span>
            </div>
        </div>
        <Row className="content-sec top-space">
            <Col className="albert-inside-upper">
                <div className="albert-inside-upper-left">
                    <div className="albert-inside-upper-left-logo">
                        <img src={path_image + "docintel-white-tag.png"} alt=""/>
                    </div>
                    <p>Docintel is a personal library for Clinicians to keep all the materials they receive from you. Clinicians can control and adjust their consent settings as well as record their CPD. </p>
                </div>
                <div className="albert-inside-upper-right">
                    <img src={path_image + "docintel-white-mobile-new.png"} alt=""/>
                </div>
            </Col>
            <Col md={12} className="albert-inside-bottom">
                <div className="albert-inside-bottom-left">
                    <img src={path_image + "docintel-white-left-mobile.png"} alt=""/>
                </div>
                <div className="albert-inside-bottom-right">
                    <h3>Docintel also hosts <span>Albert the AI</span></h3>
                    <p>Albert reads all new abstracts as they are released, sorts them into 40 specialities and rates each for Clinical value, making it easier for Clinicians to stay informed on their relevant expertise. </p>
                </div>
            </Col>
            <Col md={12} className="rtr-detial">
                <ul className="feature-list">
                    <li className="cr-flow"> <img src={path_image + "rtr-icon1.png"} alt=""/>
                    <div className="separator-line b-c1"></div>
                    <p className="p-c1">Watched <br/>webinar</p>
                    <h3 className="p-c1">100%</h3>
                    </li>
                    <li><img src={path_image + "rtr-icon2.png"} alt=""/>
                    <div className="separator-line  b-c2"></div>
                    <p className="p-c2">Read <br/>chapter 8</p>
                    <h3 className="p-c2">55%</h3>
                    </li>
                    <li className="cr-flow c-f2"><img src={path_image + "rtr-icon3.png"} alt=""/>
                    <div className="separator-line  b-c3"></div>
                    <p className="p-c3">Read <br/>abstract</p>
                    <h3 className="p-c3">28%</h3>
                    </li>
                    <li><img src={path_image + "rtr-icon4.png"} alt=""/>
                    <div className="separator-line  b-c4"></div>
                    <p className="p-c4">Read pages<br/>
                        1-5 &amp; 8</p>
                    <h3 className="p-c4">72%</h3>
                    </li>
                </ul>
                <div className="rtr-section-contents">
                    <h3>Read Through Rate (RTR)</h3>
                    <p>Docintel monitors Clinicians individual RTR. This industry first Natural Language Processing tool analyses what Clinicians read, page by page and what they ignore.</p>
                </div>
            </Col>
        </Row>
    </Container>
        </section>
        <section className="team-section">
            <Container>
                <div className="dotted-line">
                    <img src={path_image + "bnr4-line-new.png"} alt=""/>
                    <div className="dt-line r-none">
                        <span className="dt-line-dote">
                            <img src={path_image + "bnr4-0line-new.png"} alt=""/>
                        </span>
                    </div>
                </div>
                <Row className="content-sec">
                    <Col md={{span: 9, offset: 3}} className="content-sec-left">
                        <div className="quick-text">
                            <div className="quick-inr">
                            <h2>Get your team <br/>
                                <span>started quickly!</span></h2>
                                <p>An inforMed.pro account can be set up in under a month.<br/> Enabling all your content to be housed with full compliance in<br/> one space. Letting your team distribute and gain the power<br/> that comes with Clincian consent and any complaince.</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={{span: 11, offset: 1}} className="no-padding team-section-map-listing">
                        <ul className="date-list">
                            <li>
                            <h5><strong>January</strong></h5>
                            <div><p>Build your<br/>Library</p></div>
                            </li>
                            <li>
                            <h5><strong>February</strong></h5>
                            <div><p>Roll-out<br/> to sales</p></div>
                            </li>
                            <li>
                            <h5>Gathering data with the Library AI</h5>
                            <div><p>No change for reps,<br/>just informed intelligence</p></div>
                            </li>
                            <li>
                            <h5><strong>November</strong> <span>Faster Prescriptions</span></h5>
                            <div><p>Start having applying AI with<br/> our Prediction AI engine</p></div>
                            </li>
                        </ul>
                    </Col>
                    <Col sm={12}>
                        <div class="start-building-gdpr">
                            <div class="start-building-gdpr-content">
                                <div class="start-building-gdpr-left">
                                    <img src={path_image + "build-flag.png"} alt=""/>
                                </div>
                                <div class="start-building-gdpr-right">
                                    <h4>Start building your GDPR compliant library, distribute across all channels and help your team predict doctors' path to prescriptions</h4>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default Informed