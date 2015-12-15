class CreatePoems < ActiveRecord::Migration
  def change
    create_table :poems do |t|
      t.integer :author_id, null: false
      t.text :passage, null: false
      t.integer :book_id, null: false
      t.integer :style_id, null: false

      t.timestamps null: false
    end
    add_index :poems, :book_id
    add_index :poems, :author_id
    add_index :poems, :style_id
  end
end
