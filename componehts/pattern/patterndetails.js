import styles from "./patterndetail.module.scss";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import React, { useState } from "react";
import moment from 'moment';

const ResponsiveAppBar = (props) => {
    console.log(props.listlodar, 'propsprops');
    const [data, setData] = useState([])
    const [listpatt, setListpatt] = useState([])
    console.log(data, 'data55');

    const patternlist = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var body = {
            "id_pattern": props.proidlists,
            // props.idlist,
            // email: props.email,
            // otp: outField
        }
        console.log(body, 'body');

        props.props.loaderRef(true)
        // var data = await ApiServices.GetApiCall(ApiEndpoint.ORDERLIST, headers)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.PATTERN_VIEW, JSON.stringify(body), headers)

        // const data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        // console.log(patternDelete.pattern.buy, 'datalistddd');

        if (!!patternDelete) {
            if (patternDelete.status == true) {
                setListpatt(patternDelete.pattern.quote)
                setData(patternDelete.pattern)
             
            } else{
                toast.error(patternDelete.message)

            }
      

        }
    }
    console.log(data, 'listkkk');

    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            patternlist()
        }
    }, [])
    return (
        <Grid  className={styles.cantenatdata} container>

            {/* <div style={{padding:'80px 0px 30px 62px'}}> */}
            {/* <div style={{display:'flex',padding:'80px 0px 30px 62px'}}> */}
            <Grid item sm={12} md={4} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
{/* <div  > */}
                <div className={styles.datadivcallaloo}  style={{ display: 'flex', alignItems: 'center', 

                padding: '0px 50px 0px 60px'
                 }}
                >
                    <div >
                        <Typography className={styles.peregarflist33} >Script</Typography>
                        <Typography className={styles.peregarflist44} >{data.script}</Typography>
                    </div>
                    <div style={{ padding: '0px 0px 0px 25px' }}>
                        <Box style={{ 'background': 'rgba(240, 240, 240, 0.97)', 'borderRadius': '2px', padding: '1px 2px 1px 2px' }}><Typography style={{ 'font-size': '6px', 'color': '#858789' }}>NSE</Typography></Box>
                    </div>
                </div>
                {/* </div> */}
                {/* <Grid  item sm={1} md={1} xs={1}> */}
                {/* <Grid item sm={12} md={3} xs={12} style={{display:'flex'}}> */}
                <div className={styles.datadivcallaloo}  style={{ padding: '10px 80px 0px 0px' }}>
                    <Typography className={styles.peregarflist33} >Type</Typography>
                    <Typography className={styles.peregarflist44} >{data.type}</Typography>
                </div>
                </Grid>

            {/* </Grid>
             <Grid item sm={2} md={2} xs={2}>

            </Grid>
            {/* </Grid> */}
            {/* <Grid  item sm={6} md={12} xs={6} style={{display:'flex'}}> */}
            {/* <Grid item sm={2} md={2} xs={2}> */}
            <Grid item sm={12} md={2} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
            
            <div className={styles.datadivcallaloo}>
                    <Typography className={styles.peregarflist33}>Entry</Typography>
                    <Typography className={styles.peregarflist44} >{data.enterPrice == null ? '-' : data.enterPrice}</Typography>
                </div>
                <div className={styles.datadivcallaloo}  >
                    <Typography className={styles.peregarflist33} >Exit</Typography>
                    <Typography className={styles.peregarflist44} >{data.exitPrice == null ? '-' : data.exitPrice}</Typography>
                </div>
            {/* </Grid> */}
            {/* <Grid item sm={2} md={2} xs={2}> */}

               
            </Grid>
            <Grid item sm={12} md={4} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                    <Typography className={styles.peregarflist33} >Buy Diffrerance</Typography>
                    <Typography className={styles.peregarflist44} >{data.buy == null ? '-' : data.buy}</Typography>
                </div>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                <Typography className={styles.peregarflist33} >Sell Diffrerance</Typography>
                <Typography className={styles.peregarflist44} >{data.sell == null ? '-' : data.sell}</Typography>
            </div>
           
            </Grid>
            <Grid item sm={12} md={2} xs={12} style={{display:'flex'}}>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                <Typography className={styles.peregarflist33}>Target</Typography>
                <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#009947' }}>600</Typography>
            </div>
</Grid>
            {/* </div> */}
            {/* </Grid> */}
            {/* </Grid> */}

            {/* <div style={{padding:'50px 0px 0px 0px',display:'flex'}}> */}
            <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'50px 0px 0px 60px'}}>

              <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >StopLoss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#E31E24'}}>{data.exitPrice == null ? '-':data.exitPrice}</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px',}}>
                        <Typography className={styles.peregarflist33} >Investment</Typography>
                        <Typography className={styles.peregarflist44} >{data.investment == '' ?'-':data.investment}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading} style={{display:'flex',padding:'50px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >No. of Levels</Typography>
                        <Typography className={styles.peregarflist44} >null</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Enter Point</Typography>
                        <Typography className={styles.peregarflist44} >{data.enterPrice == '' ? '-':data.enterPrice}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading} style={{display:'flex',padding:'50px 0px 30px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Tick Type</Typography>
                        <Typography className={styles.peregarflist44} >{data.tickSize == null ? '-':data.tickSize}</Typography>
                    </div>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Created At</Typography>
                        <Typography className={styles.peregarflist44} >{ moment(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading}  style={{display:'flex',padding:'50px 0px 30px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Edited At</Typography>
                        <Typography className={styles.peregarflist44} >{ moment(data.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</Typography>
                    </div>
                    </Grid>
              {/* </div> */}
              {/* </div> */}
              <Grid item sm={12} md={12} xs={12} >

              <Divider style={{border:'1px solid #E4F4E9'}}></Divider>
              {/* <div> */}
              <div className={styles.datadivcalla} style={{display:'flex',padding:'0px 0px 0px 60px'}}>
                <div style={{padding:'30px 0px 0px 0px'}}>
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'130px'}}>Today’s Positions</Typography>
                </div>
                <div style={{padding:'30px 0px 0px 58px','display':'flex','justifyContent': 'end','width':'60%'}} >
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'71px'}}>Overview</Typography>
                </div>
                </div>
                </Grid>
             {/* <div style={{display:'flex',padding:'20px 0px 40px 60px'}}> */}
             <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 60px'}}>

                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Profit</Typography>
                        <Typography className={data.todayprofit >=0 ? styles.peregarflistlist:styles.redline}style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold"}}>{data.todayprofit == null ? '-':data.todayprofit }</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Loss</Typography>
                        <Typography className={styles.peregarflist44} >-</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Pending orders</Typography>
                        <Typography className={styles.peregarflist44} >{data.pendingOrder == null ? '-':data.pendingOrder}</Typography>
                    </div>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Executed Orders</Typography>
                        <Typography className={styles.peregarflist44} >{data.executedOrder == null ? '-' :data.executedOrder}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 30px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Stock</Typography>
                        <Typography className={styles.peregarflist44} >{data.stock == null ? '-':data.stock }</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>Profit</Typography>
                        <Typography className={data.profit >=0 ? styles.peregarflistlist:styles.redline} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#009947'}}>{data.profit == null ? '-' :data.profit}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>Loss</Typography>
                        <Typography className={styles.peregarflist44} >-</Typography>
                    </div>
                    </Grid>
                
              {/* </div> */}
              {/* </div> */}
              <Grid item sm={12} md={12} xs={12}>

              <Divider style={{border:'1px solid #E4F4E9'}}></Divider>

              {/* <div> */}
              <div style={{padding:'30px 0px 0px 58px'}}>
                    <Typography className={styles.peregarflist} style={{'font-size': '15px','color': '#333333',fontWeight:'bold',borderBottom:'3px solid #009947','borderRadius':'2px',width:'102px'}}>Market Depth </Typography>
                </div>
                </Grid>
                {/* {listpatt.map((row, index) => { */}
        {/* <div style={{display:'flex',padding:'30px 0px 0px 58px'}}> */}
        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 60px'}}>

                <div 
                style={{padding:'0px 70px 0px 0px'}}
                >
                        <Typography className={styles.peregarflist33}>Open</Typography>
                        <Typography className={styles.peregarflist44} >{listpatt.open_price}</Typography>
                    </div>
                    <div
                    //  style={{padding:'0px 70px 0px 0px'}}
                     >
                        <Typography className={styles.peregarflist33}>Prev. Close</Typography>
                        <Typography className={styles.peregarflist44} >450</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>High</Typography>
                        <Typography className={styles.peregarflist44} >
                            {listpatt.high_price == null ? '-':listpatt.high_price}
                            </Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Low</Typography>
                        <Typography className={styles.peregarflist44} >{listpatt.low_price ==null ?"-":listpatt.low_price  }</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Volumn</Typography>
                        <Typography className={styles.peregarflist44}>{listpatt.wtoken == null ? '-' :listpatt.wtoken}</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Market Cap </Typography>
                        <Typography className={styles.peregarflist44} >612 ( Rs. Cr)</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Upper Circuit</Typography>
                        <Typography className={styles.peregarflist44} >600</Typography>
                    </div>
                    </Grid>
                {/* </div>  */}
            {/* })} */}

             {/* <div style={{display:'flex',padding:'30px 0px 50px 58px'}}> */}
             <Grid item sm={12} md={4} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 60px'}}>

                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >Lower circuit</Typography>
                        <Typography className={styles.peregarflist44} >410</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist33}>52 weeks high</Typography>
                        <Typography className={styles.peregarflist44} >450</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist33} >52 weeks low</Typography>
                        <Typography className={styles.peregarflist44} >400</Typography>
                    </div>
                    {/* </div> */}
                    </Grid>
              {/* </div>  */}
            {/* </div>  */}
        </Grid>
    );
}
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);