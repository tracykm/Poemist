class AddProfileInfo < ActiveRecord::Migration
  def change
    add_column :users, :description, :text
    add_column :users, :img_url, :string
  end
end
