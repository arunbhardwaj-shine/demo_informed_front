import React from "react";
import { Col, Row } from "react-bootstrap";
const data = [
  {
    itemdetail: "Web Details:",
    date: "12 Dec 2022",
    time: "Time: 10:34 AM ( Europe/London )",
    activity: "Activity: Login to docintel app",
    title: "Title: Factor FVIII Relevance Academy 2022, Morning sessions",
    chapter: [
      {
        chapter: "Chapter 1",
        markimage:
          "https://docintel.s3-eu-west-1.amazonaws.com/ebook/pdftoimage/Haematology_Octapharma/3681/ios_page1.png",
      },
      {
        markimage:
          "https://docintel.s3-eu-west-1.amazonaws.com/ebook/pdftoimage/Haematology_Octapharma/3681/ios_page2.png",
      },
    ],
  },
  {
    itemdetail: "Android Details:",
    date: "14 Dec 2022",
    time: "Time: 10:34 AM ( Europe/London )",
    activity: "Activity: Login to docintel app",
  },
  {
    itemdetail: "IOS Details:",
    date: "15 Dec 2022",
    time: "Time: 10:34 AM ( Europe/London )",
    activity: "Activity: Login to docintel app",
  },
  {
    itemdetail: "Web Details:",
    date: "16 Dec 2022",
    time: "Time: 10:34 AM ( Europe/London )",
    activity: "Activity: Login to docintel app",
    chapter: [
      {
        chapter: "Chapter 1",
        markimage:
          "https://docintel.s3-eu-west-1.amazonaws.com/ebook/pdftoimage/Haematology_Octapharma/3755/ios_page1.png",
      },
      {
        markimage:
          "https://docintel.s3-eu-west-1.amazonaws.com/ebook/pdftoimage/Haematology_Octapharma/3755/ios_page2.png",
      },
      {
        markimage:
          "https://docintel.s3-eu-west-1.amazonaws.com/ebook/pdftoimage/Haematology_Octapharma/3755/ios_page3.png",
      },
    ],
  },
  {
    itemdetail: "Web Details:",
    date: "17 Dec 2022",
    time: "Time: 10:34 AM ( Europe/London )",
    activity: "Activity: Login to docintel app",
  },
];
const TimelineDetail = () => {
  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            {data.map((item, index) => (
              <div
                key={index}
                className="vertical-timeline vertical-timeline--animate"
              >
                <div className="vertical-timeline-element--work vertical-timeline-element">
                  <span
                    className="vertical-timeline-element-icon bounce-in"
                    style={{
                      background: "rgb(0, 74, 137)",
                      color: "rgb(0, 74, 137)",
                    }}
                  ></span>
                  <div
                    className="vertical-timeline-element-content bounce-in"
                    style={{
                      background: "rgb(255, 255, 255)",
                      color: "rgb(0, 74, 137)",
                    }}
                  >
                    <div
                      className="vertical-timeline-element-content-arrow"
                      style={{ borderRight: "7px solid rgb(255, 255, 255)" }}
                    ></div>
                    <div className="vertical-timeline-title">
                      <h6 className="vertical-timeline-element-title">
                        {item.itemdetail}
                      </h6>
                    </div>
                    <div className="vertical-timeline-details">
                      <h6 className="vertical-timeline-time">{item.time}</h6>
                      <h6 className="vertical-timeline-activity">
                        {item.activity}
                      </h6>
                      <h6>{item.title}</h6>
                    </div>
                    <span className="vertical-timeline-element-date">
                      {item.date}
                    </span>
                  </div>
                  {item?.chapter?.length ? (
                    <div className="vertical-timeline-element-right">
                      <div className="vertical-timeline-element-content-inset">
                        <div
                          className="vertical-timeline-element-content-arrow"
                          style={{
                            borderRight: "7px solid rgb(255, 255, 255)",
                          }}
                        ></div>

                        {item.chapter?.map((value) => (
                          <div className="mark-kriger-inside">
                            <h3>{value?.chapter}</h3>
                            <div className="media">
                              <div className="media-left">
                                <img
                                  src={value?.markimage}
                                  className="media-object"
                                  style={{ width: "80px" }}
                                  alt="ebook"
                                />
                                <p>Page: 1</p>
                              </div>
                              <div className="media-body">
                                <div className="pro-bar second-bar">
                                  <label htmlFor="file">Ignored</label>
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-success"
                                      role="progressbar"
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{
                                        width: "10%",
                                        backgroundColor: "#B13000",
                                      }}
                                    >
                                      0
                                    </div>
                                  </div>

                                  <label htmlFor="file">Browsed:</label>
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-success"
                                      role="progressbar"
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{
                                        width: "10%",
                                        backgroundColor: "#C7C008",
                                      }}
                                    >
                                      0
                                    </div>
                                  </div>

                                  <label htmlFor="file">Read</label>
                                  <div className="progress">
                                    <div
                                      className="progress-bar progress-bar-success changecolorbypercentage"
                                      role="progressbar"
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{
                                        width: "10%",
                                        backgroundColor: "rgb(86, 195, 187)",
                                      }}
                                    >
                                      0
                                    </div>
                                  </div>

                                  <label htmlFor="file">Readers</label>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-info"
                                      role="progressbar"
                                      aria-valuenow="70"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{
                                        width: "10%",
                                        background: "#729EFF",
                                      }}
                                    >
                                      0
                                    </div>
                                  </div>
                                  <p>
                                    <span>Time Needed: 14.48 seconds </span>
                                    <span>Time Spent: 305 seconds</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default TimelineDetail;
