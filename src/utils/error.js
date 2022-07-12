import { FormHelperText } from "@mui/material";

export const textErrorHelper = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});

export const selectErrorHelper = (formik, values) => {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }
  return false;
};

export const selectIsError = (formik, values) => {
  return formik.errors[values] && formik.touched[values];
};
