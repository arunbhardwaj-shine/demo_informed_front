import React, { useEffect, useState } from "react";
import Select from "react-select";
import CryptoJS from 'crypto-js';
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData, getData } from "../../axios/apiHelper";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Form, FormGroup, Container, Row, Col } from "react-bootstrap";
import { countryList } from "../../data/countryData";
import { ToastContainer } from "react-toastify";
import { getCurrentYear } from '../CommonComponent/CurrentYear';

let path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
const SECRET_KEY = 'XkhZG4fW2t2W';
const ClinetAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passshow, setPassShow] = useState(false);
  const [cpassshow, setcPassShow] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loginerrors, setLoginerrors] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [pharmaErrors, setPharmaErrors] = useState({});
  const [resetErrors, setResetErrors] = useState({});
  const [addEmailClass, setAddEmailClass] = useState(false);
  const [pharmaLoginSinup, setPharmaLoginSingup] = useState(0);
  // const [showUserNameError, setShowUserNameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [addPasswordClass, setAddPasswordClass] = useState(false);
  const [pharmaFormData, setPharmaFormData] = useState({
    name: '',
    email: '',
    country: '',
    company: '',
    password: '',
    cpassword: '',
  });

  const [resetFormData, setResetFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  useEffect(() => {
    if (localStorage.getItem("uname") && localStorage.getItem("pass")) {
      setRememberMe(true);
      const rememberedUsername = localStorage.getItem('uname');
      const rememberedPassword = localStorage.getItem('pass');

      if (rememberedUsername && rememberedPassword) {
        decryptData(rememberedUsername).then(decryptedUsername => {
          let unquotedStr = decryptedUsername.replace(/^"(.*)"$/, '$1');
          setUsername(unquotedStr);
        });

        decryptData(rememberedPassword).then(decryptedPassword => {
          let unquotedStr = decryptedPassword.replace(/^"(.*)"$/, '$1');
          setPassword(unquotedStr);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserInfo(token);

    }
  }, [token])

  // for get user information
  const getUserInfo = async (token) => {
    try {
      loader("show");
      const result = await getData(ENDPOINT.PHARMA_INFO + "/" + token);
      setPharmaLoginSingup(result?.data?.data)
      setUsername(token);
      loader("hide");
    } catch (err) {
      console.log(err);
    }
  }

  // for Pharma change function
  const handlePharmaChange = (input, actionMeta) => {
    // Check if it's coming from react-select
    if (actionMeta && actionMeta.name) {
      const { name } = actionMeta;
      const value = input ? input.value : '';
      setPharmaFormData({
        ...pharmaFormData,
        [name]: value,
      });
    } else {
      // Handle regular input fields (like text inputs)
      const { name, value } = input.target;
      setPharmaFormData({
        ...pharmaFormData,
        [name]: value,
      });
    }
  };
  
  // for signup
  const handlePharmaSignUp = async (event) => {
    event.preventDefault();
    try {
      if (validateForm()) {
        loader("show");
        const payload = {
          "token": token,
          "name": pharmaFormData?.name,
          "email": pharmaFormData?.email,
          "country": pharmaFormData?.country,
          "company": pharmaFormData?.company,
          "password": pharmaFormData?.password
        };
        const res = await postData(ENDPOINT.ACCOUNT_SETUP, payload);
        clearLocalStorageExcept();
        localStorage.setItem("user_id", res?.data?.data?.userToken);
        localStorage.setItem("group_id", res?.data?.data?.groupId);
        localStorage.setItem("webinar_flag", res?.data?.data?.webinar_flag);
        localStorage.setItem("name", res?.data?.data?.name);
        localStorage.setItem("decrypted_token", res?.data?.data?.jwtToken);
        localStorage.setItem("account_type", 'USA_PHARMA');
        loader("hide");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setLoginerrors(err?.response?.data?.message);
      loader("hide");
    }
  };

  // for singup form validation
  const validateForm = () => {
    const newErrors = {};
    if (!pharmaFormData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!pharmaFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(pharmaFormData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!pharmaFormData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!pharmaFormData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!pharmaFormData.password) {
      newErrors.password = 'Password is required';
    } else if (pharmaFormData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!pharmaFormData.cpassword) {
      newErrors.cpassword = 'Confirm password is required';
    } else if (pharmaFormData.cpassword !== pharmaFormData.password) {
      newErrors.cpassword = 'Passwords do not match';
    }

    setPharmaErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // for login
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginerrors('');
    if (password === "") {
      setShowPasswordError("Please enter a valid password");
      setAddPasswordClass(true);
    } else {
      loader("show");
      try {
        const res = await postData(ENDPOINT.LOGIN, {
          email: username,
          password: password,
          type: 2,
        });
        // localStorage.clear();
        clearLocalStorageExcept();
        if (rememberMe == true) {
          const encryptedUsername = await encryptData(username);

          const encryptedPassword = await encryptData(password)

          localStorage.setItem("uname", encryptedUsername);
          localStorage.setItem("pass", encryptedPassword);
        } else {
          localStorage.removeItem("uname");
          localStorage.removeItem("pass");
        }
        localStorage.setItem("user_id", res?.data?.data?.userToken);
        localStorage.setItem("group_id", res?.data?.data?.groupId);
        localStorage.setItem("webinar_flag", res?.data?.data?.webinar_flag);
        localStorage.setItem("name", res?.data?.data?.name);
        localStorage.setItem("decrypted_token", res?.data?.data?.jwtToken);
        localStorage.setItem("account_type", 'USA_PHARMA');
        loader("hide");
        navigate("/home");
      } catch (err) {
        console.log(err);
        setAddPasswordClass(true);
        setLoginerrors(err?.response?.data?.message);
        loader("hide");
      }
    }
  };

  // for clear the local storage
  const clearLocalStorageExcept = () => {
    const keysToKeep = ['uname', 'pass', 'acceptedCookies'];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    }
  }

  // for toggle the password hide show field
  const toggleState = () => {
    setPassShow(!passshow);
  };

  const toggleCPass = () => {
    setcPassShow(!cpassshow);
  };

  //Encrypt the data
  const encryptData = async (data) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
  };

  //Decrypt the data
  const decryptData = async (encrypted) => {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  };

  // for Reset account
  const resetLogin = async (event) => {
    event.preventDefault();
    try {
      if (validateResetForm()) {
        const payload = {
          "token": token,
          "name": resetFormData?.name,
          "email": resetFormData?.email,
          "password": resetFormData?.password,
          "reset" : 1,
        };
        const res = await postData(ENDPOINT.ACCOUNT_SETUP, payload);
        clearLocalStorageExcept();
        localStorage.setItem("user_id", res?.data?.data?.userToken);
        localStorage.setItem("group_id", res?.data?.data?.groupId);
        localStorage.setItem("webinar_flag", res?.data?.data?.webinar_flag);
        localStorage.setItem("name", res?.data?.data?.name);
        localStorage.setItem("decrypted_token", res?.data?.data?.jwtToken);
        localStorage.setItem("account_type", 'USA_PHARMA');
        loader("hide");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setLoginerrors(err?.response?.data?.message);
      loader("hide");
    }
  };

  // for reset form validation
  const validateResetForm = () => {
    const newErrors = {};
    if (!resetFormData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!resetFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(resetFormData.email)) {
      newErrors.email = 'Invalid email format';
    }
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
    setResetErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // for reset change function
  const handleResetChange = (input, actionMeta) => {
    // Check if it's coming from react-select
    if (actionMeta && actionMeta.name) {
      const { name } = actionMeta;
      const value = input ? input.value : '';
      setResetFormData({
        ...resetFormData,
        [name]: value,
      });
    } else {
      // Handle regular input fields (like text inputs)
      const { name, value } = input.target;
      setResetFormData({
        ...resetFormData,
        [name]: value,
      });
    }
  };

  const naviageteToggle = (type) => {
    if (type == "forgot") {
      setPharmaLoginSingup(4);
    }else if(type == "login"){
      setErrorMsg('');
      setSuccessMsg('');
      setEmail('');
      setAddEmailClass(false)
      setPharmaLoginSingup(2);
    }
  };

  const rememberMeClicked = (e) => {
    setRememberMe(e.target.checked);
  };

  // for send email forgetpassword
  const onSendEmail = async (event) => {
    event.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (email.trim() === "") {
      setErrorMsg("Please enter your email");
      setAddEmailClass(true)
    } else if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address");
      setAddEmailClass(true)
    } else {
      loader("show");
      try {
        const res = await postData(ENDPOINT.FORGET, {
          email: email,
        });
        loader("hide");
        setEmail("");
        setErrorMsg(null);
        // setSuccessMsg(res?.data?.message);
        setSuccessMsg('Password reset successfully. </br >Please check your email for new password.');
      } catch (err) {
        setAddEmailClass(true);
        setSuccessMsg('');
        setErrorMsg(err?.response?.data?.message);
        loader("hide");
      }
    }
  };

  return(
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                  <img src={path_image + "informed_logo.svg"} alt=""/>
                </div>
                <div className="sunshine-form">
                  {
                    pharmaLoginSinup == 1 ?
                      <div className="sunshine-form-inset register">
                        <h4>Sign up</h4>
                        <p>Your new inforMed.pro account is personal and can only be access by you. <br/>We will use the email for password recovery as well as alerts and relevant tips.</p>
                        <Form onSubmit={handlePharmaSignUp}>
                          <Row>
                            <FormGroup as={Col} md={6} className="mb-4">
                              <div className={`form-group ${pharmaErrors?.name ? 'error' : ''}`}>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Name"
                                  value={pharmaFormData.name}
                                  className="form-control"
                                  onChange={handlePharmaChange}
                                  />
                                  <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1034 8.41164C12.4325 8.41164 14.3202 6.52838 14.3202 4.20564C14.3202 1.88289 12.4321 0 10.1034 0C7.77476 0 5.88599 1.88325 5.88599 4.206C5.88599 6.52874 7.77476 8.41164 10.1034 8.41164ZM11.8921 8.69831H8.31405C5.33701 8.69831 2.91504 11.1145 2.91504 14.0839V18.4485L2.92616 18.5168L3.22756 18.611C6.06862 19.4964 8.53687 19.7917 10.5685 19.7917C14.5365 19.7917 16.8365 18.6632 16.9782 18.5913L17.2599 18.4492H17.29V14.0839C17.2911 11.1145 14.8691 8.69831 11.8921 8.69831Z" fill="#97B6CF"/></svg></span>
                                  {pharmaErrors.name && <p className="error-msg">{pharmaErrors.name}</p>}
                              </div>
                            </FormGroup>

                            <FormGroup as={Col} md={6} className="mb-4">
                              <div className={`form-group ${pharmaErrors?.email ? 'error' : ''}`}>
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  value={pharmaFormData.email}
                                  className="form-control"
                                  onChange={handlePharmaChange}
                                />
                                <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9333 1.77222L10.7048 6.87521C10.4916 6.98865 10.2503 7.04833 10.0048 7.04833C9.7592 7.04833 9.5179 6.98865 9.30476 6.87521L0.0666666 1.77222C0.0225076 1.94943 0.000141946 2.13073 0 2.31264V10.9771C0 11.5903 0.261887 12.1785 0.728049 12.6121C1.19421 13.0458 1.82646 13.2894 2.48571 13.2894H17.5143C18.1735 13.2894 18.8058 13.0458 19.2719 12.6121C19.7381 12.1785 20 11.5903 20 10.9771V2.31264C19.9999 2.13073 19.9775 1.94943 19.9333 1.77222Z" fill="#97B6CF"></path><path d="M10.2285 6.13954L19.5428 0.983389C19.314 0.680352 19.0103 0.432858 18.6573 0.261728C18.3043 0.0905987 17.9122 0.000838778 17.5142 0H2.4856C2.08753 0.000838778 1.6955 0.0905987 1.34249 0.261728C0.989475 0.432858 0.685807 0.680352 0.457031 0.983389L9.78084 6.13954C9.84948 6.17443 9.92644 6.19272 10.0047 6.19272C10.0829 6.19272 10.1598 6.17443 10.2285 6.13954Z" fill="#97B6CF"></path></svg></span>    
                                {pharmaErrors.email && <p className="error-msg">{pharmaErrors.email}</p>}
                              </div>
                            </FormGroup>

                            <FormGroup as={Col} md={6} className="mb-4">
                              <div className={`form-group ${pharmaErrors?.country ? 'error' : ''}`}>
                                    <Select
                                      className="form-control contact-field"
                                      name="country"
                                      options={countryList}
                                      placeholder="Select country"
                                      onChange={handlePharmaChange}
                                      isClearable
                                    />
                                <span>
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_3705_3134)"><path fillRule="evenodd" clipRule="evenodd" d="M20.0001 9.99993C20.0001 12.1465 19.3201 14.1372 18.1647 15.7682C17.7531 16.1293 17.1152 16.1879 16.8714 16.0462C16.8093 16.0102 16.7877 15.9797 16.8115 15.8842C17.0539 14.9078 17.0151 14.4061 16.9776 13.9212C16.9619 13.7167 16.9467 13.5235 16.9519 13.2898C16.9756 12.165 16.8219 11.4929 16.4535 11.1102C16.0759 10.7182 15.5552 10.7091 15.052 10.7007C14.6847 10.6944 14.3056 10.6879 13.9215 10.5547C12.7619 9.78114 13.0853 9.272 13.5311 8.56965C13.7864 8.16766 14.0736 7.71536 13.914 7.23922C13.9792 7.11028 14.1753 6.89895 14.2765 6.87063C15.1038 7.12934 17.1111 7.17848 17.4948 7.07348C17.9005 6.96223 18.2498 6.29289 18.1873 5.74739C18.1281 5.23059 17.7256 4.90762 17.1101 4.88344C17.0189 4.87973 16.8485 4.89582 16.5027 4.92883C16.0785 4.96953 15.1398 5.05938 14.8053 5.01926C14.694 4.6318 14.6085 3.85496 14.9478 3.54516C15.2973 3.22535 15.9218 3.01676 16.3781 2.86445C16.5678 2.80113 16.7144 2.75121 16.8302 2.70305C18.7798 4.52907 20.0001 7.12446 20.0001 9.99993ZM4.30102 1.78785C4.66294 1.9009 4.92477 1.99445 5.13962 2.07152C6.00259 2.38031 6.09376 2.38016 7.57439 2.06856C8.54607 1.86391 8.75267 2.03356 9.06599 2.29047C9.3231 2.50141 9.64353 2.76383 10.3213 2.86035C10.526 2.88965 10.8059 2.89809 10.9535 3.0634C11.0247 3.1436 11.0551 3.25367 11.0581 3.36082C11.0638 3.57805 10.9904 3.78328 10.9551 3.99477C10.9256 4.16992 10.9218 4.37082 10.7884 4.50528C10.6272 4.66766 10.2877 4.67926 10.0742 4.72348C9.46384 4.84985 8.94021 5.05215 8.38763 5.33481C7.87298 5.59805 7.23255 5.92551 7.04384 6.89149C6.98978 7.17024 6.60274 7.24707 6.01813 7.33239C5.49388 7.40883 4.95192 7.48786 4.74962 7.92446C4.52809 8.40172 4.87169 8.89711 5.09716 9.30149C5.31438 9.69051 5.54591 10.1257 5.93595 10.3685C6.23395 10.5543 6.5347 10.5191 7.03302 10.4609C7.21427 10.4398 7.43974 10.4135 7.71177 10.3919C8.03673 10.3919 10.373 11.0457 11.1738 11.9012C11.3321 12.0699 11.4068 12.224 11.3968 12.3588C11.3164 13.4152 10.8238 13.9965 10.3022 14.612C9.81216 15.1899 9.30599 15.7875 9.18591 16.7548C9.04751 17.8733 8.64708 18.4436 8.46173 18.4485C8.46134 18.4485 8.46056 18.4485 8.46017 18.4485C8.33337 18.4485 7.91017 18.0642 7.60271 16.341C7.23314 14.2674 6.59567 13.8351 6.0836 13.4877C5.66645 13.2047 5.36512 13.0002 5.34802 11.4919C5.3368 10.492 4.81016 9.77954 3.9584 9.28614C3.19215 8.84247 1.77918 8.02254 0.966329 5.71457C1.71922 4.13356 2.87547 2.78035 4.30102 1.78785ZM10.0001 20.0001C12.901 20.0001 15.5168 18.7579 17.3452 16.7784C17.301 16.7814 17.2567 16.7834 17.2131 16.7834C16.9611 16.7834 16.7248 16.7318 16.5365 16.6225C16.2106 16.4334 16.0714 16.0971 16.1644 15.7234C16.381 14.8518 16.3476 14.4247 16.3128 13.9727C16.2965 13.761 16.2794 13.5424 16.285 13.2757C16.3039 12.3803 16.1989 11.8072 15.9731 11.5725C15.7963 11.389 15.5176 11.3754 15.0405 11.3671C14.6271 11.3602 14.1585 11.3522 13.6568 11.168C13.6326 11.1591 13.6097 11.1477 13.5884 11.1338C12.8306 10.6368 12.4611 10.1104 12.4581 9.52477C12.456 9.01938 12.728 8.59067 12.968 8.21223C13.2085 7.83364 13.349 7.59145 13.2706 7.42258C13.1388 7.1393 13.3885 6.79313 13.5489 6.61192C13.8452 6.27715 14.1781 6.13797 14.4614 6.22996C15.1593 6.45641 16.9947 6.48926 17.3035 6.43344C17.3998 6.35856 17.5793 6.01118 17.5152 5.7702C17.5019 5.7193 17.4606 5.56438 17.0843 5.54965C17.0293 5.54809 16.7832 5.57164 16.566 5.5925C14.8123 5.76036 14.3993 5.7293 14.2397 5.41715C13.9314 4.81348 13.9263 3.82707 14.3155 3.2625C14.368 3.18625 14.4294 3.11567 14.4976 3.05317C14.9518 2.63781 15.6542 2.40328 16.1667 2.23207C16.1952 2.22262 16.2243 2.21281 16.2537 2.20297C14.54 0.825626 12.3651 0 10.0001 0C8.19185 0 6.49423 0.482383 5.02895 1.32551C5.15673 1.36973 5.26798 1.40926 5.3643 1.44383C6.08356 1.70094 6.08356 1.70094 7.43677 1.41613C8.62919 1.16508 9.03923 1.40649 9.48841 1.77488C9.7113 1.9575 9.92165 2.13008 10.4154 2.20047C10.8508 2.26238 11.2301 2.33688 11.4626 2.62094C11.8343 3.07481 11.6568 3.87352 11.5418 4.39129C11.4541 4.78504 11.2409 5.12512 10.8318 5.23539C10.4577 5.33606 10.0722 5.3836 9.70224 5.50016C9.35333 5.61024 9.01087 5.76477 8.69126 5.92829C8.22638 6.16614 7.82458 6.37157 7.69837 7.01926C7.54915 7.78235 6.71962 7.90344 6.11415 7.99192C5.84876 8.03082 5.40512 8.09551 5.35419 8.20481C5.35165 8.21012 5.2968 8.34083 5.57415 8.78547L5.68325 8.96141C5.97751 9.43419 6.15501 9.71961 6.28829 9.80254C6.38462 9.86251 6.55208 9.84579 6.95548 9.7988C7.14298 9.77676 7.37673 9.74965 7.66255 9.72684C8.07634 9.69383 10.5936 10.3808 11.6047 11.3881C11.9341 11.7162 12.088 12.06 12.0613 12.4093C11.9646 13.6813 11.3517 14.4047 10.8105 15.043C10.345 15.5922 9.94302 16.0668 9.84747 16.8367C9.6788 18.2029 9.14157 19.0974 8.4795 19.1148C8.47204 19.115 8.46497 19.1152 8.45786 19.1152C7.76907 19.1152 7.26075 18.2214 6.94618 16.4579C6.62579 14.6612 6.13864 14.3308 5.70915 14.0393C5.10075 13.6266 4.70071 13.227 4.68126 11.4993C4.6734 10.7752 4.23622 10.2175 3.62407 9.86286C2.91403 9.45161 1.51914 8.64348 0.598204 6.59204C0.211133 7.65629 0 8.80372 0 9.99985C0.00015625 15.5141 4.48602 20.0001 10.0001 20.0001Z" fill="#97B6CF"/></g><defs>
                                  <clipPath id="clip0_3705_3134"><rect width="20" height="20" fill="white"/></clipPath></defs>
                                  </svg>
                                </span>    
                                {pharmaErrors.country && <p className="error-msg">{pharmaErrors.country}</p>}
                              </div>
                            </FormGroup>

                            <FormGroup as={Col} md={6} className="mb-4">
                              <div className={`form-group ${pharmaErrors?.company ? 'error' : ''}`}>
                                <input
                                  type="text"
                                  name="company"
                                  placeholder="Company"
                                  value={pharmaFormData.company}
                                  className="form-control"
                                  onChange={handlePharmaChange}
                                />
                                  <span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.1665 2.60713C14.1665 2.07122 13.668 1.67463 13.1458 1.79514L3.14579 4.10283C2.76768 4.19009 2.49984 4.52677 2.49984 4.91482V17.5H2.08317C1.85305 17.5 1.6665 17.6866 1.6665 17.9167C1.6665 18.1468 1.85305 18.3334 2.08317 18.3334H2.91486H2.9165H2.91815H6.6665V15.8334C6.6665 15.3731 7.0396 15 7.49984 15H9.1665C9.62675 15 9.99984 15.3731 9.99984 15.8334V18.3334H13.7482H13.7498H13.7515H14.1665V2.60713ZM5.4165 6.66669C5.18639 6.66669 4.99984 6.85324 4.99984 7.08336V7.91669C4.99984 8.14681 5.18639 8.33336 5.4165 8.33336H6.24984C6.47995 8.33336 6.6665 8.14681 6.6665 7.91669V7.08336C6.6665 6.85324 6.47995 6.66669 6.24984 6.66669H5.4165ZM4.99984 9.58336C4.99984 9.35327 5.18639 9.16669 5.4165 9.16669H6.24984C6.47995 9.16669 6.6665 9.35327 6.6665 9.58336V10.4167C6.6665 10.6468 6.47995 10.8334 6.24984 10.8334H5.4165C5.18639 10.8334 4.99984 10.6468 4.99984 10.4167V9.58336ZM5.4165 11.6667C5.18639 11.6667 4.99984 11.8533 4.99984 12.0834V12.9167C4.99984 13.1468 5.18639 13.3334 5.4165 13.3334H6.24984C6.47995 13.3334 6.6665 13.1468 6.6665 12.9167V12.0834C6.6665 11.8533 6.47995 11.6667 6.24984 11.6667H5.4165ZM7.49984 7.08336C7.49984 6.85324 7.68639 6.66669 7.9165 6.66669H8.74984C8.97992 6.66669 9.1665 6.85324 9.1665 7.08336V7.91669C9.1665 8.14681 8.97992 8.33336 8.74984 8.33336H7.9165C7.68639 8.33336 7.49984 8.14681 7.49984 7.91669V7.08336ZM7.9165 9.16669C7.68639 9.16669 7.49984 9.35327 7.49984 9.58336V10.4167C7.49984 10.6468 7.68639 10.8334 7.9165 10.8334H8.74984C8.97992 10.8334 9.1665 10.6468 9.1665 10.4167V9.58336C9.1665 9.35327 8.97992 9.16669 8.74984 9.16669H7.9165ZM7.49984 12.0834C7.49984 11.8533 7.68639 11.6667 7.9165 11.6667H8.74984C8.97992 11.6667 9.1665 11.8533 9.1665 12.0834V12.9167C9.1665 13.1468 8.97992 13.3334 8.74984 13.3334H7.9165C7.68639 13.3334 7.49984 13.1468 7.49984 12.9167V12.0834ZM10.4165 6.66669C10.1864 6.66669 9.99984 6.85324 9.99984 7.08336V7.91669C9.99984 8.14681 10.1864 8.33336 10.4165 8.33336H11.2498C11.4799 8.33336 11.6665 8.14681 11.6665 7.91669V7.08336C11.6665 6.85324 11.4799 6.66669 11.2498 6.66669H10.4165ZM9.99984 9.58336C9.99984 9.35327 10.1864 9.16669 10.4165 9.16669H11.2498C11.4799 9.16669 11.6665 9.35327 11.6665 9.58336V10.4167C11.6665 10.6468 11.4799 10.8334 11.2498 10.8334H10.4165C10.1864 10.8334 9.99984 10.6468 9.99984 10.4167V9.58336ZM10.4165 11.6667C10.1864 11.6667 9.99984 11.8533 9.99984 12.0834V12.9167C9.99984 13.1468 10.1864 13.3334 10.4165 13.3334H11.2498C11.4799 13.3334 11.6665 13.1468 11.6665 12.9167V12.0834C11.6665 11.8533 11.4799 11.6667 11.2498 11.6667H10.4165Z" fill="#97B6CF"/>
                                    <path d="M15 4.74243V18.3333H17.0822H17.0833H17.0845H17.9167C18.1468 18.3333 18.3333 18.1467 18.3333 17.9166C18.3333 17.6865 18.1468 17.4999 17.9167 17.4999H17.5V6.50746C17.5 6.19182 17.3217 5.90326 17.0393 5.7621L15 4.74243Z" fill="#97B6CF"/>
                                    <path d="M9.16667 18.3333H7.5V15.8333H9.16667V18.3333Z" fill="#97B6CF"/>
                                    </svg>
                                  </span>
                                  {pharmaErrors.company && <p className="error-msg">{pharmaErrors.company}</p>}
                              </div>
                            </FormGroup>

                            <FormGroup as={Col} md={6} className="mb-4">
                              <div className={`form-group ${pharmaErrors?.password ? 'error' : ''}`}>
                                <input
                                  type={passshow ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  value={pharmaFormData.password}
                                  className="form-control"
                                  onChange={handlePharmaChange}
                                />
                                <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                                <span className="pawword_img"><img src={passshow ? path_image + "show_p.svg" : path_image + "hide.svg"} alt="" onClick={toggleState} /></span>
                                {pharmaErrors.password && <p className="error-msg">{pharmaErrors.password}</p>}
                              </div>
                            </FormGroup>

                            <FormGroup as={Col} md={6} className="mb-4">
                              <div className={`form-group ${pharmaErrors?.cpassword ? 'error' : ''}`}>
                                <input
                                  type={cpassshow ? "text" : "password"}
                                  name="cpassword"
                                  placeholder="Confirm Password"
                                  value={pharmaFormData.cpassword}
                                  className="form-control"
                                  onChange={handlePharmaChange}
                                />
                                <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                                <span className="pawword_img"><img src={cpassshow ? path_image + "show_p.svg" : path_image + "hide.svg"} alt="" onClick={toggleCPass} /></span>
                                {pharmaErrors.cpassword && <p className="error-msg">{pharmaErrors.cpassword}</p>}
                              </div>
                            </FormGroup>

                            <button type="submit" className="btn btn-primary save btn-filled">
                              Sign Up
                            </button>
                          </Row>
                        </Form>
                      </div>  
                    : pharmaLoginSinup == 2 ?
                      <div className="sunshine-form-inset">
                        <h4>Login</h4>
                        <Form onSubmit={handleLogin}>
                          <Row>
                            <FormGroup as={Col} md={12} className="mb-4">
                              <div className={`form-group ${addPasswordClass ? 'error' : ''}`}>
                                <input
                                  type={passshow ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(event) => { setPassword(event.target.value); setShowPasswordError(null); setAddPasswordClass(false); }}
                                  className="form-control" />
                                <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                                <span className="pawword_img"><img src={passshow ? path_image + "show_p.svg" : path_image + "hide.svg"} alt="" onClick={toggleState} /></span>
                                {showPasswordError && <p className="error-msg">{showPasswordError}</p>}
                                {loginerrors && <p className="error-msg">{loginerrors}</p>}
                              </div>
                            </FormGroup>

                            <Form.Group className="mb-4 form-check">
                              <input id="formgridgheckbox" type="checkbox" class="form-check-input" checked={rememberMe} onChange={(e) => {rememberMeClicked(e)}}/>
                              <label for="formgridgheckbox" title="" class="form-check-label">Remember me</label>
                              {/* <Form.Check htmlFor = "formGridCheckbox"
                                type="checkbox" 
                                label="Remember me" 
                                checked={rememberMe}
                                onChange={(e) => {rememberMeClicked(e)}} 
                              /> */}
                            </Form.Group>

                            <button type="submit" className="btn btn-primary save btn-filled">
                              Login
                            </button>
                            <div className="forgot-details">
                              <Link onClick={(e) => naviageteToggle("forgot")}>Forget password?</Link>
                            </div>
                          </Row>  
                        </Form>
                      </div>
                    : pharmaLoginSinup == 3 ?
                      <div className="sunshine-form-inset">
                        <h4>Reset account credentials</h4>
                        <Form onSubmit={resetLogin}>
                          <Row>
                            <FormGroup as={Col} md={12} className="mb-4">
                              <div className={`form-group ${resetErrors?.name ? 'error' : ''}`}>
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Name"
                                  value={resetFormData.name}
                                  className="form-control"
                                  onChange={handleResetChange}
                                  />
                                  <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1034 8.41164C12.4325 8.41164 14.3202 6.52838 14.3202 4.20564C14.3202 1.88289 12.4321 0 10.1034 0C7.77476 0 5.88599 1.88325 5.88599 4.206C5.88599 6.52874 7.77476 8.41164 10.1034 8.41164ZM11.8921 8.69831H8.31405C5.33701 8.69831 2.91504 11.1145 2.91504 14.0839V18.4485L2.92616 18.5168L3.22756 18.611C6.06862 19.4964 8.53687 19.7917 10.5685 19.7917C14.5365 19.7917 16.8365 18.6632 16.9782 18.5913L17.2599 18.4492H17.29V14.0839C17.2911 11.1145 14.8691 8.69831 11.8921 8.69831Z" fill="#97B6CF"/></svg></span>
                                  {resetErrors.name && <p className="error-msg">{resetErrors.name}</p>}
                              </div>
                            </FormGroup>
                            <FormGroup as={Col} md={12} className="mb-4">
                              <div className={`form-group ${resetErrors?.email ? 'error' : ''}`}>
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  value={resetFormData.email}
                                  className="form-control"
                                  onChange={handleResetChange}
                                />
                                <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9333 1.77222L10.7048 6.87521C10.4916 6.98865 10.2503 7.04833 10.0048 7.04833C9.7592 7.04833 9.5179 6.98865 9.30476 6.87521L0.0666666 1.77222C0.0225076 1.94943 0.000141946 2.13073 0 2.31264V10.9771C0 11.5903 0.261887 12.1785 0.728049 12.6121C1.19421 13.0458 1.82646 13.2894 2.48571 13.2894H17.5143C18.1735 13.2894 18.8058 13.0458 19.2719 12.6121C19.7381 12.1785 20 11.5903 20 10.9771V2.31264C19.9999 2.13073 19.9775 1.94943 19.9333 1.77222Z" fill="#97B6CF"></path><path d="M10.2285 6.13954L19.5428 0.983389C19.314 0.680352 19.0103 0.432858 18.6573 0.261728C18.3043 0.0905987 17.9122 0.000838778 17.5142 0H2.4856C2.08753 0.000838778 1.6955 0.0905987 1.34249 0.261728C0.989475 0.432858 0.685807 0.680352 0.457031 0.983389L9.78084 6.13954C9.84948 6.17443 9.92644 6.19272 10.0047 6.19272C10.0829 6.19272 10.1598 6.17443 10.2285 6.13954Z" fill="#97B6CF"></path></svg></span>    
                                {resetErrors.email && <p className="error-msg">{resetErrors.email}</p>}
                              </div>
                            </FormGroup>
                            <FormGroup as={Col} md={12} className="mb-4">
                              <div className={`form-group ${resetErrors?.password ? 'error' : ''}`}>
                                <input
                                  type={passshow ? "text" : "password"}
                                  name="password"
                                  placeholder="Password"
                                  value={resetFormData.password}
                                  className="form-control"
                                  onChange={handleResetChange}
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
                                  onChange={handleResetChange}
                                />
                                <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                                <span className="pawword_img"><img src={cpassshow ? path_image + "show_p.svg" : path_image + "hide.svg"} alt="" onClick={toggleCPass} /></span>
                                {resetErrors.cpassword && <p className="error-msg">{resetErrors.cpassword}</p>}
                              </div>
                            </FormGroup>

                            <button type="submit" className="btn btn-primary save btn-filled">
                              Reset
                            </button>
                          </Row>
                        </Form>
                      </div>
                    : pharmaLoginSinup == 4 ? 
                      <div className="sunshine-form-inset">
                        <h4>Reset Your Password</h4>
                        <Form onSubmit={onSendEmail}>
                        <Row>
                            <FormGroup as={Col} md={12} className="mb-4">
                              <div className={`form-group ${addEmailClass ? 'error' : ''}`}>
                                <input
                                  type="text"
                                  name="email"
                                  placeholder="Email"
                                  value={email}
                                  className="form-control"
                                  autoComplete="off"
                                  onChange={(event) => { setEmail(event.target.value); setAddEmailClass(false) }}
                                />
                                <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9333 1.77222L10.7048 6.87521C10.4916 6.98865 10.2503 7.04833 10.0048 7.04833C9.7592 7.04833 9.5179 6.98865 9.30476 6.87521L0.0666666 1.77222C0.0225076 1.94943 0.000141946 2.13073 0 2.31264V10.9771C0 11.5903 0.261887 12.1785 0.728049 12.6121C1.19421 13.0458 1.82646 13.2894 2.48571 13.2894H17.5143C18.1735 13.2894 18.8058 13.0458 19.2719 12.6121C19.7381 12.1785 20 11.5903 20 10.9771V2.31264C19.9999 2.13073 19.9775 1.94943 19.9333 1.77222Z" fill="#97B6CF"></path><path d="M10.2285 6.13954L19.5428 0.983389C19.314 0.680352 19.0103 0.432858 18.6573 0.261728C18.3043 0.0905987 17.9122 0.000838778 17.5142 0H2.4856C2.08753 0.000838778 1.6955 0.0905987 1.34249 0.261728C0.989475 0.432858 0.685807 0.680352 0.457031 0.983389L9.78084 6.13954C9.84948 6.17443 9.92644 6.19272 10.0047 6.19272C10.0829 6.19272 10.1598 6.17443 10.2285 6.13954Z" fill="#97B6CF"></path></svg></span>    
                                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                                {successMsg && <p style={{ color: "#39CABC" }} dangerouslySetInnerHTML={{__html: successMsg}}></p>}
                              </div>
                            </FormGroup>
                            <button type="submit" className="btn btn-primary save btn-filled">
                              Send Email
                            </button>

                            <div className="forgot-details">
                              <Link onClick={(e) => naviageteToggle("login")}>Back to login</Link>
                            </div>
                          </Row>
                        </Form>
                      </div>
                    :null
                  }
                </div>
                <div className="sunshine-footer">
                  <p>Copyright MedArkive Ltd {getCurrentYear()}. Read our <a target="_blank" href="https://albert.docintel.app/privacy_policy/">Privacy Policy</a> and <a target="_blank" href="https://albert.docintel.app/terms_of_use/">Terms of Use</a></p>
                </div>
              </div>
          </Row>
        </Container>
      </div>
    </>
  );

}
export default ClinetAccount;