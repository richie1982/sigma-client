import React, { Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import * as actions from './actions'
import HomePage from './components/HomePage';
import LogInForm from './components/LogInForm'
import UserPage from './components/UserPage';
import { validate, fetchInventory, fetchCompany, fetchIntraDayData, fetchNews1, fetchData2 } from './services/api';
import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm';

const pageStyle = {
  backgroundColor: 'grey',
  height: "600px",
  margin: "0",
  padding: "0"
}

export class App extends Component {

  state = {
    loading: false
  }

  setInventory = async () => {
    await fetchInventory()
        .then((data) => {
            if (data.error) {
                alert(data.error)
            } else {
                data.map((product) => {
                  fetchData2(product.ticker)
                    .then(stock => {
                      let newProduct = Object.assign(product, stock)
                      this.props.addInventory(newProduct)
                    })
                })
            }
        })
  }

  importCompanyData = () => {
    fetchCompany()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.props.getCompanies(data)
        }
      })
  }

  importProductData = (query) => {
    fetchIntraDayData(query)
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.props.getData(data)
        }
      })
  }

  importNewsData = () => {
    fetchNews1()
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          this.props.getNews(data.posts)
        }
      })
  }

  handleValidation = () => {
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

  handleSignOut = () => {
    this.props.signOut()
    this.props.clearInventory()
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  componentDidMount() {
    this.importNewsData()
    // this.importProductData("AAPL")
    this.importCompanyData()
    if (localStorage.token) {
      this.handleValidation()
    }
  }

  render () {
    return (
      <div>
        <NavBar handleSignOut={this.handleSignOut}/>
        <Switch>
          <Route exact path='/' component={props => <HomePage  {...props}/>} />
          <Route path='/sign_up' component={props => <SignUpForm {...props}/>}/>
          <Route path='/log_in' component={props => <LogInForm setInventory={this.setInventory} {...props} />}/>
          <Route path='/landing' component={props => <UserPage {...props}/>}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  selectedProduct: state.selectedProduct,
  inventory: state.inventory,
  companies: state.companies.filter(company => company.name.toLowerCase().includes(state.searchTerm.toLowerCase())),
})

export default withRouter(connect(mapStateToProps, actions)(App));
