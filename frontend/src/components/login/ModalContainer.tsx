import * as React from "react";
import LoginForm from "./LoginForm";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getQueryObj } from "src/utils/urlQuery";
import { Dialog } from "@material-ui/core";

const ModalContainer = (props: RouteComponentProps<{}>) => {
  const { showLogin } = getQueryObj(props.location.search);
  const hideModal = () => props.history.push("/");
  return (
    <Dialog
      onClose={hideModal}
      aria-labelledby="simple-dialog-title"
      open={showLogin}
    >
      <div style={{ padding: "1rem" }}>
        <LoginForm hideModal={hideModal} />
      </div>
    </Dialog>
  );
};

export default withRouter(ModalContainer);
