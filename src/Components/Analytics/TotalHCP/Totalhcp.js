import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ENDPOINT } from "../../../axios/apiConfig";
import { getData } from "../../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import { Link } from "react-router-dom";

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

  // const [tableData, setTableData] = useState([]);
  const [isDataNotFound, setIsDataNotFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getDataFromApi = async () => {
    try {
      const response = await getData(ENDPOINT.ANALYTICS);
      const data = response.data.data;
      if (data.length <= 0) {
        setIsDataNotFound(true);
      }
      console.log(data);

      // Set options for HCP chart
      const newSeries = data.map((item) => ({
        name:
          item.ibu +
          " ( " +
          JSON.parse(item.total_readers).reduce((acc, val) => acc + val, 0) +
          ")",
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
        name:
          item.ibu +
          " ( " +
          JSON.parse(item.total_readers).reduce((acc, val) => acc + val, 0) +
          ")",
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
    setIsLoaded(true);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <>
      <Col className="right-sidebar">
        {isDataNotFound && isLoaded ? (
          <h3>Data Not Found</h3>
        ) : isLoaded ? (
          <div className="custom-container">
            <Row>
              <div className="top-header">
              <div className="page-title d-flex">
                <Link className="btn btn-primary btn-bordered back-btn" to="/top-clients">
                  <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z" fill="#97B6CF"/>
                  </svg>
                </Link>
                <h2>Total HCP</h2>
              </div>
            </div>
             <div className="create-change-content spc-content analytic-charts">
                <div className="high_charts">
                  <HighchartsReact highcharts={Highcharts} options={hcpOptions} />
               </div>
               <div className="high_charts">
                  <HighchartsReact highcharts={Highcharts} options={lineOptions}/>
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
