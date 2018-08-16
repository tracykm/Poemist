import * as React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import queryString from "query-string";
import { withRouter, RouteComponentProps } from "react-router-dom";

const ModalContainer = (props: RouteComponentProps<{}>) => {
  const { showLogin } = queryString.parse(props.location.search) as {
    showLogin: boolean;
  };
  const hideModal = () => props.history.push("/");
  return (
    <div>
      <Modal isOpen={showLogin} toggle={hideModal}>
        <ModalBody>
          <LoginForm hideModal={hideModal} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(ModalContainer);
