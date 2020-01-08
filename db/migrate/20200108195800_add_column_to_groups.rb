class AddColumnToGroups < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :location_id, :integer, null: false
  end
end
