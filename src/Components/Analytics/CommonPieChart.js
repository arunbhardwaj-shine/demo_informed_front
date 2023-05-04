import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
exporting(Highcharts);
exportData(Highcharts);

const CommonPieChart = ({ data, value }) => {
  const series = [];
  data?.map((element, index) => {
    const newSeries = {
      name: element,
      y: value[index],
      color: Highcharts.getOptions().colors[index],
    };

    series.push(newSeries);
  });

  Highcharts.setOptions({
    colors: [
      "#FFBE2C",
      "#F58289",
      "#d1d132",
      "#D61975",
      "#0066BE",
      "#00003C",
      "#b490f5",
      "#7cb0dd",
      "#9C9CA2",
      "#91817e",
      "#2b6570",

      "#4f4566",
      "#00D4C0",
      "#32a1d1",
    ],
  });

  const deliveryRegistrationPieOptions = {
    chart: {
      type: "pie",
      height: "600",
    },
    title: {
      text: "Registration based on delivery",
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
        name: "Article Registration based on delivery",
        colorByPoint: true,
        data: series,
      },
    ],
  };

  return (
    <>
      <div className="high_charts">
        <HighchartsReact
          highcharts={Highcharts}
          options={deliveryRegistrationPieOptions}
        />
      </div>
    </>
  );
};
export default CommonPieChart;
