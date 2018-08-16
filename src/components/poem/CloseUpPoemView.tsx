import * as React from "react";
import Poem from "src/components/poem/Poem";
import { Query } from "react-apollo";
import GET_SINGLE_POEM from "src/components/poem/getSinglePoem";
import styled from "styled-components";
import { sizes } from "src/components/universal/_variables";

const CloseUpPoemDiv = styled.div`
  .close-up-poem-view {
    text-align: center;
    width: ${sizes.poemWidth * 2};
    margin: auto;
    .poem {
      margin: 0;
    }
  }
  /* .help-image {
  background: url("../../example-clicking.gif");
  width: 100px;
  height: 100px;
} */
`;

const PoemWData = ({ id }: { id: number }) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(id) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <Poem poem={data.poem} />;
    }}
  </Query>
);

const CloseUpPoemView = ({ match: { params } }) => (
  <CloseUpPoemDiv>
    <PoemWData id={params.id} />
  </CloseUpPoemDiv>
);

export default CloseUpPoemView;
