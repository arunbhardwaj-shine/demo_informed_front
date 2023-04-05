import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../../loader";
import { ENDPOINT } from "../../../axios/apiConfig";
import { postData } from "../../../axios/apiHelper";
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
    colors: ['#FFBE2C', '#F58289', '#d1d132', '#D61975', '#0066BE', '#00003C', '#b490f5','#91817e','#2b6570','#9C9CA2','#7cb0dd','#4f4566','#00D4C0','#32a1d1']
   });
  const campaignStatsLineOption = {
    // colors: ['#91817e','#2b6570','#9C9CA2','#7cb0dd','#4f4566','#00D4C0','#32a1d1'],
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
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
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
    series: [
        {
          name: "Email campaign (10)",
          data: [50, 100, 75, 120, 90, 150, 200, 180, 250, 300, 350, 400],
          color: Highcharts.getOptions().colors[0],
        },
        {
          name: "inforMedGO (20)",
          data: [30, 70, 50, 80, 60, 100, 150, 130, 180, 200, 250, 300],
          color: Highcharts.getOptions().colors[1],
        },
        {
          name: "Docintel Code (15)",
          data: [40, 90, 65, 100, 75, 120, 180, 150, 200, 250, 300, 350],
          color: Highcharts.getOptions().colors[2],
        },
        {
          name: "QR (25)",
          data: [60, 120, 90, 150, 110, 180, 250, 220, 300, 350, 400, 450],
          color: Highcharts.getOptions().colors[3],
        },
        {
          name: "Direct (30)",
          data: [70, 150, 110, 180, 130, 220, 300, 270, 350, 400, 450, 500],
          color: Highcharts.getOptions().colors[4],
        },
        {
          name: "Peer sharing (5)",
          data: [20, 50, 35, 60, 45, 75, 100, 90, 120, 150, 180, 200],
          color: Highcharts.getOptions().colors[5],
        },
        {
          name: "Webinar (10)",
          data: [30, 70, 50, 80, 60, 100, 150, 130, 180, 200, 250, 300],
          color: Highcharts.getOptions().colors[6],
        },
      ],
  };

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
            drilldown: "Email campaign",
          },
          {
            name: "inforMedGO",
            y: 40.9,
            color: Highcharts.getOptions().colors[1],
            drilldown: "inforMedGO",
          },
          {
            name: "Docintel Code",
            y: 2.2,
            color: Highcharts.getOptions().colors[2],
            drilldown: "Docintel Code",
          },
          // {
          //     name: "QR",
          //     y: ,
          //     color: Highcharts.getOptions().colors[3],
          //     drilldown: "QR"
          // },
          {
            name: "Direct",
            y: 28.3,
            color: Highcharts.getOptions().colors[4],
            drilldown: "Direct",
          },
          {
            name: "Peer sharing",
            y: 2.0,
            color: Highcharts.getOptions().colors[5],
            drilldown: "Peer sharing",
          },
          {
            name: "Webinar",
            y: 2.1,
            color: Highcharts.getOptions().colors[6],
            drilldown: "Webinar",
          },
          {
            name: "IBU Email campaign",
            y: 4.2,
            color: Highcharts.getOptions().colors[7],
            drilldown: "IBU Email campaign",
          },
          {
            name: "IBU inforMedGO",
            y: 3.4,
            color: Highcharts.getOptions().colors[8],
            drilldown: "IBU inforMedGO",
          },
          // {
          //     name: "IBU Docintel Code",
          //     y: 1,
          //     color: Highcharts.getOptions().colors[9],
          //     drilldown: "IBU Docintel Code"
          // },
          {
            name: "IBU QR",
            y: 0.4,
            color: Highcharts.getOptions().colors[10],
            drilldown: "IBU QR",
          },
          {
            name: "IBU Direct",
            y: 5.2,
            color: Highcharts.getOptions().colors[11],
            drilldown: "IBU Direct",
          },
          // ,
          // {
          //     name: "IBU Peer sharing",
          //     y: 1,
          //     color: Highcharts.getOptions().colors[12],
          //     drilldown: "IBU Peer sharing"
          // }
          {
            name: "Webinar IBU",
            y: 3.3,
            color: Highcharts.getOptions().colors[13],
            drilldown: "Webinar IBU",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      const requestBody = {
        type: "Openingcountry",
        filter: selectFilter?.current?.value
          ? selectFilter?.current?.value
          : "",
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      const categories = hadData?.name;

      const newSeries = [
        {
          name: `Readers (${hadData.readerTotal})`,
          data: hadData.reader,
          color: Highcharts.getOptions().colors[1],
        },
        {
          name: `Views (${hadData.viewTotal})`,
          data: hadData.view,
          color: Highcharts.getOptions().colors[2],
        },
        {
          name: `Quantity Sold (${hadData.soldTotal})`,
          data: hadData.sold,
          color: Highcharts.getOptions().colors[0],
        },
      ];

      const newClientOptions = {
        ...campaignStatsPieOptions,
        xAxis: { categories: categories },
      };

      setCampaignStatsPieOptions(newClientOptions);

      setIsDataFound(true);
      setData(hadData);

      loader("hide");
    } catch (err) {
      setIsDataFound(false);
    //   console.log(err);
      loader("hide");
    }
    console.log(chart.current);
  };

  const filterData = (e) => {
    setIsDataFound(false);
    selectFilter.current = e;

    getDataFromApi(e.value);
  };

  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <div className="top-header">
                <div className="page-title d-flex">
                  <Link
                    className="btn btn-primary btn-bordered back-btn"
                    to="/top-clients"
                  >
                    <svg
                      width="14"
                      height="24"
                      viewBox="0 0 14 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                        fill="#97B6CF"
                      />
                    </svg>
                  </Link>
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
              </div>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};
export default CampaignStats;
