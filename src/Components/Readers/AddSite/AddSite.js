import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

import { ENDPOINT } from "../../../axios/apiConfig";
import { getData, postData , updateConsent} from "../../../axios/apiHelper";
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import { loader } from "../../../loader";
import { useNavigate } from 'react-router-dom';
const AddSite = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryData, setCountryData] = useState([]);
    const [siteNumber, setSiteNumber] = useState("");
    const [siteName, setSiteName] = useState("");
    const [siteAddress, setSiteAddress] = useState("");
    const [siteCity, setSiteCity] = useState("");
    const [sitePostal, setSitePostal] = useState("");


    const [addSiteErrorMessage, setaddSiteErrorMessage] = useState("");
    const [addSiteForm, setAddSiteForm] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const getCountryFromApi = async () => {
        try {
            const response = await getData(ENDPOINT.READER_USER_DROP);
            const countryList = response?.data?.data?.country;
            setCountryData(countryList);
        } catch (error) {
            console.log(error);
        }
    };

    const getSiteDataEditApi = async () => {
        try {
            loader("show");
            const editResponse = await getData(`${ENDPOINT.EDITSITE}/${id}`);
            const siteData = editResponse?.data?.data;
            setSiteNumber(siteData?.site_number);
            setSiteName(siteData?.site_name);
            setSelectedCountry(siteData?.site_country);
            setSiteAddress(siteData?.site_address);
            setSiteCity(siteData?.site_city);
            setSitePostal(siteData?.site_postal);
            loader("hide");
        } catch (error) {
            console.log(error);
            loader("hide");
        }
    }

    useEffect(() => {
        getCountryFromApi();
        if (id) {
            getSiteDataEditApi();
        }
    }, []);

    const submitFormSite = async (event) => {
        event.preventDefault();
        const siteNumber = event.target.elements.sitenumber.value;
        const siteName = event.target.elements.sitename.value;
        let errorFields = [];

        if (siteNumber === "") {
            errorFields.push("sitenumber");
        }

        if (siteName === "") {
            errorFields.push("sitename");
        }

        if (selectedCountry == "") {
            errorFields.push("sitecountry");
        }

        if (errorFields.length > 0) {
            setAddSiteForm(errorFields);
        } else {
            setAddSiteForm([]);
            // addSiteErrorMessage(null);
            const formData = {
                siteNumber: siteNumber,
                siteName: siteName,
                siteAddress: siteAddress,
                siteCity: siteCity,
                sitePostal: sitePostal,
                siteCountry: selectedCountry
              };
              if (id) {
                formData.id = id;
              }
                try {
                    loader("show");
                    if (id) {
                        const updateResponse = await postData(ENDPOINT.UPDATESITE, formData);
                      } else {
                        const addResponse = await postData(ENDPOINT.ADDSITE, formData);
                      }
                    loader("hide");
                    navigate('/site-listing');
                } catch (error) {
                    console.log(error);
                    loader("hide");
                }
            
        }
    };

    const handleBack = () => {
        navigate(-1);
    };


   



    return (
        <>
            <Col className="right-sidebar">
                <Row>
                    <div className="create-change-content add-site">
                        <Form className="add-site" onSubmit={submitFormSite}>
                            <div className="form-row">
                                <Col sm={6} className="form-group">
                                    <label htmlFor="">Site Number</label>
                                    <div className="create_site_form">
                                        <input
                                            type="text"
                                            name="sitenumber"
                                            className="form-control"
                                            placeholder="Enter Site Number"
                                            value={siteNumber}
                                            onChange={(e) => {
                                                if (e.target.value !== undefined) {
                                                    setSiteNumber(e.target.value)
                                                }
                                            }}
                                        />

                                        {addSiteForm.includes("sitenumber") && <p className="login-validation">Site Number field is required</p>}
                                    </div>
                                </Col>
                                <Col sm={6} className="form-group justify-content-end">
                                    <label htmlFor="">Site Name</label>
                                    <div className="create_site_form">
                                        <input
                                            type="text"
                                            name="sitename"
                                            className="form-control"
                                            placeholder="Enter Site Name"
                                            value={siteName}
                                            onChange={(e) => {
                                                if (e.target.value !== undefined) {
                                                    setSiteName(e.target.value)
                                                }
                                            }}
                                        />
                                        {addSiteForm.includes("sitename") && <p className="login-validation">Site Name field is required</p>}
                                    </div>
                                </Col>
                                <Col sm={6} className="form-group">
                                    <label htmlFor="">Site Address</label>
                                    <div className="create_site_form">
                                        <input
                                            type="text"
                                            name="siteaddress"
                                            className="form-control"
                                            placeholder="Enter Site Address"
                                            value={siteAddress}
                                            onChange={(e) => {
                                                if (e.target.value !== undefined) {
                                                    setSiteAddress(e.target.value)
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col sm={6} className="form-group justify-content-end">
                                    <label htmlFor="">Site City</label>
                                    <div className="create_site_form">
                                        <input
                                            type="text"
                                            name="sitecity"
                                            className="form-control"
                                            placeholder="Enter Site City"
                                            value={siteCity}
                                            onChange={(e) => {
                                                if (e.target.value !== undefined) {
                                                    setSiteCity(e.target.value)
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>

                                <Col sm={6} className="form-group">
                                    <label htmlFor="">Site Postal Code</label>
                                    <div className="create_site_form">
                                        <input
                                            type="text"
                                            name="sitepostalcode"
                                            className="form-control"
                                            placeholder="Enter Site Postal Code"
                                            value={sitePostal}
                                            onChange={(e) => {
                                                if (e.target.value !== undefined) {
                                                    setSitePostal(e.target.value)
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col sm={6} className="form-group justify-content-end">
                                    <label htmlFor="sitecategory">Site Country</label>
                                    <div className="create_site_form">
                                        <Select
                                            className="dropdown-basic-button split-button-dropup"
                                            id="sitecountry"
                                            name="sitecountry"
                                            placeholder="Select the Country"
                                            value={selectedCountry ? { label: selectedCountry, value: selectedCountry } : null}
                                            options={countryData.map((country) => ({ label: country, value: country }))}
                                            onChange={(selectedOption) => setSelectedCountry(selectedOption.value)}
                                        />
                                        {addSiteForm.includes("sitecountry") && <p className="login-validation">Please Select Site Country</p>}
                                    </div>
                                </Col>
                            </div>
                            <div className="form-row d-flex justify-content-end">
                                {id && (
                                    <Button onClick={handleBack} className="btn-bordered">Back</Button>
                                )}
                                <Button type="submit"> Submit </Button>
                            </div>


                        </Form>

                    </div>
                </Row>
            </Col>
        </>
    );
};
export default AddSite;