// import Head from 'next/head'
// import Image from 'next/image'
import * as React from "react";
import { Divider } from "@mui/material";

import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Newbar from './newbarlist';
import { Avatar, Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import CreatePattern from './patttlistadd'
import Addpattern from './addCustom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
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

  const [value, setValue] = React.useState(0);
  const [listdatall, setListDatall] = React.useState('')
  console.log(value, 'listdatall');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container className={styles.cantenar_list265}>
      <Grid item sm={12} md={12} xs={12}>
        <Newbar />
        {/* <Home /> */}
        </Grid>

        <Grid item sm={12} md={12} xs={12} className={styles.listaddap2tt}>
        <div className={styles.listaddaptt}> 
        <div style={{display:'flex',padding:'30px 0px 0px 10px'}}>
<Button className={styles.listsvgicom} onClick={()=>{router.push('./pattanlist')}}><KeyboardArrowLeftIcon  /></Button>
          <Typography className={styles.listceaddpatt}>Create pattern</Typography>
        </div>
        <Grid item sm={12} md={9} xs={12}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "rgba(0, 153, 71, 0.22)",
            overflow: 'auto',
            padding:'0px 0px 0px 20px'            // width: 464,
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
              onClick={() => {
                router.push({
                  // pathname: './patttlistadd',
                  query: {
                    scripType: 'currency', patternType: 'basic', parent: JSON.stringify({ pathname: '/patterns', query: { type: 'currency' } })
                  }
                });
              }}
              label="Basic"
              {...a11yProps(0)}
              className={styles.active + " " + styles.btn}
            />
            <Tab
              onClick={() => {
                router.push({
                  // pathname: '../componehts/Custompatt/Custompatt',
                  query: {
                     scripType: 'currency', patternType: 'custom', parent: JSON.stringify({ pathname: '/patterns', query: { type: 'currency' } }) }
                });
              }}
              // onClick={
              //   () => { setListDatall('Custom') }}
              label="Custom"
              {...a11yProps(1)}
              className={styles.btn}
            />
            <Tab
              onClick={
                () => { setListDatall('orderhistory') }}
              label="Paramids"
              {...a11yProps(2)}
              className={styles.btn}
            />

          </Tabs>
        </Box>
        </Grid>
        {/* <Grid item sm={12} md={12} xs={12}> */}

        <TabPanel value={value} index={0}>
          <CreatePattern props={props} />
          {/* <Summary proidlists={router.query.emailID} props={props} /> */}
       </TabPanel> 
         <TabPanel style={{ padding: '30px 0px 0px 0px' }} className={styles.tbapenalist} value={value} index={1}>
          <Addpattern props={props} />
          {/* <TodayOrder props={props} listdsts={router.query.emailID} /> */}
        </TabPanel> 
        <TabPanel style={{ padding: '30px 0px 0px 0px' }} value={value} index={2}>

          {/* <OrderHistory props={props} /> */}
         </TabPanel> 
        {/* <TabPanel value={value} index={3}> */}
          {/* <Chart /> */}
        {/* </TabPanel> */} 
</div>


      </Grid>
    </Grid>
  )
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
