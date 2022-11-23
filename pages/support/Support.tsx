import * as React from 'react';
import { Card } from "react-bootstrap";
import SupportList from './SupportList'
import Msg from './msgindex';
import BasicTabs from '../../pages/support/supporttab'
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import moment from 'moment'
import Avatar from '@mui/material/Avatar';
import Btnsearch from '../support/searchbtn'
import { SupportContextProvider } from "../../context/SupportContext";
import style from '../../styles/support.module.css'
//import './Support.scss'
import Grid from '@mui/material/Grid';
import { Box, Button, Typography, TableFooter, useTheme } from '@mui/material';

// import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: Number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function tabProps(index: Number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Support = (props: any) => {

  const [supportListData, setSupportListData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)
  const [resData, setResData] = React.useState('')
  const [userData, setUserData] = React.useState('')
  console.log(props, "myprops")
  const [value, setValue] = React.useState(0);
  const [valueTab, setValueTab] = React.useState(0);
  const [customers, setCustomer] = React.useState([]);
  const [advertiseMent, setAdvertisement] = React.useState("")
  const [search, setSearch] = React.useState(false);
  console.log(search, "ssss")

  // var handleClickOpenCom = (myprops) => {
  //   setSearch(true);
  //   // console.log(advertiseMent, startDate, endDate, image, 'hello data')
  //   myprops = { advertiseMent }
  // };
  // const handleCloseCom = () => {
  //   setSearch(false);
  // };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };


  const handleClick = (id: string, data) => {
    // setActiveSupportId(id)
    // setActiveSupportObject(data)
    setUserData(data)
    viewSupportMsg(id)

  }

  React.useEffect(() => {
    getSupportList()
  }, [])


  const viewSupportMsg = async (id) => {

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    var body = {
      id_support: id
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.VIEW_SUPPORT_MSG, JSON.stringify(body), headers);
    props.props.loaderRef(false)
    console.log(data, "111data")
    if (!!data) {
      if (data.status == true) {
        setResData(data)
        getSupportList()
      }
    }
  }
  console.log(resData)

  const getSupportList = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.LIST_SUPPORT_TICKET, null, headers);
    props.props.loaderRef(false)
    // console.log(data, "data")
    if (!!data) {
      if (data.status == true) {

        let supportListDataUpdate = [];
        data.data.map((result: any) => {
          console.log(result, "myresult")
          const dataR = {
            id: result.id,
            message: result.lastMessage,
            pendingCount: result.pendingMsgCount,
            user: result.userDetail,
            tickit: result.tickit,
            status: result.status,
            title: result.title,
            datetime: result.lastMessage,
          }
          supportListDataUpdate.push(dataR)
        });

        setSupportListData(supportListDataUpdate)
        setCustomer(supportListDataUpdate)
        setIsLoading(false)

      } else {
        // setErrorShow(true)
        toast.error(data.message)
      }
    } else {

    }


  }

  const tabtheme = createTheme({
    palette: {
      primary: {
        main: '#009947'
      },
    }
  });






  return (
    <div className="support">

      {/* <div className="tabtopmain">
        <ThemeProvider theme={tabtheme}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ padding: '0 40px', background: 'white', display: 'inline-flex', borderRadius: '10px' }}  >
                <Tab label="Reported to Admin" {...a11yProps(0)} className={style.MuiTabroot} />
              </Tabs>
            </Box>

          </Box>
        </ThemeProvider>
      </div> */}
      <Box className={style.supportCont}>
        <SupportContextProvider>

          <div className="support-container d-flex">

            <Grid container className="support-container d-flex">
              <Grid sm={12} md={4} className={style.thisleft}>
                <div className={style.thisleft}>
                  {/* <Nevbar /> */}
                  <div className={style.supportTop}>
                    <ThemeProvider theme={tabtheme}>

                      <div className={style.msgdiv}>
                        <h1 className={style.msgtitel} style={{ fontSize: '30PX' }}>Support</h1>
                        <div >
                          <Button >
                            <Avatar style={{ 'background': '#009947', 'box-shadow': '0px 8px 16px rgba(47, 128, 237, 0.4)' }} className={style.avtarmenuop}>
                              <img src="../../Vector (14).svg" />
                            </Avatar>
                          </Button>
                          {/* <button className={style.btn_serchjk} onClick={(e) => {
                            setSearch(!search)
                          }} ><SearchIcon /></button> */}
                        </div>
                      </div>
                      {search ?
                        <div>
                          <input type="text" name="search"
                            // onClick={display:b}
                            onChange={(e) => {
                              var value = e.target.value
                              if (typeof value !== 'object') {
                                if (!value || value == '') {
                                  setCustomer(supportListData)
                                } else {
                                  var filteredData = supportListData.filter((item) => {
                                    let searchValue = item.user.first_name.toLowerCase() + ' ' + item.user.last_name.toLowerCase()
                                    return searchValue.includes(value.toString().toLowerCase())
                                  })
                                  setCustomer(filteredData)
                                }
                              }
                            }}
                            className={style.searchbtn}
                            autoComplete="off" /></div> : <style>{`
                          display: none;
                        `}</style>}

                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 0, borderColor: 'divider', marginLeft: '20px' }}>
                          <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example" sx={{ borderBottom: '2px solid #EAEAEA' }}  >
                            <Tab label="All" {...tabProps(0)} style={{textTransform:'capitalize'}} className={style.MuiTabroot} />
                            <Tab label="Pending" value="2" style={{textTransform:'capitalize'}}  className={style.MuiTabroot} />
                                <Tab label="Completed" value="3" style={{textTransform:'capitalize'}}  className={style.MuiTabroot} />
                          {/* <ThemeProvider theme={tabtheme}>
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
                                onChange={handleChange} aria-label="lab API tabs example"> */}
                                {/* <Tab label="All" value="1" className={styles.summarvaurr} />
                                <Tab label="Pending" value="2" className={styles.summarvaurr} />
                                <Tab label="Completed" value="3" className={styles.summarvaurr} /> */}
                                {/* <Tab label="Chart" value="4" className={styles.summarvaurr} /> */}
                              {/* </TabList>
                            </TabContext>
                          </ThemeProvider> */}
                          {/* <Tab label="Archive" className={style.MuiTabroot} {...tabProps(1)} /> */}
                          </Tabs>
                        </Box>

                      </Box>
                      </ThemeProvider>
                  </div>

                  {/* <BasicTabs /> */}

                  <div className={style.support_list + " support-list"}>
                    {
                      !isLoading ? (
                        customers && customers.length > 0 ? (
                          customers.map((row: any) => {
                            const base64Flag = 'data:image/png;base64,';
                            const { id, user, message, pendingMsgCount, pendingCount } = row;

                            const date1 = moment(message.createdAt).format('DD-MM-YYYY')
                            const date2 = moment().format('DD-MM-YYYY')

                            function mydate1() {

                              if (date1 == date2) {
                                console.log(date1 + "today")
                                return (
                                  moment(message.createdAt).format('h:mm')
                                )
                              } else {
                                // console.log(date1 + "early")
                                return (
                                  date1
                                )
                              }
                            }

                            const { first_name, last_name, profile_photo, unreadCount, is_online, dateTime, mydatetime } = user;
                            // const activeClass = (id == activeSupportId) ? "active" : "";
                            return (
                              <>
                                <Grid sm={12} md={12} xs={12}>
                                  <div className={`support-list-item d-flex align-items-center  `} id={style.left} key={id} onClick={() => handleClick(id, row)}>
                                    <div id={style.avtarlistmasspro} className="list-item-left">
                                      <Avatar src={!!user.profile_photo ? user.profile_photo : "M"}></Avatar>
                                    </div>

                                    <div id={style.listitamiddle} className="list-item-middle flex-fill">
                                      <h6 id={style.hedinglistsupp} className="username">{first_name} {last_name}</h6>
                                      <p className="m-0 latest-message" id={style.listparegarfin}>{!!message.description ? message.description : 'Photos'}</p>
                                    </div>

                                    <div className="list-item-right w-25 align-self-start">
                                      <p className="m-0 date-time" id={style.datetime}>{mydate1()}</p>
                                      {pendingCount > 0 && (
                                        <p className="m-0 unread-count" id='ptxt'>{pendingCount}</p>
                                      )}
                                    </div>

                                  </div>
                                </Grid>
                              </>)
                          })
                        )
                          : (
                            <div className='loading'>
                              <h3 className={style.userlistnot}>User Not Found</h3>
                            </div>
                          )
                      ) : (
                        <div className='loading'>
                          <h3>Loading...</h3>
                        </div>
                      )
                    }
                  </div>
                  {/* <SupportList/> */}
                </div>
              </Grid>
              <Grid sm={12} md={8} className={style.this_right}>
                <div className={style.this_right}>
                  <Msg props={props.props} viewSupport={viewSupportMsg} viewSupportList={resData} userDetail={userData} />

                </div>
              </Grid>
            </Grid>
          </div>

        </SupportContextProvider>
      </Box>
    </div>

  )
}

export default Support
