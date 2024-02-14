import React, { useEffect, useState } from 'react'
import { getData } from '../../axios/apiHelper'
import { ENDPOINT } from '../../axios/apiConfig'
import { Accordion, Col, Row } from 'react-bootstrap'
const SurveyData = () => {
  const [data, setData] = useState([])
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  useEffect(() => {
    getSurveyData()
  }, [])

  const getSurveyData = async () => {
    try {
      const response = await getData(ENDPOINT.GET_SURVEY_DATA+"?type=1")
      let data = []
      response?.data?.data?.map((item, index) => {
        item.survey_data = JSON.parse(item?.survey_data)
        data?.push(item)
      })
      // console.log("response-->", data)
      setData(data)

    } catch (err) {
      console.log("--err", err)
    }
  }

  const handleAccordionOpen = (index) => {
    setOpenAccordionIndex(prevIndex => (prevIndex === index ? null : index));
  };


  return (<>
    <Col className="right-sidebar custom-change full-width-survey">
      <div className="custom-container">
        <Row>
          <Col>
            <div className="survey_data">
              <div className='survey_data_heading'>
                <h4>Survey Data</h4>
              </div>
              <div className='survey_data_details'>
                <div className='survey_data_accordion_heading'>
                  <ul>
                    <li>Name</li>
                    <li>Email</li>
                    <li>Country</li>
                    <li>Survey Date</li>
                  </ul>
                </div>
              {data?.length > 0 ?
                data?.map((item, index) => {
                  return (<>
                    <Accordion
                      activeKey={openAccordionIndex === index ? '0' : null}
                      onSelect={() => handleAccordionOpen(index)}
                      // onSelect={(e) => handleAccordionOpen(e, index)}
                      className="content_analytics_accordian"
                    >
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <ul>
                            <li>Name</li>
                            <li>Email</li>
                            <li>Country</li>
                            <li>Survey Date</li>
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
                                  <div className='survey-data'>
                                    <p>Type of Provider: <span>{item?.survey_data?.provider}</span></p>
                                  </div>
                                  <div className='survey-data'>
                                    <p>Haematologist: <span>{item?.survey_data?.haematologist}</span></p>
                                  </div>
                                  <div className='survey-data'>
                                    <p>Location of Practice: <span>{item?.survey_data?.practice_location}</span></p>
                                  </div>
                                  <div className='survey-data'>
                                    <h6>1. Rate the different reasons you have used the 8CHECK service: </h6>
                                    <p>To confirm a diagnosis: <span>{item?.survey_data?.rate_different_reasons?.to_confirm_diagnosis} star</span></p>
                                    <p>Patient inhibitor development risk: <span>{item?.survey_data?.rate_different_reasons?.patient_inhibitor_development_risk} star</span></p>
                                    <p>Guide treatment choice: <span>{item?.survey_data?.rate_different_reasons?.guide_treatment_choice} star</span></p>
                                    <p>Genotype not available at my center: <span>{item?.survey_data?.rate_different_reasons?.genotype_not_available} star</span></p>
                                    <p>No insurance reimbursement: <span>{item?.survey_data?.rate_different_reasons?.no_insurance_reimbursement} star</span></p>
                                    <p>Family/Individual request: <span>{item?.survey_data?.rate_different_reasons?.family_request} star</span></p>
                                  </div>

                                  <div className='survey-data'>
                                    <h6>2. How many patients in each patient group have used the 8CHECK service: </h6>
                                    <h6>Patients with severe hemophilia A:</h6>
                                    <p>Who have not received a FVIII infusion: <span>{item?.survey_data?.patients_with_severe_hemophilia_A?.not_recieved_FVIII_infusion}</span></p>
                                    <p>Who have received more than 50 infusions FVIII treatment: <span>{item?.survey_data?.patients_with_severe_hemophilia_A?.recieved_FVIII_infusion}</span></p>
                                    <h6>Patients with non-severe hemophilia A</h6>
                                    <p>{item?.survey_data?.patients_with_non_severe_hemophilia_A?.non_severe_hemophilia_A}</p>
                                    <h6>Known, or potential carriers/female with hemophilia A:</h6>
                                    <p>Symptomatic: <span>{item?.survey_data?.known_carrier_with_hemophilia_A?.symptomatic}</span></p>
                                    <p>Asymptomatic: <span>{item?.survey_data?.known_carrier_with_hemophilia_A?.asymptomatic}</span></p>
                                    <h6>Patients with current/past FVIII inhibitors</h6>
                                    <p>{item?.survey_data?.patient_with_FVIII_inhibitors?.FVIII_inhibitors}</p>
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
                                  </div>

                                  <div className='survey-data'>
                                    <h6>4. How satisfied are you with the 8CHECK service</h6>
                                    <p><span>{item?.survey_data?.satisfied_with_8check_service?.satisfied_with_8check_service} star</span></p>
                                    <p>Who have not received a FVIII infusion: <span>{item?.survey_data?.satisfied_with_8check_service?.FVIII_infusion}</span></p>
                                  </div>

                                  <div className='survey-data'>
                                    <h6>5. Suggestion for service improvement</h6>
                                    <p>{item?.survey_data?.service_improvement}</p>
                                  </div>

                                  <div className='survey-data'>
                                    <h6>6. Would you be interested in participating in any of the following 8CHECK activities</h6>
                                    <p>{item?.survey_data?.interested_in_8check_activities}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="no_found">
                                  <p align="center">No Data Available</p>
                                </div>
                              )}
                            </>
                          )}

                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </>)
                })

                : ""}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  </>)
}
export default SurveyData