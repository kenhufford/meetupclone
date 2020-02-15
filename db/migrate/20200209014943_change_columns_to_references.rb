class ChangeColumnsToReferences < ActiveRecord::Migration[5.2]
  def change
    remove_column(:messages, :channel_id)
    remove_column(:messages, :user_id)
    remove_column(:channels, :group_id)

    change_table :channels do |t|
      t.references :group, foreign_key: true
    end

    change_table :messages do |t|
      t.references :channel, foreign_key: true
      t.references :user, foreign_key: true
    end
  end
end
