import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const CommonPreviewReader = ({ show, onClose, previewUser, address ,logActivity}) => {
 
  const [commonPreview, setCommonPreview] = useState([]);

  useEffect(() => {}, [show]);

  const handleClose = () => {
    onClose(false);

  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        id="add_hcp"
        className="data-preview"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>HCP list preview</Modal.Title>
          <button
            type="button"
            onClick={handleClose}
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body>
          <div >
            {previewUser ? <div className="crm-data">
            <h5>
              <span>Job Title:</span>{" "}
              {previewUser?.jobTitle ? previewUser?.jobTitle : "N/A"}
            </h5>
            <h5>
              <span>Title:</span>{" "}
              {previewUser?.title ? previewUser?.title : "N/A"}
            </h5>
            <h5>
              <span>First Name:</span>{" "}
              {previewUser?.firstName ? previewUser?.firstName : "N/A"}
            </h5>
            <h5>
              <span>Middle Name:</span>{" "}
              {previewUser?.middleName ? previewUser?.middleName : "N/A"}
            </h5>
            <h5>
              <span>Last Name:</span>{" "}
              {previewUser?.lastName ? previewUser?.lastName : "N/A"}
            </h5>

            <h5>
              <span>Primary Email:</span>{" "}
              {previewUser?.email ? previewUser?.email : "N/A"}
            </h5>
            <h5>
              <span>Alternative Email:</span>{" "}
              {previewUser?.alternativeEmail
                ? previewUser?.alternativeEmail
                : "N/A"}
            </h5>

            {/* <h5>
              <span>Primary Phone:</span>{" "}
              {previewUser?.primary_phone
                ? previewUser.primary_phone.replace("-informed-", " ")
                : "N/A"}
            </h5> */}
           
            <h5>
            <span>Primary Phone:</span>
             {(() => {
            if (previewUser && previewUser.primary_phone) {
             return previewUser.primary_phone.replace("-informed-", " ");
                } else if("-informed-") {
             return "N/A";
            }
               })()}
              </h5>


            <h5>
              <span>Alternative Phone:</span>{" "}
              {previewUser?.alternativePhone
                ? previewUser?.alternativePhone
                : "N/A"}
            </h5>
            <h5>
              <span>LinkedIn:</span>{" "}
              {previewUser?.linkedIn ? previewUser?.linkedIn : "N/A"}
            </h5>

            <h5>
              <span>Prospect:</span>{" "}
              {previewUser?.prospect ? previewUser?.prospect : "N/A"}
            </h5>
            <h5>
              <span>Contact Ownership:</span>{" "}
              {previewUser?.contact_ownership
                ? previewUser?.contact_ownership
                : "N/A"}
            </h5>
            <h5>
              <span>Type of Contact:</span>{" "}
              {previewUser?.type_of_contact
                ? previewUser?.type_of_contact
                : "N/A"}
            </h5>
            <h5>
              <span>Customer Type:</span>{" "}
              {previewUser?.customer_type ? previewUser?.customer_type : "N/A"}
            </h5>
            <h5>
              <span>Company Name:</span>{" "}
              {previewUser?.company_name ? previewUser?.company_name : "N/A"}
            </h5>
            <h5>
              <span>Country:</span>{" "}
              {previewUser?.country ? previewUser?.country : "N/A"}
            </h5>
            <h5>
              <span>Company Website:</span>{" "}
              {previewUser?.company_website
                ? previewUser?.company_website
                : "N/A"}
            </h5>
            <h5>
              <span>Company Product:</span>{" "}
              {previewUser?.company_product
                ? previewUser?.company_product
                : "N/A"}
            </h5>
            <h5>
              <span>Company Therapy Area:</span>{" "}
              {previewUser?.company_therapy_area
                ? previewUser?.company_therapy_area
                : "N/A"}
            </h5>
            <h5>
              <span>Local/International:</span>{" "}
              {previewUser?.local ? previewUser?.local : "N/A"}
            </h5>
            <h5>
              <span>Street1:</span>{" "}
              {address?.street1 ? address?.street1 : "N/A"}
            </h5>
            <h5>
              <span>Street2:</span>{" "}
              {address?.street2 ? address?.street2 : "N/A"}
            </h5>
            <h5>
              <span>City:</span> {address?.city ? address?.city : "N/A"}
            </h5>
            <h5>
              <span>Postcode:</span>{" "}
              {address?.postcode ? address?.postcode : "N/A"}
            </h5>

            <h5>
              <span>Task Completed :</span>
              {previewUser?.task?.taskCheckClicked ? "Yes" : "No"}
            </h5>

            {previewUser?.task?.taskCheckClicked && (
              <h5>
                <span>Task Completed Date:</span>{" "}
                {previewUser?.task?.taskDate ? (
                  <>
                    {new Date(previewUser?.task?.taskDate).getDate()}{" "}
                    {new Date(previewUser?.task?.taskDate).toLocaleString(
                      "default",
                      {
                        month: "long",
                      }
                    )}
                    , {new Date(previewUser?.task?.taskDate).getFullYear()}
                  </>
                ) : null}
              </h5>
            )}

            <h5>
              <span>Next contact:</span>{" "}
              {previewUser?.next_contact !== 0 ? (
                <>
                  {previewUser?.next_contact ? (
                    <>
                      {new Date(previewUser.next_contact).getDate()}{" "}
                      {new Date(previewUser.next_contact).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )}
                      , {new Date(previewUser.next_contact).getFullYear()}
                    </>
                  ) : (
                    "N/A"
                  )}
                </>
              ) : (
                "N/A"
              )}
            </h5>

            <h5>
              <span>Title:</span>{" "}
              {previewUser?.opportunity_title
                ? previewUser.opportunity_title
                : "N/A"}
            </h5>
            <h5>
              <span>Our Product:</span>{" "}
              {previewUser?.our_product ? previewUser.our_product : "N/A"}
            </h5>
            <h5>
              <span>Contact Total:</span>{" "}
              {previewUser?.contact_total ? previewUser.contact_total : "N/A"}
            </h5>
            <h5>
              <span>Pipeline Stage:</span>{" "}
              {previewUser?.pipeline ? previewUser.pipeline : "N/A"}
            </h5>
            <h5>
              <span>Value:</span>{" "}
              {previewUser?.opportunity_value
                ? previewUser.opportunity_value
                : "N/A"}
            </h5>

            <h5>
              <span>Probability:</span>{" "}
              {previewUser?.probability ? `${previewUser.probability}%` : "N/A"}
            </h5>

            <h5>
              <span>Weighted Value:</span>{" "}
              {previewUser?.weighted_value ? previewUser.weighted_value : "N/A"}
            </h5>

            <h5>
              <span>Quote Sent:</span>{" "}
              {previewUser?.quote_sent == 1 ? "Yes" : "No"}
            </h5>

            <h5>
              <span>Quote valid until:</span>{" "}
              {previewUser?.quote_valid_until !== 0 ? (
                <>
                  {previewUser?.quote_valid_until ? (
                    <>
                      {new Date(previewUser.quote_valid_until).getDate()}{" "}
                      {new Date(previewUser.quote_valid_until).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )}
                      , {new Date(previewUser.quote_valid_until).getFullYear()}
                    </>
                  ) : (
                    "N/A"
                  )}
                </>
              ) : (
                "N/A"
              )}
            </h5>
            <h5> <span>Log:</span>
            {typeof logActivity != 'undefined' && logActivity?.length > 0 ?
                <div className="log-active">
                  {logActivity?.map((log, index) => (
                    <div className="log-activity-box" key={index}>
                      <pre>{log?.value}</pre><p className="date-prev">{moment(log?.date).format("DD MMM YYYY")}</p>
                    </div>
                  ))}
                </div>:"N/A"}
            </h5></div>
:<></>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary save btn-bordered"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CommonPreviewReader;
