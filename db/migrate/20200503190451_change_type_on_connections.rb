class ChangeTypeOnConnections < ActiveRecord::Migration[5.2]
  def change
    rename_column :connections, :type, :connection_type
  end
end
