import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import Select from "react-select";

const Webinar = () => {
   const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [userInputs, setUserInputs] = useState({});
  const [userSignInInputs, setUserSignInInputs] = useState({});
  const [signInModal, setSignInModal] = useState(false);
  const [selctOptions, setSelectOptions] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ]);

  const handleChange = (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    setUserInputs({
      ...userInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("userInputs", userInputs);
  };

  const clickSignInButton = (e) => {
    e.preventDefault();
    setSignInModal(true);
  };

  const handleSignInChange = async (e, isSelectedName) => {
    if (e?.target?.files?.length < 1) {
      return;
    }
    setUserSignInInputs({
      ...userSignInInputs,
      [isSelectedName ? isSelectedName : e?.target?.name]: isSelectedName
        ? e?.target?.files
          ? e?.target?.files
          : e
        : e?.target?.value,
    });
  };
  const handleSignInSubmit = async () => {
    console.log("sign in inputs", userSignInInputs);
  };

  const handleClose = () => {
    setSignInModal(false);
  };

  useEffect(() => {}, []);
  return (
    <>
      <header className="header">
        <div className="custom-container">
          <div className="row">
            <nav className="navbar navbar-expand-md navbar-light navbar-dark">
              <a className="navbar-brand" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50.333"
                  height="50.322"
                  viewBox="0 0 50.333 50.322"
                >
                  <g
                    id="Group_121"
                    data-name="Group 121"
                    transform="translate(-949.788 -26.964)"
                  >
                    <g
                      id="Group_6"
                      data-name="Group 6"
                      transform="translate(939.85 17)"
                    >
                      <g
                        id="Group_5"
                        data-name="Group 5"
                        transform="translate(9.939 9.964)"
                      >
                        <path
                          id="Path_212"
                          data-name="Path 212"
                          d="M94.241,41.237l-.006,0A25.174,25.174,0,1,0,68.7,66.356v.008h.182c.127,0,.253,0,.379,0H94.241Z"
                          transform="translate(-43.907 -16.044)"
                          fill="#fff"
                        />
                        <path
                          id="Path_213"
                          data-name="Path 213"
                          d="M89.736,60.758a16.572,16.572,0,0,1-10.909,5.249,2.3,2.3,0,0,1-1.838-.708l-.009-.009a7.359,7.359,0,0,1-1.052-8.773l2.43,1.651-1.543-7.615-7.089,1.871,2.353,1.493a11.817,11.817,0,0,0-1.661,6.97A11.6,11.6,0,0,0,71.464,64.9,16.651,16.651,0,0,1,62.332,42.72a2.923,2.923,0,0,1,1.97-1.647,7.359,7.359,0,0,1,8.123,3.476l-2.645,1.278L77.148,48.3l1.924-7.075L76.6,42.515a11.715,11.715,0,0,0-9.478-6.047A16.635,16.635,0,0,1,91.207,39.9a2.661,2.661,0,0,1,.371,2.282l0,.015a7.406,7.406,0,0,1-7.068,5.3h0l.215-2.929-5.824,5.145,5.165,5.2.116-2.784a11.712,11.712,0,0,0,9.863-5.022,16.821,16.821,0,0,1,.16,2.311,16.576,16.576,0,0,1-4.462,11.337M77.563,28.952A20.448,20.448,0,1,0,98.01,49.4,20.448,20.448,0,0,0,77.563,28.952"
                          transform="translate(-52.287 -24.234)"
                          fill="#0066be"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbarsExampleDefault"
              >
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarsExampleDefault"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#building-section">
                      Relationships <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#feature">
                      Features
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#testimonial">
                      Testimonial
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#cases">
                      Cases
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#request_demo">
                      Request Demo
                    </a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Button
                      className="sign"
                      data-toggle="modal"
                      data-target="#myModal"
                      onClick={clickSignInButton}
                    >
                      Sign in
                      <img src={path_image + "signin.svg"} alt="" />
                    </Button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
      {/* ---------------header section ends here------------- */}
      {/* ---------------banner section start here------------- */}
      <div className="fixed_div"></div>
      <section
        className="banner-section"
        idd="11"
        id="banner-section"
        data-anchor="banner-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 left-sec">
              <div className="content">
                <ul>
                  <li>Docintel</li>
                  <li>Webinars</li>
                </ul>
                <h1>Building long term relationships with HCP’s</h1>
              </div>
            </div>
            <div className="col-md-6 right-sec">
              <div className="right-banner">
                <img src={path_image + "banner-main.png"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="know-how-link">
        <div className="container">
          <div className="row">
            <div className="want-more" id="scroll-img">
              <a href="#building-section">Want to know how?</a>
            </div>
          </div>
        </div>
      </div>
      {/* <!---------------banner section ends here--------------> */}

      {/* <!------------------scroll-sec-----------------> */}
      <div className="scroll-sec demo" id="section07" data-anchor="section07">
        <a href="#building-section" id="scroll-img">
          <img src={path_image +"scroll-down.png"} alt="" width="25px" />
        </a>
        <div className="animated-arrow">
          <a href="#building-section">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </div>
      {/* <section id="section07" className="demo">
  <a href="#section08"><span></span><span></span><span></span>Scroll</a>
</section>  */}
      {/* <!------------------scroll-sec ends here------------------> */}

      {/* <!---------------building-real section start here--------------> */}

      <section
        className="building-section common"
        idd="22"
        id="building-section"
        data-anchor="building-section"
      >
        <div className="container">
          <h2>Building Relationships</h2>
          <div className="row">
            <div className="col-md-5 left-sec">
              <div className="content">
                <div className="video-sec">
                  <img src={path_image +"jdflindtWebinar.png"} alt="video" />
                </div>
                <p>
                  We believe that consented, databased relationships last
                  longer.
                </p>
                <p>
                  Our platform helps deliver more engaging webinars that become
                  an integral part of your marketing campaign.
                </p>
                <p>
                  It places webinars within the strategy of building an on-going
                  dialogue; continually learning what each Health Care
                  Professional (HCP) wants.
                </p>
                <span className="name">
                  <i>Jacob Flindt</i>
                </span>
                <span className="degntn">CEO</span>
              </div>
              {/* <!-- <div className="want-more"><a href="#">Want to know how?</a></div> --> */}
            </div>
            <div className="col-md-7 right-sec">
              <div className="mt-5 mb-5">
                <div className="row">
                  <div className="col-md-12 space-left">
                    <ul className="timeline">
                      <li>
                        <span>
                          <img src={path_image + "build1.png"} alt="" />
                        </span>
                        <p className="float-right">Capture consent</p>
                      </li>
                      <li>
                        <span>
                          <img src={path_image + "build2.png"} alt="" />
                        </span>
                        <p className="float-right">
                          Engage HCP’s with speakers at Webinars
                        </p>
                      </li>
                      <li>
                        <span>
                          <img src={path_image + "build3.png"} alt="" />
                        </span>
                        <p className="float-right">
                          Analyse HCP Webinar behaviour using our bespoke system
                        </p>
                      </li>
                      <li>
                        <span>
                          <img src={path_image + "build4.png"} alt="" />
                        </span>
                        <p className="float-right">
                          Our system creates automatic segmentation and emailing
                        </p>
                      </li>
                      <li>
                        <span>
                          <img src={path_image + "build5.png"} alt="" />
                        </span>
                        <p className="float-right">
                          HCP’s can download Docintel app to watch previous
                          webinars
                        </p>
                      </li>
                      <li>
                        <span>
                          <img src={path_image + "build6.png"} alt="" />
                        </span>
                        <p className="float-right">
                          Personalise future invites and interactions based on
                          RWE actions.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!---------------building-real section Ends here--------------> */}

      {/* <!---------------platform feature section star here-----------> */}
      <section
        className="tech-section why-choose-section system-section common"
        idd="33"
        id="feature"
        data-anchor="feature"
      >
        <div className="container">
          <div className="row">
            {/* <!-- <div className="why-heading m-100 pl-3">
  
  </div> --> */}

            <div className="col-md-12 d-flex justify-content-between">
              <h2 data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">Platform Features</h2>
              <a href="https://docintel.app/Webinar/Docintel/login.php" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000" className="btnn">Request Demo</a>
            </div>
          </div>
        </div>
        <div className="cycle-slide">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  id="blogCarousel"
                  className="carousel slide row "
                  data-ride="carousel"
                >
                  <div className="col-md-8 col-sm-8 col-8 cst-cs-item pl-0">
                    {/* <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          src={path_image + "slide1.png"}
                          className="img-fluid"
                          alt=""
                        />
                        <div className="div-left-text caption-crausal">
                          <div
                            className="caption-crausal-inside collapse show"
                            id="slide_content"
                          >
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Your choice of streaming technology
                            </p>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Automated interactions
                              <ul>
                                <li>Calendar invites</li>
                                <li>Auto mail reminders</li>
                                <li>Single Sign-in (SSi) to webinars</li>
                              </ul>
                            </p>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Compliance simplified
                              <ul>
                                <li>You control who has access</li>
                                <li>
                                  Pre- registration set to custom regulation
                                </li>
                                <li>GDPR/CCPA compliant </li>
                              </ul>
                            </p>
                          </div>
                          <div className="caption-crausal-footer">
                            <button
                              className="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#slide_content"
                            >
                              <img src={path_image + "down-arrow.png"} alt="" />
                            </button>
                            <div className="watch-demo-img">
                              <button
                                type="submit"
                                className="btn btn-default watch-demo"
                                data-toggle="modal"
                                data-target="#video1"
                              >
                                Watch Video
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <img
                          src={path_image + "slide2.png"}
                          className="img-fluid"
                          alt=""
                        />
                        <div className="div-left-text caption-crausal">
                          <div
                            className="caption-crausal-inside collapse show"
                            id="slide_content_two"
                          >
                            <div className="caption-crausal-inside-top">
                              <span>1 WEEK</span>
                              <p>Setup Time</p>
                            </div>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Set up your URL and bespoke branding
                            </p>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Build email templates, AutoMails and calendar
                              reminders
                            </p>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Invite your audience your way or through us
                            </p>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Gain consent to stay in touch post webinar.
                            </p>
                          </div>
                          <div className="caption-crausal-footer">
                            <button
                              className="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#slide_content_two"
                            >
                              <img src={path_image + "down-arrow.png"} alt="" />
                            </button>
                            <div className="watch-demo-img">
                              <button
                                type="submit"
                                className="btn btn-default watch-demo"
                                data-toggle="modal"
                                data-target="#video1"
                              >
                                Watch Video
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img
                          src={path_image + "slide1.png"}
                          className="img-fluid"
                          alt=""
                        />
                        <div className="div-left-text caption-crausal">
                          <div
                            className="caption-crausal-inside  collapse show"
                            id="slide-content3"
                          >
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Interactive: encouraging active participation
                              <ul>
                                <li>Live video questions</li>
                                <li>Written questions (pre-screen option)</li>
                                <li>On screen polls</li>
                              </ul>
                            </p>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              Monitor your audience
                              <ul>
                                <li>Remove unwanted guests</li>
                                <li>Learn who stays</li>
                              </ul>
                            </p>
                          </div>
                          <div className="caption-crausal-footer">
                            <button
                              className="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#slide-content3"
                            >
                              <img src={path_image + "down-arrow.png"} alt="" />
                            </button>
                            <div className="watch-demo-img">
                              <button
                                type="submit"
                                className="btn btn-default watch-demo"
                                data-toggle="modal"
                                data-target="#video1"
                              >
                                Watch Video
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img
                          src={path_image + "slide2.png"}
                          className="img-fluid"
                          alt=""
                        />
                        <div className="div-left-text caption-crausal">
                          <div
                            className="caption-crausal-inside collapse show"
                            id="slide-content4"
                          >
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              The Host
                              <ul>
                                <li>Analysis of engagement</li>
                                <li>Automatic behaviour segmentation</li>
                                <li>Personalised follow up emails</li>
                                <li>Award CPD/CME credit (optional)</li>
                              </ul>
                            </p>
                            <p>
                              <span className="caption-img">
                                <img
                                  src={path_image + "slider-over-img.png"}
                                  alt="sdlc-icon"
                                />
                              </span>
                              The HCP
                              <ul>
                                <li>Receive video and slides from webinar</li>
                                <li>View past webinars in portal</li>
                                <li>
                                  Download the DocIntel app to build personal
                                  libraries on and offline
                                </li>
                              </ul>
                            </p>
                          </div>
                          <div className="caption-crausal-footer">
                            <button
                              className="btn btn-link"
                              type="button"
                              data-toggle="collapse"
                              data-target="#slide-content4"
                            >
                              <img src={path_image + "down-arrow.png"} alt="" />
                            </button>
                            <div className="watch-demo-img">
                              <button
                                type="submit"
                                className="btn btn-default watch-demo"
                                data-toggle="modal"
                                data-target="#video1"
                              >
                                Watch Video
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div id="slider">
                                 <input type="radio" className="slide-radio" name="slide-radio" id="s1" value="1" />
                                 <input type="radio" className="slide-radio" name="slide-radio" id="s2" value="2"/>
                                 <input type="radio" className="slide-radio" name="slide-radio" id="s3" checked value="3" />
                                 {/* <input type="radio" className="slide-radio" name="slide-radio" id="s4" checked value="4"> */}
                                 <label for="s1" id="slide1">
                                    <img src={path_image + "post-webinar.png"} className="img-fluid" alt=""/>
                                    <div className="div-left-text caption-crausal">
                                       <div className="caption-crausal-inside collapse show" id="slide_content">
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Your choice of streaming technology
                                          </p>
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Automated interactions
                                          <ul>
                                             <li>Calendar invites</li>
                                             <li>Auto mail reminders</li>
                                             <li>Single Sign-in (SSi) to webinars</li>
                                          </ul>
                                          </p>
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Compliance simplified
                                          <ul>
                                             <li>You control who has access</li>
                                             <li>Pre- registration set to custom regulation</li>
                                             <li>GDPR/CCPA compliant </li>
                                          </ul>
                                          </p>
                                       </div>
                                       <div className="caption-crausal-footer">
                                          <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#slide_content">
                                          <img src={path_image + "down-arrow1.png"} alt=""/>
                                          </button>
                                          <div className="watch-demo-video">
                                              <a className="watch-demo" data-toggle="modal" data-target="#video1">Watch Video</a>
                                          </div>
                                       </div>
                                    </div>
                                 </label>
                                 <label for="s2" id="slide2">
                                    <img src={path_image + "audience-engagement.png"} className="img-fluid" alt=""/>
                                    <div className="div-left-text caption-crausal">
                                       <div className="caption-crausal-inside collapse show" id="slide_content_two">

                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Set up your URL and bespoke branding
                                          </p>
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Build email templates, AutoMails and calendar reminders
                                          </p>
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Invite your audience your way or through us
                                          </p>
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Gain consent to stay in touch post webinar.
                                          </p>
                                       </div>
                                       <div className="caption-crausal-footer">
                                          <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#slide_content_two">
                                          <img src={path_image + "down-arrow1.png"} alt=""/>
                                          </button>
                                          <div className="watch-demo-video">
                                              <a className="watch-demo" data-toggle="modal" data-target="#video1">Watch Video</a>

                                          </div>
                                       </div>
                                    </div>
                                 </label>
                                 <label for="s3" id="slide3" className="active">
                                    <img src={path_image + "pre-webinar.png"} className="img-fluid active" alt=""/>
                                    <div className="div-left-text caption-crausal">
                                       <div className="caption-crausal-inside collapse show" id="slide-content3">
                                       <div className="caption-crausal-inside-top">
                                             <span>1 WEEK</span>
                                             <p>Setup Time</p>
                                          </div>
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Interactive: encouraging active participation
                                          <ul>
                                             <li>Live video questions</li>
                                             <li>Written questions (pre-screen option)</li>
                                             <li>On screen polls</li>
                                          </ul>
                                          </p>
                                          <p>
                                             <span className="caption-img">
                                             <img src={path_image + "slider-over-img.png"} alt="sdlc-icon"/>
                                             </span>
                                             Monitor your audience
                                          <ul>
                                             <li>Remove unwanted guests</li>
                                             <li>Learn who stays</li>
                                          </ul>
                                          </p>
                                       </div>
                                       <div className="caption-crausal-footer">
                                          <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#slide-content3">
                                          <img src={path_image + "down-arrow1.png"} alt=""/>
                                          </button>
                                          <div className="watch-demo-video">
                                             <a className="watch-demo" data-toggle="modal" data-target="#video1">Watch Video</a>
                                          </div>
                                       </div>
                                    </div>
                                 </label>
                                </div>
                  </div>
                  <div className="col-md-4 col-sm-4 col-4 left-sdd">
                    <ol className="carousel-indicators cst-tab">
                      <li
                        data-target="#blogCarousel"
                        data-slide-to="0"
                        className="active"
                      >
                        <img
                          className="without-active"
                          src={path_image + "feature-active1.png"}
                          alt=""
                        />
                        <img
                          className="with-active"
                          src={path_image + "feature1.png"}
                          alt=""
                        />
                        Tech Made easy <span>Our System</span>
                      </li>
                      <li
                        data-target="#blogCarousel"
                        data-slide-to="1"
                        className=""
                      >
                        <img
                          className="without-active"
                          src={path_image + "feature2.png"}
                          alt=""
                        />
                        <img
                          className="with-active"
                          src={path_image + "feature-active2.png"}
                          alt=""
                        />
                        Getting Started <span>Pre-Webinar</span>
                      </li>
                      <li
                        data-target="#blogCarousel"
                        data-slide-to="2"
                        className=""
                      >
                        <img
                          className="without-active"
                          src={path_image + "feature3.png"}
                          alt=""
                        />
                        <img
                          className="with-active"
                          src={path_image + "feature-active3.png"}
                          alt=""
                        />
                        Audience Engagement <span>Webinar</span>
                      </li>
                      <li
                        data-target="#blogCarousel"
                        data-slide-to="3"
                        className=""
                      >
                        <img
                          className="without-active"
                          src={path_image + "feature4.png"}
                          alt=""
                        />
                        <img
                          className="with-active"
                          src={path_image + "feature-active4.png"}
                          alt=""
                        />
                        Relationship Building <span>Post-Webinar</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!---------------platform feature section ends here-------------> */}

      {/* <!--------------effective webinar section start here--------------> */}
      <section
        className="effective-section common"
        idd="44"
        id="testimonial"
        data-anchor="testimoniial"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>effective webinars</h2>
            </div>
            <div className="col-md-8">
              <ul className="efft-list">
                <li>
                  <span>
                    <img src={path_image + "effect1.png"} alt="" />
                  </span>
                  <p>Gathering HCP's together</p>
                </li>
                <li>
                  <span>
                    <img src={path_image + "effect3.png"} alt="" />
                  </span>
                  <p>Sharing new information and the latest learnings</p>
                </li>
                <li>
                  <span>
                    <img src={path_image + "effect2.png"} alt="" />
                  </span>
                  <p>Seeking feedback from HCP's</p>
                </li>
                <li>
                  <span>
                    <img src={path_image + "effect4.png"} alt="" />
                  </span>
                  <p>Debating Issues</p>
                </li>
              </ul>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-12">
              <a href="#" className="btnn">
                find out more
              </a>
            </div>
          </div>
        </div>

        <div className="teamm">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="team-outer text-center">
                  <h3>
                    " The Docintel Team is a delight to work with. They are
                    innovative and enjoy a challenge. The webinar platform is
                    user friendly and created for seamless ease of use."
                  </h3>
                  <span>Jacqui McAllister</span>
                  <span>Project Manager, Octapharma South Africa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--------------effective webinar section start here--------------> */}

      {/* <!--------------case example section start here-----------------> */}
      <section
        className="case-exple common"
        idd="55"
        id="cases"
        data-anchor="cases"
      >
        <div className="custom-container">
          <div className="row">
            <div className="col-md-12 blue-br">
              <h3>Case Examples</h3>
              <div class="map_buttons">
                <ul>
                    <li><a class="map-button active" href="javascript:void(0)" id="mapButton">Single</a></li>
                    <li><a class="map-button" href="javascript:void(0)" id="compareButton">Compare</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="map-outer">
        <div className="custom-container">
          <div class="row">
                  <div id="chartdiv"></div>
                  <div class="horizon-arrows">
                  <div class="horizon horizon-prev">
                      <img src="<?php echo INFORMEDPROURL ?>img/webinar/left-arrow-line-symbol.png" />
                    </div>
                    <div class="horizon horizon-next show-next">
                      <img src="<?php echo INFORMEDPROURL ?>img/webinar/right-arrow-angle.png" />
                    </div>
                    </div>
               </div>
        </div>
      </section>
      {/* <!--------------case example section ends here------------------> */}

      <section className="blank-space">
        <div className="blank-background"></div>
      </section>
       <section class="common" idd="66" id="request_demo" data-anchor="section6">
            <div class="request_demo_main">
               <div class="container">
                  <div class="row">
                     <div class="demo-video-form">
                  <form class="form-horizontal" >
                           <h2>Get a FREE walkthrough</h2>
                           <p>Need further information?<br/>Receive a walkthrough from a dedicated member of our team</p>
                           <div class="form-left-fields">
                              <div class="form-group">
                                 <input type="text" id="name" class="contact-field" placeholder="Name" />
                              </div>
                              <div class="form-group">
                                 <input type="email" id="email" class="contact-field" placeholder="Email" />
                              </div>
                              <div class="form-group">
                                 <input type="number" id="phone" class="contact-field" placeholder="Contact Number" />
                              </div>
                              <div class="form-group">
                                 <input type="text" id="company" class="contact-field" placeholder="Company"/>
                              </div>
                              <div class="form-group select-option input-group">
                                 <select class="form-control contact-field" id="country">
                                    <option value="">Select Country</option>

                                 </select>
                              </div>
                           </div>
                           <div class="form-right-fields">
                              <div class="form-group input-group">
                                 <textarea class="form-control" rows="8" id="comment" placeholder="Comments"></textarea>
                              </div>
                           </div>
                           <img src="<?php INFORMEDPROURL;?>img/loader.gif" width="50" id="contact-form-loader" style={{display:"none"}}/>
                           <button type="button" id="contact-button" onclick="submitContactForm()" class="btn btn-default requst-demo">Request Demo</button>
                           <p class="alert alert-success" style={{display:"none",marginTop:"15px"}} id="contact-success-msg"> Thank you for contacting us. We will get back to you shortly. </p>
                            <p class="alert alert-danger" style={{display:"none",marginTop:"15px"}} id="contact-error-msg">  </p>
                        </form>
                      </div>
                  </div>
                </div>
            </div>
        </section>
      <footer
        className="common"
        idd="66"
        id="request_demo"
        data-anchor="section6"
      >
        <div className="copyright">
          <ul>
            <li>&copy; 2020 DocIntel</li>
            <li>
              <a href="javascript:void(0)">Terms and Conditions</a>
            </li>
            <li>
              <a href="javascript:void(0)">Privacy Policy</a>
            </li>
            
          </ul>
        </div>
      </footer>
      <div className="scroll-top">
        <a href="javascript:void(0);" id="myBtn" onClick="topFunction()">
          <img src={path_image + "scroll-top.png"} alt="top-scroll" />
        </a>
      </div>

      <div
        id="pp-nav"
        className="right white right-boxed hidden-xs"
        style={{ color: " rgb(0, 0, 0)", margintop: 161 }}
      >
        <ul>
          <li data-scroll="banner-section">
            <a href="#banner-section" className="page-scroll act11 active">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="building-section">
            <a href="#building-section" className="page-scroll act22">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="feature">
            <a href="#feature" className="page-scroll act33">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="testimonial">
            <a href="#testimonial" className="page-scroll act44">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="cases">
            <a href="#cases" className="page-scroll act55">
              <span style={{}}></span>
            </a>
          </li>
          <li data-scroll="request_demo">
            <a href="#request_demo" className="page-scroll act66">
              <span style={{}}></span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Webinar;
