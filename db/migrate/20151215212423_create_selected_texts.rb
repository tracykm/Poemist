class CreateSelectedTexts < ActiveRecord::Migration[4.2]
  def change
    create_table :selected_texts do |t|
      t.integer :poem_id, null: false
      t.integer :start_idx, null: false
      t.integer :start_end, null: false
      t.boolean :italicized, default: false

      t.timestamps null: false
    end
    add_index :selected_texts, :poem_id
  end
end
