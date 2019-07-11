import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Loader from './Loader'
import { TableHead } from '@material-ui/core';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(title, uuid, published, text) {
  return { title, uuid, published, text };
}

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing(3),
  },
  table: {
    backgroundColor: "#3e4444",
    minWidth: "100%",
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const NewsTable = (props) => {

  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ loading, setLoading ] = useState(true)

  const handleLoading = () =>  {
    rows.length > 0 &&
      setLoading(false) 
  }

  const loaderStyle = {
    position: 'relative', 
    marginTop: '100px', 
    width: '100%', 
    textAlign: 'center', 
    display: 'block', 
    height: 'auto',
    backgroundColor: "#3e4444"
}
  
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  const rows = props.news.map(story => 
    createData(story.title, story.uuid, story.published, story.text)).sort((a, b) => (a.published < b.published ? 1 : -1));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  const override = {
    margin: 100
  }
  
  useEffect(() => {
    handleLoading()
  }, [])

  return (
    <Paper className={classes.root}>
    {loading
        ? <div style={loaderStyle}>
          <Loader	
              />
        </div>
      : <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
          <TableCell
            align={'left'}
            padding={'default'}
            style={{color: "#f2f2f2", fontSize: '1em', fontStyle: 'italic'}}
          >
            News Headlines
          </TableCell>
          </TableHead>
          <TableBody>
            {rows.filter(el => el.title.length > 0).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.uuid}>
                <TableCell style={{color: "#f2f2f2"}} component="th" scope="row" onClick={() => props.handleNewsModal(row)}>
                  {
                    row.title.length > 0
                  ? row.title
                  :"No title... Click here for Content"
                  }
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter >
            <TableRow>
              <TablePagination
                style={{color: "#f2f2f2"}}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'Rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    }
    </Paper>
    
  );
}

const mapStateToProps = (state) => ({
    news: state.newsData
})

export default connect(mapStateToProps)(NewsTable)