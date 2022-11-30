import Head from 'next/head'
import Image from 'next/image'
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Types } from '../../constants/actionTypes';
// ../../constants/actionTypes'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { GoogleLogin, GoogleLogout } from "react-google-login";
// import InputLabel from '@mui/material/InputLabel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useFormik } from 'formik';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
// import Newbar from '../tis_admin_web/componehts/newbar/newbar';
// import Dashboard from '../tis_admin_web/componehts/dashboard/dashboard';
// export default function Home(props) {
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

    //   formik.values.username
    const onLoginPress = async () => {
        var body = {
            "email": formik.values.email,
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
                console.log(formik.values.email, 'emaillist');

                router.push({
                    pathname: './otp',
                    query: { email: formik.values.email }
                });
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

    const formik = useFormik({
        initialValues: {
            email: '',
            //   password: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()

                .max(255)
                .required(
                    'User name is required'),
            //   password: Yup
            //     .string()
            //     .min(6)
            //     .max(255)
            //     .required(
            //       'Password is required'),
        }),
        onSubmit: () => {
            onLoginPress()
        },
    });


    //   console.log(elistdata,'elistdata');

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    // const handleChange =
    //     (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //         setValues({ ...values, [prop]: event.target.value });
    //     };
    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword,
    //     });
    // };
    // const router = useRouter();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
    return (

        <Grid container className={styles.cantenar_pegsingcantenar3}>
            <Grid item md={0} sm={12} xs={12} className={styles.bakimginpos}>
                <img  width={360} className={styles.maenloginpegimg} src='../../Group 109.svg' />
            </Grid>
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
                            // placeholder='Email ID'
                            type="text"
                            //  {...register('email')}
                            placeholder='Enter your email'
                            className={styles.userinput}
                            // type='text'
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
                </Box>
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