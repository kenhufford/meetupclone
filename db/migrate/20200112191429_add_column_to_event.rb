class AddColumnToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :recurring_type, :string
  end
end
