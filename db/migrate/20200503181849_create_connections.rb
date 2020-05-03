class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.string :type, null: false
      t.boolean :approved, null: false
      t.timestamps
    end
    add_reference :connections, :user1, foreign_key: {to_table: :users}
    add_reference :connections, :user2, foreign_key: {to_table: :users}
  end
end
