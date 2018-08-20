import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import formatLetters from "src/utils/formatLetters";
import toggleLetters from "src/utils/toggleLetters";
import WriterToolbar from "src/components/selectable/WriterToolbar";
import {
  GET_SINGLE_POEM,
  GET_BLANK_POEM,
  IGetBlankPoem,
  IGetSinglePoemResponse,
} from "src/components/poem/getSinglePoem";
import { ITextChunk, ISelectablePoem } from "src/components/types";
import { IHandleClickLetter } from "./Word";
import SelectablePoemRender from "./SelectablePoem";
import { RouteComponentProps } from "react-router";

const WriteViewWData = (props: RouteComponentProps<{ id: string }>) => (
  <Query
    query={props.match.params.id ? GET_SINGLE_POEM : GET_BLANK_POEM}
    variables={props.match.params.id ? { id: props.match.params.id } : {}}
  >
    {({
      loading,
      error,
      data,
      refetch,
    }: QueryResult<IGetBlankPoem | IGetSinglePoemResponse>) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (!data) return <p>No data</p>;

      const poem =
        (data as IGetBlankPoem).getBlankPoem ||
        (data as IGetSinglePoemResponse).poem;

      return (
        <WriteView
          {...props}
          selectablePoem={getSelectable(poem)}
          getNewPassage={refetch}
        />
      );
    }}
  </Query>
);

function getSelectable(poem: { textChunks: ITextChunk[] }): ISelectablePoem {
  const wordLetters = formatLetters({
    textChunks: poem.textChunks,
  });
  return { ...poem, wordLetters, isBlank: true, isSelectingByWord: true };
}

interface IProps {
  getNewPassage: () => void;
  selectablePoem: ISelectablePoem;
}

class WriteView extends React.PureComponent<IProps> {
  state = this.props.selectablePoem;

  handleClickLetter: IHandleClickLetter = ({ wordIdx, letterIdx }) => {
    const { wordLetters, isSelectingByWord } = this.state;
    const newWordLetters = toggleLetters({
      wordLetters,
      wordIdx,
      letterIdx,
      isSelectingByWord,
    });
    this.setState({ wordLetters: newWordLetters, isBlank: false });
  };

  handleClear = () => {
    this.setState(this.props.selectablePoem);
  };

  toggleSelectBy = () => {
    this.setState({ isSelectingByWord: !this.state.isSelectingByWord });
  };

  toggleRandomLetters = () => {
    // this.setState({ isSelectingByWord: !this.state.isSelectingByWord });
  };

  render() {
    return (
      <div className="close-up-poem-view text-center">
        <h1>{this.props.selectablePoem.id ? "Edit" : "Write"}</h1>
        <h5>Make your own poem by clicking on words!</h5>
        <WriterToolbar
          selectablePoem={this.state}
          getNewPoem={this.props.getNewPassage}
          handleClear={this.handleClear}
          toggleSelectBy={this.toggleSelectBy}
          toggleRandomLetters={this.toggleRandomLetters}
        />
        <SelectablePoemRender
          {...this.state}
          handleClickLetter={this.handleClickLetter}
        />
      </div>
    );
  }
}

export default WriteViewWData;
