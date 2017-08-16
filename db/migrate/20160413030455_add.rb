class Add < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :accessToken, :string
    add_column :users, :userID, :string
  end
end
