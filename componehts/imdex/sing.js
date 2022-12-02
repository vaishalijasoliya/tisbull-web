
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState,useEffect } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
import { max } from 'moment';
// import Newbar from '../tis_admin_web/componehts/newbar/newbar';
// import Dashboard from '../tis_admin_web/componehts/dashboard/dashboard';
// export default function Home(props) {
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Home = (props) => {
    const router = useRouter();

console.log(router.query.googleId,'gvvvvv');

    // console.log(ApiEndpoint, "ApiEndpoint");

    // console.log(props, "props");

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordicon, setShowPasswordicon] = useState("yes")
    // const router = useRouter();
    const client_id =
        "233345635594-km0tlqqrv2difnjgovf2jn11sgg7117c.apps.googleusercontent.com";
    const [showLoginButton, setLoginButton] = useState(true);
    const [showLogoutButton, setLogoutButton] = useState(false);
    const [elistdata, setElistdata] = useState([])

    useEffect(() => {
        formik.setFieldValue('Name',router.query.name);
        formik.setFieldValue('username',router.query.givenName);
        formik.setFieldValue('email',router.query.listemail);

        // setData()
        // 
        // if (!!props.router && !!props.router.query && !!props.router.query.data) {
        //     setData(JSON.parse(props.router.query.data).id)UPLOAD_PROFILE
        // }
    },[])
    const loginHandler = async (res) => {
        console.log(res.Ca, 'my res');
        var body = {
          social_id: res.Ca
        }
        console.log(body,'lisrtkkk');
        
        var headers = {
          'Content-Type': 'application/json',
        };
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.SOCIAL_LOGIN, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        
        console.log(data, 'datafvbfgv');
        if (!!data) {
          
          if (data.status == true) {
            props.save_user_data({ user: data, });
            router.push('/dashboard')
          } else {
            if (data.status == false && data.message == 'Social id not found!') {
              // props.save_user_data({ user: "" });
              router.push('/sing')
            }
          }
        } else {
          toast.error('Something went wrong.');
        }
        console.log("res",);
        console.log("this is my")
        setLoginButton(false);
        setElistdata(res.profileObj)
        setLogoutButton(true);
      };
    // const loginHandler = (res) => {

    //     console.log("res",);
    //     console.log("this is my")
    //     setLoginButton(false);
    //     setElistdata(res.profileObj)
    //     setLogoutButton(true);
    // };
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
    // const router = useRouter();
    const onLoginPress = async () => {
        var body = {
            'user_name': formik.values.username,
            'password': formik.values.password,
            'email': formik.values.email,
            'name': formik.values.Name,
            'social_id':router.query.googleId
            // 'listemail':
        }
        console.log(body, 'body');

        var headers = {
            "Content-Type": "application/json",
        }
        // console.log();

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.REGISTER_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'listdata');
        if (!!data) {
            if (data.status == true) {
                data.token = data.token
                // elistdata
                props.save_user_data({ user: data });
                toast.success("Logged In Succesfully")
                router.push('./dashboard')
            } else {
                // setErrorShow(true)
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
            email: '',
            Name: '',
        },
        validationSchema: Yup.object({
            username: Yup
                .string()

                .max(255)
                .required(
                    'User name is required'),
            email: Yup
                .string()
                .max(30)
                .required('emaika'),
            Name: Yup
                .string()
                .max(30)
                .required('emaika'),
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

    // const onLoginPress = async () => {
    //     var body = {
    //       'user_name': formik.values.username,
    //       'password': formik.values.password,
    //       // 'listemail':
    //     }
    //     console.log(body, 'body');

    //     var headers = {
    //       "Content-Type": "application/json",
    //     }
    //     // console.log();

    //     props.props.loaderRef(true)
    //     var data = await ApiServices.PostApiCall(ApiEndpoint.LOGIN_USER, JSON.stringify(body), headers);
    //     props.props.loaderRef(false)
    //     console.log(data.token, 'listdata');
    //     if (!!data) {
    //       if (data.status == true) {
    //         data.token = data.token
    //         // elistdata
    //         props.save_user_data({ user: data });
    //         toast.success("Logged In Succesfully")
    //         router.push('./dashboard')
    //       } else {
    //         // setErrorShow(true)
    //         toast.error(data.message)
    //       }
    //     } else {
    //       toast.error('Something went wrong.')
    //     }
    //   }
    //   const formik = useFormik({
    //     initialValues: {
    //         // email: '',
    //         // name: '',
    //         userName: '',
    //         password: '',
    //         // policy: false
    //     },
    //     validationSchema: Yup.object({
    //         email: Yup
    //             .string()
    //             .email(
    //                 'Must be a valid email')
    //             .max(255)
    //             .required(
    //                 'Email is required'),
    //         name: Yup
    //             .string()
    //             .max(255)
    //             .required(
    //                 'Name is required'),
    //         userName: Yup
    //             .string()
    //             .max(255)
    //             .required(
    //                 'Username is required'),
    //         password: Yup
    //             .string()
    //             .max(255)
    //             .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, "please enter 1 Special character")
    //             .min(8, 'Password must be at least 8 characters')
    //             .required(
    //                 'Password is required'),
    //         policy: Yup
    //             .boolean()
    //             .oneOf(
    //                 [true],
    //                 'This field must be checked'
    //             )
    //     }),
    //     onSubmit: () => {
    //         onLoginPress()
    //     }
    // });
    const onRegisterPress = async () => {
        var body = {
            // 'user_name': formik.values.userName,
            'password': formik.values.password,
            'name': formik.values.name,
            'email': formik.values.email
        }
        console.log(formik.values.password, 'bodylist');

        var headers = {
            "Content-Type": "application/json",
        }
        props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.REGISTER_LIST, JSON.stringify(body), headers);
        props.loaderRef(false)
        console.log(data, 'liiii')
          if (!!data) {
            if (data.status) {
              data.userData.token = data.token
              props.save_user_data({ user: data.userData });
              router.push('/dashboard');
              toast.success(data.message)
            } else {
              toast.error(data.message)
            }
          } else {
            toast.error('Something went wrong.')
          }
    }

    // console.log(formik.values.name, 'bodylist');

    // const formik = useFormik({
    //     initialValues: {
    //         username: '',
    //         password: '',
    //     },
    //     validationSchema: Yup.object({
    //         username: Yup
    //             .string()

    //             .max(255)
    //             .required(
    //                 'User name is required'),
    //         password: Yup
    //             .string()
    //             .min(6)
    //             .max(255)
    //             .required(
    //                 'Password is required'),
    //     }),
    //     onSubmit: () => {
    //         onLoginPress()
    //     },
    // });


    //   console.log(elistdata,'elistdata');

    // const [values, setValues] = React.useState<State>({
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
    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword,
    //     });
    // };
    // const router = useRouter();
    // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

        <Grid container className={styles.cantenar_pegsingcantenar}>
  <Grid item md={0} sm={12} xs={12} className={styles.bakimginpos}>
        <img width={360} className={styles.maenloginpegimg} src='../../Group 109.svg' />
      </Grid>
            <Grid item sm={12} md={5} xs={12} className={styles.listdataform}>
                <div className={styles.baglistee}></div>
                <Box className={styles.boxsinglist2}>

                    <div className={styles.welcamrlist}><Typography>Create an account</Typography></div>
                    <div className={styles.pleslist2}><Typography>Let’s get started
                    </Typography></div>
                    <form onSubmit={formik.handleSubmit}>
                        <InputLabel className={styles.leballist}>Name</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.Name && formik.errors.Name)}
                            helperText={formik.touched.Name && formik.errors.Name}
                            name="Name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.Name}
                            type="text"
                            className={styles.userinput}
                            // type='text'
                            style={{
                                margin: '0px'
                            }}
                        />
                        <InputLabel className={styles.leballist}>username</InputLabel>
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
                            // type='text'
                            style={{
                                margin: '0px'
                            }}
                        />


                        <InputLabel className={styles.leballist}>Email</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            // placeholder='Email ID'
                            type="text"
                            className={styles.userinput}
                            // type='text'
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
                            lable='Password'
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
                                <Link href='./forgotpass' className={styles.linkfaragot}>Forgot password?</Link>
                            </div>
                        </div>
                        <Button type="submit" className={styles.singbtn} >Create account</Button>

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
                                    // className="google-item"
                                    clientId={client_id}
                                    onSuccess={loginHandler}
                                    onFailure={failureHandler}
                                    cookiePolicy={"single_host_origin"}
                                />
                                {/* <GoogleLogin
            clientId={client_id}
            render={(renderProps) => (
              <button
                className="btn button btn-outline"
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
              >
                <img  /> Sign Up with Google
              </button>
            )}
            onSuccess={loginHandler}
            onFailure={failureHandler}
            cookiePolicy={"single_host_origin"}
          /> */}
                            </>
                        )}
                        {/* {showLogoutButton && (
              <GoogleLogout
                clientId={client_id}
                render={(renderProps) => (
                  <button
                    className="btn button btn-outline"
                    onClick={renderProps.onClick}
                  // disabled={renderProps.disabled}
                  >
                    <img /> logout
                  </button>
                )}
                onLogoutSuccess={logoutHandler}
              ></GoogleLogout>
            )} */}
                    </div>
                    <div className={styles.alreadylist2}>
                        <Typography>
                            Don't have an account?           </Typography>
                        <a href='./sing'>Sign Up</a>
                        <Typography>
                            for free
                        </Typography>
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