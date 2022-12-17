import Head from 'next/head'
import Image from 'next/image'
import styles from './ChangePassedit.module.scss'
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@material-ui/core';
import { Avatar, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Types } from '../../constants/actionTypes'

import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import Createpattern from '../componehts/home/createpattern';
// import Newbar from '../componehts/newbar/newbar';
// import Dashboard from '../componehts/dashboard/dashboard';
const Home = (props) => {

console.log(props.props,'loghggygg');

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordlist, setShowPasswordlist] = useState(false)
  const [showPasswordlistdata, setShowPasswordlistdata] = useState(false)
  const [showPasswordicon, setShowPasswordicon] = useState("yes")
  const router = useRouter();
  const onLoginPresslist = async () => {
    var body = {
      // 'id_user': props.userid,
      'current_password':formik.values.oldPassword,
      'new_password': formik.values.newPassword,

      // 'reTypePassword': formik.values.reTypePassword
    }
    console.log(body, 'body');

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    console.log(body, 'body')
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.USERCHANGEPASS, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    console.log(data, 'data');
    // if (!!data) {
      if (data.status == true) {
        data.token = data.token
        // elistdata
        props.save_user_data({ user: data });
        toast.success("Password Changed Succesfully")
        // router.push('./dashboard')
      } 
      else {
        // setErrorShow(true)
        toast.error(data.message)
      }
    // } 
    // else {
    //   toast.error("Please Enter Correct Passwordtt")
    // }

  }
  // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  // };
//   const [values, setValues] = React.useState<State>({
//     amount: '',
//     password: '',
//     weight: '',
//     weightRange: '',
//     showPassword: false,
// });
// const handleChange =
//     (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
//         setValues({ ...values, [prop]: event.target.value });
//     };
const handleClickShowPassword = () => {
    setValues({
        ...values,
        showPassword: !values.showPassword,
    });
};
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      reTypePassword: '',
      oldPassword:''
    },
    validationSchema: Yup.object({
      oldPassword: Yup
      .string()
      .min(6)
      .max(255)
      .required(
         'old Password is required'),
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
      await onLoginPresslist();
    },
  });
  return (
    <Grid container className={styles.cantenar_list}>
      <form className={styles.formcenjpasss} onSubmit={formik.handleSubmit}>
        <Grid item sm={12} md={6} xs={12} className={styles.cengpass}>

          <div className={styles.hedingdiv}>

            <div>
              <div className={styles.personmenu2}><Typography>Change Password</Typography></div>
              {/* */}
              <div className={styles.uplodimgp2}><Typography>Update your photo and personal detalis here.</Typography></div>
            </div>
            <div className={styles.donebtn2}>
            {formik.values.oldPassword == '' ||formik.values.newPassword == '' ||formik.values.reTypePassword == '' ?
            <Button disabled type='submit' style={{color:'#E31E24'}}>Done</Button>:
            <Button type='submit' onClick={onLoginPresslist}>Done</Button>}
            </div>
          </div>
          <div>
          <InputLabel className={styles.leballist44}>Old Password</InputLabel>
            <TextField
              error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
              helperText={formik.touched.oldPassword && formik.errors.oldPassword}
              name="oldPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.oldPassword}
              placeholder='Old Password'
              type={showPasswordlistdata ? 'text' : 'password'}
              className={styles.userinput}
            
              style={{
                margin: '0px'
              }}
            />
  <Button className={styles.menolistlogo}
                onClick={() => setShowPasswordlistdata(!showPasswordlistdata)}>
                {showPasswordlistdata ? <VisibilityIcon /> : <VisibilityOffIcon />}
  
  
              </Button>
            <InputLabel className={styles.leballist44}>New Password</InputLabel>
            <TextField
              error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              name="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              placeholder='New Password'
              type={showPassword ? 'text' : 'password'}
              className={styles.userinput}
            
              style={{
                margin: '0px'
              }}
            />
           
           <Button className={styles.menolistlogo}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
  
  
              </Button>
            <InputLabel className={styles.leballist44}>Confirm Password</InputLabel>
            <TextField
              error={Boolean(formik.touched.reTypePassword && formik.errors.reTypePassword)}
              helperText={formik.touched.reTypePassword && formik.errors.reTypePassword}
              name="reTypePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.reTypePassword}
              placeholder='Confirm Password'
              // type="password"
              className={styles.userinput}
              type={showPasswordlist ? 'text' : 'password'}
              // type='text'
              style={{
                margin: '0px'
              }}
            />
            <Button className={styles.menolistlogo}
                onClick={() => setShowPasswordlist(!showPasswordlist)}>
                {showPasswordlist ? <VisibilityIcon /> : <VisibilityOffIcon />}
  
  
              </Button>
          </div>
        </Grid>
        {/* <Grid item md={6} sm={12} sx={12}>
          <img src='../../cengpass.svg' />
        </Grid> */}
      </form>

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