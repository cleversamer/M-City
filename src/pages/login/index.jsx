import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleSignIn } from "../../utils/auth";
import { authUser } from "../../store/user";

import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as toast from "../../utils/toast";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("The email is required"),
      password: Yup.string().required("The password is required"),
    }),
    onSubmit: (credentials) => {
      setLoading(true);
      handleSignIn(
        credentials,
        (res) => {
          dispatch(authUser(credentials));
          toast.showSuccess("Welcome!");
          navigate("/");
        },
        (err) => {
          setLoading(false);
          toast.showError(err.message);
        }
      );
    },
  });

  return (
    // <div className="container">
    <div className="signin_wrapper" style={{ margin: "100px" }}>
      <form onSubmit={formik.handleSubmit}>
        <h2>Please login</h2>
        <input
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error_label">{formik.errors.email}</div>
        ) : null}

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error_label">{formik.errors.password}</div>
        ) : null}

        {loading ? (
          <CircularProgress color="secondary" className="progress" />
        ) : (
          <button type="submit">Log in</button>
        )}
      </form>
    </div>
    // </div>
  );
};

export default SignIn;
