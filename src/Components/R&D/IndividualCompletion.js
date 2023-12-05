import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { loader } from "../../loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IndividualCompletion = ({ individualCompletionfn }) => {
  const [pieData, setPieData] = useState({});

  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [isHighlightNotLoaded, setIsHighlightNotLoaded] = useState(true);
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
    getPieChartData();
  }, []);

  const tooltip = (
    <Tooltip id="tooltip">
     This chart shows the total number of IRTs who participated in the training
    </Tooltip>
  );

// Set your color here
const entering = (e) => {
  e.children[0].style.borderTopColor = '#E1EEFA';
  e.children[1].style.backgroundColor = '#E1EEFA';
  e.children[1].style.color = 'black'; 
};

  const getPieChartData = async () => {
    try {
      const result = await getData(ENDPOINT.IRT_COUNT_GRAPH);
      setPieData({
        completed: result?.data?.data?.completed,
        notcompleted: result?.data?.data?.notcompleted,
        total: result?.data?.data?.total,
        pending: result?.data?.data?.pending,
      });
      let newValue = [
        {
          name: "",
          colorByPoint: true,
          data: [
            {
              name: "Completed",
              y: result?.data?.data?.completed
                ? result?.data?.data?.completed
                : 0,

              color: colors[0],
            },
            {
              name: "Started",
              y: result?.data?.data?.notcompleted
                ? result?.data?.data?.notcompleted
                : 0,

              color: '#FFBE2C',
            },
            {
              name: "Ignored",
              y: result?.data?.data?.pending
                ? result?.data?.data?.pending
                : 0,

              color: '#f58289',
            },
          ],
        },
      ];

      const newPieOptions = {
        ...pieOptions,
        series: newValue,
      };
      setPieOptions(newPieOptions);
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    } finally {
      setIsHighlightNotLoaded(false);
    }
  };

  return (
    <>
      {isHighlightNotLoaded ? (
        <div className="rd-analytics-box irt">
          <p className="rd-box-small-title">
            <Skeleton width={150} height={20} />
          </p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top d-flex justify-content-between align-items-center">
              <h5 className="mr-auto">
                <Skeleton width={150} height={20} />
              </h5>
              <div className="d-flex">
                <div className="count-number">
                  <Skeleton width={50} height={20} />
                </div>
                {/* <img src={path_image + "doctor-svg.svg"} alt="" className="doctor" /> */}
              </div>
            </div>

            <div className="graph-box">
              <div className="">
                <p>
                  <Skeleton width={200} height={20} />
                </p>
                <span>
                  <Skeleton width={250} height={10} />
                </span>
              </div>

              <div style={{ width: "100%", height: 200 }}>
                <Skeleton circle={true} height={200} width={200} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rd-analytics-box irt">
          <p className="rd-box-small-title">IRT Training</p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top d-flex justify-content-between align-items-center">
              <h5 className="mr-auto">Individual Completion</h5>
              <div className="d-flex">
                <div className="count-number">
                  {pieData.total ? pieData.total : ""}
                </div>
                <OverlayTrigger placement="left" overlay={tooltip} onEntering={entering}>
                <img
                  src={path_image + "doctor-svg.svg"}
                  alt=""
                  class="doctor"
                />
                </OverlayTrigger>
              </div>
            </div>

            {pieOptions?.series?.[0]?.data?.[0].y ||
            pieOptions?.series?.[0]?.data?.[1].y ? (
              <>
                <div className="graph-box">
                  <div className="">
                    <p>Completing the mandatory training</p>
                  </div>

                  <HighchartsReact
                    highcharts={Highcharts}
                    options={pieOptions}
                  />
                </div>

                <div className="rd-box-export">
                  <img
                    src={path_image + "arrow-export.svg"}
                    alt=""
                    onClick={() => {
                      individualCompletionfn();
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="no_found">
                <p>No Data Found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default IndividualCompletion;
