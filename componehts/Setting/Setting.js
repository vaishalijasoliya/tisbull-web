import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';
import styles from './setting.module.scss'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HttpsIcon from '@mui/icons-material/Https';
import ClassIcon from '@mui/icons-material/Class';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PaymentIcon from '@mui/icons-material/Payment';
import SmsIcon from '@mui/icons-material/Sms';
import { useRouter } from 'next/router';
const TemporaryDrawer = (props) => {

// export default function TemporaryDrawer(props) {
    // console.log(props.props.profile.userData.currentAccount.id, 'kakkakkak');
    const router = useRouter();
    var currentPath = router.pathname
    const [state, setState] = React.useState({
        // top: false,
        left: false,
        // bottom: false,
        // right: false,
    });
    //   onClick={() => {
    //     handleCloseUserMenu(),router.push({
    //         pathname: './Accountsview',
    //         query: { emailID: item.id}
    //     });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className={styles.menunewbarlist}
        >

            <Grid container className={styles.cantenar_list1002}>
                <Grid item sm={12} md={12} xs={12} className={styles.listsetingdd}>

                    {/* <div> */}
                    <Box>
                        <div className={styles.imgboxse}>
                            <img src='../../image 25.svg' />
                        </div>
                        <div>
                            <Accordion className={styles.listcomhed}>
                                <AccordionSummary
                                    style={{ marginBottom: '10px' }}
                                    className={styles.settingfast}
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><PersonOutlineIcon className={styles.personicon} />My profile and account</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button className={currentPath == '/editprofileacc' ? styles.personlist : styles.personlist2} onClick={(() => { router.push('./editprofileacc') })}><PersonOutlineIcon className={styles.jjperuser} />Personal Informations <ArrowForwardIosIcon className={styles.arronewbar} /></Button>
                                    <Button className={currentPath == '/ChangePassedit' ? styles.personlist : styles.personlist2} onClick={(() => { router.push('./ChangePassedit') })}><HttpsIcon className={styles.jjperuser} />Change Password <ArrowForwardIosIcon className={styles.arronewbar2} /></Button>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className={styles.accontbtn}>
                            <Button className={currentPath == '/Accountsview' ? styles.accontbtn22 : styles.personlist22}
                 onClick={() => {
        router.push({
                                                                        pathname: './Accountsview',
                                                                        query: { emailID:props.props.profile.userData.currentAccount.id}
                                                                    });
                                                                }}
    ><div className={styles.pandicon}  ><ClassIcon /><Typography>Accounts</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    <div className={styles.accontbtn}>
                        <Button className={currentPath == '/Support' ? styles.accontbtn22 : styles.personlist22}><div className={styles.pandicon}><HeadsetMicIcon /><Typography>Support</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    <div className={styles.accontbtn}>
                        <Button><div className={styles.pandicon}><PaymentIcon /><Typography>Payment Settings</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    <div className={styles.accontbtn}>
                        <Button><div className={styles.pandicon}><SmsIcon /><Typography>FAQ</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    {/* <div><Button><HeadsetMicIcon />Support<ArrowForwardIosIcon /></Button></div> */}
                    {/* <div><Button><PaymentIcon />Payment Settings<ArrowForwardIosIcon /></Button></div> */}
                    {/* <div><SmsIcon /><Button>FAQ<ArrowForwardIosIcon /></Button></div> */}
                </Box>
                {/* </div> */}

            </Grid>
        </Grid>
    </Box>
  );

    return (
        <Grid container className={styles.cantenar_list100}>

            <div>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button className={styles.listmenuoncc} onClick={toggleDrawer(anchor, true)}> <MenuIcon /></Button>
                        {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
            <Grid item sm={12} md={12} xs={12} className={styles.listseting}>
                <Box className={styles.listmenudh}>
                    <div className={styles.imgboxse}>
                        <img src='../../image 25.svg' />
                    </div>
                    <div>
                        <Accordion className={styles.listcomhed}>
                            <AccordionSummary
                                style={{ margin: '0px 0px 10px 0px' }}
                                className={styles.settingfast}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography><PersonOutlineIcon className={styles.personicon} />My profile and account</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button className={currentPath == '/editprofileacc' ? styles.personlist : styles.personlist2} onClick={(() => { router.push('./editprofileacc') })}><PersonOutlineIcon className={styles.jjperuser} />Personal Informations <ArrowForwardIosIcon className={styles.arronewbar} /></Button>
                                <Button className={currentPath == '/ChangePassedit' ? styles.personlist : styles.personlist2} onClick={(() => { router.push('./ChangePassedit') })}><HttpsIcon className={styles.jjperuser} />Change Password <ArrowForwardIosIcon className={styles.arronewbar2} /></Button>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className={styles.accontbtn}>
                        <Button className={currentPath == '/Accountsview' ? styles.accontbtn22 : styles.personlist22} onClick={(() => { router.push('./Accountsview') })}><div className={styles.pandicon}  ><ClassIcon /><Typography>Accounts</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    <div className={styles.accontbtn}>
                        <Button className={currentPath == '/Support' ? styles.accontbtn22 : styles.personlist22} onClick={(() => { router.push('./Support') })}><div className={styles.pandicon} ><HeadsetMicIcon /><Typography>Support</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    <div className={styles.accontbtn}>
                        <Button><div className={styles.pandicon}><PaymentIcon /><Typography>Payment Settings</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    <div className={styles.accontbtn}>
                        <Button><div className={styles.pandicon}><SmsIcon /><Typography>FAQ</Typography></div> <div className={styles.listnumlook}><KeyboardArrowRightIcon /></div></Button>
                    </div>
                    {/* <div><Button><HeadsetMicIcon />Support<ArrowForwardIosIcon /></Button></div> */}
                    {/* <div><Button><PaymentIcon />Payment Settings<ArrowForwardIosIcon /></Button></div> */}
                    {/* <div><SmsIcon /><Button>FAQ<ArrowForwardIosIcon /></Button></div> */}
                </Box>
                {/* </div> */}

            </Grid>
        </Grid>
    );
}
const mapStateToProps = (state) => ({
    profile: state.user.profile
  });
  
  const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
      dispatch({ type: Types.LOGIN, payload: data }),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);