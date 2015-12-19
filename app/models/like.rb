class Like < ActiveRecord::Base
  validates :poem_id, :liker_id, presence: true;

  belongs_to :poem

  belongs_to :liker,
    foreign_key: :liker_id,
    primary_key: :id,
    class_name: "User"

end
