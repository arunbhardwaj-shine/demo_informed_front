import React, { useRef } from 'react'
import { Dropdown, ProgressBar } from 'react-bootstrap'
import html2canvas from 'html2canvas';
import { loader } from '../../loader';
// import {jsPDF} from 'jspdf'

const SurveyAnalyticsRatingView = ({ index, item, colors }) => {
    let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;

    const progressBarRef = useRef(null)
    const DownloadDropdown = ({
        title,
        index,
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
                                handleDownload(format, progressBarRef, title, index)
                            }
                        >
                            Download {format}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    };


    const handleDownload = async (format, ref, defaultName = "survey_question", index, isHtml = true) => {
        try {
            loader("show")
            const dropdownId = document.getElementById(`dropdown-${index}`)
            if (dropdownId) {
                dropdownId.style.display = "none"
            }
            const element = document.getElementById(`survey-question-listing-${index}`)

            if (!element) return;
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
            dropdownId.style.display = "block"
            loader("hide")
        } catch (err) {
            loader("hide")
            console.log("--err", err)
        }
    };

    return (<>
        <div key={index} className="survey-question-listing" id={`survey-question-listing-${index}`}>
            <div className="survey-question-top d-flex align-items-center">
                <div className="survey-question-num">
                    <div className="question-type">
                        <img src={path_image + "star-rating.png"} alt="" title={item?.type} />
                    </div>
                    <div className="question-number">
                        <h4>Q{index + 1}</h4>
                    </div>
                </div>
                <div className="question-view d-flex">
                    <p dangerouslySetInnerHTML={{ __html: item?.question }}></p>
                    <span>{`${item?.mandatory_label==1? " (Optional)":""}`}</span>
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
                        <span>{item?.notAnswered}</span>
                    </div>
                </div>
                <div id={`dropdown-${index}`}>
                    <DownloadDropdown
                        title={item?.type}
                        index={index}
                        handleDownload={handleDownload}
                    />
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
                        {item?.answer?.map((data, index) => (
                            <div key={index} className="answer">
                                <div className="choices">
                                    <span className="bullet-color" style={{ background: colors[index] }}>&nbsp;</span>

                                    <div className='d-flex align-items-center'>
                                        {item?.extra?.ratingType == "stars"
                                            ? <img src={`${path_image}star-rating-${JSON.parse(data?.value)}.svg`} alt="" />
                                            : [...Array(parseInt(data?.value))].map((_, i) => {
                                                // return ` ${i + 1}`
                                                return (<>
                                                <div className='number_rating'>{i+1}</div>
                                                </>) 
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="respondents">
                                    <span>{data?.count}</span>
                                    <span className="respondents-percent">(<span>{data?.percentage ? data?.percentage : "00"}%</span>)</span>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className="question-preview-right">
                    <div className="rd-training-block-right d-flex justify-content-end align-items-center">
                        {/* <DownloadDropdown 
                        title={item?.type}
                        handleDownload={handleDownload}
                        /> */}

                    </div>
                    <div
                        className="question-preview-chart d-flex justify-content-center align-items-center"
                    // ref={progressBarRef}
                    >
                        <div className={`question-preview-chart-details ${item?.extra?.ratingType == "stars"?"stars":"numeric"}`}>
                            {item?.answer?.map((data, index) => (
                                <div key={index} className="survey-rating-detail" style={{ display: "flex", width: "275px" }}>
                                    <h5>
                                        <span>{data?.value}{" "}</span>
                                        {/* {item.type === "rating" && ( */}
                                         {item?.extra?.ratingType == "stars"?
                                        <svg
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_5227_4752)">
                                                <path
                                                    d="M7.4636 0.873843C7.6629 0.375386 8.3371 0.375386 8.5364 0.873843L10.3356 5.37373C10.4195 5.58343 10.6078 5.72677 10.8241 5.7455L15.4656 6.14744C15.9797 6.19196 16.188 6.86363 15.7971 7.21621L12.2676 10.3992C12.1031 10.5476 12.0312 10.7795 12.081 11.0008L13.1504 15.7491C13.2688 16.275 12.7234 16.6902 12.2825 16.4096L8.3019 13.8769C8.1164 13.7589 7.8836 13.7589 7.6981 13.8769L3.71755 16.4096C3.27661 16.6902 2.73118 16.275 2.84964 15.7491L3.91901 11.0008C3.96884 10.7795 3.8969 10.5476 3.73243 10.3992L0.202937 7.21621C-0.188028 6.86363 0.0203079 6.19196 0.534448 6.14744L5.17591 5.7455C5.39221 5.72677 5.58055 5.58343 5.66439 5.37373L7.4636 0.873843Z"
                                                    fill="#97B6CF"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_5227_4752">
                                                    <rect
                                                        width="16"
                                                        height="16"
                                                        fill="white"
                                                        transform="translate(0 0.5)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        :""}
                                        {/* )} */}
                                        {" "}
                                    </h5>
                                    <ProgressBar style={{ flex: 1, margin: "10px 10px", width: "235px" }}>
                                        <ProgressBar
                                            now={data.percentage}
                                            style={{
                                                backgroundColor: colors[index],
                                            }}
                                        />
                                    </ProgressBar>
                                    <h5 className="survey-rating-number">
                                        {data?.count}
                                    </h5>
                                </div>
                            )
                            )}
                        </div>

                        <div className='question-preview-chart-result'>
                            <span>{item?.overallRating?.toFixed(1)}</span>
                            { item?.extra?.ratingType == "stars"?
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_5227_4798)">
                                    <path d="M11.1954 0.560765C11.4944 -0.186922 12.5056 -0.186922 12.8046 0.560765L15.5034 7.31059C15.6292 7.62514 15.9117 7.84016 16.2361 7.86825L23.1983 8.47116C23.9695 8.53794 24.282 9.54544 23.6956 10.0743L18.4014 14.8489C18.1546 15.0713 18.0467 15.4192 18.1215 15.7512L19.7255 22.8736C19.9032 23.6626 19.0851 24.2852 18.4237 23.8644L12.4529 20.0654C12.1746 19.8884 11.8254 19.8884 11.5472 20.0654L5.57632 23.8644C4.91492 24.2852 4.09678 23.6626 4.27446 22.8736L5.87852 15.7512C5.95327 15.4192 5.84536 15.0713 5.59864 14.8489L0.304406 10.0743C-0.282043 9.54544 0.0304618 8.53794 0.801672 8.47116L7.76386 7.86825C8.08831 7.84016 8.37082 7.62514 8.49659 7.31059L11.1954 0.560765Z" fill="#004A89" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5227_4798">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg> 
                            :""}
                            
                            <span className='divide-line'>|</span> <b>{item?.total_count}</b> ratings
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)

}
export default SurveyAnalyticsRatingView