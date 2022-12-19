
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Types } from '../../constants/actionTypes';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useFormik } from 'formik';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Home = (props) => {

  console.log(props, "ApiEndpoint");


  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordicon, setShowPasswordicon] = useState("yes")
  const router = useRouter();
  const client_id =
    "233345635594-km0tlqqrv2difnjgovf2jn11sgg7117c.apps.googleusercontent.com";
  const [showLoginButton, setLoginButton] = useState(true);
  const [showLogoutButton, setLogoutButton] = useState(false);
  const [elistdata, setElistdata] = useState([])

  const loginHandler = async (res) => {
    var body = {
      social_id: res.Ca
    }

    var headers = {
      'Content-Type': 'application/json',
    };
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.SOCIAL_LOGIN, JSON.stringify(body), headers);
    props.props.loaderRef(false)

    console.log(data, 'datafvbfgv');
    if (!!data) {
      data.token = data.token;
      if (data.status == true) {
        props.save_user_data({ user: data });
        router.push('/dashboard')
      } else {
        if (data.status == false && data.message == 'Social id not found!') {
 
          router.push({
            pathname: './sing',
            query: { listemail: res.kv.Wv, givenName: res.kv.wZ, name: res.kv.Af,googleId:res.profileObj.googleId}
          })
       
        }
      }
    } else {
      toast.error('Something went wrong.');
    }
    console.log("this is my")
    setLoginButton(false);
    setElistdata(res.profileObj)
    setLogoutButton(true);
  };
  const failureHandler = () => {
    // console.log("redddddds",res);
  };

  const onLoginPress = async () => {
    var body = {
      'user_name': formik.values.username,
      'password': formik.values.password,
    }
    console.log(body, 'body');

    var headers = {
      "Content-Type": "application/json",
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.LOGIN_USER, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    console.log(data, 'listdatavvvvv');
    if (!!data) {
      if (data.status == true) {
        data.token = data.token
        data.userData.currentAccount = data.userData.account[0];
        
console.log(data,'loginData');
        props.save_user_data({ user: data });
        toast.success("Logged In Succesfully")
        router.push('./dashboard')
      
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong.')
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup
        .string()

        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .min(6)
        .max(255)
        .required(
          'Password is required'),
    }),
    onSubmit: () => {
      onLoginPress()
    },
  });

  return (

    <Grid container className={styles.cantenar_pegsingcantenar}>
      <Grid item md={0} sm={12} xs={12} className={styles.bakimginpos}>
        <img
              style={{width:'100%'}}
src='../../login bg.png'
         />
      </Grid>
      <Grid item sm={12} md={5} xs={12} className={styles.listdataform}>
        <div className={styles.baglistee}></div>
        <Box className={styles.boxsinglist}>

          <div className={styles.welcamrlist}><Typography>Welcome back</Typography></div>
          <div className={styles.pleslist}><Typography>Welcome back! Please enter your detalis.</Typography></div>
          <form onSubmit={formik.handleSubmit}>
            <InputLabel className={styles.leballist}>Email</InputLabel>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder='Email ID'
              type="text"
              className={styles.userinput}
              style={{
                margin: '0px'
              }}
            />
            <InputLabel className={styles.leballist2}>Password</InputLabel>
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder='Confirm Password'
              className={styles.passoutinput}
              type={showPassword ? 'text' : 'password'}
            />
            <div className={styles.fargotpasslist}>
              <div className={styles.btncekpass}>
                <Button className={styles.menolistlogo}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}


                </Button>
                <Typography>Remember me</Typography>
              </div>
              <div className={styles.forgotlistmenu}>
                <Link href='./forgotpassword' className={styles.linkfaragot}>Forgot password?</Link>
              </div>
            </div>
            <button type="submit" className={styles.singbtn} >Log in</button>

          </form>
          <div className={styles.borderimline}>
            <div className={styles.bodarleft}></div>
            <div className={styles.singbodar}><Typography>Or Sign Up with</Typography></div>
            <div className={styles.bodarleft}></div>
          </div>
          <div className={styles.gooleogdiv}>
            {showLoginButton && (
              <>
                <GoogleLogin
                  className={styles.goolloginid}
                  clientId={client_id}
                  onSuccess={loginHandler}
                  onFailure={failureHandler}
                  cookiePolicy={"single_host_origin"}
                />
                
              </>
            )}
           
          </div>
          <div className={styles.alreadylist}>
            <Typography>
              Don't have an account?           </Typography>
            <a href='./singup'>Sign Up</a>
            <Typography>
              for free
            </Typography>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
