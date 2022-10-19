import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Passwordupdated from '../componehts/imdex/passwordupdated';
import  Nevbarlogin  from '../componehts/imdex/nevbarlogin';
import { useRouter } from 'next/router';

// import Dashboard from '../tis_admin_web/componehts/dashboard/dashboard';
const ResponsiveAppBar = (props) => {
  const router = useRouter();

  // console.log(router.query.id_user, 'body22');

  return (
    <Grid container className={styles.cantenar_list}>
      <Grid item sm={12} md={12} xs={12}>
      <Nevbarlogin />
      <div >
      <Passwordupdated  props={props} userid={router.query.id_user}/>
      </div>
        {/* <Newbar />
        <div className={styles.dasnod_camponat}>
        <Dashboard />
        </div> */}
      </Grid>
    </Grid>
  )
}
export default ResponsiveAppBar

