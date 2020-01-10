class Membership < ApplicationRecord
    validates :group_id, :user_id, :member_type, presence: true
    validates_uniqueness_of :user_id, :scope => :group_id

    belongs_to :user,
    dependent: :destroy,
    class_name: "User",
    foreign_key: :user_id

    belongs_to :group,
    class_name: "Group",
    foreign_key: :group_id,
    dependent: :destroy
end
