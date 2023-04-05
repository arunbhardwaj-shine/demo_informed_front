import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import _ from "lodash";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsSankey from "highcharts/modules/sankey";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsSankey(Highcharts);
HighchartsDependencyWheel(Highcharts);

const TrendingTopics = () => {
  const [options, setOptions] = useState({
    chart: {
      marginTop: 100,
      type: "depandency wheel",
      width: 600,
      height: 600,
    },

    title: {
      text: "Trending Topics",
    },

    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. From {point.from} to {point.to}: {point.weight}.",
      },
    },
    exporting: {
      showTable: true,
      tableCaption: "",
    },

    series: [
      {
        keys: ["from", "to", "weight"],

        data: [
          ["Brazil", "Portugal", 5],

          ["Brazil", "France", 1],

          ["Brazil", "Spain", 1],

          ["Brazil", "England", 1],

          ["Canada", "Portugal", 1],

          ["Canada", "France", 5],

          ["Canada", "England", 1],

          ["Mexico", "Portugal", 1],

          ["Mexico", "France", 1],

          ["Mexico", "Spain", 5],

          ["Mexico", "England", 1],

          ["USA", "Portugal", 1],

          ["USA", "France", 1],

          ["USA", "Spain", 1],

          ["USA", "England", 5],

          ["Portugal", "Angola", 2],

          ["Portugal", "Senegal", 1],

          ["Portugal", "Morocco", 1],

          ["Portugal", "South Africa", 3],

          ["France", "Angola", 1],

          ["France", "Senegal", 3],

          ["France", "Mali", 3],

          ["France", "Morocco", 3],

          ["France", "South Africa", 1],

          ["Spain", "Senegal", 1],

          ["Spain", "Morocco", 3],

          ["Spain", "South Africa", 1],

          ["England", "Angola", 1],

          ["England", "Senegal", 1],

          ["England", "Morocco", 2],

          ["England", "South Africa", 7],

          ["South Africa", "China", 5],

          ["South Africa", "India", 1],

          ["South Africa", "Japan", 3],

          ["Angola", "China", 5],

          ["Angola", "India", 1],

          ["Angola", "Japan", 3],

          ["Senegal", "China", 5],

          ["Senegal", "India", 1],

          ["Senegal", "Japan", 3],

          ["Mali", "China", 5],

          ["Mali", "India", 1],

          ["Mali", "Japan", 3],

          ["Morocco", "China", 5],

          ["Morocco", "India", 1],

          ["Morocco", "Japan", 3],

          ["Japan", "Brazil", 1],
        ],

        type: "dependencywheel",

        name: "Dependency wheel series",

        dataLabels: {
          color: "#333",

          style: {
            textOutline: "none",
          },

          textPath: {
            enabled: true,
          },

          distance: 10,
        },

        size: "95%",
      },
    ],
    credits: {
      enabled: false,
    },
  });

  return (
    <>
      <Col className="right-sidebar">
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
                <h2>Trending Topics</h2>
              </div>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div className="form_action">
                <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group ">
                    <label htmlFor="">Filter By</label>
                    <Select
                      //   options={All}
                      placeholder="All"
                      //   onChange={filterDataByDataType}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                    <Select
                      //   options={Year}
                      placeholder="Year"
                      //   onChange={filterDataByYear}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable
                    />
                  </div>
                </Form>
              </div>
              {/* {isDataFound ? ( */}
              <div className="high_charts">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
              {/* // ) : null} */}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default TrendingTopics;
