// import style from '../styles/login.module.css'
// import Signin from '../component/signin.js'
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './advsupport.module.scss'
const main = () => {
  return (
    <>

      <Grid container className={styles.listmenucantr}>
        <Grid item sm={0} md={5} xs={0} className={styles.bgcolor_peg}>
          <div>
            <img  src='../../Ellipse 13 (2).png'></img>
          </div>
        </Grid>
        <Grid item sm={12} md={7} xs={12} className={styles.maen_geidsty} >
          <div className={styles.logotis}>
            <img src='../../Group 32.png'></img>
          </div>
          <div className={styles.heding_advauto}>
            <Typography>
              Advance Automation
            </Typography>
          </div>
          <div className={styles.heding_providing}>
            <Typography>
              We are providing automation order with less user efforts.
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={9} xs={12} className={styles.maen_geidsty2}>
          <div className={styles.logotis2}>
            <div >
              <img src='../../Attribution modeling 1.png'></img>
            </div>
            <div className={styles.heding_advauto2}>
              <Typography>
                Advance Support
              </Typography>
            </div>
            <div className={styles.heding_providing2}>
              <Typography>
                We are trusted and supported for multi broker
              </Typography>
            </div>
          </div>

        </Grid>
        <Grid item sm={0} md={3} xs={0} className={styles.bgcolor_peg2} >
          <div >
            <img src='../../Ellipse 19 (1).png'></img>
          </div>
        </Grid>
      </Grid>

    </>
  )
}

export default main