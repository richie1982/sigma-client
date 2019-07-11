import React, { useState } from 'react'
// import { Button, Icon } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


const NavBar2 = (props) => {

    const useStyles = makeStyles(theme => ({
        margin: {
          marginRight: theme.spacing(1),
        },
        extendedIcon: {
          marginRight: theme.spacing(1),
        },
      }));
    
    const barStyle = {
        backgroundColor: 'black',
        color: 'white',
        width: 'auto',
        display: 'flex',
        height: '150px',
        position: 'fixed',
        justifyContent: 'flex-start'
    }

    const textStyle = {
        height: '100%',
        width: '50vw',
        color: 'white',
        textAlign: 'left',
        marginLeft: '20px', 
        marginTop: "30px",
        // display: 'block'
    }

    const spanStyle = {
        backgroundImage: "linear-gradient(to bottom right, #333333, #5A5454)",
        width: 'auto',
        height: '20px',

    } 

    const buttonDiv = {
        width: '50vw',
        height: '100%',
        alignItems: 'flex-start',
        // display: 'inline-block',
        // left: '300px',
        display: 'flex',
        justifyContent: 'flex-end'
    }

    const classes = useStyles();

    return (

        <div style={barStyle}>
            <div style={textStyle}>
                <h1 >
                    <Link to='/' style={{textDecoration: 'none', color: 'white', fontSize: '40px'}} >
                        Sigma
                    </Link>
                </h1>
                <h3 style={{padding: '0px'}}>Market data on demand</h3>
            </div>
            <div style={buttonDiv}>
                <Button size="large">
                    <Link to='/sign_up'style={{textDecoration: 'none', color: 'white'}}>
                        Sign Up
                    </Link>
                </Button>
                <div>
                {"|"}
                </div>
                <Button size="large">
                    <Link to='/log_in' style={{textDecoration: 'none', color: 'white'}}>
                        Log In
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default NavBar2