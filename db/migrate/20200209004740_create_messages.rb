class CreateMessages < ActiveRecord::Migration[5.2]
  def change
      create_table :messages do |t|
        t.integer :channel_id, null: false
        t.integer :user_id, null: false
        t.string :message, null: false

        t.timestamps
      end
    add_index :messages, :channel_id, unique: true
    add_index :messages, :user_id, unique: true
  end

end
