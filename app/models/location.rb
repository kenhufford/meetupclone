class Location < ApplicationRecord
    validates :name, :lat, :long, presence: :true

end
