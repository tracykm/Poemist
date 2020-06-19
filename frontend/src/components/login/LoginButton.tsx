import * as React from "react";
import { Mutation, ExecutionResult, MutationResult } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER } from "src/components/universal/currentUser";
import { IUser } from "src/components/types";
import { Button } from "reactstrap";

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      sessionToken
    }
  }
`;
interface ILoginUserResponse {
  loginUser: IUser;
}

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
      sessionToken
    }
  }
`;
interface ICreateUserResponse {
  createUser: IUser;
}

type IResult = ExecutionResult<ILoginUserResponse | ICreateUserResponse>;

const LoginButton = ({
  password,
  username,
  onSignUp,
  hideModal,
  setError,
}: {
  password: string;
  username: string;
  onSignUp: boolean;
  hideModal: () => void;
  setError: (errorStr: string) => void;
}) => (
  <Mutation mutation={onSignUp ? CREATE_USER : LOGIN_USER}>
    {(loginUser, { error }: MutationResult) => {
      const errorMessage = error && error.graphQLErrors[0].message;
      return (
        <div>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <Button
            color="primary"
            type="submit"
            disabled={!(password && username)}
            style={{ width: "100%" }}
            onClick={() => {
              loginUser({
                variables: { password, username },
                update: (store, { data }: IResult) => {
                  if (!data) return;
                  const user =
                    (data as ICreateUserResponse).createUser ||
                    (data as ILoginUserResponse).loginUser;
                  if (!user) return;
                  // FRAGILE
                  // couldn't use refetchQueries cause local storage has to fire first
                  store.writeQuery({
                    query: CURRENT_USER,
                    data: {
                      current: {
                        id: user.id,
                        username: user.username,
                        sessionToken: user.sessionToken,
                        __typename: "User",
                      },
                    },
                  });
                },
              }).then(({ data }: IResult) => {
                if (!data) return "No data";
                const user =
                  (data as ICreateUserResponse).createUser ||
                  (data as ILoginUserResponse).loginUser;
                if (user) {
                  localStorage.setItem("session", user.sessionToken);
                  hideModal();
                }
                return;
              });
            }}
          >
            {onSignUp ? "Sign Up" : "Login"}
          </Button>
        </div>
      );
    }}
  </Mutation>
);

export default LoginButton;
