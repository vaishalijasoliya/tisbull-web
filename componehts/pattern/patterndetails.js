import styles from "./patterndetail.module.scss";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import React, { useState } from "react";
import moment from 'moment';
import { useRouter } from 'next/router';

const main = (props) => {
    const router = useRouter();
    const [listidmenu, setIdlistdata] = React.useState('')

    const [data, setData] = useState([])
  const [listpatt, setListpatt] = useState([])
  const [listless, setLisee] = React.useState([])
    // console.log(props.router.query.data, 'gggggggg');
   
      console.log(props.data,'langatgagar');

    //   React.useLayoutEffect(() => {
    //     async function fetchData() {
    //         if (!!props.router && !!props.router.query && !!props.router.query.data) {
    //             isView = true;
    //             patternlist(JSON.parse(router.query.id))
    //         } else {
    //             if (!!props.profile && !!props.profile.token) {
    //                 props.loaderRef(true)
    //                 await getAccounts();
    //                 await getScirp(scripItem.id);
    //                 props.loaderRef(false)
    //             }
    //         }
    //         startLableAnimation()
    //     }
        // theme.palette.text.disabled = '#000000';
        // fetchData()
        // return () => {
        //     theme.palette.text.disabled = 'rgba(55, 65, 81, 0.48)';
        //     if (!!stockInterval) {
        //         clearInterval(stockInterval)
        //     }
        // }
    // }, [])
//   React.useEffect(() => {
//     console.log('useEffects ', props);
//     if (!!props.props.profile && !!props.props.profile.token) {
//             patternlist(router.query.emailID)
//     }
//   }, [props.router])

  console.log(props, 'useEffects');
    return (
        <Grid  className={styles.cantenatdata} container>
            <Grid item sm={12} md={4} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
                <div className={styles.datadivcallaloo}  style={{ display: 'flex', alignItems: 'center', 

                padding: '0px 50px 0px 60px'
                 }}
                >
                    <div >
                        <Typography className={styles.peregarflist33} >Script</Typography>
                        <Typography className={styles.peregarflist44} >{props.listdatamenu}</Typography>
                    </div>
                    <div style={{ padding: '0px 0px 0px 25px' }}>
                        <Box style={{ 'background': 'rgba(240, 240, 240, 0.97)', 'borderRadius': '2px', padding: '0px 2px 0px 2px' }}><Typography className={styles.listfonttypo} style={{ 'font-size': '8px', 'color': '#858789' }}>NSE</Typography></Box>
                    </div>
                </div>
                <div className={styles.datadivcallaloo}  style={{ padding: '10px 31px 0px 0px' }}>
                    <Typography className={styles.peregarflist33} >Type</Typography>
                    <Typography className={styles.peregarflist44} >{props.data.type == 'BasicPattern' ? 'BASIC': props.data.type == 'CustomPattern' ?'Custom'  :''}</Typography>
                </div>
                </Grid>
            <Grid item sm={12} md={2} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
            
            <div className={styles.datadivcallaloo}>
                    <Typography className={styles.peregarflist33}>Entry</Typography>
                    <Typography className={styles.peregarflist44} >{props.data.enterPrice == null ? '-' : props.data.enterPrice}</Typography>
                </div>
                <div className={styles.datadivcallaloo}  >
                    <Typography className={styles.peregarflist33} >Exit</Typography>
                    <Typography className={styles.peregarflist44} >{props.data.exitPrice == null ? '-' : props.data.exitPrice}</Typography>
                </div>
            </Grid>
            <Grid item sm={12} md={4} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                    <Typography className={styles.peregarflist33} >Buy Diffrerance</Typography>
                    <Typography className={styles.peregarflist44} >{props.data.buy == null ? '-' : props.data.buy}</Typography>
                </div>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                <Typography className={styles.peregarflist33} >Sell Diffrerance</Typography>
                <Typography className={styles.peregarflist44} >{
                    props.data.sell == null ? '-' : props.data.sell}</Typography>
            </div>
           
            </Grid>
            <Grid item sm={12} md={2} xs={12} style={{display:'flex'}}>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                <Typography className={styles.peregarflist33}>Target</Typography>
                <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#009947' }}>{props.data.target_price ==null ?'-':props.data.target_price }</Typography>
            </div>
</Grid>
            <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'50px 0px 0px 60px'}}>

              <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >StopLoss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#E31E24'}}>{props.data.exitPrice == null ? '-':props.data.exitPrice}</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px',}}>
                        <Typography className={styles.peregarflist33} >Investment</Typography>
                        <Typography className={styles.peregarflist44} >{props.data.investment == '' ?'-':props.data.investment}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading} style={{display:'flex',padding:'50px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >No. of Levels</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Enter Point</Typography>
                        <Typography className={styles.peregarflist44} >{props.data.enterPrice == '' ? '-':props.data.enterPrice}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading} style={{display:'flex',padding:'50px 0px 30px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Tick Type</Typography>
                        <Typography className={styles.peregarflist44} >{props.data.tickSize == null ? '-':props.data.tickSize}</Typography>
                    </div>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Created At</Typography>
                        <Typography className={styles.peregarflist44} >{ moment(props.data.createdAt).format("D  MMM YYYY h:mm a")}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading}  style={{display:'flex',padding:'50px 0px 30px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Edited At</Typography>
                        <Typography className={styles.peregarflist44} >{ moment(props.data.updatedAt).format("D  MMM YYYY h:mm a")}</Typography>
                    </div>
                    </Grid>
    
              <Grid item sm={12} md={12} xs={12} >

              <Divider style={{border:'1px solid #E4F4E9'}}></Divider>
              {/* <div> */}
              <div className={styles.datadivcalla} style={{display:'flex',padding:'0px 0px 0px 60px'}}>
                <div style={{padding:'30px 0px 0px 0px'}}>
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'130px'}}>Today’s Positions</Typography>
                </div>
                <div style={{padding:'30px 0px 0px 58px','display':'flex','justifyContent': 'end','width':'54%'}} >
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'71px'}}>Overview</Typography>
                </div>
                </div>
                </Grid>
             <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 60px'}}>

                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Profit</Typography>
                        <Typography className={props.data.todayprofit >=0 ? styles.peregarflistlist:styles.redline}style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold"}}>{props.data.todayprofit == null ? '-':props.data.todayprofit }</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Loss</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Pending orders</Typography>
                        <Typography className={styles.peregarflist44} >{props.data.pendingOrder == null ? '-':props.data.pendingOrder}</Typography>
                    </div>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Executed Orders</Typography>
                        <Typography className={styles.peregarflist44} >{props.data.executedOrder == null ? '-' :props.data.executedOrder}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 30px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Stock</Typography>
                        <Typography className={styles.peregarflist44} >{props.data.stock == null ? '-':props.data.stock }</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>Profit</Typography>
                        <Typography className={props.data.profit >=0 ? styles.peregarflistlist:styles.redline} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#009947'}}>{props.data.profit == null ? '-' :props.data.profit}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>Loss</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    </Grid>
            
              <Grid item sm={12} md={12} xs={12}>

              <Divider style={{border:'1px solid #E4F4E9'}}></Divider>

              <div style={{padding:'30px 0px 0px 58px'}}>
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'102px'}}>Market Depth </Typography>
                </div>
                </Grid>
         
        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 60px'}}>

                <div 
                style={{padding:'0px 70px 0px 0px'}}
                >
                        <Typography className={styles.peregarflist33}>Open</Typography>
                        <Typography className={styles.peregarflist44} >{props.listpatt.open}</Typography>
                    </div>
                    <div
                     >
                        <Typography className={styles.peregarflist33}>Prev. Close</Typography>
                        <Typography className={styles.peregarflist44} >{props.listpatt.close}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>High</Typography>
                        <Typography className={styles.peregarflist44} >
                            {props.listpatt.high}
                            </Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Low</Typography>
                        <Typography className={styles.peregarflist44} >{props.listpatt.low  }</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Volumn</Typography>
                        <Typography className={styles.peregarflist44}>{props.listpatt.volumn}</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Market Cap </Typography>
                        <Typography className={styles.peregarflist44} >{props.listpatt.market_cap}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Upper Circuit</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    </Grid>
                {/* </div>  */}
            {/* })} */}

             {/* <div style={{display:'flex',padding:'30px 0px 50px 58px'}}> */}
             <Grid item sm={12} md={4} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 60px'}}>

                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Lower circuit</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>52 weeks high</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >52 weeks low</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    </Grid>
    
        </Grid>
    );
}
export default main