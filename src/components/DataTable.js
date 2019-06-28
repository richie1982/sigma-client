import React, { useState }from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import * as actions from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 450,
  },
}));

function createData(name, symbol) {
  return { name, symbol };
}


const DataTable = (props) => {
  // const [ filteredCompanies, setFilteredCompanies ] = useState([])
  // setFilteredCompanies([...props.companies])

  const rows = [
    props.companies.map(company => createData(company.name, company.symbol)),
  ];


  const classes = useStyles();
  // console.log(rows[0][0])
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[0].map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  companies: state.companies.filter(company => company.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
})

export default connect(mapStateToProps, actions)(DataTable)
