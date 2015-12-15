class CreateStyles < ActiveRecord::Migration
  def change
    create_table :styles do |t|
      t.boolean :centered, default: false
      t.integer :color_range, default: 0
      t.integer :background_id, default: 1
      t.integer :font_set_id, default: 1

      t.timestamps null: false
    end
    add_index :styles, :font_set_id
    add_index :styles, :background_id
  end
end
