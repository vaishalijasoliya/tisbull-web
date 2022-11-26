import React, { useState } from "react";
import styles from './Stocks.module.scss'
import Grid from '@mui/material/Grid';
import { Box, Button, Typography, TableFooter, useTheme, RadioGroup, Radio, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { toast } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import moment from 'moment'
import PropTypes from "prop-types";
import Menu from '@mui/material/Menu';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InputLabel from '@mui/material/InputLabel';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from "./btngorup";
import { useRouter } from 'next/router';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { visuallyHidden } from '@mui/utils';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
const tabtheme = createTheme({
    palette: {
        primary: {
            main: '#009947'
        },
    },
});
interface Data {

    Script: string;
    NSE: string;
    Type: string;
    Investment: number;
    Profit: number;
    Stocks: number;
    Created: string;
    Status: string;
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
    };
}

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
        label: 'Type',
    },
    {
        id: 'Investment',
        numeric: true,
        disablePadding: false,
        label: 'Investment',
    },
    {
        id: 'Profit',
        numeric: true,
        disablePadding: false,
        label: 'Profit',
    },
    {
        id: 'Stocks',
        numeric: true,
        disablePadding: false,
        label: 'Stocks',
    },
    {
        id: 'Created',
        numeric: true,
        disablePadding: false,
        label: 'Created',
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
const blue = {
    500: '#36DAB2',
};

const grey = {
    400: '#BFC7CF',
    500: '#AAB4BE',
    600: '#6F7E8C',
};

const Root = styled('span')(
    ({ theme }) => `
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin: 10px;
    cursor: pointer;
  
    &.${switchUnstyledClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    & .${switchUnstyledClasses.track} {
      background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
      border-radius: 10px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
    }
  
    & .${switchUnstyledClasses.thumb} {
      display: block;
      width: 14px;
      height: 14px;
      top: 3px;
      left: 3px;
      border-radius: 16px;
      background-color: #fff;
      position: relative;
      transition: all 200ms ease;
    }
  
    &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
      background-color: ${grey[500]};
      box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
    }
  
    &.${switchUnstyledClasses.checked} {
      .${switchUnstyledClasses.thumb} {
        left: 22px;
        top: 3px;
        background-color: #fff;
      }
  
      .${switchUnstyledClasses.track} {
        background: ${blue[500]};
      }
    }
  
    & .${switchUnstyledClasses.input} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
    `,
)
function EnhancedTableHead(props: EnhancedTableProps<AdvertisementData>) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof AdvertisementData) =>
            (event: React.MouseEvent<unknown>) => {
                onRequestSort(event, property);
            };

    return (
        <TableHead >
            <TableRow>
                <TableCell className={styles.hedingtdlist} padding="checkbox">
                    <Checkbox

                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all advertisement",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        align={headCell.id == "name" ? "left" : "center"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        className={styles.tablehead}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === "desc" ? "sorted descending" : "sorted ascending"}
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

const ResponsiveAppBar = (props) => {
    const [value, setValue] = React.useState('1');

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
    const [iduser, setIduser] = React.useState([]);
    const [rowid, setRowid] = React.useState('')
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [age, setAge] = React.useState('');
    const [isoutField, setIsOutField] = useState(false);
    const [phonedata, setPhonedata] = useState('')
    const [deletbtn, setDelebtn] = React.useState(false);

    const [com, setCom] = React.useState(false);
    const [play, setPlay] = React.useState(false);
    const [deletemenukk, setDeleteMenukk] = React.useState(false);

    const [listpires, setListPires] = React.useState('');
    const [accounttype, setAccounttype] = React.useState('')

    const [btnlistname, setBtnlistname] = React.useState('')
    const [pause, setPause] = React.useState(false)
    const router = useRouter();
    const [swishlist, setSwishlist] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const [switchCheck, setSwitchcheck] = React.useState('')
    console.log(btnlistname, 'swishlist');
    const handlePinChangelist = (e) => {
        setListPires(e.target.value);
    };
    const switchchange = (e) => {
        setChecked(e.target.checked)
        setSwitchcheck(e.target.checked)
        console.log(switchCheck, 'myvaxrlueee')
    }
    const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const edituser = () => {
        if (btnlistname == '') {
            setIsOutField(true)
        }
        else {
            playpattern()
        }
    }
    const edituserlistpause = () => {
        if (btnlistname == '') {
            setIsOutField(true)
        }
        else {
            Pausepattern()
        }
    }
    const handlePinChange = phonedata => {
        setPhonedata(phonedata);
    };
    const printButtonLabel = (event) => {
        setBtnlistname(event.target.name)
        console.log(event.target.name, 'LITFDADRDA');
        //do some stuff here
    };
    console.log(rowid, 'AEFESWFE');

    var handleClickOpenCom = (myprops) => {

        setCom(true);

    };
    var handleClickOpenComplay = (myprops) => {
        setPlay(true);

    };
    var handleClickOpenCom = (myprops) => {
        setCom(true);
    };
    var handleClickOpenCom = (myprops) => {

        setCom(true);
    };
    var handleClickOpendeletbtnlog = (myprops) => {
        setDeleteMenukk(true);
    };
    var handleClickOpenCompausedletbtn = (myprops) => {
        setDelebtn(true);
    };
    const handleCloseComdeletbtn = () => {
        setDelebtn(false);
    }
    var handleClickOpenCompause = (myprops) => {
        setPause(true);
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
    const handleCloseComdeletlog = () => {
        setDeleteMenukk(false);
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
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        }

        prevOpen.current = open;
    }, [open]);

    const patternlist = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }

        props.props.loaderRef(true)
        var data = await ApiServices.GetApiCall(ApiEndpoint.PATTERN_LIST, headers)
        props.props.loaderRef(false)
        console.log(data, 'datalist');

        if (!!data) {
            if (data.status == true && data.data.length > 0) {
                const accoyty = [];
                const datalist = [];
                const datalogo = []
                const listdata = []
                const idlist = []
                const datalog = []
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    const object = {
                        id: element.id,
                        script: element.script,
                        exchange: element.exchange,
                        type_pattern: element.type_pattern,
                        investment: element.investment,
                        profit: element.profit,
                        stock: element.stock,
                        created_at: element.created_at,
                        status: element.status
                    }
                    console.log(element.id, 'object.id');
                    datalog.push(object)
                    listdata.push(JSON.parse(JSON.stringify(object)))
                    datalogo.push(JSON.parse(JSON.stringify(object.status)))
                    idlist.push(JSON.parse(JSON.stringify(element.id)))
                    datalist.push(JSON.parse(JSON.stringify(object)))
                    accoyty.push(JSON.parse(JSON.stringify(object)))
                    // csvall.push(objectcsv)
                }
                setDatasars(listdata)
                setDatalist(datalogo)
                setDatatebalpettan(accoyty)
                setData(datalog)
                setIduser(idlist)
            }

        }
    }
    const playpattern = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            "pattern": [
                {
                    "pattern_id": rowid,
                    "type": btnlistname
                }
            ]
        }
        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.PATTERN_PLAY, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        // if (!!patternDelete) {

        console.log(patternDelete, 'datalist');
        if (patternDelete.status) {
            patternDelete.token = patternDelete.token
            toast.success("Successfully Updated Personal Information lisgg")
            patternlist()
        }
        else {
            toast.error(patternDelete.message)
        }
        // }
        // else{
        //     toast.error("Successfully nformation lisgg")

        // }

    }
    const deletepattern = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            "pattern": [

            ]
        }
        console.log(body, 'listbody');

        if (!!btnlistname) {
            if (btnlistname == 'Stock') {
                if (!!accounttype) {
                    if (accounttype == 'exit for fixedPrice') {
                        console.log('withFixed price')
                        const withFixedPrice = {
                            pattern_id: rowid,
                            action: accounttype,
                            price: listpires,
                        };
                        body.pattern.push(withFixedPrice);
                    } else {
                        const withMarketPrice = {
                            pattern_id: rowid,
                            action: accounttype,
                        };
                        body.pattern.push(withMarketPrice);
                    }
                }
            } else {
                const withOutStockObject = {
                    pattern_id: rowid,
                    action: 'exit',
                }
                body.pattern.push(withOutStockObject);
            }
        }
        console.log(body, 'lkahuaahxss');

        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.PATTERN_DELETE, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        if (!!patternDelete) {
            if (patternDelete.status) {


                toast.success("Successfully Updated Personal Information lisgg")
                patternlist()
                // router.push('./dashboard')
            }
            else {
                toast.error(patternDelete.message)
            }
        }
        else {
            toast.error('list')

        }
    }
    const Pausepattern = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            "pattern": [
                {
                    "pattern_id": rowid,
                    "type": btnlistname
                }
            ]
        }
        console.log(body, 'lkahuaah');

        props.props.loaderRef(true)
        var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.PATTERN_PAUSE, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        // console.log(patternDelete, 'datalist444');
        // if (!!patternDelete) {
        if (patternDelete.status) {
            toast.success("Successfully Updated Personal list")
            patternlist()
        }
        else {
            toast.error(patternDelete.message)
        }
        // }else{
        //     toast.error('list')

        // }
    }
    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            // playpattern()
            patternlist()
            // Pausepattern()
        }
    }, [])
    console.log(datalist, 'stock');

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

            <Grid item md={12} sm={12} xs={12} className={styles.boxteballist}>
                {/* <Box> */}

                <div className={styles.listmeniom}>
                    <Grid item md={3} sm={6} xs={6}>
                        <div className={styles.patterndiv}>
                            <Typography>Pattern</Typography>
                        </div>
                    </Grid>
                    <Grid md={9} sm={6} xs={6} display={'flex'} justifyContent={'end'}>
                        <Button className={styles.cerbatn}>
                            <Avatar className={styles.cerbatn2}>
                                <img src="../../Vector (5).svg" />
                            </Avatar>
                        </Button>
                    </Grid>
                </div>
                <div className={styles.inputlistm}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Box className={styles.boxreting} display={'flex'}>

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
                        </Box>
                    </Grid>
                    <Grid item md={12} display={'flex'} justifyContent={'end'}>
                        {/* <Paper>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper> */}
                        <Button className={styles.filterlist} onClick={menulist}
                        >
                            <Typography>
                                Filter
                            </Typography>
                            <FilterListIcon />
                        </Button>
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
                                <div><Typography>Pattern</Typography></div>
                                <div className={styles.listbtnsot}>
                                    <Button className={styles.censbatnsot} onClick={handleClose}>Cancel</Button>
                                    <Button className={styles.savebatnsot}>Save</Button></div>
                            </div>
                            <Divider></Divider>
                            <div>
                                <div className={styles.typetext}><Typography>Type</Typography></div>
                                <div>
                                    <Button className={styles.nonelistbtn}>None</Button>
                                    <Button className={styles.Basiclistbtn}>Basic</Button>
                                    <Button className={styles.Customlistbtn}>Custom</Button>
                                </div>
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
                            <Divider className={styles.divaydarten}></Divider>
                            <div className={styles.divlistsivijan}></div>
                        </Menu>
                    </Grid>
                </div>


                <Grid>
                    <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
                        <Paper sx={{ width: '100%', mb: 2 }}>
                            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                            <TableContainer>
                                <Table
                                    className={styles.tablelist}
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={dense ? 'small' : 'medium'}
                                >
                                    <EnhancedTableHead
                                        //  numSelected={selected.length}
                                        //  order={order}
                                        //  orderBy={orderBy}
                                        //  onSelectAllClick={handleSelectAllClick}
                                        //  onRequestSort={handleRequestSort}
                                        //  rowCount={data.length}

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
                                            .map((row: any, index) => {
                                                const isItemSelected = isSelected(row.id);
                                                const labelId = `approved-checkbox-${index}`;
                                                const popupID = `long-menu-${index}`;
                                                const longbuttonID = `long-button-${index}`;
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

                                                        <TableCell className={styles.cekboxtd} padding="checkbox">
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
                                                            onClick={() => {
                                                                router.push({
                                                                    pathname: './pattandeteal',
                                                                    query: { emailID: row.id,namescoka:row.script }
                                                                });
                                                            }}
                                                        >
                                                            <div className={styles.typefild}>
                                                                <div>
                                                                    {row.status == 'pause' ? <Avatar className={styles.avtarlistyes}>
                                                                        <img src="../../Vector (10).svg" />

                                                                    </Avatar> : row.status == 'active' ? <Avatar className={styles.avtarlistyes2}>  <img src="../../Vector (12).svg" /></Avatar> : row.status == 'exit' ? <Avatar className={styles.avtarlistyes3}>  <img src="../../Vector (11).svg" /></Avatar> : ''}
                                                                </div><div className={styles.listperegaf}>
                                                                    {row.script}


                                                                </div>
                                                                <div className={styles.nselist}><Typography>{row.exchange}</Typography></div>
                                                            </div>
                                                        </TableCell>

                                                        <TableCell
                                                        // align="right"
                                                        > {row.type_pattern}</TableCell>
                                                        <TableCell ><div className={styles.tabaldataicon}><CurrencyRupeeIcon className={styles.iconlistmrnu} /><Typography>{row.investment}</Typography></div></TableCell>
                                                        <TableCell className={row.profit <= 0 ? styles.maynascall : styles.palscalls}>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CurrencyRupeeIcon />
                                                                <Typography>  {row.profit}</Typography>
                                                            </div>
                                                            {/* 100 */}
                                                        </TableCell>
                                                        <TableCell >{row.stock}</TableCell>
                                                        <TableCell >
                                                            <Typography className={styles.dateone}>{
                                                                moment(row.created_at).format("DD/MM/YYYY h:mm:ss")
                                                            } </Typography></TableCell>
                                                        {/* 
                                                        <TableCell>
                                                          
                                            
                                                        </TableCell> */}

                                                        <TableCell >

                                                            <div className={styles.listtebal}>
                                                                <Button className={styles.viwebtnmm}
                                                                   
                                                                // onClick={() => { setRowid(row.id) }}
                                                                > <img height={18} src="../../edit_square.svg" /> </Button>

                                                                {row.status == 'exit' ? <Box className={styles.viwebtnmm23}> <PlayCircleOutlineIcon /> </Box> : <Button className={styles.viwebtnmm3} onClick={() => { setRowid(row.id), row.status == 'active' ? handleClickOpenCompause() : handleClickOpenComplay() }} >
                                                                    {/* <PauseCircleOutlineIcon /> */}
                                                                    {/* <Touchable>dilet</Touchable> */}
                                                                    {row.status == 'active' ? <PauseCircleOutlineIcon className={styles.play_btnmani2} /> : <PlayCircleOutlineIcon className={styles.play_btnmani} />}
                                                                </Button>}
                                                                {row.status == 'exit' ? <Box className={styles.viwebtnmm234}> <DeleteOutlineIcon /></Box> : <Button className={styles.viwebtnmm2} onClick={() => { setRowid(row.id), handleClickOpendeletbtnlog() }}><DeleteOutlineIcon /></Button>}
                                                            </div>
                                                            <div>
                                                                <Dialog open={deletbtn} onClose={handleCloseComdeletbtn}
                                                                    className={styles.borderredayasfor}
                                                                    style={{
                                                                        // borderRadius: '30px'
                                                                    }}
                                                                    // fullWidth
                                                                    maxWidth="sm"
                                                                >
                                                                    <div className={styles.colosbatnlist}><Button onClick={handleCloseComdeletbtn}><img height={30} width={20} src="../../Vector (13).svg" /></Button>  </div>
                                                                    <div>
                                                                        <DialogContent className={styles.popupcantenar}>
                                                                            <Box className={styles.lisrmaenbox}>

                                                                                <div className={styles.delehedar}>
                                                                                    <Typography>Delete Pattern</Typography>
                                                                                </div>
                                                                                <div className={styles.listimgyes}>
                                                                                    <img src="../../Group 1000002845.svg" />
                                                                                </div>
                                                                                {/* <Box className={styles.listboxiduser}>
                                                                           <InputLabel className={styles.leballist}>ORDER ID </InputLabel> */}
                                                                                <div className={styles.paregarafnsg}>
                                                                                    <Typography>Are you sure you want to pause this AAPL ( NSE ) from zerodha ?</Typography>
                                                                                </div>


                                                                                <div className={styles.cancelbtnlog} onClick={handleCloseComdeletbtn}><Button style={{background:'#E31E24',borderRadius:'5px',color: '#FFFFFF', padding:'3PX 24PX 3PX 24PX'}}>Cancel</Button>
                                                                                {/* <img className={styles.linelinjk} src='../../Line 17.svg'></img> */}
                                                                                <Button style={{background:'#009947',borderRadius:'5px',color: '#FFFFFF', padding:'3PX 31PX 3PX 31PX'}} className={styles.cofimbatn} onClick={handleClickOpendeletbtnlog}>SAVE </Button></div>
                                                                            </Box>
                                                                            {/* <Popupform props={props} advCreate={advCreate} closePop={handleCloseCom} userId={advId} /> */}
                                                                        </DialogContent>
                                                                    </div>
                                                                </Dialog>
                                                            </div>
                                                            <div>
                                                                <Dialog open={deletemenukk} onClose={handleCloseComdeletlog}
                                                                    className={styles.borderredayasfor}
                                                                    style={{
                                                                        // borderRadius: '30px'
                                                                    }}
                                                                    // fullWidth
                                                                    maxWidth="sm"
                                                                >
                                                                    <div style={{ display: 'flex', justifyContent: 'end', margin: '0px 10px 0px 0px' }}><Button onClick={handleCloseComdeletlog}><img height={30} width={20} src="../../Vector (13).svg" /></Button>  </div>
                                                                    <div>
                                                                        <DialogContent className={styles.popupcantenar}>
                                                                            <Box className={styles.lisrmaenbox}>

                                                                                <div className={styles.delehedar}>
                                                                                    <Typography>Delete Pattern</Typography>
                                                                                </div>
                                                                                <div style={{ textAlign: 'center' }}>
                                                                                    <img src="../../Group 1000002845.svg" />
                                                                                </div>
                                                                                {/* <Box className={styles.listboxiduser}>
                                                                        //    <InputLabel className={styles.leballist}>ORDER ID </InputLabel> */}
                                                                                <div style={{ padding: '0px 40px 0px 40px' }}>
                                                                                    <div>
                                                                                        <Typography className={styles.texstcolor} style={{ 'color': '#333333', 'font-size': '15px', padding: '0px 0px 7px 0px' }}>Exit with  </Typography>
                                                                                    </div>
                                                                                    <div style={{ padding: '0px 0px 20px 0px' }}>
                                                                                        <ButtonGroup
                                                                                            style={{ margin: '0px 0px 0px 10px' }}
                                                                                            value={phonedata}
                                                                                            buttons={["Stock", "Without Stock"]}
                                                                                            doSomethingAfterClick={printButtonLabel}
                                                                                        />

                                                                                    </div>
                                                                                    <div style={{ padding: '0px 0px 20px 0px' }}>
                                                                                        <Typography className={styles.texstcolor} style={{ 'color': '#333333', fontSize: '12px' }}>Clean up Stock from this pattern</Typography>
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', }}>
                                                                                        <Avatar style={{ 'border': '1.5px solid #009947', background: ' linear-gradient(180deg, #DDF9EA 0%, #FFFFFF 100%)', margin: '0px 8px 0px 0px' }}><img style={{ width: '70%' }} src="../../Vector (16).svg" /></Avatar>
                                                                                        <div>
                                                                                            <Typography className={styles.texstcolor22} style={{ 'color': '#333333', fontSize: '14px' }}>
                                                                                                Sell holding stock with fixed price
                                                                                            </Typography>
                                                                                            <Typography className={styles.texstcolor22} style={{ 'color': '#333333', fontSize: '12px' }}>Your order will open until target price trigger</Typography>
                                                                                        </div>
                                                                                        {checked == true ? <SwitchUnstyled component={Root} onChange={console.log('virang')} {...label} id='switch'
                                                                                            disabled
                                                                                            style={{ padding: '0px 0px 0px 20px' }}

                                                                                            // checked={row.Publication} 
                                                                                            onChange={((e) => {
                                                                                                setSwishlist(e.target.checked)

                                                                                                // editFAQ(e.target.checked, row.id)
                                                                                                // setSwitchcheck(e.target.checked)
                                                                                                // setIdItem(row.id,)
                                                                                                // console.log(e.target.checked, 'checkedv');
                                                                                                // console.log(row.id, 'myvalueee')
                                                                                            })}
                                                                                        /> : <SwitchUnstyled component={Root} onChange={console.log('virang')} {...label} id='switch'
                                                                                            style={{ padding: '0px 0px 0px 20px' }}

                                                                                            // checked={row.Publication} 
                                                                                            onChange={((e) => {
                                                                                                // setChecked('ZERODHA')
                                                                                                setSwishlist(e.target.checked)
                                                                                                setAccounttype('exit for fixedPrice')
                                                                                                // editFAQ(e.target.checked, row.id)
                                                                                                // setSwitchcheck(e.target.checked)
                                                                                                // setIdItem(row.id,)
                                                                                                // console.log(e.target.checked, 'checkedv');
                                                                                                // console.log(row.id, 'myvalueee')
                                                                                            })}
                                                                                        />}
                                                                                        {/* <SwitchUnstyled component={Root} {...label} id='switch'
                                                                                            // checked={row.Publication} 
                                                                                            // disabled
                                                                                            style = {{ padding: '0px 0px 0px 20px' }}
                                                                                            onChange={((e) => {
                                                                                                setSwishlist(e.target.checked)
                                                                                              
                                                                                            })}
                                    // editFAQ(e.target.checked, row.id)
                                    // setSwitchcheck(e.target.checked)
                                    // setIdItem(row.id,)
                                    // console.log(e.target.checked, 'checkedv');
                                    // console.log(row.id, 'myvalueee')
                            
                            /> */}
                                                                                    </div>
                                                                                    <div style={{ display: 'flex', justifyContent: "space-between", padding: '20px 0px 0px 0px' }}>
                                                                                        <Typography className={styles.texstcolor} style={{ color: '#333333', fontSize: '11px', }}>Target Price</Typography>
                                                                                        <TextField
                                                                                            onChange={handlePinChangelist}
                                                                                            value={listpires}
                                                                                            className={styles.textfiladligb}
                                                                                            style={{ padding: '0px 0px 0px 0px', width: '100px' }}
                                                                                        />
                                                                                    </div>
                                                                                    {/* <div style={{ padding: '0px 0px 20px 0px' }}>
                                                                                    <Typography className={styles.texstcolor}  style={{'color':'#333333',fontSize:'12px'}}>Clean up Stock from this pattern</Typography>
                                                                                </div> */}
                                                                                    <div style={{ display: 'flex', padding: "10px 0px 0px 0px" }}>
                                                                                        <Avatar style={{ 'border': '1.5px solid #009947', background: ' linear-gradient(180deg, #DDF9EA 0%, #FFFFFF 100%)', margin: '0px 8px 0px 0px' }}><img style={{ width: '70%' }} src="../../Vector (17).svg" /></Avatar>
                                                                                        <div>
                                                                                            <Typography className={styles.texstcolor22} style={{ 'color': '#333333', fontSize: '14px' }}>
                                                                                                Sell holding stock with fixed price
                                                                                            </Typography>
                                                                                            <Typography className={styles.texstcolor22} style={{ 'color': '#333333', fontSize: '12px' }}>Your order will open until target price trigger</Typography>
                                                                                        </div>
                                                                                        {swishlist == true ? <SwitchUnstyled component={Root} onChange={console.log('virang')} {...label} id='switch'
                                                                                            disabled
                                                                                            style={{ padding: '0px 0px 0px 20px' }}

                                                                                            // checked={row.Publication} 
                                                                                            onChange={((e) => {
                                                                                                setChecked(e.target.checked)

                                                                                                // editFAQ(e.target.checked, row.id)
                                                                                                // setSwitchcheck(e.target.checked)
                                                                                                // setIdItem(row.id,)
                                                                                                // console.log(e.target.checked, 'checkedv');
                                                                                                // console.log(row.id, 'myvalueee')
                                                                                            })}
                                                                                        /> : <SwitchUnstyled component={Root}  {...label} id='switch'
                                                                                            style={{ padding: '0px 0px 0px 20px' }}
                                                                                            // checked={row.Publication} 
                                                                                            onChange={((e) => {
                                                                                                // setChecked('ZERODHA')
                                                                                                setChecked(e.target.checked)
                                                                                                setAccounttype('exit for market')
                                                                                                // editFAQ(e.target.checked, row.id)
                                                                                                // setSwitchcheck(e.target.checked)
                                                                                                // setIdItem(row.id,)
                                                                                                // console.log(e.target.checked, 'checkedv');
                                                                                                // console.log(row.id, 'myvalueee')
                                                                                            })}
                                                                                        />}


                                                                                    </div>
                                                                                </div>
                                                                                <div className={styles.cancelbtnlog} onClick={handleCloseComdeletbtn}>
                                                                                <Button style={{background:'#E31E24',borderRadius:'5px',color: '#FFFFFF', padding:'7PX 24PX 7PX 24PX'}}  onClick={handleCloseComdeletlog}>Cancel</Button>
                                                                                <Button style={{background:'#009947',borderRadius:'5px',color: '#FFFFFF', padding:'7PX 31PX 7PX 31PX'}} className={styles.cofimbatn}  onClick={()=>{deletepattern(),handleCloseComdeletlog()}}>SAVE </Button>
                                                                                    {/* <Button>Cancel</Button> */}
                                                                                    {/* <img className={styles.linelinjk} src='../../Line 17.svg'></img> */}
                                                                                    {/* <Button className={styles.cofimbatn} onClick={deletepattern}>Confirm</Button> */}
                                                                                    </div>
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
                                                                                    <Typography>Delete Successful</Typography>
                                                                                </div>
                                                                                <div className={styles.listimgyes}>
                                                                                    <img src="../../Group 47124.svg" />
                                                                                </div>
                                                                                <Box className={styles.listboxiduser}>
                                                                                    <InputLabel className={styles.leballist}>ORDER ID </InputLabel>
                                                                                    <div className={styles.maendividuser}>
                                                                                        <div className={styles.odarlistop}>

                                                                                            <Typography>jhgsadgds</Typography>

                                                                                            <Typography>jhgsadgds</Typography>

                                                                                            <Typography>jhgsadgds</Typography>

                                                                                        </div>
                                                                                        <div className={styles.odarlistop}>

                                                                                            <Typography>jhgsadgds</Typography>

                                                                                            <Typography>jhgsadgds</Typography>

                                                                                            <Typography>jhgsadgds</Typography>

                                                                                        </div>
                                                                                    </div>
                                                                                </Box>
                                                                                <div className={styles.cancelbtnlog}><Button >Cancel</Button></div>
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
                                                                                    <Typography>Play Pattern</Typography>
                                                                                </div>
                                                                                <div className={styles.listimgyes}>
                                                                                    <img src="../../Group 47124 (1).svg" />
                                                                                </div>
                                                                                {/* <Box className={styles.listboxiduser}>
                                                                           <InputLabel className={styles.leballist}>ORDER ID </InputLabel> */}
                                                                                <div className={styles.paregarafnsg}>
                                                                                    <Typography>Are you sure you want to pause this AAPL ( NSE ) from zerodha ?</Typography>
                                                                                </div>
                                                                                <div className={styles.pustlebal}>
                                                                                    <Typography>Pause with </Typography>
                                                                                </div>
                                                                                <div className={styles.btn_all_buy}>
                                                                                    <ButtonGroup
                                                                                        //  value={phonedata}
                                                                                        buttons={["All", "Buy", "Sell"]}
                                                                                        doSomethingAfterClick={printButtonLabel}
                                                                                    />


                                                                                </div>
                                                                                <div className={styles.divpopupspn}>
                                                                                    {isoutField == '' ? '' : <span className={styles.otperr}>Please Enter Valid list</span>}
                                                                                </div>
                                                                                <div className={styles.cancelbtnlog} style={{padding:'25px 0px 0px 0px'}}>
                                                                                {/* <div className={styles.cancelbtnlog} onClick={handleCloseComdeletbtn}> */}
                                                                                    <Button style={{background:'#E31E24',borderRadius:'5px',color: '#FFFFFF', padding:'7PX 24PX 7PX 24PX'}}  onClick={handleCloseComplay}>Cancel</Button>

                                                                                {/* <Button style={{background:'#E31E24',borderRadius:'5px',color: '#FFFFFF', padding:'3PX 31PX 3PX 31PX'}} className={styles.cofimbatn}  onClick={edituser}>SAVE </Button> */}
                                                                                    {/* <Button>Cancel</Button> */}
                                                                                {/* <img className={styles.linelinjk} src='../../Line 17.svg'></img> */}
                                                                                <Button style={{background:'#009947',borderRadius:'5px',color: '#FFFFFF', padding:'7PX 31PX 7PX 31PX'}} className={styles.cofimbatn}  onClick={()=>{edituser(),handleCloseComplay()}}>SAVE </Button>
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
                                                                                <div className={styles.btn_all_buy}>
                                                                                    <ButtonGroup

                                                                                        buttons={["All", "Buy", "Sell"]}
                                                                                        doSomethingAfterClick={printButtonLabel}
                                                                                    // style={}
                                                                                    // className={btnlistname == 'Buy' ? styles.buylist : styles.buylist2}
                                                                                    />
                                                                                </div>
                                                                                <div className={styles.divpopupspn}>
                                                                                    {isoutField == '' ? '' : <span className={styles.otperr}>Please Enter Valid list</span>}
                                                                                </div>
                                                                                {/* </Box> */}
                                                                                <div className={styles.cancelbtnlog}>
                                                                                <Button style={{background:'#E31E24',borderRadius:'5px',color: '#FFFFFF', padding:'7PX 24PX 7PX 24PX'}}  onClick={handleCloseCompause}>Cancel</Button>
                                                                                <Button style={{background:'#009947',borderRadius:'5px',color: '#FFFFFF', padding:'7PX 31PX 7PX 31PX'}} className={styles.cofimbatn}  onClick={()=>{edituserlistpause(),handleCloseCompause()}}>SAVE </Button>

                                                                                    {/* <Button >Cancel</Button> */}
                                                                                    {/* <img className={styles.linelinjk} src='../../Line 17.svg'></img> */}
                                                                                    {/* <Button className={styles.cofimbatn} onClick={edituserlistpause}>Confirm</Button> */}
                                                                                    </div>
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
                                                {/* <TableCell colSpan={6} /> */}
                                            </TableRow>
                                        )}

                                    </TableBody>
                                    {/* <TableFooter> */}

                                    {/* </TableFooter> */}
                                    <TableFooter>
                                    {/* <TableRow> */}
                                    <Accordion style={{width:'100%'}}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Typography>Accordion 1</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                               {/* <Typography>
                                                                    Lorem  ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                                </Typography> */}
                                                            </AccordionDetails>
                                                        </Accordion>
                                        {/* </TableRow> */}
                                        <TableRow>
                                        
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
                </Grid>
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
