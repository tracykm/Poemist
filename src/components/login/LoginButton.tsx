import * as React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      sessionToken
    }
  }
`;
const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
      sessionToken
    }
  }
`;

const LoginButton = ({ password, username, onSignUp, hideModal }) => (
  <Mutation
    mutation={onSignUp ? CREATE_USER : LOGIN_USER}
    refetchQueries={["getCurrentUser"]}
  >
    {(loginUser, { error }) => {
      return (
        <div>
          <p className="error">{error && error.message}</p>
          <button
            onClick={() => {
              loginUser({ variables: { password, username } }).then(
                ({ data }: { data: any }) => {
                  const user = data.createUser || data.loginUser;
                  if (user) {
                    localStorage.setItem("session", user.sessionToken);
                    hideModal();
                  }
                },
              );
            }}
          >
            login
          </button>
        </div>
      );
    }}
  </Mutation>
);

export default LoginButton;
