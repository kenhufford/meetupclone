class AddImageIconToGroups < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :icon_url, :string
  end
end
