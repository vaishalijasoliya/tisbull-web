// import Head from 'next/head'
// import Image from 'next/image'
import React, { useState } from "react";
import styles from './Stocks.module.scss'
import Grid from '@mui/material/Grid';
// import Newbar from '../componehts/newbar/newbar';
// import Stocks from '../componehts/Stocks/Stocks';
import { Box, Button, Typography } from '@mui/material';
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
// import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import moment from 'moment'
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { Types } from '../../constants/actionTypes'
import { connect } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { shouldDisplay } from "rsuite/esm/Picker";
import { setDate } from "rsuite/esm/utils/dateUtils";
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
    Status: string,
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
    createData('Cupcake', 'uqwdgasd', 'hyggg', 3.7, 67, 4.3, '01-10-2022', 'Active'),
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
        id: 'Status',
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
                <TableCell padding="checkbox">
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
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

//   const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//     const { numSelected } = props;

//     return (
//       <Toolbar
//         sx={{
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//           ...(numSelected > 0 && {
//             bgcolor: (theme) =>
//               alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//           }),
//         }}
//       >
//         {numSelected > 0 ? (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             color="inherit"
//             variant="subtitle1"
//             component="div"
//           >
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             variant="h6"
//             id="tableTitle"
//             component="div"
//           >
//             Nutrition
//           </Typography>
//         )}
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton>
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Toolbar>
//     );
//   };

const ResponsiveAppBar = (props) => {
    const [value, setValue] = React.useState('1');

    const [arrolist, setArrolist] = useState(true);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [datatebalpettan, setDatatebalpettan] = React.useState([]);
    const [data,setData] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const patternlist = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        
        props.props.loaderRef(true)
        var data = await ApiServices.GetApiCall(ApiEndpoint.PATTERN_LIST, headers)

        // const data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(data, 'datalist');

    if (!!data) {
        if (data.status == true && data.data.length > 0) {
            const accoyty = [];
            const datalist = [];
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
                    status: element.status
                }
                console.log(object, 'password');
                datalist.push(JSON.parse(JSON.stringify(object)))
                accoyty.push(JSON.parse(JSON.stringify(object)))
                // csvall.push(objectcsv)
            }
            setDatatebalpettan(accoyty)
            setData(data)
        }
       
    }
}

    // let inloglist=datatebal.zerodha_token_update

    console.log(data.exchange, 'datatebalpettan');

    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            patternlist()
        }
    }, [])

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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container spacing={0} className={styles.cantenar_list}>
            <Grid item sm={12} md={3} xs={12}>
                <Box className={styles.boxlist1}>
                    <div>
                        <Avatar className={styles.actarlis}>
                            <CardTravelIcon />
                        </Avatar>
                    </div>
                    <div>
                        <Typography className={styles.totallist}>
                            Total Investments
                        </Typography>
                        <Typography className={styles.totallist2}>
                            {data.total}
                        </Typography>
                    </div>
                </Box>
            </Grid>
            <Grid item sm={12} md={3} xs={12}>
                <Box className={styles.boxlist1}>
                    <div>
                        <Avatar className={styles.actarlis}>
                         
                              {/* {data.todayProfit ==0  ?
                                
                                '':
                                ''
                            } */}
                               {data.todayProfit >= 0 ?
                                
                                <NorthIcon className={styles.listarrored2} />:
                                <SouthIcon className={styles.listarrored} /> 
                            }
                        </Avatar>
                    </div>
                    <div>
                        <Typography className={styles.totallist}>
                            Total Profit
                        </Typography>
                        <Typography className={styles.totallist2}>
                            {data.todayProfit}
                        </Typography>
                    </div>
                </Box>
            </Grid>
            <Grid item sm={12} md={3} xs={12}>
                <Box className={styles.boxlist1}>
                    <div>
                        <Avatar className={styles.actarlis}>
                            {data.totalProfit >=0 ?
                                 
                                <NorthIcon className={styles.listarrored2} />:
                                <SouthIcon className={styles.listarrored} />
                            }
                             {/* {data.totalProfit ==0 ?
                                 
                                 <NorthIcon className={styles.listarrored2} />:
                                 <SouthIcon className={styles.listarrored} />
                             } */}
                        </Avatar>
                    </div>
                    <div>
                        <Typography className={styles.totallist}>
                            Today’s Profit
                        </Typography>
                        <Typography className={styles.totallist2}>
                            {data.totalProfit}
                        </Typography>
                    </div>
                </Box>
            </Grid>
            <Grid item md={3} sm={0} xs={0}></Grid>
            <Grid item md={12} sm={12} xs={12} className={styles.boxteballist}>
                {/* <Box> */}
                <div className={styles.listmeniom}>
                    <Grid item md={4}>
                        <Box className={styles.boxreting} display={'flex'}>

                            <input type="text" id='myserchbtn' name="search" placeholder="Search" className={styles.searchbtn} autoComplete="off"
                            // onChange={(e) => {
                            //   setPage(0)
                            //   var value = e.target.value
                            //   if (typeof value !== 'object') {
                            //     if (!value || value == '') {
                            //       setCustomer(customerList);
                            //     } else {
                            //       var filteredData = customerList.filter((item) => {
                            //         let searchValue = item.Name.toLowerCase();
                            //         return searchValue.includes(value.toString().toLowerCase())
                            //       })
                            //       setCustomer(filteredData);
                            //     }
                            //   }
                            // }} 
                            />
                        </Box>
                    </Grid>
                    <Grid item md={2}>
                        <Button className={styles.filterlist}>
                            <Typography>
                                Filter
                            </Typography>
                            <ExpandMoreIcon />
                        </Button>
                    </Grid>
                    <Grid md={6} display={'flex'} justifyContent={'end'}>
                        <Button className={styles.cerbatn}>
                            Create New Patterm
                        </Button>
                    </Grid>
                </div>
                <Grid item md={12}>
                    <Box >
                        <ThemeProvider theme={tabtheme}>
                            <TabContext value={value}  >

                                <TabList onChange={handleChange} aria-label="lab API tabs example"
                                    value={value}
                                    theme={tabtheme}

                                    // textColor="#318D8C"
                                    // indicatorColor="#8E8E8E"
                                    // onChange={handleChange}
                                    TabIndicatorProps={{
                                        style: {
                                            borderRadius: '3px',
                                            border: '1px solid #009947',
                                            textColor: '#009947',
                                            backgroundColor: "#009947",
                                        }
                                    }}
                                    aria-label="secondary tabs example" className={styles.maenteb}>
                                    <Tab label="All" className={styles.nametabs1} value="1" />
                                    <Tab label="Basic Pattern" className={styles.nametabs1} value="2" />
                                    <Tab label="Custom Pattern" className={styles.nametabs1} value="3" />
                                </TabList>
                            </TabContext>
                        </ThemeProvider>
                    </Box>
                </Grid>
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
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={datatebalpettan.length}
                                    />
                                    <TableBody>
                                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                                        {stableSort(datatebalpettan, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.datatebalpettan);
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
                                                                onClick={(event) => handleClick(event, row.id)}
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{
                                                                    'aria-labelledby': labelId,
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            // component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        ><div>
                                                                {row.script}
                                                            </div>
                                                            <div className={styles.nselist}><Typography>{row.exchange}</Typography></div>
                                                        </TableCell>
                                                      
                                                        <TableCell
                                                        // align="right"
                                                        >{row.type_pattern}</TableCell>
                                                        <TableCell >{row.investment}</TableCell>
                                                        <TableCell >{row.profit}</TableCell>
                                                        <TableCell >{row.stock}</TableCell>
                                                        <TableCell >
                                                            <Typography className={styles.dateone}>{
                                                                moment(row.created_at).format("DD-MM-YYYY")
                                                            } </Typography></TableCell>

                                                        <TableCell><Button className={styles.listststu}>{row.status}</Button></TableCell>

                                                        <TableCell >
                                                            <Button>

                                                                <MoreVertIcon />                                                        </Button>
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
