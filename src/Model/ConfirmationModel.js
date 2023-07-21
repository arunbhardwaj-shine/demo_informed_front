import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmationModal = ({ show, data, onClose }) => {
  const [highchartData, setHighChartData] = useState({});
  const [userCount,setUserCount] = useState(0) 

 
  return (
    <>
      <Modal show={show} backdrop="static"      onHide={onClose}
      keyboard={false} id="pollModel1">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            alt=""
          />
        </Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <p>{data?.question}</p>
          <HighchartsReact highcharts={Highcharts} options={highchartData} />
          <h5>Total Answer:{userCount}</h5>
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default ConfirmationModal;
