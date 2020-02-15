class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
        t.string :name, null: false
        t.integer :group_id, null: false
        t.string :channel_icon, null: false
        t.timestamps
    end
    add_index :channels, :group_id, unique: true
  end
end
