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
import { useRouter } from 'next/router';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import TodayOrder from '../componehts/todayorder/todayorder'
import Chart from '../componehts/chart/chart'
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { Types } from '../constants/actionTypes'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import { connect } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
  console.log(props,'propsprops');

  console.log(router.query.namescoka, 'gvvvvv');

  // export default function PatternDetail(props) {
  console.log(props.emailID, 'hvgfhhg');
  const [value, setValue] = React.useState(0);
  const [listdatall, setListDatall] = React.useState('')
  console.log(value, 'listdatall');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [data, setData] = useState([])
    const [listpatt, setListpatt] = useState([])
    const[listless,setLisee] = React.useState([])
    console.log(listless, 'data55');

    const patternlist = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var body = {
            "id_pattern": router.query.emailID,
            // props.idlist,
            // email: props.email,
            // otp: outField
        }
        console.log(body, 'body');

        props.loaderRef(true)
        // var data = await ApiServices.GetApiCall(ApiEndpoint.ORDERLIST, headers)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.PATTERN_VIEW, JSON.stringify(body), headers)

        // const data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_LIST, JSON.stringify(body), headers);
        props.loaderRef(false)
        // console.log(patternDelete.pattern.buy, 'datalistddd');

        if (!!patternDelete) {
            if (patternDelete.status == true) {
                setListpatt(patternDelete.pattern.quote)
                setData(patternDelete.pattern)
             
            } 
            // else{
            //     toast.error(patternDelete.message)

            // }
      

        }
    }
  //   const palsless = async () => {

  //     var headers = {
  //         "Content-Type": "application/json",
  //         "x-access-token": props.profile.token
  //     }
  //     var body = {
  //       "instrumentToken" :data.script
  //   }
  //   console.log(body,'bodybody');
  //     props.loaderRef(true)
  //     var patternDeletelist = await ApiServices.PostApiCall(ApiEndpoint.GET_STOCK_PRICE, JSON.stringify(body), headers)
  //     props.loaderRef(false)

  //           // if (!!patternDeletelist) {

  //     setLisee(patternDeletelist.success[0].ltp);
  //           // }
  //     // if (!!patternDelete) {
  
  //     // console.log(patternDelete, 'datalist');
  //   //   if (patternDelete.status == true) {
  //   //     setLisee(patternDelete.pattern.quote)
  //   //     // setData(patternDelete.pattern)
     
  //   // } 
   
  
  // }
  const getScripPrice = async () => {
    // console.log('getScripPrice...', value)
    var headers = {
        "Content-Type": "application/json",
        "x-access-token": props.profile.token
    }
    var body = {
        "instrumentToken": data.script
    }
        props.loaderRef(true)

    var stockPrice = await ApiServices.PostApiCall(ApiEndpoint.GET_STOCK_PRICE, JSON.stringify(body), headers)
    props.loaderRef(false)
    if (!!stockPrice && !!stockPrice.success && stockPrice.success.length > 0) {
        console.log('stockPrice', stockPrice)
        setLisee(stockPrice.success[0])
    }
}

    console.log(data, 'listkkk');

    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            patternlist()
            getScripPrice()
        }
    }, [])
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
        <div  style={{display:'flex',    alignItems:'baseline'}}>
        <Grid item sm={12} md={6} xs={12}>

          <Box className={styles.flex}>

            <Box className={styles.wid_1 + " " + styles.pad_12}>
            {/* { value == 2 ||value == 1 ? "ddd " : 'ddd' } */}
            {parseFloat(listless.ltp) !== parseFloat(listless.closing_price)  ? 
            <Box sx={{ flex: 1.3, flexDirection: 'row', display: 'flex' }}>
                                        <Typography sx={{ color: '#524ddc' }} className={styles.typo}>{router.query.namescoka} {parseFloat(listless.ltp).toFixed(2)}</Typography>
                                        {((parseFloat(listless.ltp) - parseFloat(listless.closing_price)) * 100) / parseFloat(listless.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#00b8a6' }} /> : <ArrowDropDownIcon sx={{ marginLeft: 0.5, color: '#c21717' }} />}
                                        {/* <Typography sx={{ color: (((parseFloat(listless.ltp) - parseFloat(listless.closing_price)) * 100) / parseFloat(listless.closing_price)) > 0 ? '#00b8a6' : '#c21717' }}>{`(${(((parseFloat(listless.ltp) - parseFloat(listless.closing_price)) * 100) / parseFloat(listless.closing_price)).toFixed(2)}%)`}</Typography> */}
                                    </Box> :
                                     <Box sx={{ flex: 1.3, flexDirection: 'row', display: 'flex' }}>
                                        <Typography sx={{ color: '#524ddc' }} className={styles.typo}>{router.query.namescoka} {parseFloat(listless.ltp).toFixed(2)}</Typography>
                                        {((parseFloat(listless.closing_price) - parseFloat(listless.open_price)) * 100) / parseFloat(listless.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#00b8a6' }} /> : <ArrowDropDownIcon sx={{ marginLeft: 0.5, color: '#c21717' }} />}
                                        <Typography sx={{ color: (((parseFloat(listless.closing_price) - parseFloat(listless.open_price)) * 100) / parseFloat(listless.closing_price)) > 0 ? '#00b8a6' : '#c21717' }}>{`(${(((parseFloat(listless.closing_price) - parseFloat(listless.open_price)) * 100) / parseFloat(listless.closing_price)).toFixed(2)}%)`}</Typography>
                                    </Box>}
              {value == 2 || value == 1 ?
                <Typography variant="h5" className={styles.typo}>

                  {router.query.namescoka}
                </Typography> : <Typography variant="h5" style={{ display: 'flex', alignItems: 'center' }} className={styles.typo}>
                  
                  {/* <ArrowDropUpIcon */}
                    {/* fontSize={"large"} */}
                    {/* className={styles.dropup_icon} */}
                  {/* /> */}
                  <span className={styles.span_1}>
                  {listless.ltp}
                  </span>
                  {((parseFloat(listless.ltp) - parseFloat(listless.closing_price)) * 100) / parseFloat(listless.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#00b8a6' }} /> : <ArrowDropDownIcon sx={{ marginLeft: 0.5, color: '#c21717' }} />}
                  <span className={styles.span}> <Typography className={styles.listfonfl} sx={{ color: (((parseFloat(listless.ltp) - parseFloat(listless.closing_price)) * 100) / parseFloat(listless.closing_price)) > 0 ? '#00b8a6' : '#c21717' }}>{`(${(((parseFloat(listless.ltp) - parseFloat(listless.closing_price)) * 100) / parseFloat(listless.closing_price)).toFixed(2)}%)`}</Typography></span>
                </Typography>}
            </Box>

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
        <Grid item sm={12} md={6} xs={12} className={styles.listdatabox} style={{ display: 'flex', justifyContent: 'end', padding: '0px 60px 0px 0px' }}>

          <Button>
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
                <div className={styles.responsiv} style={{display:'flex'}}>

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
        <Grid item sm={12} md={6} xs={12} style={{padding: '0px 60px 0px 0px' }}>

          <Box style={{ display: 'flex', justifyContent: 'end', }}>
            <Button type="submit" className={styles.button}>
              Edit
            </Button>
          </Box>
        </Grid>
        </div>
        {/* </Box> */}
        {/* <Box> */}
        <Grid item sm={12} md={12} xs={12}>

          <TabPanel value={value} index={0}>
            <Summary proidlists={router.query.emailID} data={data} listpatt={listpatt} listdatamenu={router.query.namescoka} props={props} />
          </TabPanel>
          <TabPanel style={{ padding: '30px 0px 0px 0px' }} className={styles.tbapenalist} value={value} index={1}>
            <TodayOrder props={props} listdsts={router.query.emailID} />
          </TabPanel>
          <TabPanel style={{ padding: '30px 0px 0px 0px' }} value={value} index={2}>
            <OrderHistory props={props} listdata={router.query.emailID}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);