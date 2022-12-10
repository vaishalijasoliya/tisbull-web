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

import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import Avatar from '@mui/material/Avatar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import moment from 'moment'
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
console.log(props.listdsts,'listdstslistdsts');
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
  const [age, setAge] = React.useState('');setListid
  const [listdarta, setListid] = React.useState('');
const[idlist,setIdlist] = React.useState('')
  const [datasars, setDatasars] = React.useState([]);
  const [datalist, setDatalist] = React.useState([]);
  const [com, setCom] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [pause, setPause] = React.useState(false)
  const [diletbtn, setDiletbtn] = React.useState(false)
console.log(idlist,'listdarta');
  const today = new Date();
console.log(today,'today');

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
      "pattern_id":[parseInt(props.listdsts)],
      "start_date": moment(today).format("MM/DD/YYYY"),
      "end_date":moment(today).format("MM/DD/YYYY"),
      // props.idlist,
      // email: props.email,
      // otp: outField
    }
    console.log(body, 'body');
    // moment(row.created_at).format("DD-MM-YYYY h:mm:ss")

    // props.loaderRef(true)
    // var data = await ApiServices.GetApiCall(ApiEndpoint.ORDERLIST, headers)
    var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ORDERLIST, JSON.stringify(body), headers)

    // const data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_LIST, JSON.stringify(body), headers);
    // props.loaderRef(false)
    console.log(patternDelete, 'datalistddd');

    if (!!patternDelete) {
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
            status: element.status,
            orderId:element.orderId
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
  const playpattern = async () => {

    var headers = {
        "Content-Type": "application/json",
        "x-access-token": props.props.profile.token
    }
    var body = {
      "id_order" :idlist
  }
    props.props.loaderRef(true)
    var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ORDER_DELETE, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    // if (!!patternDelete) {

    console.log(patternDelete, 'datalist');
    if (patternDelete.status) {
        toast.success(patternDelete.message)
      
    }
    else {
        toast.error(patternDelete.message)
    }
 

}
  // let inloglist=datatebal.zerodha_token_update

  // console.log(datatebalpettan, 'datatebalpettan');

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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datatebalpettan.length) : 0;

  return (
    <Grid container spacing={0} className={styles.cantenar_list57}>
{/* <div style={{display:'flex'}}> */}
      <Grid item md={6} sm={6} xs={12} >
        {/* <div style={{ display: 'flex' }}> */}
          <div className={styles.maendivhpline}>
            {/* <Grid item md={12} sm={12} xs={12}> */}
            <div className={styles.inlinemanediv}>
              <div className={styles.hadingbtn}><Typography>Today’s orders</Typography> </div>
              <div className={styles.openbtn_today}><Button>Open</Button></div>
              <div className={styles.openbtn_today}><Button>Trade</Button></div>
            </div>

          </div>
          </Grid>
          <Grid item md={6} sm={12} xs={12}  style={{display:'flex',justifyContent:'end',padding:'0px 60px 0px 0px'}}>

          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            {search ?
              <div>
                <input type="text" name="search"
                  className={styles.searchbtn}
                  // onClick={display:b}
                  // onChange={(e) => {
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
                  // patternlistcccc(e)
                  //     var value = e.target.value
                  //     if (typeof value !== 'object') {
                  //         if (!value || value == '') {
                  //             setDatatebalpettan(datasars)
                  //         } else {
                  //             var filteredData = datasars.filter((item) => {
                  //                 let searchValue = item.user.first_name.toLowerCase() + ' ' + item.user.last_name.toLowerCase()
                  //                 return searchValue.includes(value.toString().toLowerCase())
                  //             })
                  //             setDatatebalpettan(filteredData)
                  //         }
                  //     }
                  // }}
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
            {/* <Typography>
                            Filter
                        </Typography> */}
            <FilterListIcon />
          </Button>
        {/* </div> */}
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

              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
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
        </Grid>
        {/* </div> */}
        <Grid item md={12} sm={12} xs={12} className={styles.boxteballist22}>
        <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%',borderBottomLeftRadius:'20px',borderBottomRightRadius:"20PX" }} >
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer style={{borderBottomLeftRadius:'20px',borderBottomRightRadius:"20PX"}} >
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
                                <Avatar className={row.status == 'pending' ? styles.avtarlistyes96 : row.status == 'active' ? styles.avtarlistyes233 : row.status == 'cancelled' ? styles.avtarlistyes398 : ''}>
                                  {/* {row.stock == 'SELL' ? <Avatar className={styles.avtarlistyes96}> <Avatar className={styles.avtarlistyes233}>*/}
                                  {row.stock == 'SELL' ?
                                    <img src="../../ftGySSa - Imgur.svg" />

                                    : row.stock == 'BUY' ? <img src="../../2Nk5d5p - Imgur.svg" /> : ''}
                                </Avatar>
                              </div><div className={styles.listperegaf}>
                                <Typography className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'cancelled' ? styles.exitcolor : ''}>{row.script}</Typography>

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
                            {/* <Button className={styles.batnliastbtngop} onClick={row.status == 'pending' ? handleClickOpenCompause : row.status == 'active' ? handleClickOpenComplay : row.status == 'cancelled' ? handleClickOpenCom : ''}> */}
                              {/* {row.status == 'pause' ? 'Cancel' : row.status == 'active' ? 'Active' : row.status == 'exit' ? 'Delete' : ''}> */}
                              <Typography className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'cancelled' ? styles.exitcolor : ''}>{row.status == 'pending' ? 'Cancel' : row.status == 'active' ? 'Active' : row.status == 'cancelled' ? 'Delete' : ''}</Typography>
                            {/* </Button> */}


                          </TableCell>

                          <TableCell className={styles.btnmenubar}>

                            <div >
                              <Button className={styles.viwebtnmm22} onClick={()=>{handleClickOpenCom(),setIdlist(row.id)}}> <MoreVertIcon /></Button>


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
                                          this order(#{row.orderId})?
                                        </Typography>
                                        <Typography className={styles.peregara_itbtn}>It will delete from 3rd party broker </Typography>
                                      </div>
                                      {/* <div></div> */}
                                      <Divider>

                                      </Divider>
                                      <div><Button  onClick={handleCloseComdelet} style={{ background: '#009947', borderRadius: '5px', color: '#FFFFFF', padding: '3PX 31PX 3PX 31PX' }}>Cancel</Button><img src='../../Line 17.png' /><Button style={{ background: '#E31E24', borderRadius: '5px', color: '#FFFFFF', padding: '3PX 24PX 3PX 24PX' }} onClick={playpattern}>Delete</Button></div>
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
                                        <div className={styles.listmenutypoo22}><Typography>Are you sure you want to delete this order (#{row.orderId}) from zerodha ?</Typography></div>
                                        <div className={styles.listmenutypoo}><Typography>Zerodha</Typography>:<Typography>#{row.orderId}</Typography></div>
                                        <div className={styles.listmenutypoo}><Typography>Zerodha</Typography>:<Typography>#{row.id}</Typography></div>
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
                {/* <TableFooter> */}
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
                                                // ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    {/* </TableFooter> */}
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
      {/* </Grid> */}
    </Grid>
  );
}
export default Home;
