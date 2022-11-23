import Head from 'next/head'
import Image from 'next/image'
import styles from '../ChangePassedit/ChangePassedit.module.scss'
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@material-ui/core';
import { Avatar, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState ,useEffect} from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
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
    // console.log(  toast.error("Please Enter Correct Password"),'prodbh');

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordlist, setShowPasswordlist] = useState(false)
    const [showPasswordlistdata, setShowPasswordlistdata] = useState(false)
    const [showPasswordicon, setShowPasswordicon] = useState("yes")
    const [logo,setLogo] = useState([])
    const router = useRouter();
    // setLogo('http://198.71.53.215:3001/7aae52796c8e086b3c2eb2403.jpeg')
    useEffect(() => {
        // setData()
        // if (!!props.router && !!props.router.query && !!props.router.query.data) {
        //     setData(JSON.parse(props.router.query.data).id)
        // }
    }, [])

    const setData = async (userId) => {
        var obj = {
            "user_id": 1,
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_VIEW, JSON.stringify(obj), headers)
        props.props.loaderRef(false)
        console.log( patternDelete, 'patternDelete.data.birth_date');

        if (!!patternDelete && patternDelete.status == true) {
            
            // formik.setFieldValue('ConsumerKey', patternDelete.data.);
            // formik.setFieldValue('ConsumerSecret', patternDelete.data.email)
            // formik.setFieldValue('phone', patternDelete.data.phone_no)
            // formik.setFieldValue('date', moment(patternDelete.data.birth_date).format("MM/DD/YYYY"))
            // formik.setFieldValue('Address', patternDelete.data.address)
            // formik.setFieldValue('Gender', patternDelete.data.gender)
            // setPhonedata(patternDelete.data.phone_no)
            // setAge(patternDelete.data.gender)
            setLogo(patternDelete.data.profileUrl)
        } 
        else {
            toast.error('Something went wrong.')
        }
    }

    //   const onLoginPresslist = async () => {
    //     var body = {
    //       // 'id_user': props.userid,
    //       'current_password':formik.values.oldPassword,
    //       'new_password': formik.values.newPassword,

    //       // 'reTypePassword': formik.values.reTypePassword
    //     }
    //     console.log(body, 'body');

    //     var headers = {
    //       "Content-Type": "application/json",
    //       "x-access-token": props.profile.token
    //     }
    //     console.log(body, 'body')
    //     props.props.loaderRef(true)
    //     var data = await ApiServices.PostApiCall(ApiEndpoint.USERCHANGEPASS, JSON.stringify(body), headers);
    //     props.props.loaderRef(false)
    //     console.log(data, 'data');
    //     if (!!data) {
    //       if (data.status == true) {
    //         data.token = data.token
    //         // elistdata
    //         props.save_user_data({ user: data });
    //         toast.success("Password Changed Succesfully")
    //         // router.push('./dashboard')
    //       } 
    //       // else {
    //       //   // setErrorShow(true)
    //       //   toast.error(data.message)
    //       // }
    //     } 
    //     else {
    //       toast.error("Please Enter Correct Password")
    //     }

    //   }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const formik = useFormik({
        initialValues: {
            ConsumerKey: '',
            ConsumerSecret: '',
            reTypePassword: ''
        },
        validationSchema: Yup.object({
            ConsumerKey: Yup
                .string()
                .min(6)
                .max(255)
                .required(
                    'ConsumerKey is required'),
            ConsumerSecret: Yup
                .string()
                .min(8)
                .max(255)
                .required(
                    'Password is required'),
            reTypePassword: Yup
                .string()
                .min(8)
                .max(255)
                // .oneOf([Yup.ref('newPassword')], 'Passwords does not match')
                .required(
                    'Password is required'),
        }),
        onSubmit: async () => {
            await onLoginPresslist();
        },
    });
    return (
        <Grid container className={styles.cantenar_list}>
            <form className={styles.formcenjpasss} onSubmit={formik.handleSubmit}>
                <Grid item sm={12} md={6} xs={12} className={styles.cengpass2}>

                    <div className={styles.hedingdiv}>

                        <div>
                            <div className={styles.personmenu23}><Typography>Accounts</Typography></div>
                            {/* */}
                            {/* <div className={styles.uplodimgp2}><Typography>Update your photo and personal detalis here.</Typography></div> */}
                        </div>
                        <div className={styles.donebtn22}><Button type='submit' >Done</Button></div>
                    </div>
                    <div className={styles.avatarbank}>
                        <Avatar src={logo} className={styles.avatarbank2} />
                    </div>
                    <div>
                        <InputLabel className={styles.leballist443}>Consumer Key </InputLabel>
                        <TextField
                            error={Boolean(formik.touched.ConsumerKey && formik.errors.ConsumerKey)}
                            helperText={formik.touched.ConsumerKey && formik.errors.ConsumerKey}
                            name="ConsumerKey"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ConsumerKey}
                            placeholder='Consumer Key'
                            type={'text'}
                            // type={showPasswordlistdata ? 'text' : 'password'}
                            className={styles.userinput}

                            style={{
                                margin: '0px'
                            }}
                        />
                        {/* <Button className={styles.menolistlogo}
                            onClick={() => setShowPasswordlistdata(!showPasswordlistdata)}>
                            {showPasswordlistdata ? <VisibilityIcon /> : <VisibilityOffIcon />}


                        </Button> */}
                        <InputLabel className={styles.leballist443}>Consumer Secret</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.ConsumerSecret && formik.errors.ConsumerSecret)}
                            helperText={formik.touched.ConsumerSecret && formik.errors.ConsumerSecret}
                            name="ConsumerSecret"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.ConsumerSecret}
                            placeholder='Consumer Secret'
                            type={'text'}
                            className={styles.userinput}

                            style={{
                                margin: '0px'
                            }}
                        />

                        {/* <Button className={styles.menolistlogo}
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}


                        </Button> */}
                        <InputLabel className={styles.leballist443}> Password</InputLabel>
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
                <Grid item md={6} sm={12} sx={12}>
                    <img src='../../cengpass.svg' />
                </Grid>
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