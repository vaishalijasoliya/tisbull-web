import Head from "next/head";
import Image from "next/image";
import styles from "./setting.module.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import React, { useState } from "react";
// import { ClassNames } from '@emotion/react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HttpsIcon from "@mui/icons-material/Https";
import ClassIcon from "@mui/icons-material/Class";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PaymentIcon from "@mui/icons-material/Payment";
import SmsIcon from "@mui/icons-material/Sms";

export default function Home() {
  const [btnlist, setBtnlist] = React.useState("turu");
  return (
    <Grid container className={styles.cantenar_list100}>
      <Grid item sm={12} md={12} xs={12} className={styles.listseting}>
        {/* <div> */}
        <Box>
          <div className={styles.imgboxse}>
            <img src="../../image 25.svg" />
          </div>
          <div>
            <Accordion className={styles.listcomhed}>
              <AccordionSummary
                className={styles.settingfast}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <PersonOutlineIcon className={styles.personicon} />
                  My profile and account
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button className={styles.personlist}>
                  <PersonOutlineIcon className={styles.jjperuser} />
                  Personal Informations{" "}
                  <ArrowForwardIosIcon className={styles.arronewbar} />
                </Button>
                <Button className={styles.personlist2} href="./ChangePassedit">
                  <HttpsIcon className={styles.jjperuser} />
                  Change Password{" "}
                  <ArrowForwardIosIcon className={styles.arronewbar2} />
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={styles.accontbtn}>
            <Button>
              <div className={styles.pandicon} href="./accountteyp">
                <ClassIcon />
                <Typography>Accounts</Typography>
              </div>{" "}
              <div className={styles.listnumlook}>
                <KeyboardArrowRightIcon />
              </div>
            </Button>
          </div>
          <div className={styles.accontbtn}>
            <Button>
              <div className={styles.pandicon}>
                <HeadsetMicIcon />
                <Typography>Support</Typography>
              </div>{" "}
              <div className={styles.listnumlook}>
                <KeyboardArrowRightIcon />
              </div>
            </Button>
          </div>
          <div className={styles.accontbtn}>
            <Button>
              <div className={styles.pandicon}>
                <PaymentIcon />
                <Typography>Payment Settings</Typography>
              </div>{" "}
              <div className={styles.listnumlook}>
                <KeyboardArrowRightIcon />
              </div>
            </Button>
          </div>
          <div className={styles.accontbtn}>
            <Button>
              <div className={styles.pandicon}>
                <SmsIcon />
                <Typography>FAQ</Typography>
              </div>{" "}
              <div className={styles.listnumlook}>
                <KeyboardArrowRightIcon />
              </div>
            </Button>
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
