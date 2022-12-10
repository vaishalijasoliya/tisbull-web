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
    DialogActions,
    DialogTitle,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './CreatePattern.module.scss'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
// import { DashboardLayout } from '../components/dashboard-layout';
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, DesktopDatePicker } from '@mui/lab';
import React, { useState, useEffect } from 'react';
// import { PatternList } from 'src/components/product/pattern-list-results';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter, withRouter } from 'next/router';
import Dashboard from './pattdata'
// import { log } from 'console';
let stockInterval = null;

const AddPattern = (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [script, setScript] = useState('')
    const [lotsize, setLotSize] = useState(1)
    const [tickSize, setTickSize] = useState('fix')
    const [scriptError, setScriptError] = useState(false);
    const [accountError, setAccountError] = useState(false);
    const [account, setAccount] = useState('')
    const [accountmenu, setAccountlistmenu] = useState('')

    const [patternList, setPatternList] = useState([])
    const [accountList, setAccountList] = useState([])
    const [scripList, setScripList] = useState([])
    const [filterScripList, setFilterScripList] = useState([]);
    const [defaultScripList, setDefaultScripList] = useState([]);
    const [scripDetails, setScripDetails] = useState('');
    const [isLockPatternDialog, setLockPattern] = useState(false);
    const [levelError, setLevelError] = useState(false);
    const [currentPriceError, setCurrentPriceError] = useState(false)
    const [scripLable, setScripLable] = useState('');
    console.log(accountmenu,'accountmenu');
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
            label: '',
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
    const [scripItemError, setScripItemError] = useState(false);
    const [patternItem, setPatternItem] = useState({
        label: 'Basic Pattern',
        id: 'BasicPattern'
    });
    const [patternError, setPatternError] = useState(false);
    const router = useRouter();
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
            sellPrice: ''
        },
        validationSchema: Yup.object({
            totalInvestment: Yup
                .string()
                .max(255)
                .required(
                    'Total Investment required'),
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
            onAddPattern()
        },
    });

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
console.log(router.query.data,'props.router.query.data');
    useEffect(() => {
        async function fetchData() {
            if (!!router.query.scripType) {
                if (router.query.scripType == 'equity') {
                    setScripItem({
                        label: 'CASH',
                        id: 'CASH'
                    })
                    props.props.loaderRef(true)
                    await getAccounts();
                    await getScirp('CASH')
                    props.props.loaderRef(false)
                } else if (router.query.scripType == 'currency') {
                    setScripItem({
                        label: '',
                        id: 'CDS'
                    })
                    props.props.loaderRef(true)
                    await getAccounts();
                    await getScirp('')
                    props.props.loaderRef(false)
                } else if (router.query.scripType == 'fo') {
                    setScripItem({
                        label: 'FO',
                        id: 'FO'
                    })
                    props.props.loaderRef(true)
                    await getAccounts();
                    await getScirp('FO')
                    props.props.loaderRef(false)
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
            "x-access-token": props.props.profile.token
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

    const getScirp = async (text) => {
        // var body = {
        //     "name":text.target.value
        //     // "tatamotors"
        //     // accountmenu
        //     // accountmenu
        // }
        console.log(text.target.value,'typetype');
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var accountList = await ApiServices.PostApiCall(ApiEndpoint.SEARCHLIST, JSON.stringify(body), headers)
        console.log('getScirp', accountList)
        if (!!accountList && !!accountList.length > 0) {
            var accountLableList = []
            let filterScripList = []
            for (let index = 0; index < accountList.length; index++) {
                const element = accountList[index];
                console.log(element,'element');
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
            setFilterScripList(filterScripList)
            setDefaultScripList(filterScripList)
            setScripList(accountLableList)
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
                'avg': (avgPrice / lotsize).toFixed(2)
            }
            if (patternStep.qty !== 0) {
                patternArray.push(JSON.parse(JSON.stringify(patternStep)));
            }
        }
        var buyValueObj = patternArray.filter((item) => item.buyPrice == parseFloat(formik.values.currentPrice))
        if (buyValueObj.length > 0) {
            setPatternList(patternArray)
            console.log(patternArray);
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

    const onLockPatternClick = async () => {
        var body = {
            "script": parseFloat(script.id),
            "limitOrder": level.id,
            "investment": parseFloat(formik.values.totalInvestment),
            "buy": parseFloat(formik.values.buyPrice),
            "enterPrice": parseFloat(formik.values.currentPrice),
            "sell": parseFloat(formik.values.sellPrice),
            "tickSize": tickSize,
            "minRange": parseFloat(formik.values.minRange),
            "maxRange": parseFloat(formik.values.maxRange),
            "pattern_data": patternList,
            "id_account": props.props.profile.userData.currentAccount.id,
            "pattern_type": patternItem.id
        }
        console.log('pattern data...', body)
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
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
            router.push('/patterns');
        } else if (!!patternAdd.fault && patternAdd.fault.length > 0) {
            let errorStatus = patternAdd.fault;
            errorStatus.forEach(function (i, j) {
                toast.error(i);
            });
        } else {
            toast.error(patternAdd.message)
        }
    }
console.log( props.props.profile.userData.currentAccount.id,' props.props.profile.currentAccount.id');
    // const filterScrip = (text) => {
    //     if (text.target.value.length >= 2) {
    //         var filterArray = scripList.filter((item) => item.label.toLowerCase().includes(text.target.value.toLowerCase()));
    //         console.log('filterArray', filterArray)
    //         setFilterScripList(filterArray)
    //     } else {
    //         setFilterScripList(defaultScripList)
    //     }
    // }

    const getScripPrice = async (value) => {
        console.log('getScripPrice...', value)
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var body = {
            "instrumentToken": value.id
        }
        var stockPrice = await ApiServices.PostApiCall(ApiEndpoint.GET_STOCK_PRICE, JSON.stringify(body), headers)
        if (!!stockPrice && !!stockPrice.success && stockPrice.success.length > 0) {
            console.log('stockPrice', stockPrice)
            setScripDetails(stockPrice.success[0])
        }
    }

    return (
        // <DashboardLayout>
        <Grid container spacing={0} className={styles.cantenar_list57}>

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
                    <Button
                        component="a"
                        onClick={() => {
                            router.back()
                        }}
                        startIcon={<ArrowBackIcon fontSize="small" />}
                    >
                        Patterns
                    </Button>
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Card>
                            <CardContent>
                                {!!script && !!scripDetails && !!scripDetails.ltp && <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1, marginBottom: 3 }}>
                                    {parseFloat(scripDetails.ltp) !== parseFloat(scripDetails.closing_price) ? <Box sx={{ flex: 1.3, flexDirection: 'row', display: 'flex' }}>
                                        <Typography sx={{ color: '#524ddc' }}>Current: {parseFloat(scripDetails.ltp).toFixed(2)}</Typography>
                                        {((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#00b8a6' }} /> : <ArrowDownwardIcon sx={{ marginLeft: 0.5, color: '#c21717' }} />}
                                        <Typography sx={{ color: (((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#00b8a6' : '#c21717' }}>{`(${(((parseFloat(scripDetails.ltp) - parseFloat(scripDetails.closing_price)) * 100) / parseFloat(scripDetails.closing_price)).toFixed(2)}%)`}</Typography>
                                    </Box> : <Box sx={{ flex: 1.3, flexDirection: 'row', display: 'flex' }}>
                                        <Typography sx={{ color: '#524ddc' }}>Current: {parseFloat(scripDetails.ltp).toFixed(2)}</Typography>
                                        {((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price) > 0 ? <ArrowUpwardIcon sx={{ marginLeft: 0.5, color: '#00b8a6' }} /> : <ArrowDownwardIcon sx={{ marginLeft: 0.5, color: '#c21717' }} />}
                                        <Typography sx={{ color: (((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price)) > 0 ? '#00b8a6' : '#c21717' }}>{`(${(((parseFloat(scripDetails.closing_price) - parseFloat(scripDetails.open_price)) * 100) / parseFloat(scripDetails.closing_price)).toFixed(2)}%)`}</Typography>
                                    </Box>}
                                    <Typography sx={{ flex: 1, color: '#524ddc' }}>Open: {parseFloat(scripDetails.open_price).toFixed(2)}</Typography>
                                    <Typography sx={{ flex: 1, color: '#524ddc' }}>High: {parseFloat(scripDetails.high_price).toFixed(2)}</Typography>
                                    <Typography sx={{ flex: 1, color: '#524ddc' }}>Low: {parseFloat(scripDetails.low_price).toFixed(2)}</Typography>
                                    <Typography sx={{ flex: 1, color: '#524ddc' }}>Prev. Close: {parseFloat(scripDetails.closing_price).toFixed(2)}</Typography>
                                </Box>}
                                <Box>
                                    <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>
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
                                                        console.log('i m here scrip',);
                                                        // setAccountlistmenu(event.target.value)
                                                        setLotSize(1)
                                                        setScripItemError(false)
                                                        if (value.id != 'none' || value.id != '') {
                                                            setScripItem(value)
                                                        }
                                                        //setScripItem(value)
                                                        if (!!value && !!value.id) {
                                                            console.log('script is here')
                                                            setScript('')
                                                            getScirp(value.id)
                                                        }
                                                        if (value == 'none' || value == '') {
                                                            setScripItem('')
                                                        }
                                                    }}
                                                    renderInput={(params) => <TextField {...params}
                                                        onChange={(text) => {
                                                            // filterScrip(text)
                                                        }}
                                                        error={scripItemError}
                                                        helperText={scripItemError ? 'Scrip type is required' : undefined}
                                                        label={'Scrip type'} />}
                                                />
                                            </Box>}
                                            <Box sx={{ flex: 2 }}>
                                                <Autocomplete
                                                    sx={{ flex: 1, paddingRight: 1 }}
                                                    fullWidth
                                                    disablePortal={false}
                                                    options={filterScripList}
                                                    name="script"
                                                    value={script}
                                                    onChange={(event, value, reason, details) => {
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
                                                    renderInput={(params) => <TextField {...params}
                                                    onChange={(text) => {
                                                        console.log(text.target.value,'texttext')
                                                        setAccountlistmenu(text.target.value)
                                                        getScirp(text)
                                                            // filterScrip(text)
                                                        }}
                                                        error={scriptError}
                                                        helperText={scriptError ? 'Scrip is required' : undefined}
                                                        label={scripLable} />}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    {(lotsize != 1) ? <Box sx={{ display: 'flex', justifyContent: 'center', paddingRight: 30, fontSize: 10 }}>lotSize={lotsize}</Box> : null}
                                    <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                                            <Box sx={{ flex: 1, paddingRight: 0.5 }}>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.minRange && formik.errors.minRange)}
                                                    fullWidth
                                                    helperText={formik.touched.minRange && formik.errors.minRange}
                                                    label="Min Range"
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
                                            <Box sx={{ flex: 1, paddingLeft: 0.5 }}>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.maxRange && formik.errors.maxRange)}
                                                    fullWidth
                                                    helperText={formik.touched.maxRange && formik.errors.maxRange}
                                                    label="Max Range"
                                                    margin="normal"
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
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', paddingLeft: 1 }}>
                                            <Box sx={{ flex: 1, paddingLeft: 0.5 }}>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.totalInvestment && formik.errors.totalInvestment)}
                                                    fullWidth
                                                    helperText={formik.touched.totalInvestment && formik.errors.totalInvestment}
                                                    label="Total Investment"
                                                    margin="normal"
                                                    type="number"
                                                    name="totalInvestment"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.totalInvestment}
                                                    variant="outlined"
                                                />
                                            </Box>
                                            {/*<Box sx={{ flex: 1, paddingLeft: 0.5 }}>
                                                <Autocomplete
                                                    sx={{ flex: 1, mt: 2 }}
                                                    fullWidth
                                                    disablePortal={false}
                                                    options={patternType}
                                                    name="patternType"
                                                    value={patternItem}
                                                    onChange={(event, value, reason, details) => {
                                                        setPatternError(false)
                                                        if (value.id != '') {
                                                            setPatternItem(value)
                                                        }
                                                    }}
                                                    renderInput={(params) => <TextField {...params}
                                                        error={patternError}
                                                        helperText={patternError ? 'Pattern type is required' : undefined}
                                                        label={'Pattern type'} />}
                                                />
                                            </Box>*/}
                                        </Box>
                                    </Box>
                                    <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', mt: 2 }}>
                                            <Box sx={{ flex: 1, paddingRight: 0.5 }}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Start Date"
                                                        value={startDate}
                                                        onChange={(value) => {
                                                            setStartDate(value)
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Box>
                                            <Box sx={{ flex: 1, paddingLeft: 0.5 }}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DesktopDatePicker
                                                        label="End Date"
                                                        value={endDate}
                                                        onChange={(value) => {
                                                            setEndDate(value)
                                                        }}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />
                                                </LocalizationProvider>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 2 }}>
                                            <Autocomplete
                                                sx={{ flex: 1, paddingLeft: 1 }}
                                                fullWidth
                                                disablePortal={false}
                                                options={[{
                                                    label: 'Three',
                                                    id: '3'
                                                }, {
                                                    label: 'All',
                                                    id: 'all'
                                                }]}
                                                name="level"
                                                value={level}
                                                onChange={(event, value, reason, details) => {
                                                    setLevelError(false)
                                                    setLevel(value)
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    error={levelError}
                                                    helperText={levelError ? 'level is required' : undefined}
                                                    label="Select level" />}
                                            />
                                        </Box>
                                        {/* <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', paddingLeft: 1 }}>
                                            <Box sx={{ flex: 1, mt: 2 }}>
                                                <Autocomplete
                                                    sx={{ flex: 1, paddingLeft: 1 }}
                                                    fullWidth
                                                    disablePortal={false}
                                                    options={accountList}
                                                    name="accounts"
                                                    value={account}
                                                    onChange={(event, value, reason, details) => {
                                                        setAccountError(false)
                                                        setAccount(value)
                                                    }}
                                                    renderInput={(params) => <TextField {...params}
                                                        error={accountError}
                                                        helperText={accountError ? 'account is required' : undefined}
                                                        label="Select account" />}
                                                />
                                            </Box>
                                                </Box> */}
                                    </Box>
                                    <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                                            <Box sx={{ flex: 1, paddingRight: 0.5 }}>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.buyPrice && formik.errors.buyPrice)}
                                                    fullWidth
                                                    helperText={formik.touched.buyPrice && formik.errors.buyPrice}
                                                    label="Buy"
                                                    type="number"
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
                                            <Box sx={{ flex: 1, paddingLeft: 0.5 }}>
                                                <TextField
                                                    sx={{ flex: 1 }}
                                                    error={Boolean(formik.touched.sellPrice && formik.errors.sellPrice)}
                                                    fullWidth
                                                    helperText={formik.touched.sellPrice && formik.errors.sellPrice}
                                                    label="Sell"
                                                    margin="normal"
                                                    type="number"
                                                    name="sellPrice"
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.sellPrice}
                                                    variant="outlined"
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, paddingLeft: 2, mt: 1.7 }}>
                                                <Typography>Tick Size</Typography>
                                                <RadioGroup
                                                    sx={{ flexDirection: 'row', display: 'flex' }}
                                                    name="use-radio-group"
                                                    margin='none'
                                                    onChange={async (event, value) => {
                                                        setTickSize(value)
                                                        getBuyArray(formik.values.minRange, formik.values.maxRange, formik.values.buyPrice, value)
                                                    }}
                                                    defaultValue={tickSize}>
                                                    <FormControlLabel value="%" label="%" control={<Radio />} />
                                                    <FormControlLabel value="fix" label="FIX" control={<Radio />} />
                                                </RadioGroup>
                                            </Box>
                                        </Box>
                                        <Box sx={{ flex: 1, paddingLeft: 2, flexDirection: 'row', display: 'flex' }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Autocomplete
                                                    sx={{ flex: 1, mt: 2 }}
                                                    fullWidth
                                                    disablePortal={false}
                                                    options={buyArray}
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
                                                        label="Select Current Price" />}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ flexDirection: 'row-reverse', display: 'flex', flex: 1, mt: 3 }}>
                                        <Button
                                            style={{ backgroundColor: '#c21717' }}
                                            component="a"
                                            size="medium"
                                            variant="contained"
                                            onClick={() => {
                                                if (!!patternList && patternList.length > 0) {
                                                    setLockPattern(true)
                                                } else {
                                                    toast.error('Pattern preview first.')
                                                }
                                            }}
                                        >
                                            Lock Patterns
                                        </Button>
                                        <Button
                                            sx={{ marginRight: 1 }}
                                            component="a"
                                            size="medium"
                                            variant="contained"
                                            type="submit"
                                            onClick={() => {
                                                onPreviewClick()
                                            }}
                                        >
                                            Preview Steps
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                        {!!patternList && patternList.length !== 0 && <Box sx={{ mt: 3 }}>
                            <Dashboard
                                patterns={patternList} />
                        </Box>}

                    </Box>
                </Container>
            </Box>
            <Dialog
                open={isLockPatternDialog}>
                <DialogTitle>
                    Lock Pattern
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Are you sure you want to lock this pattern?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            setLockPattern(false)
                        }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        autoFocus
                        onClick={() => {
                            setLockPattern(false)
                            onLockPatternClick()
                        }}>
                        Lock Pattern
                    </Button>
                </DialogActions>
            </Dialog>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddPattern));
