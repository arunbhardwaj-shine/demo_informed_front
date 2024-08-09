import React, { useEffect, useState } from "react";
import { Col, Row,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getData } from "../../axios/apiHelper";
import { HighchartsReact } from "highcharts-react-official";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { getDataRd } from "../../axios/apiInstanceHelper";
import { ENDPOINT } from "../../axios/apiConfig";

const IRTRole = ()  => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const colors = ["#8A4E9C","#0066be",'#FAC755', "#39CABC", "#FF9534",'#F58289','#97b6cf33' ,"#a40711"];
    const navigate = useNavigate();
    const [apiCallStatus, setApiCallStatus] = useState(false);
    const images={
      0:"site-user-blinded.svg", 
      1:"investigator-blinded.svg",
      2:"blinded-pharmacist.svg",
      3:"IRT-doctor.svg"
    }
    const pieOptions = {
      chart: {
        type: "pie",
        custom: {},
        height: 105,
        width: 105,
      },
      title: {
        text: "",
        align: "left",
      },
      exporting: {
        enabled: false,
      },
    
      tooltip: {
        formatter: function() {
          if (this.point.isPlaceholder) {
            return '0';
          } else {
            return  `${this.point.name}: <b>${this.point.y}</b>`
          }
        }
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
          innerSize: 100,
          dataLabels: {
            enabled: false
          }
        }
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
        let response = await getDataRd(`${ENDPOINT.IRT_COUNT_BY_CATEGORY}`);   
        let result = response?.data?.data;
        let finalRoleData = {};  
        Object.keys(result).forEach((roleKey,index) => {
          if(roleKey!="All IRTs"){         
          const roleInfo = result[roleKey];
          let pieChartData=[]
          if(roleInfo?.all!=0){
            pieChartData = [
              {
                name: "",
                colorByPoint: true,
                data: [
                  { name: "New", y: roleInfo.new || 0, color: colors[0] },
                  { name: "Invited", y: roleInfo.invited || 0, color: colors[1] },
                  { name: "Started", y: roleInfo.started || 0, color: colors[2] },                
                  { name: "Completed", y: roleInfo.completed || 0, color: colors[3] },
                  { name: "Not Completed", y: roleInfo.notCompleted || 0, color: colors[4] },
                  { name: "Ignored", y: roleInfo.ignored || 0, color: colors[5] },
                  { name: "Blocked", y: roleInfo.Blocked || 0, color: colors[7] },
                ],
                size: "110%",
                innerSize: "60%",
              },
            ];
          }else{
            pieChartData = [
              {
                name: "",
                colorByPoint: true,
                data: [
                  { 
                    name: "No user", 
                    y:1, 
                    color: 'rgba(151, 182, 207, 0.2)' ,
                    isPlaceholder: true},
                ],
                size: "110%",
                innerSize: "60%",
              },
            ];
          }
          const events= updatingChartImage(index)  
          const newPieOptions = {
            ...pieOptions,
            chart:{
              ...pieOptions.chart,
              events:events
            },
            series: pieChartData,
          };
  
          finalRoleData[roleKey] = {
            ...roleInfo,
            pieChartOptions: newPieOptions,
          };
        }});
  
        setRoleData(finalRoleData);        
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
      finally{
        setApiCallStatus(true)
        loader("hide")  
      }
    };

    function updatingChartImage(index){
     const events= {
        load() {
          let innerSize = this.userOptions.plotOptions.pie.innerSize,
            chart = this;
          chart.myImage = this.renderer.image(path_image+images[index],41,36,24,24).add();
        },
        
        redraw() {
          let chart = this,
            innerSize = this.userOptions.plotOptions.pie.innerSize;
  
          if (chart.myImage) {
            chart.myImage.attr({
              x:41,
              y:36,
              height:24,
              width:24,
            });
          }
        }
      } 
      return events
    }
    const navigateToEmailList = (pdfId, role) => {    
          const IRTData = { pdfId, IRTFlag: 1, siteRole: role };
          localStorage.setItem("IRTFlag", 1);
          navigate("/RD-EmailList", { state: { IrtObj: IRTData } });
        };
    const pathToImage = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    return (
     <>
    <Col className="right-sidebar custom-change">
      <div className="custom-container">
        <Row>
          <div className="top-header sticky">
            <div className="page-title">
              <h2>Email IRT</h2>
            </div>
          </div>
          <div className="irt_mandatory irt_create_role">          
              
              {Object.keys(roleData)?.length? Object.keys(roleData)?.map((roleKey,index)=>{

                 const role = roleData[roleKey];
                 return(
                 <div className="irt_mandatory-block w-100">
                <div className="irt_mandatory-listing">
                 <div className="irt_mandatory-section"  >
                 <h3 onClick={()=>navigateToEmailList(parseInt(role?.pdf_id), roleKey)}>{roleKey}</h3>
                 <div className="d-flex align-items-center irt-content-preview">
                   <div className="count-number">{role?.all}</div>
                   {/* {(role.pieChartOptions.series[0].data[0].y || role.pieChartOptions.series[0].data[1].y) ? ( */}
                        <HighchartsReact highcharts={Highcharts} options={role.pieChartOptions} />
                      {/* ):null} */}
                   <div className="d-flex mandatory-section">
                   <Col className="new">
                     <p>New</p>
                     <div className="irt-value"><span>&nbsp;</span>{(role?.all!=0&&role?.new!=0)? `${Math.round((role?.new/role?.all)*100)}`:0}%&nbsp; ({role?.new})</div>
                   </Col>
                   <Col className="invited">
                     <p>Invited</p>
                     <div className="irt-value"><span>&nbsp;</span>{(role?.all!=0&&role?.invited!=0)? `${Math.round((role?.invited/role?.all)*100)}`:0}%&nbsp; ({role?.invited})</div>
                   </Col>
                   <Col className="started">
                     <p>Started</p>
                     <div className="irt-value"><span>&nbsp;</span>{(role?.all!=0&&role?.started!=0)? `${Math.round((role?.started/role?.all)*100)}`:0}%&nbsp; ({role?.started})</div>
                   </Col>
                   <Col className="completed">
                     <p>Completed</p>
                     <div className="irt-value"><span>&nbsp;</span>{(role?.all!=0&&role?.completed!=0)? `${Math.round((role?.completed/role?.all)*100)}`:0}%&nbsp; ({role?.completed})</div>
                   </Col>
                   <Col className="not-completed">
                     <p>Not Completed</p>
                     <div className="irt-value"><span>&nbsp;</span>{(role?.all!=0&&role?.notCompleted!=0)? `${Math.round((role?.notCompleted/role?.all)*100)}`:0}%&nbsp; ({role?.notCompleted})</div>
                   </Col>
                   <Col className="ignored">
                     <p>Ignored</p>
                     <div className="irt-value"><span>&nbsp;</span>{(role?.all!=0&&role?.ignored!=0)? `${Math.round((role?.ignored/role?.all)*100)}`:0}%&nbsp; ({role?.ignored})</div>
                   </Col>
                   <Col className="blocked">
                     <p>Blocked</p>
                     <div className="irt-value"><span>&nbsp;</span>{(role?.all!=0&&role?.Blocked!=0)? `${Math.round((role?.Blocked/role?.all)*100)}`:0}%&nbsp; ({role?.Blocked})</div>
                   </Col>
                    <Button onClick={()=>navigateToEmailList(parseInt(role?.pdf_id), roleKey)} className="irt_mandatory-link default">
                       <img src={path_image +"right-arrow.svg"} alt=""/>
                      
                    </Button>
                   </div>
                 </div>
             </div>
             </div>
             </div>
             )
              }):
              apiCallStatus ? (
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              ) :null
              }
          </div>
        </Row>
      </div>
    </Col>
        </>
    )
}

export default IRTRole;

