class AddEventIdToChannel < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :event_id, :integer
  end
end
