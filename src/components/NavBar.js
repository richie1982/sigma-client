import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../actions'
import Popup from "reactjs-popup"
import SearchResults from './SearchResults'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const buttonStyle = {
  color: "white",
  textDecoration: "none",
}

const modalStyle = {
  borderRadius: "1%",
  boxShadow: "5px 10px 8px #888888",
  width: 'auto',
  padding: '0px'
}

const NavBar = (props) =>  {

  const classes = useStyles();
  const [ searchParam, setSearchParam ] = useState("")
  const [ open, setOpen ] = useState(false)
  
  const searchHandle = (e) => {
    setSearchParam(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setOpen(true)
    props.updateSearch(searchParam)
    setSearchParam("")
  }

  const closeModal = () => {
    setOpen(false)
  }
  
  // const handleSearch = (e) => {
  //   e.preventDefault()
  //   props.updateSearch(searchParam)
  //   setSearchParam("")
  //   props.updateLayout({i: 'd', x: 5, y: 5, w: 2, h: 1})
  //   // props.clearSearch()
  // }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {!props.user
              ? <div>
              <Link to='/log_in' style ={buttonStyle}>{"Sign In  "}</Link> {"|"}
              <Link to='/sign_up' style ={buttonStyle}>{"  Create Account"}</Link>
              </div>
              :<Link to='/' style ={buttonStyle} onClick={props.handleSignOut}>Sign Out</Link>
              }
          </Typography>
          {props.user &&
            <form className={classes.search} onSubmit={handleSearch}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                value={searchParam}
                onChange={searchHandle}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
              <Popup
                open={open}
                closeOnDocumentClick
                onClose={closeModal}
                position={"top center"}
                contentStyle={modalStyle}
              >
                <span>
                <SearchResults />
                </span>
              </Popup>
            </form>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}


const mapStateToProps = state => ({
    searchTerm: state.searchTerm,
    user: state.user,
    companies: state.companies.filter(company => company.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
})
  

export default connect(mapStateToProps, actions)(NavBar)