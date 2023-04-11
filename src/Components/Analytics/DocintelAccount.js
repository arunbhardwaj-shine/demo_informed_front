import React ,{useState} from "react";
import { Col, Image, Row, Button } from "react-bootstrap";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";

highchartsMore(Highcharts);
solidGauge(Highcharts);




const DocintelAccount = ({ data }) => {
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
  
  const [gaugeOptions,setGaugeOptions] = useState();
  return (
    <>
     {data!=null?
      data.map((element, index) => {
        console.log(element.country)
        return (
         
          <Row key={index}>
           <Col sm={2} md={2} className="img-box justify-content-center">
             
                <Image
                  src={element?.pdf_data.Pdf?.image}
                  alt="Image not availble"
                />
              </Col>
            <Col>
              <Row>
                <Col>
                  <h3> {element?.pdf_data?.Pdf?.title}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>{element?.pdf_data?.Pdf?.pdf_sub_title}</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button className="btn next-content btn-bordered">
                    Preview Article
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col>
              <HighchartsReact highcharts={Highcharts} options={{
    chart: {
      type: "solidgauge",
      height: "50%",
    },
    title: {
      text: "",
      style: {
        fontSize: "11px",
      },
    },
    exporting: {
      enabled: false,
    },
    tooltip: {
      borderWidth: 0,
      backgroundColor: "none",
      shadow: false,
      style: {
        fontSize: "10px",
      },
      valueSuffix: "%",
      pointFormat:
        '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
      positioner: function (labelWidth) {
        return {
          x: (this.chart.chartWidth - labelWidth) / 2,
          y: this.chart.plotHeight / 2 + 15,
        };
      },
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
       
        {
          outerRadius: "87%",
          innerRadius: "63%",
          backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
            .setOpacity(0.3)
            .get(),
          borderWidth: 0,
        },
        {
          outerRadius: "62%",
          innerRadius: "38%",
          backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
            .setOpacity(0.3)
            .get(),
          borderWidth: 0,
        },
        {
          outerRadius: "37%",
          innerRadius: "13%",
          backgroundColor: Highcharts.color(Highcharts.getOptions().colors[3])
            .setOpacity(0.3)
            .get(),
          borderWidth: 0,
        },
      ],
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },
    series: [
   
      {
        name: "Distribute",
        data: [
          {
            color: Highcharts.getOptions().colors[1],
            radius: "87%",
            innerRadius: "63%",
            y: element.distribute>100?element.distribute:100,
            x:100
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
            y: Math.round(element.opened/100*element.distribute),
            x:element.distribute
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
            y: Math.round(element.rtr*100/element.distribute),
            x:element.distribute
          },
        ],
      },
    ],
  }} />
            </Col>
            <Col>
              <HighchartsReact
                highcharts={Highcharts}
                options={ {
                  chart: {
                    type: "column",
                    height: "80%",
                  },
                  title: {
                    text: "",
                  },
                  exporting: {
                    enabled: false,
                  },
                  xAxis: {
                    categories:JSON.parse(element.country).map((c) => c.name)
                  },
                  yAxis: {
                    title: {
                      text: "",
                    },
                  },
                  series: [
                    {
                      name: "",
                      data: JSON.parse(element.country).map((c) => parseInt(c.y)), 
                      showInLegend: false,
                      
                    },
                  ],
                 
                }}
              />
            </Col>
          </Row>
        );
      }):null}
    </>
  );
};

export default DocintelAccount;
