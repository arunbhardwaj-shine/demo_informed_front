import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ENDPOINT } from "../../../axios/apiConfig";
import { getData } from "../../../axios/apiHelper";
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);

// base bar highchart
const Totalhcp = () => {
  const [hcpOptions, setHcpOptions] = useState({
    chart: {
      type: "bar",
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
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    exporting: {
      enabled: true,
    },
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
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      x: 0,
      y: 0
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.y}"
        }
      },
    },
    series: [],
  });

  // const [tableData, setTableData] = useState([]);
  const [isDataNotFound, setIsDataNotFound] = useState(false);
  const [isLoaded ,setIsLoaded] = useState(false);
 
  const getDataFromApi = async () => {
    try {
      const response = await getData(ENDPOINT.ANALYTICS);
      const data = response.data.data;
      if(data.length <= 0){
        setIsDataNotFound(true);
      }
      console.log(data);

      // Set options for HCP chart
      const newSeries = data.map((item) => ({
        name: item.ibu + ' ( ' + JSON.parse(item.total_readers).reduce((acc, val) => acc + val, 0) + ')',
        data: JSON.parse(item.total_readers),
      }));
      const categories = JSON.parse(data[0].Months);
      const newHcpOptions = {
        ...hcpOptions,
        xAxis: {
          categories: categories,
        },
        series: newSeries,
      };
      setHcpOptions(newHcpOptions);


      // Set options for Base line chart
      const lineSeries = data.map((item) => ({
        name: item.ibu + ' ( ' + JSON.parse(item.total_readers).reduce((acc, val) => acc + val, 0) + ')',
        data: item.hcp,
      }));
      const lineCategories = JSON.parse(data[0].Months);
      const newLineOptions = {
        ...lineOptions,
        xAxis: {
          categories: lineCategories,
        },
        series: lineSeries,
      };
      setLineOptions(newLineOptions);


    //   // Create table data
    //   const newTableData = data.map((item) => {
    //     return {
    //       ibu: item.ibu  + ' ( ' + JSON.parse(item.total_readers).reduce((acc, val) => acc + val, 0) + ')',
    //       months: JSON.parse(item.Months),
    //       // beforevalue: item.beforeValue,
    //       totalsum: item.totalSum,
    //     };
    //   });
    //  console.log(newTableData);

    // //  let monthsData=[];
    // //  monthsData.push(newTableData[0].months.map((val,i)=>{
    // //   return val;
    // //  }))

    // //  setMonthTable(monthsData)
    //  //console.log(monthsData);
    //  setTableData(newTableData);


    } catch (error) {
      setIsDataNotFound(true);
      console.log(error);
    }
    setIsLoaded(true)
  };

  useEffect(() => {
    getDataFromApi();
  }, []);


  return (
    <>
   
      <Col className="right-sidebar">
      {isDataNotFound && isLoaded ?<h3>Data Not Found</h3>: isLoaded?
        <div className="custom-container">
          <Row>
            <div className="page-top-nav">
              <HighchartsReact highcharts={Highcharts} options={hcpOptions} />
            </div>
          </Row>
          <Row>
            <div className="page-top-nav">
              <HighchartsReact
                highcharts={Highcharts} options={lineOptions} />
            </div>
          </Row>
          
        </div>:null }
      </Col>
    </>
  );
};

export default Totalhcp;
