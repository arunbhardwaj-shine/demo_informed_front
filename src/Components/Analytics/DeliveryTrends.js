import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import GaugeComponent from "./GaugeComponent";

const DeliveryTrends = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sectionLoader, setSectionLoader] = useState(false);
  const [apiCallStatus, setApiCallStatus] = useState(false);
  const activeTab = useRef(1);

  Highcharts.setOptions({
    colors: [
      "#0066BE",
      "#F58289",
      "#FFBE2C",
      "#00D4C0",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });

  const [data, setData] = useState({});
  const [listData, setListData] = useState({});

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async (type = "all") => {
    setSectionLoader(true);
    setApiCallStatus(false);
    try {
      const requestBody = {
        type: type,
      };
      const response = await postData(ENDPOINT.DELIVERYTRENDS, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }

      let g0 = JSON.parse(hadData[0].graph_data);
      let g1 = JSON.parse(hadData[1].graph_data);
      let g2 = JSON.parse(hadData[2].graph_data);
      let g3 = JSON.parse(hadData[3].graph_data);
      let g4 = JSON.parse(hadData[4].graph_data);

      const maxValue = g0.outer_radius + g1.outer_radius;
      const g0_1 = Math.round((g0.outer_radius / maxValue) * 100);
      const g0_2 = Math.round((g0.total_opened_2nd * 100) / g0.outer_radius);
      const g0_3 = Math.round((g0.total_ctr * 100) / g0.outer_radius);
      const g0_4 = Math.round((g0.total_rtr * 100) / g0.outer_radius);
      const g1_1 = Math.round((g1.outer_radius / maxValue) * 100);
      const g1_2 = Math.round((g1.total_opened_2nd * 100) / g1.outer_radius);
      const g1_3 = Math.round((g1.total_ctr * 100) / g1.outer_radius);
      const g1_4 = Math.round((g1.total_rtr * 100) / g1.outer_radius);
      const g2_1 = g2.total_opened_2nd < 100 ? 100 : g2.total_opened_2nd;
      const g2_2 = Math.round((g2.total_ctr * 100) / g2.total_opened_2nd);
      const g2_3 = Math.round((g2.total_rtr * 100) / g2.total_opened_2nd);
      const g3_1 = g3.total_opened_2nd < 100 ? 100 : g3.total_opened_2nd;
      const g3_2 = Math.round((g3.total_ctr * 100) / g3.total_opened_2nd);
      const g3_3 = Math.round((g3.total_rtr * 100) / g3.total_opened_2nd);

      const g4_1 = g4.total_shared_2nd < 100 ? 100 : g4.total_shared_2nd;
      const g4_2 = Math.round(
        (g4.total_opened_2nd * 100) / g4.total_shared_2nd
      );
      const g4_3 = Math.round((g4.total_ctr * 100) / g4.total_shared_2nd);
      const g4_4 = Math.round((g4.total_rtr * 100) / g4.total_shared_2nd);

      const updatedData = {
        tab: {
          g0: [
            {
              name: "Email Send",
              data: [
                {
                  color: Highcharts.getOptions().colors[0],
                  radius: "112%",
                  innerRadius: "88%",
                  y: g0_1,
                  z: g0.outer_radius,
                },
              ],
            },
            {
              name: "Email opened",
              data: [
                {
                  color: Highcharts.getOptions().colors[1],
                  radius: "87%",
                  innerRadius: "63%",
                  y: g0_2,
                  z: g0.total_opened_2nd,
                },
              ],
            },
            {
              name: "Content Opened",
              data: [
                {
                  color: Highcharts.getOptions().colors[2],
                  radius: "62%",
                  innerRadius: "38%",
                  y: g0_3,
                  z: g0.total_ctr,
                },
              ],
            },
            {
              name: "RTR (Read Through Rate)",
              data: [
                {
                  color: Highcharts.getOptions().colors[3],
                  radius: "38%",
                  innerRadius: "18%",
                  y: g0_4,
                  z: g0.total_rtr,
                },
              ],
            },
          ],
          g1: [
            {
              name: "",
              data: [
                {
                  color: Highcharts.getOptions().colors[0],
                  radius: "112%",
                  innerRadius: "88%",
                  y: g1_1,
                  z: g1.outer_radius,
                },
              ],
            },
            {
              name: "Email opening",
              data: [
                {
                  color: Highcharts.getOptions().colors[1],
                  radius: "87%",
                  innerRadius: "63%",
                  y: g1_2,
                  z: g1.total_opened_2nd,
                },
              ],
            },
            {
              name: "CTR",
              data: [
                {
                  color: Highcharts.getOptions().colors[2],
                  radius: "62%",
                  innerRadius: "38%",
                  y: g1_3,
                  z: g1.total_ctr,
                },
              ],
            },
            {
              name: "RTR (Read Through Rate)",
              data: [
                {
                  color: Highcharts.getOptions().colors[3],
                  radius: "38%",
                  innerRadius: "18%",
                  y: g1_4,
                  z: g1.total_rtr,
                },
              ],
            },
          ],

          g2: [
            {
              name: "Activated",
              data: [
                {
                  color: Highcharts.getOptions().colors[1],
                  radius: "87%",
                  innerRadius: "63%",
                  // y: g2_1,
                  y: 100,
                  z: g2.total_opened_2nd,
                },
              ],
            },
            {
              name: "Opened",
              data: [
                {
                  color: Highcharts.getOptions().colors[2],
                  radius: "62%",
                  innerRadius: "38%",
                  y: g2_2,
                  z: g2.total_ctr,
                },
              ],
            },
            {
              name: "RTR",
              data: [
                {
                  color: Highcharts.getOptions().colors[3],
                  radius: "38%",
                  innerRadius: "18%",
                  y: g2_3,
                  z: g2.total_rtr,
                },
              ],
            },
          ],

          g3: [
            {
              name: "Scanned",
              data: [
                {
                  color: Highcharts.getOptions().colors[1],
                  radius: "87%",
                  innerRadius: "63%",
                  y: 100,
                  z: g3.total_opened_2nd,
                },
              ],
            },
            {
              name: "Registered",
              data: [
                {
                  color: Highcharts.getOptions().colors[2],
                  radius: "62%",
                  innerRadius: "38%",
                  y: g3_2,
                  z: g3.total_ctr,
                },
              ],
            },
            {
              name: "RTR ",
              data: [
                {
                  color: Highcharts.getOptions().colors[3],
                  radius: "38%",
                  innerRadius: "18%",
                  y: g3_3,
                  z: g3.total_rtr,
                },
              ],
            },
          ],
          g4: [
            {
              name: "Shared",
              data: [
                {
                  color: Highcharts.getOptions().colors[0],
                  radius: "112%",
                  innerRadius: "88%",
                  y: 100,
                  z: g4.total_shared_2nd,
                },
              ],
            },
            {
              name: "Content Clicked",
              data: [
                {
                  color: Highcharts.getOptions().colors[1],
                  radius: "87%",
                  innerRadius: "63%",
                  y: g4_2,
                  z: g4.total_opened_2nd,
                },
              ],
            },
            {
              name: "Registered",
              data: [
                {
                  color: Highcharts.getOptions().colors[2],
                  radius: "62%",
                  innerRadius: "38%",
                  y: g4_3,
                  z: g4.total_ctr,
                },
              ],
            },
            {
              name: "RTR (Read Through Rate)",
              data: [
                {
                  color: Highcharts.getOptions().colors[3],
                  radius: "38%",
                  innerRadius: "18%",
                  y: g4_4,
                  z: g4.total_rtr,
                },
              ],
            },
          ],
        },
      };

      const updatedListData = {
        tab: {
          g0: [
            { "Email Sent": `${g0_1}% (${g0.outer_radius})` },
            { "Email Opened": `${g0_2}% (${g0.total_opened_2nd})` },
            { "Content opened": `${g0_3}% (${g0.total_ctr})` },
            { RTR: `${g0_4}% (${g0.total_rtr})` },
          ],
          g1: [
            { "": `${g1_1}% (${g1.outer_radius})` },
            { "": `${g1_2}% (${g1.total_opened_2nd})` },
            { "": `${g1_3}% (${g1.total_ctr})` },
            { "": `${g1_4}% (${g1.total_rtr})` },
          ],

          g2: [
            { Activated: `${g2_1} ` },
            { Opened: `${g2_2}% (${g2.total_ctr})` },
            { RTR: `${g2_3}% (${g2.total_rtr})` },
          ],

          g3: [
            { Scanned: `${g3_1} ` },
            { Registered: `${g3_2}% (${g3.total_ctr})` },
            { RTR: `${g3_3}% (${g3.total_rtr})` },
          ],

          g4: [
            { Shared: `${g4_1} ` },
            { "Content Clicked": `${g4_2}% (${g4.total_opened_2nd})` },
            { Registered: `${g4_3}% (${g4.total_ctr})` },
            { RTR: `${g4_4}% (${g4.total_rtr})` },
          ],
        },
      };

      setIsDataFound(true);
      setData(updatedData);
      setListData(updatedListData);
      // setIsTabClicked(true);
      // setData(hadData);
      setSectionLoader(false);
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      setSectionLoader(false);
    }
    setApiCallStatus(true);
  };
  const handleTabChange = (event) => {
    setIsDataFound(false);
    activeTab.current=event
    setSectionLoader(true);
    if (event == 1) {
      getDataFromApi("all");
    } else if (event == 2) {
      getDataFromApi("haematology");
    } else if (event == 3) {
      getDataFromApi("critical_care");
    } else if (event == 4) {
      getDataFromApi("immunology");
    }
  };


  return (
    <>
      <Col className="right-sidebar">

          <div className="custom-container">
            <Row>
            <div className="top-header">
                <div className="page-title d-flex">
                      <h2>Delivery Trends</h2>
                </div>
              </div>
              <div className="create-change-content spc-content analytic-charts">
                  <div className="delivery-trends">
                    <div className="tabs_content_load">
                      <Tabs defaultActiveKey={activeTab.current} onSelect={handleTabChange}>
                        <Tab eventKey="1" title="All Business Units">
                          {isDataFound ? (
                            <GaugeComponent tab={data.tab} list={listData.tab} />
                          ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                        }
                        </Tab>
                        <Tab eventKey="2" title="Haematology">
                        {isDataFound ? (
                          <GaugeComponent tab={data.tab} list={listData.tab} />
                          ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                        }
                        </Tab>
                        <Tab eventKey="3" title="Critical Care">
                        {isDataFound ? (
                          <GaugeComponent tab={data.tab} list={listData.tab} />
                        ) :
                        apiCallStatus ?
                        <div className="no_found">
                               <p>No Data Found</p>
                         </div>
                         : null
                        }
                        </Tab>
                        <Tab eventKey="4" title="Immunotherapy">
                        {isDataFound ? (
                          <GaugeComponent tab={data.tab} list={listData.tab} />
                        ) :
                          apiCallStatus ?
                          <div className="no_found">
                                 <p>No Data Found</p>
                           </div>
                           : null
                         }
                        </Tab>
                      </Tabs>

                      {
                        sectionLoader ?
                        <div className={"loader tab-inside "+ (sectionLoader ? 'show' : '')} id="custom_loader">
                          <div className="loader_show"><span className="loader-view"> </span></div>
                        </div>
                        : ''
                      }
                    </div>
                  </div>
              </div>
            </Row>
          </div>

      </Col>
    </>
  );
};
export default DeliveryTrends;
