import React from 'react'
import UserTable from './UserTable'
import NavBar from './NavBar'

export const UserPage = (props) => {

    return (
        <>
            <div>
              <NavBar handleSignOut={props.handleSignOut}/>
            </div>
            <div>
                <UserTable/>
            </div>
        </>
    )
}

export default UserPage