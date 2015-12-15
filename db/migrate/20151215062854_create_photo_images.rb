class CreatePhotoImages < ActiveRecord::Migration
  def change
    create_table :photo_images do |t|
      t.string :url null: false
      t.id :author null: false

      t.timestamps null: false
    end
    
  end
end
