
def get_selected_texts(text_chunks)
  letters = text_chunks.flatten
  selects = []
  currentlySelected = false
  pair = []
  idx = 0

  text_chunks.each do |text_chunk|
    # only push index when switching
    if (text_chunk[:isSelected] != currentlySelected)
      if (!currentlySelected) # starting
        pair = { start_idx: idx } # new pair
      else # stopping
        pair[:end_idx] = idx
        selects << pair # complete pair
      end
      currentlySelected = !currentlySelected
    end
    idx = idx + text_chunk[:text].length
  end

  # if selected at end, close it
  if (currentlySelected)
    pair[:end_idx] = idx
    selects << pair # complete pair
  end
  return selects
end

describe Hash do
  it 'empty' do
    text_chunks = []

    selected_texts = []
    expect(get_selected_texts(text_chunks)).to eq(selected_texts)
  end

  it 'first letter seleted' do
    text_chunks = [
      { text: '01', isSelected: true } # 0
    ]

    selected_texts = [
      { start_idx: 0, end_idx: 2 }
    ]
    expect(get_selected_texts(text_chunks)).to eq(selected_texts)
  end

  it 'last letter seleted' do
    text_chunks = [
      { text: '0', isSelected: true },
      { text: '1', isSelected: false },
      { text: '2', isSelected: true },
    ]

    selected_texts = [
      { start_idx: 0, end_idx: 1 },
      { start_idx: 2, end_idx: 3 }
    ]
    expect(get_selected_texts(text_chunks)).to eq(selected_texts)
  end

  it 'middle letter selected' do
    text_chunks = [
      { text: '01', isSelected: false },
      { text: '2', isSelected: true },
    ]

    selected_texts = [
      { start_idx: 2, end_idx: 3 }
    ]
    expect(get_selected_texts(text_chunks)).to eq(selected_texts)
  end
end
