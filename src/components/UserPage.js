import React, { useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UserTable from './UserTable'

const pageStyle = {
    backgroundColor: '#666666',
    margin: 0
}

export const UserPage = (props) => {

    return (
        <div style={pageStyle}>
            {props.user &&
                <h2 style={{ textAlign: 'left', margin: 0, color: "#e6e6e6", leftBorder: '10px', padding: '3px' }}>Welcome {props.user.first_name}</h2>}
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