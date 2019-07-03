import React, { Component} from 'react';
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import * as actions from './actions'
import HomePage from './components/HomePage';
import LogInForm from './components/LogInForm'
import UserPage from './components/UserPage';
import { validate, fetchInventory, fetchCompany, fetchData, fetchNews1, fetchData2 } from './services/api';
import NavBar from './components/NavBar'
import SignUpForm from './components/SignUpForm';

const pageStyle = {
  backgroundColor: 'grey',
  height: "600px",
  margin: "0",
  padding: "0"
}

export class App extends Component {

  setInventory = async () => {
    let newArray = []
    await fetchInventory()
        .then((data) => {
            if (data.error) {
                alert(data.error)
            } else {
                data.map((product,idx) => {
                  fetchData2(product.ticker)
                    .then(stock => {
                      let newProduct = Object.assign(product, stock)
                      newArray = [...newArray, newProduct]
                      if (idx === data.length-1) {
                        this.props.getInventory(newArray)
                      }
                    })
                })
            }
        })
  }

  // setInventory = async () => {
  //   await fetchInventory()
  //       .then(data => {
  //           if (data.error) {
  //               alert(data.error)
  //           } else {
  //               this.props.getInventory(data)
  //           }
  //       })  
  // }

  // const handleDataFetch = () => {
  //   const newArray = []
  //   productRows.map(product => {
  //     fetchData2(product.symbol)
  //       .then(data => {
  //         let newProduct = Object.assign(product, data)
  //         newArray.push(newProduct)
  //       })
  //     })
  //     setRows(newArray)
  // }

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
    fetchData(query)
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
    // this.importCompanyData()
    if (localStorage.token) {
      this.handleValidation()
    }
  }

  componentDidUpdate() {
    // this.importProductData(this.props.selectedProduct)
  }

  
  
  render () {
    return (
      <div>
        <NavBar handleSignOut={this.handleSignOut}/>
        <Switch>
          <Route exact path='/' component={props => <HomePage  {...props}/>}/>
          <Route path='/sign_up' component={props => <SignUpForm {...props}/>}/>
          <Route path='/log_in' component={props => <LogInForm {...props} />}/>
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
