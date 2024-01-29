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
import HighchartsReactBAR from "highcharts-react-official";
import { Col, Container, Row, Table } from "react-bootstrap";
import { db } from "../../config/firebaseConfig";
import { loader } from "../../loader";
import { useLocation } from "react-router-dom";
let  colors= ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"]

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
  const [customAns,setCustomAns] = useState(0);
  const [graphType,setGraphType] = useState(0);
  const [syncFlag, setSyncFlag] = useState(1);
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
      console.log("FIREBASE FUNCTIONA WORKING");
      const result = await postData(ENDPOINT.WEBINAR_QUESTION_LISTING, {
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
      console.log(newData,"INSIDE FIREBASE FUNCTIONA");
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
        let custom_ans = result?.data?.custom_answer ? result?.data?.custom_answer : 0 ;
        setCustomAns(custom_ans);

        let graph = result?.data?.graphType ? result?.data?.graphType : 'bar' ;
        setGraphType(graph);
        let chartOptions = {};
        
          // for COLUMN GRAPH
          let graphData = [],
          line_v = [],
          line_h = [];
          let i = 0;
          data?.forEach((item) => {
            line_v.push(item?.name);
            line_h.push(item?.y);
            const foundObj = {
              y: item?.y,
              name: item?.name,
              color: item?.color ? item.color : colors[i],
            };
            graphData.push(foundObj);
          });
          chartOptions.linechart = {
            chart: {
              type: "column",
            },
            yAxis: {
              min: 0,
              tickInterval: 1,
              allowDecimals: false,
              stackLabels: {
                enabled: true,
              },
              title: {
                  text: ''
              }
            },
            legend: {
              enabled:false,
              verticalAlign: "bottom",
          }, 
            xAxis: {
              categories: line_v,
            },
            title: {
              text: "",
            },
            // plotOptions: {
            //   series: {
            //     pointWidth: 20,
            //   },
            // },
            plotOptions: {
              series: {
                stacking: "normal",
                pointWidth: 20,
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: [
                  {
                    distance: -40,
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
            }
            },
            column: {
              colorByPoint: true,
            },
            exporting: {
              enabled: false,
            },
            // series: [
            //   {
            //     data: graphData,
            //     showInLegend: false,
            //   },
            // ],
            series: [
              {
              name:"",
              colorByPoint: true,
                data: graphData,
                // showInLegend: false,
              },
            ],
          };
        
            const seriesData = data.map((question,index) => ({
              name: question.name,
              y: question.y,
              drilldown: question.drilldown,
              color:question?.color ? question.color : colors[index],
              // color: question.y === 2 ? "#00FF00" : "#FF0000", 
            }));
            const drilldownData = data
              .filter(question => question?.drillDownData?.length > 0) // Exclude questions with empty drillDownData
              .map(question => ({
                id: question.drilldown,
                data: question.drillDownData.map(answer => [answer.name, answer.total]),
                colors: question.drillDownData.map(answer => answer.color)
              }));
            ;
            chartOptions.piechart = {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              title: {
                text: "Answers",
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
                  labelFormat: '{name} ({percentage:.0f}%) ',
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
      setSyncFlag(syncFlag + 1);
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
        let newCount = doc.data()?.questionTrigger + doc.data()?.webinar;
        if (count != newCount) {
          setCount(newCount);
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
    <div className="webinar-question-box">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
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
                      <td dangerouslySetInnerHTML={{
                            __html: item?.question,
                          }}></td>
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
                          {
                            syncFlag && (
                                customAns == 1 || graphType == 'bar' ? 
                                <>
                                {
                                  console.log("FOR LINE CHART")
                                }
                                <HighchartsReact
                                  key={"lineChart_"+syncFlag}
                                  highcharts={Highcharts}
                                  options={chartData?.linechart}
                                />
                                </>
                                : 
                                <>
                                {
                                  console.log("FOR PIE CHART")
                                }
                                <HighchartsReact
                                  key={"pieChart_"+syncFlag}
                                  highcharts={Highcharts}
                                  options={chartData?.piechart}
                                />
                                </>
                            ) 
                          }
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
      </div>
    </>
  );
};
export default PollQuestion;
