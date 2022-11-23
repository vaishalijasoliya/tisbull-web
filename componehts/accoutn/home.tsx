import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';

import styles from './Home.module.scss'
const main = () => {
  const router = useRouter();

  return (
    <>

      <Grid container >
        <Grid item sm={12} md={5} xs={12} >
          <div className={styles.maendivhome}>
            <div>
              <Typography className={styles.fastesthome} >
                The Fastest &
              </Typography>
            </div>
            <div>
              <Typography className={styles.fastesthome}>
                Easiest Way to
              </Typography>
            </div>
            <div>
              <Typography className={styles.growtext}>
                Grow Your Funds
              </Typography>
            </div>
            <div className={styles.btn_get_learn}>
              <div className={styles.btnno1}>
                <Button className={styles.getbtn}   onClick={(() => { router.push('./login') })}>Get Started</Button>
              </div>
              <div>
                <Button className={styles.getbtn}>Learn More</Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={7} xs={12} >
          <div className={styles.bac_img}>
            <img width={740} src='../../Pattern list.svg' />
          </div>
        </Grid>
      </Grid>

    </>
  )
}

export default main