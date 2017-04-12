import React from 'react'
import { connect } from 'react-redux'

import Navbar from 'src/containers/Navbar'
import LoginModal from 'src/containers/LoginModal'
import { _getCurrentUser } from 'src/actions/ajax/user.js'
import { _updateRoute } from 'src/actions/selectablePoem.js'

// import 'reset-css/reset.css'
import './_app.scss'

class App extends React.Component {
  componentWillMount() {
    this.props.getCurrentUser()
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.nextPath === '/new/write' && newProps.nextPath !== '/new/stylize') {
  //     const r = confirm('leave page?');
  //     // if(!r) { this.props.updateRoute('/new/write') }
  //   }
  // }

  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="page-body">
          {this.props.children}
        </div>
        <LoginModal />
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getCurrentUser: React.PropTypes.func,
}

const mapDispatchToProps = {
  getCurrentUser: _getCurrentUser,
  updateRoute: _updateRoute,
}

function mapStateToProps(state) {
  return {
    nextPath: state.routing.locationBeforeTransitions.pathname,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
