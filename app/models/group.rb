class Group < ApplicationRecord
    validates :name, :description, presence: true
    validates :description, length: { minimum: 40 }

    has_many :memberships

    has_many :members, 
    through: :memberships,
    source: :user


end
