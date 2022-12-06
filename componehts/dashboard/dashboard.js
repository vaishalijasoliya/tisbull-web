
import { Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import styles from './.module.scss'
import styles from './dashbosrd.module.scss'
import React, { Component } from "react";
import dynamic from 'next/dynamic';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import * as React from 'react';
import { toast } from 'react-toastify';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { string } from 'yup';
import { number } from 'yup/lib/locale';

function createData(name, calories) {
    return { name, calories };
}

// const rows = [
//     createData('Frozen yoghurt', <Button className={styles.list_doun}><ArrowDropDownIcon />20<CurrencyRupeeIcon className={styles.rupe_up} /></Button>),
//     createData('Ice cream sandwich', <Button className={styles.list_doun2}><ArrowDropUpIcon />20<CurrencyRupeeIcon className={styles.rupe_up} /></Button>),
//     createData('Eclair', 262),
//     createData('Cupcake', 305),
//     createData('Gingerbread', 356),
//     createData('Frozen yoghurt', 159),
//     createData('Ice cream sandwich', 237),
//     createData('Eclair', 262),
//     createData('Cupcake', 305),
//     createData('Gingerbread', 356),
//     createData('Frozen yoghurt', 159),
//     createData('Ice cream sandwich', 237),
//     createData('Eclair', 262),
//     createData('Cupcake', 305),
//     createData('Gingerbread', 356),
// ];
// const Chartdyanamic = dynamic(() => import("react-apexcharts"), { ssr: false });
const main = (props) => {
    console.log(props,'jsjhshhss');
    const [onlineUserList, setOnlineUserList] = React.useState([]);
    const activeData = []
    const [onlineDate, setonlineDate] = React.useState([]);
    const [active, setActive] = React.useState(['20']);
    const [data, setData] = React.useState([]);
    const [rows, setRows] = React.useState([])
    const [taballist, setTaballist] = React.useState([]);
    const [script, setScript] = React.useState([])
    // const [onlineDate, setonlineDate] = React.useState([]);
    // console.log(props, 'props');


    console.log(script, "script23")
    const chartloginuser = async () => {

        // console.log(id, 'id')

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        //  const data = await ApiServices.GetApiCall(ApiEndpoint.USER_COUNT_LIST, headers);

        var data = await ApiServices.GetApiCall(ApiEndpoint.DASHBOARD, headers)
        props.props.loaderRef(false)
        console.log(data, 'mydata');

        // console.log(props.props.profile, 'myyyydata')
        console.log(data, 'virang33');

        if (data.status == true) {
            const arr = []
            const date = []
            const tabaldata = []
            const tabalnumbar = []

            for (let index = 0; index < data.profitChart.length; index++) {
                const element = data.profitChart[index][0];
                const elementlist = data.profitChart[index][1];
                date.push(elementlist)
                arr.push(element)
            }
            for (let index = 0; index < data.lastProfitChart.length; index++) {
                const tabalelement = data.lastProfitChart[index];
                tabaldata.push(tabalelement)
                // console.log(tabalelement, 'tableelement');
                // for (let index = 0; index < tabalelement.length; index++) {
                //     const myelement = tabalelement[index];
                //     // console.log(myelement, 'myelement');
                //     

                // }
               
                // tabaldata.push(object)
                // tabalnumbar.push(tebalnumelementlist)
                // tabaldata.push(tabalelement)

            }

            const apidata = []
            apidata.push(data)
            // setRows(tabaldata)
            // setRows(tabalnumbar)
            // setTaballist(tabaldata)
            setScript(data.lastProfitChart)
            setData(data)
            setOnlineUserList(arr)
            setonlineDate(date)
        }



    }
    console.log(rows, 'onlineUserList');

    console.log(props.props, 'list');

    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            chartloginuser()
        }
    }, [])
    const obj = {
        nabar: "1.45",
    }

    // activeData.push(obj)
    // console.log(active,"virang");

    // setActive(series)
    var options = {

        // chart: {
        //     id: "basic-bar",
        //     height: 250,
        //     maxWidth: '500px',
        //     stacked: true,
        //     toolbar: {
        //         show: false
        //     },
        //     zoom: {
        //         enabled: true
        //     },
        //     lagend: {
        //         show: false
        //     },
        //     dataLables: {
        //         enabled: true,
        //         style: {
        //             colors: 'green'
        //         }
        //     }
        // },


        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: 0,
                        to: 1000000000000000000000000,
                        color: '#009947'
                    }, {
                        from: -1000000000000000000,
                        to: 0,
                        color: '#FF9FA2'
                    }]
                },
                columnWidth: '80%',
                borderRadius: 14,
                // borderRadius:'30px'
            }
        },
        // fill: {
        //     type: "gradient",
        //     gradient: {
        //         type: "vertical",
        //         colorStops: [
        //             {
        //                 offset: 0,
        //                 color: "#FF9FA2",
        //                 opacity: 1
        //             },
        //         ]
        //     }
        // },
        xaxis: {
            categories: onlineDate,
        },
    }
    var series = [
        {
            data: onlineUserList,
            name: "series-1",
            // data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
            //     5.8, -60, 60
            // ]

        },
    ]
    // setActive(series)
    return (
        <>

            <Grid container spacing={3} className={styles.cantenar_pading}>
                <Grid item sm={4} md={3} xs={12}>
                    <Box className={styles.box_paymenat}>
                        <div className={styles.total_list}>
                            <Typography>
                                Total Pattern
                            </Typography>
                        </div>
                        <div className={styles.div_box1img}>
                            <div className={styles.nabar_bas}>
                                <Typography>
                                    {data.pattern}
                                </Typography>
                            </div>
                            <div className={styles.log_imglock}>
                                <img src='../../011-pattern-lock.png' />
                            </div>
                        </div>
                    </Box>
                </Grid>
                <Grid item sm={4} md={3} xs={12}>
                    <Box className={styles.box_paymenat2}>
                        <div className={styles.total_list}>
                            <Typography>
                                Active Pattern
                            </Typography>
                        </div>
                        <div className={styles.div_box1img}>
                            <div className={styles.nabar_bas}>
                                <Typography>
                                    {data.patternOfActive}
                                </Typography>
                            </div>
                            <div className={styles.log_imglock}>
                                <img src='../../011-pattern-lock.png' />
                            </div>
                        </div>
                    </Box>
                </Grid>
                <Grid item sm={4} md={3} xs={12}>
                    <Box className={styles.box_paymenat3}>
                        <div className={styles.total_list}>
                            <Typography>
                                Total Pattern
                            </Typography>
                        </div>
                        <div className={styles.div_box1img}>
                            <div className={styles.nabar_bas}>
                                <Typography>
                                    {data.lastProfit}
                                </Typography>
                            </div>
                            <div className={styles.log_imglock}>
                                <img src='../../001-growth-chart.png' />
                            </div>
                        </div>
                    </Box>
                </Grid>
                <Grid item sm={12} md={4} xs={12}>
                    <Box className={styles.listheding}>
                        <div>
                            <Typography className={styles.hedingtotal}>
                                Total Profit
                            </Typography>
                        </div>
                        <div className={styles.loss_aaro}>
                            <Typography className={styles.list_nabarar}>
                                {data.lastProfit}
                            </Typography>
                            {/* <div></div> */}
                            <ArrowDropDownIcon />
                            <Typography className={styles.inkamlist}>
                                20
                            </Typography>
                            <CurrencyRupeeIcon className={styles.iconrupe} />
                            <Typography className={styles.from_typolast}>
                                from last week
                            </Typography>
                        </div>
                        <div className={styles.bodar_bottm}></div>
                        <div>
                            <TableContainer className={styles.table_lidt} component={Paper}>
                                <Table className={styles.table_lidt22} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Scrip</TableCell>
                                            <TableCell align="center">Profit</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {script.map((row) => (
                                            <>
                                                <TableRow
                                                key={row[1]}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                > 
                                                <TableCell scope="row">{row[1]}</TableCell>
                                                <TableCell ><Box id={styles.bpoxtabal} className={row[0] >=0 ? styles.boxred:styles.boxgeerin} >
                                                    {/* <div><div> */}
                                                   <div>{row[0] >=0 ? <ArrowDropUpIcon className={styles.doopuparr}/>:<ArrowDropDownIcon /> }</div> 
                                                   <div> {row[0]}</div></Box></TableCell>
                                            
                                                </TableRow>  
                                            </>
                                            // <TableRow
                                            //     // key={row.rows}
                                            //     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            // >{script == number ?
                                            //     <TableCell scope="row">
                                            //         {row.script[0]}{console.log(script,'script')
                                            //         }
                                            //     </TableCell>:
                                            //     <TableCell align="right">{row.script[1]}{console.log(script,'script22')}</TableCell>
                                            // }
                                            // </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Box>
                </Grid>
                <Grid item sm={12} md={8} xs={12}>
                    <Box className={styles.box_cast_list}>
                        <div className={styles.disple_box}>
                            <div className={styles.log_color_red}>
                                <div>
                                    <Box className={styles.box_palas}>

                                    </Box>
                                </div>
                                <div>
                                    <Typography>Profit</Typography>
                                </div>
                            </div>
                            <div className={styles.log_color_red}>
                                <div>
                                    <Box className={styles.box_palas2}>

                                    </Box>
                                </div>
                                <div>
                                    <Typography>Loss</Typography>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* <Chartdyanamic
                                className={styles.listnjhahjhb}
                                //   type: "vertical"
                                options={options}
                                series={series}
                                // series={series == "-10" ? "virang" : "mirav"}
                                type="bar"
                            /> */}
                        </div>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

// export default main
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(main);
