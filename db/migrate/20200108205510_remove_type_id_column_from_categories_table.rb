class RemoveTypeIdColumnFromCategoriesTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :categories, :type_id, :integer
  end
end
