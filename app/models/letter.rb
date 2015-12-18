class Letter < ActiveRecord::Base
  validates :position_idx, :ch, :poem_id, presence: true

  belongs_to :poem

end
