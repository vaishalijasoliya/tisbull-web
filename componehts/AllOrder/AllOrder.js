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
import styles from '../Stocks/Stocks.module.scss'
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import Avatar from '@mui/material/Avatar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import moment from 'moment'
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
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


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const Home = (props) => {
  const router = useRouter();
// console.log(,'listdstslistdsts');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState(false);
  const [datatebalpettan, setDatatebalpettan] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [listuseridlist, setListuserid] = React.useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [age, setAge] = React.useState('');setListid
  const [listdarta, setListid] = React.useState('');
const[idlist,setIdlist] = React.useState('')
  const [datasars, setDatasars] = React.useState([]);
  const [datalist, setDatalist] = React.useState([]);
  const [com, setCom] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [pause, setPause] = React.useState(false)
  const [diletbtn, setDiletbtn] = React.useState(false)
  const [btnlistdata, setBtnlist] = React.useState('pending')
  const [btnlistdatalist, setBtnlistlist] = React.useState('SELL')
  const[listsell,setListsell] =React.useState([])
  const[listsellmenu,setListsellmenu] =React.useState([])
  const [pendingReviewList, setPendingReviewList] = React.useState([]);
  const [approveReviewList, setApproveReviewList] = React.useState([]);
  const [reviewStatus, setReviewStatus] = React.useState("pending");
const[listdatadelete,setListdeletdata] = React.useState('')
  const [anchorEllist, setAnchorEllist] = React.useState(null);
  const [value, setValue] = React.useState(0);
const[sassaliusgs,setSasasdata] =React.useState("")
  const handleChangelisggs = (event, newValue) => {
    setValue(newValue);
  };
  const handleClosemenu = () => {
    setAnchorEllist(null);
  };
  
  const  handleClickmenu= (event) => {
    setAnchorEllist(event.currentTarget);
  };
  const today = new Date();

  var handleClickOpenComdilet = () => {
    setDiletbtn(true);
  };
  const handleCloseComdelet = () => {
    setDiletbtn(false);
  }
  var handleClickOpenCom = () => {
    setCom(true);
  };
  var handleClickOpenComplay = () => {
    setPlay(true);
  };
  var handleClickOpenCompause = () => {
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
  console.log(datatebalpettan, 'datatebalpettan');
 const patternlist = async () => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    var body = {
    
    }
    console.log(body, 'body');


    var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ORDERLIST, JSON.stringify(body), headers)
    if (!!patternDelete) {
      if (patternDelete.status == true) {
        const accoyty = [];
        const datalist = [];
        const datalogo = []
        var approvearr = [];
        var pendingarr = [];
        const listdata = []
        const listDatamej=[];
        const buyorder =[]
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
            status: element.status,
            orderId:element.orderId
          }
          if (element.status == "pending") {
            pendingarr.push(JSON.parse(JSON.stringify(object)));
            accoyty.push(JSON.parse(JSON.stringify(object)))

          } 
           else if (element.status == "cancelled" || element.status == "active" ) {
            approvearr.push(JSON.parse(JSON.stringify(object)))
          }
          if(element.transactionType == 'SELL'){
            listDatamej.push(JSON.parse(JSON.stringify(object)))
          }else if(element.transactionType =='BUY'){
            buyorder.push(JSON.parse(JSON.stringify(object)))
          }
          listdata.push(JSON.parse(JSON.stringify(object)))
          datalogo.push(JSON.parse(JSON.stringify(object.status)))
          datalist.push(JSON.parse(JSON.stringify(object)))
        }
        setDatasars(listdata)
        setDatalist(datalogo)
        setDatatebalpettan(accoyty)
        setListsellmenu(buyorder)
        setData(data)
        setListsell(listDatamej)
        setPendingReviewList(pendingarr);
        setApproveReviewList(approvearr);
      }

    }
  }
  const tabChange = (status) => {
    setReviewStatus(status);
    if (status == "pending") {
      setDatatebalpettan(pendingReviewList);
    } else if ( status == "cancelled" || status == "active") {
      setDatatebalpettan(approveReviewList);
    } 
    if (status == "SELL") {
      setDatatebalpettan(listsell);
    }
    if (status == "BUY") {
      setDatatebalpettan(listsellmenu);
    }
};
  const playpattern = async () => {

    var headers = {
        "Content-Type": "application/json",
        "x-access-token": props.props.profile.token
    }
    var body = {
      "id_order" :idlist
  }
  console.log(body,'bodybody');
    props.props.loaderRef(true)
    var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ORDER_DELETE, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    console.log(patternDelete,'patternDeletepatternDelete');
    console.log(patternDelete, 'datalist');
    if (patternDelete.status == true) {
        toast.success(patternDelete.message)
      setListdeletdata(patternDelete.data)
      setSasasdata(patternDelete)
      handleClickOpenComplay()
      patternlist()
    }
    else {
        toast.error(patternDelete.message)

    }
 

}

  React.useEffect(() => {
    if (!!props.props.profile && !!props.props.profile.token) {
      patternlist()
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datatebalpettan.length) : 0;

  return (
    <Grid container spacing={0} className={styles.cantenar_list57221} style={{padding:'40px 0px 0px 0px'}}>
      <Grid item md={6} sm={6} xs={12} >
          <div className={styles.maendivhpline}>
            <div className={styles.inlinemanediv}>
              <div className={styles.hadingbtn}><Typography>All orders</Typography> </div>
              <Button  onClick={() => {
                                        setBtnlist('pending')
                                        tabChange('pending')
                                    }}     
                                     className={btnlistdata == 'pending' ? styles.Customlistbtn : styles.nonelistbtn}>Open</Button>
                                    <Button onClick={() => {
                                        setBtnlist('cancelled')
                                        tabChange('cancelled')
                                    }} className={btnlistdata == 'cancelled' ? styles.Customlistbtn : styles.nonelistbtn}>Trade</Button>
            </div>

          </div>
          </Grid>
          <Grid item md={6} sm={12} xs={12}  style={{display:'flex',justifyContent:'end',padding:'0px 60px 0px 0px'}}>

          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            {search ?
              <div>
                <input type="text" name="search"
                  className={styles.searchbtn}
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
                  autoComplete="off" /></div> : <style>{`
                          display: none;
                        `}</style>}
            <div >
              <Button className={styles.btnfiltaebtn2} onClick={(e) => {
                setSearch(!search)
              }} ><SearchIcon /></Button>
            </div>
          </div>
          <Button className={styles.btnfiltaebtn} onClick={handleClicklist}
          >
            <FilterListIcon />
          </Button>
        {/* </div> */}
        <Menu
          className={styles.menufiltarbtn}
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
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
              <Button className={styles.censbatnsot22} onClick={()=>{handleClose,tabChange("pending"),setBtnlist('pending')}}>RESET </Button>
              <Button className={styles.savebatnsot223} onClick={()=>{ tabChange(btnlistdatalist)}}>Save</Button></div>
          </div>
          <Divider className={styles.filtar_divaydar}></Divider>

          <div>
            <div className={styles.typetext222}><Typography>Type</Typography></div>
            <div style={{padding:'0px 0px 0px 25px'}}>          <Button 
                                    onClick={() => {
                                      setBtnlistlist('SELL')
                                    
                                    }} className={btnlistdatalist == 'SELL' ? styles.Customlistbtn : styles.nonelistbtn}>SELL</Button>
                                    <Button onClick={() => {
                                        setBtnlistlist('BUY')
                                         
                                    }} className={btnlistdatalist == 'BUY' ? styles.Customlistbtn : styles.nonelistbtn}>BUY</Button></div>
         
          </div>
          <div className={styles.divlistsivijan}></div>
        </Menu>
        </Grid>
        <Grid item md={12} sm={12} xs={12} className={styles.boxteballist22}>
        <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%',borderBottomLeftRadius:'20px',borderBottomRightRadius:"20PX" }} >
            <TableContainer style={{borderBottomLeftRadius:'20px',borderBottomRightRadius:"20PX"}} >
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
                  rowCount={datatebalpettan.length}
                />
                <TableBody>
                  {stableSort(datatebalpettan, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                      
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
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <div className={styles.typefild}>
                              <div>
                                <Avatar className={row.status == 'pending' ? styles.avtarlistyes96 : row.status == 'active' ? styles.avtarlistyes233 : row.status == 'cancelled' ? styles.avtarlistyes398 : ''}>
                                 
                                  {row.stock == 'SELL' ?
                                  'S'

                                    : row.stock == 'BUY' ?
                                    'B'
                                     : ''}
                                </Avatar>
                              </div><div className={styles.listperegaf}>
                                <Typography className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'cancelled' ? styles.exitcolor : ''}>{row.script}</Typography>

                                </div>
                            </div>
                          </TableCell>

                          <TableCell
                          >#{row.type_pattern}</TableCell>
                          <TableCell ><Typography className={styles.rowlistpement}>{row.investment}</Typography></TableCell>
                          <TableCell className={row.profit <= 0 ? styles.maynascall : styles.palscalls}>
                            <div className={styles.tabaldataicon}><CurrencyRupeeIcon className={styles.iconlistmrnu} /> {row.profit}</div>
                            {/* 100 */}
                          </TableCell>
                          <TableCell >
                            <Typography className={styles.dateone}>{
                              moment(row.created_at).format("DD-MM-YYYY h:mm:ss")
                            } </Typography></TableCell>

                          <TableCell>
                              <Typography className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'cancelled' ? styles.exitcolor : ''}>{row.status == 'pending' ? 'Pending' : row.status == 'active' ? 'Active' : row.status == 'cancelled' ? 'Cancelled' : ''}</Typography>
                            {/* </Button> */}


                          </TableCell>

                          <TableCell >

                            <div >
                            <Button className={styles.viwebtnmm22}
                               onClick={()=>{setIdlist(row.id),setListuserid(row.type_pattern),row.status == 'pending' ?
                              handleClickOpenCom(): ''}}>                                                           <img width={19} height={19} src='../../Vector (2).svg ' />
</Button>
                            </div>
                            <div>
                             
                            </div>
                            <div>
                              <Dialog open={com} onClose={handleCloseCom}
                                className={styles.borderredayasfor}
                                style={{
                                }}
                                maxWidth="sm"
                              >
      
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
                                        <div className={styles.listmenutypoo22}><Typography>Are you sure you want to delete this order (#{listuseridlist}) from {props.props.profile.userData.currentAccount.type}?</Typography></div>
                                        <div className={styles.listmenutypoo}><Typography>{props.props.profile.userData.currentAccount.type}</Typography>:<Typography>#{listuseridlist}</Typography></div>
                                        <div className={styles.listmenutypoo}><Typography>Tis</Typography>:<Typography>#{idlist}</Typography></div>
                                      </Box>
                                      <div className={styles.listbtnimpoo} style={{paddingTop:"30px",paddingBottom:"20px"}}>
                                      <Button style={{ background: '#E31E24', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 32PX 7PX 32PX',textTransform:"capitalize",margin:'0px 14px 0px 0px' }} onClick={handleCloseCom}  className={styles.cofimbatn}>Cancel</Button>

                                                                                            <Button style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 30PX 7PX 30PX',textTransform:'capitalize' }} className={styles.cofimbatn}  onClick={()=>{playpattern(),handleCloseCom()}}>Confirm</Button>
                           
                                        
                                      </div>
                                    </Box>
                              
                                  </DialogContent>
                                </div>
                              </Dialog>
                            </div>
                            <div>
                              <Dialog open={play} onClose={handleCloseComplay}
                                className={styles.borderredayasfor}
                                style={{
                                }}
                                
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
                                            <Typography>{listdatadelete.orderId}</Typography>
                                          </div>
                                          <div className={styles.oderidpopup}><InputLabel>TIS ORDER ID</InputLabel>
                                            <Typography>{listdatadelete.id}</Typography>
                                          </div>
                                        </div>
                                        <div className={styles.oderidpopup2}><InputLabel>Type</InputLabel>
                                          <Typography>{props.props.profile.userData.currentAccount.type}</Typography>
                                        </div>
                                      </Box>
                                      <div className={styles.listbtnimpoo}>
                                        <Button style={{ background: '#E31E24', borderRadius: '5px', color: '#FFFFFF', padding: '7PX 32PX 7PX 32PX',textTransform:"capitalize",margin:'0px 14px 0px 0px' }} onClick={handleCloseComplay}  className={styles.cofimbatn}>Cancel</Button>
                                        
                          
                                      </div>
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
                                            />
                                        </TableRow>
              </Table>
            </TableContainer>
    
          </Paper>
     
        </Box>
        </Grid>
      {/* </Grid> */}
    </Grid>
  );
}
export default Home;
