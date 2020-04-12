class AddStatsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :power, :integer
    add_column :users, :speed, :integer
    add_column :users, :guts, :integer
    add_column :users, :technique, :integer
  end
end
