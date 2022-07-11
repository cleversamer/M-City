import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { query, getDocs, addDoc, where } from "firebase/firestore";
import { promotionsRef } from "../firebase";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as toast from "../utils/toast";

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("The email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    try {
      const isOnTheList = await getDocs(
        query(promotionsRef, where("email", "==", values.email))
      );

      if (isOnTheList.docs.length) {
        toast.showError("sorry you are on the list already");
        setLoading(false);
        return false;
      }

      //////
      await addDoc(promotionsRef, { email: values.email });
      formik.resetForm();
      setLoading(false);
      toast.showSuccess("Congratulation !!!)");
    } catch (error) {
      toast.showError(error);
    }
  };

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress color="secondary" className="progress" />
            ) : (
              <button type="submit">Enroll</button>
            )}

            <div className="enroll_discl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
