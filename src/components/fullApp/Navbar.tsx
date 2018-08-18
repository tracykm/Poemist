import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import PoemistLogo from "src/components/fullApp/Logo";
import { Query, QueryResult } from "react-apollo";
import CURRENT_USER, {
  ICurrentResponse,
} from "src/components/universal/currentUser";
import NavbarDiv from "./NavbarDiv";

const LogInOut = ({ toggleShowLogin }) => (
  <span>
    <a onClick={toggleShowLogin} data-test="signUpLink">
      Sign Up
    </a>
  </span>
);

const NavBarWData = props => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }: QueryResult<ICurrentResponse, {}>) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (!data) return <p>No data :(</p>;

      return <Navbar {...props} currentUser={data.current} />;
    }}
  </Query>
);

interface IProps {
  currentUser: {
    id: number;
    username: string;
  };
}

class Navbar extends React.PureComponent<RouteComponentProps<{}> & IProps> {
  state = { isExpanded: false };

  render() {
    const { currentUser } = this.props;
    const { isExpanded } = this.state;
    return (
      <NavbarDiv>
        <NavLink to="/" className="logo">
          <PoemistLogo />
        </NavLink>
        <div className="navbar">
          <button className="btn btn-link">
            <i
              className="hamburger fa fa-bars"
              onClick={() => this.setState({ isExpanded: !isExpanded })}
            >
              menu
            </i>
          </button>
          <ul className={isExpanded ? "navbarMenu" : "navbarMenu expanded"}>
            <li>
              <NavLink activeClassName="active" exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/new/write">
                Create
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/about">
                About
              </NavLink>
            </li>
            {currentUser && (
              <li>
                <NavLink
                  activeClassName="active"
                  to={`/user/${currentUser.id}`}
                  data-test="profileLink"
                >
                  Profile
                </NavLink>
              </li>
            )}
            <li>
              {currentUser ? (
                <span>
                  Hi {currentUser.username}!{" "}
                  <a
                    onClick={() => {
                      localStorage.clear();
                      location.reload();
                    }}
                  >
                    Logout
                  </a>
                </span>
              ) : (
                <LogInOut
                  toggleShowLogin={() =>
                    this.props.history.push("?showLogin=true")
                  }
                />
              )}
            </li>
          </ul>
        </div>
      </NavbarDiv>
    );
  }
}

export default withRouter(NavBarWData);
