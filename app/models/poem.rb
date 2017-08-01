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

  paginates_per 3

  def Poem::makePassageChunks(selectedTexts, passage)
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

end
