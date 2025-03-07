import { useState } from "react";
import { format } from "date-fns";
import Select from "react-select";
import SublinkModal from "../Modals/SublinkModal";

const SelectSurvey = ({ SendListData, setSendListData, handlePdfSelection, setCurrentSelectedSublink,selectedSurvey, selectedSublink }) => {
  let path_image = import.meta.env.VITE_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [selectedSublinkId, setSelectedSublinkId] = useState(
    selectedSurvey ? {[selectedSurvey] : selectedSublink} :  {}
  );
  const [PdfSelected, setPdfSelected] = useState(selectedSurvey);
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
    setSelectedSublinkId((prevState) => ({
      ...prevState,  // Keep previous selections
      [surveyId]: selectedOption ? selectedOption.value : null,
    }));

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
      <div className="mail-content-select survey_mail_engine">
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
                  <div className="email_box">
                  <div className="mail-content-select-box survey-mail">
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
                        <span>{data.creator_name}</span>
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
                    </div>
                    <div>
                      <div class="mail-content-table">
                        <table>
                          <tbody><tr>
                            <th>Consent</th>
                            <td>
                            {data.survey_consent != "" ? (
                              data.survey_consent ===
                                "Mandatory consent" ? (
                                <span>Mandatory</span>
                              ) : data.survey_consent ===
                                "Optional consent" ? (
                                <span>Optional</span>
                              ) : (
                                <span>Anonymous</span>
                              )
                            ) : (
                              <span>N/A</span>
                            )}
                            </td>
                          </tr>
                          <tr>
                            <th>Created date</th>
                            <td><span>
                                   {data.createdDate}
                                  </span>
                              </td>
                          </tr>
                          <tr>
                            <th>Last email</th>
                            <td>20 May.2025 | 2:00 PM</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                          <h6 className="tab-content-title">
                            Link 
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
                    </div>

                    {
                      <div className="d-flex justify-content-end sublink-add">
                        <p onClick={() => { showSublinkModal(data.survey_id); }}>
                          Create New SubLink{" "}
                          <img
                            src={path_image + "creator-add.png"}
                            alt=""
                          />
                        </p>
                      </div>
                    }
                    </div>

                    {/* <ul className="survey-consent">
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
                    </ul> */}
{/* 
                    <div className="mail-time">
                      Created date
                      <span className="ms-2">
                        {data.createdDate}
                        {/* {format(
                                new Date(),
                                "MMMM d, yyyy '|' h:mm a"
                              )} */}
                     {/*</div> </span>
                    </div> */}


                   
                            <div className="mail-content-footer">
                              <a href={data.preview_link} target="_blank">
                                <button className="btn btn-primary btn-filled">
                                  Preview
                                </button>
                              </a>
                          </div>
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
