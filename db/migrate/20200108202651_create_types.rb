class CreateTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :types do |t|
      t.integer :category_id, null: false
      t.integer :group_id, null: false

      t.timestamps
    end
  end
end
