class AddSeenColumn < ActiveRecord::Migration[4.2]
  def change
    add_column :likes, :seen, :boolean, :default => false
  end
end
