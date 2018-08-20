import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import formatLetters from "src/utils/formatLetters";
import toggleLetters from "src/utils/toggleLetters";
import {
  GET_SINGLE_POEM,
  GET_BLANK_POEM,
  IGetBlankPoem,
  IGetSinglePoemResponse,
} from "src/components/poem/getSinglePoem";
import { ITextChunk, ISelectablePoem } from "src/components/types";
import { IHandleClickLetter } from "./Word";

const SelectablePoemWData = (props: { poemId?: number }) => (
  <Query
    query={props.poemId ? GET_SINGLE_POEM : GET_BLANK_POEM}
    variables={props.poemId ? { id: props.poemId } : {}}
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
        <SelectablePoem
          {...props}
          {...getSelectable(poem)}
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

interface IArg
  extends Pick<
      ISelectablePoem,
      "wordLetters" | "isSelectingByWord" | "passage"
    > {
  handleClickLetter: IHandleClickLetter;
  getNewPoem: () => void;
  handleClear: () => void;
  toggleSelectBy: () => void;
}

interface IProps extends ISelectablePoem {
  getNewPassage: () => void;
  children?: (args: IArg) => JSX.Element;
}

class SelectablePoem extends React.PureComponent<IProps> {
  state = {
    passage: this.props.passage,
    wordLetters: this.props.wordLetters,
    isSelectingByWord: this.props.isSelectingByWord,
  };

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
    this.setState(this.props);
  };

  toggleSelectBy = () => {
    this.setState({ isSelectingByWord: !this.state.isSelectingByWord });
  };

  render() {
    if (!this.props.children) return;
    return this.props.children({
      ...this.state,
      handleClickLetter: this.handleClickLetter,
      getNewPoem: this.props.getNewPassage,
      handleClear: this.handleClear,
      toggleSelectBy: this.toggleSelectBy,
    });
  }
}

export default SelectablePoemWData;
