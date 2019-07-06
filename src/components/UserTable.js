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
  width: "100%", 
  height: "100%", 
  position: 'absolute',
  display: 'flex', 
  justifyContent: 'space-around'
}

const UserTable = (props) => {

  const [ showNews, setShowNews ] = useState(false)
  const [ content, setContent ] = useState('')
  // const [ layout, setLayout] = useState([
  //   {i: 'a', x: 0, y: 0, w: 3, h: 3.8, minH: 3.8},
  //   {i: 'b', x: 5, y: 0, w: 3, h: 4.5, isResizable: false},
  //   {i: 'c', x: 0, y: 5, w: 2, h: 3.55, minH: 3.55},
  //   // {i: 'd', x: 5, y: 5, w: 2, h: 1},
  //   {i: 'e', x: 5, y: 4, w: 5, h: 1}
  // ])


  const displaySearchWindow = () => {
    props.updateLayout()
    return (
      <div key='d' style={boxStyle}>
        <SearchResults style={boxContentStyle}/>
      </div>
    )
  }

  // const closeNewsWindow = () => {
  //   setContent('')
  //   setLayout(layout.filter(el => el.i !== 'e'))
  //   // setShowNews(false)
  // }
  // layout is an array of objects, see the demo for more complete usage
  // const layout = [
    
  //   
  //   
  // ];



  return (
    <GridLayout className="layout" layout={props.gridLayout}
     cols={6} 
     rowHeight={100}
     width={1200}
     autoSize={true}
     >
      <div key="a" style={boxStyle}>
        <DataTable style={boxContentStyle}/>
      </div>

      <div key="b" style={boxStyle}>
        <Graph style={boxContentStyle}/>
      </div>

      <div key="c" style={boxStyle}>
        <NewsTable setShowNews={setShowNews} setContent={setContent} style={boxContentStyle}/>
      </div>

      {
        <div key={"d"}
        style={boxStyle}>
        <button onClick={props.clearSearch}>x</button>
        {props.searchTerm && <SearchResults />}
      </div>}

        <div key={showNews ? 'e' : null} style={boxStyle}>
        <button onClick={null}>x</button>
        <span style={boxContentStyle} >
        <p style={boxContentStyle}>{content}</p>
        </span>
        </div>
    </GridLayout>
  )
}

const mapStateToProps = state => ({
  searchTerm: state.searchTerm,
  gridLayout: state.layout
})

export default connect(mapStateToProps, actions)(UserTable);