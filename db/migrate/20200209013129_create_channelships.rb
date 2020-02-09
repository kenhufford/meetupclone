class CreateChannelships < ActiveRecord::Migration[5.2]
  def change
    create_table :channelships do |t|
        t.references :group, foreign_key: true
        t.references :user, foreign_key: true
        t.boolean :moderator, null: false
        t.timestamps
    end
  end
end
