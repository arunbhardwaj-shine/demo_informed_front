import React, { useEffect, useState, useRef } from "react";
import {
    Accordion,
    Button,
    Col,
    Container,
    Dropdown,
    Modal,
    Row,
    Table,
    ProgressBar
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { surveyAxiosInstance } from "./CommonFunctions/CommonFunction";
import { loader } from "../../loader";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import SurveyAnalyticsQuestionPieChart from "./SurveyAnalyticsQuestionPieChart";
import { Spinner } from "react-activity";
import SurveyAnalyticsQuestionView from "./SurveyAnalyticsQuestionView";
import SurveyAnalyticsFreeTextView from "./SurveyAnalyticsFreeTextView";
import SurveyAnalyticsRatingView from "./SurveyAnalyticsRatingView";
exporting(Highcharts);
exportData(Highcharts);
const SurveyAnalyticsDetail = () => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const location = useLocation()
    const [stateData, setStateData] = useState(location?.state?.item)
    const [filterdata, setFilterData] = useState({
        'status': ['completed', 'drop-off', 'ignored']
    });
    const [showfilter, setShowFilter] = useState(false);
    const [filterObject, setFilterObject] = useState({});
    const [appliedFilter, setAppliedFilter] = useState({})
    const [otherFilter, setOtherFilter] = useState({});
    const [filterApplyflag, setFilterApplyflag] = useState(0);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState({});
    const [apiStatus, setApiStatus] = useState(false)
    const [flag, setFlag] = useState({ survey_taker: false })
    const [sortBy, setSortBy] = useState(''); // Initial sort key
    const [sortOrder, setSortOrder] = useState('');
    const [surveyTakerTableData, setSurveyTakerTableData] = useState([])
    const [surveyTakerTableDataBackup, setSurveyTakerTableDataBackup] = useState([])
    const [surveyTakerShowQuestions, setSurveyTakerShowQuestions] = useState()
    const [tempQuestionData, setTempQuestionData] = useState([])
    const buttonRef = useRef(null);
    const filterRef = useRef(null);
    const survey_taker = useRef(null)
    // const [whichTypeMatrixGraph, setWhichTypeMatrixGraph] = useState({})
    // const [show, setShow] = useState(false);
    // const [whichTypeGraph, setWhichTypeGraph] = useState({})
    // const [sectionLoader, setSectionLoader] = useState(false);
    const [loaderIndex, setLoaderIndex] = useState()
    const [options, setOptions] = useState({
        chart: {
            type: "bar",
            height: 300,
        },
        title: {
            text: "Survey Taker Status",
        },
        xAxis: {
            categories: [],
            labels: {
                enabled: false,
            },
        },
        yAxis: {
            title: {
                text: null // No title for the Y-axis
            },
            labels: {
                enabled: false, // Disable Y-axis labels
            },
            gridLineWidth: 1, // Remove grid lines (optional)
        },
        legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
            x: 0,
            y: 0,
        },
        exporting: {
            enabled: true,
        },
        tooltip: {
            formatter: function () {
                return (
                    `<strong>${this.series.name}</strong><br/>` + // Show the series name (Opened, Completed, Dropoff)
                    `${this.point.y}` // Show the value for each bar
                );
            },
        },
        plotOptions: {
            series: {
                pointWidth: 30,
                dataLabels: {
                    enabled: true,
                    format: "{point.y}",
                },
            },
        },
        series: [],
    });
    const colors = [
        "#39CABC",
        "#FAC755",
        "#F58289",
        "#8A4E9C",
        "#0442A2",
        "#00D4C0",
        "#BCA9F5",
        "#D61975",
        "#9af5b2",
        "#0066BE",
        "#FFBE2C",
        "#7cb0dd",
        "#7c00ad",
        "#ACB5F5",
        "#009739",
        "#db6f2c",
        "#9C9CA2",
        "#00003C",
    ];

    let QuestionData = [
        {
            ques: "Lorem sollicitudin faucibus Pulvinar ultricies neque praesent mauris, arcu viverra aliquam massa pretium sit arcu curabitur fringilla egestas massa?",
            ans: [
                { name: "Masuismod phartra donec faucibus", y: 8 },
                { name: "Masuismod phartra donec faucibus quisque nuneque", y: 12 },
                { name: "Masuismod phartra donec faucibus quisque nuneque mote condi ment", y: 15 },
                { name: "Masuismod phartra donec faucibus quisque", y: 30 },
                { name: "Masuismod phartra donec faucibus quisque nuneque mote", y: 108 }
            ]
        },
        {
            ques:
                "Which of the following is the largest planet in our solar system?",
            ans: [
                { name: "Earth", y: 5 },
                { name: "Mars", y: 8 },
                { name: "Jupiter", y: 9 },
                { name: "Saturn", y: 7 },
                { name: "Venus", y: 3 }
            ]
        }
    ]

    useEffect(() => {
        getSurveyDetail()

    }, [])

    const getSurveyDetail = async () => {
        try {
            loader("show")
            setApiStatus(true)
            const res = await surveyAxiosInstance.post("/survey/qns-analytics", {
                survey_id: stateData?.survey_id
                // survey_id: 65
            });
            let data = res?.data?.data
            if (data != "undefined") {
                let valueupdate = options;
                valueupdate.xAxis.categories = ["Opened", "Completed", "Drop-off"]
                valueupdate.series = [
                    {
                        name: "Opened",
                        data: [{ y: data?.userOpenings, color: colors[4] }],
                        color: colors[4]

                    },
                    {
                        name: "Completed",
                        data: [{ y: data?.completed_count, color: colors[0] }],

                    },
                    {
                        name: "Drop-off",
                        data: [{ y: data?.Dropoff, color: colors[1] }],

                    }
                ];
                setOptions(valueupdate)
            }
            setData(data)
            await getTempQuestionData()
        } catch (err) {
            console.log("--err", err)
        } finally {
            setApiStatus(false)
            loader("hide")
        }
    }

    const getTempQuestionData = async () => {
        try {
            // let type = {}
            // QuestionData?.forEach((item, index) => {
            //     type[index] = "pie"
            // })
            // setWhichTypeGraph(type)
            const res = await surveyAxiosInstance.post("/survey/analytic-qns-detail", {
                survey_id: stateData?.survey_id
                // survey_id: 65
            });
            const data = res?.data?.data?.allData

            setTempQuestionData(data)
        } catch (err) {
            console.log("--err", err);
        }

    }
    const clearFilter = () => {
        document.querySelectorAll("input")?.forEach((checkbox) => {
            checkbox.checked = false;
        });
        setOtherFilter({});
        setAppliedFilter({});
        if (Object.keys(filterObject)?.length) {
            setFilterObject({});
            setSurveyTakerTableData(surveyTakerTableDataBackup)
        }
        setShowFilter(false);
    };

    const applyFilter = () => {
        setFilterApplyflag(1);
        setSurveyTakerTableData([]);
        setFilterObject(appliedFilter);
        const hasAllNonEmptyValues = Object.keys(otherFilter).every(key => {
            const value = filter[key];
            if (Array.isArray(value)) {
                return value.length > 0;
            }
            return value !== null && value !== undefined && value !== '';
        });

        if (!hasAllNonEmptyValues) {
            const data = surveyTakerTableDataBackup.filter(item => {
                const matchesFilters = Object.keys(otherFilter).every(key => {
                    if (Array.isArray(otherFilter[key])) {
                        return otherFilter[key].some(value => {
                            if (typeof value === 'string') {
                                return item[key] && item[key].includes(value);
                            } else if (typeof value === 'number') {
                                return item[key] === value;
                            }
                            return false;
                        });
                    }
                    return true;
                });
                return matchesFilters;
            });
            setSurveyTakerTableData(data);
        } else {
            setSurveyTakerTableData(surveyTakerTableDataBackup);
        }
        setShowFilter(false);
    };

    const removeindividualfilter = (key, item) => {
        let old_object = filterObject;
        let otherFilterObj = otherFilter;
        const index = old_object[key]?.indexOf(item);
        if (index > -1) {
            // if (old_object[key].includes("All")) {
            //   const allIndex = old_object[key]?.indexOf("All");
            //   old_object[key]?.splice(allIndex, 1);
            //   delete otherFilterObj[key];
            // }
            old_object[key]?.splice(index, 1);
            otherFilterObj[key]?.splice(index, 1);

            if (old_object[key]?.length == 0) {
                delete old_object[key];
                delete otherFilterObj[key];
            }
        }
        setAppliedFilter(old_object);
        setOtherFilter(otherFilterObj);
        setFilterObject(old_object);
        applyFilter()

    };
    const handleOnFilterChange = (e, item, index, key, data = []) => {
        let newObj = JSON.parse(JSON.stringify(appliedFilter));
        let otherObj = JSON.parse(JSON.stringify(otherFilter));

        if (!newObj[key]) {
            newObj[key] = [];
        }
        if (!otherObj[key]) {
            otherObj[key] = [];
        }

        if (e?.target?.checked == true) {
            if (
                // key == "training_status_code" ||
                // key == "user_type" ||
                // key == "site_number"
                key == "Radio"

            ) {
                newObj[key] = [];
                newObj[key]?.push(item);
                otherObj[key] = [];
                otherObj[key]?.push(item);
            }
            else {
                if (item == "All") {
                    newObj[key] = ["All"];
                    otherObj[key] = data;
                } else {
                    newObj[key]?.push(item);
                    otherObj[key]?.push(item);

                    // if (data?.length - 1 == newObj[key]?.length) {
                    //   newObj[key]?.push("All");
                    //   otherObj[key]?.push(item);
                    // }
                }
            }
        } else {
            if (item == "All") {
                newObj[key] = [];
                otherObj[key] = [];
            } else {
                if (newObj[key].includes("All")) {
                    newObj[key] = newObj[key].filter((item) => item != "All");
                    otherObj[key] = otherObj[key].filter((item) => item != "All");
                }
                const index = newObj[key]?.indexOf(item);
                if (index > -1) {
                    newObj[key]?.splice(index, 1);
                    if (newObj[key]?.length == 0) {
                        delete otherObj[key];
                        delete newObj[key];
                    }
                }
            }

            const otherIndex = otherObj[key]?.indexOf(item);
            if (otherIndex > -1) {
                otherObj[key]?.splice(otherIndex, 1);
                if (otherObj[key]?.length == 0) {
                    delete otherObj[key];
                }
                newObj[key] = otherObj[key];
            }
        }
        setOtherFilter(otherObj);
        setAppliedFilter(newObj);
    };

    const surveyTakerfn = async () => {
        try {
            loader("show")
            setFlag({ survey_taker: true })
            setApiStatus(true)
            if (surveyTakerTableData?.length == 0) {
                const res = await surveyAxiosInstance.post("/survey/survey-takers-status", {
                    survey_id: stateData?.survey_id
                    // survey_id:34
                });
                // let data = [
                //     { name: "shine", email: "shinedezign@infonet.com", region: "asia", country: "india", date: new Date().toUTCString(), status: "completed" },
                //     { name: "informed", email: "informed@docintel.com", region: "asia", country: "india", date: new Date().toUTCString(), status: "drop-off" },
                //     { name: "docintel", email: "docintel@informed.com", region: "EU", country: "England", date: new Date().toUTCString(), status: "ignored" }
                // ]
                const countries = res?.data?.data?.map((item) => item?.country)
                setFilterData((prev) => ({ ...prev, country: countries }))
                setSurveyTakerTableData(res?.data?.data)
                setSurveyTakerTableDataBackup(res?.data?.data)
                setTimeout(() => {
                    survey_taker?.current?.focus()
                }, 500);
                survey_taker?.current?.focus()
            } else {
                setTimeout(() => {
                    survey_taker?.current?.focus()
                }, 500);
                survey_taker?.current?.focus()
            }
        } catch (err) {
            console.log("--err", err)
        } finally {
            setApiStatus(false)
            loader("hide")
        }
    }

    const handleSort = (key) => {
        setSortBy(key);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortData = (data, key, order) => {
        return data.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];
            // Handle different data types (numbers, strings)
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            } else {
                return order === 'asc'
                    ? valueA?.localeCompare(valueB) // Handle string sorting with locale awareness
                    : valueB?.localeCompare(valueA);
            }
        });
    };

    const surveyTakerShowData = async (e, index) => {
        if (surveyTakerShowQuestions == index) {
            setSurveyTakerShowQuestions()
        } else {
            setSurveyTakerShowQuestions(index)
        }
    }

    const downloadExcelUsers = (data, tableName) => {
        try {
            data = data?.map((item, index) => {
                let finalData = {};
                finalData.Name = item?.name ? item?.name : "NA";
                finalData.Email = item?.email ? item?.email.trim() : "NA";
                finalData.Region = item?.region ? item?.region : "NA";
                finalData.Country = item?.country ? item?.country : "NA";
                finalData.Date = item?.date ? item?.date : "NA";
                finalData.Status = item?.status ? item?.status : "NA";
                return finalData;
            });

            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            // Set column widths dynamically based on the content
            const columnWidths = data.reduce((acc, row) => {
                Object.keys(row).forEach((key, index) => {
                    const value = row[key] ? row[key].toString() : '';
                    const width = Math.max(value.length, key.length) + 2;
                    acc[index] = Math.max(acc[index] || 0, width);
                });
                return acc;
            }, []);

            worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            const blob = new Blob([excelBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            });
            saveAs(
                blob, `${tableName}_.xls`
            );
        } catch (error) {
            console.error(
                "An error occurred while downloading the Excel file:",
                error
            );
        }
    };

    // const changeGraphType = (e, index) => {
    //     console.log("index-->", index)

    //     setApiStatus(true)
    //     setLoaderIndex(index)
    //     setSectionLoader(true)
    //     console.log("before type--->", whichTypeGraph, e?.target?.checked);
    //     let type = { ...whichTypeGraph }
    //     type[index] = e?.target?.checked ? "bar" : "pie"
    //     console.log(" type--->", type);

    //     setTimeout(() => {

    //         setWhichTypeGraph(type)

    //         setApiStatus(false)
    //         setSectionLoader(false)
    //         console.log("After type--->", whichTypeGraph);
    //     }, 500);

    // }

    return (
        <>
            <Col className="right-sidebar custom-change">
                <div className="custom-container">
                    {Object?.keys(data)?.length ?
                        <Row>
                            <div className="top-header analytics_header sticky">
                                <div className="page-title d-flex flex-column align-items-start">
                                    <h2>Headline Lorem ipsum pretium id libero dolorsit amet consectetur Orci </h2>
                                    <p>April. 22. 2024</p>
                                </div>
                                <Button title="Download Site Engagements" className="download filled">
                                    Summary (Excel)
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE" ></path>{" "} <path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE" ></path> </svg>
                                </Button>

                            </div>
                            <div className="webinar-analytics-layout survey-analytics-content">
                                <Row>
                                    <Col md={12}>
                                        <div className="survey-analytics-box">
                                            <div className="survey-analytics-top align-items-center d-flex">
                                                <h6>
                                                    Overview
                                                </h6>
                                            </div>
                                            <div className="survey-analytics-layout row">
                                                <div className="survey-completion col">
                                                    <p>Completion</p>
                                                    <div className="survey-completion-info">
                                                        <div></div>
                                                        <h2>{data?.completed_count}</h2>
                                                        <div className="completed-survey">
                                                            <p>
                                                                <img src={path_image + "user-gray.svg"} alt="" />Completed the survey
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="survey-takers col">
                                                    <p>Survey Takers over time | Delivery channels</p>
                                                    <img src={path_image + "survey-takers.png"} alt="" />
                                                </div>
                                                <div className="survey-takers-status col">
                                                    {/* <p>Survey Takers status</p>
                                                <img src={path_image + "survey-takers-status.png"} alt="" /> */}

                                                    {options?.series?.length > 0 ? (<>
                                                        <HighchartsReact
                                                            highcharts={Highcharts}
                                                            options={options}
                                                        /></>)
                                                        : ""}
                                                    <div className="rd-box-export">
                                                        <img src={path_image + "arrow-export.svg"}
                                                            alt=""
                                                            onClick={() => {
                                                                surveyTakerfn();
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="survey-full-info col d-flex flex-column">
                                                    <div className="survey-info takers">
                                                        <div>
                                                            <img src={path_image + "user-blue.png"} alt="" />Survey takers
                                                        </div>
                                                        <div className="survey-value">
                                                            {data?.completed_count}
                                                        </div>
                                                    </div>
                                                    <div className="survey-info avg">
                                                        <div>
                                                            <img src={path_image + "timer.png"} alt="" />AVG completion time
                                                        </div>
                                                        <div className="survey-value">
                                                            {data?.averageCompletionTime} <small>sec</small>
                                                        </div>
                                                    </div>

                                                    <div className="survey-info question">
                                                        <div>
                                                            <img src={path_image + "question.png"} alt="" />Survey Questions
                                                        </div>
                                                        <div className="survey-value">
                                                            {data?.survey_questions}
                                                        </div>
                                                    </div>
                                                    <div className="survey-info no-answer">
                                                        <div>
                                                            <img src={path_image + "question-not.png"} alt="" />Not answered Questions
                                                        </div>
                                                        <div className="survey-value">
                                                            2
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {tempQuestionData?.map((item, index) => {
                                            if (item?.type === "multiple" || item?.type === "checkbox" || item?.type == "matrix") {
                                                return (
                                                    <SurveyAnalyticsQuestionView
                                                        index={index}
                                                        item={item}
                                                        colors={colors}
                                                        type="pie"
                                                    />
                                                )
                                            }
                                            else if (item?.type === "freeText") {
                                                return (
                                                    <SurveyAnalyticsFreeTextView

                                                        index={index}
                                                        item={item}
                                                    />
                                                );
                                            }
                                            else if (item?.type == "rating") {
                                                // item.extra=JSON.parse(item?.extra)
                                                // let totalCount = item?.answer?.reduce((sum, obj) => sum + obj.count, 0);
                                                let totalWeightedValue = 0
                                                let totalRatings = 0
                                                // item.totalCount=totalCount
                                                for (let i = 5; i >= 1; i--) {

                                                    // Find if the value already exists
                                                    let existingItem = item.answer.find(obj => obj.value === i.toString());

                                                    if (!existingItem) {
                                                        // If the item exists, you can update it as needed

                                                        // If the item doesn't exist, create a new one
                                                        item.answer.push({
                                                            "answerId": null,
                                                            "value": i.toString(),
                                                            "count": 0
                                                        });
                                                    }
                                                }
                                                item.answer.forEach(obj => {
                                                    // Avoid division by zero
                                                    obj.percentage = item.total_count > 0 ? JSON.parse(((obj.count / item.total_count).toFixed(2)) * 100) : 0;
                                                    totalWeightedValue += parseInt(obj.value) * obj.count;
                                                    totalRatings += obj.count > 0 ? 1 : 0


                                                });
                                                item.totalRatings = totalRatings
                                                let overallRating = item.total_count > 0 ? totalWeightedValue / item.total_count : 0;
                                                item.overallRating = overallRating
                                                item?.answer?.sort((a, b) => parseInt(b.value) - parseInt(a.value))

                                                return (
                                                    // <ProgressBar style={{ flex: 1, margin: "0 10px" }}>
                                                    //     <ProgressBar
                                                    //         now={item?.value}
                                                    //         style={{
                                                    //             // backgroundColor: item.color[colorIndex],
                                                    //             backgroundColor: colors[index],
                                                    //         }}
                                                    //     />
                                                    // </ProgressBar>
                                                    <SurveyAnalyticsRatingView
                                                        index={index}
                                                        item={item}
                                                        colors={colors}
                                                    />
                                                );
                                            }
                                            else {
                                                return null;
                                            }

                                        })}

                                        {/* <div className="survey-question-listing">
                                                    <div className="survey-question-top d-flex align-items-center">
                                                        <div className="survey-question-num">
                                                            <div className="question-type">
                                                                <img src={path_image + "multiple-choices.png"} alt="" />
                                                            </div>
                                                            <div className="question-number">
                                                                <h4>{`Q${index + 1}`}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="question-view">
                                                            <p>{item?.ques}</p>
                                                        </div>
                                                        <div className="question-status">
                                                            <div className="total-answered">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89" />
                                                                </svg>
                                                                <span>83</span>
                                                            </div>
                                                            <div className="total-ignored">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289" />
                                                                </svg>
                                                                <span>1</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="question-preview-block">
                                                        <div className="question-preview">
                                                            <div className="d-flex align-items-center justify-content-between question-preview-options">
                                                                <div>
                                                                    Choices
                                                                </div>
                                                                <div>
                                                                    Respondents
                                                                </div>
                                                            </div>
                                                            <div className="answer-options">
                                                                {item?.ans?.map((ans, i) => {
                                                                    return (<>
                                                                        <div className="answer">
                                                                            <div className="choices">
                                                                                <span className="bullet-color" style={{ background: colors[i] }}>&nbsp;</span>
                                                                                <div>{ans?.name}</div>
                                                                            </div>
                                                                            <div className="respondents">
                                                                                <span>{ans?.y}</span>
                                                                                <span className="respondents-percent">(<span>00%</span>)</span>
                                                                            </div>
                                                                        </div>
                                                                    </>)
                                                                })}

                                                            </div>
                                                        </div>
                                                        <div className="question-preview-right">
                                                            <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                                <div className="switch6">
                                                                    <label className="switch6-light">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={whichTypeGraph[index] == "bar" ? true : false}
                                                                            onChange={(e) => {
                                                                                changeGraphType(e, index)
                                                                            }}
                                                                        />
                                                                        <span>
                                                                            <span>
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                                            </span>
                                                                            <span>
                                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                                            </span>
                                                                        </span>
                                                                        <a className="btn"></a>
                                                                    </label>
                                                                </div>

                                                            </div>
                                                            {(apiStatus&&loaderIndex==index)?
                                                                // <div className="accordion-loader">
                                                                //     <div
                                                                //         className={
                                                                //             "loader tab-inside " +
                                                                //             (sectionLoader ? "show" : "")
                                                                //         }
                                                                //         id="custom_loader"
                                                                //     >
                                                                //         <div className="loader_show">
                                                                //             <span className="loader-view"> </span>
                                                                //         </div>
                                                                //     </div>
                                                                // </div>

                                                                <div
                                                                className="load_more"
                                                                style={{
                                                                  margin: "10 auto",
                                                                  justifyContent: "center",
                                                                  display: "flex",
                                                                }}
                                                              >
                                                                <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                                                              </div>
                                                                :
                                                            <div className="pie-chart-outer-layout">
                                                            

                                                                {whichTypeGraph[index] == "pie" ?
                                                                <SurveyAnalyticsQuestionPieChart
                                                                    key={index}
                                                                    data={{
                                                                        questionId: index,
                                                                        graphType: "pie",
                                                                        ans: item?.ans,
                                                                    }}
                                                                    type="analytics"
                                                                    show={show}
                                                                />
                                                                : <SurveyAnalyticsQuestionPieChart
                                                                    key={index}
                                                                    data={{
                                                                        questionId: index,
                                                                        graphType: "bar",
                                                                        ans: item?.ans,
                                                                    }}
                                                                    type="analytics"
                                                                    show={show}
                                                                />
                                                                }
                                                            </div>}
                                                        </div>
                                                    </div>
                                                </div> */}
                                        {/* </>)
                                        })} */}
                                        {/* {flag?.survey_taker ? (<> */}
                                        {/* <div className="survey-question-listing">
                                            <div className="survey-question-top d-flex align-items-center">
                                                <div className="survey-question-num">
                                                    <div className="question-type">
                                                        <img src={path_image + "free-text.png"} alt="" />
                                                    </div>
                                                    <div className="question-number">
                                                        <h4>Q5</h4>
                                                    </div>
                                                </div>
                                                <div className="question-view">
                                                    <p>Lorem sollicitudin faucibus Pulvinar ultricies neque praesent mauris, arcu viverra aliquam massa pretium sit arcu curabitur fringilla ?</p>
                                                </div>
                                                <div className="question-status">
                                                    <div className="total-answered">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89" />
                                                        </svg>
                                                        <span>83</span>
                                                    </div>
                                                    <div className="total-ignored">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289" />
                                                        </svg>
                                                        <span>1</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="question-preview-block">

                                                <div className="question-preview-right">
                                                    <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                        <Dropdown>
                                                            <Dropdown.Toggle id="dropdown-basic">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "PNG",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download PNG
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "JPEG",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download JPEG
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "PDF",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download PDF
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "SVG",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download SVG
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="free-text-section">
                                                        <div className="free-text-block">
                                                            <p>Username</p>
                                                            <div className="user-message">
                                                                <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                            </div>
                                                        </div>
                                                        <div className="free-text-block">
                                                            <p>Username</p>
                                                            <div className="user-message">
                                                                <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                            </div>
                                                        </div>
                                                        <div className="free-text-block">
                                                            <p>Username</p>
                                                            <div className="user-message">
                                                                <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                            </div>
                                                        </div>
                                                        <div className="free-text-block">
                                                            <p>Username</p>
                                                            <div className="user-message">
                                                                <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                            </div>
                                                        </div>
                                                        <div className="free-text-block">
                                                            <p>Username</p>
                                                            <div className="user-message">
                                                                <p>User messages masuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mas faucibus quisque nuneque ipsum quamodio.........................</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div> */}
                                        {flag?.survey_taker ? (<>
                                            <div className="question-preview-block survey-takers-state">
                                                <div className="top-header"
                                                    ref={survey_taker}
                                                    tabIndex={-1}>
                                                    <div className="page-title">
                                                        {" "}
                                                        <h4>Survey Takers status | <span>{surveyTakerTableData?.length}</span></h4>
                                                    </div>
                                                    <div className="top-right-action">
                                                        <div
                                                            className={`${showfilter ? "filter-by nav-item dropdown highlight" : "filter-by nav-item dropdown"}`} style={{ margin: '0' }}
                                                        >
                                                            <button
                                                                ref={buttonRef}
                                                                className={
                                                                    Object.keys(filterObject)?.length &&
                                                                        filterApplyflag == 1
                                                                        ? "btn btn-secondary dropdown filter_applied"
                                                                        : "btn btn-secondary dropdown"
                                                                }
                                                                type="button"
                                                                id="dropdownMenuButton2"
                                                                onClick={() => setShowFilter((showfilter) => !showfilter)}
                                                            >
                                                                Filter By
                                                                {showfilter ? (
                                                                    <svg
                                                                        className="close-arrow"
                                                                        width="13"
                                                                        height="12"
                                                                        viewBox="0 0 13 12"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <rect
                                                                            width="2.09896"
                                                                            height="15.1911"
                                                                            rx="1.04948"
                                                                            transform="matrix(0.720074 0.693897 -0.720074 0.693897 11.0977 0)"
                                                                            fill="#0066BE"
                                                                        />
                                                                        <rect
                                                                            width="2.09896"
                                                                            height="15.1911"
                                                                            rx="1.04948"
                                                                            transform="matrix(0.720074 -0.693897 0.720074 0.693897 0 1.45898)"
                                                                            fill="#0066BE"
                                                                        />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        className="filter-arrow"
                                                                        width="16"
                                                                        height="14"
                                                                        viewBox="0 0 16 14"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M0.615385 2.46154H3.07692C3.07692 3.14031 3.62892 3.69231 4.30769 3.69231H5.53846C6.21723 3.69231 6.76923 3.14031 6.76923 2.46154H15.3846C15.7243 2.46154 16 2.18646 16 1.84615C16 1.50585 15.7243 1.23077 15.3846 1.23077H6.76923C6.76923 0.552 6.21723 0 5.53846 0H4.30769C3.62892 0 3.07692 0.552 3.07692 1.23077H0.615385C0.275692 1.23077 0 1.50585 0 1.84615C0 2.18646 0.275692 2.46154 0.615385 2.46154Z"
                                                                            fill="#97B6CF"
                                                                        />
                                                                        <path
                                                                            d="M15.3846 6.15362H11.6923C11.6923 5.47485 11.1403 4.92285 10.4615 4.92285H9.23077C8.552 4.92285 8 5.47485 8 6.15362H0.615385C0.275692 6.15362 0 6.4287 0 6.76901C0 7.10931 0.275692 7.38439 0.615385 7.38439H8C8 8.06316 8.552 8.61516 9.23077 8.61516H10.4615C11.1403 8.61516 11.6923 8.06316 11.6923 7.38439H15.3846C15.7243 7.38439 16 7.10931 16 6.76901C16 6.4287 15.7243 6.15362 15.3846 6.15362Z"
                                                                            fill="#97B6CF"
                                                                        />
                                                                        <path
                                                                            d="M15.3846 11.077H6.76923C6.76923 10.3982 6.21723 9.84619 5.53846 9.84619H4.30769C3.62892 9.84619 3.07692 10.3982 3.07692 11.077H0.615385C0.275692 11.077 0 11.352 0 11.6923C0 12.0327 0.275692 12.3077 0.615385 12.3077H3.07692C3.07692 12.9865 3.62892 13.5385 4.30769 13.5385H5.53846C6.21723 13.5385 6.76923 12.9865 6.76923 12.3077H15.3846C15.7243 12.3077 16 12.0327 16 11.6923C16 11.352 15.7243 11.077 15.3846 11.077Z"
                                                                            fill="#97B6CF"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                            {/*Code for show filters*/}
                                                            {showfilter && (
                                                                <div
                                                                    ref={filterRef}
                                                                    className="dropdown-menu filter-options"
                                                                    aria-labelledby="dropdownMenuButton2"
                                                                >
                                                                    <h4>Filter By</h4>
                                                                    <Accordion defaultActiveKey="0" flush>
                                                                        {Object.keys(filterdata)?.map(function (key, index) {
                                                                            return (
                                                                                <>
                                                                                    {filterdata[key]?.length > 0 ? (
                                                                                        <Accordion.Item
                                                                                            className={
                                                                                                key == "role" ? "card upper" : "card"
                                                                                            }
                                                                                            eventKey={index}
                                                                                        >
                                                                                            <Accordion.Header className="card-header">
                                                                                                {key == "training_status_code" ? "Status" : key == "user_type" ? "Role" : key == "site_number" ? "Site" : key}
                                                                                            </Accordion.Header>

                                                                                            <Accordion.Body className="card-body">
                                                                                                <ul>
                                                                                                    {filterdata[key]?.length
                                                                                                        ? filterdata[key]
                                                                                                            ?.map(
                                                                                                                (item, index) => (
                                                                                                                    <li key={index}>
                                                                                                                        {item != "" ? (
                                                                                                                            <label className="select-multiple-option">
                                                                                                                                <input
                                                                                                                                    type="checkbox"
                                                                                                                                    id={`custom-checkbox-${item}-${index}`}
                                                                                                                                    value={
                                                                                                                                        typeof item ==
                                                                                                                                            "object"
                                                                                                                                            ? item?.title
                                                                                                                                            : item
                                                                                                                                    }
                                                                                                                                    name={key}
                                                                                                                                    checked={
                                                                                                                                        typeof item ==
                                                                                                                                            "object"
                                                                                                                                            ? appliedFilter[
                                                                                                                                                key
                                                                                                                                            ]?.includes(
                                                                                                                                                item.id
                                                                                                                                            )
                                                                                                                                                ? true
                                                                                                                                                : false
                                                                                                                                            : appliedFilter[
                                                                                                                                                key
                                                                                                                                            ]?.includes(item)
                                                                                                                                                ? true
                                                                                                                                                : false
                                                                                                                                    }
                                                                                                                                    onChange={(e) =>
                                                                                                                                        handleOnFilterChange(
                                                                                                                                            e,
                                                                                                                                            typeof item ==
                                                                                                                                                "object"
                                                                                                                                                ? item.id
                                                                                                                                                : item,
                                                                                                                                            index,
                                                                                                                                            key,
                                                                                                                                            [...filterdata[key]]
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                />
                                                                                                                                {typeof item == "object"
                                                                                                                                    ? item?.title
                                                                                                                                    : item}
                                                                                                                                <span className="checkmark"></span>
                                                                                                                            </label>
                                                                                                                        ) : null}
                                                                                                                    </li>
                                                                                                                )
                                                                                                            )
                                                                                                        : null}
                                                                                                </ul>
                                                                                            </Accordion.Body>
                                                                                        </Accordion.Item>
                                                                                    ) : null}
                                                                                </>
                                                                            );
                                                                        })}
                                                                    </Accordion>

                                                                    <div className="filter-footer">
                                                                        <button
                                                                            className="btn btn-primary btn-bordered"
                                                                            onClick={clearFilter}
                                                                        >
                                                                            Clear
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-primary btn-filled"
                                                                            onClick={applyFilter}
                                                                        >
                                                                            Apply
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/*
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                    <li><a className="dropdown-item" href="#">Filter1 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                                                    <li><a className="dropdown-item" href="#">Filter2 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                                                    <li><a className="dropdown-item" href="#">Filter3 <img src={path + "filter-close.svg"} alt="Close-filter" /></a></li>
                                                </ul>
                                                */}
                                                        </div>
                                                        <div className="clear-search d-flex align-items-center">
                                                            <button className="btn print" onClick={() => downloadExcelUsers(surveyTakerTableData, "survey_taker")}>
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE"></path><path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE"></path></svg>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="survey_data_details"
                                                >
                                                    <div className="survey_data_accordion_heading">
                                                        {Object.keys(filterObject)?.length !== 0 &&
                                                            filterApplyflag > 0 ? (
                                                            <div className="apply-filter">
                                                                <div className="filter-block">
                                                                    <div className="filter-block-left full">
                                                                        {Object.keys(filterObject)?.map((key, index) => {
                                                                            return (
                                                                                <>
                                                                                    {filterObject[key]?.length ? (
                                                                                        <div className="filter-div">
                                                                                            <div className="filter-div-title">
                                                                                                <span>{key == "training_status_code" ? "Status" : key == "user_type" ? "Role" : key == "site_number" ? "Site" : key} |</span>
                                                                                            </div>

                                                                                            <div className="filter-div-list">
                                                                                                {filterObject[key]?.map((item, index) => (
                                                                                                    <div
                                                                                                        className={
                                                                                                            key == "Role"
                                                                                                                ? "filter-result upper"
                                                                                                                : "filter-result"
                                                                                                        }
                                                                                                    >
                                                                                                        {item}
                                                                                                        <img
                                                                                                            src={path_image + "filter-close.svg"}
                                                                                                            onClick={() =>
                                                                                                                removeindividualfilter(key, item)
                                                                                                            }
                                                                                                            alt="Close-filter"
                                                                                                        />
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : null}
                                                                                </>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                    <div className="clear-filter">
                                                                        <button
                                                                            className="btn btn-outline-primary btn-bordered"
                                                                            onClick={clearFilter}
                                                                        >
                                                                            Remove All
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                        <Table className="fold-table" id="survey-takers">
                                                            <thead className="header">
                                                                <tr>
                                                                    <th className="sort_option">
                                                                        <span onClick={(e) => handleSort("name")}>

                                                                            Name
                                                                            <button
                                                                                className={`event_sort_btn ${sortBy == "name" ?
                                                                                    sortOrder == "asc"
                                                                                        ? "svg_asc"
                                                                                        : "svg_active"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) => handleSort("name")}
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="8"
                                                                                    height="8"
                                                                                    viewBox="0 0 8 8"
                                                                                    fill="none"
                                                                                >
                                                                                    <g clipPath="url(#clip0_3722_6611)">
                                                                                        <path
                                                                                            d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                                                                            fill="#97B6CF"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_3722_6611">
                                                                                            <rect width="8" height="8" fill="white" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </button></span></th>

                                                                    <th className="sort_option">
                                                                        <span onClick={(e) => handleSort("email")}>

                                                                            Email
                                                                            <button
                                                                                className={`event_sort_btn ${sortBy == "email" ?
                                                                                    sortOrder == "asc"
                                                                                        ? "svg_asc"
                                                                                        : "svg_active"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) => handleSort("email")}
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="8"
                                                                                    height="8"
                                                                                    viewBox="0 0 8 8"
                                                                                    fill="none"
                                                                                >
                                                                                    <g clipPath="url(#clip0_3722_6611)">
                                                                                        <path
                                                                                            d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                                                                            fill="#97B6CF"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_3722_6611">
                                                                                            <rect width="8" height="8" fill="white" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </button></span></th>

                                                                    <th className="sort_option">
                                                                        <span onClick={(e) => handleSort("region")}>

                                                                            Region
                                                                            <button
                                                                                className={`event_sort_btn ${sortBy == "region" ?
                                                                                    sortOrder == "asc"
                                                                                        ? "svg_asc"
                                                                                        : "svg_active"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) => handleSort("region")}
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="8"
                                                                                    height="8"
                                                                                    viewBox="0 0 8 8"
                                                                                    fill="none"
                                                                                >
                                                                                    <g clipPath="url(#clip0_3722_6611)">
                                                                                        <path
                                                                                            d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                                                                            fill="#97B6CF"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_3722_6611">
                                                                                            <rect width="8" height="8" fill="white" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </button>
                                                                        </span>
                                                                    </th>

                                                                    <th className="sort_option">
                                                                        <span onClick={(e) => handleSort("country")}>

                                                                            Country
                                                                            <button
                                                                                className={`event_sort_btn ${sortBy == "country" ?
                                                                                    sortOrder == "asc"
                                                                                        ? "svg_asc"
                                                                                        : "svg_active"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) => handleSort("country")}
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="8"
                                                                                    height="8"
                                                                                    viewBox="0 0 8 8"
                                                                                    fill="none"
                                                                                >
                                                                                    <g clipPath="url(#clip0_3722_6611)">
                                                                                        <path
                                                                                            d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                                                                            fill="#97B6CF"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_3722_6611">
                                                                                            <rect width="8" height="8" fill="white" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </button></span></th>

                                                                    <th className="sort_option">
                                                                        <span onClick={(e) => handleSort("date")}>

                                                                            Date
                                                                            <button
                                                                                className={`event_sort_btn ${sortBy == "date" ?
                                                                                    sortOrder == "asc"
                                                                                        ? "svg_asc"
                                                                                        : "svg_active"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) => handleSort("date")}

                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="8"
                                                                                    height="8"
                                                                                    viewBox="0 0 8 8"
                                                                                    fill="none"
                                                                                >
                                                                                    <g clipPath="url(#clip0_3722_6611)">
                                                                                        <path
                                                                                            d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                                                                            fill="#97B6CF"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_3722_6611">
                                                                                            <rect width="8" height="8" fill="white" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </button></span></th>

                                                                    <th className="sort_option">
                                                                        <span onClick={(e) => handleSort("status")}>
                                                                            Status
                                                                            <button
                                                                                className={`event_sort_btn ${sortBy == "status" ?
                                                                                    sortOrder == "asc"
                                                                                        ? "svg_asc"
                                                                                        : "svg_active"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) => handleSort("status")}
                                                                            >
                                                                                <svg
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="8"
                                                                                    height="8"
                                                                                    viewBox="0 0 8 8"
                                                                                    fill="none"
                                                                                >
                                                                                    <g clipPath="url(#clip0_3722_6611)">
                                                                                        <path
                                                                                            d="M7.00015 5.19137L4.3311 7.84461C4.28138 7.89413 4.22222 7.93328 4.15708 7.95976C4.02649 8.01341 3.87983 8.01341 3.74925 7.95976C3.6841 7.93328 3.62494 7.89413 3.57522 7.84461L0.90617 5.19137C0.806076 5.09173 0.7499 4.95664 0.75 4.81582C0.7501 4.67501 0.806468 4.54 0.906704 4.4405C1.00694 4.341 1.14283 4.28516 1.28449 4.28526C1.42614 4.28536 1.56195 4.34139 1.66205 4.44103L3.41988 6.18845L3.41357 0.530648C3.41357 0.389912 3.46981 0.254939 3.56992 0.155423C3.67003 0.0559068 3.8058 4.76837e-07 3.94738 4.76837e-07C4.08895 4.76837e-07 4.22473 0.0559068 4.32484 0.155423C4.42495 0.254939 4.48119 0.389912 4.48119 0.530648L4.48751 6.18845L6.24534 4.44103C6.34602 4.34437 6.48086 4.29088 6.62083 4.29209C6.76079 4.2933 6.89468 4.34911 6.99365 4.44749C7.09262 4.54588 7.14876 4.67897 7.14998 4.81811C7.1512 4.95724 7.09739 5.09129 7.00015 5.19137Z"
                                                                                            fill="#97B6CF"
                                                                                        />
                                                                                    </g>
                                                                                    <defs>
                                                                                        <clipPath id="clip0_3722_6611">
                                                                                            <rect width="8" height="8" fill="white" />
                                                                                        </clipPath>
                                                                                    </defs>
                                                                                </svg>
                                                                            </button></span></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {typeof surveyTakerTableData != "undefined" && surveyTakerTableData?.length > 0
                                                                    ?
                                                                    sortData(surveyTakerTableData, sortBy, sortOrder)?.map((item, index) => {
                                                                        // surveyTakerTableData?.map((item, index) => {
                                                                        return (<>

                                                                            <tr key={index}
                                                                                className={`view ${surveyTakerShowQuestions == index
                                                                                    ? "show"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) =>
                                                                                    surveyTakerShowData(e, index,item?.user_id,item?.ip_address)
                                                                                } >
                                                                                <td>{item?.name}</td>
                                                                                <td>{item?.email}</td>
                                                                                <td>{item?.region}</td>
                                                                                <td>{item?.country}</td>
                                                                                <td>{moment(item?.date).format("DD MMM. YYYY")}</td>
                                                                                <td className={item?.status}>{item?.status}</td>

                                                                            </tr>
                                                                            {surveyTakerShowQuestions == index ?
                                                                                <tr className="fold" >
                                                                                    <td colSpan="6">
                                                                                        <div className="survey-data">
                                                                                            <div className="question-type">
                                                                                                <img src={path_image + 'multiple-choices.png'} alt="" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <h6>
                                                                                                    Q1 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec mat?
                                                                                                </h6>
                                                                                                <p>
                                                                                                    Survey takers answer choice dolor sit amet consect ltrices vitae
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="survey-data">
                                                                                            <div className="question-type">
                                                                                                <img src={path_image + 'dropdown-choice.png'} alt="" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <h6>
                                                                                                    Q2 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra?
                                                                                                </h6>
                                                                                                <p>
                                                                                                    Survey takers answer choice dolor
                                                                                                </p>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="survey-data">
                                                                                            <div className="question-type">
                                                                                                <img src={path_image + 'star-rating.png'} alt="" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <h6>
                                                                                                    Q3 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa?
                                                                                                </h6>
                                                                                                <p>
                                                                                                    Survey takers answer choice dolor
                                                                                                </p>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className="survey-data">
                                                                                            <div className="question-type">
                                                                                                <img src={path_image + 'matrix.png'} alt="" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <h6>
                                                                                                    Q4 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor nibhcudolmasa euismod phartra donec?
                                                                                                </h6>
                                                                                                <p>
                                                                                                    Survey takers answer choice dolor sit amet consect ltrices vitae
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="survey-data">
                                                                                            <div className="question-type">
                                                                                                <img src={path_image + 'free-text.png'} alt="" />
                                                                                            </div>
                                                                                            <div>
                                                                                                <h6>
                                                                                                    Q5 | Faucibus qmasuismod phartra donec faucibus quisque nuneque mote condi ment zcsum nudolor?
                                                                                                </h6>
                                                                                                <p>
                                                                                                    Survey takers answer choice dolor sit amet consect ltrices vitae
                                                                                                </p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr> : null}

                                                                            <tr className="blank">
                                                                                <td colSpan="6" style={{ height: "10px" }}>
                                                                                    &nbsp;
                                                                                </td>
                                                                            </tr>
                                                                        </>)
                                                                    }) : !apiStatus ? <div className="no_found"><p>No Data Found</p></div> : null}


                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>  </>) : null}
                                        <div className="survey-question-listing country-by">
                                            <div className="survey-question-top d-flex align-items-center justify-content-between">
                                                <div className="page-title">
                                                    <h4>Survey Takers (Completed) According to country</h4>
                                                </div>
                                                <div className="question-status">
                                                    <div className="total-answered">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89" />
                                                        </svg>
                                                        <span>83</span>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="question-preview-block">
                                                <div className="question-preview-right">
                                                    <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                                        <div className="switch6">
                                                            <label className="switch6-light">
                                                                <input
                                                                    type="checkbox"
                                                                //checked={whichTypeGraph}
                                                                // onChange={() => {
                                                                // loader("show");

                                                                // setTimeout(() => {
                                                                //     setWhichTypeGraph(!whichTypeGraph);
                                                                //     loader("hide");
                                                                // }, 500);
                                                                // }}
                                                                />
                                                                <span>
                                                                    <span>
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_5227_2027)"><path d="M11.2048 1.54687C11.2048 1.27073 10.9808 1.04571 10.7049 1.05803C9.10037 1.12967 7.52788 1.54559 6.095 2.27982C4.51361 3.09016 3.14762 4.26499 2.10978 5.70733C1.07194 7.14967 0.39202 8.81816 0.126141 10.5751C-0.139738 12.332 0.0160486 14.127 0.580642 15.8118C1.14524 17.4966 2.10245 19.023 3.37326 20.265C4.64407 21.507 6.19204 22.4289 7.8894 22.9547C9.58676 23.4805 11.3848 23.595 13.1352 23.2889C14.7211 23.0115 16.2267 22.3959 17.5505 21.4863C17.7781 21.3299 17.8212 21.0154 17.6548 20.795L11.3057 12.3854C11.2402 12.2986 11.2048 12.1928 11.2048 12.0841V1.54687Z" fill="#39CABC"></path><path d="M23.5106 12.7847C23.7868 12.7847 24.0118 13.0087 23.9995 13.2846C23.9293 14.8565 23.5287 16.398 22.8216 17.8078C22.1141 19.2186 21.5564 19.844 20.4209 20.7231C20.2107 20.8858 19.9098 20.8496 19.7397 20.6452L13.8814 13.6045C13.6103 13.2788 13.842 12.7847 14.2657 12.7847H23.5106Z" fill="#0066BE"></path><path d="M22.9765 11.1825C23.2526 11.1825 23.4776 10.9586 23.4653 10.6827C23.4072 9.38195 23.1228 8.09995 22.6236 6.89467C22.0605 5.53524 21.2351 4.30004 20.1947 3.25958C19.1542 2.21912 17.919 1.39378 16.5596 0.830691C15.3595 0.333593 14.4241 0.057651 13.209 -0.000201631C12.9332 -0.0133342 12.709 0.212139 12.709 0.488281V10.6825C12.709 10.9587 12.9328 11.1825 13.209 11.1825H22.9765Z" fill="#8A4E9C"></path></g><defs><clipPath id="clip0_5227_2027"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>
                                                                    </span>
                                                                    <span>
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="24" width="6" height="24" rx="1" transform="rotate(90 24 0)" fill="#0066BE" /> <rect x="13.2617" y="9.14258" width="5.71429" height="13.2632" rx="1" transform="rotate(90 13.2617 9.14258)" fill="#8A4E9C" /> <rect x="19" y="18" width="6" height="19" rx="1" transform="rotate(90 19 18)" fill="#39CABC" /> </svg>
                                                                    </span>
                                                                </span>
                                                                <a className="btn"></a>
                                                            </label>
                                                        </div>
                                                        <Dropdown>
                                                            <Dropdown.Toggle id="dropdown-basic">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24" fill="none" > <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z" fill="#0066BE" /> </svg>
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "PNG",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download PNG
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "JPEG",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download JPEG
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "PDF",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download PDF
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                // onClick={() =>
                                                                // handleDownload(
                                                                //     "SVG",
                                                                //     whichTypeGraph == 0
                                                                //     ? countryBarRef
                                                                //     : countryPieRef
                                                                // )
                                                                // }
                                                                >
                                                                    Download SVG
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="question-preview-chart">
                                                        <img src={path_image + "dummy-pie.png"} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                            </div>
                        </Row>
                        : !apiStatus ? <div className="no_found"><p>No Data Found</p></div> : ""}
                </div >
            </Col >
        </>
    )
}
export default SurveyAnalyticsDetail
