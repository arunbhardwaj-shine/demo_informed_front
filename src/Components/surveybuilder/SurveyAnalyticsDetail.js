import React, { useEffect, useState, useRef } from "react";
import {
    Accordion,
    Button,
    Col,
    Dropdown,
    Row,
    Table,
    
} from "react-bootstrap";
import { useLocation,Link } from "react-router-dom";
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
import CommonSurveyStarRating from "./CommonSurveyStarRating";
import html2canvas from 'html2canvas';
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
    const [sectionApiStatus, setSectionApiStatus] = useState(false)
    const [flag, setFlag] = useState({ survey_taker: false })
    const [sortBy, setSortBy] = useState(''); // Initial sort key
    const [sortOrder, setSortOrder] = useState('');
    const [surveyTakerTableData, setSurveyTakerTableData] = useState([])
    const [surveyTakerTableDataBackup, setSurveyTakerTableDataBackup] = useState([])
    const [surveyTakerShowQuestions, setSurveyTakerShowQuestions] = useState()
    const [surveyTakerShowQuestionFold, setSurveyTakerQuestionFold] = useState(false)
    const [surveyTakerShowQuestionsData, setSurveyTakerShowQuestionsData] = useState([])
    const [tempQuestionData, setTempQuestionData] = useState([])
    const buttonRef = useRef(null);
    const filterRef = useRef(null);
    const survey_taker = useRef(null)
    const countryBarRef = useRef(null);
    const countryPieRef = useRef(null);
    const [completedCountryData, setCompletedCountryData] = useState([])
    const [whichTypeGraph, setWhichTypeGraph] = useState()
    const [sectionLoader, setSectionLoader] = useState(false);
    const [loaderIndex, setLoaderIndex] = useState()
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
    const [options, setOptions] = useState({
        chart: {
            type: "bar",
            height: 238,
        },
        title: {
            text: "",
        },
        xAxis: {
            categories: [],
            labels: {
                enabled: false,
                color: "#0442A2"
            },
        },
        yAxis: {
            title: {
                text: null // No title for the Y-axis
            },
            labels: {
                enabled: true, // Disable Y-axis labels
                color: "#0442A2"
            },
            gridLineWidth: 1, // Remove grid lines (optional)
        },
        legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
            x: 0,
            y: 0,
            color: "#0442A2"
        },
        exporting: {
            enabled: false,
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
                pointWidth: 15,
                dataLabels: {
                    enabled: true,
                    format: "{point.y}",
                },
            },
        },
        series: [],
    });

    const [lineChartOptions, setLineChartOptions] = useState({

        chart: {
            type: "line",
            height: 221,
            // width:501
        },
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        exporting: {
            enabled: false,
        },
        xAxis: {
            categories:[]
            // categories: [
            //     "Oct 1",
            //     "Oct 5",
            //     "Oct 8",
            //     "Oct 10",
            //     "Oct 12",
            //     "Oct 15",
            // ],
            // min: 0 ,// Start xAxis from 0
            // labels: {
            //     formatter: function () {
            //         // Custom label formatter to simulate categories (e.g., Oct 1, Oct 5, Oct 8)
            //         // const dates = ['Oct 1', 'Oct 5', 'Oct 8','Oct 10','Oct 12','Oct 15'];
            //         // return dates[this.value];
            //         return this.value
            //     }
            // }
            // "labels": {
            //     // Add your labels here if needed, this can be dynamic
            // }
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                // color: '#808080'
            }],
            // min: 0 // Start xAxis from 0
        },
        plotOptions: {
            series: {
                cursor: 'pointer',
                className: 'popup-on-click',
                marker: {
                    lineWidth: 2
                }
            }
        },
      

    tooltip: {
        "useHTML": true, // Enable HTML rendering
        "formatter": function() {
            return '<div style="display: flex; align-items: center;">' +
                '<span>' + this.y +  '</span>' +
                '<img src="' + path_image + 'user-blue.png" alt="" style="width:16px;height:16px;vertical-align:middle;margin-left:4px;"/>'
                 +' | '+ '<span>' +this.x + '<span>' +
                '</div>';
        }
    },
    
        legend: {
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
            symbolHeight: 10,   // Height of the round symbol in the legend
            symbolWidth: 10,    // Width of the round symbol in the legend
            symbolRadius: 5
        },
        // series: [
        //     {
        //         "name": "web",
        //         // "data": [[0,1],[1,1],[2,3],[3,8],[4,5],[5,7]],
        //         "data": [1,1,3,8,5],
        //         marker: {
        //             symbol: 'circle', // round shape
        //             radius: 5,        // point size
        //             lineWidth: 2,     // white circle border width
        //             lineColor: '#FFFFFF' // white border color
        //         },
        //         "color":colors[4]
        //     },
        //     {
        //         "name": "QR",
        //         // "data": [[0,0],[1,1],[2,1],[3,5],[4,4],[5,9]],
        //         "data":[0,1,1,5,4,9],
        //         marker: {
        //             symbol: 'circle', // round shape
        //             radius: 5,        // point size
        //             lineWidth: 2,     // white circle border width
        //             lineColor: '#FFFFFF' // white border color
        //         },
        //         color:colors[1]
        //     }
        // ]
        series: []
    });


    useEffect(() => {
        getSurveyDetail()
    }, [])

    const getSurveyDetail = async () => {
        try {
            loader("show")
            setApiStatus(true)
            const res = await surveyAxiosInstance.post("/survey/qns-analytics", {
                survey_id: stateData?.survey_id

            });
            let data = res?.data?.data
            let valueupdate = { ...options };
            let categories = []
            let barSeries = []
            if (data != "undefined" && data?.surveyTakerStatus?.length > 0) {

                data?.surveyTakerStatus?.forEach((item, index) => {
                    categories.push(item?.key)
                    barSeries.push({
                        name: item?.key,
                        data: [{ y: item?.value }],
                        color: item?.key == "Opened" ? colors[4] : item?.key == "Completed" ? colors[0] : colors[1],
                    })
                })

            }
            valueupdate.xAxis.categories = categories
            valueupdate.series = barSeries

            setOptions(valueupdate)
            setData(data)
            await getLineChartDetails()
            await getTempQuestionData()
        } catch (err) {
            console.log("--err", err)
        } finally {
            setApiStatus(false)
            loader("hide")
        }
    }

    const getLineChartDetails = async () => {
        try {
            const res = await surveyAxiosInstance.post("/survey/survey-takers-over-time", {
                survey_id: stateData?.survey_id
            });
            console.log("res--->", res);
            const data = res?.data?.data
            const xAxisCategories = data?.categories
            const seriesData = data?.series?.map((series,index) => ({
                name: series?.name,
                data: series?.data?.map((data) => data),
                // data:[0,2],
                color:series?.color,
                marker: {
                    symbol: 'circle',
                    radius: 5,
                    lineWidth: 2,
                    lineColor: "#FFFFFF"
                }
            }))
            setLineChartOptions((prevOptions) => ({
                ...prevOptions,
                xAxis: {
                    ...prevOptions.xAxis,
                    // labels: {
                    //     formatter: function () {
                    //         return xAxisCategories[this.value]; // Dynamic x-axis labels
                    //     }
                    // }
                    categories:xAxisCategories
                },
                series: seriesData
            }))


        } catch (err) {
            console.log("--err", err);

        }
    }

    const getTempQuestionData = async () => {
        try {
            const res = await surveyAxiosInstance.post("/survey/analytic-qns-detail", {
                survey_id: stateData?.survey_id

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
        setSurveyTakerQuestionFold(false)
        setSurveyTakerShowQuestionsData([])
        setShowFilter(false);
    };

    const applyFilter = () => {
        setFilterApplyflag(1);
        setSurveyTakerTableData([]);
        setSurveyTakerQuestionFold(false)
        setSurveyTakerShowQuestionsData([])
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
                });

                setSurveyTakerTableData(res?.data?.data)
                setSurveyTakerTableDataBackup(res?.data?.data)

                let countries = []
                let newObj = {}
                res?.data?.data.forEach((item) => {
                    if (!countries?.includes(item?.country)) {
                        countries.push(item?.country)
                    }
                    if (item?.status == "completed") {
                        if (!newObj[item?.country]) {
                            newObj[item?.country] = 1
                        } else {
                            newObj[item?.country] = newObj[item?.country] + 1
                        }
                    }
                })
                let data = []
                for (const country in newObj) {
                    data.push({ value: country, count: newObj[country] });
                }
                setWhichTypeGraph("pie")
                setCompletedCountryData(data)
                setFilterData((prev) => ({ ...prev, country: countries }))
                
                setTimeout(() => {
                    survey_taker?.current?.focus()
                }, 500);
                
            } else {
                setTimeout(() => {
                    survey_taker?.current?.focus()
                }, 500);
               
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

    const surveyTakerShowData = async (e, index, userId, temp_token) => {
        try {
            let id = userId != 0 ? userId : temp_token
            setShowFilter(false)
            if (surveyTakerShowQuestions == id) {
                setSurveyTakerQuestionFold(!surveyTakerShowQuestionFold)
                return
            } else {
                setSurveyTakerQuestionFold(true)
                setSurveyTakerShowQuestions(id)
                setSectionApiStatus(true)
                setLoaderIndex(id)
                const res = await surveyAxiosInstance.post("/survey/takers-responses-detail", {
                    user_id: id,
                    survey_id: stateData?.survey_id

                })
                setSurveyTakerShowQuestionsData(res?.data?.data)
            }

        } catch (err) {
            console.log("--err", err);
        } finally {
            setSectionApiStatus(false)
        }    }

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

    const changeGraphType = (e) => {
        setSectionLoader(true)
        let type = e?.target?.checked ? "bar" : "pie"
        setTimeout(() => {
            setWhichTypeGraph(type)
            setSectionLoader(false)
        }, 500);
    }

    const image = (type) => {
        const imgArr = {
            "multiple": "multiple-choices.png",
            "dropdown": "dropdown-choice.png",
            "rating": "star-rating.png",
            "matrix": "matrix.png",
            "freeText": "free-text.png",
        }

        return imgArr?.[type] || "multiple-choices.png";
    }

    const DownloadDropdown = ({
        graphRef,
        whichTypeGraph,
        title,
        handleDownload
    }) => {
        // const formats = ["PNG", "JPEG", "PDF", "SVG"];
        const formats = ["PNG", "JPEG", "SVG"];
        return (
            <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="24"
                        viewBox="0 0 6 24"
                        fill="none"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM6 12C6 13.6569 4.65685 15 3 15C1.34315 15 0 13.6569 0 12C0 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12ZM3 24C4.65685 24 6 22.6569 6 21C6 19.3431 4.65685 18 3 18C1.34315 18 0 19.3431 0 21C0 22.6569 1.34315 24 3 24Z"
                            fill="#0066BE"
                        />
                    </svg>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {formats.map((format) => (
                        <Dropdown.Item
                            key={format}
                            onClick={() =>
                                handleDownload(format, title)
                            }
                        >
                            Download {format}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    const handleDownload = async (format, defaultName = "survey_question") => {
        try {
            loader("show")
            const dropdownId = document.getElementById("dropdown-completed-country")
            if (dropdownId) {
                dropdownId.style.display = "none"
            }
            const element = document.getElementById("survey-question-listing country-by")
            if (!element) {
                loader("hide")
                return;
            }
            const canvas = await html2canvas(element);
            if (format.toLowerCase() === 'svg') {
                // For SVG format

                const imgData = canvas.toDataURL("image/png");

                // Create the SVG string
                const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
                    <image href="${imgData}" width="${canvas.width}" height="${canvas.height}" />
                </svg>`;

                // Create a Blob from the SVG content
                const svgBlob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
                const svgURL = URL.createObjectURL(svgBlob);

                // Create a link to download the SVG
                const link = document.createElement("a");
                link.href = svgURL;
                link.download = `${defaultName}.svg`;
                link.click();
                URL.revokeObjectURL(svgURL); // Clean up the URL object

            } else {
                // For PNG and JPEG (the original code you already have)

                const dataURL = canvas.toDataURL(`image/${format.toLowerCase()}`);

                // Create a link to download the image
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = `${defaultName}.${format.toLowerCase()}`;
                link.click();
            }
            dropdownId.style.display = "block"
            loader("hide")
        } catch (err) {
            loader("hide")
            console.log("--err", err)
        }
    };
    return (
        <>
            <Col className="right-sidebar custom-change">
                <div className="custom-container">
                    {Object?.keys(data)?.length ?
                        <Row>
                            <div className="top-header analytics_header sticky align-items-center">
                            {/* <div className="page-title d-flex flex-column align-items-start"> */}
                                <div className="page-title d-flex  align-items-center">
                                
                                     <Link
                                        className="btn btn-primary btn-bordered back-btn"
                                        to="/survey/survey-analytics"
                                    >
                                        <svg
                                            width="14"
                                            height="24"
                                            viewBox="0 0 14 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0.159662 12.0019C0.159662 11.5718 0.323895 11.1417 0.65167 10.8138L10.9712 0.494292C11.6277 -0.16216 12.692 -0.16216 13.3482 0.494292C14.0044 1.15048 14.0044 2.21459 13.3482 2.8711L4.21687 12.0019L13.3479 21.1327C14.0041 21.7892 14.0041 22.8532 13.3479 23.5093C12.6917 24.1661 11.6274 24.1661 10.9709 23.5093L0.65135 13.19C0.323523 12.8619 0.159662 12.4319 0.159662 12.0019Z"
                                                fill="#97B6CF"
                                            />
                                        </svg>
                                    </Link> 
                                    <div className="flex-column">
                                    <h2>{stateData?.Title} </h2>
                                    <p>{moment(stateData?.CreatedDate).format("MMM. DD. YYYY")}</p>
                                    </div>
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
                                                        <h2>{data?.surveyTakerStatus?.[1]?.value ? data?.surveyTakerStatus?.[1]?.value : 0}</h2>
                                                        <div className="completed-survey">
                                                            <p>
                                                                <img src={path_image + "user-gray.svg"} alt="" />Completed the survey
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="survey-takers col">
                                                    <p>Survey Takers over time | Delivery channels</p>
                                                    {/* <img src={path_image + "survey-takers.png"} alt="" /> */}
                                                    {console.log("options--->", lineChartOptions)
                                                    }
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={lineChartOptions}
                                                    />
                                                </div>
                                                <div className="survey-takers-status col">
                                                    <p>Survey Takers status</p>
                                                    {/* <img src={path_image + "survey-takers-status.png"} alt="" /> */}

                                                    {options?.series?.length > 0 ? (<>
                                                        <HighchartsReact
                                                            highcharts={Highcharts}
                                                            options={options}
                                                        /></>)
                                                        : ""}
                                                    {data?.surveyTakerStatus?.some((item) => item?.value != 0) ?
                                                        <div className="rd-box-export">
                                                            <img src={path_image + "arrow-export.svg"}
                                                                alt=""
                                                                onClick={() => {
                                                                    surveyTakerfn();
                                                                }}
                                                            />
                                                        </div>
                                                        : null}
                                                </div>
                                                <div className="survey-full-info col d-flex flex-column">
                                                    <div className="survey-info takers">
                                                        <div>
                                                            <img src={path_image + "user-blue.png"} alt="" />
                                                            {data?.surveyTakerDetails?.[0]?.key}
                                                        </div>
                                                        <div className="survey-value">
                                                            {data?.surveyTakerDetails?.[0]?.value}
                                                        </div>
                                                    </div>
                                                    <div className="survey-info avg">
                                                        <div>
                                                            <img src={path_image + "timer.png"} alt="" />
                                                            {data?.surveyTakerDetails?.[1]?.key}
                                                        </div>
                                                        <div className="survey-value">
                                                            {data?.surveyTakerDetails?.[1]?.value} <small>min</small>
                                                        </div>
                                                    </div>

                                                    <div className="survey-info question">
                                                        <div>
                                                            <img src={path_image + "question.png"} alt="" />
                                                            {data?.surveyTakerDetails?.[2]?.key}
                                                        </div>
                                                        <div className="survey-value">
                                                            {data?.surveyTakerDetails?.[2]?.value}
                                                        </div>
                                                    </div>
                                                    <div className="survey-info no-answer">
                                                        <div>
                                                            <img src={path_image + "question-not.png"} alt="" />
                                                            {data?.surveyTakerDetails?.[3]?.key}
                                                        </div>
                                                        <div className="survey-value">
                                                            {data?.surveyTakerDetails?.[3]?.value}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {tempQuestionData?.map((item, index) => {
                                            if (item?.type === "multiple" || item?.type === "dropdown" || item?.type === "checkbox" || item?.type == "matrix") {

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
                
                                                let totalWeightedValue = 0
                                                let totalRatings = 0
                                                for (let i = 5; i >= 1; i--) {
                                                    let existingItem = item.answer.find(obj => obj.value === i.toString());
                                                    if (!existingItem) {
                                                        item.answer.push({
                                                            "answerId": null,
                                                            "value": i.toString(),
                                                            "count": 0
                                                        });
                                                    }
                                                }
                                                item.answer.forEach(obj => {
                                                    // Avoid division by zero
                                                    obj.percentage = (item?.total_count > 0 && obj?.count > 0) ? (((obj.count / item.total_count).toFixed(2)) * 100) : "00";
                                                    totalWeightedValue += parseInt(obj.value) * obj.count;
                                                    totalRatings += obj.count > 0 ? 1 : 0
                                                });
                                                item.totalRatings = totalRatings
                                                let overallRating = item.total_count > 0 ? totalWeightedValue / item.total_count : 0;
                                                item.overallRating = overallRating
                                                item?.answer?.sort((a, b) => parseInt(b.value) - parseInt(a.value))

                                                return (
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
                                                                                        <Accordion.Item key={index}
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
                                                        </div>
                                                        <div className="clear-search d-flex align-items-center">
                                                            <button className="btn print" onClick={() => downloadExcelUsers(surveyTakerTableData, "survey_taker")}>
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z" fill="#0066BE"></path><path d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z" fill="#0066BE"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="survey_data_details">
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
                                                                                        <div key={index} className="filter-div">
                                                                                            <div className="filter-div-title">
                                                                                                <span>{key == "training_status_code" ? "Status" : key == "user_type" ? "Role" : key == "site_number" ? "Site" : key} |</span>
                                                                                            </div>

                                                                                            <div className="filter-div-list">
                                                                                                {filterObject[key]?.map((item, index) => (
                                                                                                    <div key={index}
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
                                                                            </button>
                                                                        </span>
                                                                    </th>
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
                                                                            </button>
                                                                        </span>
                                                                    </th>
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
                                                                            </button>
                                                                        </span>
                                                                    </th>
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
                                                                            </button>
                                                                        </span>
                                                                    </th>

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
                                                                            </button>
                                                                        </span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {typeof surveyTakerTableData != "undefined" && surveyTakerTableData?.length > 0
                                                                    ?
                                                                    sortData(surveyTakerTableData, sortBy, sortOrder)?.map((item, index) => {
                                                                        return (<>
                                                                            <tr key={index}
                                                                                className={`view ${((surveyTakerShowQuestions == item?.user_id
                                                                                    || surveyTakerShowQuestions == item?.temp_token) && surveyTakerShowQuestionFold)
                                                                                    ? "show"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={(e) =>
                                                                                    surveyTakerShowData(e, index, item?.user_id, item?.temp_token)
                                                                                } >
                                                                                <td>{item?.name}</td>
                                                                                <td>{item?.email}</td>
                                                                                <td>{item?.region}</td>
                                                                                <td>{item?.country}</td>
                                                                                <td>{moment(item?.date).format("DD MMM. YYYY")}</td>
                                                                                <td className={item?.status}>{item?.status}</td>
                                                                            </tr>
                                                                            {((surveyTakerShowQuestions == item?.user_id ||
                                                                                surveyTakerShowQuestions == item?.temp_token)
                                                                                && surveyTakerShowQuestionFold
                                                                            )
                                                                                ?
                                                                                (<>
                                                                                    <tr className="fold" >
                                                                                        <td colSpan="6">
                                                                                            {(sectionApiStatus && (loaderIndex == item?.user_id ||
                                                                                                loaderIndex == item?.temp_token))
                                                                                                ?
                                                                                                <div
                                                                                                    className="load_more"
                                                                                                    style={{
                                                                                                        margin: "10 auto",
                                                                                                        justifyContent: "center",
                                                                                                        display: "flex",
                                                                                                        height: 225
                                                                                                    }}
                                                                                                >
                                                                                                    <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                                                                                                </div>
                                                                                                :
                                                                                                surveyTakerShowQuestionsData?.length ? surveyTakerShowQuestionsData?.map((data, index) => {
                                                                                                    return (<>
                                                                                                        <div key={index} className="survey-data">
                                                                                                            <div className="question-type">
                                                                                                                <img src={path_image + image(data?.type)} alt="" title={item?.type} />
                                                                                                            </div>
                                                                                                            <div className="survey-matrix">
                                                                                                                <h6 dangerouslySetInnerHTML={{ __html: `Q${index + 1} ${data?.question_text}` }}></h6>
                                                                                                                {data?.type == "rating" ?
                                                                                                                    <CommonSurveyStarRating data={data?.comment} type={data?.extra} />
                                                                                                                    :
                                                                                                                    data?.question_detail?.length > 0
                                                                                                                        ?
                                                                                                                        data?.type == "matrix" ?
                                                                                                                            <Table>
                                                                                                                                <tbody>
                                                                                                                                    {data?.question_detail?.map((ans, i) => {
                                                                                                                                        return (<>
                                                                                                                                            <tr>
                                                                                                                                                <td className="heading"><p dangerouslySetInnerHTML={{ __html: `${ans?.question_text}` }}></p></td>
                                                                                                                                                {ans?.option_text?.length > 0
                                                                                                                                                    ?
                                                                                                                                                    ans?.option_text?.map((option) => (<td><p>{option}</p></td>)) : ""}

                                                                                                                                            </tr>
                                                                                                                                        </>)

                                                                                                                                    })}
                                                                                                                                </tbody>
                                                                                                                            </Table>
                                                                                                                            :
                                                                                                                            data?.question_detail?.map((ans, i) => {
                                                                                                                                return (<>
                                                                                                                                    <p>
                                                                                                                                        {ans?.option_text ? ans?.option_text : "N/A"}
                                                                                                                                    </p>
                                                                                                                                </>)
                                                                                                                            })
                                                                                                                        :
                                                                                                                        <p>{data?.comment ? data?.comment : "N/A"}</p>
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </>)
                                                                                                })
                                                                                                    :
                                                                                                    <div className="no_found"><p>No Data Found</p>
                                                                                                    </div>
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                </>)
                                                                                :
                                                                                null
                                                                            }

                                                                            <tr className="blank">
                                                                                <td colSpan="6" style={{ height: "10px" }}>
                                                                                    &nbsp;
                                                                                </td>
                                                                            </tr>
                                                                        </>)
                                                                    }) : !apiStatus ? <tr><td colSpan={6}> <div className="no_found"><p>No Data Found</p></div></td></tr>
                                                                        : null
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="survey-question-listing country-by" id="survey-question-listing country-by">
                                                <div className="survey-question-top d-flex align-items-center justify-content-between">
                                                    <div className="page-title">
                                                        <h4>Survey Takers (Completed) According to country</h4>
                                                    </div>
                                                    <div className="d-flex align-items-center survey-result-graph">
                                                        <div className="question-status">
                                                            <div className="total-answered">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                                    <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89" />
                                                                </svg>
                                                                <span>{completedCountryData?.length > 0 ? completedCountryData?.reduce((acc, item) => acc + item?.count, 0) : 0}</span>

                                                            </div>

                                                        </div>
                                                        <div id="dropdown-completed-country">

                                                            <DownloadDropdown
                                                                graphRef={[countryBarRef, countryPieRef]}
                                                                whichTypeGraph={whichTypeGraph == "bar" ? 0 : 1}
                                                                title="Survey Takers (Completed) According to country"
                                                                handleDownload={handleDownload}
                                                            />
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
                                                                        checked={whichTypeGraph == "bar" ? true : false}
                                                                        onChange={(e) => {
                                                                            changeGraphType(e)
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
                                                        <div className="question-preview-chart">
                                                            {/* <img src={path_image + "dummy-pie.png"} alt="" /> */}
                                                            {sectionLoader ?
                                                                <div
                                                                    className="load_more"
                                                                    style={{
                                                                        margin: "10 auto",
                                                                        justifyContent: "center",
                                                                        display: "flex",
                                                                        height: 386
                                                                    }}
                                                                >
                                                                    <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                                                                </div> :

                                                                whichTypeGraph == "pie" ?
                                                                    <SurveyAnalyticsQuestionPieChart
                                                                        key="pie"
                                                                        data={{
                                                                            // questionId: index,
                                                                            graphType: "pie",
                                                                            ans: completedCountryData,
                                                                        }}
                                                                        colors={colors}
                                                                        // type="analytics"
                                                                        chartRef="survey_completed_country_pie"


                                                                    /> :
                                                                    <SurveyAnalyticsQuestionPieChart
                                                                        key="bar"
                                                                        data={{
                                                                            graphType: "bar",
                                                                            ans: completedCountryData,
                                                                        }}
                                                                        colors={colors}
                                                                        // type="analytics"
                                                                        chartRef="survey_completed_country_bar"
                                                                    />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)
                                            : null}

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
