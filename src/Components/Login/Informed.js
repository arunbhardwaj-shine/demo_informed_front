import React, { useState } from 'react'
import { Container, Nav, Navbar, Row, Form, NavDropdown, Button, Modal, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import { loader } from "../../loader";

const Informed = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const[name,setName] = useState("");
    const[contactEmail,setContactEmail] = useState("");
    const[phone,setPhone] = useState("");
    const[company,setCompany] = useState("");
   const[conatctError, setContactError] = useState(false);

    const [show, setShow] = useState(false);
    const [privacyshow, setPrivacyshow] = useState(false);
    const handleClose = (type) => {
      if(type == "forgot"){
        setShow(false);
      }else{
        setPrivacyshow(false);
      }
    }
    const handleShow = (type) => {
      if(type == "forgot"){
        setShow(true);
      }else{
        setPrivacyshow(true);
      }
    }
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

    // for login
    const handleLogin = async(event) => {
        event.preventDefault();
        if (username === "" && password === "") {
          setShowError("Please enter a username and password");
        } else if (username === "") {
          setShowError("Please enter a username");
        } else if (password === "") {
          setShowError("Please enter a password");
        } else {
          setShowError(null);
          loader("show");
          try{
            const res = await postData(ENDPOINT.LOGIN, {
              email: username,
              password: password
            });

            localStorage.clear();
            localStorage.setItem("user_id", res?.data?.data?.userToken);
            localStorage.setItem("group_id", res?.data?.data?.groupId);
            localStorage.setItem("webinar_flag", res?.data?.data?.webinar_flag);
            localStorage.setItem("name", res?.data?.data?.name);
            localStorage.setItem("decrypted_token", res?.data?.data?.jwtToken);
            loader("hide");
            navigate("/library-content");

          }catch(err){
            console.log(err);
            setShowError(err?.response?.data?.message);
            loader("hide");
          }
        }
      };

      // for send email forgetpassword
      const onSendEmail = async(event) => {
        event.preventDefault();
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (email.trim() === "") {
          setErrorMsg("Please enter your email.");
        } else if (!emailRegex.test(email)) {
          setErrorMsg("Please enter a valid email address.");
        }else{
          loader("show");
          try{
            const res = await postData(ENDPOINT.FORGET, {
              email: email,
            });
            loader("hide");
            setEmail('');
            setErrorMsg(null);
            setSuccessMsg(res?.data?.message);
            // setShow(false)
          } catch(err){
            // console.log(err);
            setSuccessMsg(null);
            setErrorMsg(err?.response?.data?.message);
            loader("hide");
          }
        }
      };

// send contact infromation
const sendContactInformation= (event) => {
    event.preventDefault();

    if(name === "" && contactEmail === "" && phone === "" && company === " "){
    setContactError("please enter all field");
    } else if ( name === "" ){
        setContactError("please enter name");
    } else if ( contactEmail == "" ){
        setContactError("please enter email");
    } else if ( phone === "" ) {
        setContactError("please enter phone");
    } else if ( company === " " ){
        setContactError("please enter company");
    } else {
        setContactError(null);
    }
};

    return (
        <>
            <div className="loader" id="custom_loader">
              <div className="loader_show">
                <span className="loader-view"> </span>
              </div>
            </div>

            <div className='informed'>
                <Navbar expand="lg" className='informed-nav'>
                    <Container>
                        <Navbar.Brand href="#home"><img src={path_image + "inforMed_Logo_Blue_1.svg"} /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="informed-login" />
                        <Navbar.Collapse id="informed-login">
                            <Nav className="ms-auto justify-content-end">
                                <Link to="/publisher-page">Publisher</Link>
                                <Link to="/webinar">Webinar</Link>
                                <Link to="/">Contact Us</Link>
                                <NavDropdown title="Login">
                                    <Form onSubmit={handleLogin}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            className="form-field"
                                            aria-label="Name"
                                            value={username}
                                            autoComplete="off"
                                            onChange={(event) => setUsername(event.target.value)}

                                        />
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            className="form-field"
                                            aria-label="Password"
                                            value={password}
                                            autoComplete="off"
                                            onChange={(event) => setPassword(event.target.value)}

                                        />
                                      {showError && <p style={{ color: "red" }}>{showError}</p>}
                                        <Button variant="outline-success" type="submit">
                                            Go
                                        </Button>
                                        <p onClick={(e) => handleShow("forgot")} className="go-btn">
                                            Forgot password?
                                        </p>
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
                                        <img src={path_image + "top-line.png"} className="line-shape text-right" alt="" />
                                        <div className="dt-line">
                                            <span className="dt-line-dote">
                                                <img src={path_image + "top-dot.png"} className="line-dot text-right" alt="" id="first-img" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bnr-img">
                                        <img src={path_image + "top-infographic-1.png"} className="infographic-img" alt="" />
                                    </div>
                                </div>
                            </Col>
                            <Col sm={5}>
                                <div className="banner-content">
                                    <h1><span>The relationship</span><br /> builder</h1>
                                    <h4>We link content and consent with individual behaviours to drive insight and future actions on a personal level, resulting in ever greater effectiveness for your communication. </h4>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className='library-section'>
                    <Container>
                        <div className="dotted-line">
                            <img src={path_image + "bnr2-line-new.png"} alt="" />
                            <div className="dt-line r-none">
                                <span className="dt-line-dote">
                                    <img src={path_image + "bnr2-0line-new.png"} className="text-right" alt="" />
                                </span>
                            </div>
                        </div>
                        <Row className="content-sec desktop">
                            <Col sm={3}>
                                <ul className="library-list">
                                    <li><img src={path_image + "librery-icon-new.png"} alt="" /></li>
                                    <li></li>
                                    <li></li>
                                    <li><img src={path_image + "behaviour.png"} alt="" /></li>
                                    <li><img src={path_image + "share-icon.png"} alt="" /></li>

                                </ul>
                            </Col>
                            <Col sm={9}>
                                <div className="content-part c-p1">
                                    <h2>The inforMed Library: Content and Consent </h2>
                                    <p>The inforMed Library hosts all your content which can be distributed to Clinicians across all channels. And secures their continued consent.</p>
                                    <ul className="feature-list shift_left">
                                        <li><img src={path_image + "list-icon1.png"} alt="" />
                                            <p>Articles</p>
                                        </li>
                                        <li><img src={path_image + "list-icon2.png"} alt="" />
                                            <p>Web pages</p>
                                        </li>
                                        <li><img src={path_image + "list-icon3.png"} alt="" />
                                            <p>EBooks</p>
                                        </li>
                                        <li><img src={path_image + "list-icon4.png"} alt="" />
                                            <p>CME/CPD</p>
                                        </li>
                                        <li><img src={path_image + "list-icon5.png"} alt="" />
                                            <p>Video</p>
                                        </li>
                                        <li><img src={path_image + "list-icon6.png"} alt="" />
                                            <p>Combinations</p>
                                        </li>
                                    </ul>
                                    <div className="feature-list-next-content">
                                        <p><span>
                                            <img src={path_image + "saleforce-plus.png"} alt="" />
                                        </span>
                                            <a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FHBQ4UAP">
                                                <img src={path_image + "sale-icon.png"} alt="" />
                                            </a>
                                            <span className="saleforce_cont">Naturally the library can be integrated with your Salesforce account.</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="content-part c-p2 behaviour">
                                    <h2>Behaviour</h2>
                                    <p><span>Do you know how much each of your Clinicians read?</span></p>
                                    <p>We build profiles for every Clinician based on their actual<br /> behaviour, so you can tailor content and channels accordingly.</p>
                                    <div className="content-part height_up actions">
                                        <h2>Action </h2>
                                        <p><span>What do you currenlty learn from Clinicians engagement?</span></p>
                                        <p>Through detailed analysis you can target key groups. Use our SmartLists for<br /> emails, the inforMedGO app for in person or Docintel Codes. Or link content<br /> anywhere online or with any 3rd party tools.</p>
                                    </div>
                                    <div className="content-part personalisation">
                                        <ul>
                                            <li className="personalisation-right">
                                                <img src={path_image + "personalize.png"} alt="" />
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
                        <div className="content-sec mobile" style={{ display: "none" }}>
                            <ul className="library-list">
                                <li><img src={path_image + "librery-icon-new.png"} alt="" />
                                    <div className="content-part c-p1">
                                        <h2>The inforMed Library: Content and Consent </h2>
                                        <p>The inforMed Library hosts all your content which can be distributed to Clinicians across all channels. And secures their continued consent.</p>
                                        <ul className="feature-list shift_left">
                                            <li><img src={path_image + "list-icon1.png"} alt="" />
                                                <p>Web pages</p>
                                            </li>
                                            <li><img src={path_image + "list-icon3.png"} alt="" />
                                                <p>EBooks</p>
                                            </li>
                                            <li><img src={path_image + "list-icon4.png"} alt="" />
                                                <p>CME/CPD</p>
                                            </li>
                                            <li><img src={path_image + "list-icon5.png"} alt="" />
                                                <p>Video</p>
                                            </li>
                                            <li><img src={path_image + "list-icon6.png"} alt="" />
                                                <p>Combinations</p>
                                            </li></ul>
                                        <div className="feature-list-next-content">
                                            <p><span><img src={path_image + "saleforce-plus.png"} alt="" /></span><a href="https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FHBQ4UAP "><img src={path_image + "sale-icon.png"} alt="" /></a><span className="saleforce_cont">Naturally the library can be integrated with your Salesforce account.</span></p>
                                        </div>
                                    </div>
                                </li>
                                <li><img src={path_image + "behaviour.png"} alt="" />
                                    <div className="content-part c-p2 behaviour">
                                        <h2>Behaviour</h2>
                                        <p><span>Do you know how much each of your Clinicians read?</span></p>
                                        <p>We build profiles for every Clinician based on their actual<br /> behaviour, so you can tailor content and channels accordingly.</p>
                                    </div>
                                </li>
                                <li>
                                    <img src={path_image + "share-icon.png"} alt="" />
                                    <div className="content-part c-p2 behaviour">
                                        <h2>Action </h2>
                                        <p><span>What do you currenlty learn from Clinicians engagement?</span></p>
                                        <p>Through detailed analysis you can target key groups. Use our SmartLists for<br /> emails, the inforMedGO app for in person or Docintel Codes. Or link content<br /> anywhere online or with any 3rd party tools.</p>
                                    </div>
                                </li>
                                <li className="personalisation-right"><img src={path_image + "personalize.png"} alt="" />
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
                                <h5>Doctors access your content through Docintel.app.<br /> The apps become each clinician's own library of content.</h5>
                                <a href="https://itunes.apple.com/us/app/docintel/id1459624369?ls=1&amp;mt=8" target="_blank" className="d-btn">Download Here</a></div>
                            <img className="modify_img_path" src="https://albert.docintel.app/static/images/All_Logo.png" alt="" /> </div>
                    </Container>
                </section>
                <section className="rtr-section">
                    <Container>
                        <div className="dotted-line">
                            <img src={path_image + "bnr3-line.png"} alt="" />
                            <div className="dt-line r-none">
                                <span className="dt-line-dote">
                                    <img src={path_image + "bnr3-0line.png"} className="text-right" alt="" />
                                </span>
                            </div>
                        </div>
                        <Row className="content-sec top-space">
                            <Col className="albert-inside-upper">
                                <div className="albert-inside-upper-left">
                                    <div className="albert-inside-upper-left-logo">
                                        <img src={path_image + "docintel-white-tag.png"} alt="" />
                                    </div>
                                    <p>Docintel is a personal library for Clinicians to keep all the materials they receive from you. Clinicians can control and adjust their consent settings as well as record their CPD. </p>
                                </div>
                                <div className="albert-inside-upper-right">
                                    <img src={path_image + "docintel-white-mobile-new.png"} alt="" />
                                </div>
                            </Col>
                            <Col md={12} className="albert-inside-bottom">
                                <div className="albert-inside-bottom-left">
                                    <img src={path_image + "docintel-white-left-mobile.png"} alt="" />
                                </div>
                                <div className="albert-inside-bottom-right">
                                    <h3>Docintel also hosts <span>Albert the AI</span></h3>
                                    <p>Albert reads all new abstracts as they are released, sorts them into 40 specialities and rates each for Clinical value, making it easier for Clinicians to stay informed on their relevant expertise. </p>
                                </div>
                            </Col>
                            <Col md={12} className="rtr-detial">
                                <ul className="feature-list">
                                    <li className="cr-flow"> <img src={path_image + "rtr-icon1.png"} alt="" />
                                        <div className="separator-line b-c1"></div>
                                        <p className="p-c1">Watched <br />webinar</p>
                                        <h3 className="p-c1">100%</h3>
                                    </li>
                                    <li><img src={path_image + "rtr-icon2.png"} alt="" />
                                        <div className="separator-line  b-c2"></div>
                                        <p className="p-c2">Read <br />chapter 8</p>
                                        <h3 className="p-c2">55%</h3>
                                    </li>
                                    <li className="cr-flow c-f2"><img src={path_image + "rtr-icon3.png"} alt="" />
                                        <div className="separator-line  b-c3"></div>
                                        <p className="p-c3">Read <br />abstract</p>
                                        <h3 className="p-c3">28%</h3>
                                    </li>
                                    <li><img src={path_image + "rtr-icon4.png"} alt="" />
                                        <div className="separator-line  b-c4"></div>
                                        <p className="p-c4">Read pages<br />
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
                            <img src={path_image + "bnr4-line-new.png"} alt="" />
                            <div className="dt-line r-none">
                                <span className="dt-line-dote">
                                    <img src={path_image + "bnr4-0line-new.png"} alt="" />
                                </span>
                            </div>
                        </div>
                        <Row className="content-sec">
                            <Col md={{ span: 9, offset: 3 }} className="content-sec-left">
                                <div className="quick-text">
                                    <div className="quick-inr">
                                        <h2>Get your team <br />
                                            <span>started quickly!</span></h2>
                                        <p>An inforMed.pro account can be set up in under a month.<br /> Enabling all your content to be housed with full compliance in<br /> one space. Letting your team distribute and gain the power<br /> that comes with Clincian consent and any complaince.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col md={{ span: 11, offset: 1 }} className="no-padding team-section-map-listing">
                                <ul className="date-list">
                                    <li>
                                        <h5><strong>January</strong></h5>
                                        <div><p>Build your<br />Library</p></div>
                                    </li>
                                    <li>
                                        <h5><strong>February</strong></h5>
                                        <div><p>Roll-out<br /> to sales</p></div>
                                    </li>
                                    <li>
                                        <h5>Gathering data with the Library AI</h5>
                                        <div><p>No change for reps,<br />just informed intelligence</p></div>
                                    </li>
                                    <li>
                                        <h5><strong>November</strong> <span>Faster Prescriptions</span></h5>
                                        <div><p>Start having applying AI with<br /> our Prediction AI engine</p></div>
                                    </li>
                                </ul>
                            </Col>
                            <Col sm={12}>
                                <div className="start-building-gdpr">
                                    <div className="start-building-gdpr-content">
                                        <div className="start-building-gdpr-left">
                                            <img src={path_image + "build-flag.png"} alt="" />
                                        </div>
                                        <div className="start-building-gdpr-right">
                                            <h4>Start building your GDPR compliant library, distribute across all channels and help your team predict doctors' path to prescriptions</h4>
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
                                        <img src={path_image + "contact-mobile.png"} alt="img-here" className="img-responsive" />
                                    </div>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className="contact-right">
                                    <h3>Contact inforMed.pro</h3>
                                    <p className="msg_text">Or send us a message and we'll be in touch</p>
                                    <Form className="contact_inforMed" onSubmit={sendContactInformation}>
                                        <Row className="mb-3">
                                            <Col>
                                                <Form.Control
                                                type="text"
                                                placeholder="Your name"
                                                className="form-field"
                                                aria-label="Your Name"
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                                 />
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                aria-label="Your Email"
                                                value={contactEmail}
                                                onChange={(event) => setContactEmail(event.target.value)}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Control type="tel"
                                                placeholder="Phone"
                                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                                aria-label="Your Phone"
                                                value={phone}
                                                onChange={(event) => setPhone(event.target.value)}
                                                 />
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                 type="text"
                                                 placeholder="Company"
                                                 aria-label="Your Comapny"
                                                 value={company}
                                                onChange={(event) => setCompany(event.target.value)}
                                                 />
                                            </Col>
                                        </Row>
                                        {conatctError && <p style={{ color: "red" }}>{conatctError}</p>}
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
                        <a href="https://informed.pro/" target="_blank"> InforMed.Pro</a>. Read our <a href="javascript:;" onClick={(e) => handleShow("privacy")}> privacy policy</a>.
                    </p>
                </footer>
            </div>
            <Modal show={show} onHide={(e) => handleClose("forgot")} className='header-forgot'>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Your Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSendEmail}>
                        <Form.Control
                            type="text"
                            placeholder="Enter your Email"
                            className="form-field"
                            aria-label="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {errorMsg && <p>{errorMsg}</p>}
                        {successMsg && <p style={{ color: "#39CABC" }}>{successMsg}</p>}
                        <Button type="submit">Send Email</Button>
                    </Form>
                </Modal.Body>
            </Modal>



            <Modal show={privacyshow} onHide={(e) => handleClose("privacy")}>
                <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <div className="privacy_policy_modal">
                    <p>MedArkive is committed to protecting your personal information.</p>
                    <p>This Policy explains what personal information MedArkive Ltd ("MedArkive", "we", "us", "our") collects from you through our platform, how we use the information and how we keep it secure.</p>
                    <p>This statement applies to our website and apps.</p>
                    <p>This policy applies as between you, the user of this website, and MedArkive the owner and provider of this website. Our Privacy Policy does not extend to any websites that can be accessed from our website including, but not limited to, any links we may provide on social media websites.</p>
                    <ol start="1">
                        <li dir="ltr">Data Protection Law
                        </li>
                    </ol>
                    <p>MedArkive is committed to complying with the data protection law. We adhere to the law by ensuring that the data you provide us will be:</p>
                    <ul>
                        <li>Processed lawfully, fairly and in a transparent manner;</li>
                        <li>Collected for specific, explicit and legitimate purposes and not further processed in a manner that is incompatible with those purposes;</li>
                        <li>Adequate, relevant and limited to what is necessary for those purposes;</li>
                        <li>Accurate and, where necessary, kept up to date;</li>
                        <li>Kept in a form which permits identification of data subject for no longer than is necessary for the purposes for which the personal data is processed;</li>
                        <li>Processed in a manner that ensures appropriate security of the personal data.</li>
                    </ul>
                    <ol start="2">
                        <li dir="ltr">Collecting Personal Information</li>
                    </ol>
                    <p>MedArkive acts as the processor of the information you provide.</p>
                    <p>We process the information for legitimate business purposes and to help our clients provide our users with tailored content aimed at improving their professional development and knowledge.<br />
                        If you decide not to provide us with your personal data you may not be able to use some of our platform and/or services.</p>
                    <ol start="3">
                        <li dir="ltr">
                            Data Collected
                        </li>
                    </ol>
                    <p>The following data may be collected by MedArkive:</p>
                    <ol start="a" className='list-ol'>
                        <li>name;</li>
                        <li>date of birth;</li>
                        <li>gender;</li>
                        <li>job title;</li>
                        <li>profession;</li>
                        <li>contact information such as email addresses and/or telephone numbers;</li>
                        <li>demographic information such as post code, preferences and interests;</li>
                        <li>IP address (automatically collected);</li>
                        <li>web browser type and version (automatically collected);</li>
                        <li>operating system (automatically collected);</li>
                        <li> a list of URLs starting with a referring site, your activity on this Website, and the site you exit to (automatically collected).
                        </li>
                    </ol>
                    <br />
                    <ol start="4">
                        <li dir="ltr">How We Use Data
                        </li>
                    </ol>
                    <p>MedArkive uses your personal information for the following reasons:</p>

                    <ul>
                        <li>To operate effectively as a business and to perform essential business operations, including providing products optimised for medical professionals</li>
                    </ul>


                    <p dir="ltr">We are motivated to provide products which offer outstanding resources for medical professionals, including sponsored content. To enhance your enjoyment and productivity on our platform, we endeavour to identify and improve our services. To ensure your experience with our products is seamless, we continuously re-examine and iteratively optimise user journeys on our platform. We infer your location from your device IP address in order to geo restrict certain content on our platform and ensure smooth access for you without the need to re-login when avoidable, and aid content selection for sponsors of content. Product issues, identified by users and communicated through customer support, are effectively diagnosed and resolved using data collected from interactions on the platform. Decisions on product development and evaluations of product performance are based on aggregate analysis and business intelligence based on non-personal data.<br />All our clients and partners are required to take appropriate security measures to protect your personal data in line with national legislation and policies of the countries they reside in. No matter which country our clients reside in MedArkive will always treat personal data as a minimum with a level corresponding to the General Data Protection Regulation. This means that you will have the rights as set out in clause 5 (below) and have the right to disclosure, erasure etc. from MedArkive's database.<br />Should you wish to exercise your right to be forgotten we will erase all data about you in both platforms and request the data controller to do the same. However, where consent was given we keep a record of this for disclosures under legal requirements, but we will delete all other data collected.<br />In addition to the specific disclosure of personal data set out in this section, we may disclose your personal data where such disclosure is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person. We may also disclose your personal data where such disclosure is necessary for the establishment, exercise or defence of legal claims, whether in court proceedings or in an administrative or out-of-court procedure.</p>
                    <ul>
                     <li className="change_li">To deliver communications of personal interest including product and content releases, motivational prompts and in response to product queries or support requests.</li>
                    </ul>

                    <p dir="ltr">Direct communications<br />Communications sent by MedArkive come in the form of emails to the email address provided by you during the registration process and through notifications delivered to your device. MedArkive may send you communications relating to new and existing product and content releases and updates. We send such communications so that you are aware of changes we are making to the content or features of our products, or new releases, which could affect the usefulness of our core services to you. You, of course, have the right to opt out of such email communication at any time by using the unsubscribe link, found at the bottom of every email.<br />Third party communications.<br />Our clients contact you in various ways and deliver content hosted by MedArkive. They will do this under their own set of regulations depending on your relationship with them, which will be independent from MedArkive. We may also from time to time push free sponsored content from our clients into your account. You can always delete content received in your account.</p>
                    <ul>
                    <li className="change_li">To inform commercial partners and clients of engagement and interactions on sponsored content hosted on our platform</li>
                    </ul>
                    <p dir="ltr">When you receive content hosted by MedArkive and sponsored by our clients, such as medical device companies and pharmaceutical companies, they are the data controllers. As data controllers they will have control over your private data which we will host in our inforMed.pro platform and what is done with the data is their decision.<br />The data controllers will have access to see your name, email, IP address, what you read and when, but they will never see your password. Each data controller will only see the data that is in relation to what each of them have sponsored. Only MedArkive and you can see all the content you have engaged with. You can find it in the reading list under your CPD Log in the apps.
                        Should you contact us about your right to disclosure, erasure etc. we will delete what we can from our database and inform each data controller about your desire to be forgotten. We will inform you who has received any personal data about you so that you may contact them for further erasure.<br /><br />Our aim with processing your private data is to help our clients to identify better content that is more suited to help you in your professional capacity.<br /><br />To the extent that the legal basis for our processing of your personal information is consent, you have the right to withdraw that consent at any time by emailing dpo@medarkive.com. Withdrawal will not affect the lawfulness of processing before the withdrawal.</p>
                    <ol start="5">
                        <li dir="ltr">Accessing your personal data
                        </li>
                    </ol>

                     <p>Under the data protection legislation you have:</p>
                     <ul>
                    <li>the right to be informed;</li>
                    <li>the right to access;</li>
                    <li>the right to rectification;</li>
                    <li>the right to erasure;</li>
                    <li>the right to restrict processing;</li>
                    <li>the right to object; and</li>
                    <li>rights in relation to automated decision making and profiling.</li>
                     </ul>

                    <p dir="ltr"><span>To learn more about your rights you should consult the data protection legislation and the country guidance from the relevant supervisory authority.<br /><br />Upon written request to our data protection officer we will provide you with information about what personal data we hold about you. To be able to process your request we may ask you to verify your identity or ask more information about your request. Where we are legally permitted to do so, we may decline your request but we will explain why if we do so. <br /><br /> You have the right to lodge a complaint with a supervisory authority if you think that our processing of your personal data infringes data protection laws.</span></p>
                    <ol start="6">
                        <li dir="ltr">
                            Data Retention
                        </li>
                    </ol>
                    <p dir="ltr"><span>MedArkive will retain personal data for as long as necessary to fulfil our aim of improving content provided to you.</span></p>
                    <ol start="7">
                        <li dir="ltr">
                            Securing Your Information
                        </li>
                    </ol>

                    <p dir="ltr">Data security is of great importance to MedArkive and to protect your data we have put in place suitable physical, electronic and managerial procedures to safeguard and secure data collected via our website and our apps.<br />Our main office is located in England, UK. We also have affiliate offices situated in the EU and in India. We are hosting all content and personal data on servers within the EU. Our clients are based all over the world. As such we may transfer data across the globe, but will always abide by English data protection legislation and as a minimum The General Data Protection Regulation.</p>
                    <ol start="8">
                        <li dir="ltr">
                            Third Party Websites and Services
                        </li>
                    </ol>


                    <p dir="ltr">MedArkive may, from time to time, employ the services of other parties for dealing with matters that may include, but are not limited to, delivery of sponsored items, search engine facilities, advertising and marketing. The providers of such services may have access to certain personal data provided by users of this website.<br />Any data used by such parties is used only to the extent required by them to perform the services that MedArkive requests. Any use for other purposes is strictly prohibited. Furthermore, any data that is processed by third parties shall be processed within the terms of this Policy and in accordance with the data protection legislation.</p>

                    <ol start="9">
                        <li dir="ltr">
                            Links to Other Websites
                        </li>
                    </ol>
                    <p dir="ltr">This website may, from time to time, provide links to other websites. MedArkive has no control over such websites and is in no way responsible for the content thereof. This Policy does not extend to your use of such websites. Users are advised to read the privacy policy or statement of other websites prior to using them.</p>

                    <ol start="10">
                        <li dir="ltr">
                            Changes of Business Ownership and Control
                        </li>
                    </ol>
                    <p dir="ltr">MedArkive may, from time to time, expand or reduce our business and this may involve the sale and/or the transfer of control of all or part of MedArkive. Data provided by users will, where it is relevant to any part of our business so transferred, be transferred along with that part and the new owner or newly controlling party will, under the terms of this Policy, be permitted to use the data for the purposes for which it was originally supplied to us.<br /><br />In the event that any data submitted by users is to be transferred in such a manner, you will not be contacted in advance and informed of the changes.</p>
                    <ol start="11">
                        <li dir="ltr">
                            Cookies
                        </li>
                    </ol>
                    <p>This website may place and access certain cookies on your computer. MedArkive uses cookies to improve your experience of using the website and to improve our range of products and services. MedArkive has carefully chosen these cookies and has taken steps to ensure that your privacy is protected and respected at all times.<br /><br />All cookies used by this website are used in accordance with current English and EU cookie law.<br /><br />Before the website places any cookies on your computer, you will be presented with a message bar requesting your consent to set those cookies. By giving your consent to the placing of cookies you are enabling MedArkive to provide the best possible experience and service to you. You may, if you wish, deny consent to the placing of cookies; however certain features of the website may not function fully or as intended.<br /><br />This website uses analytics services provided by MedArkive. Website analytics refers to a set of tools used to collect and analyse usage statistics, enabling us to better understand how users use the website. This, in turn, enables us to improve the website and the products and services offered through it. You do not have to allow us to use these cookies, as detailed below, however, whilst our use of them does not pose any risk to your privacy or your safe use of the Website it does enable us to continually improve our business. Some services are only available via registration and if you choose not to register we may not be able to let you access some content. The reason for this can both be commercial interests from sponsors of content or in order to comply with local regulations such as The Physician Payments Sunshine Act in the USA.<br /><br />You can choose to enable or disable cookies in your internet browser. Most internet browsers also enable you to choose whether you wish to disable all cookies or only third party cookies. By default, most internet browsers accept cookies but this can be changed. For further details, please consult the help menu in your internet browser.<br /><br />You can choose to delete cookies at any time however you may lose any information that enables you to access the website more quickly and efficiently including, but not limited to, personalisation settings.<br /><br />It is recommended that you ensure that your internet browser is up-to-date and that you consult the help and guidance provided by the developer of your internet browser if you are unsure about adjusting your privacy settings.</p>
                    <ol start="12">
                        <li dir="ltr">
                            Changes to this Policy
                        </li>
                    </ol>
                    <p dir="ltr">MedArkive reserves the right to revise this Policy as we may deem necessary from time to time or as may be required by law. Any changes will be immediately posted on the website and you are deemed to have accepted the terms of the Policy on your first use of the website following the alterations.</p>
                </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Informed
