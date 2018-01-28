import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import * as selectablePoemDuck from 'src/ducks/selectablePoem'
import WriterToolbar from 'src/components/selectable/WriterToolbar'
import SelectablePoem from 'src/components/selectable/SelectablePoem'

class WriteView extends React.Component {
  state = {
    showHelp: !localStorage.getItem('returningUser'),
  }
  componentWillMount() {
    localStorage.setItem('returningUser', true)
    const {
      match,
      getPoemAndMakeSelectable,
      selectablePoem,
      handleFetchNewPassage,
    } = this.props
    const editPoemId = match.params.id
    if (editPoemId) {
      getPoemAndMakeSelectable(editPoemId)
    } else if (!selectablePoem.passage) {
      handleFetchNewPassage()
    }
  }

  componentWillReceiveProps(newProps) {
    // issue when going from '/edit/write/50' => '/new/write/'
    // component does not mount so newPassage not called
    if (newProps.selectablePoem && !newProps.selectablePoem.wordLetters) {
      this.props.handleFetchNewPassage()
    }
  }

  render() {
    const {
      match,
      selectablePoem,
      isSelectingByWord,
      isBlank,
      toggleSelectedLetters,
      clearSelects,
      toggleSelectBy,
      handleFetchNewPassage,
      toggleRandomLetters,
    } = this.props
    const inEditView = !!match.params.id
    const toolbarProps = {
      poemId: match.params.id,
      isBlank,
      clearSelects,
      toggleSelectBy,
      inEditView,
      isSelectingByWord,
      handleFetchNewPassage,
      toggleRandomLetters,
    }
    return (
      <div>
        <div className="visible-lg-block">
          <div
            onClick={() => this.setState({ showHelp: !this.state.showHelp })}
            style={{
              background: '#ddd',
              padding: '10px',
              position: 'absolute',
              cursor: 'pointer',
            }}
          >
            help
          </div>
          {this.state.showHelp && (
            <div style={{ float: 'left', marginTop: '80px' }}>
              <h3 style={{ display: 'inline' }}>Example</h3>
              <span
            onClick={() => this.setState({ showHelp: false })}
            style={{
              padding: '10px',
              display: 'inline-block',
              cursor: 'pointer',
              color: '#bbb',
              pointer: 'cursor',
            }}
          >
            x hide
          </span>
              <div>
                <img src="https://media.giphy.com/media/l4pT4LDniFo4OwSVW/giphy.gif" />
              </div>
            </div>
          )}
        </div>
        <div className="close-up-poem-view">
          <h1>{inEditView ? 'Edit' : 'Write'}</h1>
          <h5>Make your own poem by clicking on words!</h5>
          <WriterToolbar {...toolbarProps} />
          <SelectablePoem
            isSelectingByWord={isSelectingByWord}
            selectablePoem={selectablePoem}
            toggleSelectedLetters={toggleSelectedLetters}
          />
        </div>
      </div>
    )
  }
}

WriteView.propTypes = {
  selectablePoem: PropTypes.object,
  handleFetchNewPassage: PropTypes.func,
  toggleSelectedLetters: PropTypes.func,
  toggleSelectBy: PropTypes.func,
  match: PropTypes.object,
  getPoemAndMakeSelectable: PropTypes.func,
}

const mapDispatchToProps = {
  handleFetchNewPassage: selectablePoemDuck.handleFetchNewPassage,
  getPoemAndMakeSelectable: selectablePoemDuck.getPoemAndMakeSelectable,
  toggleSelectedLetters: selectablePoemDuck.toggleSelectedLetters,
  toggleSelectBy: selectablePoemDuck.toggleSelectBy,
  clearPoem: selectablePoemDuck.clearPoem,
  clearSelects: selectablePoemDuck.clearSelects,
  toggleRandomLetters: selectablePoemDuck.toggleRandomLetters,
}

function mapStateToProps(state) {
  return {
    selectablePoem: selectablePoemDuck.getSelectablePoem(state),
    stylingPoem: selectablePoemDuck.getSelectablePoem(state),
    isSelectingByWord: state.selectablePoem.isSelectingByWord,
    isBlank: state.selectablePoem.isBlank,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteView)
