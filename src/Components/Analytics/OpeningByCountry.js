import React, { useState, useEffect, useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Highcharts from "highcharts";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import Select from "react-select";
import HighchartsReact from "highcharts-react-official";
exporting(Highcharts);
exportData(Highcharts);
const OpeningByCountry = () => {
  const [data, setData] = useState({});
  const [isDataFound, setIsDataFound] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const selectFilter = useRef({ label: "Articles", value: null });
  const selectFilterType = useRef("Openingcountry");

  const [filterData, setFilterData] = useState([]);

  const chart = useRef(null);
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
    window.scrollTo(0, 0);
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    loader("show");

    try {
      const requestBody = {
        type: selectFilterType.current,
        pdfId: selectFilter?.current?.value
          ? selectFilter?.current?.value
          : null,
      };
      const response = await postData(ENDPOINT.OPENING_BY_COUNTRY, requestBody);
      const hadData = response?.data?.data;

      if (hadData?.length <= 0) {
        setIsDataFound(false);
      } else {
        setIsDataFound(true);
      }

      if (hadData?.name?.length <= 0) {
        setIsDataFound(false);
      } else {
        setIsDataFound(true);
      }

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

      if (filterData?.length == 0) {
        const newFilterArr = [{ value: null, label: "Articles" }];

        hadData?.pdfData?.map((pdf, index) => {
          newFilterArr.push({
            value: pdf?.id,
            label: pdf?.title,
          });
        });

        newFilterArr.sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        );

        setFilterData(newFilterArr);
      }

      setIsLoaded(true);
      setData(hadData);

      loader("hide");
    } catch (err) {
      setIsDataFound(false);
      console.log(err);
      loader("hide");
    }
  };

  const handleFilterData = (e) => {
    setIsLoaded(false);
    setIsDataFound(false);
    selectFilterType.current = "OpeningcountryFilter";
    selectFilter.current = e;

    getDataFromApi(e.value);
  };

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            {/* <div className="top-header">
              <div className="page-title d-flex">
                <h2>Opening by Country</h2>
              </div>
            </div> */}
            <div className="create-change-content spc-content analytic-charts">
              <div className="form_action">
                <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group ">
                    <label htmlFor="">Filter By</label>
                    <Select
                      options={filterData}
                      placeholder="Filter By"
                      onChange={handleFilterData}
                      defaultValue={
                        selectFilter?.current ? selectFilter?.current : "null"
                      }
                      className="dropdown-basic-button split-button-dropup btn-bigger"
                      isClearable
                    />
                  </div>
                </Form>
              </div>
              {isDataFound ? (
                <div className="high_charts space-added">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={topClientOptions}
                    ref={chart}
                  />
                </div>
              ) : isLoaded ? (
                <div className="no_found">
                  <p>No Data Found</p>
                </div>
              ) : null}
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};
export default OpeningByCountry;
