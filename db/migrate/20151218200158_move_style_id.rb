class MoveStyleId < ActiveRecord::Migration
  def change
    remove_column :poems, :style_id
    add_column :styles, :poem_id, :integer
  end
end
