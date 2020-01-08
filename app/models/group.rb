class Group < ApplicationRecord
    validates :name, :description, presence: true
    validates :description, length: { minimum: 40 }

    has_many :memberships,
    class_name: "Membership",
    foreign_key: :group_id

    has_many :members, 
    through: :memberships,
    source: :user

    has_many :types,
    class_name: "Type",
    foreign_key: :group_id

    has_many :categories,
    through: :types,
    source: :category

    def self.in_bounds(bounds)
        self.where("lat < ?", bounds[:northEast][:lat])
          .where("lat > ?", bounds[:southWest][:lat])
          .where("long > ?", bounds[:southWest][:long])
          .where("long < ?", bounds[:northEast][:long])
    end

end
