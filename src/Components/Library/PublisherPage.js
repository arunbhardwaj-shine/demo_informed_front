import React, { useState } from 'react'
import { Container, Nav, Navbar, Row, Form, NavDropdown, Button, Modal, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const PublisherPage = () => {
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
                            <Link to="/informed">Lifescience</Link>
                            <Link to="/">Webinar</Link>
                            <Link to="/">Contact Us</Link>
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
        <section className="banner pulisher">
            <Container>
                <Row>
                    <Col sm={5}>
                    <div className="banner-content bnr-c2">
                        <h1>Help your clients <span>get digital right</span></h1>
                        <h5 className="banner-content-context">inforMed.pro hosting is built on the desire to say "YES" to your clients. To help them learn what works and drive more usage.</h5>
                    </div>
                    <div className="banner-content-video">
                        <div className="banner-content-video-popup" onclick="video_clicked('this');" data-toggle="modal" data-target="#video1" id="playVideo">
                            <img src={path_image + "jacob_popup.png"} alt=""/>
                            <div className="video_popup_icon">
                                <img src={path_image + "video-icon.png"} alt="" className="watch-demo"/>
                                <div className="hover-image">
                                    <img src={path_image + "ePrint-24-March.gif"} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Col>
                    <Col sm={7}>
                        <div className="renderrr">
                        </div>
                        <div className="infographic2 text-right ">
                            <img src={path_image + "Publishers@2x.png"}  alt=""/>
                        </div>
                        <div className="dotted-line d-line2">
                                <img src={path_image + "bnr-2-line1.png"} alt=""/>
                                <div className="dt-line d-left"><span className="dt-line-dote"><img src={path_image + "p-dot1.png"} className="text-right" alt=""/></span></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
         <section className="path-section">
            <Container>
            <div className="dotted-line text-center path-line"> 
                <img src={path_image + "path-line.png"} alt=""/> 
            </div>
            <Row className="content-sec">
                <Col md={4}>
                <div className="content-part path-cont">
                    <h2>Publisher path</h2>
                    <h5>We secure ALL your content</h5>
                    <ul className="feature-list">
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
                </div>
                </Col>
                <Col md={8} className="no-padding">
                <div className="path-features pull-right first_step_right">
                    <div className="path-fet-img"><img src={path_image + "Group_1.png"} alt=""/>
                    <div className="video_popup_icon">
                        <a href="https://docintel.app/Webinar/Docintel/login.php#Group_1" target="_blank">
                        <img src={path_image + "video-icon.png"} alt="" id="Group_1" className="watch-demo"/>
                            <div className="hover-image">
                            <img src={path_image + "ePrint-24-March.gif"} alt=""/>
                        </div>
                    </a>
                    </div>
                    </div>
                    <div className="path-fet-cont">
                    <p>Take 5 minutes to upload and set  the limitations of the license deal agreed with your clients.</p>
                    <ul className="space_path">
                        <li>Any content</li>
                        <li>Set compliance</li>
                        <li>Self manage</li>
                    </ul>
                    </div>
                </div>
                <div className="path-features pull-left left-space custom-alignn">
                    <div className="path-fet-img"><img src={path_image + "Group_2.png"} alt=""/>
                    <div className="video_popup_icon">
                        <a href="https://docintel.app/Webinar/Docintel/login.php#Group_2" target="_blank">
                        <img src={path_image + "video-icon.png"} id="Group_2" alt="" className="watch-demo"/>
                        <div className="hover-image">
                            <img src={path_image + "Delivery-6-May.gif"} alt=""/>
                        </div>
                    </a>
                    </div>
                    </div>
                    <div className="path-fet-cont">
                    <p>Your client can deliver it to doctors through Salesforce, inforMedGO, QR codees, Docintel codes or any 3rd party tool.</p>
                    <ul className="space_path">
                        <li>Salesforce</li>
                        <li>Email</li>
                        <li>Websites</li>
                    </ul>
                    </div>
                </div>
                </Col>
                <Col md={{span: 11, offset: 1}} className="publisher_feet-cont">
                <div className="pull-left">
                    <div className="path-features path-bottom-list p-f2">
                    <div className="path-fet-img"><img src={path_image + "Group_3.png"} alt=""/>
                    <div className="video_popup_icon">
                        <a href="https://docintel.app/Webinar/Docintel/login.php#Group_3" target="_blank">
                            <img src={path_image + "video-icon.png"} id="Group_3" alt="" className="watch-demo"/>
                            <div className="hover-image">
                            <img src={path_image + "Docintel-GIF.gif"} alt=""/>
                        </div>
                        </a>
                        </div>
                    </div>
                    <div className="path-fet-cont">
                        <p>Clinicians can read the content online from any browser and offline in our Docintel apps.</p>
                        <ul className="space_path">
                        <li>iOS, Android &amp; web</li>
                        <li>CPD log</li>
                        <li>Build a library</li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="content-box pull-right p-f2">
                    <div className="content-box-inner c-box-2">
                    <h4>Publishers</h4>
                    <p>Your client can see all the details of usage and RTR for each reader in their own account.</p>
                    </div>
                </div>
                </Col>
                <Col md={12} className="publisher_feet-cont-last-sec">
                <Col md={4} className="pull-right no-padding">
                <Row>  
                    <Col md={8}>
                    <div className="screenshot">
                        <div className="scr1"><img src={path_image + "scr-1.png"} alt=""/></div>
                        <div className="scr2"><img src={path_image + "scr-2.png"} alt=""/></div>
                        <div className="video_popup_icon">
                            <a href="https://docintel.app/Webinar/Docintel/login.php#Group_4" target="_blank">
                                <img src={path_image + "video-icon.png"} id="Group_4" alt="" className="watch-demo"/>
                                <div className="hover-image">
                                    <img src={path_image + "Analytics-10-June-GIF.gif"} alt=""/>
                                </div>
                            </a>
                        </div>
                    </div>
                    </Col>
                    <Col md={4}>
                    <div className="slide-content">
                        <ul>
                        <li><a href="#" className="prof_clr">Profiles	</a></li>
                        <li><a href="#">Openings</a></li>
                        <li><a href="#">RTR</a></li>
                        </ul>
                    </div>
                    </Col>
                    </Row>
                </Col>
                </Col>
                <Col md={12}>
                <div className="publisher-sec">
                    <div className="publisher-cont pull-left">
                    <p>*We take GDPR &amp; data safety very seriously. It will only be your client who sees which Clinicians read your content.</p>
                    </div>
                    <div className="publisher-text-box pull-left">
                    <div className="content-box-inner take_ttl_left">
                        <h4>Lifescience</h4>
                        <p>Meanwhile you can track aggregated data for each eprints and we email you an alert if limits are nearing.</p>
                    </div>
                    </div>
                </div>
                </Col>
            </Row>
            </Container>
        </section>
        <section className="contact-section">
            <Container>
                <Row>
                    <Col md={4}>
                        <div className="contact-left">
                            <h3>Digital not working <span>as good as it should?</span></h3>
                            <p>Our approach is entirely modular. With decades of experience in the industry we know that no two needs are the same.</p>
                            <div className="mob-img">
                                <img src={path_image + "contact-mobile.png"} alt="img-here" className="img-responsive"/>
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="contact-right">
                            <h3>Contact inforMed.pro</h3>
                            <p className="msg_text">Or send us a message and we'll be in touch</p>
                             <Form className="contact_inforMed">
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="text" placeholder="Your name" />
                                    </Col>
                                    <Col>
                                         <Form.Control type="email" placeholder="Email" />
                                    </Col>
                                    <Col>
                                         <Form.Control type="tel" placeholder="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Company" />
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Send
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <section className="news-section">
            <Container>
                <h3>Latest News</h3>
                <p className="news-dis">Here are our news and thoughts.</p>
                <Row>
                    <Col md={4}>
                        <div className="article_bx red_back">
                            <div className="article_bx-upper">
                                <p>Blog</p>
                                <h2>
                                    <a href="https://informed.pro/Pages/blog/1">Our Manifesto</a>
                                </h2>
                            </div>
                            <div className="article_bx-bottom">
                                <a href="https://informed.pro/Pages/blog/1" className="login">READ</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        <footer>
        <p>Copyright 2021 
            <a href="https://informed.pro/" target="_blank"> InforMed.Pro</a>. Read our <a href="javascript:;" onClick={handleShow}> privacy policy</a>.
        </p>
        </footer>
    </div>
   </>
  )
}

export default PublisherPage