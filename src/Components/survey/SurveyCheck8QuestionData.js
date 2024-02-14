import React, { useEffect, useState } from 'react';
import { getData } from '../../axios/apiHelper';
import { ENDPOINT } from '../../axios/apiConfig';
import { Accordion, Col, Row } from 'react-bootstrap';

const SurveyData = () => {
  const [data, setData] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  useEffect(() => {
    getSurveyData();
  }, []);

  const getSurveyData = async () => {
    try {
      const response = await getData(ENDPOINT.GET_SURVEY_DATA + "?type=2");
      let parsedData = response?.data?.data.map(item => ({
        ...item,
        survey_data: JSON.parse(item?.survey_data)
      }));
      setData(parsedData);
    } catch (err) {
      console.log("--err", err);
    }
  };

  const handleAccordionOpen = (index) => {
    setOpenAccordionIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <Col className="right-sidebar custom-change full-width-survey">
      <div className="custom-container">
        <Row>
          <Col>
            <div className="survey_data">
              <div className='survey_data_heading'>
                <h4>Survey Data</h4>
              </div>
              <div className='survey_data_details'>
              {data?.length > 0 ?
                data?.map((item, index) => (
                  <Accordion
                    key={index}
                    activeKey={openAccordionIndex === index ? '0' : null}
                    onSelect={() => handleAccordionOpen(index)}
                    className="content_analytics_accordian"
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        See Details
                      </Accordion.Header>
                      <Accordion.Body>
                        {openAccordionIndex === index &&
                          Object.keys(item?.survey_data).length ? (
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
                              <h6> 1. How relevant was this patient case to your clinical practice?</h6>
                              <p>{item?.survey_data?.patient_case?.patient_case_rating} star</p>
                            </div>

                            <div className='survey-data'>
                              <h6> 2. I plan to attend future Clinical Practice patient cases:</h6>
                              <p>{item?.survey_data?.clinical_practice?.future_clinical}</p>
                            </div>

                            <div className='survey-data'>
                              <h6> 3. Would you recommend Clinical Practice to a colleague?</h6>
                              <p>{item?.survey_data?.recommend?.recommend_clinical}</p>
                            </div>

                            <div className='survey-data'>
                              <h6> 4. Please suggest a topic for a future Clinical Practice patient case:</h6>
                              <p>{item?.survey_data?.suggestion}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="no_found">
                            <p align="center">No Data Available</p>
                          </div>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                ))
                : ""}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default SurveyData;
