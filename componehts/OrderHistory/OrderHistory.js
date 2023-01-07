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
import ApiServices from '../../config/ApiServices';
import { useRouter } from 'next/router';

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



const Home = (props) => {
  console.log(props, 'propsprops');
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
  const [datalist, setDatalist] = React.useState([]);
  const [com, setCom] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [pause, setPause] = React.useState(false)
  const [diletbtn, setDiletbtn] = React.useState(false)
  const [teballist, setTeballist] = React.useState([])
  const [reviewStatus, setReviewStatus] = React.useState("pending");
  const[listsell,setListsell] =React.useState([])
  const[listsellmenu,setListsellmenu] =React.useState([])
  const [btnlistdata, setBtnlist] = React.useState('pending')
  const [pendingReviewList, setPendingReviewList] = React.useState([]);
  const [approveReviewList, setApproveReviewList] = React.useState([]);
  const [btnlistdatalist, setBtnlistlist] = React.useState('ALL')

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
  console.log(router.query.emailID,'today');
  const patternlist = async () => {

    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    var body = {
      "id_pattern": [parseInt(props.listdata)],
      "type": [
        "active","cancelled"
    ]
    }
    console.log(body, 'bodybody');

    var patternDelete = await ApiServices.PostApiCall(ApiEndpoint.ORDERLIST, JSON.stringify(body), headers)
    console.log(patternDelete, 'datalistddllld');

    if (!!patternDelete) {
      if (patternDelete.status == true && patternDelete.data.length > 0) {
        const accoyty = [];
        const datalist = [];
        const datalogo = []
        var approvearr = [];
        var pendingarr = [];
var listopen = [];
const listDatamej=[];
const buyorder =[]
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
            created_at: element.updatedAt,
            status: element.status,
            orderId:element.orderId
          }
          if(element.transactionType == 'SELL'){
            listDatamej.push(JSON.parse(JSON.stringify(object)))
          }else if(element.transactionType =='BUY'){
            buyorder.push(JSON.parse(JSON.stringify(object)))
          }
       
          listdata.push(JSON.parse(JSON.stringify(object)))
          datalogo.push(JSON.parse(JSON.stringify(object.status)))
          datalist.push(JSON.parse(JSON.stringify(object)))
          accoyty.push(JSON.parse(JSON.stringify(object)))
        }
        setDatasars(listdata)
        setDatalist(datalogo)
        setDatatebalpettan(accoyty)
        setListsellmenu(buyorder)
        setData(data)
        setListsell(listDatamej)
        setBtnlist(listopen)
        setPendingReviewList(datalist);
        setApproveReviewList(approvearr);
      }

    }
  }

  const tabChange = (status) => {
    setReviewStatus(status);
    if (status == "SELL") {
      setDatatebalpettan(listsell);
    }
    if (status == "BUY") {
      setDatatebalpettan(listsellmenu);
    }
    if( status == 'ALL'){
      setDatatebalpettan(pendingReviewList)
    }
};
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
      const newSelected = datatebalpettan.map((n) => n.id);
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
    <Grid container spacing={0} className={styles.cantenar_list57}>

      <Grid item md={12} sm={12} xs={12} className={styles.boxteballist22}>
       
        <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
          <Paper  className={styles.listdatataal} sx={{ width: '100%',borderBottomLeftRadius:'20px',borderBottomRightRadius:"20PX" }} >
          <Toolbar
          className={styles.tooobatlistts}
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
        <div className={styles.maendivhpline}>
            <div className={styles.inlinemanediv}>
              <div className={styles.hadingbtn}><Typography>Orders History</Typography> </div>
          
            </div>

          </div>
      )}

      {selected.length > 0 ? (
        <Tooltip >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip >
        <div style={{ display: 'flex' }}>
        
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '72%' }}>
        
            <div>
              <input type="text" name="search"
                className={styles.searchbtn}
                onChange={(e) => {
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
             
                autoComplete="off" /></div>
          {/* <div >
            <Button className={styles.btnfiltaebtn2} onClick={(e) => {
              setSearch(!search)
            }} ><SearchIcon /></Button>
          </div> */}
        </div>
        <Button className={styles.btnfiltaebtn} onClick={handleClicklist}
        >
          <FilterListIcon />
        </Button>
     
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
          <Button className={styles.censbatnsot22} onClick={()=>{handleClose,tabChange("ALL")}}>RESET </Button>
            <Button className={styles.savebatnsot223} onClick={()=>{ tabChange(btnlistdatalist)}}>Save</Button></div>
        </div>
        <Divider className={styles.filtar_divaydar}></Divider>

        <div>
     
          <div className={styles.typetext222}><Typography>Type</Typography></div>
          <div style={{padding:'0px 0px 0px 25px'}}>     <Button onClick={() => {
      setBtnlistlist('ALL')

    }} className={btnlistdatalist == 'ALL' ? styles.Customlistbtn : styles.nonelistbtn}>ALL</Button>       <Button 
                                  onClick={() => {
                                    setBtnlistlist('SELL')
                                  
                                  }} className={btnlistdatalist == 'SELL' ? styles.Customlistbtn : styles.nonelistbtn}>SELL</Button>
                                  <Button onClick={() => {
                                      setBtnlistlist('BUY')
                                       
                                  }} className={btnlistdatalist == 'BUY' ? styles.Customlistbtn : styles.nonelistbtn}>BUY</Button></div>
        </div>
        <div className={styles.divlistsivijan}></div>
      </Menu>
      </div>
        </Tooltip>
      )}
    </Toolbar> 
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
                <TableBody className={styles.listtabalrowdat}>
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
                          {/* <TableCell className={styles.tebalrovcek} padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row.id)}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell> */}
                          <TableCell
                           className={styles.fasttebarow}
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <div className={styles.typefild}>
                              <div>
                              <Avatar className={row.stock == 'SELL' ? styles.avtarlistyes398 : row.stock == 'BUY' ? styles.avtarlistyes233  : ''}>
                                  {row.stock == 'SELL' ?
                                'S'

                                    : row.stock == 'BUY' ?'B' : ''}
                                </Avatar>
                              </div><div className={styles.listperegaf}>
                                <Typography  className={styles.listsriptext}
                                // className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'cancelled' ? styles.exitcolor : ''}
                                >{row.script}</Typography>

                                <div className={styles.nselist}><Typography>{row.exchange}</Typography></div></div>
                            </div>
                          </TableCell>

                          <TableCell
                          // align="right"
                          >#{row.type_pattern}</TableCell>
                          <TableCell ><Typography className={styles.rowlistpement}>{row.investment}</Typography></TableCell>
                          <TableCell className={row.profit <= 0 ? styles.maynascall : styles.palscalls}>
                            <div className={styles.tabaldataicon}><CurrencyRupeeIcon className={styles.iconlistmrnu} /> {row.profit}</div>
                          </TableCell>
                          <TableCell >
                            <Typography className={styles.dateone}>{
                              moment(row.created_at).format("D  MMM YYYY h:mm a")
                            } </Typography></TableCell>

                          <TableCell  className={styles.fasttebarow22}>
                            <Button disabled className={styles.batnliastbtngop} onClick={row.status == 'pending' ? handleClickOpenCompause : row.status == 'active' ? handleClickOpenComplay : row.status == 'cancelled' ? handleClickOpenCom : ''}>
                              <Typography className={row.status == 'pending' ? styles.pusacolor : row.status == 'active' ? styles.activecalass : row.status == 'cancelled' ? styles.exitcolor : ''}>{row.status == 'pending' ? 'Cancel' : row.status == 'active' ? 'Active' : row.status == 'cancelled' ? 'Delete' : ''}</Typography>
                            </Button>


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
export default Home;
