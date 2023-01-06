import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import Constants from '../../config/Constants';
import Dialog from '@mui/material/Dialog';
import styles from './newbatlist.module.scss'
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import Drawer from '@mui/material/Drawer';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes'
import DialogContent from '@mui/material/DialogContent';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import moment from 'moment'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar(props) {
  console.log(props, 'propsss');
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
  console.log(data,'dartmenu');
  const today = new Date();

    var handleClickOpenCom = () => {
    setCom(true);
  
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
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var data = await ApiServices.GetApiCall(ApiEndpoint.ACCOUNT_LIST, headers)
    console.log(data, 'mydataLIST');

    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        const accoyty = [];
        const csvall = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          console.log(element, 'password514');
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
  
      toast.success(accountdelete.message)
      chartloginuser()
    }
    else {
      toast.error(accountdelete.message)
    }
  }
  console.log(props,'loajajjajaj');
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
      "x-access-token": props.props.profile.token
    }
    var body = {
      request_token: token,
      id_account:props.props.profile.accountId
    }
    console.log(props,'props.profile.accountId');
    // props.props.loaderRef(true)
    var updateAccount = await ApiServices.PostApiCall(ApiEndpoint.UPDATE_ACCESS_TOKEN, JSON.stringify(body), headers)
    // props.props.loaderRef(false)
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
      onClick={() => { router.push('./accountlist') }}

      className={currentPath == '/accountlist' ? styles.borderbottum : styles.btn_pages}>
      Accounts
    </Button>,
    <Button
      onClick={() => {
        router.push({
          pathname: './pattanlist',
        });
      }}
      className={currentPath == '/pattanlist' ? styles.borderbottum : styles.btn_pages}>
      Patterns
    </Button>,
    <Button
    onClick={()=>{router.push('./AllOrder')}}
    className={currentPath == '/AllOrder' ? styles.borderbottum : styles.btn_pages}>
  
        Orders

    </Button>,];

  const [state, setState] = React.useState({
    left: false,

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
          sx={{ my: 2, display: 'block' }}
        >
          Dashboard
        </Button>
        <Button
          onClick={(() => { router.push('./accountlist') })}

          className={styles.btn_pages2}
          sx={{ my: 2, display: 'block' }}
        >
          Accounts
        </Button>
        <Button
          onClick={(() => { router.push('./pattanlist') })}
          className={styles.btn_pages2}
          sx={{ my: 2, display: 'block' }}
        >
          Patterns
        </Button>
        <Button
          className={styles.btn_pages22}
          onClick={(() => { handleClick(),router.push('./AllOrder') })}

          
          sx={{ my: 2, display: 'block' }}
        >
        Orders
        </Button>
        <Button
          className={styles.btn_pages2}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, display: 'block' }}
        >
          notification
        </Button>
        <Button
          className={styles.btn_pages2}
          onClick={(() => { router.push('./editprofileacc') })}
          sx={{ my: 2, display: 'block' }}
        >
          settings
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
              <img src='../../new logo.png' width={190}></img>
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
                </Typography>
              ))}
            </Box>
            <div className={styles.btnicon2} ><Button onClick={(() => { router.push('./editprofileacc') })}><SettingsIcon /></Button>
              {/* <Button><NotificationsNoneIcon /></Button> */}
              </div>
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
                <a className={styles.listcorsar} style={{ display: 'flex', textDecoration: 'none' }}
                onClick={handleClick}
                >
                  <div className={styles.Avatar_newbar}
                  >
                    <Avatar className={styles.btn_avtar_list}
                    >
                    <img width={30} src={props.profile.userData.logoUrl} />
                    </Avatar>
                  </div>
                  <div className={styles.user_list}>
                    <Typography>
                      {!!props.profile.userData.currentAccount ? props.profile.userData.currentAccount.user_id:'Login'}
                    </Typography>
                  </div>
                </a>
                <div>
                  <Button className={styles.alt_list_ikon}
                    onClick={handleClick}
                  >
                    <ExpandMoreIcon />
                  </Button>
                  <Dialog open={com}
                    onClose={handleCloseCom}
                    className={styles.borderredayasfor}
                    style={{
                    }}
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
                                                       </div>
                          <div>
                          </div>
                          <Divider>

                          </Divider>
                          <div><Button className={styles.cancelbtn} onClick={handleCloseCom}>Cancel</Button><img src='../../Line 17.png' /><Button className={styles.cancelbtn2} onClick={() => { accountdelete(), handleCloseCom() }}>Delete</Button></div>
                        </Box>
                  
                      </DialogContent>
                    </div>
                  </Dialog>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
          
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
                  >  <Box className={styles.listkeypedg}>
                    {data.map((item, idx) => (
                    
                      <div className={styles.listmeuend}>
                        <div>
                          <div>
                            <Button className={styles.btnnevlist} onClick={() => { setRowidlist(item.id), handleCloseUserMenu(), switchAccount() }}>
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
                        {item.type == 'zerodha' ?
                                                            <Button className={styles.listboxmass} onClick={() => {
                                                              //  setListzrothaid(item.id) 
                                                               if (item.type == 'zerodha') {
                                                                    var profile = props.props.profile;
                                                                    profile.accountId = item.id
                                                                    props.save_user_data({ user: profile });
                                                                    window.location.href = `${item.loginUrllist}`
                                                                }
                                                            }}
                                                            >{moment(today).format("MM/DD/YYYY") == moment(item.zerodha_token_update).format("MM/DD/YYYY") ?
                                                                <img width={25} height={20} src='../../Vector (19).svg' />:
                                                                <img width={25} height={25} src='../../History.svg' />
                                                                }
                                                                </Button> :
                                                            <Button disabled
                                                             className={styles.listboxmass}
                                                            >
                                                                <img width={25} height={20} src='../../Vector (18).svg' /></Button>}
                       
                        {/* {item.type == "zerodha" ?
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
                        } */}
                          <Button 
                          onClick={() => {
                                                                    handleCloseUserMenu(),router.push({
                                                                        pathname: './Accountsview',
                                                      

                                                                        query: { emailID: item.id}
                                                                    });
                                                                }}
                        
                          className={styles.loglistyy}>  <img width={21} height={19} src='../../Vector (1).svg' /></Button>
                          <Button
                          
                            onClick={() => { handleClickOpenCom(), setRowidbtn(item.id), setListuserid(item.user_id) }}
                
                            className={styles.loglistyy2}><img width={19} height={19} src='../../Vector (2).svg ' /></Button>

                        </div>
                      </div>
                      
                    ))}
</Box>
                    <Divider className={styles.devatdar} />
                    <div className={styles.listbtmnuu}>
                      <div className={styles.listaddacc}>
                        <Button onClick={(() => { router.push('./AddAccounts') })}><PersonAddIcon />Add account</Button>

                      </div>
                      {/* <div className={styles.settinglist}>
                        <Button onClick={(() => { router.push('./editprofileacc') })}><SettingsIcon />Settings</Button>
                      </div> */}
                      <div className={styles.loglist}>
                        <Button onClick={() => {
                          var profile = "";
                          props.save_user_data({ user: '' });
                          router.push("/login");
                          toast.success("Logout Successfully!");
                        }} >
                          <LogoutIcon />Logout
                        </Button>
                      </div>
                    </div>
                  </Menu>


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
