import * as React from "react"
import Poem from "src/components/poem/Poem"
import { Query, QueryResult } from "react-apollo"
import { GET_SINGLE_POEM } from "src/components/poem/getSinglePoem"
import CloseUpPoemDiv from "src/components/poem/CloseUpPoemDiv"
import { RouteComponentProps } from "react-router"
import Loader from "../universal/Loader"

const PoemWData = ({ id }: { id: string }) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(id) }}>
    {({ loading, error, data }: QueryResult<any, Record<string, any>>) => {
      if (loading) return <Loader />
      if (error) return <p>Error :(</p>

      return <Poem poem={data.poem} closeUp />
    }}
  </Query>
)

const CloseUpPoemView = ({
  match: { params },
}: RouteComponentProps<{ id: string }>) => (
  <CloseUpPoemDiv>
    <PoemWData id={params.id} />
  </CloseUpPoemDiv>
)

export default CloseUpPoemView
