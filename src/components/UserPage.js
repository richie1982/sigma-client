import React, { useState, useEffect  } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UserTable from './UserTable'
import NavBar from './NavBar'

const pageStyle = {
    margin: 0
}

export const UserPage = (props) => {

    return (
        <div>
            <div>
              <NavBar handleSignOut={props.handleSignOut}/>
            </div>
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