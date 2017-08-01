
def getSelectedTexts(wordLetters)
  letters = wordLetters.flatten
  selects = []
  currentlySelected = false
  pair = []

  letters.each_with_index do |letter, idx|
    # only push index when switching
    if (letter[:isSelected] != currentlySelected)
      if (!currentlySelected) # starting
        pair = [idx] # new pair
      else # stopping
        pair << idx
        selects << pair # complete pair
      end
      currentlySelected = !currentlySelected
    end
  end

  # if selected at end, close it
  if (currentlySelected)
    pair << letters.length
    selects << pair # complete pair
  end
  return selects
end

describe Hash do
  it 'empty' do
    wordLetters = []

    selectedTexts = []
    expect(getSelectedTexts(wordLetters)).to eq(selectedTexts)
  end

  it 'first letter seleted' do
    wordLetters = [
      [
        { ch: 'c', isSelected: true } # 0
      ],
    ]

    selectedTexts = [
      [0, 1]
    ]
    expect(getSelectedTexts(wordLetters)).to eq(selectedTexts)
  end

  it 'last letter seleted' do
    wordLetters = [
      [
        { ch: 'c', isSelected: false }, # 0
        { ch: 'a', isSelected: true } # 1
      ],
    ]

    selectedTexts = [
      [1, 2]
    ]
    expect(getSelectedTexts(wordLetters)).to eq(selectedTexts)
  end

  it 'middle letter selected' do
    wordLetters = [
      [
        { ch: 'c', isSelected: false }, # 0
        { ch: 'a', isSelected: true }, # 1
        { ch: 'a', isSelected: false } # 2
      ]
    ]

    selectedTexts = [
      [1, 2]
    ]
    expect(getSelectedTexts(wordLetters)).to eq(selectedTexts)
  end

  it 'multiple words' do
    wordLetters = [
      [
        { ch: 'c', isSelected: true }, # 0
        { ch: 'a', isSelected: true }, # 1
        { ch: 'a', isSelected: true } # 2
      ],
      [
        { ch: 'c', isSelected: false }, # 3
        { ch: 'a', isSelected: false } # 4
      ]
    ]

    selectedTexts = [
      [0, 3],
    ]
    expect(getSelectedTexts(wordLetters)).to eq(selectedTexts)
  end

end
