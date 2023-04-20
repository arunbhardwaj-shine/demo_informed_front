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
      axios.get(ENDPOINT.OCTALATCH_TOTAL_HCP).then((response) => {
        const data = response?.data?.response?.data;
        const seriesMonth = response?.data?.response?.months;
        const lineMonth = response?.data?.response?.months_reverse;

        if (data.length <= 0) {
          setIsDataNotFound(true);
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
                <div className="page-title d-flex">
                  <h2>Total HCP</h2>
                </div>
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
