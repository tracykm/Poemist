class AddSeenColumn < ActiveRecord::Migration
  def change
    add_column :likes, :seen, :boolean, :default => false
  end
end
