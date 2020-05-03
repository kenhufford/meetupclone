class ChangeFriendIdname < ActiveRecord::Migration[5.2]
  def change
    remove_column :connections, :friend_id
    add_reference :connections, :rival, foreign_key: {to_table: :users}
  end
end
