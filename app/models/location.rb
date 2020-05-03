class Location < ApplicationRecord
    validates :name, :lat, :long, presence: :true

    has_many :users
    has_many :events
    has_many :groups
end
