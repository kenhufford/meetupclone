class Group < ApplicationRecord
    attr_accessor :avg_stats

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

    def 

    def socialest_fighters
        members = self.members
            .select('users.name, COUNT(*) AS groups_count')
            .joins(:groups)
            .group('users.id')
            .order('COUNT(*) DESC')
            .limit(3)
        members.map do |member|
            [member.name, member.groups_count]
        end
    end

    def busiest_fighters
        members = self.members
            .select('users.name, COUNT(*) AS num_events')
            .joins(:events)
            .group('users.name')
            .order('COUNT(*) DESC')
            .limit(3)
        members.map do |member|
            [member.name, member.num_events]
        end
    end

    def chattiest_fighters
        members = self.members
            .select('users.name, COUNT(*) AS num_msg')
            .joins(:messages)
            .group('users.name')
            .order('COUNT(*) DESC')
            .limit(3)
        members.map do |member|
            [member.name, member.num_msg]
        end
    end

    def avg_stats
        members = self.members
        @avg_stats = {"power":0,"guts":0,"technique":0,"speed":0}
        members.each do |member|
            @avg_stats[:power] += member.power
            @avg_stats[:guts] += member.guts
            @avg_stats[:technique] += member.technique
            @avg_stats[:speed] += member.speed
        end
        @avg_stats.each do |key, value|
            @avg_stats[key] = value/members.length
        end
        @avg_stats
    end

    def most_popular_fighters
        members = self.members
            .select('users.name, COUNT(*) AS num_rivals')
            .joins(:rivals)
            .group('users.name')
            .order('num_rivals DESC')
            .limit(3)
        popular = []
        members.each do |member|
            popular << [member.name, member.num_rivals]
        end
        popular
    end
end
