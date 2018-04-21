class Book < ActiveRecord::Base
  validates :author, :title, :text, presence: true

  has_many :poems

  def self.getRandomPassage()
    rand_idx = Random.rand(Book.count)+1
    @book = Book.find(rand_idx)
    text = @book.text
    passage_length = 1000
    start_idx = Random.rand(text.length-passage_length)
    @book.text = text[start_idx..start_idx+passage_length]
    @book
  end
end
