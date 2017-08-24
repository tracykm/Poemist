import React from 'react'
import { connect } from 'react-redux'
import * as selectablePoemDuck from 'src/ducks/selectablePoem'
import WriterToolbar from 'src/components/selectable/WriterToolbar'
// import {
//   Link,
//   Prompt
// } from 'react-router-dom'
import SelectablePoem from 'src/components/selectable/SelectablePoem'

class WriteView extends React.Component {
  componentWillMount() {
    const { match, getPoemAndMakeSelectable, selectablePoem, handleFetchNewPassage, clearPoem } = this.props
    const editPoemId = match.params.id
    if (editPoemId) {
      getPoemAndMakeSelectable(editPoemId)
    } else if (!selectablePoem.passage) {
      handleFetchNewPassage()
    }

    // this.props.router.setRouteLeaveHook(
    //   this.props.route,
    //   this.routerWillLeave.bind(this),
    // )
  }

  // routerWillLeave(newLocation) {
  //   const { params, clearPoem, selectablePoem } = this.props
  //   const editPoemId = params.id
  //   if (selectablePoem.isBlank) {
  //     return true
  //   }
  //
  //   let shouldAbandon
  //   if (editPoemId) {
  //     if (newLocation.pathname !== `/edit/stylize/${editPoemId}`) {
  //       shouldAbandon = confirm('leave page?')
  //     } else {
  //       return true
  //     }
  //   } else if (newLocation.pathname !== '/new/stylize') {
  //     shouldAbandon = confirm('leave page?')
  //   }
  //   if (shouldAbandon) {
  //     clearPoem()
  //   }
  //   return shouldAbandon
  // }

  componentWillReceiveProps(newProps) {
    // issue when going from '/edit/write/50' => '/new/write/'
    // component does not mount so newPassage not called
    if (!newProps.selectablePoem.passage) {
      this.props.handleFetchNewPassage()
    }
  }

  render() {
    const { match, selectablePoem, isSelectingByWord, isBlank, toggleSelectedLetters, clearSelects, toggleSelectBy, handleFetchNewPassage } = this.props
    const inEditView = !!match.params.id
    const toolbarProps = { poemId: match.params.id, isBlank, clearSelects, toggleSelectBy, inEditView, isSelectingByWord, handleFetchNewPassage }
    return (
      <div className="close-up-poem-view">
        <h1>{ inEditView ? 'Edit' : 'Write' }</h1>
        <h5>Make your own poem by clicking on words!</h5>
        <WriterToolbar {...toolbarProps} />
        <SelectablePoem selectablePoem={selectablePoem} toggleSelectedLetters={toggleSelectedLetters} />
      </div>
    )
  }
}

WriteView.propTypes = {
  selectablePoem: React.PropTypes.object,
  handleFetchNewPassage: React.PropTypes.func,
  toggleSelectedLetters: React.PropTypes.func,
  toggleSelectBy: React.PropTypes.func,
  match: React.PropTypes.object,
  getPoemAndMakeSelectable: React.PropTypes.func,
}

const mapDispatchToProps = {
  handleFetchNewPassage: selectablePoemDuck.handleFetchNewPassage,
  getPoemAndMakeSelectable: selectablePoemDuck.getPoemAndMakeSelectable,
  toggleSelectedLetters: selectablePoemDuck.toggleSelectedLetters,
  toggleSelectBy: selectablePoemDuck.toggleSelectBy,
  clearPoem: selectablePoemDuck.clearPoem,
  clearSelects: selectablePoemDuck.clearSelects,
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
