import React, { useEffect, useState ,useRef} from 'react'
import { getData } from '../../axios/apiHelper'
import { ENDPOINT } from '../../axios/apiConfig'
import { Accordion, Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { loader } from '../../loader';
const Check8SurveyData = () => {
  const [data, setData] = useState([])
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [apiCallStatus, setApiCallStatus] = useState(false)
  const accordionRefs = useRef([]);
  useEffect(() => {
    getSurveyData()
  }, [])

  const getSurveyData = async () => {
    try {
      loader("show")

      const response = await getData(ENDPOINT.GET_SURVEY_DATA + "?type=1")
      let data = []
      response?.data?.data?.map((item, index) => {
        item.survey_data = JSON.parse(item?.survey_data)
        data?.push(item)
      })
      setData(data)

    } catch (err) {
      console.log("--err", err)
    } finally {
      loader("hide")
      setApiCallStatus(true)
    }
  }

  const handleAccordionOpen=(index)=>{
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  }
  useEffect(() => {
    if (accordionRefs.current[openAccordionIndex]) {
        accordionRefs.current[openAccordionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
}, [openAccordionIndex]);

  const downloadExcelSurveyData = () => {
    try {
      if (data?.length == 0) {
        toast.warning("No data found");
        return;
      }
      let downloadData = data?.map((item, index) => {
        return {
          Name: item?.name ? item.name.trim() : "N/A",
          Email: item?.email ? item.email.trim() : "N/A",
          Country: item?.country ? item.country.trim() : "N/A",
          SurveyDate: item?.created_at ? item.created_at.trim() : "N/A",
          'Location,City': item?.survey_data?.location?.city ? item?.survey_data?.location?.city.trim() : "N/A",
          'Location,State': item?.survey_data?.location?.state ? item?.survey_data?.location?.state.trim() : "N/A",
          // 'Type of Provider': item?.survey_data?.provider ? item?.survey_data?.provider.trim() : "N/A",
          'Type of Provider': item?.survey_data?.provider ? item?.survey_data?.provider?.trim() : "N/A",
          "Location of Practice": item?.survey_data?.practice_location ? item?.survey_data?.practice_location?.trim() : "N/A",
          "1.Rate the different reasons you have used the 8CHECK service,To confirm a diagnosis":
            item?.survey_data?.rate_different_reasons?.to_confirm_diagnosis ?
              item?.survey_data?.rate_different_reasons?.to_confirm_diagnosis : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,To make a diagnosis":
              item?.survey_data?.rate_different_reasons?.to_make_diagnosis ?
                item?.survey_data?.rate_different_reasons?.to_make_diagnosis : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,Patient inhibitor development risk":
            item?.survey_data?.rate_different_reasons?.patient_inhibitor_development_risk ?
              item?.survey_data?.rate_different_reasons?.patient_inhibitor_development_risk : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,Guide treatment choice":
            item?.survey_data?.rate_different_reasons?.guide_treatment_choice ?
              item?.survey_data?.rate_different_reasons?.guide_treatment_choice : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,Genotype not available at my center":
            item?.survey_data?.rate_different_reasons?.genotype_not_available ?
              item?.survey_data?.rate_different_reasons?.genotype_not_available : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,No insurance reimbursement":
            item?.survey_data?.rate_different_reasons?.no_insurance_reimbursement ?
              item?.survey_data?.rate_different_reasons?.no_insurance_reimbursement : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,To inform family members":
              item?.survey_data?.rate_different_reasons?.family_members ?
                item?.survey_data?.rate_different_reasons?.family_members : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,Family/Individual request":
            item?.survey_data?.rate_different_reasons?.family_request ?
              item?.survey_data?.rate_different_reasons?.family_request : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,Pre-conception/Pregnancy planning and support":
              item?.survey_data?.rate_different_reasons?.pre_conception ?
                item?.survey_data?.rate_different_reasons?.pre_conception : "N/A",

          "1.Rate the different reasons you have used the 8CHECK service,Prohibitive out-of-pocket cost":
            item?.survey_data?.rate_different_reasons?.prohibitive ?
              item?.survey_data?.rate_different_reasons?.prohibitive : "N/A",

              "1.Rate the different reasons you have used the 8CHECK service,Others":
            item?.survey_data?.rate_different_reasons?.others ?
              item?.survey_data?.rate_different_reasons?.others?.trim() : "N/A",

          "2.For how many patients in each patient group have used the 8CHECK service,Patients with severe hemophilia A,Who have not received a FVIII infusion":
            item?.survey_data?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion ? item?.survey_data?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion : "N/A",
        
            "2.For how many patients in each patient group have used the 8CHECK service,Patients with severe hemophilia A,Who have received more than 50 infusions FVIII treatment":
            item?.survey_data?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion ? item?.survey_data?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion : "N/A",
          
            "2.For how many patients in each patient group have used the 8CHECK service,Patients with non-severe hemophilia A":
            item?.survey_data?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A ? item?.survey_data?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A : "N/A",
          
            "2.Fpr how many patients in each patient group have used the 8CHECK service,Known, or potential carriers/female with hemophilia A,Symptomatic":
            item?.survey_data?.known_carrier_with_hemophilia_A?.symptomatic?item?.survey_data?.known_carrier_with_hemophilia_A?.symptomatic?.trim():"N/A",

            "2.Fpr how many patients in each patient group have used the 8CHECK service,Known, or potential carriers/female with hemophilia A,Asymptomatic":
            item?.survey_data?.known_carrier_with_hemophilia_A?.asymptomatic?item?.survey_data?.known_carrier_with_hemophilia_A?.asymptomatic?.trim():"N/A",

            "2.For how many patients in each patient group have used the 8CHECK service,Patients with current/past FVIII inhibitors":
            item?.survey_data?.patient_with_FVIII_inhibitors?.FVIII_inhibitors?item?.survey_data?.patient_with_FVIII_inhibitors?.FVIII_inhibitors?.trim():"N/A",
          
          "3. How has receiving the genotype information impacted patient care? Rate the options below,Improved accuracy of diagnosis":
          item?.survey_data?.genotype_information_impacted_rate?.improved_accuracy_diagnosis?item?.survey_data?.genotype_information_impacted_rate?.improved_accuracy_diagnosis?.trim():"N/A",
          
          "3. How has receiving the genotype information impacted patient care? Rate the options below,Guided treatment choice":
          item?.survey_data?.genotype_information_impacted_rate?.guided_treatment_choice?item?.survey_data?.genotype_information_impacted_rate?.guided_treatment_choice?.trim():"N/A",
        
          "3. How has receiving the genotype information impacted patient care? Rate the options below,Changed clinical management of the patient":
          item?.survey_data?.genotype_information_impacted_rate?.changed_clinical_management?item?.survey_data?.genotype_information_impacted_rate?.changed_clinical_management?.trim():"N/A",
        
          "3. How has receiving the genotype information impacted patient care? Rate the options below,Impacted family planning":
          item?.survey_data?.genotype_information_impacted_rate?.impacted_family_planning?item?.survey_data?.genotype_information_impacted_rate?.impacted_family_planning?.trim():"N/A",

          "3. How has receiving the genotype information impacted patient care? Rate the options below,Informed testing of family members":
          item?.survey_data?.genotype_information_impacted_rate?.informed_testing_of_family_members?item?.survey_data?.genotype_information_impacted_rate?.informed_testing_of_family_members?.trim():"N/A",

          "3. How has receiving the genotype information impacted patient care? Rate the options below,Surgical management":
          item?.survey_data?.genotype_information_impacted_rate?.surgical_management?item?.survey_data?.genotype_information_impacted_rate?.surgical_management?.trim():"N/A",
        
        
          "3. How has receiving the genotype information impacted patient care? Rate the options below,Improved patients quality of life":
          item?.survey_data?.genotype_information_impacted_rate?.improved_patients_quality_of_life?item?.survey_data?.genotype_information_impacted_rate?.improved_patients_quality_of_life?.trim():"N/A",

          "3. How has receiving the genotype information impacted patient care? Rate the options below,Others":
          item?.survey_data?.genotype_information_impacted_rate?.others?item?.survey_data?.genotype_information_impacted_rate?.others?.trim():"N/A",
        
          "4. How satisfied are you with the 8CHECK service":item?.survey_data?.satisfied_with_8check_service?.satisfied_with_8check_service?item?.survey_data?.satisfied_with_8check_service?.satisfied_with_8check_service?.trim():"N/A",

          "4. How satisfied are you with the 8CHECK service,Would you recommend this service to a colleague":
          item?.survey_data?.satisfied_with_8check_service?.recommend_colleague?item?.survey_data?.satisfied_with_8check_service?.recommend_colleague?.trim():"N/A",

          "5. Suggestion for service improvement":item?.survey_data?.suggestion?item?.survey_data?.suggestion?.trim():"N/A",

          "6. Would you be interested in participating in any of the following 8CHECK activities":item?.survey_data?.interested_in_8check_activities?item?.survey_data?.interested_in_8check_activities?.trim():"N/A",
        };
      })
      
      // const worksheet = XLSX.utils.json_to_sheet(downloadData, { header: Object.keys(downloadData[0]), origin: 'A1' });
      // // Adjust column widths
      // const columnWidths = downloadData.reduce((acc, item) => {
      //   Object.keys(item).forEach(key => {
      //     const columnLength = item[key].length;
      //     if (!acc[key] || acc[key] < columnLength) {
      //       acc[key] = columnLength;
      //     }
      //   });
      //   return acc;
      // }, {});

      // worksheet['!cols'] = Object.keys(columnWidths).map(key => ({ wch: columnWidths[key] }));

      const worksheet = XLSX.utils.json_to_sheet(downloadData);
         // Specify column widths (in Excel units, 1 unit = 1/256th of the width of a character)
         const columnWidths = [
          {wch: 20}, // Width of column A 
          {wch: 20}, // Width of column B 
          {wch: 10}, // Width of column C 
          {wch: 15}, // Width of column D 
          {wch: 15}, // Width of column E 
          {wch: 15}, // Width of column F 
          {wch: 20}, // Width of column G 
          {wch: 20}, // Width of column H 
          {wch: 20},  // Width of column I
          {wch: 30},  // Width of column J 
          {wch: 30}, // Width of column K 
          {wch: 30}, // Width of column L 
          {wch: 30}, // Width of column M 
          {wch: 30}, // Width of column N 
          {wch: 30}, // Width of column O 
          {wch: 30}, // Width of column P 
          {wch: 30}, // Width of column Q 
          {wch: 30}, // Width of column R 
          {wch: 30}, // Width of column S 
          {wch: 30}, // Width of column T 
          {wch: 30}, // Width of column U 
          {wch: 30}, // Width of column V 
          {wch: 30}, // Width of column W 
          {wch: 30}, // Width of column X 
          {wch: 30},  // Width of column Y 
          {wch: 30}, // Width of column Z 
          {wch: 30}, // Width of column AA 
          {wch: 30}, // Width of column AB 
          {wch: 30}, // Width of column AC 
          {wch: 30}, // Width of column AD 
          {wch: 30}, // Width of column AE 
          {wch:30},
          {wch:30},
          {wch: 60}, // Width of column AF 
         
        ];
      
      // Apply column widths
      worksheet['!cols'] = columnWidths;
      
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      saveAs(
        blob, "Survey_Data_8Check.xlsx");

    } catch (err) {
      console.log("An error occurred while downloading the Excel file:", err)
    }
  }

  const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      toast.success("Survey link copied to clipboard");
    } else {
      unsecuredCopyToClipboard(content);
    }
  };

  const unsecuredCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      toast.success("Survey link copied to clipboard");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };


  return (<>
    {/* <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    /> */}
    <div className="loader" id="custom_loader"><div className="loader_show"><span className="loader-view"> </span></div></div>
    {/* <Col className="right-sidebar custom-change "> */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <div className='survey_result'>


      <div className="custom-container">
        <Row>
            <div className="survey_data">
              <div className='survey_data_heading d-flex align-items-center justify-content-between'>
                <h4>Survey Data | <span>{data?.length}</span></h4>
                <div className='clear-search d-flex align-items-center'>
                  <a
                    className={`copy_link btn-voilet`}
                    // href={`${window.location.protocol}//${window.location.host}/survey/check8`}
                    href={`https://events.docintel.app/survey/8check`}
                    onClick={(e) => {
                      e.preventDefault();
                      
                      console.dir();
                      let newLink = `${e.currentTarget.getAttribute("href")}`;
                      copyToClipboard(newLink);
                    }}
                  >
                    Copy Survey Link
                  </a>
                  {data?.length > 0 ?
                    <div className="clear-search d-flex align-items-center">
                      <button
                        className="btn print"
                        title="Download data"
                        onClick={() => {
                          downloadExcelSurveyData();
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.3335 13.125C18.1125 13.125 17.9005 13.2128 17.7442 13.3691C17.588 13.5254 17.5002 13.7373 17.5002 13.9583V15.1775C17.4995 15.7933 17.2546 16.3836 16.8192 16.819C16.3838 17.2544 15.7934 17.4993 15.1777 17.5H4.82266C4.2069 17.4993 3.61655 17.2544 3.18114 16.819C2.74573 16.3836 2.50082 15.7933 2.50016 15.1775V13.9583C2.50016 13.7373 2.41237 13.5254 2.25609 13.3691C2.0998 13.2128 1.88784 13.125 1.66683 13.125C1.44582 13.125 1.23385 13.2128 1.07757 13.3691C0.921293 13.5254 0.833496 13.7373 0.833496 13.9583V15.1775C0.834599 16.2351 1.25524 17.2492 2.00311 17.997C2.75099 18.7449 3.76501 19.1656 4.82266 19.1667H15.1777C16.2353 19.1656 17.2493 18.7449 17.9972 17.997C18.7451 17.2492 19.1657 16.2351 19.1668 15.1775V13.9583C19.1668 13.7373 19.079 13.5254 18.9228 13.3691C18.7665 13.2128 18.5545 13.125 18.3335 13.125Z"
                            fill="#0066BE"
                          />
                          <path
                            d="M14.7456 9.20249C14.5893 9.04626 14.3774 8.9585 14.1564 8.9585C13.9355 8.9585 13.7235 9.04626 13.5673 9.20249L10.8231 11.9467L10.8333 1.77108C10.8333 1.55006 10.7455 1.3381 10.5893 1.18182C10.433 1.02554 10.221 0.937744 10 0.937744C9.77899 0.937744 9.56702 1.02554 9.41074 1.18182C9.25446 1.3381 9.16667 1.55006 9.16667 1.77108L9.15643 11.9467L6.41226 9.20249C6.25509 9.05069 6.04459 8.96669 5.82609 8.96859C5.60759 8.97049 5.39858 9.05813 5.24408 9.21264C5.08957 9.36715 5.00193 9.57615 5.00003 9.79465C4.99813 10.0131 5.08213 10.2236 5.23393 10.3808L9.40059 14.5475C9.478 14.6251 9.56996 14.6867 9.6712 14.7287C9.77245 14.7707 9.88098 14.7923 9.99059 14.7923C10.1002 14.7923 10.2087 14.7707 10.31 14.7287C10.4112 14.6867 10.5032 14.6251 10.5806 14.5475L14.7473 10.3808C14.9033 10.2243 14.9907 10.0123 14.9904 9.79131C14.9901 9.57034 14.902 9.35854 14.7456 9.20249Z"
                            fill="#0066BE"
                          />
                        </svg>
                      </button>
                    </div>
                    : ""}
                </div>
              </div>
              {data?.length > 0 ? <>
                <div className='survey_data_details'>
                  <div className='survey_data_accordion_heading'>
                    <ul>
                      <li>Name</li>
                      <li>Email</li>
                      <li>Country</li>
                      <li>Survey Date</li>
                    </ul>
                  </div>

                  {data?.map((item, index) => {
                    return (<>
                      <Accordion
                      key={index}
                        activeKey={openAccordionIndex === index ? '0' : null}                        
                        onSelect={() => handleAccordionOpen(index)}
                        className="content_analytics_accordian"
                      >
                        <Accordion.Item eventKey="0" ref={(ref) => { accordionRefs.current[index] = ref; }}>                        
                          <Accordion.Header>
                            <ul>
                              <li>{item?.name ? item?.name : "N/A"}</li>
                              <li>{item?.email ? item?.email : "N/A"}</li>
                              <li>{item?.country ? item?.country : "N/A"}</li>
                              <li>{item?.created_at ? item?.created_at : "N/A"}</li>
                            </ul>
                          </Accordion.Header>

                          <Accordion.Body>
                            {openAccordionIndex === index && (
                              <>
                                {Object.keys(item?.survey_data)?.length ? (
                                  <div className='main'>
                                    <div className='survey-data'>
                                      <h6>Location:</h6>
                                      <p>City: <span>{item?.survey_data?.location?.city}</span></p>
                                      <p>State: <span>{item?.survey_data?.location?.state}</span></p>
                                    </div>
                                    {/* <div className='survey-data'>
                                      <p>Type of Provider: <span>{item?.survey_data?.provider}</span></p>
                                    </div> */}
                                    <div className='survey-data'>
                                      <p>Type of Provider: <span>{item?.survey_data?.provider}</span></p>
                                    </div>
                                    <div className='survey-data'>
                                      <p>Location of Practice: <span>{item?.survey_data?.practice_location}</span></p>
                                    </div>
                                    <div className='survey-data'>
                                      <h6>1. Rate the different reasons you have used the 8CHECK service: </h6>
                                      <p>To confirm a diagnosis: <span>{item?.survey_data?.rate_different_reasons?.to_confirm_diagnosis} star</span></p>
                                      <p>To make a diagnosis: <span>{item?.survey_data?.rate_different_reasons?.to_make_diagnosis} star</span></p>
                                      <p>Patient inhibitor development risk: <span>{item?.survey_data?.rate_different_reasons?.patient_inhibitor_development_risk} star</span></p>
                                      <p>Guide treatment choice: <span>{item?.survey_data?.rate_different_reasons?.guide_treatment_choice} star</span></p>
                                      <p>Genotype not available at my center: <span>{item?.survey_data?.rate_different_reasons?.genotype_not_available} star</span></p>
                                      <p>No insurance reimbursement: <span>{item?.survey_data?.rate_different_reasons?.no_insurance_reimbursement} star</span></p>
                                      <p>To inform family members: <span>{item?.survey_data?.rate_different_reasons?.family_members} star</span></p>
                                      <p>Family/Individual request: <span>{item?.survey_data?.rate_different_reasons?.family_request} star</span></p>
                                      <p>Pre-conception/Pregnancy planning and support: <span>{item?.survey_data?.rate_different_reasons?.pre_conception} star</span></p>
                                      <p>Prohibitive out-of-pocket cost : <span>{item?.survey_data?.rate_different_reasons?.prohibitive} star</span></p>
                                    {item?.survey_data?.rate_different_reasons?.others?<p>Others: <span>{item?.survey_data?.rate_different_reasons?.others}</span></p>:""}
                                    </div>

                                    <div className='survey-data'>
                                      <h6>2. For how many patients in each patient group have used the 8CHECK service: </h6>
                                      <h6>Patients with severe hemophilia A:</h6>
                                      <p>Who have not received a FVIII infusion: <span>{item?.survey_data?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion}</span></p>
                                      <p>Who have received more than 50 infusions FVIII treatment: <span>{item?.survey_data?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion}</span></p>
                                      <h6>Patients with non-severe hemophilia A</h6>
                                      <p><span>{item?.survey_data?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A}</span></p>
                                      <h6>Known, or potential carriers/female with hemophilia A:</h6>
                                      <p>Symptomatic: <span>{item?.survey_data?.known_carrier_with_hemophilia_A?.symptomatic}</span></p>
                                      <p>Asymptomatic: <span>{item?.survey_data?.known_carrier_with_hemophilia_A?.asymptomatic}</span></p>
                                      <h6>Patients with current/past FVIII inhibitors</h6>
                                      <p><span>{item?.survey_data?.patient_with_FVIII_inhibitors?.FVIII_inhibitors}</span></p>
                                    </div>

                                    <div className='survey-data'>
                                      <h6>3. How has receiving the genotype information impacted patient care? Rate the options below</h6>
                                      <p>Improved accuracy of diagnosis: <span>{item?.survey_data?.genotype_information_impacted_rate?.improved_accuracy_diagnosis} star</span></p>
                                      <p>Guided treatment choice: <span>{item?.survey_data?.genotype_information_impacted_rate?.guided_treatment_choice} star</span></p>
                                      <p>Changed clinical management of the patient: <span>{item?.survey_data?.genotype_information_impacted_rate?.changed_clinical_management} star</span></p>
                                      <p>Impacted family planning: <span>{item?.survey_data?.genotype_information_impacted_rate?.impacted_family_planning} star</span></p>
                                      <p>Informed testing of family members: <span>{item?.survey_data?.genotype_information_impacted_rate?.informed_testing_of_family_members} star</span></p>
                                      <p>Surgical management: <span>{item?.survey_data?.genotype_information_impacted_rate?.surgical_management} star</span></p>
                                      <p>Improved patients quality of life: <span>{item?.survey_data?.genotype_information_impacted_rate?.improved_patients_quality_of_life} star</span></p>
                                    {item?.survey_data?.genotype_information_impacted_rate?.others?<p>Others: <span>{item?.survey_data?.genotype_information_impacted_rate?.others}</span></p>:""}
                                    </div>

                                    <div className='survey-data'>
                                      <h6>4. How satisfied are you with the 8CHECK service</h6>
                                      <p><span>{item?.survey_data?.satisfied_with_8check_service?.satisfied_with_8check_service} star</span></p>
                                      <p>Would you recommend this service to a colleague: <span>{item?.survey_data?.satisfied_with_8check_service?.recommend_colleague}</span></p>
                                    </div>

                                    <div className='survey-data'>
                                      <h6>5. Suggestion for service improvement</h6>
                                      <p>{item?.survey_data?.suggestion?item?.survey_data?.suggestion:"N/A"}</p>
                                    </div>

                                    <div className='survey-data'>
                                      <h6>6. Would you be interested in participating in any of the following 8CHECK activities</h6>
                                      <p>{item?.survey_data?.interested_in_8check_activities}</p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="no_found">
                                    <h3 align="center" style={{ color: "#004A89" }}>No Data Found</h3>
                                  </div>
                                )}
                              </>
                            )}

                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </>)
                  })}


                </div>
              </>
                : apiCallStatus ? <div className='no_found'><h3 style={{ color: "#004A89" }}>No Data Found</h3></div> : ""}
            </div>
        </Row>
      </div>
      </div>
    {/* </Col> */}
  </>)
}
export default Check8SurveyData