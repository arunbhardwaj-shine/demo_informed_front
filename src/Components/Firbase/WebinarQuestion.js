import React, { useEffect, useState } from "react";
import { postData } from "../../axios/apiHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Container } from "react-bootstrap";
const WebinarQuestion = () => {
  const [data, setData] = useState([]);

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
          line_h.push(i);
          const foundObj = {
            y: i,
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

  useEffect(() => {
    initiFun();
  }, []);
  return (
    <>
          <div className="webinar-questions">
            <Container>
              <div className="webinar-question-results">
                 {data?.map((item)=>{
                  return (
                    <>
                    <p>{item?.question}</p>
                  <HighchartsReact highcharts={Highcharts} options={item?.highchartData} /> 
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
