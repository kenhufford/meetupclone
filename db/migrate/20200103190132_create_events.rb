class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.integer :group_id, null: false
      t.string :description, null: false
      t.integer :max_attendance, null: false
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.string :address, null: false
      t.integer :lat, null: false
      t.integer :long, null: false
      t.integer :category_id
      t.string :image_url
      t.timestamps
    end
  end
end
