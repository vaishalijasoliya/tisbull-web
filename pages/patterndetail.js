import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/index.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Createpattern from "../componehts/home/createpattern";
import Newbar from "../componehts/newbar/newbar";
import Dashboard from "../componehts/dashboard/dashboard";
import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Summary from "../componehts/pattern/patterndetails";
import TodayOrder from '../componehts/todayorder/todayorder'

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function PatternDetail() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container>
      <Grid item sm={12} md={12} xs={12}>
        <Box className={styles.container_list80}>
          <Newbar />
          <Box component={Paper} className={styles.container_box}>
            <Box className={styles.flex}>
              <Box className={styles.wid_1 + " " + styles.pad_12}>
                <Typography variant="h5" className={styles.typo}>
                  AAPL
                  <ArrowDropUpIcon
                    fontSize={"large"}
                    className={styles.dropup_icon}
                  />
                  <span className={styles.span_1}>
                    97.75 <span className={styles.span}> (0.66%)</span>
                  </span>
                </Typography>
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
                <img
                  src="addicon.png"
                  alt="Add icon"
                  className={styles.img_add}
                />
              </Box>
            </Box>
            <Box></Box>
            <Box className={styles.flex}>
              <Box className={styles.pad_1 + " " + styles.wid_2}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "rgba(0, 153, 71, 0.22)",
                    width: 464,
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
                      label="Today’s orders"
                      {...a11yProps(1)}
                      className={styles.btn}
                    />
                    <Tab
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
                <Box>
                  <TabPanel value={value} index={0}>
                    {/* Summary */}
                    <Summary />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {/* Today’s orders */}
                    <TodayOrder />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    {/* Order History */}
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    {/* Chart */}
                  </TabPanel>
                </Box>
              </Box>
              <Box className={styles.text_align + " " + styles.pad_2}>
                <Button type="submit" className={styles.button}>
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
