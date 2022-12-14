
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './aboutus.module.scss'
const main = () => {
  return (
    <>
    
<Grid  container className={styles.contenarabout}>
<Grid item sm={12} md={4} xs={12}>
  <div className={styles.maen_divabout}>
<div className={styles.heding_tis_about}>
    <Typography>
    What is Algo trading?    </Typography>
</div>
<div className={styles.tis_peregaraf_list}>
<Typography>
Algo trading also known as Algorithmic trading, is a method of executing orders using automated per-programmed trading instructions accounting for variables such as time, price, and volume.
</Typography>
<Typography>
Algorithmic trading(automated trading, black-box trading, or algo trading) is the process of using computers programmed to follow a defined set of instructions for placing a trade to generate profits at a speed and frequency that is impossible for a human trader.</Typography>
<Typography>
TIS BULL is a technological trading platform for everyone. It provides automatic trading in equities, futures, and currencies with real-time display of notional profit/loss and allows users to pause ongoing patterns, stop buying, and many more.</Typography>
</div>
<div>
  <Button href='/signup' className={styles.startbutt}>Start  Now </Button>
</div>
</div>
</Grid>
<Grid item sm={12} md={8} xs={12} style={{    padding:'0px 0px 0px 103px'}}>
    <div className={styles.img_list_pohot}>
        <img 
        // height={600}  width={1000}
         src='../../Today orders.png' />
    </div>
</Grid>
</Grid>
    
    </>
  )
}

export default main