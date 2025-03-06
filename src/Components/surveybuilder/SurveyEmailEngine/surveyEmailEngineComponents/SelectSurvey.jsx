import { useState } from "react";
import { format } from "date-fns";
import Select from "react-select";
import SublinkModal from "../Modals/SublinkModal";

const SelectSurvey = ({ SendListData,setSendListData,handlePdfSelection,setCurrentSelectedSublink}) => {
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [selectedSublinkId, setSelectedSublinkId] = useState({});
  const [PdfSelected, setPdfSelected] = useState(0);
  const [createNewLink, setCreateNewLink] = useState(false);
  const [currentAddSublinkLid, setCurrentAddSublinkLid] = useState(null)

  const handleSelect = (e) => {
    let pdfId = e?.target?.value === PdfSelected ? 0 : e?.target?.value;
    setSelectedSublinkId({})
    handlePdfSelection(pdfId)
    setPdfSelected(pdfId);
  };

  const showSublinkModal = (id) => {
    setCurrentAddSublinkLid(id)
    setCreateNewLink(true);
  };

  //   const handleSurveySelect = (surveyId) => {
  //   setPdfSelected(surveyId); // Set the selected survey
  // };

  // const onSublinkChange = (selectedOption) => {
  //   setSelectedSublinkId(selectedOption ? selectedOption.value : null);
  // };

  const onSublinkChange = (surveyId, selectedOption) => {
    console.log(PdfSelected)

    setSelectedSublinkId((prevState) => ({
      ...prevState,  // Keep previous selections
      [surveyId]: selectedOption ? selectedOption.value : null,  
    }));

    selectedOption()
  
    if (PdfSelected == surveyId) {
      setCurrentSelectedSublink(selectedOption?.value);
    }
 
    // if (PdfSelected == surveyId) {
    //   setCurrentSelectedSublink(selectedOption)
    //   setSelectedSublinkId({
    //     [surveyId]: selectedOption ? selectedOption.value : null,  
    //   });
    // }
  };
 

  return (
    <>
      <div className="col right-sidebar custom-change">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav sticky">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left"></div>
                </div>
              </div>
            </div>

            {/* <div className="top-header">
              <div className="page-title">
                <h4>Select your content</h4>
              </div>
            </div> */}

            <div className="mail-content-select">
              <div className="row">
                {typeof SendListData !== "undefined" &&
                SendListData.length > 0 ? (
                  SendListData.map((data, index) => {
                    const sublinkOptions = [
                      { value: 0, label: "Primary link" },  // Ensure Primary link is always present
                      ...data.subLinkData.map((item) => ({
                        value: item.sublink_id,
                        label: item.identifier,
                      })),
                    ];
                    return (
                      <div className="col-12 col-md-4" key={index}>
                        <div className="mail-content-select-box">
                          <div className="mail-content-select-top">
                            
                            <div className="mail-box-content">
                              {data?.is_draft == "1" && (
                                <div className="survey_status">
                                  <span>Live</span>
                                </div>
                              )}
                              {data?.is_draft == "2" && (
                                <div className="survey_status completed">
                                  <span>Completed</span>
                                </div>
                              )}
                              <h5>{data.survey_title}</h5>
                              <p>{data.subtitle}</p>
                              <h6>{data.creator_name}</h6>
                              <div className="mailbox-tags">
                                <ul>
                                  {JSON.parse(data?.tags)?.length > 0 ? (
                                    JSON.parse(data.tags).map((tag, index) => (
                                      <li key={index}>{tag}</li>
                                    ))
                                  ) : (
                                    <li>N/A</li>
                                  )}
                                </ul>
                              </div>

                              <ul className="survey-consent">
                                <li className="d-flex align-items-center">
                                  <h6 className="tab-content-title">Consent</h6>

                                  {data.survey_consent != "" ? (
                                    data.survey_consent ===
                                    "Mandatory consent" ? (
                                      <h6 className="ms-3">Mandatory</h6>
                                    ) : data.survey_consent ===
                                      "Optional consent" ? (
                                      <h6 className="ms-3">Optional</h6>
                                    ) : (
                                      <h6 className="ms-3">Anonymous</h6>
                                    )
                                  ) : (
                                    <h6 className="ms-3">N/A</h6>
                                  )}
                                </li>
                              </ul>

                              <div className="mail-time">
                                Created date
                                <span className="ms-2">
                                {data.createdDate}
                                  {/* {format(
                                    new Date(),
                                    "MMMM d, yyyy '|' h:mm a"
                                  )} */}
                                </span>
                              </div>
                            </div>
                            <div className="select-mail-option">
                              <input
                                //onChange={handleSelect}
                                onClick={handleSelect}
                                onChange={handleSelect}
                                type="radio"
                                name="radio"
                                value={data.survey_id}
                                checked={
                                  typeof PdfSelected !== "undefined" &&
                                  PdfSelected == data.survey_id
                                    ? true
                                    : false
                                }
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="data-main-box change-tab-main-box tab-panel">
                              <ul className="tab-mail-list data change">
                                <li>
                                  <h6 className="tab-content-title">
                                    Links
                                    <img
                                      src={path_image + "info_circle_icon.svg"}
                                      alt=""
                                    />
                                  </h6>
                                  <div className="select-dropdown-wrapper">
                                    <div className="select">
                                      <Select
                                        aria-label="SSelect Sublink"
                                        className="dropdown-basic-button split-button-dropup"
                                        name="surveyCreator"
                                        placeholder="Select Sublink"
                                        onChange={(selectedOption) => {
                                          onSublinkChange(
                                            data.survey_id,
                                            selectedOption
                                          );
                                        }}
                                        options={sublinkOptions}
                                        // value={sublinkOptions.find(
                                        //   (option) =>
                                        //     option.value == selectedSublinkId
                                        // )}
                                        value={sublinkOptions.find(
                                          (option) => option.value === (selectedSublinkId[data.survey_id] ?? 0)  
                                        )}
                                      />
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            {
                              <div className="d-flex justify-content-between">
                                <p onClick={()=>{showSublinkModal(data.survey_id);}}>
                                  Add new creator{" "}
                                  <img
                                    src={path_image + "creator-add.png"}
                                    alt=""
                                  />
                                </p>
                              </div>
                            }

                            
                            
                            
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="not_found">
                    <p>No Data Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {
         createNewLink && <SublinkModal
         createNewLink={createNewLink}
         setCreateNewLink={setCreateNewLink}
         setCurrentAddSublinkLid={setCurrentAddSublinkLid}
         setSelectedSublinkId={setSelectedSublinkId}
         currentAddSublinkLid={currentAddSublinkLid}
         setSendListData={setSendListData}
         SendListData={SendListData}
  />
      }
      
    </>
  );
};

export default SelectSurvey;
 