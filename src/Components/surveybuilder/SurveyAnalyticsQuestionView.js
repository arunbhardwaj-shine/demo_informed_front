import React, { useState, memo, useRef } from "react";
import { Spinner } from "react-activity";
import { Dropdown } from "react-bootstrap";
import SurveyAnalyticsQuestionPieChart from "./SurveyAnalyticsQuestionPieChart";
import html2canvas from "html2canvas";

const SurveyAnalyticsQuestionView = memo(({ index, item, colors, type }) => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
    const [whichTypeGraph, setWhichTypeGraph] = useState({ [index]: "pie" })
    const [whichTypeMatrixGraph, setWhichTypeMatrixGraph] = useState({})
    const [apiStatus, setApiStatus] = useState(false)
    const [loaderIndex, setLoaderIndex] = useState()
    const [sectionLoader, setSectionLoader] = useState(false);
    const [show, setShow] = useState(false);
    const [hasCount, setHasCount] = useState(false)
    const countryBarRef = useRef(null);
    const countryPieRef = useRef(null);
    const [displayAvg,setDisplayAvg]=useState({})

    useState(() => {
        if (item?.type == "matrix") {
            let matrixType = { ...whichTypeMatrixGraph }
            item?.answer?.map((data) => {
                matrixType[data?.id] = "pie"
            })
            setWhichTypeMatrixGraph((prev) => ({ ...prev, ...matrixType }))
        }
        else {
            setHasCount(() => item?.answer?.some((data) => data?.count))
        }
    }, [])
    const changeGraphType = (e, index) => {
        setApiStatus(true)
        setLoaderIndex(index)
        setSectionLoader(true)

        let type = { ...whichTypeGraph }
        type[index] = e?.target?.checked ? "bar" : "pie"

        setTimeout(() => {
            setWhichTypeGraph(type)
            setApiStatus(false)
            setSectionLoader(false)
        }, 500);
    }

    const changeGraphMatrixType = (e, id) => {
        setApiStatus(true)
        setLoaderIndex(id)
        setSectionLoader(true)

        let type = { ...whichTypeMatrixGraph }
        type[id] = e?.target?.checked ? "bar" : "pie"

        setTimeout(() => {
            setWhichTypeMatrixGraph(type)
            setApiStatus(false)
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
        index,
        handleDownload
    }) => {
        // const formats = ["PNG", "JPEG", "PDF", "SVG"];
        const formats = ["PNG", "JPEG", "SVG"];
        console.log("which graph-->", whichTypeGraph, " graph ref-->", graphRef[whichTypeGraph])
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
                                handleDownload(format, graphRef[whichTypeGraph], title, index)
                            }
                        >
                            Download {format}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    // const handleDownload = (
    //     format,
    //     ref,
    //     defaultName = "survey_question"
    // ) => {
    //     let chart = ref.current && ref.current.chart;
    //     if (chart) {
    //         switch (format) {
    //             case "PNG":
    //                 chart.exportChart({
    //                     type: "image/png",
    //                     filename: defaultName,
    //                 });
    //                 break;
    //             case "JPEG":
    //                 chart.exportChart({
    //                     type: "image/jpeg",
    //                     filename: defaultName,
    //                 });
    //                 break;
    //             case "PDF":
    //                 chart.exportChart({
    //                     type: "application/pdf",
    //                     filename: defaultName,
    //                 });
    //                 break;
    //             case "SVG":
    //                 chart.exportChart({
    //                     type: "image/svg+xml",
    //                     filename: defaultName,
    //                 });
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // };

    const handleDownload = async (format, ref, defaultName = "survey_question", index, isHtml = true) => {
        if (isHtml) {
            const element = document.getElementById(`survey-question-listing-${index}`)

            if (!element) return;
            console.log("element-->", element)
            if (format.toLowerCase() === 'svg') {
                // For SVG format
                const canvas = await html2canvas(element);
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
                const canvas = await html2canvas(element);
                const dataURL = canvas.toDataURL(`image/${format.toLowerCase()}`);

                // Create a link to download the image
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = `${defaultName}.${format.toLowerCase()}`;
                link.click();
            }
        }
    };

    const DisplayAvg=(index)=>{
        // let avg={...displayAvg}
        // avg[index]=true
        setDisplayAvg((prev)=>({...prev,[index]:!displayAvg[index]}))

    }
    return (<>
        <div key={index} className="survey-question-listing" id={`survey-question-listing-${index}`}>
            <div className="survey-question-top d-flex align-items-center">
                <div className="survey-question-num">
                    <div className="question-type">
                        <img src={path_image + image(item?.type)} alt="" />
                    </div>
                    <div className="question-number">
                        <h4>{`Q${index + 1}`}</h4>
                    </div>
                </div>
                <div className="question-view">
                    <p
                        dangerouslySetInnerHTML={{
                            __html: item?.question,
                        }}
                    />
                </div>
                <div className="question-status">
                    <div className="total-answered">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8.29511 6.80015C10.1732 6.80015 11.6953 5.27769 11.6953 3.39993C11.6953 1.52217 10.1729 0 8.29511 0C6.41736 0 4.89432 1.52246 4.89432 3.40022C4.89432 5.27797 6.41736 6.80015 8.29511 6.80015ZM9.73743 7.0319H6.85222C4.45164 7.0319 2.49866 8.98517 2.49866 11.3858V14.9141L2.50763 14.9694L2.75066 15.0455C5.04159 15.7613 7.0319 16 8.67009 16C11.8698 16 13.7244 15.0877 13.8387 15.0296L14.0658 14.9147H14.0901V11.3858C14.091 8.98517 12.138 7.0319 9.73743 7.0319Z" fill="#004A89" />
                        </svg>
                        <span>{item?.total_count}</span>
                    </div>
                    <div className="total-ignored">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M7.73272 13.788C8.08685 13.788 8.42759 13.7618 8.75493 13.7092L11.6037 16L13.3456 14.4885L11.1101 12.7182C11.3761 12.5177 11.6236 12.2906 11.8525 12.0369C12.0186 11.8507 12.172 11.6519 12.3127 11.4404C12.0475 11.4796 11.7761 11.5 11.5 11.5C10.7351 11.5 10.0067 11.3439 9.34492 11.0617C9.22713 11.1562 9.1014 11.2385 8.96774 11.3088C8.61137 11.4992 8.19969 11.5945 7.73272 11.5945C7.26575 11.5945 6.84793 11.4992 6.47926 11.3088C6.11674 11.1183 5.80952 10.8387 5.5576 10.47C5.31183 10.0952 5.12442 9.63748 4.99539 9.09677C4.86636 8.54992 4.80184 7.92319 4.80184 7.21659V6.56221C4.80184 5.84946 4.86636 5.22273 4.99539 4.68203C5.12442 4.14132 5.31183 3.68664 5.5576 3.31797C5.80338 2.94931 6.10753 2.67281 6.47005 2.48848C6.78028 2.32547 7.12877 2.23222 7.5155 2.20871C8.27075 1.41522 9.26058 0.847054 10.3738 0.615407C10.2611 0.556967 10.1457 0.502369 10.0276 0.451613C9.33333 0.150538 8.56221 0 7.71429 0C6.8725 0 6.10138 0.150538 5.40092 0.451613C4.70046 0.752688 4.09831 1.18894 3.59447 1.76037C3.09063 2.3318 2.69739 3.02304 2.41475 3.8341C2.13825 4.63902 2 5.55453 2 6.58065V7.21659C2 8.23656 2.13825 9.15207 2.41475 9.96313C2.69739 10.7742 3.0937 11.4654 3.60369 12.0369C4.11367 12.6022 4.71889 13.0353 5.41935 13.3364C6.11982 13.6375 6.89094 13.788 7.73272 13.788Z" fill="#F58289" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 6C16 8.48528 13.9853 10.5 11.5 10.5C9.01472 10.5 7 8.48528 7 6C7 3.51472 9.01472 1.5 11.5 1.5C13.9853 1.5 16 3.51472 16 6ZM9.53612 3.96408C9.2552 4.23537 9.24738 4.68302 9.51867 4.96394L10.5109 5.99141L9.50008 7.00221C9.22393 7.27835 9.22393 7.72607 9.50008 8.00222C9.77622 8.27836 10.2239 8.27836 10.5001 8.00222L11.4934 7.00887L12.4659 8.01588C12.7372 8.2968 13.1848 8.30462 13.4657 8.03333C13.7467 7.76205 13.7545 7.3144 13.4832 7.03347L12.4936 6.00871L13.5001 5.00218C13.7763 4.72604 13.7763 4.27832 13.5001 4.00217C13.224 3.72602 12.7763 3.72602 12.5001 4.00217L11.511 4.99124L10.536 3.98154C10.2647 3.70061 9.81704 3.6928 9.53612 3.96408Z" fill="#F58289" />
                        </svg>
                        <span>1</span>
                    </div>
                </div>
                <DownloadDropdown
                    graphRef={[countryBarRef, countryPieRef]}
                    // whichTypeGraph={whichTypeMatrixGraph[data?.id] == "bar" ? 0 : 0}
                    whichTypeGraph="0"
                    title={item?.type}
                    index={index}
                    handleDownload={handleDownload}


                />
            </div>
            {item?.type == "matrix" ?
                item?.answer?.map((data, index) => {
                    // matrixTypeGraph(data?.id)
                    // let hasMatrixCount = data?.answers?.some((item) => item?.count)
                    let totalCount = data?.answers?.reduce((sum, item) => sum + (item?.count || 0), 0);
                    // let totalCount=0
                    // data?.answers?.forEach((item, i) => {
                    //     item.percentage = totalCount > 0 ? JSON.parse(((item.count / totalCount).toFixed(2)) * 100) : 0
                    // })

                    return (<>
                        <div key={index} className="question-preview-block matrix"  >
                            <div className="question-preview">
                                <span>{data?.title}</span>
                                <div className="d-flex align-items-center justify-content-between question-preview-options">
                                    <div>
                                        Choices matrix
                                    </div>
                                    <div>
                                        Respondents
                                    </div>
                                </div>
                                <div className="answer-options">
                                    {data?.answers?.map((ans, i) => {

                                        return (<>
                                            <div key={i} className="answer">
                                                <div className="choices">
                                                    <span className="bullet-color" style={{ background: colors[i] }}>&nbsp;</span>
                                                    <div dangerouslySetInnerHTML={{
                                                        __html: ans?.value,
                                                    }}></div>
                                                </div>
                                                <div className="respondents">
                                                    <span>{ans?.count}</span>
                                                    <span className="respondents-percent">(<span>{totalCount > 0 ? JSON.parse(((ans?.count / totalCount).toFixed(2)) * 100) : "00"}%</span>)</span>
                                                </div>
                                            </div>

                                        </>)
                                    })}
                                </div>
                                <div className="avg-view">
                                    <div className="dispaly-avg-view d-flex justify-content-between align-items-center">
                                        <button onClick={() => DisplayAvg(index)}>Display the AVG  <img src={path_image + 'avg-arrow.svg'} /></button>
                                        <div className="result-view">
                                            {totalCount > 0
                                                ? displayAvg[index] ? (totalCount / item?.answer?.length).toFixed(1)
                                                    : null
                                                : 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="question-preview-right">
                                <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                                    <div className="switch6">
                                        <label className="switch6-light">
                                            <input
                                                type="checkbox"
                                                checked={whichTypeMatrixGraph[data?.id] == "bar" ? true : false}
                                                onChange={(e) => {
                                                    changeGraphMatrixType(e, data?.id)
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
                                    {/* <DownloadDropdown
                                        graphRef={[countryBarRef, countryPieRef]}
                                        whichTypeGraph={whichTypeMatrixGraph[data?.id] == "bar" ? 0 : 0}
                                        title={item?.type}
                                        handleDownload={handleDownload}

                                    /> */}
                                </div>
                                {(apiStatus && loaderIndex == data?.id)
                                    ?
                                    <div
                                        className="load_more"
                                        style={{
                                            margin: "10 auto",
                                            justifyContent: "center",
                                            display: "flex",
                                            height: 193
                                        }}
                                    >
                                        <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                                    </div>
                                    :
                                    <div className="pie-chart-outer-layout">

                                        {whichTypeMatrixGraph[data?.id] == "bar"
                                            ?
                                            <SurveyAnalyticsQuestionPieChart
                                                key={data?.id}
                                                data={{
                                                    questionId: data?.id,
                                                    graphType: "bar",
                                                    ans: totalCount > 0 ? data?.answers : [],
                                                }}
                                                colors={colors}
                                                // type="analytics"
                                                show={show}
                                            // chartRef={countryBarRef}
                                            />
                                            : <SurveyAnalyticsQuestionPieChart
                                                key={data?.id}
                                                data={{
                                                    questionId: data?.id,
                                                    graphType: "pie",
                                                    ans: totalCount > 0 ? data?.answers : [],
                                                }}
                                                colors={colors}
                                                // type="analytics"
                                                show={show}
                                            // chartRef={countryPieRef}
                                            />
                                        }
                                    </div>}
                            </div>
                        </div>

                    </>)
                })

                :

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
                            {item?.answer?.map((ans, i) => {

                                return (<>
                                    <div key={i} className="answer">
                                        <div className="choices">
                                            <span className="bullet-color" style={{ background: colors[i] }}>&nbsp;</span>
                                            <div dangerouslySetInnerHTML={{
                                                __html: ans?.value,
                                            }}></div>
                                        </div>
                                        <div className="respondents">
                                            <span>{ans?.count}</span>
                                            <span className="respondents-percent">(<span>{ans?.percentage ? ans?.percentage : "00"}%</span>)</span>
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
                                    {/* <a className="btn"></a> */}
                                </label>
                            </div>
                            {/* <DownloadDropdown
                                graphRef={[countryBarRef, countryPieRef]}
                                whichTypeGraph={whichTypeGraph[index] == "bar" ? 0 : 0}
                                title={item?.type}
                                handleDownload={handleDownload}

                            /> */}
                        </div>
                        {(apiStatus && loaderIndex == index)
                            ?
                            <div
                                className="load_more"
                                style={{
                                    margin: "10 auto",
                                    justifyContent: "center",
                                    display: "flex",
                                    height: 193
                                }}
                            >
                                <Spinner color="#53aff4" size={32} speed={1} animating={true} />
                            </div>
                            :
                            <div className="pie-chart-outer-layout">

                                {
                                    whichTypeGraph[index] == "pie" ?
                                        <SurveyAnalyticsQuestionPieChart
                                            data={{
                                                questionId: index,
                                                graphType: "pie",
                                                ans: hasCount ? item?.answer : [],
                                            }}
                                            colors={colors}
                                            // type="analytics"
                                            show={show}
                                        // chartRef={countryPieRef}
                                        />
                                        : <SurveyAnalyticsQuestionPieChart
                                            data={{
                                                questionId: index,
                                                graphType: "bar",
                                                ans: hasCount ? item?.answer : [],
                                            }}
                                            colors={colors}
                                            // type="analytics"
                                            show={show}
                                        // chartRef={countryBarRef}
                                        />
                                }
                            </div>}
                    </div>
                </div>
            }
        </div>
    </>)
})
export default SurveyAnalyticsQuestionView