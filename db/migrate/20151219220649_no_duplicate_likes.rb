class NoDuplicateLikes < ActiveRecord::Migration
  def change
    add_index :likes, [:liker_id, :poem_id], :unique => true
  end
end
