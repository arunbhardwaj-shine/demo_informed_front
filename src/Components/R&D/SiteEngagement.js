import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getData, postData } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { loader } from "../../loader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SiteEngagement = ({ siteEngagementfun, setRdSiteData }) => {
  const [totalRdSiteNumber, setTotalRdSiteNumber] = useState();
  const [isHighlightNotLoaded, setIsHighlightNotLoaded] = useState(true);
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const colors = ["#39CABC", "#FFCACD", "#DECBE3", "#986CA5", "#004A89"];
  let createdBy=localStorage.getItem("user_id")=="sNl1hra39QmFk9HwvXETJA=="?2147536982:2147501188

  const [rdSiteOptions, setRdSiteOptions] = useState({
    chart: {
      type: "column",
      height: 230,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [],
      title: {
        text: "Site",
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
      align: "right",
      verticalAlign: "middle",
      layout: "verticle",
      reversed: true,
      symbolWidth: 20, // Width of the legend symbol (rectangle)
      symbolHeight: 10, // Height of the legend symbol (rectangle)
      symbolRadius: 0, // Disable rounded corners of the legend symbol
    },
    plotOptions: {
      plotOptions: {},
      series: {
        // stacking: "normal",
        pointWidth: 10,
        groupPadding: 0.45,
      },
    },
    series: [],
  });

  useEffect(() => {
    getRdSiteChartData();
  }, []);

  const tooltip = (
    <Tooltip id="tooltip">
      This chart shows the total number of non-mandatory content
    </Tooltip>
  );

  // Set your color here
  const entering = (e) => {
    e.children[0].style.borderTopColor = "#E1EEFA";
    e.children[1].style.backgroundColor = "#E1EEFA";
    e.children[1].style.color = "black";
  };

  const getRdSiteChartData = async () => {
    try {
      const result = await getData(`${ENDPOINT.RD_SITE_ENGAGEMENT}?uid=${createdBy}`);
      const data = result?.data?.data;
      // setTotalRdSiteNumber(result?.data?.total_content);
      setTotalRdSiteNumber(result?.data?.engeged_users);
      setRdSiteData(data);

      let siteUsers = [];
      let contentEngagement = [];
      let site_number = [];
      let newArr = [];

      data?.map((item, index) => {
        site_number.push(item?.site_number);
        siteUsers.push(item?.site_users);
        contentEngagement.push(item?.content_engagement);
      });

      newArr.push({
        name: "Non-mandatory content engaged with",
        data: contentEngagement,
        color: colors[2],
      });
      newArr.push({
        name: "Users in the site",
        data: siteUsers,
        color: colors[3],
      });

      const newRdSiteOptions = {
        ...rdSiteOptions,
        xAxis: {
          categories: site_number,
        },
        series: newArr,
      };
      setRdSiteOptions(newRdSiteOptions);

      // loader("hide");
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
        <div className="rd-analytics-box non-mandatory">
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
                {/* <img src={path_image + "site-engaged.svg"} alt="" /> */}
              </div>
            </div>

            <div className="graph-box">
              <>
                <div className="graph-box-inside">
                  <p>
                    <Skeleton width={200} height={20} />
                  </p>
                  <span>
                    <Skeleton width={250} height={10} />
                  </span>
                </div>
                <div style={{ width: "100%", height: 300 }}>
                  <Skeleton width={"100%"} height={300} />
                </div>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className="rd-analytics-box non-mandatory">
          <p className="rd-box-small-title">Non-mandatory Content</p>
          <div className="rd-analytics-box-layout">
            <div className="rd-analytics-top d-flex justify-content-between align-items-center">
              <h5>Site Engagement</h5>
              <div className="d-flex">
                <div className="count-number">
                  {totalRdSiteNumber ? totalRdSiteNumber : 0}
                </div>
                <OverlayTrigger
                  placement="left"
                  overlay={tooltip}
                  onEntering={entering}
                >
                  <img src={path_image + "site-engaged.svg"} alt="" />
                </OverlayTrigger>
              </div>
            </div>

            {rdSiteOptions?.series?.[0].data?.length ||
            rdSiteOptions?.series?.[1].data?.length ? (
              <>
                <div className="graph-box">
                  <div className="graph-box-inside">
                    <p>Engaging With Non-mandatory Content at each site</p>
                  </div>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={rdSiteOptions}
                  />
                </div>

                <div className="rd-box-export">
                  <img
                    src={path_image + "arrow-export.svg"}
                    alt=""
                    onClick={() => {
                      siteEngagementfun();
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
export default SiteEngagement;
