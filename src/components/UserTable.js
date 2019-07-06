import React, { useState } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import GridLayout from 'react-grid-layout';
import './UserTable.css';
import DataTable from './DataTable'
import Graph from './Graph';
import NewsTable from './NewsTable';
import SearchResults from './SearchResults';
import Popup from "reactjs-popup"

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

const modalStyle = {
  borderRadius: "1%",
  boxShadow: "5px 10px 8px #888888",
  width: 'auto', 
  fontSize: '13px',
}

const UserTable = (props) => {

  const [ content, setContent ] = useState('')
  const [ layout, setLayout] = useState([
    {i: 'a', x: 0, y: 0, w: 3, h: 3.8, minH: 3.8},
    {i: 'b', x: 5, y: 0, w: 3, h: 4.5, isResizable: false},
    {i: 'c', x: 0, y: 5, w: 2, h: 3.55, minH: 3.55},
    // {i: 'd', x: 2, y: 5, w: 3, h: 1, minH: 3}
    // {i: 'e', x: 5, y: 4, w: 5, h: 2}    
  ])

  const [ open, setOpen ] = useState(false)

  const closeNewsModal = () => {
    setOpen(false)
    setLayout(layout.filter(el => el.i !== 'd'))
  }

  const handleNewsModal = (text) => {
    setContent(text)
    layout.find(el => el.i === 'd') 
      ? setLayout([...layout])
      : setLayout([...layout, {i: 'd', x: 2, y: 5, w: 3, h: 1, minH: 3}])
    setOpen(true)
  }

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
    <GridLayout className="layout" layout={layout}
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
        <NewsTable handleNewsModal={handleNewsModal} style={boxContentStyle}/>
      </div>

      
      {/* <div key={'d'}
        style={boxStyle}>
        <button onClick={props.clearSearch}>x</button>
        <SearchResults />
      </div> */}
      
        <div key={'d'} style={{borderRadius: "2%"}}>
      <Popup
            open={open}
            closeOnDocumentClick
            onClose={closeNewsModal}
            position={'right center'}
            contentStyle={modalStyle}
          >
            <div className="modal" >
              <a className="close" onClick={closeNewsModal} >
                &times;
              </a>
              {content}
            </div>
          </Popup>
        </div>
    </GridLayout>
  )
}

const mapStateToProps = state => ({
  searchTerm: state.searchTerm,
  gridLayout: state.layout
})

export default connect(mapStateToProps, actions)(UserTable);