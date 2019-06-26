import React, { useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UserTable from './UserTable'



export const UserPage = (props) => {


    return (
        <div>
            {props.user &&
                <h2>Welcome {props.user.first_name}</h2>}
            <button
            type="submit"
            onClick={props.handleSignOut}
            >
            Sign Out
            </button>
            <UserTable/>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.user,
    inventory: state.inventory
})

export default connect(mapStateToProps, actions)(UserPage)