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
import { Types } from '../../constants/actionTypes'
import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Home = (props) => {
    console.log(props.profile, 'listpfffrosps');
    const [showPasswordlist, setShowPasswordlist] = useState(false)
    const [logo, setLogo] = useState([])
    const [userid, setUserid] = useState('')
    const [usertype, setType] = useState('')
    const [listidacc,setListidacc] = useState('')

    const router = useRouter();

    useEffect(() => {
        setListidacc(router.query.emailID)
        setData()
    }, [])
    const setData = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        if(router.query.emailID == undefined ){
            var obj = {
                'id_account':props.profile.userData.currentAccount.id
            };
        }else{
            var obj = {
                'id_account':router.query.emailID
            }; 
        }
        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_VIEW, JSON.stringify(obj), headers)
        props.props.loaderRef(false)
        if (!!patternDelete && patternDelete.status == true) {
            formik.setFieldValue('ConsumerKey', patternDelete.data.consumer_key);
            formik.setFieldValue('ConsumerSecret', patternDelete.data.consumer_secret);
            formik.setFieldValue('reTypePassword', patternDelete.data.password);
            setLogo(patternDelete.data.logoUrl)
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

            'id_account': router.query.emailID,
            'consumer_key': formik.values.ConsumerKey,
            'consumer_secret': formik.values.ConsumerSecret,
            'userId': userid,
            'password': formik.values.reTypePassword,
    
            'type': usertype,
            "env": "production"
     
        }
        if(router.query.emailID == undefined ){
            var body = {
                'id_account':props.profile.userData.currentAccount.id,
                'consumer_key': formik.values.ConsumerKey,
                'consumer_secret': formik.values.ConsumerSecret,
                'userId': userid,
                'password': formik.values.reTypePassword,

                'type': usertype,
                "env": "production"
            };
        }else{
            var body = {
                'id_account':router.query.emailID,
                'consumer_key': formik.values.ConsumerKey,
                'consumer_secret': formik.values.ConsumerSecret,
                'userId': userid,
                'password': formik.values.reTypePassword,
            
                'type': usertype,
                "env": "production"
            }; 
        }
        console.log(body, 'body');

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_EDIT, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
    }

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
                <Grid item sm={12} md={5} xs={12} className={styles.cengpass2}>

                    <div className={styles.hedingdiv}>

                        <div>
                            <div className={styles.personmenu23}><Typography>Accounts</Typography></div>
                        </div>
                        <div className={styles.donebtn22}>
                       {formik.values.ConsumerKey == '' ||formik.values.ConsumerSecret == '' ||formik.values.reTypePassword == '' ? 
                       <Button disabled type='submit' className={styles.donebtnedit22} style={{color:'#E31E24'}}>Done</Button>:
                        <Button type='submit'
                        className={styles.donebtnedit}
                            onClick={()=>{onLoginPress(),router.push('./accountlist')}}
                        >Done</Button>}
                        </div>
                    </div>
                    <div className={styles.avatarbank}>
                        <Avatar
                            
                            className={styles.avatarbank2} >
<img width={45} height={40} src={logo} />
                            </Avatar>
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
                            className={styles.userinput}

                            style={{
                                margin: '0px'
                            }}
                        />
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
                        <InputLabel className={styles.leballist443}> Password</InputLabel>
                        <TextField
                            error={Boolean(formik.touched.reTypePassword && formik.errors.reTypePassword)}
                            helperText={formik.touched.reTypePassword && formik.errors.reTypePassword}
                            name="reTypePassword"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.reTypePassword}
                            placeholder='Confirm Password'
                            className={styles.userinput}
                            type={showPasswordlist ? 'text' : 'password'}
                            style={{
                                margin: '0px'
                            }}
                        />
                        <Button className={styles.menolistlogo}
                            onClick={() => setShowPasswordlist(!showPasswordlist)}>
                            {showPasswordlist ? <VisibilityIcon /> : <VisibilityOffIcon />}


                        </Button>
                        <div style={{height:'40px'}}></div>
                    </div>
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