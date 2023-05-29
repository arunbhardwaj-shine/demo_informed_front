import React, { useState, useEffect, useRef, useCallback } from "react";
import { postData } from "../../axios/apiHelper";
import { Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../axios/apiConfig";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import MapModule from "highcharts/modules/map";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import Select from "react-select";
import { useMemo } from "react";
import { loader } from "../../loader";
import proj4 from "proj4";

highchartsMap(Highcharts);
MapModule(Highcharts);
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const CountryRegistration = () => {
  const [isDataFound, setIsDataFound] = useState(false);
  const [newData, setNewData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDataFromApi();
  }, []);

  let startMonth = new Date("March 2022");
  let endMonth = new Date();
  let months = [{ value: "All", label: "All" }];

  while (startMonth <= endMonth) {
    let monthName = startMonth.toLocaleString("default", { month: "long" });
    let year = startMonth.getFullYear();
    months.push({
      value: `${monthName} ${year}`,
      label: `${monthName} ${year}`,
    });
    startMonth.setMonth(startMonth.getMonth() + 1);
  }
  months.reverse();
  const [monthYear, setMonthYear] = useState(months[0]?.value);

  const MemoizedMap = ({ data, options }) => {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={options}
      />
    );
  };

  // for map
  const mapOptions = useMemo(() => {
    return {
      chart: {
        type: "map",
        proj4,
        height: "60%",
        events: {
          load: function () {
            this.mapZoom(0.5, 7000, 41.1533);
          },
        },
      },
      title: {
        text: "Country Registration",
      },
      credits: {
        enabled: false,
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          align: "right",
          verticalAlign: "bottom",
          x: -10,
          y: -10,
        },
      },

      series: [
        {
          name: "Basemap",
          borderColor: "#A0A0A0",
          nullColor: "rgba(200, 200, 200, 0.3)",
          showInLegend: false,
          mapData: worldMap,
        },
        {
          name: "Separators",
          type: "mapline",
          nullColor: "#707070",
          showInLegend: false,
          enableMouseTracking: false,
        },
        {
          type: "mappoint",
          name: "Country Registration",
          data: newData?.filter((country) => country.lat && country.lon),
          mapData: worldMap,
          showInLegend: false,
          joinBy: ["name"],
          keys: ["code", "value"],
          tooltip: {
            headerFormat: "",
            pointFormat: '<span style="font-weight: bold">Total Registration : {point.totalIndex}</span>',
          },
          showInLegend: false,
          marker: {
            symbol: `url(${path_image}/marker.png)`,
            width: 17,
            height: 24,
            offsetY: -15, // adjust the position of the marker icon
          },
          states: {
            hover: {
              color: "#BADA55",
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function () {
              const countries = this.series.options.data.filter(
                (country) => country.name === this.point.name
              );
              if (countries.length > 0) {
                return this.point.name;
              } else {
                return null;
              }
            },
          },
        },
      ],
    };
  }, [newData]);


  // country list
  const [countryList, SetCountryList] = useState({
    chart: {
      type: "bar",
      height: 1500,
    },
    title: {
      text: "Country List",
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: "Number of Cases",
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
    // plotOptions: {
    //   bar: {
    //    // pointWidth: 18,
    //     dataLabels: {
    //       enabled: true,
    //     },
    //   },
    // },
    plotOptions: {
      series: {
        stacking: "normal",
        pointWidth: 30,
      },
    },
    series: [],
  });

  Highcharts.setOptions({
    colors: ["#FFBE2C", "#00D4C0", "#F58289"],
  });

  // for table
  const [tableData, setTableData] = useState({
    title: {
      text: "",
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
      showTable: true,
    },
    series: [],
    tableCountry: [],
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const optionMonth = useRef(
    currentDate.toLocaleString("default", { month: "long" })
  );
  const optionYear = useRef(currentDate.getFullYear());

  const getDataFromApi = async () => {
    try {
      loader("show");
      const month = optionMonth.current;
      const year = optionYear.current;
      const response = await postData(ENDPOINT.COUNTRY_REGISTRATION, {
        year,
        month,
      });
      const apiData = response.data;
      const countryData = apiData.data.coordination.map(
        (coordObject, index) => {
          const [lat, lon] = Object.values(coordObject)[0].split("~");
          const formattedIndex =
            apiData.data.critical_care[index] +
            apiData.data.haematology[index] +
            apiData.data.immunotherapy[index];
          const totalIndex = isNaN(formattedIndex) ? 0 : formattedIndex;
           // Skip countries with totalIndex equal to zero
        if (totalIndex === 0) {
          return null;
        }
          return {
            name: Object.keys(coordObject)[0],
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            critical_care: apiData.data.critical_care[index],
            haematology: apiData.data.haematology[index],
            immunotherapy: apiData.data.immunotherapy[index],
            totalIndex: totalIndex,
            countryLat: apiData.data.lat,
            countryLon: apiData.data.long,
          };
        }
      ).filter(Boolean);
  
      setNewData(countryData);

      const newSeries = [
        {
          name: `Critical_care`,
          data: apiData.data?.critical_care,
          color: Highcharts?.getOptions()?.colors[2],
        },
        {
          name: `Haematology`,
          data: apiData.data?.haematology,
          color: Highcharts?.getOptions()?.colors[1],
        },
        {
          name: `Immunotherapy`,
          data: apiData.data?.immunotherapy,
          color: Highcharts?.getOptions()?.colors[0],
        },
      ];
      const categories = apiData.data?.country;

      const newCountryList = {
        ...countryList,
        xAxis: {
          categories: categories,
        },
        series: newSeries,
      };
      setIsLoaded(true);
      SetCountryList(newCountryList);
      setIsDataFound(true);

      //create table
      const tableCountry = apiData?.data.country;
      const criticalCare = apiData?.data.critical_care || [];
      const haematology = apiData?.data.haematology || [];
      const immunotherapy = apiData?.data.immunotherapy || [];
      const tableDatas = [
        {
          name: `Critical Care (${criticalCare.reduce(
            (acc, val) => acc + val,
            0
          )})`,
          data: criticalCare,
        },
        {
          name: `Haematology (${haematology.reduce(
            (acc, val) => acc + val,
            0
          )})`,
          data: haematology,
        },
        {
          name: `Immunotherapy (${immunotherapy.reduce(
            (acc, val) => acc + val,
            0
          )})`,
          data: immunotherapy,
        },
      ];

      const newTable = {
        ...tableData,
        xAxis: {
          categories: tableDatas,
        },
        series: tableDatas,
        tableCountry: tableCountry,
      };
      setTableData(newTable);

      loader("hide");
    } catch (error) {
      setIsDataFound(false);
      console.log(error);
      loader("hide");
    }
  };

  // for total column
  const total = tableData.series.reduce((acc, serie) => {
    return acc + serie.data.reduce((a, b) => a + b, 0);
  }, 0);

  const selectMonthYear = useCallback(
    (selectedOption) => {
      setMonthYear(selectedOption?.value);
      const [month, year] = selectedOption?.value?.split(" ") || [];
      optionMonth.current = month;
      optionYear.current = year;
      setNewData([]);
      getDataFromApi();
    },
    [getDataFromApi]
  );

  return (
    <>
      <Col className="right-sidebar">
        <div className="custom-container">
          <Row>
            <div className="top-header">
              <div className="page-title d-flex">
                {/* <h2>Country Registration</h2> */}
              </div>
            </div>
            <div className="distribute-page-reader">
              <svg
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#0066be"
                  stroke="none"
                >
                  {" "}
                  <path d="M2360 5114 c-114 -11 -328 -47 -434 -75 -352 -90 -701 -266 -982 -495 -85 -69 -360 -342 -352 -349 2 -2 80 19 173 46 137 41 216 57 407 84 l237 33 102 57 103 57 117 -32 117 -33 188 9 189 9 66 100 c36 55 70 100 75 100 5 0 50 -6 99 -14 81 -12 113 -11 314 9 l224 21 65 71 c36 38 105 96 152 128 l87 58 128 -19 c86 -13 141 -17 168 -12 l41 8 -74 34 c-176 79 -443 154 -665 187 -97 15 -453 26 -545 18z m653 -152 c42 -24 77 -46 77 -50 0 -7 -195 -157 -228 -176 -9 -5 -66 -14 -128 -20 l-112 -12 -52 34 -52 33 73 46 c97 60 333 192 339 190 3 -1 40 -21 83 -45z m-1056 -144 l53 -22 75 24 c41 13 76 22 78 19 18 -24 77 -133 74 -136 -3 -2 -81 -24 -173 -48 l-169 -44 -83 47 -83 47 32 25 c17 14 55 44 83 67 28 23 53 42 56 42 2 1 28 -9 57 -21z"></path>{" "}
                  <path d="M3120 4547 l0 -52 101 -100 c118 -117 239 -251 239 -265 0 -5 -27 -23 -60 -40 -60 -30 -61 -30 -112 -15 -28 8 -87 29 -130 47 l-78 32 0 67 0 66 -52 21 c-29 11 -76 29 -104 40 l-51 21 -34 -150 -34 -149 -99 -22 c-54 -12 -100 -28 -103 -35 -3 -7 -1 -45 4 -85 l8 -73 135 -26 c74 -14 136 -26 137 -25 1 1 12 60 24 131 12 72 23 131 24 133 1 1 51 -5 111 -14 80 -12 123 -24 160 -45 46 -26 61 -29 138 -29 l86 0 56 -112 c53 -106 65 -121 211 -272 l154 -160 -6 -41 c-14 -86 -3 -82 -160 -61 l-100 13 -211 -106 -212 -106 -154 -185 c-154 -185 -155 -186 -174 -265 l-20 -80 -47 -3 c-40 -3 -66 5 -158 47 l-110 50 -87 -43 c-48 -23 -93 -45 -99 -49 -8 -5 -6 -28 7 -79 10 -40 21 -86 25 -103 l7 -30 43 50 43 50 77 3 77 4 -7 -95 -7 -96 62 -18 c56 -15 68 -24 127 -89 l64 -71 101 29 100 29 107 -16 c58 -9 174 -34 257 -56 83 -21 179 -42 214 -46 37 -3 70 -13 79 -22 9 -9 62 -69 119 -133 l103 -116 219 -129 c121 -70 219 -133 218 -138 -2 -6 -66 -131 -143 -277 l-139 -267 -151 -69 -150 -69 -59 -157 -59 -157 -210 -142 c-116 -78 -214 -145 -220 -148 -12 -9 -56 -163 -47 -167 12 -5 185 47 295 89 877 331 1510 1126 1630 2049 66 505 -12 989 -231 1449 -65 135 -169 311 -184 311 -5 0 -20 -4 -33 -9 -13 -5 -111 -17 -218 -26 -107 -9 -203 -20 -214 -25 -11 -4 -45 -46 -74 -94 -30 -47 -55 -86 -56 -86 -1 0 -21 7 -45 15 -28 10 -92 60 -198 156 l-157 141 -41 117 c-71 201 -70 199 -179 297 l-100 90 -110 22 c-60 12 -116 22 -122 22 -9 0 -13 -17 -13 -53z"></path>{" "}
                  <path d="M455 3875 c-27 -7 -62 -16 -77 -19 -30 -7 -74 -81 -152 -254 -243 -541 -290 -1148 -131 -1725 83 -305 229 -600 428 -866 93 -124 365 -396 490 -490 513 -383 1142 -567 1747 -510 63 6 116 12 118 14 2 1 -3 70 -10 153 l-12 151 58 240 58 240 -57 203 c-54 192 -62 213 -152 380 l-94 176 80 169 c45 93 81 173 81 179 0 6 -35 21 -77 34 -75 21 -82 26 -178 121 l-100 98 -212 47 -211 48 -71 145 -71 146 0 -88 0 -88 -32 3 c-29 3 -48 25 -215 251 l-183 248 0 204 0 205 -131 213 c-72 116 -133 215 -137 218 -4 4 -101 -11 -217 -32 -180 -33 -231 -39 -353 -39 l-143 0 -70 45 c-38 24 -69 48 -69 52 1 5 40 38 87 76 89 70 90 73 8 52z"></path>{" "}
                </g>
              </svg>
              <p>
                These are based on registrations per country and in the list
                broken down per Business Unit. You can filter per month above
                the map.
              </p>
            </div>
            <div className="create-change-content spc-content analytic-charts">
              <div className="form_action">
                <Form className="product-unit d-flex justify-content-between align-items-center">
                  <div className="form-group ">
                    <label htmlFor="">Months</label>
                    <Select
                      options={months}
                      value={months.find(
                        (option) => option.value === monthYear
                      )}
                      onChange={selectMonthYear}
                      className="dropdown-basic-button split-button-dropup"
                      isClearable={true}
                    />
                  </div>
                </Form>
              </div>
              <div className="high_charts">
                {newData.length || newData.length === 0 ? (
                  <MemoizedMap data={newData} options={mapOptions} />
                ) : null}
              </div>
              {countryList.series.some((series) => series.data.length > 0) &&
              newData.length > 0 ? (
                <div>
                  <div className="high_charts">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={countryList}
                    />
                  </div>
                  <div className="table-container">
                    <HighchartsReact data={countryList.series} />
                  </div>
                  <div className="high_charts">
                    <div className="highcharts-data-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Category</th>
                            {tableData.xAxis.categories.map(
                              (category, index) => (
                                <th key={index}>{category.name}</th>
                              )
                            )}
                            <th>Total ({total})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData?.tableCountry?.map((category, index) => (
                            <tr key={index}>
                              <td>{category}</td>
                              {tableData?.series?.map((serie, serieIndex) => (
                                <td key={serieIndex}>{serie?.data[index]}</td>
                              ))}
                              <td>
                                {tableData?.series?.reduce(
                                  (total, serie) => total + serie?.data[index],
                                  0
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : isLoaded && newData.length >= 0 ? (
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

export default CountryRegistration;
