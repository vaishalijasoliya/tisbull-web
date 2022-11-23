import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import * as React from 'react';
// import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { toast } from 'react-toastify';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import AdbIcon from '@mui/icons-material/Adb';
import styles from './newbar.module.scss'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
// import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
const pages = ['Dashboard', 'Account', 'Equity', 'Currency', 'FO'];
const settings = [];

type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string },
// ) => number {
//   return order === 'desc'
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
// }
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ResponsiveAppBar = (props) => {
  console.log(props.props, 'propsmenu');

  const router = useRouter();
  var currentPath = router.pathname
console.log(currentPath =='/dashboard','dashboard');
console.log(currentPath,'currentPath');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = React.useState([]);
  const [datalist, setDatalist] = React.useState([]);
  const [datalistlogin, setDatalistlogin] = React.useState([]);

  const [advertiseMent, setAdvertisement] = React.useState("")
  const [com, setCom] = React.useState(false);

  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    myprops = { advertiseMent }
  };
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    myprops = { advertiseMent }
  };
  const handleCloseCom = () => {
    setCom(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  var currentPath = router.pathname
  const chartloginuser = async () => {

    // console.log(id, 'id')

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    console.log(props, 'kklist');

    // props.loaderRef(true)
    //  const data = await ApiServices.GetApiCall(ApiEndpoint.USER_COUNT_LIST, headers);

    var data = await ApiServices.GetApiCall(ApiEndpoint.ACCOUNT_LIST, headers)
    // props.loaderRef(false)
    console.log(data, 'mydataLIST');

    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        const accoyty = [];
        const csvall = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          console.log(element.loginUrl, 'password514');
          // for (let index = 0; index < data.length; index++) {
          //   const element = data[index];
          //   for (let index = 0; index < data.profitChart.length; index++) {
          //     const element = data.profitChart[index][0];
          //     const elementlist = data.profitChart[index][1];
          //     date.push(elementlist)
          //     arr.push(element)
          // }
          const object = {
            id: element.user_id,
            type: element.type,
            loginUrl: element.logoUrl,
            // password: element.password,
            // type: element.type,
            // Environments: element.env,
            // consumer_key: element.consumer_key,
            // consumer_secret: element.consumer_secret,
            // id_user: element.id_user,
            // zerodha_token_update: element.zerodha_token_update
          }
          console.log(object.loginUrl, 'object');

          accoyty.push(JSON.parse(JSON.stringify(object)))
          // csvall.push(JSON.parse(JSON.stringify (element.loginUrl)))
          // accoyty.push(object)

        }

        setDatalistlogin(csvall)
        setData(accoyty)
      }
    }
  }

  // console.log(data[1].loginUrl, 'virang33');


  // console.log(props.props.profile, 'myyyydata')



  React.useEffect(() => {
    if (!!props.profile && !!props.profile.token) {
      chartloginuser()
    }
  }, [])
  // console.log(data, 'listdata33');

  // const accoyty22=[]
  // for (let index = 0; index < data.length; index++) {
  //   const element = data[index];
  //   // const accoyty22=[]
  //   // accoyty22.push(JSON.parse(JSON.stringify(element)))
  //   setDatalist(element)


  // }


  console.log(datalist.user_id, 'element22');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [state, setState] = React.useState({
    // top: false,
    left: false,
    // bottom: false,
    // right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"
      className={styles.menunewbarlist}
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
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
        {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Button>Reports</Button>
        </AccordionSummary>
        <AccordionDetails>
          <Button>virang</Button>
      
        </AccordionDetails>
      </Accordion> */}
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
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      {/* <Divider /> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
  return (
    <AppBar position="static">
      <Container maxWidth="xl" className={styles.cantenar_list_caps}>

        <Toolbar disableGutters>
          <Grid item sm={4} md={4} xs={4}>
            <div>
              <a href='./dashboard'>
                <img src='../../TISBULL 1.png'></img>
              </a>
            </div>
          </Grid>
          <Grid item sm={0} md={1} xs={0} >
          </Grid>
          <Grid item sm={8} md={7} xs={8} display={'flex'} justifyContent={'end'}>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                className={styles.menu_icom}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              // color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >

                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className={styles.page_listmenu}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <div>
              <div>
                {(['left'] as const).map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button className={styles.listmenuoncc} onClick={toggleDrawer(anchor, true)}> <MenuIcon /></Button>
                    <SwipeableDrawer
                      className={styles.calsslistbag}
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {/* //  lkhhhh */}
                      {list(anchor)}
                    </SwipeableDrawer>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* {pages.map((page) => ( */}
              <Button
                onClick={(() => { router.push('./dashboard') })}
                className={currentPath =='/dashboard'? styles.borderbottum :styles.btn_pages}
                // key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Dashboard
              </Button>
              <Button
                onClick={(() => { router.push('./accountteyp') })}
                className={currentPath =='/accountteyp'? styles.borderbottum :styles.btn_pages}
                // key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Account
              </Button>
              <Button
                onClick={(() => { router.push('./home') })}
                className={currentPath =='/home'? styles.borderbottum :styles.btn_pages}
                // key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Pattern
              </Button>
              <Button
              className={styles.btn_pages}
                // className={currentPath =='/home'? styles.borderbottum :styles.btn_pages}
                // key={page}
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
              >
                Reports
                <KeyboardArrowDownIcon />
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
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
                <MenuItem>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
            <div className={styles.btnicon2} ><Button onClick={(() => { router.push('./editprofileacc') })}><SettingsIcon /></Button>
              <Button><NotificationsNoneIcon /></Button></div>
            {/* <Grid item sm={4} md={2} xs={4} display={'flex'} justifyContent={'end'}> */}


            <Box sx={{ flexGrow: 0 }}>
              {/* {data.map((row) => ( */}
              {/* <Tooltip> */}
            
                <div className={styles.newbar_list}>
                {/* {data.map((row) => ( */ }
                < div className = { styles.Avatar_newbar } >
                <Avatar className={styles.btn_avtar_list}>
                  {/* <img src="../../Group 47124.svg" /> */}
                  <img
                  // src={data[1].loginUrl}
                  //  src={row.logoUrl}
                    />
                </Avatar>
                  </div>
            <div className={styles.user_list}>
              <Typography>
                {/* {data[1].id} */}
              </Typography>
            </div>
            <div>
              <Button className={styles.alt_list_ikon} onClick={handleOpenUserMenu}>
                <ExpandMoreIcon />
              </Button>
            </div>
            {/* // ))} */}
                </div>

            

          {/* </Tooltip> */}
          {/* ))} */}
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* {settings.map((setting) => ( */}
            {/* <MenuItem onClick={handleCloseUserMenu}> */}
            {data.map((row, listdata) => ( 
            <div className={styles.listmeuend}>
            {/* {data.map((row, listdata) => ( */}
              <div>
           
                <div>
                  <Button className={styles.btnnevlist} onClick={handleCloseUserMenu}>
                    <div>
                      {/* <img src={row.loginUrl}  /> */}
                      {/* <Avatar src={row.logoUrl} /> */}
                    </div>
                    <div><div className={styles.idname}>
                      <Typography>{row.id}</Typography></div><div className={styles.listtype}><Typography>{row.type}</Typography>
                    </div></div>
                    {/* {console.log(row.loginUrl, 'row.loginUrl')} */}
                  </Button>
                </div>

              </div>
              <div className={styles.menulistbtn} style={{display:'flex',justifyContent:'end'}}>

                <Button onClick={handleCloseUserMenu} className={styles.listboxmass}>
                  <img width={21} height={21} src='../../History.svg' />
                  {/* <Box className={styles.massscolor} sx={{ color: 'action.active' }}> */}
                  {/* <Badge color="secondary" className={styles.massscolor2} variant="dot" > */}
                  {/* <Box>
                        <AccessTimeIcon className={styles.ivonhestri}/>       */}
                  {/* </Box> */}
                  {/* </Badge> */}
                  {/* </Box> */}
                </Button>
                <Button onClick={handleCloseUserMenu} className={styles.loglistyy}>  <img width={21} height={19} src='../../Vector (1).svg' /></Button>
                <Button onClick={handleCloseUserMenu} className={styles.loglistyy2}><img width={19} height={19} src='../../Vector (2).svg ' /></Button>
              </div>
              {/* ))} */}
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
                  props.save_user_data({ user: "" });
                  router.push("/");
                  toast.success("Logout Successfully!");
                }} >
                  <LogoutIcon />Logout
                </Button>
              </div>
            </div>
            {/* <Typography textAlign="center">{setting}</Typography> */}
            {/* </MenuItem> */}

          </Menu>

        </Box>
      </Grid>
    </Toolbar>
      </Container >
    </AppBar >
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
// export default ResponsiveAppBar
