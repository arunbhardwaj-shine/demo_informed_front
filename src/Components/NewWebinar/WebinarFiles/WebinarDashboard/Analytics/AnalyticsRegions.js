import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Row, Tab, Tabs } from 'react-bootstrap';
import { loader } from '../../../../../loader';
import { postData } from '../../../../../axios/apiHelper';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../../../../../axios/apiConfig';
import { useSidebar } from '../../../../CommonComponent/LoginLayout';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown.js';

exporting(Highcharts);
exportData(Highcharts);
drilldown(Highcharts);

const AnalyticsRegions = () => {
    const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const { eventIdContext, handleEventId } = useSidebar();
    const localStorageEvent = JSON.parse(localStorage.getItem('EventIdContext'));
    const [eventId, setEventId] = useState(eventIdContext || localStorageEvent);
    const [regionData, setRegionData] = useState(null);
    const [activeRegion, setActiveRegion] = useState(null);
    const [isPieChart, setIsPieChart] = useState(true);
    const [flag, setFlag] = useState(1);

    const commonPieOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            height: 800,
        },
        title: {
            align: "left",
            style: {
                fontSize: "14px",
            },
        },
        exporting: {
            enabled: false,
            menuItemDefinitions: {
                downloadPNG: {
                    text: "Download PNG",
                    onclick: function () {
                        this.exportChart();
                    },
                },
                downloadJPEG: {
                    text: "Download JPEG",
                    onclick: function () {
                        this.exportChart({
                            type: "image/jpeg",
                        });
                    },
                },
                downloadPDF: {
                    text: "Download PDF",
                    onclick: function () {
                        this.exportChart({
                            type: "application/pdf",
                        });
                    },
                },
                downloadSVG: {
                    text: "Download SVG",
                    onclick: function () {
                        this.exportChart({
                            type: "image/svg+xml",
                        });
                    },
                },
            },
            buttons: {
                contextButton: {
                    symbol:
                        "url(https://cdn3.iconfinder.com/data/icons/slicons-line-essentials/24/more_vertical-512.png)",
                    menuItems: [
                        "downloadPNG",
                        "downloadJPEG",
                        "downloadPDF",
                        "downloadSVG",
                    ],
                },
            },
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y}</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "",
            },
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                size: "80%",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.y}",
                    style: {
                        fontWeight: "bold",
                        color: "black",
                        textOutline: "none",
                        fontSize: "16px",
                    },
                    distance: 30,
                    connectorPadding: 0,
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

    useEffect(() => {
        loader('show');
        getEventQuestion();
    }, [flag]);

    const getEventQuestion = async () => {
        try {
            const result = await postData(ENDPOINT.GET_REGION_STATS, {
                companyId: eventId?.companyId,
                eventId: eventId?.eventId,
            });

            if (result?.data?.data?.length === 0) {
                throw new Error('Please create the polls first');
            }

            setRegionData(result?.data?.data);
            setActiveRegion(Object.keys(result?.data?.data)[0]);
            loader('hide');
        } catch (err) {
            loader('hide');
            console.error('--err', err.message);
            toast.error(err.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleTabChange = (regionName) => {
        setActiveRegion(regionName);
    };

    const toggleChartType = () => {
        setIsPieChart(!isPieChart);
    };

    return (
        <Col className="right-sidebar">
            <div className="custom-container">
                <Row>
                    <div className="rd-full-explain analytics-region">
                        <div className="rd-training-block">
                            <div className="d-flex align-items-center justify-content-between"></div>
                            <div className="country_tabs">
                                <Tabs defaultActiveKey="Other" className="" fill onSelect={handleTabChange}>
                                    {regionData &&
                                        Object.keys(regionData).map((regionName) => (
                                            <Tab key={regionName} eventKey={regionName} title={regionName.toUpperCase()}>
                                                <div className="tabs-data">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="rd-training-block-left">
                                                            <h4>Total registered & Attended HCPs</h4>
                                                        </div>
                                                        <div className="rd-training-block-right d-flex">
                                                            <div className="switch6">
                                                                <label className="switch6-light">
                                                                    <input type="checkbox" onChange={toggleChartType} checked={!isPieChart} />
                                                                    <span>
                                                                        <span>
                                                                            <img src={path_image + 'bar-graph-img.png'} style={{ transform: 'rotate(90deg)' }} />
                                                                        </span>
                                                                        <span>
                                                                            <img src={path_image + 'pie-img.png'} />
                                                                        </span>
                                                                    </span>
                                                                    <a className="btn"></a>
                                                                </label>
                                                            </div>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                    {/* Dropdown icon */}
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item>Download PNG</Dropdown.Item>
                                                                    <Dropdown.Item>Download JPEG</Dropdown.Item>
                                                                    <Dropdown.Item>Download PDF</Dropdown.Item>
                                                                    <Dropdown.Item>Download SVG</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
                                                    <div className="graph-view">
                                                        {activeRegion && (
                                                            <HighchartsReact
                                                                highcharts={Highcharts}
                                                                options={isPieChart ?
                                                                    {
                                                                        ...commonPieOptions,
                                                                        series: [
                                                                            {
                                                                                name: '',
                                                                                colorByPoint: true,
                                                                                data: regionData[activeRegion].seriesData,
                                                                            },
                                                                        ],
                                                                        drilldown: {
                                                                            series: regionData[activeRegion].drilldownData,
                                                                        },
                                                                    } :
                                                                    {
                                                                        ...commonPieOptions,
                                                                        chart: {
                                                                            type: 'bar',
                                                                            height: 800,
                                                                        },
                                                                        series: [
                                                                            {
                                                                                name: '',
                                                                                data: regionData[activeRegion].seriesData.map(item => item.y),
                                                                            },
                                                                        ],
                                                                    }
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </Tab>
                                        ))}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        </Col>
    );
};

export default AnalyticsRegions;
