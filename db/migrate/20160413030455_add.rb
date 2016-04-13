class Add < ActiveRecord::Migration
  def change
    add_column :users, :accessToken, :string
    add_column :users, :userID, :string
  end
end
