// import * as React from "react"
// import { Query } from "react-apollo"

// function WithData(component, query, variables) {
//   return (
//     <Query
//       query={query}
//       variables={variables}
//       notifyOnNetworkStatusChange
//       fetchPolicy="cache-and-network"
//     >
//       {({ error, data, fetchMore }) => {
//         if (!data.poems) return <p>Loading...</p>
//         if (error) return <p>Error :(</p>
//       }}
//       {<component data={data} />}
//     </Query>
//   )
// }

// export default WithData
