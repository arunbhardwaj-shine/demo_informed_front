import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { getData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";
exporting(Highcharts);
exportData(Highcharts);
const CampaignStats = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const selectFilter = useRef(null);

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
      showTable: true,
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
      showTable: true,
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

  const [campaignStatsPieOptions, setCampaignStatsPieOptions] = useState({
    chart: {
      plotBackgroundColor: null,

      plotBorderWidth: null,

      plotShadow: false,

      type: "pie",
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
      },
    },

    series: [
      {
        name: "Article Registration based on delivery",

        colorByPoint: true,

        data: [
          {
            name: "Email campaign",

            y: 7.2,

            color: Highcharts.getOptions().colors[0],

            drilldown: "email",
          },

          {
            name: "inforMedGO",

            y: 40.9,

            color: Highcharts.getOptions().colors[1],

            drilldown: "informedgo",
          },

          {
            name: "Docintel Code",

            y: 2.2,

            color: Highcharts.getOptions().colors[2],

            drilldown: "docintelcode",
          },

          {
            name: "Direct",

            y: 28.3,

            color: Highcharts.getOptions().colors[4],

            drilldown: "direct",
          },

          {
            name: "Peer sharing",

            y: 2.0,

            color: Highcharts.getOptions().colors[5],

            drilldown: "peer",
          },

          {
            name: "Webinar",

            y: 2.1,

            color: Highcharts.getOptions().colors[6],

            drilldown: "webinar",
          },

          {
            name: "IBU Email campaign",

            y: 4.2,

            color: Highcharts.getOptions().colors[7],

            drilldown: "ibuemail",
          },

          {
            name: "IBU inforMedGO",

            y: 3.4,

            color: Highcharts.getOptions().colors[8],

            drilldown: "ibuinformedgo",
          },

          {
            name: "IBU QR",

            y: 0.4,

            color: Highcharts.getOptions().colors[10],

            drilldown: "ibuqr",
          },

          {
            name: "IBU Direct",

            y: 5.2,

            color: Highcharts.getOptions().colors[11],

            drilldown: "ibudirect",
          },

          {
            name: "Webinar IBU",

            y: 3.3,

            color: Highcharts.getOptions().colors[13],

            drilldown: "webinaribu",
          },
        ],
      },
    ],

    drilldown: {
      series: [
        {
          name: "Email campaign",

          id: "email",

          data: [
            ["Subcampaign A", 5],

            ["Subcampaign B", 2.2],

            ["Subcampaign C", 0.5],
          ],
        },

        {
          name: "Email campaign",

          id: "informedgo",

          data: [
            ["Subcampaign A", 5],

            ["Subcampaign B", 2.2],

            ["Subcampaign C", 10.5],
          ],
        },

        {
          name: "Email campaign",

          id: "docintelcode",

          data: [
            ["Subcampaign A", 5],

            ["Subcampaign B", 2.2],

            ["Subcampaign C", 10.5],
          ],
        },

        {
          name: "Email campaign",

          id: "direct",

          data: [
            ["Subcampaign A", 5],

            ["Subcampaign B", 2.2],

            ["Subcampaign C", 10.5],
          ],
        },

        {
          name: "Email campaign",

          id: "peer",

          data: [
            ["Subcampaign A", 5],

            ["Subcampaign B", 2.2],

            ["Subcampaign C", 10.5],
          ],
        },

        {
          name: "Email campaign",

          id: "webiner",

          data: [
            ["Subcampaign A", 5],

            ["Subcampaign B", 2.2],

            ["Subcampaign C", 10.5],
          ],
        },
      ],
    },
  });

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      const response = await getData(ENDPOINT.REPORTS);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
        loader("hide");
        return;
      }

      const { cis, ibu } = hadData;
      const monthsString = cis[0].Months;
      const months = monthsString
        .split(",")
        .map((month) => month.replace(/[[\]]/g, ""))
        .reverse();

      const newSeriesCis = cis.map((item, index) => {
        const totalSum = JSON.parse(item.totalSum);
        const totalReaders = totalSum.reduce((acc, val) => acc + val, 0);
        return {
          name: item.ibu,
          totalReaders,
          data: totalSum,
          color: Highcharts.getOptions().colors[index],
        };
      });

      //  for total column cis
      const totalDataCis = months.map((month, index) => {
        const total = newSeriesCis.reduce(
          (sum, series) => sum + series.data[index],
          0
        );
        return total;
      });
      const totalDataCisNoNaN = totalDataCis.map((val) =>
        isNaN(val) ? 0 : val
      );
      const totalCis = totalDataCisNoNaN.reduce((acc, val) => acc + val, 0);
      console.log(totalCis);

      const newSeriesDataCis = [
        ...newSeriesCis.map((series, index) => ({
          name: `${series.name} (${series.totalReaders})`,
          data: series.data,
          color: Highcharts.getOptions().colors[index],
        })),
        {
          name: `Total (${totalCis})`,
          data: totalDataCis,
          color: Highcharts.getOptions().colors[newSeriesCis.length],
        },
      ];

      const newHcpOptions = {
        ...campaignStatsLineOption,
        xAxis: {
          categories: months,
        },
        series: newSeriesDataCis,
      };
      // console.log(newSeriesDataCis);
      setCampaignStatsLineOption(newHcpOptions);

      const newSeriesIbu = ibu.map((item, index) => {
        const totalSum = JSON.parse(item.totalSum);
        const totalReaders = totalSum.reduce((acc, val) => acc + val, 0);
        return {
          name: item.ibu,
          totalReaders,
          data: totalSum,
          color: Highcharts.getOptions().colors[index],
        };
      });

      // for   ibu

      const totalDataIbu = months.map((month, index) => {
        const total = newSeriesIbu.reduce(
          (sum, series) => sum + series.data[index],
          0
        );
        return total;
      });

      const newSeriesIbuNoNaN = totalDataIbu.map((val) =>
        isNaN(val) ? 0 : val
      );
      const totalIbu = newSeriesIbuNoNaN.reduce((acc, val) => acc + val, 0);
      console.log("ibu", totalIbu);

      const newSeriesDataIbu = [
        ...newSeriesIbu.map((series, index) => ({
          name: `${series.name} (${series.totalReaders})`,
          data: series.data,
          color: Highcharts.getOptions().colors[index],
        })),
        {
          name: `Total (${totalIbu})`,
          data: totalDataIbu,
          color: Highcharts.getOptions().colors[newSeriesCis.length],
        },
      ];

      const newHcpOptionsIbu = {
        ...campaignStatsLineOptionIBU,
        xAxis: {
          categories: months,
        },
        series: newSeriesDataIbu,
      };

      setCampaignStatsLineOptionIBU(newHcpOptionsIbu);

      setIsDataFound(true);
      setData(cis);
    } catch (err) {
      setIsDataFound(false);
    }

    loader("hide");
  };

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="top-header">
                <div className="page-title d-flex">
                  <h2>Delivery leading to registration </h2>
                </div>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                <div className="high_charts">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={campaignStatsPieOptions}
                    ref={chart}
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
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={campaignStatsLineOptionIBU}
                    //   ref={chart}
                  />
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
