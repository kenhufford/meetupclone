class ChangeConnectionsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :connections, :connection_type
    remove_column :connections, :approved
    remove_column :connections, :user2_id
    remove_column :connections, :user1_id
    add_reference :connections, :friend, foreign_key:{to_table: :users}
    add_reference :connections, :user, foreign_key:{to_table: :users}

  end
end
