import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import MapModule from "highcharts/modules/map";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";


MapModule(Highcharts);

const data = [
    {
      name: "Australia",
      lat: -25.2744,
      lon: 133.7751,
    },
    {
      name: "Canada",
      lat: 56.1304,
      lon: -106.3468,
    },
    {
      name: "Poland",
      lat: 51.9194,
      lon: 19.1451,
    },
    {
      name: "Kazakhstan",
      lat: 48.0196,
      lon: 66.9237,
    },
    {
      name: "South Africa",
      Lat: -33.918861,
      Lon: 18.4233,
    },
  ];

const countryStatsOptions = {
    chart: {
      map: "worldMap"
    },
    title: {
      text: " "
    },
    credits: {
      enabled: false
    },
    
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        align: "right",
        verticalAlign: "bottom",
        x: -10,
        y: -10
      }
    },
    xAxis: {
      min: 160,
      max: -120
    },
    yAxis: {
      min: -60,
      max: 20
    },
    series: [
      {
        name: "World",
        data:data,
        mapData: worldMap,
        keys: ["name", "lat", "lon"],
         joinBy: ["name"],
         showInLegend: false,
     tooltip: {
      headerFormat: "",
        pointFormat: "Country: {point.name}"
     },
    dataLabels:{
            enabled:true,
            formatter:function() {
                const countries = this.series.options.data.filter(country => country.name === this.point.name);
                if (countries.length > 0) {
                    return this.point.name;
                }else{
                    return null;
                }
            },  
            useHTML: true, // enable HTML rendering for the formatter
            
         marker: {
            symbol: "circle",
            radius: 5
          }
      },
    }
    ],
  };
  
  const countryStatsPieOptions = {
    chart: {
      plotBackgroundColor: null,

      plotBorderWidth: null,

      plotShadow: false,

      type: "pie",
    },

    title: {
      text: "",
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
            name: "LATAM",

            y: 7.2,

            color: Highcharts.getOptions().colors[0],

            drilldown: "LATAM",
          },

          {
            name: "US",

            y: 40.9,

            color: Highcharts.getOptions().colors[1],

            drilldown: "US",
          },

          {
            name: "SEA",

            y: 2.2,

            color: Highcharts.getOptions().colors[2],

            drilldown: "SEA",
          },

          {
            name: "MENA",

            y: 28.3,

            color: Highcharts.getOptions().colors[4],

            drilldown: "MENA",
          },

          {
            name: "CEE/CIS",

            y: 2.0,

            color: Highcharts.getOptions().colors[5],

            drilldown: "CEE/CIS",
          },

          {
            name: "EU",

            y: 2.1,

            color: Highcharts.getOptions().colors[6],

            drilldown: "EU",
          },

          {
            name: "ZAF",

            y: 4.2,

            color: Highcharts.getOptions().colors[7],

            drilldown: "ZAF",
          },

          {
            name: "Russia",

            y: 3.4,

            color: Highcharts.getOptions().colors[8],

            drilldown: "Russia",
          },

          {
            name: "Mexico",

            y: 0.4,

            color: Highcharts.getOptions().colors[10],

            drilldown: "Mexico",
          },

          {
            name: "Canada",

            y: 5.2,

            color: Highcharts.getOptions().colors[11],

            drilldown: "Canada",
          },

          {
            name: "Brazil",

            y: 3.3,

            color: Highcharts.getOptions().colors[13],

            drilldown: "Brazil",
          },
          {
            name: "African Group1",

            y: 1.6,

            color: Highcharts.getOptions().colors[13],

            drilldown: "African Group1",
          },
          {
            name: "TINBS",

            y: 1.5,

            color: Highcharts.getOptions().colors[13],

            drilldown: "TINBS",
          },
          {
            name: "Others",

            y: 1.6,

            color: Highcharts.getOptions().colors[13],

            drilldown: "Others",
          },
        ],
      },
    ],

    // drilldown: {
    //   series: [
    //     {
    //       name: "Email campaign",

    //       id: "email",

    //       data: [
    //         ["Subcampaign A", 5],

    //         ["Subcampaign B", 2.2],

    //         ["Subcampaign C", 0.5],
    //       ],
    //     },

    //     {
    //       name: "Email campaign",

    //       id: "informedgo",

    //       data: [
    //         ["Subcampaign A", 5],

    //         ["Subcampaign B", 2.2],

    //         ["Subcampaign C", 10.5],
    //       ],
    //     },

    //     {
    //       name: "Email campaign",

    //       id: "docintelcode",

    //       data: [
    //         ["Subcampaign A", 5],

    //         ["Subcampaign B", 2.2],

    //         ["Subcampaign C", 10.5],
    //       ],
    //     },

    //     {
    //       name: "Email campaign",

    //       id: "direct",

    //       data: [
    //         ["Subcampaign A", 5],

    //         ["Subcampaign B", 2.2],

    //         ["Subcampaign C", 10.5],
    //       ],
    //     },

    //     {
    //       name: "Email campaign",

    //       id: "peer",

    //       data: [
    //         ["Subcampaign A", 5],

    //         ["Subcampaign B", 2.2],

    //         ["Subcampaign C", 10.5],
    //       ],
    //     },

    //     {
    //       name: "Email campaign",

    //       id: "webiner",

    //       data: [
    //         ["Subcampaign A", 5],

    //         ["Subcampaign B", 2.2],

    //         ["Subcampaign C", 10.5],
    //       ],
    //     },
    //   ],
    // },

    //country List 
    
  };

//octa country List

const octaCountryList = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Country List'
    },
    xAxis: {
        categories: ["Albania", "Azerbaijan", "B&H","Belarus","Bulgaria","Croatia","Czech Republic","Estonia"]
    },
    yAxis: {
      title: {
        text: 'Number of Cases'
      }
    },
    stackLabels: {
      enabled: true,
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
      bar: {
        dataLabels: {
            enabled: true
        }
    },
    //   series: {
    //     pointWidth: 15
    // }
    },
    exporting: {
      showTable: true
    },
    series: [{
        name: 'country',
        data: [42, 2, 29, 20, 22, 15, 10]
      }]

};


const OctalatchCountryStats = () => {

    return (
        <>
          <Col className="right-sidebar">
            <div className="custom-container">
              <Row>
              <div className="high_charts">
              <HighchartsReact constructorType={"mapChart"} highcharts={Highcharts} options={countryStatsOptions} />
              </div>
             
              <div className="high_charts">
            <HighchartsReact  highcharts={Highcharts} options={countryStatsPieOptions} />
                </div>
                <div className="delivery-trends">
              <Tabs>
                <Tab eventKey="1" title="LATAM">
                </Tab>
                <Tab eventKey="2" title="US">
                </Tab>
                <Tab eventKey="3" title="SEA">
                </Tab>
                <Tab eventKey="4" title="MENA">
                </Tab>
                <Tab eventKey="5" title="CEE/CIS">
                </Tab>
                <Tab eventKey="6" title="EU">
                </Tab>
                <Tab eventKey="7" title="ZAF">
                </Tab>
                <Tab eventKey="8" title="Russia">
                </Tab>
                <Tab eventKey="9" title="Mexico">
                </Tab>
                <Tab eventKey="10" title="Canada">
                </Tab>
                <Tab eventKey="11" title="Brazil">
                </Tab>
                <Tab eventKey="12" title="African Group1">
                </Tab>
                <Tab eventKey="13" title="TINBS">
                </Tab>
                <Tab eventKey="14" title="Other">
                </Tab>
              </Tabs>
              </div>
              <div className="high_charts">
            <HighchartsReact highcharts={Highcharts} options={octaCountryList} />
            </div>
              </Row>
            </div>
          </Col>
        </>
      );
};

export default OctalatchCountryStats;