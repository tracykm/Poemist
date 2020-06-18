import * as React from "react";
import Poem from "src/components/poem/Poem";
import { Query } from "react-apollo";
import { GET_SINGLE_POEM } from "src/components/poem/getSinglePoem";
import CloseUpPoemDiv from "src/components/poem/CloseUpPoemDiv";
import { RouteComponentProps } from "react-router";

const PoemWData = ({ id }: { id: string }) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(id) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <Poem poem={data.poem} closeUp />;
    }}
  </Query>
);

const CloseUpPoemView = ({
  match: { params },
}: RouteComponentProps<{ id: string }>) => (
  <CloseUpPoemDiv>
    <PoemWData id={params.id} />
  </CloseUpPoemDiv>
);

export default CloseUpPoemView;
