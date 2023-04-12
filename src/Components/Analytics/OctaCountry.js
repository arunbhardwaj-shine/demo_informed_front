import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


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
      }
      
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
        showZero: true
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
      series: []
    };

   const OctaCountry = () => {
  const [selectedSeries, setSelectedSeries] = useState('');
    
  const handleChange = (event) => {
    setSelectedSeries(event.target.value);
  }
    
  const filteredSeries = selectedSeries ? options.series.filter(series => series.name === selectedSeries) : options.series;
  const filteredOptions = { ...options, series: filteredSeries };
  
  const filteredBarData = filteredSeries.map(series => {
    const data = series.data.map(value => {
      return selectedSeries && series.name !== selectedSeries ? 0 : value;
    });
    return { name: series.name, data };
  });
  
  const filteredOptions2 = { ...optionss, series: filteredBarData };

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