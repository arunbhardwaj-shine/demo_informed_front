import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";

import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";

import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";

exporting(Highcharts);
exportData(Highcharts);
Highcharts.setOptions({
    colors: ['#FFBE2C', '#F58289', '#00D4C0', '#D61975', '#0066BE', '#db6f2c', '#9af5b2', '#00003C', '#9C9CA2', '#7cb0dd', '#7c00ad', '#009739', '#BCA9F5']
  });
  
 
const options = {
    title: {
      text: 'Total HCPs'
    },
    xAxis: {
      categories: ['Brfore Mar (2022)', 'Mar (2022)', 'Apr (2022)', 'May (2022)', 'Jun (2022)',
        'Jul (2022)', 'Aug (2022)', 'Sep (2022)', 'Oct (2022)', 'Nov (2022)', 'Dec (2022)', 'Jan (2023)', 'Feb(2023)', 'Mar (2023)']
    },
    yAxis: {
      title: {
        text: 'Number of Visitors'
      },
      
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
        series: {
           stacking: "normal",
          dataLabels: {
            enabled: true,
            format: "{point.y}"
          }
        },
      },
    series: [{
        name: 'Berlin',
        data: [9, 9, 9, 9, 9, 9, 9, 9, 14, 14, 14, 14,14,14]
      }, {
        name: 'London',
        data: [3, 4, 5, 8, 11, 15, 17, 17, 17, 17, 18, 18, 18,18]
      }, {
        name: 'Austria',
        data: [8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9]
      }]
    };



    const optionss = {
      chart: {
        type: 'bar',
        height: '50%'
      },
      title: {
        text: 'Sales by Product Category'
      },
      
      xAxis: {
        categories: ['Brfore Mar (2022)', 'Mar (2022)', 'Apr (2022)', 'May (2022)', 'Jun (2022)',
          'Jul (2022)', 'Aug (2022)', 'Sep (2022)', 'Oct (2022)', 'Nov (2022)', 'Dec (2022)', 'Jan (2023)', 'Feb(2023)', 'Mar (2023)'].reverse(),
      },
      yAxis: {
        title: {
          text: 'Total Sales'
        },
        
      },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        x: 0,
        y: 0
      },
      plotOptions: {
        series: {
          // stacking: 'normal'
        }
      },
      series: [{
        name: 'Berlin',
        data: [9, 9, 9, 9, 9, 9, 9, 9, 14, 14, 14, 14,14,14]
      }, {
        name: 'London',
        data: [3, 4, 5, 8, 11, 15, 17, 17, 17, 17, 18, 18, 18,18]
      }, {
        name: 'Austria',
        data: [8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9]
      }]
    };

    const OctaCountry = () => {
      const [selectedSeries, setSelectedSeries] = useState('');
    
      const handleChange = (event) => {
        setSelectedSeries(event.target.value);
      }
    
      const filteredSeries = selectedSeries ? options.series.filter(series => series.name === selectedSeries) : options.series;

// find the minimum value in the series
const minValue = Math.min(...filteredSeries[0].data);

// subtract the minimum value from each data point in the series
const modifiedSeries = filteredSeries.map(series => ({
  ...series,
  data: series.data.map(value => Math.abs(value - minValue))
}));

const filteredOptions = { ...options, series: modifiedSeries };
const filteredOptions2 = { ...optionss, series: modifiedSeries };
    console.log("filt1",filteredSeries)
    console.log("filt2",filteredOptions)
    console.log("filt3",filteredOptions2)


      
      return (
        <Col className="right-sidebar">
          <div className="custom-container">
            <Row>
              <div className="top-header">
                <label>
                  <select value={selectedSeries} onChange={handleChange}>
                    <option value="">All</option>
                    {options.series.map((series) => (
                      <option key={series.name} value={series.name}>
                        {series.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </Row>
            <Row>
              <HighchartsReact highcharts={Highcharts} options={filteredOptions} />
            </Row>
            <Row>
              <HighchartsReact highcharts={Highcharts} options={filteredOptions2} />
            </Row>
          </div>
        </Col>
      );
    };
      
      export default OctaCountry;