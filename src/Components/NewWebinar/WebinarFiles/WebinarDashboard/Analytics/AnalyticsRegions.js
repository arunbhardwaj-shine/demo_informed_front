import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Dropdown, Row, Tab, Tabs } from 'react-bootstrap'
import { loader } from '../../../../../loader';
import { postData } from '../../../../../axios/apiHelper';
import { toast } from "react-toastify";
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown.js";
// import customWrap from "./customWrap
exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);
const AnalyticsRegions = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [regionData, setRegionData] = useState(null);
    const { eventIdContext, handleEventId } = useSidebar();
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
    const [eventId, setEventId] = useState(eventIdContext || localStorageEvent);
    const [flag, setFlag] = useState(1);
    const commonPieOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          height: 450,
        },
        title: {
          // text: "Click on the double arrows to see more details",
          align: "left",
          style: {
            fontSize: "14px",
          },
        },
        exporting: {
          enabled: false,
          menuItemDefinitions: {
            downloadPNG: {
              text: "Download PNG",
              onclick: function () {
                this.exportChart();
              },
            },
            downloadJPEG: {
              text: "Download JPEG",
              onclick: function () {
                this.exportChart({
                  type: "image/jpeg",
                });
              },
            },
            downloadPDF: {
              text: "Download PDF",
              onclick: function () {
                this.exportChart({
                  type: "application/pdf",
                });
              },
            },
            downloadSVG: {
              text: "Download SVG",
              onclick: function () {
                this.exportChart({
                  type: "image/svg+xml",
                });
              },
            },
          },
          buttons: {
            contextButton: {
              symbol:
                "url(https://cdn3.iconfinder.com/data/icons/slicons-line-essentials/24/more_vertical-512.png)",
              menuItems: [
                "downloadPNG",
                "downloadJPEG",
                "downloadPDF",
                "downloadSVG",
              ],
            },
          },
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y}</b>",
          },
          accessibility: {
            point: {
              valueSuffix: "",
            },
          },
          legend: {
            enabled: false,
          },
          title: {text:''},
          plotOptions: {
            pie: {
              size: "100%",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.y}",
                style: {
                  fontWeight: "500",
                  color: "white",
                  textOutline: "none",
                  fontSize: "30px",
                },
                distance: 30,
                connectorPadding: 0,
              },
              animation: {
                duration: 1000,
              },
              enableMouseTracking: true,
              showInLegend: true,
              borderWidth: 0,
            },
          },
          series: [],
        };
      const [pieOptions, setPieOptions] = useState({ ...commonPieOptions });
  useEffect(() => {
    loader("show");
    getEventQuestion();
  }, [flag]);
  const getEventQuestion = async () => {
    try {
        console.log(eventId);
      const result = await postData(ENDPOINT.GET_REGION_STATS, {
        companyId: eventId?.companyId,
        eventId: eventId?.eventId,
      });
  
      if (result?.data?.data?.length === 0) {
        throw new Error("Please create the polls first");
      }
  
      const rawData = result?.data?.data;
 
 setRegionData(rawData);
      loader("hide");
    } catch (err) {
      loader("hide");
      console.error("--err", err.message);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

const renderTabContent = (regionName, seriesData, drilldownData) => {
  const registered = seriesData.find(item => item.name === 'Registered HCPs')?.y || 0;
  const attended = seriesData.find(item => item.name === 'Attended HCPs')?.y || 0;

    // Generate a unique key
    const uniqueKey = `${regionName}-highcharts-${Date.now()}`;

    return (
        <HighchartsReact
        key={uniqueKey}
        highcharts={Highcharts}
        options={{ 
          ...pieOptions, 
          series: [{ 
            name: "",
            colorByPoint: true,
            data: seriesData,
            
          }],
          title: { text: "" },
          drilldown: {
            series: drilldownData,
          },
          legend: {
            verticalAlign: "bottom",
          },
          plotOptions: {
            pie: {
              size: "100%",
              dataLabels: {
                enabled: true,
                format: "{point.y}",
                style: {
                  fontWeight: "500",
                  color: "white",
                  textOutline: "none",
                  fontSize: "30px",
                },
                distance: -70,
              },
              animation: {
                duration: 1000,
              },
              enableMouseTracking: true,
              showInLegend: true,
              borderWidth: 0,
            },
          },
          legend: {
            reversed: false,
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
            x: 0,
            y: 0,
            itemStyle: {
              fontSize: "12px", // Reduced font size
              fontWeight: "normal",
              color: "#555555",
            },
            symbolWidth: 10,
            symbolHeight: 10,
            itemDistance: 20,
            borderWidth: 0,
          },
        }}
      />
    );
};
  return (
    <>
        <Col className="right-sidebar">
            <div className="custom-container">
                <Row>
                      <div className='rd-full-explain analytics-region'>
                        <div className="rd-training-block">
                            <div className="d-flex align-items-center justify-content-between">
                                {/* <div className="rd-training-block-right d-flex">
                                        <div className="switch6">
                                            <label className="switch6-light">
                                            <input
                                                type="checkbox"
                                                // ={graphType == "pie" ? true : false}
                                                //onChange={onHandleDisplayResultChange}
                                            />
                                            <span>
                                                <span>
                                                <img src={path_image + "bar-graph-img.png"} style={{transform:'rotate(90deg)'}}/>
                                                </span>
                                                <span>
                                                <img src={path_image + "pie-img.png"} />
                                                </span>
                                            </span>
                                            <a className="btn"></a>
                                            </label>
                                        </div>
                                        <Button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE"/>
                                            </svg>
                                        </Button>
                                    </div> */}
                            </div>
                            <div className="country_tabs">
                                <Tabs
                                    defaultActiveKey="Other"
                                    className=""
                                    fill
                                >
                                
                                    {/* <Tabs defaultActiveKey={regionData && Object.keys(regionData)[0]} className="" fill> */}
  {regionData && Object.keys(regionData).map((regionName) => (
    <Tab key={regionName} eventKey={regionName} title={regionName.toUpperCase()}>
          <div className='tabs-data'>
                                              <div className="d-flex align-items-center justify-content-between">
                                                  <div className="rd-training-block-left">
                                                      <h4>Total registered & Attended HCPs</h4>
                                                  </div>
                                                  <div className="rd-training-block-right d-flex">
                                                      <div className="switch6">
                                                          <label className="switch6-light">
                                                              <input
                                                                  type="checkbox"
                                                              // ={graphType == "pie" ? true : false}
                                                              //onChange={onHandleDisplayResultChange}
                                                              />
                                                              <span>
                                                                  <span>
                                                                      <img src={path_image + "bar-graph-img.png"} style={{ transform: 'rotate(90deg)' }} />
                                                                  </span>
                                                                  <span>
                                                                      <img src={path_image + "pie-img.png"} />
                                                                  </span>
                                                              </span>
                                                              <a className="btn"></a>
                                                          </label>
                                                      </div>
                                                      <Dropdown>
                                                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                              <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width="6"
                                                                  height="24"
                                                                  viewBox="0 0 6 24"
                                                                  fill="none"
                                                              >
                                                                  <path
                                                                      fill-rule="evenodd"
                                                                      clip-rule="evenodd"
                                                                      d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z"
                                                                      fill="#0066BE"
                                                                  />
                                                              </svg>
                                                          </Dropdown.Toggle>

                                                          <Dropdown.Menu>
                                                              <Dropdown.Item>Download PNG</Dropdown.Item>
                                                              <Dropdown.Item>Download JPEG</Dropdown.Item>
                                                              <Dropdown.Item>Download PDF</Dropdown.Item>
                                                              <Dropdown.Item>Download SVG</Dropdown.Item>
                                                          </Dropdown.Menu>
                                                      </Dropdown>
                                                      {/* <Button>
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none">
                                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" />
                                                          </svg>
                                                      </Button> */}
                                                  </div>
                                              </div>
                                                    <div className="graph-view">

          {renderTabContent(regionName, regionData[regionName].seriesData, regionData[regionName].drilldownData)}
          </div>
          </div>

        </Tab>
      ))}
    {/* </Tabs> */}
                                </Tabs>
                                
                                                   
                            </div>
                        </div>  
                      </div>
                </Row>
            </div>
        </Col>
    </>
  )
}

export default AnalyticsRegions