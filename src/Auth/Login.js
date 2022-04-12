import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ExportApi from "../Api/ExportApi";
const Login = (props) => {
  const [err, setErr] = useState(false);
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
          // console.log(resp)
          if (resp.data) {
            if (resp.data.code == 200) {
              localStorage.setItem("Token", resp.data.data);
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
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}/>
      {formik.touched.email && formik.errors.email ? (
        <div style={{ color: "red" }}>{formik.errors.email}</div>
      ) : null}
      <label htmlFor="firstName">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}  />
      {formik.touched.password && formik.errors.password ? (
        <div style={{ color: "red" }}>{formik.errors.password}</div>
      ) : null}
    <p style={{color:"red"}}>  {err?err:null}</p>
      
      <button type="submit">Submit</button>
    </form>
  );
};
export default Login;
