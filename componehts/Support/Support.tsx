import styles from './Support.module.scss'
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { Avatar, Button, Typography,Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import React, { useState } from "react";
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { Divider } from '@material-ui/core';

const tabtheme = createTheme({
    palette: {
        primary: {
            main: '#009947'
        },
    },
});
// import Newbar from '../componehts/newbar/newbar';
// import Chart from '../componehts/chart/chart';
const ResponsiveAppBar = (props) => {
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(props, 'vir');
    return (
        <Grid container className={styles.cartnamelist}>
            <Grid item sm={12} md={5} xs={12} className={styles.list_home_nim}>
                <div className={styles.listheding_inl}>
                    <div className={styles.support_text}><Typography>Support</Typography></div>
                    <div><Button><Avatar className={styles.avatarimgbtn}>  <img src="../../Vector (5).svg" /></Avatar></Button></div>
                </div>
                <div className={styles.listdev_teb}>
                    {/* <TabContext value={value}> */}
                    <ThemeProvider theme={tabtheme}>
                        <TabContext value={value}  >
                            <TabList
                                TabIndicatorProps={{
                                    style: {
                                        indicatorColor: "#009947",
                                        textColor: '#009947',
                                        backgroundColor: "#009947",
                                        borderRadius: '3px',

                                    }
                                }}
                                theme={tabtheme}
                                className={styles.tebpenaimanna}
                                //  textColor="green"
                                value={value}
                                //  onChange={handleChange}
                                // indicatorColor="#009947"
                                onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="All" value="1" className={styles.summarvaurr} />
                                <Tab label="Pending" value="2" className={styles.summarvaurr} />
                                <Tab label="Completed" value="3" className={styles.summarvaurr} />
                                {/* <Tab label="Chart" value="4" className={styles.summarvaurr} /> */}
                            </TabList>
                        </TabContext>
                    </ThemeProvider>
                    {/* </TabContext> */}
                </div>
                <div>
                    <Divider></Divider>
                    <Button className={styles.heding_tobar}>
                        <div><Avatar className={styles.avtar_divlog} ><img src='../../TISBULL 1.svg'></img> </Avatar></div>
                        <div >
                            <Typography className={styles.listlog_iduser}>3235FA261</Typography>
                            <Typography className={styles.listlog_iduser2}>Issue is now resolved. Thank You.</Typography>
                        </div>
                        <div>
                            <Typography className={styles.listlog_iduser3}>12/30/2021</Typography>
                            <Typography className={styles.listlog_iduser4}>Complete</Typography>
                        </div>
                    </Button>
                    <Divider></Divider>
                </div>
                <div>
                    <Divider></Divider>
                    <Button className={styles.heding_tobar}>
                        <div><Avatar className={styles.avtar_divlog} ><img src='../../TISBULL 1.svg'></img> </Avatar></div>
                        <div >
                            <Typography className={styles.listlog_iduser}>3235FA261</Typography>
                            <Typography className={styles.listlog_iduser2}>Issue is now resolved. Thank You.</Typography>
                        </div>
                        <div>
                            <Typography className={styles.listlog_iduser3}>12/30/2021</Typography>
                            <Typography className={styles.listlog_iduser4}>Complete</Typography>
                        </div>
                    </Button>
                    <Divider></Divider>
                </div>
            </Grid>
            <Grid item md={7} sm={12} xs={12}>
                <div className={styles.style_editsupp}>
                    <div className={styles.edit_suppbtn}><Typography>Edit Support</Typography></div>
                    <div className={styles.edit_suppbtn2}><Button>Compeleted</Button></div>
                </div>
                <div className={styles.idlist_div}><Typography>#3235FA261</Typography></div>
                <div><Box className={styles.tesx_left}><Typography>Good Day how are yousdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd?</Typography></Box></div>
            </Grid>
        </Grid>
    )
}
export default ResponsiveAppBar;
// const mapStateToProps = (state) => ({
//   profile: state.user.profile
// });

// const mapDispatchToProps = (dispatch) => ({
//   save_user_data: (data) =>
//       dispatch({ type: Types.LOGIN, payload: data }),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);