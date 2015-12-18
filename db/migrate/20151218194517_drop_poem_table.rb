class DropPoemTable < ActiveRecord::Migration
  def change
    drop_table :poems
    drop_table :selected_texts
  end
end
