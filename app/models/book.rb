class Book < ActiveRecord::Base
  validates :author, :title, :text, presence: true

  has_many :poems
end
