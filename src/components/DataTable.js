import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { deleteProduct, fetchData2, } from '../services/api'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { removePropertiesDeep } from '@babel/types';

function createData(name, symbol, id) {
  return { name, symbol, id };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'calories', numeric: false, disablePadding: false, label: 'Symbol' },
  // { id: 'fat', numeric: true, disablePadding: false, label: 'Open' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Close' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Delete' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
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
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar style={{padding: 'none'}}
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title} >
          <Typography variant="h6" id="tableTitle" >
            Watch List
          </Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    // marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 450,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const DataTable = (props) => {

  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [ rows, setRows ] = useState([])
  const [ loading, setLoading ] = useState(false)


  const invt = props.inventory.map(product => createData(product.name, product.ticker, product.id))
  const rows = invt.filter((item, index) => invt.indexOf(item === index))

  const handleDeleteRow = (id) => {
      deleteProduct(id)
        .then(product => props.removeInventory(product))
  }

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
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
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
  }

  function handleChangeDense(event) {
    setDense(event.target.checked);
  }

  // const [ selectedProduct, setSelectedProduct ] = useState("")
  
  const importProductData = (ticker) => {
    props.selectProduct(ticker)
  }

  const { inventory } = props


  // const handleDataFetch = () => {
  //   const newArray = []
  //   productRows.map(product => {
  //     fetchData2(product.symbol)
  //       .then(data => {
  //         let newProduct = Object.assign(product, data)
  //         newArray.push(newProduct)
  //       })
  //     })
  //     setRows(newArray)
  // }


  // useEffect(() => {
  //   setLoading(true)
  //   handleDataFetch()
  //   setLoading(false)
  //   // console.log(rows)
  // }, [inventory])
  
  // useEffect(() => {
  //   // props.updateInventory(rows)
  //   setTimeout(() => console.log(rows), 2000)
  // }, [rows])


  // useEffect(() => {
  //   fetchData(props.selectedProduct)
  //     .then(data => {
  //       if (data.error) {
  //         alert(data.error)
  //       } else {
  //         props.getData(data)
  //       }
  //     })
  // }, [selectedProduct])

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // rows.map(row => console.log(row.id))
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              
              {!loading &&
                stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => importProductData(row.symbol)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      // selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="2px">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.symbol}</TableCell>
                      {/* <TableCell align="right">{row.fat}</TableCell> */}
                      {/* <TableCell align="right">{row.carbs}</TableCell> */}
                      <TableCell align="right">
                      <div className={classes.actions} onClick={() => handleDeleteRow(row.id)}>
                        <Tooltip title="Delete">
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}


const mapStateToProps = (state) => ({
  dataInventory: state.updatedInventory,
  inventory: state.inventory.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []),
  companies: state.companies.filter(company => company.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
})

export default connect(mapStateToProps, actions)(DataTable)

