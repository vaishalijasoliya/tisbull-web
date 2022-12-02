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
    console.log(listpatt, 'data55');

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
                //         const accoyty = [];
                //         const datalist = [];
                //         const datalogo = []
                const listdata = []
                // for (let index = 0; index < patternDelete.pattern.length; index++) {
                // const element = patternDelete.pattern[index];
                // console.log(patternDelete.element,'element');

                //             const object = {
                //                 id: element.id,
                //                 script: element.name,
                //                 exchange: element.exchange,
                //                 type_pattern: element.orderId,
                //                 investment: element.quantity,
                //                 profit: element.price,
                //                 stock: element.transactionType,
                //                 created_at: element.createdAt,
                //                 status: element.status
                // }
                // listdata.push(JSON.parse(JSON.stringify(patternDelete)))
                //             datalogo.push(JSON.parse(JSON.stringify(object.status)))
                //             datalist.push(JSON.parse(JSON.stringify(object)))
                //             accoyty.push(JSON.parse(JSON.stringify(object)))
                //             // csvall.push(objectcsv)
            }
            //         setDatasars(listdata)
            //         setDatalist(datalogo)
            //         setDatatebalpettan(accoyty)

            //     }

        }
    }
    console.log(data, 'listkkk');

    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            patternlist()
        }
    }, [])
    return (
        <Grid  className={styles.cantenatdata} container style={{padding:'70px 0px 30px 0px'}}>

            {/* <div style={{padding:'80px 0px 30px 62px'}}> */}
            {/* <div style={{display:'flex',padding:'80px 0px 30px 62px'}}> */}
            <Grid item sm={12} md={3} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
{/* <div  > */}
                <div className={styles.datadivcallaloo}  style={{ display: 'flex', alignItems: 'center', 

                padding: '0px 50px 0px 60px'
                 }}
                >
                    <div >
                        <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Script</Typography>
                        <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#333333' }}>{data.script}</Typography>
                    </div>
                    <div style={{ padding: '0px 0px 0px 25px' }}>
                        <Box style={{ 'background': 'rgba(240, 240, 240, 0.97)', 'borderRadius': '2px', padding: '1px 2px 1px 2px' }}><Typography style={{ 'font-size': '6px', 'color': '#858789' }}>NSE</Typography></Box>
                    </div>
                </div>
                {/* </div> */}
                {/* <Grid  item sm={1} md={1} xs={1}> */}
                {/* <Grid item sm={12} md={3} xs={12} style={{display:'flex'}}> */}
                <div className={styles.datadivcallaloo}  style={{ padding: '10px 80px 0px 0px' }}>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Type</Typography>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#333333' }}>Basic</Typography>
                </div>
                </Grid>

            {/* </Grid>
             <Grid item sm={2} md={2} xs={2}>

            </Grid>
            {/* </Grid> */}
            {/* <Grid  item sm={6} md={12} xs={6} style={{display:'flex'}}> */}
            {/* <Grid item sm={2} md={2} xs={2}> */}
            <Grid item sm={12} md={3} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
            
            <div className={styles.datadivcallaloo}  style={{ padding: '10px 80px 0px 0px' }}>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Entry</Typography>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#333333' }}>{data.enterPrice == null ? '-' : data.enterPrice}</Typography>
                </div>
                <div className={styles.datadivcallaloo}  style={{ padding: '10px 80px 0px 0px' }}>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Exit</Typography>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#333333' }}>{data.exitPrice == null ? '-' : data.exitPrice}</Typography>
                </div>
            {/* </Grid> */}
            {/* <Grid item sm={2} md={2} xs={2}> */}

               
            </Grid>
            <Grid item sm={12} md={4} xs={12} className={styles.flexlisjjs} style={{display:'flex'}}>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Buy Diffrerance</Typography>
                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#333333' }}>{data.buy == null ? '-' : data.buy}</Typography>
                </div>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Sell Diffrerance</Typography>
                <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#333333' }}>{data.sell == null ? '-' : data.sell}</Typography>
            </div>
           
            </Grid>
            <Grid item sm={12} md={2} xs={12} style={{display:'flex'}}>
            <div style={{ padding: '10px 80px 0px 0px' }}>
                <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Target</Typography>
                <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#009947' }}>600</Typography>
            </div>
</Grid>
            {/* </div> */}
            {/* </Grid> */}
            {/* </Grid> */}

            {/* <div style={{padding:'50px 0px 0px 0px',display:'flex'}}> */}
            <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'50px 0px 0px 60px'}}>

              <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>StopLoss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#E31E24'}}>350</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px',}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Investment</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{data.investment == '' ?'-':data.investment}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading} style={{display:'flex',padding:'50px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>No. of Levels</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>3</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Enter Point</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>450</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading} style={{display:'flex',padding:'50px 0px 30px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Tick Type</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{data.tickSize == null ? '-':data.tickSize}</Typography>
                    </div>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Created At</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{ moment(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12}  className={styles.listpading}  style={{display:'flex',padding:'50px 0px 30px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Edited At</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{ moment(data.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</Typography>
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
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Profit</Typography>
                        <Typography className={data.todayprofit >=0 ? styles.peregarflistlist:styles.redline}style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold"}}>{data.todayprofit == null ? '-':data.todayprofit }</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Loss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>-</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Pending orders</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{data.pendingOrder == null ? '-':data.pendingOrder}</Typography>
                    </div>
                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Executed Orders</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{data.executedOrder == null ? '-' :data.executedOrder}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 30px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Stock</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{data.stock == null ? '-':data.stock }</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Profit</Typography>
                        <Typography className={data.profit >=0 ? styles.peregarflistlist:styles.redline} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#009947'}}>{data.profit == null ? '-' :data.profit}</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'20px 0px 40px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Loss</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>-</Typography>
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
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Open</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{listpatt.open_price}</Typography>
                    </div>
                    <div
                    //  style={{padding:'0px 70px 0px 0px'}}
                     >
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Prev. Close</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>450</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>High</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>
                            {listpatt.high_price == null ? '-':listpatt.high_price}
                            </Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Low</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{listpatt.low_price ==null ?"-":listpatt.low_price  }</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Volumn</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>{listpatt.wtoken == null ? '-' :listpatt.wtoken}</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Market Cap </Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>612 ( Rs. Cr)</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Upper Circuit</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>600</Typography>
                    </div>
                    </Grid>
                {/* </div>  */}
            {/* })} */}

             {/* <div style={{display:'flex',padding:'30px 0px 50px 58px'}}> */}
             <Grid item sm={12} md={4} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 60px'}}>

                <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>Lower circuit</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>410</Typography>
                    </div>
                    <div style={{padding:'0px 70px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>52 weeks high</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>450</Typography>
                    </div>
                    </Grid>
                    <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{display:'flex',padding:'30px 0px 0px 0px'}}>

                    <div style={{padding:'0px 0px 0px 0px'}}>
                        <Typography className={styles.peregarflist} style={{'font-size': '12px','color': '#BDBDBD','textTransform':'uppercase'}}>52 weeks low</Typography>
                        <Typography className={styles.peregarflist} style={{'font-size':'14px','textTransform':'uppercase',fontWeight:"bold",'color':'#333333'}}>400</Typography>
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