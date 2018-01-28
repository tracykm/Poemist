import React from 'react'
import { Modal } from 'react-bootstrap'
import LoginModal from './LoginModal'

import './_loginModal.scss'

class ModalContainer extends React.Component {
  render() {
    const { toggleShowLogin, showLogin } = this.props
    return (
      <Modal show={showLogin} bsSize="sm" onHide={toggleShowLogin}>
        <Modal.Body>
          <LoginModal />
        </Modal.Body>
      </Modal>
    )
  }
}

export default ModalContainer
