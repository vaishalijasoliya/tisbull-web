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
    IconButton, Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
// import { DashboardLayout } from '../components/dashboard-layout';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
// import styles from '../styles/Custompatt.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker, DesktopDatePicker } from '@mui/lab';
import React, { useState, useEffect } from 'react';
// import { PatternList } from 'src/components/product/pattern-list-results';
import ApiServices from '../config/ApiServices';
import ApiEndpoint from '../config/ApiEndpoint';
import { connect } from 'react-redux';
import DatePickerll from "react-datepicker";
import Papa from 'papaparse'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { toast } from 'react-toastify';
import { useRouter, withRouter } from 'next/router';
// import { RadioButton } from 'react-radio-buttons';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dynamic from 'next/dynamic';
import FileSaver from 'file-saver';
import styles from '../styles/addpatt.module.scss'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
let stockInterval = null;

const FilePicker = dynamic(() => import('react-file-picker').then((module) => {
    return module.FilePicker
}), { ssr: false });
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad', ''];

const AddCustomPattern = (props) => {
    console.log(props.props, 'propsprops');
    // const [startDate, setStartDate] = useState(new Date())
    // const [endDate, setEndDate] = useState(new Date())
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [script, setScript] = useState('')
    const [lotsize, setLotSize] = useState(1)
    const [tickSize, setTickSize] = useState('fix')
    const [scriptError, setScriptError] = useState(false);
    const [accountError, setAccountError] = useState(false);
    const [account, setAccount] = useState('')
    const [patternList, setPatternList] = useState([])
    const [accountList, setAccountList] = useState([])
    const [scripList, setScripList] = useState([])
    const [logvvmog, setLogvvmog] = useState('Stock')

    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const [tabaldatalist, setTebaldatalist] = useState('')
    const [listdataconmnone, setListdatanione] = useState('')
    const [filterScripList, setFilterScripList] = useState([]);
    const [defaultScripList, setDefaultScripList] = useState([]);
    const [scripDetails, setScripDetails] = useState('');
    const [isLockPatternDialog, setLockPattern] = useState(false);
    const [levelError, setLevelError] = useState(false);
    const [currentPriceError, setCurrentPriceError] = useState(false)
    const [scripLable, setScripLable] = useState('');
    const [listfigmaop, setListdatop] = useState('')
    const [listfigmaopjj, setListdatopjj] = useState('')

    const [csvFile, setFile] = useState(null)
    const [listsummri, setLISTdatasumm] = useState("")
    const [selectedValue, setSelectedValue] = React.useState('a');
    console.log(selectedValue, 'selectedValue');
    const [userJSON, setUserJSON] = useState()
    const [uploadedCSV, setUploadedCSV] = useState(null)
    console.log(userJSON, 'userJSON');
    // const handleCSVSubmit = (e) => {
    //     e.preventDefault()

    //     Papa.parse(uploadedCSV, {
    //         header: true,
    //         complete: (results) => {
    //             console.log({ results })
    //             setUserJSON(results.data)
    //         },
    //     })
    // }
    const handleCSVUpload = file => {
        Papa.parse(file, {
          header: true,
          complete: results => {
            setUserJSON(results.data)
          },
        });
      };
    // const handleCSVUpload = (e) => {
    //     // console.log(e.target.files[0])
    //     setUploadedCSV(e)
    // }
    const handleChangemejej = (event) => {
        setSelectedValue(event.target.value);
    };

    const [level, setLevel] = useState({
        label: '5',
        id: '5'
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
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
    const [listinnewdata, setLiatstgs] = useState('')

    const [scripItem, setScripItem] = useState({
        label: 'None',
        id: ''
    });
    // const [listsummri, setLISTdatasumm] = useState("")
    const [listnone, setListnone] = useState('')

    const [buyArray, setBuyArray] = useState([])
    const [scripItemError, setScripItemError] = useState(false);
    const [patternItem, setPatternItem] = useState({
        label: 'Basic Pattern',
        id: 'BasicPattern'
    });
    const [listcsvdata, setDatalistcsv] = useState([])
    const [padjdhdggd, setPandindpl] = useState('')
    const [tabaldata, setTabalData] = useState([])
    const [patternError, setPatternError] = useState(false);
    const router = useRouter();
    const [rowCount, setRowCount] = useState('1')
    console.log(listcsvdata, 'listcsvdata');
    let isView = false;
    let serverData = {}
    const formik = useFormik({
        initialValues: {
            totalInvestment: '',
            currentPrice: '',
            totalInvestment: "",
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
    console.log(props.router.query.data, '  props.loaderRef');
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
            setFilterScripList(filterScripList)
            setDefaultScripList(filterScripList)
            setScripList(accountLableList)
        }
    }
    console.log(tabaldata, 'tabaldata');

    // const onNextBtnPress = () => {
    //     const PatterObjectArray = [];

    //     const PatternPreviewTable = [];
    //     const Current_price = [];

    //     if (listfigmaop == 'csv') {
    //       if (!!priceCsvData) {
    //         for (let index = 1; index < priceCsvData.length; index++) {
    //           const element = priceCsvData[index];

    //           console.log(element.field5 == 1, 'FIELD____5_____FIELD');
    //           if (element.field5 == 1) {
    //             console.log(element, 'ELEMENT_________');

    //             const obj = {
    //               Price: element.field1,
    //             };
    //             Current_price.push(obj);
    //           }

    //           console.log(element, 'MY___ELEMENT');

    //           const PatternObject = {
    //             buyPrice: parseFloat(element.field1),
    //             sellPrice: parseFloat(element.field3),
    //             buy_qty: parseFloat(element.field2),
    //             sell_qty: parseFloat(element.field4),
    //             // enter_price: element.field5,
    //           };

    //           console.log(PatternObject, 'PATTERN______OBJECT');
    //           PatterObjectArray.push(PatternObject);
    //         }

    //         // console.log(PatterObjectArray, 'PATTERN__OBJECT__ARRAY');

    //         console.log(PatternPreviewTable, 'PATTERN____PREVIEW');
    //       }
    //     } else {
    //       if (!!patternDataArray) {
    //         if (!!patternDataArray.length > 0) {
    //           for (let index = 0; index < patternDataArray.length; index++) {
    //             const element = patternDataArray[index];
    //             console.log(element, 'ELEMENT>>>>>>');
    //             const bodyObject = {
    //               buyPrice: parseFloat(element.buy),
    //               sellPrice: parseFloat(element.sell),
    //               buy_qty: parseFloat(element.buyQty),
    //               sell_qty: parseFloat(element.sellQty),
    //               // is_current_price: element.is_current_price,
    //             };

    //             const obj = {
    //               Price: currentPrice,
    //             };
    //             Current_price.push(obj);

    //             PatterObjectArray.push(bodyObject);
    //           }
    //         }
    //       }
    //       // console.log(PatternCreate, 'PATTERN__CREATE__DATA');
    //     }

    //     const PatternPriceData = [];

    //     if (!!PatterObjectArray) {
    //       // for (let index = 0; index < PatterObjectArray.length; index++) {
    //       //   const element = PatterObjectArray[index];
    //       //   PatternPriceData.push(element);
    //       //   if (element.enter_price == 1) {
    //       //     // setCurrentPrice(element.enter_price);
    //       //     const obj = {
    //       //       Price: element.buyPrice,
    //       //     };
    //       //     Current_price.push(obj); //      console.log(element, 'IS__CURRENT__PRICE');
    //       //   }
    //       //   console.log(element.enter_price == 1, 'ELEMENT___OF__PATTERN_OBJECT');
    //       // }

    //       // console.log(Current_price[0].Price, 'PATTERN___DATA||||');

    //       // console.log(ObjectData, 'PATTERN__CREATE__DATA');

    //       const PatternDataTable = PatterObjectArray;
    //       let BuyValue = [];
    //       let totalInvestment = 0;

    //       // const patternArray = [];

    //       for (let index = 0; index < PatternDataTable.length; index++) {
    //         const element = PatternDataTable[index];
    //         console.log(element.buyPrice, 'IS___ELEMENT___FROM___LOOP');

    //         let investPerRow = 0;

    //         const valueZero = 0;
    //         let buyValue =
    //           parseFloat(element.buy_qty) * parseFloat(element.buyPrice);
    //         let sellValue =
    //           parseFloat(element.sell_qty) * parseFloat(element.sellPrice);
    //         let buyPrice = parseFloat(element.buyPrice);
    //         let sellPrice = parseFloat(element.sellPrice);
    //         const buy_qty = parseFloat(element.buy_qty);
    //         const sell_qty = parseFloat(element.sell_qty);
    //         const Gross = parseFloat(sellValue) - parseFloat(buyValue);
    //         const Sdisk = parseFloat(buyPrice) - parseFloat(Current_price[0].Price);
    //         let invest = 0;
    //         // for (let index = 0; index < PatternDataTable.length; index++) {
    //         //   const element = PatternDataTable[index];
    //         //   invest += parseFloat(element.buy_qty) * parseFloat(element.buyPrice);
    //         // }

    //         var totalInvest = 0;
    //         for (let index = 0; index < PatternDataTable.length; index++) {
    //           totalInvest += buyValue;
    //         }
    //         invest += parseFloat(element.buy_qty) * parseFloat(element.buyPrice);
    //         // console.log(totalInvest, 'TOTAL____INVEST');

    //         BuyValue.push(
    //           parseFloat(element.buyPrice) * parseFloat(element.buy_qty),
    //         ).toFixed(2);

    //         totalInvestment = parseFloat(invest.toFixed(2));

    //         // investPerRow += buyValue;

    //         // const investPerCurrent = investPerRow

    //         console.log(investPerRow, 'BUY___VALUE');

    //         console.log(PatternDataTable.length);

    //         // const InvestAtCurrent = totalInvest;

    //         const totalStockWithCurrent = buy_qty;
    //         const obj = {
    //           buyValue: parseFloat(buyValue.toFixed(2)),
    //           investment: parseFloat(invest.toFixed(2)),
    //           sellValue: parseFloat(sellValue.toFixed(2)),
    //           buyPrice: parseFloat(buyPrice.toFixed(2)),
    //           sellPrice: parseFloat(sellPrice.toFixed(2)),
    //           qty: parseFloat(buy_qty.toFixed(2)),
    //           sell_qty: parseFloat(sell_qty.toFixed(2)),
    //           stock: parseFloat(totalStockWithCurrent.toFixed(2)),
    //           Gross: parseFloat(Gross.toFixed(2)),
    //           sDisc: Sdisk.toFixed(2) > 0 ? parseFloat(Sdisk.toFixed(2)) : 0,
    //           step: BuyValue.length,
    //         };

    //         PatternPreviewTable.push(obj);
    //       }
    //     }

    //     console.log(Current_price, 'CURRENT______PRICVE');
    //     console.log(PatternPreviewTable, 'CREATE____CUSTOME_PATTERN');
    //     if (
    //       !!instrumentToken &&
    //       !!Current_price[0].Price &&
    //       !!PatterObjectArray &&
    //       !!PatternPreviewTable
    //     ) {
    //       navigation.navigation.navigate('AdvancedCustomPattern', {
    //         script: instrumentToken,
    //         priceDataArray: PatterObjectArray,
    //         currentPrice: parseFloat(Current_price[0].Price),
    //         PatternPreviewTable: PatternPreviewTable,
    //         StockName: stockName,
    //         StackNavigation:navigation.StackNavigation
    //       });
    //     }
    //   };
    // const onAddPatterntabajjl = async () => {
    //     var buyArray = [];
    //     for (var i = parseFloat(formik.values.maxRange);
    //         i >= parseFloat(formik.values.minRange);
    //         tickSize == 'fix' ? i = parseFloat((i - parseFloat(formik.values.buyPrice)).toFixed(2)) : i = parseFloat((i - ((i * parseFloat(formik.values.buyPrice)) / 100)).toFixed(2))) {
    //         buyArray.push(i)
    //     }
    //     var totalStep = buyArray.length;
    //     var patternArray = [];
    //     for (var i = parseFloat(formik.values.maxRange); i >= parseFloat(formik.values.minRange); tickSize == 'fix' ? i = parseFloat((i - parseFloat(formik.values.buyPrice)).toFixed(2)) : i = parseFloat((i - ((i * parseFloat(formik.values.buyPrice)) / 100)).toFixed(2))) {
    //         var buyValue = 0;
    //         var quantity = 0;
    //         var maxInvestPStep = parseFloat(formik.values.totalInvestment) / totalStep;
    //         quantity = Math.trunc(maxInvestPStep / (i * lotsize));
    //         if (i >= parseFloat(formik.values.currentPrice)) {
    //             buyValue = parseFloat(formik.values.currentPrice) * quantity * lotsize;
    //         } else {
    //             buyValue = i * quantity * lotsize;
    //         }
    //         var sellPrice = 0;
    //         if (tickSize == 'fix') {
    //             sellPrice = i + parseFloat(formik.values.sellPrice)
    //         } else {
    //             sellPrice = i + (parseFloat(formik.values.sellPrice) * i) / 100;
    //         }
    //         var sellValue = sellPrice * quantity * lotsize;
    //         var totalStock = 0;
    //         if (patternArray.length > 0) {
    //             for (let index = 0; index < patternArray.length; index++) {
    //                 totalStock += patternArray[index].qty;
    //             }
    //         }
    //         var totalInvestment = 0;
    //         if (patternArray.length > 0) {
    //             for (let index = 0; index < patternArray.length; index++) {
    //                 totalInvestment += patternArray[index].buyValue;
    //             }
    //         }
    //         var investmentWithCurrent = totalInvestment + buyValue;
    //         var sDisc = i - parseFloat(formik.values.currentPrice);
    //         var totalStockWithCurrent = totalStock + quantity;
    //         var avgPrice = investmentWithCurrent / totalStockWithCurrent
    //         var patternStep = {
    //             'step': patternArray.length + 1,
    //             'buyPrice': parseFloat(i.toFixed(2)),
    //             'sellPrice': parseFloat(sellPrice.toFixed(2)),
    //             'qty': parseFloat(quantity.toFixed(2)),
    //             'buyValue': parseFloat(buyValue.toFixed(2)),
    //             'sellValue': parseFloat(sellValue.toFixed(2)),
    //             'gross': parseFloat((sellValue - buyValue).toFixed(2)),
    //             'stock': totalStockWithCurrent.toFixed(2),
    //             'investment': parseFloat(investmentWithCurrent.toFixed(2)),
    //             'sDisc': sDisc > 0 ? sDisc.toFixed(2) : 0,
    //             'avg': (avgPrice / lotsize).toFixed(2)
    //         }
    //         if (patternStep.qty !== 0) {
    //             patternArray.push(JSON.parse(JSON.stringify(patternStep)));
    //         }
    //     }
    //     var buyValueObj = patternArray.filter((item) => item.buyPrice == parseFloat(formik.values.currentPrice))
    //     if (buyValueObj.length > 0) {
    //         setPatternList(patternArray)
    //         console.log(patternArray);
    //     } else {
    //         if (patternArray.length > 0) {
    //             setPatternList([])
    //             toast.error('Buy value in pattern not matched with currentPrice.')
    //         } else {
    //             toast.error('Investment value is too low as per your data.')
    //         }
    //     }
    // }
    const onAddPatternlist = async () => {
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
    console.log(selectedValue, 'selectedValue');
    const onNextBtnPress = () => {
        const PatterObjectArray = [];

        const PatternPreviewTable = [];
        const Current_price = [];

        if (selectedValue == 'CSV') {
            // if (!!selectedValue) {
                for (let index = 0; index < userJSON.length; index++) {
                    const element = userJSON[index];

                    console.log(element, 'rarrarrarra');
                    if (element.enter == 1) {
                        console.log(element, 'ELEMENT_________');

                        const obj = {
                            Price: element.buyPrice,
                        };
                        Current_price.push(obj);
                    }

                    console.log(element, 'MY___ELEMENT');

                    const PatternObject = {
                        buyPrice: parseFloat(element.buyPrice),
                        sellPrice: parseFloat(element.sellPrice),
                        buy_qty: parseFloat(element.buy_qty ),
                        sell_qty: parseFloat(element.sell_qty),
                        // enter_price: element.field5,
                    };

                    console.log(PatternObject, 'PATTERN______OBJECT');
                    PatterObjectArray.push(PatternObject);
                }

                // console.log(PatterObjectArray, 'PATTERN__OBJECT__ARRAY');

                console.log(PatternPreviewTable, 'PATTERN____PREVIEW');
            // }
        }
        else {
            if (!!patternDataArray) {
                if (!!patternDataArray.length > 0) {
                    for (let index = 0; index < patternDataArray.length; index++) {
                        const element = patternDataArray[index];
                        console.log(element, 'ELEMENT>>>>>>');
                        const bodyObject = {
                            buyPrice: parseFloat(element.buy),
                            sellPrice: parseFloat(element.sell),
                            buy_qty: parseFloat(element.buyQty),
                            sell_qty: parseFloat(element.sellQty),
                            // is_current_price: element.is_current_price,
                        };

                        if (element.is_current_price == true) {
                            const obj = {
                                Price: element.buy,
                            };
                            Current_price.push(obj);
                        }
                        // console.log(bodyObject, ' is_____current__price');


                        PatterObjectArray.push(bodyObject);
                    }
                }
            }
            // console.log(PatternCreate, 'PATTERN__CREATE__DATA');
        }

        // console.log(Current_price[0].Price, 'IS_____CURRENT____PRICE');
        const PatternPriceData = [];

        if (!!PatterObjectArray) {
            const PatternDataTable = PatterObjectArray;
            let BuyValue = [];
            let totalInvestment = 0;
            let InvestPerCurrent = 0;
            let totalStockWithCurrent = 0;
            let TotalinvestArray = [];
            let stockQty = 0;
            var totalStep = PatternDataTable.length;
            let investAtLast = 0;

            console.log(totalStep, 'TOTAL____STEP');
            let invest = 0;

            for (let index = 0; index < PatternDataTable.length; index++) {
                const element = PatternDataTable[index];
                console.log(element.buyPrice, 'IS___ELEMENT___FROM___LOOP');
                let buyValue =
                    parseFloat(element.buy_qty) *
                    parseFloat(Current_price[0].Price) *
                    lotsize;

                let sellValue =
                    parseFloat(element.sell_qty) * parseFloat(element.sellPrice);
                let buyPrice = parseFloat(element.buyPrice);
                let sellPrice = parseFloat(element.sellPrice);
                const buy_qty = parseFloat(element.buy_qty);
                const sell_qty = parseFloat(element.sell_qty);
                const Gross = parseFloat(sellValue) - parseFloat(buyValue);
                const Sdisc = parseFloat(buyPrice) - parseFloat(Current_price[0].Price);

                var totalInvest = 0;

                // var total_Investment = buy_qty * Current_price[0].Price;

                for (let index = 0; index < PatternDataTable.length; index++) {
                    totalInvest +=
                        parseFloat(Current_price[0].Price) * parseFloat(element.buy_qty);
                }

                for (let index = 0; index < PatternDataTable.length; index++) {
                    const element = PatternDataTable[index];
                    invest +=
                        parseFloat(element.buy_qty) * parseFloat(Current_price[0].Price);
                }

                InvestPerCurrent += element.buy_qty * Current_price[0].Price;

                BuyValue.push(
                    parseFloat(element.buyPrice) * parseFloat(element.buy_qty),
                ).toFixed(2);

                // TotalinvestArray.push(InvestPerCurrent);

                totalInvestment = parseFloat(invest.toFixed(2));

                console.log(PatternDataTable.length);

                totalStockWithCurrent += buy_qty;
                stockQty += buy_qty;

                // const lastItem = TotalinvestArray[TotalinvestArray.length - 1];

                // console.log(
                //   'TOTAL____INVEST',
                //   lastItem,
                //   // buy_qty,
                // );

                const obj = {
                    buyValue: parseFloat(buyValue.toFixed(2)),
                    investment: parseFloat(InvestPerCurrent.toFixed(2)),
                    sellValue: parseFloat(sellValue.toFixed(2)),
                    buyPrice: parseFloat(buyPrice.toFixed(2)),
                    sellPrice: parseFloat(sellPrice.toFixed(2)),
                    qty: parseFloat(buy_qty.toFixed(2)),
                    sell_qty: parseFloat(sell_qty.toFixed(2)),
                    stock: parseFloat(totalStockWithCurrent.toFixed(2)),
                    Gross: parseFloat(Gross.toFixed(2)),
                    sDisc: Sdisc.toFixed(2) > 0 ? parseFloat(Sdisc.toFixed(2)) : 0,
                    step: BuyValue.length,
                    stock: parseFloat(stockQty.toFixed(2)),
                    avg: parseFloat((InvestPerCurrent / stockQty).toFixed(2)),
                    isInitialBuy: '',
                };

                // {}

                PatternPreviewTable.push(obj);
                console.log(obj, 'CURRENT______PRICVE');
            }
            setTabalData(PatternPreviewTable)
        }

   
    };
    console.log(patternDataArray, 'patternDataArray');
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
                console.log(object, 'objectobject');
                // console.log('patternliaja', object)

                patternDataList.push(JSON.parse(JSON.stringify(object)))
            }
            var currentPriceArray = patternDataArray.filter((item) => item.is_current_price);
            var body = {
                "script": parseFloat(script.id),
                "currentPrice": currentPriceArray[0].buy,
                "pattern_data": patternDataList,
                "id_account": props.profile.userData.currentAccount.id,
                "initail_sell": 0,
                "amo_buy": parseFloat(formik.values.SellSteps),
                "amo_sell": parseFloat(formik.values.BuySteps),
                "normal_buy": parseFloat(formik.values.NormalBuy),
                "initail_buy": parseFloat(formik.values.Initail),

                "normal_sell": parseFloat(formik.values.NormalSell),
                // "minRange": parseFloat(formik.values.minRange),
            }
            console.log('patternDataList', body)
            var headers = {
                "Content-Type": "application/json",
                "x-access-token": props.profile.token
            }
            props.props.loaderRef(true)
            var patternAdd = await ApiServices.PostApiCall(ApiEndpoint.ADD_CUSTOM_PATTERN, JSON.stringify(body), headers)
            console.log(patternAdd, 'patternAdd');
            props.props.loaderRef(false)
            if (!!patternAdd.success) {
                console.log(patternAdd);
                let successStatus = patternAdd.success;
                successStatus.forEach(function (i, j) {
                    toast.success(i);
                });
                router.push('/pattanlist');
            } else if (!!patternAdd.fault) {
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
            formData.append('id_account', props.profile.userData.currentAccount.id);
            formData.append('file', csvFile)
            console.log(csvFile, 'formDataformData');

            var headers = {
                "x-access-token": props.profile.token
            }
            props.props.loaderRef(true)
            var patternAdd = await fetch(ApiEndpoint.ADD_CUSTOM_PATTERN, {
                method: 'POST',
                headers: headers,
                body: formData
            }).then((r) => {
                return r.json();
                setDatalistcsv(r.json())
            }).catch((exc) => {
                return null;
            });;
            props.props.loaderRef(false)
            console.log(patternAdd, 'patternAdd');
            if (!!patternAdd.success) {
                console.log(patternAdd);
                let successStatus = patternAdd.success;
                successStatus.forEach(function (i, j) {
                    toast.success(i);
                });
                router.push('/pattanlist');
            } else if (!!patternAdd.fault) {
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
        onAddPattern()
    }
    const getoardarlist = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var accountList = await ApiServices.GetApiCall(ApiEndpoint.CUSTOM_ORDER, headers)
        console.log(accountList, 'accountListaccountList');
        // {console.lon(accountList.state,'accountHHList');}
        // if(!!accountList){
        if (accountList.status) {
            console.log(accountList, 'accountList.data.initail_buy');

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
        setScripList(lebal)
        setFilterScripList(lebal)

    }
    console.log(selectedValue, 'selectedValue');
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

    function Item(value, index) {
        return (

                  <TableRow
                      sx={{ display: 'flex', flex: 1 }}
                    //   key={pattern.step}
                      hover
                  >
            <TableCell>
            <FormControlLabel className={styles.cerrpriash} label="Current Price" control={<Radio
                className={styles.rediobtnon}
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
                    </TableCell>
                    <TableCell>
                <Box >
                    <TextField
                        // sx={{ flex: 1 }}
                        error={value.isBuyError}
                        fullWidth
                        helperText={value.isSellError ? 'Enter Buy Price' : ''}
                        // label="Buy"
                        className={styles.tabalinputdata}
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
                </TableCell>
                <TableCell>
                <Box >
                    <TextField
                        // sx={{ flex: 1 }}
                        error={value.isQuantityError}
                        fullWidth
                        helperText={value.isQuantityError ? 'Enter Buy Quantity' : ''}
                        className={styles.tabalinputdata}
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
                </TableCell>
                <TableCell>
                <Box >
                    <TextField
                        // sx={{ flex: 1 }}
                        error={value.isSellError}
                        fullWidth
                        className={styles.tabalinputdata}
                        helperText={value.isSellError ? 'Enter Sell Price' : ''}
                        // label="Sell"
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
                </TableCell>
                <TableCell>
                <Box>
                    <TextField
                        // sx={{ flex: 1 }}
                        error={value.isQuantityError}
                        fullWidth
                        className={styles.tabalinputdata}
                        helperText={value.isQuantityError ? 'Enter Sell Quantity' : ''}
                        // label="Sell Quantity"
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
                </TableCell>
                <TableCell>
                <Box style={{ width:'100%',display: 'flex', alignItems: 'center' }}>
                    <TextField
                        sx={{ marginRight: 1 }}
                        // label="No of row"
                        margin="normal"
                        type="number"
                        className={styles.listrowadd}
                        name="sellquantity"
                        onChange={(value1) => {
                            let text = value1.target.value;
                            setRowCount(text)
                        }}
                        value={rowCount}
                        variant="outlined"
                    />
                    <Button
                        className={styles.batnopslak}
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
                        <img src='./Vector (20).svg' />
                    </Button>
                    {patternDataArray.length > 1 && <IconButton
                        sx={{ marginRight: 1 }}
                        edge="end"
                        size="small"
                        className={styles.batndeklet}
                        onClick={() => {
                            var patterndata = patternDataArray;
                            patterndata.splice(index, 1)
                            setPatternDataArray(patterndata)
                        }}
                    >
                        <img src='./delete.svg' />
                    </IconButton>}
                </Box>
                </TableCell>
                </TableRow>
            // </Box >
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


        </Box>

        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                        {/* <Typography variant="caption">Optional</Typography> */ }
                    );
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                    </Step>
                );
            })}
        </Stepper>
        {activeStep === steps.length ? (
            <React.Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography> */}
                {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box> */}
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Box sx={{ width: '100%' }}>
                    {activeStep == 0 && <>      <Card className={listnone == 'bloack' ? styles.listcentenar : styles.bolkdatat} >
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
                            <Box>
                                <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1 }}>
                                    <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>



                                        <Grid item md={4}>

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
                                                            className={styles.listtextfils22}

                                                            error={scriptError}
                                                            helperText={scriptError ? 'Scrip is required' : undefined}
                                                        // label={scripLable} 

                                                        />}
                                                    />
                                                </Box>

                                            </Box>
                                        </Grid>
                                    </Box>

                                </Box><div className={listdataconmnone == 'accodind' ? styles.listdatblok : styles.nnedatalist}>

                                    <Accordion className={styles.acclistloddop}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={styles.listbackdda}
                                        >
                                            <Typography className={styles.hedindrop}>Advanced</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={styles.listaccsumahha}>

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
                                                            // caretAs={calenderIcon}
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
                                                            // caretAs={calenderIcon}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Grid>


                                            </div>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion className={styles.acclistloddop}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className={styles.listbackdda}
                                        >
                                            <Typography className={styles.hedindrop33}>Order</Typography>
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

                                    <Grid item md={4} className={styles.gridmaen} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                        <div>   <Typography className={styles.typofonty} >Data Type

                                        </Typography></div>
                                        <div style={{ display: 'flex' }}>              <div style={{ display: 'flex', alignItems: 'center' }}> <Radio
                                            style={{ color: "#05315A" }}
                                            checked={selectedValue === 'CSV'}
                                            onChange={handleChangemejej}
                                            value="CSV"
                                            name="radio-buttons"
                                        />
                                            <Typography className={styles.typofonty} >CSV
                                            </Typography></div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>   <Radio
                                                checked={selectedValue === 'Manual'}
                                                onChange={handleChangemejej}
                                                value="Manual"
                                                style={{ color: "#05315A" }}
                                                name="radio-buttons"
                                            // inputProps={{ 'aria-label': 'B' }}
                                            />

                                                <Typography className={styles.typofonty} >Manual
                                                </Typography>      </div>  </div>  </Grid>  </div>

                                {/* <div className={setListdatopjj == 'WithoutStock' ? styles.nnedatalist : styles.listdatblok}> </div> */}



                            </Box>

                        </CardContent>
                    </Card></>
                    }
                    {activeStep == 1 && <> {selectedValue == 'CSV' ? <div className={styles.listgridpin}>
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
                        <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>



                            <Grid item md={4}>

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
                                                className={styles.listtextfils22}

                                                error={scriptError}
                                                helperText={scriptError ? 'Scrip is required' : undefined}
                                            // label={scripLable} 

                                            />}
                                        />
                                    </Box>

                                </Box>
                            </Grid>
                        </Box>


                        <Grid item md={4} style={{ display: 'flex', justifyContent: 'space-between', padding: "15px 0px 0px 0px" }}>
                            <div>
                                <Typography className={styles.datatyplo}>Data Type </Typography></div><div>
                                <Button onClick={() => { setSelectedValue('CSV') }} className={selectedValue == 'CSV' ? styles.list2data : styles.listdatlog}>CSV</Button>
                                <Button onClick={() => { setSelectedValue('Manual') }} className={selectedValue == 'Manual' ? styles.list2data : styles.listdatlog}>Manual</Button>
                            </div>
                        </Grid>
                        <Grid item md={4} display={'flex'} justifyContent={'end'}>
                            <Box sx={{ mt: 3, mb: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                {/* <Typography sx={{ fontWeight: 'bold', color: '#524ddc' }}>
                                                Upload CSV
                                            </Typography> */}
                                <Typography className={styles.csvdolgsamp}>Download Sample CSV  </Typography>
                                <Button
                                    className={styles.btnlistateg}
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
                                    <img src='./Vector (22).svg' />
                                    {/* Download Sample CSV */}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid className={styles.boxupoad} item md={4} display={'flex'} justifyContent={'center'}>
                            <Box >
                                <div className={styles.imgtebuplodl}>
                                    <img src='./Upload icon.svg' alt='Upload icon' />
                                </div>
                                <div className={styles.listmaendic}>
                                    <Typography >Drag & drop files or  </Typography>
                                    <Button variant="contained"
                                        component="label" className={styles.imputafile}>

                                        <input
                                            className={styles.lidtfiledst}
                                            id="files"
                                            lebal='bshshs'
                                            type="file"
                                            hidden
                                            // className=
                                            onChange={(file) => {
                                                handleCSVUpload(file.target.files[0])
                                                setFile(file.target.files[0]);
                                            }}
                                            accept=".csv" ></input>
                                        Browse   </Button>
                                    {/* <Button onClick={handleCSVSubmit}>sub</Button> */}
                                </div>
                                <div className={styles.listcsvdata}>
                                    <Typography>Supported formates: CSV</Typography>
                                </div>
                            </Box>

                        </Grid>
                    </div> : <div>
                        <div className={styles.listmaenstokdiv}>
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
                            <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>



                                <Grid item md={4}>

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
                                                    className={styles.listtextfils22}

                                                    error={scriptError}
                                                    helperText={scriptError ? 'Scrip is required' : undefined}
                                                // label={scripLable} 

                                                />}
                                            />
                                        </Box>

                                    </Box>
                                </Grid>
                            </Box>

                            <Grid item md={4} style={{ display: 'flex', justifyContent: 'space-between', padding: "15px 0px 0px 0px" }}>
                                <div>
                                    <Typography className={styles.datatyplo}>Data Type </Typography></div><div>
                                    <Button onClick={() => { setSelectedValue('CSV') }} className={selectedValue == 'CSV' ? styles.list2data : styles.listdatlog}>CSV</Button>
                                    <Button onClick={() => { setSelectedValue('Manual') }} className={selectedValue == 'Manual' ? styles.list2data : styles.listdatlog}>Manual</Button>
                                </div>
                            </Grid>
                        </div>
                        {(lotsize != 1) ? <Box sx={{ display: 'flex', paddingLeft: 3, fontSize: 10 }}>lotSize={lotsize}</Box> : ''}

                        <Box sx={{ padding: "15px 0px 0px 0px", width: '100%' }}

                                    >
                                        <Table>
                                            <TableHead className={styles.hedarliath}>
                                                <TableRow>
                                                    <TableCell>
                                                        Enter Price                </TableCell>
                                                    <TableCell>
                                                        Buy Price
                                                    </TableCell>
                                                    <TableCell>
                                                        Sell Price
                                                    </TableCell>
                                                    <TableCell>
                                                        Buy Quantity
                                                    </TableCell>
                                                    <TableCell>
                                                        Sell Quantity
                                                    </TableCell>
                                                    <TableCell className={styles.listactivetabal}>
                                                        Actions
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>

                                        </Table>
                                        <Table>
                                            <TableBody className={styles.listrowdATA}>

                                            <Box sx={{  flexDirection: 'column' }}>
                            {patternDataArray.map((item, index) => Item(item, index))}

                        </Box>
                                            </TableBody>
                                            </Table>
                                    </Box>

                        {/* <Box sx={{ flexDirection: 'row-reverse', display: 'flex', flex: 1 }}>

                        </Box> */}
                    </div>
                    }</>}
                    {activeStep == 2 && <><Card
                        className={styles.listdellpeper}
                    // className={listinnewdata == 'gsdgfgdffd' ? styles.bolkdatat : styles.listcentenar} id={padjdhdggd == 'VRP' ? styles.bolkdatat : styles.listcentenar}
                    >
                        {/* <PerfectScrollbar> */}

                        <Grid item sm={12} md={12} xs={12} >

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
                                {/* <div style={{ padding: '0px 30px 0px 0px' }}>
                                                <Typography className={styles.peregarflist33} >Type</Typography>
                                                <Typography className={styles.peregarflist44} >{patternItem.id}</Typography>
                                            </div> */}
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
                    </Card></>}
                    {activeStep == 3 && <> <Container maxWidth={false}>

                        <Box sx={{ mb: 3 }}>

                            {listsummri == 'addsumari' ?
                                <>

                                </> : ''}
                            {!!tabaldata && tabaldata.length !== 0 && <Box sx={{ mt: 3 }}>
                                <Card
                                // className={tabaldatalist == 'virang' ? styles.bolkdatat : styles.listcentenar}
                                >
                                    {/* <Card {...rest}> */}
                                    {/* <PerfectScrollbar> */}
                                    <Box sx={{ width: '100%' }}>
                                        {/* <Sticky> */}
                                        <Table>
                                            <TableHead className={styles.hedarliath}>
                                                <TableRow sx={{ display: 'flex', flex: 1 }}>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Step
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Buy
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Sell
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Qty
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Buy(₹)
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Sell(₹)
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Gross
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Stock
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Investment
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        S. Disc
                                                    </TableCell>
                                                    <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                        Avg
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                        {/* </Sticky> */}
                                        <Table>
                                            <TableBody className={styles.listrowdATA}>
                                                {tabaldata.map((pattern) => (
                                                    <TableRow
                                                        sx={{ display: 'flex', flex: 1 }}
                                                        key={pattern.step}
                                                        hover
                                                    >
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.step}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.buyPrice}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.sellPrice}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.qty}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.buyValue}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.sellValue}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.Gross}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.stock}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.investment}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
                                                            {pattern.sDisc}
                                                        </TableCell>
                                                        <TableCell sx={{ display: 'flex', flex: 1 }}>
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

                        </Box>
                    </Container></>}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: "end", width: "100%", padding: '0px 25px 30px 0px', flexDirection: 'row', pt: 2 }}>
                    <Button
                        className={styles.batnpovedar}
                        style={{ backgroundColor: '#4285F4', color: '#fff' }}
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Preview
                    </Button>

                    {/* {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )} */}

{ script == '' || selectedValue =='a' ?
                    <Button style={{ backgroundColor: '#009947', color: '#fff' }} className={styles.batnpovedar22}
                    disabled
                        onClick={() => {
                            handleNext()
                            if (selectedValue == 'CSV') {
                                // handleCSVSubmit()
                            }
                            if (activeStep == 2) {
                                onNextBtnPress()
                            }
                            if (activeStep === steps.length - 1) {

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

                            }
                        }}>
                        {activeStep === steps.length - 1 ? 'Lock' : 'Next'}
                    </Button>:       <Button style={{ backgroundColor: '#009947', color: '#fff' }} className={styles.batnpovedar22}
                        onClick={() => {
                            handleNext()
                            if (selectedValue == 'CSV') {
                                // handleCSVSubmit()
                            }
                            if (activeStep == 2) {
                                onNextBtnPress()
                            }
                            if (activeStep === steps.length - 1) {

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

                            }
                        }}>{activeStep === steps.length - 1 ? 'Lock' : 'Next'}</Button>}
                </Box>
            </React.Fragment>
        )}

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

        {/* <Dialog
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
            </Dialog> */}
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
