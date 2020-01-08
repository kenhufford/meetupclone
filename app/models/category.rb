class Category < ApplicationRecord
    validates :name, presence: true

    has_many :types

    has_many :groups,
    through: :types,
    source: :group
    
end
