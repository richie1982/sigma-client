import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
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

  const handleSaveToInventory = () => {
      
    props.addInventory()
  }

  const rows = [
    props.companies.map(company => createData(company.name, company.symbol)),
  ];

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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows[0].map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.symbol}</TableCell>
              <TableCell>
                  <button onClick={null}>
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
    companies: state.companies.filter(company => company.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
  })
  
export default connect(mapStateToProps, actions)(SearchResults)
