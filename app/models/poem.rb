class Poem < ActiveRecord::Base
  validates :author_id, :passage, :book_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "User"

  belongs_to :book

  has_many :selected_texts, :dependent => :destroy

  belongs_to :style

  has_many :likes, :dependent => :destroy

  has_many :likers,
    through: :likes,
    source: :liker

  paginates_per 10

  def get_poem_text
    Poem.make_passage_chunks(selected_texts, passage)
  end

  def self.make_passage_chunks(selected_texts, passage)
    result_arr = []

    # no selections
    if selected_texts.empty?
      return [{ text: passage, is_selected: false }]
    end

    unselected_start = 0

    selected_texts.each do |selectedText|
      start_idx = selectedText[:start_idx]
      end_idx = selectedText[:end_idx]

      unselected_end = start_idx
      unselected_text = passage[unselected_start...unselected_end]
      result_arr << { text: unselected_text, is_selected: false } if (unselected_text!='')
      unselected_start = end_idx

      text = passage[start_idx...end_idx]
      result_arr.push({ text: text, is_selected: true })
    end

    leftOverText = passage[unselected_start...passage.length]
    result_arr << { text: leftOverText, is_selected: false } if (leftOverText!='')

    return result_arr
  end

  def save_selected_texts(text_chunks, poem_id)
    selected_texts = Poem.get_selected_texts(text_chunks)
    selected_texts.to_a.each do |selected_text|
      SelectedText.create(poem_id: poem_id, start_idx: selected_text[:start_idx], end_idx: selected_text[:end_idx])
    end
  end

  def self.get_selected_texts(text_chunks)
    letters = text_chunks.flatten
    selects = []
    currently_selected = false
    pair = []
    idx = 0

    text_chunks.each do |text_chunk|
      # only push index when switching
      if (text_chunk[:is_selected] != currently_selected)
        if (!currently_selected) # starting
          pair = { start_idx: idx } # new pair
        else # stopping
          pair[:end_idx] = idx
          selects << pair # complete pair
        end
        currently_selected = !currently_selected
      end
      idx = idx + text_chunk[:text].length
    end

    # if selected at end, close it
    if (currently_selected)
      pair[:end_idx] = idx
      selects << pair # complete pair
    end
    return selects
  end
end
