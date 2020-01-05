class ChangeDataTypeMemberships < ActiveRecord::Migration[5.2]
  def change
    change_column :memberships, :member_type_id, :string
    rename_column :memberships, :member_type_id, :member_type
  end
end
