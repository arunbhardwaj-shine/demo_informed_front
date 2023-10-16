import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
exporting(Highcharts);
exportData(Highcharts);

const LinksStats = () => {
  const [coloumnOptions, setColoumnOptions] = useState({
    chart: {
      type: "column",
      //   height: "80%",
    },
    title: {
      text: "",
    },
    exporting: {
      enabled: false,
    },
    xAxis: {
      categories: ["USA", "China", "Brazil", "EU", "India", "Russia"],
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    plotOptions: {
      column: {
        // borderRadius: '50%',
        dataLabels: {
          enabled: true,
        },
        groupPadding: 0.1,
      },
      series: {
        // colorByPoint: true, // Use colors from the colors array
        pointWidth: 30,
      },
    },
    series: [
      {
        name: "Corn",
        data: [40, 26, 10, 68, 27, 14],
      },
      {
        name: "Wheat",
        data: [51, 13, 55, 14, 10, 77],
      },
    ],
  });

  return (
    <>
      <div className="high_charts">
        {coloumnOptions?.series ? (
          <HighchartsReact highcharts={Highcharts} options={coloumnOptions} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default LinksStats;
