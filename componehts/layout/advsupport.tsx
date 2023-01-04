
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { display } from '@mui/system';
import styles from './advsupport.module.scss'
const main = () => {
  return (
    <>

      {/* <Grid container className={styles.listmenucantr}> */}
        {/* <Grid item sm={0} md={5} xs={0} className={styles.bgcolor_peg}>
          <div className={styles.listtebalboy}>
            {/* <img  src='../../Attribution modeling 1.png'></img> */}
          {/* </div>
          <div className={styles.oboxline}>
          <img  src='../../Group 1000001428.svg'></img>
          </div>
        </Grid>
        <Grid item sm={12} md={7} xs={12} className={styles.maen_geidsty} >
          <div style={{display:"flex",justifyContent:'space-between'}}>
          <div className={styles.logotis}>
            {/* <img */}
            {/* //  height={600} 
              // src='../../Group 32.svg'></img> */}
          {/* </div>
          <div style={{padding:'80px 0px 0px 0px',width:'39%'}}>
          <div className={styles.bgcolor_peg2}>
            <img src='../../Ellipse 19 (1).png'></img>
          </div>
          </div>
          </div> */}
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
        {/* </Grid>  */}
      {/* </Grid> */}
      <Grid container>
        <Grid item sm={12} md={6} xs={12} className={styles.maen_geidsty2}>
          <div className={styles.logotis2}>
            <div >
              <img height={'700px'} src='../../mobile mockup 1.svg'></img>
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
        <Grid item sm={12} md={6} xs={12} className={styles.maen_geidsty}>
          <div  className={styles.oboxline}>
     <div className={styles.textperegaf}><Typography>Control in your hand</Typography></div>
<div className={styles.listmaendivall}>
  <Typography className={styles.youalldatatypo}>You can manage all the pattern using your smartphone  by using the app you can create pattern, edit pattern, play pattern,  pause pattern delete pattern, edit pattern.
  </Typography>
  <Typography className={styles.youalldatatypo}>
You can update your Zerodha access token by using APP. Manage all the thing in your smart phone using chart you can see your  profit/loss.
</Typography>
<Typography className={styles.youalldatatypo}>
By our suggestion tab you can get the suggestion for most volatility script in the market.
</Typography>
</div>
<div style={{display:'flex',    padding:'20px 0px 0px 50px'}}>
  <Button><img src='../../android 1.svg' /></Button>
  <Button><img src='../../apple 1.svg' /></Button>

</div>
<div style={{height:"205px"}}></div>
</div>

        </Grid>
      </Grid>
      <Grid container className={styles.listcontenardata}>

<Grid item sm={12} md={12} xs={12}>
    {/* <Box> */}
    <div className={styles.heding_features}>
        <Typography>
            Features
        </Typography>
    </div>
    <div className={styles.heding_features_p}>
        <Typography>
            We prodive you the safe and secure platform to manage your funds
        </Typography>
    </div>
</Grid>
<Grid item sm={12} md={4} xs={12} >
    <div className={styles.containar_fea}>
        <div className={styles.img_text_div122}>
            <div>
                <img src='../../Group 42.png' />
            </div>
            <div className={styles.chart_text}>
                <Typography>
                Trade in equities, currencies, futures
                </Typography>
                <Typography className={styles.nonpeeegarf}>
                The application provides trading services across equities, currencies, futures.
                                    </Typography>
            </div>
        </div>
        <div className={styles.img_text_div1}>
            <div>
                <img src='../../Group 45.png' />
            </div>
            <div className={styles.chart_text}>
                <Typography>
                Emotionless Trading
                </Typography>
                <Typography className={styles.nonpeeegarf}>
                It carries out the trades on mathematical calculation of automatically eliminating the psychology or emotions like fear, indecisiveness, impatience which sometimes can lead to unwanted results.
                    </Typography>
            </div>
        </div>
    </div>
</Grid>
<Grid item sm={12} md={4} xs={12}>
    <div className={styles.containar_fea}>
        <div className={styles.img_text_div}>
            <div>
                <img src='../../Group 43.png' />
            </div>
            <div className={styles.chart_text}>
                <Typography>
                Step wise automatic trading
                                    </Typography>
                                    <Typography className={styles.nonpeeegarf}>
                                    It performs step wise trades of buy and sell according to the changes taking place in the market, which results increase in the overall rate of returns.
                                    </Typography>
            </div>
        </div>
        <div className={styles.img_text_div}>
            <div>
                <img src='../../Group 46.png' />
            </div>
            <div className={styles.chart_text}>
                <Typography>
                Control in your hands
                </Typography>
                <Typography className={styles.nonpeeegarf}>

                In spite of being fully automatical, Genomic Trader provides users to pause ongoing pattern, stop buy/sell orders and exit market which maybe sometime useful in volatile stocks and to gain short term profits.
                    </Typography>
            </div>
        </div>
    </div>
</Grid>
<Grid item sm={12} md={4} xs={12}>
    <div className={styles.containar_fea}>
        <div className={styles.img_text_div3}>
            <div>
                <img src='../../Group 44.png' />
            </div>
            <div className={styles.chart_text}>
                <Typography>
                View live notional profit/loss
                   </Typography>
                   <Typography className={styles.nonpeeegarf}>
                   Real time notional profit/loss data can be viewed in the application which provides ease and managment of funds for users.
                                    </Typography>
            </div>
        </div>
        <div className={styles.img_text_div3}>
            <div>
                <img src='../../Group 47.png' />
            </div>
            <div className={styles.chart_text}>
                <Typography>
                    Chart based representation
                </Typography>
                <Typography className={styles.nonpeeegarf}>

                Investments in pattern, gold and available funds is represented in chart form as well as profit is represented in bar-chart format for the ease of users.
                    </Typography>
            </div>
        </div>
    </div>
</Grid>
</Grid>
    </>
  )
}

export default main