
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './headar.module.scss'
import { useRouter } from 'next/router';

const main = () => {
  const router = useRouter();

  return (
    <>

      <Grid container>
        <Grid item sm={6} md={6} xs={6} >
          <div className={styles.logotis}>
            <img src='../../TISBULL 1.png'></img>
          </div>
        </Grid>
        <Grid  item sm={6} md={6} xs={6}>
          <div className={styles.btn_meaincom}>
            <div>
              <Button className={styles.btnlogin} href='./login'>Login</Button>
            </div>
            <div className={styles.line_btn} href='./sing'>
              <img src='../../Line 1.png' />
            </div>
            <div>
              <Button className={styles.btnsingup} href='../sing'>Signup</Button>
            </div>
          </div>
        </Grid>
      </Grid>

    </>
  )
}

export default main