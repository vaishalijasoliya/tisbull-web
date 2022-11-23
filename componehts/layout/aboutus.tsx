// import style from '../styles/login.module.css'
// import Signin from '../component/signin.js'
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './aboutus.module.scss'
const main = () => {
  return (
    <>
    
<Grid  container>
<Grid item sm={12} md={5} xs={12}>
  <div className={styles.maen_divabout}>
<div className={styles.heding_tis_about}>
    <Typography>
    About Us
    </Typography>
</div>
<div className={styles.tis_peregaraf_list}>
<Typography>
TIS is technologically trading platform for everyone. It provides automatic trading in equities, futures, currencies with realtime display of notional profit/loss and allows users to pause ongoing pattern, stop buying.
</Typography>
</div>
</div>
</Grid>
<Grid item sm={12} md={7} xs={12} >
    <div className={styles.img_list_pohot}>
        <img height={600}  width={600} src='../../Today orders.svg' />
    </div>
</Grid>
</Grid>
    
    </>
  )
}

export default main