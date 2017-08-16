class NoDuplicateLikes < ActiveRecord::Migration[4.2]
  def change
    add_index :likes, [:liker_id, :poem_id], :unique => true
  end
end
