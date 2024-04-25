import React, { useEffect, useState } from "react";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import domtoimage from "dom-to-image";
import { Col, Button, Modal } from "react-bootstrap";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import { postData, postFormData } from "../../../../../axios/apiHelper";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { loader } from "../../../../../loader";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import WebinarAnalyticCommonModal from "../../../../../Model/WebinarAnalyticCommonModal";
exporting(Highcharts);
exportData(Highcharts);

const Analytics = () => {
  const { eventIdContext, handleEventId } = useSidebar()
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"))
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId
      ? eventIdContext?.eventId
      : localStorageEvent?.eventId
  );
  const [eventTitle, setEventTitle] = useState(
    eventIdContext?.eventTitle
      ? eventIdContext?.eventTitle
      : localStorageEvent?.eventTitle
  );
  const [downloadPopup, setDownloadPopup] = useState(false)
  const [localStorageUserId,setLocalStorageUserId]=useState(localStorage.getItem("user_id"))
  const [emailListData, setEmailListData] = useState([])
  const [pieChartData, setPieChartData] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: '',
      align: 'center',
      margin: 50
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      enabled:false
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        size: '100%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<span style="font-size: 1.2em"><b>{point.name} {point.percentage:.1f} %</b></span>',
        }
      }
    },
    series: [{
      name: 'Share',
      data: []
    }]
  })

  const [splineChartData, setSplineChartData] = useState({
    chart: {
      type: 'spline',
      width: "1000"
    },
    credits: {
      enabled: false
    },
    title: {
      text: '',
      align: 'center',
      margin: 50
    },
    exporting: {
      enabled: false
    },
    xAxis: {
      categories: [],
      tickInterval: 1,
      labels: {
        enabled: true
      }
    },
    yAxis: {
      title: {
        text: 'Online Users'
      },
      allowDecimals: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false
    },

    plotOptions: {
      series: {
        color: "#0066be",
        marker: {
          enabled: true
        }
      },

      spline: {
        marker: {
          enable: true
        },

        dataLabels: {

          allowOverlap: true,
          inside: false,
          overflow: "justify",
          crop: true,
          shape: "callout",
          backgroundColor: "rgba(255,255,255)",
          borderColor: "rgba(0,0,0,0.9)",
          color: "rgba(0,0,0)",
          borderWidth: 0.5,
          enabled: true,
          borderRadius: 5,
          borderWidth: 1,        
          y: -10,         
          marker: {
            enabled: true,
          },
          style: {
            fontSize: "11px",
            fontWeight: "normal",
            textShadow: "none",           
          },
          formatter: function () {
            return (
              "<span ><div className=" +
              this.series.name + '><span style="font-weight: bold;">' +
              "Users" +
              "</span><br/><strong>" +
              Highcharts.numberFormat(this.y, 0) +
              "</strong></div></span>"
            );
          },
        },
       
        enableMouseTracking:false
      }
    },
    series: [{
      name: '',
      data: [],
    }]
  })
  const colorArray = ['#0E9B8E', '#00003C', '#FFBE2C', '#FFBE2C', '#F58289', '#D61975', '#0066BE'];
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      width:1000,
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 25,
        depth: 70,
      },

    },
    title: {
      text: "Mail campaign stats",
    },
    xAxis: {
      categories: [],

    },
    yAxis: {
      title: {
        text: null,
      },
    },
    exporting: {
      enabled: false,
    },
    tooltip: {

      formatter: function () {
        return (
          "<span ><div className=" +
          this.series.name +
          '>'
          // <span style="font-weight: bold">'
          +
          // this.x +
          " <strong >" + ":" +
          Highcharts.numberFormat(this.y, 0) +
          "</strong></div></span>"
        );
      },
    },
    plotOptions: {
      bar:{
        pointWidth:20,
      },
      series: {
        dataLabels: {
          allowOverlap: false,
          distance: 40,
          enabled: true,
          inside: false,
          overflow: "justify",
          crop: true,
          shape: "callout",
          size: "100%",
          style: {
            fontFamily: "Helvetica, sans-serif",
            fontWeight: "normal",
            textShadow: "none",
          },
          formatter: function () {
            return (
              "<span ><div className=" +
              this.series.name
              //  +
              // this.x
              + " <strong >" +
              Highcharts.numberFormat(this.y, 0) +
              "</strong></div></span>"
            );
          },
        },
      },
    },
    series: [
      {
        name: "Email campaign",
        data: [],
      },
    ],
  });
  const [newOptions,setNewOptions]=useState([])
  useEffect(() => {
    getRegionPieChartStats();
    getOnlineReadersGraph();
    getWebinarCompaignList();
  }, [])

  const getRegionPieChartStats = async (e) => {
    try {
      let payload = {
        'eventId': eventId
      }
      const res = await postData(`${ENDPOINT.WEBINAR_EVENT_REGION_PIECHART_STATS}`, payload)
      let data = res?.data?.data
      const regionCounts = {};

      // Iterate over the data and accumulate counts for each region
      data.forEach(entry => {
        if (regionCounts[entry.region]) {
          regionCounts[entry.region] += entry.count;
        } else {
          regionCounts[entry.region] = entry.count;
        }
      });

      // Convert the object into an array of objects
      const resultArray = Object.keys(regionCounts).map(region => ({
        name: region,
        y: regionCounts[region]
      }));

      setPieChartData({
        ...pieChartData,
        series: [{
          ...pieChartData.series[0],
          data: resultArray
        }]
      })
    } catch (err) {
      console.log("-err", err);
    }
  }

  const getOnlineReadersGraph = async () => {

    try {
      let body = {
        eventId: eventId,
      };
      const response = await postData(ENDPOINT?.WEBINAR_GET_EVENT_ATTENDEES_GRAPH_DATA, body);
      let data = response?.data?.data;
      setSplineChartData({
        ...splineChartData,
        xAxis: {
          ...splineChartData.xAxis,
          categories: data?.timeSlots
        },
        series: [{
          ...splineChartData.series[0], // Keep other properties of the series unchanged
          data: data?.slotCount

        }]
      })
    } catch (err) {
      console.log("--err", err)

    }
  }

  // const downloadStats = async(e) => {
  //   try {
  //     // loader("show");
  //     let payload = {
  //       'eventId' : eventId
  //     }        

  //     const res = await postFormData(`${ENDPOINT.WEBINAR_EVENT_STATS}`, payload,{
  //         responseType: "blob",
  //       });
  //     const link = document.createElement("a");
  //     const url = URL.createObjectURL(res?.data);
  //     link.href = url;
  //     // link.download = `Registered_Users.xlsx`;
  //     link.download = `${eventTitle}.xlsx`;
  //     link.click();

  //     // loader("hide");
  //   } catch (err) {
  //     // loader("hide");
  //     console.log("-err", err);
  //   }
  // }
  

  const downloadStats = async (e) => {
    try {
      loader("show")
      // Create a new instance of JSZip
      const zip = new JSZip();
  
      // Make your API request to get the Excel file
      let payload = {
        'eventId': eventId
      }
      const res = await postFormData(`${ENDPOINT.WEBINAR_EVENT_STATS}`, payload, {
        responseType: "blob",
      });
      let excelSheetFileName = eventTitle.replace(/[\s:]+/g, '_');
  
      // Add the Excel file to the zip file
      zip.file(`${excelSheetFileName}.xlsx`, res.data)
    // Convert the pie chart element to PNG image
    const pieChart = document.getElementById("pieChart");
    const pieChartImageDataUrl = await domtoimage.toPng(pieChart, { cacheBust: true });

    // Convert the image data URL to a Blob
    const pieChartImageBlob = await fetch(pieChartImageDataUrl).then(res => res.blob());

    // Add the pie chart image to the zip file
    zip.file('Region_Chart.png', pieChartImageBlob);

     // Convert the online users chart element to PNG image
    const splineChart = document.getElementById("splineChart");
    const splineChartImageDataUrl = await domtoimage.toPng(splineChart, { cacheBust: true });

    // Convert the image data URL to a Blob
    const splineChartImageBlob = await fetch(splineChartImageDataUrl).then(res => res.blob());

    // Add the online users chart image to the zip file
    zip.file('Online_Users_Chart.png', splineChartImageBlob);

    for(let i=0;i<emailListData.length;i++){

      const campaignChart = document.getElementById(`analytics_campaign_${i}`);
      const campaignChartImageDataUrl = await domtoimage.toPng(campaignChart, { cacheBust: true });
  
      // Convert the image data URL to a Blob
      const campaignChartImageBlob = await fetch(campaignChartImageDataUrl).then(res => res.blob());
  
      // Add the online users chart image to the zip file
      zip.file(`${emailListData?.[i]?.subject?.trim().replace(/[^\w\s]/g, '').replace(/\s+/g, '_')}_${i}.png`, campaignChartImageBlob);
  
     }
    
      // Generate the zip file asynchronously
      zip.generateAsync({ type: "blob" })
        .then(content => {
          // Save the generated zip file using FileSaver.js
          saveAs(content, `${eventTitle.replace(/[\s:]+/g, '_')}.zip`);          
        });
        loader("hide")
  
    } catch (err) {
      console.error("Error downloading stats:", err);
      loader("hide")
    }
  }
  const downloadPopupFun = (e) => {
    setDownloadPopup(true)
  }

  const getWebinarCompaignList = async (filter = "") => {
    try {
      loader("show")
      let body = {
        user_id:localStorageUserId,
        event_id: eventId,
        search: '',
        filter: filter
      };
      axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
      let response = []
      await axios
        .post(`/webinar/get_webinar_campaign`, body)
        .then((res) => {
          response = res?.data
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
        });
      // const response = await postData(ENDPOINT.WEBINAR_EMAIL_COMPAIGN_LIST, body)
      
      setEmailListData(response?.response?.data)
      
      let updateNewOptions=[]
      response?.response?.data?.map((data,index)=>{
        let valueupdate = JSON.parse(JSON.stringify(options));
        valueupdate.xAxis.categories = ["Emails sent", "Emails opened"]
        valueupdate.series[0].data = [
          { y: data?.email_sent, color: "#8a4e9c" },
          { y: data?.email_read, color: "#ffbe2c" },
        ];
        Object.keys(data?.labels_value)?.map((item, index) => {
          valueupdate?.xAxis?.categories?.push(data?.labels[item]);
    
          let obj = {
            y: data?.labels_value[item],
            color: colorArray?.[index]
          }
          valueupdate.series[0].data.push(obj);
        })
        updateNewOptions?.push(valueupdate)

      })

      setNewOptions(updateNewOptions)
      loader("hide")
     
    } catch (err) {
      loader("hide")
      console.log("--err", err)
    }
  }

  return (
    <>
      <Col className="right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="top-header regi-web sticky">
              <div className="page-title">
                <h2>Coming Soon</h2>
                <Button
                  onClick={(e) => downloadPopupFun(e)}
                >Import File

                </Button>
              </div>
            </div>
          </div>
        </div>
      </Col>
      {/* <Modal
        className="modal send-confirm"
        id="delete-confirm"
        show={downloadPopup}
        backdrop="static"
        onHide={()=>setDownloadPopup(false)}
      >
        <Modal.Header>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={()=>setDownloadPopup(false)}
          ></button>
        </Modal.Header>

        <Modal.Body>
          <>
           
            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                onClick={downloadStats}
              >
               Download Excelsheet
              </button>
            </div>
              <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                // onClick={downloadStats}
              >
               Download Region data chart
              </button>
              </div>
              <div className="modal-buttons">
              <div className="high_charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={pieChartData}
        />
     
              </div>
              </div>
              <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-primary btn-filled"
                // onClick={downloadStats}
              >
               Download online user graph
              </button>
              </div>
              <div className="modal-buttons">
              <div className="high_charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={splineChartData}
        />     
              </div>
              </div>
          </>
        </Modal.Body>
      </Modal> */}

      <Modal
        show={downloadPopup}
        dialogClassName="modal-90w"
        onHide={() => setDownloadPopup(false)}
        className="event-stats-download"
        backdrop="static"
        >
        <Modal.Header closeButton>
          <div></div>
          <Modal.Title>{eventTitle}</Modal.Title>
          <button
            onClick={downloadStats}
            class="btn print"
            title="Download stats">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE"></path><path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE"></path></svg></button>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-height">
            <div className="d-flex align-items-center flex-column">
            <div className="high_charts" id="splineChart">
                {/* {splineChartData?.series?.[0]?.data?.length? */}
                <HighchartsReact
                  highcharts={Highcharts}
                  options={splineChartData}
                />
                {/* :<div className="no_data">No Data Found</div>} */}
              </div>
                <div className="high_charts" id="pieChart">                  
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={pieChartData}
                  />
              </div>                           
              {emailListData?.map((data,index)=>{                
                return(<>
                  <div className="analytics_campaign" id={`analytics_campaign_${index}`}>
                  <WebinarAnalyticCommonModal data={data} id={index} options={newOptions[index]}/>
                </div>
                </>)
              })}
              
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default Analytics;