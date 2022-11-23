import styles from "./patterndetail.module.scss";
import { Box, Divider, Grid, Typography } from "@mui/material";

export default function Summary() {
    return (
        <Grid container>
            <Grid  item sm={12} md={12} xs={12}>
                <div style={{padding:'80px 0px 30px 62px'}}>
              <div style={{display:'flex'}}>
                <div style={{display:'flex',alignItems:'center',padding:'0px 50px 0px 0px'}}>
                    <div >
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Script</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>AAPL</Typography>
                    </div>
                    <div style={{padding:'0px 0px 0px 25px'}}>
                        <Box style={{'background': 'rgba(240, 240, 240, 0.97)','borderRadius':'2px',padding:'1px 2px 1px 2px'}}><Typography style={{'font-size':'6px','color':'#858789'}}>NSE</Typography></Box>
                    </div>
                </div>
                <div style={{padding:'0px 80px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Type</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>Basic</Typography>
                    </div>
                    <div style={{padding:'0px 80px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Entry</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>400</Typography>
                    </div>
                    <div style={{padding:'0px 80px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Exit</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>500</Typography>
                    </div>
                    <div style={{padding:'0px 80px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Buy Diffrerance</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>5</Typography>
                    </div>
                    <div style={{padding:'0px 80px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Sell Diffrerance</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>10</Typography>
                    </div>
                    <div style={{padding:'0px 80px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Target</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#009947'}}>600</Typography>
                    </div>
              </div>
              <div style={{padding:'50px 0px 0px 0px',display:'flex'}}>
              <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>StopLoss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#E31E24'}}>350</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Investment</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>100k</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>No. of Levels</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>3</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Enter Point</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>450</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Tick Type</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>10</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Created At</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>12/10/2022 10:10:12</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Edited At</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>12/10/2022 10:10:12</Typography>
                    </div>
              </div>
              </div>
              <Divider style={{border:'1px solid #E4F4E9'}}></Divider>
              <div>
              <div style={{display:'flex'}}>
                <div style={{padding:'30px 0px 0px 58px'}}>
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'130px'}}>Today’s Positions</Typography>
                </div>
                <div style={{padding:'30px 0px 0px 58px','display':'flex','justifyContent': 'end','width':'60%'}} >
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'71px'}}>Overview</Typography>
                </div>
                </div>
             <div style={{display:'flex',padding:'20px 0px 40px 60px'}}>
                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Profit</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#009947'}}>450</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Loss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>-</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Pending orders</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>10</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Executed Orders</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>350</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Stock</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>5</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Profit</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#009947'}}>350</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Loss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>-</Typography>
                    </div>
                
              </div>
              </div>
              <Divider style={{border:'1px solid #E4F4E9'}}></Divider>

              <div>
              <div style={{padding:'30px 0px 0px 58px'}}>
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'102px'}}>Market Depth </Typography>
                </div>
                <div style={{display:'flex',padding:'30px 0px 0px 58px'}}>
                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Open</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>410</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Prev. Close</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>450</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>High</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>400</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Low</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>390</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Volumn</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>50,000</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Market Cap </Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>612 ( Rs. Cr)</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Upper Circuit</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>600</Typography>
                    </div>
                </div>
                <div style={{display:'flex',padding:'30px 0px 50px 58px'}}>
                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Lower circuit</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>410</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>52 weeks high</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>450</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>52 weeks low</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>400</Typography>
                    </div>
                    </div>
              </div>
            </Grid >
        </Grid >
    );
}