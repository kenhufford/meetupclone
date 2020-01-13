class Event < ApplicationRecord
    validates :title, :description, :max_attendance, :start_time, :end_time, :address, presence: true

    has_many :reservations,
    dependent: :destroy
    
    has_many :attendees,
    through: :reservations,
    source: :user

    belongs_to :group

    belongs_to :location

end
