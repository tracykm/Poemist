import * as React from "react";
import Poem from "src/components/poem/Poem";
import { Query } from "react-apollo";
import GET_SINGLE_POEM from "src/components/poem/getSinglePoem";
import CloseUpPoemDiv from "src/components/poem/CloseUpPoemDiv";

const PoemWData = ({ id }: { id: number }) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(id) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <Poem poem={data.poem} closeUp />;
    }}
  </Query>
);

const CloseUpPoemView = ({ match: { params } }) => (
  <CloseUpPoemDiv>
    <PoemWData id={params.id} />
  </CloseUpPoemDiv>
);

export default CloseUpPoemView;
