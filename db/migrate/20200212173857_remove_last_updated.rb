class RemoveLastUpdated < ActiveRecord::Migration[5.2]
  def change
    remove_column :channels, :last_updated, :datetime
  end
end
