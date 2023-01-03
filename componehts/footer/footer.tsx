import {Typography,Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './footer.module.scss'
const main = () => {
  return (
    <>
    
<Grid  container className={styles.fotarcontenar}>
<Grid item sm={0} md={2} xs={0} >
<img className={styles.listscsfkon} width={300} src='../../Ellipse 16.svg' />
</Grid>
<Grid item sm={12} md={8} xs={12}>
<div className={styles.open_list}>
    <Typography>
    Open Your Account <samp className={styles.samp_now}>Now</samp> 
    </Typography>
</div>
<div className={styles.peregaraf_listdata}>
    <Typography>
    We prodive the right and secure platform to Invest and grow your funds
    </Typography>
</div>
<div className={styles.maen_btnlist}>
    <Button className={styles.footer_btn} href='../sing'>
    Get Started
    </Button>
</div>
</Grid>
<Grid item sm={0} md={2} xs={0}>

</Grid>

</Grid>
    
    </>
  )
}

export default main