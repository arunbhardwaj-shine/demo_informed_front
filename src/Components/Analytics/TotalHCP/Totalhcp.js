import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ENDPOINT } from "../../../axios/apiConfig";
import { getData } from "../../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import { loader } from "../../../loader";

exporting(Highcharts);
exportData(Highcharts);

// base bar highchart
const Totalhcp = () => {
  const colorObj = {
    "Critical_care": "#00D4C0",
    "immunotherapy": "#FFBE2C",
    "Haematology": "#F58289"
  }
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
    //   showTable: true
    // },
    series: [],
  });

  // base line highchart
  const [lineOptions, setLineOptions] = useState({
    chart: {
      type: "line",
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
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },
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
    exporting: {
      showTable: true,
    },
    series: [],
    months: []
  });

  Highcharts.setOptions({
    colors: ["#FFBE2C", "#00D4C0", "#F58289"],
  });

  const [isDataNotFound, setIsDataNotFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getDataFromApi = async () => {
    try {
      loader("show");
      const response = await getData(ENDPOINT.ANALYTICS);
      const data = response.data.data;
      const seriesMonth = data[0].Months
      if (data.length <= 0) {
        setIsDataNotFound(true);
      }

      // Set options for HCP chart
      const newSeries = data.map((item) => {
        return {
          name: `${item.ibu} (${item.total})`,
          data: item.total_readers.slice().reverse(),
          colors: colorObj[item?.ibu]
        };
      });

      const seriesCategories = [...data[0].Months].reverse();
      const newHcpOptions = {
        ...hcpOptions,
        xAxis: {
          categories: seriesCategories,
        },
        series: newSeries,
      };
      setHcpOptions(newHcpOptions);

      // Set options for Base line chart

      const lineSeries = data.map((item) => {
        let newData =0,newAr =[]
        item.hcp.forEach(value =>{
          newData += value
           newAr.push(newData)
        })
        return {
          name: `${item.ibu} (${item.total})`,
          data: newAr
        }
       
      });
   
     const lineCategories = data[0].reverseMonth;
      const newLineOptions = {
        ...lineOptions,
        xAxis: {
          categories: lineCategories,
        },
        series: lineSeries,
      };
      setLineOptions(newLineOptions);

      // Create table data
      const newTableSeries = data.map((item) => ({
        data: item.total_readers.slice().reverse(),
      }));

      const tableDatas = data.map((ibuitems) => ({
        name:
          ibuitems.ibu +
          " ( " +
          ibuitems.total_readers.reduce(
            (acc, val) => acc + val,
            0
          ) +
          ")",
      }));
      const newTable = {
        ...tableData,
        xAxis: {
          categories: tableDatas,
        },
        series: newTableSeries,
        months: seriesCategories,
      };
      setTableData(newTable);
      loader("hide");
    } catch (error) {
      setIsDataNotFound(true);
      console.log(error);
      loader("hide");
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  // for total of data for total column
  const total = tableData.series.reduce((acc, serie) => {
    return acc + serie.data.reduce((a, b) => a + b, 0);
  }, 0);


  return (
    <>
      <Col className="right-sidebar">
        {isDataNotFound && isLoaded ? (
          <div className="no_found">
            <p>No Data Found</p>
          </div>
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
                          {tableData.xAxis.categories.map((category, index) => (
                            <th key={index}>{category.name}</th>
                          ))}
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

export default Totalhcp;
