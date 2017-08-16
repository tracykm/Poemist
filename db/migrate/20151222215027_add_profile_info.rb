class AddProfileInfo < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :description, :text
    add_column :users, :img_url, :string
  end
end
