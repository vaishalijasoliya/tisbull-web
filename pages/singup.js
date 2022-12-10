import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Sing from '../componehts/imdex/sing';
import  Nevbarlogin  from '../componehts/imdex/nevbarlogin';
import { useRouter } from 'next/router';

// import Sing from '../tis_admin_web/componehts/imdex/test';

// import Newbar from '../componehts/newbar/newbar';
import Dashboard from '../componehts/dashboard/dashboard';
export default function Home(props) {
  const router = useRouter();

  console.log(router.query,'gvvvvvvcv');

  return (
    <Grid container className={styles.cantenar_list}>
      <Grid item sm={12} md={12} xs={12}>
      <Nevbarlogin />
      <div className={styles.singlistpsdii22}>
      <Sing props={props}/>
      </div>
        {/* <Newbar />
        <div className={styles.dasnod_camponat}>
        <Dashboard />
        </div> */}
      </Grid>
    </Grid>
  )
}
