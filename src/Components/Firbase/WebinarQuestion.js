import React, { useEffect, useRef, useState } from "react";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import Highcharts from "highcharts";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import HighchartsReact from "highcharts-react-official";
import { Container } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import { loader } from "../../loader";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "react-tabs/style/react-tabs.css";
let colors = [
  "#ff5366",
  "#0053a0",
  "#ff8649",
  "#89A550",
  "#4098B7",
  "#DB843D",
  "#FFBE3C",
  "#3cff79",
  "#b58cca",
  "#8c95ca",
];
const WebinarQuestion = () => {
  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [eventId, setEvent] = useState({
    id: 0,
    companyId: 0,
  });
  const location = useLocation();
  const [commentPop, setCommentPopup] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQuestionID, setCurrentQuestionID] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const [countValue, setCountvalue] = useState(0);
  const questionId = useRef(0);
  useEffect(() => {
    EventDataFun();
  }, []);
  const EventDataFun = async () => {
    try {
      loader("show");
      const result = await postData(ENDPOINT.EVENT_ID, {
        eventCode: queryParams.get("evnt"),
      });
      setEvent(result.data.data);
    } catch (err) {
      console.log("-err", err);
    }
  };

 
  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });

  const getFormattedData=(value)=>{
    let graphData = [],
    line_v = [],
    line_h = [];
  const seriesData = value?.pollAnswers?.map((question, index) => ({
    name: question.name,
    y: question.y,
    drilldown: question.drilldown,
    color: question?.color ? question.color : colors[index],
  }));
  const drilldownData = value?.pollAnswers
    ?.filter((question) => question?.drillDownData?.length > 0) // Exclude questions with empty drillDownData
    .map((question) => ({
      id: question.drilldown,
      name: question.name,
      data: question.drillDownData.map((answer) => [
        answer.name,
        answer.total,
      ]),
      colors: question.drillDownData.map((answer) => answer.color),
    }));
  let totalAnswer = value?.pollAnswers
    ?.map((item) => item.y) // Extracting the 'y' values
    .reduce((total, yValue) => total + yValue, 0);
  value?.pollAnswers.forEach((item, i) => {
    line_v.push(item?.name);
    line_h.push(item?.count_answer);
    const foundObj = {
      data: [{ p: (item?.y / totalAnswer) * 100, y: item?.y }],
      // y: item?.y,
      name: item?.name,
      color: item?.color ? item?.color : colors[i],
    };
    graphData.push(foundObj);
  });
 return {
    question: value?.question,
    canCustomAnswer: value?.canCustomAnswer,
    graphType: value?.graphType,
    highchartData: {
      chart: {
        type: "bar",
        height: "500",
      },
      yAxis: {
        min: 0,
        tickInterval: 1,
        allowDecimals: false,
        stackLabels: {
          enabled: true,
        },
        title: {
          text: "",
        },
      },
      legend: {
        enabled: true,
        verticalAlign: "bottom",
      },
      xAxis: {
        categories: line_v,
        visible: false,
      },
      title: {
        text: "",
      },
      tooltip: {
        formatter: function () {
          return (
            "<b>" + this.series.name + ":" + "</b><br/>" + this.point.y
          );
        },
      },
      plotOptions: {
        series: {
          // stacking: "normal",
          pointWidth: 30,
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              enabled: true,
              // distance: -40,
              // format: "{point.percentage:.1f}%",
              formatter: function () {
                var pcnt = this.point.p.toFixed(0);
                return "<tspan >" + pcnt + "%" + "</tspan>";
              },
              style: {
                fontSize: "1.2em",
                textOutline: "none",
                opacity: 0.7,
              },
            },
          ],
        },
        bar: {
          showInLegend: true,
        },
      },
      column: {
        colorByPoint: true,
      },
      exporting: {
        enabled: false,
      },

      // series: [
      //   {
      //   name:"",
      //   colorByPoint: true,
      //     data: graphData,
      //     // showInLegend: false,
      //   },
      // ],
      series: graphData,
    },
    pieChartData: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        height: "500",
      },
      exporting: {
        enabled: false, // Disable the export menu
      },
      title: {
        text: "Answers",
        align: "center",
      },
      tooltip: {
        formatter: function () {
          return this.point.name + " : <b>" + this.point.y + "</b>";
        },
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      legend: {
        // labelFormat: '{name} ({percentage:.2f}%) ',
        labelFormat: "{name} ({percentage:.0f}%)",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: "Questions",
          colorByPoint: true,
          data: seriesData,
        },
      ],
      drilldown: {
        series: drilldownData,
      },
    },
    answer: value?.totalUser,
    questionId: value?.questionId,
  };
  }
  const initialFunction = async () => {
    try {

      const result = await postData(ENDPOINT.WEBINAR_All_QUESTION_LISTING, {
        companyId: eventId?.companyId,
        eventId: eventId?.id,
      });

      let newData = [];
      result?.data?.data?.forEach((value) => {
        newData.push(getFormattedData(value))
      });
      loader("hide");
      setData(newData);
      setAllData(result?.data?.data);
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };
  useEffect(() => {
    const callFunctions=async ()=>{
      await initialFunction();
      await registerSnapshot();
    }
    if(eventId?.id!=0){
   
      callFunctions()
    }
   
  }, [eventId]);
  const registerSnapshot=()=>{
       const q = query(
        collection(db, "chat"),
        where("event_id", "==", eventId?.id),
        orderBy("date", "desc"),
        limit(1)
      );
      let newData = {};
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data()) {
          newData = doc.data();
          if (countValue != doc.data()?.webinar) {
questionId.current=doc.data()?.question_id
            setCountvalue(doc.data()?.webinar);
          }
        }
      });
    });
  }
  
  useEffect(() => {
const getQuestionData=async()=>{
  const result = await postData(ENDPOINT.WEBINAR_QUESTION_ONLY, {
    companyId: eventId?.companyId,
    eventId: eventId?.id,
    questionId: questionId.current,
  });
  let newData = [];
      result?.data?.data?.forEach((value) => {
        newData.push(getFormattedData(value))      });
      const currentQuestionIndex=data.findIndex(item=> item.questionId===questionId.current);
      if(currentQuestionIndex!=-1){
        let newDataSample=[...data];
        newDataSample[currentQuestionIndex]=newData[0]
        setData(newDataSample)
        let newAllData=[...alldata]
        newAllData[currentQuestionIndex]=result?.data?.data[0]
        // console.log(alldata);
        setAllData(newAllData);


      }
      
}
    if (countValue) {
   getQuestionData()
    }
  }, [countValue]);

  const displayPopup = (question_id, e) => {
    e.preventDefault();
    let index = alldata.findIndex((obj) => obj.questionId === question_id);
    setCommentPopup(true);
    if (index !== -1) {
      let allComments = alldata?.[index]?.userComments;
      // let comments = allComments?.map(obj => obj.comments);
      // setComments(comments);
      setComments(allComments);
      setCurrentQuestion(alldata?.[index]?.question);
      setCurrentQuestionID(question_id);
      console.log(`Element found at index ${index}`);
    } else {
      console.log("Element not found");
    }
  };

  const onClose = () => {
    setCommentPopup(false);
  };

  return (
    <>
      <div className="webinar-questions webinar-question-box">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Container>
          <div className="webinar-question-results">
            {data?.map((item, index) => {
              return (
                <>
                  {/* <p>{index+1}. {item?.question} </p> */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${index + 1} ${item?.question}`,
                    }}
                  ></p>
                  {item?.canCustomAnswer == 1 || item?.graphType == "bar" ? (
                    <>
                      {item?.answer ? (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={item?.highchartData}
                        />
                      ) : (
                        <h6>This question hasn't been answered yet.</h6>
                      )}
                    </>
                  ) : (
                    <>
                      {item?.answer ? (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={item?.pieChartData}
                        />
                      ) : (
                        <h6>This question hasn't been answered yet.</h6>
                      )}
                    </>
                  )}
                  {item?.answer ? (
                    <>
                      <h6 className="total_count">
                        Total user: {item?.answer}{" "}
                      </h6>
                      {alldata[index].userComments.every(
                        (obj) => obj.comments === ""
                      ) ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          className="btn btn-info answermodel"
                          onClick={(e) => displayPopup(item?.questionId, e)}
                        >
                          Answers
                        </button>
                      )}
                      {/* <button type="button" className="btn btn-info answermodel" onClick={(e) => displayPopup(item?.questionId, e)}>Answers</button> */}
                    </>
                  ) : null}
                </>
              );
            })}
          </div>
        </Container>
      </div>

      <Modal
        show={commentPop}
        backdrop="static"
        onHide={onClose}
        keyboard={false}
        id="showComments"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            dangerouslySetInnerHTML={{
              __html: currentQuestion?.length > 0 ? currentQuestion : "Answer",
            }}
          >
            {
              // currentQuestion?.length > 0 ? currentQuestion : "Answer"
              // <img
              //   src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
              //   alt=""
              // />
            }
            {/* <img
                  src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
                  alt=""
                /> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            {currentQuestionID == 1660 ? (
              <table className="table table-custom">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <>
                      {comments?.[0]?.questions
                        ?.split("~")
                        .map((substring, index) => {
                          return (
                            <th
                              dangerouslySetInnerHTML={{
                                __html: substring?.length > 0 ? substring : "",
                              }}
                            ></th>
                          );
                        })}
                    </>
                  </tr>
                </thead>
                <tbody>
                  {comments.every((obj) => obj.comments === "") ? (
                    <tr>
                      <td colSpan={3}>
                        <p>No Data Found</p>
                      </td>
                    </tr>
                  ) : (
                    comments?.map((item, index) => {
                      return (
                        <>
                          {item?.comments ? (
                            <tr>
                              <td>{item?.name ? item?.name : "N/A"}</td>
                              {item?.comments
                                ?.split("~")
                                .map((substring, index) => {
                                  return (
                                    <td
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          substring?.length > 0
                                            ? substring
                                            : "",
                                      }}
                                    ></td>
                                  );
                                })}
                            </tr>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })
                  )}
                </tbody>
              </table>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.every((obj) => obj.comments === "") ? (
                    <tr>
                      <td colSpan={3}>
                        <p>No Data Found</p>
                      </td>
                    </tr>
                  ) : (
                    comments?.map((item, index) => {
                      return (
                        <>
                          {item?.comments ? (
                            <tr>
                              <td>{item?.name ? item?.name : "N/A"}</td>
                              <td>{item?.comments}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WebinarQuestion;
