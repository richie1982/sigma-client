import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { saveProduct, fetchData2 } from '../services/api'
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
    backgroundColor: 'grey',
  },
  table: {
    minWidth: 450,
  },
}));

const createData = (name, symbol) => {
  return { name, symbol };
}


const SearchResults = (props) => {

  const handleSaveToInventory = (name, symbol, email) => {
    saveProduct(name, symbol, email)
        .then(data => {
          fetchData2(data.ticker)
            .then(stock => {
              if (!props.inventory.find(el => el.id === data.id)) {
                let newProduct = Object.assign(data, stock)
                props.addInventory(newProduct)
              } else {
                alert("Stock already in inventory")
              }
            })
        })
  }

  // 

  const rows = props.companies.map(company => createData(company.name, company.symbol)).slice(0, 5)

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {/* <button onClick={closeTab}>x</button> */}
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            <TableCell style={{color: 'white'}}>Name</TableCell>
            <TableCell align="left" style={{color: 'white'}}>Symbol</TableCell>
            <TableCell align="left" style={{color: 'white'}}>Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" style={{color: 'white'}}>
                {row.name}
              </TableCell>
              <TableCell align="left" style={{color: 'white'}}>{row.symbol}</TableCell>
              <TableCell align="left" >
                  <button onClick={(e) => {
                    e.preventDefault()
                    handleSaveToInventory(row.name, row.symbol, props.user.email)
                    }}
                    >
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
    inventory: state.inventory,
    companies: state.companies.filter(company => company.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
  })
  
export default connect(mapStateToProps, actions)(SearchResults)
