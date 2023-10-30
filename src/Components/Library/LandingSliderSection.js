import React, { useEffect, useRef } from "react";
import Slider from "react-slick";

const LandingConsentSection = () => {
  const sliderRef = useRef();
  const parentRef = useRef("");
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  useEffect(() => {
    if (!parentRef.current) {
      return;
    }

    parentRef.current.addEventListener("wheel", (e) => {
      handleScroll(e);
    });
  }, [parentRef]);
  const handleScroll = (e) => {
    let sliderLength = sliderRef.current.props.children.length;

    var element = document.getElementsByClassName("slick-active")[0];
    var activeSlide = element.getAttribute("data-index");

    if (
      (e.deltaY < 0 && activeSlide == 0) ||
      (e.deltaY > 0 && activeSlide == sliderLength - 1)
    ) {
      return;
    }

    e.preventDefault();

    if (e.deltaY < 0) {
      let a = sliderRef.current.slickPrev();
    } else {
      let a = sliderRef.current.slickNext();
    }
  };
  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: "0%",
    fade: false,
    speed: 100,
    responsive: [
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true
          }
        }
      ]
  };
  return (
    <>
      <div className="pharma-slide">
        <div className="pharma-slider">
          <div className="slider" ref={parentRef}>
            <div className="add-space top"></div>
            <Slider {...settings} ref={sliderRef}>
              <div className="slider-in">
                <div className="slider-in-views">
                  <img src={path_image + "informed-logo-slide.svg"} alt="" />
                  <div className="slider-bg-icons">
                    <img
                      src={path_image + "ellipse-bg1.png"}
                      alt=""
                      className="slide-ellipse1"
                    />
                    <img
                      src={path_image + "ellipse-bg2.png"}
                      alt=""
                      className="slide-ellipse2"
                    />
                    <img
                      src={path_image + "ellipse-bg3.png"}
                      alt=""
                      className="slide-ellipse3"
                    />
                    <img
                      src={path_image + "ellipse-bg4.png"}
                      alt=""
                      className="slide-ellipse4"
                    />
                    <img
                      src={path_image + "ellipse-bg5.png"}
                      alt=""
                      className="slide-ellipse5"
                    />
                    <img
                      src={path_image + "ellipse-bg6.png"}
                      alt=""
                      className="slide-ellipse6"
                    />
                  </div>
                </div>
              </div>
              <div className="slider-in">
                <div className="slider-in-view slide1">
                  <div className="slide-left-sided d-flex align-items-start">
                    <img src={path_image + "arrow-slide1.png"} alt="" />
                  </div>
                  <div className="slide-right-sided">
                    <div className="slide-right-content">
                      <span className="add-shadow"><img src={path_image + "logo-shape1.png"} alt="" /></span>
                      <h3>Content</h3>
                      <h5>
                        Create a library of all your content and easily
                        distribute it. We collect deep data, tracking what HCPs
                        have opened, what pages they’ve read and how much time
                        they’ve spent on them.
                      </h5>
                    </div>
                  </div>
                  <div className="slider-bg-icons">
                    <img
                      src={path_image + "ellipse-bg1.png"}
                      alt=""
                      className="slide-ellipse1"
                    />
                    <img
                      src={path_image + "ellipse-bg2.png"}
                      alt=""
                      className="slide-ellipse2"
                    />
                    <img
                      src={path_image + "ellipse-bg3.png"}
                      alt=""
                      className="slide-ellipse3"
                    />
                    <img
                      src={path_image + "ellipse-bg4.png"}
                      alt=""
                      className="slide-ellipse4"
                    />
                    <img
                      src={path_image + "ellipse-bg5.png"}
                      alt=""
                      className="slide-ellipse5"
                    />
                    <img
                      src={path_image + "ellipse-bg6.png"}
                      alt=""
                      className="slide-ellipse6"
                    />
                  </div>
                </div>
              </div>
              <div className="slider-in">
                <div className="slider-in-view slide2">
                  <div className="slide-right-sided">
                    <div className="slide-right-content">
                      <span className="add-shadow"><img src={path_image + "logo-shape2.png"} alt="" /></span>
                      <h3>Consent</h3>
                      <h5>
                        We’ve proven time and time again that HCPs give their
                        consent and in return you equip them with content you
                        can be confident they’ll love. Crucially, you’ll be able
                        to observe the way they’re using your content.
                      </h5>
                    </div>
                  </div>
                  <div className="slide-left-sided">
                    <img src={path_image + "arrow-slide2.png"} alt="" />
                  </div>
                  <div className="slider-bg-icons">
                    <img
                      src={path_image + "ellipse-bg1.png"}
                      alt=""
                      className="slide-ellipse1"
                    />
                    <img
                      src={path_image + "ellipse-bg2.png"}
                      alt=""
                      className="slide-ellipse2"
                    />
                    <img
                      src={path_image + "ellipse-bg3.png"}
                      alt=""
                      className="slide-ellipse3"
                    />
                    <img
                      src={path_image + "ellipse-bg4.png"}
                      alt=""
                      className="slide-ellipse4"
                    />
                    <img
                      src={path_image + "ellipse-bg5.png"}
                      alt=""
                      className="slide-ellipse5"
                    />
                    <img
                      src={path_image + "ellipse-bg6.png"}
                      alt=""
                      className="slide-ellipse6"
                    />
                  </div>
                </div>
              </div>
              <div className="slider-in">
                <div className="slider-in-view slide3">
                  <div className="slide-left-sided">
                    <img src={path_image + "arrow-slide2.png"} alt="" />
                  </div>
                  <div className="slide-right-sided">
                    <div className="slide-right-content">
                      <span className="add-shadow"><img src={path_image + "logo-shape3.png"} alt="" /></span>
                      <h3>Delivery</h3>
                      <h5>
                        Make{" "}
                        <strong>
                          <i>push & pull, delivery & availability</i>
                        </strong>{" "}
                        the standard for educating your HCPs. With a broad range
                        of modules for every situation we ensure each HCP get
                        what they need. And with AI recommendations we can help
                        you optimise personalised delivery engagement.{" "}
                      </h5>
                    </div>
                  </div>
                  <div className="slider-bg-icons">
                    <img
                      src={path_image + "ellipse-bg1.png"}
                      alt=""
                      className="slide-ellipse1"
                    />
                    <img
                      src={path_image + "ellipse-bg2.png"}
                      alt=""
                      className="slide-ellipse2"
                    />
                    <img
                      src={path_image + "ellipse-bg3.png"}
                      alt=""
                      className="slide-ellipse3"
                    />
                    <img
                      src={path_image + "ellipse-bg4.png"}
                      alt=""
                      className="slide-ellipse4"
                    />
                    <img
                      src={path_image + "ellipse-bg5.png"}
                      alt=""
                      className="slide-ellipse5"
                    />
                    <img
                      src={path_image + "ellipse-bg6.png"}
                      alt=""
                      className="slide-ellipse6"
                    />
                  </div>
                </div>
              </div>
              <div className="slider-in">
                <div className="slider-in-view slide4">
                  <div className="slide-right-sided">
                    <div className="slide-right-content">
                      <h3>Personalisation</h3>
                      <h5>
                        Mass communication that feels personal for each HCP?
                        That’s the promise marketing has been waiting for.
                      </h5>

                      <h5>
                        Our proprietary AI can recommend content likely to
                        interest each HCP based on their engagement history,
                        saving you valuable time and effort. This becomes even
                        more powerful when combined with other modules that can
                        automate content delivery.
                      </h5>
                    </div>
                  </div>
                  <div className="slide-left-sided">
                    <img src={path_image + "informed-logo-slide.svg"} alt="" />
                  </div>
                  <div className="slider-bg-icons">
                    <img
                      src={path_image + "ellipse-bg1.png"}
                      alt=""
                      className="slide-ellipse1"
                    />
                    <img
                      src={path_image + "ellipse-bg2.png"}
                      alt=""
                      className="slide-ellipse2"
                    />
                    <img
                      src={path_image + "ellipse-bg3.png"}
                      alt=""
                      className="slide-ellipse3"
                    />
                    <img
                      src={path_image + "ellipse-bg4.png"}
                      alt=""
                      className="slide-ellipse4"
                    />
                    <img
                      src={path_image + "ellipse-bg5.png"}
                      alt=""
                      className="slide-ellipse5"
                    />
                    <img
                      src={path_image + "ellipse-bg6.png"}
                      alt=""
                      className="slide-ellipse6"
                    />
                  </div>
                </div>
              </div>
            </Slider>
            <div className="add-space bottom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingConsentSection;
