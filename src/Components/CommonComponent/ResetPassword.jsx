import React, { useState, useEffect } from 'react'
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData} from "../../axios/apiHelper";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Container, Row, Col } from "react-bootstrap";
import { getCurrentYear } from './CurrentYear';

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const ResetPassword = () => {
    const navigate = useNavigate();
    const [resetErrors, setResetErrors] = useState({});
    const [id, setId] = useState("");
    const [cpassshow, setcPassShow] = useState(false);
    const [active, setActive] = useState(false);
    const queryString = window.location.search;
    const queryParams = new URLSearchParams(queryString);
    const [apiHit, setApiHit] = useState(false);
    const [passshow, setPassShow] = useState(false);
    const [apiErrorStatus, setApiErrorStatus] = useState('');
    const [apiMessage, setApiMessage] = useState('');
    const [apiCallStatus, setApiCallStatus] = useState(0);
    const [resetFormData, setResetFormData] = useState({
        password: '',
        cpassword: '',
    });

    useEffect(() => {
        activeLink();
    }, [])

    const activeLink = async () => {
        loader("show");
        try {
            let token = queryParams.get('hthhsdfhsfh').substring(0, queryParams.get('hthhsdfhsfh').length - 4);
            let body = {
                email: queryParams.get('email').trim().replace(" ", "+"),
                token: token,
                LangCode: queryParams.get('LangCode'),
            };
            const res = await postData(ENDPOINT.CHECK_PASS_LINK, body);

            if (res?.data?.status == 200 && res?.data?.data?.passwordId) {
                setId(res?.data?.data?.passwordId)
                setActive(true);
                setApiHit(true);
                setApiErrorStatus('');
            } else {
                setApiHit(true);
                setApiErrorStatus("Id not found");
            }
            loader("hide");

        } catch (err) {
            setApiHit(true);
            setApiErrorStatus(err?.response?.data?.message);
            console.log(err);
            loader("hide");
        }
    };

    const handleChange = (e) => {
        const value = e?.target?.value?.trim()
        setResetFormData({ ...resetFormData, [e.target.name]: value })
    }

    const validateResetForm = () => {
        const newErrors = {};
        if (!resetFormData.password) {
            newErrors.password = 'Password is required';
        } else if (resetFormData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!resetFormData.cpassword) {
            newErrors.cpassword = 'Confirm password is required';
        } else if (resetFormData.cpassword !== resetFormData.password) {
            newErrors.cpassword = 'Passwords do not match';
        }
        return newErrors
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiMessage("");
        setResetErrors({})
        const error = validateResetForm()
        if (Object.keys(error).length) {
            setResetErrors(error)
            return;
        } else {
            try {
                loader("show");
                let token = queryParams.get('hthhsdfhsfh').substring(0, queryParams.get('hthhsdfhsfh').length - 4);
                let body = {
                    email: queryParams.get('email').trim().replace(" ", "+"),
                    token: token,
                    passwordId: id,
                    password: resetFormData?.password,
                };
                const setPass = await postData(ENDPOINT.UPDATE_PASSWORD, body);                
                loader("hide");
                if (setPass?.data?.status == 200 ) {
                    let userDetails=""
                    if(setPass?.data?.data?.userdetails){
                        userDetails=setPass?.data?.data?.userdetails
                    }
                    setApiCallStatus(1);
                    setApiMessage('Password reset successfully.');
                    setResetFormData({
                        password: "",
                        cpassword: ""
                    });
                    setTimeout(function () {
                        navigateToLogin(userDetails);
                    }, 2000);
                } else {
                    setApiMessage(setPass?.data?.message);
                    setApiCallStatus(2);
                }
                loader("hide");
            } catch (err) {
                setApiMessage("Something went wrong.");
                loader("hide");
            }
        }
    }

    const navigateToLogin = (userDetails) => {
        if (userDetails!="") {
            const path = `/account/${userDetails}`
            navigate(path)
        } else {
            navigate('/');
        }
    }

    const toggleCPass = () => {
        setcPassShow(!cpassshow);
    };

    const toggleState = () => {
        setPassShow(!passshow);
    };
    return (<>

        {active == true ? (
            <>
            <div className="loader" id="custom_loader">
                <div className="loader_show">
                <span className="loader-view"> </span>
                </div>
            </div>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
            <div className="sunshine-account">
                <Container>
                    <Row>
                        <div className="sunshine-account-inset">
                            <div className="logo-sec">
                                <img src={path_image + "informed_logo.svg"} alt="" />
                            </div>
                            <div className="sunshine-form">
                                <div className="sunshine-form-inset">
                                    <h4>Please set your password</h4>
                                    <Form  onSubmit={handleSubmit}>
                                        <Row>
                                            <FormGroup as={Col} md={12} className="mb-4">
                                                <div className={`form-group ${resetErrors?.password ? 'error' : ''}`}>
                                                    <input
                                                        type={passshow ? "text" : "password"}
                                                        name="password"
                                                        placeholder="Password"
                                                        value={resetFormData.password}
                                                        className="form-control"
                                                        onChange={handleChange}
                                                    />
                                                    <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                                                    <span className="pawword_img"><img src={passshow ? path_image + "show_p.svg" : path_image + "hide.svg"} alt="" onClick={toggleState} /></span>
                                                    {resetErrors.password && <p className="error-msg">{resetErrors.password}</p>}
                                                </div>
                                            </FormGroup>
                                            <FormGroup as={Col} md={12} className="mb-4">
                                                <div className={`form-group ${resetErrors?.cpassword ? 'error' : ''}`}>
                                                    <input
                                                        type={cpassshow ? "text" : "password"}
                                                        name="cpassword"
                                                        placeholder="Confirm Password"
                                                        value={resetFormData.cpassword}
                                                        className="form-control"
                                                        onChange={handleChange}
                                                    />
                                                    <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                                                    <span className="pawword_img"><img src={cpassshow ? path_image + "show_p.svg" : path_image + "hide.svg"} alt="" onClick={toggleCPass} /></span>
                                                    {resetErrors.cpassword && <p className="error-msg">{resetErrors.cpassword}</p>}
                                                </div>
                                            </FormGroup>
                                            {
                                                apiCallStatus == 1 && (
                                                    <p className="success">{apiMessage}</p>
                                                )
                                            }
                                            {
                                                apiCallStatus == 2 && (
                                                    <p className="danger">{apiMessage}</p>
                                                )
                                            }

                                            <button type="submit" className="btn btn-primary save btn-filled">
                                                Reset
                                            </button>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                            <div className="sunshine-footer">
                                <p>Copyright MedArkive Ltd {getCurrentYear()}. Read our <a target="_blank" href="https://albert.docintel.app/privacy_policy/">Privacy Policy</a> and <a target="_blank" href="https://albert.docintel.app/terms_of_use/">Terms of Use</a></p>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
            </>
            )
            : apiHit == true ? (
                <div className="link-expire">
                    <h3>The link is expired</h3>
                </div>
            ) : null
        }
    </>)
}
export default ResetPassword