// import Head from 'next/head'
// import Image from 'next/image'
import React, { useState } from "react";
import styles from "./Stocks.module.scss";
import Grid from "@mui/material/Grid";
// import Newbar from '../componehts/newbar/newbar';
// import Stocks from '../componehts/Stocks/Stocks';
import { Box, Button, Typography, TableFooter, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SouthIcon from "@mui/icons-material/South";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NorthIcon from "@mui/icons-material/North";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
// import * as React from 'react';
import { alpha } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
// import Box from '@mui/material/Box';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import moment from "moment";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Touchable from "rc-touchable";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import InputLabel from "@mui/material/InputLabel";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { Types } from "../../constants/actionTypes";
import { connect } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from "@mui/utils";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { shouldDisplay } from "rsuite/esm/Picker";
import { setDate } from "rsuite/esm/utils/dateUtils";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { BUILD_MANIFEST } from "next/dist/shared/lib/constants";
const tabtheme = createTheme({
  palette: {
    primary: {
      main: "#009947",
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
  // protein: number;
}

function createData(
  Script: string,
  NSE: string,
  Type: string,
  Investment: number,
  Profit: number,
  Stocks: number,
  Created: string,
  Status: string
  // calories: number,
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
    // protein,
  };
}

const rows = [
  createData(
    "Cupcake",
    "uqwdgasd",
    "hyggg",
    3.7,
    67,
    4.3,
    "01-10-2022",
    "Active"
  ),
  // createData('Donut', 452, 25.0, 51, 4.9),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
  // createData('Honeycomb', 408, 3.2, 87, 6.5),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Jelly Bean', 375, 0.0, 94, 0.0),
  // createData('KitKat', 518, 26.0, 65, 7.0),
  // createData('Lollipop', 392, 0.2, 98, 0.0),
  // createData('Marshmallow', 318, 0, 81, 2.0),
  // createData('Nougat', 360, 19.0, 9, 37.0),
  // createData('Oreo', 437, 18.0, 63, 4.0),
];
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

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
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
    id: "Script",
    numeric: false,
    disablePadding: true,
    label: "Script",
  },
  {
    id: "Type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "Investment",
    numeric: true,
    disablePadding: false,
    label: "Investment",
  },
  {
    id: "Profit",
    numeric: true,
    disablePadding: false,
    label: "Profit",
  },
  {
    id: "Stocks",
    numeric: true,
    disablePadding: false,
    label: "Stocks",
  },
  {
    id: "Created",
    numeric: true,
    disablePadding: false,
    label: "Created",
  },
  // {
  //     id: 'Status',
  //     numeric: true,
  //     disablePadding: false,
  //     label: 'Status',
  // },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
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
  const [value, setValue] = React.useState("1");

  const [arrolist, setArrolist] = useState(true);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [datatebalpettan, setDatatebalpettan] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [datalist, setDatalist] = React.useState([]);
  const [datasars, setDatasars] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [age, setAge] = React.useState("");
  const [com, setCom] = React.useState(false);
  var handleClickOpenCom = (myprops) => {
    setCom(true);
    // console.log(advertiseMent, startDate, endDate, image, 'hello data')
    // myprops = { advertiseMent }
  };
  const handleCloseCom = () => {
    setCom(false);
  };
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
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
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
      "x-access-token": props.props.profile.token,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.GetApiCall(ApiEndpoint.PATTERN_LIST, headers);

    // const data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_LIST, JSON.stringify(body), headers);
    props.props.loaderRef(false);
    console.log(data, "datalist");

    if (!!data) {
      if (data.status == true && data.data.length > 0) {
        const accoyty = [];
        const datalist = [];
        const datalogo = [];
        const listdata = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          const object = {
            id: element.id_account,
            script: element.script,
            exchange: element.exchange,
            type_pattern: element.type_pattern,
            investment: element.investment,
            profit: element.profit,
            stock: element.stock,
            created_at: element.created_at,
            status: element.status,
          };
          listdata.push(JSON.parse(JSON.stringify(object)));
          datalogo.push(JSON.parse(JSON.stringify(object.status)));
          datalist.push(JSON.parse(JSON.stringify(object)));
          accoyty.push(JSON.parse(JSON.stringify(object)));
          // csvall.push(objectcsv)
        }
        setDatasars(listdata);
        setDatalist(datalogo);
        setDatatebalpettan(accoyty);
        setData(data);
      }
    }
  };

  // let inloglist=datatebal.zerodha_token_update

  console.log(data.exchange, "datatebalpettan");

  React.useEffect(() => {
    if (!!props.profile && !!props.profile.token) {
      patternlist();
    }
  }, []);
  console.log(datalist, "stock");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container spacing={0} className={styles.cantenar_list57}>
      <Grid item md={12} sm={12} xs={12} className={styles.boxteballist}>
        {/* <Box> */}

        <div className={styles.listmeniom}>
          <Grid item md={3} sm={12} xs={12}>
            <div className={styles.patterndiv}>
              <Typography>Pattern</Typography>
            </div>
          </Grid>
          <Grid md={9} sm={12} xs={12} display={"flex"} justifyContent={"end"}>
            <Button className={styles.cerbatn}>
              <img src="../../Vector (5).svg" />
            </Button>
          </Grid>
        </div>
        <div className={styles.inputlistm}>
          <Grid item md={12} sm={12} xs={12}>
            <Box className={styles.boxreting} display={"flex"}>
              <input
                type="text"
                id="myserchbtn"
                name="search"
                placeholder="Search"
                className={styles.searchbtn}
                autoComplete="off"
                onChange={(e) => {
                  //   setPage(0)
                  var value = e.target.value;
                  if (typeof value !== "object") {
                    if (!value || value == "") {
                      setDatatebalpettan(datasars);
                    } else {
                      var filteredData = datasars.filter((item) => {
                        let searchValue = item.script.toLowerCase();
                        return searchValue.includes(
                          value.toString().toLowerCase()
                        );
                      });
                      setDatatebalpettan(filteredData);
                    }
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item md={12} display={"flex"} justifyContent={"end"} className={styles.mar_1}>
            {/* <Paper>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper> */}
            <Button className={styles.filterlist} onClick={menulist}>
              <Typography>Filter</Typography>
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
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div className={styles.filtarlist}>
                <div>
                  <Typography>Pattern</Typography>
                </div>
                <div className={styles.listbtnsot}>
                  <Button className={styles.censbatnsot} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button className={styles.savebatnsot}>Save</Button>
                </div>
              </div>
              <Divider></Divider>
              <div>
                <div className={styles.typetext}>
                  <Typography>Type</Typography>
                </div>
                <div>
                  <Button className={styles.nonelistbtn}>None</Button>
                  <Button className={styles.Basiclistbtn}>Basic</Button>
                  <Button className={styles.Customlistbtn}>Custom</Button>
                </div>
              </div>
              <div className={styles.maendivselect}>
                <InputLabel
                  className={styles.patternlebal}
                  id="demo-simple-select-helper-label"
                >
                  Patterns
                </InputLabel>

                <Select
                  className={styles.listsekater}
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
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
          <Box className={styles.boxlistnum} sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
              <TableContainer>
                <Table
                  className={styles.tablelist}
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                            <TableCell padding="checkbox">
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
                                  {row.status == "pause" ? (
                                    <Avatar className={styles.avtarlistyes}>
                                      <img src="../../Vector (10).svg" />
                                    </Avatar>
                                  ) : row.status == "active" ? (
                                    <Avatar className={styles.avtarlistyes2}>
                                      {" "}
                                      <img src="../../Vector (12).svg" />
                                    </Avatar>
                                  ) : row.status == "exit" ? (
                                    <Avatar className={styles.avtarlistyes3}>
                                      {" "}
                                      <img src="../../Vector (11).svg" />
                                    </Avatar>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className={styles.listperegaf}>
                                  {row.script}

                                  <div className={styles.nselist}>
                                    <Typography>{row.exchange}</Typography>
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell
                            // align="right"
                            >
                              {row.type_pattern}
                            </TableCell>
                            <TableCell>{row.investment}</TableCell>
                            <TableCell>{row.profit}</TableCell>
                            <TableCell>{row.stock}</TableCell>
                            <TableCell>
                              <Typography className={styles.dateone}>
                                {moment(row.created_at).format(
                                  "DD-MM-YYYY h:mm:ss"
                                )}{" "}
                              </Typography>
                            </TableCell>
                            {/* 
                                                        <TableCell>
                                                          
                                            
                                                        </TableCell> */}

                            <TableCell>
                              <div className={styles.listtebal}>
                                <Button className={styles.viwebtnmm}>
                                  {" "}
                                  <img
                                    height={18}
                                    src="../../edit_square.svg"
                                  />
                                </Button>

                                {row.status == "exit" ? (
                                  <Box className={styles.viwebtnmm23}>
                                    {" "}
                                    <PlayCircleOutlineIcon />{" "}
                                  </Box>
                                ) : (
                                  <Button className={styles.viwebtnmm3}>
                                    {/* <Touchable>dilet</Touchable> */}
                                    {row.status == "active" ? (
                                      <PauseCircleOutlineIcon />
                                    ) : (
                                      <PlayCircleOutlineIcon />
                                    )}
                                  </Button>
                                )}
                                {row.status == "exit" ? (
                                  <Box className={styles.viwebtnmm234}>
                                    {" "}
                                    <DeleteOutlineIcon />
                                  </Box>
                                ) : (
                                  <Button
                                    className={styles.viwebtnmm2}
                                    onClick={handleClickOpenCom}
                                  >
                                    <DeleteOutlineIcon />
                                  </Button>
                                )}
                              </div>
                              <div>
                                <Dialog
                                  open={com}
                                  onClose={handleCloseCom}
                                  className={styles.borderredayasfor}
                                  style={
                                    {
                                      // borderRadius: '30px'
                                    }
                                  }
                                  // fullWidth
                                  maxWidth="sm"
                                >
                                  <div>
                                    <DialogContent
                                      className={styles.popupcantenar}
                                    >
                                      <Box>
                                        <div>
                                          {" "}
                                          <CloseIcon />
                                        </div>
                                        <div className={styles.delehedar}>
                                          <Typography>
                                            Delete Successful
                                          </Typography>
                                        </div>
                                        <div>
                                          <img src="../../Group 47124.svg" />
                                        </div>
                                        <Divider></Divider>
                                        <div className={styles.accoparegarf}>
                                          <Typography>
                                            Are you sure you want to delete this
                                            account?
                                          </Typography>
                                        </div>
                                        <Divider></Divider>
                                        <div>
                                          <Button className={styles.cancelbtn}>
                                            Cancel
                                          </Button>
                                          <img src="../../Line 17.png" />
                                          <Button className={styles.cancelbtn2}>
                                            Delete
                                          </Button>
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
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        className={styles.tablePagination}
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
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
  );
};
// export default ResponsiveAppBar;
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
