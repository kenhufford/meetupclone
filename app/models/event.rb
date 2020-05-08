class Event < ApplicationRecord
    attr_accessor :avg_stats
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

    def avg_stats
        attendees = self.attendees
        @avg_stats = {"power":0,"guts":0,"technique":0,"speed":0}
        attendees.each do |member|
            @avg_stats[:power] += member.power
            @avg_stats[:guts] += member.guts
            @avg_stats[:technique] += member.technique
            @avg_stats[:speed] += member.speed
        end
        @avg_stats.each do |key, value|
            @avg_stats[key] = value/attendees.length
        end
        @avg_stats
    end

end
