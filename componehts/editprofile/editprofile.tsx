// import Head from 'next/head'
// import Image from 'next/image'
import styles from './editprofileacc.module.scss'
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@material-ui/core';
import { Avatar, Button } from '@mui/material';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import moment from 'moment';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import CameraAltIcon from '@mui/icons-material/CameraAlt';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
const ResponsiveAppBar = (props) => {
    // console.log(, "listmenu");
    const [phonedata, setPhonedata] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [age, setAge] = React.useState('');
    const [isoutField, setIsOutField] = useState(false);


    console.log(age, 'listage');
    useEffect(() => {
        setData(props.profile.userData.id)
        // if (!!props.router && !!props.router.query && !!props.router.query.data) {
        //     setData(JSON.parse(props.router.query.data).id)
        // }
    }, [])

    const setData = async (userId) => {
        var obj = {
            "id_user": userId
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.GET_PROFILE, JSON.stringify(obj), headers)
        props.props.loaderRef(false)
        console.log(patternDelete.data.profileUrl, 'patternDelete.data.birth_date');

        if (!!patternDelete && patternDelete.status == true) {
            
            formik.setFieldValue('username', patternDelete.data.name);
            formik.setFieldValue('email', patternDelete.data.email)
            formik.setFieldValue('phone', patternDelete.data.phone_no)
            formik.setFieldValue('date', moment(patternDelete.data.birth_date).format("MM/DD/YYYY"))
            formik.setFieldValue('Address', patternDelete.data.address)
            formik.setFieldValue('Gender', patternDelete.data.gender)
            setPhonedata(patternDelete.data.phone_no)
            setAge(patternDelete.data.gender)
        } else {
            toast.error('Something went wrong.')
        }
    }

    const onLoginPress = async () => {
        var body = {
            'name': formik.values.username,
            'email': formik.values.email,
            'phone_no': phonedata,
            'birth_date': formik.values.date,
            'address': formik.values.Address,
            'gender': age,
            // 'listemail':
        }
        console.log(body, 'body');

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        console.log(props.profile.token, 'TOKAN');

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.USER_EDIT, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'DATA');

        console.log(data, 'listdata');
        if (!!data) {
            if (data.status == true) {
                data.token = data.token
                // elistdata
                props.save_user_data({ user: data });
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
    const edituser = () => {
        if (phonedata.length < 8) {
            setIsOutField(true)
        }
        else {
            onLoginPress()
        }
    }
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    console.log(createObjectURL, 'createObjectURL');
    // const handlePinChange = moNumber => {
    //     setPhonedata(moNumber);
    // };
    const handlePinChange = phonedata => {
        setPhonedata(phonedata);
    };
    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async (event) => {
        const body = new FormData();
        body.append("file", image);
        const response = await fetch("/api/file", {
            method: "POST",
            body
        });
    };
    // constructor() {
    //     super(props);
    //     this.state = { phone: "" };
    // }
    // this.state = { phone: "" };
    console.log(gender, 'gender');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            date: '',
            Address: '',
            Gender: ''
        },
        validationSchema: Yup.object({
            // username: Yup
            //   .string()
            //   .required(
            //     'Upload images or videos is required'),
            username: Yup
                .string()
                .max(255)
                .required(
                    'Name is required'),
            email: Yup
                .string()
                .max(255)
                .required(
                    'email is required'),
            date: Yup
                .string()
                .max(255)
                .required(
                    'Birthdate is required'),
            Address: Yup
                .string()
                .required(
                    'Address is required'),
            Gender: Yup
                .string()
                .required(
                    'Duration is required'),
        }),
        onSubmit: () => {
            onLoginPress()
        },
    });
    return (
        <Grid container className={styles.cantenar_list}>
            <form onSubmit={formik.handleSubmit} className={styles.formedit}>
                <Grid item md={12} sm={12} >

                    <div className={styles.hedingdiv}>
                        <div>
                            <div className={styles.personmenu}><Typography>Personal information</Typography></div>
                            {/* */}
                            <div className={styles.uplodimgp}><Typography>Update your photo and personal detalis here.</Typography></div>
                        </div>
                        <div className={styles.donebtn}><Button type='submit' onClick={edituser}>Done</Button></div>
                    </div>
                </Grid>
                {/* <form> */}
                <Grid item md={12} sm={12} xs={12}>
                    <div className={styles.listmenuuppohot}>
                        <Avatar src={createObjectURL} className={styles.avtaruplo} />
                        <IconButton className={styles.iconbtnop} color="primary" aria-label="upload picture" component="label">

                            <input type="file" name="myImage" hidden onChange={uploadToClient} className={styles.myimmmglist} />
                            <Avatar>
                                <CameraAltIcon className={styles.cemeraicon} />
                            </Avatar>

                        </IconButton>
                    </div>
                </Grid>
                <div className={styles.inputoplist}>
                    <Grid item md={6} sm={12} xs={12}>
                        {/* <div className={styles.imputname}> */}
                        {/* <div> */}
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Name</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.username && formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            name="username"
                            className={styles.inputnamelist}
                            placeholder='Enter name '
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        //  lable='password'
                        ></TextField>
                        {/* </div> */}
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        {/* <div> */}
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Email</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            name="email"
                            className={styles.emailinput}
                            placeholder='Enter email '
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        ></TextField>
                        {/* </div> */}
                    </Grid>
                </div>
                <div className={styles.pohelistmenu}>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Phone no.</InputLabel>
                        <PhoneInput
                            className={styles.poneinput}
                            country={'us'}

                            value={phonedata}
                            onChange={handlePinChange}
                        />
                        {isoutField == true ? <span className={styles.otperr}>Please Enter Valid Mobile-Number</span> : ''}
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Date of Birth</InputLabel>
                        <TextField
                            className={styles.dataeinput}
                            error={Boolean(formik.touched.date && formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                            name="date"
                            // className={styles.emailinput}
                            // placeholder='Enter name '
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.date}
                            id="date"
                            // label="Birthday"
                            type="date"
                        // defaultValue="MM/DD/YYYY"
                        // className={classes.textField}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        />
                    </Grid>
                </div>
                <div className={styles.futtorlist}>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Address</InputLabel>
                        <TextField
                            className={styles.dataeinput}
                            error={Boolean(formik.touched.Address && formik.errors.Address)}
                            helperText={formik.touched.Address && formik.errors.Address}
                            name="Address"
                            // className={styles.emailinput}
                            placeholder='Enter Address '
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.Address}
                            // id="date"
                            // label="Birthday"
                            // type="date"
                            type='text'
                        // defaultValue="MM/DD/YYYY"
                        // className={classes.textField}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <InputLabel className={styles.leballiss} htmlFor="component-simple">Gender</InputLabel>
                        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                        {/* <Box sx={{ minWidth: 120 }}> */}
                        <FormControl className={styles.slaydarinput}>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                // defaultValue={'NDFVDFV'}
                                //   label="Age"
                                // error={Boolean(formik.touched.Gender && formik.errors.Gender)}
                                // helperText={formik.touched.Gender && formik.errors.Gender}
                                name="Gender"
                                // className={styles.emailinput}
                                // placeholder='Enter name '
                                // onBlur={formik.handleBlur}
                                // onChange={formik.handleChange}
                                // value={formik.values.Address}
                                onChange={handleChange}
                            >
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'female'}>female</MenuItem>
                                <MenuItem value={'other'}>other</MenuItem>
                            </Select>
                        </FormControl>
                        {age == '' ? <div><span className={styles.otperr}>Please Enter Valid Gender
                        </span></div> : ""}
                        {/* </Box> */}
                    </Grid>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
// export default ResponsiveAppBar;
