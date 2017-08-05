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
      return from([{ text: passage, is_selected: false }])
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
end
