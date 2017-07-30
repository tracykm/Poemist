import React from 'react'
import { connect } from 'react-redux'

import Navbar from 'src/containers/Navbar'
import ModalContainer from 'src/containers/ModalContainer'
import * as userDuck from 'src/ducks/users'
import { _updateRoute } from 'src/ducks/selectablePoem.js'
import * as loginDuck from 'src/ducks/logIn.js'

// import 'reset-css/reset.css'
import './_app.scss'

class App extends React.Component {
  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="page-body">
          {this.props.children}
        </div>
        <ModalContainer toggleShowLogin={this.props.toggleShowLogin} showLogin={this.props.showLogin} />
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getCurrentUser: React.PropTypes.func,
  toggleShowLogin: React.PropTypes.func,
}

const mapDispatchToProps = {
  getCurrentUser: userDuck.handleFetchCurrentUser,
  toggleShowLogin: loginDuck._toggleShowLogin,
}

function mapStateToProps(state) {
  return {
    showLogin: state.logIn.showLogin,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
