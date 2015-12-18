class AddIndex < ActiveRecord::Migration
  def change
    add_index :styles, :poem_id
  end
end
