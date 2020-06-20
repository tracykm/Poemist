import * as React from "react"
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom"
import PoemistLogo from "src/components/fullApp/Logo"
import { Query, QueryResult } from "react-apollo"
import {
  CURRENT_USER,
  ICurrentResponse,
} from "src/components/universal/currentUser"
import NavbarDiv from "./NavbarDiv"
import Loader from "../universal/Loader"
import { Select, MenuItem } from "@material-ui/core"

const LogInOut = ({ toggleShowLogin }: { toggleShowLogin: () => void }) => (
  <span>
    <a onClick={toggleShowLogin} data-test="signUpLink">
      Sign Up
    </a>
  </span>
)

const NavBarWData = (props: RouteComponentProps<{}>) => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }: QueryResult<ICurrentResponse, {}>) => {
      if (loading) return <Loader />
      if (error) return <p>Error :(</p>
      if (!data) return <p>No data :(</p>

      return <Navbar {...props} currentUser={data.current} />
    }}
  </Query>
)

interface IProps {
  currentUser: {
    id: string
    username: string
  }
}

function Navbar({ currentUser, history }) {
  const [openDropdown, setOpenDropdown] = React.useState(false)
  return (
    <div
      className="navbar"
      style={{ display: "inline-block", minWidth: 345, marginRight: "-1rem" }}
    >
      <div />
      <ul className={"navbarMenu expanded"}>
        <li>
          <NavLink activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/new/write">
            Create
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

            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem onClick={() => history.push(`/user/${currentUser.id}`)}>
                {currentUser.username}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.clear()
                  location.reload()
                }}
              >
                Logout
              </MenuItem>
            </Select>
          </li>
        )}

        {!currentUser && (
          <li>
            <LogInOut toggleShowLogin={() => history.push("?showLogin=true")} />
          </li>
        )}
      </ul>
    </div>
  )
}

const InnerNav = withRouter(NavBarWData)

export default function FullNav() {
  return (
    <NavbarDiv>
      <NavLink to="/" className="logo">
        <PoemistLogo />
      </NavLink>
      <InnerNav />
    </NavbarDiv>
  )
}
