
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
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

    console.log(ApiEndpoint, "ApiEndpoint");

    console.log(props, "props");

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordicon, setShowPasswordicon] = useState("yes")
    const router = useRouter();
    const client_id =
        "233345635594-km0tlqqrv2difnjgovf2jn11sgg7117c.apps.googleusercontent.com";
    const [showLoginButton, setLoginButton] = useState(true);
    const [showLogoutButton, setLogoutButton] = useState(false);
    const [elistdata, setElistdata] = useState([])
    const loginHandler = (res) => {

        console.log("res",);
        console.log("this is my")
        setLoginButton(false);
        setElistdata(res.profileObj)
        setLogoutButton(true);
    };
    const failureHandler = (res) => {
        console.log("login failed", res);
    };
    const logoutHandler = (res) => {
        alert("logout sucessfully");
        setLoginButton(true);
        setLogoutButton(false);
    };
    console.log(elistdata, 'res');

    const onLoginPress = async () => {
        var body = {
            "email": formik.values.email,
        }
        console.log(body, 'body');

        var headers = {
            "Content-Type": "application/json",
        }

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.USER_FORGOT_PASSWORD, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                toast.success("otp is sent successfully")
                console.log(formik.values.email, 'emaillist');

                router.push({
                    pathname: './otp',
                    query: { email: formik.values.email }
                });
          
            } else {
                toast.error(data.message)
            }
        } else {
            toast.error('please enter your correct email.')
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()

                .max(255)
                .required(
                    'Email is required'),
        }),
        onSubmit: () => {
            onLoginPress()
        },
    });
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (

        <Grid container className={styles.cantenar_pegsingcantenar3}>
            <Grid item sm={12} md={5} xs={12} className={styles.listdataform}>
                <div className={styles.baglistee}></div>
                <Box className={styles.boxsinglist3}>

                    <div className={styles.welcamrlist36}><Typography>Forget your password?</Typography></div>
                    <div className={styles.pleslist3}><Typography>No Worries, we'll send you reset instructions.</Typography></div>
                    <form onSubmit={formik.handleSubmit}>
                        <InputLabel className={styles.leballist36}>Email</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            type="text"
                            placeholder='Enter your email'
                            className={styles.userinput}
                            style={{
                                margin: '0px'
                            }}
                        />


                        <div className={styles.submitbyn}>
                            <button type="submit" className={styles.singbtn} >Reset password</button>
                        </div>
                    </form>
                    <div className={styles.batnbacklist}>
                        <Button href='./login' className={styles.backbtn}><KeyboardBackspaceIcon />Back to login</Button>
                    </div>
                    <div style={{height:'62px'}}></div>
                </Box>
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