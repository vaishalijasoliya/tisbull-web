
import styles from '../ChangePassedit/ChangePassedit.module.scss'
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@material-ui/core';
import { Avatar, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
// import { Types } from '../../constants/actionTypes'
import { Types } from '../../constants/actionTypes'

import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import Createpattern from '../componehts/home/createpattern';
// import Newbar from '../componehts/newbar/newbar';
// import Dashboard from '../componehts/dashboard/dashboard';
const Home = (props) => {
    console.log(props.profile.token, 'listpfffrosps');
    const [showPasswordlist, setShowPasswordlist] = useState(false)
    const [logo, setLogo] = useState([])
    const [userid, setUserid] = useState('')
    const [usertype, setType] = useState('')
    console.log(userid, 'userid');
    const router = useRouter();
console.log(props,'lisyysg');
    useEffect(() => {
        setData()
        // 
        // if (!!props.router && !!props.router.query && !!props.router.query.data) {
        //     setData(JSON.parse(props.router.query.data).id)UPLOAD_PROFILE
        // }
    }, [])
    const setData = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var obj = {
            "id_account": props.profile.userData.currentAccount.id
        }
        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_VIEW, JSON.stringify(obj), headers)
        props.props.loaderRef(false)
        console.log(patternDelete.data, 'vvvvvvv');

        if (!!patternDelete && patternDelete.status == true) {
            formik.setFieldValue('ConsumerKey', patternDelete.data.consumer_key);
            formik.setFieldValue('ConsumerSecret', patternDelete.data.consumer_secret);
            formik.setFieldValue('reTypePassword', patternDelete.data.password);
            setUserid(patternDelete.data.user_id)
            setType(patternDelete.data.type)
            //     setLogo(patternDelete.data.profileUrl)
        }
        else {
            toast.error('Something went wrong.')
        }
    }

    const onLoginPress = async () => {
        var body = {

            'id_account': props.profile.currentAccount.id,
            'consumer_key': formik.values.ConsumerKey,
            'consumer_secret': formik.values.ConsumerSecret,
            'userId': userid,
            'password': formik.values.reTypePassword,
            // 'address': formik.values.Address,
            'type': usertype,
            "env": "production"
            // 'listemail':
        }
        console.log(body, 'body');

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        // console.log(props.profile.token, 'TOKAN');

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_EDIT, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'DATA');

        console.log(data, 'onLoginPress');
        if (!!data) {
            if (data.status == true) {
                data.token = data.token
                // elistdata
                props.props.save_user_data({ user: data });
                toast.success("Successfully Updated Personal Information")
                // router.push('./dashboard')
            }
            else {
                // setErrorShow(true)
                toast.error(data.message)
            }
        }
        // else {
        //     toast.error('Something went wrong.')
        // }
    }
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
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
            onLoginPress();
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
                        <div className={styles.donebtn22}><Button type='submit'
                            onClick={onLoginPress}
                        >Done</Button></div>
                    </div>
                    <div className={styles.avatarbank}>
                        <Avatar
                            src={logo}
                            className={styles.avatarbank2} />
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
                <Grid item md={6} sm={12} xs={12}>
                    <img src='../../cengpass.svg' />
                </Grid>
            </form>

        </Grid>
    )
}
const mapStateToProps = (state) => ({
    profile: state.user.profile
  });
  
  const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);