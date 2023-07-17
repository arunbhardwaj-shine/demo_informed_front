import React, { useEffect, useRef, useState } from "react";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PopularContent = ({
  mostPopularContentFn,
  setMostPopularContentData,
  topContentTableFn,
}) => {
  const [pieData, setPieData] = useState({});
  const [mostPopularContentDataChild, setMostPopularContentDataChild] =
    useState([]);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  // const colors = ["#39CABC", "#FFCACD", "#DECBE3", "#986CA5", "#004A89"];
  const color = ["#fee9b9", "#fec037", "#e4a923", "#c28b0c"];
  const [isHighlightNotLoaded, setIsHighlightNotLoaded] = useState(true);
  const [popularPieOptions, setPopularPieOptions] = useState({
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
          enabled: false,
          format: "{point.y}",
          style: {
            fontWeight: "bold",
            color: "white",
            textOutline: "none",
            // fontSize: "30px",
          },
          distance: -40, // Adjust the distance of the data labels from the center
        },

        animation: {
          duration: 1000,
        },

        enableMouseTracking: true,
        // showInLegend: true,
      },
    },
    series: [],
  });

  useEffect(() => {
    getMostPopularData();
  }, []);

  const tooltip = (
    <Tooltip id="tooltip">
      This chart shows the sites that have users who viewed the 1top content
    </Tooltip>
  );

  const getMostPopularData = async () => {
    try {
      const result = await postData(ENDPOINT.MOST_POPULAR_CONTENT);
      const data = result?.data?.data;

      setMostPopularContentData(data.pdf_data);
      setMostPopularContentDataChild(data.pdf_data);

      // data?.site_graph?.data?.map((item,index)=>{

      // })
      setPopularPieOptions({
        ...popularPieOptions,
        series: [
          {
            name: "",
            colorByPoint: true,
            data: data?.site_graph_data,
          },
        ],
      });
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
        <div className="rd-analytics-box rd-content">
          <p className="rd-box-small-title">
            <Skeleton width={150} height={15} />
          </p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top d-flex justify-content-between align-items-center">
              <h5>
                <Skeleton width={150} height={18} />
              </h5>
              <div className="d-flex">
                <div className="count-number">
                  <Skeleton width={50} height={18} />
                </div>
                {/* <img src={path_image + "content-view.svg"} alt="" /> */}
              </div>
            </div>

            <div className="graph-box">
              <>
                <div className="graph-box-inside">
                  <p>
                    <Skeleton width={200} height={15} />
                  </p>
                  {/* <span>
                    <Skeleton width={250} height={8} />
                  </span> */}
                </div>
                {/* <div className="popular-tooltip">
                <img src={path_image + "tooltip-img.svg"} alt="" />
              </div> */}
              </>

              <div style={{ width: "100%", height: 220 }}>
                <Skeleton height={220} width={220} circle={true} />
              </div>

              <div className="lex-article">
                {[1, 2, 3].map((item, index) => (
                  <div key={index} className="d-flex lex-article-box">
                    <div className="lex-image">
                      {/* <div className="article-number">{index + 1}</div> */}
                      <Skeleton width={30} height={30} circle={true} />
                    </div>
                    <div className="lex-detail">
                      <p>
                        <Skeleton width={150} height={8} />
                      </p>
                      <span>
                        <Skeleton width={200} height={8} />
                      </span>
                      <div className="d-flex justify-content-between">
                        <div className="pages-number">
                          {/* Pages: */}
                          <span>
                            <Skeleton width={50} height={5} />
                          </span>
                        </div>
                        <div className="pages-viewer">
                          <Skeleton width={50} height={8} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rd-box-export">
              {/* <img
                src={path_image + "arrow-export.svg"}
                alt=""
                onClick={() => {
                  mostPopularContentFn();
                }}
              /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="rd-analytics-box rd-content">
          <p className="rd-box-small-title">Content</p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top d-flex justify-content-between align-items-center">
              <h5>Most Popular content</h5>
              <div className="d-flex">
                <div className="count-number">
                  {mostPopularContentDataChild &&
                  mostPopularContentDataChild.length > 0
                    ? mostPopularContentDataChild[0].watched_count
                    : 0}
                </div>
                <img src={path_image + "content-view.svg"} alt="" />
              </div>
            </div>

            <div className="graph-box">
              {!isHighlightNotLoaded && (
                <>
                  <div className="graph-box-inside">
                    <p>Sites who Read | Watch The Top Content</p>
                  </div>
                  <div className="popular-tooltip">
                    <OverlayTrigger placement="left" overlay={tooltip}>
                      <img src={path_image + "tooltip-img.svg"} alt="" />
                    </OverlayTrigger>
                  </div>
                </>
              )}

              <HighchartsReact
                highcharts={Highcharts}
                options={popularPieOptions}
              />
              {/* <div className="rd-midbox-export">
              <img
                src={path_image + "arrow-export.svg"}
                alt=""
                onClick={() => {
                  topContentTableFn();
                }}
              />
              </div> */}
              <div className="">
                <p>The Top 3 content</p>
              </div>

              <div className="lex-article">
                {mostPopularContentDataChild
                  ?.slice(0, 3)
                  ?.map((item, index) => (
                    <div key={index} className="d-flex lex-article-box">
                      <div className="lex-image">
                        <div className="article-number">{index + 1}</div>
                        <img src={item?.article_image} alt="" />
                      </div>
                      <div className="lex-detail">
                        <p>{item.pdf.title}</p>
                        <span>{item?.pdf?.pdf_sub_title}</span>
                        <div className="d-flex justify-content-between">
                          <div className="pages-number">
                            {item?.total_pages || item?.total_pages == 0
                              ? "Pages:"
                              : "Time:"}
                            <span>
                              {item?.total_pages || item?.total_pages == 0
                                ? item.total_pages
                                : item?.max_time}
                            </span>
                          </div>
                          <div className="pages-viewer">
                            {item.watched_count}{" "}
                            <img src={path_image + "viewer.svg"} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="rd-box-export">
              <img
                src={path_image + "arrow-export.svg"}
                alt=""
                onClick={() => {
                  mostPopularContentFn();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PopularContent;
