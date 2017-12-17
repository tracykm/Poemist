import 'src/spec/setupDom'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'

import StyleToolbar from './StyleToolbar'

chai.use(sinonChai)

describe('<StyleToolbar />', () => {
  let sandbox
  let updateStyle
  let wrapper

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    updateStyle = sandbox.spy()
    const props = {
      text: [
        { text: 'some stuff lala', isSelected: false },
        { text: 'so important!', isSelected: true },
      ],
      backgroundId: 5,
      colorRange: 10,
      updateStyle,
    }
    wrapper = shallow(<StyleToolbar {...props} />)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('increments style down one', () => {
    wrapper.find('[data-ux="background-id-down"]').simulate('click')
    expect(updateStyle.calledOnce).to.equal(true)
    expect(updateStyle).to.have.been.calledWith({ backgroundId: 4 })
  })

  it('increments style up one', () => {
    wrapper.find('[data-ux="background-id-up"]').simulate('click')
    expect(updateStyle.calledOnce).to.equal(true)
    expect(updateStyle).to.have.been.calledWith({ backgroundId: 6 })
  })

  it('increments color down one', () => {
    wrapper.find('[data-ux="color-range-down"]').simulate('click')
    expect(updateStyle.calledOnce).to.equal(true)
    expect(updateStyle).to.have.been.calledWith({ colorRange: 9 })
  })

  it('increments color up one', () => {
    wrapper.find('[data-ux="color-range-up"]').simulate('click')
    expect(updateStyle.calledOnce).to.equal(true)
    expect(updateStyle).to.have.been.calledWith({ colorRange: 11 })
  })
})
