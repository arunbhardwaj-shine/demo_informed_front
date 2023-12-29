import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const QuestionPollsPieChart = () => {
    const [pieOptions, setPieOptions] = useState({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: "User Answers",
        },
        tooltip: {
            formatter: function () {
                return this.point.name + ' : <b>' + this.point.y + '</b>';
            },
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        legend: {
            labelFormat: '{name} ({percentage:.2f}%) ',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [

            {
                name: 'Questions',
                colorByPoint: true,
                // data: [
                //     {
                //         name: 'Water',
                //         y: 55.02
                //     },
                //     {
                //         name: 'Fat',
                //         sliced: true,
                //         selected: true,
                //         y: 26.71
                //     },
                //     {
                //         name: 'Carbohydrates',
                //         y: 1.09
                //     },
                //     {
                //         name: 'Protein',
                //         y: 15.5
                //     },
                //     {
                //         name: 'Ash',
                //         y: 1.68
                //     }
                // ]
            }
        ],

    }
    );

    return (<>
        <div className="graph-box">
            <HighchartsReact
                highcharts={Highcharts}
                options={pieOptions}
            />
        </div>

    </>)

}
export default QuestionPollsPieChart