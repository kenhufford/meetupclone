class Membership < ApplicationRecord
    validates :group_id, :user_id, :member_type, presence: true
    validates_uniqueness_of :user_id, :scope => :group_id

    belongs_to :user,
    class_name: :user,
    foreign_key: :user_id

    belongs_to :group,
    class_name: :group,
    foreign_key: :group_id
end
