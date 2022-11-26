// import Head from 'next/head'
// import Image from 'next/image'
import React, { useState } from "react";
import styles from '../Stocks/Stocks.module.scss'
import Grid from '@mui/material/Grid';
// import Newbar from '../componehts/newbar/newbar';
// import Stocks from '../componehts/Stocks/Stocks';
import { Box, Button, Typography, TableFooter, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SouthIcon from '@mui/icons-material/South';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NorthIcon from '@mui/icons-material/North';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
// import * as React from 'react';
import { alpha } from '@mui/material/styles';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import moment from 'moment'
import PropTypes from "prop-types";
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import Menu from '@mui/material/Menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Touchable from 'rc-touchable';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import InputLabel from '@mui/material/InputLabel';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Tabs from '@mui/material/Tabs';
import { useRouter } from 'next/router';
import Summary from "../../pages/pattandeteal";

import { shouldDisplay } from "rsuite/esm/Picker";
import { setDate } from "rsuite/esm/utils/dateUtils";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { BUILD_MANIFEST } from "next/dist/shared/lib/constants";
import { Router } from "next/router";
import { Console, log } from "console";
const tabtheme = createTheme({
    palette: {
        primary: {
            main: '#009947'
        },
    },
});
interface Data {
    // calories: number;
    // carbs: number;
    // fat: number;
    Script: string;
    NSE: string;
    Type: string;
    Investment: number;
    Profit: number;
    Stocks: number;
    Created: string;
    Status: string;
    protein: string;
}

function createData(
    Script: string,
    NSE: string,
    Type: string,
    Investment: number,
    Profit: number,
    Stocks: number,
    Created: string,
    Status: string,
    protein: string,
    // fat: number,
    // carbs: number,
    // protein: number,
): Data {
    return {
        Script,
        NSE,
        Type,
        Investment,
        Profit,
        Stocks,
        Created,
        Status,
        // calories,
        // fat,
        // carbs,
        protein,
    };
}


// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         "aria-controls": `simple-tabpanel-${index}`,
//     };
// }
function TablePaginationActions(props: {
    count: any;
    page: any;
    rowsPerPage: any;
    onPageChange: any;
}) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: any) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: any) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: any) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: any) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'Script',
        numeric: false,
        disablePadding: true,
        label: 'Script',
    },
    {
        id: 'Type',
        numeric: true,
        disablePadding: false,
        label: 'Order Id',
    },
    {
        id: 'Investment',
        numeric: true,
        disablePadding: false,
        label: 'Quantity',
    },
    {
        id: 'Profit',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    // {
    //     id: 'Stocks',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Stocks',
    // },
    {
        id: 'Created',
        numeric: true,
        disablePadding: false,
        label: 'Created Date',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'Action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell className={styles.listchekboix} padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {/* <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        > */}
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                        {/* </TableSortLabel> */}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
// const tabtheme = createTheme({
//     palette: {
//         primary: {
//             main: '#32908F'
//         },
//     },
// });
const ResponsiveAppBar = (props) => {
    console.log( props.props,'props');
    
    // console.log(props.props.profile.token, 'emailID')
    // const [value, setValue] = React.useState('1');

    const [arrolist, setArrolist] = useState(true);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [datatebalpettan, setDatatebalpettan] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [datalist, setDatalist] = React.useState([]);
    const [datasars, setDatasars] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [age, setAge] = React.useState('');
    const [com, setCom] = React.useState(false);
    const [play, setPlay] = React.useState(false);
    const [pause, setPause] = React.useState(false)
    const [diletbtn, setDiletbtn] = React.useState(false)
    const [search, setSearch] = React.useState(false);

    const router = useRouter();

    var handleClickOpenComdilet = (myprops) => {
        setDiletbtn(true);
        // console.log(advertiseMent, startDate, endDate, image, 'hello data')
        // myprops = { advertiseMent }
    };
    const handleCloseComdelet = () => {
        setDiletbtn(false);
    }
    var handleClickOpenCom = (myprops) => {
        setCom(true);
        // console.log(advertiseMent, startDate, endDate, image, 'hello data')
        // myprops = { advertiseMent }
    };
    var handleClickOpenComplay = (myprops) => {
        setPlay(true);
        // console.log(advertiseMent, startDate, endDate, image, 'hello data')
        // myprops = { advertiseMent }

    };
    var handleClickOpenCompause = (myprops) => {
        setPause(true);
        // console.log(advertiseMent, startDate, endDate, image, 'hello data')
        // myprops = { advertiseMent }
    };
    const handleCloseCom = () => {
        setCom(false);
    }
    const handleCloseCompause = () => {
        setPause(false);
    }
    const handleCloseComplay = () => {
        setPlay(false);
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangesalyadar = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const open = Boolean(anchorEl);
    const menulist = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    //   const prevOpen = React.useRef(open);
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            // anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const patternlist = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var body = {
            "id_pattern": [props.props],
            // props.idlist,
            // email: props.email,
            // otp: outField
        }
        console.log(body, 'body');

        // props.loaderRef(true)
        // var data = await ApiServices.GetApiCall(ApiEndpoint.ORDERLIST, headers)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ORDERLIST, JSON.stringify(body), headers)

        // const data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_LIST, JSON.stringify(body), headers);
        // props.loaderRef(false)
        console.log(patternDelete, 'datalistddd');

        if (!!data) {
            if (patternDelete.status == true && patternDelete.data.length > 0) {
                const accoyty = [];
                const datalist = [];
                const datalogo = []
                const listdata = []
                for (let index = 0; index < patternDelete.data.length; index++) {
                    const element = patternDelete.data[index];
                    const object = {
                        id: element.id,
                        script: element.name,
                        exchange: element.exchange,
                        type_pattern: element.orderId,
                        investment: element.quantity,
                        profit: element.price,
                        stock: element.transactionType,
                        created_at: element.createdAt,
                        status: element.status
                    }
                    listdata.push(JSON.parse(JSON.stringify(object)))
                    datalogo.push(JSON.parse(JSON.stringify(object.status)))
                    datalist.push(JSON.parse(JSON.stringify(object)))
                    accoyty.push(JSON.parse(JSON.stringify(object)))
                    // csvall.push(objectcsv)
                }
                setDatasars(listdata)
                setDatalist(datalogo)
                setDatatebalpettan(accoyty)
                setData(data)
            }

        }
    }

    // let inloglist=datatebal.zerodha_token_update

    console.log(datatebalpettan, 'datatebalpettan');

    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            patternlist()
        }
    }, [])
    console.log(datalist, 'stock');
    const [value, setValue] = React.useState(0);

    const handleChangelist = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datatebalpettan.length) : 0;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container spacing={0} className={styles.cantenar_list57}>

            <Grid item md={12} sm={12} xs={12} className={styles.boxteballist22}>
                {/* <Box> */}

                {/* <div className={styles.listmeniom}>
                    <Grid item md={3} sm={6} xs={6}>
                        <div className={styles.patterndiv}>
                            <Typography>AAPL</Typography>
                        </div>
                    </Grid>
                    <Grid md={9} sm={6} xs={6} display={'flex'} justifyContent={'end'}>
                        <Button >
                            <Avatar className={styles.avtarmenuop}>
                                <img src="../../Vector (14).svg" />
                            </Avatar>
                        </Button>
                    </Grid>
                </div> */}
                <div className={styles.inputlistm3}>
                    {/* <Grid item md={6} sm={12} xs={12}>
                        <div> */}
                        {/* <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Summary />        </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box> */}
                            {/* <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    // TabIndicatorProps={{ style: { background: "#009947" } }}
                    sx={{
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#009947",
                        height: 4,
                      },
                      "& .MuiTab-root.Mui-selected": {
                        color: "#009947",
                        fontSize: 14,
                        textTransform: "capitalize",
                      },
                    }}
                  >
                    <Tab
                      label="Summary"
                      {...a11yProps(0)}
                      className={styles.active + " " + styles.btn}
                    />
                    <Tab
                      label="Today’s orders"
                      {...a11yProps(1)}
                      className={styles.btn}
                    />
                    <Tab
                      label="Order History"
                      {...a11yProps(2)}
                      className={styles.btn}
                    />
                    <Tab
                      label="Chart"
                      {...a11yProps(3)}
                      className={styles.btn}
                    />
                  </Tabs>
                {/* </Box> */}
                            {/* <Box>
                  <TabPanel value={value} index={0}>
                    {/* {/ Summary /} */}
                            {/* <Summary /> */}
                            {/* </TabPanel> */}
                            {/* <TabPanel value={value} index={1}> */}
                            {/* {/ Today’s orders /} */}
                            {/* <TodayOrder /> */}
                            {/* </TabPanel> */}
                            {/* <TabPanel value={value} index={2}> */}
                            {/* {/ Order History /} */}
                            {/* </TabPanel> */}
                            {/* <TabPanel value={value} index={3}> */}
                            {/* {/ Chart /} */}
                            {/* </TabPanel> */}
                            {/* </Box>  */}
                            {/* <TabContext value={value}> */}
                            {/* <ThemeProvider theme={tabtheme}>
                                <TabContext value={value}  > */}
                            {/* <Tabs        
                                                                TabIndicatorProps={{
                                            style: {
                                                indicatorColor: "#009947",
                                                textColor: '#009947',
                                                backgroundColor: "#009947",
                                            }
                                        }}
                                        theme={tabtheme}
                                        className={styles.tebpenaimanna}
                                        //  textColor="green"
                                        value={value}
                                        //  onChange={handleChange}
                                        // indicatorColor="#009947"
                                        onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Summary"   {...a11yProps(0)} className={styles.summarvaurr} />
                                        <Tab label="Today’s orders" value="2" className={styles.summarvaurr} />
                                        <Tab label="Order History" value="3" className={styles.summarvaurr} />
                                        <Tab label="Chart" value="4" className={styles.summarvaurr} />
                                    </Tabs>
                                {/* </TabContext>
                            </ThemeProvider> */}
                            {/* <TabPanel value={value} index={1}>
                                {/* {/ Summary /} */}
                            {/* <Summary />
                            </TabPanel>  */}
                            {/* </TabContext> */}
                        </div>
                        {/* <Box className={styles.boxreting} display={'flex'}>

                            <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off"
                                onChange={(e) => {
                                    //   setPage(0)
                                    var value = e.target.value
                                    if (typeof value !== 'object') {
                                        if (!value || value == '') {
                                            setDatatebalpettan(datasars);
                                        } else {
                                            var filteredData = datasars.filter((item) => {
                                                let searchValue = item.script.toLowerCase();
                                                return searchValue.includes(value.toString().toLowerCase())
                                            })
                                            setDatatebalpettan(filteredData);
                                        }
                                    }
                                }}
                            />
                        </Box> */}
                    {/* </Grid>

                    <Grid item md={6} item md={6} sm={12} xs={12} display={'flex'} justifyContent={'end'}>
                        <Button className={styles.editbtndiv}>Edit</Button>
                    </Grid> */}

                {/* </div> */}
                <div style={{display:'flex'}}>
             <div className={styles.maendivhpline}>
                    {/* <Grid item md={12} sm={12} xs={12}> */}
                        <div className={styles.inlinemanediv}>
                            <div className={styles.hadingbtn}><Typography>Today’s orders</Typography> </div>
                            <div className={styles.openbtn_today}><Button>Open</Button></div>
                            <div className={styles.openbtn_today}><Button>Trade</Button></div>
                        </div>
                    {/* </Grid> */} 
                    {/* <Grid item md={12} display={'flex'} justifyContent={'end'}> */}
                        {/* <Paper>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper> */}
                        {/* <div>
                        {/* <Button className={styles.btnfiltaebtn2} ><SearchIcon /></Button> */}

                        {/* </div> */}
                        </div> 
                        {search ?
                            <div>
                                <input type="text" name="search"
                                    className={styles.searchbtn}
                                    // onClick={display:b}
                                    onChange={(e) => {
                                        var value = e.target.value
                                        if (typeof value !== 'object') {
                                            if (!value || value == '') {
                                                setDatatebalpettan(datasars)
                                            } else {
                                                var filteredData = datasars.filter((item) => {
                                                    let searchValue = item.user.first_name.toLowerCase() + ' ' + item.user.last_name.toLowerCase()
                                                    return searchValue.includes(value.toString().toLowerCase())
                                                })
                                                setDatatebalpettan(filteredData)
                                            }
                                        }
                                    }}
                                    autoComplete="off" /></div> : <style>{`
                          display: none;
                        `}</style>}
                        <div style={{display:'flex',justifyContent:'end',alignItems:'center',width:'58%'}}>
                            <Button className={styles.btnfiltaebtn2} onClick={(e) => {
                                setSearch(!search)
                            }} ><SearchIcon /></Button>
                        </div>
                        <Button className={styles.btnfiltaebtn} onClick={menulist}
                        >
                            {/* <Typography>
                            Filter
                        </Typography> */}
                            <FilterListIcon />
                        </Button>
                        </div>
                        <Menu
                            className={styles.menufiltarbtn}
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            // onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <div className={styles.filtarlist}>

                                <div className={styles.filatahedinh}><Typography>FILTER</Typography></div>
                                <div className={styles.listbtnsot}>
                                    <Button className={styles.censbatnsot22} onClick={handleClose}>RESET </Button>
                                    <Button className={styles.savebatnsot223}>Save</Button></div>
                            </div>
                            <Divider className={styles.filtar_divaydar}></Divider>

                            <div>
                                <div className={styles.filatahedinh22}><Typography>Patterns</Typography></div>
                                <div className={styles.typetext222}><Typography>Type</Typography></div>
                                <div>
                                    <Button className={styles.nonelistbtn}>None</Button>
                                    <Button className={styles.Basiclistbtn}>Basic</Button>
                                    <Button className={styles.Customlistbtn}>Custom</Button>
                                </div>
                                <div className={styles.maendivselect}>
                                    <InputLabel className={styles.patternlebal} id="demo-simple-select-helper-label">Patterns</InputLabel>

                                    <Select
                                        className={styles.listsekater}
                                        value={age}
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Ten'}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>

                                </div>
                                <div className={styles.filatahedinh22}><Typography>Accounts</Typography></div>
                                <div className={styles.typetext222}><Typography>Type</Typography></div>
                                <div>
                                    <Button className={styles.nonelistbtn}>None</Button>
                                    <Button className={styles.Basiclistbtn}>Kotak</Button>
                                    <Button className={styles.Customlistbtn}>Zerodha</Button>
                                </div>
                            </div>
                            {/* <Divider className={styles.divaydarten}></Divider> */}
                            <div className={styles.divlistsivijan}></div>
                        </Menu>
                      
                    {/* </Grid> */}
                {/* </div>
                <Grid> */}
                    <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%',borderBottomLeftRadius:'20px',borderBottomRightRadius:"20PX" }}>
                            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                            <TableContainer style={{borderBottomLeftRadius:'20px',borderBottomRightRadius:"20PX"}} >
                                <Table
                                    className={styles.tablelist}
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={datatebalpettan.length}
                                    />
                                    <TableBody>
                                        {stableSort(datatebalpettan, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.id);
                                                // const isItemSelected = isSelected(row.id_account);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        // hover
                                                        // onClick={(event) => handleClick(event, row.name)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell className={styles.tebalrovcek} padding="checkbox">
                                                            <Checkbox
                                                                checked={isItemSelected}
                                                                onClick={(event) => handleClick(event, row.id)}
                                                                inputProps={{
                                                                    "aria-labelledby": labelId,
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            // component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <div className={styles.typefild}>
                                                                <div>
                                                                    <Avatar className={row.status == 'pending' ? styles.avtarlistyes96 : row.status == 'active' ? styles.avtarlistyes233 : row.status == 'exit' ? styles.avtarlistyes398 : ''}>
                                                                        {/* {row.stock == 'SELL' ? <Avatar className={styles.avtarlistyes96}> <Avatar className={styles.avtarlistyes233}>*/}
                                                                        {row.stock == 'SELL' ?
                                                                            <img src="../../ftGySSa - Imgur.svg" />

                                                                            : row.stock == 'BUY' ? <img src="../../2Nk5d5p - Imgur.svg" /> : ''}
                                                                    </Avatar>
                                                                </div><div className={styles.listperegaf}>
                                                                    <Typography className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'exit' ? styles.exitcolor : ''}>{row.script}</Typography>

                                                                    <div className={styles.nselist}><Typography>{row.exchange}</Typography></div></div>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell
                                                        // align="right"
                                                        >{row.type_pattern}</TableCell>
                                                        <TableCell ><Typography className={styles.rowlistpement}>{row.investment}</Typography></TableCell>
                                                        <TableCell className={row.profit <= 0 ? styles.maynascall : styles.palscalls}>
                                                            <div className={styles.tabaldataicon}><CurrencyRupeeIcon className={styles.iconlistmrnu} /> {row.profit}</div>
                                                            {/* 100 */}
                                                        </TableCell>
                                                        {/* <TableCell >{row.stock}</TableCell> */}
                                                        <TableCell >
                                                            <Typography className={styles.dateone}>{
                                                                moment(row.created_at).format("DD-MM-YYYY h:mm:ss")
                                                            } </Typography></TableCell>

                                                        <TableCell>
                                                            <Button className={styles.batnliastbtngop} onClick={row.status == 'pending' ? handleClickOpenCompause : row.status == 'active' ? handleClickOpenComplay : row.status == 'exit' ? handleClickOpenCom : ''}>
                                                                {/* {row.status == 'pause' ? 'Cancel' : row.status == 'active' ? 'Active' : row.status == 'exit' ? 'Delete' : ''}> */}
                                                                <Typography className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'exit' ? styles.exitcolor : ''}>{row.status == 'pending' ? 'Cancel' : row.status == 'active' ? 'Active' : row.status == 'exit' ? 'Delete' : ''}</Typography>
                                                            </Button>


                                                        </TableCell>

                                                        <TableCell className={styles.btnmenubar}>

                                                            <div >
                                                                <Button className={styles.viwebtnmm22} onClick={handleClickOpenComdilet}> <MoreVertIcon /></Button>


                                                            </div>
                                                            <div>
                                                                <Dialog open={diletbtn} onClose={handleCloseComdelet}
                                                                    className={styles.borderredayasfor}
                                                                    style={{
                                                                        // borderRadius: '30px'
                                                                    }}
                                                                    // fullWidth
                                                                    maxWidth="sm"
                                                                >
                                                                    <div>
                                                                        <DialogContent className={styles.popupcantenar}>
                                                                            <Box><div className={styles.delehedar2}>
                                                                                <Typography>Delete Account</Typography>
                                                                            </div>
                                                                                <Divider>

                                                                                </Divider>
                                                                                <div className={styles.accoparegarf}>
                                                                                    <Typography>
                                                                                        Are you sure you want to delete
                                                                                        this order( #123DR5HKGF )?
                                                                                    </Typography>
                                                                                    <Typography className={styles.peregara_itbtn}>It will delete from 3rd party broker </Typography>
                                                                                </div>
                                                                                {/* <div></div> */}
                                                                                <Divider>

                                                                                </Divider>
                                                                                <div><Button className={styles.cancelbtn} onClick={handleCloseComdelet}>Cancel</Button><img src='../../Line 17.png' /><Button className={styles.cancelbtn2}>Delete</Button></div>
                                                                            </Box>
                                                                            {/* <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} /> */}
                                                                        </DialogContent>
                                                                    </div>
                                                                </Dialog>
                                                            </div>
                                                            <div>
                                                                <Dialog open={com} onClose={handleCloseCom}
                                                                    className={styles.borderredayasfor}
                                                                    style={{
                                                                        // borderRadius: '30px'
                                                                    }}
                                                                    // fullWidth
                                                                    maxWidth="sm"
                                                                >
                                                                    <div className={styles.colosbatnlist}><Button onClick={handleCloseCom}><img height={30} width={20} src="../../Vector (13).svg" /></Button>  </div>
                                                                    <div>
                                                                        <DialogContent className={styles.popupcantenar}>
                                                                            <Box className={styles.lisrmaenbox}>

                                                                                <div className={styles.delehedar}>
                                                                                    <Typography>Delete Order</Typography>
                                                                                </div>
                                                                                <div className={styles.listimgyes2}>
                                                                                    <img src="../../Group 1000002845.svg" />
                                                                                </div>
                                                                                <Box className={styles.listboxiduser28}>
                                                                                    {/* <InputLabel className={styles.leballist}>ORDER ID </InputLabel>  */}
                                                                                    <div className={styles.listmenutypoo22}><Typography>Are you sure you want to delete this order ( #12334 ) from zerodha ?</Typography></div>
                                                                                    <div className={styles.listmenutypoo}><Typography>Zerodha</Typography>:<Typography>#12345</Typography></div>
                                                                                    <div className={styles.listmenutypoo}><Typography>Zerodha</Typography>:<Typography>#12345</Typography></div>
                                                                                </Box>
                                                                                <div className={styles.listbtnimpoo}>
                                                                                    <div className={styles.cancelbtnlog}><Button >Cancel</Button></div>
                                                                                    <img src="../../Line 17.svg" />
                                                                                    <div className={styles.cancelbtnlog2} onClick={handleClickOpenComplay}><Button >Confirm</Button></div>
                                                                                </div>
                                                                            </Box>
                                                                            {/* <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} /> */}
                                                                        </DialogContent>
                                                                    </div>
                                                                </Dialog>
                                                            </div>
                                                            <div>
                                                                <Dialog open={play} onClose={handleCloseComplay}
                                                                    className={styles.borderredayasfor}
                                                                    style={{
                                                                        // borderRadius: '30px'
                                                                    }}
                                                                    // fullWidth
                                                                    maxWidth="sm"
                                                                >
                                                                    <div className={styles.colosbatnlist}><Button onClick={handleCloseComplay}><img height={30} width={20} src="../../Vector (13).svg" /></Button>  </div>
                                                                    <div>
                                                                        <DialogContent className={styles.popupcantenar}>
                                                                            <Box className={styles.lisrmaenbox}>

                                                                                <div className={styles.delehedar}>
                                                                                    <Typography>Delete Successful</Typography>
                                                                                </div>
                                                                                <div className={styles.listimgyes2}>
                                                                                    <img src="../../Group 47124 (3).svg" />
                                                                                </div>
                                                                                <Box className={styles.listboxiduser223}>
                                                                                    <div className={styles.listmaendivid}>
                                                                                        <div className={styles.oderidpopup}><InputLabel>ORDER ID</InputLabel>
                                                                                            <Typography>NF123444</Typography>
                                                                                        </div>
                                                                                        <div className={styles.oderidpopup}><InputLabel>TIS ORDER ID</InputLabel>
                                                                                            <Typography>12322SSDFDF</Typography>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.oderidpopup2}><InputLabel>Type</InputLabel>
                                                                                        <Typography>Zerodha</Typography>
                                                                                    </div>

                                                                                    {/* <InputLabel className={styles.leballist}>ORDER ID </InputLabel> */}
                                                                                    {/* <div className={styles.listmenutypoo22}><Typography>Are you sure you want to delete this order ( #12334 ) from zerodha ?</Typography></div>
                                                                                 <div className={styles.listmenutypoo}><Typography>Zerodha</Typography>:<Typography>#12345</Typography></div>
                                                                                 <div className={styles.listmenutypoo}><Typography>Zerodha</Typography>:<Typography>#12345</Typography></div> */}
                                                                                </Box>
                                                                                <div className={styles.listbtnimpoo}>
                                                                                    <div className={styles.cancelbtnlog} onClick={handleCloseComplay}><Button >Cancel</Button></div>
                                                                                    <img src="../../Line 17.svg" />
                                                                                    <div className={styles.cancelbtnlog2}><Button >Confirm</Button></div>
                                                                                </div>
                                                                            </Box>
                                                                            {/* <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} /> */}
                                                                        </DialogContent>
                                                                    </div>
                                                                </Dialog>
                                                            </div>
                                                            <div>
                                                                <Dialog open={pause} onClose={handleCloseCompause}
                                                                    className={styles.borderredayasfor}
                                                                    style={{
                                                                        // borderRadius: '30px'
                                                                    }}
                                                                    // fullWidth
                                                                    maxWidth="sm"
                                                                >
                                                                    <div className={styles.colosbatnlist}><Button onClick={handleCloseCompause}><img height={30} width={20} src="../../Vector (13).svg" /></Button>  </div>
                                                                    <div>
                                                                        <DialogContent className={styles.popupcantenar}>
                                                                            <Box className={styles.lisrmaenbox}>

                                                                                <div className={styles.delehedar}>
                                                                                    <Typography>Play Pattern</Typography>
                                                                                </div>
                                                                                <div className={styles.listimgyes}>
                                                                                    <img src="../../Group 47124 (2).svg" />
                                                                                </div>
                                                                                {/* <Box className={styles.listboxiduser}>
                                                                           <InputLabel className={styles.leballist}>ORDER ID </InputLabel> */}
                                                                                <div className={styles.paregarafnsg}>
                                                                                    <Typography>Are you sure you want to pause this AAPL ( NSE ) from zerodha ?</Typography>
                                                                                </div>
                                                                                <div className={styles.pustlebal}>
                                                                                    <Typography>Pause with </Typography>
                                                                                </div>
                                                                                <div className={styles.btn_all_buy}><Button>All</Button><Button>Buy</Button><Button>Sell</Button></div>
                                                                                {/* </Box> */}
                                                                                <div className={styles.cancelbtnlog}><Button >Cancel</Button><img className={styles.linelinjk} src='../../Line 17.svg'></img><Button className={styles.cofimbatn}>Confirm</Button></div>
                                                                            </Box>
                                                                            {/* <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} /> */}
                                                                        </DialogContent>
                                                                    </div>
                                                                </Dialog>
                                                            </div>
                                                        </TableCell>

                                                    </TableRow>
                                                );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (dense ? 33 : 53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow >
                                            <TablePagination
                                                className={styles.tablePagination}
                                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                count={datatebalpettan.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: {
                                                        "aria-label": "rows per page",
                                                    },
                                                    native: false,
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                            {/* <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            /> */}
                        </Paper>
                        {/* <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        /> */}
                    </Box>
                {/* </Grid> */}
            </Grid>
        </Grid>
    )
}
// export default ResponsiveAppBar;
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
