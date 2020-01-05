class Event < ApplicationRecord
    validates :title, :description, :max_attendance, :start_time, :end_time, :address, :lat, :long, presence: true

    # has_many :categories
    # belongs_to :group

    def self.in_bounds(bounds)
        self.where("lat < ?", bounds[:northEast][:lat])
          .where("lat > ?", bounds[:southWest][:lat])
          .where("lng > ?", bounds[:southWest][:lng])
          .where("lng < ?", bounds[:northEast][:lng])
    end

end
