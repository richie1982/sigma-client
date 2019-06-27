import React, { Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import * as actions from './actions'
import HomePage from './components/HomePage';
import LogInForm from './components/LogInForm'
import UserPage from './components/UserPage';
import { validate, fetchInventory } from './services/api';

const pageStyle = {
  backgroundColor: 'grey',
  height: "600px",
  margin: "0",
  padding: "0"
}

export class App extends Component {

  setInventory = () => {
    fetchInventory()
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                this.props.getInventory(data)
            }
        })  
  }

  handleSignOut = () => {
    this.props.signOut()
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  componentDidMount() {
    if (localStorage.token) {
      validate()
        .then(data => {
          if (data.error) {
            alert(data.error)
          } else {
            this.props.getUser(data)
            localStorage.setItem('token', data.token)
            this.props.history.push('/landing')
            this.setInventory()
          }
        })
    }
  }
  
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={props => <HomePage  {...props}/>}/>
          <Route path='/log_in' component={props => <LogInForm {...props} />}/>
          <Route path='/landing' component={props => <UserPage handleSignOut={this.handleSignOut}/>}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  inventory: state.inventory
})

export default withRouter(connect(mapStateToProps, actions)(App));
