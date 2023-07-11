import React, { useEffect, useState,useMemo  } from "react";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import Highcharts from "highcharts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import HighchartsReact from "highcharts-react-official";
import { Col, Container, Row, Table } from "react-bootstrap";
import {db} from "../../config/firebaseConfig"
import { Link } from "react-router-dom";
const PollQuestion = ()=>{
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const q = query(collection(db, "chat"),where("event_id","==",136))
    const [data,setData] = useState([])
     const initiFun = async () => {
        try {
          const result = await postData(ENDPOINT.WEBINAR_QUESTION_LISTING, {
            companyId: 18207,
            eventId: 136,
          });
          
          let newData = [];
          result?.data?.data?.forEach((value) => {
            let graphData = [],
              line_v = [],
              line_h = [];
              value?.pollAnswers.forEach((item,i) => {
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
              pieChartData:{
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Answers in percentage',
                    align: 'center'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data:graphData
                }]
             },
              answer:value?.pollAnswers?.length
            });
          });
          setData(newData)
        } catch (err) {
          console.log("-err", err);
        }
      };

    // onSnapshot(q, (querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         if(doc.data()){
    //             console.log("-df>",doc.data())
    //         }
    //     });  
    //  })
     useEffect(()=>{
        initiFun()
     },[])
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
                            {
                            data?.map((item,index) =>{
                                return (
                                    <>
                                <tr>
                                    {console.log("ite",item)}
                                    <td>{index+1}</td>
                                    <td>{item?.question}</td>
                                    <td>{item?.speakerName}</td>
                                    <td>{item?.answer}</td>
                                    <td><button type="button" className="btn btn-submit btn-bordered">Submit</button>
                                        <button type="button" className="btn btn-submit btn-bordered btn-voilet disabled">Display Answer</button>                      
                                        <button type="button" className="btn show_graph"><img src={path_image + "accordian_arrow.svg"} alt="" /></button></td>
                                </tr>
                                <tr class="poll_graph active-graph"> 
                                    <td colspan="6">
                                        <div class="highcharts-container">
                                            asdjashas dmulas mdasd ashgdas dahsiod asdhioasd maieqwe 
                                        </div>
                                    </td>
                                </tr>
                                </>
                                 )
                                    })
                                }
                            </tbody>
                        </Table>
                        </div>
                    </Container>

                    
        
        
        </>
    )
}
export default PollQuestion