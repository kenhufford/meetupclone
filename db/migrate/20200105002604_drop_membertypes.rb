class DropMembertypes < ActiveRecord::Migration[5.2]
  def change
    drop_table :membertypes
  end
end
