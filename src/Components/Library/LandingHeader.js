import React, { useState, useEffect } from "react";
import { Button, Container, Form, FormGroup, Row } from "react-bootstrap";
import { Link ,useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { loader } from "../../loader";
import { ENDPOINT } from "../../axios/apiConfig";
import { postData } from "../../axios/apiHelper";
import CryptoJS from 'crypto-js';


const LandingHeader = () => {
  const navigate = useNavigate();
  const path_image = process.env.REACT_APP_ASSETS_PATH_INFORMED_DESIGN;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loginerrors, setLoginerrors] = useState("");
  const [privacyshow, setPrivacyshow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showUserNameError, setShowUserNameError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [addNameClass, setAddNameClass] = useState(false);
  const [addPasswordClass, setAddPasswordClass] = useState(false);
  const [addEmailClass, setAddEmailClass] = useState(false);
  const [passshow, setPassShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleClose = () => {
    setShow(false);
    setShowError(false);
    setShowUserNameError('');
    setShowPasswordError('');
    setLoginerrors('');
    setSuccessMsg('');
    setAddNameClass(false);
    setAddPasswordClass(false);
  }
  const handleShow = () => setShow(true);
  const SECRET_KEY = 'XkhZG4fW2t2W'; 

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

  const handleModalShow = (type) => {
    if (type == "forgot") {
      setShowModal(true);
      setShow(false)
    } 
  };

  const handleModalClose = (type) => {
    if (type == "forgot") {
      setErrorMsg("");
      setEmail("");
      setAddEmailClass(false)
      setShowModal(false);
      setShow(false);
      setShowError(false);
      setShowUserNameError('');
      setShowPasswordError('');
      setLoginerrors('');
      setSuccessMsg('');
      setAddNameClass(false);
      setAddPasswordClass(false);
    } 
  };


    // for login
    const handleLogin = async (event) => {
         
        event.preventDefault();
        if (username === "" && password === "") {
            setShowUserNameError("Please enter a valid username");
            setShowPasswordError("Please enter a valid password");
            setAddNameClass(true); 
            setAddPasswordClass(true); 
        } else if (username === "") {
          setShowUserNameError("Please enter a valid username");
          setAddNameClass(true); 
        } else if (password === "") {
          setShowPasswordError("Please enter a valid password");
          setAddPasswordClass(true); 
        } else {
          setShowError(false);
          loader("show");
          try {

            const res = await postData(ENDPOINT.LOGIN, {
              email: username,
              password: password,
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
            loader("hide");
            if (res?.data?.data?.loginCounter == 0) {
              navigate("/change-password");
            } else {
              navigate("/home");
            }
          } catch (err) {
            console.log(err);
            setLoginerrors(err?.response?.data?.message);
            loader("hide");
          }
        }
      };

    // for send email forgetpassword
    const onSendEmail = async (event) => {
        event.preventDefault();
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (email.trim() === "") {
          setErrorMsg("Please enter your email.");
          setAddEmailClass(true)
        } else if (!emailRegex.test(email)) {
          setErrorMsg("Please enter a valid email address.");
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
            setSuccessMsg(res?.data?.message);
            // setShow(false)
          } catch (err) {
            // console.log(err);
            setSuccessMsg('');
            setErrorMsg(err?.response?.data?.message);
            loader("hide");
          }
        }
      };

      const toggleState = () => {
        setPassShow(!passshow);
      };

      const rememberMeClicked = (e) => {
        setRememberMe(e.target.checked);
      };

      const clearLocalStorageExcept = () => {
        const keysToKeep = ['uname', 'pass', 'acceptedCookies']; 
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (!keysToKeep.includes(key)) {
            localStorage.removeItem(key);
          }
        }
      }

      const encryptData = async (data) => {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
        return encrypted;
      };

      const decryptData = async (encrypted) => {
        const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        return decrypted;
      };
  return (
    <>
      <div className="loader" id="custom_loader">
        <div className="loader_show">
          <span className="loader-view"> </span>
        </div>
      </div>
      <div className="header-landing" sticky="top">
        <Container>
          <Row>
            <div className="d-flex justify-content-between align-items-center">
              <div className="logo">
                <img
                  src={path_image + "informed_logo.svg"}
                  alt="Informed.pro"
                />
              </div>
              <div className="login">
                <Button className="btn-white" onClick={handleShow}>
                  Login
                </Button>
              </div>
            </div>
          </Row>
        </Container>
      </div>

      <Modal show={show}  className='login-confirm' id="download-qr" aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header >
          <Modal.Title>Login</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <div className={`form-group ${addNameClass ? 'error' : ''}`}>
                        <input
                        type="text"
                        name="email"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => {setUsername(event.target.value); setShowUserNameError(null); setAddNameClass(false); }}
                        className="form-control" />
                        <span><svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9333 1.77222L10.7048 6.87521C10.4916 6.98865 10.2503 7.04833 10.0048 7.04833C9.7592 7.04833 9.5179 6.98865 9.30476 6.87521L0.0666666 1.77222C0.0225076 1.94943 0.000141946 2.13073 0 2.31264V10.9771C0 11.5903 0.261887 12.1785 0.728049 12.6121C1.19421 13.0458 1.82646 13.2894 2.48571 13.2894H17.5143C18.1735 13.2894 18.8058 13.0458 19.2719 12.6121C19.7381 12.1785 20 11.5903 20 10.9771V2.31264C19.9999 2.13073 19.9775 1.94943 19.9333 1.77222Z" fill="#97B6CF"></path><path d="M10.2285 6.13954L19.5428 0.983389C19.314 0.680352 19.0103 0.432858 18.6573 0.261728C18.3043 0.0905987 17.9122 0.000838778 17.5142 0H2.4856C2.08753 0.000838778 1.6955 0.0905987 1.34249 0.261728C0.989475 0.432858 0.685807 0.680352 0.457031 0.983389L9.78084 6.13954C9.84948 6.17443 9.92644 6.19272 10.0047 6.19272C10.0829 6.19272 10.1598 6.17443 10.2285 6.13954Z" fill="#97B6CF"></path></svg></span> 
                        {showUserNameError && <p className="error-msg">{showUserNameError}</p>}
                    </div>
                </FormGroup>
                
                <FormGroup>
                    <div className={`form-group ${addPasswordClass ? 'error' : ''}`}>
                        <input
                        type={passshow ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {setPassword(event.target.value); setShowPasswordError(null); setAddPasswordClass(false); }}
                        className="form-control" />
                        <span><svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.625 7.5H13V5C13 2.2425 10.7575 0 7.99999 0C5.2425 0 3 2.2425 3 5V7.5H2.375C1.34167 7.5 0.5 8.34083 0.5 9.37499V18.125C0.5 19.1592 1.34167 20 2.375 20H13.625C14.6583 20 15.5 19.1592 15.5 18.125V9.37499C15.5 8.34083 14.6583 7.5 13.625 7.5ZM4.66666 5C4.66666 3.16166 6.16166 1.66667 7.99999 1.66667C9.83833 1.66667 11.3333 3.16166 11.3333 5V7.5H4.66666V5ZM8.83333 13.935V15.8333C8.83333 16.2933 8.46083 16.6667 7.99999 16.6667C7.53916 16.6667 7.16666 16.2933 7.16666 15.8333V13.935C6.67083 13.6458 6.33333 13.1142 6.33333 12.5C6.33333 11.5808 7.08083 10.8333 7.99999 10.8333C8.91916 10.8333 9.66666 11.5808 9.66666 12.5C9.66666 13.1142 9.32916 13.6458 8.83333 13.935Z" fill="#97B6CF"></path></svg></span>
                        <span class="pawword_img"><img src={passshow ? path_image + "show_p.svg" : path_image + "hide.svg"} alt="" onClick={toggleState}/></span>
                        {showPasswordError && <p className="error-msg">{showPasswordError}</p>}
                        {loginerrors && <p className="error-msg">{loginerrors}</p>}
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="form-check">
                        <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => {
                          rememberMeClicked(e);
                        }}
                        className="form-check-input"
                        id="check-remember"
                        />
                        <label className="form-check-label" for="check-remember">Remember me</label>
                    </div>
                </FormGroup>
                
              <button type="submit" className="btn btn-primary save btn-filled">
                Login
              </button>
              <div className='forgot-details'>
                <Link onClick={(e) => handleModalShow("forgot")}>Forget password?</Link>
              </div>
              
            </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModal}
        className="header-forgot"
      >
        <Modal.Header>
          <Modal.Title>Reset Your Password</Modal.Title>
          <button type="button" className="btn-close" aria-label="Close" onClick={(e) => handleModalClose("forgot")}></button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSendEmail}>
            <Form.Control
              type="text"
              placeholder="Enter your Email"
              className={`form-field  ${addEmailClass ? 'error' : ''}`}
              aria-label="Email"
              value={email}
              onChange={(event) => {setEmail(event.target.value) ;setAddEmailClass(false) }}
            />
            {errorMsg && <p>{errorMsg}</p>}
            {successMsg && <p style={{ color: "#39CABC" }}>{successMsg}</p>}
            <Button type="submit">Send Email</Button>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default LandingHeader;
