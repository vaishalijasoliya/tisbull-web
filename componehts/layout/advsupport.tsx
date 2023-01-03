
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { display } from '@mui/system';
import styles from './advsupport.module.scss'
const main = () => {
  return (
    <>

      <Grid container className={styles.listmenucantr}>
        <Grid item sm={0} md={5} xs={0} className={styles.bgcolor_peg}>
          <div className={styles.listtebalboy}>
            <img  src='../../Attribution modeling 1.png'></img>
          </div>
          <div className={styles.oboxline}>
          <img  src='../../Group 1000001428.svg'></img>
          </div>
        </Grid>
        <Grid item sm={12} md={7} xs={12} className={styles.maen_geidsty} >
          <div style={{display:"flex",justifyContent:'space-between'}}>
          <div className={styles.logotis}>
            <img
             height={600} 
              src='../../Group 32.svg'></img>
          </div>
          <div style={{padding:'80px 0px 0px 0px',width:'39%'}}>
          <div className={styles.bgcolor_peg2}>
            <img src='../../Ellipse 19 (1).png'></img>
          </div>
          </div>
          </div>
          {/* <div className={styles.heding_advauto}>
            <Typography>
              Advance Automation
            </Typography>
          </div>
          <div className={styles.heding_providing}>
            <Typography>
              We are providing automation order with less user efforts.
            </Typography>
          </div> */}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={7} xs={12} className={styles.maen_geidsty2}>
          <div className={styles.logotis2}>
            <div >
              <img height={'689px'} src='../../mobile mockup 1.svg'></img>
            </div>
            {/* <div className={styles.heding_advauto2}>
              <Typography>
                Advance Support
              </Typography>
            </div>
            <div className={styles.heding_providing2}>
              <Typography>
                We are trusted and supported for multi broker
              </Typography>
            </div> */}
          </div>

        </Grid>
        <Grid item sm={12} md={5} xs={12} className={styles.bgcolor_peg222} >
     <div className={styles.textperegaf}><Typography>Control in your hand</Typography></div>
<div>
  <Typography className={styles.youalldatatypo}>You can manage all the pattern using your smartphone  by using the app you can create pattern, edit pattern, play pattern,  pause pattern delete pattern, edit pattern.
  </Typography>
  <Typography className={styles.youalldatatypo}>
You can update your Zerodha access token by using APP. Manage all the thing in your smart phone using chart you can see your  profit/loss.
</Typography>
<Typography className={styles.youalldatatypo}>
By our suggestion tab you can get the suggestion for most volatility script in the market.
</Typography>
</div>
<div style={{display:'flex'}}>
  <Button><img src='../../android 1.svg' /></Button>
  <Button><img src='../../apple 1.svg' /></Button>

</div>
        </Grid>
      </Grid>

    </>
  )
}

export default main