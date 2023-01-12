
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
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ApiEndpoint from '../../config/ApiEndpoint';
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
    500: '#009947',
};
// export default function Home(props) {
const Home = (props) => {
    const router = useRouter();

    const [checked, setChecked] = React.useState(false);
    const [swishlist, setSwishlist] = React.useState(false);
    const [accounttype, setAccounttype] = React.useState('')
    const [switchCheck, setSwitchcheck] = React.useState([])
    const [cekboxlist, setCekboxlist] = React.useState(false)
    const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };
    const [age, setAge] = React.useState('');
    console.log(age, 'ageage');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    // const router = useRouter();
    const accountadd = async () => {
        var body = {
            'userId': formik.values.userId,
            'consumer_key': formik.values.consumer_key,
            'password': formik.values.password,
            'consumer_secret': formik.values.consumer_secret,
            'type': age,
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
                router.push('/accountlist');
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
                    'User Id is required'),
            password: Yup
                .string()
                .max(30)
                .required('Password is required'),
            consumer_key: Yup
                .string()
                .min(10)
                .max(30)
                .required('Consumer key is required'),
            consumer_secret: Yup
                .string()
                .min(10)
                .max(255)
                .required(
                    'Consumer Secret is required'),
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
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    className={styles.selectdatalistsd}
                    //   label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={'zerodha'}>       <div style={{display:'flex',alignItems:'center'}}>            <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha} src='../../Mask Group.svg'></Avatar></div>
                        <Typography className={styles.listzerodha} >ZERODHA </Typography></div> </MenuItem>
                    <MenuItem value={'kotak'}>           <div style={{display:'flex',alignItems:'center'}}>             <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha} src='../../Mask Group (1).svg'></Avatar></div>
                        <Typography className={styles.listzerodha} >Kotak Securities  </Typography>
                        </div>
                    </MenuItem>
                    <MenuItem value={30}>  <div style={{display:'flex',alignItems:'center'}}>    <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha22} src='../../angel logo 1.svg'></Avatar></div>
                        <Typography className={styles.listzerodha} > Angel One</Typography>
                        </div>
                    </MenuItem>
                    <MenuItem value={40}> <div style={{display:'flex',alignItems:'center'}}>     <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha22} src='../../upstox 1.svg'></Avatar></div>
                        <Typography className={styles.listzerodha} >Upstox</Typography>
                        </div>
                    </MenuItem>
                    <MenuItem value={40}> <div style={{display:'flex',alignItems:'center'}}>     <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha22} src='../../5 paisa logo 1.svg'></Avatar></div>
                        <Typography className={styles.listzerodha} >5paisa</Typography>
                        </div>
                    </MenuItem>
                </Select>
                <div className={styles.listapichek}>
                            <Typography>{age} can charge of API, please check it</Typography>
                            <Link href="#">here</Link>
                        </div>
                {/* <Divider className={styles.divaydaravta}></Divider>5 paisa logo 1 */}
                {/* <div className={styles.listdataaaco}>
                    <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha} src='../../Mask Group.svg'></Avatar></div>
                    <div className={styles.listhedingbnk22}>
                        <Typography >ZERODHA </Typography>
                        <div className={styles.listapichek}>
                            <Typography>Zerodha can charge of API, please check it</Typography>
                            <Link href="#">here</Link>
                        </div>
                    </div>
                    <div className={styles.switchadd}> */}

                {/* {swishlist == true ? <SwitchUnstyled component={Root}
                            {...label} id='switch'
                            disabled
                            onChange={((e) => {
                                setChecked(e.target.checked)
                            })}
                        /> : <SwitchUnstyled component={Root}

                            {...label} id='switch'
                            onChange={((e) => {
                                setChecked(e.target.checked)
                                setAccounttype('zerodha')
                            })}
                        />} */}
                {/* </div> */}
                {/* </div> */}
                {/* <Divider className={styles.divaydaravta}></Divider> */}
            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.listdiver2}>
                {/* <Divider className={styles.divaydaravta}></Divider>
                <div className={styles.listdataaaco}>
                    <div className={styles.listofavtar}><Avatar className={styles.avatarzerotha} src='../../Mask Group (1).svg'></Avatar></div>
                    <div className={styles.listhedingbnk}>
                        <Typography >Kotak Securities  </Typography>
                        <div className={styles.listapichek}>
                            <Typography>Kotak are providing free API for the customers.</Typography>
                        </div>
                    </div>
                    <div className={styles.switchadd}>
                        {checked == true ?
                            <SwitchUnstyled component={Root} {...label} id='switch'
                                disabled
                                onChange={((e) => {
                                    setSwishlist(e.target.checked)
                                })}
                            /> :
                            <SwitchUnstyled component={Root} {...label} id='switch'
                                onChange={((e) => {
                                    setSwishlist(e.target.checked)
                                    setAccounttype('kotak')
                                })}
                            />}
                    </div>
                </div>
                <Divider className={styles.divaydaravta}></Divider> */}
            </Grid>
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
                    style={{
                        margin: '0px'
                    }}
                />
            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.constomarlist2}>
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
                    type={'password'}
                    className={styles.userinput}

                    style={{
                        margin: '0px'
                    }}
                />
            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.constomarlist2}>
                <InputLabel className={styles.leballist22}>Consumer Secret</InputLabel>
                <TextField
                    error={Boolean(formik.touched.consumer_secret && formik.errors.consumer_secret)}
                    helperText={formik.touched.consumer_secret && formik.errors.consumer_secret}
                    name="consumer_secret"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.consumer_secret}
                    placeholder='Consumer Secret'
                    className={styles.userinput}
                    type='text'
                />
            </Grid>
            {/* </form> */}
            <Grid item sm={12} md={9} xs={12}>
                <div className={styles.typoandchek}>
                    <div>
                        <Checkbox style={{ borderRadius: '15px' }}
                            onChange={((e) => {
                                setCekboxlist(e.target.checked)
                            })}
                        />
                    </div>
                    <div>
                        <Typography>By ticking, you are confirming that you have read,  understand and agree to  our</Typography>
                    </div>
                    <div>
                        <a className={styles.listterms} href='#'> terms and conditions.</a>
                    </div>
                </div>
            </Grid>
            <Grid item sm={6} md={3} xs={6} display={'flex'} alignItems={'center'} justifyContent={'end'}>
                <div style={{ padding: '30px 0px 0px 0px' }}>
                    {cekboxlist == false || formik.values.consumer_key == '' || formik.values.password == '' || formik.values.consumer_secret == '' || formik.values.userId == '' || age =='' ?

                        <Button type="submit" disabled className={styles.donebtn22} >SAVE</Button> : <Button type="submit" className={styles.donebtn} onClick={accountadd}>SAVE</Button>}
                </div>
            </Grid>
        </Grid>
    )
}
export default Home