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
  const { id, backgroundId, colorRange, textChunks, author } = poem
  return (
    <div
      className={`poem style-${backgroundId} color-${colorRange}`}
      data-test={`poem${id}`}
    >
      <div className="background-img" />
      <PoemHeader poemId={id} authorId={author.id} />
      {id}
      <PoemBody textChunks={textChunks} />
      <PoemFooter authorUsername={author.username} authorId={author.id} />
    </div>
  )
}

export default Poem
