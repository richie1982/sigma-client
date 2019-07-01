import React, { useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UserTable from './UserTable'
// import Socket from './Socket';

const pageStyle = {
    backgroundColor: '#C4C5C6',
    margin: 0
}




export const UserPage = (props) => {

    return (
        <div style={pageStyle}>
            {props.user &&
                <h2 style={{margin: 0}}>Welcome {props.user.first_name}</h2>}
            <div>
            <UserTable/>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.user,
    inventory: state.inventory
})

export default connect(mapStateToProps, actions)(UserPage)