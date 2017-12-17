import React from 'react'

const Icon = ({ name }) => (
  <div className="icon">
    <img src="wrongname.gif" alt="HTML5 Icon" />
  </div>
)

Icon.propTypes = {
  name: React.PropTypes.string,
}

export default Icon
