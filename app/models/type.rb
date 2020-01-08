class Type < ApplicationRecord
    validates :group_id, :category_id, presence: true
    validates_uniqueness_of :category_id, :scope => :group_id

    belongs_to :category,
    class_name: "Category",
    foreign_key: :category_id

    belongs_to :group,
    class_name: "Group",
    foreign_key: :group_id
end
