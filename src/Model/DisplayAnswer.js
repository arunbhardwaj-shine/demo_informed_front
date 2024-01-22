import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
let  colors= ["#ff5366","#0053a0","#ff8649","#89A550","#4098B7","#DB843D","#FFBE3C","#3cff79","#b58cca","#8c95ca"] 
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
function DisplayAnswer({ show, data, onClose, readerCount, customAnswer, designData, graphType }) {
  const [searchParams] = useSearchParams();
  let parms=searchParams.get('evnt');
  const [userCount,setUserCount] = useState(0) 
  let chartOptions = '';
if(customAnswer == 1 || graphType === 'bar'){
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
          color: item?.color ? item?.color : colors[i],
        };
        graphData.push(foundObj);
      });

      chartOptions = {
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
          },
          stackLabels: {
            enabled: true,
          },
        },
        legend: {
          enabled:false,
          verticalAlign: "bottom",
      }, 
        xAxis: {
          categories: line_v,
        },
        title: {
          text: "Answers",
        },
        // plotOptions: {
        //   series: {
        //     pointWidth: 20,
        //   },
        // },
        plotOptions: {
          series: {
            stacking: "normal",
            pointWidth: 30,
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
        series: [
          {
            name: "",
          colorByPoint: true,
            data: graphData,
            // showInLegend: false,
          },
        ],
      };
}else{
    const seriesData = data.map((question,index) => ({
      name: question.name,
      y: question.y,
      drilldown: question.drilldown,
      color:question?.color ? question?.color : colors[index],
      // color:colors[index],
      // color: question.y === 2 ? "#00FF00" : "#FF0000", 
    }));
    const drilldownData = data?.filter(question => question?.drillDownData?.length > 0) // Exclude questions with empty drillDownData
      .map(question => ({
        id: question.drilldown,
        name: question.name,
        data: question.drillDownData.map(answer => [answer.name, answer.total]),
        colors: question.drillDownData.map(answer => answer.color)
      }));
    ;
    
    // console.log(drilldownData);
     chartOptions = {
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
        labelFormat: '{name} ({percentage:.0f}%)',
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
      exporting: {
        enabled: false,
      },
    };
}


// const [highchartData, setHighChartData] = useState(chartOptions);
// useEffect(() => {
//   const seriesData = sampleData.data.map((question) => ({
//     name: question.name,
//     y: question.y,
//     drilldown: question.drilldown,
//     color: question.y === 2 ? "#00FF00" : "#FF0000", // Define colors based on your logic
//   }));
//   const drilldownData = sampleData.data.map((question) => ({
//     id: question.drilldown,
//     data: question.drillDownData.map((answer) => [answer.name, answer.total]),
//   }));
//   console.log(seriesData);

//   const chartOptions = {
//     chart: {
//       type: "pie",
//     },
//     title: {
//       text: "Your Chart Title",
//     },
//     plotOptions: {
//       pie: {
//         allowPointSelect: true,
//         cursor: "pointer",
//         dataLabels: {
//           enabled: true,
//           format: "<b>{point.name}</b>: {point.percentage:.1f} %",
//         },
//         showInLegend: true,
//       },
//     },
//     series: [
//       {
//         name: "Questions",
//         colorByPoint: true,
//         data: seriesData,
//       },
//     ],
//     drilldown: {
//       series: drilldownData,
//     },
//   };

 
//   setHighChartData(chartOptions);
// }, [sampleData]);
//  console.log(highchartData);

  Highcharts.setOptions({
    colors: ["#FFCACD", "#39CABC"],
  });
  const shouldAddClass = parms && parms.includes("eahad_2024");
  return (
    <>
      <Modal show={show} backdrop="static" onHide={onClose}  className={`${shouldAddClass ? "eahad_2024" : ""}`} centered
      keyboard={false} id="pollModel1">
      <Modal.Header closeButton style={{ background: designData?.headerBackgroundColor }}>
      <Modal.Title id="contained-modal-title-vcenter">
          {/* <img
            // src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            src={path_image+'FVIII_logo.png'} 
            alt="logo"
          /> */}
           {/* <img  src={`${parms?.includes("eahad_2024")?"https://webinar.docintel.app/EAHAD2022/images/Octapharma_blue.png":path_image+'FVIII_logo.png'}`}alt="Factor logo" /> */}
           <img  src={designData?.logoImageUrl} alt="Factor logo" />
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <p dangerouslySetInnerHTML={{__html: data?.question}}></p>
          <HighchartsReact key = {"rand_"+customAnswer} highcharts={Highcharts} options={chartOptions} />
          {/* <h5 style={{ color: designData?.textColor }}>Total Answer:{readerCount}</h5> */}
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default DisplayAnswer;
