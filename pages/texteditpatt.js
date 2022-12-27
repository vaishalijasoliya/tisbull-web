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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, DesktopDatePicker } from '@mui/lab';
import React, { useState, useEffect } from 'react';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter, withRouter } from 'next/router';
import { Grid } from 'material-ui-core';

let stockInterval = null;

const EditPattern = (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [script, setScript] = useState('')
    console.log(script,'scripkakkka');
    const [tickSize, setTickSize] = useState('fix')
    const [scriptError, setScriptError] = useState(false);
    const [accountError, setAccountError] = useState(false);
    const [account, setAccount] = useState('')
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
    const [scripLablelist, setScripLablelist] = useState('');

    const [patternData, setPatternData] = useState(false);
    console.log(scripLablelist,'scripLablelist');
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
        },
        {
            label: 'BCD-OPT',
            id: 'BCD-OPT'
        },
        {
            label: 'BCD-FUT',
            id: 'BCD-FUT'
        },
        {
            label: 'BCD',
            id: 'BCD'
        },
        {
            label: 'BSE',
            id: 'BSE'
        },
        {
            label: 'INDICES',
            id: 'INDICES'
        },
        {
            label: 'CDS-OPT',
            id: 'CDS-OPT'
        },
        {
            label: 'CDS-FUT',
            id: 'CDS-FUT'
        },
        {
            label: 'MCX-FUT',
            id: 'MCX-FUT'
        },
        {
            label: 'MCX-OPT',
            id: 'MCX-OPT'
        },
        {
            label: 'NFO-OPT',
            id: 'NFO-OPT'
        },
        {
            label: 'NFO-FUT',
            id: 'NFO-FUT'
        },
        {
            label: 'NSE',
            id: 'NSE'
        },
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
            setData(JSON.parse(props.router.query.data).id)
            console.log('listdatatat',JSON.parse(props.router.query.data).id);
        } else {
            if (!!props.profile && !!props.profile.token) {
                getAccounts();
                filterScrip(scripItem.id);
            }
        }

        startLableAnimation()
        return () => {
            if (!!stockInterval) {
                clearInterval(stockInterval)
            }
        }
    }, [])

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

    const setData = async (pattern_id) => {
        var obj = {
            "id_pattern": pattern_id
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.PATTERN_VIEW, JSON.stringify(obj), headers)
        if (!!patternDelete && patternDelete.status == true) {

            setPatternData(patternDelete);

            serverData = patternDelete.pattern;
            setScripLablelist(serverData.script)
            getScripPrice(serverData)
            formik.setFieldValue('totalInvestment', serverData.investment);
            formik.setFieldValue('currentPrice', serverData.enterPrice)
            formik.setFieldValue('minRange', serverData.minRange)
            formik.setFieldValue('maxRange', serverData.maxRange)
            formik.setFieldValue('buyPrice', serverData.buy)
            formik.setFieldValue('sellPrice', serverData.sell)
            var scripItem = scripType.filter((item) => item.label == serverData.segment)[0]
            setScripItem(scripItem)
            setTickSize(serverData.tickSize)
            getAccounts();
            getScirp(scripItem.id);
            await sleep(500)
            formik.submitForm()
        } else {
            toast.error('Something went wrong.')
            props.loaderRef(false)
        }

    }
console.log(serverData,'scripItem');
    const getAccounts = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        props.loaderRef(true)
        var accountList = await ApiServices.GetApiCall(ApiEndpoint.ACCOUNT_LIST, headers)
        props.loaderRef(false)
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

    const getScirp = async (type) => {
      
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
            quantity = Math.trunc(maxInvestPStep / i);
            if (i >= parseFloat(formik.values.currentPrice)) {
                buyValue = parseFloat(formik.values.currentPrice) * quantity;
            } else {
                buyValue = i * quantity;
            }
            var sellPrice = 0;
            if (tickSize == 'fix') {
                sellPrice = i + parseFloat(formik.values.sellPrice)
            } else {
                sellPrice = i + (parseFloat(formik.values.sellPrice) * i) / 100;
            }
            var sellValue = sellPrice * quantity;
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
                'avg': avgPrice.toFixed(2)
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
        } else if (!account) {
            setAccountError(true)
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
            "patternData": patternList,
            "id_account": account.id,
            "pattern_type": patternItem.id,
            "id_pattern": JSON.parse(props.router.query.data).id,
            "status": patternData.pattern.status
        }
        console.log('pattern data...', body)
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        props.loaderRef(true)
        var patternAdd = await ApiServices.PostApiCall(ApiEndpoint.EDIT_PATTERN, JSON.stringify(body), headers)
        props.loaderRef(false)
        var redirect = true;
        console.log('patternAdd', patternAdd);
        if (patternAdd.status == true) {
            console.log(patternAdd);
            redirect = true;
            toast.success(patternAdd.message)
            // let successStatus = patternAdd.success;
            // successStatus.forEach(function (i, j) {
            //     toast.success(i);
            // });
            // } else if (patternAdd.fault) {
            //     redirect = false;
            //     let errorStatus = patternAdd.fault;
            //     errorStatus.forEach(function (i, j) {
            //         toast.error(i);
            //     });
        } else {
            redirect = false;
            toast.error(patternAdd.message)
        }
        if (redirect == true) {
            router.push('/patterns');
        }

    }
    const filterScrip = async (text) => {
        var body = {
            "name": text
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        props.loaderRef(true)
        var accountList = await ApiServices.PostApiCall(ApiEndpoint.SCRIP_LIST, JSON.stringify(body), headers)
        props.loaderRef(false)
        console.log('getScirp', accountList)
        if (!!accountList && !!accountList.length > 0) {
            var accountLableList = []
            let filterScripList = []
            var listlebalobj = []
            for (let index = 0; index < accountList.length; index++) {
                const element = accountList[index];
                console.log(element,'listlogdata');
                var lableObj = "";
                if (!!element.name) {
                    lableObj = element.instrumentName + ` (${element.name}) (${element.exchange})`
                } else {
                    lableObj = element.instrumentName + `(${element.exchange}) - ${element.expiry}`
                }
                accountLableList.push(JSON.parse(JSON.stringify({
                    label: lableObj,
                    id: element.instrumentToken
                })))
                if (isView) {
                    if (element.instrumentToken == serverData.script) {
                        setScript(
                            element.lableObj)
                        getScripPrice({
                            label: lableObj,
                            id: element.instrumentToken
                        })
                    }
                }
                if (index < 300) {
                    filterScripList.push(JSON.parse(JSON.stringify({
                        label: lableObj,
                        id: element.instrumentToken
                    })))
                }
                listlebalobj.push(JSON.parse(JSON.stringify(element.lableObj)))

            }
            
            setScript(filterScripList)
            setFilterScripList(filterScripList)
            setDefaultScripList(filterScripList)
            setScripList(accountLableList)
        }
    }
    // useEffect(() => {
    //     // setListidacc(router.query.emailID)
    //     getScripPrice()
    // }, [])
    const getScripPrice = async (value) => {
        // console.log('getScripPrice...', value)
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        if(value.id == ''){
        var body = {
            "instrumentToken": value.script
        }}else{
            var body = {
            "instrumentToken": value.id
            // "instrumentToken": value.script

            }

        }
        var stockPrice = await ApiServices.PostApiCall(ApiEndpoint.GET_STOCK_PRICE, JSON.stringify(body), headers)

        if (!!stockPrice && !!stockPrice.success && stockPrice.success.length > 0) {
            console.log('stockPrice', stockPrice)
            setScripDetails(stockPrice.success[0])
        }
    }
    console.log(scripDetails,'hahhahhahha');

    return (
        <Grid container >
            <Head>
                <title>
                    Edit Patterns | TISTrading
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1
                }}
            >
                <Container maxWidth={false}>
                    <NextLink
                        href="/patterns"
                        passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Patterns
                        </Button>
                    </NextLink>
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Card>
                            <CardContent>
                                { !!scripDetails && !!scripDetails.ltp && <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1, marginBottom: 3 }}>
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
                                            <Box sx={{ flex: 1 }}>
                                                <Autocomplete
                                                    sx={{ flex: 1, paddingRight: 1 }}
                                                    fullWidth
                                                    disablePortal={false}
                                                    options={scripType}
                                                    name="scriptype"
                                                    value={scripItem}
                                                    onChange={(event, value, reason, details) => {
                                                        console.log('i m here scrip',);
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
                                            </Box>
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
                                                            stockInterval = setInterval(() => {
                                                                getScripPrice(value)
                                                            }, 3000);
                                                        } else {
                                                            if (!!stockInterval) {
                                                                
                                                                (stockInterval)
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
                                                            filterScrip(text.target.value)
                                                        }}
                                                        error={scriptError}
                                                        helperText={scriptError ? 'Scrip is required' : undefined}
                                                        label={scripLable} />}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
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
                                            <Box sx={{ flex: 1, paddingLeft: 1, paddingRight: 0.5 }}>
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
                                            <Box sx={{ flex: 1, paddingLeft: 0.5 }}>
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
                                            </Box>
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
                                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', paddingLeft: 1 }}>
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
                                        </Box>
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
                                        <Box sx={{ flex: 1, paddingLeft: 3, flexDirection: 'row', display: 'flex' }}>
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
                                            Edit Pattern
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
                            {/* <PatternList
                                patterns={patternList} /> */}
                        </Box>}

                    </Box>
                </Container>
            </Box>
            <Dialog
                open={isLockPatternDialog}>
                <DialogTitle>
                    Edit Pattern
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Are you sure you want to edit this pattern?
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
                        Edit Pattern
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPattern));
