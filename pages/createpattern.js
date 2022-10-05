import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import Grid from '@mui/material/Grid';
import Createpattern from '../componehts/home/createpattern';
import Newbar from '../componehts/newbar/newbar';
import Dashboard from '../componehts/dashboard/dashboard';
export default function Home() {
  return (
    <Grid container className={styles.cantenar_list}>
      <Grid item sm={12} md={12} xs={12}>
      <Newbar />
      <div className={styles.singlistpsdii}>
      <Createpattern />
      </div>
        {/* <Newbar />
        <div className={styles.dasnod_camponat}>
        <Dashboard />
        </div> */}
      </Grid>
    </Grid>
  )
}
