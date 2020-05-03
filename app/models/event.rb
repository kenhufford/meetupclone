class Event < ApplicationRecord
    validates :title, :description, :max_attendance, :start_time, :end_time, :address, presence: true

    has_many :reservations,
    dependent: :destroy
    
    has_many :attendees,
    through: :reservations,
    source: :user

    belongs_to :group

    belongs_to :location

    def head_count_from_groups
        groups = self.attendees
            .select('groups.name, COUNT(*) AS num_brawlers')
            .joins(:groups)
            .group('groups.name')
        count = {}
        groups.each do |group|
            count[group.name] = group.num_brawlers
        end
        count
    end

    def count_from_locations
        attendees = self.attendees
            .includes(:location)
        locations = {}
        attendees.each do |attendee|
            if locations[attendee.location.name]
                locations[attendee.location.name]+=1
            else
                locations[attendee.location.name] = 1
            end
        end
        locations
    end

end
