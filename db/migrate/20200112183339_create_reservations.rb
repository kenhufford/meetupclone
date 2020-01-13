class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.integer :event_id, null: false
      t.integer :user_id, null: false
      t.boolean :is_organizer, null: false
      t.timestamps
    end
  end
end
