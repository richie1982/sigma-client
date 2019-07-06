import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { saveProduct } from '../services/api'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 450,
  },
}));

function createData(name, symbol) {
  return { name, symbol };
}


const SearchResults = (props) => {

  const handleSaveToInventory = (name, symbol, email) => {
    saveProduct(name, symbol, email)
        .then(data => props.addInventory(data))
  }

  const rows = props.companies.map(company => createData(company.name, company.symbol))

  const closeTab = () => {
    props.clearSearch()
  }

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {/* <button onClick={closeTab}>x</button> */}
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">+</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.symbol}</TableCell>
              <TableCell align="left">
                  <button onClick={() => handleSaveToInventory(row.name, row.symbol, props.user.email)}>
                  SAVE
                  </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
    user: state.user,
    inventory: state.inventory.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []),
    companies: state.companies.slice(1, 100).filter(company => company.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
  })
  
export default connect(mapStateToProps, actions)(SearchResults)
