import React,{useState} from 'react'
import { 
    TableCell, TableContainer,TableRow,Table,ButtonGroup,
    TableBody, Button, Paper, TableFooter, TablePagination, 
} from '@material-ui/core';
import useStyles from './TableStyle';
import CustomTableHead from './CustomTableHead';
import CustomTablePaginationActions from './CustomTablePaginationActions';

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
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function CustomTable(props) {
    const {headerArray,dataNameArray,dataArray,actions} = props;
    const classes = useStyles();
    const [rowsPerPage,setRowsPerPage] = useState(5);
    const [page,setPage] = useState(0);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataArray.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                <CustomTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headingData={headerArray}
                />
                <TableBody>
                    {
                        (
                            rowsPerPage > 0
                            ? stableSort(dataArray,
                                getComparator(order,orderBy))
                                .slice(page * rowsPerPage,page*rowsPerPage+rowsPerPage)
                            : stableSort(dataArray,getComparator(order,orderBy))
                        ).map((item) => (
                            <TableRow key={item._id}>
                                {
                                    dataNameArray.map(option => (
                                        <TableCell 
                                            key={option} 
                                            align="left" 
                                            className={
                                                `
                                                ${classes.bodyCells}
                                                ${
                                                    item[option] === "pending" ?
                                                    classes.colorRed :
                                                    item[option] === "approved" ?
                                                    classes.colorGreen :
                                                    null
                                                }
                                                `
                                            }
                                        >
                                            {item[option]}
                                        </TableCell>
                                    ))
                                }
                                <TableCell align="center">
                                    <ButtonGroup 
                                        orientation={actions.length > 2 ? 
                                            "vertical": "horizontal"
                                        }
                                        variant="contained"
                                        disableElevation
                                    >
                                    {
                                        actions.map(action => (
                                            <Button 
                                                color={action.name === "Delete" ? 
                                                "secondary" : "primary"
                                                } 
                                                key={action.name}
                                                onClick={() => {action.clickHandler(item)}}
                                            >
                                                {action.name}
                                            </Button>
                                        ))
                                    }
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>

                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={8}
                            count={dataArray.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={CustomTablePaginationActions}
                        />
                    </TableRow>

                </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default CustomTable
