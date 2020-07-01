import * as React from "react"
import * as ReactDOM from "react-dom"
import ApolloClient from "apollo-boost"
import App from "./App"
// import gql from "graphql-tag";
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import { ApolloProvider } from "react-apollo"
import CloseUpPoemView from "src/components/poem/CloseUpPoemView"
import HomeView from "src/components/manyPoemViews/HomeView"
import ProfileView from "src/components/manyPoemViews/ProfileView"
import WriteView from "src/components/selectable/WriteView"
import StyleView from "src/components/selectable/StyleView"
import About from "src/components/fullApp/About"

import createHistory from "history/createBrowserHistory"
import { Router, Route } from "react-router-dom"
import { ThemeProvider, createMuiTheme } from "@material-ui/core"

export const history = createHistory()
const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none",
      fontSize: 24,
      borderRadius: 0,
    },
  },
})
const App2 = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router
        history={history}

        // getUserConfirmation={(message, callback) => {
        //   confirm(message, callback);
        //   // debugger;
        // }}
      >
        <App>
          <Route path="/" exact component={HomeView} />
          <Route path="/about" component={About} />
          <Route path="/edit/stylize/:id" component={StyleView} />
          <Route path="/new/stylize" component={StyleView} />
          <Route path="/new/write" component={WriteView} />
          <Route path="/edit/write/:id" component={WriteView} />
          <Route path="/poem/:id" component={CloseUpPoemView} />
          <Route path="/user/:id" component={ProfileView} />
        </App>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
)

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = localStorage.getItem("session")
    operation.setContext({
      headers: {
        "X-CSRF-Token": token,
      },
    })
    return Promise.resolve() // ts demands, no idea why
  },
})

// client
//   .query({
//     query: gql`
//       {
//         current {
//           username
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(<App2 />, document.getElementById("root") as HTMLElement)
registerServiceWorker()
