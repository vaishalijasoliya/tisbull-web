import Head from 'next/head';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
    Container,
    Autocomplete,
    RadioGroup,
    Radio,
    FormControlLabel,
    Dialog,
    DialogContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { DatePicker, DesktopDatePicker } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { connect } from 'react-redux';
import DatePickerll from "react-datepicker";
import Divider from '@mui/material/Divider';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { useRouter, withRouter } from 'next/router';
import { Grid } from 'material-ui-core';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import styles from '../styles/addpatt.module.scss'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import moment from 'moment';
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
let stockInterval = null;

const AddPattern = (props) => {

    const [script, setScript] = useState('')
    const [lotsize, setLotSize] = useState(1)
    const [tickSize, setTickSize] = useState('fix')
    const [scriptError, setScriptError] = useState(false);
    const [accountError, setAccountError] = useState(false);
    const [account, setAccount] = useState('')
    const [patternList, setPatternList] = useState([])
    const [accountList, setAccountList] = useState([])
    const [scripList, setScripList] = useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterScripList, setFilterScripList] = useState([]);
    const [defaultScripList, setDefaultScripList] = useState([]);
    const [scripDetails, setScripDetails] = useState('');
    const [isLockPatternDialog, setLockPattern] = useState(false);
    const [levelError, setLevelError] = useState(false);
    const [currentPriceError, setCurrentPriceError] = useState(false)
    const [scripLable, setScripLable] = useState('');
    const [listfiltar, setFilatlist] = useState('')
    const [listnone, setListnone] = useState('')
    const [tabaldatalist, setTebaldatalist] = useState('')

    const [listsummri, setLISTdatasumm] = useState("")
    console.log(startDate, 'startDate');
    const [level, setLevel] = useState({
        label: '3',
        id: '3'
    });
    const [scripType, setScripType] = useState([
        {
            label: 'None',
            id: ''
        },
        {
            label: 'CASH',
            id: 'CASH'
        },
        {
            label: 'COMMODITY',
            id: 'COMMODITY'
        },
        {
            label: 'CDS',
            id: 'CDS'
        },
        {
            label: 'FO',
            id: 'FO'
        },
        {
            label: 'OTHER',
            id: 'OTHER'
        }
    ]);
    const [patternType, setPatternType] = useState([
        {
            label: 'Basic Pattern',
            id: 'BasicPattern'
        },
        /* {
            label: 'Magic Pattern',
            id: 'MagicPattern'
        },
        {
            label: 'Pyramid Pattern',
            id: 'PyramidPattern'
        } */
    ]);
    const [scripItem, setScripItem] = useState({
        label: 'None',
        id: ''
    });
    const [buyArray, setBuyArray] = useState([])
    const [listobgll, setListobgll] = useState([])
    const [scripItemError, setScripItemError] = useState(false);
    const [patternItem, setPatternItem] = useState({
        label: 'Basic Pattern',
        id: 'BasicPattern'
    });
    const [iniyalbur, setIniyalBuy] = useState('')
    const [listinnewdata, setLiatstgs] = useState('')
    console.log(patternList, 'patternList');
    const [patternError, setPatternError] = useState(false);
    const [listarrobj, setListidzero] = useState([])
    const router = useRouter();
    console.log(listarrobj, 'listarrobSXSj');
    let isView = false;
    let serverData = {}
    const formik = useFormik({
        initialValues: {
            totalInvestment: '',
            currentPrice: '',
            script: '',
            minRange: '',
            maxRange: '',
            buyPrice: '',
            sellPrice: '',
            Target: '',
            Stoploss: '',
            Initailsell: ''

        },
        validationSchema: Yup.object({
            totalInvestment: Yup
                .string()
                .max(255)
                .required(
                    'Total Investment required'),
            Stoploss: Yup
                .string()
                .max(255)
                .required(
                    'Stoploss Investment required'),
            Target: Yup
                .string()
                .max(255)
                .required(
                    'Target is required'),
            currentPrice: Yup
                .string()
                .max(255)
                .required(
                    'Price is required'),
            minRange: Yup
                .string()
                .max(255)
                .required(
                    'Min Range is required'),
            SellSteps: Yup
                .string()
                .max(255)
                .required(
                    'AMO Sell UP Steps is required'),
            Initail: Yup
                .string()
                .max(255)
                .required(
                    'Initail Buy Steps is required'),
            Initailsell: Yup
                .string()
                .max(255)
                .required(
                    'Initail Sell Steps is required'),
            BuySteps: Yup
                .string()
                .max(255)
                .required(
                    'AMO Buy Down Steps is required'),
            NormalBuy: Yup
                .string()
                .max(255)
                .required(
                    'Normal Buy Down Steps is required'),
            NormalSell: Yup
                .string()
                .max(255)
                .required(
                    'Normal Sell UP Steps is required'),
            maxRange: Yup
                .string()
                .max(255)
                .required(
                    'Max Range is required'),
            buyPrice: Yup
                .string()
                .max(255)
                .required(
                    'Buy is required'),
            sellPrice: Yup
                .string()
                .max(255)
                .required(
                    'Sell is required')
        }),
        onSubmit: () => {
            // onAddPattern()
        },
    });
    console.log(formik.values.currentPrice, 'formik.values.currentPrice');
    React.useLayoutEffect(() => {
        if (!!props.router && !!props.router.query && !!props.router.query.data) {
            isView = true;
            serverData = JSON.parse(props.router.query.data);
            setData()
        }

        startLableAnimation()
        return () => {
            if (!!stockInterval) {
                clearInterval(stockInterval)
            }
        }
    }, [])
    useEffect(() => {
        async function fetchData() {
            if (!!router.query.scripType) {
                if (router.query.scripType == 'equity') {
                    setScripItem({
                        label: 'CASH',
                        id: 'CASH'
                    })
                    // props.props.loaderRef(true)
                    await getAccounts();
                    await getScirp('CASH')
                    // props.props.loaderRef(false)
                } else if (router.query.scripType == 'currency') {
                    setScripItem({
                        label: 'CDS',
                        id: 'CDS'
                    })
                    props.props.loaderRef(true)
                    await getAccounts();
                    await getScirp('CDS')
                    props.props.loaderRef(false)
                } else if (router.query.scripType == 'fo') {
                    setScripItem({
                        label: 'FO',
                        id: 'FO'
                    })
                    // props.props.loaderRef(true)
                    await getAccounts();
                    await getScirp('FO')
                    // props.props.loaderRef(false)
                }
            }
        }
        fetchData()
    }, [router.query.scripType])

    const startLableAnimation = async () => {
        setScripLable('')
        var text = 'Search Scrip';
        await startLableTextAnimation(text)
        await sleep(700)
        setScripLable('')
        var text1 = 'e.g. GOLD';
        await startLableTextAnimation(text1)
        await sleep(700)
        setScripLable('')
        var text2 = 'e.g. USDINR';
        await startLableTextAnimation(text2)
        await sleep(700)
        startLableAnimation()
    }

    const startLableTextAnimation = async (value) => {
        var text = value;
        var newText = ''
        for (var i = 0; i < text.length; i++) {
            await sleep(100)
            newText = newText + text.charAt(i)
            setScripLable(newText)
            await sleep(100)
        }
    }

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const setData = async () => {
        formik.setFieldValue('totalInvestment', serverData.investment);
        formik.setFieldValue('currentPrice', serverData.enterPrice)
        formik.setFieldValue('minRange', serverData.minRange)
        formik.setFieldValue('maxRange', serverData.maxRange)
        formik.setFieldValue('buyPrice', serverData.buy)
        formik.setFieldValue('sellPrice', serverData.sell)
        setTickSize(serverData.tickSize)
        await sleep(500)
        formik.submitForm()
    }

    const getAccounts = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var accountList = await ApiServices.GetApiCall(ApiEndpoint.ACCOUNT_LIST, headers)
        if (!!accountList && !!accountList.data) {
            var accountLableList = []
            for (let index = 0; index < accountList.data.length; index++) {
                const element = accountList.data[index];
                var obj = {
                    label: element.type + ` (${element.user_id})`,
                    id: element.id
                }
                accountLableList.push(JSON.parse(JSON.stringify(obj)));
                if (isView) {
                    if (element.id == serverData.id_account) {
                        setAccount(obj)
                    }
                }
            }
            setAccountList(accountLableList);
        }
    }
    const getoardarlist = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var accountList = await ApiServices.GetApiCall(ApiEndpoint.BASIC_ORDER, headers)
        console.log(accountList, 'accountListaccountList');
        // {console.lon(accountList.state,'accountHHList');}
        // if(!!accountList){
        if (accountList.status) {
            console.log(accountList, 'accountList.data.initail_buy');
            setIniyalBuy(accountList.data.initail_buy)
            formik.setFieldValue('Initail', accountList.data.initail_buy);
            formik.setFieldValue('BuySteps', accountList.data.amo_buy);
            formik.setFieldValue('SellSteps', accountList.data.amo_sell);
            formik.setFieldValue('NormalBuy', accountList.data.normal_buy);
            formik.setFieldValue('NormalSell', accountList.data.normal_sell);

            // setListidzero(accountList.data)          // toast.success(accountList.message)amo_sell
        }


    }
    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            // playpattern()
            // patternlist()
            // patternlistviwe()
            // Pausepattern()
            getoardarlist()
        }
    }, [])
    const getScirp = async (type) => {
        var body = {
            "type": type
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var accountList = await ApiServices.PostApiCall(ApiEndpoint.SCRIP_LIST, JSON.stringify(body), headers)
        console.log('getScirp', accountList)
        if (!!accountList && !!accountList.length > 0) {
            var accountLableList = []
            let filterScripList = []
            for (let index = 0; index < accountList.length; index++) {
                const element = accountList[index];
                var lableObj = "";
                if (!!element.name) {
                    lableObj = element.instrumentName + ` (${element.name}) (${element.exchange})`
                } else {
                    lableObj = element.instrumentName + `(${element.exchange}) - ${element.expiry}`
                }
                var obj = {
                    label: lableObj,
                    id: element.instrumentToken,
                    lotSize: element.multiplier
                }
                accountLableList.push(JSON.parse(JSON.stringify(obj)))
                if (isView) {
                    if (element.instrumentToken == serverData.scripToken) {
                        setScript(JSON.parse(JSON.stringify(obj)))
                    }
                }
                if (index < 300) {
                    filterScripList.push(JSON.parse(JSON.stringify(obj)))
                }
            }
            // setFilterScripList(filterScripList)
            // setDefaultScripList(filterScripList)
            // setScripList(accountLableList)
        }
    }

    const onAddPattern = async () => {
        var buyArray = [];
        for (var i = parseFloat(formik.values.maxRange);
            i >= parseFloat(formik.values.minRange);
            tickSize == 'fix' ? i = parseFloat((i - parseFloat(formik.values.buyPrice)).toFixed(2)) : i = parseFloat((i - ((i * parseFloat(formik.values.buyPrice)) / 100)).toFixed(2))) {
            buyArray.push(i)
        }
        var totalStep = buyArray.length;
        var patternArray = [];
        for (var i = parseFloat(formik.values.maxRange); i >= parseFloat(formik.values.minRange); tickSize == 'fix' ? i = parseFloat((i - parseFloat(formik.values.buyPrice)).toFixed(2)) : i = parseFloat((i - ((i * parseFloat(formik.values.buyPrice)) / 100)).toFixed(2))) {
            var buyValue = 0;
            var quantity = 0;
            var maxInvestPStep = parseFloat(formik.values.totalInvestment) / totalStep;
            quantity = Math.trunc(maxInvestPStep / (i * lotsize));
            if (i >= parseFloat(formik.values.currentPrice)) {
                buyValue = parseFloat(formik.values.currentPrice) * quantity * lotsize;
            } else {
                buyValue = i * quantity * lotsize;
            }
            var sellPrice = 0;
            if (tickSize == 'fix') {
                sellPrice = i + parseFloat(formik.values.sellPrice)
            } else {
                sellPrice = i + (parseFloat(formik.values.sellPrice) * i) / 100;
            }
            var sellValue = sellPrice * quantity * lotsize;
            var totalStock = 0;
            if (patternArray.length > 0) {
                for (let index = 0; index < patternArray.length; index++) {
                    console.log(patternArray, 'patternArraypatternArray');
                    totalStock += patternArray[index].qty;
                }
            }
            var totalInvestment = 0;
            if (patternArray.length > 0) {
                for (let index = 0; index < patternArray.length; index++) {
                    totalInvestment += patternArray[index].buyValue;
                }
            }

            var investmentWithCurrent = totalInvestment + buyValue;
            var sDisc = i - parseFloat(formik.values.currentPrice);
            var totalStockWithCurrent = totalStock + quantity;
            var avgPrice = investmentWithCurrent / totalStockWithCurrent
            var patternStep = {
                'step': patternArray.length + 1,
                'buyPrice': parseFloat(i.toFixed(2)),
                'sellPrice': parseFloat(sellPrice.toFixed(2)),
                'qty': parseFloat(quantity.toFixed(2)),
                'buyValue': parseFloat(buyValue.toFixed(2)),
                'sellValue': parseFloat(sellValue.toFixed(2)),
                'gross': parseFloat((sellValue - buyValue).toFixed(2)),
                'stock': totalStockWithCurrent.toFixed(2),
                'investment': parseFloat(investmentWithCurrent.toFixed(2)),
                'sDisc': sDisc > 0 ? sDisc.toFixed(2) : 0,
                'avg': (avgPrice / lotsize).toFixed(2),
                'isInitialBuy': '',
            }
            if (patternStep.qty !== 0) {
                patternArray.push(JSON.parse(JSON.stringify(patternStep)));
            }


        }
        // console.log(Arr,'ArrArrArr');
        console.log(formik.values.Initail, 'iniyalbur');
        var buyValueObj = patternArray.filter((item) => item.buyPrice == parseFloat(formik.values.currentPrice))
        if (buyValueObj.length > 0) {
            setPatternList(patternArray)
            console.log(patternArray, 'patternArray');
        } else {
            if (patternArray.length > 0) {
                setPatternList([])
                toast.error('Buy value in pattern not matched with currentPrice.')
            } else {
                toast.error('Investment value is too low as per your data.')
            }
        }
    }

    const getBuyArray = async (minRange, maxRange, buyPrice, tick = tickSize) => {
        formik.setFieldValue('currentPrice', '')
        if (!!minRange && !!maxRange && !!buyPrice) {
            var buyArray = [];
            for (var i = parseFloat(maxRange);
                i >= parseFloat(minRange);
                tick == 'fix' ? i = parseFloat((i - parseFloat(buyPrice)).toFixed(2)) : i = parseFloat((i - ((i * parseFloat(buyPrice)) / 100)).toFixed(2))) {
                buyArray.push(parseFloat(i.toFixed(2)))
            }
            setBuyArray(buyArray)
        } else {
            setBuyArray([])
        }
    }

    const onPreviewClick = () => {
        if (!scripItem.id) {
            console.log('scrip inside')
            setScripItemError(true)
        } else if (!formik.values.currentPrice || formik.values.currentPrice == '') {
            setCurrentPriceError(true)
        } else if (!script) {
            setScriptError(true)
        } else if (!level) {
            setLevelError(true)
        } else if (!patternItem.id) {
            setPatternError(true)
        } else {
            formik.submitForm()
        }
    }

    // let IndexA = '';
    // const Arr = patternList;
    // if (!!patternList) {
    //     for (let index = 0; index < Arr.length; index++) {
    //         const element = Arr[index];

    //         element.isInitialBuy = '';

    //         // console.log(element, '______ELEMENT______');

    //         // if (element.buyPrice == bodyObject.currentPrice) {
    //         //   console.log(Arr.indexOf(element), 'ELEMENT________IS__SAME');

    //         //   IndexA = Arr.indexOf(element);
    //         // }
    //     }
    // }

    // console.log(IndexA - bodyObject.initail_sell + 1, 'PATTERN____PREVIEW____');

    // for (
    //   let index = IndexA - bodyObject.initail_buy + 1;
    //   index <= IndexA;
    //   index++
    // ) {
    //   const element = Arr[index];

    //   console.log('INITIAL__BUY', element);

    //   element.isInitialBuy = 'isInitialBuy';
    //   // Arr.push(element);

    //   console.log(element.isInitialBuy,'IS_____INITIAL___BUY')
    // }



    console.log(patternItem.id, 'sjhhshss');
    const onLockPatternClick = async () => {
        var body = {

            "script": parseFloat(script.id),
            "limitOrder": level.id,
            "investment": parseFloat(formik.values.totalInvestment),
            "buy": parseFloat(formik.values.buyPrice),
            "enterPrice": parseFloat(formik.values.currentPrice),
            "sell": parseFloat(formik.values.sellPrice),
            "tickSize": tickSize,
            'target_price': parseFloat(formik.values.Target),
            'exitPrice': parseFloat(formik.values.Stoploss),
            "initail_buy": parseFloat(formik.values.Initail),
            "initail_sell": 0,
            "amo_buy": parseFloat(formik.values.SellSteps),
            "amo_sell": parseFloat(formik.values.BuySteps),
            "normal_buy": parseFloat(formik.values.NormalBuy),
            "normal_sell": parseFloat(formik.values.NormalSell),
            "minRange": parseFloat(formik.values.minRange),
            "maxRange": parseFloat(formik.values.maxRange),
            "pattern_data": patternList,
            "id_account": props.profile.userData.currentAccount.id,
            "pattern_type": patternItem.id,

        }
        if (!!startDate) {
            body.start_date = moment(startDate).format('YYYY-MM-DD')
}
        else if (!!endDate) {
            body.end_date = moment(endDate).format('YYYY-MM-DD')
}
        console.log('patternghgg', body)
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        props.props.loaderRef(true)
        var patternAdd = await ApiServices.PostApiCall(ApiEndpoint.ADD_PATTERN, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        console.log('patternAdd', patternAdd);
        if (!!patternAdd.success && patternAdd.success.length > 0) {
            console.log(patternAdd);
            let successStatus = patternAdd.success;
            successStatus.forEach(function (i, j) {
                toast.success(i);
            });
            router.push('/pattanlist');
        } else if (!!patternAdd.fault && patternAdd.fault.length > 0) {
            let errorStatus = patternAdd.fault;
            errorStatus.forEach(function (i, j) {
                toast.error(i);
            });
        } else {
            toast.error(patternAdd.message)
        }
    }
    console.log(patternList, 'patternList');
    const filterScrip = async (text) => {
        var body = {
            "name": text
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var accountList = await ApiServices.PostApiCall(ApiEndpoint.SCRIP_LIST, JSON.stringify(body), headers)
        console.log('getScirp', accountList)

        const lebal = []

        if (!!accountList && !!accountList.length > 0) {


            // setFilterScripList(accountList)
            // setDefaultScripList(accountList)
            var accountLableList = []
            for (let index = 0; index < accountList.length; index++) {
                const element = accountList[index];
                var obj = {
                    label: element.lableObj,
                    id: element.instrumentToken,
                    lotSize: element.multiplier
                }
                accountLableList.push(JSON.parse(JSON.stringify(obj)))
                console.log(element, 'element');
                lebal.push(JSON.parse(JSON.stringify(obj)))
            }
        }
        console.log(accountLableList, 'accountLableList');
        setListobgll(lebal)

        setScripList(lebal)
        setFilterScripList(lebal)

    }
    console.log(filterScripList, 'filterScripList');
    const filterScriplist = (text) => {
        var value = text
        console.log(value, 'valuesddd')

        // if (text.length >= 2) {
        console.log(text, 'shhhhssss');
        // var filterArray = scripList.filter((item) => item.label.toLowerCase().includes(text.toLowerCase()));
        //     console.log('filterArray', filterArray)
        //     setFilterScripList(filterArray)
        // } else {
        //     setFilterScripList(defaultScripList)
        // }
    }
    const getScripPrice = async (value) => {
        console.log('getScripPrice...', value)
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var body = {
            "instrumentToken": value.id
        }
        console.log(body, 'ajhha');
        var stockPrice = await ApiServices.PostApiCall(ApiEndpoint.GET_STOCK_PRICE, JSON.stringify(body), headers)
        console.log(stockPrice, 'stockPrice');
        if (!!stockPrice && !!stockPrice.success && stockPrice.success.length > 0) {
            console.log('stockPrice', stockPrice)
            setScripDetails(stockPrice.success[0])
        }
    }
    console.log(scripDetails, 'scripDetails')

    return (
        // <DashboardLayout>
        <Grid container >
            <Head>
                <title>
                    Add Patterns | TISTrading
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1
                }}
            >
                <Container maxWidth={false}>

                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Card className={listnone == 'bloack' ? styles.listcentenar : styles.bolkdatat} >
                            <CardContent>
                                {!!script && !!scripDetails && !!scripDetails.ltp && <Box sx={{ flexDirection: 'row', marginBottom: 3, display: 'flex' }}>
                                    {parseFloat(scripDetails.ltp) !== parseFloat(scripDetails.closing_price) ? <Box style={{ padding: '0px 60px 0px 0px' }} sx={{ flexDirection: 'row' }}>
                                        <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Current </Typography><Box style={{ display: 'flex' }}> {scripDetails.closing_price > 0 ? <Typography style={{ color: '#009947' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography> : <Typography style={{ color: '#E31E24' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography>}
                                            {((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#009947' }} /> : <ArrowDownwardIcon sx={{ marginLeft: 0.5, color: '#E31E24' }} />}
                                            <Typography className={styles.listpsllow} sx={{ color: (((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#00b8a6' : '#E31E24' }}>{`(${(((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)).toFixed(2)}%)`}</Typography>
                                        </Box></Box> : <Box sx={{ flexDirection: 'row' }} style={{ padding: '0px 60px 0px 0px' }}>
                                        <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Current</Typography> <Box style={{ display: 'flex' }}> {scripDetails.closing_price > 0 ? <Typography style={{ color: '#009947' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography> : <Typography style={{ color: '#E31E24' }} className={styles.listcereantlist}>{parseFloat(scripDetails.ltp).toFixed(2)}</Typography>}
                                            {((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#009947' }} /> : <ArrowDownwardIcon sx={{ marginLeft: 0.5, color: '#E31E24' }} />}
                                            <Typography className={styles.listpsllow} sx={{ color: (((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#009947' : '#E31E24' }}>{`(${(((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price)).toFixed(2)}%)`}</Typography>
                                        </Box>
                                    </Box>}
                                    <Box style={{ padding: '0px 60px 0px 0px' }}>   <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Open</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.open_price).toFixed(2)}</Typography></Box>

                                    <Box style={{ padding: '0px 60px 0px 0px' }}>  <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Prev. Close</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.closing_price).toFixed(2)}</Typography> </Box>

                                    <Box style={{ padding: '0px 60px 0px 0px' }}>   <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>Low</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.low_price).toFixed(2)}</Typography> </Box>
                                    <Box style={{ padding: '0px 60px 0px 0px' }}>  <Typography sx={{ color: '#524ddc' }} className={styles.cerrantlist}>High</Typography> <Typography className={styles.listonepterd}>{parseFloat(scripDetails.high_price).toFixed(2)}</Typography></Box>
                                    {/* </Box> */}
                                </Box>}
                                <div className={styles.listtypogst}>
                                    <Typography>GENERAL</Typography>
                                </div>
                                {/* <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>
                                    <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                                        {!router.query.scripType && <Box sx={{ flex: 1 }}>
                                            <Autocomplete
                                                sx={{ flex: 1, paddingRight: 1 }}
                                                fullWidth
                                                disablePortal={false}
                                                options={scripType}
                                                name="scriptype"
                                                value={scripItem}
                                                onChange={(event, value, reason, details) => {
                                                    console.log(value.id, 'valuevalue',);
                                                    // setLotSize(1)
                                                    setScripItemError(false)
                                                    if (value.id != 'none' || value.id != '') {
                                                        setScripItem(value)
                                                    }
                                                    //setScripItem(value)
                                                    if (!!value && !!value.id) {
                                                        console.log(value.id, 'script is here')
                                                        setScript('')
                                                        getScirp(value.id)

                                                    }
                                                    if (value == 'none' || value == '') {
                                                        setScripItem('')
                                                    }
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    onChange={(text) => {
                                                        filterScrip(text)
                                                    }}
                                                    error={scripItemError}
                                                    helperText={scripItemError ? 'Scrip type is required' : undefined}
                                                    label={'Scrip type'} />}
                                            />
                                        </Box>}
                                    </Box>

                                </Box> */}
                                <div style={{ display: "flex", width: "100%" }} >
                                    {/* <div> */}
                                    <Grid item md={4}>
                                        <Box sx={{ flex: 2, padding: '10px 0px 0px 0px' }}>
                                            <Typography className={styles.typofonty}>Script</Typography>
                                            <Autocomplete
                                                sx={{ flex: 1, }}
                                                fullWidth
                                                disablePortal={false}
                                                options={filterScripList}
                                                name="script"
                                                value={script}
                                                onChange={(event, value, reason, details) => {
                                                    // filterScriplist()
                                                    if (!!value) {
                                                        if (!!stockInterval) {
                                                            clearInterval(stockInterval)
                                                        }
                                                        getScripPrice(value)
                                                        setLotSize(parseFloat(value.lotSize))
                                                        stockInterval = setInterval(() => {
                                                            getScripPrice(value)
                                                        }, 3000);
                                                    } else {
                                                        if (!!stockInterval) {
                                                            clearInterval(stockInterval)
                                                        }
                                                    }
                                                    setScriptError(false)
                                                    setScript(value)
                                                }}
                                                onClose={(event, reason) => {
                                                    setFilterScripList(defaultScripList)
                                                }}
                                                renderInput={(params) => <TextField  {...params}
                                                    onChange={(text) => {
                                                        console.log(text.target.value, 'jjahhahha')
                                                        setFilatlist(text.target.value)
                                                        filterScrip(text.target.value)
                                                        filterScriplist(text.target.value)




                                                    }}
                                                    className={styles.listtextfils22}
                                                    error={scriptError}
                                                    helperText={scriptError ? 'Scrip is required' : undefined}
                                                // label={scripLable} 

                                                />}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', paddingLeft: 0 }}>
                                            <Box sx={{ flex: 1, padding: '10px 0px 0px 0px' }}>
                                                <Typography className={styles.typofonty}>Investment</Typography>
                                                <TextField
                                                    className={styles.listtextfils}
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.totalInvestment && formik.errors.totalInvestment)}
                                                    fullWidth
                                                    helperText={formik.touched.totalInvestment && formik.errors.totalInvestment}
                                                    // label="Total Investment"
                                                    margin="normal"
                                                    type="number"
                                                    name="totalInvestment"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.totalInvestment}
                                                    variant="outlined"
                                                />
                                            </Box>

                                        </Box>
                                    </Grid>

                                    <Grid item md={4} style={{ padding: "0px 0px 0px 20px" }}>
                                        <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>
                                            <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                                                <Box sx={{ flex: 1, padding: '10px 20px 0px 0px' }}>
                                                    <Typography className={styles.typofonty}>Entry Limit</Typography>
                                                    <TextField
                                                        sx={{ flex: 1 }}
                                                        error={Boolean(formik.touched.minRange && formik.errors.minRange)}
                                                        fullWidth
                                                        helperText={formik.touched.minRange && formik.errors.minRange}
                                                        // label="Min Range"
                                                        className={styles.listtextfils}
                                                        margin="normal"
                                                        type="number"
                                                        name="minRange"
                                                        onBlur={formik.handleBlur}
                                                        onChange={(value) => {
                                                            let text = value.target.value;
                                                            formik.setFieldValue('minRange', text)
                                                            getBuyArray(text, formik.values.maxRange, formik.values.buyPrice)
                                                        }}
                                                        value={formik.values.minRange}
                                                        variant="outlined"
                                                    />
                                                </Box>
                                                <Box sx={{ flex: 1, padding: '10px 0px 0px 0px' }}>
                                                    <Typography className={styles.typofonty}>Exit Limit</Typography>
                                                    <TextField
                                                        sx={{ flex: 1 }}
                                                        error={Boolean(formik.touched.maxRange && formik.errors.maxRange)}
                                                        fullWidth
                                                        helperText={formik.touched.maxRange && formik.errors.maxRange}
                                                        // label="Max Range"
                                                        margin="normal"
                                                        className={styles.listtextfils}
                                                        type="number"
                                                        name="maxRange"
                                                        onChange={(value) => {
                                                            let text = value.target.value;
                                                            formik.setFieldValue('maxRange', text)
                                                            getBuyArray(formik.values.minRange, text, formik.values.buyPrice)
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.maxRange}
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </Box>

                                        </Box>
                                        {/* </Grid> */}
                                        {/* <Grid item md={4}> */}
                                        <div style={{ display: 'flex', alignItems: 'center', padding: '17px 0px 0px 0px' }}>
                                            {/* <Grid item md={2} > */}

                                            <Typography className={styles.typofonty}>Tick Size</Typography>
                                            {/* </Grid> */}
                                            {/* <Grid item md={2} > */}
                                            <Box sx={{ flex: 1, paddingLeft: 2, display: "flex", justifyContent: 'end' }}>

                                                <RadioGroup
                                                    sx={{ flexDirection: 'row', display: 'flex', }}
                                                    name="use-radio-group"
                                                    margin='none'
                                                    onChange={async (event, value) => {
                                                        setTickSize(value)
                                                        getBuyArray(formik.values.minRange, formik.values.maxRange, formik.values.buyPrice, value)
                                                    }}
                                                    defaultValue={tickSize}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FormControlLabel value="fix" style={{ marginRight: '0px' }} control={<Radio style={{ color: "#05315A" }} />} />
                                                        <Typography className={styles.typofonty} style={{ padding: "0px 8px 0px 0px" }}>FIX</Typography>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FormControlLabel style={{ marginRight: '0px', }} value="%" control={<Radio style={{ color: "#05315A" }} className={styles.radiyobtnlist} />} />
                                                        <Typography className={styles.typofonty} >Pecentage</Typography>
                                                    </div>

                                                </RadioGroup>
                                            </Box>
                                            {/* </Grid> */}
                                        </div>
                                    </Grid>
                                    {/* </div> */}
                                    {/* <div> */}
                                    <Grid item md={4} style={{ padding: "0px 0px 0px 20px" }}>
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', padding: "10px 0px 0px 0px" }}>
                                            <Box sx={{ flex: 1, padding: "0px 20px 0px 0px" }}>
                                                <Typography className={styles.typofonty}>Buy Difference</Typography>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.buyPrice && formik.errors.buyPrice)}
                                                    fullWidth
                                                    helperText={formik.touched.buyPrice && formik.errors.buyPrice}
                                                    // label="Buy"
                                                    type="number"
                                                    className={styles.listtextfils}
                                                    margin="normal"
                                                    name="buyPrice"
                                                    onBlur={formik.handleBlur}
                                                    onChange={(value) => {
                                                        let text = value.target.value;
                                                        formik.setFieldValue('buyPrice', text)
                                                        if (parseFloat(text) > 0) {
                                                            getBuyArray(formik.values.minRange, formik.values.maxRange, text)
                                                        } else {
                                                            setBuyArray([])
                                                        }
                                                    }}
                                                    value={formik.values.buyPrice}
                                                    variant="outlined"
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography className={styles.typofonty}>Sell Difference</Typography>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.sellPrice && formik.errors.sellPrice)}
                                                    fullWidth
                                                    helperText={formik.touched.sellPrice && formik.errors.sellPrice}
                                                    // label="Sell"
                                                    margin="normal"
                                                    type="number"
                                                    className={styles.listtextfils}
                                                    name="sellPrice"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.sellPrice}
                                                    variant="outlined"
                                                />
                                            </Box>

                                        </Box>

                                        <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>

                                            <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography className={styles.typofonty}>Select Current Price</Typography>
                                                    <Autocomplete
                                                        sx={{ flex: 1, }}
                                                        fullWidth
                                                        disablePortal={false}
                                                        options={buyArray}
                                                        className={styles.listtextfils22}
                                                        name="currentPrice"
                                                        value={formik.values.currentPrice}
                                                        onChange={(event, value, reason, details) => {
                                                            setCurrentPriceError(false)
                                                            formik.setFieldValue('currentPrice', value)
                                                        }}
                                                        renderInput={(params) => <TextField {...params}
                                                            error={currentPriceError}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            value={formik.values.currentPrice}
                                                            helperText={currentPriceError ? 'currentPrice is required' : undefined}
                                                        />}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    {/* // </div> */}
                                </div>
                                {/* </Box> */}
                                {/* </Grid> */}
                                {/* <Grid item md={12}> */}
                                {/* <div> */}

                                {/* <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', padding: "10px 0px 0px 0px" }}>
                                                <Box sx={{ flex: 1, paddingRight: 0.5 }}> */}
                                <Typography className={styles.hedindrop}>Advanced</Typography>


                                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                                    <Grid item md={4}>
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', padding: "10px 0px 0px 0px" }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography className={styles.typofonty}>Stoploss</Typography>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    // error={Boolean(formik.touched.Stoploss && formik.errors.Stoploss)}
                                                    fullWidth
                                                    // helperText={formik.touched.Stoploss && formik.errors.Stoploss}
                                                    // label="Buy"
                                                    type="number"
                                                    className={styles.listtextfils}
                                                    margin="normal"
                                                    name="Stoploss"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}

                                                    value={formik.values.Stoploss}
                                                    variant="outlined"
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, paddingLeft: '20px' }}>

                                                <Typography className={styles.typofonty}>Target</Typography>

                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    // error={Boolean(formik.touched.Target && formik.errors.Target)}
                                                    fullWidth
                                                    // helperText={formik.touched.Target && formik.errors.Target}
                                                    // label="Sell"
                                                    margin="normal"
                                                    type="number"
                                                    className={styles.listtextfils}
                                                    name="Target"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.Target}
                                                    variant="outlined"
                                                />
                                            </Box>

                                        </Box>
                                    </Grid>
                                    <Grid item md={8} >
                                        <Box
                                            style={{ display: 'flex', padding: '5px 0px 0px 20px' }}
                                        >
                                            <Box style={{ padding: '0px 16px 0px 0px', width: '50%' }}>
                                                <Typography className={styles.typofonty}>Start date</Typography>


                                                <DatePickerll
                                                    fullWidth
                                                    sx={{ flex: 1 }}
                                                    className={styles.listdatepikar}
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    selectsStart
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    caretAs={calenderIcon}
                                                />
                                            </Box>
                                            <Box style={{ padding: '0px 0px 0px 10px', width: '50%' }}>
                                                <Typography className={styles.typofonty}>End date</Typography>
                                                <DatePickerll
                                                    className={styles.listdatepikar}
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    selectsEnd
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    minDate={startDate}
                                                    caretAs={calenderIcon}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </div>
                                <div>
                                    <Accordion className={styles.acclistloddop}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={styles.listbackdda}
                                        >
                                            <Typography className={styles.hedindrop33}>Order</Typography>
                                            <Typography className={styles.hedindrop33444}>If You Dont Have any idea ? Please make it Default.</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails className={styles.listaccsumahha}>
                                            <div style={{ display: "flex", paddingTop: '10px' }}>
                                                <Grid item md={4} >
                                                    <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', padding: "10px 0px 0px 0px" }}>
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography className={styles.typofonty}>Initail Buy Steps</Typography>
                                                            <TextField
                                                                sx={{ flex: 1 }}
                                                                error={Boolean(formik.touched.Initail && formik.errors.Initail)}
                                                                fullWidth
                                                                helperText={formik.touched.Initail && formik.errors.Initail}
                                                                // label="Buy"
                                                                type="number"
                                                                className={styles.listtextfils2233}
                                                                margin="normal"
                                                                name="Initail"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}

                                                                value={formik.values.Initail}
                                                                variant="outlined"
                                                            />
                                                        </Box>


                                                    </Box>
                                                </Grid>
                                                <Grid item md={4} style={{ padding: '0px 0px 0px 20px' }}>
                                                    <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', padding: "10px 0px 0px 0px" }}>
                                                        <Box sx={{ flex: 1, paddingRight: '20px' }}>
                                                            <Typography className={styles.typofonty}>AMO Buy Down Steps</Typography>
                                                            <TextField
                                                                sx={{ flex: 1 }}
                                                                error={Boolean(formik.touched.BuySteps && formik.errors.BuySteps)}
                                                                fullWidth
                                                                helperText={formik.touched.BuySteps && formik.errors.BuySteps}
                                                                // label="Buy"
                                                                type="number"
                                                                className={styles.listtextfils}
                                                                margin="normal"
                                                                name="BuySteps"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}

                                                                value={formik.values.BuySteps}
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                        <Box sx={{ flex: 1, }}>

                                                            <Typography className={styles.typofonty}>AMO Sell UP Steps</Typography>

                                                            <TextField
                                                                sx={{ flex: 1 }}
                                                                error={Boolean(formik.touched.SellSteps && formik.errors.SellSteps)}
                                                                fullWidth
                                                                helperText={formik.touched.SellSteps && formik.errors.SellSteps}
                                                                // label="Sell"
                                                                margin="normal"
                                                                type="number"
                                                                className={styles.listtextfils}
                                                                name="SellSteps"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.SellSteps}
                                                                variant="outlined"
                                                            />
                                                        </Box>

                                                    </Box>
                                                </Grid>
                                                <Grid item md={4} >
                                                    <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', padding: "10px 0px 0px 20px" }}>
                                                        <Box sx={{ flex: 1, paddingRight: '20px' }}>
                                                            <Typography className={styles.typofonty}>Normal Buy Down Steps</Typography>
                                                            <TextField
                                                                sx={{ flex: 1 }}
                                                                error={Boolean(formik.touched.NormalBuy && formik.errors.NormalBuy)}
                                                                // fullWidth
                                                                helperText={formik.touched.NormalBuy && formik.errors.NormalBuy}
                                                                // label="Buy"
                                                                type="number"
                                                                className={styles.listtextfils}
                                                                margin="normal"
                                                                name="NormalBuy"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}

                                                                value={formik.values.NormalBuy}
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                        <Box sx={{ flex: 1, }}>

                                                            <Typography className={styles.typofonty}>Normal Sell UP Steps</Typography>

                                                            <TextField
                                                                sx={{ flex: 1 }}
                                                                error={Boolean(formik.touched.NormalSell && formik.errors.NormalSell)}
                                                                // fullWidth
                                                                helperText={formik.touched.NormalSell && formik.errors.NormalSell}
                                                                // label="Sell"
                                                                margin="normal"
                                                                type="number"
                                                                className={styles.listtextfils}
                                                                name="NormalSell"
                                                                onBlur={formik.handleBlur}
                                                                onChange={formik.handleChange}
                                                                value={formik.values.NormalSell}
                                                                variant="outlined"
                                                            />
                                                        </Box>

                                                    </Box>
                                                </Grid>
                                            </div>

                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </CardContent>
                        </Card>
                        {/* < */}
                        {listsummri == 'addsumari' ?
                            <>
                                <Card className={listinnewdata == 'gsdgfgdffd' ? styles.listcentenar : styles.bolkdatat} >
                                    {/* <PerfectScrollbar> */}

                                    <Grid item sm={12} md={12} xs={12}>

                                        {/* <Divider style={{border:'1px solid #E4F4E9'}}></Divider> */}
                                        <div className={styles.datadivcalla} style={{ display: 'flex', padding: '0px 0px 0px 60px' }}>
                                            <div style={{ padding: '30px 0px 0px 0px' }}>
                                                <Typography className={styles.peregarflist} style={{ 'font-size': '15px', 'color': '#333333', fontWeight: 'bold', borderBottom: '3px solid #009947', 'borderRadius': '2px', width: '80px' }}>Summary</Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Box style={{ display: 'flex' }}>
                                        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 60px' }}>

                                            <div style={{ padding: '0px 40px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Script</Typography>
                                                <div style={{ display: 'flex' }}>
                                                    <Typography
                                                        // className={props.data.todayprofit >=0 ? styles.peregarflistlist:styles.redline}
                                                        style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold" }}>
                                                        {scripDetails.stk_name}
                                                        {/* {props.data.todayprofit == null ? '-':props.data.todayprofit } */}
                                                    </Typography>
                                                    <div style={{ padding: '0px 0px 0px 25px' }}>
                                                        <Box style={{ 'background': 'rgba(240, 240, 240, 0.97)', 'borderRadius': '2px', padding: '1px 2px 1px 2px' }}><Typography style={{ 'font-size': '6px', 'color': '#858789' }}>{scripDetails.market_exchange}</Typography></Box>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '0px 30px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Type</Typography>
                                                <Typography className={styles.peregarflist44} >{patternItem.id}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 30px' }}>

                                            <div style={{ padding: '0px 40px 0px 40px' }}>
                                                <Typography className={styles.peregarflist33} >Entry LIMIT</Typography>
                                                <Typography className={styles.peregarflist44} >
                                                    {formik.values.minRange}
                                                    {/* {props.data.pendingOrder == null ? '-':props.data.pendingOrder} */}
                                                </Typography>
                                            </div>
                                            <div style={{ padding: '0px 4px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Exit LIMIT</Typography>
                                                <Typography className={styles.peregarflist44} >
                                                    {formik.values.maxRange}
                                                    {/* {props.data.executedOrder == null ? '-' :props.data.executedOrder} */}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 15px' }}>

                                            <div style={{ padding: '0px 30px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Buy Diffrerance</Typography>
                                                <Typography style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#009947' }}>
                                                    {formik.values.buyPrice}
                                                    {/* {props.data.stock == null ? '-':props.data.stock } */}
                                                </Typography>
                                            </div>
                                            <div style={{ padding: '0px 40px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33}>Sell Diffrerance</Typography>
                                                <Typography
                                                    // className={props.data.profit >=0 ? styles.peregarflistlist:styles.redline}
                                                    style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#E31E24' }}>
                                                    {formik.values.sellPrice}
                                                    {/* {props.data.profit == null ? '-' :props.data.profit} */}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} md={2} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 0px' }}>

                                            <div style={{ padding: '0px 25px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33}>Enter Point</Typography>
                                                <Typography className={styles.peregarflist44} >{formik.values.currentPrice}</Typography>
                                            </div>
                                            <div style={{ padding: '0px 40px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33}>Tick Type</Typography>
                                                <Typography className={styles.peregarflist44} >{tickSize}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} md={1} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 0px' }}>
                                            <div style={{ padding: '0px 30px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33}>Investment</Typography>
                                                <Typography className={styles.peregarflist44} >{formik.values.totalInvestment}</Typography>
                                            </div>
                                        </Grid>
                                        <Divider style={{ border: '1px solid #E4F4E9' }}></Divider>
                                    </Box>
                                    <Grid item sm={12} md={12} xs={12}>

                                        <Divider style={{ border: '1px solid #E4F4E9' }}></Divider>
                                        <div className={styles.datadivcalla} style={{ display: 'flex', padding: '0px 0px 0px 60px' }}>
                                            <div style={{ padding: '30px 0px 0px 0px' }}>
                                                <Typography className={styles.peregarflist} style={{ 'font-size': '15px', 'color': '#333333', fontWeight: 'bold', borderBottom: '3px solid #009947', 'borderRadius': '2px', width: '80px' }}>Advanced</Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Box style={{ display: 'flex' }}>
                                        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 60px' }}>

                                            <div style={{ padding: '0px 60px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Target</Typography>
                                                {/* <div style={{display:'flex'}}> */}
                                                <Typography
                                                    // className={props.data.todayprofit >=0 ? styles.peregarflistlist:styles.redline}
                                                    style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold" }}>
                                                    {formik.values.Target == '' ? '-' : formik.values.Target}
                                                    {/* {props.data.todayprofit == null ? '-':props.data.todayprofit } */}
                                                </Typography>
                                                {/* <div style={{ padding: '0px 0px 0px 25px' }}>
                        <Box style={{ 'background': 'rgba(240, 240, 240, 0.97)', 'borderRadius': '2px', padding: '1px 2px 1px 2px' }}><Typography style={{ 'font-size': '6px', 'color': '#858789' }}>{scripDetails.market_exchange}</Typography></Box>
                    </div> */}
                                                {/* </div> */}
                                            </div>
                                            <div style={{ padding: '0px 30px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >StopLoss</Typography>
                                                <Typography className={styles.peregarflist44} >{formik.values.Stoploss == '' ? '-' : formik.values.Stoploss}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 30px' }}>

                                            <div style={{ padding: '0px 40px 0px 40px' }}>
                                                <Typography className={styles.peregarflist33} >Start Date</Typography>
                                                <Typography className={styles.peregarflist44} >
                                                    {startDate == '' ? '-' : moment(startDate).format("DD/MM/YYYY")
                                                    }                          {/* {props.data.pendingOrder == null ? '-':props.data.pendingOrder} */}
                                                </Typography>
                                            </div>
                                            <div style={{ padding: '0px 4px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >End Date</Typography>
                                                <Typography className={styles.peregarflist44} >
                                                    {endDate == '' ? '-' :
                                                        moment(endDate).format("DD/MM/YYYY")
                                                    }                         {/* {props.data.executedOrder == null ? '-' :props.data.executedOrder} */}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Box>
                                    <Divider style={{ border: '1px solid #E4F4E9' }}></Divider>
                                    <Grid item sm={12} md={12} xs={12}>

                                        {/* <Divider style={{border:'1px solid #E4F4E9'}}></Divider> */}
                                        <div className={styles.datadivcalla} style={{ display: 'flex', padding: '0px 0px 0px 60px' }}>
                                            <div style={{ padding: '30px 0px 0px 0px' }}>
                                                <Typography className={styles.peregarflist} style={{ 'font-size': '15px', 'color': '#333333', fontWeight: 'bold', borderBottom: '3px solid #009947', 'borderRadius': '2px', width: '80px' }}>Order</Typography>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Box style={{ display: 'flex' }}>
                                        <Grid item sm={12} md={4} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 60px' }}>

                                            <div style={{ padding: '0px 60px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Initail Buy Steps</Typography>
                                                {/* <div style={{display:'flex'}}> */}
                                                <Typography
                                                    // className={props.data.todayprofit >=0 ? styles.peregarflistlist:styles.redline}
                                                    style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold" }}>
                                                    {formik.values.Initail}
                                                    {/* {props.data.todayprofit == null ? '-':props.data.todayprofit } */}
                                                </Typography>
                                                {/* <div style={{ padding: '0px 0px 0px 25px' }}>
                        <Box style={{ 'background': 'rgba(240, 240, 240, 0.97)', 'borderRadius': '2px', padding: '1px 2px 1px 2px' }}><Typography style={{ 'font-size': '6px', 'color': '#858789' }}>{scripDetails.market_exchange}</Typography></Box>
                    </div>
                    </div> */}
                                            </div>
                                            <div style={{ padding: '0px 30px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >AMO BUY Down Steps</Typography>
                                                <Typography className={styles.peregarflist44} >{formik.values.SellSteps}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} md={4} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 0px' }}>

                                            <div style={{ padding: '0px 40px 0px 40px' }}>
                                                <Typography className={styles.peregarflist33} >AMO SELL UP Steps</Typography>
                                                <Typography className={styles.peregarflist44} >
                                                    {formik.values.BuySteps}
                                                    {/* {props.data.pendingOrder == null ? '-':props.data.pendingOrder} */}
                                                </Typography>
                                            </div>
                                            <div style={{ padding: '0px 4px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Normal Buy Down Steps</Typography>
                                                <Typography className={styles.peregarflist44} >
                                                    {formik.values.NormalBuy}
                                                    {/* {props.data.executedOrder == null ? '-' :props.data.executedOrder} */}
                                                </Typography>
                                            </div>
                                        </Grid>
                                        <Grid item sm={12} md={3} xs={12} className={styles.listpading} style={{ display: 'flex', padding: '30px 0px 40px 15px' }}>

                                            <div style={{ padding: '0px 30px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Normal SELL Down Steps</Typography>
                                                <Typography className={styles.peregarflist44} >
                                                    {formik.values.NormalSell}
                                                    {/* {props.data.stock == null ? '-':props.data.stock } */}
                                                </Typography>
                                            </div>

                                        </Grid>
                                    </Box>
                                    {/* </PerfectScrollbar> */}
                                </Card>
                            </> : ''}
                        {!!patternList && patternList.length !== 0 && <Box sx={{ mt: 3 }}>
                            <Card className={tabaldatalist == 'virang' ? styles.listcentenar : styles.bolkdatat}>
                                {/* <PerfectScrollbar> */}
                                <Box sx={{ width: '100%' }}

                                >
                                    <Table>
                                        <TableHead className={styles.hedarliath}>
                                            <TableRow>
                                                <TableCell>
                                                    Step
                                                </TableCell>
                                                <TableCell>
                                                    Buy
                                                </TableCell>
                                                <TableCell>
                                                    Sell
                                                </TableCell>
                                                <TableCell>
                                                    Qty
                                                </TableCell>

                                                <TableCell>
                                                    Buy  Value                                                     </TableCell>
                                                <TableCell>
                                                    Sell Value                                                    </TableCell>
                                                <TableCell>
                                                    Gross
                                                </TableCell>
                                                <TableCell>
                                                    Stock
                                                </TableCell>
                                                <TableCell>
                                                    Investment
                                                </TableCell>
                                                <TableCell>
                                                    Discount                                                    </TableCell>
                                                <TableCell>
                                                    AVG.                                                    </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className={styles.listrowdATA22}>
                                            {patternList.map((pattern, index) => (
                                                <TableRow
                                                    key={index + 1}
                                                    // hover step
                                                    className={formik.values.currentPrice == pattern.buyPrice ? styles.listbahovar : styles.listnormalta}
                                                >

                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                alignItems: 'center',
                                                                display: 'flex'
                                                            }}
                                                        >
                                                            <Typography
                                                                color="textPrimary"
                                                                variant="body1"
                                                                style={{ color: '#858789' }}
                                                            >
                                                                {index + 1}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell className={styles.buyparatydata}>
                                                        {pattern.buyPrice}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#858789' }}>
                                                        {pattern.sellPrice}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#858789' }}>
                                                        {pattern.qty}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#858789' }}>
                                                        {pattern.buyValue}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#009947' }}>
                                                        {pattern.sellValue}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#4285F4' }}>
                                                        {pattern.gross}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#858789' }}>
                                                        {pattern.stock}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#858789' }}>
                                                        {pattern.investment}
                                                    </TableCell>
                                                    {/* <TableCell>
                    {pattern.investment}
                  </TableCell> */}
                                                    <TableCell style={{ color: '#858789' }}>
                                                        {pattern.sDisc}
                                                    </TableCell>
                                                    <TableCell style={{ color: '#858789' }}>
                                                        {pattern.avg}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                                {/* </PerfectScrollbar> */}
                            </Card>


                            {/* <PatternList
                                patterns={patternList} /> */}
                        </Box>}
                        {listsummri == 'addsumari' ?
                            <Grid item md={12} className={styles.listgridkex23}>
                                <Box sx={{ flexDirection: 'row-reverse', display: 'flex', flex: 1, mt: 3 }}>
                                    {listinnewdata == 'gsdgfgdffd' ?
                                        <Button
                                            style={{ backgroundColor: '#009947' }}
                                            // component="a"
                                            className={styles.batnpovedar22}
                                            size="medium"
                                            type="submit"
                                            variant="contained"
                                            onClick={() => {
                                                // setLISTdatasumm('addsumari')
                                                // setListnone('bloack')
                                                if (!!patternList && patternList.length > 0) {
                                                    setLockPattern(true)
                                                } else {
                                                    toast.error('Pattern preview first.')
                                                }
                                            }}
                                        >
                                            NEXT
                                        </Button> :
                                        <Button
                                            className={styles.batnpovedar}
                                            style={{ backgroundColor: '#009947' }}
                                            sx={{ marginRight: '20px' }}
                                            // component="a"
                                            size="medium"
                                            variant="contained"
                                            type="submit"
                                            onClick={() => {
                                                // setListnone('bloack')
                                                setLiatstgs('gsdgfgdffd')
                                                onAddPattern()
                                                setTebaldatalist('')
                                                // onPreviewClick()
                                            }}
                                        >
                                            NEXT
                                        </Button>}
                                    {console.log(tabaldatalist, 'tabaldatalist')}
                                    {/* 
                                {tabaldatalist == 'virang' ?  */}
                                    {tabaldatalist == 'virang' ?
                                        <Button
                                            className={styles.batnpovedar}
                                            style={{ backgroundColor: '#4285F4' }}
                                            sx={{ marginRight: '20px' }}
                                            // component="a"
                                            size="medium"
                                            variant="contained"
                                            type="submit"
                                            //             onClick={() => {
                                            //                 tabaldatalist == '' ? {
                                            //                     setTebaldatalist('virang')  ,                                              setLiatstgs('gsdgfgdffd')
                                            // setLiatstgs('')
                                            //                 } : ''


                                            //                 // setLISTdatasumm('')

                                            //                 // setListnone('')

                                            //             }}
                                            onClick={() => {
                                                setLISTdatasumm('')
                                                setListnone('')
                                            }}
                                        >
                                            Previous
                                        </Button> : <Button
                                            className={styles.batnpovedar}
                                            style={{ backgroundColor: '#4285F4' }}
                                            sx={{ marginRight: '20px' }}
                                            // component="a"
                                            size="medium"
                                            variant="contained"
                                            type="submit"
                                            onClick={() => {
                                                setLiatstgs('')
                                                setTebaldatalist('virang')

                                                // setLiatstgs('')
                                                // setTebaldatalist('virang')
                                            }}
                                        >  Previous
                                        </Button>
                                    }
                                </Box>

                            </Grid>
                            :
                            <Grid item md={12} className={styles.listgridkex23}>
                                <Box sx={{ flexDirection: 'row-reverse', display: 'flex', flex: 1, mt: 3 }}>
                                    {scripDetails.stk_name == '' || formik.values.minRange == '' || formik.values.maxRange == '' || formik.values.buyPrice == '' || formik.values.sellPrice == '' || formik.values.currentPrice == '' || formik.values.totalInvestment == '' || tickSize == '' ?
                                        <Button
                                            style={{ backgroundColor: '#009947', color: '#fff' }}
                                            // component="a"
                                            disabled
                                            className={styles.batnpovedar22}
                                            size="medium"
                                            type="submit"
                                            variant="contained"
                                            onClick={() => {
                                                setLISTdatasumm('addsumari')
                                                setListnone('bloack')
                                                // setListnone('bloack')
                                                // if (!!patternList && patternList.length > 0) {
                                                //     setLockPattern(true)
                                                // } else {
                                                //     toast.error('Pattern preview first.')
                                                // }
                                            }}
                                        >
                                            NEXT
                                        </Button> :

                                        <Button
                                            style={{ backgroundColor: '#009947' }}
                                            // style={{  }}

                                            // component="a"
                                            className={styles.batnpovedar22}
                                            size="medium"
                                            type="submit"
                                            variant="contained"
                                            onClick={() => {
                                                setLISTdatasumm('addsumari')
                                                setListnone('bloack')
                                                // setListnone('')
                                                // setListnone('bloack')
                                                // if (!!patternList && patternList.length > 0) {
                                                //     setLockPattern(true)
                                                // } else {
                                                //     toast.error('Pattern preview first.')
                                                // }
                                            }}
                                        >
                                            NEXT
                                        </Button>}
                                    <Button
                                        className={styles.batnpovedar}
                                        sx={{ marginRight: '20px' }}
                                        // component="a"
                                        disabled
                                        size="medium"
                                        variant="contained"
                                        type="submit"
                                        onClick={() => {


                                            // onAddPattern()
                                            // onPreviewClick()
                                        }}
                                    >
                                        Previous
                                    </Button>
                                </Box>

                            </Grid>


                        }
                    </Box>
                </Container>
                {/* </Grid> */}
            </Box>
            <div>
                <Dialog open={isLockPatternDialog}
                    // onClose={handleCloseCom}
                    className={styles.borderredayasfor}
                    style={{
                    }}
                    maxWidth="sm"
                >
                    <div>
                        <DialogContent className={styles.popupcantenar}>
                            <Box><div className={styles.delehedar}>
                                <Typography>Lock Pattern</Typography>
                            </div>
                                <Divider>

                                </Divider>
                                <div className={styles.accoparegarf}>
                                    <Typography>Are you sure you want to lock
                                        this pattern?</Typography>
                                </div>
                                <Divider>

                                </Divider>
                                <div><Button className={styles.cancelbtn} onClick={() => {
                                    setLockPattern(false)
                                }}>Cancel</Button><img src='../../Line 17.png' /><Button className={styles.cancelbtn2} onClick={() => {
                                    setLockPattern(false)
                                    onLockPatternClick()
                                }}>Lock</Button></div>
                            </Box>
                        </DialogContent>
                    </div>
                </Dialog>
            </div>

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
const calenderIcon = () => {
    return (
        <img src='../public/calender.png' className="calenderimg" />
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddPattern));
