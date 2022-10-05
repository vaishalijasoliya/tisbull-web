import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
// import Header from '../componehts/header/headar'
import Header from '../componehts/header/headar';
import Home from '../componehts/accoutn/home';
import Advsupport from '../componehts/layout/advsupport';
import Features from '../componehts/layout/Features';
import Aboutus from '../componehts/layout/aboutus';
import Payment from '../componehts/footer/payment';
import Footer from '../componehts/footer/footer';
import Sing from '../componehts/imdex/sing';
import Newbar from '../componehts/newbar/newbar';
import Dashboard from '../componehts/dashboard/dashboard';
const main = () => {
  return (
    <Grid container className={styles.container_index2}>
        <Grid md={12} className={styles.Headercss}>
        {/* <Sing /> */}
        <div className={styles.Header_camponat}>
            <Header className={styles.Header_btn} />
          </div>
          <div className={styles.homepegcom}>
            <Home />
            <div className={styles.bac_divhomeadv}>

              <Advsupport />
            </div>
            <div>
              <Features />
            </div>
            <div>
              <Aboutus />
            </div>
            <div>
              <Payment />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </Grid>
      </Grid>
  )
}
export default main