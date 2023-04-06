import React, { useState, useEffect, useRef } from "react";
import { loader } from "../../loader";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import Highcharts from "highcharts";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import GaugeComponent from "./GaugeComponent";


const DeliveryTrends = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const selectFilter = useRef(null);


  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#00D4C0",
      "#D61975",
      "#0066BE",
      "#FFBE2C",
      "#F0EEE4",
      "#00003C",
    ],
  });

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

  const data = {
    tab0: {
      g0: [
        {
          name: "Email Send",
          data: [
            {
              color: Highcharts.getOptions().colors[0],
              radius: "112%",
              innerRadius: "88%",
              y: 52,
              z: 12,
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
              y: 0,
              z: 22,
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
              y: 22,
              z: 12,
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
              y: 25,
              z: 22,
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
              y: 12,
              z: 12,
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
              y: 0,
              z: 22,
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
              y: 22,
              z: 12,
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
              y: 25,
              z: 22,
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
              y: 0,
              z: 22,
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
              y: 22,
              z: 12,
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
              y: 25,
              z: 22,
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
              y: 0,
              z: 22,
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
              y: 22,
              z: 12,
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
              y: 25,
              z: 22,
            },
          ],
        },
      ],
      g4: [
        {
          name: "",
          data: [
            {
              color: Highcharts.getOptions().colors[0],
              radius: "112%",
              innerRadius: "88%",
              y: 100,
              z: 12,
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
              y: 0,
              z: 22,
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
              y: 22,
              z: 12,
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
              y: 25,
              z: 22,
            },
          ],
        },
      ],
    },

    tab1: {
      g0: [
        {
          name: "Email Send",
          data: [
            {
              color: Highcharts.getOptions().colors[0],
              radius: "112%",
              innerRadius: "88%",
              y: 52,
              z: 12,
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
              y: 0,
              z: 22,
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
              y: 22,
              z: 12,
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
              y: 25,
              z: 22,
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
              y: 12,
              z: 12,
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
              y: 10,
              z: 22,
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
              y: 12,
              z: 12,
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
              y: 25,
              z: 22,
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
              y: 60,
              z: 22,
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
              y: 52,
              z: 12,
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
              y: 25,
              z: 22,
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
              y: 30,
              z: 22,
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
              y: 72,
              z: 12,
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
              y: 25,
              z: 22,
            },
          ],
        },
      ],
      g4: [
        {
          name: "",
          data: [
            {
              color: Highcharts.getOptions().colors[0],
              radius: "112%",
              innerRadius: "88%",
              y: 100,
              z: 12,
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
              y: 30,
              z: 22,
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
              y: 52,
              z: 12,
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
              y: 75,
              z: 22,
            },
          ],
        },
      ],
    },
    tab2: {
      g0: [
        {
          name: "Email Send",
          data: [
            {
              color: Highcharts.getOptions().colors[0],
              radius: "112%",
              innerRadius: "88%",
              y: 100,
              z: 12,
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
              y: 99,
              z: 22,
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
              y: 72,
              z: 12,
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
              y: 55,
              z: 22,
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
              y: 72,
              z: 12,
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
              y: 10,
              z: 22,
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
              y: 72,
              z: 12,
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
              y: 75,
              z: 22,
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
              y: 60,
              z: 22,
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
              y: 52,
              z: 12,
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
              y: 25,
              z: 22,
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
              y: 30,
              z: 22,
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
              y: 72,
              z: 12,
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
              y: 25,
              z: 22,
            },
          ],
        },
      ],
      g4: [
        {
          name: "",
          data: [
            {
              color: Highcharts.getOptions().colors[0],
              radius: "112%",
              innerRadius: "88%",
              y: 100,
              z: 12,
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
              y: 30,
              z: 22,
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
              y: 52,
              z: 12,
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
              y: 75,
              z: 22,
            },
          ],
        },
      ],
    },
  };

  const [topClientOptions, setTopClientOptions] = useState({
    chart: {
      marginTop: 100,
      type: "bar",
      events: {
        load: function () {
          let categoryHeight = 35;
          this.update({
            chart: {
              height:
                categoryHeight * this.pointCount +
                (this.chartHeight - this.plotHeight),
            },
          });
        },
      },
    },
    title: {
      text: "Country Stats",
    },
    xAxis: {
      categories: [],
    },
    credits: {
      enabled: false,
    },
    exporting: {
      showHighchart: true,
      showTable: true,
      tableCaption: "",
    },
    legend: {
      reversed: true,
      align: "center",
      verticalAlign: "top",
      floating: true,
      x: 0,
      y: 50,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "gray",
        },
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },

    series: [],
  });

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      const requestBody = {
        type: "Openingcountry",
        filter: "",
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;
      if (hadData.length <= 0) {
        setIsDataFound(false);
      }
      // console.log(hadData);
      const categories = hadData?.name;

      const newSeries = [
        {
          name: `Readers (${hadData.readerTotal})`,
          data: hadData.reader,
          color: Highcharts.getOptions().colors[1],
        },
        {
          name: `Views (${hadData.viewTotal})`,
          data: hadData.view,
          color: Highcharts.getOptions().colors[2],
        },
        {
          name: `Quantity Sold (${hadData.soldTotal})`,
          data: hadData.sold,
          color: Highcharts.getOptions().colors[0],
        },
      ];

      const newClientOptions = {
        ...topClientOptions,
        xAxis: { categories: categories },
        series: newSeries,
      };

      setTopClientOptions(newClientOptions);
      // console.log(topClientOptions)
      setIsDataFound(true);
      // setData(hadData);

      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      loader("hide");
    }
    // console.log(chart.current);
  };
const handleTabChange=(event)=>{
  // alert(event)
}


  return (
    <>
      <Col className="right-sidebar">
        {isDataFound ? (
          <div className="custom-container">
            <Row>
              <Tabs defaultActiveKey="1" onSelect={handleTabChange}>
                <Tab eventKey="1" title="All Business Units">
                  <GaugeComponent tab={data.tab0} />
                </Tab>
                <Tab eventKey="2" title="Haematology">
                  <GaugeComponent tab={data.tab1} />
                </Tab>
                <Tab eventKey="3" title="Critical Care">
                  <GaugeComponent tab={data.tab2} />
                </Tab>
                <Tab eventKey="4" title="Immunotherapy">
                  <GaugeComponent tab={data.tab0} />
                </Tab>
              </Tabs>
            </Row>
          </div>
        ) : null}
      </Col>
    </>
  );
};

export default DeliveryTrends;
