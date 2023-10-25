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
import Modal from "react-bootstrap/Modal";

import 'react-tabs/style/react-tabs.css';
let  colors= ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"] 
const WebinarQuestion = () => {
  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [count, setCount] = useState(0);
  const [eventId,setEvent] = useState({
    id:0,
    companyId:0
  })
  const location = useLocation();
  const [commentPop,setCommentPopup] = useState(false)
  const [comments,setComments] = useState([])
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
        // loader("hide")

    }catch(err){
        // loader("hide")
        console.log("-err",err)
    }
}
useEffect(()=>{
    EventDataFun()
},[])
  const initiFun = async () => {
    try {

      loader("show")
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
          answer:value?.totalUser,
          questionId:value?.questionId,
        });
      });
      loader("hide")
      setData(newData)
      setAllData(result?.data?.data);
    } catch (err) {
      loader("hide")
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

  const displayPopup = (question_id, e) => {
    e.preventDefault();
    let index = alldata.findIndex(obj => obj.questionId === question_id);
    setCommentPopup(true);
    if (index !== -1) {
      let allComments = alldata?.[index]?.userComments;
      let comments = allComments?.map(obj => obj.comments);
      setComments(comments);
      console.log(`Element found at index ${index}`);
    } else {
      console.log('Element not found');
    }
  }
  
  const onClose = () => {
    setCommentPopup(false);
  }

  return (
    <>
          <div className="webinar-questions">
            <Container>
              <div className="webinar-question-results">
                 {data?.map((item,index)=>{
                  return (
                    <>
                    <p>{index+1}. {item?.question}</p>
                    {/* {item?.answer?<HighchartsReact highcharts={Highcharts} options={item?.highchartData} />: <h6>This question hasn't been answered yet.</h6>} */}
                    {item?.answer?<HighchartsReact highcharts={Highcharts} options={item?.pieChartData} />: <h6>This question hasn't been answered yet.</h6>}
                    {item?.answer? 
                      <>
                      <h6 className="total_count">Total user: {item?.answer} </h6>
                      <button type="button" className="btn btn-info answermodel" onClick={(e) => displayPopup(item?.questionId, e)}>Answers</button>
                      </>
                      :
                      null
                    }
                    
                    </>
                    )
              })}
                
              </div>
            </Container>
          </div>

          <Modal show={commentPop} backdrop="static" onHide={onClose} keyboard={false} id="showComments">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <img
                  src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
                  alt=""
                />
              </Modal.Title>
            </Modal.Header>
              <Modal.Body>
                  <table className="table table-striped">
                        <thead>
                          <tr>
                          <th>User Name</th>
                          <th>Answer</th>
                          <th>Explanation</th>
                          </tr>
                        </thead>
                        <tbody>										 
                        {
                          comments?.length > 0 ?
                          comments?.map((item,index)=>{
                          return(
                            <>
                            <tr>
                              <td>N/A</td>
                              <td></td>
                              <td>{item}</td>
                            </tr>
                            </>
                          ) 
                          })
                          : <tr><td colSpan={3}><p>No Data Found</p></td></tr>
                        }
                        </tbody>
                  </table>
                
              </Modal.Body>
            
          </Modal>
          </>
  );
};

export default WebinarQuestion;
