import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import GridLayout from 'react-grid-layout';
// import FlexLayout from 'flexlayout-react'
import './UserTable.css';
import DataTable from './DataTable'
import Graph from './Graph';
import NewsTable from './NewsTable';
import SearchResults from './SearchResults';

const boxStyle = {
    backgroundColor: "white",
    border: "1px solid",
    borderRadius: "1%",
    borderColor: "grey",
    boxShadow: "5px 10px 8px #888888",
}

const boxContentStyle = {

}

const UserTable = (props) => {

  // const [ boxLayout, setBoxLayout] = useState()

  // const handleLayout = () => {
  //   setBoxLayout(null)
  // }

  // layout is an array of objects, see the demo for more complete usage
  const layout = [
    {i: 'a', x: 0, y: 0, w: 5, h: 1, static: false},
    {i: 'b', x: 1, y: 0, w: 3, h: 1},
    {i: 'c', x: 4, y: 0, w: 3, h: 1},
    {i: 'd', x: 1, y: 0, w: 3, h: 1},
    {i: 'z', x: 0, y: 0, w: 0, h: 0}
  ];

  return (
    <GridLayout className="layout" layout={layout} cols={12} width={1200} rowHeight={300}>
      <div key="a" style={boxStyle}>
        <DataTable style={{width: "100%", height: "100%", position: 'absolute'}}/>
      </div>
      <div key="b" style={boxStyle}>
        <Graph/>
      </div>
      <div key="c" style={boxStyle}>
        <NewsTable />
      </div>
        <div key={props.searchTerm.length > 0 ? "d" : 'z'}
        style={boxStyle}>
        <button onClick={props.clearSearch}>x</button>
        <SearchResults />
        </div>
    </GridLayout>
  )
}

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
})

export default connect(mapStateToProps, actions)(UserTable);