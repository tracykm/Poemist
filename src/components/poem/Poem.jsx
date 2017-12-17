import React from 'react'

import PoemHeader from './PoemHeader'
import PoemBody from './PoemBody'
import PoemFooter from './PoemFooter'

import './_poem.scss'

const Poem = props => {
  const { poem } = props
  if (!poem) {
    return <div className="poem">loading...</div>
  }
  const { id, backgroundId, colorRange, textChunks, author, authorId } = poem
  return (
    <div
      className={`poem style-${backgroundId} color-${colorRange}`}
      data-test={`poem${id}`}
    >
      <div className="background-img" />
      <PoemHeader poemId={id} authorId={authorId} />
      {id}
      <PoemBody textChunks={textChunks} />
      <PoemFooter authorUsername={author} authorId={authorId} />
    </div>
  )
}

Poem.propTypes = {
  poem: React.PropTypes.object,
}

export default Poem
