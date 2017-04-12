import React from 'react'
import { connect } from 'react-redux'
import { _getNewPassage, _getPoemAndMakeSelectable } from 'src/actions/ajax/poem'
import { _toggleSelectedLetters, _toggleSelectBy, _clearPoem, _clearSelects } from 'src/actions/selectablePoem.js'
import WriterToolbar from 'src/components/selectable/WriterToolbar'

import SelectablePoem from 'src/components/selectable/SelectablePoem'

class WriteView extends React.Component {
  componentWillMount() {
    const { params, getPoemAndMakeSelectable, selectablePoem, getNewPassage, clearPoem } = this.props
    const editPoemId = params.id
    if (editPoemId) {
      getPoemAndMakeSelectable(editPoemId)
    } else if (!selectablePoem.passage) {
      getNewPassage()
    }

    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave.bind(this),
    )
  }

  routerWillLeave(newLocation) {
    const { params, clearPoem, selectablePoem } = this.props
    const editPoemId = params.id
    if (selectablePoem.isBlank) {
      return true
    }

    let shouldAbandon
    if (editPoemId && (newLocation.pathname !== `/edit/stylize/${editPoemId}`)) {
      shouldAbandon = confirm('leave page?')
    } else if (newLocation.pathname !== '/new/stylize') {
      shouldAbandon = confirm('leave page?')
    }
    if (shouldAbandon) {
      clearPoem()
    }
    return shouldAbandon
  }

  componentWillReceiveProps(newProps) {
    // issue when going from '/edit/write/50' => '/new/write/'
    // component does not mount so newPassage not called
    if (!newProps.selectablePoem.passage) {
      this.props.getNewPassage()
    }
  }

  render() {
    const { params, selectablePoem, toggleSelectedLetters, clearSelects, toggleSelectBy, getNewPassage } = this.props
    const inEditView = !!params.id
    const isSelectingByWord = selectablePoem.isSelectingByWord
    const isBlank = selectablePoem.isBlank
    const toolbarProps = { poemId: params.id, isBlank, clearSelects, toggleSelectBy, inEditView, isSelectingByWord, getNewPassage }
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
  getNewPassage: React.PropTypes.func,
  toggleSelectedLetters: React.PropTypes.func,
  toggleSelectBy: React.PropTypes.func,
  params: React.PropTypes.object,
  getPoemAndMakeSelectable: React.PropTypes.func,
}

const mapDispatchToProps = {
  getNewPassage: _getNewPassage,
  getPoemAndMakeSelectable: _getPoemAndMakeSelectable,
  toggleSelectedLetters: _toggleSelectedLetters,
  toggleSelectBy: _toggleSelectBy,
  clearPoem: _clearPoem,
  clearSelects: _clearSelects,
}

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem,
    stylingPoem: state.stylingPoem,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteView)
