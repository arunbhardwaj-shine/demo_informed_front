import React, { useState, useEffect } from "react";
import "../../../assets/css/webinar.css";
import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { loader } from "../../../../../loader";
import { Col, Row } from "react-bootstrap";

let data1 ={
    chartData:{
    Argentina: 1,
    Bahrain: 2,
    Belarus: 1,
    Belgium: 1,
    Canada: 1,
    Chile: 1,
    Cuba: 1,
    Ecuador: 1,
    Egypt: 11,
    France: 1,
    Germany: 2,
    Hungary: 3,
    India: 13,
    Indonesia: 1,
    Iraq: 1,
    Japan: 1,
    KSA: 126,
    Latvia: 1,
    Mexico: 2,
    Nigeria: 1,
    Pakistan: 1,
    "Palestinian Territory Occupied": 1,
    Paraguay: 2,
    Peru: 3,
    Philippines: 9,
    Portugal: 2,
    Qatar: 1,
    "Sierra Leone": 2,
    Slovakia: 1,
    "South Africa": 2,
    Sudan: 5,
    UAE: 1,
    Ukraine: 1,
    "United State of America": 2,
    Venezuela: 2
    },

    colorArr:{
        Cuba: "#FFBE2C",
        KSA: "#F58289",
        "Sierra Leone": "#00D4C0",
        Belarus: "#D61975",
        Slovakia: "#0066BE",
        Germany: "#db6f2c",
        Indonesia: "#9af5b2",
        "United State of America": "#00003C",
        Canada: "#7cb0dd",
        Argentina: "#7c00ad",
        Venezuela: null,
        Chile: null,
        Ukraine: null,
        Paraguay: null,
        Egypt: null,
        Portugal: null,
        Hungary: null,
        Mexico: null,
        Peru: null,
        India: null,
        Philippines: null,
        Sudan: null,
        Pakistan: null,
        Bahrain: null,
        Nigeria: null,
        UAE: null,
        "Palestinian Territory Occupied": null,
        Japan: null,
        Belgium: null,
        Qatar: null,
        France: null,
        Iraq: null,
        Latvia: null,
        Ecuador: null,
        "South Africa": null
    },
}

let data2 =[]

console.log(data1.Brazil,'====>dataaa1')

const HCPRegisteredCountry = () => {

    const [options1, setOptions1] = useState({
        chart: {
          renderTo: "country_container",
          type: "pie",
          // width: 1200,
          // height: 21 > 20 ? 1200 : 400,
        },
        title: {
          text: "HCP’s Registered Live By Country (1565)",
        },
        credits: { enabled: false },
        legend: {},
        minPointLength: 10,
        plotOptions: {
          series: {
            shadow: false,
            borderWidth: 0,
            // dataLabels: {
            //   enabled: true,
            //   formatter: function () {
            //     return this.y;
            //   },
            // },
          },
        },
        xAxis: {
          lineColor: "#999",
          lineWidth: 1,
          tickColor: "#666",
          tickLength: 3,
          labels: {
            padding: 0,
            style: {
              fontSize: "9px",
            },
          },
          categories: [],
        },
        yAxis: {
          lineColor: "#999",
          lineWidth: 1,
          tickColor: "#666",
          tickWidth: 1,
          tickLength: 3,
          gridLineColor: "#ddd",
          title: false,
        },
        series: [
          {
            colorByPoint: true,
            showInLegend: false,
            data: [],
          },
        ],
        // tooltip: {
        //   formatter: function () {
        //     return this.x + ":" + this.y;
        //   },
        // },
      });


      const [options2, setOptions2] = useState({
        chart: {
          renderTo: "country_container",
          type: "pie",
          // width: 1200,
          // height: 21 > 20 ? 1200 : 400,
        },
        title: {
          text: "HCP’s Registered Virtual By Country (0)",
        },
        credits: { enabled: false },
        legend: {},
        minPointLength: 10,
        plotOptions: {
          series: {
            shadow: false,
            borderWidth: 0,
            // dataLabels: {
            //   enabled: true,
            //   formatter: function () {
            //     return this.y;
            //   },
            // },
          },
        },
        xAxis: {
          lineColor: "#999",
          lineWidth: 1,
          tickColor: "#666",
          tickLength: 3,
          labels: {
            padding: 0,
            style: {
              fontSize: "9px",
            },
          },
          categories: [],
        },
        yAxis: {
          lineColor: "#999",
          lineWidth: 1,
          tickColor: "#666",
          tickWidth: 1,
          tickLength: 3,
          gridLineColor: "#ddd",
          title: false,
        },
        series: [
          {
            colorByPoint: true,
            showInLegend: false,
            data: [{}],
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.5)',
          },
        ],
        // tooltip: {
        //   formatter: function () {
        //     return this.x + ":" + this.y;
        //   },
        // },
      });


      const getDataFromApi = async () => {
        try {
          loader("show");
        // const categories1 = Object.keys(data1.chartData).sort();
        //   const transformedChartData1 = Object.entries(data1.chartData).map(
        //     ([name, y]) => ({
        //       name ,
        //       y,
        //       color: data1.colorArr[name],
        //     })
        //   );
    
        // let  updatedSeries = [
        //     {
        //       ...options1.series[0],
        //       data: transformedChartData1,
        //     },
        //   ];
    
        // let  updatedOptions = {
        //     ...options1,
        //     xAxis: {
        //       ...options1.xAxis,
        //       categories: categories1,
        //     },
        //     series: updatedSeries,
        //   };
    
        //   console.log(updatedOptions);
        //   setOptions1(updatedOptions);
    
                const categories2 = Object.keys(data2).sort();
          const transformedChartData2 = Object.entries(data2).map(
            ([name, y]) => ({
              name,
              y,
              color: data1.colorArr[name],
            })
          );
    
         let updatedSeries = [
            {
              ...options2.series[0],
              data: transformedChartData2,
            },
          ];
    
         let updatedOptions = {
            ...options2,
            xAxis: {
              ...options2.xAxis,
              categories: categories2,
            },
            series: updatedSeries,
          };
    
          console.log(updatedOptions);
          setOptions2(updatedOptions);
          loader("hide");
        } catch (error) {
          console.log(error);
          loader("hide");
        }
      };
    
      useEffect(() => {
        getDataFromApi();
      }, []);
  return (
    <div>
      <Row>
        <Col>
        <HighchartsReact className='attended-country' highcharts={Highcharts} options={options2} />
        </Col>
        <Col>
        <HighchartsReact className='attended-country' highcharts={Highcharts} options={options1} />
        </Col>
      </Row>
      </div>
    
  )
}

export default HCPRegisteredCountry