class Style < ActiveRecord::Base
  validates :poem_id, presence: true

  belongs_to :poem
end
