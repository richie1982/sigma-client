import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const buttonStyle = {
  textDecoration: "none",
  color: "white"
}

export function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
        <Typography>
          {props.user
          ? <Link to='/' style ={null}>Sign Out</Link>
          :<div>
           <Link to='/log_in' style ={buttonStyle}>{"Sign In  "}</Link> {"|"}
          <Link to='/sign_up' style ={buttonStyle}>{"  Create Account"}</Link>
          </div>
          }
        </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, actions)(NavBar)