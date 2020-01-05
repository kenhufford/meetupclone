class CreateMembertypes < ActiveRecord::Migration[5.2]
  def change
    create_table :membertypes do |t|
      tstring :title
      t.timestamps
    end
  end
end
