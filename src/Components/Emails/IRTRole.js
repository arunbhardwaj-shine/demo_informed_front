import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getData } from "../../axios/apiHelper";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { getDataRd } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";

const IRTRole = () => {
  const colors = ["#39CABC", "#FFCACD", "#DECBE3", "#986CA5", "#004A89"];
  const navigate = useNavigate();
  const pieOptions = {
    chart: {
      type: "pie",
      height: 100,
      width: 100,
    },
    title: {
      text: "",
      align: "left",
    },
    exporting: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      verticalAlign: "bottom",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false, 
        },
      },
    },
    series: [],
  };
  
  const [roleData, setRoleData] = useState({});

  useEffect(() => {
    loader("show")
    fetchPieChartData();
  }, []);

  const fetchPieChartData = async () => {
    try {
      let response = await getDataRd(`${ENDPOINT.EMAIL_COUNT_GRAPH}`);

      let result = response?.data?.data;
      let finalRoleData = {};

      Object.keys(result).forEach((roleKey) => {
        const roleInfo = result[roleKey];
        const pieChartData = [
          {
            name: "",
            colorByPoint: true,
            data: [
              { name: "Completed", y: roleInfo.completed || 0, color: colors[0] },
              { name: "Started", y: roleInfo.notcompleted || 0, color: '#FFBE2C' },
              { name: "Ignored", y: roleInfo.pending || 0, color: '#f58289' },
            ],
          },
        ];

        const newPieOptions = {
          ...pieOptions,
          series: pieChartData,
        };

        finalRoleData[roleKey] = {
          ...roleInfo,
          pieChartOptions: newPieOptions,
        };
      });

      setRoleData(finalRoleData);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
    finally{
      loader("hide")

    }
  };

  const navigateToEmailList = (pdfId, role) => {
    
    const IRTData = { pdfId, IRTFlag: 1, siteRole: role };
    localStorage.setItem("IRTFlag", 1);
    navigate("/RD-EmailList", { state: { IrtObj: IRTData } });
  };

  const pathToImage = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

  return (
    <Col className="right-sidebar custom-change">
      <div className="custom-container">
        <Row>
          <div className="top-header sticky">
            <div className="page-title">
              <h2>Email IRT</h2>
            </div>
          </div>
          <div className="landing-layout irt_create_role d-flex">
            {Object.keys(roleData).map((roleKey) => {
              const role = roleData[roleKey];
              return (
                <Col key={roleKey} className="irt-create">
                  <div className="irt-create-upper">
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="count-number">{role.total}</div>
                      <img src={`${pathToImage}IRT-doctor.svg`} alt="" />
                    </div>
                    <div onClick={() => navigateToEmailList(parseInt(roleKey), role.user_role)}>
                      <h3>{role.user_role}</h3>
                    </div>
                  </div>
                  <div className="irt-status">
                    <div className="started">
                      <p>Started</p>
                      <div className="irt-value"><span></span>{Math.floor(role.notcompleted_percentage)}%</div>
                    </div>
                    <div className="completed">
                      <p>Completed</p>
                      <div className="irt-value"><span></span>{Math.floor(role.completed_percentage)}%</div>
                    </div>
                    <div className="ignored">
                      <p>Ignored</p>
                      <div className="irt-value"><span></span>{Math.floor(role.pending_percentage || 0)}%</div>
                    </div>
                    <div className="bar-chart">
                      {(role.pieChartOptions.series[0].data[0].y || role.pieChartOptions.series[0].data[1].y) && (
                        <HighchartsReact highcharts={Highcharts} options={role.pieChartOptions} />
                      )}
                    </div>
                  </div>
                </Col>
              );
            })}
          </div>
        </Row>
      </div>
    </Col>
  );
};

export default IRTRole;
