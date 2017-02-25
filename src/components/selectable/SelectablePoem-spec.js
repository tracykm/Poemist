import 'src/spec/setupDom'
import React from 'react'
import { from } from 'seamless-immutable'
import chai, { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import SelectablePoem from './SelectablePoem'

chai.use(sinonChai)

describe('<SelectablePoem', () => {
  context('selecting-by-word', () => {
    const toggleSelectedLetters = sinon.spy()

    const selectablePoem = from({
      isSelectingByWord: true,
      passage: 'la',
      bookId: 4,
      wordLetters: [
        [
          { ch: 'a', isSelected: true },
          { ch: 'b', isSelected: false },
        ],
      ],
    })

    const wrapper = mount(
      <SelectablePoem selectablePoem={selectablePoem} toggleSelectedLetters={toggleSelectedLetters} />,
    )

    it('renders selected-by-word class', () => {
      expect(wrapper.find('.selecting-by-word')).to.have.length(1)
      expect(wrapper.find('.selecting-by-letter')).to.have.length(0)
    })

    it('letters are render as selected if selected', () => {
      expect(wrapper.find('.letter')).to.have.length(2)
      expect(wrapper.find('.is-selected')).to.have.length(1)
      expect(wrapper.find('.is-selected.letter').text()).to.equal('a')
    })

    it('clicked letters call #toggleSelectedLetters', () => {
      wrapper.find('.letter').first().simulate('click')
      expect(toggleSelectedLetters.calledOnce).to.equal(true)
      expect(toggleSelectedLetters).to.have.been.calledWith({ wordIdx: 0, letterIdx: 0 })
    })
  })
})
