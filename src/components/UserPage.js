import React, { useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UserTable from './UserTable'

const pageStyle = {
    backgroundColor: '#C4C5C6',
    height: "600px",
    margin: "0",
    padding: "0"
}




export const UserPage = (props) => {

    return (
        <div style={pageStyle}>
            {props.user &&
                <h2>Welcome {props.user.first_name}</h2>}
            <button
            type="submit"
            onClick={props.handleSignOut}
            >
            Sign Out
            </button>
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