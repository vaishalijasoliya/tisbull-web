import styles from './accounttype.module.scss'
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
// import { Avatar, Box, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import React, { useState } from "react";
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment'
import Divider from '@mui/material/Divider';
import CsvDownloader from 'react-csv-downloader';
import { CSVLink, CSVDownload } from 'react-csv';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TablePagination from '@mui/material/TablePagination';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Avatar,Box, Button, Typography, TableFooter, useTheme } from '@mui/material';
import PropTypes from "prop-types";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import { Types } from '../../constants/actionTypes'
// import { connect } from 'react-redux';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
interface Data {
    // calories: number;
    // carbs: number;
    // fat: number;
    Script: string;
    NSE: string;
    Type: string;
    consumer_key: number;
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
    consumer_key: number,
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
        consumer_key,
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

// const rows = [
//     createData('Cupcake', 'uqwdgasd', 'hyggg', 3.7, 67, 4.3, '01-10-2022', 'Active'),
//     // createData('Donut', 452, 25.0, 51, 4.9),
//     // createData('Eclair', 262, 16.0, 24, 6.0),
//     // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     // createData('Gingerbread', 356, 16.0, 49, 3.9),
//     // createData('Honeycomb', 408, 3.2, 87, 6.5),
//     // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     // createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     // createData('KitKat', 518, 26.0, 65, 7.0),
//     // createData('Lollipop', 392, 0.2, 98, 0.0),
//     // createData('Marshmallow', 318, 0, 81, 2.0),
//     // createData('Nougat', 360, 19.0, 9, 37.0),
//     // createData('Oreo', 437, 18.0, 63, 4.0),
// ];

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

const headCells: readonly HeadCell[] = [
    {
        id: 'Type',
        numeric: false,
        disablePadding: true,
        label: 'Type',
    },
    {
        id: 'Environments',
        numeric: true,
        disablePadding: false,
        label: 'User ID',
    },
    {
        id: 'Consumer Key',
        numeric: true,
        disablePadding: false,
        label: 'Consumer Key',
    },
    {
        id: 'consumer_secret',
        numeric: true,
        disablePadding: false,
        label: 'Consumer Secret',
    },
    // {
    //     id: 'User ID',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'User ID',
    // },
    // {
    //     id: 'Created',
    //     numeric: true,
    //     disablePadding: false,
    //     label: 'Consumer Secret',
    // },
    {
        id: 'Last Login',
        numeric: true,
        disablePadding: false,
        label: 'Last Login',
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
const csvData = [
    ['firstname', 'lastname', 'email'],
    ['John', 'Doe', 'john.doe@xyz.com'],
    ['Jane', 'Doe', 'jane.doe@xyz.com']
];
const ResponsiveAppBar = (props) => {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    // const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [com, setCom] = React.useState(false);
    const [datatebal, setDatatebal] = React.useState([]);
    const [dense, setDense] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [teballist, setTeballist] = React.useState([])
    const openlightbox = (index) => {
        console.log(index);
        setCurrentIndex(index);
        setopen(true);
    };
    var handleClickOpenCom = (myprops) => {
        setCom(true);
        // console.log(advertiseMent, startDate, endDate, image, 'hello data')
        // myprops = { advertiseMent }
    };
    const handleCloseCom = () => {
        setCom(false);
    }
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const accounttype = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        // var body = { type: 'active' }
        // if (!!startDate && !!endDate) {
        //     body.start_day = moment(startDate).format("MM/DD/YYYY")
        //     body.end_day = moment(endDate).format("MM/DD/YYYY")
        // }
        // console.log(body, 'body');
        props.props.loaderRef(true)
        var data = await ApiServices.GetApiCall(ApiEndpoint.ACCOUNT_LIST, headers)

        // const data = await ApiServices.PostApiCall(ApiEndpoint.ACCOUNT_LIST, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        console.log(props.props.profile.token, 'datadfsf');

        if (!!data) {
            if (data.status == true && data.data.length > 0) {
                const accoyty = [];
                const csvall = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                    const object = {
                        id: element.id,
                        logoUrl: element.logoUrl,
                        password: element.password,
                        // type: element.type,
                        user_id: element.user_id,
                        consumer_key: element.consumer_key,
                        consumer_secret: element.consumer_secret,
                        id_user: element.id_user,
                        zerodha_token_update: element.zerodha_token_update
                    }
                    console.log(element, 'password');

                    accoyty.push(JSON.parse(JSON.stringify(object)))
                }
                setDatatebal(accoyty)
                setTeballist(accoyty)
            }
        }
    }

    // let inloglist=datatebal.zerodha_token_update

    console.log(datatebal, 'datatebal');

    React.useEffect(() => {
        if (!!props.profile && !!props.profile.token) {
            accounttype()
        }
    }, [])

    // const handleRequestSort = (
    //     event: React.MouseEvent<unknown>,
    //     property: keyof Data,
    // ) => {
    //     const isAsc = orderBy === property && order === 'asc';
    //     setOrder(isAsc ? 'desc' : 'asc');
    //     setOrderBy(property);
    // };
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datatebal.length) : 0;
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = datatebal.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    return (
        <Grid container className={styles.cantenar_list22}>
            {/* <Divider className={styles.devatdar}/> */}
            <Grid item md={6} sm={12} xs={12} className={styles.padimgtebal}>

                <Typography className={styles.accolistp}>
                    Account
                </Typography>
            </Grid>
            <Grid item md={6} sm={12} xs={12} className={styles.batntextend}>
                <div>
                    <Button className={styles.addbtnkk}>
                        Create account
                    </Button>
                </div>
            </Grid>
            <Grid item sm={12} md={6} xs={12} className={styles.padimgtebal2}>
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

            <Grid item md={6} sm={12} xs={12} className={styles.padimgtebal3} display={'flex'} justifyContent={'end'} alignItems={'center'}>
                {/* <CsvDownloader data={list}> */}
                <CSVLink className={styles.btnsaveic} data={datatebal} filename={"account.csv"}> <SaveAltIcon /></CSVLink>
                {/* <Button className={styles.btnsaveic}>  */}


                {/* <CSVDownload  filename={"user.csv"} clssName={styles.csvlinkfor}> */}


                {/* </CSVDownload> */}
                {/* </Button> */}
                {/* </CsvDownloader> */}
                <Button><img src='../../Vector (3).svg' /></Button>
            </Grid>
            <Grid item md={12} sm={12} xs={12} >
                <Box className={styles.boxlistnum} sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                        <TableContainer className={styles.cantenartebal}>
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
                                    // onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={datatebal.length}
                                />
                                <TableBody>
                                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                                    {stableSort(datatebal, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.type);
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
                                                    >
                                                        {/* <div> */}
                                                        <Avatar src={row.logoUrl} />
                                                        {/* {row.type} */}
                                                        {/* </div> */}
                                                        {/* <div className={styles.nselist}><Typography>{row.NSE}</Typography></div> */}
                                                    </TableCell>
                                                    <TableCell
                                                    // align="right"
                                                    >{row.user_id}</TableCell>
                                                    <TableCell >{row.consumer_key.replace(/.(?=.{4,}$)/g, '*').substr(row.consumer_key.length - 10)}</TableCell>
                                                    <TableCell >{row.consumer_secret.replace(/.(?=.{4,}$)/g, '*').substr(row.consumer_secret.length - 10)}</TableCell>
                                                    {/* <TableCell >{row.id_user}</TableCell> */}
                                                    {/* <TableCell >
                                                        {row.password}
                                                    </TableCell> */}
                                                    <TableCell>
                                                        <Button><img src='../../History.svg' /></Button>
                                                        {/* {row.zerodha_token_update} */}
                                                    </TableCell>
                                                    {/* <TableCell> */}
                                                    {/* <Button className={styles.listststu}>{row.Status}</Button></TableCell> */}

                                                    <TableCell >
                                                        <Button className={styles.menu2btn} onClick={handleClickOpenCom}>

                                                            <MoreVertIcon />
                                                        </Button>
                                                        <div>
                                                            <Dialog open={com} onClose={handleCloseCom}
                                                                className={styles.borderredayasfor}
                                                                style={{
                                                                    // borderRadius: '30px'
                                                                }}
                                                                // fullWidth
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
                                                                                <Typography>Are you sure you want to delete
                                                                                    this account?</Typography>
                                                                            </div>
                                                                            <Divider>

                                                                            </Divider>
                                                                            <div><Button className={styles.cancelbtn}>Cancel</Button><img src='../../Line 17.png' /><Button className={styles.cancelbtn2}>Delete</Button></div>
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
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
                            </Table>

                        </TableContainer>
                        {/* <TablePagination
                            component="div"
                            //   count={datatebal.length}
                            //   onPageChange={handlePageChange}
                            //   onRowsPerPageChange={handleLimitChange}
                            //   page={page}
                            //   rowsPerPage={limit}
                            rowsPerPageOptions={[5, 10, 25]}
                        /> */}
                    </Paper>
                </Box>
            </Grid>
        </Grid >
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