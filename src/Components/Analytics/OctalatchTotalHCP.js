import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ENDPOINT } from "../../axios/apiConfig";
import { getData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import axios from "axios";
import { loader } from "../../loader";

exporting(Highcharts);
exportData(Highcharts);

// base bar highchart
const OctalatchTotalHCP = () => {
  const [isDataNotFound, setIsDataNotFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [getMonth, setMonth] = useState([]);
  const [totalReaders, setTotalReaders] = useState(0);

  const [hcpOptions, setHcpOptions] = useState({
    chart: {
      type: "bar",
      height: 1000,
    },
    title: {
      text: "Total HCPs",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      title: {
        text: "HCP",
      },
      stackLabels: {
        enabled: true,
      },
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      x: 0,
      y: 0,
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        pointWidth: 30,
      },
    },
    // exporting: {
    //   showTable: true,
    // },
    series: [],
  });

  // base line highchart
  const [lineOptions, setLineOptions] = useState({
    chart: {
      type: "line",
      height: 500,
    },
    title: {
      text: "Total HCPs",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      title: {
        text: "HCP",
      },
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      x: 0,
      y: 0,
    },
    plotOptions: {
      series: {
        // stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },
    // exporting: {
    //   showTable: true,
    // },
    series: [],
  });

  // Table
  const [tableData, setTableData] = useState({
    title: {
      text: "Total HCPs",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      title: {
        text: "HCP",
      },
      stackLabels: {
        enabled: true,
      },
    },
    legend: {
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      x: 0,
      y: 0,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    // exporting: {
    //   showTable: true,
    // },
    series: [],
    months: [],
  });

  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#00D4C0",
      "#D61975",
      "#0066BE",
      "#db6f2c",
      "#9af5b2",
      "#00003C",
      "#9C9CA2",
      "#7cb0dd",
      "#7c00ad",
      "#009739",
      "#BCA9F5",
      "#ACB5F5",
    ],
  });

  const getDataFromApi = async () => {
    try {
      // const response = await getData(ENDPOINT.OCTALATCH_TOTAL_HCP);
      loader("show");
      await axios.get(ENDPOINT.OCTALATCH_TOTAL_HCP).then((response) => {
        const data = response?.data?.response?.data;
        const seriesMonth = response?.data?.response?.months;
        const lineMonth = response?.data?.response?.months_reverse;
        setTotalReaders(response?.data?.response?.total_readers);
        if (data.length <= 0) {
          setIsDataNotFound(true);
          loader("hide");
          return;
        }

        const newSeriesData = [
          {
            name: "",
            data: "",
            color: "",
          },
        ];
        const newLineData = [
          {
            name: "",
            data: "",
            color: "",
          },
        ];

        data.map((item, index) => {
          newSeriesData?.push({
            name: item?.name + " (" + JSON.parse(item?.total) + ")",
            data: item?.graph1,
            color: Highcharts?.getOptions()?.colors[index],
          });
          newLineData.push({
            name: item.name + " (" + JSON.parse(item?.total) + ")",
            data: item?.graph2,
            color: Highcharts?.getOptions()?.colors[index],
          });
        });

        // Set options for HCP chart

        // const categories = JSON.parse(data[0]?.Months);
        const seriesCategories = seriesMonth;

        const newHcpOptions = {
          ...hcpOptions,
          xAxis: {
            categories: seriesCategories,
          },
          series: newSeriesData?.slice(1),
        };

        setHcpOptions(newHcpOptions);

        // Set options for Base line chart

        const lineCategories = lineMonth;

        const newLineOptions = {
          ...lineOptions,
          xAxis: {
            categories: lineCategories,
          },
          series: newLineData?.slice(1),
        };
        setLineOptions(newLineOptions);

        // Create table data

        const newTableSeries = data?.map((item) => ({
          data: item?.graph1,
        }));

        const newTable = {
          ...tableData,
          xAxis: {
            categories: newSeriesData?.slice(1).map((item) => {
              return item?.name;
            }),
          },
          series: newTableSeries,
          months: seriesCategories,
        };
        setTableData(newTable);
      });
      loader("hide");
    } catch (error) {
      setIsDataNotFound(true);
      loader("hide");
      console.log(error);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  // for total of data for total column

  const total = tableData?.series?.reduce((acc, serie) => {
    return acc + serie?.data?.reduce((a, b) => a + b, 0);
  }, 0);

  return (
    <>
      <Col className="right-sidebar">
        {isDataNotFound && isLoaded ? (
          <h3>Data Not Found</h3>
        ) : isLoaded ? (
          <div className="custom-container">
            <Row>
              <div className="top-header">
                {/* <div className="page-title d-flex">
                  <h2>Total HCP</h2>
                </div> */}
              </div>
              <div className="distribute-page-reader">
                <svg
                  width="512.000000pt"
                  height="512.000000pt"
                  viewBox="0 0 512.000000 512.000000"
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#0066be"
                    fill-opacity="0.6"
                    stroke="none"
                  >
                    {" "}
                    <path d="M2440 5114 c-14 -2 -52 -9 -85 -15 -136 -23 -299 -90 -420 -172 -87 -59 -225 -197 -285 -283 -70 -101 -136 -243 -167 -361 -24 -88 -27 -115 -27 -273 0 -157 3 -185 26 -272 108 -399 405 -700 797 -806 87 -24 113 -26 281 -26 168 0 194 2 282 26 391 106 688 407 796 806 23 87 26 115 26 272 0 158 -3 185 -27 273 -53 199 -156 374 -304 518 -161 157 -331 249 -547 295 -69 15 -296 27 -346 18z"></path>{" "}
                    <path d="M2240 2720 c-93 -10 -214 -33 -302 -57 l-56 -15 -60 -152 c-130 -327 -219 -657 -287 -1058 -4 -24 1 -29 60 -57 91 -42 167 -117 213 -210 36 -73 37 -78 37 -185 0 -104 -2 -115 -32 -179 -44 -93 -119 -169 -212 -215 -73 -36 -78 -37 -186 -37 -108 0 -113 1 -186 37 -93 46 -168 122 -212 215 -30 64 -32 75 -32 178 0 103 2 114 32 178 43 91 118 168 206 212 38 19 75 35 81 35 7 0 22 66 39 166 37 218 121 552 195 772 33 97 59 178 57 180 -6 6 -118 -60 -220 -129 -198 -134 -356 -295 -496 -503 -184 -273 -285 -568 -309 -902 -13 -188 -13 -868 1 -917 7 -26 21 -44 42 -57 31 -20 68 -20 1947 -20 1879 0 1916 0 1947 20 21 13 35 31 42 57 14 50 14 743 1 923 -51 662 -426 1224 -1019 1529 -57 29 -104 51 -107 49 -2 -3 5 -47 17 -99 34 -154 59 -347 59 -454 l0 -100 108 -110 c318 -326 453 -642 387 -900 -32 -123 -131 -240 -259 -305 -120 -60 -191 -47 -217 40 -18 59 8 96 99 141 40 20 87 49 103 65 158 149 70 443 -230 774 -40 44 -88 92 -107 106 l-34 26 -101 -57 c-186 -105 -359 -251 -442 -372 -75 -109 -97 -233 -56 -323 12 -27 48 -72 92 -112 69 -65 72 -70 72 -114 0 -39 -5 -50 -33 -75 -48 -43 -96 -40 -159 10 -158 125 -232 293 -204 463 24 144 85 258 211 391 132 140 307 267 493 358 l67 33 0 58 c0 108 -65 492 -103 605 -14 42 -16 43 -187 74 -95 18 -163 22 -395 24 -154 2 -318 0 -365 -5z"></path>{" "}
                  </g>{" "}
                </svg>
                <p>
                  TOTAL USERS <strong>{totalReaders}</strong>
                </p>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={hcpOptions}
                  />
                </div>
                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={lineOptions}
                  />
                </div>
                <div className="high_charts">
                  <div className="highcharts-data-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Category</th>

                          {tableData?.xAxis?.categories?.map(
                            (category, index) => (
                              <th key={index}>{category}</th>
                            )
                          )}
                          <th>Total ({total})</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData?.months?.map((month, index) => (
                          <tr key={index}>
                            <td>{month}</td>
                            {tableData?.series?.map((serie, serieIndex) => (
                              <td key={serieIndex}>{serie?.data[index]}</td>
                            ))}
                            <td>
                              {tableData?.series?.reduce(
                                (total, serie) => total + serie?.data[index],
                                0
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};

export default OctalatchTotalHCP;
