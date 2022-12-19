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
    IconButton
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
// import { DashboardLayout } from '../components/dashboard-layout';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
import styles from '../styles/Custompatt.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, DesktopDatePicker } from '@mui/lab';
import React, { useState, useEffect } from 'react';
// import { PatternList } from 'src/components/product/pattern-list-results';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter, withRouter } from 'next/router';
import { RadioButton } from 'react-radio-buttons';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dynamic from 'next/dynamic';
import FileSaver from 'file-saver';
let stockInterval = null;

const FilePicker = dynamic(() => import('react-file-picker').then((module) => {
    return module.FilePicker
}), { ssr: false });

const AddCustomPattern = (props) => {
    console.log(props.props,'propsprops');
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [script, setScript] = useState('')
    const [lotsize, setLotSize] = useState(1)
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
    const [csvFile, setFile] = useState(null)
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
    const [scripItemError, setScripItemError] = useState(false);
    const [patternItem, setPatternItem] = useState({
        label: 'Basic Pattern',
        id: 'BasicPattern'
    });
    const [patternError, setPatternError] = useState(false);
    const router = useRouter();
    const [rowCount, setRowCount] = useState('1')
    let isView = false;
    let serverData = {}
    const formik = useFormik({
        initialValues: {
            totalInvestment: '',
            currentPrice: '',
        },
        onSubmit: () => {
            onAddPattern()
        },
    });
    const [patternDataArray, setPatternDataArray] = useState([
        {
            is_current_price: true,
            buyQty: '',
            sellQty: '',
            buy: '',
            sell: ''
        }
    ])

    React.useLayoutEffect(() => {
        if (!!props.props.router && !!props.props.router.query && !!props.props.router.query.data) {
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
                    props.props.loaderRef(true)
                    await getAccounts();
                    await getScirp('CASH')
                    props.loaderRef(false)
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
                        setAccount(JSON.parse(JSON.stringify(obj)))
                    }
                }
            }
            setAccountList(accountLableList);
        }
    }

    const getScirp = async (type) => {
        var body = {
            "type": type
        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
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
            setFilterScripList(filterScripList)
            setDefaultScripList(filterScripList)
            setScripList(accountLableList)
        }
    }

    const onAddPattern = async () => {
        if (!csvFile) {
            var patternDataList = [];
            for (let index = 0; index < patternDataArray.length; index++) {
                const element = patternDataArray[index];
                var object = {
                    "buyPrice": element.buy,
                    "sellPrice": element.sell,
                    "buy_qty": element.buyQty,
                    "sell_qty": element.sellQty,
                }
                patternDataList.push(JSON.parse(JSON.stringify(object)))
            }
            var currentPriceArray = patternDataArray.filter((item) => item.is_current_price);
            var body = {
                "script": parseFloat(script.id),
                "currentPrice": currentPriceArray[0].buy,
                "pattern_data": patternDataList,
                "id_account": props.props.profile.userData.currentAccount.id
            }
            console.log('pattern data...', body)
            var headers = {
                "Content-Type": "application/json",
                "x-access-token": props.props.profile.token
            }
            props.props.loaderRef(true)
            var patternAdd = await ApiServices.PostApiCall(ApiEndpoint.ADD_CUSTOM_PATTERN, JSON.stringify(body), headers)
            props.props.loaderRef(false)
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
        } else {
            let formData = new FormData();
            formData.append('script', parseFloat(script.id));
            formData.append('id_account', props.props.profile.userData.currentAccount.id);
            formData.append('file', csvFile)
            var headers = {
                "x-access-token": props.props.profile.token
            }
            props.props.loaderRef(true)
            var patternAdd = await fetch(ApiEndpoint.ADD_CUSTOM_PATTERN, {
                method: 'POST',
                headers: headers,
                body: formData
            }).then((r) => {
                return r.json();
            }).catch((exc) => {
                return null;
            });;
            props.props.loaderRef(false)
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

    }

    const onPreviewClick = () => {

    }

    const onLockPatternClick = async () => {
        formik.submitForm()
    }

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
              lebal.push(obj)
          }
      }
      setScripList(lebal)
      setFilterScripList(lebal)

  }

    const getScripPrice = async (value) => {
        console.log('getScripPrice...', value)
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
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

    function Item(value, index) {
        return (
            <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {patternDataArray.length > 1 && <IconButton
                    sx={{ marginRight: 1 }}
                    edge="end"
                    size="small"
                    onClick={() => {
                        var patterndata = patternDataArray;
                        patterndata.splice(index, 1)
                        setPatternDataArray(patterndata)
                    }}
                >
                    <RemoveCircleIcon
                        color="error" />
                </IconButton>}
                <FormControlLabel label="Current Price" control={<Radio
                    onChange={() => {
                        var newArray = [];
                        for (let j = 0; j < patternDataArray.length; j++) {
                            const element = patternDataArray[j];
                            if (index == j) {
                                value.is_current_price = true;
                                newArray.push(JSON.parse(JSON.stringify(value)))
                            } else {
                                element.is_current_price = false;
                                newArray.push(JSON.parse(JSON.stringify(element)))
                            }
                        }
                        setPatternDataArray(newArray)
                    }}
                    checked={value.is_current_price} />} />
                <Box sx={{ flex: 1, paddingRight: 1 }}>
                    <TextField
                        sx={{ flex: 1 }}
                        error={value.isBuyError}
                        fullWidth
                        helperText={value.isSellError ? 'Enter Buy Price' : ''}
                        label="Buy"
                        margin="normal"
                        type="number"
                        name="buyPrice"
                        onChange={(value1) => {
                            let text = value1.target.value;
                            var newArray = [];
                            for (let j = 0; j < patternDataArray.length; j++) {
                                const element = patternDataArray[j];
                                if (index == j) {
                                    value.buy = text;
                                    newArray.push(JSON.parse(JSON.stringify(value)))
                                } else {
                                    newArray.push(JSON.parse(JSON.stringify(element)))
                                }
                            }
                            setPatternDataArray(newArray)
                        }}
                        value={value.buy}
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ flex: 1, paddingRight: 1 }}>
                    <TextField
                        sx={{ flex: 1 }}
                        error={value.isQuantityError}
                        fullWidth
                        helperText={value.isQuantityError ? 'Enter Buy Quantity' : ''}
                        label="Buy Quantity"
                        margin="normal"
                        type="number"
                        name="buyquantity"
                        onChange={(value1) => {
                            let text = value1.target.value;
                            var newArray = [];
                            for (let j = 0; j < patternDataArray.length; j++) {
                                const element = patternDataArray[j];
                                if (index == j) {
                                    value.buyQty = text;
                                    newArray.push(JSON.parse(JSON.stringify(value)))
                                } else {
                                    newArray.push(JSON.parse(JSON.stringify(element)))
                                }
                            }
                            setPatternDataArray(newArray)
                        }}
                        value={value.buyQty}
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ flex: 1, paddingRight: 1 }}>
                    <TextField
                        sx={{ flex: 1 }}
                        error={value.isSellError}
                        fullWidth
                        helperText={value.isSellError ? 'Enter Sell Price' : ''}
                        label="Sell"
                        margin="normal"
                        type="number"
                        name="sellPrice"
                        onChange={(value1) => {
                            let text = value1.target.value;
                            var newArray = [];
                            for (let j = 0; j < patternDataArray.length; j++) {
                                const element = patternDataArray[j];
                                if (index == j) {
                                    value.sell = text;
                                    newArray.push(JSON.parse(JSON.stringify(value)))
                                } else {
                                    newArray.push(JSON.parse(JSON.stringify(element)))
                                }
                            }
                            setPatternDataArray(newArray)
                        }}
                        value={value.sell}
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <TextField
                        sx={{ flex: 1 }}
                        error={value.isQuantityError}
                        fullWidth
                        helperText={value.isQuantityError ? 'Enter Sell Quantity' : ''}
                        label="Sell Quantity"
                        margin="normal"
                        type="number"
                        name="sellquantity"
                        onChange={(value1) => {
                            let text = value1.target.value;
                            var newArray = [];
                            for (let j = 0; j < patternDataArray.length; j++) {
                                const element = patternDataArray[j];
                                if (index == j) {
                                    value.sellQty = text;
                                    newArray.push(JSON.parse(JSON.stringify(value)))
                                } else {
                                    newArray.push(JSON.parse(JSON.stringify(element)))
                                }
                            }
                            setPatternDataArray(newArray)
                        }}
                        value={value.sellQty}
                        variant="outlined"
                    />
                </Box>
            </Box>
        )
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
                                            {/* <Box sx={{ flex: 1 }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Autocomplete
                                                        sx={{ flex: 1 }}
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
                                    </Box>
                                    <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1, mt: 2 }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Autocomplete
                                                sx={{ flex: 1 }}
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
                                                        filterScrip(text.target.value)
                                                    }}
                                                    error={scriptError}
                                                    helperText={scriptError ? 'Scrip is required' : undefined}
                                                    label={scripLable} />}
                                            />
                                        </Box>
                                    </Box>
                                    {(lotsize != 1) ? <Box sx={{ display: 'flex', paddingLeft: 3, fontSize: 10 }}>lotSize={lotsize}</Box> : ''}
                                    <Typography sx={{ mt: 3, fontWeight: 'bold', color: '#524ddc' }}>
                                        Pattern Data
                                    </Typography>
                                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                                        {patternDataArray.map((item, index) => Item(item, index))}
                                    </Box>
                                    <Box sx={{ flexDirection: 'row-reverse', display: 'flex', flex: 1 }}>
                                        <Button
                                            component="a"
                                            size="medium"
                                            variant="text"
                                            onClick={() => {
                                                var numOfRowCount = parseFloat(rowCount)
                                                var lastItem = patternDataArray[patternDataArray.length - 1]
                                                var patterndata = patternDataArray;
                                                if (numOfRowCount > 1) {
                                                    for (let index = 0; index < numOfRowCount; index++) {
                                                        var emptyData = {
                                                            is_current_price: false,
                                                            buyQty: lastItem.buyQty,
                                                            sellQty: lastItem.sellQty,
                                                            buy: lastItem.buy,
                                                            sell: lastItem.sell
                                                        }
                                                        patterndata.push(JSON.parse(JSON.stringify(emptyData)))
                                                    }
                                                    setPatternDataArray(patterndata)
                                                } else {
                                                    var emptyData = {
                                                        is_current_price: false,
                                                        buyQty: lastItem.buyQty,
                                                        sellQty: lastItem.sellQty,
                                                        buy: lastItem.buy,
                                                        sell: lastItem.sell
                                                    }
                                                    patterndata.push(JSON.parse(JSON.stringify(emptyData)))
                                                    setPatternDataArray(patterndata)
                                                }
                                            }}
                                        >
                                            + Patterns row
                                        </Button>
                                        <TextField
                                            sx={{ marginRight: 1 }}
                                            label="No of row"
                                            margin="normal"
                                            type="number"
                                            name="sellquantity"
                                            onChange={(value1) => {
                                                let text = value1.target.value;
                                                setRowCount(text)
                                            }}
                                            value={rowCount}
                                            variant="outlined"
                                        />
                                    </Box>
                                    {/* <Box sx={{ height: 100, width: '60%', border: '1px dashed grey', borderRadius: 1, borderColor: '#aeaeae', justifyContent: 'center', alignItems: 'center' }}>
                                        <label
                                            style={{ height: 100, width: '100%', display: 'inline-block', textAlign: 'center',  lineHeight: 6 }}
                                            for="files">Select Or Drag and Drop CSV Files</label>
                                        <input
                                            id="files"
                                            style={{ height: 100, width: '100%', visibility: 'hidden' }}
                                            type="file"
                                            onChange={(file) => {
                                                console.log('fileobject', file.target.files[0]);
                                            }}
                                            accept=".csv"></input>
                                        </Box>*/}
                                    <Box sx={{ mt: 3, mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Typography sx={{ fontWeight: 'bold', color: '#524ddc' }}>
                                            Upload CSV
                                        </Typography>
                                        <Button
                                            sx={{ marginLeft: 2, padding: 0.8 }}
                                            component="a"
                                            size="medium"
                                            variant="outlined"
                                            type="submit"
                                            onClick={() => {
                                                FileSaver.saveAs(
                                                    `${window.location.origin.toString()}/static/sample_csv.csv`,
                                                    "sample_csv.csv"
                                                );
                                            }}
                                        >
                                            Download Sample CSV
                                        </Button>
                                    </Box>

                                    <input
                                        id="files"
                                        type="file"
                                        onChange={(file) => {
                                            setFile(file.target.files[0]);
                                        }}
                                        accept=".csv"></input>

                                    <Box sx={{ flexDirection: 'row-reverse', display: 'flex', flex: 1, mt: 3 }}>
                                        <Button
                                            style={{ backgroundColor: '#c21717' }}
                                            component="a"
                                            size="medium"
                                            variant="contained"
                                            onClick={() => {
                                                var patternArray = patternDataArray.filter((item) => !!item.buy)
                                                if (!!patternArray && patternArray.length > 0 || !!csvFile) {
                                                    if (!scripItem.id) {
                                                        setScripItemError(true)
                                                    } else if (!script) {
                                                        console.log('scrip inside 3')
                                                        setScriptError(true)
                                                    } else {
                                                        setLockPattern(true)
                                                    }
                                                } else {
                                                    toast.error('Add pattern data first.')
                                                }
                                            }}
                                        >
                                            Lock Patterns
                                        </Button>
                                        {false && <Button
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
                                        </Button>}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                        {!!patternList && patternList.length !== 0 && <Box sx={{ mt: 3 }}>
                            <PatternList
                                patterns={patternList} />
                        </Box>}

                    </Box>
                </Container>
            </Box >
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddCustomPattern));
