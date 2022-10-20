import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Setting from '../componehts/Setting/Setting';
import Nevbarlogin from '../componehts/imdex/nevbarlogin';

// import Sing from '../tis_admin_web/componehts/imdex/test';

import Newbar from '../componehts/newbar/newbar';
import Dashboard from '../componehts/dashboard/dashboard';
export default function Home(props) {
  return (
    <Grid container className={styles.cantenar_list}>
      <Grid item sm={12} md={12} xs={12}>
        <Nevbarlogin />
      </Grid>
      <Grid item sm={12} md={3} xs={12} className={styles.setinglist}>
        <div >
          <Setting />
        </div>
      </Grid>
      {/* <Newbar />
        <div className={styles.dasnod_camponat}>
        <Dashboard />
        </div> */}

    </Grid>
  )
}
