class SelectedText < ActiveRecord::Base
  validates :poem_id, :start_idx, :end_idx, presence: true

  belongs_to :poem

end
