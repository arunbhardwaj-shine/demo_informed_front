import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../axios/apiHelper";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { loader } from "../../../loader";
import { getDataRd } from "../../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../../axios/apiConfig";

const IRTMandatory = ()  => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
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
    const navigateToEmailList = ( role) => {
      console.log("role-->",role)
  
      localStorage.setItem("IRTFlag", 1);
      navigate("/new-readers-reviews", { state: {siteRole: role } });
    };

    const pathToImage = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    return (
     <>
    <Col className="right-sidebar custom-change">
      <div className="custom-container">
        <Row>
          <div className="top-header sticky">
            <div className="page-title">
              <h2>IRTs</h2>
            </div>
          </div>
          <div className="irt_mandatory irt_create_role d-flex flex-wrap">
           {Object.keys(roleData).map((roleKey) => {
              const role = roleData[roleKey]; 
               return ( 
                <Col className="irt-create">
                  <div className="irt-create-upper">
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="count-number">{role?.total}</div>
                      <img src={path_image + "site-user-blinded.svg"} alt="" />
                    </div>
                    {/* <div>
                      <h3>Site User-Blinded</h3>
                    </div> */}
                     <div 
                     onClick={() => navigateToEmailList( role?.user_role)}
                     >
                      <h3>{role?.user_role}</h3>
                    </div>
                  </div>
                  <div className="irt-status">
                    <div className="started">
                      <p>Started</p>
                      <div className="irt-value"><span>&nbsp;</span>{Math.floor(role?.notcompleted_percentage)}%</div>
                    </div>
                    <div className="completed">
                      <p>Completed</p>
                      <div className="irt-value"><span>&nbsp;</span>{Math.floor(role?.completed_percentage)}%</div>
                    </div>
                    <div className="ignored">
                      <p>Ignored</p>
                      <div className="irt-value"><span>&nbsp;</span>{Math.floor(role?.pending_percentage || 0)}%</div>
                    </div>
                    <div className="bar-chart">
                        {/* <img src={path_image + "irt-dummy-pie.png"} alt=""/> */}
                        {(role.pieChartOptions.series[0].data[0].y || role.pieChartOptions.series[0].data[1].y) && (
                        <HighchartsReact highcharts={Highcharts} options={role.pieChartOptions} />
                      )}
                    </div>
                  </div>
                </Col>
                ); 
             })}  
              <Col className="irt-create">
                  <div className="irt-create-upper">
                    <div className="d-flex justify-content-end align-items-center">
                      <div className="count-number">435</div>
                      <img src={path_image + "IRT-doctor.svg"} alt="" />
                    </div>
                    <div>
                      <h3>All IRTs</h3>
                    </div>
                  </div>
                  <div className="irt-status">
                    <div className="started">
                      <p>Started</p>
                      <div className="irt-value"><span>&nbsp;</span>30%</div>
                    </div>
                    <div className="completed">
                      <p>Completed</p>
                      <div className="irt-value"><span>&nbsp;</span>60%</div>
                    </div>
                    <div className="ignored">
                      <p>Ignored</p>
                      <div className="irt-value"><span>&nbsp;</span>10%</div>
                    </div>
                    <div className="bar-chart">
                        <img src={path_image + "irt-dummy-pie.png"} alt=""/>
                    </div>
                  </div>
              </Col>
              <div className="irt_mandatory-block">
                <div className="irt_mandatory-listing">
                  <div className="">
                      <h3>Site User-Blinded</h3>
                      <div className="d-flex align-items-center irt-content-preview">
                        <div className="count-number">203</div>
                        <img src={path_image+""} alt=""/>
                        <Col className="new">
                          <p>New</p>
                          <div className="irt-value"><span>&nbsp;</span>30%</div>
                        </Col>
                        <Col className="invited">
                          <p>Invited</p>
                          <div className="irt-value"><span>&nbsp;</span>10%</div>
                        </Col>
                        <Col className="started">
                          <p>Started</p>
                          <div className="irt-value"><span>&nbsp;</span>20%</div>
                        </Col>
                        <Col className="completed">
                          <p>Completed</p>
                          <div className="irt-value"><span>&nbsp;</span>60%</div>
                        </Col>
                        <Col className="not-completed">
                          <p>Not Completed</p>
                          <div className="irt-value"><span>&nbsp;</span>5%</div>
                        </Col>
                        <Col className="ignored">
                          <p>Ignored</p>
                          <div className="irt-value"><span>&nbsp;</span>4%</div>
                        </Col>
                      </div>
                  </div>
                </div>
              </div>
          </div>
        </Row>
      </div>
    </Col>
        </>
    )
}

export default IRTMandatory;
