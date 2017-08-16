def makePassageChunks(selectedTexts, passage)
  returnVal = []

  # no selections
  if selectedTexts.empty?
    return from([{ text: passage, isSelected: false }])
  end

  emptyStart = 0

  selectedTexts.each do |ends|
    start = ends[0]
    stop = ends[1]

    emptyStop = start
    unselectedText = passage[emptyStart...emptyStop]
    returnVal << { text: unselectedText, isSelected: false } if (unselectedText!='')
    emptyStart = stop

    text = passage[start...stop]
    returnVal.push({ text: text, isSelected: true })
  end

  leftOverText = passage[emptyStart...passage.length]
  returnVal << { text: leftOverText, isSelected: false } if (leftOverText!='')

  return returnVal
end

describe Hash do
  passage = '0123456789'
  it 'handles simple' do
    selectedTexts = [[2, 6]]
    chunks = [
      { text: '01', isSelected: false },
      { text: '2345', isSelected: true },
      { text: '6789', isSelected: false },
    ]
    expect(makePassageChunks(selectedTexts, passage)).to eq(chunks)
  end

  it 'handles first' do
    selectedTexts = [[0, 1]]
    chunks = [
      { text: '0', isSelected: true },
      { text: '123456789', isSelected: false },
    ]
    expect(makePassageChunks(selectedTexts, passage)).to eql(chunks)
  end

  it 'handles last' do
    selectedTexts = [[9, 10]]
    chunks = [
      { text: '012345678', isSelected: false },
      { text: '9', isSelected: true },
    ]
    expect(makePassageChunks(selectedTexts, passage)).to eql(chunks)
  end

  it 'handles multiple select arrays' do
    selectedTexts = [[0, 1], [9, 10]]
    chunks = [
      { text: '0', isSelected: true },
      { text: '12345678', isSelected: false },
      { text: '9', isSelected: true },
    ]
    expect(makePassageChunks(selectedTexts, passage)).to eql(chunks)
  end

end
