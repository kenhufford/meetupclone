class AddSecondImageToChannel < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :channel_icon2, :string
  end
end
