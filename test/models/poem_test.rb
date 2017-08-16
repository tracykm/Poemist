require 'test_helper'

class PoemTest < ActiveSupport::TestCase
  # passage = '0123456789'
  # test 'handles simple' do
  #   selectedTexts = [{
  #     start_idx: 2,
  #     end_idx: 6,
  #   }]
  #   chunks = [
  #     { text: '01', isSelected: false },
  #     { text: '2345', isSelected: true },
  #     { text: '6789', isSelected: false },
  #   ]
  #   puts Poem.make_passage_chunks(selectedTexts, passage)
  #   puts chunks
  #   assert Poem.make_passage_chunks(selectedTexts, passage).eql? chunks
  # end
  #
  # test 'handles first' do
  #   selectedTexts = [[0, 1]]
  #   chunks = [
  #     { text: '0', isSelected: true },
  #     { text: '123456789', isSelected: false },
  #   ]
  #   expect(makePassageChunks(selectedTexts, passage)).to eql(chunks)
  # end
  #
  # test 'handles last' do
  #   selectedTexts = [[9, 10]]
  #   chunks = [
  #     { text: '012345678', isSelected: false },
  #     { text: '9', isSelected: true },
  #   ]
  #   expect(makePassageChunks(selectedTexts, passage)).to eql(chunks)
  # end
  #
  # test 'handles multiple select arrays' do
  #   selectedTexts = [[0, 1], [9, 10]]
  #   chunks = [
  #     { text: '0', isSelected: true },
  #     { text: '12345678', isSelected: false },
  #     { text: '9', isSelected: true },
  #   ]
  #   expect(makePassageChunks(selectedTexts, passage)).to eql(chunks)
  # end
end
