import React, { useEffect, useState, useMemo } from "react";
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
import { Col, Container, Row, Table } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import { loader } from "../../loader";
import { useLocation } from "react-router-dom";
let  colors= [
  "#FFBE2C",
  "#F58289",
  "#d1d132",
  "#D61975",
  "#0066BE",
  "#00003C",
  "#b490f5",
  "#91817e",
  "#2b6570",
  "#9C9CA2",
  "#7cb0dd",
  "#4f4566",
  "#00D4C0",
  "#32a1d1",
] 
const PollQuestion = () => {
  const path_image = "/componentAssets/images/";
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [eventId, setEvent] = useState({
    id: 0,
    companyId: 0,
  });
  const q = query(
    collection(db, "chat"),
    where("event_id", "==", eventId?.id),
    orderBy("date", "desc"),
    limit(1)
  );
  const [data, setData] = useState([]);
  const [showAccordian, setAccordian] = useState(0);
  const [count, setCount] = useState(0);
  const [chartData, setChartData] = useState({});

  const EventDataFun = async () => {
    try {
      loader("show");
      const result = await postData(ENDPOINT.EVENT_ID, {
        eventCode: queryParams.get("evnt"),
      });
      setEvent(result.data.data);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };
  useEffect(() => {
    EventDataFun();
  }, []);

  useEffect(() => {
    if (eventId?.id) {
      initiFun();
    }
  }, [eventId?.id]);

  const initiFun = async () => {
    try {
      loader("show");
      const result = await postData(ENDPOINT.WEBINAR_QUESTION_LISTING, {
        // companyId: 18207,
        // eventId: 136,
        companyId: eventId?.companyId,
        eventId: eventId?.id,
      });

      let newData = [];
      result?.data?.data?.forEach((value) => {
        let graphData = [],
          line_v = [],
          line_h = [];
        value?.pollAnswers.forEach((item, i) => {
          line_v.push(item?.answer);
          line_h.push(item?.count_answer);
          const foundObj = {
            y: item?.count_answer,
            name: item?.answer,
            color: item.color_code,
          };
          graphData.push(foundObj);
        });
        newData.push({
          question: value?.question,
          highchartData: {
            chart: {
              type: "column",
            },
            yAxis: {
              min: 0,
              tickInterval: 1,
            },
            xAxis: {
              categories: line_v,
            },
            title: {
              text: "",
            },
            plotOptions: {
              series: {
                pointWidth: 20,
              },
            },
            column: {
              colorByPoint: true,
            },
            exporting: {
              enabled: false,
            },

            series: [
              {
                data: graphData,
                showInLegend: false,
              },
            ],
          },
          eventId: value?.eventId,
          questionId: value?.questionId,
          pieChartData: {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: "pie",
              width: 1000,
              height: 400,
            },
            title: {
              text: "",
              align: "center",
            },
            tooltip: {
              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            legend: {
              verticalAlign: "bottom",
              labelFormatter: function () {
                return this.name + ": " + this.y;
              },
            },
            accessibility: {
              point: {
                valueSuffix: "%",
              },
            },
            exporting: {
              enabled: false, // Disable the export menu
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                  enabled: false,
                  format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
                showInLegend: true,
              },
            },
            series: [
              {
                name: "Brands",
                colorByPoint: true,
                data: graphData,
              },
            ],
          },
          totalUser: value?.totalUser,
          triggered: value?.triggered,
          showAnswerToUser: value?.showAnswerToUser,
          answer: value?.pollAnswers?.length,
          speakerName: value?.speakerName,
        });
      });
      setData(newData);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  const fireBaseFun = async () => {
    try {
      const result = await postData(ENDPOINT.WEBINAR_QUESTION_LISTING, {
        // companyId: 18207,
        // eventId: 136,
        companyId: eventId?.companyId,
        eventId: eventId?.id,
      });

      let newData = [];
      result?.data?.data?.forEach((value) => {
        let graphData = [],
          line_v = [],
          line_h = [];
        value?.pollAnswers.forEach((item, i) => {
          line_v.push(item?.answer);
          line_h.push(item?.count_answer);
          const foundObj = {
            y: item?.count_answer,
            name: item?.answer,
            color: item.color_code,
          };
          graphData.push(foundObj);
        });
        newData.push({
          question: value?.question,
          highchartData: {
            chart: {
              type: "column",
            },
            yAxis: {
              min: 0,
              tickInterval: 1,
            },
            xAxis: {
              categories: line_v,
            },
            title: {
              text: "",
            },
            plotOptions: {
              series: {
                pointWidth: 20,
              },
            },
            column: {
              colorByPoint: true,
            },
            exporting: {
              enabled: false,
            },

            series: [
              {
                data: graphData,
                showInLegend: false,
              },
            ],
          },
          eventId: value?.eventId,
          questionId: value?.questionId,
          pieChartData: {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: "pie",
            },
            title: {
              text: "Answers in percentage",
              align: "center",
            },
            tooltip: {
              pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            accessibility: {
              point: {
                valueSuffix: "%",
              },
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                  enabled: false,
                  format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                },
              },
              showInLegend: true,
            },
            series: [
              {
                name: "Brands",
                colorByPoint: true,
                data: graphData,
              },
            ],
          },
          totalUser: value?.totalUser,
          triggered: value?.triggered,
          showAnswerToUser: value?.showAnswerToUser,
          answer: value?.pollAnswers?.length,
          speakerName: value?.speakerName,
        });
      });
      setData(newData);
    } catch (err) {
      console.log("-err", err);
    }
  };

  const handleSubmit = async (data, type) => {
    try {
      loader("show");
      await postData(ENDPOINT.EVENT_SUBMIT, {
        eventId: eventId?.id,
        questionId: data?.questionId,
        type: type,
      });
    } catch (err) {
      console.log("-err", err);
    } finally {
      setTimeout(() => {
        loader("hide");
      }, 2000);
    }
  };

  const accordianFun = async(index,questionId) => {
    try {
      loader("show");
      let value = 0;
      if (showAccordian != index) {
        value = index;
        const result = await postData(ENDPOINT.POLL_ANSWER, {
          companyId:questionId,
          eventId: eventId?.id,
        });
        let data=result?.data?.data
  
        const seriesData = data.map((question,index) => ({
          name: question.name,
          y: question.y,
          drilldown: question.drilldown,
          color:colors[index],
          // color: question.y === 2 ? "#00FF00" : "#FF0000", 
        }));
        const drilldownData = data
          .filter(question => question.drillDownData.length > 0) // Exclude questions with empty drillDownData
          .map(question => ({
            id: question.drilldown,
            data: question.drillDownData.map(answer => [answer.name, answer.total]),
            colors: question.drillDownData.map(answer => answer.color)
          }));
        ;
        
        // console.log(drilldownData);
        const chartOptions = {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
            text: "User Answers",
          },
          tooltip: {
              formatter: function() {
                return this.point.name +' : <b>'+ this.point.y + '</b>';
            },
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          legend: {
              labelFormat: '{name} ({percentage:.2f}%) ',
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
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
        };
      setChartData(chartOptions)
      }
      setAccordian(value);
      

      loader("hide");
    } catch (err) {
      loader("hide");
      console.log("-err", err);
    }
  };

  const handleClose = async () => {
    try {
      loader("show");
      await postData(ENDPOINT.EVENT_CLOSE, {
        eventId: eventId?.id,
      });
    } catch (err) {
      console.log("-err", err);
    } finally {
      setTimeout(() => {
        loader("hide");
      }, 3000);
    }
  };

  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        if (count != doc.data()?.webinar) {
          setCount(doc.data()?.webinar);
        }
      }
    });
  });
  useEffect(() => {
    if (count) {
      fireBaseFun();
    }
  }, [count]);
  return (
    <>
      <Container>
        <div className="webinar-question-results">
          <Table>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Question</th>
                <th>Speaker</th>
                <th>User count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.question}</td>
                      <td>{item?.speakerName}</td>
                      <td>{item?.totalUser}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleSubmit(item, "submit")}
                          className={`btn btn-submit btn-bordered ${
                            item?.triggered == 1 ? "disabled active" : ""
                          }`}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSubmit(item, "answer")}
                          className={`btn btn-submit btn-bordered btn-voilet ${
                            item?.showAnswerToUser == 1 ? "disabled" : ""
                          }`}
                        >
                          Display Answer
                        </button>
                        <button
                          type="button"
                          onClick={() => accordianFun(index + 1,item?.questionId)}
                          className={`btn show_graph ${
                            showAccordian && showAccordian == index + 1
                              ? "open"
                              : ""
                          }`}
                        >
                          <img
                            src={path_image + "accordian_arrow.svg"}
                            alt=""
                          />
                        </button>
                      </td>
                    </tr>
                    <tr
                      class={`poll_graph ${
                        showAccordian && showAccordian == index + 1
                          ? "active-graph"
                          : ""
                      }`}
                    >
                      <td colspan="6">
                        <div class="highcharts-container">
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={chartData}
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                {data?.length ? (
                  <td colspan={5}>
                    <button
                      type="button"
                      onClick={handleClose}
                      className={`btn btn-submit btn-filled `}
                    >
                      Close
                    </button>
                  </td>
                ) : null}
              </tr>
            </tfoot>
          </Table>
        </div>
      </Container>
    </>
  );
};
export default PollQuestion;
