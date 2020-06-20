import React from "react"
import ReactDOM from "react-dom"
import { Modal, Button } from "@material-ui/core"

export default function ConfirmModal({ confirmCallback }) {
  return (
    <div>
      <Modal
        open={true}
        onClose={() => confirmCallback(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <div>sdfa</div>
          <Button onClick={() => confirmCallback(true)}>Submit</Button>
        </div>
      </Modal>
    </div>
  )
}

/** can be used same as window.confirm with the addition of async await */
export function myConfirm(props) {
  const wrapper = document.body.appendChild(document.createElement("div"))
  return new Promise((resolve) => {
    ReactDOM.render(
      <ConfirmModal {...props} confirmCallback={resolve} />,
      wrapper,
    )
  }).then((res) => {
    ReactDOM.unmountComponentAtNode(wrapper)
    return res
  })
}
