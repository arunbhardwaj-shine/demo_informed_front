import React, { useState, useMemo, useEffect } from "react";
import Highcharts from "highcharts";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import HighchartsReact from "highcharts-react-official";
exporting(Highcharts);
exportData(Highcharts);

const OctalatchCommonLineGraph = ({ data, name }) => {
  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#d1d132",
      "#D61975",
      "#0066BE",
      "#00003C",
      "#b490f5",
      "#91817e",
      "#2b6570",
      "#9C9CA2",
      "#7cb0dd",
      "#4f4566",
      "#00D4C0",
      "#32a1d1",
    ],
  });

  const [lineOption, setLineOption] = useState({
    chart: {
      type: "line",
      height: 500,
    },
    title: {
      text: `Registered HCP's (${name.toUpperCase()})`,
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      min: 0,
      title: {
        text: "IBU",
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
        // stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },

    series: [],
  });

  const [tableData, setTableData] = useState({
    title: {
      text: "Total HCPs",
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

    series: [],
    month: [],
  });

  const getDataFromApi = async () => {
    const newLineData = [
      {
        name: "",
        data: "",
        color: "",
      },
    ];
    const newTableSeries = [
      {
        name: "",
        data: "",
      },
    ];

    const newMonth = [
      {
        month: "",
      },
    ];

    Object.keys(data)?.forEach((item, index) => {
      //reversed the months for Table Data
      const monthsString = data[item]?.months;
      const months = monthsString;
      const reversedMonths = [...months].reverse();

      //reversed the months _Data for Table Data

      const monthsData = data[item]?.month_data;
      const month_data = monthsData;
      const reversedMonthsData = [...month_data].reverse();

      newLineData.push({
        name: data[item]?.ibu + "(" + JSON.parse(data[item]?.total) + ")",
        data: data[item]?.total_data,
        color: Highcharts?.getOptions()?.colors[index],
        month: data[item]?.months,
      });
      newTableSeries.push({
        name: data[item]?.ibu + "(" + JSON.parse(data[item]?.total) + ")",
        // data: data[item]?.month_data ? data[item]?.month_data : 0,
        data: reversedMonthsData ? reversedMonthsData : 0,
      });
      newMonth.push({
        // month: data[item]?.months,
        month: reversedMonths,
      });
    });

    // setMonths(month);
    const newLineOptions = {
      ...lineOption,
      xAxis: {
        categories: newLineData[1]?.month,
      },
      series: newLineData.slice(1),
    };

    setLineOption(newLineOptions);

    // for table data
    const newTable = {
      ...tableData,
      xAxis: {
        categories: newTableSeries?.slice(1).map((item) => {
          return item?.name;
        }),
      },
      series: newTableSeries.slice(1),
      month: newMonth[1],
    };
    setTableData(newTable);
  };
  useEffect(() => {
    getDataFromApi();
  }, []);

  const total = tableData?.series?.reduce((acc, serie) => {
    return acc + serie?.data?.reduce((a, b) => a + b, 0);
  }, 0);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={lineOption} />
      <div className="highcharts-data-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>

              {tableData?.xAxis?.categories?.map((category, index) => (
                <th key={index}>{category}</th>
              ))}
              <th>Total ({total})</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.month?.month?.map((month, index) => (
              <tr key={index}>
                <td>{month}</td>
                {tableData?.series?.map((serie, serieIndex) => (
                  <td key={serieIndex}>{serie?.data[index]}</td>
                ))}

                <td>
                  {isNaN(
                    tableData?.series?.reduce(
                      (total, serie) => total + serie?.data[index],
                      0
                    )
                  )
                    ? 0
                    : tableData?.series?.reduce(
                        (total, serie) => total + serie?.data[index],
                        0
                      )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default OctalatchCommonLineGraph;
