import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Nav from "react-bootstrap/Nav";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { useState } from "react";
import Highcharts from "highcharts";
import { ExportingAccessibilityOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
require("highcharts/modules/exporting")(Highcharts);

const WebDashboard = () => {
  const [options, setOptions] = useState({
    chart: {
      animation: {
        duration: 500,
      },
      marginRight: 50,
    },
    title: {
      text: "HCPs virtual registered",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceaniaa"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        type: "bar",
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "bar",
        name: "Year 1990",
        data: [631, 727, 202, 721, 26],
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ["printChart", "separator", "downloadPNG", "downloadPDF"],
        },
      },
    },
  });

  const [options2, setOptions2] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "HCPs Live registered",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        type: "bar",
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1990",
        data: [26, 721, 631, 727, 3202],
      },
    ],
  });

  const [template, setTemplate] = useState("1:1 meeting with IBU Haematology");

  const templateClicked = (e) => {
    setTemplate(e);
  };

  const [options3, setOptions3] = useState({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "HCPs attended by countries (108)",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "Uruguay",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Andora",
            y: 14.77,
          },
          {
            name: "Argentina",
            y: 4.86,
          },
          {
            name: "Belgium",
            y: 2.63,
          },
          {
            name: "Colombia",
            y: 1.53,
          },
          {
            name: "Egypt",
            y: 1.4,
          },
          {
            name: "Maxico",
            y: 0.84,
          },
          {
            name: "Greece",
            y: 0.51,
          },
          {
            name: "Peru",
            y: 2.6,
          },
        ],
      },
    ],
  });

  const [options4, setOptions4] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "Historic World Population by Region",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Population (millions)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: " millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Year 1990",
        data: [631, 727, 3202, 721, 26],
      },
    ],
  });
  const [options5, setOptions5] = useState({
    chart: {
      type: "bar",
    },
    title: {
      text: "Total HCPs as Timeframe",
    },
    subtitle: {
      text:
        "Source: <a " +
        'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
        'target="_blank">Wikipedia.org</a>',
    },
    xAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      title: {
        text: "Registration",
      },
    },
    yAxis: {
      categories: ["Africa", "America", "Asia", "Europe", "Oceania"],
      min: 0,
      title: {
        text: "Registration",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valueSuffix: "millions",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  const path = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [eventSelected, setEventSelected] = useState(
    "1:1 meeting with IBU Haematology"
  );

  const eventDropDownClicked = (e) => {
    console.log(e);
    setEventSelected(e);
  };

  return (
    <Col className="col right-sidebar">
      <div className="custom-container">
        <Row>
          <div className="top-header webinar-view">
            <div className="top-right-action left-sided">
              <div className="col">
                <div className="select-event">
                  <label>Select Event</label>
                  <DropdownButton
                    className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                    title={eventSelected}
                    onSelect={(event) => eventDropDownClicked(event)}
                  >
                    <Dropdown.Item eventKey="1:1 meeting with IBU Haematology">
                      1:1 meeting with IBU Haematology
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="PUP haematology">
                      PUP haematology
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Making informed treatment decisions in previously
                        untreated patients with severe haemophilia"
                    >
                      Making informed treatment decisions in previously
                      untreated patients with severe haemophilia
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="Haematology">
                      Haematology
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Tabs>
          <Tab label="Dashboard">
            <div>
              <p>
                <h5>
                  <br />
                  <strong>
                    316 HCP’s Registered virtual and onsite 36 Staff Registered
                  </strong>
                </h5>
                <h5>
                  <strong>36 Staff Registered</strong>
                </h5>
                <ul>
                  <li>
                    <strong>13%</strong> (42/316) Total On-Site Registration
                  </li>
                  <li>
                    <strong>87%</strong> (274/316) Total Virtual Registration
                  </li>
                  <br />
                  <li>
                    <strong>4%</strong> (274/316) (14/316) Via our 3 email blast
                  </li>
                  <br />
                  <li>
                    <strong>4%</strong> (274/316) (14/316) Via our 3 email blast
                    <br />
                    <strong>75%</strong> (274/316) (14/316) Via our 3 email
                    blast
                    <br />
                    <strong>25%</strong> (274/316) (14/316) Via our 3 email
                    blast
                  </li>
                  <br />
                  <li>
                    <strong>1%</strong> (274/316) (14/316) Registered via
                    internal invitation emails docintel
                    <br />
                    <strong>0%</strong> (274/316) (14/316) Virtual registration
                    via internal invitation emails docintel
                    <br />
                    <strong>100%</strong> (274/316) (14/316) Onsite registration
                    via internal invitation emails docintel blast
                  </li>
                </ul>

                <strong>Virtual live session:</strong>
                <ul>
                  <li>
                    <strong>39%</strong> (108/274) HCP’s attended
                  </li>
                  <li>
                    <strong>70%</strong> (76/108) Stayed 30 min
                  </li>
                  <li>
                    <strong>19%</strong> (21/108) Present during the entire
                    webinar
                  </li>
                  <li>
                    <strong>40 minutes</strong> (11/108) Average spend time
                  </li>
                  <li>
                    <strong>Top 5 countries </strong> (108/274) Saudi Arabia,
                    Portugal, Spain, Chile, Egypt
                  </li>
                </ul>
              </p>
              <br />

              <div className="page-title">
                <h4 style={{ textAlign: "center" }}>
                  HCP’s Registered Vs HCP’s Attended According to Country
                </h4>
              </div>

              <HighchartsReact highcharts={Highcharts} options={options} />
              <div className="page-title">
                <h4 style={{ textAlign: "center" }}>
                  HCP’s registration for live
                </h4>
              </div>
              <HighchartsReact highcharts={Highcharts} options={options2} />
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <div className="page-title">
                    <h4 style={{ textAlign: "center" }}>
                      HCP’s Registered Virtual by countries
                    </h4>
                  </div>
                  <HighchartsReact highcharts={Highcharts} options={options3} />
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="page-title">
                    <h4 style={{ textAlign: "center" }}>
                      HCP’s Registered Live by countries
                    </h4>
                  </div>
                  <HighchartsReact highcharts={Highcharts} options={options3} />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <div className="page-title">
                    <h4 style={{ textAlign: "center" }}>
                      HCP’s Registered Virtual by countries
                    </h4>
                  </div>
                  <HighchartsReact highcharts={Highcharts} options={options3} />
                </div>
                <div className="col-sm-6 col-md-6">
                  <div className="page-title">
                    <h4 style={{ textAlign: "center" }}>
                      HCP’s Registered Live by countries
                    </h4>
                  </div>
                  <HighchartsReact highcharts={Highcharts} options={options3} />
                </div>
              </div>
            </div>
          </Tab>
          <Tab label="Poll Question">
            {" "}
            <div className="col right-sidebar default_page_not_found">
              <div className="coming-soon">
                <h2 style={{ marginTop: "300px" }}>
                  No question found for this event.
                </h2>
              </div>
            </div>
          </Tab>
          <Tab label="Webinar Questions">
            {" "}
            <div className="selected-webinar-list">
              <table className="table webinar-reader">
                <thead className="sticky-header">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Question</th>
                  </tr>
                </thead>
                <tbody className="form-group">
                  <tr className="seprator-add">
                    <td colspan="5"></td>
                  </tr>
                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"WFH - 2022"} </span>
                    </td>

                    <td id={`field_email`}>
                      {"haematology.docintel@octapharma.com"}
                    </td>

                    <td
                      id={`field_bounced`}
                    >{`	Qué pasa en las pacientes postparto cuando los niveles de fvw se eleva mayor de 200%, ?`}</td>
                  </tr>

                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"WFH - 2022"} </span>
                    </td>
                    <td id={`field_email`}>
                      {"haematology.docintel@octapharma.com"}
                    </td>
                    <td id={`field_bounced`}>
                      Qué pasa en las pacientes postparto cuando los niveles de
                      fvw se eleva mayor de 200%, ?
                    </td>
                  </tr>
                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"WFH - 2022"} </span>
                    </td>
                    <td id={`field_email`}>
                      {"haematology.docintel@octapharma.com"}
                    </td>
                    <td id={`field_bounced`}>
                      {" "}
                      Qué pasa en las pacientes postparto cuando los niveles de
                      fvw se eleva mayor de 200%, ?
                    </td>
                  </tr>

                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"WFH - 2022"} </span>
                    </td>

                    <td id={`field_email`}>
                      {"haematology.docintel@octapharma.com"}
                    </td>

                    <td id={`field_bounced`}>
                      {" "}
                      Qué pasa en las pacientes postparto cuando los niveles de
                      fvw se eleva mayor de 200%, ?
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab label="Email Stats">
            {" "}
            <br />
            <div className="top-header webinar-view">
              <div className="top-right-action left-sided">
                <div className="col">
                  <div className="select-event">
                    <label>Select Template</label>
                    <DropdownButton
                      className="dropdown-basic-button split-button-dropup edit-country-dropdown"
                      title={template}
                      onSelect={(event) => templateClicked(event)}
                    >
                      <Dropdown.Item eventKey="1:1 meeting with IBU Haematology">
                        1:1 meeting with IBU Haematology
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="PUP haematology">
                        PUP haematology
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="Making informed treatment decisions in previously
                        untreated patients with severe haemophilia"
                      >
                        Making informed treatment decisions in previousl y
                        untreated patients with severe haemophilia
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Haematology">
                        Haematology
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="selected-webinar-list">
              <table className="table webinar-reader">
                <thead className="sticky-header">
                  <tr>
                    <th scope="col">Mail Sent</th>
                    <th scope="col">Mail Read</th>
                  </tr>
                </thead>
                <tbody className="form-group">
                  <tr className="seprator-add">
                    <td colspan="5"></td>
                  </tr>
                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"0"} </span>
                    </td>

                    <td id={`field_email`}>{"0(0%)"}</td>
                  </tr>

                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"2"} </span>
                    </td>

                    <td id={`field_email`}>{"2(2%)"}</td>
                  </tr>
                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"10"} </span>
                    </td>

                    <td id={`field_email`}>{"10(10%)"}</td>
                  </tr>

                  <tr id={`row-selected`}>
                    <td id={`field_name`}>
                      <span> {"50"} </span>
                    </td>

                    <td id={`field_email`}>{"50(50%)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab label="Region Stats">
            <p style={{ marginTop: "20px" }}>
              Total number of attendees in this region is <strong>3</strong>
              <br />
              <strong>2.78%</strong> (3/108) of total attendees 0.95% (3/316) of
              total attendees
              <br />
              <strong>0.95%</strong> (3/108) of total attendees 0.95% (3/316) of
              total attendees
            </p>
            <div className="top-header webinar-view">
              <div className="page-title">
                <h4 style={{ textAlign: "center" }}>
                  HCP’s Registered Vs HCP’s Attended According to Country
                </h4>
              </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div className="page-title">
              <h4 style={{ textAlign: "center" }}>
                HCP’s registration for live
              </h4>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options2} />
            <div className="row">
              <div className="col-md-6">
                <div className="page-title">
                  <h4 style={{ textAlign: "center" }}>
                    HCP’s Registered Virtual by countries
                  </h4>
                </div>
                <HighchartsReact highcharts={Highcharts} options={options3} />
              </div>
              <div className="col-md-6">
                {" "}
                <div className="page-title">
                  <h4 style={{ textAlign: "center" }}>
                    HCP’s Registered Live by countries
                  </h4>
                </div>
                <HighchartsReact highcharts={Highcharts} options={options3} />
              </div>
            </div>
          </Tab>
          <Tab label="Link Stats">
            <div className="page-title" style={{ marginTop: "30px" }}>
              <h4 style={{ textAlign: "center" }}>
                HCP’s registration for live
              </h4>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options5} />
          </Tab>
        </Tabs>
      </div>
    </Col>
  );
};
export default WebDashboard;
