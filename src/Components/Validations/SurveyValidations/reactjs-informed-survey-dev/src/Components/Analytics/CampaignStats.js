import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { getData, postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";
import drilldown from "highcharts/modules/drilldown.js";
import CommonLineGraph from "./CommonLineGraph";
import { element } from "prop-types";
exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);
const  CampaignStats = () => {
  const [data, setData] = useState({});
  const [newData, setNewData] = useState([]);
  const [pieData, setPieData] = useState({});

  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const selectFilter = useRef(null);
  const [newValue, setNewValue] = useState([]);
  
  const [campaignStatsPieOptions, setCampaignStatsPieOptions] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 500,
    },
    title: {
      text: "Registration based on delivery",
      align: "left",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
        point: {
          events: {
            drilldown: function (e) {
              const drilldownSeries = e.seriesOptions;
              console.log('Drilldown data:', drilldownSeries);
            },
          },
        },
      },
    },
    series: [],
    drilldown: {
      series: [],
    },
  });


  const chart = useRef(null);
  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#d1d132",
      "#D61975",
      "#0066BE",
      "#00003C",
      "#b490f5",
      "#91817e",
      "#2b6570",
      "#9C9CA2",
      "#7cb0dd",
      "#4f4566",
      "#00D4C0",
      "#32a1d1",
    ],
  });


  useEffect(() => {
    window.scrollTo(0, 0);
    initiFun();
    getDataFromApi();
  }, []);



 
  let drillDownValue  = {};
 const initiFun = async () => {
  try {
    loader("show");
    const result = await getData(ENDPOINT.CAMPAINGSTAT);
     
    const newSeries = result?.data?.data.map((element, index) => ({
      name: element.label,
      y: parseFloat(element.percentage),
      color: Highcharts.getOptions().colors[index],
      drilldown: element.label,
      
    }));


    const drilldownSeries = result?.data?.data.map((element) => {
      const ibuName = element.drillDownLabel;
      const drillData = element.drillDown;
      const dataArr = [];

      for (let i = 0; i < ibuName.length; i++) {
        dataArr.push([ibuName[i], parseFloat(drillData[i])]);
      }

      if(!element.label.startsWith("IBU")){

        return {
          id: element.label,
          name: element.label,
          data: dataArr,
        };
      }
        return null;
    }).filter(series => series !== null);
  
  
setCampaignStatsPieOptions({
  ...campaignStatsPieOptions,
  series: [{
    name: "Article Registration based on delivery",
    colorByPoint: true,
    data: newSeries,
  }],
  drilldown: {
    series: drilldownSeries,
  },
});

    loader("hide");
  } catch (err) {
    loader("hide");
    console.log("-err", err);
  }
};


  const [seriesData, setSeriesData] = useState([]);
  const [campaignStatsLineOption, setCampaignStatsLineOption] = useState({
    chart: {
      type: "line",
    },
    title: {
      text: "Registered HCP's (CIS)",
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      text: "",
    },
    exporting: {
      showHighchart: true,
      // showTable: true,
      tableCaption: "",
    },
    xAxis: {},
    yAxis: {
      title: {
        text: "HCP",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
      series: {
        events: {
          legendItemClick: function (event) {
            var sr = this.chart.series;
            for (let i = 0; i < sr.length; i++) {
              if (this == sr[i]) sr[i].setVisible(true);
              else sr[i].setVisible(false);
            }
            return false;
          },
        },
      },
    },
  });

  // start Line cis table
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
    months: [],
  });

  // end line cis table

  //start line ibu table

  const [tableDataIbu, setTableDataIbu] = useState({
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
    months: [],
  });

  // end line ibu table

  const [campaignStatsLineOptionIBU, setCampaignStatsLineOptionIBU] = useState({
    chart: {
      type: "line",
    },
    title: {
      text: "Registered HCP's (IBU)",
    },
    credits: {
      enabled: false,
    },
    subtitle: {
      text: "",
    },

    exporting: {
      showHighchart: true,
      //  showTable: true,
      tableCaption: "",
    },
    xAxis: {},
    yAxis: {
      title: {
        text: "HCP",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
      series: {
        events: {
          legendItemClick: function (event) {
            var sr = this.chart.series;
            for (let i = 0; i < sr.length; i++) {
              if (this == sr[i]) sr[i].setVisible(true);
              else sr[i].setVisible(false);
            }
            return false;
          },
        },
      },
    },
  });

 

  const getDataFromApi = async () => {
    try {
      loader("show");
      const response = await getData(ENDPOINT.REPORTS);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
        loader("hide");
        return;
      }

      //  setNewData(hadData);

      const { cis, ibu } = hadData;

      hadData.cis.sort((a, b) => a.ibu.localeCompare(b.ibu));
      hadData.ibu.sort((a, b) => a.ibu.localeCompare(b.ibu));

      const monthsString = cis[0].Months;
      const months = monthsString;
      const reversedMonths = [...months].reverse();
      const newSeriesCis = cis.map((item, index) => {
        let newData = 0;
        let newAr = [];
        item.total.forEach((value) => {
          newData += value;
          newAr.push(newData);
        });
        const name = item.ibu;

        const totalSum = item.total;
        const totalReaders = item.total.reduce((acc, val) => acc + val, 0);

        return {
          name: name,
          totalReaders,
          data: newAr,
          color: Highcharts.getOptions().colors[index],
        };
      });

      const newSeriesDataCis = [
        ...newSeriesCis.map((series, index) => ({
          name: `${series.name} (${series.totalReaders})`,
          data: series.data,
          color: Highcharts.getOptions().colors[index],
        })),
      ];

      const newHcpOptions = {
        ...campaignStatsLineOption,
        xAxis: {
          categories: months,
        },
        series: newSeriesDataCis,
      };
      setCampaignStatsLineOption(newHcpOptions);

      // start line cis  table
      const newTableSeries = cis.map((item) => ({
        data: item.total.reverse(),
      }));

      const tableDatas = cis.map((item, index) => ({
        name:
          item.ibu +
          " ( " +
          item.total.reduce((acc, val) => acc + val, 0) +
          ")",
      }));

      const newTable = {
        ...tableData,
        xAxis: {
          categories: tableDatas,
        },
        series: newTableSeries,
        months: reversedMonths,
      };

      setTableData(newTable);

      // end line cis  table

      const newSeriesIbu = ibu.map((item, index) => {
        const totalSum = item.totalSum;
        const totalReaders = item.total.reduce((acc, val) => acc + val, 0);
        let newData = 0;
        let newAr = [];
        item.total.forEach((value) => {
          newData += value;
          newAr.push(newData);
        });
        return {
          name: item.ibu,
          totalReaders,
          data: newAr,
          color: Highcharts.getOptions().colors[index],
        };
      });

      const newSeriesDataIbu = [
        ...newSeriesIbu.map((series, index) => ({
          name: `${series.name} (${series.totalReaders})`,
          data: series.data,
          color: Highcharts.getOptions().colors[index],
        })),
      ];

      const newHcpOptionsIbu = {
        ...campaignStatsLineOptionIBU,
        xAxis: {
          categories: months,
        },
        series: newSeriesDataIbu,
      };

      setCampaignStatsLineOptionIBU(newHcpOptionsIbu);

      //start create ibu table

      const newTableSeriesibu = ibu.map((item) => ({
        data: item.total.reverse(),
      }));

      const tableDatasibu = ibu.map((item, index) => ({
        name:
          item.ibu +
          " ( " +
          item.total.reduce((acc, val) => acc + val, 0) +
          ")",
      }));
      const newTableibu = {
        ...tableDataIbu,
        xAxis: {
          categories: tableDatasibu,
        },
        series: newTableSeriesibu,
        months: reversedMonths,
      };
      setTableDataIbu(newTableibu);

      // end create ibu table

      setIsDataFound(true);
      setData(cis);
    } catch (err) {
      loader("hide");
      setIsDataFound(false);
    }
  };

  //start total of cis & ibu
  const total = tableData.series.reduce((acc, serie) => {
    return acc + serie.data.reduce((a, b) => a + b, 0);
  }, 0);

  const totalibu = tableDataIbu.series.reduce((acc, serie) => {
    return acc + serie.data.reduce((a, b) => a + b, 0);
  }, 0);
  //end total of cis

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="top-header">
                {/* <div className="page-title d-flex">
                  <h2>Delivery leading to registration </h2>
                </div> */}
              </div>
              <div className="distribute-page-reader">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="512.000000pt"
                  height="512.000000pt"
                  viewBox="0 0 512.000000 512.000000"
                >
                  {" "}
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#0066be"
                    stroke="none"
                  >
                    {" "}
                    <path d="M3455 4786 c-94 -41 -124 -169 -58 -247 46 -55 69 -59 320 -59 l228 -1 -175 -172 c-736 -724 -1646 -1247 -2689 -1547 -210 -61 -237 -74 -267 -132 -18 -35 -18 -101 1 -137 21 -41 70 -79 113 -87 44 -9 133 13 392 92 361 111 670 235 1020 410 636 317 1162 691 1683 1194 l136 131 3 -225 c3 -209 4 -227 24 -252 39 -53 71 -69 134 -69 63 0 95 16 134 69 21 27 21 38 21 486 0 448 0 459 -21 486 -11 15 -33 37 -48 48 -27 20 -40 21 -474 23 -356 2 -453 0 -477 -11z"></path>{" "}
                    <path d="M3740 3024 c-100 -36 -172 -110 -204 -210 -15 -44 -16 -161 -14 -1154 l3 -1105 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 1125 0 1125 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                    <path d="M2140 2224 c-100 -36 -172 -110 -204 -210 -15 -43 -16 -128 -14 -754 l3 -705 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 725 0 725 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                    <path d="M540 1744 c-100 -36 -172 -110 -205 -210 -14 -43 -15 -107 -13 -514 l3 -465 25 -50 c31 -64 91 -124 155 -155 l50 -25 405 0 405 0 50 25 c64 31 124 91 155 155 l25 50 0 485 0 485 -25 50 c-31 64 -91 124 -155 155 l-50 25 -390 2 c-335 2 -396 0 -435 -13z"></path>{" "}
                  </g>{" "}
                </svg>
                <p>
                  The charts show what lead HCPs to register for their first
                  content & account. It does not show what else they’ve
                  registered for afterwards.
                </p>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={campaignStatsPieOptions}
                  // ref={chart}
                  />
                </div>

                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={campaignStatsLineOption}
                    //   ref={chart}
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

                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={campaignStatsLineOptionIBU}
                    //   ref={chart}
                  />
                  <div className="high_charts">
                    <div className="highcharts-data-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Category</th>
                            {tableDataIbu.xAxis.categories.map(
                              (category, index) => (
                                <th key={index}>{category.name}</th>
                              )
                            )}
                            <th>Total ({totalibu})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableDataIbu?.months?.map((month, index) => (
                            <tr key={index}>
                              <td>{month}</td>
                              {tableDataIbu?.series?.map(
                                (serie, serieIndex) => (
                                  <td key={serieIndex}>{serie?.data[index]}</td>
                                )
                              )}
                              <td>
                                {tableDataIbu?.series?.reduce(
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
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default CampaignStats;
