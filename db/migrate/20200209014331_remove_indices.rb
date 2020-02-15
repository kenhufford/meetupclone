class RemoveIndices < ActiveRecord::Migration[5.2]
  def change
    remove_index :messages, column: :channel_id
    remove_index :messages, column: :user_id
    remove_index :channels, column: :group_id
  end
end
