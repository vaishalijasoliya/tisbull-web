
import styles from './sing.module.scss'
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import ReactCodeInput from "react-code-input";
import { toast } from 'react-toastify';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Types } from '../../constants/actionTypes';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';

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
   
    const [isoutField, setIsOutField] = useState(false);
    const [outField, setOutField] = useState('')

    const onLoginPress = async () => {
        if (outField.length == 0) {
            setIsOutField(true)
        } else {
            verifyCode()
        }
    }

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

        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
                router.push({
                    pathname: './passwordupdated',
                    query: { id_user: data.data.id }
                });
            } else {
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

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.FORGOTPASS, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } else {
            toast.error('please enter your correct email.')
        }
    }
    

    const handlePinChange = outField => {
        setOutField(outField);
    };
  

    return (

        <Grid container className={styles.cantenar_pegsingcantenar3}>
 <Grid item md={0} sm={12} xs={12} className={styles.bakimginpos}>
 <img
              style={{width:'100%'}}
src='../../login bg.png'
         />      </Grid>
            <Grid item sm={12} md={5} xs={12} className={styles.listdataform}>
                <div className={styles.baglistee}></div>
                <Box className={styles.boxsinglist33}>

                    <div className={styles.welcamrlist}><Typography>Verify your email</Typography></div>
                    <div className={styles.pleslist3}><Typography>Please enter 4 digit code sent to </Typography></div>
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
                        <button type="submit" className={styles.singbtn} onClick={onLoginPress}>VERIFY</button>
                    </div>
                    {/* </form> */}
                    <div className={styles.batnbacklist}>
                        <Button href='./forgotpass' className={styles.backbtn}><KeyboardBackspaceIcon />Back to Forgot Password</Button>
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