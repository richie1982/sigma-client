import React, { Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import * as actions from './actions'
import HomePage from './components/HomePage';
import LogInForm from './components/LogInForm'


export class App extends Component {

  render () {

    return (
      <div>
      <Switch>
          <Route exact path='/' component={props => <HomePage  {...props}/>}/>
          <Route path='/log_in' component={props => <LogInForm {...props}/>}/> 
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
