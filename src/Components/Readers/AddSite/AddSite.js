import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

import { ENDPOINT } from "../../../axios/apiConfig";
import { getData } from "../../../axios/apiHelper";
import Select from "react-select";
const AddSite = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryData, setCountryData] = useState([]);
    const [siteNumber, setSiteNumber] = useState("");
    const [siteName, setSiteName] = useState("");


    const [addSiteErrorMessage, setaddSiteErrorMessage] = useState("");
    const [addSiteForm, setAddSiteForm] = useState([]);


    const getCountryFromApi = async () => {
        try {
            const response = await getData(ENDPOINT.READER_USER_DROP);
            const countryList = response?.data?.data?.country;
            setCountryData(countryList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCountryFromApi();
    }, []);

    const submitFormSite = (event) => {
        event.preventDefault();
        const siteNumber = event.target.elements.sitenumber.value;
        const siteName = event.target.elements.sitename.value;
        console.log(siteNumber, siteName);
        let errorFields = [];
      
        if (siteNumber === "") {
          errorFields.push("sitenumber");
        }
      
        if (siteName === "") {
          errorFields.push("sitename");
        }
      
        if (errorFields.length > 0) {
          setAddSiteForm(errorFields);
        } else {
          setAddSiteForm([]);
         // addSiteErrorMessage(null);
        }
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
                                <input
                                    type="text"
                                    name="sitenumber"
                                    className="form-control"
                                    placeholder="Enter Site Number"
                                    value={siteNumber}
                                    onChange={(e) => setSiteNumber(e.target.value)}
                                />
                                {addSiteForm.includes("sitenumber") && <p style={{ color: "red" }}>Site Number field is required</p>}
                            </Col>
                            <Col sm={6} className="form-group justify-content-end">
                                <label htmlFor="">Site Name</label>
                                <input
                                    type="text"
                                    name="sitename"
                                    className="form-control"
                                    placeholder="Enter Site Name"
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                />
                               {addSiteForm.includes("sitename") && <p style={{ color: "red" }}>Site Name field is required</p>}
                            </Col>
                            <Col sm={6} className="form-group">
                                <label htmlFor="">Site Street Address</label>
                                <input
                                    type="text"
                                    name="siteaddress"
                                    className="form-control"
                                    placeholder="Enter Site Address"
                                />
                            </Col>
                            <Col sm={6} className="form-group justify-content-end">
                                <label htmlFor="">Site City</label>
                                <input
                                    type="text"
                                    name="sitecity"
                                    className="form-control"
                                    placeholder="Enter Site City"
                                />
                            </Col>
                        
                            <Col sm={6} className="form-group">
                                <label htmlFor="">Site Postal Code</label>
                                <input
                                    type="text"
                                    name="sitepostalcode"
                                    className="form-control"
                                    placeholder="Enter Site Postal Code"
                                />
                            </Col>
                            <Col sm={6} className="form-group justify-content-end">
                                <label htmlFor="sitecategory">Site Country</label>
                                <select
                                    id="sitecountry"
                                    name="sitecountry"
                                    className="form-control"
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                >
                                    <option value="">-- Select Country --</option>
                                    {countryData.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </div>
                        <div className="form-row">
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