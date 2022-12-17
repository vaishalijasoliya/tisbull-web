
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState,useEffect } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Types } from '../../constants/actionTypes';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useFormik } from 'formik';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { max } from 'moment';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Home = (props) => {
    const router = useRouter();

console.log(router.query.googleId,'gvvvvv');


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
            'password': formik.values.password,
            'email': formik.values.email,
            'social_id':router.query.googleId
        }
        console.log(body, 'body');

        var headers = {
            "Content-Type": "application/json",
        }

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.REGISTER_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'listdata');
        if (!!data) {
            if (data.status == true) {
                data.token = data.token
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
                .required('Email is required'),
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

  
  
    const onRegisterPress = async () => {
        var body = {
            'password': formik.values.password,
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

   
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

 
    return (

        <Grid container className={styles.cantenar_pegsingcantenar}>
            <Grid item sm={12} md={5} xs={12} className={styles.listdataform}>
                <div className={styles.baglistee}></div>
                <Box className={styles.boxsinglist2}>

                    <div className={styles.welcamrlist}><Typography>Create an account</Typography></div>
                    <div className={styles.pleslist2}><Typography>Let’s get started
                    </Typography></div>
                    <form onSubmit={formik.handleSubmit}>
                

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
                            className={styles.userinput22}
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
                            className={styles.passoutinput22}
                            type={showPassword ? 'text' : 'password'}
                        />
                      
                        <Button type="submit" onClick={onLoginPress} className={styles.singbtn22} >Create account</Button>

                    </form>
                    <div className={styles.borderimline22}>
                        <div className={styles.bodarleft22}></div>
                        <div className={styles.singbodar}><Typography>Or Sign Up with</Typography></div>
                        <div className={styles.bodarleft22}></div>
                    </div>
                    <div className={styles.gooleogdiv22}>
                        {showLoginButton && (
                            <>
                                <GoogleLogin
                                    className={styles.goolloginid22}
                                    // className="google-item"
                                    clientId={client_id}
                                    onSuccess={loginHandler}
                                    onFailure={failureHandler}
                                    cookiePolicy={"single_host_origin"}
                                />
                    
                            </>
                        )}
                
                    </div>
                    <div className={styles.alreadylist22}>
                        <Typography>
                        Already have an account ?        </Typography>
                        <a href='./login'>Login here</a>
                
                    </div>
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