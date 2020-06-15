import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import StyleToolbar from "src/components/selectable/StyleToolbar";
import Poem from "src/components/poem/Poem";
import { Query } from "react-apollo";
import { GET_SINGLE_POEM } from "src/components/poem/getSinglePoem";
import { IPoem } from "src/components/types";

const StyleViewWData = ({ match }: RouteComponentProps<{ id: string }>) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(match.params.id) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      // @ts-ignore
      return (
        <StyleView poem={{ ...data.poem, author: { id: data.current.id } }} />
      );
    }}
  </Query>
);

class StyleView extends React.PureComponent<any, IPoem> {
  state = this.props.poem;

  updateStyle = ({
    backgroundId,
    colorRange,
  }: {
    backgroundId: number;
    colorRange: number;
  }) => {
    backgroundId && this.setState({ backgroundId });
    colorRange && this.setState({ colorRange });
  };

  render() {
    return (
      <div className="close-up-poem-view text-center">
        <h1>Stylize</h1>
        <StyleToolbar poem={this.state} updateStyle={this.updateStyle} />
        <Poem poem={this.state} closeUp />
      </div>
    );
  }
}

export default withRouter(StyleViewWData);
