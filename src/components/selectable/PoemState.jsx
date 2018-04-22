import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import formatLetters from 'src/utils/formatLetters'
import toggleLetters from 'src/utils/toggleLetters.js'
import GET_SINGLE_POEM from 'src/components/poem/getSinglePoem'

const GET_BLANK_POEM = gql`
  {
    getBlankPoem {
      textChunks {
        isSelected
        text
      }
      passage
      book {
        author
        id
      }
    }
  }
`

const SelectablePoemWData = props => (
  <Query
    query={props.poemId ? GET_SINGLE_POEM : GET_BLANK_POEM}
    variables={props.poemId && { id: Number(props.poemId) }}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return (
        <SelectablePoem
          {...props}
          poem={data.getBlankPoem || data.poem}
          getNewPassage={refetch}
        />
      )
    }}
  </Query>
)

const getSelectable = props => {
  const wordLetters = formatLetters({
    textChunks: props.poem.textChunks,
  })
  return { ...props.poem, wordLetters, isBlank: true, isSelectingByWord: true }
}

class SelectablePoem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = getSelectable(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getSelectable(nextProps))
  }

  handleClick = ({ wordIdx, letterIdx }) => {
    const { wordLetters, isSelectingByWord } = this.state
    const newWordLetters = toggleLetters({
      wordLetters,
      wordIdx,
      letterIdx,
      isSelectingByWord,
    })
    this.setState({ wordLetters: newWordLetters, isBlank: false })
  }

  handleClear = () => {
    this.setState(getSelectable(this.props))
  }

  toggleSelectBy = () => {
    this.setState({ isSelectingByWord: !this.state.isSelectingByWord })
  }

  render() {
    return this.props.children({
      ...this.state,
      handleClick: this.handleClick,
      getNewPoem: this.props.getNewPassage,
      handleClear: this.handleClear,
      toggleSelectBy: this.toggleSelectBy,
    })
  }
}

export default SelectablePoemWData
