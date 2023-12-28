import React, { useState, useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const PreviewGraphModal = (graphType) => {
  const [chartPieOptions, setPieChartOptions] = useState();
  const [chartBarOptions, setBarChartOptions] = useState();

  useEffect(() => {
    setPieChartOptions({
      chart: {
        type: "pie",
      },
      tooltip: {
        valueSuffix: "%",
      },

      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: "{point.percentage:.1f}%",
              style: {
                fontSize: "1.2em",
                textOutline: "none",
                opacity: 0.7,
              },
              // filter: {
              //     operator: '>',
              //     property: 'percentage',
              //     value: 10
              // }
            },
          ],
        },
      },
      series: [
        {
          name: "Percentage",
          colorByPoint: true,
          data: [
            {
              name: "Water",
              y: 55.02,
            },
            {
              name: "Fat",
              sliced: true,
              selected: true,
              y: 26.71,
            },
            {
              name: "Carbohydrates",
              y: 1.09,
            },
            {
              name: "Protein",
              y: 15.5,
            },
            {
              name: "Ash",
              y: 1.68,
            },
          ],
        },
      ],
    });

    setBarChartOptions({
      chart: {
        type: "bar",
      },
      tooltip: {
        valueSuffix: "%",
      },

      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: "{point.percentage:.1f}%",
              style: {
                fontSize: "1.2em",
                textOutline: "none",
                opacity: 0.7,
              },
              // filter: {
              //     operator: '>',
              //     property: 'percentage',
              //     value: 10
              // }
            },
          ],
        },
      },
      series: [
        {
          name: "Percentage",
          colorByPoint: true,
          data: [
            {
              name: "Water",
              y: 55.02,
            },
            {
              name: "Fat",
              sliced: true,
              selected: true,
              y: 26.71,
            },
            {
              name: "Carbohydrates",
              y: 1.09,
            },
            {
              name: "Protein",
              y: 15.5,
            },
            {
              name: "Ash",
              y: 1.68,
            },
          ],
        },
      ],
    });
  }, []);
  return (
    <>
      <div className="pie-chart-outer-layout">
        <HighchartsReact
          highcharts={Highcharts}
          options={
            graphType?.graphType === "pie" ? chartPieOptions : chartBarOptions
          }
        />
      </div>
    </>
  );
};

export default PreviewGraphModal;
