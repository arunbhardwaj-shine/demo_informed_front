import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Nav,
  Navbar,
  Row,
  Form,
  NavDropdown,
  Button,
  Modal,
  Col,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import { HomeValidation } from "../Validations/HomeValidations/HomeValidation";
import Slider from "react-slick";

const PublisherPage = () => {
  const sliderRef = useRef();
  const parentRef = useRef('');
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [userInputs, setUserInputs] = useState({});
  const [privacyshow, setPrivacyshow] = useState(false);
  const [videoPopupshow, setVideoPopupshow] = useState(false);

  const [contactError, setContactError] = useState(false);
  const [contactFormInputs, setContactFormInputs] = useState({});
  const [forceRender, setForceRender] = useState(false);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const handleChange = (e, isSelectedName) => {
    setUserInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!userInputs?.username && !userInputs?.password) {
      setShowError("Please enter a username and password");
    } else if (userInputs?.username === "") {
      setShowError("Please enter a username");
    } else if (userInputs?.password === "") {
      setShowError("Please enter a password");
    } else {
      setShowError(null);
      loader("show");
      try {
        const res = await postData(ENDPOINT.LOGIN, {
          email: userInputs?.username,
          password: userInputs?.password,
        });

        // localStorage.clear();
        clearLocalStorageExcept();
        localStorage.setItem("user_id", res?.data?.data?.userToken);
        localStorage.setItem("group_id", res?.data?.data?.groupId);
        localStorage.setItem("webinar_flag", res?.data?.data?.webinar_flag);
        localStorage.setItem("name", res?.data?.data?.name);
        localStorage.setItem("decrypted_token", res?.data?.data?.jwtToken);
        loader("hide");
        navigate("/home");
      } catch (err) {
        console.log(err);
        setShowError(err?.response?.data?.message);
        loader("hide");
      }
    }
  };
  useEffect(() => {
        if (!parentRef.current) {
            return;
        }

        parentRef.current.addEventListener("wheel", e => { 
            handleScroll(e)
        });
    }, [parentRef]);
        const handleScroll = e => {
        let sliderLength = sliderRef.current.props.children.length;

        var element = document.getElementsByClassName('slick-active')[0];
        var activeSlide = element.getAttribute('data-index'); 
       
      if (
             (e.deltaY < 0 && activeSlide == 0) ||
             (e.deltaY > 0 && activeSlide == sliderLength - 1)
        ) {
            return;
        }

        e.preventDefault();

        if (e.deltaY < 0) {
            let a= sliderRef.current.slickPrev();
        } else {
            let a= sliderRef.current.slickNext();
        }
    };
      const settings = ({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        centerMode: true,
        centerPadding: '10%',
    });
  const handleShow = (type) => {
    if (type == "forgot") {
      setShow(true);
    } else if (type == "video") {
      setVideoPopupshow(true);
    } else {
      setPrivacyshow(true);
    }
  };

  const handleClose = (type) => {
    if (type == "forgot") {
      setShow(false);
    } else if (type == "video") {
      setVideoPopupshow(false);
    } else {
      setPrivacyshow(false);
    }
  };

  const onSendEmail = async (event) => {
    event.preventDefault();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email.trim() === "") {
      setErrorMsg("Please enter your email.");
    } else if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
    } else {
      try {
        loader("show");
        const res = await postData(ENDPOINT.FORGET, {
          email: email,
        });
        loader("hide");
        setEmail("");
        setErrorMsg(null);
        setSuccessMsg(res?.data?.message);
        // setShow(false)
      } catch (err) {
        setSuccessMsg(null);
        setErrorMsg(err?.response?.data?.message);
        loader("hide");
      }
    }
  };
  const handleContactFormChange = (e, isSelectedName) => {
    setContactFormInputs({
      ...contactFormInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e.target?.files
          : e
        : e?.target?.value,
    });
  };

  // send contact infromation
  const sendContactInformation = async (event) => {
    event.preventDefault();
    const err = HomeValidation(contactFormInputs);
    if (Object.keys(err)?.length) {
      setContactError(err);
      return;
    } else {
      try {
        loader("show");
        const res = await postData(ENDPOINT.INFORMED_USER_FORM, {
          name: contactFormInputs?.name?.trim(),
          email: contactFormInputs?.email?.trim(),
          phone: contactFormInputs?.phone?.trim(),
          company: contactFormInputs?.company?.trim(),
        });

        let obj = {};
        loader("hide");
        setContactFormInputs(obj);
        setContactError(false);
        setForceRender(!forceRender);
      } catch (err) {
        console.log(err);
        loader("hide");
      }
    }
  };

  const clearLocalStorageExcept = () => {
    const keysToKeep = ['uname', 'pass', 'acceptedCookies']; 
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
      }
    }
  }

  return (
    <>
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>
      <div className="informed publisher">
        <Navbar expand="lg" className="informed-nav">
          <Container>
            <Navbar.Brand href="#home">
              <img src={path_image + "inforMed_Logo_Blue_1.svg"} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="informed-login" />
            <Navbar.Collapse id="informed-login">
              <Nav className="ms-auto justify-content-end">
                <Link to="/">Lifescience</Link>
                <Link to="/webinar">Webinar</Link>
                <Link to="/">Contact Us</Link>
                <NavDropdown title="Login">
                  <Form onSubmit={handleLogin}>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      className="form-field"
                      aria-label="Name"
                      name="username"
                      onChange={handleChange}
                    />
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="form-field"
                      aria-label="Password"
                      name="password"
                      onChange={handleChange}
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
        <section className="banner pulisher">
          <Container>
            <Row>
              <Col sm={5}>
                <div className="banner-content bnr-c2">
                  <h1>
                    Help your clients <span>get digital right</span>
                  </h1>
                  <h5 className="banner-content-context">
                    inforMed.pro hosting is built on the desire to say "YES" to
                    your clients. To help them learn what works and drive more
                    usage.
                  </h5>
                </div>
                <div className="banner-content-video">
                  <div
                    className="banner-content-video-popup"
                    onClick={(e) => handleShow("video")}
                    id="playVideo"
                  >
                    <img src={path_image + "jacob_popup.png"} alt="" />
                    <div className="video_popup_icon">
                      <img
                        src={path_image + "video-icon.png"}
                        alt=""
                        className="watch-demo"
                      />
                      <div className="hover-image">
                        <img src={path_image + "ePrint-24-March.gif"} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={7}>
                <div className="renderrr"></div>
                <div className="infographic2 text-right ">
                  <img src={path_image + "Publishers@2x.png"} alt="" />
                </div>
                <div className="dotted-line d-line2">
                  <img src={path_image + "bnr-2-line1.png"} alt="" />
                  <div className="dt-line d-left">
                    <span className="dt-line-dote">
                      <img
                        src={path_image + "p-dot1.png"}
                        className="text-right"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="path-section">
          <Container>
            <div className="dotted-line text-center path-line">
              <img src={path_image + "path-line.png"} alt="" />
            </div>
            <Row className="content-sec">
              <Col md={4}>
                <div className="content-part path-cont">
                  <h2>Publisher path</h2>
                  <h5>We secure ALL your content</h5>
                  <ul className="feature-list">
                    <li>
                      <img src={path_image + "list-icon1.png"} alt="" />
                      <p>Articles</p>
                    </li>
                    <li>
                      <img src={path_image + "list-icon2.png"} alt="" />
                      <p>Web pages</p>
                    </li>
                    <li>
                      <img src={path_image + "list-icon3.png"} alt="" />
                      <p>EBooks</p>
                    </li>
                    <li>
                      <img src={path_image + "list-icon4.png"} alt="" />
                      <p>CME/CPD</p>
                    </li>
                    <li>
                      <img src={path_image + "list-icon5.png"} alt="" />
                      <p>Video</p>
                    </li>
                    <li>
                      <img src={path_image + "list-icon6.png"} alt="" />
                      <p>Combinations</p>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={8} className="no-padding">
                <div className="path-features pull-right first_step_right">
                  <div className="path-fet-img">
                    <img src={path_image + "Group_1.png"} alt="" />
                    <div className="video_popup_icon">
                      {/* <a

                        href="https://docintel.app/Webinar/Docintel/login.php#Group_1"
                        target="_blank"
                        >  */}
                      <img
                        src={path_image + "video-icon.png"}
                        alt=""
                        id="Group_1"
                        className="watch-demo"
                      />
                      <div className="hover-image">
                        <img src={path_image + "ePrint-24-March.gif"} alt="" />
                      </div>
                      {/* </a> */}
                    </div>
                  </div>
                  <div className="path-fet-cont">
                    <p>
                      Take 5 minutes to upload and set the limitations of the
                      license deal agreed with your clients.
                    </p>
                    <ul className="space_path">
                      <li>Any content</li>
                      <li>Set compliance</li>
                      <li>Self manage</li>
                    </ul>
                  </div>
                </div>
                <div className="path-features pull-left left-space custom-alignn">
                  <div className="path-fet-img">
                    <img src={path_image + "Group_2.png"} alt="" />
                    <div className="video_popup_icon">
                      {/* <a
                        href="https://docintel.app/Webinar/Docintel/login.php#Group_2"
                        target="_blank"
                      > */}
                      <img
                        src={path_image + "video-icon.png"}
                        id="Group_2"
                        alt=""
                        className="watch-demo"
                      />
                      <div className="hover-image">
                        <img src={path_image + "Delivery-6-May.gif"} alt="" />
                      </div>
                      {/* </a> */}
                    </div>
                  </div>
                  <div className="path-fet-cont">
                    <p>
                      Your client can deliver it to doctors through Salesforce,
                      inforMedGO, QR codees, Docintel codes or any 3rd party
                      tool.
                    </p>
                    <ul className="space_path">
                      <li>Salesforce</li>
                      <li>Email</li>
                      <li>Websites</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={{ span: 11, offset: 1 }} className="publisher_feet-cont">
                <div className="path-features path-bottom-list p-f2">
                  <div className="path-fet-img">
                    <img src={path_image + "Group_3.png"} alt="" />
                    <div className="video_popup_icon">
                      {/* <a
                        href="https://docintel.app/Webinar/Docintel/login.php#Group_3"
                        target="_blank"
                      > */}
                      <img
                        src={path_image + "video-icon.png"}
                        id="Group_3"
                        alt=""
                        className="watch-demo"
                      />
                      <div className="hover-image">
                        <img src={path_image + "Docintel-GIF.gif"} alt="" />
                      </div>
                      {/* </a> */}
                    </div>
                  </div>
                  <div className="path-fet-cont">
                    <p>
                      Clinicians can read the content online from any browser
                      and offline in our Docintel apps.
                    </p>
                    <ul className="space_path">
                      <li>iOS, Android &amp; web</li>
                      <li>CPD log</li>
                      <li>Build a library</li>
                    </ul>
                  </div>
                </div>

                <div className="content-box p-f2">
                  <div className="content-box-inner c-box-2">
                    <h4>Publishers</h4>
                    <p>
                      Your client can see all the details of usage and RTR for
                      each reader in their own account.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={12} className="publisher_feet-cont-last-sec">
                <Col md={4} className="no-padding">
                  <Row>
                    <Col md={8}>
                      <div className="screenshot">
                        <div className="scr1">
                          <img src={path_image + "scr-1.png"} alt="" />
                        </div>
                        <div className="scr2">
                          <img src={path_image + "scr-2.png"} alt="" />
                        </div>
                        <div className="video_popup_icon">
                          <a
                            href="https://docintel.app/Webinar/Docintel/login.php#Group_4"
                            target="_blank"
                          >
                            <img
                              src={path_image + "video-icon.png"}
                              id="Group_4"
                              alt=""
                              className="watch-demo"
                            />
                            <div className="hover-image">
                              <img
                                src={path_image + "Analytics-10-June-GIF.gif"}
                                alt=""
                              />
                            </div>
                          </a>
                        </div>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="slide-content">
                        <ul>
                          <li>
                            <a href="#" className="prof_clr">
                              Profiles
                            </a>
                          </li>
                          <li>
                            <a href="#">Openings</a>
                          </li>
                          <li>
                            <a href="#">RTR</a>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Col>
              <Col md={12}>
                <div className="publisher-sec">
                  <div className="publisher-cont">
                    <p>
                      *We take GDPR &amp; data safety very seriously. It will
                      only be your client who sees which Clinicians read your
                      content.
                    </p>
                  </div>
                  <div className="publisher-text-box">
                    <div className="content-box-inner take_ttl_left">
                      <h4>Lifescience</h4>
                      <p>
                        Meanwhile you can track aggregated data for each eprints
                        and we email you an alert if limits are nearing.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="service-not-section">
          <Container>
            <Row>
              <Col md={2} className="service-not-section-left">
                <img
                  src={path_image + "md-icon2.png"}
                  width="166"
                  height="166"
                  alt=""
                />
              </Col>
              <Col md={10} className="service-not-section-right">
                <div className="not-artical">
                  <h5>
                    We are Software as a Service - note the word Service. We
                    pride ourselves on both industry-leading fast turn-around,
                    and even faster response times for queries and unusual
                    demands from your clients.
                  </h5>
                  <p>
                    In inforMed.pro we have decades of experience dealing with
                    the lifescience industry and medical publishing - to claim
                    we understand your needs is to put it mildly. This is why
                    some of our publishers trust us to deal directly with their
                    lifescience clients and help them improve and close deals;
                    which we see as a mutual benefit.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="team-section infomed-sec">
          <Container>
            <div className="dotted-line text-center info-line">
              <img
                src={path_image + "info-0line.png"}
                width="816"
                height="754"
                alt=""
              />
            </div>
            <Row className="content-sec">
              <Col sm={3} className="show-desktop">
                <ul className="library-list info-list">
                  <li>
                    <img src={path_image + "info-icon1.png"} alt="" />
                  </li>
                  <li>
                    <img src={path_image + "info-icon2-news.png"} alt="" />
                  </li>
                  <li>
                    <img src={path_image + "icon3-new.png"} alt="" />
                    <p>
                      Each Product Manager gets a unique Docintel Link so you
                      can see who reads and who doesn't.
                    </p>
                  </li>
                </ul>
              </Col>
              <Col sm={9} className="infomed-sec-innner">
                <Row>
                  <div className="col-sm-4 show-desktop">
                    <div className="build-content">
                      <p>
                        Build your mailing lists with a few clicks and select
                        the right articles for each person
                      </p>
                      <p className="b-top-space">
                        Email all the relevant articles to Product Managers
                        safely from Salesforece or other CRM.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6 ">
                    <div className="build-content info-med">
                      <h2>inforMed.pro Library</h2>
                      <h3>For Publishers</h3>
                      <p className="top-space">
                        See who spends more time reading and call and close the
                        deals for those who read instead of calling those who
                        haven’t yet looked.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="cercile-detail">
                      <h4 className="cercile-detail-heading">
                        Read-Through-Rate (RTR) defined
                      </h4>
                      <div className="cercile-content cr-1">
                        <h4>READ</h4>
                        <p>
                          Up to
                          <br />
                          100%
                        </p>
                      </div>
                      <div className="cercile-content cr-2">
                        <h4>BROWSING</h4>
                        <p>
                          Up to
                          <br />
                          60%
                        </p>
                      </div>
                      <div className="cercile-content cr-3">
                        <h4>NOT READ</h4>
                        <p>
                          Below
                          <br />
                          30%
                        </p>
                      </div>
                    </div>
                  </div>
                </Row>
                <Row className="mobile_visual" style={{ display: "none" }}>
                  <ul className="library-list info-list">
                    <li>
                      <img src={path_image + "info-icon1.png"} alt="" />
                      <p>
                        Build your mailing lists with a few clicks and select
                        the right articles for each person
                      </p>
                    </li>
                    <li>
                      <img src={path_image + "info-icon2-news.png"} alt="" />
                      <p>
                        Email all the relevant articles to Product Managers
                        safely from Salesforece or other CRM.
                      </p>
                    </li>
                    <li>
                      <img src={path_image + "icon3-new.png"} alt="" />
                      <p>
                        Each Product Manager gets a unique Docintel Link so you
                        can see who reads and who doesn't.
                      </p>
                    </li>
                  </ul>
                </Row>
                <Row>
                  <ul className="pub-list">
                    <li>
                      <img
                        src={path_image + "pub-icon1.png"}
                        width="200"
                        height="212"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        src={path_image + "pub-icon2.png"}
                        width="200"
                        height="212"
                        alt=""
                      />
                      <h4 className="r-cl-1">65% Read</h4>
                    </li>
                    <li>
                      <img
                        src={path_image + "pub-icon3.png"}
                        width="200"
                        height="212"
                        alt=""
                      />
                      <h4 className="r-cl-2">95% Read</h4>
                    </li>
                    <li>
                      <img
                        src={path_image + "pub-icon1.png"}
                        width="200"
                        height="212"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        className="li_last_ico"
                        src={path_image + "pub-icon1.png"}
                        width="200"
                        height="212"
                        alt=""
                      />
                    </li>
                  </ul>
                </Row>
              </Col>
              <Col md={6} className="no-padding upp_padd padd_none">
                <div className="text-right">
                  <img
                    src={path_image + "md-pc-new3.png"}
                    width="369"
                    height="314"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </Col>
              <Col md={6} className="upp_padd">
                <div className="publish-description">
                  <h4>
                    This is the tool we missed when we worked in publishing. Who
                    is not bored of calling and starting: “Did you read the
                    article I sent last week?”{" "}
                  </h4>
                  <p>
                    When instead you can start talking directly about page 5,
                    the graph, the abstract or any other thing you can see the
                    client has read.
                  </p>
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
                  <h3>
                    Digital not working <span>as good as it should?</span>
                  </h3>
                  <p>
                    Our approach is entirely modular. With decades of experience
                    in the industry we know that no two needs are the same.
                  </p>
                  <div className="mob-img">
                    <img
                      src={path_image + "contact-mobile.png"}
                      alt="img-here"
                      className="img-responsive"
                    />
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <div className="contact-right">
                  <h3>Contact inforMed.pro</h3>
                  <p className="msg_text">
                    Or send us a message and we'll be in touch
                  </p>
                  <Form
                    className="contact_inforMed"
                    onSubmit={sendContactInformation}
                  >
                    <Row className="mb-3">
                      <Col>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Your name"
                          className={
                            !contactError?.name
                              ? "form-field"
                              : "form-field error"
                          }
                          autoComplete="off"
                          aria-label="Your Name"
                          value={
                            contactFormInputs?.name
                              ? contactFormInputs?.name
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="email"
                          name="email"
                          className={
                            !contactError?.email
                              ? "form-field"
                              : "form-field error"
                          }
                          placeholder="Email"
                          autoComplete="off"
                          aria-label="Your Email"
                          value={
                            contactFormInputs?.email
                              ? contactFormInputs?.email
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="tel"
                          name="phone"
                          className={
                            !contactError?.phone
                              ? "form-field"
                              : "form-field error"
                          }
                          placeholder="Phone"
                          autoComplete="off"
                          aria-label="Your Phone"
                          value={
                            contactFormInputs?.phone
                              ? contactFormInputs?.phone
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          name="company"
                          className={
                            !contactError?.company
                              ? "form-field"
                              : "form-field error"
                          }
                          placeholder="Company"
                          autoComplete="off"
                          aria-label="Your Comapny"
                          value={
                            contactFormInputs?.company
                              ? contactFormInputs?.company
                              : ""
                          }
                          onChange={handleContactFormChange}
                        />
                      </Col>
                    </Row>
                    {/* {contactError && (
                      <p style={{ color: "red" }}>{contactError}</p>
                    )} */}
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
              <Col md={8}>
                <div className="article_bx green_back">
                  <div className="article_bx-upper">
                    <p>Blog</p>
                    <h2>
                      <a href="https://informed.pro/Pages/blog/1">
                        Our Manifesto
                      </a>
                    </h2>
                  </div>
                  <div className="article_bx-bottom">
                    <a
                      href="https://informed.pro/Pages/blog/1"
                      className="login"
                    >
                      READ
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="article_bx red_back">
                  <div className="article_bx-upper">
                    <p>Blog</p>
                    <h2>
                      <a href="https://informed.pro/Pages/blog/1">
                        Our Manifesto
                      </a>
                    </h2>
                  </div>
                  <div className="article_bx-bottom">
                    <a
                      href="https://informed.pro/Pages/blog/1"
                      className="login"
                    >
                      READ
                    </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>






        <footer>
          <p>
            Copyright 2023
            <a href="https://informed.pro/"> InforMed.Pro</a>. Read our{" "}
            <a href="javascript:;" onClick={(e) => handleShow("privacy")}>
              {" "}
              privacy policy
            </a>
            .
          </p>
        </footer>

        <Modal
          show={videoPopupshow}
          onHide={(e) => handleClose("video")}
          className="video_modal"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {/* <source id="mp4" className="videeo" src="https://docintel.s3-eu-west-1.amazonaws.com/video/1Bettereprints_25_March_latest.mp4" poster={path_image + "popup_poster.jpg"} data-show-captions="false" scrolling="no" frameborder="0" style={{position: "relative", width: "100%", objectFit:"cover"}} allowtransparency="true" webkitallowfullscreen="" allowfullscreen="" controls="" onpause="pauseVideo()" onplay="playVideo()"></source>
                <img src={path_image + "video-icon.png"} className="popup_play" alt="" style={{width:"65px"}}/> */}
            <ReactPlayer
              ref={playerRef}
              url={
                "https://docintel.s3-eu-west-1.amazonaws.com/video/1Bettereprints_25_March_latest.mp4"
              }
              controls={true}
              width="100%"
              height="100%"
              playing={true}
              muted={true}
              light={path_image + "popup_poster.jpg"}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={show}
          onHide={(e) => handleClose("forgot")}
          className="header-forgot"
        >
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
              <p>
                MedArkive is committed to protecting your personal information.
              </p>
              <p>
                This Policy explains what personal information MedArkive Ltd
                ("MedArkive", "we", "us", "our") collects from you through our
                platform, how we use the information and how we keep it secure.
              </p>
              <p>This statement applies to our website and apps.</p>
              <p>
                This policy applies as between you, the user of this website,
                and MedArkive the owner and provider of this website. Our
                Privacy Policy does not extend to any websites that can be
                accessed from our website including, but not limited to, any
                links we may provide on social media websites.
              </p>
              <ol start="1">
                <li dir="ltr">Data Protection Law</li>
              </ol>
              <p>
                MedArkive is committed to complying with the data protection
                law. We adhere to the law by ensuring that the data you provide
                us will be:
              </p>
              <ul>
                <li>Processed lawfully, fairly and in a transparent manner;</li>
                <li>
                  Collected for specific, explicit and legitimate purposes and
                  not further processed in a manner that is incompatible with
                  those purposes;
                </li>
                <li>
                  Adequate, relevant and limited to what is necessary for those
                  purposes;
                </li>
                <li>Accurate and, where necessary, kept up to date;</li>
                <li>
                  Kept in a form which permits identification of data subject
                  for no longer than is necessary for the purposes for which the
                  personal data is processed;
                </li>
                <li>
                  Processed in a manner that ensures appropriate security of the
                  personal data.
                </li>
              </ul>
              <ol start="2">
                <li dir="ltr">Collecting Personal Information</li>
              </ol>
              <p>
                MedArkive acts as the processor of the information you provide.
              </p>
              <p>
                We process the information for legitimate business purposes and
                to help our clients provide our users with tailored content
                aimed at improving their professional development and knowledge.
                <br />
                If you decide not to provide us with your personal data you may
                not be able to use some of our platform and/or services.
              </p>
              <ol start="3">
                <li dir="ltr">Data Collected</li>
              </ol>
              <p>The following data may be collected by MedArkive:</p>
              <ol start="a" className="list-ol">
                <li>name;</li>
                <li>date of birth;</li>
                <li>gender;</li>
                <li>job title;</li>
                <li>profession;</li>
                <li>
                  contact information such as email addresses and/or telephone
                  numbers;
                </li>
                <li>
                  demographic information such as post code, preferences and
                  interests;
                </li>
                <li>IP address (automatically collected);</li>
                <li>web browser type and version (automatically collected);</li>
                <li>operating system (automatically collected);</li>
                <li>
                  {" "}
                  a list of URLs starting with a referring site, your activity
                  on this Website, and the site you exit to (automatically
                  collected).
                </li>
              </ol>
              <br />
              <ol start="4">
                <li dir="ltr">How We Use Data</li>
              </ol>
              <p>
                MedArkive uses your personal information for the following
                reasons:
              </p>

              <ul>
                <li>
                  To operate effectively as a business and to perform essential
                  business operations, including providing products optimised
                  for medical professionals
                </li>
              </ul>

              <p dir="ltr">
                We are motivated to provide products which offer outstanding
                resources for medical professionals, including sponsored
                content. To enhance your enjoyment and productivity on our
                platform, we endeavour to identify and improve our services. To
                ensure your experience with our products is seamless, we
                continuously re-examine and iteratively optimise user journeys
                on our platform. We infer your location from your device IP
                address in order to geo restrict certain content on our platform
                and ensure smooth access for you without the need to re-login
                when avoidable, and aid content selection for sponsors of
                content. Product issues, identified by users and communicated
                through customer support, are effectively diagnosed and resolved
                using data collected from interactions on the platform.
                Decisions on product development and evaluations of product
                performance are based on aggregate analysis and business
                intelligence based on non-personal data.
                <br />
                All our clients and partners are required to take appropriate
                security measures to protect your personal data in line with
                national legislation and policies of the countries they reside
                in. No matter which country our clients reside in MedArkive will
                always treat personal data as a minimum with a level
                corresponding to the General Data Protection Regulation. This
                means that you will have the rights as set out in clause 5
                (below) and have the right to disclosure, erasure etc. from
                MedArkive's database.
                <br />
                Should you wish to exercise your right to be forgotten we will
                erase all data about you in both platforms and request the data
                controller to do the same. However, where consent was given we
                keep a record of this for disclosures under legal requirements,
                but we will delete all other data collected.
                <br />
                In addition to the specific disclosure of personal data set out
                in this section, we may disclose your personal data where such
                disclosure is necessary for compliance with a legal obligation
                to which we are subject, or in order to protect your vital
                interests or the vital interests of another natural person. We
                may also disclose your personal data where such disclosure is
                necessary for the establishment, exercise or defence of legal
                claims, whether in court proceedings or in an administrative or
                out-of-court procedure.
              </p>
              <ul>
                <li className="change_li">
                  To deliver communications of personal interest including
                  product and content releases, motivational prompts and in
                  response to product queries or support requests.
                </li>
              </ul>

              <p dir="ltr">
                Direct communications
                <br />
                Communications sent by MedArkive come in the form of emails to
                the email address provided by you during the registration
                process and through notifications delivered to your device.
                MedArkive may send you communications relating to new and
                existing product and content releases and updates. We send such
                communications so that you are aware of changes we are making to
                the content or features of our products, or new releases, which
                could affect the usefulness of our core services to you. You, of
                course, have the right to opt out of such email communication at
                any time by using the unsubscribe link, found at the bottom of
                every email.
                <br />
                Third party communications.
                <br />
                Our clients contact you in various ways and deliver content
                hosted by MedArkive. They will do this under their own set of
                regulations depending on your relationship with them, which will
                be independent from MedArkive. We may also from time to time
                push free sponsored content from our clients into your account.
                You can always delete content received in your account.
              </p>
              <ul>
                <li className="change_li">
                  To inform commercial partners and clients of engagement and
                  interactions on sponsored content hosted on our platform
                </li>
              </ul>
              <p dir="ltr">
                When you receive content hosted by MedArkive and sponsored by
                our clients, such as medical device companies and pharmaceutical
                companies, they are the data controllers. As data controllers
                they will have control over your private data which we will host
                in our inforMed.pro platform and what is done with the data is
                their decision.
                <br />
                The data controllers will have access to see your name, email,
                IP address, what you read and when, but they will never see your
                password. Each data controller will only see the data that is in
                relation to what each of them have sponsored. Only MedArkive and
                you can see all the content you have engaged with. You can find
                it in the reading list under your CPD Log in the apps. Should
                you contact us about your right to disclosure, erasure etc. we
                will delete what we can from our database and inform each data
                controller about your desire to be forgotten. We will inform you
                who has received any personal data about you so that you may
                contact them for further erasure.
                <br />
                <br />
                Our aim with processing your private data is to help our clients
                to identify better content that is more suited to help you in
                your professional capacity.
                <br />
                <br />
                To the extent that the legal basis for our processing of your
                personal information is consent, you have the right to withdraw
                that consent at any time by emailing dpo@medarkive.com.
                Withdrawal will not affect the lawfulness of processing before
                the withdrawal.
              </p>
              <ol start="5">
                <li dir="ltr">Accessing your personal data</li>
              </ol>

              <p>Under the data protection legislation you have:</p>
              <ul>
                <li>the right to be informed;</li>
                <li>the right to access;</li>
                <li>the right to rectification;</li>
                <li>the right to erasure;</li>
                <li>the right to restrict processing;</li>
                <li>the right to object; and</li>
                <li>
                  rights in relation to automated decision making and profiling.
                </li>
              </ul>

              <p dir="ltr">
                <span>
                  To learn more about your rights you should consult the data
                  protection legislation and the country guidance from the
                  relevant supervisory authority.
                  <br />
                  <br />
                  Upon written request to our data protection officer we will
                  provide you with information about what personal data we hold
                  about you. To be able to process your request we may ask you
                  to verify your identity or ask more information about your
                  request. Where we are legally permitted to do so, we may
                  decline your request but we will explain why if we do so.{" "}
                  <br />
                  <br /> You have the right to lodge a complaint with a
                  supervisory authority if you think that our processing of your
                  personal data infringes data protection laws.
                </span>
              </p>
              <ol start="6">
                <li dir="ltr">Data Retention</li>
              </ol>
              <p dir="ltr">
                <span>
                  MedArkive will retain personal data for as long as necessary
                  to fulfil our aim of improving content provided to you.
                </span>
              </p>
              <ol start="7">
                <li dir="ltr">Securing Your Information</li>
              </ol>

              <p dir="ltr">
                Data security is of great importance to MedArkive and to protect
                your data we have put in place suitable physical, electronic and
                managerial procedures to safeguard and secure data collected via
                our website and our apps.
                <br />
                Our main office is located in England, UK. We also have
                affiliate offices situated in the EU and in India. We are
                hosting all content and personal data on servers within the EU.
                Our clients are based all over the world. As such we may
                transfer data across the globe, but will always abide by English
                data protection legislation and as a minimum The General Data
                Protection Regulation.
              </p>
              <ol start="8">
                <li dir="ltr">Third Party Websites and Services</li>
              </ol>

              <p dir="ltr">
                MedArkive may, from time to time, employ the services of other
                parties for dealing with matters that may include, but are not
                limited to, delivery of sponsored items, search engine
                facilities, advertising and marketing. The providers of such
                services may have access to certain personal data provided by
                users of this website.
                <br />
                Any data used by such parties is used only to the extent
                required by them to perform the services that MedArkive
                requests. Any use for other purposes is strictly prohibited.
                Furthermore, any data that is processed by third parties shall
                be processed within the terms of this Policy and in accordance
                with the data protection legislation.
              </p>

              <ol start="9">
                <li dir="ltr">Links to Other Websites</li>
              </ol>
              <p dir="ltr">
                This website may, from time to time, provide links to other
                websites. MedArkive has no control over such websites and is in
                no way responsible for the content thereof. This Policy does not
                extend to your use of such websites. Users are advised to read
                the privacy policy or statement of other websites prior to using
                them.
              </p>

              <ol start="10">
                <li dir="ltr">Changes of Business Ownership and Control</li>
              </ol>
              <p dir="ltr">
                MedArkive may, from time to time, expand or reduce our business
                and this may involve the sale and/or the transfer of control of
                all or part of MedArkive. Data provided by users will, where it
                is relevant to any part of our business so transferred, be
                transferred along with that part and the new owner or newly
                controlling party will, under the terms of this Policy, be
                permitted to use the data for the purposes for which it was
                originally supplied to us.
                <br />
                <br />
                In the event that any data submitted by users is to be
                transferred in such a manner, you will not be contacted in
                advance and informed of the changes.
              </p>
              <ol start="11">
                <li dir="ltr">Cookies</li>
              </ol>
              <p>
                This website may place and access certain cookies on your
                computer. MedArkive uses cookies to improve your experience of
                using the website and to improve our range of products and
                services. MedArkive has carefully chosen these cookies and has
                taken steps to ensure that your privacy is protected and
                respected at all times.
                <br />
                <br />
                All cookies used by this website are used in accordance with
                current English and EU cookie law.
                <br />
                <br />
                Before the website places any cookies on your computer, you will
                be presented with a message bar requesting your consent to set
                those cookies. By giving your consent to the placing of cookies
                you are enabling MedArkive to provide the best possible
                experience and service to you. You may, if you wish, deny
                consent to the placing of cookies; however certain features of
                the website may not function fully or as intended.
                <br />
                <br />
                This website uses analytics services provided by MedArkive.
                Website analytics refers to a set of tools used to collect and
                analyse usage statistics, enabling us to better understand how
                users use the website. This, in turn, enables us to improve the
                website and the products and services offered through it. You do
                not have to allow us to use these cookies, as detailed below,
                however, whilst our use of them does not pose any risk to your
                privacy or your safe use of the Website it does enable us to
                continually improve our business. Some services are only
                available via registration and if you choose not to register we
                may not be able to let you access some content. The reason for
                this can both be commercial interests from sponsors of content
                or in order to comply with local regulations such as The
                Physician Payments Sunshine Act in the USA.
                <br />
                <br />
                You can choose to enable or disable cookies in your internet
                browser. Most internet browsers also enable you to choose
                whether you wish to disable all cookies or only third party
                cookies. By default, most internet browsers accept cookies but
                this can be changed. For further details, please consult the
                help menu in your internet browser.
                <br />
                <br />
                You can choose to delete cookies at any time however you may
                lose any information that enables you to access the website more
                quickly and efficiently including, but not limited to,
                personalisation settings.
                <br />
                <br />
                It is recommended that you ensure that your internet browser is
                up-to-date and that you consult the help and guidance provided
                by the developer of your internet browser if you are unsure
                about adjusting your privacy settings.
              </p>
              <ol start="12">
                <li dir="ltr">Changes to this Policy</li>
              </ol>
              <p dir="ltr">
                MedArkive reserves the right to revise this Policy as we may
                deem necessary from time to time or as may be required by law.
                Any changes will be immediately posted on the website and you
                are deemed to have accepted the terms of the Policy on your
                first use of the website following the alterations.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default PublisherPage;
