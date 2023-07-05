import React, { useEffect, useState,useMemo  } from "react";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import Highcharts from "highcharts";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import HighchartsReact from "highcharts-react-official";
import { Container } from "react-bootstrap";
import {db} from "../../config/firebaseConfig"
const WebinarQuestion = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [countValue, setCountvalue] = useState(0);


  const q = query(collection(db, "chat"),where("event_id","==",136))

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
                // data: [{
                //     name: 'Chrome',
                //     y: 70.67,
                //     sliced: true,
                //     selected: true
                // }, {
                //     name: 'Edge',
                //     y: 14.77
                // },  {
                //     name: 'Firefox',
                //     y: 4.86
                // }, {
                //     name: 'Safari',
                //     y: 2.63
                // }, {
                //     name: 'Internet Explorer',
                //     y: 1.53
                // },  {
                //     name: 'Opera',
                //     y: 1.40
                // }, {
                //     name: 'Sogou Explorer',
                //     y: 0.84
                // }, {
                //     name: 'QQ',
                //     y: 0.51
                // }, {
                //     name: 'Other',
                //     y: 2.6
                // }]
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
  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });
  let newData ={}
  onSnapshot(q, (querySnapshot) => {
    
   querySnapshot.forEach((doc) => {
    console.log("- im hererererer")
       if(doc.data()){
        console.log("- inside",doc.data())
           newData = doc.data()
           if(countValue != doc.data()?.webinar){
              setCountvalue(doc.data()?.webinar)
           }
           
       }
   });  
 
})
console.log("---im herere",newData)
// useMemo(() =>  setCount(countValue), [countValue]);

useEffect(() => {
    initiFun();
  }, [countValue]);
 
  return (
    <>
    {console.log("-cout",countValue)}
          <div className="webinar-questions">
            <Container>
              <div className="webinar-question-results">
                 {data?.map((item,index)=>{
                  return (
                    <>
                    <p>{index+1}. {item?.question}</p>
                    {item?.answer?<HighchartsReact highcharts={Highcharts} options={item?.highchartData} />: <h6>This question hasn't been answered yet.</h6>}
                    {item?.answer?<HighchartsReact highcharts={Highcharts} options={item?.pieChartData} />: <h6>This question hasn't been answered yet.</h6>}

                    {item?.answer? <h6>Total user: 1 </h6>:null}
                    </>
                    )
              })}
                
              </div>
            </Container>
          </div>
          </>
  );
};

export default WebinarQuestion;
