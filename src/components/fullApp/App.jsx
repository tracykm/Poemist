import React from 'react'
import { connect } from 'react-redux'
import Navbar from 'src/components/fullApp/Navbar'
import ModalContainer from 'src/components/login/ModalContainer'
import * as loginDuck from 'src/ducks/login.js'
import { withRouter } from 'react-router-dom'
// import 'reset-css/reset.css'
import './_app.scss'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar toggleShowLogin={this.props.toggleShowLogin} />
        <div className="page-body">{this.props.children}</div>
        <ModalContainer
          toggleShowLogin={this.props.toggleShowLogin}
          showLogin={this.props.showLogin}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleShowLogin: loginDuck.toggleShowLogin,
}

function mapStateToProps(state) {
  return {
    showLogin: loginDuck.getShowLogin(state),
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
