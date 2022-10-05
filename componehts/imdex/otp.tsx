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
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import ReactCodeInput from "react-code-input";

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
    // const [isoutField, setIsOutField] = useState(false);
    // const [outField, setOutField] = useState('')

    // const lihaa = async () => {
    //     if (outField.length == 0) {
    //         setIsOutField(true)
    //     } else {
    //         verifyCode()
    //     }
    // }
    // const loginHandler = (res) => {

    //     console.log("res",);
    //     console.log("this is my")
    //     setLoginButton(false);
    //     setElistdata(res.profileObj)
    //     setLogoutButton(true);
    // };
    // const failureHandler = (res) => {
    //     console.log("login failed", res);
    // };
    // const logoutHandler = (res) => {
    //     alert("logout sucessfully");
    //     setLoginButton(true);
    //     setLogoutButton(false);
    // };
    // console.log(elistdata, 'res');

    //   formik.values.username
    const [isoutField, setIsOutField] = useState(false);
    const [outField, setOutField] = useState('')

    const onLoginPress = async () => {
        if (outField.length == 0) {
            setIsOutField(true)
        } else {
            verifyCode()
        }
    }
    // console.log(outField,'body22');
    // console.log(props.r);

    const verifyCode = async () => {
        var headers = {
            "Content-Type": "application/json",
        }
        var body = {
            email: props.email,
            otp: outField
        }

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.USER_VERIFYOTP, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        // console.log(,'liostdata');

        if (!!data) {
            if (data.status == true) {
                toast.success('otp is successfully verify')
                router.push({
                    pathname: './passwordupdated',
                    query: { id_user: data.data.id }
                });
                // router.push("./passwordupdated")
            } else {
                // setErrorShow(true)
                toast.error(data.message)
            }
        } else {
            toast.error('Please enter a correct OTP')
        }
    }
    const forgotpass = async () => {
        var body = {
            "email":props.email,
        }
        console.log(body, 'body');

        var headers = {
            "Content-Type": "application/json",
        }
        // console.log();

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.USER_FORGOT_PASSWORD, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        // console.log(data.data.id, 'listdata');
        if (!!data) {
            if (data.status == true) {
                // data.token = data.token
                // elistdata
                // props.save_user_data({ user: data });
                toast.success("otp is sent successfully")
                // console.log(formik.values.email,'emaillist');
                
                // router.push({
                //     // pathname: './otp',
                //     query: {  email:formik.values.email}
                // });
                // router.push{('./otp'
                // query: { mobile: }
                // )}
            } else {
                // setErrorShow(true)
                toast.error(data.message)
            }
        } else {
            toast.error('please enter your correct email.')
        }
    }
    

    const handlePinChange = outField => {
        setOutField(outField);
    };
  
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    return (

        <Grid container className={styles.cantenar_pegsingcantenar3}>

            <Grid item sm={12} md={5} xs={12} className={styles.listdataform}>
                <div className={styles.baglistee}></div>
                <Box className={styles.boxsinglist33}>

                    <div className={styles.welcamrlist}><Typography>Verify your email</Typography></div>
                    <div className={styles.pleslist3}><Typography>Please Enter The 4 Digit Code Sent to</Typography></div>
                    <div className={styles.pleslist33}><Typography>{props.email}</Typography></div>
                    {/* <form onSubmit={formik.handleSubmit}> */}
                    <InputLabel className={styles.leballist33}>One-Time Password </InputLabel>
                    <div className={styles.otpinput}>
                        <ReactCodeInput
                            type='text'
                            fields={4}
                            className={styles.otpinput33}
                            name="otpfield"
                            onChange={handlePinChange}
                            value={outField}
                        />
                    </div>
                    {isoutField == true ? <label className={styles.otperr}>Please Enter Otp</label> : ""}

                    <div className={styles.optreset}><Typography>Didn’t get OTP ? </Typography><Link onClick={forgotpass}>Resend</Link></div>
                    <div className={styles.submitbyn31}>
                        <button type="submit" className={styles.singbtn} onClick={onLoginPress}>Reset password</button>
                    </div>
                    {/* </form> */}
                    <div className={styles.batnbacklist}>
                        <Button href='./login' className={styles.backbtn}><KeyboardBackspaceIcon />Back to Forgot Password</Button>
                    </div>
                </Box>
            </Grid>
            <Grid item md={7} sm={12} xs={12} className={styles.bakimginpos}>
                {/* <img className={styles.maenloginpegimg} src='../../Group 109.svg' /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);