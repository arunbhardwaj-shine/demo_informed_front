import React, { useEffect, useState,useMemo  } from "react";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import Highcharts from "highcharts";
import { collection, query, where, onSnapshot,orderBy,limit } from "firebase/firestore";
import HighchartsReact from "highcharts-react-official";
import { Col, Container, Row } from "react-bootstrap";
import {db} from "../../config/firebaseConfig"
import { loader } from "../../loader";
import { useLocation } from 'react-router-dom';

import 'react-tabs/style/react-tabs.css';
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
const WebinarQuestion = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [eventId,setEvent] = useState({
    id:0,
    companyId:0
  })
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);   
  const [countValue, setCountvalue] = useState(0);
  const q = query(collection(db, "chat"),where("event_id","==",eventId?.id),orderBy("date","desc"),limit(1))

  const EventDataFun = async() =>{
    try{
        loader("show")
        const result = await postData(ENDPOINT.EVENT_ID,{
             eventCode :queryParams.get("evnt")
        })
        setEvent(result.data.data)
        loader("hide")

    }catch(err){
        loader("hide")
        console.log("-err",err)
    }
}
useEffect(()=>{
    EventDataFun()
},[])
  const initiFun = async () => {
    try {
      const result = await postData(ENDPOINT.WEBINAR_All_QUESTION_LISTING, {
        companyId: eventId?.companyId,
        eventId: eventId?.id,
      });
      
      let newData = [];
      result?.data?.data?.forEach((value) => {
        let graphData = [],
          line_v = [],
          line_h = [];
          const seriesData = value?.pollAnswers?.map((question,index) => ({
            name: question.name,
            y: question.y,
            drilldown: question.drilldown,
            color:colors[index],
          }));
          const drilldownData = value?.pollAnswers?.filter(question => question.drillDownData.length > 0) // Exclude questions with empty drillDownData
          .map(question => ({
            id: question.drilldown,
            name: question.name,
            data: question.drillDownData.map(answer => [answer.name, answer.total]),
            colors: question.drillDownData.map(answer => answer.color)
          }));
          value?.pollAnswers.forEach((item,i) => {
          line_v.push(item?.name);
          line_h.push(item?.count_answer);
          const foundObj = {
            y: item?.y,
            name: item?.name,
            color: colors[i],
          };
          graphData.push(foundObj);
        });
        newData.push({
          question: value?.question,
          highchartData: {
            chart: {
              type: "column",
              height:'500',
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
              type: 'pie',
              height:'500',
            },
            exporting: {
              enabled: false // Disable the export menu
            },
            title: {
                text: 'User Answers in percentage',
                align: 'center'
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
            series: [{
                name: 'Questions',
                colorByPoint: true,
                data:seriesData,
            }],
            drilldown: {
              series: drilldownData,
            },
         },
          answer:value?.totalUser
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
       if(doc.data()){
           newData = doc.data()
           if(countValue != doc.data()?.webinar){
              setCountvalue(doc.data()?.webinar)
           }
           
       }
   });  
 
})

useEffect(() => {
    if(countValue){
        initiFun();
    }
  }, [countValue]);
 
  return (
    <>
          <div className="webinar-questions">
            <Container>
              <div className="webinar-question-results">
                 {data?.map((item,index)=>{
                  return (
                    <>
                    <p>{index+1}. {item?.question}</p>
                    {item?.answer?<HighchartsReact highcharts={Highcharts} options={item?.highchartData} />: <h6>This question hasn't been answered yet.</h6>}
                    {item?.answer?<HighchartsReact highcharts={Highcharts} options={item?.pieChartData} />: <h6>This question hasn't been answered yet.</h6>}
                    {item?.answer? <h6>Total user: {item?.answer} </h6>:null}
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
