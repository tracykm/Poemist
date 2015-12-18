class CreateLetters < ActiveRecord::Migration
  def change
    create_table :letters do |t|
      t.integer :position_idx, null: false
      t.string :ch, limit: 1, null: false
      t.boolean :is_selected, default: false
      t.boolean :is_italic, default: false
      t.integer :poem_id, null: false

      t.timestamps null: false
    end
    add_index :letters, :poem_id
  end
end
