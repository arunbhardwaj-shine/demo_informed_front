import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const QuestionPollsPieChart = ({ data }) => {
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
            valueSuffix: '%'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        legend: {
            verticalAlign: "bottom",
            labelFormat: '{name} ({percentage:.2f}%) ',
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
                    },
                ],
            },
            pie:{
                showInLegend: true
            }
           
        },
        series: [

            {
                name: 'Questions',
                colorByPoint: true,
                data: []

            }
        ],

    }
    );
    useEffect(() => {
        const seriesData = data?.map((item, index) => ({
            name: item?.name,
            y: item?.total,
            color: item?.color

        }))
        setPieOptions({ ...pieOptions, series: [{ ...pieOptions?.series[0], data: seriesData }] })
    }, [data])

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