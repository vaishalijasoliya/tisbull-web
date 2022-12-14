import * as React from 'react';
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
import styles from './accounttype.module.scss'
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
// import { CSVLink, CSVDownload } from "react-csv";

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
import { styled } from '@mui/material/styles';

import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
function createData(name, calories, fat, carbs, Action, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        Action
    };
}


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
        label: 'Type',
    },
    {
        id: 'Type',
        numeric: true,
        disablePadding: false,
        label: 'User ID',
    },
    {
        id: 'Investment',
        numeric: true,
        disablePadding: false,
        label: 'Consumer Key',
    },
    {
        id: 'Created',
        numeric: true,
        disablePadding: false,
        label: 'Update token',
    },
    {
        id: 'Profit',
        numeric: true,
        disablePadding: false,
        label: 'Consumer Secret',
    },
    {
        id: 'Action',
        numeric: true,
        disablePadding: false,
        label: 'Update Date',
    },

    {
        id: 'Action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
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
                {/* <TableCell className={styles.listchekboix} padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell> */}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
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

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
const Home = (props) => {
    console.log(props, 'propsprovvvps');
    const router = useRouter();

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState(false);
    const [datatebalpettan, setDatatebalpettan] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [age, setAge] = React.useState('');
    const [datasars, setDatasars] = React.useState([]);
    const [datalist, setDatalist] = React.useState(null);
    const [datatebal, setDatatebal] = React.useState([]);
    const [teballist, setTeballist] = React.useState([])
    const [com, setCom] = React.useState(false);
    const [reviewStatus, setReviewStatus] = React.useState("none");
const[listuserid,setListuserid] =React.useState('')
    const [btnlistdata, setBtnlist] = React.useState('all')
    const[csvlist,Csvlistdsts] =React.useState([])
    const [pendingReviewList, setPendingReviewList] = React.useState([]);
    const [approveReviewList, setApproveReviewList] = React.useState([]);
    const [rowid, setRowid] = React.useState('')
const[listzorothatokan,setListzrothaid] = React.useState('')
const today = new Date();
console.log(props.props.profile.accountId,'listzorothatokan');
// propsaccountId
    React.useEffect(() => {
        getRequestToken();
      }, [router.isReady])
    
      const getRequestToken = () => {
        const request_token = router.query.request_token;
        console.log(request_token, 'request_token');
        if (!!request_token) {
          updateAccessToken(request_token)
        }
      }
    
      const updateAccessToken = async (token) => {
        var headers = {
          "Content-Type": "application/json",
          "x-access-token": props.props.profile.token
        }
        var body = {
          request_token: token,
          id_account:props.props.profile.accountId
        }
        console.log(props.profile.accountId,'props.profile.accountId');
        props.props.loaderRef(true)
        var updateAccount = await ApiServices.PostApiCall(ApiEndpoint.UPDATE_ACCESS_TOKEN, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        console.log('updateAccount...', updateAccount)
      }
    console.log(listuserid,'listuserid');
    const openliost = Boolean(datalist);
    const menulist = (event) => {
        setDatalist(event.currentTarget);  

    };
    const handleCloselisyys = () => {
        setDatalist(null);
    };
    var handleClickOpenCom = () => {
        setCom(true);
    };
    const handleCloseCom = () => {
        setCom(false);
    }
    const accounttype = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        props.props.loaderRef(true)
        var data = await ApiServices.GetApiCall(ApiEndpoint.ACCOUNT_LIST, headers)

        props.props.loaderRef(false)
        console.log(data, 'datadfsf');

        if (!!data) {
            if (data.status == true && data.data.length > 0) {
                const accoyty = [];
                const csvall = [];
                var pendingarr = [];
                var approvearr = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    const object = {
                        id: element.id,
                        logoUrl: element.logoUrl,
                        password: element.password,
                        type: element.type,
                        user_id: element.user_id,
                        consumer_key: element.consumer_key,
                        consumer_secret: element.consumer_secret,
                        id_user: element.id_user,
                        loginUrllist: element.loginUrl,
                        zerodha_token_update: element.zerodha_token_update
                    }
                    const objectcsv = {
                        // id: element.id,
                        // logoUrl: element.logoUrl,
                        createdAt:element.createdAt,
                        updatedAt:element.updatedAt,
                        password: element.password,
                        type: element.type,
                        // user_id: element.user_id,
                        consumer_key: element.consumer_key,
                        consumer_secret: element.consumer_secret,
                        id_user: element.id_user,
                        // loginUrllist: element.loginUrl,
                        // zerodha_token_update: element.zerodha_token_update
                    }
                    console.log(moment(element.zerodha_token_update).format("MM/DD/YYYY"),'todaytoday');

                    if (element.type == "kotak") {
                        pendingarr.push(JSON.parse(JSON.stringify(object)));
                      } else if (element.type == "zerodha") {
                        approvearr.push(JSON.parse(JSON.stringify(object)))
                      } 
                    console.log(element, 'password');
                    csvall.push(JSON.parse(JSON.stringify(objectcsv)))
                    accoyty.push(JSON.parse(JSON.stringify(object)))
                }
                Csvlistdsts(csvall)
                setDatatebal(accoyty)
                setTeballist(accoyty)
                setPendingReviewList(pendingarr);
                setApproveReviewList(approvearr);
            }
        }
    }
    const tabChange = (status) => {
        setReviewStatus(status);
        if (status == "kotak") {
            setDatatebal(pendingReviewList);
        } else if (status == "zerodha") {
            setDatatebal(approveReviewList);
        } else if (status == "all") {
            setDatatebal(teballist);
        } 
    };
    console.log(datatebal, 'datatebal');
    const accountdelete = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            "id_account": rowid
        }

        props.props.loaderRef(true)
        var accountdelete = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_DELETE, JSON.stringify(body), headers)
        props.props.loaderRef(false)
        console.log(accountdelete, 'accountdelete');
        if (accountdelete.status == true) {
            toast.success(accountdelete.message)
            accounttype()
        }
        else {
            toast.error(accountdelete.message)
        }
    }

    console.log(datatebal, 'datatebal');

    React.useEffect(() => {
        if (!!props.props.profile && !!props.props.profile.token) {
            accounttype()
        }
    }, [])
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
            const newSelected = datatebal.map((n) => n.id);
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

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datatebal.length) : 0;

    return (
        <Grid container className={styles.cantenar_list22}>
            <Grid item md={6} sm={6} xs={6} className={styles.padimgtebal}>

                <Typography className={styles.accolistp}>
                    Account
                </Typography>
            </Grid>
            <Grid item md={6} sm={6} xs={6} className={styles.batntextend}>
                <div>
                    <Button className={styles.addbtnkk} onClick={() => {
                        router.push({
                            pathname: './AddAccounts',
                        });
                    }}>
                        Create account
                    </Button>
                </div>
            </Grid>
         

         
            <Grid item md={12} sm={12} xs={12} >
                <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
                    <Paper className={styles.listdatataal} sx={{ width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: "20PX" }} >
                    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length} selected
        </Typography>
      ) : (
        <Grid item sm={6} md={6} xs={6} className={styles.padimgtebal2}>
                <div>
                    <Box className={styles.boxreting} display={'flex'}>

                        <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off"
                            onChange={(e) => {
                                setPage(0)
                                var value = e.target.value
                                if (typeof value !== 'object') {
                                    if (!value || value == '') {
                                        setDatatebal(teballist);
                                    } else {
                                        var filteredData = teballist.filter((item) => {
                                            let searchValue = item.user_id.toLowerCase();
                                            return searchValue.includes(value.toString().toLowerCase())
                                        })
                                        setDatatebal(filteredData);
                                    }
                                }
                            }}
                        />
                    </Box>
                </div>
            </Grid>
      )}

      {selected.length > 0 ? (
        <Tooltip >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip >
        <Grid item md={6} sm={6} xs={6} className={styles.padimgtebal3} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                {/* <Button className={styles.btnsaveic} */}
                {/* //  > */}
                    {/* <CSVLink data={csvlist} filename={"Account.csv"} name={"virang"} clssName={styles.csvlinkfor}> <SaveAltIcon /></CSVLink></Button> */}
                <Button
                className={styles.buttfiltar}
                 id="demo-customized-button"
                                                            aria-controls={openliost ? 'demo-customized-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={openliost ? 'true' : undefined}
                  onClick={menulist}><img src='../../Vector (3).svg' /></Button>
                <Menu
                            className={styles.menufiltarbtn}
                            anchorEl={datalist}

                            id="account-menu"
                            open={openliost}
                            onClose={handleCloselisyys}
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
                                <div><Typography>Account</Typography></div>
                                <div className={styles.listbtnsot}>
                                    {/* <Button className={styles.censbatnsot}  onClick={() => {
                                        tabChange("all"),handleCloselisyys(),setBtnlist('all')
                                    }}>Cancel</Button> */}
                                    <Button className={styles.savebatnsot}
                                     onClick={() => {
                                        tabChange(btnlistdata),handleCloselisyys()
                                    }}
                                    >Save</Button></div>
                            </div>
                            <Divider></Divider>
                            <div>
                                <div className={styles.typetext}><Typography>Type</Typography></div>
                                <div className={styles.listadarara}>
                                    <Button 
                                    onClick={() => {
                                      setBtnlist('all')
                                    }} className={btnlistdata == 'all' ? styles.Customlistbtn : styles.nonelistbtn}>ALL</Button>
                                    <Button onClick={() => {
                                        setBtnlist('kotak')
                                    }} className={btnlistdata == 'kotak' ? styles.Customlistbtn : styles.nonelistbtn}>KOTAK</Button>
                                    <Button onClick={() => {
                                        setBtnlist('zerodha')
                                    }}  className={btnlistdata == 'zerodha' ? styles.Customlistbtn : styles.nonelistbtn}>ZERODHA</Button>
                                </div>
                            </div>
                         
                            <div className={styles.divlistsivijan}></div>
                        </Menu>
            </Grid>
        </Tooltip>
      )}
    </Toolbar>

                        <TableContainer style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: "20PX" }} >
                            <Table
                                className={styles.tablelist}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={datatebal.length}
                                />
                                <TableBody>
                                    {stableSort(datatebal, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.id);
                                            // const isItemSelected = isSelected(row.id_account);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                className={styles.tabalroein}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.id}
                                                    selected={isItemSelected}
                                                >
                                                    {/* <TableCell className={styles.checkboxtd} padding="checkbox">
                                                        <Checkbox
                                                            onClick={(event) => handleClick(event, row.id)}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell> */}
                                                    <TableCell
                                                        className={styles.fasttebarow}
                                                        align="right"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Avatar className={styles.avtartype} src={row.logoUrl} />
                                                    </TableCell>
                                                    <TableCell
                                                    >{row.user_id}</TableCell>
                                                    <TableCell >{row.consumer_key.replace(/.(?=.{4,}$)/g, '*').substr(row.consumer_key.length - 10)}</TableCell>

                                                    <TableCell>
                                                        {row.type == 'zerodha' ?
                                                            <Button onClick={() => {
                                                               setListzrothaid(row.id) 
                                                               if (row.type == 'zerodha') {
                                                                    var profile = props.props.profile;
                                                                    profile.accountId = row.id
                                                                    props.save_user_data({ user: profile });
                                                                    window.location.href = `${row.loginUrllist}`
                                                                }
                                                            }}
                                                            >{moment(today).format("MM/DD/YYYY") == moment(row.zerodha_token_update).format("MM/DD/YYYY") ?
                                                                <img width={25} height={20} src='../../Vector (19).svg' />:
                                                                <img width={25} height={25} src='../../History.svg' />
                                                                }
                                                                </Button> :
                                                            <Button disabled
                                                            >
                                                                <img width={25} height={20} src='../../Vector (18).svg' /></Button>}
                                                    </TableCell>
                                                    <TableCell >{row.consumer_secret.replace(/.(?=.{4,}$)/g, '*').substr(row.consumer_secret.length - 10)}</TableCell>

                                                    <TableCell>
                                                        {row.zerodha_token_update == '' ? '-' : moment(row.zerodha_token_update).format("D  MMM YYYY h:mm a")}


                                                    </TableCell>
                                                    <TableCell>
                                               
                                                            <Button className={styles.detemenu} onClick={()=>{router.push({
                                                                        pathname: './Accountsview',
                                                                        // pathname:       

                                                                        query: { emailID:row.id}
                                                                    });}}>
                                                            <div style={{display:'flex'}}>
                                                            <div>
                                                            <img width={21} height={19} src='../../Vector (1).svg' />
                                                            </div>
                                                               </div>   </Button>
                                                                <Button className={styles.detemenu} onClick={()=>{handleClickOpenCom(),setRowid(row.id),setListuserid(row.user_id)}}>
                                                            <div style={{display:'flex'}}>
                                                            <div>
                                                            <img width={19} height={19} src='../../Vector (2).svg ' />
                                                            </div>
                                                              </div> </Button>  
                                                              
                                                        <div>
                                                            <Dialog open={com} onClose={handleCloseCom}
                                                                className={styles.borderredayasfor}
                                                                style={{
                                                                }}
                                                                maxWidth="sm"
                                                            >
                                                                <div>
                                                                    <DialogContent className={styles.popupcantenar}>
                                                                        <Box><div className={styles.delehedar}>
                                                                            <Typography>Delete Account</Typography>
                                                                        </div>
                                                                            <Divider>

                                                                            </Divider>
                                                                            <div className={styles.accoparegarf}>
                                                                                <Typography>Are you sure you want to delete {listuserid} this account?</Typography>
                                                                            </div>
                                                                            <Divider>

                                                                            </Divider>
                                                                            <div><Button className={styles.cancelbtn} onClick={handleCloseCom}>Cancel</Button><img src='../../Line 17.png' /><Button className={styles.cancelbtn2} onClick={() => { accountdelete(), handleCloseCom() }}>Delete</Button></div>
                                                                        </Box>
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
                                {/* <TableFooter> */}
                                <TableRow >
                                    <TablePagination
                                        className={styles.tablePagination}
                                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                        count={datatebal.length}
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
                                    />
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Paper>
      
                </Box>
            </Grid>
        </Grid>
    );
}
// export default ;
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
