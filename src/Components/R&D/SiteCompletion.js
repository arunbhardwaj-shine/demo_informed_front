import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { loader } from "../../loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SiteCompletion = ({ siteCompletionfn }) => {
  const [totalSiteNumber, setTotalSiteNumber] = useState();
  const [sortSite, setSortSite] = useState(false);
  const [isHighlightNotLoaded, setIsHighlightNotLoaded] = useState(true);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  const [columnOptions, setColumnOptions] = useState({
    chart: {
      type: "column",
      height: 250,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [],
      title: {
        text: "",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    exporting: {
      enabled: false,
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
    legend: {
      verticalAlign: "bottom",
      reversed: true,
      symbolWidth: 20, // Width of the legend symbol (rectangle)
      symbolHeight: 10, // Height of the legend symbol (rectangle)
      symbolRadius: 0, // Disable rounded corners of the legend symbol
    },
    plotOptions: {
      series: {
        stacking: "normal",
        pointWidth: 10,
      },
    },
    series: [],
  });

  useEffect(() => {
    initialFun();
  }, []);

  const initialFun = async () => {
    try {
      const result = await getData(ENDPOINT.SITEREGISTER);
      const data = result?.data?.data?.registered_irt;
      setTotalSiteNumber(result?.data?.total_sites);

      const newSeries = data?.map((item, index) => {
        return {
          name: item.name,
          data: item.data,
        };
      });

      // Sort the newSeries array based on the maximum data
      newSeries.sort((a, b) => {
        const maxDataA = Math.max(...a.data);
        const maxDataB = Math.max(...b.data);
        return maxDataB - maxDataA;
      });

      const columnCategories = result?.data?.data?.site_numbers;

      const newColumnOptions = {
        ...columnOptions,
        xAxis: {
          categories: columnCategories,
        },
        series: newSeries,
      };
      setColumnOptions(newColumnOptions);
    } catch (err) {
      loader("hide");
      console.log("--err", err);
    } finally {
      setIsHighlightNotLoaded(false);
    }
  };

  const handleCheckboxClick = async (sort) => {
    try {
      console.log("--->", sort);
      const result = await postData(ENDPOINT.SITEREGISTERSORT, { sort: sort });

      const data = result?.data?.data?.registered_irt;
      setTotalSiteNumber(result?.data?.total_sites);

      const newSeries = data?.map((item, index) => {
        return {
          name: item.name,
          data: item.data,
        };
      });

      const columnCategories = result?.data?.data?.site_numbers;

      const newColumnOptions = {
        ...columnOptions,
        xAxis: {
          categories: columnCategories,
        },
        series: newSeries,
      };
      setColumnOptions(newColumnOptions);
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
        <div className="rd-analytics-box sites">
          <p className="rd-box-small-title">
            <Skeleton width={150} height={20} />
          </p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top d-flex justify-content-between align-items-center">
              <h5>
                <Skeleton width={150} height={20} />
              </h5>
              <div className="d-flex">
                <div className="count-number">
                  <Skeleton width={50} height={20} />
                </div>
                {/* <img src={path_image + "hospital.svg"} alt="" /> */}
              </div>
            </div>

            <div className="graph-box">
              <div className="d-flex justify-content-between align-items-center">
                <div className="">
                  <p>
                    <Skeleton width={200} height={20} />
                  </p>
                  <span>
                    <Skeleton width={250} height={10} />
                  </span>
                </div>
                <div className="switch6">
                  <label className="switch6-light">
                    <input type="checkbox" disabled />
                    <span>
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Switch On Icon */}
                        </svg>
                      </span>
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Switch Off Icon */}
                        </svg>
                      </span>
                    </span>
                    <a className="btn btn-primary"></a>
                  </label>
                </div>
              </div>

              <div style={{ width: "100%", height: 300 }}>
                <Skeleton width={"100%"} height={300} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rd-analytics-box sites">
          <p className="rd-box-small-title">Sites</p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top d-flex justify-content-between align-items-center">
              <h5>Site Completion</h5>
              <div className="d-flex">
                <div className="count-number">{totalSiteNumber}</div>
                <img src={path_image + "hospital.svg"} alt="" />
              </div>
            </div>

            {columnOptions?.series?.length ? (
              <>
                <div className="graph-box">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                      <p>Registered IRTs at each site</p>
                    </div>
                    <div className="switch6">
                      <label
                        className={`switch6-light${sortSite ? " active" : ""}`}
                      >
                        <input
                          type="checkbox"
                          onChange={() => {
                            setIsHighlightNotLoaded(true);
                            handleCheckboxClick(!sortSite);
                            setSortSite(!sortSite);
                          }}
                        />
                        <span>
                          <span>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.38984 0C9.19775 0 9.04202 0.154607 9.04202 0.345325V2.58985H7.30435C6.632 2.58985 6.08696 3.13098 6.08696 3.79849V9.49635H2.08696C1.41461 9.49635 0.869565 10.0375 0.869565 10.705V22.7914C0.869565 22.9767 0.911599 23.1524 0.986719 23.3094H0.347826C0.155727 23.3094 0 23.464 0 23.6547C0 23.8454 0.155727 24 0.347826 24H23.6522C23.8443 24 24 23.8454 24 23.6547C24 23.464 23.8443 23.3094 23.6522 23.3094H23.1872C23.2623 23.1524 23.3043 22.9767 23.3043 22.7914V10.705C23.3043 10.0375 22.7593 9.49635 22.087 9.49635H17.913V3.79849C17.913 3.13098 17.368 2.58985 16.6957 2.58985H14.9565V3.2805H16.8696C17.1577 3.2805 17.3913 3.51241 17.3913 3.79849V22.7914C17.3913 23.0774 17.1577 23.3094 16.8696 23.3094H14.6087V17.7842C14.6087 17.5934 14.453 17.4388 14.2609 17.4388H9.91304C9.72094 17.4388 9.56522 17.5934 9.56522 17.7842V23.3094H7.13043C6.84229 23.3094 6.6087 23.0774 6.6087 22.7914V3.79849C6.6087 3.51241 6.84229 3.2805 7.13043 3.2805H9.04202V5.5252C9.04202 5.71592 9.19775 5.87052 9.38984 5.87052H14.6072C14.7993 5.87052 14.9551 5.71592 14.9551 5.5252V0.345325C14.9551 0.154607 14.7993 0 14.6072 0H9.38984ZM14.0628 3.48443C14.0628 3.58665 13.9705 3.66926 13.8563 3.66926H12.7361V4.78831C12.7361 4.90183 12.6534 4.99513 12.5517 4.99513H11.4464C11.3447 4.99513 11.262 4.90301 11.262 4.78831V3.66926H10.1418C10.0288 3.66926 9.93596 3.58665 9.93596 3.48443V2.38082C9.93596 2.2786 10.0288 2.19659 10.1418 2.19659H11.262V1.07694C11.262 0.963427 11.3447 0.87012 11.4464 0.87012H12.5517C12.6529 0.87012 12.7361 0.962237 12.7361 1.07694V2.19659H13.8563C13.9705 2.19659 14.0628 2.2786 14.0628 2.38082V3.48443Z"
                                fill="#0066BE"
                              />
                              <path
                                d="M8.86957 8.63304C8.67747 8.63304 8.52174 8.78765 8.52174 8.97836V10.705C8.52174 10.8957 8.67747 11.0503 8.86957 11.0503H10.6087C10.8008 11.0503 10.9565 10.8957 10.9565 10.705V8.97836C10.9565 8.78765 10.8008 8.63304 10.6087 8.63304H8.86957Z"
                                fill="#0066BE"
                              />
                              <path
                                d="M8.52174 13.2949C8.52174 13.1042 8.67747 12.9496 8.86957 12.9496H10.6087C10.8008 12.9496 10.9565 13.1042 10.9565 13.2949V15.0216C10.9565 15.2123 10.8008 15.3669 10.6087 15.3669H8.86957C8.67747 15.3669 8.52174 15.2123 8.52174 15.0216V13.2949Z"
                                fill="#0066BE"
                              />
                              <path
                                d="M13.0435 8.97836C13.0435 8.78765 13.1992 8.63304 13.3913 8.63304H15.1304C15.3225 8.63304 15.4783 8.78765 15.4783 8.97836V10.705C15.4783 10.8957 15.3225 11.0503 15.1304 11.0503H13.3913C13.1992 11.0503 13.0435 10.8957 13.0435 10.705V8.97836Z"
                                fill="#0066BE"
                              />
                              <path
                                d="M13.0435 13.2949C13.0435 13.1042 13.1992 12.9496 13.3913 12.9496H15.1304C15.3225 12.9496 15.4783 13.1042 15.4783 13.2949V15.0216C15.4783 15.2123 15.3225 15.3669 15.1304 15.3669H13.3913C13.1992 15.3669 13.0435 15.2123 13.0435 15.0216V13.2949Z"
                                fill="#0066BE"
                              />
                            </svg>
                          </span>
                          <span>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.9022 12.7158C15.4135 12.7158 18.2601 9.86924 18.2601 6.35788C18.2601 2.84652 15.4135 0 11.9022 0C8.39081 0 5.54429 2.84652 5.54429 6.35788C5.54429 9.86924 8.39081 12.7158 11.9022 12.7158Z"
                                fill="#0066BE"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19.133 13.2823C19.3757 13.8414 19.5167 14.5256 19.5476 15.3171C20.3648 15.5038 20.977 16.2348 20.977 17.1086C20.977 18.1229 20.1518 18.9487 19.1375 18.9487C18.1233 18.9487 17.298 18.124 17.298 17.1086C17.298 16.2463 17.8965 15.5221 18.6995 15.3251C18.6641 14.5387 18.4762 13.3428 17.7075 12.7529C17.3152 12.6507 16.9114 12.577 16.4974 12.5399C16.4665 13.9162 11.9161 17.3136 11.9161 17.3136C11.9161 17.3136 7.36443 13.9173 7.3336 12.5393C6.87386 12.5816 6.42613 12.6661 5.99381 12.7866C5.43242 13.2309 5.14231 14.059 5.12746 15.2623C5.29251 15.3571 5.42557 15.505 5.50781 15.6837C6.11203 15.9693 6.64657 16.5701 7.0549 17.425C7.12343 17.5689 7.132 17.7317 7.08174 17.8802C7.32674 18.5107 7.46666 19.2011 7.46666 19.7785C7.46666 20.5906 7.46666 21.3576 6.58261 21.554C6.48666 21.6345 6.3673 21.6779 6.24109 21.6779H5.65001C5.35361 21.6779 5.11261 21.4358 5.11261 21.1405L5.11432 21.1028C5.13431 20.8253 5.36903 20.6031 5.65001 20.6031H6.24109C6.30106 20.6031 6.36045 20.614 6.41756 20.6334C6.45354 20.6231 6.46496 20.6157 6.46496 20.6157C6.53121 20.4992 6.53121 20.0132 6.53121 19.7802C6.53121 19.3102 6.41299 18.7425 6.20683 18.2143C6.10003 18.1543 6.0138 18.0612 5.96011 17.9504C5.60204 17.2006 5.1149 16.7157 4.71856 16.7157C4.31422 16.7157 3.80252 17.2394 3.44559 18.0178C3.38734 18.1457 3.28511 18.2485 3.15947 18.3108C2.97329 18.8156 2.87107 19.3353 2.87107 19.7802C2.87107 19.9761 2.87107 20.4958 2.94588 20.618C2.94588 20.618 2.94612 20.6181 2.94644 20.6182L2.94699 20.6185C2.95139 20.6207 2.96924 20.6298 3.00984 20.6397C3.07095 20.6163 3.13663 20.6037 3.2023 20.6037H3.79396C4.06751 20.6037 4.29595 20.8099 4.32736 21.0789L4.33021 21.0846L4.33135 21.1205C4.33135 21.4381 4.09035 21.6797 3.79396 21.6797H3.20287C3.08523 21.6797 2.97158 21.6408 2.87849 21.5689C2.5404 21.506 2.30226 21.3564 2.15092 21.1137C1.96874 20.8196 1.93504 20.4352 1.93504 19.7808C1.93504 19.2068 2.06754 18.5466 2.30797 17.9161C2.27256 17.7814 2.28398 17.6403 2.34338 17.5124C2.59352 16.9647 2.91276 16.4964 3.26455 16.156C3.45758 15.9699 3.66603 15.8202 3.88362 15.71C3.96528 15.5193 4.10691 15.3645 4.27939 15.2651C4.28852 14.5113 4.40445 13.8597 4.61862 13.3234C2.16348 14.5661 0.480469 17.1143 0.480469 20.0566C0.480469 23.8167 3.22743 24 6.82304 24C7.01698 24 7.21329 23.9994 7.41183 23.9989C7.61495 23.9983 7.8204 23.9977 8.02804 23.9977H15.8006C16.0078 23.9977 16.2129 23.9983 16.4157 23.9989C16.6143 23.9994 16.8107 24 17.0051 24C20.6012 24 23.3493 23.8167 23.3493 20.0566C23.3499 17.0841 21.6309 14.513 19.133 13.2823ZM17.8577 20.8516C17.8577 20.9498 17.7692 21.0292 17.6595 21.0292H16.5842V22.1045C16.5842 22.2136 16.5048 22.3033 16.4071 22.3033H15.346C15.2484 22.3033 15.169 22.2148 15.169 22.1045V21.0292H14.0936C13.9851 21.0292 13.896 20.9498 13.896 20.8516V19.791C13.896 19.6928 13.9851 19.614 14.0936 19.614H15.169V18.5381C15.169 18.429 15.2484 18.3393 15.346 18.3393H16.4071C16.5042 18.3393 16.5842 18.4278 16.5842 18.5381V19.614H17.6595C17.7692 19.614 17.8577 19.6928 17.8577 19.791V20.8516Z"
                                fill="#0066BE"
                              />
                              <path
                                d="M19.137 17.9573C19.6057 17.9573 19.9856 17.5773 19.9856 17.1086C19.9856 16.6399 19.6057 16.26 19.137 16.26C18.6683 16.26 18.2883 16.6399 18.2883 17.1086C18.2883 17.5773 18.6683 17.9573 19.137 17.9573Z"
                                fill="#0066BE"
                              />
                            </svg>
                          </span>
                        </span>
                        <a className="btn btn-primary"></a>
                      </label>
                    </div>
                  </div>

                  <HighchartsReact
                    highcharts={Highcharts}
                    options={columnOptions}
                  />
                </div>

                <div className="rd-box-export">
                  <img
                    src={path_image + "arrow-export.svg"}
                    alt=""
                    onClick={() => {
                      siteCompletionfn();
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
export default SiteCompletion;
