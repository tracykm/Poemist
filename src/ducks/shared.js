export const RECIEVE_DATA = 'RECIEVE_DATA'

export const recieveData = data => ({
  type: RECIEVE_DATA,
  payload: data,
})

export function nestByKey(poems) {
  if (!poems) return {}
  const newPoems = {}
  poems.forEach(poem => {
    newPoems[poem.id] = poem
  })
  return newPoems
}
