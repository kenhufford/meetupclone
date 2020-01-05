class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.float :lat
      t.float :long
      t.string :image_url
      t.timestamps
    end
  end
end
