import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { getData,postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";
import drilldown from "highcharts/modules/drilldown.js";
exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);
const CampaignStats = () => {
  const [data, setData] = useState({});
  const [pieData, setPieData] = useState({});

  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const selectFilter = useRef(null);
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
        drilldown: true,
        data: [
          {
            name: "Email campaign",

            y: 66.3,

            color: Highcharts.getOptions().colors[0],

            drilldown: "email",
          },

          {
            name: "inforMedGO",

            y: 66.3,

            color: Highcharts.getOptions().colors[1],

            drilldown: "informedgo",
          },

          {
            name: "Docintel Code",

            y: 66.3,

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
            ["Critical Care", 5],

            ["Haematology", 2.2],

            ["Immunotherapy", 0.5],
          ],
        },

        {
          name: "inforMedGO",
          id: "inforMedGO",
          data: [
            ["Critical Care", 5],

            ["Haematology", 2.2],

            ["Immunotherapy", 0.5],
          ],
        },

        {
          name: "Docintel Code",
          id: "Docintel Code",

          data: [
            ["Critical Care", 5],

            ["Haematology", 2.2],

            ["Immunotherapy", 0.5],
          ],
        },

        {
          name: "QR",
          id: "QR",

          data: [
            ["Critical Care", 5],

            ["Haematology", 2.2],

            ["Immunotherapy", 0.5],
          ],
        },

        {
          name: "Email campaign",

          id: "peer",

          data: [
            ["Critical Care", 5],

            ["Haematology", 2.2],

            ["Immunotherapy", 0.5],
          ],
        },

        {
          name: "Email campaign",

          id: "webiner",

          data: [
            ["Critical Care", 5],

            ["Haematology", 2.2],

            ["Immunotherapy", 0.5],
          ],
        },
      ],
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

  const initiFun = async()=>{
    try{
      loader("show")
      const result =   await postData(ENDPOINT.CAMPAINGSTAT)
      let newValue =  [
        {
          name: "Article Registration based on delivery",
          colorByPoint: true,
          data: [
            {
              name: "Email campaign",
              y: result?.data?.data?.tot_email,
              color: Highcharts.getOptions().colors[0],
              drilldown: "email",
            },
            {
              name: "inforMedGO",
              y: result?.data?.data?.tot_GO_code,
              color: Highcharts.getOptions().colors[1],
              drilldown: "inforMedGO",
            },  
            {
              name: "Docintel Code",
              y: result?.data?.data?.tot_Docintel_code,
              color: Highcharts.getOptions().colors[2],
              drilldown: "Docintel Code",
            },
            {
              name: "Direct",
              y: result?.data?.data?.tot_web,
              color: Highcharts.getOptions().colors[4],
              drilldown: "direct",
            },
            {
              name: "Peer sharing",
              y: Math.round(result?.data?.data?.tot_peer),
              color: Highcharts.getOptions().colors[5],
              drilldown: "peer",
            },
            {
              name: "Webinar",
              y: result?.data?.data?.tot_CIS_oc,
              color: Highcharts.getOptions().colors[6],
              drilldown: "webinar",
            },
            {
              name: "IBU Email campaign",
              y:  result?.data?.data?.tot_email_oc,
              color: Highcharts.getOptions().colors[7],
              drilldown: "ibuemail",
            },
            {
              name: "IBU inforMedGO",
              y: result?.data?.data?.tot_GO_code_oc,
              color: Highcharts.getOptions().colors[8],
              drilldown: "ibuinformedgo",
            },
            {
              name: "IBU QR",
              y:  result?.data?.data?.tot_QRcode_oc,
              color: Highcharts.getOptions().colors[10],
              drilldown: "QR",
            },
            {
              name: "IBU Direct",
              y:  result?.data?.data?.tot_web_oc,
              color: Highcharts.getOptions().colors[11],
              drilldown: "ibudirect",
            },
            {
              name: "Webinar IBU",
              y: result?.data?.data?.tot_IBU_oc,
              color: Highcharts.getOptions().colors[13],
              drilldown: "webinaribu",
            },
          ],
        },
      ]

      let drillDownValue = [{
        series: [
          {
            name: "Email campaign",
            id: "email",
            y: result?.data?.data?.tot_email,
            data: [
              ["Critical Care", result?.data?.data?.tot_email_c2],
              ["Haematology", result?.data?.data?.tot_email_h2],
              ["Immunotherapy", result?.data?.data?.tot_email_i2],
            ],
          },
          {
            name: "inforMedGO",
            id: "inforMedGO",
            data: [
              ["Critical Care", result?.data?.data?.tot_GO_code_c2],
              ["Haematology", result?.data?.data?.tot_GO_code_h2],
              ["Immunotherapy", result?.data?.data?.tot_GO_code_i2],
            ],
          },
          {
            name: "Docintel Code",
            id: "Docintel Code",
            data: [
              ["Critical Care", result?.data?.data?.tot_Docintel_code_c2],
              ["Haematology", result?.data?.data?.tot_Docintel_code_h2],
              ["Immunotherapy", result?.data?.data?.tot_Docintel_code_i2],
            ],
          },
  
          {
            name: "QR",
            id: "QR",
            data: [
              ["Critical Care", result?.data?.data?.tot_QRcode_c2],
              ["Haematology", result?.data?.data?.tot_QRcode_h2],
              ["Immunotherapy", result?.data?.data?.tot_QRcode_i2],
            ],
          },
  
          {
            name: "Direct",
            id: "Direct",
            data: [
              ["Critical Care", result?.data?.data?.tot_web_c2],
              ["Haematology", result?.data?.data?.tot_web_h2],
              ["Immunotherapy", result?.data?.data?.tot_web_i2],
            ],
          },
          {
            name: "Peer sharing",
            id: "Peer sharing",
            data: [
              ["Critical Care", result?.data?.data?.tot_peer_c2],
              ["Haematology", result?.data?.data?.tot_peer_h2],
  
              ["Immunotherapy", result?.data?.data?.tot_peer_i2],
            ]
          },
        ],
      }]

      setCampaignStatsPieOptions({...campaignStatsPieOptions,series:newValue,drilldown:drillDownValue})


      loader("hide");

    }catch(err){
      loader("hide");
      console.log("-err",err)
    }
      

  }
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



  useEffect(() => {

    initiFun()
    getDataFromApi();
    
  }, []);

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

      const { cis, ibu } = hadData;
      const monthsString = cis[0].Months;
      const months = monthsString
      console.log("month",months);
        // .split(",")
        // .map((month) => month.replace(/[[\]]/g, ""))
        // .reverse();
        const reversedMonths = [...months].reverse();
        console.log("reverse",reversedMonths);
        const newSeriesCis = cis.map((item, index) => {
          const totalSum = item.totalSum;
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
      setCampaignStatsLineOption(newHcpOptions);

      const newSeriesIbu = ibu.map((item, index) => {
        const totalSum = item.totalSum
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
      loader("hide");
      setIsDataFound(false);
    }

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
