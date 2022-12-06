import * as React from "react";
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
  console.log(router.query.emailID, 'propsprops');

  console.log(router.query.namescoka, 'gvvvvv');

  // export default function PatternDetail(props) {
  console.log(props.emailID, 'hvgfhhg');
  const [value, setValue] = React.useState(0);
  const [listdatall, setListDatall] = React.useState('')
  console.log(value, 'listdatall');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
                pathname: './home',
                // query: { emailID: row.id,namescoka:row.script }
              });
            }}

          ><KeyboardReturnIcon />Pattern</Button>
        </Grid>
        <div  style={{display:'flex',    alignItems:'baseline'}}>
        <Grid item sm={12} md={6} xs={12}>

          <Box className={styles.flex}>

            <Box className={styles.wid_1 + " " + styles.pad_12}>
              {value == 2 || value == 1 ?
                <Typography variant="h5" className={styles.typo}>

                  {router.query.namescoka}
                </Typography> : <Typography variant="h5" style={{ display: 'flex', alignItems: 'center' }} className={styles.typo}>
                  {router.query.namescoka}
                  <ArrowDropUpIcon
                    fontSize={"large"}
                    className={styles.dropup_icon}
                  />
                  <span className={styles.span_1}>
                    97.75
                  </span>
                  <span className={styles.span}> (0.66%)</span>
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
            <Summary proidlists={router.query.emailID} props={props} />
          </TabPanel>
          <TabPanel style={{ padding: '30px 0px 0px 0px' }} className={styles.tbapenalist} value={value} index={1}>
            <TodayOrder props={props} listdsts={router.query.emailID} />
          </TabPanel>
          <TabPanel style={{ padding: '30px 0px 0px 0px' }} value={value} index={2}>
            <OrderHistory props={props} />
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