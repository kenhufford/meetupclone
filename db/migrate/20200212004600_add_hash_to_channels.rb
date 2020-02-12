class AddHashToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :hash_string, :string
  end
end
