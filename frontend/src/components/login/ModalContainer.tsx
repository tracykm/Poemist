import * as React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getQueryObj } from "src/utils/urlQuery";

const ModalContainer = (props: RouteComponentProps<{}>) => {
  const { showLogin } = getQueryObj(props.location.search);
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
