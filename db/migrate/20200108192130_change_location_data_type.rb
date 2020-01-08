class ChangeLocationDataType < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :location
    add_column :users, :location_id, :integer, null: false
  end
end
