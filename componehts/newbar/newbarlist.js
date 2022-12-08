import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Constants from '../../config/Constants';
import Dialog from '@mui/material/Dialog';

import styles from './newbatlist.module.scss'
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ButtonGroup from '@mui/material/ButtonGroup';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import Drawer from '@mui/material/Drawer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HttpsIcon from '@mui/icons-material/Https';
import ClassIcon from '@mui/icons-material/Class';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PaymentIcon from '@mui/icons-material/Payment';
import SmsIcon from '@mui/icons-material/Sms';
// import MenuIcon from '@mui/icons-material/Menu';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes'
// import Tooltip from '@mui/material/Tooltip';
import DialogContent from '@mui/material/DialogContent';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import { useRouter } from 'next/router';
// import BorderColorIcon from '@mui/icons-mat/.erial/BorderColor';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props) {
  console.log(props.profile, 'propsss');
  const router = useRouter();
  var currentPath = router.pathname
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [datalistlogin, setDatalistlogin] = React.useState([]);
  const [rowidlist, setRowidlist] = React.useState("")
  const [rowidbtn, setRowidbtn] = React.useState('');
  const [listuserid, setListuserid] = React.useState('')
  const [idlistuse, setIdlistuse] = React.useState('')
const[dartmenu,setDatamenu] =React.useState('')
  const [com, setCom] = React.useState(false);
  console.log(dartmenu,'dartmenu');
    var handleClickOpenCom = () => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    // myprops = { advertiseMent }
  };
  const handleCloseCom = () => {
    setCom(false);
  }
  console.log(data, 'listdada');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const chartloginuser = async () => {

    // console.log(id, 'id')

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    // console.log( props.props.profile.token, 'kklist');

    var data = await ApiServices.GetApiCall(ApiEndpoint.ACCOUNT_LIST, headers)
    console.log(data, 'mydataLIST');

    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        const accoyty = [];
        const csvall = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          console.log(element.loginUrl, 'password514');
          const object = {
            id: element.id,
            user_id: element.user_id,
            type: element.type,
            logoUrl: element.logoUrl,
            loginUrllist: element.loginUrl,

          }
          console.log(object, 'object');

          accoyty.push(JSON.parse(JSON.stringify(object)))

        }

        setDatalistlogin(csvall)
        setData(accoyty)
      }
    }
  }
  console.log(props, 'login Data');
  const switchAccount = async (account) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var body1 = {
      'id_account': account.id
    }
    console.log(body1, 'accountList');

    console.log(rowidlist, 'body1');

    var data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_SWITCH, JSON.stringify(body1), headers);

    if (!!data) {
      if (data.status) {
        const newData = props.profile
        newData.userData.currentAccount = data.data
        newData.token = data.token
        newData.userData.logoUrl = data.data.logoUrl
        props.save_user_data({ user: newData });
        router.reload(window.location.pathname)
        Constants.EventEmitter.emit('change_account', router)
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong.')
    }
  }
  const accountdelete = async () => {

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var body = {
      "id_account": rowidbtn
    }

    var accountdelete = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_DELETE, JSON.stringify(body), headers)

    console.log(accountdelete, 'accountdelete');
    if (accountdelete.status == true) {
  
      toast.success('delete account')
      chartloginuser()
    }
    else {
      // setErrorShow(true)
      toast.error(accountdelete.message)
    }
    // }
  }
  React.useEffect(() => {
    getRequestToken();
  }, [router.isReady])

  const getRequestToken = () => {
    const request_token = router.query.request_token;
    console.log(request_token, 'request_token');
    if (!!request_token) {
      updateAccessToken(request_token)
    }
  }

  const updateAccessToken = async (token) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var body = {
      request_token: token,
      id_account:dartmenu
    }
    // props.loaderRef(true)
    var updateAccount = await ApiServices.PostApiCall(ApiEndpoint.UPDATE_ACCESS_TOKEN, JSON.stringify(body), headers)
    // props.loaderRef(false)
    console.log('updateAccount...', updateAccount)
  }



  React.useEffect(() => {
    if (!!props.profile && !!props.profile.token) {
      chartloginuser()
    }
  }, [])
  const pages = [
    <Button
      onClick={(() => { router.push('./dashboard') })}

      className={currentPath == '/dashboard' ? styles.borderbottum : styles.btn_pages}>
      Dashboard
    </Button>,
    <Button
      onClick={() => { router.push('./accountteyp') }}

      className={currentPath == '/accountteyp' ? styles.borderbottum : styles.btn_pages}>
      Account
    </Button>,
    <Button
      onClick={() => {
        router.push({
          pathname: './home',
          // query: { scripType: 'currency', patternType: 'custom', parent: JSON.stringify({ pathname: '/patterns', query: { type: 'currency' } }) }
          // query: { type: 'currency' }
        });
      }}
      className={currentPath == '/home' ? styles.borderbottum : styles.btn_pages}>
      Pattern
    </Button>,
    <Button
      className={styles.btn_pages}
    >
      Reports
      <KeyboardArrowDownIcon />
    </Button>,];

  const [state, setState] = React.useState({
    // top: false,
    left: false,
    // bottom: false,
    // right: false,
  });

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
      <div className={styles.ntnlistmenu}>
        <Button
          onClick={(() => { router.push('./dashboard') })}
          className={styles.btn_pages2}
          // key={page}
          // onClick={handleCloseNavMenu}
          sx={{ my: 2, display: 'block' }}
        >
          Dashboard
        </Button>
        <Button
          onClick={(() => { router.push('./accountteyp') })}

          className={styles.btn_pages2}
          // key={page}
          // onClick={handleCloseNavMenu}
          sx={{ my: 2, display: 'block' }}
        >
          Account
        </Button>
        <Button
          onClick={(() => { router.push('./home') })}
          className={styles.btn_pages2}
          // key={page}
          // onClick={handleCloseNavMenu}
          sx={{ my: 2, display: 'block' }}
        >
          Pattern
        </Button>
        <Button
          className={styles.btn_pages22}
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ my: 2, display: 'block' }}
        >
          Reports
          <ArrowForwardIosIcon />
          {/* <KeyboardArrowDownIcon /> */}
        </Button>
        <Button
          className={styles.btn_pages2}
          // key={page}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, display: 'block' }}
        >
          notification
          {/* <KeyboardArrowDownIcon /> */}
        </Button>
        <Button
          className={styles.btn_pages2}
          // key={page}
          onClick={(() => { router.push('./editprofileacc') })}
          sx={{ my: 2, display: 'block' }}
        >
          settings
          {/* <KeyboardArrowDownIcon /> */}
        </Button>
      </div>

    </Box>
  );
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100%" className={styles.cantenar_list_caps}>
        <Toolbar disableGutters>
          <Grid item sm={3} md={3} xs={3}>
            <a href='./'>
              <img src='../../TISBULL 1.png'></img>
            </a>
          </Grid>
          <Grid item sm={0} md={1} xs={0} >
          </Grid>
          <Grid item sm={9} md={8} xs={9} display={'flex'} justifyContent={'end'}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Box className={styles.listahedar} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Typography
                  className={styles.newbtnrow}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                  {/* <ButtonGroup
              // orientation="vertical"
              aria-label="vertical outlined button group"
              className={styles.newbtnrow}
            >
                  {pages}
                  </ButtonGroup> */}

                </Typography>
              ))}
            </Box>
            <div className={styles.btnicon2} ><Button onClick={(() => { router.push('./editprofileacc') })}><SettingsIcon /></Button>
              <Button><NotificationsNoneIcon /></Button></div>
            {/* <Grid item sm={4} md={2} xs={4} display={'flex'} justifyContent={'end'}> */}

            <div>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <div className={styles.listbatnmenu}>
                    <Button className={styles.listmenuoncc} onClick={toggleDrawer(anchor, true)}> <MenuIcon /></Button>
                  </div>
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
            {!!props.profile ? <Box sx={{ flexGrow: 0 }}>
              <div className={styles.newbar_list}>
                <a style={{ display: 'flex', textDecoration: 'none' }}
                // onClick={handleClick}
                >
                  <div className={styles.Avatar_newbar}
                  >
                    <Avatar className={styles.btn_avtar_list}
                      // src={rowidlist == ''? props..profile.logoUrl:props.props.profile.currentAccount.logoUrl}

                      src={props.profile.userData.logoUrl}
                    >
                    </Avatar>
                  </div>
                  <div className={styles.user_list}>
                    <Typography>
                      {props.profile.userData.currentAccount.user_id}
                    </Typography>
                  </div>
                </a>
                {/* {props.profile == '' ? "": */}

                <div>
                  <Button className={styles.alt_list_ikon}
                    //  onClick={()=>{handleClickOpenCom()}}
                    onClick={handleClick}
                  >
                    <ExpandMoreIcon />
                  </Button>
                  <Dialog open={com}
                    onClose={handleCloseCom}
                    className={styles.borderredayasfor}
                    style={{
                      // borderRadius: '30px'
                    }}
                    // fullWidth
                    maxWidth="sm"
                  >
                    <div>
                      <DialogContent className={styles.popupcantenar}>
                        <Box><div className={styles.delehedar}>
                          <Typography>Delete Account</Typography>
                        </div>
                          <Divider>

                          </Divider>
                          <div className={styles.accoparegarf}>
                            <Typography>Are you sure you want to delete {listuserid} this account?</Typography>
                              {/* <Typography className={styles.accoparegarfff}>
                             

                              </Typography> */}
                          </div>
                          <div>
                          </div>
                          <Divider>

                          </Divider>
                          <div><Button className={styles.cancelbtn} onClick={handleCloseCom}>Cancel</Button><img src='../../Line 17.png' /><Button className={styles.cancelbtn2} onClick={() => { accountdelete(), handleCloseCom() }}>Delete</Button></div>
                        </Box>
                        {/* <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} /> */}
                      </DialogContent>
                    </div>
                  </Dialog>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    // onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    {data.map((item, idx) => (
                      <div className={styles.listmeuend}>
                        <div>
                          <div>
                            <Button className={styles.btnnevlist} onClick={() => { setRowidlist(item.id), handleCloseUserMenu(), switchAccount(item) }}>
                              <div>
                                <Avatar src={item.logoUrl} />
                              </div>
                              <div><div className={styles.idname}>
                                <Typography>{item.user_id}</Typography></div><div className={styles.listtype}><Typography>{item.type}</Typography>
                                </div></div>
                            </Button>
                          </div>
                        </div>
                        <div className={styles.menulistbtn} style={{ display: 'flex', justifyContent: 'end' }}>
                        {item.type == "zerodha" ?
                          <Button      
                         onClick={() => {
                                                                    var profile = props.props.profile;
                                                                    profile.accountId = item.id
                                                                    setDatamenu(item.id)
                                                                    props.save_user_data({ user: profile });
                                                                    window.location.href = `${item.loginUrllist}`
                                                                
                                                            }}
                                                             className={styles.listboxmass}> 
                            <img width={21} height={21} src='../../History.svg' />
                          </Button>:
                          <Button disabled  onClick={() => {
                                                                    handleCloseUserMenu()
                                                                }} className={styles.listboxmass}>
                            <img width={18} height={21} src='../../Vector (18).svg' />
                          </Button>
                        }
                          <Button 
                          onClick={() => {
                                                                    handleCloseUserMenu(),router.push({
                                                                        pathname: './Accountsview',
                                                                        // pathname:       

                                                                        query: { emailID: item.id}
                                                                    });
                                                                }}
                          // onClick={()=>{handleCloseUserMenu(),setIdlistuse(item.id)}} 
                          className={styles.loglistyy}>  <img width={21} height={19} src='../../Vector (1).svg' /></Button>
                          <Button
                          
                            onClick={() => { handleClickOpenCom(), setRowidbtn(item.id), setListuserid(item.user_id) }}
                            // onClick={() => {setRowidbtn(item.id),handleClickOpenCom() }}
                            className={styles.loglistyy2}><img width={19} height={19} src='../../Vector (2).svg ' /></Button>

                        </div>
                      </div>
                    ))}
                    <Divider className={styles.devatdar} />
                    <div className={styles.listbtmnuu}>
                      <div className={styles.listaddacc}>
                        <Button onClick={(() => { router.push('./AddAccounts') })}><PersonAddIcon />Add account</Button>

                      </div>
                      <div className={styles.settinglist}>
                        <Button onClick={(() => { router.push('./editprofileacc') })}><SettingsIcon />Settings</Button>
                      </div>
                      <div className={styles.loglist}>
                        <Button onClick={() => {
                          var profile = "";
                          props.save_user_data({ user: '' });
                          router.push("/");
                          toast.success("Logout Successfully!");
                        }} >
                          <LogoutIcon />Logout
                        </Button>
                      </div>
                    </div>
                  </Menu>
                  {/* </React.Fragment> */}

                </div>
              </div>
            </Box> : ''}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
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