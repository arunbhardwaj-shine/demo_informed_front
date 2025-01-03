import React, { useState, useEffect, useRef } from "react";

import "../../../assets/css/webinar.css";

import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { loader } from "../../../../../loader";
// import { postData } from "../../../axios/apiHelper";
// import { ENDPOINT } from "../../../axios/apiConfig";

let data = {
  chartData: {
    Afghanistan: 0,
    Albania: 0,
    Algeria: 0,
    Andorra: 0,
    Angola: 0,
    Argentina: 0,
    Aruba: 0,
    Austria: 0,
    Azerbaijan: 0,
    Bahrain: 0,
    Bangladesh: 0,
    Belarus: 0,
    Belgium: 0,
    Bolivia: 0,
    Brazil: 0,
    Bulgaria: 0,
    Canada: 0,
    Chile: 0,
    Colombia: 0,
    "Costa Rica": 0,
    "Croatia (Hrvatska)": 0,
    Cuba: 0,
    "Dominican Republic": 0,
    Ecuador: 0,
    Egypt: 0,
    "El Salvador": 0,
    France: 0,
    Georgia: 0,
    Germany: 0,
    Greece: 0,
    Guatemala: 0,
    Hungary: 0,
    India: 0,
    Indonesia: 0,
    Iraq: 0,
    Italy: 0,
    Japan: 0,
    Jordan: 0,
    Kazakhstan: 0,
    "Korea South": 0,
    KSA: 0,
    Kyrgyzstan: 0,
    Latvia: 0,
    Lesotho: 0,
    Lithuania: 0,
    "Macau S.A.R.": 0,
    Macedonia: 0,
    Malaysia: 0,
    Mexico: 0,
    Morocco: 0,
    Nepal: 0,
    Nigeria: 0,
    Pakistan: 0,
    Palestine: 0,
    "Palestinian Territory Occupied": 0,
    Panama: 0,
    Paraguay: 0,
    Peru: 0,
    Philippines: 0,
    Poland: 0,
    Portugal: 0,
    Qatar: 0,
    Reunion: 0,
    Romania: 0,
    Russia: 0,
    "Saint Pierre and Miquelon": 0,
    Samoa: 0,
    Senegal: 0,
    Serbia: 0,
    "Sierra Leone": 0,
    Singapore: 0,
    Slovakia: 0,
    "South Africa": 0,
    "South Sudan": 0,
    Spain: 0,
    Sudan: 0,
    Switzerland: 0,
    Syria: 0,
    Taiwan: 0,
    Tunisia: 0,
    Turkey: 0,
    UAE: 0,
    Ukraine: 0,
    "United Arab Emirates": 0,
    "United Kingdom": 0,
    "United State of America": 0,
    Uruguay: 0,
    Venezuela: 0,
    Vietnam: 0,
    "Virgin Islands (US)": 0,
    Yemen: 0,
  },
  chartDataLive: {
    Afghanistan: 2,
    Albania: 1,
    Algeria: 2,
    Andorra: 1,
    Angola: 1,
    Argentina: 9,
    Aruba: 1,
    Austria: 1,
    Azerbaijan: 1,
    Bahrain: 9,
    Bangladesh: 1,
    Belarus: 4,
    Belgium: 1,
    Bolivia: 1,
    Brazil: 1,
    Bulgaria: 3,
    Canada: 3,
    Chile: 3,
    Colombia: 4,
    "Costa Rica": 1,
    "Croatia (Hrvatska)": 2,
    Cuba: 2,
    "Dominican Republic": 3,
    Ecuador: 3,
    Egypt: 86,
    "El Salvador": 1,
    France: 2,
    Georgia: 1,
    Germany: 3,
    Greece: 1,
    Guatemala: 1,
    Hungary: 5,
    India: 202,
    Indonesia: 12,
    Iraq: 4,
    Italy: 1,
    Japan: 5,
    Jordan: 3,
    Kazakhstan: 1,
    "Korea South": 1,
    KSA: 811,
    Kyrgyzstan: 1,
    Latvia: 2,
    Lesotho: 1,
    Lithuania: 5,
    "Macau S.A.R.": 1,
    Macedonia: 1,
    Malaysia: 24,
    Mexico: 9,
    Morocco: 2,
    Nepal: 1,
    Nigeria: 4,
    Pakistan: 17,
    Palestine: 1,
    "Palestinian Territory Occupied": 3,
    Panama: 5,
    Paraguay: 6,
    Peru: 9,
    Philippines: 65,
    Poland: 1,
    Portugal: 8,
    Qatar: 2,
    Reunion: 1,
    Romania: 2,
    Russia: 1,
    "Saint Pierre and Miquelon": 1,
    Samoa: 1,
    Senegal: 1,
    Serbia: 2,
    "Sierra Leone": 3,
    Singapore: 1,
    Slovakia: 1,
    "South Africa": 3,
    "South Sudan": 2,
    Spain: 6,
    Sudan: 80,
    Switzerland: 2,
    Syria: 9,
    Taiwan: 3,
    Tunisia: 1,
    Turkey: 1,
    UAE: 8,
    Ukraine: 2,
    "United Arab Emirates": 17,
    "United Kingdom": 10,
    "United State of America": 21,
    Uruguay: 4,
    Venezuela: 2,
    Vietnam: 2,
    "Virgin Islands (US)": 1,
    Yemen: 9,
  },
  colorArr: {
    Afghanistan: "#FFBE2C",
    Albania: "#00D4C0",
    Algeria: "#D61975",
    Andorra: "#db6f2c",
    Angola: "#9af5b2",
    Argentina: "#00003C",
    Aruba: "#db6f2c",
    Austria: "#9af5b2",
    Azerbaijan: "#00003C",
    Bahrain: "#9C9CA2",
    Bangladesh: "#9af5b2",
    Belarus: "#00003C",
    Belgium: "#FFBE2C",
    Bolivia: "#F58289",
    Brazil: "#00D4C0",
    Bulgaria: "#D61975",
    Canada: "#9af5b2",
    Chile: "#7cb0dd",
    Colombia: "#F58289",
    "Costa Rica": "#db6f2c",
    "Croatia (Hrvatska)": "#9af5b2",
    Cuba: "#9C9CA2",
    "Dominican Republic": "#7c00ad",
    Ecuador: "#00D4C0",
    Egypt: "#db6f2c",
    "El Salvador": "#D61975",
    France: "#0066BE",
    Georgia: "#9af5b2",
    Germany: "#00003C",
    Greece: "#7c00ad",
    Guatemala: "#FFBE2C",
    Hungary: "#F58289",
    India: "#9af5b2",
    Indonesia: "#7c00ad",
    Iraq: "#FFBE2C",
    Italy: "#0066BE",
    Japan: "#db6f2c",
    Jordan: "#7c00ad",
    Kazakhstan: "#00D4C0",
    "Korea South": "#D61975",
    KSA: "#0066BE",
    Kyrgyzstan: "#F58289",
    Latvia: "#00D4C0",
    Lesotho: "#0066BE",
    Lithuania: "#db6f2c",
    "Macau S.A.R.": "#7c00ad",
    Macedonia: "#FFBE2C",
    Malaysia: "#F58289",
    Mexico: "#D61975",
    Morocco: "#F58289",
    Nepal: "#D61975",
    Nigeria: "#0066BE",
    Pakistan: "#9C9CA2",
    Palestine: "#D61975",
    "Palestinian Territory Occupied": "#0066BE",
    Panama: "#00003C",
    Paraguay: "#F58289",
    Peru: "#00003C",
    Philippines: "#db6f2c",
    Poland: "#0066BE",
    Portugal: "#db6f2c",
    Qatar: "#00D4C0",
    Reunion: "#0066BE",
    Romania: "#db6f2c",
    Russia: "#00003C",
    "Saint Pierre and Miquelon": "#9C9CA2",
    Samoa: "#7cb0dd",
    Senegal: "#7c00ad",
    Serbia: "#FFBE2C",
    "Sierra Leone": "#00D4C0",
    Singapore: "#db6f2c",
    Slovakia: "#9af5b2",
    "South Africa": "#00003C",
    "South Sudan": "#7c00ad",
    Spain: "#F58289",
    Sudan: "#00003C",
    Switzerland: "#7c00ad",
    Syria: "#F58289",
    Taiwan: "#7c00ad",
    Tunisia: "#00D4C0",
    Turkey: "#D61975",
    UAE: "#0066BE",
    Ukraine: "#F58289",
    "United Arab Emirates": "#D61975",
    "United Kingdom": "#7cb0dd",
    "United State of America": "#9C9CA2",
    Uruguay: "#00003C",
    Venezuela: "#FFBE2C",
    Vietnam: "#00D4C0",
    "Virgin Islands (US)": "#0066BE",
    Yemen: "#db6f2c",
  },
  regionColorArr: [],
};

const HCPRegisteredVirtual = () => {
  const [options, setOptions] = useState({
    chart: {
      renderTo: "country_container",
      type: "bar",
      width: 1200,
      height: 21 > 20 ? 1200 : 400,
    },
    title: {
      text: "HCP’s Registered for Virtual",
    },
    credits: { enabled: false },
    legend: {},
    minPointLength: 10,
    plotOptions: {
      series: {
        shadow: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y;
          },
        },
      },
    },
    xAxis: {
      lineColor: "#999",
      lineWidth: 1,
      tickColor: "#666",
      tickLength: 3,
      labels: {
        padding: 0,
        style: {
          fontSize: "9px",
        },
      },
      categories: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Argentina",
        "Aruba",
        "Austria",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Belarus",
        "Belgium",
        "Bolivia",
        "Brazil",
        "Bulgaria",
        "Canada",
        "Chile",
        "Colombia",
        "Costa Rica",
        "Croatia (Hrvatska)",
        "Cuba",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Guatemala",
        "Hungary",
        "India",
        "Indonesia",
        "Iraq",
        "Italy",
        "Japan",
        "Jordan",
        "KSA",
        "Kazakhstan",
        "Korea South",
        "Kyrgyzstan",
        "Latvia",
        "Lesotho",
        "Lithuania",
        "Macau S.A.R.",
        "Macedonia",
        "Malaysia",
        "Mexico",
        "Morocco",
        "Nepal",
        "Nigeria",
        "Pakistan",
        "Palestine",
        "Palestinian Territory Occupied",
        "Panama",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Saint Pierre and Miquelon",
        "Samoa",
        "Senegal",
        "Serbia",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sudan",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tunisia",
        "Turkey",
        "UAE",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United State of America",
        "Uruguay",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
      ],
    },
    yAxis: {
      lineColor: "#999",
      lineWidth: 1,
      tickColor: "#666",
      tickWidth: 1,
      tickLength: 3,
      gridLineColor: "#ddd",
      title: false,
    },
    series: [
      {
        colorByPoint: true,
        showInLegend: false,
        data: [],
      },
    ],
    tooltip: {
      formatter: function () {
        return this.x + ":" + this.y;
      },
    },
  });

  const getDataFromApi = async () => {
    try {
      loader("show");
      // const response = await postData("https://webinar.informed.pro/Webinar/reg_data_pie",{event_id:"384"});
      // const data = response.data.data;
      //  const seriesMonth = data[0].Months;
      const categories = Object.keys(data.chartData).sort();
      const transformedChartData = Object.entries(data.chartData).map(
        ([name, y]) => ({
          name,
          y,
          color: data.colorArr[name],
        })
      );
      // console.log(transformedChartData);
      let updatedSeries = [
        {
          ...options.series[0],
          data: transformedChartData,
        },
      ];

      let updatedOptions = {
        ...options,
        xAxis: {
          ...options.xAxis,
          categories: categories,
        },
        series: updatedSeries,
      };

      setOptions(updatedOptions);

      loader("hide");
    } catch (error) {
      // setIsDataNotFound(true);
      console.log(error);
      loader("hide");
    }
    // setIsLoaded(true);
  };

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <>
      <div class="hcp_stat">
        <h4>1565 HCP’s Registered virtual and onsite </h4>
        <h4>35 Staff Registered </h4>
        <ul>
          <li>
            <strong>100%</strong> (1565/1565) Total On-Site Registration
          </li>
          <li>
            <strong>0%</strong> (0/1565) Total Virtual Registration
          </li>
          <li class="no-style"></li>

          <li>
            <strong>0%&nbsp;(0/1565)&nbsp;Via our 3 email blast</strong>
          </li>
          <li class="no-style"></li>
          <li>
            <strong>0%</strong> (0/1565) Registered via US invitation emails
            <strong>0%</strong> (0/0) Virtual registration via US invitation
            emails
            <strong>0%</strong> (0/0) Onsite registration via US invitation
            emails
          </li>
          <li class="no-style"></li>

          <li>
            <strong>0%</strong> (0/1565) Registered via internal invitation
            emails docintel
            <strong>0%</strong> (0/0) Virtual registration via internal
            invitation emails docintel
            <strong>0%</strong> (0/0) Onsite registration via internal
            invitation emails docintel
          </li>

          <li class="no-style"></li>

          <li class="no-style">
            <strong>Virtual live session:</strong>
          </li>
          <li>
            <strong>0%</strong> (207/0) HCP’s attended
          </li>
          <li>
            <strong>0%</strong> (0/207) Stayed &gt; 30 min{" "}
          </li>
          <li>
            <strong>0%</strong> (0/207) Present during the entire webinar
          </li>
          <li>
            <strong>0%</strong> (0/207) Stayed &gt;10 min and &lt;25 min
          </li>
          <li>
            <strong>0 minutes </strong> Average spend time
          </li>
          <li>
            <strong>Top 5 countries:</strong> Algeria, Senegal, Taiwan, Samoa,
            Switzerland
          </li>
          <li class="no-style"></li>
        </ul>
      </div>

      <div>
        <h5
          style={{
            textAlign: "center",
            padding: "15px 10px",
            background: "#0b3a81",
            margin: "0",
            color: "#fff",
            marginTop:'30px',
            marginBottom:'20px'
          }}
        >
          HCP’s Registered Vs HCP’s Attended According to Country
        </h5>
      </div>

      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default HCPRegisteredVirtual;
