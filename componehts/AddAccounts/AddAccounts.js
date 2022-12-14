
import styles from './AddAccounts.module.scss'
import Grid from '@mui/material/Grid';
import { Box, Button, LinearProgress, List, Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import { Avatar, Link } from '@mui/material';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { styled, alpha } from '@mui/material/styles';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import ApiServices from '../../config/ApiServices';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from "react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useRouter } from 'next/router';

import ApiEndpoint from '../../config/ApiEndpoint';
// import Login from '../componehts/imdex/login';
// import Newbar from '../componehts/newbar/testnewbar';
// import  Nevbarlogin  from '../componehts/imdex/nevbarlogin';

// import Dashboard from '../componehts/dashboard/dashboard';
const Root = styled('span')(
    ({ theme }) => `
                                font-size: 0;
                                position: relative;
                                display: inline-block;
                                width: 40px;
                                height: 20px;
                                margin: 10px;
                                cursor: pointer;
        
                                &.${switchUnstyledClasses.disabled} {
                                  opacity: 0.4;
                                  cursor: not-allowed;
                                }
        
                                & .${switchUnstyledClasses.track} {
                                  background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
                                  border-radius: 10px;
                                  display: block;
                                  height: 100%;
                                  width: 100%;
                                  position: absolute;
                                }
        
                                & .${switchUnstyledClasses.thumb} {
                                  display: block;
                                  width: 14px;
                                  height: 14px;
                                  top: 3px;
                                  left: 3px;
                                  border-radius: 16px;
                                  background-color: #fff;
                                  position: relative;
                                  transition: all 200ms ease;
                                }
        
                                &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
                                  background-color: ${grey[500]};
                                  box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
                                }
        
                                &.${switchUnstyledClasses.checked} {
                                  .${switchUnstyledClasses.thumb} {
                                    left: 22px;
                                    top: 3px;
                                    background-color: #fff;
                                  }
        
                                  .${switchUnstyledClasses.track} {
                                    background: ${blue[500]};
                                  }
                                }
        
                                & .${switchUnstyledClasses.input} {
                                  cursor: inherit;
                                  position: absolute;
                                  width: 100%;
                                  height: 100%;
                                  top: 0;
                                  left: 0;
                                  opacity: 0;
                                  z-index: 1;
                                  margin: 0;
                                }
                                `,
)
const grey = {
    400: '#BFC7CF',
    500: '#AAB4BE',
    600: '#6F7E8C',
};
const blue = {
    500: '#36DAB2',
};
// export default function Home(props) {
const Home = (props) => {
    const router = useRouter();

    const [checked, setChecked] = React.useState(false);
    const [swishlist, setSwishlist] = React.useState(false);
    const [accounttype, setAccounttype] = React.useState('')
    const [switchCheck, setSwitchcheck] = React.useState([])
    const [cekboxlist, setCekboxlist] = React.useState(false)
    console.log(cekboxlist, 'checked');
    console.log(accounttype, 'accounttype');

    // const switchchange = (e) => {
    //     // isChecked: !e.target.checked
    //     setChecked(e.target.checked)
    //     setSwitchcheck(e.target.checked)
    //     console.log(switchCheck, 'myvaxrlueee')
    // }

    const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };

    // const router = useRouter();
    const accountadd = async () => {
        var body = {
            'userId': formik.values.userId,
            'consumer_key': formik.values.consumer_key,
            'password': formik.values.password,
            'consumer_secret': formik.values.consumer_secret,
            'type': accounttype,
            "env": 'production'

            // 'listemail':
        }
        console.log(body, 'body');
        console.log(formik.values.consumer_key, 'liostporop');
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        // console.log();

        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADD_ACCOUNT, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'listdata55');
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        }
        else {
            toast.error('Something went wrong.')
        }
    }

    const formik = useFormik({
        initialValues: {
            userId: '',
            consumer_key: '',
            password: '',
            consumer_secret: '',
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()

                .max(255)
                .required(
                    'userId is required'),
            password: Yup
                .string()
                .max(30)
                .required('password is required'),
            consumer_key: Yup
                .string()
                .max(30)
                .required('consumer_key is required'),
            consumer_secret: Yup
                .string()
                .min(6)
                .max(255)
                .required(
                    'consumer_secret is required'),
        }),
        onSubmit: () => {
            accountadd()
        },
    });
    return (
        <Grid container className={styles.contenat_listaddacc}>
         <Button className={styles.listpattbek} style={{ color: 'black', testTransform: 'capitalize' }}
            onClick={() => {
              router.push({
                pathname: './accountlist',
                // query: { emailID: row.id,namescoka:row.script }
              });
            }}

          ><KeyboardReturnIcon />Account</Button>
            <Grid item sm={6} md={12} xs={6}>
                <div className={styles.addaclist}><Typography>Add Accounts</Typography></div>
            </Grid>
          
            <Grid item sm={12} md={6} xs={12} className={styles.listdiver}>
                <InputLabel className={styles.leballist}>Account Type </InputLabel>
                <Divider className={styles.divaydaravta}></Divider>
                <div className={styles.listdataaaco}>
                    <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha} src='../../Mask Group.svg'></Avatar></div>
                    <div className={styles.listhedingbnk}>
                        <Typography >ZERODHA </Typography>
                        <div className={styles.listapichek}>
                            <Typography>Zerodha can charge of API, please check it</Typography>
                            <Link href="#">here</Link>
                        </div>
                    </div>
                    <div className={styles.switchadd}>
                        {swishlist == true ? <SwitchUnstyled component={Root}
                            //  onChange={console.log('virang')}
                            {...label} id='switch'
                            disabled
                            // checked={row.Publication} 
                            onChange={((e) => {
                                setChecked(e.target.checked)

                                // editFAQ(e.target.checked, row.id)
                                // setSwitchcheck(e.target.checked)
                                // setIdItem(row.id,)
                                // console.log(e.target.checked, 'checkedv');
                                // console.log(row.id, 'myvalueee')
                            })}
                        /> : <SwitchUnstyled component={Root}
                            // onChange={console.log('virang')}
                            {...label} id='switch'

                            // checked={row.Publication} 
                            onChange={((e) => {
                                // setChecked('ZERODHA')
                                setChecked(e.target.checked)
                                setAccounttype('zerodha')
                                // editFAQ(e.target.checked, row.id)
                                // setSwitchcheck(e.target.checked)
                                // setIdItem(row.id,)
                                // console.log(e.target.checked, 'checkedv');
                                // console.log(row.id, 'myvalueee')
                            })}
                        />}
                    </div>
                </div>
                <Divider className={styles.divaydaravta}></Divider>
            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.listdiver2}>
                {/* <InputLabel className={styles.leballist}>Account Type </InputLabel> */}
                <Divider className={styles.divaydaravta}></Divider>
                <div className={styles.listdataaaco}>
                    <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha} src='../../Mask Group (1).svg'></Avatar></div>
                    <div className={styles.listhedingbnk}>
                        <Typography >Kotak Securities  </Typography>
                        <div className={styles.listapichek}>
                            <Typography>Kotak are providing free API for the customers.</Typography>
                            {/* <Link href="https://mui.com/material-ui/react-divider/">here</Link> */}
                        </div>
                    </div>
                    <div className={styles.switchadd}>
                        {checked == true ?
                            <SwitchUnstyled component={Root} {...label} id='switch'
                                // checked={row.Publication} 
                                disabled
                                onChange={((e) => {
                                    setSwishlist(e.target.checked)

                                    // editFAQ(e.target.checked, row.id)
                                    // setSwitchcheck(e.target.checked)
                                    // setIdItem(row.id,)
                                    // console.log(e.target.checked, 'checkedv');
                                    // console.log(row.id, 'myvalueee')
                                })}
                            /> :
                            <SwitchUnstyled component={Root} {...label} id='switch'
                                // checked={row.Publication} 
                                onChange={((e) => {
                                    setSwishlist(e.target.checked)
                                    setAccounttype('kotak')
                                    // editFAQ(e.target.checked, row.id)
                                    // setSwitchcheck(e.target.checked)
                                    // setIdItem(row.id,)
                                    // console.log(e.target.checked, 'checkedv');
                                    // console.log(row.id, 'myvalueee')
                                })}
                            />}
                    </div>
                </div>
                <Divider className={styles.divaydaravta}></Divider>
            </Grid>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Grid item sm={12} md={6} xs={12} className={styles.constomarlist}>

                <InputLabel className={styles.leballist22}>USER ID </InputLabel>
                <TextField
                    error={Boolean(formik.touched.userId && formik.errors.userId)}
                    helperText={formik.touched.userId && formik.errors.userId}
                    name="userId"
                    placeholder='USER ID '
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.userId}
                    type="text"
                    className={styles.userinput}
                    // type='text'
                    style={{
                        margin: '0px'
                    }}
                />





            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.constomarlist}>
                <InputLabel className={styles.leballist22}>Consumer Key </InputLabel>
                <TextField
                    error={Boolean(formik.touched.consumer_key && formik.errors.consumer_key)}
                    helperText={formik.touched.consumer_key && formik.errors.consumer_key}
                    name="consumer_key"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.consumer_key}
                    placeholder='Consumer Key '
                    type="text"
                    className={styles.userinput}
                    // type='text'
                    style={{
                        margin: '0px'
                    }}
                />
            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.constomarlist}>
                <InputLabel className={styles.leballist22}>Password</InputLabel>
                <TextField
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    name="password"
                    placeholder='Password'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    // placeholder='Email ID'
                    // type="text"
                    type={'password'}
                    className={styles.userinput}

                    style={{
                        margin: '0px'
                    }}
                />
            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.constomarlist}>
                <InputLabel className={styles.leballist22}>Consumer Secret</InputLabel>
                <TextField
                    error={Boolean(formik.touched.consumer_secret && formik.errors.consumer_secret)}
                    helperText={formik.touched.consumer_secret && formik.errors.consumer_secret}
                    name="consumer_secret"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.consumer_secret}
                    // lable='Password'
                    placeholder='Consumer Secret'
                    className={styles.userinput}
                    type='text'
                />
            </Grid>
            {/* </form> */}
            <Grid item sm={12} md={8} xs={12}>
                <div className={styles.typoandchek}>
                    <div>
                        <Checkbox style={{ borderRadius: '15px' }}
                            onChange={((e) => {
                                setCekboxlist(e.target.checked)
                                // setChecked('ZERODHA')
                                // setChecked(e.target.checked)
                                // editFAQ(e.target.checked)
                                // setSwitchcheck(e.target.checked)
                                // setIdItem(row.id,)
                                // console.log(e.target.checked, 'cvvvheckedv');
                                // console.log(row.id, 'myvalueee')
                            })}
                        //  defaultChecked
                        />
                    </div>
                    <div>
                        <Typography>By ticking, you are confirming that you have read,  understand and agree to  our</Typography>
                    </div>
                    <div>
                        <a href='#'> terms and conditions.</a>
                    </div>
                </div>
            </Grid>
            <Grid item sm={6} md={4} xs={6} display={'flex'} alignItems={'center'} justifyContent={'end'}>
                <div style={{padding:'30px 60px 0px 0px'}}>
                    {/* <Button className={styles.cancelbtn}>Cancel</Button> */}
                    {cekboxlist == false || formik.values.consumer_key == '' || formik.values.password  == '' || formik.values.consumer_secret == '' || formik.values.userId == '' ? 
                
                    <Button  type="submit" disabled  className={styles.donebtn22} >SAVE</Button>:<Button  type="submit"  className={styles.donebtn} onClick={accountadd}>SAVE</Button>}
                </div>
            </Grid>
        </Grid>
    )
}
export default Home
// const checkElement = async (selector: string) => {
//     while (document.querySelector(selector) === null) {
//       await new Promise(resolve => requestAnimationFrame(resolve))
//     }
//     return document.querySelector(selector);
//   };