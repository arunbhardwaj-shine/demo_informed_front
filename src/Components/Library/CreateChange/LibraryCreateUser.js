import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ReactSelect from "react-select";
import { createContent } from "../../CommonComponent/Validations";
import { useSSRSafeId } from "@react-aria/ssr";
import { Button, Form } from "react-bootstrap";
let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
// import Placeholder from "react-select/dist/declarations/src/components/Placeholder";
const today = new Date();

const LibraryCreateUser = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState({});
  const [image, setImage] = useState("");
  const [company, setCompany] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [clientProduct, setClientProduct] = useState("");
  const [pdfFile, setPdfFile] = useState("");

  const [countryAll, setCountryAll] = useState([
    { value: "India", label: "India" },
    { value: "Australia", label: "Australia" },
    { value: "Russia", label: "Russia" },
  ]);

  const [productionAll, setProductionAll] = useState([
    { value: "production1", label: "production1" },
    { value: "production2", label: "production2" },
    { value: "production3", label: "production3" },
  ]);

  const [sales, setSales] = useState("");
  const [salesAll, setSalesAll] = useState([
    { value: "sales1", label: "sales1" },
    { value: "sales2", label: "sales2" },
    { value: "sales3", label: "sales3" },
  ]);

  const [ePrintType, setePrintType] = useState([
    { value: "ePrintType1", label: "ePrintType1" },
    { value: "ePrintType2", label: "ePrintType2" },
    { value: "ePrintType3", label: "ePrintType3" },
  ]);

  const [ePrint, setEPrint] = useState("");

  const onSalesChange = (event) => {
    setSales(event.value);
  };

  const [production, setProduction] = useState("");
  const [country, setCountry] = useState("");
  const onCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const onClientProductChange = (event) => {
    setClientProduct(event.target.value);
  };

  const onCountryChange = (event) => {
    console.log(event);
    setCountry(event.value);
  };

  const ePrintTypeChange = (e) => {
    setEPrint(e);
  };

  const onProductionChange = (event) => {
    console.log(event);
    setProduction(event.value);
  };

  const contentTitleChanged = (e) => {
    setContentTitle(e.target.value);
  };

  const nextButtonClicked = (e) => {
    e.preventDefault();

    const data = {
      contentTitle: contentTitle,
      ePrint: ePrint,
      pdfFile: pdfFile,
      image: image,
    };

    const err = createContent(data);
    if (Object.keys(err)?.length) {
      setError(err);

      console.log(err);
      return;
    } else {
      navigate("/create-docintel-link");
      setError(err);
      console.log("no error");
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setPdfFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className="col right-sidebar">
        <div className="custom-container">
          <div className="row">
            <div className="page-top-nav">
              <div className="row justify-content-end align-items-center">
                <div className="col-12 col-md-1">
                  <div className="header-btn-left">
                    <button className="btn btn-primary btn-bordered back">
                      <Link to="/library-create">Back</Link>
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <ul className="tabnav-link">
                    <li className="active active-main">
                      <a href="">Create Your Content</a>
                    </li>
                    <li className="">
                      <a href="">Edit Consent Option</a>
                    </li>
                    <li className="">
                      <a href="">Approve Your Content &amp; Publish</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-2">
                  <div className="header-btn">
                    <button
                      className="btn btn-primary btn-bordered move-draft"
                      // onClick={saveAsDraft}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-primary btn-filled next"
                      onClick={nextButtonClicked}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>Who is involved</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label for="">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => onCompanyChange(event)}
                        //value={val.firstname}
                      />
                      {/* {error?.company ? (
                        <div className="login-validation">{error?.company}</div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                      <label for="">Country</label>
                      <Select
                        options={countryAll}
                        onChange={(event) => onCountryChange(event)}
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                      {/* {error?.country ? (
                        <div className="login-validation">{error?.country}</div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                      <label for="">Client product</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => onClientProductChange(e)}
                      />
                      {/* {error?.clientProduct ? (
                        <div className="login-validation">
                          {error?.clientProduct}
                        </div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                      <label for="">Production</label>
                      <Select
                        options={productionAll}
                        onChange={(event) => onProductionChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-production-dropdown"
                        isClearable
                      />
                      {/* {error?.production ? (
                        <div className="login-validation">
                          {error?.production}
                        </div>
                      ) : null} */}
                    </div>
                    <div className="form-group">
                      <label for="">Sales</label>
                      <Select
                        options={salesAll}
                        onChange={(event) => onSalesChange(event)}
                        className="dropdown-basic-button split-button-dropup edit-sales-dropdown"
                        isClearable
                      />
                      {/* {error?.sales ? (
                        <div className="login-validation">{error?.sales}</div>
                      ) : null} */}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-end right-change">
                    <div className="form-group justify-content-end">
                      <label for="">Reseller</label>
                      <div className="form-check-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckDefault"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckDefault"
                          >
                            N/A
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckReseller"
                          >
                            Reseller Name
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller1"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckReseller1"
                          >
                            Reseller Name
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            value=""
                            id="flexCheckReseller2"
                            type="checkbox"
                          />
                          <label
                            className="form-check-label"
                            for="flexCheckReseller2"
                          >
                            Reseller Name
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>Limits agreed</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <label for="">Cost centre</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        isClearable
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Expiration date</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                    <div className="form-group">
                      <label for="">Set limit of usage</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label for="">Enable</label>
                      <fieldset id="group2">
                        <input
                          type="checkbox"
                          value="value1"
                          name="group2"
                          id="limitagreed1"
                        />
                        <label for="limitagreed1">Print</label>
                        <input
                          type="checkbox"
                          value="value2"
                          name="group2"
                          id="limitagreed2"
                        />
                        <label for="limitagreed2">Download</label>
                        <input
                          type="checkbox"
                          value="value3"
                          name="group2"
                          id="limitagreed3"
                        />
                        <label for="limitagreed3">Share</label>
                      </fieldset>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end align-items-end right-change">
                    <div className="form-group justify-content-end">
                      <label for="">Invoice notes</label>
                      <textarea
                        className="form-control"
                        id="formControlTextarea"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-change-content">
              <div className="form_action">
                <h4>Creating the eprint</h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group val">
                      <label for="">Content title *</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => contentTitleChanged(e)}
                      />
                      {error?.contentTitle ? (
                        <div className="login-validation">
                          {error?.contentTitle}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label for="">Journal title</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label for="">Author</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group val">
                      <label for="">ePrint type *</label>
                      <Select
                        className="dropdown-basic-button split-button-dropup"
                        options={ePrintType}
                        onChange={(event) => ePrintTypeChange(event)}
                        isClearable
                      />
                      {error?.ePrint ? (
                        <div className="login-validation">{error?.ePrint}</div>
                      ) : null}
                    </div>
                    <div className="form-group val">
                      <label for="">Upload PDF</label>
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-6[]"
                            id="file-6"
                            className="inputfile inputfile-6"
                            accept=".doc .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={(e) => handleFileChange(e)}
                          />
                          <label for="file-6">
                            <span>Choose Your File</span>
                          </label>
                          <p>Upload your PDF</p>
                        </div>
                      </div>
                      {error?.pdfFile ? (
                        <div className="login-validation-upload">
                          {error?.pdfFile}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label for="">Set as draft</label>
                      <div className="switch">
                        <label className="switch-light">
                          <input type="checkbox" />
                          <span>
                            <span className="switch-btn active">No</span>
                            <span className="switch-btn">Yes</span>
                          </span>
                          <a className="btn"></a>
                        </label>
                      </div>
                      <Button className="btn-bordered btn-voilet" onClick={handleShow}>
                        click to embed your Videos{" "}
                      </Button>
                    </div>
                    <div className="form-group val">
                      <label for="">Upload Cover Image</label>
                      <div className="upload-file-box">
                        <div className="box">
                          <input
                            type="file"
                            name="file-5[]"
                            id="file-5"
                            className="inputfile inputfile-5"
                            accept="image/png, image/jpeg"
                            onChange={handleImageChange}
                          />
                          <label for="file-5">
                            <span>Choose Your File</span>
                          </label>
                          <p>
                            Upload your cover image
                            <br />
                            <span>(Recommended size 00 X 00)</span>
                          </p>
                        </div>
                      </div>
                      {error?.image ? (
                        <div className="login-validation-upload">
                          {error?.image}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-end  align-items-end right-change">
                    <div className="form-group justify-content-end">
                      <label for="">Production notes to Docintel team</label>
                      <textarea
                        className="form-control"
                        id="formControlTextarea"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal className="pdf-video-link" show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="form_action embedding-video">
            <div className="side-step-text first-step">
              <div className="embedded-video-step">
                <h2>Step1</h2>
              </div>
              <p>Select the chapter </p>
              <Form.Group className="formgroup">
                <Form.Label>Chapters</Form.Label>
                <ReactSelect
                  placeholder="Select your chapter"
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
              </Form.Group>
            </div>
            <div className="side-step-text second-step">
              <div className="embedded-video-step">
                <h2>Step2</h2>
              </div>
              <p>
                Select the video and highlight the area you want to embed the
                video in{" "}
              </p>
              <Form.Group className="formgroup">
                <Form.Label>Videos *</Form.Label>
                <ReactSelect
                  placeholder="Select your chapter"
                  className="dropdown-basic-button split-button-dropup"
                  isClearable
                />
                <div className="upload-file-box">
                  <input
                    type="file"
                    name="file-10[]"
                    id="file-10"
                    className="inputfile inputfile-6"
                    accept=".mp4"
                  />
                  <label for="file-10">
                    <span>Upload new Video +</span>
                  </label>
                </div>
              </Form.Group>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-content">
            <img src={path_image + "pdf-dummy.png"} alt="Close-filter" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-bordered"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="btn-filled"
            variant="primary"
            onClick={handleClose}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default LibraryCreateUser;
