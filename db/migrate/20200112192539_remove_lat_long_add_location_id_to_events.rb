class RemoveLatLongAddLocationIdToEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :lat, :integer
    remove_column :events, :long, :integer
    add_column :events, :location_id, :integer, null: false
  end
end
