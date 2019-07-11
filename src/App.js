import React, { Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import * as actions from './actions'
import HomePage2 from './components/HomePage2';
import LogInForm from './components/LogInForm'
import UserPage from './components/UserPage';
import { validate, fetchInventory, fetchCompany, fetchIntraDayData, fetchNews1, fetchData2 } from './services/api';
import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm';
import NavBar2 from './components/Navbar2';

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

  updateInventoryData = () => {
    this.props.inventory.map(product => {
      fetchData2(product.ticker)
        .then(stock => {
          this.props.updateInventoryData(stock)
        })
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
            localStorage.removeItem('token')
          } else {
            this.props.getUser(data)
            localStorage.setItem('token', data.token)
            this.props.history.push('/landing')
            this.setInventory()

          }
        })   
  }

  clearRedux = () => {
    this.props.clearInventory()
    this.props.clearCompanies()
    this.props.clearSearch()
    this.props.clearProductData()
    this.props.clearProduct()
    this.props.clearNews()
    this.props.clearDailyData()
    this.props.clearWeeklyData()
  }

  handleSignOut = () => {
    this.props.signOut()
    this.clearRedux()
    localStorage.removeItem('token')
    this.props.history.push('/')
  }

  handleNewsFetch = () => {
    this.importNewsData()
    setInterval(() => {
      this.importNewsData()
    }, 600000)
  }

  componentDidMount() {
    if (localStorage.token) {
      this.handleValidation()
      this.handleNewsFetch()
      this.importCompanyData()
      // this.handleInventoryInterval = setInterval(() => {
      //   this.updateInventoryData()
      // }, 30000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.handleInventoryInterval)
  }

  render () {
    return (
      <div>
        {/* <NavBar handleSignOut={this.handleSignOut}/> */}
        <Switch>
          <Route exact path='/' component={props => <HomePage2  {...props}/>} />
          <Route path='/sign_up' component={props => <SignUpForm {...props}/>}/>
          <Route path='/log_in' component={props => <LogInForm setInventory={this.setInventory} {...props} />}/>
          <Route path='/landing' component={props => <UserPage handleSignOut={this.handleSignOut} {...props}/>}/>
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
