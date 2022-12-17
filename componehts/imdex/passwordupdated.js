
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Types } from '../../constants/actionTypes';
import { useFormik } from 'formik';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import * as Yup from 'yup';

const Home = (props) => {
  const router = useRouter();

  console.log(props.email, 'propsOtp');

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordicon, setShowPasswordicon] = useState("yes")

  const [showLoginButton, setLoginButton] = useState(true);
  const [showLogoutButton, setLogoutButton] = useState(false);
  const [elistdata, setElistdata] = useState([])
  console.log(props.userid, 'userid');

  const [isoutField, setIsOutField] = useState(false);
  const [outField, setOutField] = useState('')


  const onLoginPress = async () => {
    var body = {
      'id_user': props.userid,
      'password': formik.values.newPassword,
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
        toast.error(data.message)
      }
    } else {
      toast.error('Password Not Changed Succesfully')
    }

  }

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
 

  return (

    <Grid container className={styles.cantenar_pegsingcantenar3}>
 <Grid item md={0} sm={12} xs={12} className={styles.bakimginpos}>
 <img
              style={{width:'100%'}}
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
src='../../login bg.png'
         />
      </Grid>
    </Grid>

  )
}
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)