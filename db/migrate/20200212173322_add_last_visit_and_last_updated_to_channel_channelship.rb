class AddLastVisitAndLastUpdatedToChannelChannelship < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :last_updated, :datetime
    add_column :channelships, :last_visited, :datetime
  end
end
