import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [err, setErr] = useState(false);
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(6, "Must be 7 characters or less")
        .required("Enter your password"),
      email: Yup.string().email("Invalid email address").required("Enter your email"),
    }),
    onSubmit: (values) => {
      ExportApi.UserLogin(values.email, values.password)
        .then((resp) => {
          //  console.log(resp)
          if (resp.data) {
            if (resp.data.code == 200) {
              localStorage.setItem("Token", resp.data.data);
              localStorage.setItem("username",values.email );
              navigate("/webinar/dashboard");
              props.active(false);
              
            } else if(resp.data.code==404) {
              setErr(true)
              setErr(resp.data.message)
              props.active(true);
            }
            // console.log(err);
          }
        })
        .catch((err) => console.log(err));
    },
  });
	// useEffect(() => {
	//   setToken(localStorage.getItem("Token"));
	//   setUsernameget(localStorage.getItem("username"));
	//   if (token == null || token == undefined) {
	// 	navigate("/webinar");
	// 	// alert("hello1")
	//   }
	// }, [localStorage.getItem("Token"), token]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <center>
         <h3>Login</h3>
      </center>
<hr/>
       <Form.Group className="mb-3">
    <Form.Label>Email address</Form.Label>
    <Form.Control  name="email" onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email} type="email" placeholder="name@example.com" />
         {formik.touched.email && formik.errors.email ? (
        <div style={{ color: "red" }}>{formik.errors.email}</div>
      ) : null} 
    <p style={{color:"red"}}>  {err?err:null}</p>
 
     
    <Form.Label>Password</Form.Label>
    <Form.Control
       id="password"
       name="password"
       type="password"
       onChange={formik.handleChange}
       onBlur={formik.handleBlur}
       value={formik.values.password}
       />
          {formik.touched.password && formik.errors.password ? (
        <div style={{ color: "red" }}>{formik.errors.password}</div>
      ) : null}
    <p style={{color:"red"}}>  {err?err:null}</p>
  </Form.Group>
      
      <Button type="submit">Submit</Button>
    </form>
  );
};
export default Login;
