import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
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
      },
    },
    series: [],
  });

  useEffect(() => {
    getPieChartData();
  }, []);

  const getPieChartData = async () => {
    try {
      const result = await getData(ENDPOINT.IRT_COUNT_GRAPH);
      setPieData({
        completed: result?.data?.data?.completed,
        notcompleted: result?.data?.data?.notcompleted,
        total: result?.data?.data?.total,
      });
      let newValue = [
        {
          name: "",
          colorByPoint: true,
          data: [
            {
              name: "Completed",
              y: result?.data?.data?.completed,

              color: colors[0],
            },
            {
              name: "Not Completed",
              y: result?.data?.data?.notcompleted,

              color: colors[1],
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
            <Skeleton width={150} height={15} />
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
                {/* <span><Skeleton width={250} height={10} /></span> */}
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
                <div className="count-number">{pieData.total}</div>
                <img
                  src={path_image + "doctor-svg.svg"}
                  alt=""
                  class="doctor"
                />
              </div>
            </div>

            <div className="graph-box">
              <div className="">
                <p>Completing the mandatory training</p>
              </div>

              <HighchartsReact highcharts={Highcharts} options={pieOptions} />
            </div>
            {pieOptions?.series?.length ? (
              <div className="rd-box-export">
                <img
                  src={path_image + "arrow-export.svg"}
                  alt=""
                  onClick={() => {
                    individualCompletionfn();
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
export default IndividualCompletion;
