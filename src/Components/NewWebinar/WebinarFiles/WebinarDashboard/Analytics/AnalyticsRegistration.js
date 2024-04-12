import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { postData } from '../../../../../axios/apiHelper';
import { loader } from '../../../../../loader';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const AnalyticsRegistration = ({dropdownClicked,setEventData}) => {
    const { eventIdContext, handleEventId } = useSidebar();
    const localStorageEvent = JSON.parse(localStorage.getItem("EventIdContext"));
    const [eventId, setEventId] = useState(eventIdContext?.eventId || localStorageEvent?.eventId);

    const [pieChartData, setPieChartData] = useState([]);
    const colors = ["#f5c64a", "#fde3a1", "#DECBE3", "#986CA5", "#004A89"];

    const commonPieOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            height: 250,
        },
        title: {
            text: "",
            align: "left",
        },
        exporting: {
            enabled: false,
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        legend: {
            verticalAlign: "bottom",
        },
        plotOptions: {
            pie: {
                size: "80%",
                dataLabels: {
                    enabled: true,
                    format: "{point.y}",
                    style: {
                        fontWeight: "bold",
                        color: "white",
                        textOutline: "none",
                        fontSize: "20px",
                    },
                    distance: -40,
                },
                animation: {
                    duration: 1000,
                },
                enableMouseTracking: true,
                showInLegend: true,
                borderWidth: 0,
            },
        },
        series: [],
    };

    const [pieOptions, setPieOptions] = useState({ ...commonPieOptions });
    const [pieOptionsHcps, setPieOptionsHcps] = useState({ ...commonPieOptions });

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                loader("show");
                const body = { eventId };
                const response = await postData(ENDPOINT.GET_TOTAL_EMAIL_REGISTRATION_COUNT, body);
                const result = response?.data?.data;
                setPieChartData(result);
                setEventData(result?.eventData);

                const newValue = [
                    {
                        name: "",
                        colorByPoint: true,
                        data: [
                            { name: "HCP", y: result?.totalRegistrations?.hcpUsers || 0, color: '#F58289' },
                            { name: "STAFF", y: result?.totalRegistrations?.staffUsers || 0, color: '#FFC5C8' },
                        ],
                    },
                ];
                setPieOptions({ ...commonPieOptions, series: newValue });

                const newValueHcps = [
                    {
                        name: "",
                        colorByPoint: true,
                        data: [
                            { name: "Internal List", y: result?.registeredHcpData?.internalHcps || 0, color: '#FAC755' },
                            { name: "External List", y: result?.registeredHcpData?.externalHcps || 0, color: '#FFE3A4' },
                        ],
                    },
                ];
                setPieOptionsHcps({ ...commonPieOptions, series: newValueHcps });

                loader("hide");
            } catch (error) {
                loader("hide");
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchAnalyticsData();
    }, [eventId]);

    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

    return (
        <>
            <div className='rd-analytics-box'>
                <p className="rd-box-small-title">Registration</p>
                <div className='rd-analytics-box-layout d-flex justify-content-between align-items-start'>
                    <Col md={3}>
                        <div className="rd-analytics-top d-flex justify-content-between align-items-center" >
                            <h6 className="regi-title">Total Registrations</h6>
                            <div className="d-flex">
                                <div className="count-number">{pieChartData?.totalRegistrations?.totalUsers}</div>
                                <img src={path_image + "crm.svg"} alt="CRM" className="CRM" />
                            </div>
                        </div>
                        <div className='graph-box'>
                            <div className='highchart-chart'>
                                <HighchartsReact highcharts={Highcharts} options={pieOptions} />
                            </div>
                            <div className="rd-box-export">
                                <img src={path_image + "arrow-export.svg"} alt="" onClick={()=>dropdownClicked("totalRegistrations")} />
                            </div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="rd-analytics-top d-flex justify-content-between align-items-center" >
                            <h6 className="regi-hcp">Registered HCPs</h6>
                            <div className="d-flex">
                                <div className="count-number">{pieChartData?.totalRegistrations?.totalUsers}</div>
                                <img src={path_image + "irt.svg"} alt="" className="doctor" />
                            </div>
                        </div>
                        <div className='graph-box d-flex justify-content-between'>
                            <div className='highchart-chart left-side'>
                                <HighchartsReact highcharts={Highcharts} options={pieOptionsHcps} />
                                <div className="rd-box-export">
                                    <img src={path_image + "arrow-export.svg"} alt=""  onClick={()=>dropdownClicked("registeredHcps")} />
                                </div>
                            </div>
                            <div className='highchart-chart right-side'>
                                <img src={path_image + "registered-overtime-analytics.png"} alt="" />
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
        </>
    );
}

export default AnalyticsRegistration;
