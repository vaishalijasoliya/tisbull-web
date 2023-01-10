import React, { useState } from "react";
import styles from "../styles/index.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Createpattern from "../componehts/home/createpattern";
import Newbar from "./newbarlist";
import Dashboard from "../componehts/dashboard/dashboard";
import { Avatar, Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import OrderHistory from "../componehts/OrderHistory/OrderHistory";
import Summary from "../componehts/pattern/patterndetails";
import { connect } from 'react-redux';
import { useRouter, withRouter } from 'next/router';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TodayOrder from '../componehts/todayorder/todayorder'
import Chart from '../componehts/chart/chart'
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Types } from '../constants/actionTypes'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { toast } from 'react-toastify';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// import { connect } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
let stockInterval = null;

function TabPanel(props) {
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
        <Box>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ResponsiveAppBar = (props) => {
  const router = useRouter();
  console.log(props, 'propsprops');

  console.log(router.query.scripToken, 'scripToken');

  // export default function PatternDetail(props) {
  console.log(props.scripToken, 'hvgfhhg');
  const [value, setValue] = React.useState(0);
  const [listdatall, setListDatall] = React.useState('')
  console.log(value, 'listdatall');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [listset, setAccount] = useState(true)
  // const [listsetlist,setAccountlist] = useState(true)

  const [data, setData] = useState([])
  const [listpatt, setListpatt] = useState([])
  const [listless, setLisee] = React.useState([])
  const [listidmenu, setIdlistdata] = React.useState('')
  const [scripDetails, setScripDetails] = useState('');


  const [patternID, setpatternID] = useState('');

  // console.log(listidmenu, 'data55');

  // console.log(props.props.router.query.emailID,'propsjjjj.router');

  // console.log(data.quote, 'patternpattern');
  //   const getScirp = async (type) => {
  //     var body = {
  //         "type": type
  //     }
  //     var headers = {
  //         "Content-Type": "application/json",
  //         "x-access-token": props.profile.token
  //     }
  //     var accountList = await ApiServices.PostApiCall(ApiEndpoint.SCRIP_LIST, JSON.stringify(body), headers)
  //     console.log('getScirp', accountList)
  //     if (!!accountList && !!accountList.length > 0) {
  //         var accountLableList = []
  //         let filterScripList = []
  //         for (let index = 0; index < accountList.length; index++) {
  //             const element = accountList[index];
  //             var lableObj = "";
  //             if (!!element.name) {
  //                 lableObj = element.instrumentName + ` (${element.name}) (${element.exchange})`
  //             } else {
  //                 lableObj = element.instrumentName + `(${element.exchange}) - ${element.expiry}`
  //             }
  //             accountLableList.push({
  //                 label: lableObj,
  //                 id: element.instrumentToken
  //             })
  //             if (isView) {
  //                 if (element.instrumentToken == type) {

  //                     getScripPrice(type)
  //                     stockInterval = setInterval(() => {
  //                         getScripPrice(type)
  //                     }, 3000);
  //                 }
  //             }
  //             if (index < 300) {
  //                 filterScripList.push({
  //                     label: lableObj,
  //                     id: element.instrumentToken
  //                 })
  //             }
  //         }
  //         setFilterScripList(filterScripList)
  //         setDefaultScripList(filterScripList)
  //         setScripList(accountLableList)
  //     }
  // }
  const getScripPrice = async (value) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    var body = {
      "instrumentToken": value
    }
    var stockPrice = await ApiServices.PostApiCall(ApiEndpoint.GET_STOCK_PRICE, JSON.stringify(body), headers)
    console.log(stockPrice, 'stockPrice');
    if (!!stockPrice && !!stockPrice.success && stockPrice.success.length > 0) {
      console.log('stockPrice.success[0]', stockPrice.success[0], value)
      setScripDetails(stockPrice.success[0])
    }
  }
  console.log(props, 'listkkk');
  const patternlist = async (value) => {
    console.log(value,'listdatat');
            var headers = {
              "Content-Type": "application/json",
              "x-access-token": props.profile.token
            }
            var body = {
              "id_pattern":value,
    
            }
            console.log(body, 'body');
        
            props.loaderRef(true)
            var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.PATTERN_VIEW, JSON.stringify(body), headers)
            props.loaderRef(false)
            console.log(patternDelete, 'datalistddd');
        
            if (!!patternDelete) {
              if (patternDelete.status == true) {
                setListpatt(patternDelete.pattern.quote)
                setData(patternDelete.pattern)
                setIdlistdata(patternDelete.pattern.script)
              }
            }
          }

  React.useEffect(() => {
    console.log(props, 'useEffects1');
    setpatternID(props.router.query.emailID);
    if (!!props.profile && !!props.profile.token) {
      patternlist(router.query.emailID)

      getScripPrice(router.query.scripToken)

    }
  }, [props.router])
  return (
    <Grid container className={styles.cantenar_list265}>
      <Grid item sm={12} md={12} xs={12}>

        {/* <Box className={styles.container_list80}> */}
        <Newbar />
      </Grid>
      <Box component={Paper} className={styles.container_box}>
        <Grid item sm={12} md={6} xs={12}>

          <Button className={styles.listpattbek} style={{ color: 'black', testTransform: 'capitalize' }}
            onClick={() => {
              router.push({
                pathname: './pattanlist',
                // query: { emailID: row.id,namescoka:row.script }
              });
            }}

          ><KeyboardReturnIcon />Pattern</Button>
        </Grid>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Grid item sm={12} md={9} xs={12}>
          {!!scripDetails && <Box sx={{ flexDirection: 'row', marginBottom: 3, display: 'flex' }} className={styles.listacyiso}>
                                    {parseFloat(scripDetails.ltp) !== parseFloat(scripDetails.closing_price) ? <Box style={{ padding: '0px 60px 0px 0px',display:'flex',alignItems:'center' }} sx={{ flexDirection: 'row' }}>
                                    <Typography className={styles.typolistname}>   {router.query.namescoka}</Typography>
                                      <Box style={{ display: 'flex',alignItems:'center' }}> {scripDetails.closing_price > 0 ? <Typography style={{ color: '#009947' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography> : <Typography style={{ color: '#E31E24' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography>}
                                            {/* {((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#009947' }} /> : <ArrowDownwardIcon sx={{ marginLeft: 0.5, color: '#E31E24' }} />} */}
                                            <Typography className={styles.listpsllow} sx={{ color: (((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#00b8a6' : '#E31E24' }}>{`(${(((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)).toFixed(2)}%)`}</Typography>
                                        </Box></Box> : <Box sx={{ flexDirection: 'row' }} style={{ padding: '0px 60px 0px 0px',display:'flex',alignItems:'center' }}>
                                        <Typography className={styles.typolistname}>   {router.query.namescoka}</Typography>
                                       <Box style={{ display: 'flex',alignItems:'center' }}> {scripDetails.closing_price > 0 ? <Typography style={{ color: '#009947' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography> : <Typography style={{ color: '#E31E24' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography>}
                                       <Typography className={styles.listpsllow} sx={{ color: (((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#009947' : '#E31E24' }}>{`${(parseFloat(scripDetails.open_price) - parseFloat(scripDetails.closing_price)).toFixed(2)}`}</Typography>
                                            {/* {((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#009947' }} /> : <ArrowDownwardIcon sx={{ marginLeft: 0.5, color: '#E31E24' }} />} */}
                                            <Typography className={styles.listpsllow} sx={{ color: (((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#009947' : '#E31E24' }}>{`(${(((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price)).toFixed(2)}%)`}</Typography>
                                        </Box>
                                    </Box>}
                                    <Box style={{ padding: '0px 60px 0px 0px' }}>   <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Open</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.open_price).toFixed(2)}</Typography></Box>

                                    <Box style={{ padding: '0px 60px 0px 0px' }}>  <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Prev. Close</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.closing_price).toFixed(2)}</Typography> </Box>

                                    <Box style={{ padding: '0px 60px 0px 0px' }}>   <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Low</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.low_price).toFixed(2)}</Typography> </Box>
                                    <Box style={{ padding: '0px 60px 0px 0px' }}>  <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>High</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.high_price).toFixed(2)}</Typography></Box>
                                    {/* </Box> */}
                                </Box>}
            <Box className={styles.flex}>

              {/* <Box className={styles.wid_1 + " " + styles.pad_12}>
                <Typography variant="h5" style={{ display: 'flex', alignItems: 'center' }} className={styles.typo}>
                  {router.query.namescoka}
                  {((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price) > 0 ? <ArrowDropUpIcon sx={{ marginLeft: 0.5, color: '#009947' }} /> : <ArrowDropDownIcon sx={{ marginLeft: 0.5, color: '#E31E24' }} />}
                  <span className={styles.span_1}>
                    {parseFloat(scripDetails.ltp).toFixed(2)}
                    {listless.ltp}
                  </span>
                  <span className={styles.span}>
                    <Typography className={styles.difarandssa} sx={{ color: (((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#009947' : '#E31E24' }}>{`(${(((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)).toFixed(2)}%)`}</Typography>

                    {/* (0.66%) */}
                  {/* </span> */}
                {/* </Typography> */}
                {/* <Box style={{ padding: '0px 60px 0px 0px' }}>   <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Open</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.open_price).toFixed(2)}</Typography></Box> */}

{/* <Box style={{ padding: '0px 60px 0px 0px' }}>  <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Prev. Close</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.closing_price).toFixed(2)}</Typography> </Box> */}

{/* <Box style={{ padding: '0px 60px 0px 0px' }}>   <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Low</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.low_price).toFixed(2)}</Typography> </Box> */}
{/* <Box style={{ padding: '0px 60px 0px 0px' }}>  <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>High</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.high_price).toFixed(2)}</Typography></Box> */}
            
              {/* </Box> */} 

              <Box
                className={
                  styles.wid_1 +
                  " " +
                  styles.text_align +
                  " " +
                  styles.pad_122 +
                  " " +
                  styles.hei_12
                }
              >
              </Box>
            </Box>
            {/* </Box> */}
          </Grid>
          <Grid item sm={12} md={3} xs={12} className={styles.listdatabox} style={{ display: 'flex', justifyContent: 'end', padding: '0px 60px 0px 0px' }}>

            <Button onClick={() => {
              router.push({
                pathname: './addPattern',
                query: {
                  scripType: 'currency',
                  patternType: 'basic',
                  //  parent: JSON.stringify({ pathname: '/patterns', query: { type: 'currency' } })
                }
              });
            }}>
              <Avatar style={{ background: '#009947' }}>
                <img src="../Vector (14).svg"
                  alt="Add icon"
                  className={styles.img_add}
                />
              </Avatar>
            </Button>
          </Grid>
        </div>
        {/* </Box> */}
        {/* </Box> */}

        {/* <Box></Box> */}
        {/* <Box className={styles.flex}> */}
        {/* <Box className={styles.pad_1 + " " + styles.wid_2}> */}
        {/* <Box style={{ 'display': 'flex', 
                padding: '0px 0px 0px 62px' 
                }}> */}
        <div className={styles.responsiv} style={{ display: 'flex' }}>

          <Grid item sm={12} md={6} xs={12} className={styles.listshshsh} style={{ padding: '0px 0px 0px 62px' }}>

            <Box
              sx={{
                borderBottom: 1,
                borderColor: "rgba(0, 153, 71, 0.22)",
                overflow: 'auto'
                // width: 464,
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                // TabIndicatorProps={{ style: { background: "#009947" } }}
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#009947",
                    height: 4,
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#009947",
                    fontSize: 14,
                    textTransform: "capitalize",
                  },
                }}
              >
                <Tab

                  label="Summary"
                  {...a11yProps(0)}
                  className={styles.active + " " + styles.btn}
                />
                <Tab
                  onClick={
                    () => { setListDatall('orderhistory') }}
                  label="Today’s orders"
                  {...a11yProps(1)}
                  className={styles.btn}
                />
                <Tab
                  onClick={
                    () => { setListDatall('orderhistory') }}
                  label="Order History"
                  {...a11yProps(2)}
                  className={styles.btn}
                />
                <Tab
                  label="Chart"
                  {...a11yProps(3)}
                  className={styles.btn}
                />
              </Tabs>
            </Box>
          </Grid>
          <Grid item sm={12} md={6} xs={12} style={{ padding: '0px 60px 0px 0px' }}>

            <Box style={{ display: 'flex', justifyContent: 'end', }}>
              {data.status == 'exit' ? '' :
                <Button className={styles.button}
                  onClick={() => {
                    if (data.status == 'active') {
                      toast.error('Please pause the pattern then enable edit pattern.')



                    } else {
                      if (data.type == "CustomPattern") {
                        router.push({
                          pathname: '/editCustom',
                          query: { emailID: data.id }
                          // query{ id: row.id },
                        });
                      } else {
                        router.push({
                          pathname: '/editpatt',
                          query: { emailID: data.id }
                        });
                      }
                    }
                  }}

                > Edit </Button>}
              {/* <Button   onClick={() => {
                                                                            if (data.type== "CustomPattern") {
                                                                                router.push({
                                                                                    pathname: '/editCustom',
                                                                                    query: { emailID: router.query.emailID }
                                                                                   ,
                                                                                });
                                                                            } else {
                                                                                router.push({
                                                                                    pathname: '/editpatt',
                                                                                    query: { emailID: router.query.emailID }
                                                                                });
                                                                            }
                                                                        }} type="submit" className={styles.button}> */}
              {/* Edit */}
              {/* </Button> */}
            </Box>
          </Grid>
        </div>
        {/* </Box> */}
        {/* <Box> */}
        <Grid item sm={12} md={12} xs={12}>

          <TabPanel value={value} index={0}>
            <Summary proidlists={patternID} data={data} listpatt={listpatt} listdatamenu={router.query.namescoka} props={props} />
          </TabPanel>
          <TabPanel style={{ padding: '30px 0px 0px 0px' }} className={styles.tbapenalist} value={value} index={1}>
            <TodayOrder props={props} listdsts={router.query.emailID} />
          </TabPanel>
          <TabPanel style={{ padding: '30px 0px 0px 0px' }} value={value} index={2}>
            <OrderHistory props={props} listdata={router.query.emailID} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Chart />
          </TabPanel>
        </Grid>
      </Box>
      {/* <Box className={styles.text_align + " " + styles.pad_2}>

                </Box> */}
      {/* </Box> */}

      {/* // </Box> */}
      {/**/}
      {/* </Box> */}
      {/* </Grid> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResponsiveAppBar));