class Poem < ActiveRecord::Base
  validates :author_id, :book_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "User"

  belongs_to :book

  has_many :letters, dependent: :destroy

  has_one :style, dependent: :destroy
end
