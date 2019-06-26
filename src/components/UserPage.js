import React from 'react'
import { connect } from 'react-redux'

export const UserPage = (props) => {
    return (
        <div>
            {props.user
            ? <h2>Welcome {props.user.first_name}</h2>
            :<p>No User</p>
            }
            <button
            type="submit"
            onClick={props.handleSignOut}
            >
            Sign Out
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    inventory: state.inventory
})

export default connect(mapStateToProps)(UserPage)