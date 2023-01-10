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

    console.log(props.data, 'langatgagar');

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
        <Grid className={styles.cantenatdata} container>
            <Grid item md={12}><Typography className={styles.grenraddataop}>General</Typography></Grid>
            <Grid item md={5} display={'flex'} justifyContent={'space-between'} className={styles.listgridffgpo}>
                {/* <div> */}
                <div className={styles.listjastifay}>


                    <div className={styles.listmaerngrid}>
                        <div className={styles.listmaendivdata}>
                            <Typography className={styles.hedingdata}>Script</Typography>
                            <Typography className={styles.accodata}>{props.listdatamenu}</Typography>
                        </div>
                        <div className={styles.listnscdaa}><Typography>NSE</Typography></div>
                    </div>
                    <div>
                        <div>
                            <Typography className={styles.hedingdata}>Investment</Typography>
                            <Typography className={styles.accodata}>{props.data.investment == '' ? '-' : props.data.investment}</Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.listjastifay}>
                    <div className={styles.typoanfnull}>
                        <Typography className={styles.hedingdata}>Type</Typography>
                        <Typography className={styles.accodata}>{props.data.type == 'BasicPattern' ? 'BASIC' : props.data.type == 'CustomPattern' ? 'Custom' : ''}</Typography>
                    </div>

                    <div className={styles.typoanfnull}>
                        <Typography className={styles.hedingdata}>No. of Levels</Typography>
                        <Typography className={styles.accodata}>null</Typography>
                    </div>
                </div>
                <div className={styles.listmenunum}><img src="../../Rectangle 4714.svg" /></div>

                <div className={styles.listmaendivdataa}>
                    <div className={styles.listjastifay}>
                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>Entry</Typography>
                            <Typography className={styles.accodata}>{props.data.enterPrice == null ? '-' : props.data.enterPrice}</Typography>
                        </div>

                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>StopLoss</Typography>
                            <Typography className={styles.accodata22}>{props.data.exitPrice == null ? '-' : props.data.exitPrice}</Typography>
                        </div>
                    </div>

                    <div>
                        <div className={styles.listjastifay}>
                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>Exit</Typography>
                                <Typography className={styles.accodata}>{props.data.exitPrice == null ? '-' : props.data.exitPrice}</Typography>
                            </div>

                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>Target</Typography>
                                <Typography className={styles.accodata21}>{props.data.target_price == null ? '-' : props.data.target_price}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item md={7} display={'flex'} justifyContent={'space-between'} className={styles.listgridffgpo}>
                <div className={styles.listmenunum}><img src="../../Rectangle 4714.svg" /></div>
                <div className={styles.listjastifay}>


                    <div className={styles.typoanfnull}>
                        <Typography className={styles.hedingdata}>Buy Diff.</Typography>
                        <Typography className={styles.accodata}>{props.data.buy == null ? '-' : props.data.buy}</Typography>
                    </div>
                    <div>
                        <div>
                            <Typography className={styles.hedingdata}>Tick Type</Typography>
                            <Typography className={styles.accodata}>{props.data.tickSize == null ? '-' : props.data.tickSize}</Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.listjastifay}>
                    <div className={styles.typoanfnull}>
                        <Typography className={styles.hedingdata}>Sell Diff.
                        </Typography>
                        <Typography className={styles.accodata}>{
                            props.data.sell == null ? '-' : props.data.sell}</Typography>
                    </div>

                    <div className={styles.typoanfnull}>
                        <Typography className={styles.hedingdata}>Enter Point</Typography>
                        <Typography className={styles.accodata}>{props.data.enterPrice == '' ? '-' : props.data.enterPrice}</Typography>
                    </div>
                </div>
                <div className={styles.listmenunum}><img src="../../Rectangle 4714.svg" /></div>

                <div className={styles.listmaendivdataa}>
                    <div className={styles.listjastifay}>
                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>START DATE
                            </Typography>
                            <Typography className={styles.accodata}>-</Typography>
                        </div>

                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>Created At</Typography>
                            <Typography className={styles.accodata}>{moment(props.data.createdAt).format("D  MMM YYYY h:mm a")}</Typography>
                        </div>
                    </div>

                    <div>
                        <div className={styles.listjastifay}>
                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>END DATE  At</Typography>
                                <Typography className={styles.accodata}>-</Typography>
                            </div>

                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>Edited At</Typography>
                                <Typography className={styles.accodata}>{moment(props.data.updatedAt).format("D  MMM YYYY h:mm a")}</Typography>
                            </div>
                        </div>
                    </div>
                </div>

            </Grid>
            <Grid item md={12} style={{padding:'10px 0px'}}>
            <Divider />
            </Grid>
            <Grid item md={8}><Typography className={styles.grenraddataop22}>Today’s Positions</Typography></Grid>
            <Grid item md={4}><Typography className={styles.grenraddataop223}>Overview</Typography></Grid>
            <Grid item md={8} display={'flex'} justifyContent={'space-between'} className={styles.listsumruiko}>
            <div className={styles.listsekenddiv}>
                            <Typography className={styles.hedingdata}>Profit</Typography>
                            <Typography className={props.data.todayprofit > 0 ?styles.accodata21:styles.accodata22}>{props.data.todayprofit == null ? '-' : props.data.todayprofit}</Typography>
                        </div>  
                        <div className={styles.listsekenddiv}>
                            <Typography className={styles.hedingdata}>Pending orders</Typography>
                            <Typography className={styles.accodata}>{props.data.pendingOrder == null ? '-' : props.data.pendingOrder}</Typography>
                        </div>  
                        <div className={styles.listsekenddiv}>
                            <Typography className={styles.hedingdata}>Executed Orders</Typography>
                            <Typography className={styles.accodata}>{props.data.executedOrder == null ? '-' : props.data.executedOrder}</Typography>
                        </div>
                        <div className={styles.listsekenddiv}>
                            <Typography className={styles.hedingdata}>Stock</Typography>
                            <Typography className={styles.accodata}>{props.data.stock == null ? '-' : props.data.stock}</Typography>
                        </div>
            </Grid>
            <Grid item md={4} display={'flex'} justifyContent={'space-between'}  className={styles.listgridffgpo}>
            <div className={styles.listsekenddiv}>
                            <Typography className={styles.hedingdata}>Profit</Typography>
                            <Typography className={props.data.todayprofit > 0 ?styles.accodata21:styles.accodata22}>{props.data.todayprofit == null ? '-' : props.data.todayprofit}</Typography>
                        </div>   
            </Grid>
            {/* <Grid item md={12} style={{padding:'10px 0px'}}>
            <Divider />
            </Grid> */}
            {/* <Grid item md={8}><Typography className={styles.grenraddataop22}>Market Depth </Typography></Grid>
            <Grid item md={6} display={'flex'} className={styles.listgriddispo}>
            <div className={styles.listmaendivdataa}>
                    <div className={styles.listjastifay}>
                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>Open</Typography>
                            <Typography className={styles.accodata}>{props.listpatt.open}</Typography>
                        </div>

                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>Prev. Close</Typography>
                            <Typography className={styles.accodata}>{props.listpatt.close}</Typography>
                        </div>
                    </div>

                    <div>
                        <div className={styles.listjastifay}>
                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>High</Typography>
                                <Typography className={styles.accodata}>    {props.listpatt.high}</Typography>
                            </div>

                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>Low</Typography>
                                <Typography className={styles.accodata}>{props.listpatt.low}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.listmenunum}><img src="../../Rectangle 4714.svg" /></div>
                <div className={styles.listmaendivdataa}>
                    <div className={styles.listjastifay}>
                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>52 weeks high</Typography>
                            <Typography className={styles.accodata}>{props.data.enterPrice == null ? '-' : props.data.enterPrice}</Typography>
                        </div>

                        <div className={styles.typoanfnull}>
                            <Typography className={styles.hedingdata}>StopLoss</Typography>
                            <Typography className={styles.accodata22}>{props.data.exitPrice == null ? '-' : props.data.exitPrice}</Typography>
                        </div>
                    </div>

                    <div>
                        <div className={styles.listjastifay}>
                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>Exit</Typography>
                                <Typography className={styles.accodata}>{props.data.exitPrice == null ? '-' : props.data.exitPrice}</Typography>
                            </div>

                            <div className={styles.typoanfnull}>
                                <Typography className={styles.hedingdata}>Target</Typography>
                                <Typography className={styles.accodata21}>{props.data.target_price == null ? '-' : props.data.target_price}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid> */}
            
        </Grid>
    );
}
export default main