import React, { useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UserTable from './UserTable'

const pageStyle = {
    backgroundColor: '#C4C5C6',
}




export const UserPage = (props) => {

    return (
        <div style={pageStyle}>
            {props.user &&
                <h2>Welcome {props.user.first_name}</h2>}
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