class Group < ApplicationRecord
    validates :name, :description, presence: true
    validates :description, length: { minimum: 20 }

    has_many :memberships,
    class_name: "Membership",
    foreign_key: :group_id,
    dependent: :destroy

    has_many :members, 
    through: :memberships,
    source: :user

    has_many :types,
    class_name: "Type",
    foreign_key: :group_id

    has_many :categories,
    through: :types,
    source: :category

    has_many :events,
    dependent: :destroy

    belongs_to :location

    has_many :channels,
    class_name: "Channel",
    foreign_key: :group_id,
    dependent: :destroy

end
