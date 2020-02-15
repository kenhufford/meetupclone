class DropChannelship < ActiveRecord::Migration[5.2]
  def change
    drop_table :channelships

      create_table :channelships do |t|
        t.references :channel, foreign_key: true
        t.references :user, foreign_key: true
        t.boolean :moderator, null: false
        t.timestamps
    end
  end
end
