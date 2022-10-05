import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from '@mui/material/TextField';

// import FormField from "./FormField";


//setting the initial values
const initialValues = {
  name: "",
  age: "",
  email: "",
  password: "",
  confirmPassword: ""
};

//creating the validation schema
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("A name is required")
    .min(2, "Name must be at least 2 characters"),
  age: yup
    .number()
    .required("Please supply your age")
    .min(18, "You must be at least 18 years")
    .max(60, "You must be at most 60 years"),
  email: yup
    .string()
    .email()
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
    })
});

function Form({ onSubmit }) {
  //using useFormik 
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        type="text"
        name="name"
        placeholder="Please Enter your name"
      />
      <TextField
        label="Age"
        type="number"
        name="age"
        placeholder="Please Enter your age"
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        placeholder="Please Enter your email"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        placeholder="Please Enter your password"
      />
      <TextField
        label="Confirm Password"
        type="password"
        name="confirm-password"
        placeholder="Please Confirm your password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;