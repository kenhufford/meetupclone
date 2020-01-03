class RemoveLatAndLongFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :lat, :float
    remove_column :users, :long, :float
  end
end
