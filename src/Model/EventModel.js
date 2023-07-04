import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import axios from "axios";

const EventModel = ({ show, onClose, data }) => {
  const [user, setUser] = useState({
    speakerName: "",
    poll_question_id: "",
    poll_answer_id: "",
    guest_id: "",
    user_answer: "",
  });
  const [error, setError] = useState({});

  const handleChange = (value, type, e) => {
    if (type == "CHECKBOX") {
      let newAr = [];
      if (user?.poll_answer_id?.includes(value)) {
        newAr = user?.poll_answer_id?.filter((item) => item != value);
      } else {
        newAr = user?.poll_answer_id?.length ? user?.poll_answer_id : [];
        newAr.push(value);
      }
      setUser({
        ...user,
        speakerName: data?.[0]?.speakerName,
        poll_question_id: data?.[0]?.questionId,
        poll_answer_id: newAr,
        guest_id: Cookies.get("events"),
      });
    } else if (type == "MULTIPLE") {
      setUser({
        ...user,
        speakerName: data?.[0]?.speakerName,
        poll_question_id: data?.[0]?.questionId,
        poll_answer_id: value,
        guest_id: Cookies.get("events"),
      });
    } else {
      setUser({ ...user, user_answer: e.target.value });
    }
  };
  const handleSubmit = async () => {
    try {
      if (!user?.poll_answer_id || !user?.poll_answer_id?.length) {
        setError({ msg: "This field is required" });
        return;
      } else {
        setError({});
      }

      await axios.post(
        `https://webinar.docintel.app/flow/webinar/submit_poll_answer_guest`,
        {
          speakerName: user?.speakerName,
          poll_question_id: user?.poll_question_id,
          poll_answer_id: user?.poll_answer_id.toString(),
          user_answer: user?.user_answer,
          guest_id: user?.guest_id,
        }
      );

      const eventQuestion = Cookies.get("eventQuestion");
      if (!eventQuestion?.includes(user?.poll_question_id)) {
        let newAr = eventQuestion?.length ? eventQuestion : [];
        newAr.push(user?.poll_question_id);
        Cookies.set("eventQuestion", JSON.stringify(newAr), { expires: 7 });
      }
      onClose(false);
    } catch (err) {
      console.log("-err", err);
    }
  };
  return (
    <Modal
      id="pollModel"
      show={show}
      // onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src="https://webinar.docintel.app/Event/webinar-assets/images/octa-logo.svg"
            alt=""
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{data?.length ? data[0]?.question : ""}</p>
        {data?.length && ["MULTIPLE", "CHECKBOX"].includes(data[0]?.type)
          ? data[0]?.pollAnswers?.map((item) => {
              return (
                <>
                  <div className="form-check form-check-inline">
                    <input
                      type={data[0]?.type == "MULTIPLE" ? "radio" : "checkbox"}
                      id={item?.answer}
                      name="fav_language"
                      onChange={(e) => handleChange(item?.id, data[0]?.type, e)}
                      value={item?.answer}
                    />
                    <label for={item?.answer}>{item?.answer}</label>
                    <br />
                  </div>
                </>
              );
            })
          : ""}

        {data?.length && data?.[0]?.canCustomAnswer ? (
          <div className="form-check form-check-inline full">
            <textarea
              id="modal-textarea"
              rows="4"
              onChange={(e) => handleChange("textArea", "textArea", e)}
              cols="50"
            ></textarea>
          </div>
        ) : (
          ""
        )}
      </Modal.Body>
      <Modal.Footer>
        {error?.msg ? <p className="error">{error.msg}</p> : ""}
        <Button onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(EventModel);
