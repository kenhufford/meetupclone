class AddDmToChannel < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :dm, :boolean, null: false
  end
end
