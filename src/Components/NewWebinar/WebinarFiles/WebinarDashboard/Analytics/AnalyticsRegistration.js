import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { postData } from '../../../../../axios/apiHelper';
import { loader } from '../../../../../loader';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AnalyticsRegistration = () => {
    const { eventIdContext, handleEventId } = useSidebar();
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
    const [eventId, setEventId] = useState(
      eventIdContext?.eventId
        ? eventIdContext?.eventId
        : localStorageEvent?.eventId
    );

const [pieChartData,setPieChartData]=useState([])
const colors = ["#39CABC", "#FFCACD", "#DECBE3", "#986CA5", "#004A89"];



const [pieOptions, setPieOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      //size: "80"
      height: 250,
    },
    title: {
      text: "",
      align: "left",
    },
    exporting: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      verticalAlign: "bottom",
      // reversed: true,
    },
    plotOptions: {
      pie: {
        size: "80%",
        // innerSize: "65%",
        dataLabels: {
          enabled: true,
          format: "{point.y}",
          style: {
            fontWeight: "bold",
            color: "white",
            textOutline: "none",
            fontSize: "20px",
          },
          distance: -40, // Adjust the distance of the data labels from the center
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
  });

useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        loader("show"); // Show loader while the API request is in progress

        // Prepare the request body
        const body = {
          eventId: eventId,
        };

        // Make API request using your custom postData function
        const response = await postData(
          ENDPOINT.GET_TOTAL_EMAIL_REGISTRATION_COUNT,
          body
        );
        const result=response?.data?.data;
        // Update component state with the received data
        setPieChartData(result);

        let newValue = [
            {
              name: "",
              colorByPoint: true,
              data: [
                {
                  name: "HCP",
                  y: result?.hcpUsers
                    ? result?.hcpUsers
                    : 0,
    
                  color: colors[0],
                },
                {
                  name: "STAFF",
                  y: result?.staffUsers
                    ? result?.staffUsers
                    : 0,
    
                  color: '#FFBE2C',
                },
              ],
            },
          ];
    
          const newPieOptions = {
            ...pieOptions,
            series: newValue,
          };
          setPieOptions(newPieOptions);

        loader("hide"); // Hide loader after the API request is complete
      } catch (error) {
        loader("hide"); // Hide loader in case of error
        console.error('Error fetching analytics data:', error);
      }
    };

    // Call the fetchAnalyticsData function when the component mounts
    fetchAnalyticsData();
  }, []);
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  return (
    <>
        <div className='rd-analytics-box'>
              <p class="rd-box-small-title">Registration</p>
              <div className='rd-analytics-box-layout d-flex justify-content-between align-items-start'>
                <Col md={3}>
                    <div className="rd-analytics-top d-flex justify-content-between align-items-center" >
                        <h6 className="regi-title">
                            Total Registrations
                        </h6>
                        <div className="d-flex">
                            <div className="count-number">
                                {pieChartData?.totalUsers}
                            </div>
                              <img src={path_image + "crm.svg"} alt="CRM" className="CRM" />
                        </div>
                    </div>
                    <div className='graph-box'>
                        <div className='highchart-chart'>
                            {/* <img src={path_image + "total-registration-analytics.png"} alt="" /> */}
                            <HighchartsReact
                    highcharts={Highcharts}
                    options={pieOptions}
                  />
                        </div>
                          <div className="rd-box-export">
                              <img
                                  src={path_image + "arrow-export.svg"}
                                  alt=""
                              //   onClick={() => {
                              //       individualCompletionfn();
                              //   }}
                              />
                          </div>
                    </div>
                      
                  </Col>
                  <Col md={9}>
                    <div className="rd-analytics-top d-flex justify-content-between align-items-center" >
                        <h6 className="regi-hcp">
                            Registered HCPs
                        </h6>
                        <div className="d-flex">
                            <div className="count-number">
                                94
                            </div>
                              <img src={path_image + "irt.svg"} alt="" className="doctor" />
                        </div>
                    </div>
                        <div className='graph-box d-flex justify-content-between'>
                            <div className='highchart-chart left-side'>
                              <img src={path_image + "registered-hcp-analytics.png"} alt="" />
                              <div className="rd-box-export">
                                  <img
                                      src={path_image + "arrow-export.svg"}
                                      alt=""
                                  //   onClick={() => {
                                  //       individualCompletionfn();
                                  //   }}
                                  />
                              </div>
                            </div>
                          
                          <div className='highchart-chart right-side'>
                              <img src={path_image + "registered-overtime-analytics.png"} alt="" />
                          </div>
                        </div>
                  </Col>
              </div>

        </div>
    </>
  )
}

export default AnalyticsRegistration