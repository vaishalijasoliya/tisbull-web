// import Head from 'next/head'
// import Image from 'next/image'
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
// import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import ReactCodeInput from "react-code-input";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';

import { toast } from 'react-toastify';
// import Tooltip from '@mui/material/Tooltip';
// import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Types } from '../../constants/actionTypes';
// ../../constants/actionTypes'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { GoogleLogin, GoogleLogout } from "react-google-login";
// import InputLabel from '@mui/material/InputLabel';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useFormik } from 'formik';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import * as Yup from 'yup';
// import TextField from '@mui/material/TextField';
// import Newbar from '../tis_admin_web/componehts/newbar/newbar';
// import Dashboard from '../tis_admin_web/componehts/dashboard/dashboard';
// export default function Home(props) {
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Home = (props) => {
  const router = useRouter();

  console.log(props.email, 'propsOtp');

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordicon, setShowPasswordicon] = useState("yes")
  const client_id =
    "233345635594-km0tlqqrv2difnjgovf2jn11sgg7117c.apps.googleusercontent.com";
  const [showLoginButton, setLoginButton] = useState(true);
  const [showLogoutButton, setLogoutButton] = useState(false);
  const [elistdata, setElistdata] = useState([])
  console.log(props.userid, 'userid');

  const [isoutField, setIsOutField] = useState(false);
  const [outField, setOutField] = useState('')

  // const onLoginPress = async () => {
  //   if (outField.length == 0) {
  //     setIsOutField(true)
  //   } else {
  //     verifyCode()
  //   }
  // }

  // const Newpass = () => {

  // const router = useRouter();
  const onLoginPress = async () => {
    var body = {
      'id_user': props.userid,
      'password': formik.values.newPassword,
      // 'reTypePassword': formik.values.reTypePassword
    }
    console.log(body, 'body');

    var headers = {
      "Content-Type": "application/json",
    }
    console.log(body, 'body')
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.USER_CRETENEWPASSWORD, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    console.log(data, 'data');
    if (!!data) {
      if (data.status == true) {
        data.token = data.token
        // elistdata
        props.save_user_data({ user: data });
        toast.success("Password Changed Succesfully")
        router.push('./login')
      } else {
        // setErrorShow(true)
        toast.error(data.message)
      }
    } else {
      toast.error('Password Not Changed Succesfully')
    }

  }
  // const Schema = Yup.object().shape({
  //   password: Yup.string().required("This field is required"),
  //   changepassword: Yup.string().when("password", {
  //     is: val => (val && val.length > 0 ? true : false),
  //     then: Yup.string().oneOf(
  //       [Yup.ref("password")],
  //       "Both password need to be the same"
  //     )
  //   })
  // });
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      reTypePassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup
            .string()
            .min(8)
            .max(255)
            .required(
                'Password is required'),
                reTypePassword: Yup
            .string()
            .min(8)
            .max(255)
            .oneOf([Yup.ref('newPassword')], 'Passwords does not match')
            .required(
                'Confirm Password is required'),
    }),
    onSubmit: async () => {
        await onLoginPress();
    },
});
  // const formik = useFormik({
  //   initialValues: {
  //     newPassword: '',
  //     reTypePassword: '',
  //     // email: '',
  //     // Name: '',
  //   },
  //   validationSchema : yup.object().shape({

  //     newPassword: yup
  //       .string()
  //       .required("Please enter your password")
  //       .min(8)
  //       // .matches(
  //         // /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  //         // "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  //       // )
  //       ,
  //       reTypePassword: yup
  //       .string()
  //       .required("Please confirm your password")
  //       .when("newPassword", {
  //         is: newPassword => (newPassword && newPassword.length > 0 ? true : false),
  //         then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
  //       })
  //   }),
    // function Form({ onSubmit }) {
    //   //using useFormik 
    //   const formik = useFormik({
    //     initialValues,
    //     validationSchema,
    //     onSubmit
    //     onLoginPress()
    //   })
  //   onSubmit: () => {
  //     onLoginPress()
  //   },
  // });

  // const FormSchema = yup.object().shape({
  //   pass: yup
  //     .string()
  //     .min(8, 'Password must be 8 characters long')
  //     .matches(/[0-9]/, 'Password requires a number')
  //     .matches(/[a-z]/, 'Password requires a lowercase letter')
  //     .matches(/[A-Z]/, 'Password requires an uppercase letter')
  //     .matches(/[^\w]/, 'Password requires a symbol'),
  //   confirm: yup
  //     .string()
  //     .oneOf([yup.ref('pass'), null], 'Must match "password" field value'),
  // });


  // const handlePinChange = outField => {
  //   setOutField(outField);
  // };

  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  return (

    <Grid container className={styles.cantenar_pegsingcantenar3}>
 <Grid item md={0} sm={12} xs={12} className={styles.bakimginpos}>
 <img
              style={{width:'100%'}}

        //  width={360}
        //  className={styles.maenloginpegimg} 
        //  src='../../Group 109.svg' 
src='../../login bg.png'
         />
      </Grid>
      <Grid item sm={12} md={5} xs={12} className={styles.listdataform}>
        <div className={styles.baglistee}></div>
        <Box className={styles.boxsinglist44}>

          <div className={styles.welcamrlist}><Typography>Set new password</Typography></div>
          <div className={styles.pleslist44}><Typography>Your new password must be different to
            previously used password.</Typography></div>
          {/* <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    > */}
          <form onSubmit={formik.handleSubmit}>

            <InputLabel className={styles.leballist44}>New Password</InputLabel>
            <TextField
              error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              name="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              placeholder='New Password'
              type="password"
              className={styles.userinput}
              // type='text'
              style={{
                margin: '0px'
              }}
            />


            <InputLabel className={styles.leballist44}>Confirm Password</InputLabel>
            <TextField
              error={Boolean(formik.touched.reTypePassword && formik.errors.reTypePassword)}
              helperText={formik.touched.reTypePassword && formik.errors.reTypePassword}
              name="reTypePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.reTypePassword}
              placeholder='Confirm Password'
              type="password"
              className={styles.userinput}
              // type='text'
              style={{
                margin: '0px'
              }}
            />
            {/* </div> */}


            <div className={styles.submitbyn}>
              <button type="submit" className={styles.singbtn} >Update  Password</button>

            </div>
          </form>
          <div className={styles.batnbacklist}>
            <Button href='./forgotpass' className={styles.backbtn}><KeyboardBackspaceIcon />Back to Forgot Password</Button>
          </div>
          {/* </Formik> */}
        </Box>
      </Grid>
      <Grid item sm={12} md={7} xs={12} style={{padding:'65px 0px 0px 0px'}} className={styles.singpeglogo}>
      <img
      style={{width:'95%'}}
      //  width={360}
        //  className={styles.maenloginpegimg} 
        //  src='../../Group 109.svg' 
src='../../login bg.png'
         />
      </Grid>
    </Grid>

  )
}
const mapStateToProps = (state) => ({
  profile: state.user.profile,
  // {console.log( state.user.profile,'profile')}
});
// {}

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)