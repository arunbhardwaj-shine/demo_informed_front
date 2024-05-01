import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { postData } from "../../../../../axios/apiHelper";
import { loader } from "../../../../../loader";
import { ENDPOINT } from "../../../../../axios/apiConfig";
import { useSidebar } from "../../../../CommonComponent/LoginLayout";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const AnalyticsOverview = ({dropdownClicked,setEventData}) => {
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const { eventIdContext, handleEventId } = useSidebar();
  const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
  const [eventId, setEventId] = useState(
    eventIdContext?.eventId || localStorageEvent?.eventId
  );
  const [overviewData, setOverviewData] = useState([]);
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        loader("show");
        const body = { eventId };
        const response = await postData(ENDPOINT.GET_OVERVIEW_DATA, body);
        const result = response?.data?.data;
        setOverviewData(result);

        loader("hide");
      } catch (error) {
        loader("hide");
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, [eventId]);
  return (
    <>
      <div className="rd-analytics-box">
        <p class="rd-box-small-title">Overview</p>
        <div className="rd-analytics-box-layout">
          <div className="rd-analytics-top align-items-center d-flex">
            <h6 className="mr-auto">Overview</h6>
          </div>
          <div className="graph-box">
            <div className="highchart-chart">
            <HighchartsReact
    key={"overview"}
    highcharts={Highcharts}
    options={{
        chart: {
            type: "bar",
            // width: 316,
            height: 315, // Decrease the height of the chart
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70,
            },
        },
        title: {
          text: "Click on the double arrows to see more details",
          align: "left",
          style: {
              fontSize: "12px" ,// Decreased font size
              color: "#97B6CF",
          }
      },
        xAxis: {
            categories: [""], // Empty category array
            labels: {
                align: "center",
                reserveSpace: true,
                y: 20, // Adjust the vertical position of the labels
                formatter: function () {
                    return this.value.name; // Display the name property of the data point
                },
            },
            lineColor: 'rgba(151, 182, 207, 0.30)', // X-axis line color
            lineWidth: 2, // X-axis line width
        },
        yAxis: {
            title: {
                text: null,
            },
            lineColor: 'rgba(151, 182, 207, 0.30)', // Y-axis line color
            lineWidth: 2, // Y-axis line width
        },
        tooltip: {},
        plotOptions: {
            series: {
                pointWidth: 30, // Adjust the width of the bars
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
                        fontWeight: "normal",
                        textShadow: "none",
                    },
                },
            },
        },
        exporting: {
            sourceWidth: 1600,
            sourceHeight: 1200,
          enabled: true,
          chartOptions: {
              title: {
                  text: '' // Remove title from exported image
              }
          },
          filename: 'Overview', // Set filename for exported image
          menuItemDefinitions: {
              downloadPNG: {
                  text: 'Download PNG',
                  onclick: function() {
                      this.exportChart({
                          type: 'image/png'
                      });
                  }
              },
              downloadJPEG: {
                  text: 'Download JPEG',
                  onclick: function() {
                      this.exportChart({
                          type: 'image/jpeg'
                      });
                  }
              },
              downloadPDF: {
                  text: 'Download PDF',
                  onclick: function() {
                      this.exportChart({
                          type: 'application/pdf'
                      });
                  }
              },
              downloadSVG: {
                  text: 'Download SVG',
                  onclick: function() {
                      this.exportChart({
                          type: 'image/svg+xml'
                      });
                  }
              }
          },
          buttons: {
              contextButton: {
                  symbol: 'url(https://docintel.app/img/octa/e-templates/options-btn.svg)',
                  menuItems: [
                      "downloadPNG",
                      "downloadJPEG",
                      "downloadPDF",
                      "downloadSVG"
                  ]
              }
          }
      },
        series: overviewData,
    }}
/>

            </div>
            <div className="rd-box-export">
              <img
                src={path_image + "arrow-export.svg"}
                alt=""
                onClick={()=>dropdownClicked("overView")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsOverview;
