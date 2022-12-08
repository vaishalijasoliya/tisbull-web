import React, { useState } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Grid from '@mui/material/Grid';
import styles from './Stocks.module.scss'
import { Button, TextField } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import Avatar from '@mui/material/Avatar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import moment from 'moment'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import { CSVLink, CSVDownload } from 'react-csv';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { styled } from '@mui/material/styles';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { toast } from 'react-toastify';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';import { useRouter } from 'next/router';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DialogContent from '@mui/material/DialogContent';
function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'Type',
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
        id: 'Created',
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
    {
        id: 'Action',
        numeric: true,
        disablePadding: false,
        label: '',
    },
];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell className={styles.hedingtdlist} padding="checkbox">
                    <Checkbox
                        className={styles.tablehead}
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
                        // align={headCell.numeric ? 'right' : 'left'}
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

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


const Home = (props) => {
    const router = useRouter();

    console.log(props, 'propsprops');
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [search, setSearch] = React.useState(false);
    const [datatebalpettan, setDatatebalpettan] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [datamenu, setDatamenu] = React.useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [datasars, setDatasars] = React.useState([]);
    const [datalist, setDatalist] = React.useState([]);
    const [datatebal, setDatatebal] = React.useState([]);
    const [btnlistdata, setBtnlist] = React.useState('all')
    const [com, setCom] = React.useState(false);
    const [rowid, setRowid] = React.useState('')
    const [deletbtn, setDelebtn] = React.useState(false);
    const [listpires, setListPires] = React.useState('');
    const [swishlist, setSwishlist] = React.useState(false);
    const [pause, setPause] = React.useState(false)
    const [isoutField, setIsOutField] = useState(false);
    const [iduser, setIduser] = React.useState([]);
    const [btnlistnamelist, setBtnlistnamelist] = React.useState('')
    const [accounttype, setAccounttype] = React.useState('')
    const [reviewStatus, setReviewStatus] = React.useState("none");
const[distiddata,setDistiddata] = React.useState('')
    // const [com, setCom] = React.useState(false);
    const [play, setPlay] = React.useState(false);
    const [listdara, setLlistdata] = useState('');
    const [listdarapush, setLlistdatapush] = useState('');
    const [logvvmog, setLogvvmog] = useState('')
    const [checked, setChecked] = React.useState(false);
    const [openlist, setOpen] = React.useState(false);
    const [isClear, setIsClear] = useState(true);
    const [listscirip, setScripdata] = React.useState('')
    const [deletemenukk, setDeleteMenukk] = React.useState(false);
 const [pendingReviewList, setPendingReviewList] = React.useState([]);
  const [approveReviewList, setApproveReviewList] = React.useState([]);
  const [rejectReviewList, setRejectReviewList] = React.useState([]);
  const [flagReviewList, setFlageReviewList] = React.useState([]);
    console.log(distiddata, 'swishlist');
    const menulist = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const patternlist = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }

        props.props.loaderRef(true)
        var data = data = await ApiServices.GetApiCall(ApiEndpoint.PATTERN_LIST, headers)
        props.props.loaderRef(false)
        console.log(data, 'datalist');
        // if (!isClear) {
        // if (btnlistdata == '') {
        //     ;
        //     data = await ApiServices.GetApiCall(ApiEndpoint.PATTERN_LIST, headers)

        // } else {
        //     data = ApiEndpoint.PATTERN_LIST + `?status=${btnlistdata}&type=${btnlistdata}`;

        // }
        //   } 
        if (!!data) {
            if (data.status == true && data.data.length > 0) {
                const accoyty = [];
                const datalist = [];
                const datalogo = []
                const listdata = []
                const idlist = []
                var pendingarr = [];
                var approvearr = [];
                var rejectarr = [];
                var flagearr = [];
                const datalog = []
                const script = []
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
                    if (element.type_pattern == "BasicPattern") {
                        pendingarr.push(JSON.parse(JSON.stringify(object)));
                      } else if (element.type_pattern == "lisst") {
                        approvearr.push(object);
                      } 
                 
                      else {
                        flagearr.push(object);
                      }
                    console.log(element.id, 'object.id');
                    datalog.push(JSON.parse(JSON.stringify(object)))
                    listdata.push(JSON.parse(JSON.stringify(object)))
                    datalogo.push(JSON.parse(JSON.stringify(object.status)))
                    idlist.push(JSON.parse(JSON.stringify(element.id)))
                    datalist.push(JSON.parse(JSON.stringify(object)))
                    accoyty.push(JSON.parse(JSON.stringify(object)))
                    script.push(JSON.parse(JSON.stringify(element.script)))

                    // csvall.push(objectcsv)
                }
                setDatasars(listdata)
                setDatalist(datalogo)
                setDatatebalpettan(accoyty)
                setData(datalog)
                setIduser(idlist)
                setScripdata(script)
                setPendingReviewList(pendingarr);
                setApproveReviewList(approvearr);
                setRejectReviewList(flagearr);
            }

        }
    }
    const tabChange = (status) => {
        setReviewStatus(status);
        if (status == "BasicPattern") {
            setDatatebalpettan(pendingReviewList);
            // setUserSearch(pendingReviewList);
        } else if (status == "BasicPattern") {
            setDatatebalpettan(approveReviewList);
            // setUserSearch(approveReviewList);
        } else if (status == "all") {
            setDatatebalpettan(data);
            // setUserSearch(rejectReviewList);
        } else {
            setDatatebalpettan(flagReviewList);
            // setUserSearch(flagReviewList);
        }
    };

    const playpattern = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            "pattern": [
                {
                    "pattern_id": rowid,
                    "type": btnlistnamelist
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
    const patternlistviwe = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            "id_pattern": distiddata,
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
        console.log(patternDelete, 'datalistddd');

        if (!!patternDelete) {
            if (patternDelete.status == true) {
                // setListpatt(patternDelete.pattern.quote)
                setDatamenu(patternDelete.pattern)
             
            } 
      

        }
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

        if (!!logvvmog) {
            if (logvvmog == 'Stock') {
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
                    "type": listdarapush
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
    const edituser = () => {
        if (listdarapush == '') {
            setIsOutField(true)
        }
        else {
            playpattern()
        }
    }
    const edituserlistpause = () => {
        if (listdara == '') {
            setIsOutField(true)
        }
        else {
            Pausepattern()
        }
    }

    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            // playpattern()
            patternlist()
            patternlistviwe()
            // Pausepattern()
        }
    }, [])
    const handlePinChangelist = (e) => {
        setListPires(e.target.value);
    };
    const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };

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

   
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const open = Boolean(anchorEl);
    const handleClicklist = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = datatebalpettan.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datatebalpettan.length) : 0;

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
                    <Grid item md={12} sm={6} xs={6}>
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
                    <Grid item md={12} sm={6} xs={6} display={'flex'} justifyContent={'end'}>

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
                                    <Button className={styles.censbatnsot}  onClick={() => {
                                        tabChange("all"),handleClose(),setBtnlist('all')
                                    }}>Cancel</Button>
                                    <Button className={styles.savebatnsot}
                                     onClick={() => {
                                        tabChange(btnlistdata)
                                    }}
                                    >Save</Button></div>
                            </div>
                            <Divider></Divider>
                            <div>
                                <div className={styles.typetext}><Typography>Type</Typography></div>
                                <div className={styles.listadarara}>
                                    {/* {btnlistdata == '' ? }
                                    <Button className={styles.nonelistbtn} onClick={()=>{setBtnlist('none')}}>None</Button>
                                    <Button className={styles.Basiclistbtn}  onClick={()=>{setBtnlist('basic')}} >Basic</Button>
                                    <Button className={styles.Customlistbtn}  onClick={()=>{setBtnlist('custom')}}>Custom</Button> */}
                                    <Button 
                                    onClick={() => {
                                      setBtnlist('all')
                                    }} className={btnlistdata == 'all' ? styles.Customlistbtn : styles.nonelistbtn}>None</Button>
                                    <Button onClick={() => {
                                        setBtnlist('BasicPattern')
                                    }} className={btnlistdata == 'BasicPattern' ? styles.Customlistbtn : styles.nonelistbtn}>Basic</Button>
                                    <Button onClick={() => {
                                        // tabChange("Custom")
                                        setBtnlist('Custom')
                                    }}  className={btnlistdata == 'Custom' ? styles.Customlistbtn : styles.nonelistbtn}>Custom</Button>
                                </div>
                            </div>
                         
                            <div className={styles.divlistsivijan}></div>
                        </Menu>
                    </Grid>
                </div>
                <Grid item md={12} sm={12} xs={12} >
                    <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
                        <React.Fragment>

                            <Paper sx={{ width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: "20PX" }} >
                                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                                <TableContainer style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: "20PX" }} >
                                    <Table
                                        className={styles.tablelist}
                                        // sx={{ minWidth: 750 }}
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
                                                                        query: { emailID: row.id, namescoka: row.script }
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


                                                                                    <div className={styles.cancelbtnlog} onClick={handleCloseComdeletbtn}>
                                                                                        <Button style={{ background: '#E31E24', borderRadius: '5px', color: '#FFFFFF', padding: '3PX 24PX 3PX 24PX' }}>Cancel</Button>
                                                                                        {/* <img className={styles.linelinjk} src='../../Line 17.svg'></img> */}
                                                                                        <Button style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '3PX 31PX 3PX 31PX' }} className={styles.cofimbatn} onClick={handleClickOpendeletbtnlog}>SAVE </Button></div>
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
                                                                        <div style={{ display: 'flex', justifyContent: 'end', margin: '0px 10px 0px 0px' }}><Button className={styles.listdataclos}  onClick={handleCloseComdeletlog}><img width={25} src="../../icon-close-512.webp" /></Button>  </div>
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
                                                                                        <div className={styles.btn_all_buy22} style={{ padding: '0px 0px 20px 0px' }}>
                                                                                            {/* <ButtonGroup
                                                                                            style={{ margin: '0px 0px 0px 10px' }}
                                                                                            value={phonedata}
                                                                                            buttons={["Stock", "Without Stock"]}
                                                                                            doSomethingAfterClick={printButtonLabel}
                                                                                        /> */}
                                                                                            {/* <Button onClick={()=>{setLlistdata('All')}} className={listdara =='All' ? styles.listdatlog:styles.list2data }>All</Button> */}
                                                                                            <Button onClick={() => { setLogvvmog('Stock') }} className={logvvmog == 'Stock' ? styles.listdatlog : styles.list2data}>Stock</Button>
                                                                                            <Button onClick={() => { setLogvvmog('WithoutStock') }} className={logvvmog == 'WithoutStock' ? styles.listdatlog : styles.list2data}>Without Stock</Button>

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
                                                                                            {checked == false ? <SwitchUnstyled component={Root}
                                                                                                // onChange={console.log('virang')} 
                                                                                                {...label} id='switch'
                                                                                                style={{ padding: '0px 0px 0px 32px' }}

                                                                                                // checked={row.Publication} 
                                                                                                onChange={((e) => {
                                                                                                    setSwishlist(e.target.checked)
                                                                                                    // setLogvvmog('exit for fixedPrice')
                                                                                                    setAccounttype('exit for fixedPrice')
                                                                                                })}
                                                                                            /> : <SwitchUnstyled component={Root}
                                                                                                // onChange={console.log('virang')}
                                                                                                {...label} id='switch'
                                                                                                disabled
                                                                                                style={{ padding: '0px 0px 0px 32px' }}

                                                                                                // checked={row.Publication} 
                                                                                                onChange={((e) => {
                                                                                                    setSwishlist(e.target.checked)
                                                                                                })}
                                                                                            />}

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
                                                                                                    Sell holding stock with market price
                                                                                                </Typography>
                                                                                                <Typography className={styles.texstcolor22} style={{ 'color': '#333333', fontSize: '12px' }}>Kotak are providing free API for the customers.</Typography>
                                                                                            </div>
                                                                                            {swishlist == false ? <SwitchUnstyled component={Root}  {...label} id='switch'
                                                                                                style={{ padding: '0px 0px 0px 20px' }}
                                                                                                // checked={row.Publication} 
                                                                                                onChange={((e) => {
                                                                                                    // setChecked('ZERODHA')
                                                                                                    setChecked(e.target.checked)
                                                                                                    setAccounttype('exit for market')

                                                                                                })}
                                                                                            /> : <SwitchUnstyled component={Root}
                                                                                                // onChange={console.log('virang')}
                                                                                                {...label} id='switch'
                                                                                                disabled
                                                                                                style={{ padding: '0px 0px 0px 20px' }}

                                                                                                // checked={row.Publication} 
                                                                                                onChange={((e) => {
                                                                                                    setChecked(e.target.checked)
                                                                                                })}
                                                                                            />}


                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={styles.cancelbtnlog} onClick={handleCloseComdeletbtn}>
                                                                                        {logvvmog == 'WithoutStock' || swishlist == false || listpires == '' ? 'desebal' : 'yes'}

                                                                                        <Button style={{ background: '#E31E24', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 24PX 7PX 24PX' }} onClick={handleCloseComdeletlog}>Cancel</Button>
                                                                                        {logvvmog == 'WithoutStock' ? <Button style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 31PX 7PX 31PX' }} className={styles.cofimbatn} onClick={() => { deletepattern(), handleCloseComdeletlog() }}>SAVE </Button> : ''}
                                                                                        {logvvmog == 'WithoutStock' || swishlist == false || listpires == '' ?
                                                                                            <Button disabled style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 31PX 7PX 31PX' }} className={logvvmog == 'WithoutStock' ? styles.listmenuu : styles.cofimbatn} >SAVE </Button> : <Button id={logvvmog == 'WithoutStock' ? styles.listdatadelet : styles.namnedata} style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 31PX 7PX 31PX' }} className={logvvmog == 'WithoutStock' ? styles.listmenuu : styles.cofimbatn} onClick={() => { deletepattern(), handleCloseComdeletlog() }}>SAVE </Button>}
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
                                                                        <div className={styles.colosbatnlist}><Button onClick={handleCloseComplay}><img  width={25} src="../../icon-close-512.webp" /></Button>  </div>
                                                                        <div>
                                                                            <DialogContent className={styles.popupcantenar}>
                                                                                <Box className={styles.lisrmaenbox}>

                                                                                    <div className={styles.delehedar}>
                                                                                        <Typography> Play Pattern</Typography>
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
                                                                                        <Typography>Play with  </Typography>
                                                                                    </div>
                                                                                    <div className={styles.btn_all_buy}>
                                                                                        <Button onClick={() => { setLlistdatapush('All') }} className={listdarapush == 'All' ? styles.listdatlog : styles.list2data}>All</Button>
                                                                                        <Button onClick={() => { setLlistdatapush('Buy') }} className={listdarapush == 'Buy' ? styles.listdatlog : styles.list2data}>Buy</Button>
                                                                                        <Button onClick={() => { setLlistdatapush('Sell') }} className={listdarapush == 'Sell' ? styles.listdatlog : styles.list2data}>Sell</Button>


                                                                                    </div>
                                                                                    <div className={styles.divpopupspn}>
                                                                                        {listdarapush == '' ? <span className={styles.otperr}>Please Enter Valid list</span> : ''}
                                                                                    </div>
                                                                                    <div className={styles.cancelbtnlog} style={{ padding: '40px 0px 10px 0px' }}>
                                                                                        {/* <div className={styles.cancelbtnlog} onClick={handleCloseComdeletbtn}> */}
                                                                                        <Button style={{ background: '#E31E24', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 32PX 7PX 32PX' }} onClick={handleCloseComplay}>Cancel</Button>

                                                                                        {/* <Button style={{background:'#E31E24',borderRadius:'5px',color: '#FFFFFF', padding:'3PX 31PX 3PX 31PX'}} className={styles.cofimbatn}  onClick={edituser}>SAVE </Button> */}
                                                                                        {/* <Button>Cancel</Button> */}
                                                                                        {/* <img className={styles.linelinjk} src='../../Line 17.svg'></img> */}
                                                                                        {listdarapush == '' ? <Button disabled style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 42PX 7PX 42PX' }} className={styles.cofimbatn} >SAVE </Button> :
                                                                                            <Button style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 41PX 7PX 41PX' }} className={styles.cofimbatn} onClick={() => { edituser(), handleCloseComplay() }}>SAVE </Button>}
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
                                                                        <div className={styles.colosbatnlist}><Button onClick={handleCloseCompause}><img  width={25} src="../../icon-close-512.webp" /></Button>  </div>
                                                                        <div>
                                                                            <DialogContent className={styles.popupcantenar}>
                                                                                <Box className={styles.lisrmaenbox}>

                                                                                    <div className={styles.delehedar}>
                                                                                        <Typography>Pause Pattern</Typography>
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
                                                                                        <Typography>Pause with  </Typography>
                                                                                    </div>
                                                                                    <div className={styles.btn_all_buy}>
                                                                                        {/* {btnlistnamelist == 'All' ? }   */}
                                                                                        <Button onClick={() => { setLlistdata('All') }} className={listdara == 'All' ? styles.listdatlog : styles.list2data}>All</Button>
                                                                                        <Button onClick={() => { setLlistdata('Buy') }} className={listdara == 'Buy' ? styles.listdatlog : styles.list2data}>Buy</Button>
                                                                                        <Button onClick={() => { setLlistdata('Sell') }} className={listdara == 'Sell' ? styles.listdatlog : styles.list2data}>Sell</Button>

                                                                                        {/* <ButtonGroup */}
                                                                                        {/* onClick={()=>{setLlistdata(true)}} */}
                                                                                        {/* buttons={["All", "Buy", "Sell"]} */}
                                                                                        {/* doSomethingAfterClick={printButtonLabellist} */}
                                                                                        {/* // style={} */}
                                                                                        {/* // className={btnlistname == 'Buy' ? styles.buylist : styles.buylist2} */}
                                                                                        {/* /> */}
                                                                                    </div>
                                                                                    <div className={styles.divpopupspn}>
                                                                                        {listdara == '' ? <span className={styles.otperr}>Please Enter Valid list</span> : ''}
                                                                                    </div>
                                                                                    {/* </Box> */}
                                                                                    <div className={styles.cancelbtnlog}>
                                                                                        <Button style={{ background: '#E31E24', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 24PX 7PX 24PX' }} onClick={handleCloseCompause}>Cancel</Button>
                                                                                        {listdara == '' ? <Button disabled style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 31PX 7PX 31PX' }} className={styles.cofimbatn}  >SAVE </Button> :
                                                                                            <Button style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 31PX 7PX 31PX' }} className={styles.cofimbatn} onClick={() => { edituserlistpause(), handleCloseCompause() }}>SAVE </Button>}
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
                                                            <TableCell>
                                                                <IconButton
                                                                    className={styles.listiconhh}
                                                                    aria-label="expand row"
                                                                    size="small"
                                                                    onClick={() =>{setOpen(!openlist),setDistiddata(row.id)}}
                                                                >
                                                                    {openlist ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                                </IconButton>
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

                                        
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                                                <Collapse in={openlist} timeout="auto" unmountOnExit>

                                                    <Table size="small" aria-label="purchases">
                        <TableBody>                                               

                                                            {/* {datamenu.map((item) => ( */}
                                                            <TableRow
                                                            //  key={historyRow.date}
                                                            >

                                                                <TableCell scope="row">
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Type</Typography>
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#009947' }}>{datamenu.target_price}</Typography>
                                                                    {/* ajjaa */}
                                                                    {/* {historyRow.date} */}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>StopLoss</Typography>
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#E31E24' }}>{datamenu.exitPrice}</Typography>
                                                                    {/* {historyRow.customerId} */}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Todays Profit</Typography>
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#009947' }}>{datamenu.todayprofit}</Typography>
                                                                    {/* {historyRow.amount} */}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Today Orders</Typography>
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#4F4F4F' }}>600</Typography>
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Created At</Typography>
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#4F4F4F' }}>{ moment(datamenu.createdAt).format("DD/MM/YYYY HH:mm:ss")}</Typography>
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '12px', 'color': '#BDBDBD', 'textTransform': 'uppercase' }}>Edited At</Typography>
                                                                    <Typography className={styles.peregarflist} style={{ 'font-size': '14px', 'textTransform': 'uppercase', fontWeight: "bold", 'color': '#4F4F4F' }}>{ moment(datamenu.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            {/* ))} */}
                                                        </TableBody>
                                                    </Table>
                                                    {/* ))} */}

                                                    {/* </Box> */}
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow> */}
                                        {/* <TableFooter> */}
                                        <TableRow>

                                            {/* <TablePagination
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
                                            // ActionsComponent={TablePaginationActions}
                                            /> */}
                                        </TableRow>
                                        {/* </TableFooter> */}
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[7, 10, 25, 100]}
                                    component="div"
                                    className={styles.tablePagination}
                                    count={datatebalpettan.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
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
                        </React.Fragment>
                        {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default Home;
