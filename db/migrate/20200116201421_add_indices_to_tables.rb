class AddIndicesToTables < ActiveRecord::Migration[5.2]
  def change
    add_index :events, :group_id
    add_index :events, :location_id
    add_index :events, :title
    add_index :groups, :name
    add_index :locations, :name
    add_index :memberships, :user_id
    add_index :memberships, :group_id
    add_index :reservations, :event_id
    add_index :reservations, :user_id
    add_index :types, :category_id
    add_index :types, :group_id
    add_index :users, :location_id

  end
end
