class CreateLikes < ActiveRecord::Migration[4.2]
  def change
    create_table :likes do |t|
      t.integer :poem_id, null: false
      t.integer :liker_id, null: false

      t.timestamps null: false
    end
    add_index :likes, :poem_id
    add_index :likes, :liker_id
  end
end
