class CreateBooks < ActiveRecord::Migration[4.2]
  def change
    create_table :books do |t|
      t.string :author, null: false
      t.string :title, null: false
      t.text :text, null: false

      t.timestamps null: false
    end
  end
end
